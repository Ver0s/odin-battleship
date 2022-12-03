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

		let randomCoords = getRandomCoords();

		while (enemyBoard.isPosHit(randomCoords[0], randomCoords[1])) {
			randomCoords = getRandomCoords();
		}

		enemyBoard.receiveAttack(randomCoords[0], randomCoords[1]);
	};

	return {
		attackPos,
		getName,
		getBoard,
		autoAttackPos,
	};
};

export default Player;
