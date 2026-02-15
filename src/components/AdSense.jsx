import { useEffect, useRef, useState } from 'react';
import { ADSENSE_CONFIG, isAdSenseConfigured } from '../config/adsense';

function AdSense({ 
  adSlot = '1234567890', 
  adFormat = 'auto',
  adLayout = '',
  fullWidthResponsive = true,
  style = {},
  className = '',
  adClient = ADSENSE_CONFIG.publisherId
}) {
  const adRef = useRef(null);
  const containerRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adFailed, setAdFailed] = useState(false);

  useEffect(() => {
    try {
      if (adRef.current && window.adsbygoogle && !adRef.current.hasAttribute('data-adsbygoogle-status')) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
      setAdFailed(true);
    }
  }, []);

  // Monitor ad loading status
  useEffect(() => {
    if (!adRef.current || !isAdSenseConfigured()) return;

    const checkAdStatus = () => {
      const status = adRef.current?.getAttribute('data-adsbygoogle-status');
      if (status === 'done') {
        setAdLoaded(true);
        // Check if ad actually rendered content (has height)
        setTimeout(() => {
          const iframe = adRef.current?.querySelector('iframe');
          if (iframe && iframe.offsetHeight > 0) {
            setAdLoaded(true);
          } else {
            // Ad slot filled but no content - likely no ads available
            setAdFailed(true);
          }
        }, 500);
      } else if (status === 'error' || status === 'unfilled') {
        setAdFailed(true);
      }
    };

    // Check immediately
    checkAdStatus();

    // Set up observer to watch for status changes
    const observer = new MutationObserver(checkAdStatus);
    if (adRef.current) {
      observer.observe(adRef.current, {
        attributes: true,
        attributeFilter: ['data-adsbygoogle-status']
      });
    }

    // Timeout fallback - if ad doesn't load in 5 seconds, consider it failed
    const timeout = setTimeout(() => {
      if (!adLoaded && !adFailed) {
        setAdFailed(true);
      }
    }, 5000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [adLoaded, adFailed]);

  // Don't render if AdSense is not configured
  if (!isAdSenseConfigured()) {
    return null; // Don't show placeholder in production
  }

  // Hide container if ad failed to load (no empty space)
  if (adFailed) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className={`adsense-container ${className} ${adLoaded ? 'ad-loaded' : 'ad-loading'}`} 
      style={{
        ...style,
        minHeight: adLoaded ? 'auto' : '0',
        display: adFailed ? 'none' : 'block'
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ 
          display: 'block',
          minHeight: adLoaded ? 'auto' : '0'
        }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
}

export default AdSense;

