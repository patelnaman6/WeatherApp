package Temperature;

/**
 * Created by NAPatel on 06-Feb-17.
 */
public class Temperature {
    private String country;
    private String spe_date;
    private double temp;
    private int id;

    public Temperature(String country, String spe_date, double temp, int id) {
        super();
        this.country = country;
        this.spe_date=spe_date;
        this.temp=temp;
        this.id=id;
    }

    public Temperature(String country, String spe_date, double temp){
        super();
        this.country = country;
        this.spe_date = spe_date;
        this.temp = temp;
    }

    public Temperature(String country) {
        super();
        this.country = country;
    }

    public Temperature() {}

    public  String getCountry() {
        return this.country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public  String getDate() {
        return this.spe_date;
    }

    public void setDate(String date) {
        this.spe_date = date;
    }

    public  double getTemp() {
        return this.temp;
    }

    public void setTemp(double temp) {
        this.temp = temp;
    }

    public String toString(){
        StringBuilder sb = new StringBuilder();

        sb.append("Country = ").append(country).append(" - ");
        sb.append("Date = ").append(spe_date).append(" - ");
        sb.append("Temperature.Temperature = ").append(temp).append(" - ");
        return sb.toString();
    }

}
