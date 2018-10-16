/* jshint esversion: 6 */
/* jshint ignore: start */

import mongodb from 'mongodb';
import dotenv from 'dotenv';

dotenv.config()

( async () => {
	var mongoDbUserName = process.env.MONGO_DB_USERNAME;
	var mongoDbUserPassword = process.env.MONGO_DB_PASSWORD;
	var mongoDbName = process.env.MONGO_DB_NAME;
	var mongoDbUrl = `mongodb://${mongoDbUserName}:${mongoDbUserPassword}@ds123728.mlab.com:23728/${mongoDbName}`;
	var mongo = await new Promise( ( resolve, reject ) => {
		mongodb.MongoClient.connect( mongoDbUrl, ( error, client ) => {
			if ( error ) { console.error( error ); return; }
			resolve({
				client: client,
				db: client.db( mongoDbName )
			});	
		});
	});
	//await mongo.db.createCollection( 'categories' );
	await mongo.db.collection( 'categories' ).insertOne(
		{ 'name': 'chemistry' }
	);
	console.log( await mongo.db.listCollections().toArray() );
	await mongo.client.close();
})();

