# Acceptance Criteria

### Scenario 1: Custom Meat Cut Selection
* **Given** that the user is on a specific product detail page (e.g., Mutton).
* **When** they click on the "Customize Cut" drop-down menu.
* **Then** they should see options for "Curry Cut", "BBQ Strips", and "Mince".
* **And** selecting an option should dynamically update the processing fee (if applicable) in the total price summary before adding to the cart.

### Scenario 2: Sourcing Traceability QR Code
* **Given** that an order has been successfully delivered.
* **When** the customer scans the QR code printed on the physical vacuum package using the MeatTech app scanner.
* **Then** the app must display a dedicated page showing: Farm Name, Livestock Vaccination Status, Slaughter Timestamp, and Packaging Hub Location.