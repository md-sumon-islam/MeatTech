# Functional Requirements - MeatTech Platform

This document details the functional capabilities that the MeatTech application must provide to users, butchers/suppliers, and administrators.

## 1. User Account & Role Management
* **FR-1.1:** The platform must support three user roles: Customer, Supplier/Butcher, and System Administrator.
* **FR-1.2:** Users must be able to register using their email address, phone number, and delivery location coordinates.
* **FR-1.3:** The system must implement secure token-based sessions (JWT) for secure authentication.

## 2. Meat Inventory & Freshness Tracking
* **FR-2.1:** Suppliers must be able to list meat products specifying animal origin, cut type (e.g., ribeye, brisket), weight increments, and slaughter date.
* **FR-2.2:** The system must automatically update available inventory volumes in real-time when a customer completes a checkout transaction.
* **FR-2.3:** The platform must display cold-chain storage status tags (e.g., "Chilled at 2°C") for each batch to ensure food safety compliance.

## 3. Order Processing & Cold-Chain Logistics
* **FR-3.1:** Customers must be able to customize cut thickness and weight requirements before adding items to their digital shopping cart.
* **FR-3.2:** The system must compute real-time order pricing dynamically based on weight, current market base rate, and local delivery surcharges.
* **FR-3.3:** The platform must integrate a delivery tracking system showing order status milestones: "Order Placed", "Processing/Butchering", "In Cold Transit", "Delivered".