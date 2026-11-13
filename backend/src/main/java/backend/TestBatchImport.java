package backend;

import backend.filehandling.FarmerImportService;
import java.util.List;

public class TestBatchImport {

    public static void main(String[] args) throws Exception {

        FarmerImportService importer = new FarmerImportService();

        List<Farmer> farmers =
                importer.importFarmers("farmers-batch-test.csv");

        FarmerDAO dao = new FarmerDAO();

        int inserted = dao.batchRegisterFarmers(farmers);

        System.out.println("Batch inserted count: " + inserted);
    }
}
