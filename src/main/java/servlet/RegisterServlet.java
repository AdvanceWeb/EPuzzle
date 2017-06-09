package servlet;

import db.DBConnect;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

/**
 * Register a account
 * Created by dell on 2017/5/31.
 */

public class RegisterServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        String username=request.getParameter("username");
        String password=request.getParameter("password");
        String nickname =request.getParameter("nickname");
        DBConnect connect = new DBConnect();
        PrintWriter out =response.getWriter();
        String results="";
        try {
            connect.register("insert into user values('"+username+"','"+password+"','"+nickname+"')");
            results = "{\"results\":\"success\"}";

        } catch (SQLException e) {
            e.printStackTrace();
        }
        out.write(results);
        connect.closeforInsert();
        out.close();

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
