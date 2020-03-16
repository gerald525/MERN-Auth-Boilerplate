let db = require('../models')
let router = require('express').Router()

// let testDogs = [
//   { breed: 'Mutt', owner: 'David', name: 'Jasper' },
//   { breed: 'Pittlab', owner: 'Nick', name: 'Noah' },
//   { breed: 'Cocker Spaniel', owner: 'Shannon', name: 'Elle Chaunte' },
//   { breed: 'Lab', owner: 'Rebecca', name: 'Mochi' },
//   { breed: 'Cockarat', owner: 'Kennan', name: 'Millie' },
//   { breed: 'Goldie', owner: 'Yashoma', name: 'Lion' }
// ]

router.get('/', (req, res) => {
  res.send({ dogs: req.user.dogs })
})

router.post('/', (req, res) => {
  // First get the user from the DB using the id in req.user
  db.User.findOne(req.user.id)
  .then(user => {

    // Push a new dog to the user's pets array
    user.dogs.push({
      name: 'New Dog',
      breed: 'Weasel',
      age: 47
    })

    // Save the changes to the DB
    user.save().then(() => {
      res.send({ dogs: user.dogs})
    })
    .catch(err => {
      console.log('Aww suck', err)
      res.status(503).send({ message: 'Error saving document' })
    })
  })
  .catch(err => {
    console.log('Server error', err)
    res.status(500).send({ message: 'Server error' })
  })
})

module.exports = router
