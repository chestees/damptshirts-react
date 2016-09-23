var React = require('react');
var ReactDom = require('react-dom');
var _ = require( 'underscore' );
var $ = require( 'jquery' );

var Thumbnail = React.createClass( {
	getInitialState: function () {
		return {
			model: this.props.model
		};
	}
	, propTypes: function () {
		return {
			model: React.PropTypes.object.isRequired,
			imgStyle: React.PropTypes.object
		}
	}
	, componentDidMount: function() {

	}
	, render: function () {
		var hrefUrl = '/' + this.props.model.get( 'slug' ) + '/shirt/' + this.props.model.get( 'dampId' );

		return (
			<div className="product">
				<a className="product-link" href={ hrefUrl } data-id={ this.props.model.get( 'dampId' ) }>
					<img className="product-image" style={ this.props.imgStyle } alt={ this.props.model.get( 'title' ) } title={ this.props.model.get( 'title' ) } src={ this.props.model.get( 'image' ) } />
				</a>
				<div className="thumbs" data-id={ this.props.model.get( 'dampId' ) }>
					<span className="badge vote-count">{ this.props.model.get( 'thumbs' ) } votes</span>
					<div className="thumbs_info">
						<div className="btn btn-minus glyphicon glyphicon-minus" data-id="votedown" onClick={ this._vote }></div>
						<div className="btn btn-plus glyphicon glyphicon-plus l_margin_5" data-id="voteup" onClick={ this._vote }></div>
						{/*<div className="date-added">Added: { moment( item.get( 'dateAdded' ) ).format('l') }</div>*/}
					</div>
				</div>
			</div>
		);
	}
	, _vote: function ( evt ) {
		var voteType = evt.target.dataset.id;
		var data = {
			id: this.props.model.id
		}

		this.props.model.save( data, {
			vote: voteType,
			patch: true,
			success: _.bind( function( model, response, options ) {
				this.setState( {
					model: model
				} );
			}, this )
		} );
	}
} );

module.exports = Thumbnail;
