'use client';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Alert,
  Stack,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import {
  Home as HomeIcon,
  Refresh as RefreshIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  KeyboardArrowUp as UpIcon,
  KeyboardArrowDown as DownIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';

interface GameState {
  ball: { x: number; y: number; dx: number; dy: number };
  leftPaddle: { y: number };
  rightPaddle: { y: number };
  score: { left: number; right: number };
  isPlaying: boolean;
  gameOver: boolean;
  winner: string | null;
}

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 80;
const BALL_SIZE = 8;
const PADDLE_SPEED = 6;
const BALL_SPEED = 4;
const WINNING_SCORE = 5;

export default function Pong() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  const [gameState, setGameState] = useState<GameState>({
    ball: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, dx: BALL_SPEED, dy: BALL_SPEED },
    leftPaddle: { y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 },
    rightPaddle: { y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 },
    score: { left: 0, right: 0 },
    isPlaying: false,
    gameOver: false,
    winner: null,
  });

  const [keys, setKeys] = useState<Set<string>>(new Set());

  const resetGame = useCallback(() => {
    setGameState({
      ball: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, dx: BALL_SPEED, dy: BALL_SPEED },
      leftPaddle: { y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 },
      rightPaddle: { y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 },
      score: { left: 0, right: 0 },
      isPlaying: false,
      gameOver: false,
      winner: null,
    });
  }, []);

  const toggleGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying
    }));
  }, []);

  const movePaddle = useCallback((paddle: 'left' | 'right', direction: 'up' | 'down') => {
    if (gameState.gameOver) return;
    
    setGameState(prev => {
      const paddleKey = paddle === 'left' ? 'leftPaddle' : 'rightPaddle';
      const currentY = prev[paddleKey].y;
      const newY = direction === 'up' 
        ? Math.max(0, currentY - PADDLE_SPEED * 3)
        : Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, currentY + PADDLE_SPEED * 3);
      
      return {
        ...prev,
        [paddleKey]: { y: newY }
      };
    });
  }, [gameState.gameOver]);

  const updateGame = useCallback(() => {
    if (!gameState.isPlaying || gameState.gameOver) return;

    setGameState(prev => {
      const newState = { ...prev };
      
      // Move ball
      newState.ball.x += newState.ball.dx;
      newState.ball.y += newState.ball.dy;

      // Ball collision with top/bottom walls
      if (newState.ball.y <= 0 || newState.ball.y >= CANVAS_HEIGHT - BALL_SIZE) {
        newState.ball.dy = -newState.ball.dy;
      }

      // Ball collision with paddles
      const ballLeft = newState.ball.x;
      const ballRight = newState.ball.x + BALL_SIZE;
      const ballTop = newState.ball.y;
      const ballBottom = newState.ball.y + BALL_SIZE;

      // Left paddle collision
      if (
        ballLeft <= PADDLE_WIDTH &&
        ballBottom >= newState.leftPaddle.y &&
        ballTop <= newState.leftPaddle.y + PADDLE_HEIGHT
      ) {
        newState.ball.dx = Math.abs(newState.ball.dx);
        const hitPos = (ballTop + BALL_SIZE / 2 - newState.leftPaddle.y) / PADDLE_HEIGHT;
        newState.ball.dy = (hitPos - 0.5) * BALL_SPEED * 2;
      }

      // Right paddle collision
      if (
        ballRight >= CANVAS_WIDTH - PADDLE_WIDTH &&
        ballBottom >= newState.rightPaddle.y &&
        ballTop <= newState.rightPaddle.y + PADDLE_HEIGHT
      ) {
        newState.ball.dx = -Math.abs(newState.ball.dx);
        const hitPos = (ballTop + BALL_SIZE / 2 - newState.rightPaddle.y) / PADDLE_HEIGHT;
        newState.ball.dy = (hitPos - 0.5) * BALL_SPEED * 2;
      }

      // AI for right paddle
      const paddleCenter = newState.rightPaddle.y + PADDLE_HEIGHT / 2;
      const ballCenter = newState.ball.y + BALL_SIZE / 2;
      if (paddleCenter < ballCenter - 35) {
        newState.rightPaddle.y = Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, newState.rightPaddle.y + PADDLE_SPEED);
      } else if (paddleCenter > ballCenter + 35) {
        newState.rightPaddle.y = Math.max(0, newState.rightPaddle.y - PADDLE_SPEED);
      }

      // Keyboard controls for left paddle
      if (keys.has('ArrowUp') || keys.has('KeyW')) {
        newState.leftPaddle.y = Math.max(0, newState.leftPaddle.y - PADDLE_SPEED);
      }
      if (keys.has('ArrowDown') || keys.has('KeyS')) {
        newState.leftPaddle.y = Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, newState.leftPaddle.y + PADDLE_SPEED);
      }

      // Ball out of bounds - scoring
      if (newState.ball.x < 0) {
        newState.score.right++;
        newState.ball = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, dx: -BALL_SPEED, dy: BALL_SPEED };
      } else if (newState.ball.x > CANVAS_WIDTH) {
        newState.score.left++;
        newState.ball = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, dx: BALL_SPEED, dy: BALL_SPEED };
      }

      // Check for game over
      if (newState.score.left >= WINNING_SCORE) {
        newState.gameOver = true;
        newState.isPlaying = false;
        newState.winner = 'Player';
      } else if (newState.score.right >= WINNING_SCORE) {
        newState.gameOver = true;
        newState.isPlaying = false;
        newState.winner = 'Computer';
      }

      return newState;
    });
  }, [gameState.isPlaying, gameState.gameOver, keys]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw center line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH / 2, 0);
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw paddles
    ctx.fillStyle = '#0070f3';
    ctx.fillRect(0, gameState.leftPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
    
    ctx.fillStyle = '#19857b';
    ctx.fillRect(CANVAS_WIDTH - PADDLE_WIDTH, gameState.rightPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);

    // Draw ball
    ctx.fillStyle = '#fff';
    ctx.fillRect(gameState.ball.x, gameState.ball.y, BALL_SIZE, BALL_SIZE);

    // Draw scores
    ctx.fillStyle = '#fff';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(gameState.score.left.toString(), CANVAS_WIDTH / 4, 60);
    ctx.fillText(gameState.score.right.toString(), 3 * CANVAS_WIDTH / 4, 60);
  }, [gameState]);

  useEffect(() => {
    const gameLoop = () => {
      updateGame();
      draw();
      animationRef.current = requestAnimationFrame(gameLoop);
    };

    if (gameState.isPlaying) {
      animationRef.current = requestAnimationFrame(gameLoop);
    } else {
      draw();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [updateGame, draw, gameState.isPlaying]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys(prev => new Set(prev).add(e.code));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(e.code);
        return newSet;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const getStatusMessage = () => {
    if (gameState.gameOver) return `🎉 ${gameState.winner} wins!`;
    if (gameState.isPlaying) return '🎮 Game in progress - Use ↑↓ or W/S keys';
    return '🕹️ Press Play to start the game';
  };

  const getStatusColor = () => {
    if (gameState.gameOver) return 'success';
    if (gameState.isPlaying) return 'info';
    return 'warning';
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: '100vh',
        py: { xs: 2, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: 'md',
        }}
      >
        <IconButton
          component={Link}
          href="/"
          sx={{
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'rgba(0, 112, 243, 0.1)',
            },
          }}
        >
          <HomeIcon />
        </IconButton>
        
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            background: 'linear-gradient(45deg, #0070f3, #19857b)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Pong Game
        </Typography>
        
        <IconButton
          onClick={resetGame}
          sx={{
            color: 'secondary.main',
            '&:hover': {
              backgroundColor: 'rgba(25, 133, 123, 0.1)',
            },
          }}
        >
          <RefreshIcon />
        </IconButton>
      </Box>

      {/* Game Status */}
      <Alert
        severity={getStatusColor() as 'success' | 'warning' | 'info'}
        sx={{
          width: '100%',
          maxWidth: 'md',
          fontSize: '1rem',
          fontWeight: 'medium',
        }}
      >
        {getStatusMessage()}
      </Alert>

      {/* Game Canvas */}
      <Paper
        elevation={8}
        sx={{
          p: 2,
          borderRadius: 3,
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          style={{
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </Paper>

      {/* Game Controls */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          gap: 2,
          maxWidth: 'md',
          width: '100%',
        }}
      >
        <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary">
              Player Controls
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center" mb={1}>
              <Button
                variant="outlined"
                size="small"
                onMouseDown={() => movePaddle('left', 'up')}
                startIcon={<UpIcon />}
              >
                Up
              </Button>
              <Button
                variant="outlined"
                size="small"
                onMouseDown={() => movePaddle('left', 'down')}
                startIcon={<DownIcon />}
              >
                Down
              </Button>
            </Stack>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Use ↑↓ arrow keys or W/S keys
            </Typography>
          </CardContent>
        </Card>
        
        <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="secondary">
              Score Board
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box textAlign="center">
                <Typography variant="h4" color="primary">{gameState.score.left}</Typography>
                <Typography variant="body2">Player</Typography>
              </Box>
              <Typography variant="h5" color="text.secondary">VS</Typography>
              <Box textAlign="center">
                <Typography variant="h4" color="secondary">{gameState.score.right}</Typography>
                <Typography variant="body2">Computer</Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary" textAlign="center" mt={1}>
              First to {WINNING_SCORE} wins!
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Action Buttons */}
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={toggleGame}
          startIcon={gameState.isPlaying ? <PauseIcon /> : <PlayIcon />}
          disabled={gameState.gameOver}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 3,
            background: 'linear-gradient(45deg, #0070f3, #19857b)',
            '&:hover': {
              background: 'linear-gradient(45deg, #0056b3, #147068)',
            },
          }}
        >
          {gameState.isPlaying ? 'Pause' : 'Play'}
        </Button>
        
        <Button
          variant="outlined"
          onClick={resetGame}
          startIcon={<RefreshIcon />}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 3,
            borderColor: 'rgba(255, 255, 255, 0.3)',
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            },
          }}
        >
          Reset
        </Button>
        
        <Button
          variant="outlined"
          component={Link}
          href="/"
          startIcon={<HomeIcon />}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 3,
            borderColor: 'rgba(255, 255, 255, 0.3)',
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            },
          }}
        >
          Home
        </Button>
      </Stack>
    </Container>
  );
}