let express = require('express');
let cors = require('cors');
let dotenv = require('dotenv');
dotenv.config();
let app = express();
let port = process.env.PORT || 5000
let Mongo = require('mongodb');
const { query } = require('express');
let MongoClient = Mongo.MongoClient;
let mongouturl = process.env.LiveMongo;
let bodyparser = require('body-parser')
const ObjectID = require('mongodb').ObjectId;
let db;

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.use(cors());

// base
app.get('/',(req,res)=>{
    db.collection('Allpacks').find().toArray((err,result)=>{
        if(err) {
            console.log(err , "err while listing");
            res.send("Error while connecting to  server :-(")
        }
        res.send("Every thing is fine :-)")
    })
} 
)



// list all data in database which is connected---------------------------------

app.get('/plans',(req,res)=>{
    db.collection('Allpacks').find().toArray((err,result)=>{
        if(err) console.log(err , "err while listing");
        res.send(result)
    })
} 
)


//filter plans by id---------------------------------

app.get('/plans/:id',(req,res) => {
    let _id = ObjectID(req.params.id)
    db.collection('Allpacks').find({"_id":_id}).toArray((err,result)=>{
        if(err){
            console.log(err , "err while filter the user");
            res.send("something went wrong in server")
        } 
        res.send(result)
    })
})


//filter type respect to cost---------------------------------

app.get('/filter/:type',(req,res)=>{
    let type = req.params.type
    let cost = Number(req.query.cost)
    var query ={}
    if(cost){
        query={"type":type,"cost": cost }
    }
    else if(type){
        query={"type":type }
    }
    else{
        query={}
    }
    db.collection('Allpacks').find(query).toArray((err,result)=>{
        if(err) console.log(err);
        res.send(result)
    })
})



// connect with database---------------------------------

MongoClient.connect(mongouturl,(err,client)=>{
    if(err) console.log('err while connect');
    db = client.db('Airtel');
  
    app.listen(port,()=>{
        console.log('servre is runnun in ' + port )
    })
    
})






