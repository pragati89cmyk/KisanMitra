package backend;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class FarmerDAO {

    // CREATE: Register farmer
    public boolean registerFarmer(Farmer farmer) {

        String sql = "INSERT INTO farmer (name, phone, village, state) VALUES (?, ?, ?, ?)";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, farmer.getName());
            ps.setString(2, farmer.getPhone());
            ps.setString(3, farmer.getVillage());
            ps.setString(4, farmer.getState());

            return ps.executeUpdate() > 0;

        } catch (SQLException e) {
            System.out.println("Registration failed: " + e.getMessage());
            return false;
        }
    }

    // READ: Retrieve all farmers
    public List<Farmer> getAllFarmers() {

        List<Farmer> farmers = new ArrayList<>();

        String sql = "SELECT farmer_id, name, phone, village, state FROM farmer";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {

                Farmer farmer = new Farmer(
                    rs.getInt("farmer_id"),
                    rs.getString("name"),
                    rs.getString("phone"),
                    rs.getString("village"),
                    rs.getString("state")
                );

                farmers.add(farmer);
            }

        } catch (SQLException e) {
            System.out.println("Retrieval failed: " + e.getMessage());
        }

        return farmers;
    }

    // UPDATE: Update farmer details
    public boolean updateFarmer(String phone, String village, String state) {

        String sql = "UPDATE farmer SET village = ?, state = ? WHERE phone = ?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, village);
            ps.setString(2, state);
            ps.setString(3, phone);

            return ps.executeUpdate() > 0;

        } catch (SQLException e) {
            System.out.println("Update failed: " + e.getMessage());
            return false;
        }
    }

    // DELETE: Delete farmer
    public boolean deleteFarmer(String phone) {

        String sql = "DELETE FROM farmer WHERE phone = ?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, phone);

            return ps.executeUpdate() > 0;

        } catch (SQLException e) {
            System.out.println("Delete failed: " + e.getMessage());
            return false;
        }
    }

    // COUNT: Count all registered farmers using Statement
    public int countFarmers() {

        String sql = "SELECT COUNT(*) FROM farmer";

        try (Connection con = DBConnection.getConnection();
             Statement st = con.createStatement();
             ResultSet rs = st.executeQuery(sql)) {

            if (rs.next()) {
                return rs.getInt(1);
            }

        } catch (SQLException e) {
            System.out.println("Count failed: " + e.getMessage());
        }

        return 0;
    }

    // BATCH CREATE: Register multiple farmers in one transaction

    public int batchRegisterFarmers(List<Farmer> farmers) {

        String sql = "INSERT INTO farmer (name, phone, village, state) VALUES (?, ?, ?, ?)";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            con.setAutoCommit(false);

            try {
                for (Farmer farmer : farmers) {
                    ps.setString(1, farmer.getName());
                    ps.setString(2, farmer.getPhone());
                    ps.setString(3, farmer.getVillage());
                    ps.setString(4, farmer.getState());

                    ps.addBatch();
                }

                int[] results = ps.executeBatch();
                con.commit();

                return results.length;

            } catch (SQLException e) {
                con.rollback();
                throw e;
            }

        } catch (SQLException e) {
            System.out.println("Batch registration failed: " + e.getMessage());
            return 0;
        }
    }

}
