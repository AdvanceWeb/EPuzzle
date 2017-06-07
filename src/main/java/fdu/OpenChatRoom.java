package fdu;

import entity.Message;
import entity.UserPool;
import proxy.ChatProxy;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

/**
 * Created by YI on 2017/6/4.
 */

@SuppressWarnings("serial")
@ServerEndpoint("/chat")
public class OpenChatRoom {

    @OnOpen
    public void onOpen(Session session, String username) {
        //加入用户池
        UserPool.add(session,username);
    }

    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        //给所有用户发送消息
        ChatProxy.getInstance().getProxy(Message.class).send(message, session);
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
