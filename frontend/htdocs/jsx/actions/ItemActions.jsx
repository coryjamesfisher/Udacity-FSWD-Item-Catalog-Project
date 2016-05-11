var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');

module.exports = {

	loadRecent: function(token) {

        $.ajax(
			{
				url: "http://localhost:8080/rest/v1/items",
				method: "GET",
				contentType: "application/json",
				headers: {
					'Authorization': 'Bearer ' + token
				},
				error: function(error) {
					console.log(error);
				}.bind(this),

				success: function (result) {

                    AppDispatcher.dispatch({
                        actionType: "RECENT_ITEMS_LOAD_COMPLETE",
                        items: JSON.parse(result)
                    });
				}
			}
		);
	}
};
