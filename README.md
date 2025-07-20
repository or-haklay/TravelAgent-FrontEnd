================================
FLIGHT ORDER MANAGEMENT SYSTEM
================================

A full-stack project simulating a CRM (Customer Relationship Management) system for managing flight orders. The system features user permissions, complex workflows, and data analysis dashboards. It was built using React on the client-side and Node.js with Express on the server-side.

--- KEY FEATURES ---

- User Management System:

  - Secure Registration and Login using JWT and bcrypt.
  - _3 Permission Levels:_ Customer, Agent, and Admin, each with distinct capabilities.
  - Personal profile editing.
  - Password reset by an Administrator.
  - Admins can change the roles of other users.

- Order Management Workflow:

  - Customers create new order requests with flight and passenger details.
  - Admins assign orders to agents for processing.
  - Agents update the order with complete flight details and pricing.
  - The order is sent to the customer for final approval.
  - Customers can approve or reject the proposal, which updates the order status.
  - Admins can edit any order at any stage and are the only ones who can permanently delete them.

- Admin Dashboards (Admin Only):

  - _Orders Manager:_ A graphical overview of all orders by status, and a table for managing all system orders.
  - _Users Manager:_ Separate tables for customers and agents, and a graphical overview of each agent's workload.

- Mini-Apps:
  - Currency converter with real-time exchange rates.
  - Weather application for any city.

--- TECHNOLOGY STACK ---

- Frontend: React, React Router, Formik, Joi, Bootstrap, react-hot-toast
- Backend: Node.js, Express
- Database: MongoDB, Mongoose
- Authentication: JSON Web Tokens (JWT), bcrypt

--- GETTING STARTED ---

To run the project on your local machine, follow these steps.

Prerequisites:

- Node.js (v16 or higher)
- npm / yarn
- MongoDB (you can use a local instance or an Atlas connection)

Installation:

1. Clone the repository:
   $ git clone [your-repository-url]
   $ cd [repository-folder]

2. Install Dependencies:
   Install the dependencies for both the server and the client.

   # Install server-side dependencies

   $ npm install

   # Install client-side dependencies

   $ cd client
   $ npm install

3. Set Up Environment Variables:
   Create a .env file in the root directory of the project (the server-side) and add the following variables:

   PORT=3001
   MONGO_URI="your_mongodb_connection_string"
   JWT_KEY="your_secret_jwt_key"
   WEATHER_API_KEY="your_weatherapi.com_api_key"
   COIN_API_KEY="your_currencyapi.com_api_key"

4. Run the Project:
   Open two separate terminals.

   - In the first terminal, run the server:
     $ npm run dev

   - In the second terminal, run the React client:
     $ cd client
     $ npm start

   The application should now be available at http://localhost:3000.

--- AUTHOR ---

Or

- GitHub: [Your GitHub Profile Link]
- LinkedIn: [Your LinkedIn Profile Link]
