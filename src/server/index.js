/* jshint esversion: 6 */
/* jshint ignore: start */

import express from 'express';
import os from 'os';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
import normalizePort from 'normalize-port';

const app = express();

app.use( express.static( 'dist' ));

const jsonParser = bodyParser.json();

//app.use( bodyParser.urlencoded({ extended: true }) );
//app.use( bodyParser.json() );

// Database
var mongoDbName = 'epmTest';
var mongoDbUrl = 'mongodb://localhost:27017/';
console.log( mongoDbUrl );
var mongo = undefined;
mongodb.MongoClient.connect(
  mongoDbUrl,
  ( error, client ) => {
    if ( error ) {
      console.error( error );
      return;
    }
    console.log( 'connection successful' );
    mongo = {
      client: client,
      db: client.db( mongoDbName )
    };
  }
);

// Database Collection Names
const waterPipeCollectionName = 'waterPipes';

// End Database

// Server

app.get( '/api/test', ( request, response ) => {
  console.log( 'starting /api/test' );
  mongo.db.listCollections().toArray(( error, result ) => {
    if ( error ) {
      console.error( error );
      return;
    }
    response.send({
      username: os.userInfo().username,
      result: result
    });
  });
});

app.get( '/api/getWaterPipe', ( request, response ) => {
  mongo.db
  .collection( categoriesCollectionName )
  .find({}, null )
  .toArray(( error, documents ) => {
    response.send( documents );
  });
});

app.post( '/api/getColumnHeaders', jsonParser, ( request, response ) => {
  console.log( request.body );
  var collectionName = request.body.collectionName;
  mongo.db
  .collection( collectionName )
  .find({}, null )
  .limit( 100 )
  .toArray(( error, documents ) => {
    response.send( documents );
  })
});

// get port from environment and store in Express.
var port = normalizePort( process.env.PORT || '8080' ); // process.env.PORT lets the port be set by Heroku
app.set( 'port', port );

app.listen( port, () => console.log( `Listening on port ${port}!` ));
