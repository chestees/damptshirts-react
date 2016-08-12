var Backbone = require( 'backbone' );

var ShirtsModel = Backbone.Model.extend({
	urlRoot: '/api/products'
	, defaults: {
		'thumbs': 0,
	}
	, idAttribute: 'dampId'
});

module.exports = ShirtsModel;
