const express = require('express');
const router = express.Router();

//Modellen for en Projekter
const Projects = require('../models/projects.models')

//----Multer til upload af filer/billeder
//---------------------------------------
const multer = require('multer')

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      //cb(null, file.originalname)
      cb(null, Date.now() + "-" + file.originalname)
    }
  })
})

//-------GET - ALLE-------
router.get('/', async (req, res) => {

  console.log('Projects GET ALL')

  try {

    let projects = await Projects.find()
    return res.status(200).json({ projects })

  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })
  }

})

//-------GET - En specifik ID-------
router.get('/:id', async (req, res) => {

  console.log('Projects GET BY ID')

  try {
    let projects = await Projects.findById(req.params.id)
    return res.status(200).json({ Records: projects })
  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })
  }
})

//-------POST --------
router.post('/', upload.single('image'), async (req, res) => {

  console.log('Projects POST', req.body)

  try {
    let projects = new Projects(req.body) //gør en ny projekt klar med data fra requests body
    projects.image = req.file.filename //Tilføj images filename til det nye projekt

    await projects.save() //Gem projektet i db

    return res.status(201).json({ message: "Ny projekt er oprettet", created: projects })

  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })

  }
})

//-------PUT--------
router.put('/:id', upload.single('profileimage'), async (req, res) => {

  console.log("projecets GET", req.body)

  try {

    //Hvis der kommer en fil med i requestet = billedet skal rettet (og ellers ikke)
    if (req.file) {
      req.body.profileimage = req.file.filename
    }

    let projecets = await Projects.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    if (projecets === null) {
      return res.status(404).json({ message: "Projecets kunne ikke findes og rettets" })
    }

    return res.status(200).json({ message: "Projecets er opdateret", updated: projecets })

  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })
  }
})

//-------DELETE --------
router.delete('/:id', async (req, res) => {

  console.log('DELETE BY ID')

  try {

    let projecets = await Projects.findByIdAndDelete(req.params.id)

    if (projecets === null) {
      return res.status(404).json({ message: "Projecets kunne ikke findes og rettets" })
    }
    return res.status(200).json({ projecets })

  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })
  }
})

//HUSK !!!
module.exports = router;
