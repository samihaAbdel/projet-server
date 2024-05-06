const express= require('express');
const connectDB =require ('./Config/DbConnection');
const dotenv = require("dotenv");
const cors = require('cors');
const usersRoutes= require ('./Routes/user');
const postsRoutes= require ('./Routes/post');


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "10mb", extended: true}));


connectDB();
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
const PORT = process.env.PORT;
app.listen(PORT, (err) =>
    err ? console.log(err) : console.log(`server is running on PORT ${PORT}`)
);
