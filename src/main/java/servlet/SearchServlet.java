package servlet;

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

/**
 * Search according to the key word.
 * Created by wangxin on 30/05/2017.
 */
public class SearchServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            request.setCharacterEncoding("UTF-8");
            //todo handle the search
            String keyword = request.getParameter("keyword");
            // get data from the database
            DBConnect connect = new DBConnect();
            ResultSet rs = null;
            rs=connect.getSearch("SELECT * FROM madeproducts WHERE name LIKE '%"+keyword+"%'");
            String results="{\"results\":[" ;
            while(rs.next()){
                String product = StringUtils.join(
                    new String[] {
                            "\"name\":\""+rs.getString("name")+"\"",
                            "\"id\":\""+rs.getString("id")+"\"",
                            "\"imgSrc\":\""+rs.getString("imgSrc")+"\"",
                            "\"overview\":\""+rs.getString("overview")+"\""},
                    ",");
                results+="{" + product + "},";

            }
            results=results.substring(0,results.length()-1);
            results+= "]}";
            //System.out.println("servlet.SearchServlet:"+results);
            out.write(results);
            out.close();
            connect.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
