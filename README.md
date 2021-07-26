# Parking API

[NodeJS | Express | MongoDB]

<br/>

## Instructions

1. Install project dependencies

   > `npm install`

2. Provide MongoDB connection string in **.env.sample** file in project root

   > (rename .env.sample to **.env**)

3. Start the API server
   > `npm start`

<br/>

## Online Deployment

https://parking-api-test.herokuapp.com/api/v1/

<br/>

## API Endpoints

| HTTP Method | Endpoint                                                                                          | Description                         | Body                                                                                                                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST        | [/register](https://parking-api-test.herokuapp.com/api/v1/register "/register")                   | User Registration                   | - **email** string <br/>- **firstName** string <br/>- **lastName** string <br/>- **registrationNumber** string <br/>-**userCategory** number [**0** (General) or **1** (Reserved)] <br/>**password** string <br/> |
| POST        | [/book](https://parking-api-test.herokuapp.com/api/v1/book "/book")                               | Book a parking slot                 | - **email** string <br/>- **password** string <br/>                                                                                                                                                               |
| GET         | [ /users](https://parking-api-test.herokuapp.com/api/v1/users " /users")                          | Total registered users (count)      |
| GET         | [/users/list](https://parking-api-test.herokuapp.com/api/v1/users/list "/users/list")             | Full list of registered users       |
| GET         | [/parking](https://parking-api-test.herokuapp.com/api/v1/parking "/parking")                      | Status/Count of Parking slots       |
| GET         | [/parking/availableslots](https://parking-api-test.herokuapp.com/api/v1/parking/availableslots)   | List of all available parking slots |
| GET         | [/parking/occupiedslots](https://parking-api-test.herokuapp.com/api/v1/ "/parking/occupiedslots") | List of all occupied parking slots  |

<br/>

## Examples

#### POST /register

```json
{
  "email": "john@gmail.com",
  "firstName": "John",
  "lastName": "Doe",
  "registrationNumber": "MH-1234-5678",
  "userCategory": "1",
  "password": "yourpassword"
}
```


#### POST /book

```json
{
  "email": "john@gmail.com",
  "password": "yourpassword"
}
```
