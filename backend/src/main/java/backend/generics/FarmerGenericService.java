package backend.generics;

import backend.Farmer;
import java.util.List;

public class FarmerGenericService {

    // 1. Unbounded wildcard: accepts a list of any type
    public void displayItems(List<?> items) {
        for (Object item : items) {
            System.out.println(item);
        }
    }

    // 2. Upper bounded wildcard: accepts Farmer or its subclasses
    public void displayFarmers(List<? extends Farmer> farmers) {
        for (Farmer farmer : farmers) {
            System.out.println(farmer.getName());
        }
    }

    // 3. Lower bounded wildcard: accepts Farmer or its supertypes
    public void addFarmer(
            List<? super Farmer> destination,
            Farmer farmer) {

        destination.add(farmer);
    }

    // 4. Bounded generic method
    // T must implement Comparable<T>
    public <T extends Comparable<T>> T findMaximum(List<T> items) {

        if (items == null || items.isEmpty()) {
            throw new IllegalArgumentException(
                    "List cannot be empty.");
        }

        T maximum = items.get(0);

        for (T item : items) {
            if (item.compareTo(maximum) > 0) {
                maximum = item;
            }
        }

        return maximum;
    }
}
