import Ship from '../factories/ship';
import Player from '../factories/player';
import * as uiHelpers from './ui-helpers';

const FLEET = {
	Carrier: 5,
	Battleship: 4,
	Destroyer: 3,
	Submarine: 3,
	PatrolBoat: 2,
};

const gameController = () => {
	const player = Player('Player');
	const computer = Player('Computer');
	const playerShips = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];

	const checkForWin = () =>
		player.getBoard().allShipsSunk() || computer.getBoard().allShipsSunk();

	const playRound = (rowPos, colPos) => {
		if (computer.getBoard().isPosHit(rowPos, colPos)) return;
		if (checkForWin()) return;

		player.attackPos(rowPos, colPos, computer.getBoard());

		if (!checkForWin()) {
			computer.autoAttackPos(player.getBoard());
		}
	};

	const placeShipsRandomly = () => {
		Object.values(FLEET).forEach((shipLength) => {
			const newShip = Ship(shipLength);

			while (true) {
				if (
					computer
						.getBoard()
						.placeShip(
							newShip,
							Math.floor(Math.random() * 10),
							Math.floor(Math.random() * 10),
							Math.random() < 0.5
						)
				)
					break;
			}
		});
	};
	placeShipsRandomly();

	// loop through fleet
	// foreach fleet item return its length
	// show place on grid on hover with proper length
	// onclick place ship in board
	// show ships
	const placeShips = (rowPos, colPos, isVertical) => {
		if (!playerShips.length) return;
		player
			.getBoard()
			.placeShip(playerShips.shift(), rowPos, colPos, isVertical);
	};

	const getPlayer = () => player;

	const getComputer = () => computer;

	const getCurrentShip = () => playerShips[0];

	return {
		playRound,
		getPlayer,
		getComputer,
		placeShips,
		getCurrentShip,
	};
};

export default gameController;
