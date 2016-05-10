var AuthenticationActions = require('../../actions/AuthenticationActions.jsx');
var UserStore = require('../../stores/UserStore.jsx');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			token: "",
			loggedIn: false,
			error: ""
		}
	},

	fetchState: function() {
		return {
			token: UserStore.getToken(),
			loggedIn: UserStore.loggedIn()
		}
	},

	componentDidMount: function() {
		UserStore.addChangeListener(this._onChange);

		let url = this.props.location.query;
		AuthenticationActions.login(url.provider, url.code);

		return {}
	},

	_onChange: function() {
		this.setState(this.fetchState());
	},

	render: function() {

		return <div>
			{this.state.error}
			<br/>
			{this.state.loggedIn}
			<br/>
			{this.state.token}
		</div>
	}
});
