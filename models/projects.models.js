const mongoose = require('mongoose')

// skema som beskriver Projekter
const projectsSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Projekt navn er påkrævet']
  },
  content: {
    type: String,
    required: [true, 'Tekst er påkrævet']
  },
  link: {
    type: String,
    required: [true, 'Link er påkrævet']
  },
  image: {
    type: String,
    required: [false, 'Foto er påkrævet']
  },
  imageWebP: {
    type: String,
    required: [false, 'Foto er påkrævet']
  }
})



module.exports = mongoose.model('Projects', projectsSchema, 'projects')