

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by dell on 2017/5/31.
 */

public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        String username = request.getParameter("username");
        String password = request.getParameter("password");
//        System.out.println(username+" "+password);
        PrintWriter out = response.getWriter();
        String nickname="";
        DBConnect connect = new DBConnect();
        String true_pass = null;
        ResultSet resultSet = null;
        String results="";
        try {
            resultSet= connect.login("select password,nickname from user where username ='" + username+"'");
            resultSet.next();
            if (resultSet == null) {
                results = "{\"results\":\"failed\"}";
            }else {
                true_pass = resultSet.getString(1);
                nickname = resultSet.getString(2);
                if (password.equals(true_pass)) {
                    results = "{\"results\":\"success\",\"nickname\":\""+nickname+"\"}";
                    System.out.println(results);
                } else {
                    results = "{\"results\":\"failed\"}";
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        connect.close();
        out.write(results);
        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
            doPost(request,response);
    }
}
