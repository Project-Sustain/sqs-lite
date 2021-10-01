const MongoClient = require('mongodb').MongoClient;
const url = `mongodb://localhost:27018`;

let dbInterface;
MongoClient.connect(url, async function (err, client) {
    if (err) {
        throw `Error connecting to mongodb @${url}`
    };
    console.log(`Connected to MongoDB @${url}`)
    const db = client.db("sustaindb");
    dbInterface = db;
    const startTime = Date.now()
    const mongoCollection = await dbInterface.collection("trails_geo");
    const cursor = await mongoCollection.aggregate([{"$match":{"geometry":{"$geoIntersects":{"$geometry":{"type":"Polygon","coordinates":[[[-109.6875,42.1875],[-101.25,42.1875],[-101.25,36.5625],[-109.6875,36.5625],[-109.6875,42.1875]]]}}}}}])
    console.log(`get cursor: ${Date.now() - startTime}ms`)
    // const arr = await cursor.toArray()
    // console.log(`arr: ${Date.now() - startTime}ms`)
    for await (const z of cursor) {

    }
    // cursor.stream().on("end", () => console.log("done"));
    console.log(`loop thru: ${Date.now() - startTime}ms`)
    // cursor.stream().on("data", () => {console.log('e')});
    // cursor.stream().on("end", () => {console.log(`stream thru: ${Date.now() - startTime}ms`)});
});