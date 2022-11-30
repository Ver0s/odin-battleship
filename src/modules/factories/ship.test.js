import Ship from './ship';

test('ship is properly created with its length', () => {
	expect(Ship(4).getLength()).toBe(4);
});

test('number of hits less than length dont sink ship', () => {
	const testShip = Ship(4);
	testShip.hit();
	testShip.hit();
	testShip.hit();
	expect(testShip.isSunk()).toBe(false);
});

test('number of hits greater or equal to length sink ship', () => {
	const testShip = Ship(4);
	testShip.hit();
	testShip.hit();
	testShip.hit();
	testShip.hit();
	testShip.hit();
	expect(testShip.isSunk()).toBe(true);
});
