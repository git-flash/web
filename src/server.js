const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: './src' })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/projects', (req, res) => {
      app.render(req, res, '/projects')
    })

    server.get('/projects/:id', (req, res) => {
      app.render(req, res, '/projects/show', {
        id: req.params.id,
      })
    })

    server.get('/tasks/:id', (req, res) => {
      app.render(req, res, '/tasks/show', {
        id: req.params.id,
      })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(process.env.PORT || 3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
