var Backbone = require( 'backbone' );

var ShirtsModel = Backbone.Model.extend({
	urlRoot: '/api/product'
	, url: function () {

		var urlParams = ( this.has( 'dampId' ) ? ( '/' + this.get( 'dampId' ) ) : '' );

		return this.urlRoot + urlParams;

	}
	, save: function ( attrs, options ) {
		if ( options.vote ) {
			options.url = this.url() + '?vote=' + options.vote;
		}

		Backbone.Model.prototype.save.call( this, attrs, options );
	}
	, defaults: {
		'thumbs': 0,
	}
	, idAttribute: 'dampId'
});

module.exports = ShirtsModel;
