var CategoryActions = require('../../../actions/CategoryActions.jsx');
var ItemActions = require('../../../actions/ItemActions.jsx');
var CategoryStore = require('../../../stores/CategoryStore.jsx');
var ItemStore = require('../../../stores/ItemStore.jsx');
var Link = require('react-router').Link;

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

		this.getDataIfNeeded();

		return {}
	},

	componentWillUnmount: function() {
		CategoryStore.removeChangeListener(this._onChange);
		ItemStore.removeChangeListener(this._onChange);
	},

	fetchState: function() {

        let { categoryId } = this.props.params;

		return {
            category: CategoryStore.getCategory(categoryId),
			items: ItemStore.getItems(categoryId)
		}
	},

	componentWillReceiveProps: function(nextProps) {
		this.getDataIfNeeded(nextProps);
	},

	getDataIfNeeded: function (props) {

		let { categoryId } = typeof props !== 'undefined' ? props.params : this.props.params;

		if (typeof props === 'undefined' || props != this.props) {
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

		var mode = this.props.params;

		return <div>
			Category - {category.name}
			{items.map(function(result) {
				var _link = "/item/" + result.id + "/view";
				return <div key={result.id}><Link to={_link}>{result.code} - {result.name} {result.price}</Link></div>
			})}
		</div>
	}
});
