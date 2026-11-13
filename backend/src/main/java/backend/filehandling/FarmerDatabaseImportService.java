package backend.filehandling;

import backend.Farmer;
import backend.FarmerDAO;
import java.io.IOException;
import java.util.List;

public class FarmerDatabaseImportService {

    private final FarmerImportService importService =
            new FarmerImportService();

    private final FarmerDAO farmerDAO =
            new FarmerDAO();

    public void importIntoDatabase(String fileName)
            throws IOException {

        List<Farmer> farmers =
                importService.importFarmers(fileName);

        int successful = 0;
        int failed = 0;

        for (Farmer farmer : farmers) {

            boolean registered =
                    farmerDAO.registerFarmer(farmer);

            if (registered) {
                successful++;
                System.out.println(
                    "Imported: " + farmer.getName()
                );
            } else {
                failed++;
                System.out.println(
                    "Import failed: " + farmer.getName()
                );
            }
        }

        System.out.println("\nImport Summary");
        System.out.println("Successful: " + successful);
        System.out.println("Failed: " + failed);
    }
}
