var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var browserHistory = require('react-router').browserHistory;

// Components
var LoginPage = require('./components/page/login.jsx');
var RecentItemsPage = require('./components/page/recent_items.jsx');
var CategoryListPage = require('./components/page/category_list.jsx');
var ItemEditPage = require('./components/page/item/edit.jsx');
var ItemViewPage = require('./components/page/item/view.jsx');
var CategoryEditPage = require('./components/page/category/edit.jsx');
var CategoryItemListPage = require('./components/page/category/item_list.jsx');

// Layout
var PageHeader = require('./components/layout/header.jsx');
var PageFooter = require('./components/layout/footer.jsx');

// Application state
var UserStore = require('./stores/UserStore.jsx');

// Application wrapper
var App = React.createClass({

    getInitialState: function() {
		return {
			token: "",
			loggedIn: false,
			error: ""
		}
	},

    fetchState: function() {
		return {
			token: UserStore.getToken(),
			loggedIn: UserStore.loggedIn()
		}
	},

    componentDidMount: function() {
		UserStore.addChangeListener(this._onChange);

		return {}
	},

    _onChange: function() {
        this.setState(this.fetchState());
    },

    render: function() {
        return <div className="app">
            <PageHeader logged_in={this.state.loggedIn} token={this.state.token}/>
            <main>
                <div className="content">
                {this.props.children && React.cloneElement(this.props.children, {
                  loggedIn: this.state.loggedIn,
                  token: this.state.token
                })}
                </div>
            </main>
            <PageFooter/>
            </div>
    }
});

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={RecentItemsPage}/>
            <Route path="/sso" component={LoginPage}/>
            <Route path="/list-categories" component={CategoryListPage}/>
            <Route path="/item/:itemId/view" component={ItemViewPage}/>
            <Route path="/item/:itemId/edit" component={ItemEditPage}/>
            <Route path="/item/create" component={ItemEditPage}/>
            <Route path="/category/:categoryId/list-items" component={CategoryItemListPage}/>
            <Route path="/category/create" component={CategoryEditPage}/>
        </Route>
    </Router>,
    document.getElementById('application')
);

