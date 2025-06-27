import express from 'express'
import fs from 'fs'

const project = express.Router()

project.get('/api/project', (_, res) => {
  const result = fs.readdirSync('./logs', { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
  res.status(200).json({ result })
})

export { project }
