import { Link } from 'react-router-dom';
import { Target, Users, BookOpen, Code, Rocket, Heart, Award } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';

function About() {
  return (
    <div className="tutorial-page" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <SEOHead 
        title="About Us - LearnStackHub" 
        description="Learn about LearnStackHub - a free platform for learning Java Full Stack Development with interactive tutorials and live code execution."
      />
      <StructuredData type="Organization" />
      <h1 className="tutorial-title">About LearnStackHub</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
        Your complete journey from Core Java fundamentals to cloud-ready full-stack development
      </p>

      <div className="tutorial-content">
        <section style={{ marginBottom: '3rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            padding: '3rem',
            color: 'white',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <h2 style={{ color: 'white', marginBottom: '1rem' }}>Our Mission</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', margin: 0 }}>
              To make quality Java education accessible to everyone, from complete beginners to experienced developers 
              looking to master cloud-ready full-stack development. We believe learning should be interactive, practical, 
              and free.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>What is LearnStackHub?</h2>
          <p>
            LearnStackHub is a comprehensive, interactive learning platform designed to take you from Java fundamentals 
            all the way to building cloud-ready applications. Whether you're just starting your programming journey or 
            looking to expand your skills, we provide step-by-step tutorials, real-world examples, and hands-on practice.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>What We Offer</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <BookOpen size={40} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Comprehensive Tutorials</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>
                Step-by-step guides covering Core Java, JDBC, Servlets, and JSP with clear explanations
              </p>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <Code size={40} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Live Code Editor</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>
                Write and execute Java code directly in your browser - no setup or installation required
              </p>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <Rocket size={40} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Cloud-Focused</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>
                Learn concepts that prepare you for cloud deployment and modern development practices
              </p>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <Heart size={40} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>100% Free</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>
                Quality education accessible to everyone, forever free with no hidden costs
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>Our Learning Path</h2>
          <p>
            LearnStackHub offers a comprehensive and ever-expanding curriculum designed to build your skills progressively. 
            Our learning path covers everything from the fundamentals to advanced topics, with new tutorials being added regularly 
            to keep up with industry trends and technologies.
          </p>
          <p style={{ marginTop: '1rem' }}>
            Currently, we cover:
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>HTML & CSS:</strong> Build the foundation of web development with modern HTML5 and CSS3
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Core Java:</strong> Master the fundamentals - variables, OOP, collections, multithreading, and more
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>JDBC:</strong> Learn database connectivity with Java Database Connectivity
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>MySQL:</strong> Comprehensive database management and SQL queries
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Servlets:</strong> Build dynamic web applications with Java Servlets
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>JSP:</strong> Create powerful server-side web pages with JavaServer Pages
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Hibernate:</strong> Master ORM (Object-Relational Mapping) for efficient database operations
            </li>
          </ul>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
            And we're constantly adding more! Our platform grows with your learning needs, covering new frameworks, 
            tools, and best practices as they emerge in the industry.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>Why Choose LearnStackHub?</h2>
          <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{
              background: 'var(--bg-tertiary)',
              padding: '1.25rem',
              borderRadius: '10px',
              borderLeft: '4px solid var(--accent-primary)'
            }}>
              <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Target size={20} />
                Clear Learning Path
              </h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                Structured curriculum that takes you from beginner to advanced, with each concept building on the previous one.
              </p>
            </div>

            <div style={{
              background: 'var(--bg-tertiary)',
              padding: '1.25rem',
              borderRadius: '10px',
              borderLeft: '4px solid var(--accent-primary)'
            }}>
              <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Code size={20} />
                Hands-On Practice
              </h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                Every tutorial includes code examples you can run immediately. Practice makes perfect!
              </p>
            </div>

            <div style={{
              background: 'var(--bg-tertiary)',
              padding: '1.25rem',
              borderRadius: '10px',
              borderLeft: '4px solid var(--accent-primary)'
            }}>
              <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={20} />
                Community Driven
              </h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                Contribute tutorials, suggest improvements, and help others learn. We're building this together!
              </p>
            </div>

            <div style={{
              background: 'var(--bg-tertiary)',
              padding: '1.25rem',
              borderRadius: '10px',
              borderLeft: '4px solid var(--accent-primary)'
            }}>
              <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={20} />
                Industry-Relevant
              </h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                Learn skills that are in demand. Our tutorials focus on real-world applications and best practices.
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>Our Commitment</h2>
          <p>
            At LearnStackHub, we're committed to:
          </p>
          <ul>
            <li>Providing high-quality, accurate, and up-to-date content</li>
            <li>Keeping education free and accessible to everyone</li>
            <li>Continuously improving based on user feedback</li>
            <li>Maintaining a supportive learning community</li>
            <li>Respecting user privacy and data security</li>
          </ul>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>Get Involved</h2>
          <p>
            LearnStackHub is a community-driven platform. You can contribute by:
          </p>
          <ul>
            <li>Adding new tutorials or improving existing ones</li>
            <li>Reporting errors or suggesting improvements</li>
            <li>Sharing LearnStackHub with others who want to learn</li>
            <li>Providing feedback to help us improve</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>
            <Link to="/contact" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Get in Touch
            </Link>
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2>Thank You</h2>
          <p>
            Thank you for choosing LearnStackHub for your Java learning journey. We're excited to be part of your 
            development as a programmer. Whether you're building your first "Hello World" or deploying to the cloud, 
            we're here to help you succeed.
          </p>
          <p style={{ marginTop: '1rem', fontWeight: '600', color: 'var(--accent-primary)' }}>
            Happy Learning! ☁️
          </p>
        </section>

        <section style={{ 
          marginTop: '3rem', 
          paddingTop: '2rem', 
          borderTop: '2px solid var(--border-color)',
          textAlign: 'center'
        }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Created with ❤️ by
          </p>
          <p style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--accent-primary)' }}>
            Dattakumar
          </p>
        </section>
      </div>

      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px solid var(--border-color)' }}>
        <Link to="/" className="btn btn-primary">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default About;

