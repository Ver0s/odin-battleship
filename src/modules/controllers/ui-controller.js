import gameController from './game-controller';
import * as uiHelpers from './ui-helpers';

const UIController = () => {
	let isVertical = false;
	const game = gameController();

	const setupBoardContainerElement =
		document.querySelector('.setup-container');
	const setupBoardElement = document.querySelector('.setup-board');
	const playerBoardElement = document.querySelector('.player-board');
	const computerBoardElement = document.querySelector('.computer-board');
	const restartGameBtn = document.querySelector('#restart-game');

	const initInterface = () => {
		uiHelpers.generateBoard(setupBoardElement);
		uiHelpers.generateBoard(playerBoardElement);
		uiHelpers.generateBoard(computerBoardElement);
		uiHelpers.hideBoard(playerBoardElement);
		uiHelpers.hideBoard(computerBoardElement);
	};

	const showPlayerBoards = () => {
		uiHelpers.hideElement(setupBoardContainerElement);
		uiHelpers.hideBoard(playerBoardElement, false);
		uiHelpers.hideBoard(computerBoardElement, false);
		uiHelpers.showShips(game.getPlayer().getBoard(), playerBoardElement);
	};

	const handleCellClick = (event) => {
		const { target } = event;
		if (!target.matches('.cell')) return;

		const [rowPos, colPos] = uiHelpers.getCellCoords(target);
		game.playRound(rowPos, colPos);

		if (game.checkForWin()) {
			uiHelpers.showEndGameModal(game.getWinnerName());
		}
		uiHelpers.updateBoards(game.getPlayer(), game.getComputer());
	};

	const handleShipPlacement = (event) => {
		const { target } = event;
		if (!target.matches('.cell')) return;

		const [rowPos, colPos] = uiHelpers.getCellCoords(target);
		game.placeShips(rowPos, colPos, isVertical);
		uiHelpers.showShips(game.getPlayer().getBoard(), setupBoardElement);

		if (game.arePlayerShipsEmpty()) {
			showPlayerBoards();
		}
	};

	const handleRestartGame = () => {
		// Hide the player and computer boards
		uiHelpers.hideElement(playerBoardElement);
		uiHelpers.hideElement(computerBoardElement);

		// Hide the end game modal
		uiHelpers.hideEndGameModal();

		// Restart the game
		game.restartGame();

		// Show the setup board container
		uiHelpers.hideElement(setupBoardContainerElement, false);

		// Clear the setup, player, and computer boards
		uiHelpers.clearBoard(setupBoardElement);
		uiHelpers.clearBoard(playerBoardElement);
		uiHelpers.clearBoard(computerBoardElement);
	};

	const handleShipHover = (event) => {
		const { target } = event;
		if (!target.matches('.cell')) return;

		const [rowPos, colPos] = uiHelpers.getCellCoords(target);
		const isLegalPlacement = game
			.getPlayer()
			.getBoard()
			.isLegalPlacement(
				rowPos,
				colPos,
				game.getCurrentShip().getLength(),
				isVertical
			);

		uiHelpers.highlightShipHover(
			setupBoardElement,
			target,
			game.getCurrentShip().getLength(),
			isVertical,
			!isLegalPlacement
		);
	};

	const handleShipOut = () => uiHelpers.clearShipHover(setupBoardElement);

	window.addEventListener('keydown', (e) => {
		if (e.key === 'r') {
			isVertical = !isVertical;
		}
	});

	document
		.querySelector('#end-game-modal')
		.addEventListener('cancel', (e) => {
			e.preventDefault();
		});

	const setupBoardListener = () => {
		setupBoardElement.addEventListener('click', handleShipPlacement);
		setupBoardElement.addEventListener('mouseover', handleShipHover);
		setupBoardElement.addEventListener('mouseout', handleShipOut);
	};

	const computerBoardListener = () => {
		computerBoardElement.addEventListener('click', handleCellClick);
	};

	const restartGameListener = () => {
		restartGameBtn.addEventListener('click', handleRestartGame);
	};

	initInterface();
	setupBoardListener();
	computerBoardListener();
	restartGameListener();
};

export default UIController;
