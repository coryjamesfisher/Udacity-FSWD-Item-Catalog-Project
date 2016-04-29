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

// Application wrapper
var App = React.createClass({

    render: function() {
        return <div className="App">
		if logged in show logout else login
            {this.props.children}
            </div>
    }
});

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={RecentItemsPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/list-categories" component={CategoryListPage}/>
            <Route path="/item/edit" component={ItemEditPage}/>
            <Route path="/item/view" component={ItemViewPage}/>
            <Route path="/category/edit" component={CategoryEditPage}/>
            <Route path="/category/list-items" component={CategoryItemListPage}/>
        </Route>
    </Router>,
    document.getElementById('application')
);

