## Overview ##

This is an HTML5/javascript version of the game show Concentration. 
[http://en.wikipedia.org/wiki/Concentration_(game_show)](http://en.wikipedia.org/wiki/Concentration_(game_show))

This version of the game has safety themed tiles and puzzles. To start playing open **board.htm** and click on the tiles.

## License ##

This code is licensed under MIT license (see LICENSE.txt for details)

## Using your own tiles ##

Create 12, **199 x 169** png images, named

- 1.png 
- 2.png
- ...
- 12.png

and place them in the tiles folder.

0.png is for the wild space.

## Using your own puzzles ##

Create 7, **995 x 845** png images for your puzzles, named

- puzzle1.png 
- puzzle2.png 
- ... 
- puzzle7.png

and place them in the puzzles folder.

If you want more or less then 7 puzzles, edit line 173, the `nextGame()` function in concentration.js to match the number of puzzles you have.