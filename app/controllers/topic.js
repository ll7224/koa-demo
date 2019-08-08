const Topic = require('../models/topic')
const User = require('../models/users')
const Question = require('../models/questions')

class TopicsCtl {
  async find(ctx) {
    const { per_page = 10 } = ctx.query
    const page = Math.max(ctx.query.page * 1, 1) - 1
    const perPage = Math.max(per_page * 1, 1)
    console.log(ctx.query.q)
    ctx.body = await Topic.find({ name: new RegExp(ctx.query.q) })
      .limit(perPage)
      .skip(perPage * page)
  }
  async findById(ctx) {
    const { fields = '' } = ctx.query
    console.log(fields)
    const selectFields = fields
      .split(';')
      .filter(f => f)
      .map(f => ' +' + f)
      .join('')
    console.log(selectFields)
    const topic = await Topic.findById(ctx.params.id).select(selectFields)
    ctx.body = topic
  }
  async checkTopicExits(ctx, next) {
    const topic = await Topic.findById(ctx.params.id)
    if (!topic) {
      ctx.throw(404, '话题不存在')
    }
    await next()
  }
  async create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      avatat_url: { type: 'string', required: false },
      introduction: { type: 'string', required: false }
    })
    const topic = await new Topic(ctx.request.body).save()
    ctx.body = topic
  }
  async updated(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      avatat_url: { type: 'string', required: false },
      introduction: { type: 'string', required: false }
    })
    const topic = await Topic.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    ctx.body = topic
  }
  async listTopicFollower(ctx) {
    const users = await User.find({ followingTopics: ctx.params.id })
    ctx.body = users
  }
  async listQuestion(ctx) {
    const questions = await Question.find({ topics: ctx.params.id })
    console.log(questions)
    ctx.body = questions
  }
}

module.exports = new TopicsCtl()
