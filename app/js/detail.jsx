var React = require('react');
var ReactDOM = require('react-dom/server');
var _ = require( 'underscore' );

var Header = require( './components/header' );
var DetailItem = require( './components/detailItem' );

var App = React.createClass( {
	propTypes: function () {
		return {
			itemDetail: React.PropTypes.object
		}
	}
	, render: function () {

		var detailContent = ( <DetailItem itemDetail={ this.props.itemDetail } /> );

		return (
			<div className="layout">
				<Header />
				<main className="container-fluid">
					<div className="row">
						<aside className="col-md-2"></aside>
						<article className="col-md-10 detail">
							{ detailContent }
						</article>
					</div>
				</main>
			</div>
		);
	}
} );

module.exports = App;
