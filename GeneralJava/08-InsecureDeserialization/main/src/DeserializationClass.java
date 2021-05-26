import java.io.*;

public class DeserializationClass {
    public static void main(String[] args) {
        try {

            String fname = "GeneralJava/08-InsecureDeserialization/main/src/malicious.ser";  // "good" object

            FileInputStream fin = new FileInputStream(fname);
            ObjectInputStream oin = new ObjectInputStream(fin);

            oin.readObject();  // actual deserialization process happens here
            oin.close();
            fin.close();
            System.out.println("The object was read from " + fname + ":");
            System.out.println();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}