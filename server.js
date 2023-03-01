const express = require("express");

const app = express();

app.use(express.json())


app.listen(8000,()=> {
    console.log("working")
});

var contacts = [
    {
        id:"1",
        name:"shekar"
    }
] 

app.get('/contacts',(req,res)=>{
    res.send({
        success:true,
        message:"data received successfully",
        data:contacts
    })
})

//to add new contact to api

app.post('/contacts',(req,res)=> {
    var name = req.body.name
    if(name){
    contacts.push({
        id:(contacts.length + 1).toString(),
        name:name
    })
    res.send({
        success:true,
        message:"data added successfully"

    })
}
else{
    res.send({
        success:false,
        message:"error",
        errors:[{
            field:"name",
            message:"cannot be null"
        }]
    })
}
})

app.delete('/contacts/:id',(req,res)=>{
    var id = req.params.id
    const newContacts = contacts.filter(el => el.id !=id)
    contacts = newContacts
    res.send({
        success:true,
        message:"data deleted successfully"
    })
})

app.put('/contacts/:id',(req,res)=> {
    var id = req.params.id
    var name = req.body.name

 if(name){
    var index = contacts.findIndex(el => el.id == id)
    contacts[index] = {
        ...contacts[index],
        name:name
    }
    res.send({
        success:true,
        message:"data updates successfully"
    })
}
else{
    res.send({
        success:false,
        message:"error",
        errors:[
            {
            field:"name",
            message:"cannot be null"
        }
        ]
    })
}
})