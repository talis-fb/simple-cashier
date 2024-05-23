# Yet Another Simple Cashier System

This is a web application designed to streamline the process of registering and tracking purchases within a store or small business. 

It features a interface that allows users to easily select their profile, record new purchases, and view their purchase history.

## Demo

Website: https://simple-cashier-demo.onrender.com/

Google Spreadsheet with data being stored: [SPREADSHEET](https://docs.google.com/spreadsheets/d/1pzar1uKSbaZW0ibTtNS1fbmfsQZfeSNp9l23T3hBh3E/edit?usp=sharing)


## How it works
The application uses two YAML files in the root folder, `registros.yaml` and `usuarios.yaml`, to set up the users and define the available purchase options for each user. All information is stored in a Google Sheets spreadsheet, eliminating the need for a traditional database. The system integrates with the **Google Sheets API** to manage and retrieve data.

## 🔧 Technologies Used
* Language: 
    * TypeScript
* Backend: 
    * [NestJS](https://nestjs.com/)
* Frontend: 
    * [Vue.js](https://vuejs.org/)
    * [Vuetify](https://vuetifyjs.com/)

## Getting Started
### Backend
```
cd backend
yarn install
yarn start:dev
```

### Frontend
```
cd frotend
yarn install
yarn dev
```

### Docker Setup
You can also use Docker to build and run the overall application. A Dockerfile is provided in the root folder to set up a container with everything needed.
```
docker build -t simple-cashier-system .
docker run -p 8080:8080 simple-cashier-system
```

### License
This project is licensed under the MIT License.