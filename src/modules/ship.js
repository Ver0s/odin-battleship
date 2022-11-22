const Ship = (length) => {
	let timesHit = 0;

	const hit = () => {
		timesHit += 1;
	};

	const isSunk = () => timesHit >= length;

	const getLength = () => length;

	return {
		hit,
		isSunk,
		getLength,
	};
};

export default Ship;
