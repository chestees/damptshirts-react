var React = require('react');
var _ = require( 'underscore' );
var $ = require( 'jquery' );

var ItemDetail = React.createClass( {
	propTypes: function () {
		return {
			itemDetail: React.PropTypes.object
		}
	}
	, componentDidMount: function () {

		window.fbAsyncInit = function() {
			FB.init({
				appId: '243380072355004',
				xfbml: true,
				version: 'v2.7'
			});
		};

		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	}
	, render: function () {
		var hrefUrl = '/' + this.props.itemDetail.get( 'slug' ) + '/shirt/' + this.props.itemDetail.get( 'dampId' );
		// var tags;
		var discountText;
		var displayImage = this.props.itemDetail.get( 'imageLg' ) || this.props.itemDetail.get( 'image' );
		var tags = this.props.itemDetail.get( 'tags' ).map( _.bind( function ( tag, i ) {

			var tagUrl = '/' + tag.slug + '/tag/' + tag.tagId;

			return ( <li key={ i }><a className="btn" href={ tagUrl }>{ tag.tag }</a></li> );

		} ), this );

		return (
			<div className="row detail-container">
				<div className="col-md-8">
					<a href="/" className="btn btn-default btn-sm back">
						<span className="glyphicon glyphicon-arrow-left" aria-hidden="true"></span> Back to listing
					</a>
					<h1>{ this.props.itemDetail.get( 'title' ) }</h1>
					<div className="row">
						<div className="product-image col-md-10"><img src={ displayImage } /></div>
						<div className="btn-affiliate col-md-2">
							<a target="_blank" href="" className="btn btn-danger buy" data-url="">Buy Me</a>
						</div>
					</div>
					<div className="social clearfix">
						<div className="social-icon facebook" onClick={ this.socialFacebook }></div>
					</div>
					<div className="tags clearfix">
						<ul className="tags-list">
							{ tags }
						</ul>
					</div>
					<div className="coupon">
						<div className="title">Did somebody say discount?</div>
						<div className="description">{ discountText }</div>
					</div>
				</div>
				<div className="recommend col-md-4">
					<h2>Others you might like</h2>
				</div>
			</div>
		)
	}
	, buildLink: function( url ) {
		var linkPrefix = this.vendor.get( 'linkPrefix' );
		var linkSuffix = this.vendor.get( 'linkSuffix' );

		if( !linkPrefix ) {
			link = url + linkSuffix;
		} else {
			if( linkPrefix.indexOf( 'shareasale' ) > 0 ) {
				linkPrefix = linkPrefix.replace( 'afftrack=', 'afftrack=' + this.model.get( 'dampId' ) );
				link = linkPrefix + url.replace( 'http://', '' );
			} else {
				link = linkPrefix + vendorUrl;
			}
		}
		return link;
	}
	, socialFacebook: function () {
		FB.ui({
			method: 'share_open_graph',
			action_type: 'og.shares',
			display: 'popup',
			app_id: '243380072355004',
			action_properties: JSON.stringify({
				object : {
					'og:url': 'http://damptshirts-react.herokuapp.com/' + this.props.itemDetail.get( 'slug' ) + '/shirt/' + this.props.itemDetail.get( 'dampId' ), // your url to share
					'og:title': this.props.itemDetail.get( 'title' ),
					'og:description': '',
					'og:image': this.props.itemDetail.get( 'image' )
				}
			})
		}, function( response ) {
			console.log('Facebook response: ' + response)
		});
	}
} );

module.exports = ItemDetail;
