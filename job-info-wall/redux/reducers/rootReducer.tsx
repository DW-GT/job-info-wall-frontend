import typeIdReducer from './typeIdReducer';

const initialState = {typeId: -1};

export default function appReducer(state = initialState, action) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
      // Do something here based on the different types of actions
      case 'changeId': {
        // We need to return a new state object
            state.typeId = action.typeId;
        return {
          state
        }
      }
      default:
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return state
    }
  }
