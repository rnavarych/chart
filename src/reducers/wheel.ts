import { AnyAction } from 'redux';
import * as types from '../constants/actionTypes';
import { Entry } from 'src/interfaces/entities';

import { compareTime } from '../utils/dates';

interface State {
  newEntries: Entry[] | [];
  entries: Entry[];
  addedEntryFirstTime: boolean;
  pushedNewEntryToTheWheel: boolean;
  openedDetailsFirstTime: boolean;
}

let initialState = {
  newEntries: [],
  entries: [],
  addedEntryFirstTime: false,
  pushedNewEntryToTheWheel: false,
  openedDetailsFirstTime: false,
};

const wheel = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.ADD_NEW_ENTRY: {
      if (!action.bubble)
        throw Error(`Trying to add a bubble while it is ${action.bubble}`);
      return {
        ...state,
        newEntries: [action.bubble, ...state.newEntries],
      };
    }
    case types.ADD_ENTRY_TO_THE_WHEEL: {
      if (!state.newEntries[0])
        throw Error(`Trying to add a bubble while newBubble is ${state.newEntries[0]}`);
      const entries = [...state.entries, state.newEntries[0]]; // compareTime
      return {
        ...state,
        entries,
      };
    }
    case types.ADMIN_ERASE_ENTRIES: {
      return initialState;
    }
    case types.ERASE_ENTRIES: {
      return {
        ...state,
        newEntries: [],
        entries: [],
      };
    }
    case types.CLEAN_NEW_ENTRY: {
      return {
        ...state,
        newEntries: state.newEntries.slice(1),
      };
    }
    case types.DELETE_ENTRY: {
      return {
        ...state,
        entries: state.entries.filter((entry: Entry) => entry.id !== action.id),
      };
    }
    case types.FIRST_ENTRY_ADDED: {
      return {
        ...state,
        addedEntryFirstTime: true,
      };
    }
    case types.DETAILS_OPENED_FIRST_TIME: {
      return {
        ...state,
        openedDetailsFirstTime: true,
      };
    }
    case types.PUSH_ENTRY_FIRST_TIME: {
      return {
        ...state,
        pushedNewEntryToTheWheel: true,
      };
    }
    default:
      return state;
  }
};

export default wheel;
