// const express = require( 'express' );
// const multer = require( 'multer' );
// const path = require( 'path' );
// const itemInfoUpload = require( './fileHandlers/itemInfoUpload' );
import express from 'express';
import multer from 'multer';
import path from 'path';

const dataDir = path.join( __dirname, '..', 'data/' );
const router = express.Router();
const storage = multer.diskStorage( {
  destination( req: express.Request, file, cb ) {
    cb( null, dataDir );
  },
  filename( req: express.Request, file, cb ) {
    cb( null, 'ItemInfo.txt' );
  }
} );
const uploader = multer( {
  dest: dataDir,
  storage,
  limits: {
    fileSize: 5000000
  }
} ).single( 'ItemInfo' );

router.post( '/uploadItemInfo', ( req, res ) => {
  uploader( req, res, ( err ) => {
    if ( err instanceof multer.MulterError ) {
      res.send( {
        status: 'error',
        code: 'error.MULTER',
        message: err,
      } );
      return;
    }

    if ( err ) {
      res.send( {
        status: 'error',
        code: 'error.UKW',
        message: err,
      } );
      return;
    }

    res.send( {
      status: 'success',
      message: 'ItemInfo uploaded successfully',
    } );
  } );
} );


module.exports = router;
