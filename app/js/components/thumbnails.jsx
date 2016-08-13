var React = require('react');
var _ = require( 'underscore' );

var Thumbnails = React.createClass( {
	propTypes: function () {
		return {
			items: React.PropTypes.object
		}
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
		} ), this );

		return (
			<div className="product-list-container">
				<div className="product-list">
					{ thumbnails }
				</div>
			</div>
		);
	}
} );

module.exports = Thumbnails;
