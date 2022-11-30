import Gameboard from './gameboard';

const Player = (name) => {
	const board = Gameboard(10, 10);

	const getName = () => name;

	const getBoard = () => board;

	const attackPos = (rowPos, colPos, enemyBoard) => {
		enemyBoard.receiveAttack(rowPos, colPos);
	};

	const autoAttackPos = (enemyBoard) => {
		const getRandomCoords = () => [
			Math.floor(Math.random() * 10),
			Math.floor(Math.random() * 10),
		];

		while (true) {
			const randomCoords = getRandomCoords();

			if (!enemyBoard.isPosHit(randomCoords[0], randomCoords[1])) {
				enemyBoard.receiveAttack(randomCoords[0], randomCoords[1]);
				break;
			}
		}
	};

	return {
		attackPos,
		getName,
		getBoard,
		autoAttackPos,
	};
};

export default Player;
