package entity;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.websocket.Session;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import db.DBConnect;

/**
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
            System.out.println("target session " + targetSession.getId());
            //屏蔽状态关闭的用户
            if (!session.isOpen()) {
                UserPool.remove(receiver);
                return;
            }
            //发送消息
            DBConnect connect =new DBConnect();
            try {
                String chatNum = connect.getChatNum(sender, receiver);
                connect.insert("INSERT INTO `web`.`message` (`sender`, `time`, `message`, `chat_number`) VALUES ('" + sender +
                        "', '" + messageInfo.getEmitTime() + "', '" + messageInfo.getMessage() + "', '" + chatNum + "');");
            } catch (SQLException e) {
                e.printStackTrace();
            }
            targetSession.getBasicRemote().sendText(mapper.writeValueAsString(messageInfo));
        } catch (IOException e) {
            e.printStackTrace();
        }
//        ObjectMapper mapper = new ObjectMapper();
//        try {
//            //给所有用户发送消息
//            Set<String> keys = UserPool.getUserPool().keySet();
//            MessageInfo messageInfo = mapper.readValue(message, MessageInfo.class);
//            System.out.println("send! keys num = " + keys.size());
//            for (String key : keys) {
//                Session targetSession = UserPool.get(key);
//                //屏蔽状态关闭的用户
//                if (!targetSession.isOpen()) {
//                    UserPool.remove(targetSession.getId());
//                    continue;
//                }
//                //排除自己
//                if (targetSession.equals(session)) {
//                    continue;
//                }
//                targetSession.getBasicRemote().sendText(mapper.writeValueAsString(messageInfo));
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
    }
}
