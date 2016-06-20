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

	createCategory: function(token, code, name, onSuccess) {

		$.ajax(
			{
				url: "http://localhost:8080/rest/v1/categories",
				method: "POST",
				contentType: "application/json",
				data: JSON.stringify({
					"code": code,
					"name": name
				}),
				error: function(error) {
					alert("ERROR");
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
				}
			}
		)
	}
};
