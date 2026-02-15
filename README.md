# LearnStackHub 📚

**Your Complete Journey from Core Java to Cloud-Ready Full-Stack Development**

LearnStackHub is an interactive learning platform that takes you from Java fundamentals all the way to building cloud-ready applications. Master Core Java, JDBC, Servlets, and JSP with hands-on tutorials, real-world examples, and live code execution.

## 🚀 Features

- **📚 Comprehensive Tutorials** - Step-by-step guides covering Core Java, JDBC, Servlets, and JSP
- **💻 Live Code Editor** - Write and execute Java code directly in your browser
- **🎯 Interactive Learning** - Practice questions and coding challenges
- **☁️ Cloud-Focused** - Learn concepts that prepare you for cloud deployment
- **🆓 100% Free** - Quality education accessible to everyone

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: Modern CSS with cloud-themed design
- **Code Execution**: Piston API for Java code execution
- **Routing**: React Router DOM

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🚀 Deployment to GitHub Pages

The application is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment (Recommended)

1. **Enable GitHub Pages in your repository:**
   - Go to your repository: `https://github.com/Dattakumar369/coretocloud`
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

2. **Push to main branch:**
   - The GitHub Actions workflow will automatically build and deploy your site
   - Every push to the `main` branch will trigger a new deployment
   - Your site will be available at: `https://dattakumar369.github.io/coretocloud/`

### Manual Deployment

If you prefer manual deployment:

```bash
# Build the project
npm run build

# Deploy using gh-pages (requires gh-pages package)
npm install --save-dev gh-pages
npm run deploy
```

### Configuration

- **Base Path**: `/coretocloud/` (configured in `vite.config.js`)
- **Router Basename**: `/coretocloud` (configured in `src/App.jsx`)
- **Workflow File**: `.github/workflows/deploy.yml`

## 🎓 Learning Path

1. **Core Java** - Master the fundamentals
2. **JDBC** - Database connectivity
3. **Servlets** - Server-side Java
4. **JSP** - Dynamic web pages

## 🤝 Contributing

Contributions are welcome! Feel free to add tutorials, improve existing content, or enhance the platform.

## 📄 License

This project is open source and available for educational purposes.
