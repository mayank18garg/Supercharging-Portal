### 1. Tech Stack
The Supercharging Portal for Landlords has been built using the MERN stack, which is a popular combination of technologies for developing full-stack web applications. MERN stands for MongoDB, Express.js, React.js, and Node.js. Here's a brief overview of each component of the MERN stack:

* MongoDB: MongoDB is a NoSQL document-based database that allows for the efficient storage and retrieval of data in JSON-like documents. MongoDB is highly scalable and flexible, making it an ideal choice for web applications that require dynamic data storage and retrieval.

* Express.js: Express.js is a powerful and flexible web application framework for Node.js. It provides a set of robust features for building web applications and APIs, including middleware support, routing, templating, and much more.

* React.js: React.js is a popular front-end library for building user interfaces. It allows for the creation of reusable UI components and provides a declarative syntax for building complex UIs.

* Node.js: Node.js is a JavaScript runtime that allows for the execution of JavaScript code outside of a web browser. It provides a powerful set of tools and libraries for building scalable and performant web applications.

Together, the MERN stack provides a powerful and flexible set of tools for building full-stack web applications. The use of MongoDB allows for efficient data storage and retrieval, while Express.js and Node.js provide a powerful server-side framework for building APIs and handling HTTP requests. Finally, React.js provides a flexible and powerful client-side library for building dynamic user interfaces.

### 2. Authentication and Authorization
This portal uses Auth0 for authentication, authorization, and User management. Auth0 is a widely adopted identity and access management (IAM) platform, which offers solutions for authentication, authorization, and user management. Authentication can be a challenging aspect to implement correctly in any application, and it requires a significant investment of time and resources. By leveraging Auth0, developers can devote their attention to building and enhancing core application features, instead of spending valuable time on creating and maintaining their authentication system. Additionally, implementing faulty authentication can result in either security vulnerabilities, frustrating user experiences, or both. Auth0 mitigates these risks, providing a reliable and secure solution for authentication and authorization.

### 3. HTTPS over HTTP
I have established a secure connection for the application. The secure connection ensures that any communication between the application and its users is encrypted and transmitted through a secure channel, which prevents unauthorized access to sensitive information. This setup is a critical aspect of the application's security infrastructure, and it provides users with peace of mind when using the application. By implementing secure connections, I can ensure that our application meets industry-standard security requirements and provides a safe and reliable user experience.

### 4. Customized Views and Role-Based Access Control for Enhanced User Experience and Security
To enhance the user experience and security of our portal, I have implemented customized views for admins and regular users. Upon logging in, admins are directed to a comprehensive dashboard that provides them with access to all administrative tools and features. They can view and manage all the sites that have been onboarded, as well as onboard new users.

In contrast, regular users are directed to their respective sites only, where they can access and utilize the portal's features as needed. By implementing role-based access control, I ensure that users only have access to the features and tools relevant to their roles, enhancing the security of our portal.