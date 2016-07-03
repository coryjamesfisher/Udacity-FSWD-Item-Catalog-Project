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
	},

	updateItem: function(token, item, onSuccess) {

		$.ajax(
			{
				url: "http://localhost:8080/rest/v1/items/" + item.id,
				method: "PUT",
				contentType: "application/json",
				data: JSON.stringify({
					"id": item.id,
					"code": item.code,
					"name": item.name,
					"price": item.price,
					"categories": [1]
				}),
				error: function(error) {

					AppDispatcher.dispatch({
						actionType: "ERROR",
						message: "Failed to create item."
					});
				}.bind(this),

				success: function (result) {

					var item = JSON.parse(result);

					AppDispatcher.dispatch({
						actionType: "ITEM_UPDATE_COMPLETE",
						item: item
					});

					onSuccess(item.id);
				}
			}
		)
	},

	createItem: function(token, item, onSuccess) {

		$.ajax(
			{
				url: "http://localhost:8080/rest/v1/items",
				method: "POST",
				contentType: "application/json",
				data: JSON.stringify({
					"code": item.code,
					"name": item.name,
					"price": item.price,
					"categories": [1]
				}),
				error: function(error) {

					AppDispatcher.dispatch({
						actionType: "ERROR",
						message: "Failed to create item."
					});
				}.bind(this),

				success: function (result) {

					var item = JSON.parse(result);

					AppDispatcher.dispatch({
						actionType: "ITEM_CREATE_COMPLETE",
						item: item
					});

					onSuccess(item.id);
				}
			}
		)
	}
};
