package main;

import java.io.IOException;
import java.io.Serializable;

//This class will open the calculator if deserialized 
public class DezSafeClass implements Serializable {

    private void readObject(java.io.ObjectInputStream in) throws IOException, ClassNotFoundException{
        in.defaultReadObject();
        System.out.println("Do nothing bad...");
        
    }
}