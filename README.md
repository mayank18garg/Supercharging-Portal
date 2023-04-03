# Technology Stack Employed for Development of the Supercharging Portal for Landlords
### 1. Tech Stack
To build the Supercharging Portal for Landlords, I leveraged the power of the MERN stack, which consists of MongoDB, Express.js, React, and Node.js. This technology stack provided a robust and scalable platform to build the application from scratch.

Firstly, I started by designing the data models and schemas in MongoDB, which served as the backend database for the application. This involved setting up the collections for properties, dashboard, issue tickets, and user authentication data.

Next, I built the RESTful API using Express.js, which allowed for seamless communication between the frontend and backend of the application. This involved writing API routes for CRUD operations for each data model, as well as authentication and authorization routes using Auth0.

For the frontend of the application, I used React, which allowed for the creation of a dynamic and responsive user interface. I designed and developed the user interface, including the dashboard, property management page, and issue tracking system, contact & Site information with a focus on user experience and ease of use.

Finally, I used Node.js to handle server-side logic, such as email notifications and data synchronization with Tesla's database. Additionally, I deployed the application on Heroku, a cloud-based platform as a service (PaaS), to ensure reliable and scalable hosting.

Overall, building the Supercharging Portal for Landlords using the MERN stack required a thorough understanding of each technology and their integration with each other. It involved a significant amount of planning, development, and testing to ensure that the application met the needs of landlords and provided a streamlined rental property management process.

### 2. Authentication and Authorization
This portal uses Auth0 for authentication, authorization, and User management. Auth0 is a widely adopted identity and access management (IAM) platform, which offers solutions for authentication, authorization, and user management. Authentication can be a challenging aspect to implement correctly in any application, and it requires a significant investment of time and resources. By leveraging Auth0, developers can devote their attention to building and enhancing core application features, instead of spending valuable time on creating and maintaining their authentication system. Additionally, implementing faulty authentication can result in either security vulnerabilities, frustrating user experiences, or both. Auth0 mitigates these risks, providing a reliable and secure solution for authentication and authorization.

### 3. HTTPS over HTTP
I have established a secure connection for the application. The secure connection ensures that any communication between the application and its users is encrypted and transmitted through a secure channel, which prevents unauthorized access to sensitive information. This setup is a critical aspect of the application's security infrastructure, and it provides users with peace of mind when using the application. By implementing secure connections, I can ensure that our application meets industry-standard security requirements and provides a safe and reliable user experience.

### 4. Customized Views and Role-Based Access Control for Enhanced User Experience and Security
To enhance the user experience and security of our portal, I have implemented customized views for admins and regular users. Upon logging in, admins are directed to a comprehensive dashboard that provides them with access to all administrative tools and features. They can view and manage all the sites that have been onboarded, as well as onboard new users.

In contrast, regular users are directed to their respective sites only, where they can access and utilize the portal's features as needed. By implementing role-based access control, I ensure that users only have access to the features and tools relevant to their roles, enhancing the security of our portal.

### 5. Production Deployment on Heroku
I have successfully deployed the Supercharging Portal for Landlords to Heroku, which is a cloud-based Platform as a Service (PaaS) that enables us to host, deploy, and manage our application in a scalable and reliable manner.

Heroku allows us to easily manage our application's dependencies, configuration, and scaling, while providing features such as automatic scaling and load balancing, HTTPS encryption, and continuous integration and deployment (CI/CD) pipelines.

To deploy the application to Heroku, I used its built-in Git integration and Heroku CLI tools to push our code and configuration to the Heroku Git repository. I then configured the application to use the MongoDB database, which provides with a reliable and scalable database solution.

I also set up environment variables in Heroku to store sensitive information such as API keys and database credentials, ensuring that the application remains secure.

Overall, deploying the Supercharging Portal for Landlords to Heroku has allowed me to easily manage and scale our application in a reliable and secure manner, and I am confident that our users will have a seamless experience.

### 6. Sync our application database to Tesla's database
Tesla's database contains crucial data that is necessary for our web application to function properly. However, due to security concerns, we were not able to directly access Tesla's database from our public server. This posed a challenge for us in terms of ensuring that our application always had access to the most up-to-date information from Tesla's database.

To address this issue, I created a script that periodically synchronizes the data between Tesla's database and our application's database. This script ensures that the data in our database is always consistent with the data in Tesla's database.

It is critical that this synchronization is accurate and reliable. To achieve this, I have implemented rigorous testing and error handling procedures to ensure that any discrepancies or issues are promptly identified and resolved. Additionally, the script is designed to run at regular intervals to ensure that any changes in Tesla's database are quickly reflected in our application's database.

Overall, this solution allows us to maintain a seamless flow of data between Tesla's database and our application, while ensuring the security and integrity of both systems.

