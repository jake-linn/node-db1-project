const router = require('express').Router()
const Account = require("./accounts-model");
const {checkAccountId, checkAccountNameUnique, checkAccountPayload} = require("./accounts-middleware");


router.get('/', (req, res, next) => {
  Account.getAll()
    .then(accounts => res.json(accounts))
    .catch(next)
})

router.get('/:id', checkAccountId, (req, res) => {
  res.json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  const name = req.body.name.trim()
  const budget = req.body.budget
  Account.create({ name, budget })
    .then(account => res.status(201).json(account))
    .catch(next)
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  const id = req.params.id
  const body = req.body
  Account.updateById(id, body)
    .then(account => res.json(account))
    .catch(next)
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  const id = req.params.id
  Account.deleteById(id)
    .then(account => res.json(account))
    .catch(next)
})
router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
})
module.exports = router;
