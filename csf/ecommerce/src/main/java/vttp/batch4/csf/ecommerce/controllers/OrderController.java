package vttp.batch4.csf.ecommerce.controllers;


import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@Controller

@RequestMapping("/api")
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked""
  @PostMapping(path="/order")
    public ResponseEntity<Map<String, String>> postOrder(@RequestBody Order order) {
      try {
        poSvc.createNewPurchaseOrder(order);
        String orderId = order.getOrderId();
        return ResponseEntity.ok(Collections.singletonMap("orderId", orderId));
      } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", "Error processing order"));
      }
    }
}
