var Link = require('react-router').Link;

module.exports = React.createClass({

	render: function() {

		return <div>
			Catalog Home
			<Link to="/login">Login</Link>
		</div>
	}
});
