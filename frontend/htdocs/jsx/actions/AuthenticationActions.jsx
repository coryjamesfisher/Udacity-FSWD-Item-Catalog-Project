var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');

module.exports = {

	login: function(provider, auth_code) {

        $.ajax(
			{
				url: "http://localhost:8080/rest/v1/auth/sso/" + provider + "/auth_or_register",
				method: "POST",
				data: JSON.stringify({"auth_token": auth_code}),
				contentType: "application/json",

				error: function(error) {
					console.log(error);
					this.setState({error: "Failed to login"});
				}.bind(this),

				success: function (result) {

                    AppDispatcher.dispatch({
                        actionType: "LOGIN_COMPLETE",
                        token: JSON.parse(result).token
                    });
				}
			}
		);
	},

	logout: function() {

		AppDispatcher.dispatch({
			actionType: "LOGOUT_COMPLETE"
		})
	},

	thirdPartyAuth: function(provider) {

		switch(provider) {
			case "google":
			default:
				document.location = "https://accounts.google.com/o/oauth2/auth?" +
            		"scope=profile email" +
            		"&redirect_uri=" + encodeURIComponent("http://localhost:8000/sso?provider=google") +
            		"&response_type=code" +
            		"&client_id=1099338626741-0qbg100alipuei46fhc3vemsgn6nh491.apps.googleusercontent.com";
		}

		throw "Invalid 3rd party auth provider";
	}
};
