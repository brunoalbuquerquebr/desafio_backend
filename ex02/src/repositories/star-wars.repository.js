import axios from "axios";


export class StarWarsRepository {
    constructor(category) {
        this.category = category
        this.http = axios.create({
            baseURL: "https://swapi.dev/api"
        });
    }

    async getAll() {
        try {
            const { data } = await api.get(`/${this.category}/`)
            return data
        } catch (error) {
            console.error(error);
        }
    }

    async getById(id) {
        try {
            const { data } = await api.get(`/${this.category}/${id}`)
            return data
        } catch (error) {
            console.error(error);
        }
    }
}