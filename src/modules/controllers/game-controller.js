import Ship from '../factories/ship';
import Player from '../factories/player';

const FLEET = {
	Carrier: 5,
	Battleship: 4,
	Destroyer: 3,
	Submarine: 3,
	PatrolBoat: 2,
};

const gameController = () => {
	const player = Player('You');
	const computer = Player('Computer');
	let playerShips = Object.values(FLEET).map((length) => Ship(length));

	const checkForWin = () =>
		player.getBoard().allShipsSunk() || computer.getBoard().allShipsSunk();

	const getWinnerName = () =>
		player.getBoard().allShipsSunk()
			? computer.getName()
			: player.getName();

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

			let placed = false;
			while (!placed) {
				const rowPos = Math.floor(Math.random() * 10);
				const colPos = Math.floor(Math.random() * 10);
				const isVertical = Math.random() < 0.5;
				placed = computer
					.getBoard()
					.placeShip(newShip, rowPos, colPos, isVertical);
			}
		});
	};

	const placeShips = (rowPos, colPos, isVertical) => {
		if (!playerShips.length) return;
		const newShip = playerShips.shift();

		if (!player.getBoard().placeShip(newShip, rowPos, colPos, isVertical)) {
			playerShips.unshift(newShip);
		}
	};

	const restartGame = () => {
		player.getBoard().resetBoard();
		computer.getBoard().resetBoard();

		playerShips = Object.values(FLEET).map((length) => Ship(length));
		placeShipsRandomly();
	};

	const getPlayer = () => player;

	const getComputer = () => computer;

	const getCurrentShip = () => playerShips[0];

	const arePlayerShipsEmpty = () => playerShips.length === 0;

	placeShipsRandomly();

	return {
		playRound,
		getPlayer,
		getComputer,
		placeShips,
		getCurrentShip,
		arePlayerShipsEmpty,
		checkForWin,
		getWinnerName,
		restartGame,
	};
};

export default gameController;
