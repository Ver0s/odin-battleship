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

	const placeShips = (rowPos, colPos, isVertical) => {
		if (!playerShips.length) return;
		// REFACTOR THIS TO OPERATE ON THE END OF ARRAY AND NOT THE BEGGINING
		const newShip = playerShips.shift();

		if (!player.getBoard().placeShip(newShip, rowPos, colPos, isVertical)) {
			playerShips.unshift(newShip);
		}
	};

	const getPlayer = () => player;

	const getComputer = () => computer;

	const getCurrentShip = () => playerShips[0];

	const arePlayerShipsEmpty = () => playerShips.length === 0;

	return {
		playRound,
		getPlayer,
		getComputer,
		placeShips,
		getCurrentShip,
		arePlayerShipsEmpty,
	};
};

export default gameController;
