package backend;

public class TestFarmerCount {
    public static void main(String[] args) {
        FarmerDAO dao = new FarmerDAO();

        int total = dao.countFarmers();

        System.out.println("Total registered farmers: " + total);
    }
}
