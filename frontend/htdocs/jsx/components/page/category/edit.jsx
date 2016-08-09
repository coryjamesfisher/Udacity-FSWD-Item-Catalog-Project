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

        if (categoryId === null || typeof categoryId === 'undefined') {
            return {
                category: {
                    "code": "",
                    "name": "",
                    "id": 0
                },
                errors: AppStore.getErrors()
            }
        }

		return {
			category: this.state && this.state.category && this.state.category.id == categoryId ? this.state.category : CategoryStore.getCategory(categoryId),
            errors: AppStore.getErrors()
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

        var errors = [];
        if (this.state.category.name == '') {
            errors.push("Please enter the category name.");
        }

        if (this.state.category.code == '') {
            errors.push("Please enter the category code.");
        }

        if (errors.length > 0) {
            AppActions.setErrors(errors);
            return;
        }

        AppActions.clearErrors();

        if (this.state.category.id) {
            CategoryActions.updateCategory(this.props.token,  this.state.category, this.onCreateSuccess);
        } else {
            CategoryActions.createCategory(this.props.token, this.state.category, this.onCreateSuccess);
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
            {this.state.errors.map(function(error, index) {
                return <p key={index}>{error}</p>
            })}
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