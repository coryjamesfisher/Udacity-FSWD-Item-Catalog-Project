var AuthenticationActions = require('../../actions/AuthenticationActions.jsx');

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
            <span className="siteTitle">Catalog This</span>
            <nav className="site">Catalog</nav>
            <nav className="user">{loginTextArea}</nav>
            <div className="clear"></div>
		</header>
	}
});
