# Real-Time Patient Input Form and Staff View System.

A live patient form that instantly sends data to a staff dashboard using **Next.js**, **TailwindCSS**, and **Pusher**.

## 🚀 Quick Setup

1.  **Clone & Install:**
    ```bash
    git clone [YOUR_GITHUB_LINK_HERE]
    cd [YOUR_FOLDER_NAME]
    npm install
    ```

2.  **Add Keys:**
    Create a `.env.local` file and add your Pusher keys:
    ```env
    NEXT_PUBLIC_PUSHER_KEY=your_key_here
    NEXT_PUBLIC_PUSHER_CLUSTER=your_cluster_here
    PUSHER_APP_ID=your_app_id_here
    PUSHER_SECRET=your_secret_here
    ```

3.  **Run:**
    ```bash
    npm run dev
    ```
    * **Patient:** `http://localhost:3000/patient`
    * **Staff:** `http://localhost:3000/staff`

---

## 📚 Development & Planning

### 1. Project Structure
* `pages/patient.js`: The main form where users enter data. It handles validation and sends the data to the backend.
* `pages/staff.js`: The dashboard for staff. It connects to the real-time channel to show new patients automatically.
* `pages/api/pusher.js`: The backend route that receives the data and triggers the Pusher event.
* `styles/`: I used CSS modules here to keep styles organized for each page.

### 2. Design Decisions
* **Mobile-First:** I used TailwindCSS to make sure the form looks good on phones (vertical stack) and desktops (grid layout).
* **Status Indicators:**
    * **Filling:** When a patient types, the staff sees a green "Live Input" badge.
    * **Submitted:** When the form is done, it locks the inputs and turns blue to show it's finished.

### 3. Component Architecture
* **PatientForm:** This component handles all the user input. I added a "Lock" feature (`isSubmitted` state) to make sure the form stops sending updates once the user clicks Submit.
* **StaffDashboard:** This component just listens for updates. It updates the screen instantly whenever new data comes in from Pusher.

### 4. How the Real-Time Works
1.  **Input:** The patient fill the form and can update.
2.  **Wait:** The code waits 0.5 seconds (debouncing) so we don't send too many requests.
3.  **Send:** The data is sent to the API.
4.  **Broadcast:** The API tells Pusher to send an update.
5.  **Update:** The Staff page receives the update and see the patient's information on the screen.

---

## ✅ Checklist
- [x] Responsive Design
- [x] Real-Time Sync
- [x] Form Validation
- [x] Deployed to Vercel