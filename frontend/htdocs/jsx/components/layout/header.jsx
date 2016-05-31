var AuthenticationActions = require('../../actions/AuthenticationActions.jsx');
var Link = require('react-router').Link;

module.exports = React.createClass({

    onLogoutClicked: function() {

        AuthenticationActions.logout();
    },

    onLoginClicked: function() {

        AuthenticationActions.thirdPartyAuth("google");
    },

	render: function() {

        var loginTextArea = "";

        if (this.props.logged_in == false) {
            loginTextArea = <button onClick={this.onLoginClicked}>Login</button>
        } else {
            loginTextArea = <button onClick={this.onLogoutClicked}>Logout</button>
        }

		return <header>

            <div className="header-item-container">
                <span className="siteTitle">Catalog This!</span>
                <nav className="site"><Link to="/">Home</Link><Link to="/list-categories">All Categories</Link></nav>
                <nav className="user">{loginTextArea}</nav>
                <div className="clear"></div>
            </div>
		</header>
	}
});
