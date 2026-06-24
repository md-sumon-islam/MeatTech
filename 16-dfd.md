# Data Flow Diagrams (DFD) - MeatTech Platform

The structural movement of data throughout the MeatTech platform is represented in the diagrams below.

## Level 0 DFD: Context Diagram

```mermaid
graph LR
    Customer((Customer)) -->|1. Browse Cuts & Pay| MeatTech[MeatTech Web Application Engine]
    MeatTech -->|2. Order Manifests & Specs| Butcher((Butcher / Supplier))
    Butcher -->|3. Stock Updates & Cold Logs| MeatTech
    MeatTech -->|4. Delivery Dispatches & Receipts| Customer