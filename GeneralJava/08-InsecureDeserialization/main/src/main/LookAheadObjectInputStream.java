package main;

import java.io.*;

//Taken from https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html#harden-your-own-javaioobjectinputstream
public class LookAheadObjectInputStream extends ObjectInputStream {

    public LookAheadObjectInputStream(InputStream inputStream) throws IOException {
        super(inputStream);
    }

    @Override
    protected Class<?> resolveClass(ObjectStreamClass desc) throws IOException, ClassNotFoundException {
        if (!desc.getName().equals(DezSafeClass.class.getName())) {
            throw new InvalidClassException("Unauthorized deserialization attempt", desc.getName());
        }
        return super.resolveClass(desc);
    }
}