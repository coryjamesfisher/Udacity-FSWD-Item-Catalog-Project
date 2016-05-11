var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _recentItems = [];

var RecentItemStore = assign({}, EventEmitter.prototype, {

    getRecentItems: function() { return _recentItems; },

    emitChange: function() { this.emit(CHANGE_EVENT); },
    addChangeListener: function(callback) { this.on(CHANGE_EVENT, callback); },
    removeChangeListener: function(callback) { this.removeListener(CHANGE_EVENT, callback); }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

    switch(action.actionType) {
        case "RECENT_ITEMS_LOAD_COMPLETE":

            if (action.items && action.items.length > 0) {
                _recentItems = action.items
            }

            RecentItemStore.emitChange();
            break;

        default:
        // no op
    }
});

module.exports = RecentItemStore;