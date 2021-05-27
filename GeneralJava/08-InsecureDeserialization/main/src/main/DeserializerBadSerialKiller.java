package main;

import java.io.*;
import org.nibblesec.tools.SerialKiller;
public class DeserializerBadSerialKiller {
    public static void main(String[] args) {
        try {

            String fname = "src/main/malicious.ser";  // "bad" object

            FileInputStream fin = new FileInputStream(fname);
            ObjectInputStream ois = new LookAheadObjectInputStream(fin);
            ois.readObject();  // actual deserialization process happens here
            ois.close();
            fin.close();
            System.out.println("The object was read from " + fname + ":");
            System.out.println();


        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}