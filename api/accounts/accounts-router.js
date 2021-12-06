
// Router Variables
const router = require('express').Router()
const Account = require('./accounts-model')
const {checkAccountPayload, checkAccountNameUnique, checkAccountId} = require('./accounts-middleware')

// Router Actions
router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll()
    res.json(accounts)
  } catch(err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, (req, res, next) => {
  const {id} = req.params
  Account.getById(id)
  .then(account => {
    res.status(200).json(account)
  })
  .catch(err => {
    res.status(400).json({message: err.message})
  })
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Account.create(req.body)
  .then(newAccount => {
    res.status(201).json(newAccount)
  })
  .catch(err => {
    res.status(400).json({message: err.message})
  })
})

router.put('/:id', checkAccountId, (req, res, next) => {
  const {id} = req.params
  Account.updateById(id, req.body)
  .then(updatedAccount => {
    res.status(200).json(updatedAccount)
  })
  .catch(err => {
    res.status(400).json({message: err.message})
  })
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    await Account.deleteById(req.params.id)
    res.json(req.account)
    res.json('deleted account')
  } catch(err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message
  })
})

// Exports
module.exports = router;
