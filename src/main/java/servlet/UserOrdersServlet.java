package servlet;

import basex.XBaseConnect;
import db.DBConnect;
import org.apache.commons.lang.StringUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 * Get the history of some customer's order.
 * Created by dell on 2017/6/4.
 */
public class UserOrdersServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter out = resp.getWriter();
        String username=req.getParameter("username");
        DBConnect connect =new DBConnect();
        ArrayList<String> orderlists = new ArrayList<>();

        try {
            ResultSet rs = connect.getOrders("select orderId from orders where username ='"+username+"'");
            while(rs.next()){
                orderlists.add(rs.getString("orderid"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        XBaseConnect xBaseConnect =new XBaseConnect();
        String[] orderxml=xBaseConnect.getOrders(orderlists);

        String results="{\"results\":[" ;
        for(int i=0;i<orderxml.length;i++){
            String product = StringUtils.join(
                    new String[] {
                            "\"content\":\""+orderxml[i]+"\""},
                    ",");
            results+="{" + product + "},";
        }
        results=results.substring(0,results.length()-1);
        results+= "]}";
        if(results.equals("{\"results\":]}")){
            results = "{\"results\":[]}";
        }

        connect.close();
        out.write(results);
        out.close();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
    }
}
