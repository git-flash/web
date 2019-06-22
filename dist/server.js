'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const next_1 = __importDefault(require('next'))
const express_1 = __importDefault(require('express'))
const compression_1 = __importDefault(require('compression'))
const path_1 = require('path')
const url_1 = require('url')
const dev = process.env.NODE_ENV !== 'production'
const app = next_1.default({ dev })
const handle = app.getRequestHandler()
app
  .prepare()
  .then(() => {
    const server = express_1.default()
    if (process.env.NODE_ENV === 'production') {
      server.use(compression_1.default())
    }
    server.get('/projects', (req, res) => {
      app.render(req, res, '/projects')
    })
    server.get('/projects/new', (req, res) => {
      app.render(req, res, '/projects/new')
    })
    server.get('/projects/:id/edit', (req, res) => {
      app.render(req, res, '/projects/edit', {
        id: req.params.id,
      })
    })
    server.get('/projects/:id', (req, res) => {
      app.render(req, res, '/projects/show', {
        id: req.params.id,
      })
    })
    server.get('/authentication', (req, res) => {
      app.render(req, res, '/authentication')
    })
    server.get('*', (req, res) => {
      const parsedUrl = url_1.parse(req.url, true)
      const { pathname } = parsedUrl
      if (pathname === '/service-worker.js') {
        const filePath = path_1.join(__dirname, '.next', pathname)
        app.serveStatic(req, res, filePath)
      } else {
        handle(req, res, parsedUrl)
      }
    })
    server.listen(process.env.PORT || 3000, () => {
      console.log('⚡️ Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
//# sourceMappingURL=server.js.map
