var ItemActions = require('../../actions/ItemActions.jsx');
var ItemStore = require('../../stores/ItemStore.jsx');

module.exports = React.createClass({

	getInitialState: function() {

		return {
			items: []
		}
	},

	componentDidMount: function() {

		ItemStore.addChangeListener(this._onChange);

		if (this.props.loggedIn) {
			ItemActions.loadItems(this.props.token);
		}

		return {}
	},

	fetchState: function() {

		return {
			items: ItemStore.getItems()
		}
	},

	componentWillUpdate: function() {

		if (this.state.items.length == 0) {
			ItemActions.loadItems(this.props.token);
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
