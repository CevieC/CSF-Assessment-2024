package vttp.batch4.csf.ecommerce.controllers;


import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@Controller
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked""
  @PostMapping(path="/api/order")
    public ResponseEntity<String> postOrder(@RequestBody Order order) {
      try {
        Long orderId = poSvc.createNewPurchaseOrder(order);
        return ResponseEntity.ok(Collections.singletonMap("orderId", orderId));
      } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", "Error processing order"));
      }
    }
}
