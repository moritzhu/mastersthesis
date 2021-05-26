package main.demo;

import java.nio.charset.Charset;
import java.security.SecureRandom;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.codec.Hex;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.security.crypto.scrypt.SCryptPasswordEncoder;

@Configuration
public class WebSecurityConfig 
  extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(AuthenticationManagerBuilder auth) 
      throws Exception {
        PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        
        //General Encryptor
        TextEncryptor encryptor = Encryptors.delux("pass", new String(Hex.encode("salt".getBytes(Charset.forName("utf-8")))));
        String encryptedText = encryptor.encrypt("Encrypted Text");
        System.out.println(encryptor.decrypt(encryptedText));
        //Password Encryptor
        Argon2PasswordEncoder argon2PasswordEncoder = new Argon2PasswordEncoder();
        BCryptPasswordEncoder bCryptPasswordEncoder =new BCryptPasswordEncoder(); //Defaults to 10 rounds
        Pbkdf2PasswordEncoder pbkdf2PasswordEncoder =new Pbkdf2PasswordEncoder("secret", 720000, 256); //Increasing iterations required
        SCryptPasswordEncoder sCryptPasswordEncoder = new SCryptPasswordEncoder((int) Math.pow(2, 16), 8, 1, 256, 16); 

        auth.inMemoryAuthentication()
          .withUser("user")
          .password(encoder.encode("user"))
          .roles("USER");
    }
}