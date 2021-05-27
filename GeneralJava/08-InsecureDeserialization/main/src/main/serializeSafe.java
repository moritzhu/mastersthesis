package main;
import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import java.io.IOException;

class serializeSafe {
    public static void main(String[] args) {
        DezSafeClass e=new DezSafeClass();
        try {
        FileOutputStream fileOut =
        new FileOutputStream("src/main/good.ser");
        ObjectOutputStream out = new ObjectOutputStream(fileOut);
        out.writeObject(e);
        out.close();
        fileOut.close();
        System.out.printf("Serialized data is saved");
        } catch (IOException i) {
        i.printStackTrace();
        }    }
}