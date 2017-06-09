package chat;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by wangxin on 09/06/2017.
 */
public class ChatServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        String username = request.getParameter("username");
        String connect_username = request.getParameter("cusername");
        PrintWriter out = response.getWriter();


        Date now = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = dateFormat.format(now);

        String message = "hello!";
        String sender = connect_username;

        String status = "success";

//        time = "";
        String result = "{ \"result\": [" +
                "{\"msg\":\""+message + "1" +"\",\"sender\":\""+sender+"\",\"time\":\""+time+"\"}," +
                "{\"msg\":\""+message + "2" +"\",\"sender\":\""+username+"\",\"time\":\""+time+"\"}," +
                "{\"msg\":\""+message + "3" +"\",\"sender\":\""+sender+"\",\"time\":\""+time+"\"}" +
                "], \"status\":\""+status+"\"}";
        out.write(result);
        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
