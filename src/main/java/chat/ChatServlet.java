package chat;

import db.DBConnect;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
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
        System.out.println(connect_username);
        PrintWriter out = response.getWriter();


        Date now = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = dateFormat.format(now);

        String message = "hello!";

        String status = "success";
        DBConnect connect =new DBConnect();
        try {
            String chatNum = connect.getChatNum(username,connect_username);
            //TODO 将来可能转移到接受邀请处
            if (chatNum.equals("")) {
                connect.insert("INSERT INTO `web`.`chat_history` (`user1`, `user2`) VALUES ('" + username + "', '" + connect_username + "');");
            }
            ResultSet rs = connect.executeQuery("SELECT * FROM `web`.`message` WHERE `chat_number`='" + chatNum +  "';");
            String result = "{ \"result\": [";
            while (rs.next()) {
                result += "{\"msg\":\""+rs.getString("message")
                        +"\",\"sender\":\""+rs.getString("sender")
                        +"\",\"time\":\""+rs.getString("time")+"\"},";
            }
            result = result.substring(0,result.length()-1);
            result += "], \"status\":\""+status+"\"}";
            if(result.equals("{ \"result\": ], \"status\":\"" + status + "\"}")){
                result = "{ \"result\":[], \"status\":\"" + status + "\"}";
            }
            System.out.println(result);
            out.write(result);
            out.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
