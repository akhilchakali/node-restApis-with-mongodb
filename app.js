const express = require("express")
const {MongoClient} = require("mongodb")

const  app = express()
app.use(express.json())

let client ;

const initializeDbAndServer = async() => {
    const uri = "mongodb+srv://akhil1414:Akhil143mom@cluster0.j57oh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    client = new MongoClient(uri)

    try{
        console.log("connected to mongodb")
        app.listen(3000, ()=>{
            console.log("server running on http://localhost:3000")
        })
    }catch(error){
        console.log(error)
        process.exit(1)
    }

}

initializeDbAndServer()

app.get("/names" , async (request, response) => {
    const collection = client.db('nxttrends').collection('product')
    const result = await collection.find().toArray()
    response.send(result)
})

app.post("/addItem", async(request, response)=>{
    const list = request.body
    const collection = client.db('nxttrends').collection('product')
    const result = await collection.insertOne(list)
    response.send("Item added")
})

app.put('/updateItem', async (request, response) => {
    const collection = client.db('nxttrends').collection('product')
    const result = await collection.updateOne({date:"30/09/2024"}, {$set:{date:"17/10/2024"}})
    response.send("Details Updated Successfully")
})

app.delete("/deleteItem" , async(request,response)=>{
    const collection = client.db('nxttrends').collection('product')
    const result = await collection.deleteOne({$and:[{name:"Akhil"},{age:24}]})
    response.send("Item Deleted")
})