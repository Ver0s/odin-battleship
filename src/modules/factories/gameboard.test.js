import Gameboard from './gameboard';
import Ship from './ship';

let testGameboard;
beforeEach(() => {
	testGameboard = Gameboard(10, 10);
});

afterEach(() => {
	testGameboard.resetBoard();
});

describe('ship placement', () => {
	test('correctly places a single ship horizontally on a board', () => {
		const testShip = Ship(4);

		expect(testGameboard.placeShip(testShip, 2, 1, false)).toBe(true);

		expect(testGameboard.isPosShip(2, 1)).toBeTruthy();
		expect(testGameboard.isPosShip(2, 2)).toBeTruthy();
		expect(testGameboard.isPosShip(2, 3)).toBeTruthy();
		expect(testGameboard.isPosShip(2, 4)).toBeTruthy();
	});

	test('correctly places a single ship vertically on a board', () => {
		const testShip = Ship(4);

		expect(testGameboard.placeShip(testShip, 3, 1, true)).toBe(true);

		expect(testGameboard.isPosShip(3, 1)).toBeTruthy();
		expect(testGameboard.isPosShip(4, 1)).toBeTruthy();
		expect(testGameboard.isPosShip(5, 1)).toBeTruthy();
		expect(testGameboard.isPosShip(6, 1)).toBeTruthy();
	});

	test('correctly places more than one ship on a board', () => {
		const testShip1 = Ship(5);
		const testShip2 = Ship(4);
		const testShip3 = Ship(3);

		expect(testGameboard.placeShip(testShip1, 2, 1, true)).toBe(true);
		expect(testGameboard.placeShip(testShip2, 9, 0, false)).toBe(true);
		expect(testGameboard.placeShip(testShip3, 1, 9, true)).toBe(true);

		expect(testGameboard.isPosShip(2, 1)).toBeTruthy();
		expect(testGameboard.isPosShip(3, 1)).toBeTruthy();
		expect(testGameboard.isPosShip(4, 1)).toBeTruthy();
		expect(testGameboard.isPosShip(5, 1)).toBeTruthy();

		expect(testGameboard.isPosShip(9, 0)).toBeTruthy();
		expect(testGameboard.isPosShip(9, 1)).toBeTruthy();
		expect(testGameboard.isPosShip(9, 2)).toBeTruthy();
		expect(testGameboard.isPosShip(9, 3)).toBeTruthy();

		expect(testGameboard.isPosShip(1, 9)).toBeTruthy();
		expect(testGameboard.isPosShip(2, 9)).toBeTruthy();
		expect(testGameboard.isPosShip(3, 9)).toBeTruthy();
	});

	test('ships cant overlap each other', () => {
		const testShip1 = Ship(4);
		const testShip2 = Ship(3);

		expect(testGameboard.placeShip(testShip1, 2, 1, false)).toBe(true);
		expect(testGameboard.placeShip(testShip2, 2, 0, false)).toBe(false);
	});

	test('ships cant overflow the board', () => {
		const testShip1 = Ship(4);

		expect(testGameboard.placeShip(testShip1, 0, 9, false)).toBe(false);
		expect(testGameboard.placeShip(testShip1, 1, 8, false)).toBe(false);
		expect(testGameboard.placeShip(testShip1, 8, 1, true)).toBe(false);
	});

	test('allShipsSunk returns false if there are no ships', () => {
		expect(testGameboard.allShipsSunk()).toBe(false);
	});

	test('allShipsSunk returns false if not all ships are sunk', () => {
		testGameboard.placeShip(Ship(5), 0, 0, true);
		testGameboard.placeShip(Ship(2), 2, 0, true);
		expect(testGameboard.allShipsSunk()).toBe(false);
	});

	test('allShipsSunk returns true if all ships are sunk', () => {
		// Place a ship on the board and sink it
		const testShip1 = Ship(5);
		const testShip2 = Ship(2);
		testGameboard.placeShip(testShip1, 0, 0, true);
		testGameboard.placeShip(testShip2, 2, 0, false);
		testShip1.hit();
		testShip1.hit();
		testShip1.hit();
		testShip1.hit();
		testShip1.hit();

		testShip2.hit();
		testShip2.hit();
		expect(testGameboard.allShipsSunk()).toBe(true);
	});

	test('isPosHit returns true for positions that have been hit', () => {
		testGameboard.placeShip(Ship(5), 0, 0, true);
		testGameboard.receiveAttack(0, 0);
		expect(testGameboard.isPosHit(0, 0)).toBe(true);
	});

	test('isPosShip returns true if the given position contains a ship, and false otherwise', () => {
		const testShip1 = Ship(4);
		testGameboard.placeShip(testShip1, 0, 0, false);

		expect(testGameboard.isPosShip(0, 0)).toBeTruthy();
		expect(testGameboard.isPosShip(1, 0)).toBeFalsy();
	});
});

describe('attacks', () => {
	test('receiveAttack updates the gameboard and ship status when a position is attacked', () => {
		// Place a ship on the board
		const testShip1 = Ship(4);
		testGameboard.placeShip(testShip1, 0, 0, false);

		// Attack a position on the board
		testGameboard.receiveAttack(0, 0);

		expect(testGameboard.isPosHit(0, 0)).toBe(true);
		expect(testShip1.isSunk()).toBe(false);

		// Attack the remaining positions of the ship
		testGameboard.receiveAttack(0, 1);
		testGameboard.receiveAttack(0, 2);
		testGameboard.receiveAttack(0, 3);

		expect(testGameboard.isPosHit(0, 1)).toBe(true);
		expect(testGameboard.isPosHit(0, 2)).toBe(true);
		expect(testGameboard.isPosHit(0, 3)).toBe(true);
		expect(testShip1.isSunk()).toBe(true);

		// Attack the same positions again
		testGameboard.receiveAttack(0, 0);
		testGameboard.receiveAttack(0, 1);
		testGameboard.receiveAttack(0, 2);
		testGameboard.receiveAttack(0, 3);

		expect(testGameboard.isPosHit(0, 0)).toBe(true);
		expect(testGameboard.isPosHit(0, 1)).toBe(true);
		expect(testGameboard.isPosHit(0, 2)).toBe(true);
		expect(testShip1.isSunk()).toBe(true);
	});

	test('isLegalPlacement returns true if a ship can be placed at the given position, and false otherwise', () => {
		expect(testGameboard.isLegalPlacement(0, 0, 2, false)).toBe(true);
		expect(testGameboard.isLegalPlacement(9, 7, 2, false)).toBe(true);
		expect(testGameboard.isLegalPlacement(1, 9, 4, false)).toBe(false);
		expect(testGameboard.isLegalPlacement(-1, 0, 5, false)).toBe(false);
		expect(testGameboard.isLegalPlacement(0, 10, 2, false)).toBe(false);
		expect(testGameboard.isLegalPlacement(9, 9, 2, true)).toBe(false);
		expect(testGameboard.isLegalPlacement(2, 1, 4, true)).toBe(true);
	});

	test('hitting all ship positions sinks it', () => {
		const testShip = Ship(4);

		testGameboard.placeShip(testShip, 2, 1, false);

		testGameboard.receiveAttack(2, 1);
		testGameboard.receiveAttack(2, 2);
		testGameboard.receiveAttack(2, 3);
		testGameboard.receiveAttack(2, 4);

		expect(testGameboard.isPosHit(2, 1)).toBe(true);
		expect(testGameboard.isPosHit(2, 2)).toBe(true);
		expect(testGameboard.isPosHit(2, 3)).toBe(true);
		expect(testGameboard.isPosHit(2, 4)).toBe(true);

		expect(testShip.isSunk()).toBe(true);
	});

	test('board accepts attacks on positions that are not ships', () => {
		testGameboard.receiveAttack(3, 1);
		testGameboard.receiveAttack(2, 1);
		testGameboard.receiveAttack(8, 8);
		testGameboard.receiveAttack(2, 8);

		expect(testGameboard.isPosHit(3, 1)).toBe(true);
		expect(testGameboard.isPosHit(2, 1)).toBe(true);
		expect(testGameboard.isPosHit(8, 8)).toBe(true);
		expect(testGameboard.isPosHit(2, 8)).toBe(true);
	});
});
