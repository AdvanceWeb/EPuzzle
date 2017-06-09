package entity;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * MessageInfo entity
 * Created by YI on 2017/6/4.
 */

public class MessageInfo implements Serializable {
    private String sender;
    private String receiver;
    private String message;
    private String emitTime = LocalDateTime.now().toString().replace("T", " ");
    private boolean close;

    public MessageInfo() {
    }

    public MessageInfo(String sender, String receiver, String message) {
        this.sender = sender;
        this.receiver = receiver;
        this.message = message;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getEmitTime() {
        return emitTime;
    }

    public void setEmitTime(String emitTime) {
        this.emitTime = emitTime;
    }

    public boolean isClose() {
        return close;
    }

    public void setClose(boolean close) {
        this.close = close;
    }
}
