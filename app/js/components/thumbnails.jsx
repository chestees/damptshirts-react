var React = require('react');
var ReactDom = require('react-dom');
var _ = require( 'underscore' );
var moment = require( 'moment' );
var $ = require( 'jquery' );

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

			var hrefUrl = '/' + item.get( 'slug' ) + '/shirt/' + item.get( 'dampId' );

			return (
				<div className="product" key={ i }>
					<a className="product-link" href={ hrefUrl } data-id={ item.get( 'dampId' ) }>
						<img className="product-image" style={imgStyle} alt={ item.get( 'title' ) } title={ item.get( 'title' ) } src={ item.get( 'image' ) } />
					</a>
					<div className="thumbs" data-id={ item.get( 'dampId' ) }>
						<span className="badge vote-count">{ item.get( 'thumbs' ) } votes</span>
						<div className="thumbs_info">
							<div className="btn btn-minus vote-down">
								<span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
							</div>
							<div className="btn btn-plus l_margin_5 vote-up">
								<span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
							</div>
							{/*<div className="date-added">Added: { moment( item.get( 'dateAdded' ) ).format('l') }</div>*/}
						</div>
					</div>
				</div>
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
