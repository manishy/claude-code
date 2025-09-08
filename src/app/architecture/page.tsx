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
  SmartToy as RobotIcon,
  Memory as ProcessorIcon,
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
    id: 'agent',
    title: 'Claude AI Agent',
    description: 'The autonomous decision-making system that orchestrates everything',
    detailedDescription: 'Claude Code\'s AI agent - the autonomous reasoning system that makes Claude Code "agentic." It doesn\'t just respond to commands; it actively plans, strategizes, and makes decisions about how to help you. It breaks down complex tasks, chooses appropriate tools, adapts to feedback, and works towards your goals. It works WITH the LLM to understand and execute your requests.',
    icon: <RobotIcon />,
    color: '#9C27B0',
    features: ['Goal-oriented planning', 'Tool selection & orchestration', 'Adaptive problem-solving', 'Multi-step execution', 'Context awareness', 'Decision making'],
    capabilities: ['Plan complex development workflows', 'Autonomously choose and sequence tools', 'Adapt strategy based on results', 'Maintain goal awareness across conversations', 'Make intelligent decisions about implementation approaches', 'Coordinate with LLM for understanding and generation'],
    examples: ['Breaking "add authentication" into 8 specific steps', 'Choosing between Read vs Grep tools based on task', 'Adapting approach when tests fail', 'Planning database schema changes', 'Orchestrating multi-file refactoring workflows']
  },
  {
    id: 'llm',
    title: 'Claude LLM (Language Model)',
    description: 'The foundational AI model for understanding and generating text',
    detailedDescription: 'Claude Code\'s Large Language Model that provides the core AI capabilities - understanding natural language, generating code, analyzing patterns, and communicating with you. The Agent uses the LLM\'s capabilities to understand your requests and generate responses, but the LLM doesn\'t make decisions about what actions to take - that\'s the Agent\'s job.',
    icon: <ProcessorIcon />,
    color: '#2196F3',
    features: ['Natural language understanding', 'Code generation', 'Pattern recognition', 'Text analysis', 'Knowledge retrieval', 'Communication'],
    capabilities: ['Parse and understand complex requests', 'Generate high-quality code', 'Explain technical concepts', 'Analyze code patterns and issues', 'Provide contextual responses', 'Translate between human language and code'],
    examples: ['Understanding "make it faster" means performance optimization', 'Generating TypeScript interfaces from descriptions', 'Explaining error messages in plain English', 'Recognizing code smells and anti-patterns', 'Translating requirements into implementation details']
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
    to: 'agent', 
    label: 'API Request', 
    description: 'CLI sends your request to the AI Agent',
    example: 'Request includes your message + current project state',
    step: 2
  },
  { 
    from: 'agent', 
    to: 'llm', 
    label: 'Understanding Request', 
    description: 'Agent asks LLM to understand and analyze the request',
    example: 'LLM parses "add login" and understands the requirements',
    step: 3
  },
  { 
    from: 'llm', 
    to: 'agent', 
    label: 'Parsed Requirements', 
    description: 'LLM provides understanding and generates solutions',
    example: 'Need: form component, validation, auth logic, styling',
    step: 4
  },
  { 
    from: 'agent', 
    to: 'cli', 
    label: 'Action Plan + Code', 
    description: 'Agent creates execution plan with LLM-generated content',
    example: 'Plan: Read existing components, create LoginForm.tsx, update imports',
    step: 5
  },
  { 
    from: 'cli', 
    to: 'tools', 
    label: 'Execute Tools', 
    description: 'CLI runs the tools the Agent requested',
    example: 'ReadTool, WriteTool, EditTool executed in sequence',
    step: 6
  },
  { 
    from: 'tools', 
    to: 'project', 
    label: 'File Operations', 
    description: 'Tools interact with your project files',
    example: 'Create LoginComponent.tsx, update App.tsx',
    step: 7
  },
  { 
    from: 'project', 
    to: 'tools', 
    label: 'Operation Results', 
    description: 'Project provides feedback on operations',
    example: 'File created successfully, import added',
    step: 8
  },
  { 
    from: 'tools', 
    to: 'cli', 
    label: 'Tool Results', 
    description: 'Tools report back their results',
    example: 'Success: LoginComponent.tsx created',
    step: 9
  },
  { 
    from: 'cli', 
    to: 'user', 
    label: 'Final Output', 
    description: 'You see the formatted response and results',
    example: 'Created LoginComponent with form validation',
    step: 10
  },
];

export default function Architecture() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [showFlow, setShowFlow] = useState(true);

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
          Claude Code is like having an AI pair programmer who lives in your terminal. When you ask Claude Code to help with your code, 
          here's what happens: your request stays local, gets sent to Claude at Anthropic where it thinks and plans, then it uses 
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

      {/* Architecture Components - Mobile First Design */}
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
          fontWeight: 700,
          color: 'rgba(255, 255, 255, 0.9)',
          mb: 2,
        }}
      >
        🏗️ System Components
      </Typography>
      
      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', textAlign: 'center', mb: 4 }}>
        Click any component to learn more about its role
      </Typography>

      {/* Mobile-Friendly Stack Layout */}
      <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
        <Stack spacing={2}>
          {architectureComponents.map((component, index) => (
              <Paper
                key={component.id}
                sx={{
                  p: 3,
                  minHeight: selectedComponent === component.id ? 'auto' : '120px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: `1px solid rgba(255, 255, 255, 0.1)`,
                  borderRadius: 3,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${component.color}60`,
                  },
                }}
                onClick={() => setSelectedComponent(
                  selectedComponent === component.id ? null : component.id
                )}
              >
                {/* Fixed Header Area */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, minHeight: '70px' }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      background: `linear-gradient(135deg, ${component.color}, ${component.color}80)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      flexShrink: 0,
                    }}
                  >
                    {component.icon}
                  </Box>
                  <Box sx={{ flex: 1, minHeight: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
                      {component.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.4 }}>
                      {component.description}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: component.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: selectedComponent === component.id ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      flexShrink: 0,
                    }}
                  >
                    <ArrowDownIcon sx={{ fontSize: 16, color: 'white' }} />
                  </Box>
                </Box>

                {selectedComponent === component.id && (
                  <Fade in timeout={200}>
                    <Box sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', pt: 2 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 2 }}>
                        {component.detailedDescription}
                      </Typography>
                      
                      <Typography variant="subtitle2" sx={{ color: component.color, mb: 1 }}>
                        Key Capabilities:
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        {component.capabilities.slice(0, 3).map((capability, idx) => (
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
                    </Box>
                  </Fade>
                )}
              </Paper>
          ))}
        </Stack>
      </Box>

      {/* Desktop Grid Layout */}
      <Box 
        sx={{ 
          display: { xs: 'none', lg: 'grid' },
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 3,
          position: 'relative',
        }}
      >
        {architectureComponents.map((component, index) => (
            <Paper
              key={component.id}
              sx={{
                p: 3,
                minHeight: selectedComponent === component.id ? '300px' : '200px',
                maxHeight: selectedComponent === component.id ? 'none' : '200px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: 'rgba(255, 255, 255, 0.02)',
                border: selectedComponent === component.id 
                  ? `2px solid ${component.color}` 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 3,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: `2px solid ${component.color}60`,
                  boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3)`,
                },
              }}
              onClick={() => setSelectedComponent(
                selectedComponent === component.id ? null : component.id
              )}
            >
              {/* Fixed Header Area */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, minHeight: '80px' }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${component.color}, ${component.color}80)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                    flexShrink: 0,
                  }}
                >
                  {component.icon}
                </Box>
                <Box sx={{ flex: 1, minHeight: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
                    {component.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.4 }}>
                    {component.description}
                  </Typography>
                </Box>
              </Box>

              {selectedComponent === component.id && (
                <Fade in timeout={200}>
                  <Box>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 2 }}>
                      {component.detailedDescription}
                    </Typography>
                    
                    <Typography variant="subtitle2" sx={{ color: component.color, mb: 1 }}>
                      Key Capabilities:
                    </Typography>
                    <Box>
                      {component.capabilities.slice(0, 4).map((capability, idx) => (
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
                  </Box>
                </Fade>
              )}
            </Paper>
        ))}
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
              description: 'Claude Code uses your existing development tools',
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
          Notice how the Agent and LLM work together in steps 2-5:
        </Typography>
        
        <Box sx={{ position: 'relative' }}>
          {dataFlow.map((flow, index) => (
              <Paper
                key={index}
                sx={{
                  p: 3,
                  mb: 2,
                  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))`,
                  border: `1px solid rgba(${flow.step <= 5 ? '0, 112, 243' : '156, 39, 176'}, 0.3)`,
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateX(4px)',
                    borderColor: `rgba(${flow.step <= 5 ? '0, 112, 243' : '156, 39, 176'}, 0.5)`,
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${flow.step <= 5 ? '#0070f3' : '#9C27B0'}, ${flow.step <= 5 ? '#0056b3' : '#7B1FA2'})`,
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

      {/* Agent vs LLM Distinction */}
      <Paper
        sx={{
          p: 4,
          borderRadius: 3,
          background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(156, 39, 176, 0.1))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(33, 150, 243, 0.3)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <ProcessorIcon sx={{ fontSize: 32, color: '#2196F3', mr: 2 }} />
          <RobotIcon sx={{ fontSize: 32, color: '#9C27B0', mr: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.95)' }}>
            🧠 Agent vs LLM: What's the Difference?
          </Typography>
        </Box>
        
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 3 }}>
          Many people think "AI Agent" and "LLM" are the same thing, but they're actually different parts 
          working together. Here's how they differ in Claude Code:
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 3 }}>
          <Paper
            sx={{
              p: 3,
              background: 'rgba(33, 150, 243, 0.1)',
              border: '1px solid rgba(33, 150, 243, 0.3)',
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ProcessorIcon sx={{ fontSize: 24, color: '#2196F3', mr: 1 }} />
              <Typography variant="h6" sx={{ color: '#2196F3', fontWeight: 'bold' }}>
                LLM (Language Model)
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              <strong>The Brain:</strong> Understands language, generates text, recognizes patterns
            </Typography>
            <Box>
              {['Reads and understands your request', 'Generates code and explanations', 'Analyzes existing code patterns', 'Provides knowledge and context'].map((item, idx) => (
                <Typography key={idx} variant="caption" display="block" sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  ml: 1, 
                  mb: 0.5,
                  '&:before': { content: '"📖"', mr: 1 }
                }}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Paper>
          
          <Paper
            sx={{
              p: 3,
              background: 'rgba(156, 39, 176, 0.1)',
              border: '1px solid rgba(156, 39, 176, 0.3)',
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <RobotIcon sx={{ fontSize: 24, color: '#9C27B0', mr: 1 }} />
              <Typography variant="h6" sx={{ color: '#9C27B0', fontWeight: 'bold' }}>
                Agent (Decision Maker)
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              <strong>The Orchestrator:</strong> Plans, decides, and executes actions using the LLM
            </Typography>
            <Box>
              {['Breaks tasks into steps', 'Chooses which tools to use', 'Adapts when things go wrong', 'Coordinates everything to reach your goal'].map((item, idx) => (
                <Typography key={idx} variant="caption" display="block" sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  ml: 1, 
                  mb: 0.5,
                  '&:before': { content: '"🎯"', mr: 1 }
                }}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Box>
        
        <Paper sx={{ 
          p: 3,
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 2
        }}>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.95)', mb: 2 }}>
            💡 Think of it Like This:
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            The <strong>LLM</strong> is like a brilliant scholar who knows everything about coding but just sits at a desk. 
            The <strong>Agent</strong> is like a project manager who talks to the scholar, makes plans, and actually gets things done. 
            Together, they make Claude Code smart AND capable of taking action.
          </Typography>
        </Paper>
      </Paper>

      {/* Agentic Behavior Section */}
      <Paper
        sx={{
          p: 4,
          borderRadius: 3,
          background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.15), rgba(123, 31, 162, 0.1))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(156, 39, 176, 0.3)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <RobotIcon sx={{ fontSize: 32, color: '#9C27B0', mr: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.95)' }}>
            🤖 What Makes Claude Code "Agentic"?
          </Typography>
        </Box>
        
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 3 }}>
          Unlike simple chatbots that just respond to questions, Claude Code functions as an <strong>autonomous agent</strong> 
          that can plan, execute, and adapt to achieve your development goals.
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 3 }}>
          {[
            {
              title: '🎯 Goal-Oriented',
              description: 'Claude Code understands your high-level objectives and works towards them',
              example: 'You say "improve performance" → Claude Code analyzes, profiles, optimizes, and tests'
            },
            {
              title: '🗺️ Multi-Step Planning',
              description: 'Claude Code breaks complex tasks into logical sequences of actions',
              example: '"Add user auth" → 15 steps from database setup to testing'
            },
            {
              title: '🔧 Autonomous Tool Use',
              description: 'Claude Code chooses and combines tools based on what each task needs',
              example: 'Read config → Grep for patterns → Edit files → Run tests'
            },
            {
              title: '🔄 Adaptive Problem-Solving',
              description: 'Claude Code adjusts its approach when things don\'t work as expected',
              example: 'Test fails → Read error → Debug → Fix → Retry automatically'
            }
          ].map((trait, index) => (
            <Paper
              key={index}
              sx={{
                p: 3,
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(156, 39, 176, 0.2)',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.95)', mb: 1 }}>
                {trait.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
                {trait.description}
              </Typography>
              <Paper sx={{ 
                p: 1.5, 
                background: 'rgba(156, 39, 176, 0.1)', 
                border: '1px solid rgba(156, 39, 176, 0.2)',
                borderRadius: 1
              }}>
                <Typography variant="caption" sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  fontStyle: 'italic'
                }}>
                  💡 {trait.example}
                </Typography>
              </Paper>
            </Paper>
          ))}
        </Box>
        
        <Paper sx={{ 
          p: 3,
          background: 'rgba(156, 39, 176, 0.1)',
          border: '1px solid rgba(156, 39, 176, 0.3)',
          borderRadius: 2
        }}>
          <Typography variant="h6" sx={{ color: '#9C27B0', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <BrainIcon /> Key Point: Where the Agent Lives
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            <strong>Claude Code's AI agent runs entirely on Anthropic's secure servers</strong> - not on your machine. 
            Your local CLI and tools are just the "hands and eyes" that Claude Code uses to interact with your project. 
            The actual reasoning, planning, and decision-making all happen in the cloud, which is why Claude Code 
            needs an internet connection to work.
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
              q: 'Where exactly does the AI agent run?',
              a: 'Claude Code\'s AI agent runs entirely on Anthropic\'s secure servers. It\'s the brain that does the reasoning, planning, and decision-making. Your local CLI and tools are just the "hands and eyes" for interacting with your project.'
            },
            {
              q: 'What makes Claude Code an "agentic" system?',
              a: 'Unlike simple chatbots, Claude Code can autonomously plan multi-step tasks, choose appropriate tools, adapt when things go wrong, and work towards your goals without constant guidance. It thinks and acts, not just responds.'
            },
            {
              q: 'Does Claude see my entire codebase?',
              a: 'Only when you explicitly ask Claude Code to read specific files. It can\'t browse your files without permission, and it only sees what the tools show it based on your requests.'
            },
            {
              q: 'Can Claude Code work offline?',
              a: 'The local tools work offline, but Claude Code\'s AI agent needs an internet connection to process your requests and respond. Your files stay local regardless.'
            },
            {
              q: 'What if I don\'t trust a tool operation?',
              a: 'You can always review what Claude Code is planning to do before confirming. All tool operations are transparent and you maintain full control.'
            },
            {
              q: 'How is this different from other AI coding tools?',
              a: 'Claude Code is local-first and doesn\'t require uploading your code. It works with your existing tools rather than replacing them, and it functions as a true autonomous agent, not just a code generator.'
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