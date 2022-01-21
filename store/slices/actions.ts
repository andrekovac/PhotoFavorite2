import { createAction } from '@reduxjs/toolkit';

/**
 * action to reset data across all reducers
 */
export const reset = createAction('global/reset');
