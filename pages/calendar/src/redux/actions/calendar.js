import { createAction } from 'redux-actions';

export const CHANGE_VIEW = 'calendar/calendar/CHANGE_VIEW';
export const BACK_DATE = 'calendar/calendar/BACK_DATE';
export const NEXT_DATE = 'calendar/calendar/NEXT_DATE';
export const GO_TO_TODAY = 'calendar/calendar/GO_TO_TODAY';
export const GO_TO_DATE = 'calendar/calendar/GO_TO_DATE';


export const changeView = createAction(CHANGE_VIEW);
export const backDate = createAction(BACK_DATE);
export const nextDate = createAction(NEXT_DATE);
export const goToToday = createAction(GO_TO_TODAY);
export const goToDate = createAction(GO_TO_DATE);
