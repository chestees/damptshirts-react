var React = require('react');
var ReactDom = require('react-dom');
var Detail = require( './js/detail.jsx' );
var DampStore = require('./js/stores/dampStore.js');
var dampId = window.dampId;

var options = {
	dampId: dampId
}

DampStore.getItemDetail ( options, function( itemDetail ) {
	ReactDom.render( ( <Detail itemDetail={ itemDetail } /> ), document.getElementById( 'app' ) );
} );
