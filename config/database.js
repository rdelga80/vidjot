if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: 'mongodb://rdelgado80:Eckpfs96$$@ds023704.mlab.com:23704/vidjot-prod'
  }
} else {
  module.exports = {
    mongoURI: 'mongodb://localhost/vidjot-dev'
  }
}