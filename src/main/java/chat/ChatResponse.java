package chat;

/**
 * Created by YI on 2017/6/4.
 */

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;


@SuppressWarnings("serial")
public class ChatResponse extends HttpServlet {

    public ChatResponse() {
        super();
    }

    public void destroy() {
        super.destroy();
    }


    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doPost(request, response);
    }


    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        //response.setContentType("text/html;charset=utf-8");
        //request.setCharacterEncoding("utf-8");
        String sender = request.getParameter("sender");
        String receiver = request.getParameter("receiver");
        System.out.println("sender:" + sender + "\n" + "receiver:" + receiver);
        String message = request.getParameter("message");
        Date now = new Date();    //创建日期对象，及系统当前时间
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        String time = dateFormat.format(now); //按照给定的日期格式获取系统当前时间
        String t = (String) request.getSession().getAttribute("nameSession");  //获取登陆页面用户名
        //TODO:保存消息至数据库，向另一人的session发送消息
    }

    public void init() throws ServletException {
        // Put your code here
    }

}