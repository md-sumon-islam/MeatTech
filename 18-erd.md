# Entity Relationship Diagram (ERD) - MeatTech

The relational mapping diagram below details the entity schemas, key requirements, and structural dependencies defining the MeatTech platform.

```mermaid
erDiagram
    USERS {
        int user_id PK
        string full_name
        string email UK
        string password_hash
        string role_type
        datetime joined_at
    }
    BATCHES {
        int batch_id PK
        int supplier_id FK
        string animal_origin
        datetime slaughter_date
        decimal storage_temperature
    }
    PRODUCTS {
        int product_id PK
        int batch_id FK
        string cut_name
        decimal price_per_kg
        decimal total_stock_kg
    }
    ORDERS {
        int order_id PK
        int customer_id FK
        string order_status
        decimal total_amount
        datetime placed_at
    }
    ORDER_ITEMS {
        int item_id PK
        int order_id FK
        int product_id FK
        decimal customized_thickness_mm
        decimal requested_weight_kg
        decimal calculated_price
    }

    USERS ||--o{ BATCHES : manages
    BATCHES ||--|{ PRODUCTS : partitions
    USERS ||--o{ ORDERS : places
    ORDERS ||--|{ ORDER_ITEMS : contains
    PRODUCTS ||--o{ ORDER_ITEMS : satisfies