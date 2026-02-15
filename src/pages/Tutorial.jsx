import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CodeMirror from '@uiw/react-codemirror';
import { java } from '@codemirror/lang-java';
import { 
  ChevronRight, 
  Copy, 
  Check, 
  Play, 
  Terminal, 
  Clock, 
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Code,
  RotateCcw,
  Loader2,
  Edit3,
  User
} from 'lucide-react';
import { getTopicById, getNavigation, getAllTopics } from '../data';
import { executeWithPiston } from '../services/codeExecutor';
import { useAuth } from '../context/AuthContext';
import { useContributions } from '../context/ContributionContext';
import ContributeModal from '../components/ContributeModal';
import ContributorBadge from '../components/ContributorBadge';
import AdSense from '../components/AdSense';
import { ADSENSE_CONFIG } from '../config/adsense';
import { HierarchyDiagram, ConceptCube, ProcessCards, CodeFlowAnimation } from '../components/Diagram';
import { ImageGif, ImageCard3D } from '../components/ImageGif';

function Tutorial() {
  const { topicId } = useParams();
  const [copied, setCopied] = useState(false);
  const [editorCode, setEditorCode] = useState('');
  const [output, setOutput] = useState('Click "Run Code" to execute your code');
  const [isRunning, setIsRunning] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const { user, isLoggedIn, openLoginModal } = useAuth();
  const { getContribution, getAllContributions } = useContributions();

  // Get current topic data - check user contributions first
  const contribution = getContribution(topicId);
  const originalTopic = getTopicById(topicId);
  
  // Use contribution data if available, otherwise use original topic
  const currentTopic = contribution ? {
    ...originalTopic,
    ...contribution,
    title: contribution.title || originalTopic?.title,
    content: contribution.content || originalTopic?.content,
    code: contribution.code || originalTopic?.code
  } : originalTopic;

  const navigation = getNavigation(topicId);

  useEffect(() => {
    if (currentTopic?.code) {
      setEditorCode(currentTopic.code);
      setOutput('Click "Run Code" to execute your code');
    }
  }, [currentTopic]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [topicId]);

  const copyCode = async () => {
    if (currentTopic?.code) {
      await navigator.clipboard.writeText(currentTopic.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Compiling and executing...');
    
    try {
      const result = await executeWithPiston(editorCode, 'java');
      
      if (result.success) {
        setOutput(result.output || 'Program executed successfully (no output)');
      } else {
        setOutput(`Error:\n${result.error || 'Compilation/Runtime error'}`);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    if (currentTopic?.code) {
      setEditorCode(currentTopic.code);
      setOutput('Click "Run Code" to execute your code');
    }
  };

  const onChange = useCallback((value) => {
    setEditorCode(value);
  }, []);

  const handleEditClick = () => {
    if (isLoggedIn()) {
      setShowEditModal(true);
    } else {
      openLoginModal();
    }
  };

  if (!currentTopic) {
    return (
      <div className="tutorial-page">
        <h1>Topic not found</h1>
        <p>The requested tutorial topic could not be found.</p>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </div>
    );
  }

  // Parse markdown-like content
  const renderContent = (content) => {
    const lines = content.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeContent = '';
    let inTable = false;
    let tableRows = [];
    let inDiagramBlock = false;
    let diagramContent = '';
    let diagramType = '';

    const flushTable = () => {
      if (tableRows.length > 0) {
        const headerRow = tableRows[0];
        const bodyRows = tableRows.slice(2);
        elements.push(
          <table key={`table-${elements.length}`}>
            <thead>
              <tr>
                {headerRow.map((cell, i) => <th key={i}>{cell}</th>)}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => <td key={j}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        );
        tableRows = [];
        inTable = false;
      }
    };

    lines.forEach((line, index) => {
      // Check for diagram block
      if (line.trim().startsWith('```diagram')) {
        inDiagramBlock = true;
        diagramType = line.replace('```diagram', '').trim() || 'tree';
        diagramContent = '';
        return;
      }
      
      if (inDiagramBlock && line.trim().startsWith('```')) {
        try {
          const diagramData = JSON.parse(diagramContent.trim());
          elements.push(
            <HierarchyDiagram 
              key={`diagram-${index}`}
              data={diagramData}
              type={diagramType}
            />
          );
        } catch (e) {
          console.error('Error parsing diagram:', e);
        }
        diagramContent = '';
        inDiagramBlock = false;
        diagramType = '';
        return;
      }
      
      if (inDiagramBlock) {
        diagramContent += line + '\n';
        return;
      }
      
      // Check for image/GIF syntax: ![alt](url) or !gif[alt](url)
      const imageMatch = line.match(/!gif\[([^\]]*)\]\(([^)]+)\)/);
      if (imageMatch) {
        const [, alt, src] = imageMatch;
        elements.push(
          <ImageGif 
            key={`gif-${index}`}
            src={src}
            alt={alt}
            type="gif"
          />
        );
        return;
      }
      
      const staticImageMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (staticImageMatch) {
        const [, alt, src] = staticImageMatch;
        elements.push(
          <ImageGif 
            key={`img-${index}`}
            src={src}
            alt={alt}
            type="image"
          />
        );
        return;
      }
      
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <SyntaxHighlighter 
              key={`code-${index}`}
              language="java" 
              style={oneDark}
              showLineNumbers={false}
              customStyle={{
                borderRadius: '8px',
                padding: '1rem',
                fontSize: '0.9rem',
                margin: '1rem 0'
              }}
            >
              {codeContent.trim()}
            </SyntaxHighlighter>
          );
          codeContent = '';
          inCodeBlock = false;
        } else {
          flushTable();
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += line + '\n';
        return;
      }

      if (line.includes('|') && line.trim().startsWith('|')) {
        const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
        if (cells.length > 0 && !cells[0].match(/^[-:]+$/)) {
          tableRows.push(cells);
          inTable = true;
        } else if (cells[0]?.match(/^[-:]+$/)) {
          tableRows.push(cells);
        }
        return;
      } else if (inTable) {
        flushTable();
      }

      if (line.startsWith('# ')) {
        elements.push(<h1 key={index}>{line.slice(2)}</h1>);
        return;
      }
      if (line.startsWith('## ')) {
        elements.push(<h2 key={index}>{line.slice(3)}</h2>);
        return;
      }
      if (line.startsWith('### ')) {
        elements.push(<h3 key={index}>{line.slice(4)}</h3>);
        return;
      }

      if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={index}>
            <p>{line.slice(2)}</p>
          </blockquote>
        );
        return;
      }

      if (line.match(/^[-*]\s/)) {
        elements.push(<li key={index}>{formatInlineCode(line.slice(2))}</li>);
        return;
      }

      if (line.trim()) {
        elements.push(<p key={index}>{formatInlineCode(line)}</p>);
      }
    });

    flushTable();
    return elements;
  };

  const formatInlineCode = (text) => {
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i}>{part.slice(1, -1)}</code>;
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="tutorial-page fade-in">
      {/* Breadcrumb */}
      <div className="tutorial-breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <span>{currentTopic.courseTitle || 'Core Java'}</span>
        <ChevronRight size={14} />
        <span>{currentTopic.sectionTitle || 'Tutorial'}</span>
        <ChevronRight size={14} />
        <span>{currentTopic.title}</span>
      </div>

      {/* Header */}
      <div className="tutorial-header">
        <div className="tutorial-header-top">
          <h1 className="tutorial-title">{currentTopic.title}</h1>
          <button className="edit-tutorial-btn" onClick={handleEditClick}>
            <Edit3 size={16} />
            Edit Tutorial
          </button>
        </div>
        <div className="tutorial-meta">
          <span>
            <BookOpen size={16} />
            {currentTopic.sectionTitle || 'Tutorial'}
          </span>
          <span>
            <Clock size={16} />
            ~10 min read
          </span>
        </div>
      </div>

      {/* Contributor Badge - Show who added/edited */}
      {contribution && (
        <ContributorBadge contribution={contribution} />
      )}

      {/* In-Content Ad - Top */}
      <div className="in-content-ad-top">
        <AdSense 
          adSlot={ADSENSE_CONFIG.adSlots.inContentTop}
          adFormat="horizontal"
          className="in-content-ad-unit"
          style={{ margin: '2rem auto', maxWidth: '728px' }}
        />
      </div>

      {/* Content */}
      <div className="tutorial-content">
        {renderContent(currentTopic.content)}
      </div>

      {/* Code Example */}
      {currentTopic.code && (
        <div className="code-block">
          <div className="code-header">
            <div className="code-language">
              <Code size={16} />
              <span>Java</span>
            </div>
            <div className="code-actions">
              <button className="code-btn" onClick={copyCode}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="code-content">
            <SyntaxHighlighter 
              language="java" 
              style={oneDark}
              showLineNumbers={false}
              customStyle={{
                margin: 0,
                padding: 0,
                background: 'transparent',
                fontSize: '0.9rem'
              }}
            >
              {currentTopic.code}
            </SyntaxHighlighter>
          </div>
        </div>
      )}

      {/* Try It Yourself Editor */}
      {currentTopic.code && (
        <div className="try-it-section">
          <div className="try-it-header">
            <div className="try-it-title">
              <Play size={18} />
              <span>Try It Yourself - Live Code Editor</span>
            </div>
            <div className="try-it-actions">
              <button className="run-btn" onClick={resetCode} style={{ background: 'var(--bg-secondary)' }}>
                <RotateCcw size={14} />
                Reset
              </button>
              <button className="run-btn" onClick={runCode} disabled={isRunning}>
                {isRunning ? <Loader2 size={14} className="spinning" /> : <Play size={14} />}
                {isRunning ? 'Running...' : 'Run Code'}
              </button>
            </div>
          </div>
          
          <div className="try-it-editor">
            <CodeMirror
              value={editorCode}
              height="350px"
              extensions={[java()]}
              onChange={onChange}
              theme="dark"
              style={{
                fontSize: '0.9rem'
              }}
            />
          </div>
          
          <div className="try-it-output">
            <div className="try-it-output-header">
              <Terminal size={14} />
              <span>Output</span>
            </div>
            <div className="try-it-output-content">
              {output}
            </div>
          </div>
        </div>
      )}

      {/* Practice Questions */}
      {currentTopic.practiceQuestions && currentTopic.practiceQuestions.length > 0 && (
        <div className="practice-section">
          <h2>Practice Questions</h2>
          {currentTopic.practiceQuestions.map((q, index) => (
            <div key={index} className="practice-question">
              <h4>Question {index + 1}: {q.question}</h4>
              <p className="hint"><strong>Hint:</strong> {q.hint}</p>
              {q.starterCode && (
                <div className="starter-code">
                  <SyntaxHighlighter 
                    language="java" 
                    style={oneDark}
                    showLineNumbers={false}
                    customStyle={{
                      borderRadius: '8px',
                      padding: '1rem',
                      fontSize: '0.85rem'
                    }}
                  >
                    {q.starterCode}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* In-Content Ad - Bottom */}
      <div className="in-content-ad-bottom">
        <AdSense 
          adSlot={ADSENSE_CONFIG.adSlots.inContentBottom}
          adFormat="horizontal"
          className="in-content-ad-unit"
          style={{ margin: '2rem auto', maxWidth: '728px' }}
        />
      </div>

      {/* Navigation */}
      <div className="tutorial-navigation">
        {navigation.prev ? (
          <Link 
            to={`/tutorial/${navigation.prev.id}`}
            className="nav-btn prev"
          >
            <ArrowLeft size={20} />
            <div className="nav-btn-content">
              <span className="nav-btn-label">Previous</span>
              <span className="nav-btn-title">{navigation.prev.title}</span>
            </div>
          </Link>
        ) : <div />}
        
        {navigation.next ? (
          <Link 
            to={`/tutorial/${navigation.next.id}`}
            className="nav-btn next"
          >
            <div className="nav-btn-content" style={{ textAlign: 'right' }}>
              <span className="nav-btn-label">Next</span>
              <span className="nav-btn-title">{navigation.next.title}</span>
            </div>
            <ArrowRight size={20} />
          </Link>
        ) : <div />}
      </div>

      {/* Edit Modal */}
      <ContributeModal 
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        mode="edit"
        existingTopic={{
          id: topicId,
          ...currentTopic
        }}
      />
    </div>
  );
}

export default Tutorial;
