var dispatcher = require('./../dispatcher.js');
var ShirtCollection = require( './../collections/shirtCollection')
var ShirtModel = require( './../models/shirtsModel');
var items = {};
var itemsCollection;
var itemModel;

var DampStore = ( {
	getItems: function ( options, callback ) {
		itemsCollection = new ShirtCollection( options );
		itemsCollection.fetch( {
			success: function ( collection, response ) {
				itemsCollection.set( response, { silent: true } );
				callback( itemsCollection.models );
			}
		});
	}
	, getItemDetail: function ( options, callback ) {
		itemModel = new ShirtModel( options );
		itemModel.fetch( {
			success: function ( model, response ) {
				itemModel.set( response, { silent: true } );
				callback( itemModel );
			}
		});
	}
} );

module.exports = DampStore;
