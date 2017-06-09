package entity;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.websocket.Session;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import db.DBConnect;

/**
 * Message entity
 * Created by YI on 2017/6/4.
 */

public class Message {
    public void send(String message, Session session) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            MessageInfo messageInfo = mapper.readValue(message, MessageInfo.class);
            String receiver = messageInfo.getReceiver();
            String sender = messageInfo.getSender();
            Session targetSession = UserPool.get(receiver);
            //System.out.println("target session " + targetSession.getId());
            //屏蔽状态关闭的用户
            if (!session.isOpen()) {
                UserPool.remove(receiver);
                return;
            }
            //发送消息
            DBConnect connect =new DBConnect();
            try {
                String chatNum = connect.getChatNum(sender, receiver);
                if(!chatNum.equals("")) {
                    connect.insert("INSERT INTO `web`.`message` (`sender`, `time`, `message`, `chat_number`) VALUES ('" + sender +
                            "', '" + messageInfo.getEmitTime() + "', '" + messageInfo.getMessage() + "', '" + chatNum + "');");
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
            targetSession.getBasicRemote().sendText(mapper.writeValueAsString(messageInfo));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
