import cors from 'cors'
import express from 'express'

import { hello } from './api/hello/index.mjs'

const app = express()
const router = express.Router()

// Middleware declaration

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
router.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// body parser declaration
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.use((req, _, next) => {
  let hasRouteToHandle = null
  router.stack.forEach((stackItem) => {
    // check if current rout path matches route request path
    if (stackItem.handle?.stack !== undefined) {
      stackItem?.handle.stack.forEach((innerItem) => {
        if (innerItem.regexp.test(req.path)) {
          hasRouteToHandle = true
        }
      })
    }
  })

  const msg = `${req.method} ${req.path} - ${req.headers['x-forwarded-for'] || req.ip}`

  if (hasRouteToHandle) {
    logger.http(msg)
  } else {
    // No matching route for this request
    logger.error(msg)
  }

  next()
})

// Routes declaration

// /api/hello
router.use(hello)


app.use(router)

export { app }
