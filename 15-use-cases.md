# Use Case Specifications - MeatTech Platform

## Use Case 1: Purchase Customized Meat Selection
* **Actor:** Customer
* **Pre-conditions:** The customer is logged into their account and has selected a verified supplier within their regional delivery zone.
* **Post-conditions:** The transaction is processed, inventory values are decremented, and the butcher receives a notification detailing the cut requirements.

### Main Flow:
1. Customer searches the MeatTech catalog and selects a specific cut (e.g., Prime Beef Ribeye).
2. Customer selects optional parameters including thickness preference (e.g., 1.5 inches) and desired total weight.
3. Customer adds the item to the cart and navigates to the checkout view.
4. Customer reviews delivery logistics data and clicks "Place and Pay for Order".
5. The system communicates with the external payment processor, creates a secure payment record, drafts an immutable invoice ledger, and flags the item batch as allocated.

---

## Use Case 2: Update Batch Quality & Temperature Logs
* **Actor:** Supplier / Butcher
* **Pre-conditions:** The supplier is authenticated and holds an active workspace status.
* **Post-conditions:** The product listing transparency parameters update across the consumer interface.

### Main Flow:
1. Supplier accesses the MeatTech Inventory Dashboard.
2. Supplier selects an existing product batch number.
3. Supplier inputs new tracking metrics gathered from cold storage monitoring systems (e.g., Temperature: 1.8°C).
4. Supplier clicks "Commit Update".
5. The system sanitizes the telemetry figures, alters the relational data points in the system database, and clears the frontend cache for that product page.