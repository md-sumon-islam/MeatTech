# Database Design Schema Profiles - MeatTech

This document defines the field constraints, primitive classifications, and relational dependencies used throughout the MeatTech database tables.

### 1. Table Object Name: `users`
| Field Label      | Primitive Data Type | System Constraints           | Context Operational Definition       |
|------------------|---------------------|------------------------------|--------------------------------------|
| `user_id`        | SERIAL              | PRIMARY KEY                  | System-generated user key.          |
| `full_name`      | VARCHAR(120)        | NOT NULL                     | Verified full legal name.            |
| `email`          | VARCHAR(255)        | NOT NULL, UNIQUE             | Primary communications channel handle|
| `password_hash`  | VARCHAR(255)        | NOT NULL                     | Salted bcrypt key string.            |
| `role_type`      | VARCHAR(30)         | NOT NULL (DEFAULT 'Client')  | Access control type check parameter. |

### 2. Table Object Name: `products`
| Field Label      | Primitive Data Type | System Constraints           | Context Operational Definition       |
|------------------|---------------------|------------------------------|--------------------------------------|
| `product_id`     | SERIAL              | PRIMARY KEY                  | System-generated product identifier.  |
| `batch_id`       | INT                 | FOREIGN KEY references BATCH | Backing supply batch tracker link.   |
| `cut_name`       | VARCHAR(100)        | NOT NULL                     | Commercial name of meat cut.         |
| `price_per_kg`   | NUMERIC(12,2)       | NOT NULL                     | Base currency unit cost indicator.   |
| `total_stock_kg` | NUMERIC(10,3)       | NOT NULL DEFAULT 0.000       | Remaining stock volume in kilograms. |