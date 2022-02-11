  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  
# The Shop

Backend for an e-commerce site.

## Description

This application features the back end for an e-commerce website that will provide a manager at an internet retail company the ability to manage their online store by adding, deleting, and/or updating their products. Product details give the customers more information about the products (price, stock, etc.), and associated categories and tags makes it easier for customers to find products they may be interested in. It also serves as an organization tool for shop managers with an extensive product list. 

Having an e-commerce shop that utlizes the latest technologies will allow the company to compete with other online retail stores.   

This application was built using the following:

* MySQL
* Express.js API
* Sequelize
* Javascript

Database username and password are protected in an environment variable file. 


## Table of Contents

  * [Description](#description)
  * [Installation](#installation)
  * [License](#license)
  * [Usage](#usage)
  * [Preview](#preview)
  * [Questions](#questions)

## Installation

Clone the repository onto your local environment. 

The following dependancies, listed in `package.json` must be installed to run this application: 

* dotenv
* express
* mysql2
* sequelize


Run the following code to install all required dependancies: 

`npm i` 


## License

This application is covered under the MIT license.

## Usage

This application can be accessed via the commnad-line. Once it has been cloned to your local environment, open the application. Run the following commands:

From the schema.sql file, type`mysql -u root -p` in the command line. Provide your password to access MySQL. Thereafter, type `source schema.sql`. 

Right-click `package.json` and select "Open in Integrated Terminal". In the command line, type `node seeds` to access test data. 

Open the `server.js` file in your terminal. Run `npm start`. To test functionality, open with Insomnia. 


### Application in Action


Displays the application's GET routes to return all products, all categories, and all tags being tested in Insomnia Core:

![Screen shot of products displaying in Insomnia.](/Assets/GET-routes.gif)

Displays the application's POST routes creating a product, category and tag:

![Screen shot of categories displaying in Insomnia.](/Assets/CREATE-routes.gif)

Displays the application's DELETE routes removing a specified product, category and tag from the database:

![Screen shot of tags displaying in Insomnia.](/Assets/DELETE-routes.gif)


## Preview

GitHub Repo: https://github.com/jsamborski310/the-shop

Loom Video: https://www.loom.com/share/24ded63043b9419a88064b086b357f94


## Questions

For questions about this application or if you would like to collaborate, connect with me on <a href="https://www.linkedin.com/in/juanita-samborski/" target="_blank">Linkedin</a>.

