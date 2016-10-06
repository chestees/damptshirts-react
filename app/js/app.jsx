var React = require('react');
var _ = require( 'underscore' );

var DampActions = require( './actions/dampActions' );
var DampStore = require( './stores/dampStore' );

var Header = require( './components/header' );
var SideBar = require( './components/sideBar' );
var OptionsBar = require( './components/options-bar' );
var Thumbnails = require( './components/thumbnails' );
var MoreButton = require( './components/more-button' );

var App = React.createClass( {
	getInitialState: function () {
		return {
			items: this.props.items
		};
	}
	, propTypes: function () {
		return {
			items: React.PropTypes.object
			, userConfig: React.PropTypes.object
		}
	}
	, componentDidMount: function () {
		DampStore.addEventListener( DampStore.ActionTypes.Refresh_Thumbnails, this._refresh );
	}
	, render: function () {
		var content = ( <Thumbnails items={ this.state.items } /> );
		var sideBar = ( <SideBar {...this.props} /> );
		var optionsBar = ( <OptionsBar {...this.props} /> );
		var btnMore = ( <MoreButton {...this.props} /> );

		return (
			<div className="layout">
				<Header {...this.props} />
				<main className="container-fluid">
					<div className="row">
						<aside className="col-md-2">
							{ sideBar }
						</aside>
						<article className="col-md-10" id="article">
							{ optionsBar }
							{ content }
							{ btnMore }
						</article>
					</div>
				</main>
			</div>
		);
	}
	, _refresh: function ( data ) {
		this.setState( {
			items: data
		} );
	}
	, _showMore: function () {
		this.props.userConfig.page++;
		DampActions.getMore( this.props.userConfig );
	}
} );

module.exports = App;
