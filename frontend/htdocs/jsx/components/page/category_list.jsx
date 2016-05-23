var CategoryActions = require('../../actions/CategoryActions.jsx');
var CategoryStore = require('../../stores/CategoryStore.jsx');
var Link = require('react-router').Link;

module.exports = React.createClass({

	getInitialState: function() {

		return {
			items: []
		}
	},

	componentDidMount: function() {

		CategoryStore.addChangeListener(this._onChange);

        console.log(this.props);
		if (this.props.loggedIn) {
            console.log('loading');
			CategoryActions.loadAllCategories(this.props.token);
		}

		return {}
	},

	fetchState: function() {

		return {
			items: CategoryStore.getItems()
		}
	},

	componentWillUpdate: function() {

		if (this.state.items.length == 0) {
			CategoryActions.loadAllCategories(this.props.token);
		}
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
				return <div>{result.id} - {result.code} <Link to={_link}>{result.name}</Link></div>
			})}

		</div>
	}
});
