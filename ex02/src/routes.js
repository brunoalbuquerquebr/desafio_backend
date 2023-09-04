const bodyParser = require('body-parser')
const router = require('express').Router()
const PeopleController = require('./controllers/people')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json())


router.get('/:category', PeopleController.getAll)
router.get('/:category/:id', PeopleController.getById)
router.post('/', PeopleController.addPeople)
router.get('/', PeopleController.listFile)
router.put('/:id', PeopleController.updatePeople)
router.delete('/:id', PeopleController.deletePeople)

module.exports = router