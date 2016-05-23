var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _categories = [];

var CategoryStore = assign({}, EventEmitter.prototype, {

    getItems: function() { return _categories; },
    hasCategory: function(categoryId) {
        for (var i = 0; i < _categories.length; i++) {
            if (_categories[i].id == categoryId) {
                console.log('Category ' + categoryId + ' found in cache');
                return true;
            }
        }

        console.log('No category ' + categoryId + ' in cache');
        return false;
    },
    getCategory: function(categoryId) {
        for (var i = 0; i < _categories.length; i++) {
            if (_categories[i].id == categoryId) {
                return _categories[i];
            }
        }

        return false;
    },

    emitChange: function() { this.emit(CHANGE_EVENT); },
    addChangeListener: function(callback) { this.on(CHANGE_EVENT, callback); },
    removeChangeListener: function(callback) { this.removeListener(CHANGE_EVENT, callback); }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

    switch(action.actionType) {
        case "CATEGORIES_LOAD_COMPLETE":

            if (action.items && action.items.length > 0) {
                _categories = action.items
            }

            CategoryStore.emitChange();
            break;


        case "CATEGORY_LOAD_COMPLETE":

            if (action.item && action.item.length > 0) {
                _categories.push(action.item);
            }

            CategoryStore.emitChange();
            break;

        default:
        // no op
    }
});

module.exports = CategoryStore;