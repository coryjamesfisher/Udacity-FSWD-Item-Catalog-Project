var CategoryActions = require('../../actions/CategoryActions.jsx');
var CategoryStore = require('../../stores/CategoryStore.jsx');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

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

	deleteCategory: function(id) {
		CategoryActions.deleteCategory(this.props.token, id);
	},

	editCategory: function(id) {
		browserHistory.push('/category/' + id + '/edit');
	},

	render: function() {

		var items = this.state.items,
			self = this;


		return <div>
			Categories
			{items.map(function(result) {

				var deleteButton = "";
				var editButton = "";
				if (self.props.loggedIn == true) {
					var deleteButton = <button onClick={self.deleteCategory.bind(self, result.id)}>x</button>;
					var editButton = <button onClick={self.editCategory.bind(self, result.id)}>edit</button>;
				}

                var _link = "/category/" + result.id + "/list-items";

				return <div key={result.id}>{result.id} - {result.code} <Link to={_link}>{result.name}</Link> {editButton} {deleteButton} </div>
			})}

		</div>
	}
});
