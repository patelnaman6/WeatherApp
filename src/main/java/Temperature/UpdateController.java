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
public class UpdateController {
    @RequestMapping(value = "/UpdateData", method = RequestMethod.PUT)
    public int update(@RequestParam("country")String country, @RequestParam("date")String date, @RequestParam("temp")double Temp, @RequestParam("id")int id) throws IOException{

        Reader reader = Resources.getResourceAsReader("configuration.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();
        Temperature temp = new Temperature("'"+country+"'","'"+date+"'",Temp, id);
        session.update("Temperature.Temperature.update",temp);
        System.out.println("Record updated successfully");
        session.commit();
        session.close();
        return 0;
    }
}
