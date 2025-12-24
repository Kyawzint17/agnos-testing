import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import styles from '@/styles/Staff.module.css';

export default function StaffPage() {
  const [patientData, setPatientData] = useState(null);

  const handleDismiss = () => {
    if (confirm("Clear this patient from the dashboard?")) {
      setPatientData(null);
    }
  };

  useEffect(() => {
    // --- CONNECT TO PUSHER ---
    const pusher = new Pusher('762964500baed9aab0ee', { 
      cluster: 'ap1'
    });

    const channel = pusher.subscribe('agnos-channel');
    channel.bind('update-data', (data) => {
      setPatientData(data);
    });

    return () => {
      pusher.unsubscribe('agnos-channel');
    };
  }, []);

  const isSubmitted = patientData?.status === 'Submitted';

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.headerTitle}>Staff Dashboard</h1>
        
        {!patientData && (
          <div className={styles.emptyState}>
            Waiting for new patients to check in...
          </div>
        )}

        {patientData && (
          <div className={`${styles.card} ${isSubmitted ? styles.cardSubmitted : styles.cardActive}`}>
            
            {/* --- HEADER: FULL NAME --- */}
            <div className={styles.cardHeader}>
              <div>
                <h2 className={styles.patientName}>
                  {patientData.firstName} {patientData.middleName} {patientData.lastName}
                </h2>
                
                {!isSubmitted && (
                  <div className={styles.liveIndicator}>
                    <span className={styles.liveDot}></span> Live Input...
                  </div>
                )}
              </div>
              
              <span className={`${styles.statusBadge} ${isSubmitted ? styles.badgeBlue : styles.badgeGreen}`}>
                {patientData.status}
              </span>
            </div>

            <div className={styles.cardBody}>
              
              {/* --- PERSONAL DETAILS --- */}
              <h3 style={{fontSize:'12px', color:'#94a3b8', fontWeight:'700', textTransform:'uppercase', marginBottom:'15px', marginTop:'0'}}>
                Personal Details
              </h3>

              <div className={styles.infoRow}>
                <span className={styles.label}>Date of Birth:</span>
                <span className={styles.value}>{patientData.dob || "---"}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Gender:</span>
                <span className={styles.value}>{patientData.gender || "---"}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Nationality:</span>
                <span className={styles.value}>{patientData.nationality || "---"}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Religion:</span>
                <span className={styles.value}>{patientData.religion || "---"}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Language:</span>
                <span className={styles.value}>{patientData.language || "---"}</span>
              </div>

              {/* --- CONTACT INFORMATION --- */}
              <h3 style={{fontSize:'12px', color:'#94a3b8', fontWeight:'700', textTransform:'uppercase', marginBottom:'15px', marginTop:'20px'}}>
                Contact Information
              </h3>

              <div className={styles.infoRow}>
                <span className={styles.label}>Phone:</span>
                <span className={styles.value}>{patientData.phone || "---"}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Email:</span>
                <span className={styles.value}>{patientData.email || "---"}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Address:</span>
                <span className={styles.value}>{patientData.address || "---"}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Emergency Contact:</span>
                <span className={styles.value}>{patientData.emergencyContact || "---"}</span>
              </div>

            </div>

            <button onClick={handleDismiss} className={styles.dismissButton}>
              Dismiss / Clear Patient
            </button>

          </div>
        )}
      </div>
    </div>
  );
}