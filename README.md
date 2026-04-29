# Vintage Cargo

Vintage Cargo is a responsive front-end website for a fictional global logistics company. The project presents shipping services, pricing, shipment dates, contact/support flows, account pages, and a demo shipping-label generator.

## Features

- Responsive multi-page layout for desktop and mobile
- Home, About, Services, Pricing, Shipment Dates, Contact, Support, Login, Register, Account, and Create Label pages
- Service pages for air freight, ocean freight, rail freight, and ground shipping
- Mobile navigation menu with toggle behavior
- Demo registration and login using `localStorage`, `sessionStorage`, and `data/users.json`
- Shipping label preview with tracking number, estimated delivery date, and price estimate
- Support FAQ accordion and demo live-chat interaction
- Shared styling with custom CSS and Font Awesome icons

## Project Structure

```text
.
+-- index.html
+-- about.html
+-- services.html
+-- pricing.html
+-- shipment.html
+-- contact.html
+-- support.html
+-- login.html
+-- register.html
+-- account.html
+-- create-label.html
+-- air-freight.html
+-- ocean-freight.html
+-- rail-freight.html
+-- ground-shipping.html
+-- assets/
+-- css/
|   +-- style.css
+-- data/
|   +-- users.json
+-- JavaScript/
    +-- script.js
```

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Font Awesome
- Google Fonts

## How to Run

This is a static front-end project, so it does not require a build step.

For the best experience, run it with a local server so `data/users.json` can be loaded correctly:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

You can also open `index.html` directly in a browser, but some browser security settings may block loading the JSON user data from the `data` folder.

## Demo Login

Use this demo account:

```text
Email: demo@vintagecargo.com
Password: demo1234
```

New users can also register through `register.html`. Registered users are saved in the browser's local storage.

## Main Pages

- `index.html` - Landing page with service highlights and calls to action
- `services.html` - Overview of logistics services
- `pricing.html` - Shipping plan and pricing information
- `shipment.html` - Shipment date and tracking information
- `create-label.html` - Demo form for creating a shipping label preview
- `support.html` - FAQ and demo chat support
- `login.html`, `register.html`, `account.html` - Demo authentication flow

## Notes

- This project is front-end only and uses browser storage for demo authentication.
- The shipping label download button is a demo interaction and does not generate a real PDF.
- Pricing and delivery estimates are calculated in `JavaScript/script.js` for demonstration purposes.

## Author

Abdulaziz Arabov
