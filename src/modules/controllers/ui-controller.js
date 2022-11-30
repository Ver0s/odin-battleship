import gameController from './game-controller';
import * as uiHelpers from './ui-helpers';

const UIController = () => {
	let isVertical = false;
	const game = gameController();

	const setupBoardContainerElement =
		document.querySelector('.setup-container');
	const setupBoardElement = document.querySelector('.setup-board');
	uiHelpers.generateBoard(setupBoardElement);
	const playerBoardElement = document.querySelector('.player-board');
	const computerBoardElement = document.querySelector('.computer-board');

	const showPlayerBoards = () => {
		uiHelpers.hideElement(setupBoardContainerElement);
		uiHelpers.generateBoard(playerBoardElement);
		uiHelpers.generateBoard(computerBoardElement);
		uiHelpers.showShips(game.getPlayer().getBoard(), playerBoardElement);
	};

	const handleCellClick = (e) => {
		const { target } = e;

		if (target.matches('.cell')) {
			const [rowPos, colPos] = uiHelpers.getCellCoords(target);

			game.playRound(rowPos, colPos);
			uiHelpers.updateBoards(game.getPlayer(), game.getComputer());
		}
	};

	const handleShipPlacement = (e) => {
		const { target } = e;
		if (target.matches('.cell')) {
			const [rowPos, colPos] = uiHelpers.getCellCoords(target);
			game.placeShips(rowPos, colPos, isVertical);
			uiHelpers.showShips(game.getPlayer().getBoard(), setupBoardElement);

			if (game.arePlayerShipsEmpty()) showPlayerBoards();
		}
	};

	setupBoardElement.addEventListener('click', handleShipPlacement);

	setupBoardElement.addEventListener('mouseover', (e) => {
		const { target } = e;
		if (target.matches('.cell')) {
			const [rowPos, colPos] = uiHelpers.getCellCoords(target);
			if (
				!game
					.getPlayer()
					.getBoard()
					.isLegalPlacement(
						rowPos,
						colPos,
						game.getCurrentShip().getLength(),
						isVertical
					)
			) {
				uiHelpers.highlightShipHoverError(
					setupBoardElement,
					target,
					game.getCurrentShip().getLength(),
					isVertical
				);
				return;
			}

			uiHelpers.highlightShipHover(
				setupBoardElement,
				target,
				game.getCurrentShip().getLength(),
				isVertical
			);
		}
	});

	computerBoardElement.addEventListener('click', handleCellClick);

	setupBoardElement.addEventListener('mouseout', () => {
		uiHelpers.clearShipHover(setupBoardElement);
	});

	window.addEventListener('keydown', (e) => {
		if (e.key === 'r') {
			isVertical = !isVertical;
		}
	});
};

export default UIController;
