import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  // We use a small piece of state to detect screen size for responsiveness
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 600);
    checkSize(); // Check on load
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f8fafc',
      fontFamily: 'sans-serif',
      padding: '20px', // Prevents text hitting edges on mobile
      textAlign: 'center'
    }}>
      <h1 style={{ 
        marginBottom: '2rem', 
        color: '#334155',
        fontSize: isMobile ? '24px' : '32px' // Smaller text on phones
      }}>
        Real-Time Patient Input Form and Staff View System
      </h1>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row', // STACK ON MOBILE
        gap: '20px',
        width: isMobile ? '100%' : 'auto',
        maxWidth: '400px'
      }}>
        <Link href="/patient" style={{ width: '100%' }}>
          <button style={{
            padding: '15px 30px',
            fontSize: '18px',
            cursor: 'pointer',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            width: '100%' // Full width buttons on mobile
          }}>
            Go to Patient Form
          </button>
        </Link>

        <Link href="/staff" style={{ width: '100%' }}>
          <button style={{
            padding: '15px 30px',
            fontSize: '18px',
            cursor: 'pointer',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            width: '100%' // Full width buttons on mobile
          }}>
            Go to Staff Dashboard
          </button>
        </Link>
      </div>
      
      <p style={{ marginTop: '2rem', color: '#64748b', fontSize: '14px' }}>
        Open these in two separate windows to test real-time sync.
      </p>
    </div>
  );
}