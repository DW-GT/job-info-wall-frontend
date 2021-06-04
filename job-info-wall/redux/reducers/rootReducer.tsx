

export default function appReducer(state, action) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        // Do something here based on the different types of actions
        case 'changeId': {
            // We need to return a new state object
            state.state.typeId = action.typeId;
            return {
                state,
            };
        }
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            state.state.typId = -1;
            return state;
    }
}
