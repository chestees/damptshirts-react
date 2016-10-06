var React = require('react');
var ReactDom = require('react-dom');
var App = require( './js/app.jsx' );
var DampStore = require('./js/stores/dampStore.js');

var options = {
	page: window.userConfig.page || 1
	, pageSize: window.userConfig.perRow * window.userConfig.numRows
	, tagId: window.userConfig.tagId || 0
	, search: window.userConfig.search
}

DampStore.getItems ( options, function( itemsCollection ) {

	ReactDom.render( ( <App items={ itemsCollection } userConfig={ window.userConfig } /> ), document.getElementById( 'app' ) );

} );
