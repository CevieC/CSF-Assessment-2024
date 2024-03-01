package vttp.batch4.csf.ecommerce.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp.batch4.csf.ecommerce.models.Order;

@Repository
public class PurchaseOrderRepository {

  @Autowired
  private JdbcTemplate template;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature
  @Transactional
  public void create(Order order) throws Exception {
    try {
        final String insertOrderSql = "INSERT INTO Orders (name, address, priority, comments) VALUES (?, ?, ?, ?)";
        template.update(insertOrderSql, order.getName(), order.getAddress(), order.getPriority(), order.getComments());

        final String queryForOrderId = "SELECT order_id FROM Orders WHERE name = ? AND address = ? ORDER BY order_id DESC LIMIT 1";
        Long orderId = template.queryForObject(queryForOrderId, new Object[]{order.getName(), order.getAddress()}, Long.class);

        final String insertLineItemSql = "INSERT INTO LineItems (order_id, prodId, quantity, name, price) VALUES (?, ?, ?, ?, ?)";
        for (LineItem item : order.getCart().getLineItems()) {
            template.update(insertLineItemSql, orderId, item.getProdId(), item.getQuantity(), item.getName(), item.getPrice());
        }
    } catch (Exception e) {
        Logger.getLogger(PurchaseOrderRepository.class.getName()).log();
        throw new Exception("Error creating order and line items in the database", e);
    }
  }
}
