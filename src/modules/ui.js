const UI = () => {
	// const createElement = (template) =>
	// 	document.createRange().createContextualFragment(template);

	const getCellData = (cell) =>
		cell.dataset.coords.split('').map((coordStr) => Number(coordStr));

	const generateBoard = (board) => {
		for (let i = 0; i < 100; i++) {
			const cell = document.createElement('div');
			cell.classList.add('cell');
			cell.dataset.coords = i < 10 ? `0${i}` : i;
			board.appendChild(cell);
		}
	};

	const highlightHit = (cell) => {
		cell.classList.add('hit');
	};

	const highlightMiss = (cell) => {
		cell.classList.add('miss');
	};

	return {
		generateBoard,
		getCellData,
		highlightHit,
		highlightMiss,
	};
};

export default UI;
