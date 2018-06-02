const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// load Idea Model
require('../models/Idea')
const Idea = mongoose.model('ideas')

// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

// idea index page
router.get('/', (req, res) => {
  Idea.find({})
    .sort({ date: 'desc' })
    .then(ideas => {
      res.render('ideas/index', {
        ideas,

      })
    })
})

// idea index page
router.get('/edit/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
    .then(idea => {
      res.render('ideas/edit', { idea: idea })
    })
})

// add idea form
router.get('/add', (req, res) => {
  res.render('ideas/add')
})

// process form

router.post('/', (req, res) => {
  let errors = []
  if (!req.body.title) errors.push({ text: 'Please add a title' })
  if (!req.body.details) errors.push({ text: 'Please add some details' })

  if (errors.length > 0) res.render('ideas/add', {
    errors,
    title: req.body.title,
    details: req.body.details 
  })
  else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    }
    new Idea(newUser)
      .save()
      .then(idea => {
        req.flash('success_msg', 'Video idea added')
        res.redirect('/ideas')
      })
  }
})

// edit form process
router.put('/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
    .then(idea => {
      // new values
      [idea.title, idea.details] = [req.body.title, req.body.details]

      idea.save()
        .then(idea => {
          res.redirect('/ideas')
        })
    })
})

// delete idea
router.delete('/:id', (req, res) => {
  Idea.remove({ _id: req.params.id })
    .then(() =>  {
      req.flash('success_msg', 'Video idea removed')
      res.redirect('/')
    })
})

module.exports = router