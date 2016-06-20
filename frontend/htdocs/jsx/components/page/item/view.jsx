var ItemActions = require('../../../actions/ItemActions.jsx');
var ItemStore = require('../../../stores/ItemStore.jsx');
var Link = require('react-router').Link;

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

        let { itemId } = this.props.params;

		return {
			item: ItemStore.getItems(null, itemId)
		}
	},

	componentWillReceiveProps: function(nextProps) {
		this.getDataIfNeeded(nextProps);
	},

	getDataIfNeeded: function (props) {

		let { itemId } = typeof props !== 'undefined' ? props.params : this.props.params;

		if (typeof props === 'undefined' || props != this.props) {
			ItemActions.loadItems(this.props.token, null, itemId);
		}
	},

    _onChange: function() {
        this.setState(this.fetchState());
    },

	render: function() {

		var item = this.state.item;

        if (item == null) {
            return <div></div>
        }

		var buttons = "";

		if (this.props.loggedIn === true) {
			buttons = <input type="button" value="Edit"/>
		}

		return <div key={item.id}>
            {item.name} {buttons}
		</div>
	}
});
