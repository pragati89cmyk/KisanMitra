package backend.exceptions;

import backend.Farmer;

public class FarmerValidationService {

    public void validate(Farmer farmer)
            throws InvalidFarmerException {

        if (farmer == null
                || farmer.getName() == null
                || farmer.getName().isBlank()) {
            throw new InvalidFarmerException(
                    "Farmer name cannot be empty.");
        }

        if (farmer.getPhone() == null
                || !farmer.getPhone().matches("\\d{10}")) {
            throw new InvalidFarmerException(
                    "Phone number must contain 10 digits.");
        }

        System.out.println("Farmer validation successful!");
    }
}
