var React = require('react');
var ReactDom = require('react-dom');
var classNames = require( 'classnames' );
var _ = require( 'underscore' );
var $ = require( 'jquery' );

var DampActions = require('../actions/dampActions.js');
var DampStore = require('../stores/dampStore.js');

var OptionsBar = React.createClass( {
	getInitialState: function () {
		return {
			buttons: {
				mostRecent: true,
				leastLiked: false,
				mostLiked: false
			}
		};
	}
	, render: function () {
		var buttonClass;
		var mostRecentClass;
		var leastLikedClass;
		var mostLikedClass;

		buttonClass = classNames( {
			'btn': true,
			'sort-option': true
		} );

		mostRecentClass = classNames( buttonClass, {
			'isActive': this.state.buttons.mostRecent
		} );

		leastLikedClass = classNames( buttonClass, {
			'isActive': this.state.buttons.leastLiked
		} );

		mostLikedClass = classNames( buttonClass, {
			'isActive': this.state.buttons.mostLiked
		} );

		return (
			<div className="options-bar module_1 clearfix" ref="sortOptions">
				<a className="btn pull-left" href="/tag-list/">Browse by Tag</a>
				<span className={ mostRecentClass } ref="btnMostRecent" data-id="mostRecent" data-orderby="dateAdded" data-orderdirection="DESC" onClick={this._order}>Most Recent</span>
				<span className={ leastLikedClass } ref="btnLeast" data-id="leastLiked" data-orderby="thumbs" data-orderdirection="ASC" onClick={this._order}>Least Liked</span>
				<span className={ mostLikedClass } ref="btnMost" data-id="mostLiked" data-orderby="thumbs" data-orderdirection="DESC" onClick={this._order}>Most Liked</span>
			</div>
		);
	}
	, _order: function (evt) {
		this._showTab( evt );
		var orderBy = evt.target.dataset.orderby;
		var orderDirection = evt.target.dataset.orderdirection;
		var options;

		options = {
			page: 1
			, pageSize: this.props.userConfig.pageSize
			, orderBy: orderBy
			, orderDirection: orderDirection
			, tagId: this.props.userConfig.tagId
		}

		DampActions.sortItems ( options );
	}
	, _showTab: function( data ) {
		var selectedButton;

		// Tab clicked as opposed to being triggered by an annotation click.
		if (data.currentTarget) {
			selectedButton = $( data.currentTarget ).data('id');
		} else {
			selectedButton = data;
		}

		// Don't do anything if tab already active
		if ( !this.state.buttons[ selectedButton ] ) {
			this._clearActiveStates();
			this.state.buttons[ selectedButton ] = true;
			this.setState( this.state );
		}
	}
	, _clearActiveStates: function() {
		// Remove any states that are true
		_.each( this.state.buttons, _.bind( function( value, key ) {
			if ( value === true ) {
				this.state.buttons[ key ] = false;
			}
		}, this ) );
	}
} );

module.exports = OptionsBar;
