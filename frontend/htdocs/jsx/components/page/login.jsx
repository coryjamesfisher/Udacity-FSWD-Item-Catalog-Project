module.exports = React.createClass({

	getInitialState: function() {
		return {
			token: ""
		}
	},

	componentDidMount: function() {
		let url = this.props.location.query;

		this.serverRequest = $.ajax(
			{
				url: "http://localhost:8080/rest/v1/auth/sso/" + url.provider + "/auth",
				method: "POST",
				data: JSON.stringify({"auth_token": url.code}),
				contentType: "application/json",
				success: function (result) {
					this.setState({
						token: result.token
					});
				}.bind(this)
			});

		console.log(url.provider);
		console.log(url.code);
		return {}
	},

	componentDidUnmount: function() {
		this.serverRequest.abort();
	},

	render: function() {

		return <div>
			{this.state.token}
		</div>
	}
});
