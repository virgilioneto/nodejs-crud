# nodejs-crud

> CRUD application, with products and categories, using NodeJS, MySQL, ExpressJS and SequelizeJS.

Tasks:
- [X] Product and category listing and filtering (using DataTables for the layout);
- [X] Product and category routes for find, create, update, delete and filter by name/id;
- [X] Authenticated API route for listing products;

Future improvements
- [ ] Framework for the UI (VueJS, AngularJS);
- [ ] Automated testing;
- [ ] Authenticate all routes;

## Setup

Clone the project, create a MySQL database and change the database configuration file.

``` bash
# install dependencies
npm install

# start the application
npm start
```

The app will be available at http://localhost:3000.

## API

To retrieve the products by the authenticated API, you must:

- 1. Get a JWT by doing a POST to http://localhost:3000/api/auth, passing the "username" and "password" inserted by default (in this case, "adm" and "adm");
- 2. Get the "x-access-token" header value that was set by the POST above;
- 3. Finally, get the product listing by passing the "x-access-token" header to http://localhost:3000/api/product
