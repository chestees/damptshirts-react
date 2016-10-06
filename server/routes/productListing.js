var sql = require( 'mssql' ),
	_   = require('underscore');

module.exports = function( app ) {
	sql.connect( app.config, _.bind( function( err ) {
		if( err ) {
			console.log("Product Listing Error: " + err );
		}

		// Product listing
		app.use( '/api/products', function( req, res ) {
			console.log("Server Query: " + JSON.stringify( req.query ) );
			var productListing = new sql.Request();

			var page           = req.query.page || 1;
			var pageSize       = req.query.pageSize || 25;
			var orderBy        = req.query.orderBy || 'dateAdded';
			var orderDirection = req.query.orderDirection || 'ASC';
			var tagId          = req.query.tagId || 0;
			var search         = req.query.search || null;

			productListing.input( 'TagID', sql.Int, tagId );
			productListing.input( 'Search', sql.NVarChar, search );
			productListing.input( 'SiteName', sql.NVarChar, 'damptshirts' );
			productListing.input( 'Page', sql.Int, page );
			productListing.input( 'PageSize', sql.Int, pageSize );
			productListing.input( 'OrderBy', sql.NVarChar, orderBy );
			productListing.input( 'OrderDirection', sql.NVarChar, orderDirection );

			productListing.execute( 'usp_Damp_Products', function( err, recordset, returnValue ) {
				var products = {
					recordSet: recordset[0]
					, recordCount: recordset[1][0]
				};

				if( err ) {
					console.log("Error: " + err );
				} else {
					res.send( products );
				}
			});
		});
		// app.use( '/api/count', function( req, res ) {
		// 	res.send( app.recordCount );
		// });
	}, this ) );
};
