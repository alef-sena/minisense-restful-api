# MiniSense RESTful API

## Why was it developed
This project is part of an activity proposed by SenseUp aimed at approving a selection process for a Back-End developer internship vacancy.

### Project scope and domain

A product in the area of Internet of Things (IoT) and Remote Sensing is being developed. It is a service to manage the status of IoT devices installed by customers and to alert, through an application, about situations or emergencies conditioned to objects, goods, or locations monitored by these sensors.

For example, a customer can be alerted via his smartphone about the overheating of equipment or a sensitive product that was being monitored through a sensor previously installed and connected to the service. When purchasing a sensor compatible with the service and installing it, it is possible to associate it with the owner's user account, thus, it will be available in the app's dashboard for monitoring, being informed of what types of data are being monitored and their most recent measured values. In another area of the app (outside the scope of this scenario) it would be possible to configure alerts combining conditions on the measured values, example: alert user when the temperature of sensor `985bf2cde9b54a54b8fcd3423d89ad89` (labeled as Depot Freezer) exceeds -4 ºC.

## What is it for

The project consists of a RESTful API for an application that monitors sensory devices. The MiniSense RESTful API allows developers to perform the basic functions of creating, reading and searching tables that store data of: users, sensory devices, data stream, unit of measure and data streams.

## How to contribute

```bash
# Clone the repository
$ git clone https://github.com/alef-sena/minisense-restful-api
```
```bash
# Enter directory
$ cd minisense-restful-api
```
```bash
# Install dependencies, if using npm
$ npm install
```
_or_

```bash
# Install dependencies if using yarn
$ yarn install
```

## Manual installation

### Prerequisites

* [Node.js](https://nodejs.org/en/) v12.18.0 +

1. Install and build MiniSense RESTful API package
```bash
# Create all necessary tables
$ npm run knex:migrate

# OPTIONAL: Create some test data
$ npm run knex:seed

# start the server
$ npm start
```

>To choose the server where the application will run, open the `server.ts` file and insert your server in `[your-server]` in:
>```typescript 
>app.listen([your-server], () => {});
>```

## How to use

To access the documentation where it is specified how to use the API's features, you must start a local server and access `/minisense-restful-api-docs/` through a browser.

## License

This Project is under the MIT license. See the file [LICENSE](link) for more details.
