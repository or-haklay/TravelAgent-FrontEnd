import { useState } from "react";

function Tutorial() {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (sectionName) => {
    setOpenSections((prevOpenSections) => ({
      ...prevOpenSections,
      [sectionName]: !prevOpenSections[sectionName],
    }));
  };

  return (
    <div className=" mt-5 pt-5 mb-5 gap-4 d-flex flex-column">
      <div className="row position-relative">
        <div className="col-4 col-md-3 position-sticky top-0 start-0 h-100 border-end p-md-3 p-0 my-5">
          <nav
            id="navbar-example3"
            className="h-100 flex-column align-items-stretch pe-4 border-end"
          >
            <div className="d-block" style={{ height: "70px" }}></div>
            <nav className="nav nav-pills flex-column">
              <a className="nav-link" href="#Introduction">
                Introduction
              </a>

              <button
                className="nav-link text-start"
                onClick={() => toggleSection("users")}
              >
                Users
              </button>
              {openSections.users && (
                <nav className="nav nav-pills flex-column">
                  <a className="nav-link ms-3 my-1" href="#usersGeneral">
                    General
                  </a>
                  <a className="nav-link ms-3 my-1" href="#Register">
                    Register
                  </a>
                  <a className="nav-link ms-3 my-1" href="#Login">
                    Login
                  </a>
                  <a className="nav-link ms-3 my-1" href="#EditUser">
                    Edit User
                  </a>
                  <a className="nav-link ms-3 my-1" href="#UserDetails">
                    User Details
                  </a>
                  <a className="nav-link ms-3 my-1" href="#ResetPassword">
                    Reset Password
                  </a>
                  <a className="nav-link ms-3 my-1" href="#ChangeUserRole">
                    Change User Role
                  </a>
                  <a className="nav-link ms-3 my-1" href="#UsersManager">
                    Users Manager
                  </a>
                </nav>
              )}
              <button
                className="nav-link text-start"
                onClick={() => toggleSection("orders")}
              >
                Orders
              </button>
              {openSections.orders && (
                <nav className="nav nav-pills flex-column">
                  <a className="nav-link ms-3 my-1" href="#ordersGeneral">
                    General
                  </a>
                  <a className="nav-link ms-3 my-1" href="#MakeNewOrder">
                    New Order
                  </a>
                  <a className="nav-link ms-3 my-1" href="#MyOrders">
                    My Orders
                  </a>
                  <a className="nav-link ms-3 my-1" href="#OrderDetails">
                    Order Details
                  </a>
                  <a className="nav-link ms-3 my-1" href="#OrdersManager">
                    Orders Manager
                  </a>
                  <a className="nav-link ms-3 my-1" href="#DeleteOrder">
                    Delete Order
                  </a>
                  <a className="nav-link ms-3 my-1" href="#UpdateOrder">
                    Update Order
                  </a>
                  <a className="nav-link ms-3 my-1" href="#ApproveOrder">
                    Approve Order
                  </a>
                </nav>
              )}
              <button
                className="nav-link text-start"
                onClick={() => toggleSection("miniApps")}
              >
                Mini Apps
              </button>
              {openSections.miniApps && (
                <nav className="nav nav-pills flex-column">
                  <a className="nav-link ms-3 my-1" href="#CoinsConverter">
                    Coin Converter
                  </a>
                  <a className="nav-link ms-3 my-1" href="#Weather">
                    Weather
                  </a>
                </nav>
              )}
            </nav>
          </nav>
        </div>

        <div className="col-8">
          <div
            data-bs-spy="scroll"
            data-bs-target="#navbar-example3"
            data-bs-smooth-scroll="true"
            className="scrollspy-example-2"
            tabindex="0"
          >
            <div id="Introduction">
              <h3>Introduction</h3>
              <p>Welcome to the documentation!</p>
              <p>
                Welcome to the system tutorial. This guide provides all the
                tools and knowledge you need to operate the platform
                effectively. We'll walk you step-by-step through the key
                processes—from the simple registration process, through managing
                your personal profile and viewing orders, all the way to
                performing advanced administrative actions. By the end of this
                tutorial, you'll be able to use all the system's features with
                complete confidence. Let's get started.
              </p>
            </div>
            <hr className="my-4" />
            <div id="Users">
              <h3>Users</h3>
            </div>
            <hr />
            <div id="usersGeneral">
              <div className="d-block" style={{ height: "70px" }}></div>
              <h4>User Types and Permissions</h4>
              <p>
                Our system features three user types, each with a different set
                of permissions tailored to their role. Understanding these roles
                will help you work efficiently and securely.{" "}
                <strong>
                  Every new user who registers automatically starts as a
                  'Customer'
                </strong>{" "}
                until an Administrator changes their role.
              </p>
              <h5>👤 Customer</h5>
              <ul>
                <li>
                  <strong>Create Orders:</strong> Can create new orders for
                  themselves.
                </li>
                <li>
                  <strong>Edit Orders:</strong> Can edit the details of their
                  created orders, as long as they have not yet been approved.
                </li>
                <li>
                  <strong>View History:</strong> Can view their entire personal
                  order history.
                </li>
              </ul>

              <h5>👥 Agent</h5>
              <ul>
                <li>
                  <strong>Manage Orders:</strong> Can edit orders assigned to
                  them up until the customer's final approval.
                </li>
                <li>
                  <strong>View Orders:</strong> Can view all orders that are
                  under their responsibility.
                </li>
              </ul>

              <h5>👑 Admin</h5>
              <ul>
                <li>
                  <strong>Full Order Control:</strong> Can view, edit, and
                  delete any order in the system. Only Admins have deletion
                  privileges.
                </li>
                <li>
                  <strong>User Management:</strong> Can change the permission
                  type of any user (e.g., promote a 'Customer' to an 'Agent').
                </li>
                <li>
                  <strong>Dashboard Access:</strong> Has access to management
                  dashboards that summarize data on all users and orders.
                </li>
                <li>
                  <strong>Revert to Edit:</strong> Can return approved orders to
                  an 'editable' state if necessary.
                </li>
              </ul>
            </div>
            <hr className="my-4" />
            <div id="Register">
              {" "}
              <div className="d-block" style={{ height: "70px" }}></div>
              <h4>Registration Guide: Fields & Instructions</h4>
              <p>
                To create a new account, please fill in the following fields.
                Fields marked with a red asterisk (
                <span className="required-star">*</span>) are required.
              </p>
              <h5>Personal & Login Details</h5>
              <ul>
                <li>
                  <strong>First Name:</strong> Your first name.
                </li>
                <li>
                  <strong>Last Name:</strong> Your last name.
                </li>
                <li>
                  <strong>Phone Number:</strong> Your contact phone number (must
                  be 9-12 digits).
                </li>
                <li>
                  <strong>Email:</strong> Your email address, which will be used
                  for logging in.
                </li>
                <li>
                  <strong>Password:</strong> A secure password (must be at least
                  6 characters).
                </li>
              </ul>
              <h5>Address Details</h5>
              <ul>
                <li>
                  <strong>Country:</strong> Your country of residence.
                </li>
                <li>
                  <strong>State:</strong> Your state or province (this field is
                  optional).
                </li>
                <li>
                  <strong>City:</strong> Your city of residence.
                </li>
                <li>
                  <strong>Street:</strong> Your street name.
                </li>
                <li>
                  <strong>House Number:</strong> Your house or building number.
                </li>
                <li>
                  <strong>Zip Code:</strong> Your postal or zip code.
                </li>
              </ul>
              <h5>Passport Details</h5>
              <ul>
                <li>
                  <strong>Passport Number:</strong> Your official passport
                  number.
                </li>
                <li>
                  <strong>Passport Date Expiry:</strong> The expiration date of
                  your passport.
                </li>
                <li>
                  <strong>Passport Country Code:</strong> The official 2-letter
                  code of the country that issued your passport (e.g.,{" "}
                  <code>US</code>, <code>GB</code>, <code>IL</code>).
                </li>
              </ul>
              <h5>How to Register</h5>
              <ol>
                <li>
                  <strong>Fill the form:</strong> Complete all required (
                  <span className="required-star">*</span>) fields with valid
                  information.
                </li>
                <li>
                  <strong>Correct errors:</strong> If a field is outlined in
                  red, it means the information is missing or incorrect. Please
                  read the message below the field and fix it.
                </li>
                <li>
                  <strong>Submit:</strong> The "Sign Up" button will become
                  active and clickable only after all required fields are filled
                  out correctly. Click it to create your account.
                </li>
              </ol>
            </div>
            <hr className="my-4" />
            <div id="Login">
              {" "}
              <div className="d-block" style={{ height: "70px" }}></div>
              <h4>Login Guide</h4>
              <p>
                Welcome back! This page is for existing users to sign in and
                access their accounts.
              </p>
              <h5>Required Information</h5>
              <ul>
                <li>
                  <strong>Email:</strong> Enter the email address you used to
                  register your account.
                </li>
                <li>
                  <strong>Password:</strong> Enter your account password.
                </li>
              </ul>
              <h5>How to Sign In</h5>
              <ol>
                <li>
                  <strong>Enter Your Credentials:</strong> Type your email and
                  password into the designated fields.
                </li>
                <li>
                  <strong>Activate the Button:</strong> The "Sign In" button
                  will become clickable once both fields are filled out.
                </li>
                <li>
                  <strong>Submit:</strong> Click the "Sign In" button to access
                  your dashboard. On success, you will see a "Welcome back!"
                  message and be taken to the home page.
                </li>
              </ol>
              <h5>Troubleshooting</h5>
              <ul>
                <li>
                  <strong>"Invalid email or password":</strong> If you see this
                  error message, please double-check that your email and
                  password are correct and try again.
                </li>
                <li>
                  <strong>Button is not clickable:</strong> If the "Sign In"
                  button is disabled, it means one or both of the fields are
                  empty. Please ensure you have entered both your email and
                  password.
                </li>
              </ul>
            </div>
            <hr className="my-4" />
            <div id="EditUser">
              {" "}
              <div className="d-block" style={{ height: "70px" }}></div>
              <h4>User Guide: Edit Profile Page</h4>
              <p>
                This page allows you to view and update your personal, address,
                and passport information. Your current details are pre-filled in
                the form below for your convenience.
              </p>
              <h5>Loading Your Data</h5>
              <p>
                When you first visit this page, you may see a brief loading
                message while we securely retrieve your current profile details
                to populate the form.
              </p>
              <h5>Updating Your Information</h5>
              <ul>
                <li>
                  <strong>Personal Details:</strong> You can update your first
                  name, last name, and phone number.
                </li>
                <li>
                  <strong>Address Details:</strong> Update your country, state
                  (optional), city, street, house number, and zip code.
                </li>
                <li>
                  <strong>Passport Details:</strong> Update your passport
                  number, its expiration date, and the 2-letter issuing country
                  code (e.g., US, IL).
                </li>
              </ul>
              <h5>How to Save Changes</h5>
              <ol>
                <li>
                  <strong>Edit Fields:</strong> Click on any field and type to
                  make your desired changes.
                </li>
                <li>
                  <strong>Check for Errors:</strong> The form validates your
                  input as you type. If a field is outlined in red, please
                  correct the information according to the message shown.
                </li>
                <li>
                  <strong>Save Your Profile:</strong> Once all your information
                  is valid, the "Save Changes" button will become clickable.
                  Click it to update your profile.
                </li>
              </ol>
              <h5>After Saving</h5>
              <ul>
                <li>
                  Upon a successful update, your profile information will be
                  saved, and you will be returned to the homepage with a
                  confirmation message.
                </li>
                <li>
                  If an error occurs during the process, you will be notified.
                  In this case, please try saving your changes again after a
                  moment.
                </li>
              </ul>
            </div>
            <hr className="my-4" />
            <div id="UserDetails">
              {" "}
              <div className="d-block" style={{ height: "70px" }}></div>
              <h4>User Guide: User Details Page</h4>
              <p>
                This page displays the detailed profile information for a
                specific user. As a regular user, you can only view your own
                profile. As an Administrator, you can access this page for any
                user in the system.
              </p>
              <h5>Displayed Information</h5>
              <p>
                The page is organized into three main sections: User
                Information, Address, and Passport Details. The "Role" field
                will clearly indicate if the user is a Customer, Agent, or
                Admin.
              </p>
              <h5>Available Actions & Buttons</h5>
              <p>
                At the top-right of the page, you will find several action
                buttons. The buttons you see depend on your role and whether you
                are viewing your own profile or someone else's.
              </p>
              <ul>
                <li>
                  <strong>Edit Profile (Pencil Icon):</strong> This button is
                  only visible on <strong>your own</strong> profile page.
                  Clicking it will take you to the 'Edit Profile' form, where
                  you can update your details.
                </li>
                <li>
                  <strong>Change User Role (Role Icon):</strong> This button is
                  available only to <strong>Admins</strong> when viewing another
                  user's profile. It opens a window to change the user's system
                  role (e.g., from Customer to Agent).
                </li>
                <li>
                  <strong>Reset Password (Key Icon):</strong> This allows an
                  authorized user (like an Admin) to begin the password reset
                  process for the account being viewed.
                </li>
                <li>
                  <strong>Delete User (Trash Icon):</strong> This option is for
                  permanently removing a user from the system. It will open a
                  confirmation window before proceeding, as this action is
                  irreversible.
                </li>
              </ul>
              <p>
                <strong>Note:</strong> Actions like deleting a user, resetting a
                password, or changing a role will open a pop-up window (modal)
                asking you to confirm your choice before the action is
                finalized.
              </p>
            </div>
            <hr className="my-4" />
            <div id="ResetPassword">
              {" "}
              <div className="d-block" style={{ height: "70px" }}></div>
              <h4>Password Management and Reset</h4>
              <p>
                There are two ways to update or reset a password in the system,
                depending on your needs and permissions.
              </p>
              <h5>Option 1: Updating Your Own Password</h5>
              <p>
                As a user, you can change your own password at any time from
                your profile page.
              </p>
              <ol>
                <li>
                  Navigate to your profile by clicking the 'Edit Profile' link
                  in the sidebar or on your details page.
                </li>
                <li>Find the password section within the editing form.</li>
                <li>Enter your new, secure password.</li>
                <li>Click the 'Save Changes' button to finalize the update.</li>
              </ol>
              <h5>Option 2: Admin-Initiated Reset</h5>
              <p>
                This option is used when a user has forgotten their password and
                is unable to log in. Only an Administrator can perform this
                action.
              </p>
              <ol>
                <li>
                  An <strong>Administrator</strong> navigates to the specific
                  user's 'User Details' page.
                </li>
                <li>
                  The Admin clicks the <strong>Reset Password</strong> button
                  (key icon).
                </li>
                <li>
                  A confirmation window will appear to prevent accidental
                  resets.
                </li>
                <li>
                  Upon confirmation, the user's password will be changed to a
                  temporary, default password.
                </li>
              </ol>
              <p>
                <strong>Important Security Note:</strong> After an Admin resets
                your password, you should log in immediately using the default
                password and then follow the steps in 'Option 1' to set a new,
                private password.
              </p>
            </div>
            <hr className="my-4" />
            <div id="ChangeUserRole">
              {" "}
              <div className="d-block" style={{ height: "70px" }}></div>
              <h4>Changing a User's Role</h4>
              <p>
                This is an administrative feature that allows an{" "}
                <strong>Administrator</strong> to manage system permissions by
                changing a user's role (e.g., promoting a 'Customer' to an
                'Agent').
              </p>
              <h5>How to Change a User's Role</h5>
              <ol>
                <li>
                  As an <strong>Administrator</strong>, navigate to the 'User
                  Details' page of the user whose role you wish to change.
                </li>
                <li>
                  Click the <strong>Change User Role</strong> button.
                </li>
                <li>
                  A pop-up window will appear, showing the user's current role
                  and the available roles to assign.
                </li>
                <li>
                  Select the new role from the options and confirm your choice.
                </li>
                <li>The user's permissions will be updated instantly.</li>
              </ol>
              <h5>Important Workflow: Creating a New Agent</h5>
              <p>
                To create a new Agent account, a specific two-step process must
                be followed:
              </p>
              <ol>
                <li>
                  First, the new user must create an account using the standard{" "}
                  <strong>Registration page</strong>. This automatically assigns
                  them the default 'Customer' role.
                </li>
                <li>
                  After registration, an <strong>Administrator</strong> must go
                  to that new user's 'User Details' page.
                </li>
                <li>
                  The Admin must then use the <strong>Change User Role</strong>{" "}
                  function to promote the user from 'Customer' to 'Agent'.
                </li>
              </ol>
              <p>
                <strong>Note:</strong> This role change must be completed{" "}
                <strong>before</strong> the new user attempts to perform any
                agent-specific actions in the system.
              </p>
            </div>
            <hr className="my-4" />
            <div id="UsersManager">
              {" "}
              <div className="d-block" style={{ height: "70px" }}></div>
              <h4>Admin Guide: User Management Dashboard</h4>
              <p>
                The User Management dashboard is a powerful tool for{" "}
                <strong>Administrators</strong> to view, access, and analyze all
                user accounts in the system. This page is accessible only to
                Admin-level users.
              </p>
              <h5>The User Tables</h5>
              <p>
                The page is divided into two main tables to help you easily
                distinguish between standard users and internal staff:
              </p>
              <ul>
                <li>
                  <strong>Users Manager Table:</strong> This table lists all{" "}
                  <strong>Customer</strong> accounts. It's useful for viewing
                  your entire customer base and accessing their profiles to see
                  their order history.
                </li>
                <li>
                  <strong>Agents Manager Table:</strong> This table lists all{" "}
                  <strong>Agent</strong> and <strong>Admin</strong> accounts. It
                  provides an overview of your internal team, their roles, and
                  their current order counts.
                </li>
              </ul>
              <h5>Interactive Table Features</h5>
              <ul>
                <li>
                  <strong>Viewing User/Agent Details:</strong> Clicking on any
                  user's <strong>Name</strong> in either table will navigate you
                  to their detailed profile page, where you can perform actions
                  like changing their role or resetting their password.
                </li>
                <li>
                  <strong>Viewing Orders:</strong> The <strong>Orders</strong>{" "}
                  column shows the total number of orders associated with that
                  user or agent.
                </li>
              </ul>
              <h5>Agent Workload Overview</h5>
              <p>
                At the bottom of the page, this section provides a quick visual
                summary of the current workload for each of your agents. Each
                progress bar shows the total number of orders assigned to an
                agent, and the color changes (green to yellow) to indicate a
                higher workload, helping you balance assignments effectively.
              </p>
            </div>
            <hr className="my-4" />
            <div id="Orders">
              <h3>Orders</h3>
            </div>
            <hr className="my-4" />
            <div id="ordersGeneral">
              {" "}
              <div className="d-block" style={{ height: "70px" }}></div>
              <h4>The Order Process Workflow</h4>
              <p>
                Creating and finalizing an order is a multi-step process
                involving different user roles to ensure all details are correct
                and confirmed. Here is a step-by-step overview of the workflow:
              </p>
              <h5>The Workflow Steps</h5>
              <ol>
                <li>
                  <strong>1. Order Creation:</strong> The process begins when a{" "}
                  <strong>Customer</strong> submits a new order request through
                  the 'Create New Order' form.
                </li>
                <li>
                  <strong>2. Agent Assignment:</strong> An{" "}
                  <strong>Administrator</strong> reviews the new request and
                  assigns an <strong>Agent</strong> to handle the specifics of
                  the booking.
                </li>
                <li>
                  <strong>3. Agent Processing:</strong> The assigned{" "}
                  <strong>Agent</strong> works on the order, confirms all
                  details, and updates it with a final price.
                </li>
                <li>
                  <strong>4. Customer Approval:</strong> Once the agent's
                  updates are complete, the order is sent to the{" "}
                  <strong>Customer</strong> for final review and approval.
                </li>
                <li>
                  <strong>5. Final Decision:</strong> The customer then has two
                  options:
                  <ul>
                    <li>
                      <strong>If Approved:</strong> The order is confirmed and
                      finalized. It can no longer be edited by the customer or
                      agent.
                    </li>
                    <li>
                      <strong>If Rejected:</strong> The order's status reverts,
                      allowing for further edits before it is sent for approval
                      again.
                    </li>
                  </ul>
                </li>
              </ol>
              <h5>Special Admin Permissions</h5>
              <p>
                It is important to note that an <strong>Administrator</strong>{" "}
                has the ability to edit any order, update its status, or cancel
                it at any stage, regardless of its current approval status.
              </p>{" "}
              <h4>The Order Process Workflow</h4>
              <p>
                Creating and finalizing an order is a multi-step process
                involving different user roles to ensure all details are correct
                and confirmed. Here is a step-by-step overview of the workflow:
              </p>
              <h5>The Workflow Steps</h5>
              <ol>
                <li>
                  <strong>1. Order Creation:</strong> The process begins when a{" "}
                  <strong>Customer</strong> submits a new order request through
                  the 'Create New Order' form.
                </li>
                <li>
                  <strong>2. Agent Assignment:</strong> An{" "}
                  <strong>Administrator</strong> reviews the new request and
                  assigns an <strong>Agent</strong> to handle the specifics of
                  the booking.
                </li>
                <li>
                  <strong>3. Agent Processing:</strong> The assigned{" "}
                  <strong>Agent</strong> works on the order, confirms all
                  details, and updates it with a final price.
                </li>
                <li>
                  <strong>4. Customer Approval:</strong> Once the agent's
                  updates are complete, the order is sent to the{" "}
                  <strong>Customer</strong> for final review and approval.
                </li>
                <li>
                  <strong>5. Final Decision:</strong> The customer then has two
                  options:
                  <ul>
                    <li>
                      <strong>If Approved:</strong> The order is confirmed and
                      finalized. It can no longer be edited by the customer or
                      agent.
                    </li>
                    <li>
                      <strong>If Rejected:</strong> The order's status reverts,
                      allowing for further edits before it is sent for approval
                      again.
                    </li>
                  </ul>
                </li>
              </ol>
              <h5>Special Admin Permissions</h5>
              <p>
                It is important to note that an <strong>Administrator</strong>{" "}
                has the ability to edit any order, update its status, or cancel
                it at any stage, regardless of its current approval status.
              </p>
            </div>
            <hr className="my-4" />
            <div id="MakeNewOrder">
              {" "}
              <div className="d-block" style={{ height: "70px" }}></div>
              <h4>User Guide: Creating a New Order</h4>
              <p>
                This page allows you to submit a new flight order request.
                Please note that a return flight is optional, but you must add
                at least one passenger. The order status and price will be
                determined later in the process.
              </p>
              <h5>Filling Out the Order Form</h5>
              <ol>
                <li>
                  <strong>Flight Details:</strong> In the first section, please
                  provide the required details for your departure flight,
                  including the origin, destination, and date.
                </li>
                <li>
                  <strong>Return Flight (Optional):</strong> The 'Return Flight'
                  section is <strong>entirely optional</strong>. If you are
                  booking a one-way trip, you can leave these fields blank.
                </li>
                <li>
                  <strong>Passengers:</strong> You must fill in the details for{" "}
                  <strong>at least one passenger</strong>. Use the 'Add
                  Passenger' button (+) to add more travelers to the order. If
                  you add too many, you can remove them with the (-) button.
                </li>
                <li>
                  <strong>Additional Notes:</strong> Use this optional text box
                  at the bottom to include any special requests or important
                  information regarding your trip.
                </li>
              </ol>
              <h5>What Happens After You Submit?</h5>
              <ul>
                <li>
                  <strong>Status:</strong> After you click 'Create Order', the
                  request is submitted and its initial status is set{" "}
                  <strong>automatically</strong>. You can track all status
                  changes from your 'My Orders' page.
                </li>
                <li>
                  <strong>Price:</strong> The final price is not calculated when
                  you submit the form. An{" "}
                  <strong>Agent will review your request</strong>, calculate the
                  total cost, and update the order with the final price.
                </li>
                <li>
                  <strong>Confirmation:</strong> Upon successful submission, you
                  will see a confirmation message and be taken to your list of
                  orders.
                </li>
              </ul>{" "}
            </div>
            <hr className="my-4" />
            <div id="MyOrders">
              {" "}
              <div className="d-block" style={{ height: "70px" }}></div>
              <h4>User Guide: My Orders Page</h4>
              <p>
                The 'My Orders' page is your personal dashboard for viewing and
                managing all orders associated with your account. The content
                you see depends on your role in the system.
              </p>
              <h5>What You Will See</h5>
              <ul>
                <li>
                  <strong>For Customers:</strong> This page displays a list of
                  all the flight orders <strong>you have created</strong>.
                </li>
                <li>
                  <strong>For Agents:</strong> This page displays all the client
                  orders that have been <strong>assigned to you</strong> for
                  management.
                </li>
              </ul>
              <p>
                Each order is presented on its own interactive 'Order Card',
                showing key summary details like the order date and status.
              </p>
              <h5>Page Features</h5>
              <ul>
                <li>
                  <strong>Order Count:</strong> At the top of the page, a
                  description will tell you the{" "}
                  <strong>total number of orders</strong> currently in your
                  list.
                </li>
                <li>
                  <strong>Loading Indicator:</strong> When you first open the
                  page, a loading message will be displayed while your order
                  data is being securely retrieved.
                </li>
                <li>
                  <strong>No Orders Message:</strong> If you have not created
                  any orders (or have no orders assigned to you), the page will
                  show a message letting you know your list is empty.
                </li>
              </ul>
              <h5>Interacting with Your Orders</h5>
              <p>
                You can click on any <strong>Order Card</strong> to navigate to
                the 'Order Details' page. From there, you can view the complete
                order information and, depending on your permissions, perform
                actions such as editing or approving the order.
              </p>
            </div>
            <hr className="my-4" />
            <div id="OrderDetails">
              {" "}
              <div className="d-block" style={{ height: "70px" }}></div>
              <h4>User Guide: Order Details Page</h4>
              <p>
                This page provides a complete, in-depth view of a single order.
                It's the central hub for tracking an order's progress, viewing
                all its information, and taking necessary actions.
              </p>
              <h5>Understanding the Layout</h5>
              <p>
                The page is divided into three main sections to organize all the
                information clearly:
              </p>
              <ul>
                <li>
                  <strong>Flight Details:</strong> Shows the departure and
                  return flight information, including dates, times, and flight
                  numbers.
                </li>
                <li>
                  <strong>Passengers:</strong> Lists every passenger included in
                  the order with their personal and passport details.
                </li>
                <li>
                  <strong>General Details:</strong> Displays the overall order
                  status, final price, and any additional notes.
                </li>
              </ul>
              <h5>Main Action Buttons (Top Right)</h5>
              <ul>
                <li>
                  <strong>Contact Info (Info Icon):</strong> As a customer, this
                  shows your agent's contact details. As an agent or admin, it
                  shows the customer's contact information.
                </li>
                <li>
                  <strong>Delete/Cancel Order (Trash Icon):</strong> This button
                  appears only when the order is in an editable state. It allows
                  you to request the cancellation (or deletion for Admins) of
                  the entire order.
                </li>
                <li>
                  <strong>Return to Orders (Arrow Icon):</strong> This button
                  will take you back to your main orders list page.
                </li>
              </ul>
              <h5>Editing an Order</h5>
              <p>
                Editing actions are only available when an order has a status
                that allows for changes (e.g., 'In Progress'). When an order is
                editable, you will see pencil icons next to the sections you can
                modify.
              </p>
              <ul>
                <li>
                  <strong>Editing Flights and General Details:</strong> Use the
                  pencil icon in each section to open a window where you can
                  update flight times, prices, or notes.
                </li>
                <li>
                  <strong>Managing Passengers:</strong> You can add a new
                  passenger (+ icon), edit an existing passenger's details
                  (pencil icon), or remove a passenger (trash icon).
                </li>
              </ul>
              <h5>The Approval Process (For Customers)</h5>
              <p>
                When an Agent has finalized your order details and price, the
                order's status will change to{" "}
                <strong>'Pending Customer Approval'</strong>. At this point, a
                prominent <strong>Approve</strong> button will appear on the
                page. Clicking this will open a window where you can formally
                approve or reject the agent's proposed booking.
              </p>
            </div>
            <hr className="my-4" />
            <div id="OrdersManager">
              {" "}
              <div className="d-block" style={{ height: "70px" }}></div>
              <h4>Admin Guide: Orders Manager Page</h4>
              <p>
                The Orders Manager is the central dashboard for{" "}
                <strong>Administrators</strong> to monitor and manage all orders
                within the system. This page is accessible only to users with
                Admin privileges.
              </p>
              <h5>The Dashboard Overview</h5>
              <p>
                At the top of the page, you will find a set of progress bars
                that provide a real-time statistical overview of all orders.
                They are categorized by their current status (e.g., Pending, In
                Progress, Confirmed), showing both a percentage and a direct
                count for each category.
              </p>
              <h5>The Main Orders Table</h5>
              <p>
                Below the dashboard, a comprehensive table lists every order in
                the system. Several columns in this table are interactive to
                help you manage the workflow:
              </p>
              <ul>
                <li>
                  <strong>Order Number:</strong> Clicking on a specific order
                  number will navigate you to the detailed view for that order.
                </li>
                <li>
                  <strong>Status:</strong> This column is color-coded for quick
                  visual identification of an order's state (e.g., green for
                  Confirmed, red for Cancelled).
                </li>
                <li>
                  <strong>Agent:</strong> This is a key action column. If an
                  order is pending and has no agent, you will see a{" "}
                  <strong>link icon</strong>. Clicking this opens a window where
                  you can <strong>assign an Agent</strong> to the order. If an
                  agent is already assigned, their name is displayed.
                </li>
                <li>
                  <strong>Customer:</strong> Clicking on the customer's name
                  will take you directly to that user's profile page.
                </li>
              </ul>
              <h5>Key Admin Actions from this Page</h5>
              <ul>
                <li>
                  <strong>Monitor:</strong> Use the progress bars to get a quick
                  pulse on the overall order pipeline and identify bottlenecks.
                </li>
                <li>
                  <strong>Assign:</strong> Your primary task here is to assign
                  new, unassigned orders to your Agents via the link icon.
                </li>
                <li>
                  <strong>Investigate:</strong> Use the links in the table to
                  quickly navigate to specific order or user details when
                  needed.
                </li>
              </ul>
            </div>
            <hr className="my-4" />
            <div id="DeleteOrder">
              {" "}
              <div className="d-block" style={{ height: "70px" }}></div>
              <h4>Deleting an Order (Admin Only)</h4>
              <p>
                The ability to delete an order is a powerful, admin-only feature
                designed for specific situations. It permanently removes all
                records of an order from the system.
              </p>
              <p>
                <strong>Important:</strong> Deleting an order is{" "}
                <strong>irreversible</strong> and cannot be undone. This feature
                should only be used to correct critical mistakes, such as a
                duplicate order created in error. For all other cases where an
                order is not proceeding, you should <strong>cancel</strong> the
                order instead.
              </p>
              <h5>How to Delete an Order</h5>
              <ol>
                <li>
                  As an <strong>Administrator</strong>, navigate to the 'Order
                  Details' page of the order you wish to permanently delete.
                </li>
                <li>
                  In the top-right action bar, locate the red button with the{" "}
                  <strong>trash can icon</strong>.
                </li>
                <li>
                  Click the button. A confirmation pop-up will appear to prevent
                  accidental deletion.
                </li>
                <li>
                  To proceed, confirm the action in the pop-up window. The order
                  will then be permanently removed.
                </li>
              </ol>
              <h5>Delete vs. Cancel: When to Use Each</h5>
              <ul>
                <li>
                  <strong>Delete Order:</strong> Use only to correct significant{" "}
                  <strong>mistakes</strong>. The order record is removed
                  forever.
                </li>
                <li>
                  <strong>Cancel Order:</strong> Use for any order that is no
                  longer needed or has been voided. The order remains in the
                  system for your records but is marked as inactive.
                </li>
              </ul>
            </div>
            <hr className="my-4" />
            <div id="UpdateOrder">
              {" "}
              <div className="d-block" style={{ height: "70px" }}></div>
              <h4>User Guide: Updating an Order</h4>
              <p>
                Editing an order is done through a pop-up window that appears
                when you click the pencil icon on the 'Order Details' page. The
                form displayed in this window is specific to the section you
                choose to edit.
              </p>
              <h5>How to Edit Order Sections</h5>
              <ul>
                <li>
                  <strong>Editing Flights:</strong> Clicking the pencil icon in
                  the 'Flight Details' section will open a form where you can
                  update departure and return flight information, including
                  dates, times, and flight numbers.
                </li>
                <li>
                  <strong>Editing or Adding a Passenger:</strong> Clicking the
                  pencil icon next to a passenger, or the 'Add Passenger' (+)
                  button, opens a form to enter or modify that passenger's
                  personal and passport details.
                </li>
                <li>
                  <strong>Editing General Details (For Agents/Admins):</strong>{" "}
                  This option allows <strong>Agents</strong> and{" "}
                  <strong>Admins</strong> to update the order's{" "}
                  <strong>Price</strong>, manually change its{" "}
                  <strong>Status</strong>, or add internal{" "}
                  <strong>Notes</strong>.
                </li>
              </ul>
              <h5>Important Workflow for Agents</h5>
              <p>
                When an <strong>Agent</strong> updates an order's{" "}
                <strong>Price</strong>, the system performs an automatic check.
                If all required flight details (like time and flight number) are
                complete, the order's status will automatically be updated to{" "}
                <strong>'Pending Customer Approval'</strong> to be sent to the
                customer.
              </p>
              <h5>Saving or Cancelling Changes</h5>
              <p>After making your edits, you can:</p>
              <ul>
                <li>
                  <strong>Save Changes:</strong> Click this button to apply your
                  updates. The button will only be clickable if all required
                  fields are valid.
                </li>
                <li>
                  <strong>Cancel:</strong> If you wish to close the window
                  without saving, click the 'Cancel' button or the 'X' icon at
                  the top right.
                </li>
              </ul>
            </div>
            <hr className="my-4" />
            <div id="ApproveOrder">
              {" "}
              <div className="d-block" style={{ height: "70px" }}></div>{" "}
              <h4>Approving Your Order (For Customers)</h4>
              <p>
                This is the final step to confirm your booking. After an Agent
                has prepared all the details and set the final price for your
                order, its status will change to{" "}
                <strong>'Pending Customer Approval'</strong>. At this point, you
                will need to give your final confirmation.
              </p>
              <h5>How to Approve Your Order</h5>
              <ol>
                <li>
                  Navigate to the <strong>'Order Details'</strong> page for the
                  order that requires your approval.
                </li>
                <li>
                  You will see a prominent <strong>Approve</strong> button
                  displayed on the page.
                </li>
                <li>
                  Clicking this button will open a confirmation window where you
                  will be asked to make your final decision.
                </li>
              </ol>
              <h5>Making Your Decision</h5>
              <p>In the confirmation window, you will have two choices:</p>
              <ul>
                <li>
                  <strong>To Approve:</strong> If all the flight details and the
                  price are correct, confirm your approval. The order's status
                  will permanently change to <strong>'Confirmed'</strong>, and
                  your booking will be finalized. The order can no longer be
                  edited after this point.
                </li>
                <li>
                  <strong>To Reject:</strong> If you find an issue or do not
                  agree with the details, you can reject the order. The order's
                  status will revert to <strong>'In Progress'</strong>, which
                  notifies the Agent that further changes are needed.
                </li>
              </ul>
            </div>
            <hr className="my-4" />
            <div id="MiniApps">
              <h3>Mini Apps</h3>
            </div>
            <hr className="my-4" />
            <div id="CoinsConverter">
              {" "}
              <div className="d-block" style={{ height: "70px" }}></div>{" "}
              <h4>User Guide: Currency Converter</h4>
              <p>
                This tool allows you to quickly convert an amount from one
                currency to another using the latest exchange rates.
              </p>
              <h5>How to Use the Converter</h5>
              <ol>
                <li>
                  Enter the <strong>Amount</strong> you wish to convert in the
                  first field.
                </li>
                <li>
                  In the <strong>From</strong> dropdown menu, select the
                  currency you are converting from.
                </li>
                <li>
                  In the <strong>To</strong> dropdown menu, select the currency
                  you want to convert to.
                </li>
                <li>
                  Click the <strong>Convert</strong> button to perform the
                  calculation.
                </li>
              </ol>
              <h5>Viewing the Result</h5>
              <p>
                After you click 'Convert', a <strong>result box</strong> will
                appear at the bottom of the page. The final converted amount
                will be clearly displayed and formatted in the 'To' currency you
                selected (e.g., $, €, £).
              </p>
              <h5>Common Errors</h5>
              <ul>
                <li>
                  <strong>"Please enter a valid amount":</strong> This error
                  will appear if the 'Amount' field is empty or does not contain
                  a positive number.
                </li>
                <li>
                  <strong>"Please select both currencies":</strong> This message
                  will show if you click 'Convert' without selecting a currency
                  from both the 'From' and 'To' dropdowns.
                </li>
              </ul>
            </div>
            <hr className="my-4" />
            <div id="Weather">
              {" "}
              <div className="d-block" style={{ height: "70px" }}></div>
              <h4>User Guide: Weather App</h4>
              <p>
                This simple app allows you to check the current weather and see
                a forecast for cities around the world.
              </p>
              <h5>How to Check the Weather</h5>
              <ol>
                <li>
                  In the <strong>City</strong> input field, type the name of the
                  city you want to check.
                </li>
                <li>
                  Click the <strong>Go</strong> button to fetch and display the
                  weather information.
                </li>
              </ol>
              <h5>Understanding the Weather Display</h5>
              <p>The results are displayed in two main sections:</p>
              <ul>
                <li>
                  <strong>Current Weather:</strong> A central card will appear
                  showing the current conditions, including temperature,
                  humidity, wind speed, and a weather icon.
                </li>
                <li>
                  <strong>Forecast:</strong> Below the current weather, you will
                  see a forecast for the upcoming days, with the predicted
                  average, maximum, and minimum temperatures for each day.
                </li>
              </ul>
              <h5>Tips for Use</h5>
              <p>
                For the best results, please use standard English spellings for
                city names. You can search for a new city at any time by typing
                in the input field and clicking 'Go' again.
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Tutorial;
