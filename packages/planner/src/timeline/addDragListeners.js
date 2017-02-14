function handleDragOver(e) {
	e.preventDefault();
	e.dataTransfer.effectAllowed = 'all';
}

/**
 * Attaches drag listeners to provided Timeline
 * @param {vis.Timeline} Timeline
 * @param {function} newTask (Object) => void
 * @param {function} changeTaskType (id, string) => void
 * @returns {function} call to remove listeners
 */
export default function addDragListeners(timeline, newTask, changeTaskType) {
	const element = timeline.dom.center;

	/**
	 * Handles drop event from task types on timeline.
	 * If dropped in the timeline's blank area, a task of that type is added.
	 * If dropped ontop of an existing task, the task type is changed.
	 */
	function handleDrop(e) {
		e.preventDefault();
		const text = e.dataTransfer.getData('text/plain');
		const { what, group, snappedTime, item } = timeline.getEventProperties(e);

		switch (what) {
			case 'background':
				newTask({
					location: group,
					start: snappedTime.valueOf(),
					type: text,
				});
				break;

			case 'item':
				changeTaskType(item, text);
				break;
		}
	}

	element.addEventListener('dragover', handleDragOver);
	element.addEventListener('drop', handleDrop);

	return function removeDragListeners() {
		element.removeEventListener('dragover', handleDragOver);
		element.removeEventListener('drop', handleDrop);
	};
}
