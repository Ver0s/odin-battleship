const Gameboard = (rowSize, colSize) => {
	const initBoard = (rows, cols) =>
		[...Array(rows)].map(() =>
			[...Array(cols)].map(() => ({ ship: null, isHit: false }))
		);

	let board = initBoard(10, 10);

	let ships = [];

	const getBoard = () => board;

	const allShipsSunk = () =>
		ships.length === 0 ? false : ships.every((ship) => ship.isSunk());

	const isPosInBoard = (rowPos, colPos) =>
		rowPos >= 0 && rowPos < rowSize && colPos >= 0 && colPos < colSize;

	const isPosHit = (rowPos, colPos) => board[rowPos][colPos].isHit === true;

	const isPosShip = (rowPos, colPos) => board[rowPos][colPos].ship;

	const receiveAttack = (rowPos, colPos) => {
		if (!isPosInBoard(rowPos, colPos) || isPosHit(rowPos, colPos)) return;

		if (isPosShip(rowPos, colPos)) {
			board[rowPos][colPos].ship.hit();
		}

		board[rowPos][colPos].isHit = true;
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

		const allPositionsInBoard = shipPositions.every(([x, y]) =>
			isPosInBoard(x, y)
		);
		if (!allPositionsInBoard) return false;

		const shipOverlap = shipPositions.some(([x, y]) => isPosShip(x, y));

		return allPositionsInBoard && !shipOverlap;
	};

	const placeShip = (ship, rowPos, colPos, isVertical) => {
		if (!isLegalPlacement(rowPos, colPos, ship.getLength(), isVertical))
			return false;

		if (isVertical) {
			for (let i = 0; i < ship.getLength(); i++) {
				board[rowPos + i][colPos].ship = ship;
			}
		} else {
			for (let i = 0; i < ship.getLength(); i++) {
				board[rowPos][colPos + i].ship = ship;
			}
		}

		ships.push(ship);
		return true;
	};

	const resetBoard = () => {
		board = initBoard(10, 10);
		ships = [];
	};

	return {
		getBoard,
		placeShip,
		receiveAttack,
		allShipsSunk,
		isPosShip,
		isPosHit,
		isLegalPlacement,
		resetBoard,
	};
};

export default Gameboard;
