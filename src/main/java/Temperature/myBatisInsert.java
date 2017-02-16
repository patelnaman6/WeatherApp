package Temperature;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.Reader;

public class myBatisInsert {
    public static void main(String args[]) throws IOException {

        Reader reader = Resources.getResourceAsReader("configuration.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        Temperature temp = new Temperature("'India'", "'04-Jan-2016'", 30);
        session.insert("Temperature.Temperature.insert", temp);
        System.out.println("record inserted successfully");
        session.commit();
        session.close();
    }
}
