package backend.filehandling;

import backend.Farmer;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class FarmerImportService {

    public List<Farmer> importFarmers(String fileName)
            throws IOException {

        List<Farmer> farmers = new ArrayList<>();

        try (BufferedReader reader =
                     new BufferedReader(new FileReader(fileName))) {

            String line;

            while ((line = reader.readLine()) != null) {

                String[] data = line.split(",", -1);

                if (data.length != 4) {
                    System.out.println("Invalid row skipped: " + line);
                    continue;
                }

                String name = data[0].trim();
                String phone = data[1].trim();
                String village = data[2].trim();
                String state = data[3].trim();

                if (name.isEmpty() || village.isEmpty()
                        || state.isEmpty()
                        || !phone.matches("\\d{10}")) {

                    System.out.println("Invalid farmer skipped: " + line);
                    continue;
                }

                Farmer farmer =
                    new Farmer(name, phone, village, state);

                farmers.add(farmer);
            }
        }

        return farmers;
    }
}
