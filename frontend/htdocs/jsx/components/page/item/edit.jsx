var ItemStore = require('../../../stores/ItemStore.jsx');
var CategoryStore = require('../../../stores/CategoryStore.jsx');
var AppStore = require('../../../stores/AppStore.jsx');
var ItemActions = require('../../../actions/ItemActions.jsx');
var CategoryActions = require('../../../actions/CategoryActions.jsx');
var AppActions = require('../../../actions/AppActions.jsx');
var findDOMNode = require('react-dom').findDOMNode;
var browserHistory = require('react-router').browserHistory;

module.exports = React.createClass({

   getInitialState: function() {

		return this.fetchState();
	},

	componentDidMount: function() {

		ItemStore.addChangeListener(this._onChange);
		AppStore.addChangeListener(this._onChange);
		this.getDataIfNeeded();

		return {}
	},

	componentWillUnmount: function() {
		ItemStore.removeChangeListener(this._onChange);
		AppStore.removeChangeListener(this._onChange);
        AppActions.clearErrors();
	},

	fetchState: function() {

        let { itemId } = this.props.params || null;

        if (itemId === null) {
            return {
                item: {
                    "id": "",
                    "code": "",
                    "name": "",
                    "price": ""
                },
                error_message: AppStore.getError()
            }
        }

		return {
			item: ItemStore.getItems(itemId)[0],
            error_message: AppStore.getError()
		}
	},

	componentWillReceiveProps: function(nextProps) {
		this.getDataIfNeeded(nextProps);
	},

	getDataIfNeeded: function (props) {

        var itemId = null;

        if (typeof props !== 'undefined') {
            let { itemId } = props.params;
        } else if (typeof this.props.params !== 'undefined') {
            let { itemId } = this.props.params;
        }

		if (categoryId !== null) {
            ItemActions.loadItems(this.props.token, null, itemId);
		}
	},

    _onChange: function() {
        this.setState(this.fetchState());
    },

    onCreateSuccess: function() {
        browserHistory.push('/item/' + this.state.item.id + '/view');
    },

    saveItem: function(event) {
        event.preventDefault();

        ItemActions.createItem(
            this.props.token,
            findDOMNode(this.refs.item_id).value,
            findDOMNode(this.refs.item_code).value,
            findDOMNode(this.refs.item_name).value,
            findDOMNode(this.refs.item_price).value,
            this.onCreateSuccess
        );
    },

    render: function() {

        var item = this.state.item;

        return <form onSubmit={this.saveItem}>
            <p>
                {this.state.error_message}
            </p>
            <p>
                <input type="hidden" placeholder="ID" ref="item_id" value={item.id}/>
                <input type="text" placeholder="Code" ref="item_code" defaultValue={item.code}/>
                <input type="text" placeholder="Name" ref="item_name" defaultValue={item.name}/>
                <input type="text" placeholder="Price" ref="item_price" defaultValue={item.price}/>
            </p>
            <p>
                <button type="submit">Save</button>
            </p>
        </form>
    }

});