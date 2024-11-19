const express = require('express')
const  connectDb  = require('./config/database')
const app = express()
const User=require("./models/user");


app.use(express.json());




// This is how we can get the data from database with specify email get request

app.get("/user",async (req,res)=>{
	const userEmail= req.body.email;
	console.log(userEmail);
	

	try {
		const users=await User.find({Email:userEmail});
		res.send(users);
		
	} catch (error) {
		res.status(404).send("user not found");
	}
} )


//This is how we can update in the database 


app.patch("/user",async (req,res)=>{
	const userId=req.body.userId;


	// here body will replace all the actual update you want
	const body=req.body;
	console.log(userId);
	
	try {
		const users=await User.findByIdAndUpdate({_id:userId}, body);
		res.send(users);
		console.log("updated succesfully");
		
	}  catch (error) {
		res.status(401).send("error during adding")
	}
} )



// This is how we can delete the required user from database

// app.delete("/user",async (req,res)=>{
// 	const userEmail=req.body.userEmail;
// 	console.log(userEmail);	
// 	try {
// 		const users=await User.findOneAndDelete({Email:userEmail});
// 		res.send(users);
// 	}  catch (error) {
// 		res.status(401).send("error during adding")
// 	}
// } )

app.delete("/user",async (req,res)=>{
	const userid=req.body.userId;
	console.log(userid);
	
	try {
		const users=await User.findByIdAndDelete({_id:userid});
		res.send(users);
	}  catch (error) {
		res.status(401).send("error during adding")
	}
} )


app.post("/signup",async (req,res)=>{
	console.log("adding into database");
	const user=new User(req.body);

	try {
		
		await user.save();
		res.send("user added succesfully")
	} catch (error) {
		res.status(401).send("erro during adding")
	}


})
connectDb().then(()=>{
    console.log("connected to database");
	app.listen(4000, () => {
		console.log("server connecting...");
	})
}).catch((err)=>{
    console.error("data base cannot connected");
})


