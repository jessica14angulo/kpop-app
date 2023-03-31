const express = require('express'); //import express
const router = express.Router(); //import the router
const sequenceGenerator = require('./sequenceGenerator');

const Album = require('../models/album'); //import document model

//utility function to return errors
function returnError(res, error) {
  res.status(500).json({
    message: 'An error occurred',
    error: error
  });
}

//GET the list of documents in the documents collection in the database.
router.get('/', (req, res, next) => {
  //retrieve all documents
  Album.find()
    .then(albums => {
      //send scucessful response with mssage and documents
      res.status(200).json({
        message: 'Albums fetched successfully',
        albums: albums
      });
    })
    .catch(error => {
      //return error if something happens
      returnError(res, error);
    });
}
);

//POST route to adding a document to database
router.post('/', (req, res, next) => {
  //call sequence generator to get unique id
  const maxAlbumId = sequenceGenerator.nextId("albums");

  //create new document
  const album = new Album({
    id: maxAlbumId,
    name: req.body.name,
    url: req.body.url,
    imagePath: req.body.imagePath
  });

  //save document to database
  album.save()
    .then(createdAlbum => {
      //send successful response with message and new document added
      res.status(201).json({
        message: 'Album added successfully',
        album: createdAlbum
      });
    })
    .catch(error => {
      //retunr error if something happens
      returnError(res, error);
    });
});

//Route to UPDATE a document in the database
router.put('/:id', (req, res, next) => {
  //find document with specific id passed on parameter
  Album.findOne({ id: req.params.id })
    .then(album => {
      //re assign values with those comign from request
      album.name = req.body.name;
      album.url = req.body.url;
      album.imagePath = req.body.imagePath;

      //update entire document
      Album.updateOne({ id: req.params.id }, album)
        .then(result => { 
          //send successful response
          res.status(204).json({
            message: 'Album updated successfully'
          })
        })
        .catch(error => {
          //return error in case something happens
          returnError(res, error);
        });
    })
    .catch(error => {
      //respnse with error if not found
      res.status(500).json({
        message: 'Album not found.',
        error: { album: 'Album not found' }
      });
    });
});

//Route to DELETE document from database
router.delete("/:id", (req, res, next) => {
  //find document by id
  Album.findOne({ id: req.params.id })
    .then(album => {
      //delete such document
      Album.deleteOne({ id: req.params.id })
        .then(result => {
          //response with succesful message
          res.status(204).json({ message: "Album deleted successfully" });
        })
        .catch(error => {
          //return error if something happened
          returnError(res, error);
        })
    })
    .catch(error => {
      //return error if something happened
      returnError(res, error);
    });
});

module.exports = router;