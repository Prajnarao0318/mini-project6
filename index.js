const express=require("express")
const app=express()
const mongoose=require("mongoose")
app.set('view engine','ejs');
const https=require("https")
const body=require("body-parser")
app.use(body.urlencoded({extended:true}))
app.use(express.static("public"))

mongoose.connect("mongodb+srv://prajnarao002:<prajnarao03>@cluster.f2lxtll.mongodb.net/tododb",{useNewUrlParser:true})
// var lists=[]

//schema
const todoschema=new mongoose.Schema({task:String})

//model
const todomodel=mongoose.model("tasks",todoschema)

// const t1=new todomodel({task:"gaming"})

// t1.save()


app.get("/",function(req,res){

    todomodel.find().then((result) => {
        res.render("index",{tasks:result})
    }).catch((err)=>{
        console.log(err)
    });
})

app.post("/",function(req,res){
    var todotask=req.body.task
    // console.log(task)
    // lists.push(task)

    const task=new todomodel({task:todotask})

    task.save()

    res.redirect("/")
})

app.post("/delete",function(req,res){
    var item=req.body.checkbox

    todomodel.deleteOne({_id:item}).then((result)=>{
        res.redirect("/")
    }).catch((err)=>{
        console.log(err)
    });

    // console.log(item)
})

app.listen(  3001,function(){
    console.log("server is running in 3001")
})