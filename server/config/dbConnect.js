const mongoose= require('mongoose');

const conn= async() =>{
    try {
        await mongoose.connect(``); // add your mongodb cluster connection string 
        console.log("Connected Succesfully");
    } catch (error) {
        console.log("Connection Failed");
        process.exit(1);
    }

};

conn();
