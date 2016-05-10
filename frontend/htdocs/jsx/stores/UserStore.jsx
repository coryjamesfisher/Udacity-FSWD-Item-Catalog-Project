var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _loggedIn = false;
var _token = "";


var UserStore = assign({}, EventEmitter.prototype, {

    loggedIn: function() { return _loggedIn; },
    getToken: function() { return _token; },

    emitChange: function() { this.emit(CHANGE_EVENT); },
    addChangeListener: function(callback) { this.on(CHANGE_EVENT, callback); },
    removeChangeListener: function(callback) { this.removeListener(CHANGE_EVENT, callback); }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

    switch(action.actionType) {
        case "LOGIN_COMPLETE":

            if (action.token && action.token.length > 0) {
                _loggedIn = action.loggedIn;
                _token = action.token;
            }

            UserStore.emitChange();
            break;

        default:
        // no op
    }
});

module.exports = UserStore;