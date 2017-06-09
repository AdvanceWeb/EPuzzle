package proxy;

import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

import javax.websocket.Session;
import java.lang.reflect.Method;

/**
 * Chat proxy
 * Created by YI on 2017/6/4.
 */
public class ChatProxy implements MethodInterceptor {
    private static ChatProxy chatProxy = new ChatProxy();

    public <T> T getProxy(Class<T> clazz) {
        return (T) Enhancer.create(clazz, this);
    }

    public static ChatProxy getInstance() {
        return chatProxy;
    }

    public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
        if(method.getName().equals("send")) {
            return  methodProxy.invokeSuper(o, objects);
        }
        return methodProxy.invokeSuper(o, objects);
    }
}
