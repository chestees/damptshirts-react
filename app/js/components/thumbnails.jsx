var React = require('react');
var ReactDom = require('react-dom');
var _ = require( 'underscore' );
var moment = require( 'moment' );
var $ = require( 'jquery' );

var Thumbnail = require( './thumbnail.jsx' );

var Thumbnails = React.createClass( {
	getInitialState: function () {
		return {
			numPerRow: 6
			, paddingAndBorder: 16
		};
	}
	, propTypes: function () {
		return {
			items: React.PropTypes.object
			, containerWidth: React.PropTypes.number
		}
	}
	, componentDidMount: function() {
		var containerWidth = $( this.refs.container ).width();

		this.thumbnailWidth = Math.floor( containerWidth / this.state.numPerRow ) - this.state.paddingAndBorder;
		$( ReactDom.findDOMNode( this.refs.images ) ).find( 'img' ).width( this.thumbnailWidth );
	}
	, render: function () {
		var imgStyle = { width: this.thumbnailWidth };

		var thumbnails = this.props.items.map( _.bind( function ( item, i ) {
			return (
				<Thumbnail model={ item } imgStyle={ imgStyle } key={ i } />
			)
		}, this ) );

		return (
			<div className="product-list-container" ref="container">
				<div className="product-list" ref="images">
					{ thumbnails }
				</div>
			</div>
		);
	}
} );

module.exports = Thumbnails;
