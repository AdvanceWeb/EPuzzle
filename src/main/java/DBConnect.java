

import java.sql.*;


/**
 * Created by dell on 2017/6/2.
 */
public class DBConnect {
    public static final String url = "jdbc:mysql://106.15.88.95:3306/web";
    public static final String name = "com.mysql.jdbc.Driver";
    public static final String user = "root";
    public static final String password = "fdu14WEB";

    public Connection conn = null;
//    public PreparedStatement pst = null;
   public Statement stmt;
   public ResultSet rs;
   public DBConnect() {
        try {
            Class.forName(name);//指定连接类型
            conn =  DriverManager.getConnection(url, user, password);//获取连接
            stmt=  conn.createStatement();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public ResultSet login(String sql) throws SQLException {
        try {

             rs = stmt.executeQuery(sql);//创建数据对象
             return rs;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
    public String register(String sql) throws SQLException {
        try {
            stmt.executeUpdate(sql);
            return "success";
        } catch (SQLException e) {

            e.printStackTrace();
            return "failed";

        }
    }
    public void makeOrder(String sql) {
       try{
           stmt.executeUpdate(sql);
       }catch (SQLException e){
           e.printStackTrace();
       }
    }
    public ResultSet getOrders(String sql) throws SQLException {
        rs=stmt.executeQuery(sql);
        return rs;
    }
    public boolean check(String sql) throws SQLException {
        try {
            rs=stmt.executeQuery(sql);
            rs.last();
            if(rs.getRow()==0){
                return true;
            }else{
                return false;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return false;

        }

    }
    public ResultSet getSearch(String sql) throws SQLException {
        rs=stmt.executeQuery(sql);
        return rs;
    }

    public void close() {
        try {
            rs.close();
            stmt.close();
            this.conn.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public void closeforInsert(){
        try {
            stmt.close();
            this.conn.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
