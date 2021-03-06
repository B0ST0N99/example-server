const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express()
const { config, engine } = require('express-edge')
const cors = require('cors')
const appPort = require('config').get('appPort')

const db = require('./server/lib/db')
const { passport } = require('./server/lib/auth')

config({ cache: false })

app.use(cors())
app.use(engine)
app.set('views', `${__dirname}/server/views`)
app.use(cookieParser())
app.use(
  session({ secret: 'SECRET', resave: false, saveUninitialized: true, cookie: { secure: false } })
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', require('./server/routes'))

app.listen(appPort, () => {
  console.info(`Server started: http://localhost:${appPort}`)
})

process.on('unhandledRejection', (error) => {
  console.log(error)
  // log(error)
})
