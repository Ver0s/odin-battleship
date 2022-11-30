import gameController from './game-controller';
import * as uiHelpers from './ui-helpers';

const UIController = () => {
	let shipOrientation = false;
	const game = gameController();
	const setupBoardElement = document.querySelector('.setup-board');
	uiHelpers.generateBoard(setupBoardElement);
	// const playerBoardElement = document.querySelector('.player-board');
	// const computerBoardElement = document.querySelector('.computer-board');

	// uiHelpers.generateBoard(playerBoardElement);
	// uiHelpers.generateBoard(computerBoardElement);
	// uiHelpers.showShips(game.getPlayer().getBoard(), playerBoardElement);

	// const handleCellClick = (e) => {
	// 	const { target } = e;

	// 	if (target.matches('.cell')) {
	// const [rowPos, colPos] = uiHelpers.getCellCoords(target);

	// 		game.playRound(rowPos, colPos);
	// 		uiHelpers.updateBoards(game.getPlayer(), game.getComputer());
	// 	}
	// };

	// const showEndGameModal = () => {
	// 	console.log('end game modal');
	// };

	// const attachEventListeners = () => {};

	// const showShipPlacementScreen = () => {};

	// computerBoardElement.addEventListener('click', handleCellClick);
	const handleShipPlacement = (e) => {
		const { target } = e;
		if (target.matches('.cell')) {
			const [rowPos, colPos] = uiHelpers.getCellCoords(target);

			game.placeShips(rowPos, colPos, shipOrientation);
			uiHelpers.showShips(game.getPlayer().getBoard(), setupBoardElement);
		}
	};

	setupBoardElement.addEventListener('click', handleShipPlacement);
	setupBoardElement.addEventListener('mouseover', (e) => {
		const { target } = e;
		if (target.matches('.cell')) {
			uiHelpers.highlightShipHover(
				setupBoardElement,
				target,
				game.getCurrentShip().getLength(),
				shipOrientation
			);
		}
	});
	setupBoardElement.addEventListener('mouseout', () => {
		uiHelpers.clearShipHover(setupBoardElement);
	});

	window.addEventListener('keydown', (e) => {
		if (e.key === 'r') {
			shipOrientation = !shipOrientation;
		}
	});
};

export default UIController;
