package basex;

import basex.BaseXClient;

import java.io.ByteArrayInputStream;
import java.io.IOException;

/**
 * This is a test for xbase and our server.
 * Created by dell on 2017/6/4.
 */
public class Test {
    public static void read() throws IOException {
        try (BaseXClient session = new BaseXClient("106.15.88.95", 1984, "admin", "admin")) {
            // create query instance
            final String input = "db:open('orders','orders/1496841499000a')";
            int i=0;
            try (BaseXClient.Query query = session.query(input)) {
                while (query.more()) {
                    System.out.println(query.next());
                    i++;
                }
            }
            System.out.println(i);
            session.execute("close");
        }

    }

    public static void write() throws IOException {
        BaseXClient session = new BaseXClient("106.15.88.95", 1984, "admin", "admin");
        session.execute("open orders");
        System.out.println(session.info());
        final String input = "<ProductSpecification>\n" +
                "        <Shape>\n" +
                "            <Content>egg</Content>\n" +
                "            <Price>6</Price>\n" +
                "        </Shape>\n" +
                "        <Color>\n" +
                "            <Content>green</Content>\n" +
                "            <Price>7</Price>\n" +
                "            <Value>0x99cc666</Value>\n" +
                "        </Color>\n" +
                "        <Size>\n" +
                "            <Size>8*8</Size>\n" +
                "            <Width>8</Width>\n" +
                "            <Height>8</Height>\n" +
                "            <Price>18</Price>\n" +
                "        </Size>\n" +
                "        <ImgSrc>https://vinepair.com/wp-content/uploads/2017/05/GRASS-internal.jpg</ImgSrc>\n" +
                "        <Overview>This is a theme of grass and glass~!</Overview>\n" +
                "</ProductSpecification>";
        session.replace("orders/1", new ByteArrayInputStream(input.getBytes()));
        System.out.println(session.info());
        session.execute("flush");
        session.execute("close");
    }

    public static void main(final String... args) throws IOException, IOException {
        // create session
      read();
    }
}

