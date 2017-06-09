package servlet;

import basex.XBaseConnect;
import org.apache.commons.lang.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Get the information of one made product.
 * Created by wangxin on 30/05/2017.
 */
public class GetInfoServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        request.setCharacterEncoding("UTF-8");
        String id = request.getParameter("id");
        XBaseConnect xBaseConnect = new XBaseConnect();
        String product=xBaseConnect.getInfo(id);
        Document document = null;
        try {
            document = DocumentHelper.parseText(product);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        Element root = document.getRootElement();
        Element color = root.element("Color");
        Element imgSrc=root.element("ImgSrc");
        Element size=root.element("Size");
        Element shape=root.element("Shape");
        Element  overview=root.element("Overview");
        String product_detail=StringUtils.join(new String[]{
                "\"color\":{\"content\":\""+color.element("Content").getText()+"\", \"price\":\""+color.element("Price").getText()+"\",\"color\":\""+color.element("Value").getText()+"\"}",
                "\"imgSrc\":\""+imgSrc.getText()+"\"",
                "\"size\":{\"size\":\""+size.element("Size").getText()+"\", \"width\":\""+size.element("Width").getText()+"\", \"height\":\""+size.element("Height").getText()+"\", \"price\" :\""+size.element("Price").getText()+"\"}",
                "\"shape\":{\"content\":\""+shape.element("Content").getText()+"\", \"price\":\""+shape.element("Price").getText()+"\"}",
                "\"overview\":\""+overview.getText()+"\""
        },",");
        String results = "{\"product\":" +
                "{" + product_detail + "}" +
                "}";
        //System.out.println("servlet.GetInfoServlet:"+results);
        out.write(results);
        out.close();
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
