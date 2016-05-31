var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _items = [];

var ItemStore = assign({}, EventEmitter.prototype, {

    getItems: function(categoryId, itemId) {

        if (
            // Get items for category
            (typeof categoryId == 'undefined' || !categoryId)
            &&
            // Get single item
            (typeof itemId == 'undefined' || !itemId)
        ) {
            return _items;
        }

        var results = [];

        for (var i = 0; i < _items.length; i++) {

            // Category Id: multi-item match
            if (categoryId) {
                for (var j = 0; j < _items[i].categories.length; j++) {
                    if (_items[i].categories[j] == categoryId) {
                        results.push(_items[i]);
                        break;
                    }
                }
            }
            // Item Id: single-item match
            else if (itemId && _items[i].id == itemId) {
                return _items[i];
            }
        }

        return results;
    },

    emitChange: function() { this.emit(CHANGE_EVENT); },
    addChangeListener: function(callback) { this.on(CHANGE_EVENT, callback); },
    removeChangeListener: function(callback) { this.removeListener(CHANGE_EVENT, callback); }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

    switch(action.actionType) {
        case "RECENT_ITEMS_LOAD_COMPLETE":
        case "CATEGORY_ITEMS_LOAD_COMPLETE":

            if (action.items && action.items.length > 0) {
                _items = action.items
            }

            ItemStore.emitChange();
            break;
        case "ITEM_LOAD_COMPLETE":

            // Items is actually a singular item in this case.
            if (action.items) {
                _items.push(action.items);
            }
            ItemStore.emitChange();
            break;

        default:
        // no op
    }
});

module.exports = ItemStore;