//required modules

const express = require("express");
const path = require("path");

//mongo set-up
    const { MongoClient, ObjectId } = require("mongodb");

    //mongo connection to database
    const dbUrl = "mongodb://127.0.0.1:27017/ecothumbsDb";
    const client = new MongoClient(dbUrl);

//set up express and port
const app =express();
const port = process.env.PORT || "8808";

//define important folders
app.set("views", path.join(__dirname, "views"));

//app.set -- set up pug engine
app.set("view engine", "pug");

//set-up public folder
app.use(express.static(path.join(__dirname, "public")));

//app req res
app.get("/", (request, response) => {
    response.render("index", { title: "Home" });
});

app.get("/shop", async (request, response) => {
    let plant = await getItems();
    response.render("shop", {title: "Shop", plants: plant });
});

app.get("/about", async (request, response) => {
    let plant = await getItems();
    response.render("about", {title: "About" });
});

app.get("/cart",async (request, response) => {
    let plant = await getItems();
    response.render("cart", {title: "Cart" });
});



//listening
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});

// //admin
// app.get("/admin/menu", async (reques, response) => {
//     let links = await getLinks();
//     response.render("menu-list", {title: "Menu Admin", menu : links});
// });


//Async Functions
async function connection(){
    await client.connect();
    db = client.db("ecothumbsDb");
    return db;
}

async function getItems(){
    db = await connection();
    var results = db.collection("PlantItems").find({});
    res = await results.toArray();
    return res;
}