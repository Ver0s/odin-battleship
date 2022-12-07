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

export const highlightShipHover = (
	board,
	cell,
	shipLength,
	isVertical,
	isError = false
) => {
	const [rowPos, colPos] = getCellCoords(cell);
	const className = isError ? 'ship-hover-error' : 'ship-hover';

	if (isVertical) {
		for (let i = 0; i < shipLength; i++) {
			const element = getCellElement(board, rowPos + i, colPos);
			if (element) {
				element.classList.add(className);
			}
		}
	} else {
		for (let i = 0; i < shipLength; i++) {
			const element = getCellElement(board, rowPos, colPos + i);
			if (element) {
				element.classList.add(className);
			}
		}
	}
};

export const clearShipHover = (board) => {
	[...board.children].forEach((cell) => {
		cell.classList.remove('ship-hover');
		cell.classList.remove('ship-hover-error');
	});
};

export const clearBoard = (board) => {
	[...board.children].forEach((cell) => {
		cell.className = 'cell';
	});
};

export const updateBoards = (player, computer) => {
	const playerBoardElement = document.querySelector('.player-board');
	const computerBoardElement = document.querySelector('.computer-board');

	const updateBoard = (board, boardElement) => {
		[...boardElement.children].forEach((cell) => {
			const [rowPos, colPos] = getCellCoords(cell);
			const isHit = board.isPosHit(rowPos, colPos);
			const isShip = board.isPosShip(rowPos, colPos);

			if (isHit && isShip) {
				cell.classList.add('hit');
			} else if (isHit && !isShip) {
				cell.classList.add('miss');
			}
		});
	};

	updateBoard(player.getBoard(), playerBoardElement);
	updateBoard(computer.getBoard(), computerBoardElement);
};

export const showEndGameModal = (winner) => {
	const endGameModal = document.querySelector('#end-game-modal');
	const winnerName = document.querySelector('#winner');

	winnerName.textContent =
		winner === 'You' ? `${winner} win` : `${winner} wins`;
	endGameModal.showModal();
};

export const hideEndGameModal = () => {
	const endGameModal = document.querySelector('#end-game-modal');
	endGameModal.close();
};

export const hideElement = (el, hide = true) => {
	el.style.display = hide ? 'none' : 'block';
};

export const hideBoard = (el, hide = true) => {
	el.style.display = hide ? 'none' : 'grid';
};
