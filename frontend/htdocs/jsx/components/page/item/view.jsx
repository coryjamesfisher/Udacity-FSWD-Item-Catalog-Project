var ItemActions = require('../../../actions/ItemActions.jsx');
var ItemStore = require('../../../stores/ItemStore.jsx');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

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
			item: ItemStore.getItems(null, itemId)[0]
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


	editItem: function() {
		browserHistory.push('/item/' + this.state.item.id + '/edit');
	},

	render: function() {

		var item = this.state.item;

        if (item == null) {
            return <div></div>
        }

		var buttons = "";

		if (this.props.loggedIn === true) {
			buttons = <input type="button" value="Edit" onClick={this.editItem}/>
		}

		return <div key={item.id}>
			<p>
			{item.code} - {item.name} {item.price} {buttons}
			</p>
			<p>
			Todo: Extra details about item here
			</p>
		</div>
	}
});
