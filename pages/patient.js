import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from '@/styles/Patient.module.css';

export default function PatientForm() {
  const [status, setStatus] = useState('Idle');
  const { register, watch, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const allFields = watch();

  // REAL-TIME SYNC
  useEffect(() => {
    // 1. If we are in "Submitted" mode, STOP sending updates.
    if (isSubmitted) return;

    const sendUpdate = async () => {
      if (Object.keys(allFields).length > 0) {
        setStatus('Syncing...');
        try {
          await fetch('/api/pusher', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              ...allFields, 
              status: 'Filling' 
            }),
          });
          setStatus('Connected');
        } catch (error) {
          console.error(error);
          setStatus('Error');
        }
      }
    };

    const timeoutId = setTimeout(() => sendUpdate(), 500);
    return () => clearTimeout(timeoutId);
  }, [allFields, isSubmitted]); 

  // SUBMIT LOGIC
  const onSubmit = async (data) => {
    // 1. Lock the local state IMMEDIATELY to prevent "Green Flash" on staff side
    setIsSubmitted(true); 

    // 2. Send the final "Submitted" signal to Pusher
    await fetch('/api/pusher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, status: 'Submitted' }),
    });

    // 3. SHOW POP-UP (User clicks OK to continue)
    alert("Application Submitted Successfully!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>PATIENT FORM</h1>
          <span className={`${styles.statusBadge} ${status === 'Connected' ? styles.statusConnected : styles.statusIdle}`}>
            {status}
          </span>
        </div>

        {/* onChange={() => setIsSubmitted(false)}
            This detects when the user starts typing again (to fix a mistake). 
            It unlocks the form and lets the Staff see "Filling" again.
        */}
        <form 
          onSubmit={handleSubmit(onSubmit)}
          onChange={() => setIsSubmitted(false)}
        >
          <div className={styles.formGrid}>
            
            {/* ROW 1: Names */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>First Name</label>
              <input {...register("firstName", { required: true })} className={styles.input} />
              {errors.firstName && <span className={styles.error}>Required</span>}
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Middle Name (optional)</label>
              <input {...register("middleName")} className={styles.input} />
            </div>

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Last Name</label>
              <input {...register("lastName", { required: true })} className={styles.input} />
              {errors.lastName && <span className={styles.error}>Required</span>}
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Date of Birth</label>
              <input 
                type="date" 
                {...register("dob", { required: true })} 
                className={styles.input}
                onClick={(e) => e.target.showPicker && e.target.showPicker()} 
              />
              {errors.dob && <span className={styles.error}>Required</span>}
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Gender</label>
              <select {...register("gender", { required: true })} className={styles.input}>
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <span className={styles.error}>Required</span>}
            </div>

            {/* ROW 3: Contact */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Phone Number</label>
              <input type="tel" {...register("phone", { required: true })} className={styles.input} placeholder="081-xxx-xxxx" />
              {errors.phone && <span className={styles.error}>Required</span>}
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Email</label>
              <input type="email" {...register("email", { required: true })} className={styles.input} placeholder="name@example.com" />
              {errors.email && <span className={styles.error}>Required</span>}
            </div>

            {/* ROW 4: Address (Full Width) */}
            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Address</label>
              <input {...register("address", { required: true })} className={styles.input} />
              {errors.address && <span className={styles.error}>Required</span>}
            </div>

            {/* ROW 5: Demographics */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Preferred Language</label>
              <input {...register("language")} className={styles.input} />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Nationality</label>
              <input {...register("nationality")} className={styles.input} />
            </div>

            {/* ROW 6: Optional Info */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Emergency Contact</label>
              <input {...register("emergencyContact")} className={styles.input} placeholder="Name & Relationship" />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Religion (optional)</label>
              <input {...register("religion")} className={styles.input} />
            </div>

          </div>

          {/* --- BUTTON LOGIC --- */}
          {/* Always show button, change text if submitted. No Green Box below. */}
          <button type="submit" className={styles.submitButton}>
            {isSubmitted ? "Update Application" : "Submit Application"}
          </button>
          
        </form>
      </div>
    </div>
  );
}