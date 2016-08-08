var CategoryStore = require('../../../stores/CategoryStore.jsx');
var AppStore = require('../../../stores/AppStore.jsx');
var CategoryActions = require('../../../actions/CategoryActions.jsx');
var AppActions = require('../../../actions/AppActions.jsx');
var findDOMNode = require('react-dom').findDOMNode;
var browserHistory = require('react-router').browserHistory;

module.exports = React.createClass({

   getInitialState: function() {

		return this.fetchState();
	},

	componentDidMount: function() {

		CategoryStore.addChangeListener(this._onChange);
		AppStore.addChangeListener(this._onChange);
		this.getDataIfNeeded();

		return {}
	},

	componentWillUnmount: function() {
		CategoryStore.removeChangeListener(this._onChange);
		AppStore.removeChangeListener(this._onChange);
        AppActions.clearErrors();
	},

	fetchState: function() {

        let { categoryId } = this.props.params || null;

        if (categoryId === null) {
            return {
                category: {
                    "code": "",
                    "name": "",
                    "id": 0
                },
                error_message: AppStore.getError()
            }
        }

		return {
			category: CategoryStore.getCategory(categoryId),
            error_message: AppStore.getError()
		}
	},

	componentWillReceiveProps: function(nextProps) {
		this.getDataIfNeeded(nextProps);
	},

	getDataIfNeeded: function (props) {

        var categoryId = null;

        if (typeof props !== 'undefined') {
            let { categoryId } = props.params;
        } else if (typeof this.props.params !== 'undefined') {
            let { categoryId } = this.props.params;
        }

		if (categoryId !== null) {
            CategoryActions.loadCategory(this.props.token, categoryId);
		}
	},

    _onChange: function() {
        this.setState(this.fetchState());
    },

    onCreateSuccess: function() {
        const url = '/list-categories';
        browserHistory.push(url);
    },

    saveCategory: function(event) {
        event.preventDefault();

        if (this.state.category.id) {
            CategoryActions.updateCategory(this.props.token,  this.state.category, this.onCreateSuccess);
        } else {
            CategoryActions.createCategory(this.props.token, findDOMNode(this.refs.category_code).value, findDOMNode(this.refs.category_name).value, this.onCreateSuccess);
        }
    },


    // Sets item state for any field
    updateCategory: function(e) {
        var categoryCopy = JSON.parse(JSON.stringify(this.state.category));
        categoryCopy[e.target.getAttribute('data-field')] = e.target.value;
        this.setState({"category": categoryCopy});
    },

    render: function() {

        var category = this.state.category;

        return <form onSubmit={this.saveCategory}>
            <p>
                {this.state.error_message}
            </p>
            <p>
                <input type="hidden" placeholder="ID" ref="item_id" value={this.state.category.id}/>
                <input type="text" placeholder="Category Code" ref="category_code" data-field="code" value={category.code} onChange={this.updateCategory}/>
                <input type="text" placeholder="Category Name" ref="category_name" data-field="name" value={category.name} onChange={this.updateCategory}/>
            </p>
            <p>
                <button type="submit">Save</button>
            </p>
        </form>
    }

});