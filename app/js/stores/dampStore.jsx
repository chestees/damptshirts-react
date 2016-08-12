var dispatcher = require('./../dispatcher.js');
var ShirtCollection = require( './../collections/shirtCollection')
var items = {};
var itemsCollection;

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
} );

module.exports = DampStore;
