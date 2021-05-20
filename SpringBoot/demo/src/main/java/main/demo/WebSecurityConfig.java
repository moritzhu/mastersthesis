package main.demo;

import java.security.SecureRandom;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

        //Password encoders
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