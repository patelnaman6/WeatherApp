/*
package Temperature;

import java.io.IOException;
import java.io.Reader;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class myBatisReadSpecific {

    public static void main(String args[]) throws IOException{

        Reader reader = Resources.getResourceAsReader("configuration.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();
        Temperature temp2 = new Temperature("'India'", "'2-Jan-2016'", 0);

        try{
            Temperature temp = session.selectOne("Temperature.Temperature.getSpecific", temp2);

            //Print the temp details
            System.out.println(temp.getCountry());
            System.out.println(temp.getDate());
            System.out.println(temp.getTemp());
        }
        catch(NullPointerException n) {
            System.out.println("The record does not exist");
        }
        session.commit();
        session.close();

    }
    
}
*/
