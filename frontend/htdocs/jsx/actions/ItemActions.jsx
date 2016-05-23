var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');

module.exports = {

	loadItems: function(token, categoryId) {

		var url = 'http://localhost:8080/rest/v1/',
			eventToDispatch = '_ITEMS_LOAD_COMPLETE';

		if (categoryId) {
			url += 'items/category/' + categoryId;
			eventToDispatch = 'CATEGORY' + eventToDispatch;
		} else {
			url += 'items';
			eventToDispatch = 'RECENT' + eventToDispatch;
		}

        $.ajax(
			{
				url: url,
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
                        actionType: eventToDispatch,
                        items: JSON.parse(result)
                    });
				}
			}
		);
	}
};
