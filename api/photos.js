const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');

const Photo = require('./photosModel');

// const upload = multer({ dest: 'uploads/'});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname)
  }
});

const upload = multer({
  storage: storage,
  limits: {fileSize: 1200 * 1200 * 5}
})


router.get('/', (req, res, next) => {
  Photo.find()
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

// router.get('/:imageId', (req, res, next) => {
//
// });

// router.post('/', (req, res, next) => {
//   const photo = new Photo({
//     _id: mongoose.Types.ObjectId(),
//     message: req.body.message
//   })
//
//   photo.save()
//     .then(result => {
//       res.status(201).json(result)
//     })
//     .catch(err => {
//       res.status(500).json({
//         error: err
//       })
//     })
// })

router.post('/', upload.single('imageId'), (req, res, next) => {
  const photo = new Photo({
    _id: mongoose.Types.ObjectId(),
    imageId: req.file.path
  });

  photo.save()
    .then(result => {
      res.status(200).json(photo)
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
});

router.delete('/:imageId', (req, res, next) => {

});

module.exports = router;
