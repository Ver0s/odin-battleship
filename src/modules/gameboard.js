const Gameboard = (rowSize, colSize) => {
	const board = Array.from(Array(rowSize), () =>
		new Array(colSize).fill(false)
	);

	const getBoard = () => board;

	const isPosInBoard = (rowPos, colPos) =>
		rowPos >= 0 && rowPos < rowSize && colPos >= 0 && colPos < colSize;

	const isPosHit = (rowPos, colPos) => board[rowPos][colPos] === true;

	const isPosShip = (rowPos, colPos) =>
		typeof board[rowPos][colPos] === 'object';

	const receiveAttack = (rowPos, colPos) => {
		if (!isPosInBoard(rowPos, colPos) || isPosHit(rowPos, colPos))
			return false;

		if (typeof board[rowPos][colPos] === 'object') {
			board[rowPos][colPos].hit();

			if (board[rowPos][colPos].isSunk()) {
				console.log('ship sunk');
				// notify subscribers that all ships have been sunk
			}
		}
		board[rowPos][colPos] = true;
	};

	const generateShipPositions = (rowPos, colPos, shipLength, isVertical) => {
		const shipPositions = [];

		if (isVertical) {
			for (let i = 0; i < shipLength; i++) {
				shipPositions.push([rowPos + i, colPos]);
			}
		} else {
			for (let i = 0; i < shipLength; i++) {
				shipPositions.push([rowPos, colPos + i]);
			}
		}

		return shipPositions;
	};

	const isLegalPlacement = (rowPos, colPos, shipLength, isVertical) => {
		const shipPositions = generateShipPositions(
			rowPos,
			colPos,
			shipLength,
			isVertical
		);

		const allPositionsInBoard = shipPositions.every((pos) =>
			isPosInBoard(pos[0], pos[1])
		);
		if (!allPositionsInBoard) return false;

		const shipOverlap = shipPositions.some((pos) =>
			isPosShip(pos[0], pos[1])
		);

		return allPositionsInBoard && !shipOverlap;
	};

	const placeShip = (ship, rowPos, colPos, isVertical) => {
		if (!isLegalPlacement(rowPos, colPos, ship.getLength(), isVertical))
			return false;

		if (isVertical) {
			for (let i = 0; i < ship.getLength(); i++) {
				board[rowPos + i][colPos] = ship;
			}
		} else {
			for (let i = 0; i < ship.getLength(); i++) {
				board[rowPos][colPos + i] = ship;
			}
		}
	};

	return {
		getBoard,
		placeShip,
		receiveAttack,
	};
};

export default Gameboard;
