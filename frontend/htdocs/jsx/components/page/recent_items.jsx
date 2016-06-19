var ItemActions = require('../../actions/ItemActions.jsx');
var ItemStore = require('../../stores/ItemStore.jsx');

module.exports = React.createClass({

	getInitialState: function() {

		return this.fetchState();
	},

	componentDidMount: function() {

		ItemStore.addChangeListener(this._onChange);
		this.getDataIfNeeded();

		return {}
	},

	componentWillUnmount: function() {
		ItemStore.removeChangeListener(this._onChange);
	},

	fetchState: function() {

		return {
			items: ItemStore.getItems()
		}
	},

	componentWillReceiveProps: function(nextProps) {
		this.getDataIfNeeded(nextProps)
	},

	getDataIfNeeded: function (props) {

		if (typeof props === 'undefined' || props != this.props) {
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
				return <div key={result.id}>{result.code} - {result.name} {result.price}</div>
			})}

		</div>
	}
});
