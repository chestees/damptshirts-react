var React = require('react');

var Header = React.createClass( {
	getInitialState: function () {
		return {

		};
	}
	, componentDidMount: function () {

	}
	, render: function () {
		return (
			<header className="masthead">
				<div className="row">
					<a href="/" className="col-md-2" id="logo"></a>
					<div className="header-items col-md-10">
						<div className="row">
							<div className="col-md-8 clearfix">
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
							<div className="col-md-4">
								<input type="text" className="form-control" placeholder="Search shirts..." />
							</div>
						</div>
					</div>
				</div>
			</header>
		);
	}
	, goHome: function () {
		window.location( '/' );
	}
} );

module.exports = Header;
