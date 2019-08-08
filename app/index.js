const Koa = require('koa')
const app = new Koa()
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const mongoose = require('mongoose')
const path = require('path')
const routing = require('./routes')
const { connectionSrt } = require('./config')

mongoose.connect(connectionSrt, { useNewUrlParser: true }, () =>
  console.log('mongodb connect success!')
)
mongoose.connection.on('error', console.error)
app.use(koaStatic(path.join(__dirname, 'public')))
app.use(
  error({
    postFormat: (e, { stack, ...rest }) =>
      process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
  })
)
app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, '/public/uploads'),
      keepExtensions: true
    }
  })
)
app.use(parameter(app))
routing(app)

app.listen(3000, () => {
  console.log('server run 3000 ports')
})
