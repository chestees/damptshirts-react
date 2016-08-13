var $ = require( 'jquery' );
var Backbone = require( 'backbone' );

var URI = require( 'URIjs' );

var ShirtsModel = require( './../models/shirtsModel' );

var ShirtCollection = Backbone.Collection.extend({
	model: ShirtsModel
	// , url: '/api/products?Page=1&PageSize=6&TagId=0'
	, url: function() {
		return URI( 'api/products' ).query( this.params );
	}
	, initialize: function( options ) {
		var page      = options.page || 1;
		var pageSize  = options.pageSize || 25;
		this.orderBy  = options.orderBy || 'dateAdded';
		var tagId     = options.tagId || 0;
		//
		// this.listenTo( this, "sort", this.render );
		this.params = {
			page: page
			, pageSize: pageSize
			, orderBy: this.orderBy
			, tagId: tagId
		};
	}
	, comparator: function( model ) {
		return -model.get( this.orderBy );
	}
});

module.exports = ShirtCollection;