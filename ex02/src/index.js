const express = require("express")
const axios = require("axios")
var bodyParser = require('body-parser')
const fs = require('fs');

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const api = axios.create({
    baseURL: "https://swapi.dev/api"
});

const readFile = () => {
    const content = fs.readFileSync('./src/data/db.json', 'utf-8');
    return JSON.parse(content);
};

const writeFile = (content) => {
    const updateFile = JSON.stringify(content)
    fs.writeFileSync('./src/data/db.json', updateFile, 'utf-8')
}

app.get("/:category", async (req, res) => {
    const { category } = req.params
    try {
        const { data } = await api.get(`/${category}/`)
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send()
    }
});
app.get("/:category/:id", async (req, res) => {
    const { category, id } = req.params
    try {
        const { data } = await api.get(`/${category}/${id}`)
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send()
    }
});

app.get('/', (req, res) => {
    const content = readFile();
    res.send(content)
});

app.post('/', (req, res) => {
    console.log(req);
    const { name, height, mass } = req.body
    const currentContent = readFile()

    const id = Math.floor(Math.random() * 100).toString()
    currentContent.push({ id, name, height, mass })
    writeFile(currentContent)
    res.send({ id, name, height, mass })
});

app.put('/:id', (req, res) => {
    const { id } = req.params
    const { name, height, mass } = req.body

    const currentContent = readFile()
    const selectedItem = currentContent.findIndex((item) => item.id === id)

    const { id: currentId, name: currentName, height: currentHeight, mass: currentMass } = currentContent[selectedItem]

    const newObject = {
        id: currentId,
        name: name ? name : currentName,
        height: height ? height : currentHeight,
        mass: mass ? mass : currentMass
    }

    currentContent[selectedItem] = newObject

    writeFile(currentContent)
    res.send(currentContent)
});

app.delete('/:id', (req, res) => {
    const { id } = req.params
    const currentContent = readFile()
    const selectedItem = currentContent.findIndex((item) => item.id === id)
    currentContent.splice(selectedItem, 1)

    writeFile(currentContent)
    res.send(true)
});

app.listen(8081, () => {
    console.log("Servidor Iniciado!")
});

