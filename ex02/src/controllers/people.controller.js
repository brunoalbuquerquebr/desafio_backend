const express = require("express")
const bodyParser = require('body-parser')
const fs = require('fs');

const app = express()

export class PeopleController {
    constructor(peopleService) {
        this.peopleService = peopleService
    }

    async getAll(req, res) {
        try {
            const { data } = await this.peopleRepository.getAll()
            res.status(200).send(data)
        } catch (error) {
            res.status(404).send()
        }
    }

    async getById(req, res) {
        const { id } = req.params
        try {
            const { data } = await this.peopleRepository.getById(id)
            res.status(200).send(data)
        } catch (error) {
            res.status(404).send()
        }
    }
}

const readFile = () => {
    const content = fs.readFileSync('./src/data/db.json', 'utf-8');
    return JSON.parse(content);
};

const writeFile = (content) => {
    const updateFile = JSON.stringify(content)
    fs.writeFileSync('./src/data/db.json', updateFile, 'utf-8')
}

const PeopleController = {
    async getAll(req, res) {
        const { category } = req.params
        try {
            const { data } = await api.get(`/${category}/`)
            res.status(200).send(data)
        } catch (error) {
            res.status(404).send()
        }
    },

    async getById(req, res) {
        const { category, id } = req.params
        try {
            const { data } = await api.get(`/${category}/${id}`)
            res.status(200).send(data)
        } catch (error) {
            res.status(404).send()
        }
    },

    addPeople(req, res) {
        const { name, height, mass } = req.body
        const currentContent = readFile()

        const id = Math.floor(Math.random() * 100).toString()
        currentContent.push({ id, name, height, mass })
        writeFile(currentContent)
        res.send({ id, name, height, mass })
    },

    updatePeople(req, res) {
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
    },

    deletePeople(req, res) {
        const { id } = req.params
        const currentContent = readFile()
        const selectedItem = currentContent.findIndex((item) => item.id === id)
        currentContent.splice(selectedItem, 1)

        writeFile(currentContent)
        res.send(true)
    },

    listFile(req, res) {
        const content = readFile();
        res.send(content)
    }


};



module.exports = PeopleController