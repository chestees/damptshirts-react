var React = require('react');
var ReactDom = require('react-dom');
var _ = require( 'underscore' );
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
		console.log( "WIDTH: " + containerWidth );

		var thumbnailWidth = Math.floor( containerWidth / this.state.numPerRow );
		$( ReactDom.findDOMNode( this.refs.images ) ).find( 'img' ).width( thumbnailWidth - this.state.paddingAndBorder );
	}
	, render: function () {
		var thumbnails = this.props.items.map( _.bind( function ( item, i ) {

			var hrefUrl = '/' + item.get( 'slug' ) + '/shirt/' + item.get( 'dampId' );

			return (
				<div className="product" key={ i }>
					<a className="product-link" href={ hrefUrl } data-id={ item.get( 'dampId' ) }>
						<img className="product-image" alt={ item.get( 'title' ) } title={ item.get( 'title' ) } src={ item.get( 'image' ) } />
					</a>
					<div className="thumbs" data-id={ item.get( 'dampId' ) }>
						<span className="badge vote-count">{ item.get( 'thumbs' ) } votes</span>
						<div className="thumbs_info">
							<div className="btn btn-danger vote-down">
								<span className="txt">Meh</span>
							</div>
							<div className="btn btn-primary l_margin_5 vote-up">
								<span className="txt">Like</span>
							</div>
							<div className="date-added">{ item.get( 'dateAdded' ) }</div>
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
