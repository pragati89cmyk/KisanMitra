package backend.filehandling;

import backend.Farmer;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

public class FarmerFileService {

    public void exportFarmers(List<Farmer> farmers)
            throws IOException {

        try (FileWriter writer =
                     new FileWriter("farmers.txt")) {

            for (Farmer farmer : farmers) {
                writer.write(
                    farmer.getName() + "," +
                    farmer.getPhone() + "," +
                    farmer.getVillage() + "," +
                    farmer.getState() + "\n"
                );
            }
        }

        System.out.println("Farmers exported successfully!");
    }
}
