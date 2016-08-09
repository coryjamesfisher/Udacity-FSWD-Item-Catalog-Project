var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var CategoryStore = require('../stores/CategoryStore.jsx');

module.exports = {

	loadAllCategories: function(token) {

        $.ajax(
			{
				url: "http://localhost:8080/rest/v1/categories",
				method: "GET",
				contentType: "application/json",
				error: function(error) {
					console.log(error);
				}.bind(this),

				success: function (result) {

                    AppDispatcher.dispatch({
                        actionType: "CATEGORIES_LOAD_COMPLETE",
                        items: JSON.parse(result)
                    });
				}
			}
		);
	},

	loadCategory: function(token, categoryId) {

		if (CategoryStore.hasCategory(categoryId)) {
			return;
		}

		$.ajax(
			{
				url: "http://localhost:8080/rest/v1/categories/" + categoryId,
				method: "GET",
				contentType: "application/json",
				error: function(error) {
					console.log(error);
				}.bind(this),

				success: function (result) {

                    AppDispatcher.dispatch({
                        actionType: "CATEGORY_LOAD_COMPLETE",
                        item: JSON.parse(result)
                    });
				}
			}
		);
	},

	updateCategory: function(token, category, onSuccess) {

		$.ajax(
			{
				url: "http://localhost:8080/rest/v1/categories/" + category.id,
				method: "PUT",
				contentType: "application/json",
				beforeSend: function(xhr) {xhr.setRequestHeader('Authorization', 'Bearer ' + token);},
				data: JSON.stringify({
					"code": category.code,
					"name": category.name
				}),
				error: function(error) {

					AppDispatcher.dispatch({
						actionType: "ERROR",
						message: "Failed to create category."
					});
				}.bind(this),

				success: function (result) {

					AppDispatcher.dispatch({
						actionType: "CATEGORY_UPDATE_COMPLETE",
						item: JSON.parse(result)
					});

					onSuccess();
				}
			}
		)
	},

	createCategory: function(token, category, onSuccess) {

		$.ajax(
			{
				url: "http://localhost:8080/rest/v1/categories",
				method: "POST",
				contentType: "application/json",
				beforeSend: function(xhr) {xhr.setRequestHeader('Authorization', 'Bearer ' + token);},
				data: JSON.stringify({
					"code": category.code,
					"name": category.name
				}),
				error: function(error) {

					AppDispatcher.dispatch({
						actionType: "ERROR",
						message: "Failed to create category."
					});
				}.bind(this),

				success: function (result) {

					AppDispatcher.dispatch({
						actionType: "CATEGORY_CREATE_COMPLETE",
						item: JSON.parse(result)
					});

					onSuccess();
				}
			}
		)
	},

	deleteCategory: function(token, id) {
		AppDispatcher.dispatch({
			actionType: "CATEGORY_DELETING",
			category_id: id
		});
		$.ajax(
			{
				url: "http://localhost:8080/rest/v1/categories/" + id,
				method: "DELETE",
				beforeSend: function(xhr) {xhr.setRequestHeader('Authorization', 'Bearer ' + token);},
				error: function(error) {

					AppDispatcher.dispatch({
						actionType: "ERROR",
						message: "Failed to delete category."
					});
				}.bind(this),

				success: function (result) {

					AppDispatcher.dispatch({
						actionType: "CATEGORY_DELETE_COMPLETE",
						category_id: id
					});
				}
			}
		)
	}
};
