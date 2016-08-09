var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _errors = [];

var AppStore = assign({}, EventEmitter.prototype, {

    getErrors: function() { return _errors; },

    emitChange: function() { this.emit(CHANGE_EVENT); },
    addChangeListener: function(callback) { this.on(CHANGE_EVENT, callback); },
    removeChangeListener: function(callback) { this.removeListener(CHANGE_EVENT, callback); }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

    switch(action.actionType) {
        case "ERROR":

            if (action.message && action.message.length > 0) {
                _errors[_errors.length] = action.message;
            } else if (action.messages) {
                _errors = action.messages;
            }

            AppStore.emitChange();
            break;

        case "ERROR_PROCESSED":

            _errors = [];

            AppStore.emitChange();
            break;

        default:
        // no op
    }
});

module.exports = AppStore;