var React = require('react');

var Header = require( './components/header' );
var DetailItem = require( './components/detailItem' );
var SideBar = require( './components/sideBar' );

var App = React.createClass( {
	propTypes: function () {
		return {
			itemDetail: React.PropTypes.object
			, vendors: React.PropTypes.object
			, userConfig: React.PropTypes.object
		}
	}
	, render: function () {

		var detailContent = ( <DetailItem {...this.props} itemDetail={ this.props.itemDetail } /> );
		var sideBar = ( <SideBar /> );

		return (
			<div className="layout">
				<Header {...this.props} />
				<main className="container-fluid">
					<div className="row">
						<aside className="col-md-2">
							{ sideBar }
						</aside>
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
