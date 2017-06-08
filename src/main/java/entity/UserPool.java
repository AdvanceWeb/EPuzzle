package entity;

import javax.websocket.Session;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by YI on 2017/6/4.
 */

public class UserPool {
    private static Map<String, Object> USER_POOL = new HashMap<String, Object>();

    public static void add(Session session, String username) {
        USER_POOL.put(username, session);
    }

    public static void remove(String username) {
        USER_POOL.remove(username);
    }

    public static Session get(String username) {
        return (Session) USER_POOL.get(username);
    }

    public static Map<String, Object> getUserPool() {
        return USER_POOL;
    }
}
