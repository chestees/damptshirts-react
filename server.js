var express = require('express');
var app = new express();
var parser = require('body-parser');
var http = require("http");
var React = require('react');
var ReactDOM = require('react-dom/server');
var Backbone = require('backbone');
var _ = require( 'underscore' );
var config = require( './config/config.js' );
require('babel-register');

app.config = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	server: process.env.DB_SERVER,
	database: process.env.DB_NAME
}
console.log("PROCESS: " + JSON.stringify(process.env));
app.use(express.static(__dirname + '/../app'));

// Homepage
app.get('/', function( request, response ) {
	var application;
	var generated;

	var page = 1;
	var pageSize = 25;
	var tagId = 0;

	application = React.createFactory( require('./app/js/app.jsx') );

	http.get('http://damptshirts.herokuapp.com/api/products?Page=' + page + '&PageSize=' + pageSize + '&TagId=' + tagId, function( res ) {
		// ?Page=1&PageSize=6&TagId=0
		var body = '';
		// Received data is a buffer.
		// Adding it to our body
		res.on('data', function(data){
			body += data;
		});
		// After the response is completed, parse it and log it to the console
		res.on('end', function() {
			var parsed = JSON.parse( body );

			var itemsCollection = new Backbone.Collection()
			itemsCollection.set( parsed );

			generated = ReactDOM.renderToString( application( {
				items: itemsCollection
				, page: 'homepage'
			} ) );
			response.render('./../app/index.ejs', { reactOutput: generated } );
		});
	})
	// If any error has occured, log error to console
	.on('error', function( e ) {
		console.log( "HTTP GET Error: " + e.message );
		console.log( JSON.stringify( e ) );
	});
});

app.get('/:slug/shirt/:id', function( request, response ) {
	var application;
	var generated;

	console.log("REQUEST: " + request.params.id );

	application = React.createFactory( require('./app/js/app.jsx') );

	http.get("http://damptshirts.herokuapp.com/api/product/" + request.params.id, function( res ) {
		var body = '';
		// Received data is a buffer.
		// Adding it to our body
		res.on('data', function(data){
			body += data;
		});
		// After the response is completed, parse it and log it to the console
		res.on('end', function() {
			var parsed = JSON.parse(body);
			generated = ReactDOM.renderToString( application( {
				items: parsed
				, page: 'detail'
			} ) );
			response.render('./../app/index.ejs', { reactOutput: generated } );
		});
	})
	// If any error has occured, log error to console
	.on('error', function(e) {
		console.log("Got error: " + e.message);
	});
} );

app.set( 'port', ( process.env.PORT || 7000 ) );
app.listen( app.get( 'port' ), _.bind( function() {
	console.log( "Node app is running at localhost:" + app.get( 'port' ) );
}, this ) );

// app.use(parser.json());
// app.use(parser.urlencoded({extended:false}));

require( './server/routes/product' )( app );
require( './server/routes/productTags' )( app );
require( './server/routes/productListing' )( app );
// require( './routes/tags' )( app );
// require( './routes/tagRelations' )( app );
// require( './routes/vendors' )( app );
// require( './scrapers/threadless' )( app );
// require( './scrapers/busted-tees' )( app );
