/*
package Temperature;

import java.io.IOException;
import java.io.Reader;
import java.util.List;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class myBatisReadAll {

    public static void main(String args[]) throws IOException{

        Reader reader = Resources.getResourceAsReader("configuration.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        //select contact all contacts		
        List<Temperature> Temperature = session.selectList("Temperature.Temperature.getAll");

        for(Temperature temp : Temperature ){
            System.out.println(temp.getCountry());
            System.out.println(temp.getDate());
            System.out.println(temp.getTemp());
        }

        System.out.println("Records Read Successfully ");
        session.commit();
        session.close();
    }
}
*/
