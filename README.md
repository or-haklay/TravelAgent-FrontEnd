https://travelagentoh.netlify.app/ - live demo
users:
  agent1 - agent1@gmail.com - password123
  customer - customer2@gmail.com - password123


================================
FLIGHT ORDER MANAGEMENT SYSTEM
================================

A full-stack project simulating a CRM (Customer Relationship Management) system for managing flight orders. The system features user permissions, complex workflows, and data analysis dashboards. It was built using React on the client-side and Node.js with Express on the server-side.

--- IN-DEPTH FUNCTIONALITY ---

Below is a detailed explanation of the system's core features, highlighting the workflows and interactions between the different user types.

_User Management & Role-Based Access Control_
The core of the system is a clear separation of permissions between three user types, ensuring security and an organized workflow:

- _Customer:_ The base user role. Customers can create order requests, manage their personal details, and view their own order history. Their interaction is focused on their personal needs.
- _Agent:_ An internal user role. The agent's responsibility is to take a customer's request, process it, add precise flight details, set the price, and prepare it for final approval. Agents can only access orders assigned to them.
- _Admin:_ A super-user with full access to all parts of the system. Admins can view and edit all orders, manage all users (including changing roles and resetting passwords), and view dashboards that summarize system activity.
  The registration process is secured with password hashing (bcrypt) and token-based authentication (JWT).

_Order Management Workflow_
Every order in the system follows a defined lifecycle, ensuring all steps are completed in the correct sequence:

1. _Request Creation:_ A customer creates an initial request with basic details. The order enters the system with a 'Wait For Agent' status.
2. _Agent Assignment:_ An Admin reviews new orders and assigns each one to an available Agent.
3. _Order Processing:_ The assigned Agent works on the order, adding all missing details (flight numbers, exact times) and setting the final price. The status changes to 'In Progress'.
4. _Awaiting Customer Approval:_ Once the Agent's work is done, the order is sent to the customer for final approval. The status changes to 'Pending Customer Approval'.
5. _Customer's Decision:_ The customer reviews the final offer and can either approve or reject it.
   - Approval: The status changes to 'Confirmed', and the order is locked from further editing.
   - Rejection: The status reverts to 'In Progress', and the order is returned to the Agent for corrections.

_Admin Dashboards_
Administrators have access to dedicated dashboards that provide a high-level 'mission control' view of business activity:

- _Orders Manager:_ Displays a real-time overview of all orders categorized by status, using progress bars for quick analysis. It is a key tool for identifying bottlenecks and assigning new orders.
- _Users Manager:_ Provides a complete list of all customers and agents. It also includes a visual overview of each agent's _workload_ (number of assigned orders), helping admins distribute tasks efficiently.

_Mini-Apps_

- _Currency Converter:_ A utility for converting amounts between different currencies using real-time exchange rates.
- _Weather App:_ A simple tool to check the current weather and forecast for any city worldwide.

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
