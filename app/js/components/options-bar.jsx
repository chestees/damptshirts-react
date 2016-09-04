var React = require('react');
var ReactDom = require('react-dom');
var _ = require( 'underscore' );
var $ = require( 'jquery' );

var DampActions = require('../actions/dampActions.js');
var DampStore = require('../stores/dampStore.js');

var OptionsBar = React.createClass( {
	propTypes: function () {
		return {

		}
	}
	, componentDidMount: function() {

	}
	, render: function () {
		return (
			<div className="sort module_1 b_margin_10 clearfix" ref="sortOptions">
				<a className="btn pull-left" href="/tag-list/">Browse by Tag</a>
				<span className="btn pull-right l_margin_5 sortON" ref="btnMostRecent">Most Recent</span>
				<span className="btn pull-right l_margin_5" ref="btnLeast">Least Liked</span>
				<span className="btn pull-right l_margin_5" ref="btnMost" data-orderby="mostliked" onClick={this._order}>Most Liked</span>
				<div className="clear"></div>
			</div>
		);
	}
	, _order: function (evt) {
		var orderBy = evt.target.dataset.orderby;
		var orderDirection;
		var options;

		if (orderBy === 'mostliked') {
			options = {
				orderBy: 'thumbs'
				, orderDirection: 'DESC'
			}
		}

		DampActions.sortItems ( options );
	}
} );

module.exports = OptionsBar;
