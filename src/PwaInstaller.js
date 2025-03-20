import React, { useState, useEffect } from 'react';

const PwaInstaller = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installable, setInstallable] = useState(false);
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);

  // Detect PWA installation state
  useEffect(() => {
    const checkInstalled = () => {
      setIsInstalled(window.matchMedia('(display-mode: standalone)').matches);
    };

    checkInstalled();
    window.addEventListener('appinstalled', checkInstalled);
    return () => window.removeEventListener('appinstalled', checkInstalled);
  }, []);

  // Handle installation prompt events
  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallable(true); // The app can be installed
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  // Trigger installation
  const handleInstall = async (e) => {
    e.preventDefault();
    if (!privacyPolicyAccepted) {
      alert('Please accept the privacy policy to proceed with the installation.');
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsInstalled(true);
      }
      return;
    }

    // Fallback instructions
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
      alert('To install this app, tap the Share button and then "Add to Home Screen".');
    } else {
      alert('To install this app, follow the instructions for your browser or device.');
      window.open('https://support.google.com/chrome/answer/9658361', '_blank');
    }
  };

  // Render based on the installation state and device capabilities
  const renderContent = () => {
    if (isInstalled) {
      return (
        <div style={{ textAlign: 'center', padding: '20px', color: '#00563B' }}>
          <p>New Life Covenant Church app is already installed.</p>
        </div>
      );
    }

    if (!installable) {
      return (
        <div style={{ textAlign: 'center', padding: '20px', color: '#00563B' }}>
          <h3>New Life Covenant Church</h3>
          <p>
            To install this app, please use a supported browser on a mobile device.
          </p>
          <p>
            <strong>For iOS:</strong> Open this page in Safari, tap the Share button, and select "Add to Home Screen."
          </p>
          <p>
            <strong>For Android:</strong> Follow the instructions in your browser to add this app to your home screen.
          </p>
        </div>
      );
    }

    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        maxWidth: '300px',
        color: '#00563B'
      }}>
        <h3 style={{ marginBottom: '10px' }}>New Life Covenant Church</h3>
        <p style={{ marginBottom: '10px' }}>
          Complete your registration and gain access to all our features, including event updates, NLCC ministries, cell groups, and spiritual resources.
        </p>
        <div style={{ marginBottom: '10px' }}>
          <label>
            <input
              type="checkbox"
              checked={privacyPolicyAccepted}
              onChange={(e) => setPrivacyPolicyAccepted(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            I agree to the{' '}
            <a
              href="https://gasglide.com/policies/Privacy%20Policy%20for%20NLCC.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#00563B', textDecoration: 'underline' }}
            >
              Privacy Policy
            </a>
          </label>
        </div>
        <button
          onClick={handleInstall}
          style={{
            padding: '12px 24px',
            backgroundColor: '#00563B',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            width: '100%'
          }}
          aria-label="Install application"
          disabled={!privacyPolicyAccepted}
        >
          Install App
        </button>
      </div>
    );
  };

  return renderContent();
};

export default PwaInstaller;


// import React, { useState, useEffect } from 'react';

// const PwaInstaller = () => {
//   const [deferredPrompt, setDeferredPrompt] = useState(null);
//   const [isInstalled, setIsInstalled] = useState(false);
//   const [installable, setInstallable] = useState(false);

//   // Detect PWA installation state
//   useEffect(() => {
//     const checkInstalled = () => {
//       setIsInstalled(window.matchMedia('(display-mode: standalone)').matches);
//     };
    
//     checkInstalled();
//     window.addEventListener('appinstalled', checkInstalled);
//     return () => window.removeEventListener('appinstalled', checkInstalled);
//   }, []);

//   // Handle installation prompt events
//   useEffect(() => {
//     const handleBeforeInstall = (e) => {
//       e.preventDefault();
//       setDeferredPrompt(e);
//     };

//     const checkInstallability = () => {
//       const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
//         .test(navigator.userAgent);
//       setInstallable(isMobile && !!deferredPrompt);
//     };

//     window.addEventListener('beforeinstallprompt', handleBeforeInstall);
//     window.addEventListener('resize', checkInstallability);
    
//     checkInstallability();
//     return () => {
//       window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
//       window.removeEventListener('resize', checkInstallability);
//     };
//   }, [deferredPrompt]);

//   // Trigger installation
//   const handleInstall = async (e) => {
//     e.preventDefault();
//     if (deferredPrompt) {
//       deferredPrompt.prompt();
//       const { outcome } = await deferredPrompt.userChoice;
//       if (outcome === 'accepted') {
//         setDeferredPrompt(null);
//         setIsInstalled(true);
//       }
//       return;
//     }

//     // Fallback instructions
//     const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
//     if (isIOS) {
//       alert('Tap Share → Add to Home Screen');
//     } else {
//       window.open('https://support.google.com/chrome/answer/9658361', '_blank');
//     }
//   };

//   if (isInstalled || !installable) return null;

//   return (
//     <button 
//       onClick={handleInstall}
//       style={{
//         position: 'fixed',
//         bottom: '20px',
//         right: '20px',
//         padding: '12px 24px',
//         backgroundColor: '#2196F3',
//         color: 'white',
//         borderRadius: '8px',
//         border: 'none',
//         cursor: 'pointer',
//         boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
//       }}
//       aria-label="Install application"
//     >
//       Install App
//     </button>
//   );
// };

// export default PwaInstaller;