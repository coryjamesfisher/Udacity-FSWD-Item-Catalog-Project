var ItemStore = require('../../../stores/ItemStore.jsx');
var CategoryStore = require('../../../stores/CategoryStore.jsx');
var AppStore = require('../../../stores/AppStore.jsx');
var ItemActions = require('../../../actions/ItemActions.jsx');
var CategoryActions = require('../../../actions/CategoryActions.jsx');
var AppActions = require('../../../actions/AppActions.jsx');
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
                "status": ItemStore.getCurrentItemStatus(),
                error_message: AppStore.getError()
        };
	},

	componentDidMount: function() {
		ItemStore.addChangeListener(this._onChange);
		AppStore.addChangeListener(this._onChange);
		this.getDataIfNeeded(this.props);
        ItemStore.editing();

		return {}
	},

	componentWillUnmount: function() {
		ItemStore.removeChangeListener(this._onChange);
		AppStore.removeChangeListener(this._onChange);
        AppActions.clearErrors();
	},

	fetchState: function() {

        var itemId = this.props.params.itemId || this.state.item.id || ItemStore.getLastCreated() || null;

        if (itemId === null || typeof itemId == 'undefined') {
            return {
                item: {
                    "id": "",
                    "code": "",
                    "name": "",
                    "price": "",
                    "categories": []
                },
                "status": ItemStore.getCurrentItemStatus(),
                "lastCreatedItem": ItemStore.getLastCreated(),
                error_message: AppStore.getError()
            }
        }

        var item = ItemStore.getItems(null, itemId)[0];

		return {
			item: item,
            status: ItemStore.getCurrentItemStatus(),
            error_message: AppStore.getError()
		}
	},

	componentWillReceiveProps: function(nextProps) {
		this.getDataIfNeeded(nextProps);
	},

	getDataIfNeeded: function (props) {

        var itemId = null;
        if (props !== null && typeof props !== 'undefined' &&
            props.params !== null && typeof props.params !== 'undefined') {
            itemId = props.params.itemId;
        }

		if (itemId !== null) {
            ItemActions.loadItems(this.props.token, null, itemId);
		} else {
            // Force a change to clear any existing values.
            // This is a new item
            this._onChange();
        }
	},

    _onChange: function() {
        this.setState(this.fetchState());

        var self = this;

        if (self.state.status == "saved") {
            setTimeout(function() {
                    browserHistory.push('/item/' + self.state.item.id + '/view');
            }, 1);
        }
    },

    // Calls AC update/save method
    saveItem: function(event) {
        event.preventDefault();

        if (this.state.item.id) {

            ItemActions.updateItem(
                this.props.token,
                this.state.item
            );

            return;
        }

        // Add the category to the item state.
        this.state.item.categories.push(this.props.location.query.category);

        ItemActions.createItem(
            this.props.token,
            this.state.item
        );

    },

    // Sets item state for any field
    updateItem: function(e) {
        var itemCopy = JSON.parse(JSON.stringify(this.state.item));
        itemCopy[e.target.getAttribute('data-field')] = e.target.value;
        this.setState({"item": itemCopy});
    },

    render: function() {

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