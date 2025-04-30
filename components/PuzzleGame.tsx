'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


interface Tile {
  id: number;
  correctPosition: number;
  currentPosition: number;
}

const PuzzleGame = () => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [difficulty, setDifficulty] = useState<3 | 4 | 5>(3); // 3x3, 4x4, or 5x5 grid
  const [emptyTileIndex, setEmptyTileIndex] = useState(difficulty * difficulty - 1);

  // Initialize the puzzle
  const initializePuzzle = () => {
    const newTiles: Tile[] = [];
    const totalTiles = difficulty * difficulty;

    // Create tiles in solved position
    for (let i = 0; i < totalTiles - 1; i++) {
      newTiles.push({
        id: i,
        correctPosition: i,
        currentPosition: i
      });
    }

    // Shuffle the tiles
    for (let i = newTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newTiles[i].currentPosition, newTiles[j].currentPosition] =
      [newTiles[j].currentPosition, newTiles[i].currentPosition];
    }

    // Make sure the puzzle is solvable
    if (!isSolvable(newTiles)) {
      // Swap the first two tiles to make it solvable
      [newTiles[0].currentPosition, newTiles[1].currentPosition] =
      [newTiles[1].currentPosition, newTiles[0].currentPosition];
    }

    setTiles(newTiles);
    setEmptyTileIndex(totalTiles - 1);
    setIsComplete(false);
    setMoves(0);
    setTime(0);
    setIsPlaying(true);
  };

  // Check if the puzzle is solvable
  const isSolvable = (tiles: Tile[]): boolean => {
    let inversions = 0;
    const positions = tiles.map(tile => tile.currentPosition);

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[i] > positions[j]) {
          inversions++;
        }
      }
    }

    // For odd-sized grids, the puzzle is solvable if the number of inversions is even
    if (difficulty % 2 === 1) {
      return inversions % 2 === 0;
    }
    // For even-sized grids, the puzzle is solvable if:
    // (blank row from bottom + inversions) is odd
    else {
      const blankRow = Math.floor(emptyTileIndex / difficulty);
      const rowFromBottom = difficulty - blankRow;
      return (rowFromBottom + inversions) % 2 === 1;
    }
  };

  // Check if the puzzle is complete
  const checkCompletion = () => {
    const isComplete = tiles.every(tile => tile.currentPosition === tile.correctPosition);
    if (isComplete) {
      setIsComplete(true);
      setIsPlaying(false);
    }
  };

  // Move a tile
  const moveTile = (tileIndex: number) => {
    if (!isPlaying || isComplete) return;

    const tilePosition = tiles[tileIndex].currentPosition;
    const emptyPosition = emptyTileIndex;

    // Check if the tile is adjacent to the empty space
    const tileRow = Math.floor(tilePosition / difficulty);
    const tileCol = tilePosition % difficulty;
    const emptyRow = Math.floor(emptyPosition / difficulty);
    const emptyCol = emptyPosition % difficulty;

    const isAdjacent =
      (tileRow === emptyRow && Math.abs(tileCol - emptyCol) === 1) ||
      (tileCol === emptyCol && Math.abs(tileRow - emptyRow) === 1);

    if (isAdjacent) {
      // Swap the tile with the empty space
      const newTiles = [...tiles];
      newTiles[tileIndex].currentPosition = emptyPosition;
      setTiles(newTiles);
      setEmptyTileIndex(tilePosition);
      setMoves(moves + 1);

      // Check if the puzzle is complete
      setTimeout(checkCompletion, 300);
    }
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && !isComplete) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, isComplete]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Get the position for a tile
  const getTilePosition = (position: number) => {
    const row = Math.floor(position / difficulty);
    const col = position % difficulty;
    return {
      x: col * (100 / difficulty),
      y: row * (100 / difficulty),
    };
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            onClick={() => setDifficulty(3)}
            className={`px-3 py-1 rounded-md ${difficulty === 3 ? 'bg-purple-600' : 'bg-purple-900/50'}`}
          >
            3×3
          </button>
          <button
            onClick={() => setDifficulty(4)}
            className={`px-3 py-1 rounded-md ${difficulty === 4 ? 'bg-purple-600' : 'bg-purple-900/50'}`}
          >
            4×4
          </button>
          <button
            onClick={() => setDifficulty(5)}
            className={`px-3 py-1 rounded-md ${difficulty === 5 ? 'bg-purple-600' : 'bg-purple-900/50'}`}
          >
            5×5
          </button>
        </div>
        <motion.button
          onClick={initializePuzzle}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          New Game
        </motion.button>
      </div>

      <div className="mb-4 flex justify-between">
        <div className="text-lg">Moves: {moves}</div>
        <div className="text-lg">Time: {formatTime(time)}</div>
      </div>

      <div
        className="relative bg-black/30 backdrop-blur-sm border border-purple-500/30 rounded-lg overflow-hidden"
        style={{
          width: '100%',
          paddingBottom: '100%' // Make it square
        }}
      >
        {tiles.length > 0 ? (
          tiles.map((tile, index) => {
            const position = getTilePosition(tile.currentPosition);
            return (
              <motion.div
                key={tile.id}
                className="absolute flex items-center justify-center bg-gradient-to-br from-purple-700 to-purple-900 border border-purple-500/50 rounded-md cursor-pointer"
                style={{
                  width: `${100 / difficulty}%`,
                  height: `${100 / difficulty}%`,
                }}
                animate={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30
                }}
                onClick={() => moveTile(index)}
              >
                <span className="text-xl font-bold">{tile.id + 1}</span>
              </motion.div>
            );
          })
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p>Click &quot;New Game&quot; to start</p>
          </div>
        )}
      </div>

      {isComplete && (
        <motion.div
          className="mt-6 p-4 bg-green-900/30 border border-green-500/50 rounded-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-bold text-green-400 mb-2">Puzzle Completed!</h3>
          <p>You solved it in {moves} moves and {formatTime(time)}.</p>
        </motion.div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">How to Play:</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>Click &quot;New Game&quot; to start a new puzzle</li>
          <li>Click on tiles adjacent to the empty space to move them</li>
          <li>Arrange the tiles in numerical order to solve the puzzle</li>
          <li>Challenge yourself with different difficulty levels</li>
        </ul>
      </div>
    </div>
  );
};

export default PuzzleGame;
