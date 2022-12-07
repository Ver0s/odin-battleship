/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/controllers/game-controller.js":
/*!****************************************************!*\
  !*** ./src/modules/controllers/game-controller.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _factories_ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/ship */ "./src/modules/factories/ship.js");
/* harmony import */ var _factories_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../factories/player */ "./src/modules/factories/player.js");


var FLEET = {
  Carrier: 5,
  Battleship: 4,
  Destroyer: 3,
  Submarine: 3,
  PatrolBoat: 2
};
var gameController = function gameController() {
  var player = (0,_factories_player__WEBPACK_IMPORTED_MODULE_1__["default"])('You');
  var computer = (0,_factories_player__WEBPACK_IMPORTED_MODULE_1__["default"])('Computer');
  var playerShips = Object.values(FLEET).map(function (length) {
    return (0,_factories_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(length);
  });
  var checkForWin = function checkForWin() {
    return player.getBoard().allShipsSunk() || computer.getBoard().allShipsSunk();
  };
  var getWinnerName = function getWinnerName() {
    return player.getBoard().allShipsSunk() ? computer.getName() : player.getName();
  };
  var playRound = function playRound(rowPos, colPos) {
    if (computer.getBoard().isPosHit(rowPos, colPos)) return;
    if (checkForWin()) return;
    player.attackPos(rowPos, colPos, computer.getBoard());
    if (!checkForWin()) {
      computer.autoAttackPos(player.getBoard());
    }
  };
  var placeShipsRandomly = function placeShipsRandomly() {
    Object.values(FLEET).forEach(function (shipLength) {
      var newShip = (0,_factories_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(shipLength);
      var placed = false;
      while (!placed) {
        var rowPos = Math.floor(Math.random() * 10);
        var colPos = Math.floor(Math.random() * 10);
        var isVertical = Math.random() < 0.5;
        placed = computer.getBoard().placeShip(newShip, rowPos, colPos, isVertical);
      }
    });
  };
  var placeShips = function placeShips(rowPos, colPos, isVertical) {
    if (!playerShips.length) return;
    var newShip = playerShips.shift();
    if (!player.getBoard().placeShip(newShip, rowPos, colPos, isVertical)) {
      playerShips.unshift(newShip);
    }
  };
  var restartGame = function restartGame() {
    player.getBoard().resetBoard();
    computer.getBoard().resetBoard();
    playerShips = Object.values(FLEET).map(function (length) {
      return (0,_factories_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(length);
    });
    placeShipsRandomly();
  };
  var getPlayer = function getPlayer() {
    return player;
  };
  var getComputer = function getComputer() {
    return computer;
  };
  var getCurrentShip = function getCurrentShip() {
    return playerShips[0];
  };
  var arePlayerShipsEmpty = function arePlayerShipsEmpty() {
    return playerShips.length === 0;
  };
  placeShipsRandomly();
  return {
    playRound: playRound,
    getPlayer: getPlayer,
    getComputer: getComputer,
    placeShips: placeShips,
    getCurrentShip: getCurrentShip,
    arePlayerShipsEmpty: arePlayerShipsEmpty,
    checkForWin: checkForWin,
    getWinnerName: getWinnerName,
    restartGame: restartGame
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameController);

/***/ }),

/***/ "./src/modules/controllers/ui-controller.js":
/*!**************************************************!*\
  !*** ./src/modules/controllers/ui-controller.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _game_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-controller */ "./src/modules/controllers/game-controller.js");
/* harmony import */ var _ui_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui-helpers */ "./src/modules/controllers/ui-helpers.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var UIController = function UIController() {
  var isVertical = false;
  var game = (0,_game_controller__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var setupBoardContainerElement = document.querySelector('.setup-container');
  var setupBoardElement = document.querySelector('.setup-board');
  var playerBoardElement = document.querySelector('.player-board');
  var computerBoardElement = document.querySelector('.computer-board');
  var restartGameBtn = document.querySelector('#restart-game');
  var initInterface = function initInterface() {
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.generateBoard(setupBoardElement);
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.generateBoard(playerBoardElement);
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.generateBoard(computerBoardElement);
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.hideBoard(playerBoardElement);
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.hideBoard(computerBoardElement);
  };
  var showPlayerBoards = function showPlayerBoards() {
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.hideElement(setupBoardContainerElement);
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.hideBoard(playerBoardElement, false);
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.hideBoard(computerBoardElement, false);
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.showShips(game.getPlayer().getBoard(), playerBoardElement);
  };
  var handleCellClick = function handleCellClick(event) {
    var target = event.target;
    if (!target.matches('.cell')) return;
    var _uiHelpers$getCellCoo = _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.getCellCoords(target),
      _uiHelpers$getCellCoo2 = _slicedToArray(_uiHelpers$getCellCoo, 2),
      rowPos = _uiHelpers$getCellCoo2[0],
      colPos = _uiHelpers$getCellCoo2[1];
    game.playRound(rowPos, colPos);
    if (game.checkForWin()) {
      _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.showEndGameModal(game.getWinnerName());
    }
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.updateBoards(game.getPlayer(), game.getComputer());
  };
  var handleShipPlacement = function handleShipPlacement(event) {
    var target = event.target;
    if (!target.matches('.cell')) return;
    var _uiHelpers$getCellCoo3 = _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.getCellCoords(target),
      _uiHelpers$getCellCoo4 = _slicedToArray(_uiHelpers$getCellCoo3, 2),
      rowPos = _uiHelpers$getCellCoo4[0],
      colPos = _uiHelpers$getCellCoo4[1];
    game.placeShips(rowPos, colPos, isVertical);
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.showShips(game.getPlayer().getBoard(), setupBoardElement);
    if (game.arePlayerShipsEmpty()) {
      showPlayerBoards();
    }
  };
  var handleRestartGame = function handleRestartGame() {
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.hideElement(playerBoardElement);
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.hideElement(computerBoardElement);
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.hideEndGameModal();
    game.restartGame();
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.hideElement(setupBoardContainerElement, false);
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.clearBoard(setupBoardElement);
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.clearBoard(playerBoardElement);
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.clearBoard(computerBoardElement);
  };
  var handleShipHover = function handleShipHover(event) {
    var target = event.target;
    if (!target.matches('.cell')) return;
    var _uiHelpers$getCellCoo5 = _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.getCellCoords(target),
      _uiHelpers$getCellCoo6 = _slicedToArray(_uiHelpers$getCellCoo5, 2),
      rowPos = _uiHelpers$getCellCoo6[0],
      colPos = _uiHelpers$getCellCoo6[1];
    var isLegalPlacement = game.getPlayer().getBoard().isLegalPlacement(rowPos, colPos, game.getCurrentShip().getLength(), isVertical);
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.highlightShipHover(setupBoardElement, target, game.getCurrentShip().getLength(), isVertical, !isLegalPlacement);
  };
  var handleShipOut = function handleShipOut() {
    return _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.clearShipHover(setupBoardElement);
  };
  window.addEventListener('keydown', function (e) {
    if (e.key === 'r') {
      isVertical = !isVertical;
    }
  });
  document.querySelector('#end-game-modal').addEventListener('cancel', function (e) {
    e.preventDefault();
  });
  var setupBoardListener = function setupBoardListener() {
    setupBoardElement.addEventListener('click', handleShipPlacement);
    setupBoardElement.addEventListener('mouseover', handleShipHover);
    setupBoardElement.addEventListener('mouseout', handleShipOut);
  };
  var computerBoardListener = function computerBoardListener() {
    computerBoardElement.addEventListener('click', handleCellClick);
  };
  var restartGameListener = function restartGameListener() {
    restartGameBtn.addEventListener('click', handleRestartGame);
  };
  initInterface();
  setupBoardListener();
  computerBoardListener();
  restartGameListener();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UIController);

/***/ }),

/***/ "./src/modules/controllers/ui-helpers.js":
/*!***********************************************!*\
  !*** ./src/modules/controllers/ui-helpers.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearBoard": () => (/* binding */ clearBoard),
/* harmony export */   "clearShipHover": () => (/* binding */ clearShipHover),
/* harmony export */   "generateBoard": () => (/* binding */ generateBoard),
/* harmony export */   "getCellCoords": () => (/* binding */ getCellCoords),
/* harmony export */   "getCellElement": () => (/* binding */ getCellElement),
/* harmony export */   "hideBoard": () => (/* binding */ hideBoard),
/* harmony export */   "hideElement": () => (/* binding */ hideElement),
/* harmony export */   "hideEndGameModal": () => (/* binding */ hideEndGameModal),
/* harmony export */   "highlightShipHover": () => (/* binding */ highlightShipHover),
/* harmony export */   "showEndGameModal": () => (/* binding */ showEndGameModal),
/* harmony export */   "showShips": () => (/* binding */ showShips),
/* harmony export */   "updateBoards": () => (/* binding */ updateBoards)
/* harmony export */ });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var getCellCoords = function getCellCoords(cell) {
  return cell.dataset.coords.split('').map(function (coordStr) {
    return Number(coordStr);
  });
};
var getCellElement = function getCellElement(board, rowPos, colPos) {
  return _toConsumableArray(board.children).find(function (cell) {
    return cell.dataset.coords === "".concat(rowPos).concat(colPos);
  });
};
var generateBoard = function generateBoard(boardElement) {
  for (var i = 0; i < 100; i++) {
    var cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.coords = i < 10 ? "0".concat(i) : i;
    boardElement.appendChild(cell);
  }
};
var showShips = function showShips(board, boardElement) {
  _toConsumableArray(boardElement.children).forEach(function (cell) {
    var _getCellCoords = getCellCoords(cell),
      _getCellCoords2 = _slicedToArray(_getCellCoords, 2),
      rowPos = _getCellCoords2[0],
      colPos = _getCellCoords2[1];
    if (board.isPosShip(rowPos, colPos)) {
      cell.classList.add('ship');
    }
  });
};
var highlightShipHover = function highlightShipHover(board, cell, shipLength, isVertical) {
  var isError = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var _getCellCoords3 = getCellCoords(cell),
    _getCellCoords4 = _slicedToArray(_getCellCoords3, 2),
    rowPos = _getCellCoords4[0],
    colPos = _getCellCoords4[1];
  var className = isError ? 'ship-hover-error' : 'ship-hover';
  if (isVertical) {
    for (var i = 0; i < shipLength; i++) {
      var element = getCellElement(board, rowPos + i, colPos);
      if (element) {
        element.classList.add(className);
      }
    }
  } else {
    for (var _i2 = 0; _i2 < shipLength; _i2++) {
      var _element = getCellElement(board, rowPos, colPos + _i2);
      if (_element) {
        _element.classList.add(className);
      }
    }
  }
};
var clearShipHover = function clearShipHover(board) {
  _toConsumableArray(board.children).forEach(function (cell) {
    cell.classList.remove('ship-hover');
    cell.classList.remove('ship-hover-error');
  });
};
var clearBoard = function clearBoard(board) {
  _toConsumableArray(board.children).forEach(function (cell) {
    cell.className = 'cell';
  });
};
var updateBoards = function updateBoards(player, computer) {
  var playerBoardElement = document.querySelector('.player-board');
  var computerBoardElement = document.querySelector('.computer-board');
  var updateBoard = function updateBoard(board, boardElement) {
    _toConsumableArray(boardElement.children).forEach(function (cell) {
      var _getCellCoords5 = getCellCoords(cell),
        _getCellCoords6 = _slicedToArray(_getCellCoords5, 2),
        rowPos = _getCellCoords6[0],
        colPos = _getCellCoords6[1];
      var isHit = board.isPosHit(rowPos, colPos);
      var isShip = board.isPosShip(rowPos, colPos);
      if (isHit && isShip) {
        cell.classList.add('hit');
      } else if (isHit && !isShip) {
        cell.classList.add('miss');
      }
    });
  };
  updateBoard(player.getBoard(), playerBoardElement);
  updateBoard(computer.getBoard(), computerBoardElement);
};
var showEndGameModal = function showEndGameModal(winner) {
  var endGameModal = document.querySelector('#end-game-modal');
  var winnerName = document.querySelector('#winner');
  winnerName.textContent = winner === 'You' ? "".concat(winner, " win") : "".concat(winner, " wins");
  endGameModal.showModal();
};
var hideEndGameModal = function hideEndGameModal() {
  var endGameModal = document.querySelector('#end-game-modal');
  endGameModal.close();
};
var hideElement = function hideElement(el) {
  var hide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  el.style.display = hide ? 'none' : 'block';
};
var hideBoard = function hideBoard(el) {
  var hide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  el.style.display = hide ? 'none' : 'grid';
};

/***/ }),

/***/ "./src/modules/factories/gameboard.js":
/*!********************************************!*\
  !*** ./src/modules/factories/gameboard.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var Gameboard = function Gameboard(rowSize, colSize) {
  var initBoard = function initBoard(rows, cols) {
    return _toConsumableArray(Array(rows)).map(function () {
      return _toConsumableArray(Array(cols)).map(function () {
        return {
          ship: null,
          isHit: false
        };
      });
    });
  };
  var board = initBoard(10, 10);
  var ships = [];
  var getBoard = function getBoard() {
    return board;
  };
  var allShipsSunk = function allShipsSunk() {
    return ships.length === 0 ? false : ships.every(function (ship) {
      return ship.isSunk();
    });
  };
  var isPosInBoard = function isPosInBoard(rowPos, colPos) {
    return rowPos >= 0 && rowPos < rowSize && colPos >= 0 && colPos < colSize;
  };
  var isPosHit = function isPosHit(rowPos, colPos) {
    return board[rowPos][colPos].isHit === true;
  };
  var isPosShip = function isPosShip(rowPos, colPos) {
    return board[rowPos][colPos].ship;
  };
  var receiveAttack = function receiveAttack(rowPos, colPos) {
    if (!isPosInBoard(rowPos, colPos) || isPosHit(rowPos, colPos)) return;
    if (isPosShip(rowPos, colPos)) {
      board[rowPos][colPos].ship.hit();
    }
    board[rowPos][colPos].isHit = true;
  };
  var generateShipPositions = function generateShipPositions(rowPos, colPos, shipLength, isVertical) {
    var shipPositions = [];
    if (isVertical) {
      for (var i = 0; i < shipLength; i++) {
        shipPositions.push([rowPos + i, colPos]);
      }
    } else {
      for (var _i = 0; _i < shipLength; _i++) {
        shipPositions.push([rowPos, colPos + _i]);
      }
    }
    return shipPositions;
  };
  var isLegalPlacement = function isLegalPlacement(rowPos, colPos, shipLength, isVertical) {
    var shipPositions = generateShipPositions(rowPos, colPos, shipLength, isVertical);
    var allPositionsInBoard = shipPositions.every(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        x = _ref2[0],
        y = _ref2[1];
      return isPosInBoard(x, y);
    });
    if (!allPositionsInBoard) return false;
    var shipOverlap = shipPositions.some(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        x = _ref4[0],
        y = _ref4[1];
      return isPosShip(x, y);
    });
    return allPositionsInBoard && !shipOverlap;
  };
  var placeShip = function placeShip(ship, rowPos, colPos, isVertical) {
    if (!isLegalPlacement(rowPos, colPos, ship.getLength(), isVertical)) return false;
    if (isVertical) {
      for (var i = 0; i < ship.getLength(); i++) {
        board[rowPos + i][colPos].ship = ship;
      }
    } else {
      for (var _i2 = 0; _i2 < ship.getLength(); _i2++) {
        board[rowPos][colPos + _i2].ship = ship;
      }
    }
    ships.push(ship);
    return true;
  };
  var resetBoard = function resetBoard() {
    board = initBoard(10, 10);
    ships = [];
  };
  return {
    getBoard: getBoard,
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    allShipsSunk: allShipsSunk,
    isPosShip: isPosShip,
    isPosHit: isPosHit,
    isLegalPlacement: isLegalPlacement,
    resetBoard: resetBoard
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/modules/factories/player.js":
/*!*****************************************!*\
  !*** ./src/modules/factories/player.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/modules/factories/gameboard.js");

var Player = function Player(name) {
  var board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])(10, 10);
  var getName = function getName() {
    return name;
  };
  var getBoard = function getBoard() {
    return board;
  };
  var attackPos = function attackPos(rowPos, colPos, enemyBoard) {
    enemyBoard.receiveAttack(rowPos, colPos);
  };
  var autoAttackPos = function autoAttackPos(enemyBoard) {
    var getRandomCoords = function getRandomCoords() {
      return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    };
    var randomCoords = getRandomCoords();
    while (enemyBoard.isPosHit(randomCoords[0], randomCoords[1])) {
      randomCoords = getRandomCoords();
    }
    enemyBoard.receiveAttack(randomCoords[0], randomCoords[1]);
  };
  return {
    attackPos: attackPos,
    getName: getName,
    getBoard: getBoard,
    autoAttackPos: autoAttackPos
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/modules/factories/ship.js":
/*!***************************************!*\
  !*** ./src/modules/factories/ship.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Ship = function Ship(length) {
  var timesHit = 0;
  var hit = function hit() {
    timesHit += 1;
  };
  var isSunk = function isSunk() {
    return timesHit >= length;
  };
  var getLength = function getLength() {
    return length;
  };
  return {
    hit: hit,
    isSunk: isSunk,
    getLength: getLength
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/reset.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/reset.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* https://www.joshwcomeau.com/css/custom-css-reset/ */\n*,\n*::before,\n*::after {\n\tbox-sizing: border-box;\n}\n*:not(dialog) {\n\tmargin: 0;\n\tpadding: 0;\n}\nhtml,\nbody {\n\theight: 100%;\n}\nbody {\n\tline-height: 1.5;\n\t-webkit-font-smoothing: antialiased;\n}\nimg,\npicture,\nvideo,\ncanvas,\nsvg {\n\tdisplay: block;\n\tmax-width: 100%;\n}\ninput,\nbutton,\ntextarea,\nselect {\n\tfont: inherit;\n}\np,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n\toverflow-wrap: break-word;\n}\n", "",{"version":3,"sources":["webpack://./src/styles/reset.css"],"names":[],"mappings":"AAAA,sDAAsD;AACtD;;;CAGC,sBAAsB;AACvB;AACA;CACC,SAAS;CACT,UAAU;AACX;AACA;;CAEC,YAAY;AACb;AACA;CACC,gBAAgB;CAChB,mCAAmC;AACpC;AACA;;;;;CAKC,cAAc;CACd,eAAe;AAChB;AACA;;;;CAIC,aAAa;AACd;AACA;;;;;;;CAOC,yBAAyB;AAC1B","sourcesContent":["/* https://www.joshwcomeau.com/css/custom-css-reset/ */\n*,\n*::before,\n*::after {\n\tbox-sizing: border-box;\n}\n*:not(dialog) {\n\tmargin: 0;\n\tpadding: 0;\n}\nhtml,\nbody {\n\theight: 100%;\n}\nbody {\n\tline-height: 1.5;\n\t-webkit-font-smoothing: antialiased;\n}\nimg,\npicture,\nvideo,\ncanvas,\nsvg {\n\tdisplay: block;\n\tmax-width: 100%;\n}\ninput,\nbutton,\ntextarea,\nselect {\n\tfont: inherit;\n}\np,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n\toverflow-wrap: break-word;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/style.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/style.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n\tbackground-color: #334155;\n\tcolor: #f3f4f6;\n}\n\nbutton {\n\tcursor: pointer;\n}\n\n.boards-container {\n\tdisplay: flex;\n\theight: 100%;\n\tjustify-content: center;\n\talign-items: center;\n\tgap: 4rem;\n}\n\n.player-board,\n.computer-board,\n.setup-board {\n\tdisplay: grid;\n\tgrid-template-columns: repeat(10, auto);\n\tgrid-template-rows: repeat(10, auto);\n\tgap: 1px;\n\tposition: relative;\n}\n\n.player-board::before,\n.computer-board::before {\n\tfont-size: 1.5rem;\n\tposition: absolute;\n\ttop: -3.5rem;\n\tleft: 50%;\n\ttransform: translateX(-50%);\n}\n\n.player-board::before {\n\tcontent: 'Your board';\n}\n\n.computer-board::before {\n\tcontent: 'Enemy board';\n}\n\n.cell {\n\toutline: 1px solid #a1a1aa;\n\tposition: relative;\n\twidth: 40px;\n\theight: 40px;\n}\n\n.ship-hover {\n\tbackground-color: #1f2937;\n}\n\n.cell.ship-hover-error {\n\tbackground-color: #fb7185;\n}\n\n.ship {\n\tbackground-color: #111827;\n}\n\n.cell.ship::before {\n\tcontent: '•';\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\ttransform: translate(-50%, -50%);\n\ttext-align: center;\n\tfont-size: 2rem;\n}\n\n.cell.hit {\n\tbackground-color: #b91c1c;\n\tcursor: not-allowed;\n}\n\n.cell.hit::before {\n\tcontent: '✗';\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\ttransform: translate(-50%, -50%);\n\ttext-align: center;\n\tfont-size: 2rem;\n}\n\n.cell.miss {\n\tbackground-color: #6b7280;\n\tcursor: not-allowed;\n}\n\n#end-game-modal {\n\tdisplay: flex;\n\tflex-direction: column;\n\tpadding: 1.5rem;\n\tborder: 2px solid black;\n\tgap: 0.5rem;\n}\n\n#end-game-modal::backdrop {\n\tbackground: rgba(0, 0, 0, 0.6);\n}\n", "",{"version":3,"sources":["webpack://./src/styles/style.css"],"names":[],"mappings":"AAAA;CACC,yBAAyB;CACzB,cAAc;AACf;;AAEA;CACC,eAAe;AAChB;;AAEA;CACC,aAAa;CACb,YAAY;CACZ,uBAAuB;CACvB,mBAAmB;CACnB,SAAS;AACV;;AAEA;;;CAGC,aAAa;CACb,uCAAuC;CACvC,oCAAoC;CACpC,QAAQ;CACR,kBAAkB;AACnB;;AAEA;;CAEC,iBAAiB;CACjB,kBAAkB;CAClB,YAAY;CACZ,SAAS;CACT,2BAA2B;AAC5B;;AAEA;CACC,qBAAqB;AACtB;;AAEA;CACC,sBAAsB;AACvB;;AAEA;CACC,0BAA0B;CAC1B,kBAAkB;CAClB,WAAW;CACX,YAAY;AACb;;AAEA;CACC,yBAAyB;AAC1B;;AAEA;CACC,yBAAyB;AAC1B;;AAEA;CACC,yBAAyB;AAC1B;;AAEA;CACC,YAAY;CACZ,kBAAkB;CAClB,QAAQ;CACR,SAAS;CACT,gCAAgC;CAChC,kBAAkB;CAClB,eAAe;AAChB;;AAEA;CACC,yBAAyB;CACzB,mBAAmB;AACpB;;AAEA;CACC,YAAY;CACZ,kBAAkB;CAClB,QAAQ;CACR,SAAS;CACT,gCAAgC;CAChC,kBAAkB;CAClB,eAAe;AAChB;;AAEA;CACC,yBAAyB;CACzB,mBAAmB;AACpB;;AAEA;CACC,aAAa;CACb,sBAAsB;CACtB,eAAe;CACf,uBAAuB;CACvB,WAAW;AACZ;;AAEA;CACC,8BAA8B;AAC/B","sourcesContent":["body {\n\tbackground-color: #334155;\n\tcolor: #f3f4f6;\n}\n\nbutton {\n\tcursor: pointer;\n}\n\n.boards-container {\n\tdisplay: flex;\n\theight: 100%;\n\tjustify-content: center;\n\talign-items: center;\n\tgap: 4rem;\n}\n\n.player-board,\n.computer-board,\n.setup-board {\n\tdisplay: grid;\n\tgrid-template-columns: repeat(10, auto);\n\tgrid-template-rows: repeat(10, auto);\n\tgap: 1px;\n\tposition: relative;\n}\n\n.player-board::before,\n.computer-board::before {\n\tfont-size: 1.5rem;\n\tposition: absolute;\n\ttop: -3.5rem;\n\tleft: 50%;\n\ttransform: translateX(-50%);\n}\n\n.player-board::before {\n\tcontent: 'Your board';\n}\n\n.computer-board::before {\n\tcontent: 'Enemy board';\n}\n\n.cell {\n\toutline: 1px solid #a1a1aa;\n\tposition: relative;\n\twidth: 40px;\n\theight: 40px;\n}\n\n.ship-hover {\n\tbackground-color: #1f2937;\n}\n\n.cell.ship-hover-error {\n\tbackground-color: #fb7185;\n}\n\n.ship {\n\tbackground-color: #111827;\n}\n\n.cell.ship::before {\n\tcontent: '•';\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\ttransform: translate(-50%, -50%);\n\ttext-align: center;\n\tfont-size: 2rem;\n}\n\n.cell.hit {\n\tbackground-color: #b91c1c;\n\tcursor: not-allowed;\n}\n\n.cell.hit::before {\n\tcontent: '✗';\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\ttransform: translate(-50%, -50%);\n\ttext-align: center;\n\tfont-size: 2rem;\n}\n\n.cell.miss {\n\tbackground-color: #6b7280;\n\tcursor: not-allowed;\n}\n\n#end-game-modal {\n\tdisplay: flex;\n\tflex-direction: column;\n\tpadding: 1.5rem;\n\tborder: 2px solid black;\n\tgap: 0.5rem;\n}\n\n#end-game-modal::backdrop {\n\tbackground: rgba(0, 0, 0, 0.6);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/reset.css":
/*!******************************!*\
  !*** ./src/styles/reset.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./reset.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/reset.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/style.css":
/*!******************************!*\
  !*** ./src/styles/style.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/style.css */ "./src/styles/style.css");
/* harmony import */ var _styles_reset_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/reset.css */ "./src/styles/reset.css");
/* harmony import */ var _modules_controllers_ui_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/controllers/ui-controller */ "./src/modules/controllers/ui-controller.js");



(0,_modules_controllers_ui_controller__WEBPACK_IMPORTED_MODULE_2__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7O0FDQTRCO0FBQ0E7QUFDbUM7QUFFL0QrQyw4RUFBWSxFQUFFLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9jb250cm9sbGVycy9nYW1lLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvY29udHJvbGxlcnMvdWktY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9jb250cm9sbGVycy91aS1oZWxwZXJzLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2ZhY3Rvcmllcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZmFjdG9yaWVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9mYWN0b3JpZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3Jlc2V0LmNzcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvcmVzZXQuY3NzPzRjZmIiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9zdHlsZS5jc3M/ZmY5NCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hpcCBmcm9tICcuLi9mYWN0b3JpZXMvc2hpcCc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4uL2ZhY3Rvcmllcy9wbGF5ZXInO1xuXG5jb25zdCBGTEVFVCA9IHtcblx0Q2FycmllcjogNSxcblx0QmF0dGxlc2hpcDogNCxcblx0RGVzdHJveWVyOiAzLFxuXHRTdWJtYXJpbmU6IDMsXG5cdFBhdHJvbEJvYXQ6IDIsXG59O1xuXG5jb25zdCBnYW1lQ29udHJvbGxlciA9ICgpID0+IHtcblx0Y29uc3QgcGxheWVyID0gUGxheWVyKCdZb3UnKTtcblx0Y29uc3QgY29tcHV0ZXIgPSBQbGF5ZXIoJ0NvbXB1dGVyJyk7XG5cdGxldCBwbGF5ZXJTaGlwcyA9IE9iamVjdC52YWx1ZXMoRkxFRVQpLm1hcCgobGVuZ3RoKSA9PiBTaGlwKGxlbmd0aCkpO1xuXG5cdGNvbnN0IGNoZWNrRm9yV2luID0gKCkgPT5cblx0XHRwbGF5ZXIuZ2V0Qm9hcmQoKS5hbGxTaGlwc1N1bmsoKSB8fCBjb21wdXRlci5nZXRCb2FyZCgpLmFsbFNoaXBzU3VuaygpO1xuXG5cdGNvbnN0IGdldFdpbm5lck5hbWUgPSAoKSA9PlxuXHRcdHBsYXllci5nZXRCb2FyZCgpLmFsbFNoaXBzU3VuaygpXG5cdFx0XHQ/IGNvbXB1dGVyLmdldE5hbWUoKVxuXHRcdFx0OiBwbGF5ZXIuZ2V0TmFtZSgpO1xuXG5cdGNvbnN0IHBsYXlSb3VuZCA9IChyb3dQb3MsIGNvbFBvcykgPT4ge1xuXHRcdGlmIChjb21wdXRlci5nZXRCb2FyZCgpLmlzUG9zSGl0KHJvd1BvcywgY29sUG9zKSkgcmV0dXJuO1xuXHRcdGlmIChjaGVja0ZvcldpbigpKSByZXR1cm47XG5cblx0XHRwbGF5ZXIuYXR0YWNrUG9zKHJvd1BvcywgY29sUG9zLCBjb21wdXRlci5nZXRCb2FyZCgpKTtcblxuXHRcdGlmICghY2hlY2tGb3JXaW4oKSkge1xuXHRcdFx0Y29tcHV0ZXIuYXV0b0F0dGFja1BvcyhwbGF5ZXIuZ2V0Qm9hcmQoKSk7XG5cdFx0fVxuXHR9O1xuXG5cdGNvbnN0IHBsYWNlU2hpcHNSYW5kb21seSA9ICgpID0+IHtcblx0XHRPYmplY3QudmFsdWVzKEZMRUVUKS5mb3JFYWNoKChzaGlwTGVuZ3RoKSA9PiB7XG5cdFx0XHRjb25zdCBuZXdTaGlwID0gU2hpcChzaGlwTGVuZ3RoKTtcblxuXHRcdFx0bGV0IHBsYWNlZCA9IGZhbHNlO1xuXHRcdFx0d2hpbGUgKCFwbGFjZWQpIHtcblx0XHRcdFx0Y29uc3Qgcm93UG9zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXHRcdFx0XHRjb25zdCBjb2xQb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cdFx0XHRcdGNvbnN0IGlzVmVydGljYWwgPSBNYXRoLnJhbmRvbSgpIDwgMC41O1xuXHRcdFx0XHRwbGFjZWQgPSBjb21wdXRlclxuXHRcdFx0XHRcdC5nZXRCb2FyZCgpXG5cdFx0XHRcdFx0LnBsYWNlU2hpcChuZXdTaGlwLCByb3dQb3MsIGNvbFBvcywgaXNWZXJ0aWNhbCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH07XG5cblx0Y29uc3QgcGxhY2VTaGlwcyA9IChyb3dQb3MsIGNvbFBvcywgaXNWZXJ0aWNhbCkgPT4ge1xuXHRcdGlmICghcGxheWVyU2hpcHMubGVuZ3RoKSByZXR1cm47XG5cdFx0Y29uc3QgbmV3U2hpcCA9IHBsYXllclNoaXBzLnNoaWZ0KCk7XG5cblx0XHRpZiAoIXBsYXllci5nZXRCb2FyZCgpLnBsYWNlU2hpcChuZXdTaGlwLCByb3dQb3MsIGNvbFBvcywgaXNWZXJ0aWNhbCkpIHtcblx0XHRcdHBsYXllclNoaXBzLnVuc2hpZnQobmV3U2hpcCk7XG5cdFx0fVxuXHR9O1xuXG5cdGNvbnN0IHJlc3RhcnRHYW1lID0gKCkgPT4ge1xuXHRcdHBsYXllci5nZXRCb2FyZCgpLnJlc2V0Qm9hcmQoKTtcblx0XHRjb21wdXRlci5nZXRCb2FyZCgpLnJlc2V0Qm9hcmQoKTtcblxuXHRcdHBsYXllclNoaXBzID0gT2JqZWN0LnZhbHVlcyhGTEVFVCkubWFwKChsZW5ndGgpID0+IFNoaXAobGVuZ3RoKSk7XG5cdFx0cGxhY2VTaGlwc1JhbmRvbWx5KCk7XG5cdH07XG5cblx0Y29uc3QgZ2V0UGxheWVyID0gKCkgPT4gcGxheWVyO1xuXG5cdGNvbnN0IGdldENvbXB1dGVyID0gKCkgPT4gY29tcHV0ZXI7XG5cblx0Y29uc3QgZ2V0Q3VycmVudFNoaXAgPSAoKSA9PiBwbGF5ZXJTaGlwc1swXTtcblxuXHRjb25zdCBhcmVQbGF5ZXJTaGlwc0VtcHR5ID0gKCkgPT4gcGxheWVyU2hpcHMubGVuZ3RoID09PSAwO1xuXG5cdHBsYWNlU2hpcHNSYW5kb21seSgpO1xuXG5cdHJldHVybiB7XG5cdFx0cGxheVJvdW5kLFxuXHRcdGdldFBsYXllcixcblx0XHRnZXRDb21wdXRlcixcblx0XHRwbGFjZVNoaXBzLFxuXHRcdGdldEN1cnJlbnRTaGlwLFxuXHRcdGFyZVBsYXllclNoaXBzRW1wdHksXG5cdFx0Y2hlY2tGb3JXaW4sXG5cdFx0Z2V0V2lubmVyTmFtZSxcblx0XHRyZXN0YXJ0R2FtZSxcblx0fTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVDb250cm9sbGVyO1xuIiwiaW1wb3J0IGdhbWVDb250cm9sbGVyIGZyb20gJy4vZ2FtZS1jb250cm9sbGVyJztcbmltcG9ydCAqIGFzIHVpSGVscGVycyBmcm9tICcuL3VpLWhlbHBlcnMnO1xuXG5jb25zdCBVSUNvbnRyb2xsZXIgPSAoKSA9PiB7XG5cdGxldCBpc1ZlcnRpY2FsID0gZmFsc2U7XG5cdGNvbnN0IGdhbWUgPSBnYW1lQ29udHJvbGxlcigpO1xuXG5cdGNvbnN0IHNldHVwQm9hcmRDb250YWluZXJFbGVtZW50ID1cblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2V0dXAtY29udGFpbmVyJyk7XG5cdGNvbnN0IHNldHVwQm9hcmRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNldHVwLWJvYXJkJyk7XG5cdGNvbnN0IHBsYXllckJvYXJkRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItYm9hcmQnKTtcblx0Y29uc3QgY29tcHV0ZXJCb2FyZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcHV0ZXItYm9hcmQnKTtcblx0Y29uc3QgcmVzdGFydEdhbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdGFydC1nYW1lJyk7XG5cblx0Y29uc3QgaW5pdEludGVyZmFjZSA9ICgpID0+IHtcblx0XHR1aUhlbHBlcnMuZ2VuZXJhdGVCb2FyZChzZXR1cEJvYXJkRWxlbWVudCk7XG5cdFx0dWlIZWxwZXJzLmdlbmVyYXRlQm9hcmQocGxheWVyQm9hcmRFbGVtZW50KTtcblx0XHR1aUhlbHBlcnMuZ2VuZXJhdGVCb2FyZChjb21wdXRlckJvYXJkRWxlbWVudCk7XG5cdFx0dWlIZWxwZXJzLmhpZGVCb2FyZChwbGF5ZXJCb2FyZEVsZW1lbnQpO1xuXHRcdHVpSGVscGVycy5oaWRlQm9hcmQoY29tcHV0ZXJCb2FyZEVsZW1lbnQpO1xuXHR9O1xuXG5cdGNvbnN0IHNob3dQbGF5ZXJCb2FyZHMgPSAoKSA9PiB7XG5cdFx0dWlIZWxwZXJzLmhpZGVFbGVtZW50KHNldHVwQm9hcmRDb250YWluZXJFbGVtZW50KTtcblx0XHR1aUhlbHBlcnMuaGlkZUJvYXJkKHBsYXllckJvYXJkRWxlbWVudCwgZmFsc2UpO1xuXHRcdHVpSGVscGVycy5oaWRlQm9hcmQoY29tcHV0ZXJCb2FyZEVsZW1lbnQsIGZhbHNlKTtcblx0XHR1aUhlbHBlcnMuc2hvd1NoaXBzKGdhbWUuZ2V0UGxheWVyKCkuZ2V0Qm9hcmQoKSwgcGxheWVyQm9hcmRFbGVtZW50KTtcblx0fTtcblxuXHRjb25zdCBoYW5kbGVDZWxsQ2xpY2sgPSAoZXZlbnQpID0+IHtcblx0XHRjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQ7XG5cdFx0aWYgKCF0YXJnZXQubWF0Y2hlcygnLmNlbGwnKSkgcmV0dXJuO1xuXG5cdFx0Y29uc3QgW3Jvd1BvcywgY29sUG9zXSA9IHVpSGVscGVycy5nZXRDZWxsQ29vcmRzKHRhcmdldCk7XG5cdFx0Z2FtZS5wbGF5Um91bmQocm93UG9zLCBjb2xQb3MpO1xuXG5cdFx0aWYgKGdhbWUuY2hlY2tGb3JXaW4oKSkge1xuXHRcdFx0dWlIZWxwZXJzLnNob3dFbmRHYW1lTW9kYWwoZ2FtZS5nZXRXaW5uZXJOYW1lKCkpO1xuXHRcdH1cblx0XHR1aUhlbHBlcnMudXBkYXRlQm9hcmRzKGdhbWUuZ2V0UGxheWVyKCksIGdhbWUuZ2V0Q29tcHV0ZXIoKSk7XG5cdH07XG5cblx0Y29uc3QgaGFuZGxlU2hpcFBsYWNlbWVudCA9IChldmVudCkgPT4ge1xuXHRcdGNvbnN0IHsgdGFyZ2V0IH0gPSBldmVudDtcblx0XHRpZiAoIXRhcmdldC5tYXRjaGVzKCcuY2VsbCcpKSByZXR1cm47XG5cblx0XHRjb25zdCBbcm93UG9zLCBjb2xQb3NdID0gdWlIZWxwZXJzLmdldENlbGxDb29yZHModGFyZ2V0KTtcblx0XHRnYW1lLnBsYWNlU2hpcHMocm93UG9zLCBjb2xQb3MsIGlzVmVydGljYWwpO1xuXHRcdHVpSGVscGVycy5zaG93U2hpcHMoZ2FtZS5nZXRQbGF5ZXIoKS5nZXRCb2FyZCgpLCBzZXR1cEJvYXJkRWxlbWVudCk7XG5cblx0XHRpZiAoZ2FtZS5hcmVQbGF5ZXJTaGlwc0VtcHR5KCkpIHtcblx0XHRcdHNob3dQbGF5ZXJCb2FyZHMoKTtcblx0XHR9XG5cdH07XG5cblx0Y29uc3QgaGFuZGxlUmVzdGFydEdhbWUgPSAoKSA9PiB7XG5cdFx0dWlIZWxwZXJzLmhpZGVFbGVtZW50KHBsYXllckJvYXJkRWxlbWVudCk7XG5cdFx0dWlIZWxwZXJzLmhpZGVFbGVtZW50KGNvbXB1dGVyQm9hcmRFbGVtZW50KTtcblxuXHRcdHVpSGVscGVycy5oaWRlRW5kR2FtZU1vZGFsKCk7XG5cblx0XHRnYW1lLnJlc3RhcnRHYW1lKCk7XG5cblx0XHR1aUhlbHBlcnMuaGlkZUVsZW1lbnQoc2V0dXBCb2FyZENvbnRhaW5lckVsZW1lbnQsIGZhbHNlKTtcblxuXHRcdHVpSGVscGVycy5jbGVhckJvYXJkKHNldHVwQm9hcmRFbGVtZW50KTtcblx0XHR1aUhlbHBlcnMuY2xlYXJCb2FyZChwbGF5ZXJCb2FyZEVsZW1lbnQpO1xuXHRcdHVpSGVscGVycy5jbGVhckJvYXJkKGNvbXB1dGVyQm9hcmRFbGVtZW50KTtcblx0fTtcblxuXHRjb25zdCBoYW5kbGVTaGlwSG92ZXIgPSAoZXZlbnQpID0+IHtcblx0XHRjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQ7XG5cdFx0aWYgKCF0YXJnZXQubWF0Y2hlcygnLmNlbGwnKSkgcmV0dXJuO1xuXG5cdFx0Y29uc3QgW3Jvd1BvcywgY29sUG9zXSA9IHVpSGVscGVycy5nZXRDZWxsQ29vcmRzKHRhcmdldCk7XG5cdFx0Y29uc3QgaXNMZWdhbFBsYWNlbWVudCA9IGdhbWVcblx0XHRcdC5nZXRQbGF5ZXIoKVxuXHRcdFx0LmdldEJvYXJkKClcblx0XHRcdC5pc0xlZ2FsUGxhY2VtZW50KFxuXHRcdFx0XHRyb3dQb3MsXG5cdFx0XHRcdGNvbFBvcyxcblx0XHRcdFx0Z2FtZS5nZXRDdXJyZW50U2hpcCgpLmdldExlbmd0aCgpLFxuXHRcdFx0XHRpc1ZlcnRpY2FsXG5cdFx0XHQpO1xuXG5cdFx0dWlIZWxwZXJzLmhpZ2hsaWdodFNoaXBIb3Zlcihcblx0XHRcdHNldHVwQm9hcmRFbGVtZW50LFxuXHRcdFx0dGFyZ2V0LFxuXHRcdFx0Z2FtZS5nZXRDdXJyZW50U2hpcCgpLmdldExlbmd0aCgpLFxuXHRcdFx0aXNWZXJ0aWNhbCxcblx0XHRcdCFpc0xlZ2FsUGxhY2VtZW50XG5cdFx0KTtcblx0fTtcblxuXHRjb25zdCBoYW5kbGVTaGlwT3V0ID0gKCkgPT4gdWlIZWxwZXJzLmNsZWFyU2hpcEhvdmVyKHNldHVwQm9hcmRFbGVtZW50KTtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG5cdFx0aWYgKGUua2V5ID09PSAncicpIHtcblx0XHRcdGlzVmVydGljYWwgPSAhaXNWZXJ0aWNhbDtcblx0XHR9XG5cdH0pO1xuXG5cdGRvY3VtZW50XG5cdFx0LnF1ZXJ5U2VsZWN0b3IoJyNlbmQtZ2FtZS1tb2RhbCcpXG5cdFx0LmFkZEV2ZW50TGlzdGVuZXIoJ2NhbmNlbCcsIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fSk7XG5cblx0Y29uc3Qgc2V0dXBCb2FyZExpc3RlbmVyID0gKCkgPT4ge1xuXHRcdHNldHVwQm9hcmRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlU2hpcFBsYWNlbWVudCk7XG5cdFx0c2V0dXBCb2FyZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgaGFuZGxlU2hpcEhvdmVyKTtcblx0XHRzZXR1cEJvYXJkRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGhhbmRsZVNoaXBPdXQpO1xuXHR9O1xuXG5cdGNvbnN0IGNvbXB1dGVyQm9hcmRMaXN0ZW5lciA9ICgpID0+IHtcblx0XHRjb21wdXRlckJvYXJkRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNlbGxDbGljayk7XG5cdH07XG5cblx0Y29uc3QgcmVzdGFydEdhbWVMaXN0ZW5lciA9ICgpID0+IHtcblx0XHRyZXN0YXJ0R2FtZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVJlc3RhcnRHYW1lKTtcblx0fTtcblxuXHRpbml0SW50ZXJmYWNlKCk7XG5cdHNldHVwQm9hcmRMaXN0ZW5lcigpO1xuXHRjb21wdXRlckJvYXJkTGlzdGVuZXIoKTtcblx0cmVzdGFydEdhbWVMaXN0ZW5lcigpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVUlDb250cm9sbGVyO1xuIiwiZXhwb3J0IGNvbnN0IGdldENlbGxDb29yZHMgPSAoY2VsbCkgPT5cblx0Y2VsbC5kYXRhc2V0LmNvb3Jkcy5zcGxpdCgnJykubWFwKChjb29yZFN0cikgPT4gTnVtYmVyKGNvb3JkU3RyKSk7XG5cbmV4cG9ydCBjb25zdCBnZXRDZWxsRWxlbWVudCA9IChib2FyZCwgcm93UG9zLCBjb2xQb3MpID0+XG5cdFsuLi5ib2FyZC5jaGlsZHJlbl0uZmluZChcblx0XHQoY2VsbCkgPT4gY2VsbC5kYXRhc2V0LmNvb3JkcyA9PT0gYCR7cm93UG9zfSR7Y29sUG9zfWBcblx0KTtcblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlQm9hcmQgPSAoYm9hcmRFbGVtZW50KSA9PiB7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcblx0XHRjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0Y2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XG5cdFx0Y2VsbC5kYXRhc2V0LmNvb3JkcyA9IGkgPCAxMCA/IGAwJHtpfWAgOiBpO1xuXHRcdGJvYXJkRWxlbWVudC5hcHBlbmRDaGlsZChjZWxsKTtcblx0fVxufTtcblxuZXhwb3J0IGNvbnN0IHNob3dTaGlwcyA9IChib2FyZCwgYm9hcmRFbGVtZW50KSA9PiB7XG5cdFsuLi5ib2FyZEVsZW1lbnQuY2hpbGRyZW5dLmZvckVhY2goKGNlbGwpID0+IHtcblx0XHRjb25zdCBbcm93UG9zLCBjb2xQb3NdID0gZ2V0Q2VsbENvb3JkcyhjZWxsKTtcblxuXHRcdGlmIChib2FyZC5pc1Bvc1NoaXAocm93UG9zLCBjb2xQb3MpKSB7XG5cdFx0XHRjZWxsLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcblx0XHR9XG5cdH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGhpZ2hsaWdodFNoaXBIb3ZlciA9IChcblx0Ym9hcmQsXG5cdGNlbGwsXG5cdHNoaXBMZW5ndGgsXG5cdGlzVmVydGljYWwsXG5cdGlzRXJyb3IgPSBmYWxzZVxuKSA9PiB7XG5cdGNvbnN0IFtyb3dQb3MsIGNvbFBvc10gPSBnZXRDZWxsQ29vcmRzKGNlbGwpO1xuXHRjb25zdCBjbGFzc05hbWUgPSBpc0Vycm9yID8gJ3NoaXAtaG92ZXItZXJyb3InIDogJ3NoaXAtaG92ZXInO1xuXG5cdGlmIChpc1ZlcnRpY2FsKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IGVsZW1lbnQgPSBnZXRDZWxsRWxlbWVudChib2FyZCwgcm93UG9zICsgaSwgY29sUG9zKTtcblx0XHRcdGlmIChlbGVtZW50KSB7XG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgZWxlbWVudCA9IGdldENlbGxFbGVtZW50KGJvYXJkLCByb3dQb3MsIGNvbFBvcyArIGkpO1xuXHRcdFx0aWYgKGVsZW1lbnQpIHtcblx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgY29uc3QgY2xlYXJTaGlwSG92ZXIgPSAoYm9hcmQpID0+IHtcblx0Wy4uLmJvYXJkLmNoaWxkcmVuXS5mb3JFYWNoKChjZWxsKSA9PiB7XG5cdFx0Y2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwLWhvdmVyJyk7XG5cdFx0Y2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwLWhvdmVyLWVycm9yJyk7XG5cdH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNsZWFyQm9hcmQgPSAoYm9hcmQpID0+IHtcblx0Wy4uLmJvYXJkLmNoaWxkcmVuXS5mb3JFYWNoKChjZWxsKSA9PiB7XG5cdFx0Y2VsbC5jbGFzc05hbWUgPSAnY2VsbCc7XG5cdH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUJvYXJkcyA9IChwbGF5ZXIsIGNvbXB1dGVyKSA9PiB7XG5cdGNvbnN0IHBsYXllckJvYXJkRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItYm9hcmQnKTtcblx0Y29uc3QgY29tcHV0ZXJCb2FyZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcHV0ZXItYm9hcmQnKTtcblxuXHRjb25zdCB1cGRhdGVCb2FyZCA9IChib2FyZCwgYm9hcmRFbGVtZW50KSA9PiB7XG5cdFx0Wy4uLmJvYXJkRWxlbWVudC5jaGlsZHJlbl0uZm9yRWFjaCgoY2VsbCkgPT4ge1xuXHRcdFx0Y29uc3QgW3Jvd1BvcywgY29sUG9zXSA9IGdldENlbGxDb29yZHMoY2VsbCk7XG5cdFx0XHRjb25zdCBpc0hpdCA9IGJvYXJkLmlzUG9zSGl0KHJvd1BvcywgY29sUG9zKTtcblx0XHRcdGNvbnN0IGlzU2hpcCA9IGJvYXJkLmlzUG9zU2hpcChyb3dQb3MsIGNvbFBvcyk7XG5cblx0XHRcdGlmIChpc0hpdCAmJiBpc1NoaXApIHtcblx0XHRcdFx0Y2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcblx0XHRcdH0gZWxzZSBpZiAoaXNIaXQgJiYgIWlzU2hpcCkge1xuXHRcdFx0XHRjZWxsLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fTtcblxuXHR1cGRhdGVCb2FyZChwbGF5ZXIuZ2V0Qm9hcmQoKSwgcGxheWVyQm9hcmRFbGVtZW50KTtcblx0dXBkYXRlQm9hcmQoY29tcHV0ZXIuZ2V0Qm9hcmQoKSwgY29tcHV0ZXJCb2FyZEVsZW1lbnQpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNob3dFbmRHYW1lTW9kYWwgPSAod2lubmVyKSA9PiB7XG5cdGNvbnN0IGVuZEdhbWVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbmQtZ2FtZS1tb2RhbCcpO1xuXHRjb25zdCB3aW5uZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dpbm5lcicpO1xuXG5cdHdpbm5lck5hbWUudGV4dENvbnRlbnQgPVxuXHRcdHdpbm5lciA9PT0gJ1lvdScgPyBgJHt3aW5uZXJ9IHdpbmAgOiBgJHt3aW5uZXJ9IHdpbnNgO1xuXHRlbmRHYW1lTW9kYWwuc2hvd01vZGFsKCk7XG59O1xuXG5leHBvcnQgY29uc3QgaGlkZUVuZEdhbWVNb2RhbCA9ICgpID0+IHtcblx0Y29uc3QgZW5kR2FtZU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuZC1nYW1lLW1vZGFsJyk7XG5cdGVuZEdhbWVNb2RhbC5jbG9zZSgpO1xufTtcblxuZXhwb3J0IGNvbnN0IGhpZGVFbGVtZW50ID0gKGVsLCBoaWRlID0gdHJ1ZSkgPT4ge1xuXHRlbC5zdHlsZS5kaXNwbGF5ID0gaGlkZSA/ICdub25lJyA6ICdibG9jayc7XG59O1xuXG5leHBvcnQgY29uc3QgaGlkZUJvYXJkID0gKGVsLCBoaWRlID0gdHJ1ZSkgPT4ge1xuXHRlbC5zdHlsZS5kaXNwbGF5ID0gaGlkZSA/ICdub25lJyA6ICdncmlkJztcbn07XG4iLCJjb25zdCBHYW1lYm9hcmQgPSAocm93U2l6ZSwgY29sU2l6ZSkgPT4ge1xuXHRjb25zdCBpbml0Qm9hcmQgPSAocm93cywgY29scykgPT5cblx0XHRbLi4uQXJyYXkocm93cyldLm1hcCgoKSA9PlxuXHRcdFx0Wy4uLkFycmF5KGNvbHMpXS5tYXAoKCkgPT4gKHsgc2hpcDogbnVsbCwgaXNIaXQ6IGZhbHNlIH0pKVxuXHRcdCk7XG5cblx0bGV0IGJvYXJkID0gaW5pdEJvYXJkKDEwLCAxMCk7XG5cblx0bGV0IHNoaXBzID0gW107XG5cblx0Y29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuXHRjb25zdCBhbGxTaGlwc1N1bmsgPSAoKSA9PlxuXHRcdHNoaXBzLmxlbmd0aCA9PT0gMCA/IGZhbHNlIDogc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkpO1xuXG5cdGNvbnN0IGlzUG9zSW5Cb2FyZCA9IChyb3dQb3MsIGNvbFBvcykgPT5cblx0XHRyb3dQb3MgPj0gMCAmJiByb3dQb3MgPCByb3dTaXplICYmIGNvbFBvcyA+PSAwICYmIGNvbFBvcyA8IGNvbFNpemU7XG5cblx0Y29uc3QgaXNQb3NIaXQgPSAocm93UG9zLCBjb2xQb3MpID0+IGJvYXJkW3Jvd1Bvc11bY29sUG9zXS5pc0hpdCA9PT0gdHJ1ZTtcblxuXHRjb25zdCBpc1Bvc1NoaXAgPSAocm93UG9zLCBjb2xQb3MpID0+IGJvYXJkW3Jvd1Bvc11bY29sUG9zXS5zaGlwO1xuXG5cdGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocm93UG9zLCBjb2xQb3MpID0+IHtcblx0XHRpZiAoIWlzUG9zSW5Cb2FyZChyb3dQb3MsIGNvbFBvcykgfHwgaXNQb3NIaXQocm93UG9zLCBjb2xQb3MpKSByZXR1cm47XG5cblx0XHRpZiAoaXNQb3NTaGlwKHJvd1BvcywgY29sUG9zKSkge1xuXHRcdFx0Ym9hcmRbcm93UG9zXVtjb2xQb3NdLnNoaXAuaGl0KCk7XG5cdFx0fVxuXG5cdFx0Ym9hcmRbcm93UG9zXVtjb2xQb3NdLmlzSGl0ID0gdHJ1ZTtcblx0fTtcblxuXHRjb25zdCBnZW5lcmF0ZVNoaXBQb3NpdGlvbnMgPSAocm93UG9zLCBjb2xQb3MsIHNoaXBMZW5ndGgsIGlzVmVydGljYWwpID0+IHtcblx0XHRjb25zdCBzaGlwUG9zaXRpb25zID0gW107XG5cblx0XHRpZiAoaXNWZXJ0aWNhbCkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0c2hpcFBvc2l0aW9ucy5wdXNoKFtyb3dQb3MgKyBpLCBjb2xQb3NdKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0c2hpcFBvc2l0aW9ucy5wdXNoKFtyb3dQb3MsIGNvbFBvcyArIGldKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gc2hpcFBvc2l0aW9ucztcblx0fTtcblxuXHRjb25zdCBpc0xlZ2FsUGxhY2VtZW50ID0gKHJvd1BvcywgY29sUG9zLCBzaGlwTGVuZ3RoLCBpc1ZlcnRpY2FsKSA9PiB7XG5cdFx0Y29uc3Qgc2hpcFBvc2l0aW9ucyA9IGdlbmVyYXRlU2hpcFBvc2l0aW9ucyhcblx0XHRcdHJvd1Bvcyxcblx0XHRcdGNvbFBvcyxcblx0XHRcdHNoaXBMZW5ndGgsXG5cdFx0XHRpc1ZlcnRpY2FsXG5cdFx0KTtcblxuXHRcdGNvbnN0IGFsbFBvc2l0aW9uc0luQm9hcmQgPSBzaGlwUG9zaXRpb25zLmV2ZXJ5KChbeCwgeV0pID0+XG5cdFx0XHRpc1Bvc0luQm9hcmQoeCwgeSlcblx0XHQpO1xuXHRcdGlmICghYWxsUG9zaXRpb25zSW5Cb2FyZCkgcmV0dXJuIGZhbHNlO1xuXG5cdFx0Y29uc3Qgc2hpcE92ZXJsYXAgPSBzaGlwUG9zaXRpb25zLnNvbWUoKFt4LCB5XSkgPT4gaXNQb3NTaGlwKHgsIHkpKTtcblxuXHRcdHJldHVybiBhbGxQb3NpdGlvbnNJbkJvYXJkICYmICFzaGlwT3ZlcmxhcDtcblx0fTtcblxuXHRjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCwgcm93UG9zLCBjb2xQb3MsIGlzVmVydGljYWwpID0+IHtcblx0XHRpZiAoIWlzTGVnYWxQbGFjZW1lbnQocm93UG9zLCBjb2xQb3MsIHNoaXAuZ2V0TGVuZ3RoKCksIGlzVmVydGljYWwpKVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXG5cdFx0aWYgKGlzVmVydGljYWwpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5nZXRMZW5ndGgoKTsgaSsrKSB7XG5cdFx0XHRcdGJvYXJkW3Jvd1BvcyArIGldW2NvbFBvc10uc2hpcCA9IHNoaXA7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5nZXRMZW5ndGgoKTsgaSsrKSB7XG5cdFx0XHRcdGJvYXJkW3Jvd1Bvc11bY29sUG9zICsgaV0uc2hpcCA9IHNoaXA7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c2hpcHMucHVzaChzaGlwKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcblxuXHRjb25zdCByZXNldEJvYXJkID0gKCkgPT4ge1xuXHRcdGJvYXJkID0gaW5pdEJvYXJkKDEwLCAxMCk7XG5cdFx0c2hpcHMgPSBbXTtcblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdGdldEJvYXJkLFxuXHRcdHBsYWNlU2hpcCxcblx0XHRyZWNlaXZlQXR0YWNrLFxuXHRcdGFsbFNoaXBzU3Vuayxcblx0XHRpc1Bvc1NoaXAsXG5cdFx0aXNQb3NIaXQsXG5cdFx0aXNMZWdhbFBsYWNlbWVudCxcblx0XHRyZXNldEJvYXJkLFxuXHR9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XG5cbmNvbnN0IFBsYXllciA9IChuYW1lKSA9PiB7XG5cdGNvbnN0IGJvYXJkID0gR2FtZWJvYXJkKDEwLCAxMCk7XG5cblx0Y29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG5cblx0Y29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuXHRjb25zdCBhdHRhY2tQb3MgPSAocm93UG9zLCBjb2xQb3MsIGVuZW15Qm9hcmQpID0+IHtcblx0XHRlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2socm93UG9zLCBjb2xQb3MpO1xuXHR9O1xuXG5cdGNvbnN0IGF1dG9BdHRhY2tQb3MgPSAoZW5lbXlCb2FyZCkgPT4ge1xuXHRcdGNvbnN0IGdldFJhbmRvbUNvb3JkcyA9ICgpID0+IFtcblx0XHRcdE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSxcblx0XHRcdE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSxcblx0XHRdO1xuXG5cdFx0bGV0IHJhbmRvbUNvb3JkcyA9IGdldFJhbmRvbUNvb3JkcygpO1xuXG5cdFx0d2hpbGUgKGVuZW15Qm9hcmQuaXNQb3NIaXQocmFuZG9tQ29vcmRzWzBdLCByYW5kb21Db29yZHNbMV0pKSB7XG5cdFx0XHRyYW5kb21Db29yZHMgPSBnZXRSYW5kb21Db29yZHMoKTtcblx0XHR9XG5cblx0XHRlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2socmFuZG9tQ29vcmRzWzBdLCByYW5kb21Db29yZHNbMV0pO1xuXHR9O1xuXG5cdHJldHVybiB7XG5cdFx0YXR0YWNrUG9zLFxuXHRcdGdldE5hbWUsXG5cdFx0Z2V0Qm9hcmQsXG5cdFx0YXV0b0F0dGFja1Bvcyxcblx0fTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImNvbnN0IFNoaXAgPSAobGVuZ3RoKSA9PiB7XG5cdGxldCB0aW1lc0hpdCA9IDA7XG5cblx0Y29uc3QgaGl0ID0gKCkgPT4ge1xuXHRcdHRpbWVzSGl0ICs9IDE7XG5cdH07XG5cblx0Y29uc3QgaXNTdW5rID0gKCkgPT4gdGltZXNIaXQgPj0gbGVuZ3RoO1xuXG5cdGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxlbmd0aDtcblxuXHRyZXR1cm4ge1xuXHRcdGhpdCxcblx0XHRpc1N1bmssXG5cdFx0Z2V0TGVuZ3RoLFxuXHR9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogaHR0cHM6Ly93d3cuam9zaHdjb21lYXUuY29tL2Nzcy9jdXN0b20tY3NzLXJlc2V0LyAqL1xcbiosXFxuKjo6YmVmb3JlLFxcbio6OmFmdGVyIHtcXG5cXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4qOm5vdChkaWFsb2cpIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG59XFxuaHRtbCxcXG5ib2R5IHtcXG5cXHRoZWlnaHQ6IDEwMCU7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxLjU7XFxuXFx0LXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxufVxcbmltZyxcXG5waWN0dXJlLFxcbnZpZGVvLFxcbmNhbnZhcyxcXG5zdmcge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcblxcdG1heC13aWR0aDogMTAwJTtcXG59XFxuaW5wdXQsXFxuYnV0dG9uLFxcbnRleHRhcmVhLFxcbnNlbGVjdCB7XFxuXFx0Zm9udDogaW5oZXJpdDtcXG59XFxucCxcXG5oMSxcXG5oMixcXG5oMyxcXG5oNCxcXG5oNSxcXG5oNiB7XFxuXFx0b3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZDtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9yZXNldC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsc0RBQXNEO0FBQ3REOzs7Q0FHQyxzQkFBc0I7QUFDdkI7QUFDQTtDQUNDLFNBQVM7Q0FDVCxVQUFVO0FBQ1g7QUFDQTs7Q0FFQyxZQUFZO0FBQ2I7QUFDQTtDQUNDLGdCQUFnQjtDQUNoQixtQ0FBbUM7QUFDcEM7QUFDQTs7Ozs7Q0FLQyxjQUFjO0NBQ2QsZUFBZTtBQUNoQjtBQUNBOzs7O0NBSUMsYUFBYTtBQUNkO0FBQ0E7Ozs7Ozs7Q0FPQyx5QkFBeUI7QUFDMUJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogaHR0cHM6Ly93d3cuam9zaHdjb21lYXUuY29tL2Nzcy9jdXN0b20tY3NzLXJlc2V0LyAqL1xcbiosXFxuKjo6YmVmb3JlLFxcbio6OmFmdGVyIHtcXG5cXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4qOm5vdChkaWFsb2cpIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG59XFxuaHRtbCxcXG5ib2R5IHtcXG5cXHRoZWlnaHQ6IDEwMCU7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxLjU7XFxuXFx0LXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxufVxcbmltZyxcXG5waWN0dXJlLFxcbnZpZGVvLFxcbmNhbnZhcyxcXG5zdmcge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcblxcdG1heC13aWR0aDogMTAwJTtcXG59XFxuaW5wdXQsXFxuYnV0dG9uLFxcbnRleHRhcmVhLFxcbnNlbGVjdCB7XFxuXFx0Zm9udDogaW5oZXJpdDtcXG59XFxucCxcXG5oMSxcXG5oMixcXG5oMyxcXG5oNCxcXG5oNSxcXG5oNiB7XFxuXFx0b3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogIzMzNDE1NTtcXG5cXHRjb2xvcjogI2YzZjRmNjtcXG59XFxuXFxuYnV0dG9uIHtcXG5cXHRjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5ib2FyZHMtY29udGFpbmVyIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGhlaWdodDogMTAwJTtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHRhbGlnbi1pdGVtczogY2VudGVyO1xcblxcdGdhcDogNHJlbTtcXG59XFxuXFxuLnBsYXllci1ib2FyZCxcXG4uY29tcHV0ZXItYm9hcmQsXFxuLnNldHVwLWJvYXJkIHtcXG5cXHRkaXNwbGF5OiBncmlkO1xcblxcdGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCBhdXRvKTtcXG5cXHRncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgYXV0byk7XFxuXFx0Z2FwOiAxcHg7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkOjpiZWZvcmUsXFxuLmNvbXB1dGVyLWJvYXJkOjpiZWZvcmUge1xcblxcdGZvbnQtc2l6ZTogMS41cmVtO1xcblxcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXHR0b3A6IC0zLjVyZW07XFxuXFx0bGVmdDogNTAlO1xcblxcdHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcXG59XFxuXFxuLnBsYXllci1ib2FyZDo6YmVmb3JlIHtcXG5cXHRjb250ZW50OiAnWW91ciBib2FyZCc7XFxufVxcblxcbi5jb21wdXRlci1ib2FyZDo6YmVmb3JlIHtcXG5cXHRjb250ZW50OiAnRW5lbXkgYm9hcmQnO1xcbn1cXG5cXG4uY2VsbCB7XFxuXFx0b3V0bGluZTogMXB4IHNvbGlkICNhMWExYWE7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdHdpZHRoOiA0MHB4O1xcblxcdGhlaWdodDogNDBweDtcXG59XFxuXFxuLnNoaXAtaG92ZXIge1xcblxcdGJhY2tncm91bmQtY29sb3I6ICMxZjI5Mzc7XFxufVxcblxcbi5jZWxsLnNoaXAtaG92ZXItZXJyb3Ige1xcblxcdGJhY2tncm91bmQtY29sb3I6ICNmYjcxODU7XFxufVxcblxcbi5zaGlwIHtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiAjMTExODI3O1xcbn1cXG5cXG4uY2VsbC5zaGlwOjpiZWZvcmUge1xcblxcdGNvbnRlbnQ6ICfigKInO1xcblxcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXHR0b3A6IDUwJTtcXG5cXHRsZWZ0OiA1MCU7XFxuXFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdGZvbnQtc2l6ZTogMnJlbTtcXG59XFxuXFxuLmNlbGwuaGl0IHtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiAjYjkxYzFjO1xcblxcdGN1cnNvcjogbm90LWFsbG93ZWQ7XFxufVxcblxcbi5jZWxsLmhpdDo6YmVmb3JlIHtcXG5cXHRjb250ZW50OiAn4pyXJztcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0dG9wOiA1MCU7XFxuXFx0bGVmdDogNTAlO1xcblxcdHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHRmb250LXNpemU6IDJyZW07XFxufVxcblxcbi5jZWxsLm1pc3Mge1xcblxcdGJhY2tncm91bmQtY29sb3I6ICM2YjcyODA7XFxuXFx0Y3Vyc29yOiBub3QtYWxsb3dlZDtcXG59XFxuXFxuI2VuZC1nYW1lLW1vZGFsIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuXFx0cGFkZGluZzogMS41cmVtO1xcblxcdGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xcblxcdGdhcDogMC41cmVtO1xcbn1cXG5cXG4jZW5kLWdhbWUtbW9kYWw6OmJhY2tkcm9wIHtcXG5cXHRiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNik7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0NBQ0MseUJBQXlCO0NBQ3pCLGNBQWM7QUFDZjs7QUFFQTtDQUNDLGVBQWU7QUFDaEI7O0FBRUE7Q0FDQyxhQUFhO0NBQ2IsWUFBWTtDQUNaLHVCQUF1QjtDQUN2QixtQkFBbUI7Q0FDbkIsU0FBUztBQUNWOztBQUVBOzs7Q0FHQyxhQUFhO0NBQ2IsdUNBQXVDO0NBQ3ZDLG9DQUFvQztDQUNwQyxRQUFRO0NBQ1Isa0JBQWtCO0FBQ25COztBQUVBOztDQUVDLGlCQUFpQjtDQUNqQixrQkFBa0I7Q0FDbEIsWUFBWTtDQUNaLFNBQVM7Q0FDVCwyQkFBMkI7QUFDNUI7O0FBRUE7Q0FDQyxxQkFBcUI7QUFDdEI7O0FBRUE7Q0FDQyxzQkFBc0I7QUFDdkI7O0FBRUE7Q0FDQywwQkFBMEI7Q0FDMUIsa0JBQWtCO0NBQ2xCLFdBQVc7Q0FDWCxZQUFZO0FBQ2I7O0FBRUE7Q0FDQyx5QkFBeUI7QUFDMUI7O0FBRUE7Q0FDQyx5QkFBeUI7QUFDMUI7O0FBRUE7Q0FDQyx5QkFBeUI7QUFDMUI7O0FBRUE7Q0FDQyxZQUFZO0NBQ1osa0JBQWtCO0NBQ2xCLFFBQVE7Q0FDUixTQUFTO0NBQ1QsZ0NBQWdDO0NBQ2hDLGtCQUFrQjtDQUNsQixlQUFlO0FBQ2hCOztBQUVBO0NBQ0MseUJBQXlCO0NBQ3pCLG1CQUFtQjtBQUNwQjs7QUFFQTtDQUNDLFlBQVk7Q0FDWixrQkFBa0I7Q0FDbEIsUUFBUTtDQUNSLFNBQVM7Q0FDVCxnQ0FBZ0M7Q0FDaEMsa0JBQWtCO0NBQ2xCLGVBQWU7QUFDaEI7O0FBRUE7Q0FDQyx5QkFBeUI7Q0FDekIsbUJBQW1CO0FBQ3BCOztBQUVBO0NBQ0MsYUFBYTtDQUNiLHNCQUFzQjtDQUN0QixlQUFlO0NBQ2YsdUJBQXVCO0NBQ3ZCLFdBQVc7QUFDWjs7QUFFQTtDQUNDLDhCQUE4QjtBQUMvQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJib2R5IHtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiAjMzM0MTU1O1xcblxcdGNvbG9yOiAjZjNmNGY2O1xcbn1cXG5cXG5idXR0b24ge1xcblxcdGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmJvYXJkcy1jb250YWluZXIge1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0aGVpZ2h0OiAxMDAlO1xcblxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0Z2FwOiA0cmVtO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkLFxcbi5jb21wdXRlci1ib2FyZCxcXG4uc2V0dXAtYm9hcmQge1xcblxcdGRpc3BsYXk6IGdyaWQ7XFxuXFx0Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIGF1dG8pO1xcblxcdGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCBhdXRvKTtcXG5cXHRnYXA6IDFweDtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5wbGF5ZXItYm9hcmQ6OmJlZm9yZSxcXG4uY29tcHV0ZXItYm9hcmQ6OmJlZm9yZSB7XFxuXFx0Zm9udC1zaXplOiAxLjVyZW07XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdHRvcDogLTMuNXJlbTtcXG5cXHRsZWZ0OiA1MCU7XFxuXFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xcbn1cXG5cXG4ucGxheWVyLWJvYXJkOjpiZWZvcmUge1xcblxcdGNvbnRlbnQ6ICdZb3VyIGJvYXJkJztcXG59XFxuXFxuLmNvbXB1dGVyLWJvYXJkOjpiZWZvcmUge1xcblxcdGNvbnRlbnQ6ICdFbmVteSBib2FyZCc7XFxufVxcblxcbi5jZWxsIHtcXG5cXHRvdXRsaW5lOiAxcHggc29saWQgI2ExYTFhYTtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0d2lkdGg6IDQwcHg7XFxuXFx0aGVpZ2h0OiA0MHB4O1xcbn1cXG5cXG4uc2hpcC1ob3ZlciB7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogIzFmMjkzNztcXG59XFxuXFxuLmNlbGwuc2hpcC1ob3Zlci1lcnJvciB7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogI2ZiNzE4NTtcXG59XFxuXFxuLnNoaXAge1xcblxcdGJhY2tncm91bmQtY29sb3I6ICMxMTE4Mjc7XFxufVxcblxcbi5jZWxsLnNoaXA6OmJlZm9yZSB7XFxuXFx0Y29udGVudDogJ+KAoic7XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdHRvcDogNTAlO1xcblxcdGxlZnQ6IDUwJTtcXG5cXHR0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG5cXHR0ZXh0LWFsaWduOiBjZW50ZXI7XFxuXFx0Zm9udC1zaXplOiAycmVtO1xcbn1cXG5cXG4uY2VsbC5oaXQge1xcblxcdGJhY2tncm91bmQtY29sb3I6ICNiOTFjMWM7XFxuXFx0Y3Vyc29yOiBub3QtYWxsb3dlZDtcXG59XFxuXFxuLmNlbGwuaGl0OjpiZWZvcmUge1xcblxcdGNvbnRlbnQ6ICfinJcnO1xcblxcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXHR0b3A6IDUwJTtcXG5cXHRsZWZ0OiA1MCU7XFxuXFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdGZvbnQtc2l6ZTogMnJlbTtcXG59XFxuXFxuLmNlbGwubWlzcyB7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogIzZiNzI4MDtcXG5cXHRjdXJzb3I6IG5vdC1hbGxvd2VkO1xcbn1cXG5cXG4jZW5kLWdhbWUtbW9kYWwge1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG5cXHRwYWRkaW5nOiAxLjVyZW07XFxuXFx0Ym9yZGVyOiAycHggc29saWQgYmxhY2s7XFxuXFx0Z2FwOiAwLjVyZW07XFxufVxcblxcbiNlbmQtZ2FtZS1tb2RhbDo6YmFja2Ryb3Age1xcblxcdGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC42KTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcmVzZXQuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9yZXNldC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3N0eWxlcy9zdHlsZS5jc3MnO1xuaW1wb3J0ICcuL3N0eWxlcy9yZXNldC5jc3MnO1xuaW1wb3J0IFVJQ29udHJvbGxlciBmcm9tICcuL21vZHVsZXMvY29udHJvbGxlcnMvdWktY29udHJvbGxlcic7XG5cblVJQ29udHJvbGxlcigpO1xuIl0sIm5hbWVzIjpbIlNoaXAiLCJQbGF5ZXIiLCJGTEVFVCIsIkNhcnJpZXIiLCJCYXR0bGVzaGlwIiwiRGVzdHJveWVyIiwiU3VibWFyaW5lIiwiUGF0cm9sQm9hdCIsImdhbWVDb250cm9sbGVyIiwicGxheWVyIiwiY29tcHV0ZXIiLCJwbGF5ZXJTaGlwcyIsIk9iamVjdCIsInZhbHVlcyIsIm1hcCIsImxlbmd0aCIsImNoZWNrRm9yV2luIiwiZ2V0Qm9hcmQiLCJhbGxTaGlwc1N1bmsiLCJnZXRXaW5uZXJOYW1lIiwiZ2V0TmFtZSIsInBsYXlSb3VuZCIsInJvd1BvcyIsImNvbFBvcyIsImlzUG9zSGl0IiwiYXR0YWNrUG9zIiwiYXV0b0F0dGFja1BvcyIsInBsYWNlU2hpcHNSYW5kb21seSIsImZvckVhY2giLCJzaGlwTGVuZ3RoIiwibmV3U2hpcCIsInBsYWNlZCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImlzVmVydGljYWwiLCJwbGFjZVNoaXAiLCJwbGFjZVNoaXBzIiwic2hpZnQiLCJ1bnNoaWZ0IiwicmVzdGFydEdhbWUiLCJyZXNldEJvYXJkIiwiZ2V0UGxheWVyIiwiZ2V0Q29tcHV0ZXIiLCJnZXRDdXJyZW50U2hpcCIsImFyZVBsYXllclNoaXBzRW1wdHkiLCJ1aUhlbHBlcnMiLCJVSUNvbnRyb2xsZXIiLCJnYW1lIiwic2V0dXBCb2FyZENvbnRhaW5lckVsZW1lbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzZXR1cEJvYXJkRWxlbWVudCIsInBsYXllckJvYXJkRWxlbWVudCIsImNvbXB1dGVyQm9hcmRFbGVtZW50IiwicmVzdGFydEdhbWVCdG4iLCJpbml0SW50ZXJmYWNlIiwiZ2VuZXJhdGVCb2FyZCIsImhpZGVCb2FyZCIsInNob3dQbGF5ZXJCb2FyZHMiLCJoaWRlRWxlbWVudCIsInNob3dTaGlwcyIsImhhbmRsZUNlbGxDbGljayIsImV2ZW50IiwidGFyZ2V0IiwibWF0Y2hlcyIsImdldENlbGxDb29yZHMiLCJzaG93RW5kR2FtZU1vZGFsIiwidXBkYXRlQm9hcmRzIiwiaGFuZGxlU2hpcFBsYWNlbWVudCIsImhhbmRsZVJlc3RhcnRHYW1lIiwiaGlkZUVuZEdhbWVNb2RhbCIsImNsZWFyQm9hcmQiLCJoYW5kbGVTaGlwSG92ZXIiLCJpc0xlZ2FsUGxhY2VtZW50IiwiZ2V0TGVuZ3RoIiwiaGlnaGxpZ2h0U2hpcEhvdmVyIiwiaGFuZGxlU2hpcE91dCIsImNsZWFyU2hpcEhvdmVyIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXkiLCJwcmV2ZW50RGVmYXVsdCIsInNldHVwQm9hcmRMaXN0ZW5lciIsImNvbXB1dGVyQm9hcmRMaXN0ZW5lciIsInJlc3RhcnRHYW1lTGlzdGVuZXIiLCJjZWxsIiwiZGF0YXNldCIsImNvb3JkcyIsInNwbGl0IiwiY29vcmRTdHIiLCJOdW1iZXIiLCJnZXRDZWxsRWxlbWVudCIsImJvYXJkIiwiY2hpbGRyZW4iLCJmaW5kIiwiYm9hcmRFbGVtZW50IiwiaSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDaGlsZCIsImlzUG9zU2hpcCIsImlzRXJyb3IiLCJjbGFzc05hbWUiLCJlbGVtZW50IiwicmVtb3ZlIiwidXBkYXRlQm9hcmQiLCJpc0hpdCIsImlzU2hpcCIsIndpbm5lciIsImVuZEdhbWVNb2RhbCIsIndpbm5lck5hbWUiLCJ0ZXh0Q29udGVudCIsInNob3dNb2RhbCIsImNsb3NlIiwiZWwiLCJoaWRlIiwic3R5bGUiLCJkaXNwbGF5IiwiR2FtZWJvYXJkIiwicm93U2l6ZSIsImNvbFNpemUiLCJpbml0Qm9hcmQiLCJyb3dzIiwiY29scyIsIkFycmF5Iiwic2hpcCIsInNoaXBzIiwiZXZlcnkiLCJpc1N1bmsiLCJpc1Bvc0luQm9hcmQiLCJyZWNlaXZlQXR0YWNrIiwiaGl0IiwiZ2VuZXJhdGVTaGlwUG9zaXRpb25zIiwic2hpcFBvc2l0aW9ucyIsInB1c2giLCJhbGxQb3NpdGlvbnNJbkJvYXJkIiwieCIsInkiLCJzaGlwT3ZlcmxhcCIsInNvbWUiLCJuYW1lIiwiZW5lbXlCb2FyZCIsImdldFJhbmRvbUNvb3JkcyIsInJhbmRvbUNvb3JkcyIsInRpbWVzSGl0Il0sInNvdXJjZVJvb3QiOiIifQ==