var express = require('express');
var app = new express();
var parser = require('body-parser');
var http = require('http');
var request = require('request');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Backbone = require('backbone');
var _ = require( 'underscore' );
require('babel-register');

app.userConfig = {
	page: 1,
	perRow: 6,
	numRows: 5,
	pageSize: 30,
	tagId: 0
}

app.config = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	server: process.env.DB_SERVER,
	database: process.env.DB_NAME
}

// app.url = "http://damptshirts-react.herokuapp.com";
app.url = "http://localhost:7000";

// Get the Vendors collection
app.getVendors = function() {
	request.get( { url: app.url + '/api/vendors', qs: '' }, function( err, response, body ) {

		if ( !err && response.statusCode == 200 ) {
			var parsed = JSON.parse( body );

			app.vendorsCollection = new Backbone.Collection()
			app.vendorsCollection.set( parsed );

		} else {
			console.log( "Vendors GET Error: " + JSON.stringify( err ) );
		}
	});
}

app.use( express.static( __dirname + '/app' ) );

// Homepage
app.get('/', function( req, res ) {
	var application;
	var generated;
	var url = app.url + '/api/products'
	var queryString = {
		'page': app.userConfig.page
		, 'pageSize': app.userConfig.perRow * app.userConfig.numRows
		, 'orderBy': 'dateAdded'
		, 'orderDirection': 'DESC'
		, 'tagId': 0
	}

	application = React.createFactory( require('./app/js/app.jsx') );

	app.getVendors();

	request.get( { url: url, qs: queryString }, function( err, response, body ) {

		if ( !err && response.statusCode == 200 ) {
			var parsed = JSON.parse( body );

			var itemsCollection = new Backbone.Collection()
			itemsCollection.set( parsed );

			generated = ReactDOM.renderToString( application( {
				items: itemsCollection,
			} ) );

			res.render('./../app/index.ejs', { reactOutput: generated, userConfig: JSON.stringify( app.userConfig ) } );
		} else {
			console.log( "Homepage GET Error: " + JSON.stringify( queryString ) );
		}
	});
});

// Item Detail
app.get( '/:slug/shirt/:id', function( request, response ) {
	var application;
	var generated;
	var dampId = request.params.id;

	console.log("Item Id: " + request.params.id );

	application = React.createFactory( require('./app/js/detail.jsx') );

	http.get( app.url + "/api/product/" + request.params.id, function( res ) {
		var body = '';
		// Received data is a buffer.
		// Adding it to our body
		res.on('data', function(data){
			body += data;
		});
		// After the response is completed, parse it and log it to the console
		res.on('end', function() {
			var parsed = JSON.parse(body);

			var itemModel = new Backbone.Model()
			itemModel.set( parsed );
			itemModel.set( { vendors: app.vendorsCollection } );

			// console.log("Vendors: " + JSON.stringify( app.vendorsCollection ) );

			generated = ReactDOM.renderToString( application( {
				itemDetail: itemModel
				// , vendors: app.vendorsCollection
			} ) );

			response.render('./../app/detail.ejs', {
				reactOutput: generated
				, dampId: dampId
			} );
		});
	})
	// If any error has occured, log error to console
	.on('error', function(e) {
		console.log("Detail GET error: " + e.message);
	});
} );

// Items from a tag
app.get('/:tag/tag/:tagId', function( req, res ) {
	var application;
	var generated;
	var tagId = req.params.tagId;
	var url =  app.url + '/api/products'
	var queryString = {
		'page': app.userConfig.page
		, 'pageSize': app.userConfig.perRow * app.userConfig.numRows
		, 'orderBy': 'dateAdded'
		, 'orderDirection': 'DESC'
		, 'tagId': tagId
	}

	app.userConfig.tagId = tagId;

	console.log("Tag Id: " + tagId );

	application = React.createFactory( require('./app/js/app.jsx') );

	request.get( { url: url, qs: queryString }, function( err, response, body ) {

		if (!err && response.statusCode == 200) {
			var parsed = JSON.parse( body );

			var itemsCollection = new Backbone.Collection()
			itemsCollection.set( parsed );

			generated = ReactDOM.renderToString( application( {
				items: itemsCollection
			} ) );

			res.render('./../app/index.ejs', { reactOutput: generated, userConfig: JSON.stringify( app.userConfig ) } );
		}
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
require( './server/routes/tags' )( app );
// require( './routes/tagRelations' )( app );
require( './server/routes/vendors' )( app );
// require( './scrapers/threadless' )( app );
// require( './scrapers/busted-tees' )( app );
