
// Middleware Variables
const Account = require('./accounts-model')
const db = require('../../data/db-config')
const e = require('express')

// Middlewares
exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id)
    if (!account) {
      next({
        status: 404,
        message: 'account not found'
      })
    } else {
      res.account = account
      next()
    }
  } catch(err) {
    next(err)
  }
}
