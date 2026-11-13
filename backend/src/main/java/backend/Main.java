package backend;

import java.util.List;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        FarmerDAO dao = new FarmerDAO();
        Scanner sc = new Scanner(System.in);

        System.out.println("KisanMitra Backend Started!");

        System.out.print("Enter farmer phone to delete: ");
        String phone = sc.nextLine().trim();

        System.out.print("Are you sure? (yes/no): ");
        String confirmation = sc.nextLine().trim();

        if (confirmation.equalsIgnoreCase("yes")) {

            boolean deleted = dao.deleteFarmer(phone);

            System.out.println(deleted
                    ? "Farmer deleted successfully!"
                    : "Farmer not found or deletion failed!");

        } else {
            System.out.println("Deletion cancelled.");
        }

        List<Farmer> farmers = dao.getAllFarmers();

        System.out.println("\nRemaining Farmers: " + farmers.size());

        for (Farmer farmer : farmers) {
            System.out.println(farmer.getName() + " | "
                    + farmer.getPhone() + " | "
                    + farmer.getVillage() + " | "
                    + farmer.getState());
        }

        sc.close();
    }
}
