import next from 'next'
import express from 'express'
import compression from 'compression'
import { join } from 'path'
import { parse } from 'url'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    if (process.env.NODE_ENV === 'production') {
      server.use(compression())
    }

    server.get('/projects', (req: any, res: any) => {
      app.render(req, res, '/projects')
    })

    server.get('/projects/new', (req: any, res: any) => {
      app.render(req, res, '/projects/new')
    })

    server.get('/projects/:id/edit', (req: any, res: any) => {
      app.render(req, res, '/projects/edit', {
        id: req.params.id,
      })
    })

    server.get('/projects/:id', (req: any, res: any) => {
      app.render(req, res, '/projects/show', {
        id: req.params.id,
      })
    })

    server.get('/authentication', (req: any, res: any) => {
      app.render(req, res, '/authentication')
    })

    server.get('*', (req: any, res: any) => {
      const parsedUrl = parse(req.url, true)
      const { pathname } = parsedUrl

      if (pathname === '/service-worker.js') {
        const filePath = join(__dirname, '.next', pathname)
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
