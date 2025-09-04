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
  PlayCircleOutline as PlayIcon,
  Timeline as TimelineIcon,
  Psychology as BrainIcon,
  Api as ApiIcon,
  Build as ToolIcon,
  Folder as FolderIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface ArchComponent {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  capabilities: string[];
  examples: string[];
}

const architectureComponents: ArchComponent[] = [
  {
    id: 'user',
    title: 'You (Developer)',
    description: 'The human developer interacting with Claude Code',
    detailedDescription: 'You are the starting point of every interaction. Through natural language commands, you communicate your development needs, review AI-generated code, and make final decisions about what gets implemented.',
    icon: <PersonIcon />,
    color: '#4CAF50',
    features: ['Natural language input', 'Code review', 'Decision making', 'Task specification'],
    capabilities: ['Ask questions in plain English', 'Request code changes', 'Provide context and requirements', 'Guide the development process'],
    examples: ['"Fix this bug in my React component"', '"Add a dark mode toggle"', '"Explain this function"', '"Refactor this code for better performance"']
  },
  {
    id: 'cli',
    title: 'Claude Code CLI',
    description: 'Your local command-line interface to Claude AI',
    detailedDescription: 'The CLI is the bridge between you and Claude AI. It runs locally on your machine, parsing your commands, managing the conversation context, and orchestrating all the local tools that Claude needs to help you.',
    icon: <TerminalIcon />,
    color: '#2196F3',
    features: ['Command parsing', 'Context management', 'Tool orchestration', 'Response formatting', 'Session handling'],
    capabilities: ['Parse natural language commands', 'Maintain conversation history', 'Execute tool calls securely', 'Format AI responses for display', 'Handle authentication'],
    examples: ['claude "Create a new React component"', 'claude "Debug this error"', 'claude "Commit these changes"', 'claude "Run the tests"']
  },
  {
    id: 'claude',
    title: 'Claude AI Model',
    description: 'Advanced AI running at Anthropic\'s secure infrastructure',
    detailedDescription: 'Claude is the AI brain that understands your requests, generates code, plans complex tasks, and decides which tools to use. Running on Anthropic\'s secure servers, Claude processes your requests without storing your code permanently.',
    icon: <BrainIcon />,
    color: '#9C27B0',
    features: ['Natural language understanding', 'Code generation', 'Task planning', 'Tool selection', 'Context reasoning'],
    capabilities: ['Understand complex coding requirements', 'Generate high-quality code', 'Plan multi-step development tasks', 'Reason about existing codebases', 'Make intelligent tool choices'],
    examples: ['Analyzing your codebase structure', 'Generating React components', 'Planning database migrations', 'Debugging complex issues', 'Suggesting architectural improvements']
  },
  {
    id: 'tools',
    title: 'Local Development Tools',
    description: 'Secure tools that operate on your local machine',
    detailedDescription: 'These are the hands of Claude - secure, local tools that can read files, write code, run commands, and interact with your development environment. Everything stays on your machine.',
    icon: <ToolIcon />,
    color: '#FF9800',
    features: ['File operations', 'Git commands', 'Shell execution', 'Build tools', 'Package managers'],
    capabilities: ['Read and write files safely', 'Execute git operations', 'Run build scripts and tests', 'Install dependencies', 'Search and analyze code'],
    examples: ['Reading package.json', 'Writing new components', 'Running npm install', 'Executing git commits', 'Running test suites']
  },
  {
    id: 'project',
    title: 'Your Local Project',
    description: 'Your development environment and codebase',
    detailedDescription: 'This is your actual project - the source code, configuration files, dependencies, and build artifacts that live on your machine. Claude Code helps you work with this project but never sends your code to external servers.',
    icon: <FolderIcon />,
    color: '#F44336',
    features: ['Source code', 'Configuration files', 'Dependencies', 'Build artifacts', 'Git repository', 'Development tools'],
    capabilities: ['Store your application code', 'Manage project dependencies', 'Track version history', 'Generate build outputs', 'Maintain development configurations'],
    examples: ['React components and hooks', 'Package.json and node_modules', 'Git history and branches', 'Build outputs and assets', 'Configuration files']
  }
];

const dataFlow = [
  { 
    from: 'user', 
    to: 'cli', 
    label: 'Command', 
    description: 'You type a natural language command',
    example: 'claude "Create a login component"',
    step: 1
  },
  { 
    from: 'cli', 
    to: 'claude', 
    label: 'API Request', 
    description: 'CLI sends your request to Claude with context',
    example: 'Request includes your message + current project state',
    step: 2
  },
  { 
    from: 'claude', 
    to: 'cli', 
    label: 'AI Response + Tool Plan', 
    description: 'Claude analyzes and decides what tools to use',
    example: 'Plan: Read existing components, create new file, update imports',
    step: 3
  },
  { 
    from: 'cli', 
    to: 'tools', 
    label: 'Execute Tools', 
    description: 'CLI runs the tools Claude requested',
    example: 'ReadTool, WriteTool, EditTool executed in sequence',
    step: 4
  },
  { 
    from: 'tools', 
    to: 'project', 
    label: 'File Operations', 
    description: 'Tools interact with your project files',
    example: 'Create LoginComponent.tsx, update App.tsx',
    step: 5
  },
  { 
    from: 'project', 
    to: 'tools', 
    label: 'Operation Results', 
    description: 'Project provides feedback on operations',
    example: 'File created successfully, import added',
    step: 6
  },
  { 
    from: 'tools', 
    to: 'cli', 
    label: 'Tool Results', 
    description: 'Tools report back their results',
    example: 'Success: LoginComponent.tsx created',
    step: 7
  },
  { 
    from: 'cli', 
    to: 'user', 
    label: 'Final Output', 
    description: 'You see the formatted response and results',
    example: 'Created LoginComponent with form validation',
    step: 8
  },
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

      {/* Introduction Section */}
      <Paper
        sx={{
          p: 4,
          borderRadius: 3,
          background: 'linear-gradient(135deg, rgba(0, 112, 243, 0.1), rgba(156, 39, 176, 0.1))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <BrainIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.95)' }}>
            How Claude Code Works
          </Typography>
        </Box>
        
        <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 2 }}>
          🧠 The Big Picture
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3, fontSize: '1.1rem', lineHeight: 1.6 }}>
          Claude Code is like having an AI pair programmer who lives in your terminal. When you ask me to help with your code, 
          here's what happens: your request stays local, gets sent to me at Anthropic where I think and plan, then I use 
          tools on YOUR machine to actually do the work. Your code never leaves your computer.
        </Typography>
        
        <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 2 }}>
          🔒 Key Principles
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} mb={3}>
          {[
            { 
              label: 'Local-First Development', 
              icon: <ComputerIcon sx={{ fontSize: 16 }} />,
              description: 'All file operations happen on your machine'
            },
            { 
              label: 'Privacy by Design', 
              icon: <SecurityIcon sx={{ fontSize: 16 }} />,
              description: 'Your code never gets stored externally'
            },
            { 
              label: 'Real-time Collaboration', 
              icon: <SpeedIcon sx={{ fontSize: 16 }} />,
              description: 'Instant feedback and assistance'
            },
          ].map((feature, index) => (
            <Chip
              key={index}
              icon={feature.icon}
              label={feature.label}
              variant="outlined"
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: 'rgba(255, 255, 255, 0.9)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-1px)'
                },
                transition: 'all 0.2s ease'
              }}
            />
          ))}
        </Stack>
        
        <Paper sx={{ p: 2, background: 'rgba(0, 112, 243, 0.1)', border: '1px solid rgba(0, 112, 243, 0.3)' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontStyle: 'italic' }}>
            💡 <strong>Think of it like this:</strong> You're the architect with ideas, Claude Code is your AI assistant 
            who understands those ideas, and your local tools are the construction crew that builds it - all happening 
            right on your computer.
          </Typography>
        </Paper>
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
                
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }} gutterBottom>
                  {component.description}
                </Typography>
                
                {selectedComponent === component.id && (
                  <Fade in={selectedComponent === component.id} timeout={300}>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 2, fontWeight: 500 }}>
                        {component.detailedDescription}
                      </Typography>
                      
                      <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                      
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }} gutterBottom>
                        🔧 Key Capabilities:
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        {component.capabilities.map((capability, idx) => (
                          <Typography key={idx} variant="caption" display="block" sx={{ 
                            color: 'rgba(255, 255, 255, 0.8)', 
                            ml: 1, 
                            mb: 0.5,
                            '&:before': { content: '"•"', mr: 1, color: component.color }
                          }}>
                            {capability}
                          </Typography>
                        ))}
                      </Box>
                      
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }} gutterBottom>
                        💡 Examples:
                      </Typography>
                      <Box>
                        {component.examples.map((example, idx) => (
                          <Chip
                            key={idx}
                            label={example}
                            size="small"
                            sx={{
                              fontSize: '0.65rem',
                              height: 24,
                              margin: 0.25,
                              backgroundColor: `${component.color}15`,
                              color: 'rgba(255, 255, 255, 0.8)',
                              border: `1px solid ${component.color}40`,
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Fade>
                )}
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
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ApiIcon sx={{ fontSize: 28, color: 'secondary.main', mr: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.95)' }}>
            Core Architecture Principles
          </Typography>
        </Box>
        
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
          These principles guide how Claude Code is designed to keep you in control:
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

      {/* Step-by-Step Process */}
      <Paper
        sx={{
          p: 4,
          borderRadius: 3,
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <TimelineIcon sx={{ fontSize: 32, color: 'info.main', mr: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.95)' }}>
            Step-by-Step: What Happens When You Ask for Help
          </Typography>
        </Box>
        
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
          Let's walk through a real example: You want to add a login component to your React app.
        </Typography>
        
        <Box sx={{ position: 'relative' }}>
          {dataFlow.map((flow, index) => (
            <Fade in={showFlow} timeout={500 + index * 200} key={index}>
              <Paper
                sx={{
                  p: 3,
                  mb: 2,
                  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))`,
                  border: `1px solid rgba(${flow.step <= 4 ? '0, 112, 243' : '156, 39, 176'}, 0.3)`,
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateX(4px)',
                    borderColor: `rgba(${flow.step <= 4 ? '0, 112, 243' : '156, 39, 176'}, 0.5)`,
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${flow.step <= 4 ? '#0070f3' : '#9C27B0'}, ${flow.step <= 4 ? '#0056b3' : '#7B1FA2'})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      flexShrink: 0
                    }}
                  >
                    {flow.step}
                  </Box>
                  
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Chip 
                        label={architectureComponents.find(c => c.id === flow.from)?.title || flow.from}
                        size="small"
                        sx={{ 
                          backgroundColor: architectureComponents.find(c => c.id === flow.from)?.color + '20',
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontWeight: 'bold'
                        }}
                      />
                      <ArrowIcon sx={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                      <Chip 
                        label={architectureComponents.find(c => c.id === flow.to)?.title || flow.to}
                        size="small"
                        sx={{ 
                          backgroundColor: architectureComponents.find(c => c.id === flow.to)?.color + '20',
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontWeight: 'bold'
                        }}
                      />
                    </Box>
                    
                    <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.95)', mb: 1, fontWeight: 600 }}>
                      {flow.label}
                    </Typography>
                    
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                      {flow.description}
                    </Typography>
                    
                    <Paper sx={{ 
                      p: 1.5, 
                      background: 'rgba(0, 0, 0, 0.3)', 
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 1
                    }}>
                      <Typography variant="caption" sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)', 
                        fontFamily: 'monospace',
                        fontSize: '0.8rem'
                      }}>
                        💡 {flow.example}
                      </Typography>
                    </Paper>
                  </Box>
                </Box>
              </Paper>
            </Fade>
          ))}
        </Box>
        
        <Paper sx={{ 
          p: 3, 
          mt: 3,
          background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(67, 160, 71, 0.1))',
          border: '1px solid rgba(76, 175, 80, 0.3)'
        }}>
          <Typography variant="h6" sx={{ color: '#4CAF50', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <PlayIcon /> Result
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            🎉 You now have a fully functional LoginComponent.tsx with form validation, 
            proper TypeScript types, and it's already imported into your main App component. 
            All of this happened locally and securely!
          </Typography>
        </Paper>
      </Paper>

      {/* Security & Privacy Section */}
      <Paper
        sx={{
          p: 4,
          borderRadius: 3,
          background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.1), rgba(233, 30, 99, 0.1))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(244, 67, 54, 0.3)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <SecurityIcon sx={{ fontSize: 32, color: '#F44336', mr: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.95)' }}>
            🔒 Security & Privacy
          </Typography>
        </Box>
        
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 3 }}>
          Your code security and privacy are fundamental to Claude Code's design:
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
          {[
            {
              title: '🏠 Local-First Architecture',
              description: 'All file operations happen on your machine. Your source code never leaves your computer.',
              details: ['Files read/written locally', 'No code uploaded to servers', 'You maintain full control']
            },
            {
              title: '🔐 Encrypted Communication',
              description: 'Only your natural language requests are sent to Claude - never your actual code.',
              details: ['HTTPS encrypted requests', 'No code in API calls', 'Context stays local']
            },
            {
              title: '🚫 No Data Persistence',
              description: 'Claude doesn\'t store your conversations or code permanently.',
              details: ['Temporary processing only', 'No conversation logs', 'No learning from your code']
            },
            {
              title: '⚙️ Tool Sandboxing',
              description: 'All tools run with your user permissions and can be audited.',
              details: ['Standard file permissions', 'Transparent operations', 'No hidden processes']
            }
          ].map((item, index) => (
            <Paper
              key={index}
              sx={{
                p: 3,
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.95)', mb: 1 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
                {item.description}
              </Typography>
              <Box>
                {item.details.map((detail, idx) => (
                  <Typography key={idx} variant="caption" display="block" sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)', 
                    ml: 1, 
                    mb: 0.5,
                    '&:before': { content: '"✓"', mr: 1, color: '#4CAF50' }
                  }}>
                    {detail}
                  </Typography>
                ))}
              </Box>
            </Paper>
          ))}
        </Box>
      </Paper>

      {/* FAQ Section */}
      <Paper
        sx={{
          p: 4,
          borderRadius: 3,
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.95)', mb: 3 }}>
          ❓ Frequently Asked Questions
        </Typography>
        
        <Box sx={{ display: 'grid', gap: 2 }}>
          {[
            {
              q: 'Does Claude see my entire codebase?',
              a: 'Only when you explicitly ask me to read specific files. I can\'t browse your files without permission, and I only see what the tools show me based on your requests.'
            },
            {
              q: 'Can Claude Code work offline?',
              a: 'The local tools work offline, but I need an internet connection to process your requests and respond. Your files stay local regardless.'
            },
            {
              q: 'What if I don\'t trust a tool operation?',
              a: 'You can always review what I\'m planning to do before confirming. All tool operations are transparent and you maintain full control.'
            },
            {
              q: 'How is this different from other AI coding tools?',
              a: 'Claude Code is local-first and doesn\'t require uploading your code. It works with your existing tools rather than replacing them.'
            }
          ].map((faq, index) => (
            <Paper
              key={index}
              sx={{
                p: 3,
                background: 'rgba(255, 255, 255, 0.01)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.95)', mb: 1, fontWeight: 600 }}>
                {faq.q}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                {faq.a}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Paper>
    </Container>
  );
}