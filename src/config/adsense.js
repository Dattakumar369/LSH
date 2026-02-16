// Google AdSense Configuration
// Replace these values with your actual AdSense IDs after approval

export const ADSENSE_CONFIG = {
  // Your AdSense Publisher ID (from AdSense dashboard)
  // Format: ca-pub-XXXXXXXXXX
  publisherId: 'ca-pub-2176490979231754',
  
  // Ad Slot IDs (create these in your AdSense dashboard)
  adSlots: {
    // Top banner ad (after header)
    topBanner: '2222222222',
    
    // Sidebar ad (in sidebar)
    sidebar: '1111111111',
    
    // Bottom banner ad (before footer)
    bottomBanner: '3333333333',
    
    // In-content ad (top of tutorial content)
    inContentTop: '4444444444',
    
    // In-content ad (bottom of tutorial content)
    inContentBottom: '5555555555',
    
    // Home page ad
    homePage: '6666666666'
  }
};

// Check if AdSense is configured
export const isAdSenseConfigured = () => {
  return ADSENSE_CONFIG.publisherId !== 'ca-pub-XXXXXXXXXXXXXXXX';
};


