export class PeopleService {
    constructor(peopleRepository, dataRepository) {
        this.peopleRepository = peopleRepository
        this.dataRepository = dataRepository
    }

    async getAll() {
        return await this.dataRepository.getAll()
    }

    async getById(req, res) {
        return await this.dataRepository.getById()
    }

    addPeople(req, res) {
        const { name, height, mass } = req.body
        const currentContent = readFile()

        const id = Math.floor(Math.random() * 100).toString()
        currentContent.push({ id, name, height, mass })
        writeFile(currentContent)
        res.send({ id, name, height, mass })
    }

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
    }

    deletePeople(req, res) {
        const { id } = req.params
        const currentContent = readFile()
        const selectedItem = currentContent.findIndex((item) => item.id === id)
        currentContent.splice(selectedItem, 1)

        writeFile(currentContent)
        res.send(true)
    }
}