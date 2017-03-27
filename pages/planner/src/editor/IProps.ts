import { EventHandler, ChangeEvent } from 'react';

export interface InputProps {
	bindInput: (name: string) => {
		name: string,
		value: any,
		onChange: EventHandler<ChangeEvent<any>>
	};
	disabled?: boolean;
}

export interface SelectProps extends InputProps {
	options: Map<string, string> | { [key: string]: string };
}
