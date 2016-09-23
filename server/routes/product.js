var sql = require( 'mssql' ),
	_   = require('underscore');

module.exports = function( app ) {
    sql.connect( app.config, _.bind( function( err ) {
		if( err ) {
			console.log("Product Detail Error: " + err );
		}

		// Product query by Id
		app.get( '/api/product/:dampId', function( req, res ) {

			var product = new sql.Request();

			product.input('DampId', sql.Int, req.params.dampId );

			product.execute( 'usp_Damp_Product', _.bind( function( err, recordset, returnValue ) {

				// console.log( '1: ' + JSON.stringify( recordset[0] ) + '\n');
				// console.log( '2: ' + JSON.stringify( recordset[1] ) + '\n' );

				app.product      = recordset[0][0];
				app.product.tags = recordset[1];

				// console.log('Length: ' + recordset.length); // count of recordsets returned by the procedure
				// console.log('Length [0]: ' + recordset[0].length); // count of rows contained in first recordset
				// console.log(returnValue); // procedure return value
				// console.log(recordset.returnValue); // same as previous line

				if( err ) {
					console.log("Error: " + err );
				} else {
					res.send( app.product );
				}
			}, this ) );
		});

		app.patch( '/api/product/:dampId', function( req, res ) {

			console.log( 'PATCH', req.params.dampId, req.query.thumbs );
			var product = new sql.Request();
			var vote = req.query.vote;
			var voteNum;

			vote === 'voteup' ? voteNum = 1 : voteNum = -1;

			product.input('id', sql.Int, req.params.dampId );
			product.input('thumbs', sql.Int, voteNum );
			product.output('thumbsOutput', sql.Int );

			product.execute( 'usp_Damp_Vote', _.bind( function( err, recordset, returnValue ) {

				console.log('Thumbs: ' + product.parameters.thumbsOutput.value + '\n' );

				app.thumbs = product.parameters.thumbsOutput.value;

				// console.log('Length: ' + recordset.length); // count of recordsets returned by the procedure
				// console.log('Length [0]: ' + recordset[0].length); // count of rows contained in first recordset
				// console.log(returnValue); // procedure return value
				// console.log(recordset.returnValue); // same as previous line

				if( err ) {
					console.log("Error: " + err );
				} else {
					res.send( { thumbs: app.thumbs } );
				}
			}, this ) );
		});

	}, this ) );
};
