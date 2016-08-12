var React = require('react');
var ReactDOM = require('react-dom/server');
var _ = require( 'underscore' );

var Header = require( './components/header' );
var Thumbnails = require( './components/thumbnails' );

var App = React.createClass( {
	propTypes: function () {
		return {
			items: React.PropTypes.object
			, page: React.PropTypes.string
		}
	}
	, render: function () {
		var content;

		content = ( <Thumbnails items={ this.props.items } /> );

		return (
			<div className="layout">
				<Header />
				<main className="container-fluid">
					<div className="row">
						<aside className="col-md-2"></aside>
						<article className="col-md-10">
							{ content }
						</article>
					</div>
				</main>
			</div>
		);
	}
} );

module.exports = App;
