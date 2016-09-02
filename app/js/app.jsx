var React = require('react');
var _ = require( 'underscore' );

var DampStore = require( './stores/dampStore' );

var Header = require( './components/header' );
var SideBar = require( './components/sideBar' );
var OptionsBar = require( './components/options-bar' );
var Thumbnails = require( './components/thumbnails' );

var App = React.createClass( {
	getInitialState: function () {
		return {
			items: this.props.items
		};
	}
	, propTypes: function () {
		return {
			items: React.PropTypes.object
			, page: React.PropTypes.string
		}
	}
	, componentDidMount: function () {
		DampStore.addEventListener( DampStore.ActionTypes.Refresh_Thumbnails, this._refresh );
	}
	, render: function () {

		var content = ( <Thumbnails items={ this.state.items } /> );
		var sideBar = ( <SideBar /> );
		var optionsBar = ( <OptionsBar /> );

		return (
			<div className="layout">
				<Header />
				<main className="container-fluid">
					<div className="row">
						<aside className="col-md-2">
							{ sideBar }
						</aside>
						<article className="col-md-10" id="article">
							{ optionsBar }
							{ content }
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
} );

module.exports = App;
