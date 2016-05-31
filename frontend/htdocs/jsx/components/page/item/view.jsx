var ItemActions = require('../../../actions/ItemActions.jsx');
var ItemStore = require('../../../stores/ItemStore.jsx');
var Link = require('react-router').Link;

module.exports = React.createClass({

	getInitialState: function() {

		return {
            item: null
        }

	},

	componentDidMount: function() {

		ItemStore.addChangeListener(this._onChange);
        let { itemId } = this.props.params;

		if (this.props.loggedIn) {
			ItemActions.loadItems(this.props.token, null, itemId);
		}

		return {}
	},

	fetchState: function() {

        let { itemId } = this.props.params;

		return {
			item: ItemStore.getItems(null, itemId)
		}
	},

	componentWillUpdate: function() {

        let { itemId } = this.props.params;

		if (this.state.item == null) {
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

		return <div>
            {item.name} <input type="button" value="Edit"/>
		</div>
	}
});
