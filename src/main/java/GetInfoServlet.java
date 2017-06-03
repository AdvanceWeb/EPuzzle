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
public class GetInfoServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            request.setCharacterEncoding("UTF-8");
            //todo handle the search
            String id = request.getParameter("id");
            //todo get product according to id, from the database
            String product = "";

            if(id.equals("1")) {
                product = StringUtils.join(
                        new String[]{
                                "\"color\":{\"content\":\"green\", \"price\":7, \"color\":\"0x99cc66\"}",
                                "\"imgSrc\":\"https://vinepair.com/wp-content/uploads/2017/05/GRASS-internal.jpg\"",
                                "\"size\":{\"size\":\"8*8\", \"width\":8, \"height\":8, \"price\" :18}",
                                "\"shape\":{\"content\":\"egg\", \"price\":6}",
                                "\"overview\":\"This is a theme of grass and glass~!\""
                        },
                        ",");
            }
            else if(id.equals("2")) {
                product = StringUtils.join(
                        new String[]{
                                "\"color\":{\"content\":\"red\", \"price\":5, \"color\":\"0xff6666\"}",
                                "\"imgSrc\":\"http://img.mp.itc.cn/upload/20170210/eaa3278513374044bc27facd2de9efe7_th.jpg\"",
                                "\"size\":{\"size\":\"8*8\", \"width\":8, \"height\":8, \"price\" :18}",
                                "\"shape\":{\"content\":\"triangle\", \"price\":8}",
                                "\"overview\":\"This is a theme of little cute cat~!\""
                        },
                        ",");
            }
            else if(id.equals("3")) {
                product = StringUtils.join(
                        new String[]{
                                "\"color\":{\"content\":\"blue\", \"price\":6, \"color\":\"0x99cccc\"}",
                                "\"imgSrc\":\"http://desk.fd.zol-img.com.cn/t_s1366x768c5/g1/M00/0E/02/Cg-4jVOtBs2Ie6pxAANqqZZMvRsAAOoUALrkqgAA2rB295.jpg\"",
                                "\"size\":{\"size\":\"8*8\", \"width\":8, \"height\":8, \"price\" :18}",
                                "\"shape\":{\"content\":\"egg\", \"price\":6}",
                                "\"overview\":\"This is a theme of minions banana!banana!banana!~!\""
                        },
                        ",");
            }
            String results = "{\"product\":" +
                    "{" + product + "}" +
                    "}";
            out.write(results);
            out.close();
        }
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
