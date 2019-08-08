const Router = require('koa-router')
const router = new Router({ prefix: '/users' })
const jwt = require('koa-jwt')
const { secret } = require('../config')

const {
  find,
  findById,
  create,
  upDated,
  delete: del,
  login,
  checkOnwer,
  listFollowing,
  listFollower,
  checkUserExits,
  follow,
  unfollow,
  listFollowingTopic,
  followTopic,
  unfollowTopic,
  listQuestions,
  listLikingAnswers,
  likeAnswers,
  unlikeAnswers,
  listDisLikingAnswers,
  disLikeAnswers,
  undDislikeAnswers,
  listCollectingAnswers,
  collectingAnswers,
  unCollectingAnswers
} = require('../controllers/users')

const { checkTopicExits } = require('../controllers/topic')

const { checkAnswerExist } = require('../controllers/answers')

const auth = jwt({ secret })

router.get('/', find)

router.post('/', create)

router.get('/:id', findById)

router.patch('/:id', auth, checkOnwer, upDated)

router.delete('/:id', auth, checkOnwer, del)

router.post('/login', login)

router.get('/:id/following', listFollowing)

router.get('/:id/followers', listFollower)

router.put('/following/:id', auth, checkUserExits, follow)

router.delete('/following/:id', auth, checkUserExits, unfollow)

router.get('/:id/followingTopic', listFollowingTopic)

router.put('/followingTopic/:id', auth, checkTopicExits, followTopic)

router.delete('/followingTopic/:id', auth, checkTopicExits, unfollowTopic)

router.get('/:id/questions', listQuestions)

router.get('/:id/likingAnswers', listLikingAnswers)

router.put(
  '/likingAnswers/:id',
  auth,
  checkAnswerExist,
  likeAnswers,
  undDislikeAnswers
)

router.delete('/likingAnswers/:id', auth, checkAnswerExist, unlikeAnswers)

router.get('/:id/disLikingAnswers', listDisLikingAnswers)

router.put(
  '/disLikingAnswers/:id',
  auth,
  checkAnswerExist,
  disLikeAnswers,
  unlikeAnswers
)

router.delete(
  '/disLikingAnswers/:id',
  auth,
  checkAnswerExist,
  undDislikeAnswers
)
router.get('/:id/collectingAnswers', listCollectingAnswers)

router.put('/collectingAnswer/:id', auth, checkAnswerExist, collectingAnswers)

router.delete(
  '/collectingAnswer/:id',
  auth,
  checkAnswerExist,
  unCollectingAnswers
)
module.exports = router
