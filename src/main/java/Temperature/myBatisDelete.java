/*
package Temperature;

import java.io.IOException;
import java.io.Reader;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class myBatisDelete {

    public static void main(String args[]) throws IOException{

        Reader reader = Resources.getResourceAsReader("configuration.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();
        Temperature temp = new Temperature("'India'","'4-Jan-2016'", 30.0);

        //Delete operation
        session.delete("Temperature.Temperature.delete", temp);
        session.commit();
        session.close();
        System.out.println("Record deleted successfully");

    }

}
*/
