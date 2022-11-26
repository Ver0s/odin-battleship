const Gameboard = (rowSize, colSize) => {
	const initBoard = (rows, cols) => {
		const board = [];
		for (let i = 0; i < rows; i++) {
			board[i] = [];
			for (let j = 0; j < cols; j++) {
				board[i][j] = { ship: null, isHit: false };
			}
		}
		return board;
	};

	const board = initBoard(10, 10);
	const ships = [];

	const getBoard = () => board;

	const allShipsSunk = () => ships.every((ship) => ship.isSunk());

	const isPosInBoard = (rowPos, colPos) =>
		rowPos >= 0 && rowPos < rowSize && colPos >= 0 && colPos < colSize;

	const isPosHit = (rowPos, colPos) => board[rowPos][colPos] === true;

	const isPosShip = (rowPos, colPos) =>
		typeof board[rowPos][colPos] === 'object';

	const receiveAttack = (rowPos, colPos) => {
		if (!isPosInBoard(rowPos, colPos) || isPosHit(rowPos, colPos))
			return false;

		if (isPosShip(rowPos, colPos)) {
			board[rowPos][colPos].hit();
		}

		board[rowPos][colPos] = true;
		return true;
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

		ships.push(ship);
		return true;
	};

	return {
		getBoard,
		placeShip,
		receiveAttack,
		allShipsSunk,
	};
};

export default Gameboard;
