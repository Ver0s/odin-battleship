import Gameboard from './gameboard';
import Ship from './ship';

describe('board generation', () => {
	test('generates 10x10 board', () => {
		const desiredBoard = [
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
		];
		expect(Gameboard(10, 10).getBoard()).toEqual(desiredBoard);
	});
});

describe('ship placement', () => {
	test('correctly places a single ship horizontally on a board', () => {
		const testGameboard = Gameboard(10, 10);
		const board = testGameboard.getBoard();
		const testShip = Ship(4);

		testGameboard.placeShip(testShip, 2, 1, false);

		expect(
			board[2][1] && board[2][2] && board[2][3] && board[2][4]
		).toEqual(testShip);
	});

	test('correctly places a single ship vertically on a board', () => {
		const testGameboard = Gameboard(10, 10);
		const board = testGameboard.getBoard();
		const testShip = Ship(4);

		testGameboard.placeShip(testShip, 2, 1, true);

		expect(
			board[2][1] && board[3][1] && board[4][1] && board[5][1]
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
			board[2][1] &&
				board[3][1] &&
				board[4][1] &&
				board[5][1] &&
				board[6][1]
		).toEqual(testShip1);
		expect(
			board[9][0] && board[9][1] && board[9][2] && board[9][3]
		).toEqual(testShip2);
		expect(board[1][9] && board[2][9] && board[3][9]).toEqual(testShip3);
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
			board[2][1] && board[2][2] && board[2][3] && board[2][4]
		).toEqual(testShip1);
		expect(board[1][1] && board[3][1]).toBe(false);
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

		expect(board[2][1]).toBe(true);
		expect(board[4][1]).toBe(true);
	});

	test('doesnt allow attacking already hit position', () => {
		const testGameboard = Gameboard(10, 10);
		const board = testGameboard.getBoard();
		const testShip = Ship(4);

		testGameboard.placeShip(testShip, 2, 1, false);

		testGameboard.receiveAttack(2, 1);

		expect(board[2][1]).toBe(true);
		expect(testGameboard.receiveAttack(2, 1)).toBe(false);
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

		expect(board[2][1] && board[2][2] && board[2][3] && board[2][4]).toBe(
			true
		);

		expect(testShip.isSunk()).toBe(true);
	});

	test('board accepts attacks on positions that are not ships', () => {
		const testGameboard = Gameboard(10, 10);
		const board = testGameboard.getBoard();

		testGameboard.receiveAttack(3, 1);
		testGameboard.receiveAttack(2, 1);
		testGameboard.receiveAttack(8, 8);
		testGameboard.receiveAttack(2, 8);

		expect(board[3][1] && board[2][1] && board[8][8] && board[2][8]).toBe(
			true
		);
	});
});
