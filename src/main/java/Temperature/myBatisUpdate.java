/*
package Temperature;


import java.io.IOException;
import java.io.Reader;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class myBatisUpdate {

    public static void main(String args[]) throws IOException{

        Reader reader = Resources.getResourceAsReader("configuration.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        Temperature temp2 = new Temperature("'India'", "'02-Jan-2016'", 0);
        Temperature temp = (Temperature) session.selectOne("Temperature.Temperature.getSpecific", temp2);

        try{
            //Print the temp details
            System.out.println("Current details of the temp are" );
            System.out.println(temp.toString());

        }
        catch(NullPointerException n) {
            System.out.println("The record does not exist");
        }

        temp2.setTemp(25);

        //Update the temp record
        session.update("Temperature.Temperature.update",temp2);
        System.out.println("Record updated successfully");
        session.commit();
        session.close();
    }

}
*/
