import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import selected, { IState as SelectorState } from './selected';
import editor, { IState as EditorState } from './editor';

export interface IState {
	editor: EditorState;
	selected: SelectorState;
}

export default createStore(
	combineReducers<IState>({
		selected,
		editor,
	}),
	devToolsEnhancer(),
);
