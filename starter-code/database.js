const MongoDB = require('mongodb');
const users = 'users';
const products = 'products';
const shoppingCarts = 'shoppingCarts';

class Database {

  constructor({ host, database }) {
    this.url = `mongodb://${host}/${database}`;
  }

  connect(callback = (error, database) => {}){
    if (this.database){
      callback(null, this.database);
    } else {
      MongoDB.MongoClient.connect(this.url, (error, database) => {
        if (error){
          callback(error);
        } else {
          this.database = database;
          callback(null, this.database);
        }
      });
    }
  }

  close(callback = (error) => {}){
    if (this.database){
      this.database.close(true, callback);
    } else {
      callback();
    }
  }
  // Insert a user
  // user is the object to insert into the collection
  // callback has two arguments error and result
  insertUser(user, callback = (error, result) => {}){
    this.connect((error, database) => {
      if (error){
        callback(error);
      } else {
        // LAB 1
        // Implement the query to insert a user
        // user is the document that we want to insert
        // remeber once it's finish to comment callback('Error inserting user');

        database.collection('users').insertOne(user, (error, result) => {
          callback(error, result);
        });
      }
    });
  }

  listUsers(callback = (error, users) => {}) {
    this.connect((error, database) => {
      if (error){
        callback(error);
      } else {
        //  LAB 2
        // Implement the query to insert a user
        // remeber once it's finish to comment callback('Error listing users');

        database.collection('users').find((error, result) => {
          callback(error, result);
        });
      }
    });
  }

  deleteUser( firstName, callback = (error, result) => {}) {
    this.connect((error, database) => {
      if (error){
        callback(error);
      } else {
        //  LAB 3
        // Implement the query to delete a user
        // firstName is the name of user that we want to delete
        // remeber once it's finish to comment callback('Error deleting user');

        database.collection('users').deleteOne( {firstName: firstName}, (error, result) => {
          callback(error, result);
        });
      }
    });
  }

  insertProduct(product, callback = (error, result) => {}){
    this.connect((error, database) => {
      if (error){
        callback(error);
      } else {
        // LAB 4
        // Implement the query to insert a product
        // product is the document to insert
        // remeber once it's finish to comment callback('Error inserting product');

        database.collection('products').insertOne(product, (error, result) => {
          callback(error, result);
        });
      }
    });
  }

  listProducts(callback = (error, products) => {}) {
    this.connect((error, database) => {
      if (error){
        callback(error);
      } else {
        // LAB 5
        // Implement the query to list all products
        // remeber once it's finish to comment callback('Error listing products');

        database.collection('products').find((error, result) => {
          callback(error, result);
        });
      }
    });
  }

  deleteProduct( productName, callback = (error, result) => {}) {
    this.connect((error, database) => {
      if (error){
        callback(error);
      } else {
        // LAB 6
        // Implement the query to delete a product
        // productName is the name of the producto to delete
        // remeber once it's finish to comment callback('Error deleting product');

        database.collection('products').deleteOne( {name: productName}, (error, result) => {
          callback(error, result);
        });
      }
    });
  }

  addProductToShoppingCart({userFirstName, productName}, callback = (error) => {}){
    this.connect((error, database) => {
      if (error) {
        callback(error);
      } else {
        // LAB 7
        // Implement the query to buy a product
        // userFirstName is the name of user who purchase the product
        // productName is the name of the product that we want to buy
        // Think if you may need to implement two queries chained
        // remeber once it's finish to comment callback('Error buying product');

        database.collection('users').updateOne(
          {firstName: userFirstName},
          {$set: {"shoppingCart": productName}},
          (error, result) => {
            callback(error, result);
          });
      }
    });
  }

  addReviewToProduct( {productName, review}, callback = (messageResult) => {}){
    this.connect((error, database) => {
      if (error) {
        callback(error);
      } else {
        // LAB 8
        // Implement the query to review a product
        // productName is the name of the product to review
        // review is the document to insert
        // remeber once it's finish to comment callback('Error reviewing product');

        database.collection('products').updateOne(
          {name: productName},
          {$set: {"reviews": review}},
          (error, result) => {
            callback(error, result);
        });
      }
    });
  }
}

module.exports = Database;
