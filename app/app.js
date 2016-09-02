var React = require('react');
var ReactDom = require('react-dom');
var App = require( './js/app.jsx' );
var DampStore = require('./js/stores/dampStore.js');
var tagId = window.tagId;

var options = {
	page: 1
	, pageSize: 25
	, tagId: tagId || 0
}

DampStore.getItems ( options, function( items ) {
	ReactDom.render( ( <App items={ items } /> ), document.getElementById( 'app' ) );
} );
