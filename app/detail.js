var React = require('react');
var ReactDom = require('react-dom');
var Detail = require( './js/detail.jsx' );
var DampStore = require('./js/stores/dampStore.js');

var options = {
	dampId: window.dampId
}

DampStore.getItemDetail ( options, function( itemDetail ) {
	ReactDom.render( ( <Detail itemDetail={ itemDetail } userConfig={ window.userConfig } /> ), document.getElementById( 'app' ) );
} );
