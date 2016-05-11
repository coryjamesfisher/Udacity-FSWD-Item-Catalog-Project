var ItemActions = require('../../actions/ItemActions.jsx');
var RecentItemStore = require('../../stores/RecentItemStore.jsx');

module.exports = React.createClass({

	getInitialState: function() {

		return {
			items: []
		}
	},

	componentDidMount: function() {

		RecentItemStore.addChangeListener(this._onChange);

		if (this.props.loggedIn) {
			ItemActions.loadRecent(this.props.token);
		}

		return {}
	},

	fetchState: function() {

		return {
			items: RecentItemStore.getRecentItems()
		}
	},

	componentWillUpdate: function() {

		if (this.state.items.length == 0) {
			ItemActions.loadRecent(this.props.token);
		}
	},

    _onChange: function() {
        this.setState(this.fetchState());
    },

	render: function() {

		var items = this.state.items;

		return <div>
			recent items list
			{items.map(function(result) {
				return <div>{result.code} - {result.name} {result.price}</div>
			})}

		</div>
	}
});
