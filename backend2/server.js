const baseImg = require('./baseImg');

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const cors = require('cors');
app.use(cors({
    origin: 'http://127.0.0.1:5500'
})); 

const {MongoClient} = require('mongodb');

/*const professional = {
     professionalName: "Alex Courter",
     base64Image: baseImg,
     nameLink: {firstName: "Alex", url: "#"},
     primaryDescription: "Author, Father, Developer",
     workDescription1: "Web full-stack development",
     workDescription2: "Dad jokes",
     linkTitleText: "Links",
     linkedInLink: {text: "LinkedIn", link: "https://www.linkedin.com/in/alex-courter/"},
     githubLink: {text:"GitHub", link:"https://github.com/AlexxCourter"}
    }; */

const professional = dataBaseConnect();

app.get('/professional', (req, res) => {
    res.send(professional);
});

// app.get('/api/professional/:id', (req, res) => {
//     const test = tests.find(c => c.id === parseInt(req.params.id));
//     if (!test) {res.status(404).send('404 Error: test with the ID of ' + req.params.id + " was not found.")}
//     res.send(test);
// });

app.listen(port, () => console.log('listening on port ' + port));

async function dataBaseConnect() {
    const uri = "";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        return await listDatabases(client);
    }
    catch (e) {
        console.error(e);
    }

    finally {
        await client.close();
    }
    
}

async function listDatabases(client) {
    const list = await client.db().admin().listDatabases();

    console.log(list);
    return list;
}