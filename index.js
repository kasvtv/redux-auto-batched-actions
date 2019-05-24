var reduxBatchedActions = require("redux-batched-actions");

module.exports = reduxBatchedActions;

module.exports.autoBatchingMiddleware = function (store) {
	return function(next) {
		return function(action) {
			if (action instanceof Array) {
				return next(reduxBatchedActions.batchActions(
					action,
					action.map(function(x) {
						return x.type || x.name
					}).join(", ")
				));
			}

			return next(action);
		}
	}
}
