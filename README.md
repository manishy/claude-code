# 🤖 Learning Claude Code

An interactive Next.js application built to explore and demonstrate the capabilities of [Claude Code](https://claude.ai/code) - Anthropic's official CLI for AI-assisted software development.

![CI](https://img.shields.io/github/actions/workflow/status/manishy/claude-code/ci.yml?branch=main&style=flat-square&logo=github&label=CI)
![Tests](https://img.shields.io/badge/Tests-27%20Passing-28a745?style=flat-square&logo=jest)
![Next.js](https://img.shields.io/badge/Next.js-14.2.2-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Material-UI](https://img.shields.io/badge/Material--UI-7.3.2-0081CB?style=flat-square&logo=mui)

## 🌟 What is This Project?

This project serves as both a **learning playground** and **interactive documentation** for understanding Claude Code's architecture and capabilities. It showcases how AI-assisted development works through hands-on examples and detailed explanations.

## 🎯 Key Features

### 📚 **Interactive Architecture Guide**
- **System Components**: Visual breakdown of Claude Code's architecture
- **Agent vs LLM**: Clear distinction between the AI Agent and Language Model
- **10-Step Data Flow**: Complete walkthrough of how requests are processed
- **Responsive Design**: Mobile-first approach with touch-friendly interactions

### 🎮 **Learning Apps**
Built while exploring Claude Code's capabilities:

- **Tic Tac Toe**: React state management and Material-UI components
- **Pong Game**: HTML5 Canvas, real-time physics, and AI opponent
- More interactive demos coming soon!

### 🎨 **Modern Web Stack**
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Material-UI v5** for design system
- **Responsive Design** with mobile-first approach

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd learning_claude_code

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🏗️ Project Structure

```
learning_claude_code/
├── src/
│   └── app/
│       ├── page.tsx              # Home page - Interactive showcase
│       ├── architecture/
│       │   └── page.tsx          # Architecture documentation
│       ├── tic-tac-toe/
│       │   └── page.tsx          # Tic Tac Toe game
│       ├── pong/
│       │   └── page.tsx          # Pong game
│       ├── layout.tsx            # Root layout
│       └── globals.css           # Global styles
├── package.json
└── README.md
```

## 🧠 About Claude Code

**Claude Code** is Anthropic's official CLI tool that connects you directly to Claude AI for software development. Key characteristics:

- **Local-First**: Your code stays on your machine
- **AI-Assisted**: Intelligent code generation and debugging
- **Tool Integration**: Seamlessly works with your development environment
- **Agentic Behavior**: Plans, executes, and adapts to achieve your goals

## 🤖 What Makes This "Agentic"?

Unlike simple chatbots, Claude Code functions as an autonomous agent:

- **🎯 Goal-Oriented**: Understands your development objectives
- **🔧 Tool Selection**: Chooses appropriate tools for each task
- **🔄 Adaptive**: Adjusts approach based on results
- **📋 Multi-Step Planning**: Breaks complex tasks into manageable steps

## 🎮 Interactive Examples

### Architecture Visualization
Explore how Claude Code works internally:
- Click on system components to learn their roles
- Follow the 10-step data flow process
- Understand Agent vs LLM coordination

### Learning Games
Each game demonstrates different aspects of modern web development:

**Tic Tac Toe**
- React state management
- Event handling
- Game logic implementation
- Material-UI integration

**Pong Game**
- HTML5 Canvas API
- Real-time animations
- Physics simulation
- AI opponent logic

## 🛠️ Technologies Used

### Core Framework
- **Next.js 14.2.2** - React framework with App Router
- **React 18** - UI library with modern hooks
- **TypeScript 5** - Type-safe JavaScript

### UI & Styling
- **Material-UI 7.3.2** - React component library
- **Emotion** - CSS-in-JS styling
- **Material Icons** - Icon library

### Development Tools
- **ESLint** - Code linting
- **Next.js built-in TypeScript support**

## 📱 Responsive Design

The application is built with a **mobile-first approach**:
- Stack layout for mobile devices
- Grid layout for desktop screens
- Touch-friendly interactions
- Consistent component heights
- Smooth animations and transitions

## 🎯 Learning Objectives

This project demonstrates:

1. **Modern React Development**
   - Functional components with hooks
   - TypeScript integration
   - State management patterns

2. **Next.js App Router**
   - File-based routing
   - Server-side rendering
   - Static generation

3. **Material-UI Integration**
   - Theme customization
   - Component composition
   - Responsive design patterns

4. **Interactive Web Applications**
   - Canvas-based games
   - Real-time updates
   - User interaction handling

## 🤝 Contributing

This is a learning project, but contributions are welcome! Feel free to:
- Add more interactive examples
- Improve the documentation
- Enhance the UI/UX
- Fix bugs or optimize performance

## 📝 License

This project is for educational purposes. Feel free to use it as a reference for your own learning journey with Claude Code.

## 🔗 Links

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com/)
- [React Documentation](https://react.dev/)

---

Built with ❤️ while learning Claude Code - showcasing the power of AI-assisted development!
