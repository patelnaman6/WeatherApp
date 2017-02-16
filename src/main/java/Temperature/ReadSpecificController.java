package Temperature;

import java.io.IOException;
import java.io.Reader;
import java.util.concurrent.atomic.AtomicLong;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReadSpecificController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @RequestMapping("/temperature")
    public Temperature greeting() throws IOException{
        Reader reader = Resources.getResourceAsReader("configuration.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();
        Temperature temp2 = new Temperature("'India'", "'07-Jan-2016'", 0);
        Temperature temp = session.selectOne("Temperature.Temperature.getSpecific", temp2);
        return temp;
    }
}
