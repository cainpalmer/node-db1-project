
// Router Variables
const router = require('express').Router()
const MW = require('./accounts-middleware')
const Account = require('./accounts-model')

// Router Actions
router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll()
    res.json(accounts)
  } catch(err) {
    next(err)
  }
})

router.get('/:id', MW.checkAccountId, (req, res, next) => {
  res.json(req.account)
})

router.post('/', (req, res, next) => {
  //
})

router.put('/:id', (req, res, next) => {
  // 
});

router.delete('/:id', (req, res, next) => {
  //
})

router.use((err, req, res, next) => { // eslint-disable-line
  //
})

// Exports
module.exports = router;
