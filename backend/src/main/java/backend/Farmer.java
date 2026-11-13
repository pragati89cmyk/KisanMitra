package backend;

public class Farmer {

    private int farmerId;
    private String name;
    private String phone;
    private String village;
    private String state;

    // Constructor used when registering a new farmer
    public Farmer(String name, String phone, String village, String state) {
        this.name = name;
        this.phone = phone;
        this.village = village;
        this.state = state;
    }

    // Constructor used when retrieving a farmer from MySQL
    public Farmer(int farmerId, String name, String phone,
                  String village, String state) {
        this.farmerId = farmerId;
        this.name = name;
        this.phone = phone;
        this.village = village;
        this.state = state;
    }

    public int getFarmerId() {
        return farmerId;
    }

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }

    public String getVillage() {
        return village;
    }

    public String getState() {
        return state;
    }
}
