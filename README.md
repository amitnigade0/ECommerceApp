# ECommerceApp
Complete eCommerce website using NodeJS, React and MongoDB

------------------------------------------------------------------------------

Tach Stack

DB - MongoDB (users, products)
Auth - JWT-refresh token & cookies
Server Deployment - AWS EC2, netlify,Heroku 
CI CD - Github Actions
Build&Image - Docker
Backend - Node Express
Froend End - React
UI -  Material UI
Test cases - Mocha-Chai, jest ( Jest for frontend, Mocha for backend)
Cache - Redis
notifications(mail) - node mailer
language - javaScript, typeScript
Design pattern - mvc



--------------------------------------------------------------------------------

Create API using NodeJS Express MongoDb
- https://www.youtube.com/watch?v=ekRpc5YgVZU - Dipesh malviya
 
App design Structure idea
- https://www.youtube.com/watch?v=sBl0ZsJE9DY&list=PL63c_Ws9ecISwPzddQzQ671S_gzJA6M5z&index=1
- https://www.youtube.com/watch?v=zWEvbGdUhRg

Follow
https://www.youtube.com/watch?v=juPYfVY6jkQ&list=PLzb46hGUzitBp584kLyn6l3i6yC-rXlmN&index=4

mongoDB commands
- https://www.mongodb.com/developer/products/mongodb/cheat-sheet/

Reference dummy data
- https://dummyjson.com/docs/products

handling Cookies with JWT & CORS
- https://dev.to/alexmercedcoder/expressjs-handling-cross-origin-cookies-38l9

------------------------------------------------------------------------------

Upcaming features 

DONE
- remove item 
- Orders
- Order detail
- logout
- account
- forgot/reset password functionality
- Gmail integration
- Redis cahe (performance & optimization) - config issue
- Secure token storing mechanism(encode & store) - Cookies with JWT & refresh token
- blacklist token/ clear cookies on logout & refresh


PENDING

- server deployment
- Docker/k8s
- CI/CD
- test cases

- search function
- add reviews
- Create lazy loading for products page
- Create pagination for reviews or my orders
- razorPay integration


---------------------
Future scope
- Admin dashboard for managing products, orders, and users.
- Socket IO 
- Payment Gateway - Razor pay
- notifications - firebase

--------------

-every time you push to your main branch, the GitHub Actions workflow will build the Docker image,
push it to Docker Hub, and deploy it to your AWS server.


