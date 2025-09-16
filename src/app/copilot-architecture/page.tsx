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
  Button,
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
  Edit as EditIcon,
  AutoAwesome as SuggestionIcon,
  Visibility as VisibilityIcon,
  Architecture as ArchIcon,
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

const copilotComponents: ArchComponent[] = [
  {
    id: 'user',
    title: 'You (Developer)',
    description: 'The human developer writing code with assistance',
    detailedDescription: 'You remain in complete control of all development decisions. You write code, review suggestions, and decide what to implement. GitHub Copilot provides suggestions based on your current context, but you drive the entire development process.',
    icon: <PersonIcon />,
    color: '#4CAF50',
    features: ['Active coding', 'Suggestion review', 'Context control', 'Final decision making'],
    capabilities: ['Write code with autocomplete assistance', 'Accept or reject AI suggestions', 'Provide context through comments and code', 'Guide implementation through your coding patterns'],
    examples: ['Typing function names to get completions', 'Writing comments to get relevant code', 'Accepting/rejecting suggestions with Tab/Esc', 'Modifying suggested code to fit your needs']
  },
  {
    id: 'editor',
    title: 'Code Editor (VS Code)',
    description: 'Your IDE with Copilot extension integrated',
    detailedDescription: 'Your familiar development environment enhanced with AI-powered autocomplete. The editor captures your typing context and displays Copilot suggestions inline. You maintain your normal workflow with added intelligent assistance.',
    icon: <EditIcon />,
    color: '#2196F3',
    features: ['Real-time suggestions', 'Inline completions', 'Context awareness', 'Syntax highlighting', 'Extension integration'],
    capabilities: ['Display AI suggestions in real-time', 'Capture current file context', 'Show multiple completion options', 'Integrate with existing editor features', 'Maintain normal editing workflow'],
    examples: ['Inline gray text suggestions while typing', 'Ctrl+Space for suggestion alternatives', 'Tab to accept, Esc to dismiss', 'Comments triggering relevant code blocks']
  },
  {
    id: 'copilot',
    title: 'GitHub Copilot AI',
    description: 'AI-powered code completion and suggestion engine',
    detailedDescription: 'The AI model trained on billions of lines of public code that provides contextual code suggestions. It analyzes your current code context and generates relevant completions, but it doesn\'t make decisions about your project structure or execute any actions.',
    icon: <SuggestionIcon />,
    color: '#9C27B0',
    features: ['Pattern recognition', 'Code generation', 'Context analysis', 'Multi-language support', 'Real-time suggestions'],
    capabilities: ['Generate code completions based on context', 'Recognize coding patterns and idioms', 'Suggest functions, classes, and logic', 'Provide boilerplate and common implementations', 'Adapt to your coding style over time'],
    examples: ['Auto-completing function implementations', 'Generating test cases from function signatures', 'Suggesting variable names and types', 'Creating boilerplate code for common patterns']
  },
  {
    id: 'github',
    title: 'GitHub/OpenAI Service',
    description: 'Cloud-based AI inference service',
    detailedDescription: 'The remote service that processes your code context and generates suggestions. It receives your current code context (not your entire project) and returns AI-generated completions back to your editor.',
    icon: <CloudIcon />,
    color: '#FF9800',
    features: ['AI model hosting', 'Context processing', 'Suggestion generation', 'API service', 'Usage analytics'],
    capabilities: ['Process code context requests', 'Generate intelligent code suggestions', 'Handle multiple programming languages', 'Scale to millions of developers', 'Provide usage insights and analytics'],
    examples: ['Processing "create login function" context', 'Returning multiple completion alternatives', 'Generating documentation strings', 'Suggesting error handling patterns']
  },
  {
    id: 'project',
    title: 'Your Local Project',
    description: 'Your codebase and development environment',
    detailedDescription: 'Your actual project files remain completely under your control. Copilot reads the current file context to provide suggestions, but never modifies files directly or executes any operations on your behalf.',
    icon: <FolderIcon />,
    color: '#F44336',
    features: ['Source code storage', 'Local file system', 'Version control', 'Build tools', 'Dependencies'],
    capabilities: ['Store your application code', 'Provide context to Copilot', 'Maintain project structure', 'Execute builds and tests when you run them', 'Track version history through git'],
    examples: ['Current file providing context for suggestions', 'Imported modules influencing completions', 'Project structure remaining unchanged', 'Your manual file operations and commits']
  }
];

const copilotFlow = [
  { 
    from: 'user', 
    to: 'editor', 
    label: 'Code Input', 
    description: 'You start typing code in your editor',
    example: 'You type: function calculateTotal(',
    step: 1
  },
  { 
    from: 'editor', 
    to: 'github', 
    label: 'Context Request', 
    description: 'Editor sends current context to Copilot service',
    example: 'Current file content + cursor position sent to API',
    step: 2
  },
  { 
    from: 'github', 
    to: 'copilot', 
    label: 'AI Processing', 
    description: 'Copilot AI analyzes context and generates suggestions',
    example: 'AI recognizes calculation pattern, generates completion options',
    step: 3
  },
  { 
    from: 'copilot', 
    to: 'github', 
    label: 'Suggestions Generated', 
    description: 'AI returns multiple completion possibilities',
    example: 'Returns: "items) { return items.reduce((sum, item) => sum + item.price, 0); }"',
    step: 4
  },
  { 
    from: 'github', 
    to: 'editor', 
    label: 'API Response', 
    description: 'Suggestions sent back to your editor',
    example: 'JSON response with completion text and metadata',
    step: 5
  },
  { 
    from: 'editor', 
    to: 'user', 
    label: 'Inline Display', 
    description: 'You see suggestions as gray text in your editor',
    example: 'Gray text appears: "items) { return items.reduce..."',
    step: 6
  },
  { 
    from: 'user', 
    to: 'project', 
    label: 'Accept/Reject', 
    description: 'You decide whether to accept the suggestion',
    example: 'Press Tab to accept, Esc to reject, or keep typing',
    step: 7
  },
];

export default function CopilotArchitecture() {
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
          GitHub Copilot Architecture
        </Typography>
        
        <Button
          component={Link}
          href="/architecture"
          variant="outlined"
          size="small"
          startIcon={<ArchIcon />}
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'rgba(0, 112, 243, 0.1)',
            }
          }}
        >
          Claude Code
        </Button>
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
          <SuggestionIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.95)' }}>
            How GitHub Copilot Works
          </Typography>
        </Box>
        
        <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 2 }}>
          🤖 The Non-Agentic Approach
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3, fontSize: '1.1rem', lineHeight: 1.6 }}>
          GitHub Copilot is an AI-powered autocomplete system that suggests code as you type. Unlike agentic systems, 
          Copilot doesn't make decisions or take actions - it simply provides suggestions based on your current context. 
          You remain in complete control of what gets implemented.
        </Typography>
        
        <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 2 }}>
          🎯 Key Characteristics
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} mb={3}>
          {[
            { 
              label: 'Suggestion-Based', 
              icon: <SuggestionIcon sx={{ fontSize: 16 }} />,
              description: 'Provides code completions, not autonomous actions'
            },
            { 
              label: 'Context-Reactive', 
              icon: <VisibilityIcon sx={{ fontSize: 16 }} />,
              description: 'Responds to what you\'re currently typing'
            },
            { 
              label: 'Human-Driven', 
              icon: <PersonIcon sx={{ fontSize: 16 }} />,
              description: 'You make all decisions and take all actions'
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
            💡 <strong>Think of it like this:</strong> Copilot is like a very smart autocomplete that can suggest 
            entire functions, but you're still the one typing, deciding, and organizing everything in your project.
          </Typography>
        </Paper>
      </Paper>

      {/* Architecture Components */}
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
          {copilotComponents.map((component, index) => (
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
        {copilotComponents.map((component, index) => (
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
            Step-by-Step: What Happens When You Type Code
          </Typography>
        </Box>
        
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
          Let's walk through a real example: You start typing a function in VS Code. 
          Notice how this is a simple request-response cycle, not autonomous planning:
        </Typography>
        
        <Box sx={{ position: 'relative' }}>
          {copilotFlow.map((flow, index) => (
              <Paper
                key={index}
                sx={{
                  p: 3,
                  mb: 2,
                  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))`,
                  border: `1px solid rgba(156, 39, 176, 0.3)`,
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateX(4px)',
                    borderColor: `rgba(156, 39, 176, 0.5)`,
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, #9C27B0, #7B1FA2)`,
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
                        label={copilotComponents.find(c => c.id === flow.from)?.title || flow.from}
                        size="small"
                        sx={{ 
                          backgroundColor: copilotComponents.find(c => c.id === flow.from)?.color + '20',
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontWeight: 'bold'
                        }}
                      />
                      <ArrowIcon sx={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                      <Chip 
                        label={copilotComponents.find(c => c.id === flow.to)?.title || flow.to}
                        size="small"
                        sx={{ 
                          backgroundColor: copilotComponents.find(c => c.id === flow.to)?.color + '20',
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
            💭 You have a code suggestion that you can choose to accept, modify, or reject. 
            The function only gets implemented if YOU decide to use the suggestion. Copilot doesn't 
            make any decisions or take any actions on your behalf.
          </Typography>
        </Paper>
      </Paper>

      {/* Non-Agentic vs Agentic Comparison */}
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
          <SuggestionIcon sx={{ fontSize: 32, color: '#9C27B0', mr: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.95)' }}>
            🤝 Non-Agentic: Copilot's Approach
          </Typography>
        </Box>
        
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 3 }}>
          GitHub Copilot represents the "non-agentic" approach to AI coding assistance. Here's what that means:
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 3 }}>
          {[
            {
              title: '🎯 Reactive, Not Proactive',
              description: 'Responds to what you\'re typing, doesn\'t initiate actions',
              example: 'You type, it suggests - it never decides to "fix that bug" on its own'
            },
            {
              title: '📝 Suggestion-Based',
              description: 'Provides options for you to choose from, doesn\'t implement directly',
              example: 'Shows gray text completions that you can accept with Tab'
            },
            {
              title: '🔍 Context-Limited',
              description: 'Works with immediate code context, not entire project understanding',
              example: 'Knows about current file and imports, not your full architecture'
            },
            {
              title: '👤 Human-Controlled',
              description: 'You make all decisions about what gets implemented and how',
              example: 'Every line of code requires your explicit acceptance'
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
          borderRadius: 2,
          mb: 3
        }}>
          <Typography variant="h6" sx={{ color: '#9C27B0', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <BrainIcon /> Key Point: What "Non-Agentic" Means
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            <strong>Non-agentic means it doesn't act autonomously.</strong> Copilot is incredibly smart at generating code, 
            but it never decides what needs to be done, doesn't plan multi-step tasks, and doesn't execute actions. 
            It's a powerful tool that requires human direction for everything.
          </Typography>
        </Paper>

        {/* Comparison with Claude Code */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.95)' }}>
            🔄 Compare with Claude Code (Agentic)
          </Typography>
          <Button
            component={Link}
            href="/architecture"
            variant="outlined"
            size="small"
            sx={{
              ml: 'auto',
              color: 'rgba(255, 255, 255, 0.8)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(0, 112, 243, 0.1)',
              }
            }}
          >
            View Claude Code Architecture
          </Button>
        </Box>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, gap: 3 }}>
          <Paper
            sx={{
              p: 3,
              background: 'rgba(156, 39, 176, 0.1)',
              border: '1px solid rgba(156, 39, 176, 0.3)',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ color: '#9C27B0', mb: 2 }}>
              🤝 Copilot (Non-Agentic)
            </Typography>
            <Box>
              {[
                'Suggests code completions',
                'Responds to your typing',
                'You control all actions',
                'Works within current file context',
                'Requires constant guidance'
              ].map((item, idx) => (
                <Typography key={idx} variant="body2" display="block" sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  mb: 0.5,
                  '&:before': { content: '"•"', mr: 1, color: '#9C27B0' }
                }}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Paper>
          
          <Paper
            sx={{
              p: 3,
              background: 'rgba(33, 150, 243, 0.1)',
              border: '1px solid rgba(33, 150, 243, 0.3)',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ color: '#2196F3', mb: 2 }}>
              🤖 Claude Code (Agentic)
            </Typography>
            <Box>
              {[
                'Plans and executes complete tasks',
                'Takes autonomous actions',
                'Makes decisions about implementation',
                'Understands entire project context',
                'Works independently towards goals'
              ].map((item, idx) => (
                <Typography key={idx} variant="body2" display="block" sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  mb: 0.5,
                  '&:before': { content: '"•"', mr: 1, color: '#2196F3' }
                }}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Box>
      </Paper>

      {/* Use Cases and Strengths */}
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
          ⚡ Copilot's Strengths & Best Use Cases
        </Typography>
        
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
          While non-agentic, GitHub Copilot excels in specific scenarios where suggestion-based assistance is ideal:
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
          {[
            {
              title: '⚡ Real-time Coding',
              description: 'Perfect for getting instant suggestions while you code',
              useCases: ['Function implementations', 'Boilerplate generation', 'Common patterns', 'Quick completions']
            },
            {
              title: '🎯 Precision Control',
              description: 'Ideal when you want to maintain complete control',
              useCases: ['Code reviews', 'Learning new patterns', 'Exploring alternatives', 'Maintaining style consistency']
            },
            {
              title: '📚 Learning & Discovery',
              description: 'Great for discovering new approaches and best practices',
              useCases: ['API usage examples', 'Language features', 'Library patterns', 'Documentation generation']
            },
            {
              title: '🔧 Integration Friendly',
              description: 'Works seamlessly with existing editor workflows',
              useCases: ['Existing VS Code setup', 'Team environments', 'Custom keybindings', 'Extension compatibility']
            }
          ].map((strength, index) => (
            <Paper
              key={index}
              sx={{
                p: 3,
                background: 'rgba(255, 255, 255, 0.01)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.95)', mb: 1 }}>
                {strength.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
                {strength.description}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 'bold', mb: 1 }}>
                Best for:
              </Typography>
              {strength.useCases.map((useCase, idx) => (
                <Typography key={idx} variant="caption" display="block" sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  ml: 1, 
                  mb: 0.5,
                  '&:before': { content: '"→"', mr: 1, color: '#4CAF50' }
                }}>
                  {useCase}
                </Typography>
              ))}
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
              q: 'What makes Copilot "non-agentic"?',
              a: 'Copilot only responds to your actions with suggestions. It never initiates tasks, makes decisions about your project, or takes autonomous actions. You remain in complete control of what gets implemented.'
            },
            {
              q: 'Can Copilot create entire features?',
              a: 'Copilot can suggest implementations for individual functions or components, but it doesn\'t plan or coordinate multi-file features. You need to break down features yourself and guide it through each piece.'
            },
            {
              q: 'How does Copilot handle context?',
              a: 'Copilot analyzes your current file content, imports, and immediate context to make suggestions. It doesn\'t have awareness of your broader project architecture or long-term goals.'
            },
            {
              q: 'Is Copilot better for beginners or experts?',
              a: 'Copilot works great for both! Beginners get helpful completions and learn patterns, while experts can accelerate routine coding and discover new approaches. The key is that you stay in control.'
            },
            {
              q: 'When should I choose Copilot over Claude Code?',
              a: 'Choose Copilot when you want to maintain full control over your development process, prefer suggestion-based assistance, or are doing focused coding within a specific file or component.'
            },
            {
              q: 'Can I use both tools together?',
              a: 'Absolutely! Many developers use Claude Code for high-level task planning and multi-file operations, then switch to Copilot for detailed implementation and real-time coding assistance.'
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