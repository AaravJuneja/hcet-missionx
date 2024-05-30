# Project Overview
This project is a web application for an organization called H.C.E.T Syndicate. It includes various features such as user authentication, a dashboard for viewing ongoing missions, an admin panel for managing missions and agents, and communication functionality. The project utilizes HTML, CSS, JavaScript, Bootstrap, and additional custom styles for design and functionality.


## Features
1. **User Authentication**: Users can register and login to access the system securely.
2. **Dashboard**: Provides a user-friendly interface for viewing ongoing missions, allowing agents to stay updated on their tasks.
3. **Admin Panel**: Allows administrators to manage missions and agents efficiently, providing tools for adding, editing, and deleting missions, as well as managing agents' assignments.
4. **Communication**: Enables users to send and receive messages within the system, facilitating collaboration and coordination among team members.


## Technologies Used

### Frontend
- **HTML**: Used for structuring the web pages, providing semantic markup for content.
- **CSS**: Provides styling for the web pages, ensuring a visually appealing and user-friendly interface.
- **JavaScript**: Adds interactivity and dynamic behavior to the web pages, enhancing user experience.
- **Bootstrap**: A front-end framework used for building responsive and mobile-first websites, providing pre-designed components and utilities for rapid development.
- **Custom Styles**: Additional custom styles were applied for a unique design, including neumorphism and glassmorphism effects for modern aesthetics.

### Backend
- **Node.js**: A JavaScript runtime environment used for server-side scripting, allowing the execution of JavaScript code on the server.
- **Express.js**: A web application framework for Node.js used to build the backend server, simplifying the creation of APIs and handling of HTTP requests.
- **MongoDB**: A NoSQL database used for storing mission and user data, providing scalability and flexibility for managing large volumes of data efficiently.

## Installation
1. Download this repository as zip file
2. Export as a normal folder
3. Open terminal in backend folder
4. Run the command `node index.js`
5. Wait for confirmationt to 3000 port
6. Go back and run index.html from frontend folder

   
## Folder Structure
- **controllers**: Contains the controller files for handling different routes and requests, implementing logic for the application.
- **models**: Defines the schema for MongoDB collections, specifying the structure of mission and user data.
- **public**: Contains static files such as CSS, and JavaScript, accessible to clients for rendering web pages.
- **routes**: Defines the routes for different API endpoints, routing incoming requests to the appropriate controller functions.
- **views**: Contains the HTML files for rendering the web pages, dynamically generated with data fetched from the backend.
- **script.js**: JavaScript file for client-side scripting, implementing functionality such as form validation and AJAX requests.
- **styles.css**: CSS file for custom styling, enhancing the appearance and user experience of the web application.
- **passport-config.js**: Configuration file for user authentication using Passport.js, implementing authentication strategies and middleware.

## Usage
- Register an account to access the dashboard and admin panel, providing credentials for secure authentication.
- Use the dashboard to view ongoing missions, displaying relevant information such as mission titles, details, and assigned agents.
- Utilize the admin panel to manage missions and agents efficiently, performing actions such as adding, editing, and deleting missions, as well as assigning and removing agents from missions.
- Communicate with other users using the communication feature, facilitating real-time messaging and collaboration among team members.

## Credits
- **Bootstrap**: Front-end framework for design and layout, providing a comprehensive set of components and utilities for building responsive and mobile-friendly websites.
- **jQuery**: JavaScript library for DOM manipulation and AJAX requests, simplifying client-side scripting and interaction with the server.
- **Popper.js**: Dependency for Bootstrap tooltips and popovers, enhancing user interface elements with additional functionality.
- **Express.js**: Web application framework for Node.js, enabling the development of robust and scalable server-side applications.
- **Passport.js**: Authentication middleware for Node.js, providing authentication strategies and middleware for securing web applications.
- **MongoDB**: NoSQL database for storing mission and user data, offering scalability, flexibility, and high performance for data management.

## Libraries Used
- **bcrypt**: A library for hashing passwords securely, providing protection against brute-force attacks and unauthorized access to user credentials.
- **body-parser**: Middleware for parsing incoming request bodies in Express.js applications, allowing access to request data such as form submissions or JSON payloads.
- **cors**: Cross-Origin Resource Sharing middleware for Express.js, enabling secure communication between client-side and server-side applications hosted on different domains.
- **dotenv**: Loads environment variables from a `.env` file into the Node.js `process.env` object, allowing sensitive configuration data such as API keys or database credentials to be securely stored and accessed within the application.
- **express**: Fast, unopinionated, minimalist web framework for Node.js, providing a robust set of features for building web applications and APIs, including routing, middleware, and HTTP request handling.
- **express-flash**: Flash messaging middleware for Express.js, allowing messages to be displayed to users as they navigate the application, providing feedback for actions such as form submissions or authentication status.
- **express-session**: Session middleware for Express.js, facilitating the management of user sessions and session data, enabling features such as user authentication and persistent login sessions.
- **mongodb**: Official MongoDB driver for Node.js, providing a high-level API for interacting with MongoDB databases, allowing applications to perform CRUD operations and manage data efficiently.
- **mongoose**: MongoDB object modeling tool for Node.js, providing a higher-level abstraction over the MongoDB driver, simplifying interaction with MongoDB databases and defining schemas for data models.
- **passport**: Authentication middleware for Node.js, providing authentication strategies and middleware for securing web applications, including support for local authentication, OAuth, and JWT authentication.
- **passport-jwt**: Passport strategy for authenticating with JSON Web Tokens (JWT), allowing users to authenticate with JWTs and access protected resources in the application.
- **passport-local**: Passport strategy for authenticating with a username and password, enabling users to authenticate using credentials stored locally in the application's database.


## Note from the Developer
The code is messed up, not worth running :[
