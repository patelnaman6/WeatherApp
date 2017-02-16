package Temperature;

import java.io.IOException;
import java.io.Reader;
import java.util.List;

import org.json.simple.JSONObject;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
public class ReadAllController {
    @RequestMapping(value = "/ReadAllRecordsData", method = RequestMethod.GET)
    public Temperature[] readAll() throws IOException{
        Reader reader = Resources.getResourceAsReader("configuration.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();
        Temperature TEMP[];
        int count = 0;

        List<Temperature> Temperature = session.selectList("Temperature.Temperature.getAll");
        TEMP = new Temperature[Temperature.size()];

        for(Temperature temp : Temperature) {
            Temperature t = new Temperature(temp.getCountry(), temp.getDate(), temp.getTemp(), temp.getId());
            TEMP[count++] = t;
        }

        return TEMP;
    }
}
