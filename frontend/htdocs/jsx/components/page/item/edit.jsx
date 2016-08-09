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
                errors: AppStore.getErrors()
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
        ItemStore.editing();
		ItemStore.removeChangeListener(this._onChange);
		AppStore.removeChangeListener(this._onChange);
        AppActions.clearErrors();
	},

	fetchState: function() {

        var itemId = this.props.params.itemId || this.state.item.id || null;
        var status = ItemStore.getCurrentItemStatus();

        if (itemId === null || typeof itemId == 'undefined') {
            return {
                item: {
                    "id": "",
                    "code": "",
                    "name": "",
                    "price": "",
                    "categories": []
                },
                "status": status,
                "lastCreatedItem": ItemStore.getLastCreated(),
                errors: AppStore.getErrors()
            }
        }

        var item = this.state.item && this.state.item.id == itemId ? this.state.item : ItemStore.getItems(null, itemId)[0];

		return {
			"item": item,
            "status": status,
            "lastCreatedItem": ItemStore.getLastCreated(),
            "errors": AppStore.getErrors()
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

		if (itemId !== null && typeof itemId !== 'undefined') {
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
                    var itemId = typeof self.state.item !== 'undefined' && Number.isInteger(self.state.item.id) ? self.state.item.id : self.state.lastCreatedItem;
                    browserHistory.push('/item/' + itemId + '/view');
            }, 1);
        }
    },

    // Calls AC update/save method
    saveItem: function(event) {
        event.preventDefault();

        var errors = [];
        if (this.state.item.name == '') {
            errors.push("Please enter the item name.");
        }

        if (this.state.item.code == '') {
            errors.push("Please enter the item code.");
        }

        var price = parseFloat(this.state.item.price.replace("$", ""));
        if (isNaN(price)) {
            errors.push("Please enter a valid dollar amount.");
        }

        if (errors.length > 0) {
            AppActions.setErrors(errors);
            return;
        }

        AppActions.clearErrors();

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
            {this.state.errors.map(function(error, index) {
                return <p key={index}>{error}</p>
            })}
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