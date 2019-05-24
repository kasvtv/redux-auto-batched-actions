const {createStore, applyMiddleware} = require('redux');
const { autoBatchingMiddleware, enableBatching, batchActions } = require('.');

function newMocks() {
	const setA = payload => ({type: 'SET_A', payload});
	const setB = payload => ({type: 'SET_B', payload});
	
	const reducer = (state={a:0, b:0}, action) => {
		switch (action.type) {
			case 'SET_A': return {...state, a: action.payload}
			case 'SET_B': return {...state, b: action.payload}
			default: return state
		}
	}
	
	// Handle bundled actions in reducer
	const store = createStore(
		enableBatching(reducer),
		applyMiddleware(autoBatchingMiddleware)
	);

	return {store, reducer, setA, setB};
}

describe('GIVEN a store with autoBatchingMiddleware and enableBatching', () => {

	it('SHOULD call things correctly separately', () => {
		const {store, reducer, setA, setB} = newMocks();

		store.dispatch(setA(1));
		store.dispatch(setA(2));
		store.dispatch(setB(5));

		expect(store.getState()).toEqual({a: 2, b: 5});
	});
	
	it('SHOULD call things correctly using batchActions', () => {
		const {store, reducer, setA, setB} = newMocks();

		store.dispatch(batchActions([setA(1), setA(2), setB(5)]));

		expect(store.getState()).toEqual({a: 2, b: 5});
	});

	it('SHOULD call things correctly using just an array', () => {
		const {store, reducer, setA, setB} = newMocks();

		store.dispatch([setA(1), setA(2), setB(5)]);

		expect(store.getState()).toEqual({a: 2, b: 5});
	});
});