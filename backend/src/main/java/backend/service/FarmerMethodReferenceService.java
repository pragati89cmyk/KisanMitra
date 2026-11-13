package backend.service;

import backend.Farmer;

import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;

public class FarmerMethodReferenceService {

    public void displayNames(List<Farmer> farmers) {

        Consumer<String> printer = System.out::println;

        Function<Farmer, String> getName = Farmer::getName;

        farmers.stream()
                .map(getName)
                .forEach(printer);
    }
}
