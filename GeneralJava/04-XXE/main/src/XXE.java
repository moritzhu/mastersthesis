import org.w3c.dom.*;
import javax.xml.parsers.*;
import java.io.*;

public class XXE {
    public static void main(String[] args) throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        //Will cause an error if external entities are used
        factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);

        DocumentBuilder builder = factory.newDocumentBuilder();
        File basic = new File("src/basic.xml");
        File billionLaughs = new File("src/billionLaughsAttack.xml");

        Document docBasic = builder.parse(basic);
        System.out.println(docBasic.getElementsByTagName("to"));

        Document docBillionLaughs = builder.parse(billionLaughs);
        System.out.println(docBillionLaughs.getElementsByTagName("to"));
    }
}
