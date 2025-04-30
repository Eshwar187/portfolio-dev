'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import anime from 'animejs';

// Notification component for level changes
const Notification = ({
  message,
  type,
  onClose
}: {
  message: string;
  type: 'success' | 'info' | 'warning';
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getColors = () => {
    switch (type) {
      case 'success':
        return 'bg-green-900/70 border-green-500';
      case 'warning':
        return 'bg-yellow-900/70 border-yellow-500';
      case 'info':
      default:
        return 'bg-blue-900/70 border-blue-500';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg border ${getColors()} backdrop-blur-sm`}
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="mr-3">
        {getIcon()}
      </div>
      <div className="mr-2">
        <p className="text-white font-medium">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-gray-300 hover:text-white"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
};

const NumberGuessingGame = () => {
  const [targetNumber, setTargetNumber] = useState<number | null>(null);
  const [guess, setGuess] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [maxAttempts] = useState<number>(5);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');
  const [feedback, setFeedback] = useState<string>('');
  const [previousGuesses, setPreviousGuesses] = useState<Array<{ value: number; result: 'high' | 'low' | 'correct' }>>([]);
  const [hint, setHint] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintUsed, setHintUsed] = useState<boolean>(false);
  const [gamesPlayed, setGamesPlayed] = useState<number>(0);
  const [gamesWon, setGamesWon] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [range, setRange] = useState<{ min: number; max: number }>({ min: 1, max: 100 });
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'info' | 'warning';
  } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  // Generate a random number within the range
  const generateRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Start a new game
  const startGame = () => {
    // Set range based on difficulty
    let newRange = { min: 1, max: 100 };
    if (difficulty === 'easy') {
      newRange = { min: 1, max: 50 };
    } else if (difficulty === 'hard') {
      newRange = { min: 1, max: 200 };
    }

    const newTargetNumber = generateRandomNumber(newRange.min, newRange.max);
    setRange(newRange);
    setTargetNumber(newTargetNumber);
    setGuess('');
    setAttempts(0);
    setPreviousGuesses([]);
    setGameState('playing');
    setFeedback(`I'm thinking of a number between ${newRange.min} and ${newRange.max}...`);
    setHint('');
    setShowHint(false);
    setHintUsed(false);

    // Show game start notification
    setNotification({
      show: true,
      message: `Game started! Guess a number between ${newRange.min} and ${newRange.max}.`,
      type: 'info'
    });

    // Focus on input
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);

    // Animate game container with a more dramatic effect
    if (gameContainerRef.current) {
      anime({
        targets: gameContainerRef.current,
        scale: [0.9, 1.02, 1],
        opacity: [0.5, 1],
        duration: 800,
        easing: 'easeOutElastic(1, .5)'
      });

      // Add a subtle pulse to the input field
      if (inputRef.current) {
        setTimeout(() => {
          anime({
            targets: inputRef.current,
            boxShadow: [
              '0 0 0 rgba(138, 43, 226, 0)',
              '0 0 15px rgba(138, 43, 226, 0.7)',
              '0 0 0 rgba(138, 43, 226, 0)'
            ],
            duration: 1500,
            easing: 'easeInOutQuad'
          });
        }, 500);
      }
    }

    // For debugging - remove in production
    // console.log(`Secret number: ${newTargetNumber}`);
  };

  // Handle guess submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (gameState !== 'playing') return;

    const guessNumber = parseInt(guess);

    // Validate input
    if (isNaN(guessNumber)) {
      setFeedback('Please enter a valid number!');
      return;
    }

    if (guessNumber < range.min || guessNumber > range.max) {
      setFeedback(`Please enter a number between ${range.min} and ${range.max}!`);
      return;
    }

    // Check if this number was already guessed
    if (previousGuesses.some(g => g.value === guessNumber)) {
      setFeedback('You already tried this number!');
      return;
    }

    // Process the guess
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    let result: 'high' | 'low' | 'correct';
    let newFeedback: string;

    if (guessNumber === targetNumber) {
      result = 'correct';
      newFeedback = `🎉 Correct! The number was ${targetNumber}!`;
      setGameState('won');
      setGamesWon(prev => prev + 1);
      setCurrentStreak(prev => prev + 1);
      setBestStreak(prev => Math.max(prev, currentStreak + 1));

      // Show win notification with animation
      setNotification({
        show: true,
        message: `Congratulations! You won in ${newAttempts} ${newAttempts === 1 ? 'attempt' : 'attempts'}!`,
        type: 'success'
      });

      // Celebrate with confetti-like animation
      if (gameContainerRef.current) {
        const particles = 30;
        const colors = ['#8A2BE2', '#FF00FF', '#1E90FF', '#32CD32', '#FF8C00'];

        for (let i = 0; i < particles; i++) {
          const particle = document.createElement('div');
          particle.style.position = 'absolute';
          particle.style.width = '10px';
          particle.style.height = '10px';
          particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          particle.style.borderRadius = '50%';
          particle.style.pointerEvents = 'none';
          gameContainerRef.current.appendChild(particle);

          const x = Math.random() * 100;
          const y = Math.random() * 100;

          anime({
            targets: particle,
            left: [`${50}%`, `${x}%`],
            top: [`${50}%`, `${y}%`],
            opacity: [1, 0],
            scale: [0, 1],
            duration: 1500,
            easing: 'easeOutExpo',
            complete: () => {
              if (gameContainerRef.current && gameContainerRef.current.contains(particle)) {
                gameContainerRef.current.removeChild(particle);
              }
            }
          });
        }
      }
    } else if (newAttempts >= maxAttempts) {
      result = guessNumber < targetNumber ? 'low' : 'high';
      newFeedback = `Game over! The number was ${targetNumber}.`;
      setGameState('lost');
      setCurrentStreak(0);

      // Show lose notification
      setNotification({
        show: true,
        message: `Game over! The number was ${targetNumber}.`,
        type: 'warning'
      });
    } else {
      if (guessNumber < targetNumber!) {
        result = 'low';
        newFeedback = 'Too low! Try a higher number.';
      } else {
        result = 'high';
        newFeedback = 'Too high! Try a lower number.';
      }
    }

    // Update previous guesses
    setPreviousGuesses([...previousGuesses, { value: guessNumber, result }]);
    setFeedback(newFeedback);
    setGuess('');

    // Animate feedback
    if (feedbackRef.current) {
      anime({
        targets: feedbackRef.current,
        scale: [1, 1.05, 1],
        duration: 300,
        easing: 'easeInOutQuad'
      });
    }

    // If game ended, update stats
    if (result === 'correct' || newAttempts >= maxAttempts) {
      setGamesPlayed(prev => prev + 1);
    }
  };

  // Generate a hint
  const generateHint = () => {
    if (!targetNumber || hintUsed) return;

    setHintUsed(true);

    const validGuesses = previousGuesses.filter(g => g.result !== 'correct');
    let hintText = '';

    if (validGuesses.length === 0) {
      // No guesses yet
      const quarterPoint = Math.floor((range.max - range.min) / 4);
      const hintValue = targetNumber <= range.min + quarterPoint ? 'low' :
                        targetNumber >= range.max - quarterPoint ? 'high' : 'middle';

      if (hintValue === 'low') {
        hintText = `The number is in the lower quarter of the range (${range.min}-${range.min + quarterPoint}).`;
      } else if (hintValue === 'high') {
        hintText = `The number is in the upper quarter of the range (${range.max - quarterPoint}-${range.max}).`;
      } else {
        hintText = `The number is somewhere in the middle of the range.`;
      }
    } else {
      // Use previous guesses to give a hint
      const closestGuess = validGuesses.reduce((prev, curr) => {
        const prevDiff = Math.abs(prev.value - targetNumber);
        const currDiff = Math.abs(curr.value - targetNumber);
        return currDiff < prevDiff ? curr : prev;
      });

      const diff = Math.abs(closestGuess.value - targetNumber);

      if (diff <= 5) {
        hintText = `You're very close! Within 5 of the target number.`;
      } else if (diff <= 10) {
        hintText = `You're getting warm! Within 10 of the target number.`;
      } else {
        const isEven = targetNumber % 2 === 0;
        hintText = `The number is ${isEven ? 'even' : 'odd'}.`;
      }
    }

    setHint(hintText);
    setShowHint(true);
  };

  // Change difficulty
  const changeDifficulty = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    if (gameState === 'playing') {
      if (!confirm('Changing difficulty will reset your current game. Continue?')) {
        return;
      }
    }

    // Set difficulty and show notification
    setDifficulty(newDifficulty);
    setGameState('idle');

    // Show appropriate notification based on difficulty
    let message = '';
    let type: 'success' | 'info' | 'warning' = 'info';

    switch (newDifficulty) {
      case 'easy':
        message = 'Easy mode activated! Numbers from 1-50.';
        type = 'success';
        break;
      case 'medium':
        message = 'Medium mode activated! Numbers from 1-100.';
        type = 'info';
        break;
      case 'hard':
        message = 'Hard mode activated! Numbers from 1-200. Good luck!';
        type = 'warning';
        break;
    }

    // Trigger notification with animation
    setNotification({
      show: true,
      message,
      type
    });

    // Animate game container on difficulty change
    if (gameContainerRef.current) {
      anime({
        targets: gameContainerRef.current,
        scale: [0.98, 1],
        opacity: [0.8, 1],
        duration: 500,
        easing: 'easeOutElastic(1, .5)'
      });
    }
  };

  // Reset stats
  const resetStats = () => {
    if (confirm('Are you sure you want to reset all your stats?')) {
      setGamesPlayed(0);
      setGamesWon(0);
      setBestStreak(0);
      setCurrentStreak(0);
    }
  };

  // Get progress color based on attempts
  const getProgressColor = () => {
    const ratio = attempts / maxAttempts;
    if (ratio < 0.4) return 'bg-green-500';
    if (ratio < 0.7) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div ref={gameContainerRef} className="w-full max-w-md mx-auto">
      {/* Notification System */}
      <AnimatePresence>
        {notification && notification.show && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </AnimatePresence>
      {/* Game Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <motion.button
            onClick={() => changeDifficulty('easy')}
            className={`px-3 py-1 text-sm rounded-md ${difficulty === 'easy' ? 'bg-green-600' : 'bg-green-900/50'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Easy
          </motion.button>
          <motion.button
            onClick={() => changeDifficulty('medium')}
            className={`px-3 py-1 text-sm rounded-md ${difficulty === 'medium' ? 'bg-purple-600' : 'bg-purple-900/50'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Medium
          </motion.button>
          <motion.button
            onClick={() => changeDifficulty('hard')}
            className={`px-3 py-1 text-sm rounded-md ${difficulty === 'hard' ? 'bg-red-600' : 'bg-red-900/50'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Hard
          </motion.button>
        </div>

        <motion.button
          onClick={() => setShowStats(!showStats)}
          className="px-3 py-1 text-sm bg-gray-800 rounded-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showStats ? 'Hide Stats' : 'Show Stats'}
        </motion.button>
      </div>

      {/* Stats Panel */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            className="mb-6 p-4 bg-black/30 backdrop-blur-sm rounded-lg border border-purple-500/30"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-400">Games Played</p>
                <p className="text-2xl font-bold">{gamesPlayed}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400">Games Won</p>
                <p className="text-2xl font-bold">{gamesWon}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400">Win Rate</p>
                <p className="text-2xl font-bold">
                  {gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400">Best Streak</p>
                <p className="text-2xl font-bold">{bestStreak}</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <motion.button
                onClick={resetStats}
                className="text-xs text-red-400 hover:text-red-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset Stats
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Content */}
      <div className="p-6 bg-black/30 backdrop-blur-sm rounded-lg border border-purple-500/30">
        {/* Game Feedback */}
        <div
          ref={feedbackRef}
          className={`text-center mb-6 p-4 rounded-lg ${
            gameState === 'won'
              ? 'bg-green-900/30 border border-green-500/50'
              : gameState === 'lost'
              ? 'bg-red-900/30 border border-red-500/50'
              : 'bg-purple-900/30 border border-purple-500/50'
          }`}
        >
          <p className="text-lg font-medium">{feedback}</p>
        </div>

        {/* Game Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span>Attempts: {attempts}/{maxAttempts}</span>
            <span>Remaining: {maxAttempts - attempts}</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${getProgressColor()}`}
              initial={{ width: '0%' }}
              animate={{ width: `${(attempts / maxAttempts) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Game Input */}
        {gameState === 'playing' ? (
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder={`Enter a number (${range.min}-${range.max})`}
                className="flex-grow px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                min={range.min}
                max={range.max}
              />
              <motion.button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg text-white font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Guess
              </motion.button>
            </div>
          </form>
        ) : (
          <motion.button
            onClick={startGame}
            className="w-full py-3 mb-6 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg text-white font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {gameState === 'idle' ? 'Start Game' : 'Play Again'}
          </motion.button>
        )}

        {/* Hint Section */}
        {gameState === 'playing' && (
          <div className="mb-6">
            {showHint ? (
              <motion.div
                className="p-3 bg-blue-900/30 border border-blue-500/50 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-blue-300 text-sm">💡 Hint: {hint}</p>
              </motion.div>
            ) : (
              <motion.button
                onClick={generateHint}
                disabled={hintUsed}
                className={`w-full py-2 text-sm rounded-lg border border-blue-500/50 ${
                  hintUsed ? 'bg-blue-900/10 text-gray-500 cursor-not-allowed' : 'bg-blue-900/30 text-blue-300 hover:bg-blue-900/40'
                }`}
                whileHover={!hintUsed ? { scale: 1.02 } : {}}
                whileTap={!hintUsed ? { scale: 0.98 } : {}}
              >
                {hintUsed ? 'Hint Used' : 'Get a Hint'}
              </motion.button>
            )}
          </div>
        )}

        {/* Previous Guesses */}
        {previousGuesses.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Previous Guesses:</h3>
            <div className="flex flex-wrap gap-2">
              {previousGuesses.map((g, index) => (
                <motion.div
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${
                    g.result === 'correct'
                      ? 'bg-green-900/50 text-green-300 border border-green-500/50'
                      : g.result === 'high'
                      ? 'bg-red-900/50 text-red-300 border border-red-500/50'
                      : 'bg-blue-900/50 text-blue-300 border border-blue-500/50'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {g.value} {g.result === 'high' ? '↑' : g.result === 'low' ? '↓' : '✓'}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Game Instructions */}
      <motion.div
        className="mt-6 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="mb-2">How to play:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Guess the number within {maxAttempts} attempts</li>
          <li>After each guess, you&apos;ll get a hint if your guess is too high or too low</li>
          <li>Use the hint button if you&apos;re stuck (one hint per game)</li>
          <li>Change difficulty to adjust the number range</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default NumberGuessingGame;
