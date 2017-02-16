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
public class DeleteController {
    @RequestMapping(value = "/DeleteData", method = RequestMethod.DELETE)
    public int delete(@RequestParam("id")int id) throws IOException{
        Reader reader = Resources.getResourceAsReader("configuration.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();
        //Delete operation
        try {
            session.delete("Temperature.Temperature.delete", id);
        }
        catch(Exception e) {
            System.out.println(e.getMessage());
        }
        session.commit();
        session.close();
        System.out.println("Record deleted successfully");
        return 0;
    }
}

/**

 localhost/projectname/temperature

 GET localhost/parameters/temperatures
 GET localhost/parameters/temperature/<temp_id>
 PUT localhost/parameters/temperature/<temp_id>
 DELETE localhost/parameters/temperature/<temp_id>
 */