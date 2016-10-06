var EventEmitter = require( 'events' ).EventEmitter;
var AppDispatcher = require( '../dispatcher/dispatcher' );
var Constants = require( '../constants/constants' );
var assign = require( 'object-assign' );
var ShirtCollection = require( './../collections/shirtCollection')
var ShirtModel = require( './../models/shirtsModel');
var items = {};
var itemsRecordCount;
var itemsCollection;;
var moreItemsCollection;
var itemModel;

var DampStore = assign({}, EventEmitter.prototype, {
	addEventListener: function ( actionType, callback ) {
		if ( _.has( Constants.ActionTypes, actionType ) ) {
			this.addListener( actionType, callback );
		} else {
			console.log( 'Event type must be defined in constants.ActionTypes.' );
		}
	}
	, removeEventListener: function ( actionType, callback ) {
		if ( _.has( Constants.ActionTypes, actionType ) ) {
			this.removeListener( actionType, callback );
		} else {
			console.log( 'Event type must be defined in constants.ActionTypes.' );
		}
	}
	, ActionTypes: Constants.ActionTypes

	// , getRecordCount: function () {
	// 	itemsRecordCount = itemsCollection.recordCount;
	// 	return itemsRecordCount;
	// }
	, getItems: function ( options, callback ) {
		itemsCollection = new ShirtCollection( options );
		itemsCollection.fetch( {
			success: function ( collection, response ) {
				itemsCollection.set( response.recordSet, { silent: true } );
				itemsCollection.recordCount = response.recordCount.recordCount;
				if ( typeof callback === 'function') {
					callback( itemsCollection );
				} else {
					DampStore.emit( DampStore.ActionTypes.Refresh_Thumbnails, itemsCollection.models );
				}
			}
		});
	}
	, getMore: function ( options ) {
		moreItemsCollection = new ShirtCollection( options );
		moreItemsCollection.fetch( {
			success: function ( collection, response ) {
				itemsCollection.add( response.recordSet, { silent: true } );
				DampStore.emit( DampStore.ActionTypes.Refresh_Thumbnails, itemsCollection.models );
			}
		});
	}
	, search: function ( options, callback ) {
		itemsCollection = new ShirtCollection( options );
		itemsCollection.fetch( {
			success: function ( collection, response ) {
				itemsCollection.set( response, { silent: true } );
				if ( typeof callback === 'function') {
					callback( itemsCollection.models );
				} else {
					DampStore.emit( DampStore.ActionTypes.Refresh_Thumbnails, itemsCollection.models );
				}
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
		} );
	}
	, dispatchToken: AppDispatcher.register( function ( action ) {
		switch ( action.actionType ) {
			case DampStore.ActionTypes.Sort_Items:
				DampStore.getItems ( action.data, DampStore.emit( DampStore.ActionTypes.Sort_Items ) );
				break;
			case DampStore.ActionTypes.Search:
				DampStore.search ( action.data );
				break;
			case DampStore.ActionTypes.Get_More:
				DampStore.getMore ( action.data );
				break;
			default:
				return true;
		}
		return true;
	} )
} );

module.exports = DampStore;
