package backend;

import backend.collections.FarmerCollectionService;
import java.util.List;

public class TestFarmerCollections {

    public static void main(String[] args) {

        FarmerDAO dao = new FarmerDAO();

        List<Farmer> farmers = dao.getAllFarmers();

        if (farmers.isEmpty()) {
            System.out.println("No farmers found in the database.");
            return;
        }

        FarmerCollectionService service =
                new FarmerCollectionService();

        service.demonstrateCollections(farmers);
    }
}
