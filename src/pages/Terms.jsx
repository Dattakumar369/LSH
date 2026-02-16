import { Link } from 'react-router-dom';
import { Scale, AlertTriangle, Book, Code, Shield } from 'lucide-react';

function Terms() {
  return (
    <div className="tutorial-page" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <h1 className="tutorial-title">Terms of Service & Disclaimer</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <div className="tutorial-content">
        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using LearnStackHub ("the Site"), you accept and agree to be bound by the terms and 
            provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Use License</h2>
          <p>
            Permission is granted to temporarily access the materials on LearnStackHub for personal, non-commercial 
            transitory viewing only. This is the grant of a license, not a transfer of title, and under this license 
            you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to reverse engineer any software contained on the Site</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Educational Purpose</h2>
          <p>
            LearnStackHub is an educational platform designed to teach Java programming concepts. All tutorials, 
            code examples, and content are provided for educational purposes only. We strive to provide accurate 
            and up-to-date information, but we make no warranties or representations regarding the completeness 
            or accuracy of the content.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Disclaimer</h2>
          <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            border: '2px solid #fcd34d',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ marginTop: 0, color: '#92400e' }}>
              <AlertTriangle size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Important Disclaimer
            </h3>
            <p style={{ marginBottom: '1rem', color: '#78350f' }}>
              <strong>The materials on LearnStackHub are provided on an 'as is' basis.</strong> LearnStackHub makes no 
              warranties, expressed or implied, and hereby disclaims and negates all other warranties including, 
              without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, 
              or non-infringement of intellectual property or other violation of rights.
            </p>
            <p style={{ marginBottom: 0, color: '#78350f' }}>
              Further, LearnStackHub does not warrant or make any representations concerning the accuracy, likely results, 
              or reliability of the use of the materials on its website or otherwise relating to such materials or on 
              any sites linked to this site.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Limitations of Liability</h2>
          <p>
            In no event shall LearnStackHub or its suppliers be liable for any damages (including, without limitation, 
            damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
            to use the materials on LearnStackHub, even if LearnStackHub or a LearnStackHub authorized representative has 
            been notified orally or in writing of the possibility of such damage.
          </p>
          <p>
            Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability 
            for consequential or incidental damages, these limitations may not apply to you.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Code Execution Disclaimer</h2>
          <p>
            Our Site provides a code execution feature that allows you to run Java code in your browser. Please note:
          </p>
          <ul>
            <li>Code execution is provided for educational purposes only</li>
            <li>We are not responsible for any damage caused by executing code</li>
            <li>Do not execute malicious code or code that may harm systems</li>
            <li>Code execution may be subject to limitations and timeouts</li>
            <li>We reserve the right to disable code execution at any time</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2>User Contributions</h2>
          <p>
            Users may contribute tutorials, code examples, and other content to the Site. By contributing content, you:
          </p>
          <ul>
            <li>Grant us a non-exclusive, royalty-free license to use, modify, and display your contributions</li>
            <li>Represent that you own or have the right to contribute the content</li>
            <li>Agree that your contributions will be attributed to you</li>
            <li>Understand that we may edit or remove contributions that violate our policies</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Prohibited Uses</h2>
          <p>You agree not to use the Site:</p>
          <ul>
            <li>In any way that violates any applicable law or regulation</li>
            <li>To transmit any malicious code, viruses, or harmful material</li>
            <li>To impersonate or attempt to impersonate another person or entity</li>
            <li>To engage in any automated use of the system (scraping, bots, etc.)</li>
            <li>To interfere with or disrupt the Site or servers</li>
            <li>To collect or store personal data about other users</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Intellectual Property</h2>
          <p>
            The content on LearnStackHub, including but not limited to text, graphics, logos, code examples, and software,
            is the property of LearnStackHub or its content suppliers and is protected by copyright and other intellectual
            property laws.
          </p>
          <p>
            You may use the educational content for learning purposes, but you may not reproduce, distribute, or create 
            derivative works without permission, except as permitted by fair use or other applicable laws.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Advertising and Third-Party Services</h2>
          <p>
            Our Site may display advertisements provided by third-party advertising services, including Google AdSense. 
            These advertisements may be personalized based on your browsing history and interests.
          </p>
          <p>
            We use Google AdSense to serve advertisements on our Site. Google AdSense uses cookies and similar technologies 
            to provide personalized advertising. By using our Site, you consent to the use of cookies for advertising purposes.
          </p>
          <p>
            You can opt out of personalized advertising by visiting 
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer"> Google's Ads Settings</a> 
            or by adjusting your browser settings to refuse cookies.
          </p>
          <p>
            We are not responsible for the content of advertisements displayed on our Site, nor do we endorse the products 
            or services advertised. Advertisements are provided by third-party advertising networks and are subject to their 
            own terms and privacy policies.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Links to Third-Party Sites</h2>
          <p>
            Our Site may contain links to third-party websites or services that are not owned or controlled by LearnStackHub.
            We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any
            third-party websites or services.
          </p>
          <p>
            You acknowledge and agree that LearnStackHub shall not be responsible or liable for any damage or loss caused
            by or in connection with the use of any such content, goods, or services available on or through any such 
            websites or services.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Modifications</h2>
          <p>
            LearnStackHub may revise these terms of service at any time without notice. By using this website, you are 
            agreeing to be bound by the then current version of these terms of service.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with applicable laws. Any disputes 
            relating to these terms shall be subject to the exclusive jurisdiction of the courts in the applicable 
            jurisdiction.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <ul>
            <li>Email: <a href="mailto:dattudattakumar369@gmail.com">dattudattakumar369@gmail.com</a></li>
            <li>Website: <Link to="/contact">Contact Page</Link></li>
          </ul>
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

export default Terms;

