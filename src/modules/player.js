import Gameboard from './gameboard';

const Player = (name) => {
	const board = Gameboard(10, 10);

	const getName = () => name;

	const getBoard = () => board;

	const attackPos = (rowPos, colPos, enemyBoard) =>
		enemyBoard.receiveAttack(rowPos, colPos);

	return {
		attackPos,
		getName,
		getBoard,
	};
};

export default Player;
