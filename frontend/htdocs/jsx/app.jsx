var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var browserHistory = require('react-router').browserHistory;

var LoginPage = require('./components/page/login.jsx');

var App = React.createClass({

    render: function() {

        return <div className="App">
            {this.props.children}
            </div>
    }
});

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="login" component={LoginPage}/>
        </Route>
    </Router>,
    document.getElementById('application')
);

