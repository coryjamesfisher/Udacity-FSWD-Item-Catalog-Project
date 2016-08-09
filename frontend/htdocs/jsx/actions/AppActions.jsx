var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');

module.exports = {
    clearErrors: function() {
        AppDispatcher.dispatch({
            actionType: "ERROR_PROCESSED"
        });
    },
    setErrors: function(messages) {
        AppDispatcher.dispatch({
            actionType: "ERROR",
            messages: messages
        });
    }
};