package entity;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.websocket.Session;
import java.io.IOException;

/**
 * Created by YI on 2017/6/4.
 */

public class Message {
    public void send(String message, Session session) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            MessageInfo messageInfo = mapper.readValue(message, MessageInfo.class);
            String receiver = messageInfo.getReceiver();
            Session targetSession = UserPool.get(receiver);
            //屏蔽状态关闭的用户
            if (!session.isOpen()) {
                UserPool.remove(receiver);
                return;
            }
            //发送消息
            //TODO:消息保存至数据库
            targetSession.getBasicRemote().sendText(messageInfo.getMessage());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
