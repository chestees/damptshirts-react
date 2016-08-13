var Backbone = require( 'backbone' );

var ShirtsModel = Backbone.Model.extend({
	url: function () {
		return '/api/product' + ( this.has( 'itemId' ) ? ( '/' + this.get( 'itemId' ) ) : '' );
	}
	, initialize: function( options ) {
		this.itemId = options.itemId;
	}
	, defaults: {
		'thumbs': 0,
	}
	, idAttribute: 'dampId'
});

module.exports = ShirtsModel;
