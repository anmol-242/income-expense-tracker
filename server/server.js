const express= require('express'); 
const cors = require('cors')
const app= express();
require('./config/dbConnect');
const usersRoute=require('./routes/users/usersRoute')
const accountsRoute=require('./routes/accounts/accountsRoute')
const transactionsRoute=require('./routes/transactions/transactionsRoute');
const globalErrorHandler = require('./middlewares/globalErrorHandler');

const PORT= process.env.PORT || 5000;


app.use(express.json());

app.use(cors());

app.use('/api/v1/users',usersRoute);

app.use('/api/v1/transactions',transactionsRoute);

app.use('/api/v1/accounts',accountsRoute);


app.use(globalErrorHandler);


app.listen(PORT,()=>{
    console.log(`Server is running at https://localhost:${PORT}`);
    
});