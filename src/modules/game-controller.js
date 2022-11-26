import Ship from './ship';
import Player from './player';
import UI from './ui';

const gameController = () => {
	const playerBoardElement = document.querySelector('.player-board');
	const computerBoardElement = document.querySelector('.computer-board');

	const interfaceManager = UI();
	interfaceManager.generateBoard(playerBoardElement);
	interfaceManager.generateBoard(computerBoardElement);

	const playerShips = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];
	const computerShips = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];

	const humanPlayer = Player('Arek');
	const computerPlayer = Player('AI');

	humanPlayer.getBoard().placeShip(playerShips[0], 2, 1, false);
	computerPlayer.getBoard().placeShip(computerShips[0], 2, 1, false);
	computerPlayer.getBoard().placeShip(computerShips[1], 9, 0, false);

	computerBoardElement.addEventListener('click', (e) => {
		const { target } = e;
		const coords = interfaceManager.getCellData(target);
		const [rowPos, colPos] = coords;

		if (target.matches('.cell')) {
		}
	});
};

export default gameController;
