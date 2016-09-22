var React = require('react');
var ReactDom = require('react-dom');
var App = require( './js/app.jsx' );
var DampStore = require('./js/stores/dampStore.js');

var options = {
	page: window.userConfig.page || 1
	, pageSize: window.userConfig.perRow * window.userConfig.numRows
	, tagId: window.userConfig.tagId || 0
}

DampStore.getItems ( options, function( items ) {
	ReactDom.render( ( <App items={ items } userConfig={ window.userConfig } /> ), document.getElementById( 'app' ) );
} );
