package backend.service;

import backend.Farmer;

import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;

public class FarmerFunctionalService {

    // Predicate: Check farmer's state
    public Predicate<Farmer> fromPunjab() {
        return farmer ->
                farmer.getState().equalsIgnoreCase("Punjab");
    }

    // Consumer: Display farmer information
    public Consumer<Farmer> displayFarmer() {
        return farmer ->
                System.out.println(farmer.getName()
                        + " - " + farmer.getVillage());
    }

    // Function: Extract farmer's name
    public Function<Farmer, String> getName() {
        return farmer -> farmer.getName();
    }

    // Supplier: Provide a welcome message
    public Supplier<String> welcomeMessage() {
        return () -> "Welcome to KisanMitra!";
    }

    // Use Consumer to display all farmers
    public void displayAll(List<Farmer> farmers) {

        Consumer<Farmer> display = displayFarmer();

        farmers.forEach(display);
    }
}
