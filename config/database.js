if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: 'mongodb://rdelga80:Eckpfs96E@ds023704.mlab.com:23704/vidjot-prod'
  }
} else {
  module.exports = {
    mongoURI: 'mongodb://localhost/vidjot-dev'
  }
}