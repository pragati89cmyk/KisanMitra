package backend;

import backend.filehandling.FarmerDatabaseImportService;

public class TestFarmerImport {

    public static void main(String[] args) throws Exception {

        FarmerDatabaseImportService service =
                new FarmerDatabaseImportService();

        service.importIntoDatabase("farmers-import.csv");
    }
}
