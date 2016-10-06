var React = require('react');
var _ = require( 'underscore' );

var DampActions = require('../actions/dampActions.js');
var DampStore = require( '../stores/dampStore' );

var MoreButton = React.createClass( {
	propTypes: function () {
		return {
			userConfig: React.PropTypes.object.isRequired
			, items: React.PropTypes.object
		}
	}
	, render: function () {
		var btnMore;
		var numLoaded = this.props.userConfig.page * this.props.userConfig.pageSize;

		if ( numLoaded < this.props.items.recordCount ) {
			btnMore = ( <div className="btn btn-primary show-more" onClick={ this._showMore }>Show me more</div> );
		}

		return (
			<div>
				{ btnMore }
			</div>
		);
	}
	, _showMore: function () {
		this.props.userConfig.page++;
		DampActions.getMore( this.props.userConfig );
	}
} );

module.exports = MoreButton;
