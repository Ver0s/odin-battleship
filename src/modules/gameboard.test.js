import Gameboard from './gameboard';
import Ship from './ship';

describe('ship placement', () => {
	test('correctly places a single ship horizontally on a board', () => {
		const testGameboard = Gameboard(10, 10);
		const board = testGameboard.getBoard();
		const testShip = Ship(4);

		testGameboard.placeShip(testShip, 2, 1, false);

		expect(
			board[2][1].ship &&
				board[2][2].ship &&
				board[2][3].ship &&
				board[2][4].ship
		).toEqual(testShip);
	});

	test('correctly places a single ship vertically on a board', () => {
		const testGameboard = Gameboard(10, 10);
		const board = testGameboard.getBoard();
		const testShip = Ship(4);

		testGameboard.placeShip(testShip, 2, 1, true);

		expect(
			board[2][1].ship &&
				board[3][1].ship &&
				board[4][1].ship &&
				board[5][1].ship
		).toEqual(testShip);
	});

	test('correctly places more than one ship on a board', () => {
		const testGameboard = Gameboard(10, 10);
		const board = testGameboard.getBoard();
		const testShip1 = Ship(5);
		const testShip2 = Ship(4);
		const testShip3 = Ship(3);

		testGameboard.placeShip(testShip1, 2, 1, true);
		testGameboard.placeShip(testShip2, 9, 0, false);
		testGameboard.placeShip(testShip3, 1, 9, true);

		expect(
			board[2][1].ship &&
				board[3][1].ship &&
				board[4][1].ship &&
				board[5][1].ship &&
				board[6][1].ship
		).toEqual(testShip1);
		expect(
			board[9][0].ship &&
				board[9][1].ship &&
				board[9][2].ship &&
				board[9][3].ship
		).toEqual(testShip2);
		expect(
			board[1][9].ship && board[2][9].ship && board[3][9].ship
		).toEqual(testShip3);
	});

	test('ships cant overlap each other', () => {
		const testGameboard = Gameboard(10, 10);
		const board = testGameboard.getBoard();
		const testShip1 = Ship(4);
		const testShip2 = Ship(3);

		testGameboard.placeShip(testShip1, 2, 1, false);
		testGameboard.placeShip(testShip2, 1, 1, true);

		expect(testGameboard.placeShip(testShip2, 2, 1, false)).toBe(false);
		expect(
			board[2][1].ship &&
				board[2][2].ship &&
				board[2][3].ship &&
				board[2][4].ship
		).toEqual(testShip1);
		expect(board[1][1].ship && board[2][1] && board[3][1]).not.toEqual(
			testShip2
		);
	});

	test('ships cant overflow the board', () => {
		const testGameboard = Gameboard(10, 10);
		const testShip1 = Ship(4);

		expect(testGameboard.placeShip(testShip1, 0, 9, false)).toBe(false);
		expect(testGameboard.placeShip(testShip1, 1, 8, false)).toBe(false);
		expect(testGameboard.placeShip(testShip1, 8, 1, true)).toBe(false);
	});
});

describe('attacks', () => {
	test('board accepts a single attack on ship', () => {
		const testGameboard = Gameboard(10, 10);
		const board = testGameboard.getBoard();
		const testShip1 = Ship(4);
		const testShip2 = Ship(2);

		testGameboard.placeShip(testShip1, 2, 1, false);
		testGameboard.placeShip(testShip2, 4, 1, true);

		testGameboard.receiveAttack(2, 1);
		testGameboard.receiveAttack(4, 1);

		expect(board[2][1].isHit).toBe(true);
		expect(board[4][1].isHit).toBe(true);
	});

	test('doesnt allow attacking already hit position', () => {
		const testGameboard = Gameboard(10, 10);
		const board = testGameboard.getBoard();
		const testShip = Ship(4);

		testGameboard.placeShip(testShip, 2, 1, false);

		testGameboard.receiveAttack(2, 1);
		expect(board[2][1].isHit).toBe(true);
	});

	test('hitting all ship positions sinks it', () => {
		const testGameboard = Gameboard(10, 10);
		const board = testGameboard.getBoard();
		const testShip = Ship(4);

		testGameboard.placeShip(testShip, 2, 1, false);

		testGameboard.receiveAttack(2, 1);
		testGameboard.receiveAttack(2, 2);
		testGameboard.receiveAttack(2, 3);
		testGameboard.receiveAttack(2, 4);

		expect(
			board[2][1].isHit &&
				board[2][2].isHit &&
				board[2][3].isHit &&
				board[2][4].isHit
		).toBe(true);

		expect(testShip.isSunk()).toBe(true);
	});

	test('sinking all ships returns a proper boolean value indicator', () => {
		const testGameboard = Gameboard(10, 10);
		const board = testGameboard.getBoard();
		const testShip1 = Ship(4);
		const testShip2 = Ship(2);

		testGameboard.placeShip(testShip1, 2, 1, false);
		testGameboard.placeShip(testShip2, 7, 0, true);

		testGameboard.receiveAttack(2, 1);
		testGameboard.receiveAttack(2, 2);
		testGameboard.receiveAttack(2, 3);
		testGameboard.receiveAttack(2, 4);

		testGameboard.receiveAttack(7, 0);
		testGameboard.receiveAttack(8, 0);

		expect(
			board[2][1].isHit &&
				board[2][2].isHit &&
				board[2][3].isHit &&
				board[2][4].isHit
		).toBe(true);

		expect(board[7][0].isHit && board[8][0].isHit).toBe(true);
		expect(testGameboard.allShipsSunk()).toBe(true);
	});

	test('board accepts attacks on positions that are not ships', () => {
		const testGameboard = Gameboard(10, 10);
		const board = testGameboard.getBoard();

		testGameboard.receiveAttack(3, 1);
		testGameboard.receiveAttack(2, 1);
		testGameboard.receiveAttack(8, 8);
		testGameboard.receiveAttack(2, 8);

		expect(
			board[3][1].isHit &&
				board[2][1].isHit &&
				board[8][8].isHit &&
				board[2][8].isHit
		).toBe(true);
	});
});
