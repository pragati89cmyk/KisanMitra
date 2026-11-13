package backend.service;

import backend.Farmer;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

public class FarmerFilterService {

    public List<Farmer> filterByState(
            List<Farmer> farmers, String state) {

        Predicate<Farmer> isFromState =
                farmer -> farmer.getState().equalsIgnoreCase(state);

        List<Farmer> result = new ArrayList<>();

        for (Farmer farmer : farmers) {

            if (isFromState.test(farmer)) {
                result.add(farmer);
            }
        }

        return result;
    }
}
