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
  useTheme,
} from '@mui/material';
import {
  Home as HomeIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { useState, useCallback } from 'react';

type Player = 'X' | 'O' | null;
type Board = Player[];

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinner = (board: Board): Player => {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const isBoardFull = (board: Board): boolean => {
  return board.every(cell => cell !== null);
};

export default function TicTacToe() {
  const theme = useTheme();
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player>(null);
  const [isDraw, setIsDraw] = useState(false);

  const handleCellClick = useCallback((index: number) => {
    if (board[index] || winner || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (isBoardFull(newBoard)) {
      setIsDraw(true);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  }, [board, currentPlayer, winner, isDraw]);

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
  }, []);

  const getStatusMessage = () => {
    if (winner) return `🎉 Player ${winner} wins!`;
    if (isDraw) return "🤝 It's a draw!";
    return `Player ${currentPlayer}'s turn`;
  };

  const getStatusColor = () => {
    if (winner) return 'success';
    if (isDraw) return 'warning';
    return 'info';
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        py: { xs: 4, md: 6 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
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
          Tic Tac Toe
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
          maxWidth: 400,
          fontSize: '1.1rem',
          fontWeight: 'medium',
        }}
      >
        {getStatusMessage()}
      </Alert>

      {/* Game Board */}
      <Paper
        elevation={8}
        sx={{
          p: 2,
          borderRadius: 3,
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            width: { xs: 300, sm: 320 },
            height: { xs: 300, sm: 320 },
          }}
        >
          {board.map((cell, index) => (
            <Button
              key={index}
              onClick={() => handleCellClick(index)}
              variant="outlined"
              sx={{
                width: '100%',
                height: '100%',
                fontSize: { xs: '2rem', sm: '2.5rem' },
                fontWeight: 'bold',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                color: cell === 'X' ? '#0070f3' : cell === 'O' ? '#19857b' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  transform: 'scale(1.02)',
                },
                '&:disabled': {
                  color: cell === 'X' ? '#0070f3' : '#19857b',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
                transition: 'all 0.2s ease',
              }}
              disabled={!!cell || !!winner || isDraw}
            >
              {cell}
            </Button>
          ))}
        </Box>
      </Paper>

      {/* Game Controls */}
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button
          variant="contained"
          onClick={resetGame}
          startIcon={<RefreshIcon />}
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
          New Game
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

      {/* Game Stats */}
      <Paper
        sx={{
          p: 2,
          mt: 2,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Click any empty cell to place your mark. Get three in a row to win!
        </Typography>
      </Paper>
    </Container>
  );
}