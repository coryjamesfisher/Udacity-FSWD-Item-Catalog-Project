var CategoryActions = require('../../actions/CategoryActions.jsx');
var CategoryStore = require('../../stores/CategoryStore.jsx');
var Link = require('react-router').Link;

module.exports = React.createClass({

	getInitialState: function() {

		return this.fetchState();
	},

	componentDidMount: function() {

		CategoryStore.addChangeListener(this._onChange);
		this.getDataIfNeeded();

		return {}
	},

	componentWillUnmount: function() {
		CategoryStore.removeChangeListener(this._onChange);
	},

	fetchState: function() {

		return {
			items: CategoryStore.getItems()
		}
	},

	getDataIfNeeded: function (props) {

		if (typeof props === 'undefined' || props != this.props) {
			CategoryActions.loadAllCategories(this.props.token);
		}
	},

	componentWillReceiveProps: function(nextProps) {

		this.getDataIfNeeded(nextProps);
	},

    _onChange: function() {
        this.setState(this.fetchState());
    },

	render: function() {

		var items = this.state.items;

		return <div>
			Categories
			{items.map(function(result) {
                var _link = "/category/" + result.id + "/list-items";
				return <div key={result.id}>{result.id} - {result.code} <Link to={_link}>{result.name}</Link></div>
			})}

		</div>
	}
});
