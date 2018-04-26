# General purpose payment gateway

![citaralab](https://user-images.githubusercontent.com/20716798/28749145-62359dba-7494-11e7-8fdf-a2e10f07dd03.png)

[![Build Status](https://travis-ci.com/LukasMeine/payment-gateway.svg?token=iTh62MEYYM7KqvAvyiRu&branch=master)](https://travis-ci.com/LukasMeine/payment-gateway)
[![Issue Count](https://codeclimate.com/repos/599b86eede9e73029e000830/badges/c09a7f02d44f03e0e35b/issue_count.svg)](https://codeclimate.com/repos/599b86eede9e73029e000830/feed)

## Getting Started

Citara labs™ General purpose payment gateway is a software that wraps together the most cutting edge payment processors into a single api.

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Features

The features marked with a &#10004; are already stable and production ready.

| Feature  |  MercadoPago      | Stripe  | Cielo 3.0 |
|----------|:-------------:|:-------------:|:-------------:|
| Boleto | &#10004; | &#10008; |  &#10008; |
| Credit Card | &#10004; | &#10004; |  &#10004; |
| Debit Card |  &#10008; |  &#10008; |  &#10004; |
| Bank Transfer| &#10008; | &#10008; | &#10004; |

### Requirements

- Node.js 6.x
- Npm

### Installing and testing

Clone this repository

```
Git clone
```

Install dependencies

```
npm install
```

Run automated tests

```
npm test
```

Start server ( will listen on localhost:3000 )

```
npm start
```

## Deployment

We recommend the usage of [PM2](https://github.com/Unitech/pm2) as the proccess manager.

Or, alternatively: https://expressjs.com/en/advanced/pm.html

## Documentation

Docs are available at http://localhost:3000/api-docs/ after the project is deployed.


## Built With

* [Express](https://expressjs.com) - The web framework used
* [NPM](https://www.npmjs.com/) - Dependency Management
* [Travis](https://travis-ci.org/) - Continuous integration 
* [Chai.js](http://chaijs.com/) - Automated testing 
* [Mocha.js](https://mochajs.org/) - Automated testing 



Coded with ❤ by Citara Labs