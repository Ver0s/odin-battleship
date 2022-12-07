# Battleship game

### [Click for live preview](https://ver0s.github.io/odin-battleship/ 'Click for live preview')

This was the first project where I used (or at least tried) test driven development. It was certainly something new. The benefits of testing became much more clearer when I was doing an actual project after reading theory about it.

The red-green-refactor feedback loop is something that is very satisfying to work with. That being said as the project grew I sometimes forgot tow write tests because I fell into my old habits of console logging.

This project was also a good reminder of how to setup webpack with it's plugins and the whole ecosystem. I also used eslint and prettier here - these things are invaluable.

In terms of what can be improved in this project - I would certainly look at separation of concerns between modules (especially GameController and UIController). I tried my best to keep the modules as independent and loosely coupled as possible but something like Publish/Subscribe pattern would make this code even more modular. The modules themselves and code inside of them could probably be more organised as well. This part of setting up code structure for a bigger project is one of the hardest part and I still can improve a lot in this aspect.
