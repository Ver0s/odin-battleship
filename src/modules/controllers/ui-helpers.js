export const getCellCoords = (cell) =>
	cell.dataset.coords.split('').map((coordStr) => Number(coordStr));

export const getCellElement = (board, rowPos, colPos) =>
	[...board.children].find(
		(cell) => cell.dataset.coords === `${rowPos}${colPos}`
	);

export const generateBoard = (boardElement) => {
	for (let i = 0; i < 100; i++) {
		const cell = document.createElement('div');
		cell.classList.add('cell');
		cell.dataset.coords = i < 10 ? `0${i}` : i;
		boardElement.appendChild(cell);
	}
};

export const showShips = (board, boardElement) => {
	[...boardElement.children].forEach((cell) => {
		const [rowPos, colPos] = getCellCoords(cell);

		if (board.isPosShip(rowPos, colPos)) {
			cell.classList.add('ship');
		}
	});
};

export const highlightShipHover = (board, cell, shipLength, isVertical) => {
	const [rowPos, colPos] = getCellCoords(cell);

	if (isVertical) {
		for (let i = 0; i < shipLength; i++) {
			getCellElement(board, rowPos + i, colPos).classList.add(
				'ship-hover'
			);
		}
	} else {
		for (let i = 0; i < shipLength; i++) {
			getCellElement(board, rowPos, colPos + i).classList.add(
				'ship-hover'
			);
		}
	}
};

export const highlightShipHoverError = (
	board,
	cell,
	shipLength,
	isVertical
) => {
	const [rowPos, colPos] = getCellCoords(cell);

	if (isVertical) {
		for (let i = 0; i < shipLength; i++) {
			getCellElement(board, rowPos + i, colPos)?.classList.add(
				'ship-hover-error'
			);
		}
	} else {
		for (let i = 0; i < shipLength; i++) {
			getCellElement(board, rowPos, colPos + i)?.classList.add(
				'ship-hover-error'
			);
		}
	}
};

export const clearShipHover = (board) => {
	[...board.children].forEach((cell) => {
		cell.classList.remove('ship-hover');
		cell.classList.remove('ship-hover-error');
	});
};

export const updateBoards = (player, computer) => {
	const playerBoardElement = document.querySelector('.player-board');
	const computerBoardElement = document.querySelector('.computer-board');

	[...playerBoardElement.children].forEach((cell) => {
		const [rowPos, colPos] = getCellCoords(cell);

		if (
			player.getBoard().isPosShip(rowPos, colPos) &&
			player.getBoard().isPosHit(rowPos, colPos)
		) {
			cell.classList.add('hit');
		}
		if (
			!player.getBoard().isPosShip(rowPos, colPos) &&
			player.getBoard().isPosHit(rowPos, colPos)
		) {
			cell.classList.add('miss');
		}
	});

	[...computerBoardElement.children].forEach((cell) => {
		const [rowPos, colPos] = getCellCoords(cell);

		if (
			computer.getBoard().isPosShip(rowPos, colPos) &&
			computer.getBoard().isPosHit(rowPos, colPos)
		) {
			cell.classList.add('hit');
		}
		if (
			!computer.getBoard().isPosShip(rowPos, colPos) &&
			computer.getBoard().isPosHit(rowPos, colPos)
		) {
			cell.classList.add('miss');
		}
	});
};

export const hideElement = (el) => {
	el.style.display = 'none';
};
