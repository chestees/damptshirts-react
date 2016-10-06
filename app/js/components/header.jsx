var React = require('react');

var DampActions = require('../actions/dampActions.js');
var DampStore = require('../stores/dampStore.js');

var Header = React.createClass( {
	propTypes: function () {
		return {
			userConfig: React.PropTypes.object.isRequired
		}
	}
	, getInitialState: function () {
		return {};
	}
	, componentDidMount: function () {

	}
	, render: function () {
		var reset;

		if ( this.props.userConfig.search ) {
			reset = ( <div className='glyphicon glyphicon-remove reset-search' onClick={ this._resetSearch }></div>)
		}

		return (
			<header>
				<div onClick={this._redirectHome} className="pull-left" id="logo"></div>
				<div className="header-items">
					<div className="col-md-8">
						<ul className="nav nav-pills">
							<li><a className="btn btn-nav" href="/t-shirt-coupons/">T-Shirt Coupons and Codes</a></li>
							<li>
								<div className="btn-group">
									<a href="/tags" className="btn btn-nav">Popular Tags</a>
									<a className="btn btn-nav dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
										<span className="caret"></span>
										<span className="sr-only">Toggle Dropdown</span>
									</a>
									<ul className="dropdown-menu" role="menu">
										<li><a href="#">Action</a></li>
									</ul>
								</div>
							</li>
						</ul>
					</div>
					<div className="col-md-4 search">
						<input
							type="text"
							className="form-control"
							defaultValue={this.props.userConfig.search}
							ref="search"
							placeholder="Search shirts..."
							onKeyPress={ this._search } />
						{ reset }
					</div>
				</div>
			</header>
		);
	}
	, _search: function(e) {
		var options;
		var searchVal = $( this.refs.search ).val();

		if (e.key === 'Enter') {
			// options = {
			// 	page: 1
			// 	, pageSize: this.props.userConfig.pageSize
			// 	, orderBy: this.props.userConfig.orderBy
			// 	, orderDirection: this.props.userConfig.orderDirection
			// 	, tagId: this.props.userConfig.tagId
			// 	, search: searchVal
			// }
			//
			// DampActions.search ( options );
			window.location.assign( '/?search=' + searchVal );
		}
	}
	, _resetSearch: function () {
		window.userConfig.search = '';
		window.location.assign( '/' );
	}
	, _redirectHome: function () {
		var searchVal;

		if ( this.props.userConfig.search ) {
			searchVal = '?search=' + this.props.userConfig.search
		}

		window.location.assign( '/' + searchVal );
	}
} );

module.exports = Header;
