package chat;

import db.DBConnect;
import entity.UserPool;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.Session;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Chat
 * Show history of chat
 * Invite chat
 * Created by wangxin on 09/06/2017.
 */
public class ChatServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        String username = request.getParameter("username");
        String connect_username = request.getParameter("cusername");
        PrintWriter out = response.getWriter();

        String status = "success";
        DBConnect connect =new DBConnect();
        try {
            String chatNum = connect.getChatNum(username,connect_username);
            if (chatNum.equals("")) {
                receiverAck(username, connect_username);
                out.write("wait!");
                try {
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            else {
                ResultSet rs = connect.executeQuery("SELECT * FROM `web`.`message` WHERE `chat_number`='" + chatNum + "';");
                String result = "{ \"result\": [";
                while (rs.next()) {
                    result += "{\"msg\":\"" + rs.getString("message")
                            + "\",\"sender\":\"" + rs.getString("sender")
                            + "\",\"time\":\"" + rs.getString("time") + "\"},";
                }
                result = result.substring(0, result.length() - 1);
                result += "], \"status\":\"" + status + "\"}";
                if (result.equals("{ \"result\": ], \"status\":\"" + status + "\"}")) {
                    result = "{ \"result\":[], \"status\":\"" + status + "\"}";
                }
                out.write(result);
            }
            out.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }

    protected void receiverAck(String username, String cusername){
        if(UserPool.getUserPool().containsKey(cusername)){
            Session s = (Session) UserPool.getUserPool().get(cusername);
            try {
                s.getBasicRemote().sendText("{\"invite\":\"true\", \"sender\":\""+username+"\"}");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
