import org.apache.commons.lang.StringUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by wangxin on 30/05/2017.
 */
public class GetOrdersServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            request.setCharacterEncoding("UTF-8");
            String id = request.getParameter("id");//userid

            // get orders according to the userid from DB
            String results = "{\"orders\":[";
            int length = 2;// mock
            for (int i = 0; i < length; i++) {
                String order = "";
                order = "<?xml version=\\\"1.0\\\"?><Order><Date>6-"+(i+1)+"/2017</Date><Product><Color><Content>green</Content><Price>7</Price><Value>10079334</Value></Color><Shape><Content>egg</Content><Price>6</Price></Shape><Size><Width>8</Width><Height>8</Height><Price>18</Price></Size><Img>https://vinepair.com/wp-content/uploads/2017/05/GRASS-internal.jpg</Img><Number>1</Number></Product><Customer><Name>Sophia</Name><Address>火星</Address><PhoneNo>1234</PhoneNo></Customer><TotalPrice>31</TotalPrice></Order>";
                results = results + ((i > 0)?",":"") + "{\"content\":\"" + order + "\"}";
            }
            results = results + "]}";
            out.write(results);
            out.close();
        }
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
