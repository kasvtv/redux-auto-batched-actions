const batchActionsMockReturn = {};
jest.mock("redux-batched-actions", () => ({
	batchActions: jest.fn(x => x)
}));

const reduxAutoBatchedActions = require('./index');
const {autoBatchingMiddleware} = reduxAutoBatchedActions;
const reduxBatchedActions = require("redux-batched-actions");
const {batchActions} = reduxBatchedActions;

function newMocks() {
	const next = jest.fn();
	const process = autoBatchingMiddleware()(next);

	return {next, process};
}

describe('GIVEN the exported object', () => {
	it('THEN it contains all redux-batched-actions\' properties', () => {
		expect(reduxAutoBatchedActions).toEqual(expect.objectContaining(reduxBatchedActions));
	});
});

describe('GIVEN a store with autoBatchingMiddleware', () => {
	describe('WHEN a non-array action is passed', () => {
		const {next, process} = newMocks();
		const action = {type: 'testAction'};

		process(action);

		it('THEN next is called with the given action', () => {
			expect(next).toHaveBeenCalledTimes(1);
			expect(next).toHaveBeenCalledWith(action);
		})
	});

	describe('WHEN an array action is passed', () => {
		const {next, process} = newMocks();
		const action = [
			{type: 'testAction1'},
			{type: 'testAction2'},
			function testActionFunc(){}
		];

		process(action);

		it('THEN batchActions is called with said array and the result passed to next', () => {
			expect(next).toHaveBeenCalledTimes(1);
			expect(batchActions).toHaveBeenCalledTimes(1);
			expect(batchActions.mock.calls[0][0]).toBe(action);
			expect(batchActions.mock.calls[0][0]).toBe(next.mock.calls[0][0]);
		})

		it('THEN concatenate all actions names', () => {
			expect(batchActions.mock.calls[0][1]).toBe('testAction1, testAction2, testActionFunc');
		})
	});
});