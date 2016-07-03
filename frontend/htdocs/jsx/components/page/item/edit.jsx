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

         return {
                item: {
                    "id": "",
                    "code": "",
                    "name": "",
                    "price": "",
                    "categories": []
                },
                error_message: AppStore.getError()
        };
	},

	componentDidMount: function() {
		ItemStore.addChangeListener(this._onChange);
		AppStore.addChangeListener(this._onChange);
		this.getDataIfNeeded(this.props);

		return {}
	},

	componentWillUnmount: function() {
		ItemStore.removeChangeListener(this._onChange);
		AppStore.removeChangeListener(this._onChange);
        AppActions.clearErrors();
	},

	fetchState: function() {

        var itemId = this.props.params.itemId || null;

        if (itemId === null || typeof itemId == 'undefined') {
            return {
                item: {
                    "id": "",
                    "code": "",
                    "name": "",
                    "price": "",
                    "categories": []
                },
                error_message: AppStore.getError()
            }
        }

        console.dir(ItemStore.getItems(null, itemId)[0]);
		return {
			item: ItemStore.getItems(null, itemId)[0],
            error_message: AppStore.getError()
		}
	},

	componentWillReceiveProps: function(nextProps) {
        console.log('component will receive props');
		this.getDataIfNeeded(nextProps);
	},

	getDataIfNeeded: function (props) {

        var itemId = null;
        if (props !== null && typeof props !== 'undefined' &&
            props.params !== null && typeof props.params !== 'undefined') {
            itemId = props.params.itemId;
        }

		if (itemId !== null) {

            console.log('load item id:' + itemId);
            ItemActions.loadItems(this.props.token, null, itemId);
		} else {

            console.log('item null forcing change');
            // Force a change to clear any existing values.
            // This is a new item
            this._onChange();
        }
	},

    _onChange: function() {
        this.setState(this.fetchState());
    },

    onCreateSuccess: function(item_id) {
        browserHistory.push('/item/' + item.id + '/view');
    },

    saveItem: function(event) {
        event.preventDefault();

        if (this.state.item.id) {

            ItemActions.updateItem(
                this.props.token,
                this.state.item,
                this.onCreateSuccess
            );

            return;
        }

        ItemActions.createItem(
            this.props.token,
            this.state.item,
            this.onCreateSuccess
        );

    },

    updateItem: function(e) {
        var itemCopy = JSON.parse(JSON.stringify(this.state.item));
        itemCopy[e.target.getAttribute('data-field')] = e.target.value;
        this.setState({"item": itemCopy});
    },

    render: function() {

        console.log('rendering');
        console.dir(this.state.item);

        return <form onSubmit={this.saveItem}>
            <p>
                {this.state.error_message}
            </p>
            <p>
                <input type="hidden" placeholder="ID" ref="item_id" value={this.state.item.id}/>
                <input type="text" placeholder="Code" ref="item_code" value={this.state.item.code} data-field="code" onChange={this.updateItem} />
                <input type="text" placeholder="Name" ref="item_name" value={this.state.item.name} data-field="name" onChange={this.updateItem} />
                <input type="text" placeholder="Price" ref="item_price" value={this.state.item.price} data-field="price" onChange={this.updateItem} />
            </p>
            <p>
                <button type="submit">Save</button>
            </p>
        </form>
    }

});