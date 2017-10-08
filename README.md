# nodejs-crud

> CRUD application, with products and categories, using NodeJS, MySQL, ExpressJS and SequelizeJS.

Tasks:
- [X] Product and category listing and filtering;
- [X] Product and category routes for find, create, update, delete and filter by name/id;
- [X] Layout for listing and editing products/categories;
- [X] Authenticated API route for listing products;
- [X] Product and category image upload.

Future improvements
- [ ] Framework for the UI (VueJS, AngularJS);
- [ ] Automated testing;
- [ ] Authenticate all routes;
- [ ] Multiple product image upload;
- [ ] Create file storage;
- [ ] Use promises instead of callbacks.

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
- 3. Finally, get the product listing by passing the "x-access-token" header to http://localhost:3000/api/product.
