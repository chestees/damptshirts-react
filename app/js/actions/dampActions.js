var AppDispatcher = require( '../dispatcher/dispatcher' );
var Consts = require( '../constants/constants' );

var DampActions = {
	sortItems: function ( data ) {
		AppDispatcher.dispatch( {
			actionType: Consts.ActionTypes.Sort_Items
			, data: data
		} );
	}
	, getMore: function ( data ) {
		AppDispatcher.dispatch( {
			actionType: Consts.ActionTypes.Get_More
			, data: data
		} );
	}
};

module.exports = DampActions;
