import db.DBConnect;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

/**
 * Created by dell on 2017/6/3.
 */
public class CheckServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
       System.out.println("check");
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        String username=request.getParameter("username");
        DBConnect connect = new DBConnect();
        String results;
        boolean check_result = false;
        try {
            check_result=connect.check("select* from user where username ='"+username+"'");
        } catch (SQLException e) {
            e.printStackTrace();
        }
        PrintWriter out = response.getWriter();
        if(!check_result){
            results = "{\"results\":\"false\"}";
        }else{
            results = "{\"results\":\"true\"}";
        }
        connect.close();
        out.write(results);
        out.close();

    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response){

    }

}
