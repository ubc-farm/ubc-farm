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
	if (blank) return <td className="delete-button-col" />;

	return (
		<td className="delete-button-col">
			<button
				type="button"
				onClick={onDelete}
				className="delete"
				title="Delete"
			/>
		</td>
	)
}

export default DeleteButton;
