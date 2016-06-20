var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');

module.exports = {

	loadItems: function(token, categoryId, itemId) {

		var url = 'http://localhost:8080/rest/v1/',
			eventToDispatch = '_ITEMS_LOAD_COMPLETE';

		if (categoryId) {
			url += 'items/category/' + categoryId;
			eventToDispatch = 'CATEGORY' + eventToDispatch;
		} else if (itemId) {
			url += 'items/' + itemId;
			eventToDispatch = 'ITEM_LOAD_COMPLETE';
		}
		else {
			url += 'items';
			eventToDispatch = 'RECENT' + eventToDispatch;
		}

        $.ajax(
			{
				url: url,
				method: "GET",
				contentType: "application/json",
				error: function(error) {
					AppDispatcher.dispatch({
						actionType: "ERROR",
						message: "Failed to load items"
					});

				}.bind(this),

				success: function (result) {

					AppDispatcher.dispatch({
						actionType: eventToDispatch,
						items: JSON.parse(result)
					});
				}
			}
		);
		console.log('request away');
	}
};
