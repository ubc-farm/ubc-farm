import { createElement, SFC } from 'react'; /** @jsx createElement */

interface DeleteButtonProps {
	onDelete?(e: React.MouseEvent<HTMLButtonElement>): void,
	blank?: boolean,
}

/**
 * Button to use in sale rows. When clicked, the row should be deleted from the
 * invoice sales.
 */
const DeleteButton: SFC<DeleteButtonProps> = ({ onDelete, blank }) => {
	return (
		<td className="delete-button-col">
			{blank
				? <button type="button" onClick={onDelete}>Delete</button>
				: null}
		</td>
	)
}

export default DeleteButton;
