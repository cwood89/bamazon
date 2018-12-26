# **Welcome to Bamazon!**

## **The ultimate command line shopping experience.**

This app is an Amazon-like storefront using MySQL to store and    retrieve inventory values. Through the command line, users can place orders which will deplete stock from the stores inventory. Users can also access the bamazon-manager features, which gives you a menu of manager options.

## **Easy to use!**

- To access bamazon storefront open your terminal in bamazons home directory and simply type in `node bamazonCustomer.js`.

- To access bamazon manager options open your terminal in bamazons home directory and simply type in `node bamazonManager.js`.

- - -

### **Bamazon Store Front**

![alt text](images/BamaCustomer.jpg)

Running this application will first display all of the items available for sale.

- The user will then be prompted with two messages.
  - `"What item would you like to purchase?`
  - `How many would you like to purchase?`

- Once the user has placed their order the application will then query the database to see if the store has enough of the product to fulfill the order.
  - If not, the order will be canceled and the user will be alerted `Sold Out`.

- Otherwise, the order will be fulfilled.
  - The SQL database will be updaed reflect the remaining quantity.
  - Then the app will show the user the total cost of their purchase.

### ***Bamazon Manager Options***

![alt text](images/BamaManagerOptions.jpg)

Running this application will show a list of options:

- `View Products for Sale`, this will list all:
  - The item IDs
  - The items names
  - The items prices
  - The quantity.

![alt text](images/BamaManagerLow.jpg)

- `View Low Inventory`, will list all items with an inventory count lower than five.

![alt text](images/BamaManagerAdd.jpg)

- `Order Stock`, will let the user order more of any item currently in the store.

![alt text](images/BamaManagerNew.jpg)

- `Add New Product`, will allow the user to add a completely new product to the store.

- - -

### ***Tech Used***

1. Node.js
2. MySQL