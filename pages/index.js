import Link from 'next/link';
import styles from '@/styles/Home.module.css'; // or just use inline styles if you prefer

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f8fafc',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ marginBottom: '2rem', color: '#334155' }}>
        Real-Time Patient Input Form and Staff View System.
      </h1>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link href="/patient">
          <button style={{
            padding: '15px 30px',
            fontSize: '18px',
            cursor: 'pointer',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold'
          }}>
            Go to Patient Form
          </button>
        </Link>

        <Link href="/staff">
          <button style={{
            padding: '15px 30px',
            fontSize: '18px',
            cursor: 'pointer',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold'
          }}>
            Go to Staff Dashboard
          </button>
        </Link>
      </div>
      
      <p style={{ marginTop: '2rem', color: '#64748b' }}>
        Open these in two separate windows to test real-time sync.
      </p>
    </div>
  );
}