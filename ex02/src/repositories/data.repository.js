import fs from 'fs'
import path from 'path';

export class DataRepository {
    constructor() {
        this.filepath = path.resolve(__dirname, './src/data/db.json');
    }

    async getAll() {
        try {
            return await this._readFile()
        } catch (error) {
            console.error(error);
        }
    }

    async save(content) {
        try {
            await this._writeFile(content)
        } catch (error) {
            console.error(error);
        }
    }

    update(id, content) {

        const currentContent = this._readFile()
        const selectedItem = currentContent.findIndex((item) => item.id === id)

        const { id: currentId, name: currentName, height: currentHeight, mass: currentMass } = currentContent[selectedItem]

        const newObject = {
            id: currentId,
            name: content.name ? content.name : currentName,
            height: content.height ? content.height : currentHeight,
            mass: content.mass ? content.mass : currentMass
        }

        currentContent[selectedItem] = newObject

        this._writeFile(currentContent)
        return currentContent
    }

    async _readFile() {
        const content = await fs.promises.readFile(this.filepath, 'utf-8');
        return JSON.parse(content);
    }

    async _writeFile(content) {
        const updateFile = JSON.stringify(content)
        await fs.promises.writeFile(this.path, updateFile, 'utf-8')
    }
}