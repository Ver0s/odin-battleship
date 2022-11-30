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
/* harmony import */ var _ui_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui-helpers */ "./src/modules/controllers/ui-helpers.js");



var FLEET = {
  Carrier: 5,
  Battleship: 4,
  Destroyer: 3,
  Submarine: 3,
  PatrolBoat: 2
};
var gameController = function gameController() {
  var player = (0,_factories_player__WEBPACK_IMPORTED_MODULE_1__["default"])('Player');
  var computer = (0,_factories_player__WEBPACK_IMPORTED_MODULE_1__["default"])('Computer');
  var playerShips = [(0,_factories_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(5), (0,_factories_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(4), (0,_factories_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(3), (0,_factories_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(3), (0,_factories_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(2)];
  var checkForWin = function checkForWin() {
    return player.getBoard().allShipsSunk() || computer.getBoard().allShipsSunk();
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
      while (true) {
        if (computer.getBoard().placeShip(newShip, Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.random() < 0.5)) break;
      }
    });
  };
  placeShipsRandomly();
  var placeShips = function placeShips(rowPos, colPos, isVertical) {
    if (!playerShips.length) return;
    // REFACTOR THIS TO OPERATE ON THE END OF ARRAY AND NOT THE BEGGINING
    var newShip = playerShips.shift();
    if (!player.getBoard().placeShip(newShip, rowPos, colPos, isVertical)) {
      playerShips.unshift(newShip);
    }
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
  return {
    playRound: playRound,
    getPlayer: getPlayer,
    getComputer: getComputer,
    placeShips: placeShips,
    getCurrentShip: getCurrentShip,
    arePlayerShipsEmpty: arePlayerShipsEmpty
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
  _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.generateBoard(setupBoardElement);
  var playerBoardElement = document.querySelector('.player-board');
  var computerBoardElement = document.querySelector('.computer-board');
  var showPlayerBoards = function showPlayerBoards() {
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.hideElement(setupBoardContainerElement);
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.generateBoard(playerBoardElement);
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.generateBoard(computerBoardElement);
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.showShips(game.getPlayer().getBoard(), playerBoardElement);
  };
  var handleCellClick = function handleCellClick(e) {
    var target = e.target;
    if (target.matches('.cell')) {
      var _uiHelpers$getCellCoo = _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.getCellCoords(target),
        _uiHelpers$getCellCoo2 = _slicedToArray(_uiHelpers$getCellCoo, 2),
        rowPos = _uiHelpers$getCellCoo2[0],
        colPos = _uiHelpers$getCellCoo2[1];
      game.playRound(rowPos, colPos);
      _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.updateBoards(game.getPlayer(), game.getComputer());
    }
  };
  var handleShipPlacement = function handleShipPlacement(e) {
    var target = e.target;
    if (target.matches('.cell')) {
      var _uiHelpers$getCellCoo3 = _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.getCellCoords(target),
        _uiHelpers$getCellCoo4 = _slicedToArray(_uiHelpers$getCellCoo3, 2),
        rowPos = _uiHelpers$getCellCoo4[0],
        colPos = _uiHelpers$getCellCoo4[1];
      game.placeShips(rowPos, colPos, isVertical);
      _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.showShips(game.getPlayer().getBoard(), setupBoardElement);
      if (game.arePlayerShipsEmpty()) showPlayerBoards();
    }
  };
  setupBoardElement.addEventListener('click', handleShipPlacement);
  setupBoardElement.addEventListener('mouseover', function (e) {
    var target = e.target;
    if (target.matches('.cell')) {
      var _uiHelpers$getCellCoo5 = _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.getCellCoords(target),
        _uiHelpers$getCellCoo6 = _slicedToArray(_uiHelpers$getCellCoo5, 2),
        rowPos = _uiHelpers$getCellCoo6[0],
        colPos = _uiHelpers$getCellCoo6[1];
      if (!game.getPlayer().getBoard().isLegalPlacement(rowPos, colPos, game.getCurrentShip().getLength(), isVertical)) {
        _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.highlightShipHoverError(setupBoardElement, target, game.getCurrentShip().getLength(), isVertical);
        return;
      }
      _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.highlightShipHover(setupBoardElement, target, game.getCurrentShip().getLength(), isVertical);
    }
  });
  computerBoardElement.addEventListener('click', handleCellClick);
  setupBoardElement.addEventListener('mouseout', function () {
    _ui_helpers__WEBPACK_IMPORTED_MODULE_1__.clearShipHover(setupBoardElement);
  });
  window.addEventListener('keydown', function (e) {
    if (e.key === 'r') {
      isVertical = !isVertical;
    }
  });
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
/* harmony export */   "clearShipHover": () => (/* binding */ clearShipHover),
/* harmony export */   "generateBoard": () => (/* binding */ generateBoard),
/* harmony export */   "getCellCoords": () => (/* binding */ getCellCoords),
/* harmony export */   "getCellElement": () => (/* binding */ getCellElement),
/* harmony export */   "hideElement": () => (/* binding */ hideElement),
/* harmony export */   "highlightShipHover": () => (/* binding */ highlightShipHover),
/* harmony export */   "highlightShipHoverError": () => (/* binding */ highlightShipHoverError),
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
  var _getCellCoords3 = getCellCoords(cell),
    _getCellCoords4 = _slicedToArray(_getCellCoords3, 2),
    rowPos = _getCellCoords4[0],
    colPos = _getCellCoords4[1];
  if (isVertical) {
    for (var i = 0; i < shipLength; i++) {
      getCellElement(board, rowPos + i, colPos).classList.add('ship-hover');
    }
  } else {
    for (var _i2 = 0; _i2 < shipLength; _i2++) {
      getCellElement(board, rowPos, colPos + _i2).classList.add('ship-hover');
    }
  }
};
var highlightShipHoverError = function highlightShipHoverError(board, cell, shipLength, isVertical) {
  var _getCellCoords5 = getCellCoords(cell),
    _getCellCoords6 = _slicedToArray(_getCellCoords5, 2),
    rowPos = _getCellCoords6[0],
    colPos = _getCellCoords6[1];
  if (isVertical) {
    for (var i = 0; i < shipLength; i++) {
      var _getCellElement;
      (_getCellElement = getCellElement(board, rowPos + i, colPos)) === null || _getCellElement === void 0 ? void 0 : _getCellElement.classList.add('ship-hover-error');
    }
  } else {
    for (var _i3 = 0; _i3 < shipLength; _i3++) {
      var _getCellElement2;
      (_getCellElement2 = getCellElement(board, rowPos, colPos + _i3)) === null || _getCellElement2 === void 0 ? void 0 : _getCellElement2.classList.add('ship-hover-error');
    }
  }
};
var clearShipHover = function clearShipHover(board) {
  _toConsumableArray(board.children).forEach(function (cell) {
    cell.classList.remove('ship-hover');
    cell.classList.remove('ship-hover-error');
  });
};
var updateBoards = function updateBoards(player, computer) {
  var playerBoardElement = document.querySelector('.player-board');
  var computerBoardElement = document.querySelector('.computer-board');
  _toConsumableArray(playerBoardElement.children).forEach(function (cell) {
    var _getCellCoords7 = getCellCoords(cell),
      _getCellCoords8 = _slicedToArray(_getCellCoords7, 2),
      rowPos = _getCellCoords8[0],
      colPos = _getCellCoords8[1];
    if (player.getBoard().isPosShip(rowPos, colPos) && player.getBoard().isPosHit(rowPos, colPos)) {
      cell.classList.add('hit');
    }
    if (!player.getBoard().isPosShip(rowPos, colPos) && player.getBoard().isPosHit(rowPos, colPos)) {
      cell.classList.add('miss');
    }
  });
  _toConsumableArray(computerBoardElement.children).forEach(function (cell) {
    var _getCellCoords9 = getCellCoords(cell),
      _getCellCoords10 = _slicedToArray(_getCellCoords9, 2),
      rowPos = _getCellCoords10[0],
      colPos = _getCellCoords10[1];
    if (computer.getBoard().isPosShip(rowPos, colPos) && computer.getBoard().isPosHit(rowPos, colPos)) {
      cell.classList.add('hit');
    }
    if (!computer.getBoard().isPosShip(rowPos, colPos) && computer.getBoard().isPosHit(rowPos, colPos)) {
      cell.classList.add('miss');
    }
  });
};
var hideElement = function hideElement(el) {
  el.style.display = 'none';
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
var Gameboard = function Gameboard(rowSize, colSize) {
  var initBoard = function initBoard(rows, cols) {
    var board = [];
    for (var i = 0; i < rows; i++) {
      board[i] = [];
      for (var j = 0; j < cols; j++) {
        board[i][j] = {
          ship: null,
          isHit: false
        };
      }
    }
    return board;
  };
  var board = initBoard(10, 10);
  var ships = [];
  var getBoard = function getBoard() {
    return board;
  };
  var allShipsSunk = function allShipsSunk() {
    return ships.every(function (ship) {
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
    var allPositionsInBoard = shipPositions.every(function (pos) {
      return isPosInBoard(pos[0], pos[1]);
    });
    if (!allPositionsInBoard) return false;
    var shipOverlap = shipPositions.some(function (pos) {
      return isPosShip(pos[0], pos[1]);
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
  return {
    getBoard: getBoard,
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    allShipsSunk: allShipsSunk,
    isPosShip: isPosShip,
    isPosHit: isPosHit,
    isLegalPlacement: isLegalPlacement
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
    while (true) {
      var randomCoords = getRandomCoords();
      if (!enemyBoard.isPosHit(randomCoords[0], randomCoords[1])) {
        enemyBoard.receiveAttack(randomCoords[0], randomCoords[1]);
        break;
      }
    }
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
___CSS_LOADER_EXPORT___.push([module.id, "/* https://www.joshwcomeau.com/css/custom-css-reset/ */\n*,\n*::before,\n*::after {\n\tbox-sizing: border-box;\n}\n* {\n\tmargin: 0;\n\tpadding: 0;\n}\nhtml,\nbody {\n\theight: 100%;\n}\nbody {\n\tline-height: 1.5;\n\t-webkit-font-smoothing: antialiased;\n}\nimg,\npicture,\nvideo,\ncanvas,\nsvg {\n\tdisplay: block;\n\tmax-width: 100%;\n}\ninput,\nbutton,\ntextarea,\nselect {\n\tfont: inherit;\n}\np,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n\toverflow-wrap: break-word;\n}\n", "",{"version":3,"sources":["webpack://./src/styles/reset.css"],"names":[],"mappings":"AAAA,sDAAsD;AACtD;;;CAGC,sBAAsB;AACvB;AACA;CACC,SAAS;CACT,UAAU;AACX;AACA;;CAEC,YAAY;AACb;AACA;CACC,gBAAgB;CAChB,mCAAmC;AACpC;AACA;;;;;CAKC,cAAc;CACd,eAAe;AAChB;AACA;;;;CAIC,aAAa;AACd;AACA;;;;;;;CAOC,yBAAyB;AAC1B","sourcesContent":["/* https://www.joshwcomeau.com/css/custom-css-reset/ */\n*,\n*::before,\n*::after {\n\tbox-sizing: border-box;\n}\n* {\n\tmargin: 0;\n\tpadding: 0;\n}\nhtml,\nbody {\n\theight: 100%;\n}\nbody {\n\tline-height: 1.5;\n\t-webkit-font-smoothing: antialiased;\n}\nimg,\npicture,\nvideo,\ncanvas,\nsvg {\n\tdisplay: block;\n\tmax-width: 100%;\n}\ninput,\nbutton,\ntextarea,\nselect {\n\tfont: inherit;\n}\np,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n\toverflow-wrap: break-word;\n}\n"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.id, ".boards-container {\n\tdisplay: flex;\n\theight: 100%;\n\tjustify-content: center;\n\talign-items: center;\n\tgap: 4rem;\n}\n\n.player-board,\n.computer-board,\n.setup-board {\n\tdisplay: grid;\n\tgrid-template-columns: repeat(10, auto);\n\tgrid-template-rows: repeat(10, auto);\n\tgap: 1px;\n}\n\n.cell {\n\toutline: 1px solid black;\n\tposition: relative;\n\twidth: 40px;\n\theight: 40px;\n}\n\n.ship-hover {\n\tbackground-color: rgb(171, 134, 255);\n}\n\n.ship-hover-error {\n\tbackground-color: rgb(233, 68, 68);\n}\n\n.ship {\n\tbackground-color: rgb(119, 61, 255);\n}\n\n.cell.ship::before {\n\tcontent: '•';\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\ttransform: translate(-50%, -50%);\n\ttext-align: center;\n\tfont-size: 2rem;\n}\n\n.cell.hit {\n\tbackground-color: rgb(255, 61, 61);\n\tcursor: not-allowed;\n}\n\n.cell.hit::before {\n\tcontent: '✗';\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\ttransform: translate(-50%, -50%);\n\ttext-align: center;\n\tfont-size: 2rem;\n}\n\n.cell.miss {\n\tbackground-color: rgb(144, 137, 137);\n\tcursor: not-allowed;\n}\n", "",{"version":3,"sources":["webpack://./src/styles/style.css"],"names":[],"mappings":"AAAA;CACC,aAAa;CACb,YAAY;CACZ,uBAAuB;CACvB,mBAAmB;CACnB,SAAS;AACV;;AAEA;;;CAGC,aAAa;CACb,uCAAuC;CACvC,oCAAoC;CACpC,QAAQ;AACT;;AAEA;CACC,wBAAwB;CACxB,kBAAkB;CAClB,WAAW;CACX,YAAY;AACb;;AAEA;CACC,oCAAoC;AACrC;;AAEA;CACC,kCAAkC;AACnC;;AAEA;CACC,mCAAmC;AACpC;;AAEA;CACC,YAAY;CACZ,kBAAkB;CAClB,QAAQ;CACR,SAAS;CACT,gCAAgC;CAChC,kBAAkB;CAClB,eAAe;AAChB;;AAEA;CACC,kCAAkC;CAClC,mBAAmB;AACpB;;AAEA;CACC,YAAY;CACZ,kBAAkB;CAClB,QAAQ;CACR,SAAS;CACT,gCAAgC;CAChC,kBAAkB;CAClB,eAAe;AAChB;;AAEA;CACC,oCAAoC;CACpC,mBAAmB;AACpB","sourcesContent":[".boards-container {\n\tdisplay: flex;\n\theight: 100%;\n\tjustify-content: center;\n\talign-items: center;\n\tgap: 4rem;\n}\n\n.player-board,\n.computer-board,\n.setup-board {\n\tdisplay: grid;\n\tgrid-template-columns: repeat(10, auto);\n\tgrid-template-rows: repeat(10, auto);\n\tgap: 1px;\n}\n\n.cell {\n\toutline: 1px solid black;\n\tposition: relative;\n\twidth: 40px;\n\theight: 40px;\n}\n\n.ship-hover {\n\tbackground-color: rgb(171, 134, 255);\n}\n\n.ship-hover-error {\n\tbackground-color: rgb(233, 68, 68);\n}\n\n.ship {\n\tbackground-color: rgb(119, 61, 255);\n}\n\n.cell.ship::before {\n\tcontent: '•';\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\ttransform: translate(-50%, -50%);\n\ttext-align: center;\n\tfont-size: 2rem;\n}\n\n.cell.hit {\n\tbackground-color: rgb(255, 61, 61);\n\tcursor: not-allowed;\n}\n\n.cell.hit::before {\n\tcontent: '✗';\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\ttransform: translate(-50%, -50%);\n\ttext-align: center;\n\tfont-size: 2rem;\n}\n\n.cell.miss {\n\tbackground-color: rgb(144, 137, 137);\n\tcursor: not-allowed;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHLENBQUk7O0FBRWpGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDWGE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0RBQWtEO0FBQ2xEOztBQUVBO0FBQ0EsMENBQTBDO0FBQzFDOztBQUVBOztBQUVBO0FBQ0EsaUZBQWlGO0FBQ2pGOztBQUVBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBOztBQUVBO0FBQ0EseURBQXlEO0FBQ3pELElBQUk7O0FBRUo7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3JFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7VUNmQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7Ozs7QUNBNEI7QUFDQTtBQUNtQztBQUUvRHlDLDhFQUFZLEVBQUUsQyIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2NvbnRyb2xsZXJzL2dhbWUtY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9jb250cm9sbGVycy91aS1jb250cm9sbGVyLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2NvbnRyb2xsZXJzL3VpLWhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZmFjdG9yaWVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9mYWN0b3JpZXMvcGxheWVyLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2ZhY3Rvcmllcy9zaGlwLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvcmVzZXQuY3NzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvc3R5bGUuY3NzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9yZXNldC5jc3M/NGNmYiIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3N0eWxlLmNzcz9mZjk0Iiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGlwIGZyb20gJy4uL2ZhY3Rvcmllcy9zaGlwJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi4vZmFjdG9yaWVzL3BsYXllcic7XG5pbXBvcnQgKiBhcyB1aUhlbHBlcnMgZnJvbSAnLi91aS1oZWxwZXJzJztcblxuY29uc3QgRkxFRVQgPSB7XG5cdENhcnJpZXI6IDUsXG5cdEJhdHRsZXNoaXA6IDQsXG5cdERlc3Ryb3llcjogMyxcblx0U3VibWFyaW5lOiAzLFxuXHRQYXRyb2xCb2F0OiAyLFxufTtcblxuY29uc3QgZ2FtZUNvbnRyb2xsZXIgPSAoKSA9PiB7XG5cdGNvbnN0IHBsYXllciA9IFBsYXllcignUGxheWVyJyk7XG5cdGNvbnN0IGNvbXB1dGVyID0gUGxheWVyKCdDb21wdXRlcicpO1xuXHRjb25zdCBwbGF5ZXJTaGlwcyA9IFtTaGlwKDUpLCBTaGlwKDQpLCBTaGlwKDMpLCBTaGlwKDMpLCBTaGlwKDIpXTtcblxuXHRjb25zdCBjaGVja0ZvcldpbiA9ICgpID0+XG5cdFx0cGxheWVyLmdldEJvYXJkKCkuYWxsU2hpcHNTdW5rKCkgfHwgY29tcHV0ZXIuZ2V0Qm9hcmQoKS5hbGxTaGlwc1N1bmsoKTtcblxuXHRjb25zdCBwbGF5Um91bmQgPSAocm93UG9zLCBjb2xQb3MpID0+IHtcblx0XHRpZiAoY29tcHV0ZXIuZ2V0Qm9hcmQoKS5pc1Bvc0hpdChyb3dQb3MsIGNvbFBvcykpIHJldHVybjtcblx0XHRpZiAoY2hlY2tGb3JXaW4oKSkgcmV0dXJuO1xuXG5cdFx0cGxheWVyLmF0dGFja1Bvcyhyb3dQb3MsIGNvbFBvcywgY29tcHV0ZXIuZ2V0Qm9hcmQoKSk7XG5cblx0XHRpZiAoIWNoZWNrRm9yV2luKCkpIHtcblx0XHRcdGNvbXB1dGVyLmF1dG9BdHRhY2tQb3MocGxheWVyLmdldEJvYXJkKCkpO1xuXHRcdH1cblx0fTtcblxuXHRjb25zdCBwbGFjZVNoaXBzUmFuZG9tbHkgPSAoKSA9PiB7XG5cdFx0T2JqZWN0LnZhbHVlcyhGTEVFVCkuZm9yRWFjaCgoc2hpcExlbmd0aCkgPT4ge1xuXHRcdFx0Y29uc3QgbmV3U2hpcCA9IFNoaXAoc2hpcExlbmd0aCk7XG5cblx0XHRcdHdoaWxlICh0cnVlKSB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRjb21wdXRlclxuXHRcdFx0XHRcdFx0LmdldEJvYXJkKClcblx0XHRcdFx0XHRcdC5wbGFjZVNoaXAoXG5cdFx0XHRcdFx0XHRcdG5ld1NoaXAsXG5cdFx0XHRcdFx0XHRcdE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSxcblx0XHRcdFx0XHRcdFx0TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApLFxuXHRcdFx0XHRcdFx0XHRNYXRoLnJhbmRvbSgpIDwgMC41XG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdClcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9KTtcblx0fTtcblx0cGxhY2VTaGlwc1JhbmRvbWx5KCk7XG5cblx0Y29uc3QgcGxhY2VTaGlwcyA9IChyb3dQb3MsIGNvbFBvcywgaXNWZXJ0aWNhbCkgPT4ge1xuXHRcdGlmICghcGxheWVyU2hpcHMubGVuZ3RoKSByZXR1cm47XG5cdFx0Ly8gUkVGQUNUT1IgVEhJUyBUTyBPUEVSQVRFIE9OIFRIRSBFTkQgT0YgQVJSQVkgQU5EIE5PVCBUSEUgQkVHR0lOSU5HXG5cdFx0Y29uc3QgbmV3U2hpcCA9IHBsYXllclNoaXBzLnNoaWZ0KCk7XG5cblx0XHRpZiAoIXBsYXllci5nZXRCb2FyZCgpLnBsYWNlU2hpcChuZXdTaGlwLCByb3dQb3MsIGNvbFBvcywgaXNWZXJ0aWNhbCkpIHtcblx0XHRcdHBsYXllclNoaXBzLnVuc2hpZnQobmV3U2hpcCk7XG5cdFx0fVxuXHR9O1xuXG5cdGNvbnN0IGdldFBsYXllciA9ICgpID0+IHBsYXllcjtcblxuXHRjb25zdCBnZXRDb21wdXRlciA9ICgpID0+IGNvbXB1dGVyO1xuXG5cdGNvbnN0IGdldEN1cnJlbnRTaGlwID0gKCkgPT4gcGxheWVyU2hpcHNbMF07XG5cblx0Y29uc3QgYXJlUGxheWVyU2hpcHNFbXB0eSA9ICgpID0+IHBsYXllclNoaXBzLmxlbmd0aCA9PT0gMDtcblxuXHRyZXR1cm4ge1xuXHRcdHBsYXlSb3VuZCxcblx0XHRnZXRQbGF5ZXIsXG5cdFx0Z2V0Q29tcHV0ZXIsXG5cdFx0cGxhY2VTaGlwcyxcblx0XHRnZXRDdXJyZW50U2hpcCxcblx0XHRhcmVQbGF5ZXJTaGlwc0VtcHR5LFxuXHR9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZUNvbnRyb2xsZXI7XG4iLCJpbXBvcnQgZ2FtZUNvbnRyb2xsZXIgZnJvbSAnLi9nYW1lLWNvbnRyb2xsZXInO1xuaW1wb3J0ICogYXMgdWlIZWxwZXJzIGZyb20gJy4vdWktaGVscGVycyc7XG5cbmNvbnN0IFVJQ29udHJvbGxlciA9ICgpID0+IHtcblx0bGV0IGlzVmVydGljYWwgPSBmYWxzZTtcblx0Y29uc3QgZ2FtZSA9IGdhbWVDb250cm9sbGVyKCk7XG5cblx0Y29uc3Qgc2V0dXBCb2FyZENvbnRhaW5lckVsZW1lbnQgPVxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZXR1cC1jb250YWluZXInKTtcblx0Y29uc3Qgc2V0dXBCb2FyZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2V0dXAtYm9hcmQnKTtcblx0dWlIZWxwZXJzLmdlbmVyYXRlQm9hcmQoc2V0dXBCb2FyZEVsZW1lbnQpO1xuXHRjb25zdCBwbGF5ZXJCb2FyZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWJvYXJkJyk7XG5cdGNvbnN0IGNvbXB1dGVyQm9hcmRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbXB1dGVyLWJvYXJkJyk7XG5cblx0Y29uc3Qgc2hvd1BsYXllckJvYXJkcyA9ICgpID0+IHtcblx0XHR1aUhlbHBlcnMuaGlkZUVsZW1lbnQoc2V0dXBCb2FyZENvbnRhaW5lckVsZW1lbnQpO1xuXHRcdHVpSGVscGVycy5nZW5lcmF0ZUJvYXJkKHBsYXllckJvYXJkRWxlbWVudCk7XG5cdFx0dWlIZWxwZXJzLmdlbmVyYXRlQm9hcmQoY29tcHV0ZXJCb2FyZEVsZW1lbnQpO1xuXHRcdHVpSGVscGVycy5zaG93U2hpcHMoZ2FtZS5nZXRQbGF5ZXIoKS5nZXRCb2FyZCgpLCBwbGF5ZXJCb2FyZEVsZW1lbnQpO1xuXHR9O1xuXG5cdGNvbnN0IGhhbmRsZUNlbGxDbGljayA9IChlKSA9PiB7XG5cdFx0Y29uc3QgeyB0YXJnZXQgfSA9IGU7XG5cblx0XHRpZiAodGFyZ2V0Lm1hdGNoZXMoJy5jZWxsJykpIHtcblx0XHRcdGNvbnN0IFtyb3dQb3MsIGNvbFBvc10gPSB1aUhlbHBlcnMuZ2V0Q2VsbENvb3Jkcyh0YXJnZXQpO1xuXG5cdFx0XHRnYW1lLnBsYXlSb3VuZChyb3dQb3MsIGNvbFBvcyk7XG5cdFx0XHR1aUhlbHBlcnMudXBkYXRlQm9hcmRzKGdhbWUuZ2V0UGxheWVyKCksIGdhbWUuZ2V0Q29tcHV0ZXIoKSk7XG5cdFx0fVxuXHR9O1xuXG5cdGNvbnN0IGhhbmRsZVNoaXBQbGFjZW1lbnQgPSAoZSkgPT4ge1xuXHRcdGNvbnN0IHsgdGFyZ2V0IH0gPSBlO1xuXHRcdGlmICh0YXJnZXQubWF0Y2hlcygnLmNlbGwnKSkge1xuXHRcdFx0Y29uc3QgW3Jvd1BvcywgY29sUG9zXSA9IHVpSGVscGVycy5nZXRDZWxsQ29vcmRzKHRhcmdldCk7XG5cdFx0XHRnYW1lLnBsYWNlU2hpcHMocm93UG9zLCBjb2xQb3MsIGlzVmVydGljYWwpO1xuXHRcdFx0dWlIZWxwZXJzLnNob3dTaGlwcyhnYW1lLmdldFBsYXllcigpLmdldEJvYXJkKCksIHNldHVwQm9hcmRFbGVtZW50KTtcblxuXHRcdFx0aWYgKGdhbWUuYXJlUGxheWVyU2hpcHNFbXB0eSgpKSBzaG93UGxheWVyQm9hcmRzKCk7XG5cdFx0fVxuXHR9O1xuXG5cdHNldHVwQm9hcmRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlU2hpcFBsYWNlbWVudCk7XG5cblx0c2V0dXBCb2FyZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKGUpID0+IHtcblx0XHRjb25zdCB7IHRhcmdldCB9ID0gZTtcblx0XHRpZiAodGFyZ2V0Lm1hdGNoZXMoJy5jZWxsJykpIHtcblx0XHRcdGNvbnN0IFtyb3dQb3MsIGNvbFBvc10gPSB1aUhlbHBlcnMuZ2V0Q2VsbENvb3Jkcyh0YXJnZXQpO1xuXHRcdFx0aWYgKFxuXHRcdFx0XHQhZ2FtZVxuXHRcdFx0XHRcdC5nZXRQbGF5ZXIoKVxuXHRcdFx0XHRcdC5nZXRCb2FyZCgpXG5cdFx0XHRcdFx0LmlzTGVnYWxQbGFjZW1lbnQoXG5cdFx0XHRcdFx0XHRyb3dQb3MsXG5cdFx0XHRcdFx0XHRjb2xQb3MsXG5cdFx0XHRcdFx0XHRnYW1lLmdldEN1cnJlbnRTaGlwKCkuZ2V0TGVuZ3RoKCksXG5cdFx0XHRcdFx0XHRpc1ZlcnRpY2FsXG5cdFx0XHRcdFx0KVxuXHRcdFx0KSB7XG5cdFx0XHRcdHVpSGVscGVycy5oaWdobGlnaHRTaGlwSG92ZXJFcnJvcihcblx0XHRcdFx0XHRzZXR1cEJvYXJkRWxlbWVudCxcblx0XHRcdFx0XHR0YXJnZXQsXG5cdFx0XHRcdFx0Z2FtZS5nZXRDdXJyZW50U2hpcCgpLmdldExlbmd0aCgpLFxuXHRcdFx0XHRcdGlzVmVydGljYWxcblx0XHRcdFx0KTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1aUhlbHBlcnMuaGlnaGxpZ2h0U2hpcEhvdmVyKFxuXHRcdFx0XHRzZXR1cEJvYXJkRWxlbWVudCxcblx0XHRcdFx0dGFyZ2V0LFxuXHRcdFx0XHRnYW1lLmdldEN1cnJlbnRTaGlwKCkuZ2V0TGVuZ3RoKCksXG5cdFx0XHRcdGlzVmVydGljYWxcblx0XHRcdCk7XG5cdFx0fVxuXHR9KTtcblxuXHRjb21wdXRlckJvYXJkRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNlbGxDbGljayk7XG5cblx0c2V0dXBCb2FyZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG5cdFx0dWlIZWxwZXJzLmNsZWFyU2hpcEhvdmVyKHNldHVwQm9hcmRFbGVtZW50KTtcblx0fSk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuXHRcdGlmIChlLmtleSA9PT0gJ3InKSB7XG5cdFx0XHRpc1ZlcnRpY2FsID0gIWlzVmVydGljYWw7XG5cdFx0fVxuXHR9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJQ29udHJvbGxlcjtcbiIsImV4cG9ydCBjb25zdCBnZXRDZWxsQ29vcmRzID0gKGNlbGwpID0+XG5cdGNlbGwuZGF0YXNldC5jb29yZHMuc3BsaXQoJycpLm1hcCgoY29vcmRTdHIpID0+IE51bWJlcihjb29yZFN0cikpO1xuXG5leHBvcnQgY29uc3QgZ2V0Q2VsbEVsZW1lbnQgPSAoYm9hcmQsIHJvd1BvcywgY29sUG9zKSA9PlxuXHRbLi4uYm9hcmQuY2hpbGRyZW5dLmZpbmQoXG5cdFx0KGNlbGwpID0+IGNlbGwuZGF0YXNldC5jb29yZHMgPT09IGAke3Jvd1Bvc30ke2NvbFBvc31gXG5cdCk7XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUJvYXJkID0gKGJvYXJkRWxlbWVudCkgPT4ge1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG5cdFx0Y29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xuXHRcdGNlbGwuZGF0YXNldC5jb29yZHMgPSBpIDwgMTAgPyBgMCR7aX1gIDogaTtcblx0XHRib2FyZEVsZW1lbnQuYXBwZW5kQ2hpbGQoY2VsbCk7XG5cdH1cbn07XG5cbmV4cG9ydCBjb25zdCBzaG93U2hpcHMgPSAoYm9hcmQsIGJvYXJkRWxlbWVudCkgPT4ge1xuXHRbLi4uYm9hcmRFbGVtZW50LmNoaWxkcmVuXS5mb3JFYWNoKChjZWxsKSA9PiB7XG5cdFx0Y29uc3QgW3Jvd1BvcywgY29sUG9zXSA9IGdldENlbGxDb29yZHMoY2VsbCk7XG5cblx0XHRpZiAoYm9hcmQuaXNQb3NTaGlwKHJvd1BvcywgY29sUG9zKSkge1xuXHRcdFx0Y2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG5cdFx0fVxuXHR9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBoaWdobGlnaHRTaGlwSG92ZXIgPSAoYm9hcmQsIGNlbGwsIHNoaXBMZW5ndGgsIGlzVmVydGljYWwpID0+IHtcblx0Y29uc3QgW3Jvd1BvcywgY29sUG9zXSA9IGdldENlbGxDb29yZHMoY2VsbCk7XG5cblx0aWYgKGlzVmVydGljYWwpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuXHRcdFx0Z2V0Q2VsbEVsZW1lbnQoYm9hcmQsIHJvd1BvcyArIGksIGNvbFBvcykuY2xhc3NMaXN0LmFkZChcblx0XHRcdFx0J3NoaXAtaG92ZXInXG5cdFx0XHQpO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuXHRcdFx0Z2V0Q2VsbEVsZW1lbnQoYm9hcmQsIHJvd1BvcywgY29sUG9zICsgaSkuY2xhc3NMaXN0LmFkZChcblx0XHRcdFx0J3NoaXAtaG92ZXInXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGNvbnN0IGhpZ2hsaWdodFNoaXBIb3ZlckVycm9yID0gKFxuXHRib2FyZCxcblx0Y2VsbCxcblx0c2hpcExlbmd0aCxcblx0aXNWZXJ0aWNhbFxuKSA9PiB7XG5cdGNvbnN0IFtyb3dQb3MsIGNvbFBvc10gPSBnZXRDZWxsQ29vcmRzKGNlbGwpO1xuXG5cdGlmIChpc1ZlcnRpY2FsKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcblx0XHRcdGdldENlbGxFbGVtZW50KGJvYXJkLCByb3dQb3MgKyBpLCBjb2xQb3MpPy5jbGFzc0xpc3QuYWRkKFxuXHRcdFx0XHQnc2hpcC1ob3Zlci1lcnJvcidcblx0XHRcdCk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG5cdFx0XHRnZXRDZWxsRWxlbWVudChib2FyZCwgcm93UG9zLCBjb2xQb3MgKyBpKT8uY2xhc3NMaXN0LmFkZChcblx0XHRcdFx0J3NoaXAtaG92ZXItZXJyb3InXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGNvbnN0IGNsZWFyU2hpcEhvdmVyID0gKGJvYXJkKSA9PiB7XG5cdFsuLi5ib2FyZC5jaGlsZHJlbl0uZm9yRWFjaCgoY2VsbCkgPT4ge1xuXHRcdGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcC1ob3ZlcicpO1xuXHRcdGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcC1ob3Zlci1lcnJvcicpO1xuXHR9KTtcbn07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVCb2FyZHMgPSAocGxheWVyLCBjb21wdXRlcikgPT4ge1xuXHRjb25zdCBwbGF5ZXJCb2FyZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWJvYXJkJyk7XG5cdGNvbnN0IGNvbXB1dGVyQm9hcmRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbXB1dGVyLWJvYXJkJyk7XG5cblx0Wy4uLnBsYXllckJvYXJkRWxlbWVudC5jaGlsZHJlbl0uZm9yRWFjaCgoY2VsbCkgPT4ge1xuXHRcdGNvbnN0IFtyb3dQb3MsIGNvbFBvc10gPSBnZXRDZWxsQ29vcmRzKGNlbGwpO1xuXG5cdFx0aWYgKFxuXHRcdFx0cGxheWVyLmdldEJvYXJkKCkuaXNQb3NTaGlwKHJvd1BvcywgY29sUG9zKSAmJlxuXHRcdFx0cGxheWVyLmdldEJvYXJkKCkuaXNQb3NIaXQocm93UG9zLCBjb2xQb3MpXG5cdFx0KSB7XG5cdFx0XHRjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuXHRcdH1cblx0XHRpZiAoXG5cdFx0XHQhcGxheWVyLmdldEJvYXJkKCkuaXNQb3NTaGlwKHJvd1BvcywgY29sUG9zKSAmJlxuXHRcdFx0cGxheWVyLmdldEJvYXJkKCkuaXNQb3NIaXQocm93UG9zLCBjb2xQb3MpXG5cdFx0KSB7XG5cdFx0XHRjZWxsLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcblx0XHR9XG5cdH0pO1xuXG5cdFsuLi5jb21wdXRlckJvYXJkRWxlbWVudC5jaGlsZHJlbl0uZm9yRWFjaCgoY2VsbCkgPT4ge1xuXHRcdGNvbnN0IFtyb3dQb3MsIGNvbFBvc10gPSBnZXRDZWxsQ29vcmRzKGNlbGwpO1xuXG5cdFx0aWYgKFxuXHRcdFx0Y29tcHV0ZXIuZ2V0Qm9hcmQoKS5pc1Bvc1NoaXAocm93UG9zLCBjb2xQb3MpICYmXG5cdFx0XHRjb21wdXRlci5nZXRCb2FyZCgpLmlzUG9zSGl0KHJvd1BvcywgY29sUG9zKVxuXHRcdCkge1xuXHRcdFx0Y2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcblx0XHR9XG5cdFx0aWYgKFxuXHRcdFx0IWNvbXB1dGVyLmdldEJvYXJkKCkuaXNQb3NTaGlwKHJvd1BvcywgY29sUG9zKSAmJlxuXHRcdFx0Y29tcHV0ZXIuZ2V0Qm9hcmQoKS5pc1Bvc0hpdChyb3dQb3MsIGNvbFBvcylcblx0XHQpIHtcblx0XHRcdGNlbGwuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuXHRcdH1cblx0fSk7XG59O1xuXG5leHBvcnQgY29uc3QgaGlkZUVsZW1lbnQgPSAoZWwpID0+IHtcblx0ZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn07XG4iLCJjb25zdCBHYW1lYm9hcmQgPSAocm93U2l6ZSwgY29sU2l6ZSkgPT4ge1xuXHRjb25zdCBpbml0Qm9hcmQgPSAocm93cywgY29scykgPT4ge1xuXHRcdGNvbnN0IGJvYXJkID0gW107XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByb3dzOyBpKyspIHtcblx0XHRcdGJvYXJkW2ldID0gW107XG5cdFx0XHRmb3IgKGxldCBqID0gMDsgaiA8IGNvbHM7IGorKykge1xuXHRcdFx0XHRib2FyZFtpXVtqXSA9IHsgc2hpcDogbnVsbCwgaXNIaXQ6IGZhbHNlIH07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBib2FyZDtcblx0fTtcblxuXHRjb25zdCBib2FyZCA9IGluaXRCb2FyZCgxMCwgMTApO1xuXG5cdGNvbnN0IHNoaXBzID0gW107XG5cblx0Y29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuXHRjb25zdCBhbGxTaGlwc1N1bmsgPSAoKSA9PiBzaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSk7XG5cblx0Y29uc3QgaXNQb3NJbkJvYXJkID0gKHJvd1BvcywgY29sUG9zKSA9PlxuXHRcdHJvd1BvcyA+PSAwICYmIHJvd1BvcyA8IHJvd1NpemUgJiYgY29sUG9zID49IDAgJiYgY29sUG9zIDwgY29sU2l6ZTtcblxuXHRjb25zdCBpc1Bvc0hpdCA9IChyb3dQb3MsIGNvbFBvcykgPT4gYm9hcmRbcm93UG9zXVtjb2xQb3NdLmlzSGl0ID09PSB0cnVlO1xuXG5cdGNvbnN0IGlzUG9zU2hpcCA9IChyb3dQb3MsIGNvbFBvcykgPT4gYm9hcmRbcm93UG9zXVtjb2xQb3NdLnNoaXA7XG5cblx0Y29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3dQb3MsIGNvbFBvcykgPT4ge1xuXHRcdGlmICghaXNQb3NJbkJvYXJkKHJvd1BvcywgY29sUG9zKSB8fCBpc1Bvc0hpdChyb3dQb3MsIGNvbFBvcykpIHJldHVybjtcblxuXHRcdGlmIChpc1Bvc1NoaXAocm93UG9zLCBjb2xQb3MpKSB7XG5cdFx0XHRib2FyZFtyb3dQb3NdW2NvbFBvc10uc2hpcC5oaXQoKTtcblx0XHR9XG5cblx0XHRib2FyZFtyb3dQb3NdW2NvbFBvc10uaXNIaXQgPSB0cnVlO1xuXHR9O1xuXG5cdGNvbnN0IGdlbmVyYXRlU2hpcFBvc2l0aW9ucyA9IChyb3dQb3MsIGNvbFBvcywgc2hpcExlbmd0aCwgaXNWZXJ0aWNhbCkgPT4ge1xuXHRcdGNvbnN0IHNoaXBQb3NpdGlvbnMgPSBbXTtcblxuXHRcdGlmIChpc1ZlcnRpY2FsKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuXHRcdFx0XHRzaGlwUG9zaXRpb25zLnB1c2goW3Jvd1BvcyArIGksIGNvbFBvc10pO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuXHRcdFx0XHRzaGlwUG9zaXRpb25zLnB1c2goW3Jvd1BvcywgY29sUG9zICsgaV0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBzaGlwUG9zaXRpb25zO1xuXHR9O1xuXG5cdGNvbnN0IGlzTGVnYWxQbGFjZW1lbnQgPSAocm93UG9zLCBjb2xQb3MsIHNoaXBMZW5ndGgsIGlzVmVydGljYWwpID0+IHtcblx0XHRjb25zdCBzaGlwUG9zaXRpb25zID0gZ2VuZXJhdGVTaGlwUG9zaXRpb25zKFxuXHRcdFx0cm93UG9zLFxuXHRcdFx0Y29sUG9zLFxuXHRcdFx0c2hpcExlbmd0aCxcblx0XHRcdGlzVmVydGljYWxcblx0XHQpO1xuXG5cdFx0Y29uc3QgYWxsUG9zaXRpb25zSW5Cb2FyZCA9IHNoaXBQb3NpdGlvbnMuZXZlcnkoKHBvcykgPT5cblx0XHRcdGlzUG9zSW5Cb2FyZChwb3NbMF0sIHBvc1sxXSlcblx0XHQpO1xuXHRcdGlmICghYWxsUG9zaXRpb25zSW5Cb2FyZCkgcmV0dXJuIGZhbHNlO1xuXG5cdFx0Y29uc3Qgc2hpcE92ZXJsYXAgPSBzaGlwUG9zaXRpb25zLnNvbWUoKHBvcykgPT5cblx0XHRcdGlzUG9zU2hpcChwb3NbMF0sIHBvc1sxXSlcblx0XHQpO1xuXG5cdFx0cmV0dXJuIGFsbFBvc2l0aW9uc0luQm9hcmQgJiYgIXNoaXBPdmVybGFwO1xuXHR9O1xuXG5cdGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwLCByb3dQb3MsIGNvbFBvcywgaXNWZXJ0aWNhbCkgPT4ge1xuXHRcdGlmICghaXNMZWdhbFBsYWNlbWVudChyb3dQb3MsIGNvbFBvcywgc2hpcC5nZXRMZW5ndGgoKSwgaXNWZXJ0aWNhbCkpXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHRpZiAoaXNWZXJ0aWNhbCkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmdldExlbmd0aCgpOyBpKyspIHtcblx0XHRcdFx0Ym9hcmRbcm93UG9zICsgaV1bY29sUG9zXS5zaGlwID0gc2hpcDtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmdldExlbmd0aCgpOyBpKyspIHtcblx0XHRcdFx0Ym9hcmRbcm93UG9zXVtjb2xQb3MgKyBpXS5zaGlwID0gc2hpcDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzaGlwcy5wdXNoKHNoaXApO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xuXG5cdHJldHVybiB7XG5cdFx0Z2V0Qm9hcmQsXG5cdFx0cGxhY2VTaGlwLFxuXHRcdHJlY2VpdmVBdHRhY2ssXG5cdFx0YWxsU2hpcHNTdW5rLFxuXHRcdGlzUG9zU2hpcCxcblx0XHRpc1Bvc0hpdCxcblx0XHRpc0xlZ2FsUGxhY2VtZW50LFxuXHR9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XG5cbmNvbnN0IFBsYXllciA9IChuYW1lKSA9PiB7XG5cdGNvbnN0IGJvYXJkID0gR2FtZWJvYXJkKDEwLCAxMCk7XG5cblx0Y29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG5cblx0Y29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuXHRjb25zdCBhdHRhY2tQb3MgPSAocm93UG9zLCBjb2xQb3MsIGVuZW15Qm9hcmQpID0+IHtcblx0XHRlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2socm93UG9zLCBjb2xQb3MpO1xuXHR9O1xuXG5cdGNvbnN0IGF1dG9BdHRhY2tQb3MgPSAoZW5lbXlCb2FyZCkgPT4ge1xuXHRcdGNvbnN0IGdldFJhbmRvbUNvb3JkcyA9ICgpID0+IFtcblx0XHRcdE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSxcblx0XHRcdE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSxcblx0XHRdO1xuXG5cdFx0d2hpbGUgKHRydWUpIHtcblx0XHRcdGNvbnN0IHJhbmRvbUNvb3JkcyA9IGdldFJhbmRvbUNvb3JkcygpO1xuXG5cdFx0XHRpZiAoIWVuZW15Qm9hcmQuaXNQb3NIaXQocmFuZG9tQ29vcmRzWzBdLCByYW5kb21Db29yZHNbMV0pKSB7XG5cdFx0XHRcdGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kb21Db29yZHNbMF0sIHJhbmRvbUNvb3Jkc1sxXSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdGF0dGFja1Bvcyxcblx0XHRnZXROYW1lLFxuXHRcdGdldEJvYXJkLFxuXHRcdGF1dG9BdHRhY2tQb3MsXG5cdH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJjb25zdCBTaGlwID0gKGxlbmd0aCkgPT4ge1xuXHRsZXQgdGltZXNIaXQgPSAwO1xuXG5cdGNvbnN0IGhpdCA9ICgpID0+IHtcblx0XHR0aW1lc0hpdCArPSAxO1xuXHR9O1xuXG5cdGNvbnN0IGlzU3VuayA9ICgpID0+IHRpbWVzSGl0ID49IGxlbmd0aDtcblxuXHRjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsZW5ndGg7XG5cblx0cmV0dXJuIHtcblx0XHRoaXQsXG5cdFx0aXNTdW5rLFxuXHRcdGdldExlbmd0aCxcblx0fTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHBzOi8vd3d3Lmpvc2h3Y29tZWF1LmNvbS9jc3MvY3VzdG9tLWNzcy1yZXNldC8gKi9cXG4qLFxcbio6OmJlZm9yZSxcXG4qOjphZnRlciB7XFxuXFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuKiB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxufVxcbmh0bWwsXFxuYm9keSB7XFxuXFx0aGVpZ2h0OiAxMDAlO1xcbn1cXG5ib2R5IHtcXG5cXHRsaW5lLWhlaWdodDogMS41O1xcblxcdC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcbn1cXG5pbWcsXFxucGljdHVyZSxcXG52aWRlbyxcXG5jYW52YXMsXFxuc3ZnIHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG5cXHRtYXgtd2lkdGg6IDEwMCU7XFxufVxcbmlucHV0LFxcbmJ1dHRvbixcXG50ZXh0YXJlYSxcXG5zZWxlY3Qge1xcblxcdGZvbnQ6IGluaGVyaXQ7XFxufVxcbnAsXFxuaDEsXFxuaDIsXFxuaDMsXFxuaDQsXFxuaDUsXFxuaDYge1xcblxcdG92ZXJmbG93LXdyYXA6IGJyZWFrLXdvcmQ7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvcmVzZXQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLHNEQUFzRDtBQUN0RDs7O0NBR0Msc0JBQXNCO0FBQ3ZCO0FBQ0E7Q0FDQyxTQUFTO0NBQ1QsVUFBVTtBQUNYO0FBQ0E7O0NBRUMsWUFBWTtBQUNiO0FBQ0E7Q0FDQyxnQkFBZ0I7Q0FDaEIsbUNBQW1DO0FBQ3BDO0FBQ0E7Ozs7O0NBS0MsY0FBYztDQUNkLGVBQWU7QUFDaEI7QUFDQTs7OztDQUlDLGFBQWE7QUFDZDtBQUNBOzs7Ozs7O0NBT0MseUJBQXlCO0FBQzFCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIGh0dHBzOi8vd3d3Lmpvc2h3Y29tZWF1LmNvbS9jc3MvY3VzdG9tLWNzcy1yZXNldC8gKi9cXG4qLFxcbio6OmJlZm9yZSxcXG4qOjphZnRlciB7XFxuXFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuKiB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxufVxcbmh0bWwsXFxuYm9keSB7XFxuXFx0aGVpZ2h0OiAxMDAlO1xcbn1cXG5ib2R5IHtcXG5cXHRsaW5lLWhlaWdodDogMS41O1xcblxcdC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcbn1cXG5pbWcsXFxucGljdHVyZSxcXG52aWRlbyxcXG5jYW52YXMsXFxuc3ZnIHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG5cXHRtYXgtd2lkdGg6IDEwMCU7XFxufVxcbmlucHV0LFxcbmJ1dHRvbixcXG50ZXh0YXJlYSxcXG5zZWxlY3Qge1xcblxcdGZvbnQ6IGluaGVyaXQ7XFxufVxcbnAsXFxuaDEsXFxuaDIsXFxuaDMsXFxuaDQsXFxuaDUsXFxuaDYge1xcblxcdG92ZXJmbG93LXdyYXA6IGJyZWFrLXdvcmQ7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi5ib2FyZHMtY29udGFpbmVyIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGhlaWdodDogMTAwJTtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHRhbGlnbi1pdGVtczogY2VudGVyO1xcblxcdGdhcDogNHJlbTtcXG59XFxuXFxuLnBsYXllci1ib2FyZCxcXG4uY29tcHV0ZXItYm9hcmQsXFxuLnNldHVwLWJvYXJkIHtcXG5cXHRkaXNwbGF5OiBncmlkO1xcblxcdGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCBhdXRvKTtcXG5cXHRncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgYXV0byk7XFxuXFx0Z2FwOiAxcHg7XFxufVxcblxcbi5jZWxsIHtcXG5cXHRvdXRsaW5lOiAxcHggc29saWQgYmxhY2s7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdHdpZHRoOiA0MHB4O1xcblxcdGhlaWdodDogNDBweDtcXG59XFxuXFxuLnNoaXAtaG92ZXIge1xcblxcdGJhY2tncm91bmQtY29sb3I6IHJnYigxNzEsIDEzNCwgMjU1KTtcXG59XFxuXFxuLnNoaXAtaG92ZXItZXJyb3Ige1xcblxcdGJhY2tncm91bmQtY29sb3I6IHJnYigyMzMsIDY4LCA2OCk7XFxufVxcblxcbi5zaGlwIHtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTE5LCA2MSwgMjU1KTtcXG59XFxuXFxuLmNlbGwuc2hpcDo6YmVmb3JlIHtcXG5cXHRjb250ZW50OiAn4oCiJztcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0dG9wOiA1MCU7XFxuXFx0bGVmdDogNTAlO1xcblxcdHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHRmb250LXNpemU6IDJyZW07XFxufVxcblxcbi5jZWxsLmhpdCB7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgNjEsIDYxKTtcXG5cXHRjdXJzb3I6IG5vdC1hbGxvd2VkO1xcbn1cXG5cXG4uY2VsbC5oaXQ6OmJlZm9yZSB7XFxuXFx0Y29udGVudDogJ+Kclyc7XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdHRvcDogNTAlO1xcblxcdGxlZnQ6IDUwJTtcXG5cXHR0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG5cXHR0ZXh0LWFsaWduOiBjZW50ZXI7XFxuXFx0Zm9udC1zaXplOiAycmVtO1xcbn1cXG5cXG4uY2VsbC5taXNzIHtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTQ0LCAxMzcsIDEzNyk7XFxuXFx0Y3Vyc29yOiBub3QtYWxsb3dlZDtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7Q0FDQyxhQUFhO0NBQ2IsWUFBWTtDQUNaLHVCQUF1QjtDQUN2QixtQkFBbUI7Q0FDbkIsU0FBUztBQUNWOztBQUVBOzs7Q0FHQyxhQUFhO0NBQ2IsdUNBQXVDO0NBQ3ZDLG9DQUFvQztDQUNwQyxRQUFRO0FBQ1Q7O0FBRUE7Q0FDQyx3QkFBd0I7Q0FDeEIsa0JBQWtCO0NBQ2xCLFdBQVc7Q0FDWCxZQUFZO0FBQ2I7O0FBRUE7Q0FDQyxvQ0FBb0M7QUFDckM7O0FBRUE7Q0FDQyxrQ0FBa0M7QUFDbkM7O0FBRUE7Q0FDQyxtQ0FBbUM7QUFDcEM7O0FBRUE7Q0FDQyxZQUFZO0NBQ1osa0JBQWtCO0NBQ2xCLFFBQVE7Q0FDUixTQUFTO0NBQ1QsZ0NBQWdDO0NBQ2hDLGtCQUFrQjtDQUNsQixlQUFlO0FBQ2hCOztBQUVBO0NBQ0Msa0NBQWtDO0NBQ2xDLG1CQUFtQjtBQUNwQjs7QUFFQTtDQUNDLFlBQVk7Q0FDWixrQkFBa0I7Q0FDbEIsUUFBUTtDQUNSLFNBQVM7Q0FDVCxnQ0FBZ0M7Q0FDaEMsa0JBQWtCO0NBQ2xCLGVBQWU7QUFDaEI7O0FBRUE7Q0FDQyxvQ0FBb0M7Q0FDcEMsbUJBQW1CO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5ib2FyZHMtY29udGFpbmVyIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGhlaWdodDogMTAwJTtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHRhbGlnbi1pdGVtczogY2VudGVyO1xcblxcdGdhcDogNHJlbTtcXG59XFxuXFxuLnBsYXllci1ib2FyZCxcXG4uY29tcHV0ZXItYm9hcmQsXFxuLnNldHVwLWJvYXJkIHtcXG5cXHRkaXNwbGF5OiBncmlkO1xcblxcdGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCBhdXRvKTtcXG5cXHRncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgYXV0byk7XFxuXFx0Z2FwOiAxcHg7XFxufVxcblxcbi5jZWxsIHtcXG5cXHRvdXRsaW5lOiAxcHggc29saWQgYmxhY2s7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdHdpZHRoOiA0MHB4O1xcblxcdGhlaWdodDogNDBweDtcXG59XFxuXFxuLnNoaXAtaG92ZXIge1xcblxcdGJhY2tncm91bmQtY29sb3I6IHJnYigxNzEsIDEzNCwgMjU1KTtcXG59XFxuXFxuLnNoaXAtaG92ZXItZXJyb3Ige1xcblxcdGJhY2tncm91bmQtY29sb3I6IHJnYigyMzMsIDY4LCA2OCk7XFxufVxcblxcbi5zaGlwIHtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTE5LCA2MSwgMjU1KTtcXG59XFxuXFxuLmNlbGwuc2hpcDo6YmVmb3JlIHtcXG5cXHRjb250ZW50OiAn4oCiJztcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0dG9wOiA1MCU7XFxuXFx0bGVmdDogNTAlO1xcblxcdHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHRmb250LXNpemU6IDJyZW07XFxufVxcblxcbi5jZWxsLmhpdCB7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgNjEsIDYxKTtcXG5cXHRjdXJzb3I6IG5vdC1hbGxvd2VkO1xcbn1cXG5cXG4uY2VsbC5oaXQ6OmJlZm9yZSB7XFxuXFx0Y29udGVudDogJ+Kclyc7XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdHRvcDogNTAlO1xcblxcdGxlZnQ6IDUwJTtcXG5cXHR0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG5cXHR0ZXh0LWFsaWduOiBjZW50ZXI7XFxuXFx0Zm9udC1zaXplOiAycmVtO1xcbn1cXG5cXG4uY2VsbC5taXNzIHtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTQ0LCAxMzcsIDEzNyk7XFxuXFx0Y3Vyc29yOiBub3QtYWxsb3dlZDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcmVzZXQuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9yZXNldC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3N0eWxlcy9zdHlsZS5jc3MnO1xuaW1wb3J0ICcuL3N0eWxlcy9yZXNldC5jc3MnO1xuaW1wb3J0IFVJQ29udHJvbGxlciBmcm9tICcuL21vZHVsZXMvY29udHJvbGxlcnMvdWktY29udHJvbGxlcic7XG5cblVJQ29udHJvbGxlcigpO1xuIl0sIm5hbWVzIjpbIlNoaXAiLCJQbGF5ZXIiLCJ1aUhlbHBlcnMiLCJGTEVFVCIsIkNhcnJpZXIiLCJCYXR0bGVzaGlwIiwiRGVzdHJveWVyIiwiU3VibWFyaW5lIiwiUGF0cm9sQm9hdCIsImdhbWVDb250cm9sbGVyIiwicGxheWVyIiwiY29tcHV0ZXIiLCJwbGF5ZXJTaGlwcyIsImNoZWNrRm9yV2luIiwiZ2V0Qm9hcmQiLCJhbGxTaGlwc1N1bmsiLCJwbGF5Um91bmQiLCJyb3dQb3MiLCJjb2xQb3MiLCJpc1Bvc0hpdCIsImF0dGFja1BvcyIsImF1dG9BdHRhY2tQb3MiLCJwbGFjZVNoaXBzUmFuZG9tbHkiLCJPYmplY3QiLCJ2YWx1ZXMiLCJmb3JFYWNoIiwic2hpcExlbmd0aCIsIm5ld1NoaXAiLCJwbGFjZVNoaXAiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJwbGFjZVNoaXBzIiwiaXNWZXJ0aWNhbCIsImxlbmd0aCIsInNoaWZ0IiwidW5zaGlmdCIsImdldFBsYXllciIsImdldENvbXB1dGVyIiwiZ2V0Q3VycmVudFNoaXAiLCJhcmVQbGF5ZXJTaGlwc0VtcHR5IiwiVUlDb250cm9sbGVyIiwiZ2FtZSIsInNldHVwQm9hcmRDb250YWluZXJFbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic2V0dXBCb2FyZEVsZW1lbnQiLCJnZW5lcmF0ZUJvYXJkIiwicGxheWVyQm9hcmRFbGVtZW50IiwiY29tcHV0ZXJCb2FyZEVsZW1lbnQiLCJzaG93UGxheWVyQm9hcmRzIiwiaGlkZUVsZW1lbnQiLCJzaG93U2hpcHMiLCJoYW5kbGVDZWxsQ2xpY2siLCJlIiwidGFyZ2V0IiwibWF0Y2hlcyIsImdldENlbGxDb29yZHMiLCJ1cGRhdGVCb2FyZHMiLCJoYW5kbGVTaGlwUGxhY2VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImlzTGVnYWxQbGFjZW1lbnQiLCJnZXRMZW5ndGgiLCJoaWdobGlnaHRTaGlwSG92ZXJFcnJvciIsImhpZ2hsaWdodFNoaXBIb3ZlciIsImNsZWFyU2hpcEhvdmVyIiwid2luZG93Iiwia2V5IiwiY2VsbCIsImRhdGFzZXQiLCJjb29yZHMiLCJzcGxpdCIsIm1hcCIsImNvb3JkU3RyIiwiTnVtYmVyIiwiZ2V0Q2VsbEVsZW1lbnQiLCJib2FyZCIsImNoaWxkcmVuIiwiZmluZCIsImJvYXJkRWxlbWVudCIsImkiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kQ2hpbGQiLCJpc1Bvc1NoaXAiLCJyZW1vdmUiLCJlbCIsInN0eWxlIiwiZGlzcGxheSIsIkdhbWVib2FyZCIsInJvd1NpemUiLCJjb2xTaXplIiwiaW5pdEJvYXJkIiwicm93cyIsImNvbHMiLCJqIiwic2hpcCIsImlzSGl0Iiwic2hpcHMiLCJldmVyeSIsImlzU3VuayIsImlzUG9zSW5Cb2FyZCIsInJlY2VpdmVBdHRhY2siLCJoaXQiLCJnZW5lcmF0ZVNoaXBQb3NpdGlvbnMiLCJzaGlwUG9zaXRpb25zIiwicHVzaCIsImFsbFBvc2l0aW9uc0luQm9hcmQiLCJwb3MiLCJzaGlwT3ZlcmxhcCIsInNvbWUiLCJuYW1lIiwiZ2V0TmFtZSIsImVuZW15Qm9hcmQiLCJnZXRSYW5kb21Db29yZHMiLCJyYW5kb21Db29yZHMiLCJ0aW1lc0hpdCJdLCJzb3VyY2VSb290IjoiIn0=