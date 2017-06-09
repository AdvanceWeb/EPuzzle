package chat;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import db.DBConnect;
import entity.Ack;
import entity.Message;
import entity.UserPool;
import proxy.ChatProxy;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.sql.SQLException;

/**
 * Created by YI on 2017/6/4.
 */

@SuppressWarnings("serial")
@ServerEndpoint(value="/chatroom/{username}")
public class OpenChatRoom {

    @OnOpen
    public void onOpen(Session session,@PathParam("username")String username) throws IOException {
        //去重
        if(UserPool.getUserPool().containsKey(username)){
            Session s = (Session) UserPool.getUserPool().get(username);
            s.getBasicRemote().sendText("{\"close\":\"true\"}");
            return;
        }
        //加入用户池
        UserPool.add(session,username);
        // System.out.println(username + " added to userpool!");
        // System.out.println("session id : " + session.getId());
        // System.out.println("session id in pool : " + ((Session)UserPool.getUserPool().get(username)).getId());
    }

    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        //给所有用户发送消息
        //System.out.println("onMessage： "+message);
        try {// Ack?
            ObjectMapper objectMapper = new ObjectMapper();
            Ack ack = objectMapper.readValue(message, Ack.class);
            if(UserPool.getUserPool().containsKey(ack.getCusername())) {
                Session s = (Session) UserPool.getUserPool().get(ack.getCusername());
                s.getBasicRemote().sendText(message);
                DBConnect connect =new DBConnect();
                try {
                    if (ack.isAck()) {
                        connect.insert("INSERT INTO `web`.`chat_history` (`user1`, `user2`) VALUES ('" + ack.getCusername() + "', '" + ack.getUsername() + "');");
                    }
                }
                catch (SQLException e){
                    e.printStackTrace();
                }
            }
        }
        catch (JsonMappingException e) {// Message?
            ChatProxy.getInstance().getProxy(Message.class).send(message, session);
        }
    }

    @OnError
    public void onError(Throwable throwable) {

    }

    @OnClose
    public void onClose(Session session) {
        //移除用户池
        UserPool.remove(session.getId());
    }
}
