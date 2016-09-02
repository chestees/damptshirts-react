var React = require('react');
var _ = require( 'underscore' );

var Header = require( './components/header' );
var SideBar = require( './components/sideBar' );
var OptionsBar = require( './components/options-bar' );
var Thumbnails = require( './components/thumbnails' );

var App = React.createClass( {
	propTypes: function () {
		return {
			items: React.PropTypes.object
			, page: React.PropTypes.string
		}
	}
	, componentDidMount: function () {
		console.log('App Mounted');
	}
	, render: function () {

		var content = ( <Thumbnails items={ this.props.items } /> );
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
} );

module.exports = App;
