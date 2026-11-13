package backend;

import backend.exceptions.FarmerValidationService;
import backend.exceptions.InvalidFarmerException;

public class TestFarmerValidation {

    public static void main(String[] args) {

        FarmerValidationService service =
                new FarmerValidationService();

        Farmer farmer = new Farmer(
                "Aman", "12345", "Rajpura", "Punjab");

        try {
            service.validate(farmer);

        } catch (InvalidFarmerException e) {
            System.out.println("Validation error: " + e.getMessage());

        } finally {
            System.out.println("Validation process completed.");
        }
    }
}
