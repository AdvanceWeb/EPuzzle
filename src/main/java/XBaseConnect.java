import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;


/**
 * This example shows how external variables can be bound to XQuery expressions.
 *
 * This example requires a running database server instance.
 * Documentation: http://docs.basex.org/wiki/Clients
 *
 * @author BaseX Team 2005-17, BSD License
 */
public final class XBaseConnect {
    

	public String add(String input, String orderId)  {
		BaseXClient session = null;
		try {
			session = new BaseXClient("106.15.88.95", 1984, "admin", "admin");
			session.execute("open orders");
			System.out.println(session.info());
			session.add("orders/" + orderId, new ByteArrayInputStream(input.getBytes()));
			System.out.println(session.info());
			session.execute("flush");
			session.execute("close");
			return "success";
		} catch (IOException e) {
			e.printStackTrace();
			return "failed";
		}


	}

	public String[] getOrders(ArrayList<String> lists) throws IOException {
		int length = lists.size();
		String[] content = new String[length];
		try (BaseXClient session = new BaseXClient("106.15.88.95", 1984, "admin", "admin")) {
			for (int i = 0; i < length; i++) {
				String input = "db:open('orders','orders/" + lists.get(i) + "')";
				try (BaseXClient.Query query = session.query(input)) {
					// loop through all results
					while (query.more()) {
						content[i] = query.next().replace("\n", "");
					}
				}

			}
			session.execute("close");
		}
		return content;
	}

	public String getInfo(String id) throws IOException {
		String output="";
		try (BaseXClient session = new BaseXClient("106.15.88.95", 1984, "admin", "admin")) {

			String input = "db:open('orders','orders/" + id + "')";
			try (BaseXClient.Query query = session.query(input)) {
				// loop through all results
				while (query.more()) {
					output=query.next();
				}
			}
			session.execute("close");
		}

		return output;
	}
}

