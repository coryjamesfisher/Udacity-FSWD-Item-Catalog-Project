var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');

module.exports = {

	login: function(provider, auth_code) {

        $.ajax(
			{
				url: "http://localhost:8080/rest/v1/auth/sso/" + provider + "/auth",
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
	}
};
