import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Scanner;

/**
 * Created by wangxin on 2017/5/2.
 */
public class OnloadServlet extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            request.setCharacterEncoding("UTF-8");
            FileInputStream fis = new FileInputStream("/Users/wangxin/IdeaProjects/AdvancedWeb/EPuzzle/web/WEB-INF/class/production/EPuzzle/data/xml/product_specification.xml");
            Scanner is = new Scanner(fis);
            while(is.hasNextLine()){
                out.write(is.nextLine());
            }
            is.close();
            out.close();
        }
    }

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

    }
}
