# QDC-Assignment
>>>>>>> a20d8627106ef8f046a091b98c250f803cabb26b
=======
# Mini Laundry Order Management System (AI-First)

A lightweight order tracking API for a dry cleaning store.  
Built for fast execution, practical readability, and clear AI-assisted development reporting.

## Tech Stack

- Node.js
- Express.js
- In-memory storage (no database setup required)

## Setup Instructions

1. Clone/download this project.
2. Install dependencies:

```bash
npm install
```

3. Run the server:

```bash
npm run dev
```

Or run without nodemon:

```bash
npm start
```

Server runs on:

`http://localhost:4000`

## Features Implemented

### 1) Create Order

`POST /orders`

- Accepts customer name, phone number, garments, quantity, optional item price
- Auto-calculates:
  - `lineTotal` per garment
  - `totalAmount` per order
- Generates unique `orderId`

Example request:

```json
{
  "customerName": "Aarav Sharma",
  "phoneNumber": "9876543210",
  "garments": [
    { "garment": "Shirt", "quantity": 2 },
    { "garment": "Pants", "quantity": 1 }
  ]
}
```

### 2) Order Status Management

`PATCH /orders/:orderId/status`

Supported statuses:

- `RECEIVED`
- `PROCESSING`
- `READY`
- `DELIVERED`

### 3) View Orders

`GET /orders`

- List all orders
- Filter options:
  - `?status=READY`
  - `?search=<name-or-phone>`

### 4) Basic Dashboard

`GET /dashboard`

Returns:

- Total orders
- Total revenue
- Order count by status

## API Collection / Demo

Import `postman_collection.json` into Postman to test all endpoints quickly.

## AI Usage Report

### Tools Used

- ChatGPT/Codex (primary): architecture, endpoint scaffolding, README drafting
- Manual reasoning and debugging: payload validation logic and status transitions

### Sample Prompts Used

1. "Generate a minimal Node.js Express API for laundry order management with create/list/update-status/dashboard endpoints."
2. "Add request validation for garments, quantity, and optional custom pricing."
3. "Draft a README for assignment submission including setup, AI usage, and tradeoffs."

### Where AI Helped

- Initial project scaffolding and endpoint structure
- Boilerplate request/response flow
- README first draft

### What AI Got Wrong / Needed Improvement

- Missing strict validation for unsupported garments without custom price
- Needed clearer error messages for invalid payloads
- Required tightening of filtering behavior for status and search

### What I Improved Manually

- Added explicit validation and guarded error responses
- Added deterministic billing calculation per line item
- Improved API consistency and submission-quality documentation

## Tradeoffs

- Used in-memory storage for speed (data resets on restart)
- No authentication implemented
- No frontend UI included (Postman collection provided)
- No automated test suite yet

## If More Time Was Available

- Add persistent DB (MongoDB/PostgreSQL)
- Add authentication (admin/staff roles)
- Add estimated delivery date and garment-type analytics
- Add deployment (Render/Railway) with env-based config
- Add tests (unit + integration)

=======
# QDC-Assignment
>>>>>>> a20d8627106ef8f046a091b98c250f803cabb26b
