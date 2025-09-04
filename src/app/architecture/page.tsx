'use client';
import {
  Box,
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  IconButton,
  Stack,
  Chip,
  Divider,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Home as HomeIcon,
  Computer as ComputerIcon,
  Cloud as CloudIcon,
  Terminal as TerminalIcon,
  Code as CodeIcon,
  Storage as StorageIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  ArrowForward as ArrowIcon,
  ArrowDownward as ArrowDownIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface ArchComponent {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
}

const architectureComponents: ArchComponent[] = [
  {
    id: 'user',
    title: 'You (Developer)',
    description: 'Interacts via Claude Code CLI',
    icon: <PersonIcon />,
    color: '#4CAF50',
    features: ['Types commands', 'Reviews code', 'Makes decisions']
  },
  {
    id: 'cli',
    title: 'Claude Code CLI',
    description: 'Local terminal interface',
    icon: <TerminalIcon />,
    color: '#2196F3',
    features: ['Command parsing', 'Tool orchestration', 'Response formatting']
  },
  {
    id: 'claude',
    title: 'Claude Model',
    description: 'AI processing at Anthropic',
    icon: <CloudIcon />,
    color: '#9C27B0',
    features: ['Natural language understanding', 'Code generation', 'Task planning']
  },
  {
    id: 'tools',
    title: 'Local Tools',
    description: 'File system & development tools',
    icon: <CodeIcon />,
    color: '#FF9800',
    features: ['File operations', 'Git commands', 'Shell execution', 'Build tools']
  },
  {
    id: 'project',
    title: 'Your Project',
    description: 'Local development environment',
    icon: <StorageIcon />,
    color: '#F44336',
    features: ['Source code', 'Dependencies', 'Build artifacts', 'Git repository']
  }
];

const dataFlow = [
  { from: 'user', to: 'cli', label: 'Command' },
  { from: 'cli', to: 'claude', label: 'API Request' },
  { from: 'claude', to: 'cli', label: 'Response + Tool Calls' },
  { from: 'cli', to: 'tools', label: 'Execute Tools' },
  { from: 'tools', to: 'project', label: 'File Operations' },
  { from: 'project', to: 'tools', label: 'Results' },
  { from: 'tools', to: 'cli', label: 'Tool Results' },
  { from: 'cli', to: 'user', label: 'Final Output' },
];

export default function Architecture() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [showFlow, setShowFlow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFlow(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: '100vh',
        py: { xs: 2, md: 4 },
        display: 'flex',
        flexDirection: 'column',
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
            background: 'linear-gradient(45deg, #0070f3, #9C27B0)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Claude Code Architecture
        </Typography>
        
        <Box sx={{ width: 48 }} />
      </Box>

      {/* Architecture Overview */}
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography variant="h5" gutterBottom color="primary">
          How I Work
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }} paragraph>
          Claude Code is a local CLI tool that connects you directly to me (Claude) at Anthropic. 
          I don't make external API calls - instead, I use local tools to interact with your development environment.
        </Typography>
        
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {[
            { label: 'Local First', icon: <ComputerIcon sx={{ fontSize: 16 }} /> },
            { label: 'No External Calls', icon: <SecurityIcon sx={{ fontSize: 16 }} /> },
            { label: 'Real-time', icon: <SpeedIcon sx={{ fontSize: 16 }} /> },
          ].map((feature, index) => (
            <Chip
              key={index}
              icon={feature.icon}
              label={feature.label}
              variant="outlined"
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            />
          ))}
        </Stack>
      </Paper>

      {/* Architecture Diagram */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gridTemplateRows: { xs: 'repeat(5, 1fr)', md: 'repeat(2, 1fr)' },
          gap: 3,
          minHeight: 400,
          position: 'relative',
        }}
      >
        {architectureComponents.map((component, index) => (
          <Zoom
            in={true}
            timeout={500 + index * 200}
            key={component.id}
          >
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: selectedComponent === component.id 
                  ? `2px solid ${component.color}` 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: selectedComponent === component.id
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(255, 255, 255, 0.02)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  border: `2px solid ${component.color}`,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
                gridColumn: component.id === 'user' ? { md: '2' } : 'auto',
              }}
              onClick={() => setSelectedComponent(
                selectedComponent === component.id ? null : component.id
              )}
            >
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1,
                    color: component.color,
                  }}
                >
                  {component.icon}
                  <Typography variant="h6" component="h3">
                    {component.title}
                  </Typography>
                </Box>
                
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }} gutterBottom>
                  {component.description}
                </Typography>
                
                <Fade in={selectedComponent === component.id} timeout={300}>
                  <Box sx={{ mt: 'auto' }}>
                    <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }} gutterBottom>
                      Key Features:
                    </Typography>
                    {component.features.map((feature, idx) => (
                      <Chip
                        key={idx}
                        label={feature}
                        size="small"
                        variant="outlined"
                        sx={{
                          fontSize: '0.7rem',
                          height: 20,
                          margin: 0.25,
                          borderColor: `${component.color}80`,
                          color: 'rgba(255, 255, 255, 0.9)',
                          backgroundColor: `${component.color}20`,
                        }}
                      />
                    ))}
                  </Box>
                </Fade>
              </CardContent>
            </Card>
          </Zoom>
        ))}

        {/* Flow Arrows */}
        {showFlow && (
          <>
            {/* User to CLI */}
            <Box
              sx={{
                position: 'absolute',
                top: { xs: '10%', md: '25%' },
                left: { xs: '50%', md: '33%' },
                transform: 'translate(-50%, -50%) rotate(90deg)',
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: '0.8rem',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { opacity: 0.5 },
                  '50%': { opacity: 1 },
                  '100%': { opacity: 0.5 },
                },
              }}
            >
              <ArrowDownIcon />
              <Typography variant="caption" sx={{ transform: 'rotate(-90deg)', color: 'rgba(255, 255, 255, 0.9)' }}>
                Command
              </Typography>
            </Box>

            {/* CLI to Claude */}
            <Box
              sx={{
                position: 'absolute',
                top: { xs: '30%', md: '25%' },
                left: { xs: '50%', md: '66%' },
                transform: 'translate(-50%, -50%) rotate(90deg)',
                color: 'secondary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: '0.8rem',
                animation: 'pulse 2s infinite 0.5s',
              }}
            >
              <ArrowDownIcon />
              <Typography variant="caption" sx={{ transform: 'rotate(-90deg)', color: 'rgba(255, 255, 255, 0.9)' }}>
                API Call
              </Typography>
            </Box>

            {/* Tools to Project */}
            <Box
              sx={{
                position: 'absolute',
                top: { xs: '70%', md: '75%' },
                left: { xs: '50%', md: '66%' },
                transform: 'translate(-50%, -50%)',
                color: 'warning.main',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: '0.8rem',
                animation: 'pulse 2s infinite 1s',
              }}
            >
              <ArrowIcon />
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Execute
              </Typography>
            </Box>
          </>
        )}
      </Box>

      {/* Technical Details */}
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography variant="h6" gutterBottom color="secondary">
          Key Architectural Principles
        </Typography>
        
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 2,
            mt: 2,
          }}
        >
          {[
            {
              title: 'Local-First',
              description: 'All file operations happen on your machine',
              color: '#4CAF50'
            },
            {
              title: 'Stateless Sessions',
              description: 'Each conversation is independent',
              color: '#2196F3'
            },
            {
              title: 'Tool-Based',
              description: 'I use your existing development tools',
              color: '#FF9800'
            },
            {
              title: 'Secure',
              description: 'No data leaves your local environment',
              color: '#F44336'
            },
            {
              title: 'Real-time',
              description: 'Immediate feedback and interactions',
              color: '#9C27B0'
            },
            {
              title: 'Extensible',
              description: 'Works with any development stack',
              color: '#607D8B'
            },
          ].map((principle, index) => (
            <Box
              key={index}
              sx={{
                p: 2,
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${principle.color}40`,
              }}
            >
              <Typography variant="subtitle2" sx={{ color: principle.color, mb: 1 }}>
                {principle.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                {principle.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Data Flow Explanation */}
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography variant="h6" gutterBottom color="info.main">
          Data Flow Process
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          {dataFlow.map((flow, index) => (
            <Fade in={showFlow} timeout={300 + index * 100} key={index}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  py: 1,
                  opacity: 0.8 + (index * 0.02),
                }}
              >
                <Chip 
                  label={architectureComponents.find(c => c.id === flow.from)?.title || flow.from}
                  size="small"
                  sx={{ minWidth: 100 }}
                />
                <ArrowIcon sx={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                <Typography variant="body2" sx={{ minWidth: 80, textAlign: 'center', color: 'rgba(255, 255, 255, 0.8)' }}>
                  {flow.label}
                </Typography>
                <ArrowIcon sx={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                <Chip 
                  label={architectureComponents.find(c => c.id === flow.to)?.title || flow.to}
                  size="small"
                  sx={{ minWidth: 100 }}
                />
              </Box>
            </Fade>
          ))}
        </Box>
      </Paper>
    </Container>
  );
}