var CategoryActions = require('../../../actions/CategoryActions.jsx');
var ItemActions = require('../../../actions/ItemActions.jsx');
var CategoryStore = require('../../../stores/CategoryStore.jsx');
var ItemStore = require('../../../stores/ItemStore.jsx');

module.exports = React.createClass({

	getInitialState: function() {

		return {
            category: {},
			items: []
		}
	},

	componentDidMount: function() {

		CategoryStore.addChangeListener(this._onChange);
		ItemStore.addChangeListener(this._onChange);
        let { categoryId } = this.props.params;
        console.log('category id mounted: ' + categoryId);

		if (this.props.loggedIn) {
            CategoryActions.loadCategory(this.props.token, categoryId);
			ItemActions.loadItems(this.props.token, categoryId);
		}

		return {}
	},

	fetchState: function() {

        let { categoryId } = this.props.params;

		return {
            category: CategoryStore.getCategory(categoryId),
			items: ItemStore.getItems(categoryId)
		}
	},

	componentWillUpdate: function() {

        let { categoryId } = this.props.params;

		if (this.state.items.length == 0) {
            CategoryActions.loadCategory(this.props.token, categoryId);
			ItemActions.loadItems(this.props.token, categoryId);
		}
	},

    _onChange: function() {
        this.setState(this.fetchState());
    },

	render: function() {

		var category = this.state.category,
            items = this.state.items;

		return <div>
			Category - {category.name}
			{items.map(function(result) {
				return <div>{result.code} - {result.name} {result.price}</div>
			})}
		</div>
	}
});
