const express = require('express');
const mongoose = require('mongoose');

const authRouter = require("./routes/auth.js");
const DB = "mongodb+srv://masud:masud@cluster0.b6xgb5b.mongodb.net/?retryWrites=true&w=majority";
//INIT
const app = express();
const PORT = 3000;

//middleware
//CLIENT -> middleware -> SERVER -> CLIENT
app.use(express.json());
app.use(authRouter);

// database connections
mongoose.connect(DB).then(()=>{
    console.log("connection successful");
})
.catch((e) =>{console.log(e)});


app.listen(PORT,"0.0.0.0", ()=>{
    console.log(`connected to the port ${PORT}`);
});