# CustomersApp-Frontend

CustomersApp-Frontend is an Angular web application for adding and viewing customer details. The details include the customer's first name, last name, email, mobile number, and address.

The app implements an autocomplete feature for the address by calling the Google Places API.

### Prerequisites:

- You must have npm and nodejs installed.
- The backend application must be running. Instructions on how to run the backend can be found in https://github.com/daredev127/CustomersApp-Backend.


### To use the application:

Navigate to your preferred directory and clone the project 
```
git clone https://github.com/daredev127/CustomersApp-Frontend.git
```

Navigate to the the customers-app directory.
```
cd CustomersApp-Frontend\customers-app
```

Install the necessary npm packages.
```
npm install
```

This application uses the Google Places API to autocomplete input addresses. For this feature to work, you need an API Key. Follow the steps in the following links to get your API Key:
- https://developers.google.com/maps/documentation/places/web-service/cloud-setup
- https://developers.google.com/maps/documentation/places/web-service/get-api-key

Save the API Key for now. We will need it later.

Generate the environment files.
```
ng g environments
```
This command will generate the following files:
- src\environments\environment.ts
- src\environments\environment.development.ts

Replace the contents of both files with the following:
```
export const environment = {
  CUSTOMER_API_URL: 'https://localhost:7051/api/customer/',
  GOOGLE_PLACES_KEY: '<Your Google Places API Key>',
};
```
Replace the Google Places API Key with the API Key you got earlier.

Run the Angular application
```
ng serve
```

The application can be accessed in the following URL:
```
http://localhost:4200/
```