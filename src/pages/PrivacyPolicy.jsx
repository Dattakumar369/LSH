import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, FileText, Cookie } from 'lucide-react';

function PrivacyPolicy() {
  return (
    <div className="tutorial-page" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <h1 className="tutorial-title">Privacy Policy</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <div className="tutorial-content">
        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Introduction</h2>
          <p>
            Welcome to LearnStackHub ("we," "our," or "us"). We are committed to protecting your privacy and ensuring
            you have a positive experience on our website. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you visit our website <strong>learnstackhub.com</strong> (the "Site").
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Information We Collect</h2>
          
          <h3>Information You Provide</h3>
          <p>We may collect information that you voluntarily provide to us, including:</p>
          <ul>
            <li>Name and email address when you sign in or contribute content</li>
            <li>Content you submit, such as tutorial contributions or comments</li>
            <li>Feedback and communications you send to us</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>When you visit our Site, we automatically collect certain information, including:</p>
          <ul>
            <li>Browser type and version</li>
            <li>Device information (type, operating system)</li>
            <li>IP address and general location</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website addresses</li>
            <li>Date and time of visits</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process your contributions and display attribution</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Send you updates about our services (with your consent)</li>
            <li>Analyze usage patterns to improve user experience</li>
            <li>Detect and prevent fraud or abuse</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Google AdSense</h2>
          <p>
            Our Site uses Google AdSense, a service provided by Google LLC ("Google") for displaying advertisements. 
            Google AdSense uses cookies and similar technologies to serve ads based on your prior visits to our Site 
            or other websites.
          </p>
          <p>
            Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit 
            to our Site and/or other sites on the Internet. You may opt out of personalized advertising by visiting 
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer"> Google's Ads Settings</a>.
          </p>
          <p>
            For more information about how Google uses data when you use our Site, please visit: 
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
              Google's Privacy & Terms
            </a>
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our Site and store certain information. 
            Cookies are files with a small amount of data that may include an anonymous unique identifier.
          </p>
          <p>Types of cookies we use:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for the Site to function properly</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our Site</li>
            <li><strong>Advertising Cookies:</strong> Used by Google AdSense to deliver relevant advertisements</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
          </ul>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, 
            if you do not accept cookies, you may not be able to use some portions of our Site.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Data Storage and Security</h2>
          <p>
            We store your information locally in your browser (localStorage and sessionStorage) for the following purposes:
          </p>
          <ul>
            <li>Maintaining your login session</li>
            <li>Saving your tutorial contributions</li>
            <li>Remembering your preferences</li>
          </ul>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal information. 
            However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Third-Party Services</h2>
          <p>We may use third-party services that collect information used to identify you, including:</p>
          <ul>
            <li><strong>Google AdSense:</strong> For advertising services</li>
            <li><strong>Piston API:</strong> For code execution (no personal data collected)</li>
            <li><strong>GitHub Pages:</strong> For hosting our Site</li>
          </ul>
          <p>
            These third parties have their own privacy policies addressing how they use such information.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Your Rights</h2>
          <p>Depending on your location, you may have the following rights regarding your personal information:</p>
          <ul>
            <li>Access: Request access to your personal information</li>
            <li>Correction: Request correction of inaccurate information</li>
            <li>Deletion: Request deletion of your personal information</li>
            <li>Objection: Object to processing of your personal information</li>
            <li>Data Portability: Request transfer of your data</li>
            <li>Withdraw Consent: Withdraw consent for data processing</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided in the Contact section.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Children's Privacy</h2>
          <p>
            Our Site is not intended for children under the age of 13. We do not knowingly collect personal information 
            from children under 13. If you are a parent or guardian and believe your child has provided us with personal 
            information, please contact us.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
            Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy 
            Policy periodically for any changes.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
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

export default PrivacyPolicy;

