package Temperature;

import java.io.IOException;
import java.io.Reader;
import java.util.List;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
public class ChartController {
    @RequestMapping(value = "/ReadChartData", method = RequestMethod.GET)
    public Temperature[] readChart() throws IOException{
        Reader reader = Resources.getResourceAsReader("configuration.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        Temperature TEMP[];
        int count = 0;

        List<Temperature> Temperature = session.selectList("Temperature.Temperature.getAllChart");
        TEMP = new Temperature[Temperature.size()];
        for(Temperature temp : Temperature) {
            Temperature t = new Temperature(temp.getCountry());
            TEMP[count++] = t;
        }
        return TEMP;
    }
}
