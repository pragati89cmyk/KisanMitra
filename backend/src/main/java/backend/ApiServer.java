package backend;

import backend.concurrency.FarmerNotificationService;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class ApiServer {

    private static final Gson gson = new Gson();

    private static final FarmerNotificationService notificationService =
            new FarmerNotificationService(10);

    public static void main(String[] args) throws IOException {

        notificationService.start();

        HttpServer server = HttpServer.create(
                new InetSocketAddress(8080), 0
        );

        server.createContext("/api/farmers", exchange -> {
            try {
                handleRequest(exchange);
            } catch (Exception e) {
                sendJson(exchange, 500,
                        "{\"message\":\"Internal server error\"}");
                e.printStackTrace();
            }
        });

        Runtime.getRuntime().addShutdownHook(
                new Thread(notificationService::shutdown)
        );

        server.start();

        System.out.println("KisanMitra API is running on port 8080");
        System.out.println("Farmers endpoint: http://localhost:8080/api/farmers");
    }

    private static void handleRequest(HttpExchange exchange)
            throws IOException {

        exchange.getResponseHeaders().set(
                "Access-Control-Allow-Origin", "*"
        );

        exchange.getResponseHeaders().set(
                "Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"
        );

        exchange.getResponseHeaders().set(
                "Access-Control-Allow-Headers", "Content-Type"
        );

        String method = exchange.getRequestMethod();

        if (method.equalsIgnoreCase("OPTIONS")) {
            exchange.sendResponseHeaders(204, -1);
            exchange.close();
            return;
        }

        FarmerDAO dao = new FarmerDAO();

        if (method.equalsIgnoreCase("GET")) {

            List<Farmer> farmers = dao.getAllFarmers();

            sendJson(exchange, 200, gson.toJson(farmers));
            return;
        }

        if (method.equalsIgnoreCase("POST")) {

            String body = new String(
                    exchange.getRequestBody().readAllBytes(),
                    StandardCharsets.UTF_8
            );

            JsonObject data = JsonParser.parseString(body).getAsJsonObject();

            String name = data.has("name")
                    ? data.get("name").getAsString().trim() : "";

            String phone = data.has("phone")
                    ? data.get("phone").getAsString().trim() : "";

            String village = data.has("village")
                    ? data.get("village").getAsString().trim() : "";

            String state = data.has("state")
                    ? data.get("state").getAsString().trim() : "";

            if (name.isBlank() || village.isBlank() || state.isBlank()
                    || !phone.matches("\\d{10}")) {

                sendJson(exchange, 400,
                        "{\"message\":\"Please provide valid farmer details and a 10-digit phone number.\"}");
                return;
            }

            Farmer farmer = new Farmer(name, phone, village, state);

            boolean registered = dao.registerFarmer(farmer);

            if (registered) {

                try {
                    notificationService.publish(farmer);

                } catch (InterruptedException e) {

                    Thread.currentThread().interrupt();

                    System.err.println(
                            "Registration notification was interrupted."
                    );
                }

                sendJson(exchange, 201,
                        "{\"message\":\"Farmer registered successfully!\"}");

            } else {

                sendJson(exchange, 409,
                        "{\"message\":\"Registration failed. The phone number may already exist.\"}");
            }

            return;
        }


        if (method.equalsIgnoreCase("PUT")) {

            String body = new String(
                    exchange.getRequestBody().readAllBytes(),
                    StandardCharsets.UTF_8
            );

            JsonObject data = JsonParser.parseString(body).getAsJsonObject();

            String phone = data.has("phone")
                    ? data.get("phone").getAsString().trim() : "";

            String village = data.has("village")
                    ? data.get("village").getAsString().trim() : "";

            String state = data.has("state")
                    ? data.get("state").getAsString().trim() : "";

            if (!phone.matches("\\d{10}")
                    || village.isBlank() || state.isBlank()) {
                sendJson(exchange, 400,
                        "{\"message\":\"Provide a valid phone number, village and state.\"}");
                return;
            }

            boolean updated = dao.updateFarmer(phone, village, state);

            if (updated) {
                sendJson(exchange, 200,
                        "{\"message\":\"Farmer updated successfully!\"}");
            } else {
                sendJson(exchange, 404,
                        "{\"message\":\"Farmer not found or update failed.\"}");
            }

            return;
        }

        if (method.equalsIgnoreCase("DELETE")) {

            String body = new String(
                    exchange.getRequestBody().readAllBytes(),
                    StandardCharsets.UTF_8
            );

            JsonObject data = JsonParser.parseString(body).getAsJsonObject();

            String phone = data.has("phone")
                    ? data.get("phone").getAsString().trim() : "";

            if (!phone.matches("\\d{10}")) {
                sendJson(exchange, 400,
                        "{\"message\":\"Provide a valid 10-digit phone number.\"}");
                return;
            }

            boolean deleted = dao.deleteFarmer(phone);

            if (deleted) {
                sendJson(exchange, 200,
                        "{\"message\":\"Farmer deleted successfully!\"}");
            } else {
                sendJson(exchange, 404,
                        "{\"message\":\"Farmer not found.\"}");
            }

            return;
        }

        sendJson(exchange, 405,
                "{\"message\":\"Method not allowed\"}");
    }

    private static void sendJson(
            HttpExchange exchange,
            int status,
            String response
    ) throws IOException {

        byte[] bytes = response.getBytes(StandardCharsets.UTF_8);

        exchange.getResponseHeaders().set(
                "Content-Type", "application/json; charset=UTF-8"
        );

        exchange.sendResponseHeaders(status, bytes.length);
        exchange.getResponseBody().write(bytes);
        exchange.close();
    }
}
