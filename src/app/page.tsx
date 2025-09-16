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
  Paper,
} from '@mui/material';
import {
  SportsEsports as GameIcon,
  Sports as PongIcon,
  Architecture as ArchIcon,
  Terminal as TerminalIcon,
  School as SchoolIcon,
  Build as BuildIcon,
  AutoAwesome as MagicIcon,
  Compare as CompareIcon,
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
                <SchoolIcon fontSize="inherit" />
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
                Learning Claude Code
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
                A hands-on journey building interactive apps and games with Claude Code AI assistant
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                flexWrap="wrap"
                gap={1}
              >
                {[
                  { label: 'Claude Code', icon: <TerminalIcon sx={{ fontSize: 16 }} /> },
                  { label: 'Learning', icon: <SchoolIcon sx={{ fontSize: 16 }} /> },
                  { label: 'Building', icon: <BuildIcon sx={{ fontSize: 16 }} /> },
                  { label: 'Interactive', icon: <MagicIcon sx={{ fontSize: 16 }} /> },
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

          {/* Two-Column Layout: Claude Code Documentation vs Learning Apps */}
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
              {/* Claude Code Documentation Section */}
              <Box sx={{ flex: 1 }}>
                <Box sx={{ height: '100%' }}>
                  <Typography
                    variant="h4"
                    sx={{
                      textAlign: 'center',
                      fontWeight: 700,
                      color: 'rgba(255, 255, 255, 0.9)',
                      mb: 4,
                    }}
                  >
                    📚 About Claude Code
                  </Typography>
                  
                  <Paper
                    sx={{
                      p: 3,
                      mb: 3,
                      borderRadius: 3,
                      background: 'rgba(255, 255, 255, 0.02)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <Typography variant="h6" gutterBottom color="primary.main" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TerminalIcon /> What is Claude Code?
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
                      Claude Code is Anthropic's official CLI tool that connects you directly to Claude AI for software development. 
                      It's a local-first tool that helps with coding, debugging, and building applications.
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.5}>
                      {['Local Development', 'AI Assistant', 'Code Generation', 'Real-time Help'].map((tag, idx) => (
                        <Chip 
                          key={idx}
                          label={tag} 
                          size="small" 
                          sx={{ 
                            backgroundColor: 'rgba(0, 112, 243, 0.2)',
                            color: 'rgba(255, 255, 255, 0.9)',
                            border: '1px solid rgba(0, 112, 243, 0.4)'
                          }} 
                        />
                      ))}
                    </Stack>
                  </Paper>

                  <Stack spacing={3}>
                    <Card
                      component={Link}
                      href="/architecture"
                      sx={{
                        textDecoration: 'none',
                        color: 'inherit',
                        background: 'rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(156, 39, 176, 0.6)',
                          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                        },
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ 
                            width: 50, 
                            height: 50, 
                            background: 'linear-gradient(135deg, #9C27B0, #9C27B080)',
                            mr: 2 
                          }}>
                            <ArchIcon />
                          </Avatar>
                          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                            Claude Code Architecture
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          Interactive visualization of how Claude Code works - the agentic AI system that autonomously plans and executes development tasks.
                        </Typography>
                      </CardContent>
                    </Card>

                    <Card
                      component={Link}
                      href="/copilot-architecture"
                      sx={{
                        textDecoration: 'none',
                        color: 'inherit',
                        background: 'rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(0, 112, 243, 0.6)',
                          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                        },
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ 
                            width: 50, 
                            height: 50, 
                            background: 'linear-gradient(135deg, #0070f3, #0070f380)',
                            mr: 2 
                          }}>
                            <CompareIcon />
                          </Avatar>
                          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                            GitHub Copilot Architecture
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          Understanding the non-agentic approach - how suggestion-based AI coding assistants like Copilot work differently.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Stack>
                </Box>
              </Box>

              {/* Learning Apps Section */}
              <Box sx={{ flex: 1 }}>
                <Box sx={{ height: '100%' }}>
                  <Typography
                    variant="h4"
                    sx={{
                      textAlign: 'center',
                      fontWeight: 700,
                      color: 'rgba(255, 255, 255, 0.9)',
                      mb: 4,
                    }}
                  >
                    🎮 Learning Apps
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.8)', 
                      textAlign: 'center', 
                      mb: 3,
                      fontStyle: 'italic'
                    }}
                  >
                    Small interactive apps built while learning Claude Code capabilities
                  </Typography>

                  <Stack spacing={3}>
                    {[
                      {
                        title: 'Tic Tac Toe',
                        description: 'Learning React state management and Material-UI components',
                        href: '/tic-tac-toe',
                        icon: <GameIcon />,
                        color: '#0070f3',
                        skills: ['React Hooks', 'Game Logic', 'UI Components'],
                      },
                      {
                        title: 'Pong Game',
                        description: 'Exploring HTML5 Canvas and real-time game physics',
                        href: '/pong',
                        icon: <PongIcon />,
                        color: '#19857b',
                        skills: ['Canvas API', 'Animation', 'AI Logic'],
                      }
                    ].map((app, index) => (
                      <Grow in timeout={1500 + index * 300} key={index}>
                        <Card
                          component={Link}
                          href={app.href}
                          sx={{
                            textDecoration: 'none',
                            color: 'inherit',
                            background: 'rgba(255, 255, 255, 0.02)',
                            backdropFilter: 'blur(10px)',
                            border: `1px solid rgba(255, 255, 255, 0.1)`,
                            borderRadius: 3,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-4px) scale(1.02)',
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: `1px solid ${app.color}60`,
                              boxShadow: `0 15px 35px rgba(0, 0, 0, 0.2), 0 0 20px ${app.color}30`,
                            },
                          }}
                        >
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <Avatar sx={{ 
                                width: 50, 
                                height: 50, 
                                background: `linear-gradient(135deg, ${app.color}, ${app.color}80)`,
                                mr: 2 
                              }}>
                                {app.icon}
                              </Avatar>
                              <Box>
                                <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                                  {app.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                  {app.description}
                                </Typography>
                              </Box>
                            </Box>
                            
                            <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.5}>
                              {app.skills.map((skill, idx) => (
                                <Chip
                                  key={idx}
                                  label={skill}
                                  size="small"
                                  sx={{
                                    fontSize: '0.7rem',
                                    backgroundColor: `${app.color}20`,
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    border: `1px solid ${app.color}40`,
                                  }}
                                />
                              ))}
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grow>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Learning Journey */}
          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>
              🚀 Learning Journey
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: 800, mx: 'auto' }}>
              This project showcases hands-on learning with Claude Code - from understanding its architecture to building 
              interactive applications. Each app demonstrates different aspects of modern web development, AI-assisted coding, 
              and the powerful capabilities of Claude Code as a development companion.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}