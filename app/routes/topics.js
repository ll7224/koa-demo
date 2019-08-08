const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({ prefix: '/topics' })
const {
  find,
  findById,
  create,
  updated,
  listTopicFollower,
  checkTopicExits,
  listQuestion
} = require('../controllers/topic')

const { secret } = require('../config')

const auth = jwt({ secret })

router.get('/', find)
router.post('/', auth, create)
router.get('/:id', checkTopicExits, findById)
router.patch('/:id', auth, checkTopicExits, updated)
router.get('/:id/followers', checkTopicExits, listTopicFollower)
router.get('/:id/questions', checkTopicExits, listQuestion)
module.exports = router
