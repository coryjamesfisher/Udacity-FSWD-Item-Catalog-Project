var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');

module.exports = {
    clearErrors: function() {
        AppDispatcher.dispatch({
            actionType: "ERROR_PROCESSED"
        });
    }
};