package Temperature;

import java.io.IOException;
import java.io.Reader;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
public class InsertController {
    @RequestMapping(value = "/InsertData", method = RequestMethod.POST)
    public void insert(@RequestParam("country")String country, @RequestParam("date")String date, @RequestParam("temp")double temp) throws IOException{

        Reader reader = Resources.getResourceAsReader("configuration.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        Temperature Temp = new Temperature("'"+country+"'","'"+date+"'", temp);
        session.insert("Temperature.Temperature.insert", Temp);
        System.out.println("record inserted successfully");
        session.commit();
        session.close();

    }
}
