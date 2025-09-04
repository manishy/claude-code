'use client';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Fade,
  Grow,
  Stack,
  Chip,
  Button,
} from '@mui/material';
import {
  SportsEsports as GameIcon,
  Sports as PongIcon,
  Architecture as ArchIcon,
  Code as CodeIcon,
  Palette as DesignIcon,
  Speed as FastIcon,
  AutoAwesome as MagicIcon,
} from '@mui/icons-material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at top, rgba(0, 112, 243, 0.1) 0%, transparent 70%)',
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 6, md: 8 },
          }}
        >
          {/* Hero Section */}
          <Fade in timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
              <Avatar
                sx={{
                  width: { xs: 80, md: 120 },
                  height: { xs: 80, md: 120 },
                  background: 'linear-gradient(135deg, #0070f3, #9C27B0)',
                  mx: 'auto',
                  mb: 3,
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                <CodeIcon fontSize="inherit" />
              </Avatar>
              
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  background: 'linear-gradient(135deg, #0070f3, #9C27B0, #19857b)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                }}
              >
                Interactive Showcase
              </Typography>
              
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: 300,
                  maxWidth: 600,
                  mx: 'auto',
                  mb: 4,
                }}
              >
                Experience modern web development with Material-UI, games, and interactive visualizations
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                flexWrap="wrap"
                gap={1}
              >
                {[
                  { label: 'Material-UI', icon: <DesignIcon sx={{ fontSize: 16 }} /> },
                  { label: 'TypeScript', icon: <CodeIcon sx={{ fontSize: 16 }} /> },
                  { label: 'Interactive', icon: <MagicIcon sx={{ fontSize: 16 }} /> },
                  { label: 'Responsive', icon: <FastIcon sx={{ fontSize: 16 }} /> },
                ].map((feature, index) => (
                  <Grow in timeout={1000 + index * 200} key={index}>
                    <Chip
                      icon={feature.icon}
                      label={feature.label}
                      variant="outlined"
                      sx={{
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        color: 'rgba(255, 255, 255, 0.9)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    />
                  </Grow>
                ))}
              </Stack>
            </Box>
          </Fade>

          {/* Interactive Features Grid */}
          <Box sx={{ width: '100%', mb: { xs: 4, md: 6 } }}>
            <Typography
              variant="h4"
              sx={{
                textAlign: 'center',
                fontWeight: 700,
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 4,
              }}
            >
              Interactive Features
            </Typography>
            
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: 'repeat(3, 1fr)',
                },
                gap: { xs: 3, md: 4 },
              }}
            >
              {[
                {
                  title: 'Tic Tac Toe',
                  description: 'Strategic game with Material-UI components, responsive design, and smooth animations.',
                  href: '/tic-tac-toe',
                  icon: <GameIcon sx={{ fontSize: 40 }} />,
                  color: '#0070f3',
                  features: ['React State Management', 'Material-UI Components', 'Responsive Design'],
                },
                {
                  title: 'Pong Game',
                  description: 'Classic arcade experience with HTML5 Canvas, AI opponent, and real-time physics.',
                  href: '/pong',
                  icon: <PongIcon sx={{ fontSize: 40 }} />,
                  color: '#19857b',
                  features: ['HTML5 Canvas', 'AI Opponent', 'Real-time Physics'],
                },
                {
                  title: 'Architecture Visualization',
                  description: 'Interactive diagram showing Claude Code\'s system architecture and data flow.',
                  href: '/architecture',
                  icon: <ArchIcon sx={{ fontSize: 40 }} />,
                  color: '#9C27B0',
                  features: ['Interactive Diagrams', 'System Architecture', 'Data Flow Visualization'],
                },
              ].map((item, index) => (
                <Grow in timeout={1200 + index * 300} key={index}>
                  <Card
                    component={Link}
                    href={item.href}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      textDecoration: 'none',
                      color: 'inherit',
                      cursor: 'pointer',
                      background: 'rgba(255, 255, 255, 0.02)',
                      backdropFilter: 'blur(10px)',
                      border: `1px solid rgba(255, 255, 255, 0.1)`,
                      borderRadius: 3,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px) scale(1.02)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${item.color}60`,
                        boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 40px ${item.color}30`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 3, md: 4 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 2,
                          color: item.color,
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            background: `linear-gradient(135deg, ${item.color}, ${item.color}80)`,
                            mr: 2,
                          }}
                        >
                          {item.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="h5" component="h3" sx={{ fontWeight: 700, color: 'white' }}>
                            {item.title}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.8)',
                          mb: 3,
                          lineHeight: 1.6,
                          flexGrow: 1,
                        }}
                      >
                        {item.description}
                      </Typography>
                      
                      <Box sx={{ mt: 'auto' }}>
                        <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.5}>
                          {item.features.map((feature, idx) => (
                            <Chip
                              key={idx}
                              label={feature}
                              size="small"
                              sx={{
                                fontSize: '0.7rem',
                                backgroundColor: `${item.color}20`,
                                color: 'rgba(255, 255, 255, 0.9)',
                                border: `1px solid ${item.color}40`,
                              }}
                            />
                          ))}
                        </Stack>
                      </Box>
                      
                      <Button
                        variant="outlined"
                        sx={{
                          mt: 3,
                          borderColor: item.color,
                          color: item.color,
                          '&:hover': {
                            backgroundColor: `${item.color}20`,
                            borderColor: item.color,
                          },
                        }}
                        endIcon="→"
                      >
                        Explore
                      </Button>
                    </CardContent>
                  </Card>
                </Grow>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}