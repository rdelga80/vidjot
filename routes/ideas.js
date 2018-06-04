const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// load helper
const { ensureAuthenticated } = require('../helpers/auth')

// load Idea Model
require('../models/Idea')
const Idea = mongoose.model('ideas')

// idea index page
router.get('/', ensureAuthenticated, (req, res) => {
  Idea.find({ user: req.user.id })
    .sort({ date: 'desc' })
    .then(ideas => {
      res.render('ideas/index', {
        ideas,

      })
    })
})

// idea index page
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
    .then(idea => {
      if (idea.user !== req.user.id ) {
        req.flash('error_msg', 'Not Authorized')
        res.redirect('/ideas')
      } else {
        res.render('ideas/edit', { idea: idea })
      }      
    })
})

// add idea form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('ideas/add')
})

// process form

router.post('/', ensureAuthenticated, (req, res) => {
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
      details: req.body.details,
      user: req.user.id
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
router.put('/:id', ensureAuthenticated, (req, res) => {
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
router.delete('/:id', ensureAuthenticated, (req, res) => {
  Idea.remove({ _id: req.params.id })
    .then(() =>  {
      req.flash('success_msg', 'Video idea removed')
      res.redirect('/')
    })
})

module.exports = router