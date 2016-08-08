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

	updateItem: function(token, item) {

		AppDispatcher.dispatch({
			actionType: "ITEM_UPDATING",
			item: item
		});

		$.ajax(
			{
				url: "http://localhost:8080/rest/v1/items/" + item.id,
				method: "PUT",
				contentType: "application/json",
				beforeSend: function(xhr) {xhr.setRequestHeader('Authorization', 'Bearer ' + token);},
				data: JSON.stringify({
					"id": item.id,
					"code": item.code,
					"name": item.name,
					"price": item.price,
					"categories": item.categories
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
				}
			}
		)
	},

	editingItem: function() {
		AppDispatcher.dispatch({
			actionType: "ITEM_EDITING"
		});
	},

	createItem: function(token, item) {

		AppDispatcher.dispatch({
			actionType: "ITEM_UPDATING",
			item: item
		});

		$.ajax(
			{
				url: "http://localhost:8080/rest/v1/items",
				method: "POST",
				contentType: "application/json",
				beforeSend: function(xhr) {xhr.setRequestHeader('Authorization', 'Bearer ' + token);},
				data: JSON.stringify({
					"code": item.code,
					"name": item.name,
					"price": item.price,
					"categories": item.categories
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
				}
			}
		);
	},

	deleteItem: function(token, id) {
		AppDispatcher.dispatch({
			actionType: "ITEM_DELETING",
			item_id: id
		});
		$.ajax(
			{
				url: "http://localhost:8080/rest/v1/items/" + id,
				method: "DELETE",
				beforeSend: function(xhr) {xhr.setRequestHeader('Authorization', 'Bearer ' + token);},
				error: function(error) {

					AppDispatcher.dispatch({
						actionType: "ERROR",
						message: "Failed to delete item."
					});
				}.bind(this),

				success: function (result) {

					AppDispatcher.dispatch({
						actionType: "ITEM_DELETE_COMPLETE",
						item_id: id
					});
				}
			}
		)
	}
};
