package entity;

/**
 * Created by wangxin on 09/06/2017.
 */
public class Ack {
    private boolean ack;
    private String username;
    private String cusername;

    public Ack() {
    }

    public boolean isAck() {
        return ack;
    }

    public void setAck(boolean ack) {
        this.ack = ack;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCusername() {
        return cusername;
    }

    public void setCusername(String cusername) {
        this.cusername = cusername;
    }
}
