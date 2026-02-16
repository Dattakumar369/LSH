// Script to generate sitemap.xml for Google Search Console
// Run: node scripts/generate-sitemap.js
// This will create public/sitemap.xml with all tutorial pages

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://learnstackhub.com';
const currentDate = new Date().toISOString().split('T')[0];

// Static pages
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact', priority: '0.7', changefreq: 'monthly' },
  { url: '/privacy', priority: '0.5', changefreq: 'yearly' },
  { url: '/terms', priority: '0.5', changefreq: 'yearly' },
];

// Import getAllTopics from the data index
// We need to use dynamic import since we're in a Node.js script
async function generateSitemap() {
  try {
    // Use createRequire to import the ES module
    const require = createRequire(import.meta.url);
    const dataPath = path.join(__dirname, '..', 'src', 'data', 'index.js');
    
    // For ES modules, we need to use dynamic import
    // Since the data files are ES modules, we'll read and parse them
    // Alternative: use a build tool or convert to CommonJS
    
    // For now, let's manually list all topics by reading the course structure
    // This is a comprehensive list based on the course structure
    
    const tutorialPages = [];
    
    // Read the course structure file to extract all topic IDs
    const courseStructureFile = fs.readFileSync(dataPath, 'utf8');
    
    // Extract all topic imports and IDs from the file
    // This regex finds topic imports and their usage in sections
    const topicImportRegex = /import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g;
    const topicUsageRegex = /(\w+)(?:,|\s*$)/gm;
    
    // We'll use a simpler approach: manually maintain the list or parse the structure
    // Since parsing ES modules in Node.js is complex, let's create a comprehensive list
    
    // HTML Topics
    const htmlTopics = [
      'html-introduction', 'html-structure', 'html-links', 'html-images',
      'html-lists', 'html-tables', 'html-forms', 'html-semantic-elements',
      'html-media', 'html-iframe', 'html-marquee', 'html-dom', 'html-best-practices'
    ];
    
    // CSS Topics
    const cssTopics = [
      'css-introduction', 'css-selectors', 'css-colors-backgrounds', 'css-box-model',
      'css-text-fonts', 'css-display-positioning', 'css-flexbox', 'css-grid',
      'css-responsive', 'css-animations'
    ];
    
    // Core Java - Basics
    const javaBasicsTopics = [
      'java-introduction', 'java-features', 'java-environment-setup', 'java-syntax',
      'java-variables', 'java-data-types', 'java-operators', 'java-methods', 'java-keywords'
    ];
    
    // Core Java - Control Flow
    const javaControlFlowTopics = [
      'if-else', 'switch-statement', 'for-loop', 'while-loop',
      'do-while-loop', 'break-continue'
    ];
    
    // Core Java - OOPs
    const javaOOPsTopics = [
      'classes-objects', 'constructors', 'this-keyword', 'static-keyword',
      'inheritance', 'method-overriding', 'super-keyword', 'polymorphism',
      'abstraction', 'interfaces', 'encapsulation', 'access-modifiers',
      'final-keyword', 'abstract-classes', 'nested-classes', 'wrapper-classes'
    ];
    
    // Core Java - Arrays
    const javaArraysTopics = [
      'single-dimensional-array', 'multi-dimensional-array', 'array-methods'
    ];
    
    // Core Java - Strings
    const javaStringsTopics = [
      'string-introduction', 'string-methods', 'stringbuffer', 'stringbuilder'
    ];
    
    // Core Java - Collections
    const javaCollectionsTopics = [
      'collections-introduction', 'arraylist', 'linkedlist', 'vector',
      'stack', 'queue', 'priorityqueue', 'hashset', 'linkedhashset',
      'treeset', 'hashmap', 'linkedhashmap', 'treemap', 'hashtable'
    ];
    
    // Core Java - Exception Handling
    const javaExceptionTopics = [
      'exception-introduction', 'try-catch', 'finally-block', 'throw-throws',
      'custom-exceptions', 'exception-best-practices'
    ];
    
    // Core Java - Multithreading
    const javaMultithreadingTopics = [
      'multithreading-introduction', 'thread-lifecycle', 'thread-methods',
      'synchronization', 'deadlock', 'inter-thread-communication'
    ];
    
    // JDBC Topics
    const jdbcTopics = [
      'jdbc-introduction', 'jdbc-architecture', 'jdbc-drivers', 'jdbc-connection',
      'jdbc-statement', 'jdbc-preparedstatement', 'jdbc-callablestatement',
      'jdbc-resultset', 'jdbc-metadata', 'jdbc-batch-processing', 'jdbc-transactions',
      'jdbc-project-setup'
    ];
    
    // MySQL Topics
    const mysqlTopics = [
      'mysql-introduction', 'mysql-installation', 'mysql-create-database',
      'mysql-data-types', 'mysql-ddl', 'mysql-dql', 'mysql-select',
      'mysql-insert-update-delete', 'mysql-clauses', 'mysql-joins',
      'mysql-subqueries', 'mysql-aggregate-functions', 'mysql-scalar-functions',
      'mysql-constraints', 'mysql-indexes', 'mysql-views', 'mysql-stored-procedures',
      'mysql-triggers', 'mysql-transactions', 'mysql-privileges'
    ];
    
    // Servlet Topics
    const servletTopics = [
      'servlet-introduction', 'servlet-architecture', 'servlet-lifecycle',
      'servlet-request-response', 'servlet-session-management', 'servlet-cookies',
      'servlet-filter', 'servlet-listener', 'servlet-annotations',
      'servlet-frontend-integration', 'tomcat-server'
    ];
    
    // JSP Topics
    const jspTopics = [
      'jsp-introduction', 'jsp-architecture', 'jsp-lifecycle', 'jsp-scripting-elements',
      'jsp-directives', 'jsp-actions', 'jsp-implicit-objects', 'jsp-expression-language',
      'jsp-jstl', 'jsp-custom-tags', 'jsp-mvc-pattern'
    ];
    
    // Hibernate Topics
    const hibernateTopics = [
      'hibernate-introduction', 'hibernate-architecture', 'hibernate-configuration',
      'hibernate-mapping', 'hibernate-relationships', 'hibernate-hql',
      'hibernate-locking', 'hibernate-caching', 'hibernate-batch-processing',
      'hibernate-project-setup'
    ];
    
    // Combine all topics
    const allTopicIds = [
      ...htmlTopics,
      ...cssTopics,
      ...javaBasicsTopics,
      ...javaControlFlowTopics,
      ...javaOOPsTopics,
      ...javaArraysTopics,
      ...javaStringsTopics,
      ...javaCollectionsTopics,
      ...javaExceptionTopics,
      ...javaMultithreadingTopics,
      ...jdbcTopics,
      ...mysqlTopics,
      ...servletTopics,
      ...jspTopics,
      ...hibernateTopics
    ];
    
    // Create tutorial pages
    allTopicIds.forEach(topicId => {
      tutorialPages.push({
        url: `/tutorial/${topicId}`,
        priority: '0.9',
        changefreq: 'weekly',
        lastmod: currentDate
      });
    });
    
    // Combine all pages
    const allPages = [...staticPages, ...tutorialPages];
    
    // Generate XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;
    
    allPages.forEach(page => {
      xml += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    });
    
    xml += `</urlset>`;
    
    // Write to public directory
    const publicDir = path.join(__dirname, '..', 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, xml, 'utf8');
    
    console.log(`✅ Sitemap generated successfully!`);
    console.log(`📄 Location: ${sitemapPath}`);
    console.log(`🌐 URL: ${baseUrl}/sitemap.xml`);
    console.log(`📊 Total URLs: ${allPages.length}`);
    console.log(`   - Static pages: ${staticPages.length}`);
    console.log(`   - Tutorial pages: ${tutorialPages.length}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the generator
generateSitemap();
