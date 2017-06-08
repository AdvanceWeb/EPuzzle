package fdu;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by YI on 2017/6/4.
 */

@SuppressWarnings("serial")
public class ChatHistory extends HttpServlet {

    public ChatHistory() {
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
        String user = request.getParameter("id");
        System.out.println("history id:" + user);
        //TODO:从数据库中提取聊天历史并存入response
    }

    public void init() throws ServletException {
        // Put your code here
    }

}