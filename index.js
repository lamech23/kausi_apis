const express =require ("express");
const db =require( "./config/Database.js");
const cors =require('cors')
require('dotenv').config()
const userRoute =require('./Routes/user')
const uploadRoute =require('./Routes/Upload')
const contact =require('./Routes/GetInTouch')
const moreAboutClient =require('./Routes/ClientMore')
const NewsLetters=require('./Routes/NewsLetterRoute.js')
const TotalHouses=require('./Routes/TotalDetailsRoute')
const relatedHouses=require('./Routes/RelatedHousesRoute')
const Houses=require('./Routes/PaginationRoute')
const Mail=require('./Routes/SendEmailRoute')
const search=require('./Routes/SearchApiRoute')
const tours=require('./Routes/TourRequestRoute')
const helpCenter=require('./Routes/HelpCenterRoute')
const image=require('./Routes/imageRoute.js')
const houseRegisration=require('./Routes/RentingRoutes/HouseRegistrationRoute.js')
const waters =require('./Routes/RentingRoutes/waterRoute.js')
const garbagePrice =require('./Routes/RentingRoutes/garbageRoutes.js')
const paymentRequests =require('./Routes/RentingRoutes/paymentRequestRoutes.js')
const TenantRegistering=require('./Routes/RentingRoutes/TenantRegistrationRoute.js')
const account =require('./Routes/accountRoute.js')
const loginProccess=require('./Routes/loginProccessRoutes.js')
const createCategory=require('./Routes/category.js')
const propertyType=require('./Routes/propertyType.js')
const bodyParser = require('body-parser');
const {verifyToken} =require('./middlleware/token');

const cookieParser = require("cookie-parser")
const app = express()
const fs = require('fs');
const http = require("http");
const CLIENT_URL = process.env.CLIENT_URL;
const socketConfiguration = require("./configs/socketConfiig.js");

app.use(cors());

// middleware to look if the req has some body to it if true passed on to req to the object

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// routes for postman testing
//static
app.use(cookieParser());
app.use("/Images", express.static("./Images"));


const server = http.createServer(app);

//connection to database

try{
    db.authenticate()
    console.log('database connected');
  server.listen(process.env.PORT, () =>
  console.log('Server running on port',process.env.PORT))

}catch(err){
    console.log('Connection error')
}
// routes

//middleware


//socket connection
socketConfiguration(server, CLIENT_URL);



app.use('/Details', uploadRoute);
app.use('/Users' , userRoute);
app.use('/contacts', contact);
app.use('/client',  moreAboutClient);
app.use('/news',  NewsLetters);
app.use('/Total', TotalHouses);
app.use('/RelatedHouses', relatedHouses);
app.use('/paginatedHouses', Houses);
app.use('/AdminMail',  Mail);
app.use('/searching', search);
app.use('/ClientTour',  tours);
app.use('/help', helpCenter);
app.use('/houseRegister',  houseRegisration);
app.use('/water',  waters);
app.use('/Tenant',  TenantRegistering);
app.use('/images',  image);
app.use('/cat', createCategory);
app.use('/type',  propertyType);
app.use('/proccess',  loginProccess);
app.use('/garbage',  garbagePrice);
app.use('/payment',  paymentRequests);
app.use('/Acc',  account);



















