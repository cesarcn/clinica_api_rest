const {MongoClient} = require("mongodb");
const client = new MongoClient("mongodb+srv://CesarC:12345@cluster0.mgfgs.mongodb.net/?retryWrites=true&w=majority");

client.connect().then(
    (response) => {
        console.log('La conexion a la bd es correcta -url:'+ response.url);
    },
    (error) => {
        console.log('error:' + error);
    }
)

// EXPORTAR MODULO
module.exports = client;