var React = require('react');
var ReactDom = require('react-dom');
var Detail = require( './js/detail.jsx' );
var DampStore = require('./js/stores/dampStore.js');
var itemId = window.itemId;

var options = {
	itemId: itemId
}

DampStore.getItemDetail ( options, function( itemDetail ) {
	ReactDom.render( ( <Detail itemDetail={ itemDetail } /> ), document.getElementById( 'app' ) );
} );
