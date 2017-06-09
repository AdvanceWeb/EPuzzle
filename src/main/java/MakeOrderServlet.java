import db.DBConnect;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * This servlet is used to make an order
 */
public class MakeOrderServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            request.setCharacterEncoding("UTF-8");
            //todo handle the order
            DBConnect connect = new DBConnect();
            String order = request.getParameter("order");
            String username=request.getParameter("username");
            String orderId  =request.getParameter("orderId");
            XBaseConnect xBaseConnect = new XBaseConnect();
            xBaseConnect.add(order,orderId);
            connect.makeOrder("insert into orders values('"+username+"','"+orderId+"')");
            connect.closeforInsert();
            String results="{\"results\":\"success\"}";
            out.write(results);
            out.close();
        }
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
