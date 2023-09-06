import { StarWarsRepository } from './star-wars.repository'

export class PeopleRepository extends StarWarsRepository {
    constructor() {
        super('people')
    }
}