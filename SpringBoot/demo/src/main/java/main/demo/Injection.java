package main.demo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class Injection {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Autowired
    UserRepository userRepository;

    Logger logger = LoggerFactory.getLogger(Injection.class);

    @GetMapping("/javaUnsecure")
    public String javaUnsecure(){
        String input = "' OR 1=1";
        try {
            Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/newchema","root","password");  
            Statement stmt=con.createStatement();  
            ResultSet rs=stmt.executeQuery("SELECT * FROM user WHERE name='"+input); 
            String result ="Data:";
            while(rs.next()){
                result += rs.getString("name") + " \n" ;
            }
            logger.info(result);
            return(result);
        } catch (Exception e) {
            return("error");
        }
    }

    @GetMapping("/javaSecure")
    public String javaSecure(){
        String input = "' OR 1=1";
        try {
            Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/newchema","root","password");  
            PreparedStatement ps = con.prepareStatement("SELECT * FROM user WHERE name=?");
            ps.setString(1, input);
            ResultSet rs = ps.executeQuery(); 
            String result ="Data: ";
            while(rs.next()){
                result += rs.getString("name") + " \n" ;
            }
            logger.info(result);
            return(result);
        } catch (Exception e) {
            return("error");
        }
    }

    @GetMapping("/jdbcUnsecure")
    public String jdbcUnsecure(){
        String input = "' OR 1=1";
        String result = jdbcTemplate.queryForList("SELECT * FROM user WHERE name='"+ input).toString();
        logger.info(result);
        return(result);
    }

    @GetMapping("/jdbcSecure")
    public String jdbcSecure(){
        String input = "' OR 1=1";
        String sql = "SELECT * FROM user WHERE name= :name";
        SqlParameterSource namedParameters = new MapSqlParameterSource("name", input);
        String result = namedParameterJdbcTemplate.queryForList(sql,namedParameters).toString();
        logger.info(result);
        return(result);
    }

    @GetMapping("/jpaSecure")
    public String jpaUnsecure(){
        String input = "' OR 1=1";    
        String result = userRepository.findByName(input).toString();
        logger.info(result);    
        return(result);
    }
}
