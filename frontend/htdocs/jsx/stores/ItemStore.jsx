var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _items = [];

// @todo add status handling to a super class
var _currentItemStatus = 'editing';
var _lastCreatedItem = null;

var ItemStore = assign({}, EventEmitter.prototype, {

    getItems: function(categoryId, itemId) {

        return _items.filter(function(item){

            if (itemId) {
                return item.id == itemId;
            }

            if (categoryId) {

                // Keep the item if any of the categories matches the categoryId.
                return item.categories.some(function(category){
                        return category == categoryId;
                });
            }

            return true;
        });
    },

    isItemNew: function (item) {

        // If the item is not in the list it is new.
        return !_items.some(function(nextItem) {
            return item.id == nextItem.id;
        });
    },

    getCurrentItemStatus: function() {
        return _currentItemStatus;
    },

    editing: function() {
        _currentItemStatus = 'editing';
    },

    saving: function() {
        _currentItemStatus = 'saving';
    },

    saved: function() {
        _currentItemStatus = 'saved';
    },

    failed: function() {
        _currentItemStatus = 'failed';
    },

    lastCreated: function(id) {
        _lastCreatedItem = id;
    },

    getLastCreated: function() {
        return _lastCreatedItem;
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
                _items = _items.concat(action.items.filter(ItemStore.isItemNew));
            }

            ItemStore.emitChange();
            break;

        case "ITEM_LOAD_COMPLETE":

            // Items is actually a singular item in this case.
            if (action.items) {

                if (ItemStore.isItemNew(action.items)) {
                    _items.push(action.items);
                }
            }

            ItemStore.emitChange();
            break;

        case "ITEM_CREATE_COMPLETE":

            if (action.item) {
                _items.push(action.item);
            }

            ItemStore.lastCreated(action.item.id);
            ItemStore.saved();
            ItemStore.emitChange();
            break;

        case "ITEM_EDITING":
            ItemStore.editing();
            break;

        case "ITEM_UPDATING":
            ItemStore.saving();
            break;

        case "ITEM_UPDATE_FAILED":
            ItemStore.failed();
            break;

        case "ITEM_UPDATE_COMPLETE":
            if (action.item) {

                _items.forEach(function(_item, index){
                    if (action.item.id == _item.id) {
                       _items[index] = action.item;
                    }
                });
            }

            ItemStore.saved();
            ItemStore.emitChange();
            break;

        default:
        // no op
    }
});

module.exports = ItemStore;