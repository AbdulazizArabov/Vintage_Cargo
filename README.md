# Vintage Cargo Web Application

## Project Description

Vintage Cargo is a front-end web application designed for a fictional global logistics and shipping company. The website presents the company's services, pricing, shipment information, customer support, user account pages, and a demo shipping-label creation feature.

The purpose of this project is to build a professional, user-friendly logistics website using core front-end technologies. It demonstrates how HTML, CSS, and JavaScript can be used together to create a multi-page web application with responsive layouts, interactive forms, navigation, authentication-style behavior, and customer support features.

This project was built as a final front-end development project to practice real-world website structure, page organization, visual design, responsive behavior, and JavaScript functionality.

## Project Goal

The main goal of Vintage Cargo is to provide users with an easy way to explore shipping services and interact with a logistics platform. Users can browse service options, view pricing, check shipment-related information, create a sample shipping label, register or log in through a demo system, and contact support.

The website is also size responsive where needed, meaning important layouts such as navigation, grids, forms, cards, and page sections adjust for smaller screens like tablets and mobile devices.

## Tech Stack Used

- HTML5 - Used to build the structure of all web pages.
- CSS3 - Used for styling, layout, colors, spacing, cards, responsive design, and page presentation.
- JavaScript - Used for interactivity such as mobile navigation, login/register behavior, label generation, FAQ toggle, support chat, and form handling.
- Font Awesome - Used for icons throughout the navigation, service cards, buttons, and footer.
- Google Fonts - Used to improve typography and overall visual style.
- JSON - Used for demo user data in `data/users.json`.
- Browser Storage - `localStorage` and `sessionStorage` are used for demo registration and login behavior.

## Main Features

- Responsive navigation bar with a mobile menu toggle.
- Multi-page website structure with separate pages for home, about, services, pricing, shipment dates, contact, support, login, registration, account, and label creation.
- Service pages for air freight, ocean freight, rail freight, and ground shipping.
- Professional logistics-themed homepage with hero section, service highlights, and call-to-action buttons.
- Demo user registration system using browser local storage.
- Demo login system using saved users and the provided JSON user data.
- Account page that displays the logged-in user's name.
- Demo logout functionality.
- Shipping label creation form with:
  - Origin address
  - Destination address
  - Package dimensions
  - Package weight
  - Email address
  - Service type
  - Tracking number preview
  - Estimated delivery date
  - Estimated price
- Pricing page with shipping plan information.
- Shipment dates page for displaying shipping and arrival information.
- Contact page with a form and company contact details.
- Support page with FAQ accordion behavior.
- Demo live-chat interaction on the support page.
- Shared header and footer design across pages.
- Responsive layouts for important page sections, grids, contact forms, pricing cards, and mobile navigation.

## Pages Included

- `index.html` - Homepage with hero section, service highlights, and call-to-action sections.
- `about.html` - Company information and background.
- `services.html` - Overview of available logistics services.
- `pricing.html` - Pricing information for shipping services.
- `shipment.html` - Shipment dates and tracking-related information.
- `contact.html` - Contact form and company contact details.
- `support.html` - FAQ section and demo chat support.
- `login.html` - Demo login page.
- `register.html` - Demo user registration page.
- `account.html` - User account page after login.
- `create-label.html` - Demo shipping label generator.
- `air-freight.html` - Air freight service details.
- `ocean-freight.html` - Ocean freight service details.
- `rail-freight.html` - Rail freight service details.
- `ground-shipping.html` - Ground shipping service details.

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

## How to Run the Project

This is a static front-end project. It does not require a database, backend server, or installation process.

### Option 1: Open Directly in a Browser

1. Download or open the project folder.
2. Find the `index.html` file.
3. Double-click `index.html` to open it in a web browser.

### Option 2: Run With a Local Server

Running the project with a local server is recommended because it helps load the JSON demo user data correctly.

If Python is installed, open a terminal in the project folder and run:

```bash
python -m http.server 8000
```

Then open this address in a browser:

```text
http://localhost:8000
```

## Demo Login Information

The project includes a demo user account:

```text
Email: demo@vintagecargo.com
Password: demo1234
```

Users can also create a new demo account through `register.html`. New users are saved in the browser's local storage.

## Responsive Design

The website includes responsive behavior where it is needed. The navigation changes into a mobile menu on smaller screens, and sections such as service cards, pricing cards, contact forms, dashboard cards, support sections, and label form rows adjust to fit different screen sizes.

This improves usability on desktops, tablets, and mobile devices.

## Screenshots

Screenshots can be added to this section to show the final appearance of the application.

Recommended screenshots:

- Homepage
- Services page
- Pricing page
- Login page
- Create Label page
- Support page
- Mobile navigation view

Example format:

```md
![Homepage Screenshot](assets/homepage-screenshot.png)
```

## Team Members

- Abdulaziz Arabov - Front-end, AI-native developer, designer, and project creator.

## Challenges Faced

During this project, some challenges included organizing multiple HTML pages, keeping the navigation consistent across the website, making the design responsive, and connecting JavaScript functionality to different forms and page elements.

Another challenge was creating a demo login and registration system without using a backend database. This was handled by using JSON demo data, local storage, and session storage.

## What I Learned

Through this project, I learned how to structure a complete multi-page website and connect all pages through consistent navigation and styling. I also practiced responsive design, form handling, DOM manipulation, browser storage, and JavaScript event listeners.

This project also helped me understand how a real business website can be organized with separate pages for services, pricing, contact, support, and user account features.

## Future Improvements

If more time were available, the project could be improved with:

- A real backend database for user accounts.
- Secure authentication instead of demo browser storage.
- Real shipment tracking connected to a shipping API.
- PDF generation for shipping labels.
- Online payment or quote request functionality.
- Admin dashboard for managing shipments and users.
- More animations and improved accessibility testing.
- Deployment to a public hosting platform.

### Demo Login and Account System

The project includes a demo login system. Users can log in with the demo account or create a new account through the registration page.

The project uses `localStorage`, `sessionStorage`, and `data/users.json` to simulate user authentication.

### Shipping Label Feature

The Create Label page allows users to enter shipping details such as address, package dimensions, weight, email, and service type.

After submitting the form, the website creates a preview with a tracking number, service type, estimated delivery date, and estimated price.

### Challenges and Learning

Some challenges included organizing many pages, keeping the design consistent, making layouts responsive, and creating demo account functionality without a backend.

I learned how to build a full front-end project, use JavaScript with forms, manage browser storage, and create a better user experience across multiple screen sizes.

### Future Improvements

Future improvements could include a real backend, secure login, real shipment tracking, PDF shipping label download, online payment, admin dashboard, and deployment online.

These improvements would make the project closer to a production-ready logistics platform.

### Final Conclusion

Vintage Cargo shows how HTML, CSS, and JavaScript can be used to create a complete, responsive, and interactive business website.

The project helped me practice important front-end development skills and understand how to organize a professional web application.

