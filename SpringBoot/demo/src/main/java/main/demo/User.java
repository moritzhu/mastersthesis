package main.demo;

import javax.annotation.Generated;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String name;
    private String nachname;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getNachname() {
        return nachname;
    }
    public void setNachname(String nachname) {
        this.nachname = nachname;
    }
    public User(String name, String nachname) {
        this.name = name;
        this.nachname = nachname;
    }

    public User(){
    }
    @Override
    public String toString() {
        return "User [id=" + id + ", nachname=" + nachname + ", name=" + name + "]";
    }


    
}
