import * as types from '../constants/actionTypes';
import { Entry } from 'src/interfaces/entities';

// Adding currently waiting bubble to the whell
export const addEntryToTheWheel = () => ({
  type: types.ADD_ENTRY_TO_THE_WHEEL,
});

export const cleanNewEntry = () => ({
  type: types.CLEAN_NEW_ENTRY,
});

// When added a bubble the this action should be called first
export const initiateNewEntryAddition = (bubble: Entry) => ({
  type: types.ADD_NEW_ENTRY,
  bubble,
});

export const eraseEntries = () => ({
  type: types.ERASE_ENTRIES,
});

// Cleans the wheel reducer
export const adminEraseEntries = () => ({
  type: types.ADMIN_ERASE_ENTRIES,
});

export const deleteEntry = (id: string) => ({
  type: types.DELETE_ENTRY,
  id,
});

export const markFirstEntryAdded = () => ({
  type: types.FIRST_ENTRY_ADDED,
});

export const markDetailsOpenedFirstTime = () => ({
  type: types.DETAILS_OPENED_FIRST_TIME,
});

export const markPushedNewEntryFirstTime = () => ({
  type: types.PUSH_ENTRY_FIRST_TIME,
});
