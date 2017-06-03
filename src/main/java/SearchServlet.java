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
public class SearchServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            request.setCharacterEncoding("UTF-8");
            //todo handle the search
            String keyword = request.getParameter("keyword");
            // get data from the database

            String product0 = StringUtils.join(
                    new String[] {
                            "\"name\":\"Grass\"",
                            "\"id\":\"1\"",
                            "\"imgSrc\":\"https://vinepair.com/wp-content/uploads/2017/05/GRASS-internal.jpg\"",
                            "\"overview\":\"Grass theme puzzle.\""},
                    ",");
            String product1 = StringUtils.join(
                    new String[] {
                            "\"name\":\"Cat\"",
                            "\"id\":\"2\"",
                            "\"imgSrc\":\"http://img.mp.itc.cn/upload/20170210/eaa3278513374044bc27facd2de9efe7_th.jpg\"",
                            "\"overview\":\"Cat theme puzzle.\""},
                    ",");
            String product2 = StringUtils.join(
                    new String[] {
                            "\"name\":\"Minions\"",
                            "\"id\":\"3\"",
                            "\"imgSrc\":\"http://desk.fd.zol-img.com.cn/t_s1366x768c5/g1/M00/0E/02/Cg-4jVOtBs2Ie6pxAANqqZZMvRsAAOoUALrkqgAA2rB295.jpg\"",
                            "\"overview\":\"Minions theme puzzle.\""},
                    ",");

            String results = "{\"results\":[" +
                    "{" + product0 + "},"+
                    "{" + product1 + "},"+
                    "{" + product2 + "}"+
                    "]}";
            out.write(results);
            out.close();
        }
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
