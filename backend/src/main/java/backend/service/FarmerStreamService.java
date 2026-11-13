package backend.service;

import backend.Farmer;

import java.util.List;

public class FarmerStreamService {

    // 1. FILTER: Find farmers by state
    public List<Farmer> filterByState(
            List<Farmer> farmers, String state) {

        return farmers.stream()
                .filter(f -> f.getState().equalsIgnoreCase(state))
                .toList();
    }

    // 2. MAP: Extract farmer names
    public List<String> getFarmerNames(List<Farmer> farmers) {

        return farmers.stream()
                .map(Farmer::getName)
                .toList();
    }

    // 3. SORTED: Sort farmer names
    public List<String> getSortedNames(List<Farmer> farmers) {

        return farmers.stream()
                .map(Farmer::getName)
                .sorted()
                .toList();
    }

    // 4. DISTINCT: Get unique villages
    public List<String> getUniqueVillages(List<Farmer> farmers) {

        return farmers.stream()
                .map(Farmer::getVillage)
                .distinct()
                .toList();
    }

    // 5. LIMIT: Get first N farmers
    public List<Farmer> getFirstFarmers(
            List<Farmer> farmers, int count) {

        return farmers.stream()
                .limit(count)
                .toList();
    }

    // 6. SKIP: Skip first N farmers
    public List<Farmer> skipFarmers(
            List<Farmer> farmers, int count) {

        return farmers.stream()
                .skip(count)
                .toList();
    }
}
