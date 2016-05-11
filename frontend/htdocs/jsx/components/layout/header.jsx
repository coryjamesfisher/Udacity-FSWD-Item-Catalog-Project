module.exports = React.createClass({

	render: function() {

        var loginTextArea = "";

        if (this.props.logged_in == false) {
            loginTextArea = <a href="https://accounts.google.com/o/oauth2/auth?scope=profile email&redirect_uri=http://localhost:8000/sso?provider=google&response_type=code&client_id=1099338626741-0qbg100alipuei46fhc3vemsgn6nh491.apps.googleusercontent.com">Login</a>
        } else {
            loginTextArea = <span>Logout</span>
        }

		return <div>
            {loginTextArea}
		</div>
	}
});
