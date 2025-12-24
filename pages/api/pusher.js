// pages/api/pusher.js
import Pusher from 'pusher';

// Initialize Pusher with the keys
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // 1. Get the data sent from the Patient form
      const data = req.body; 

      // 2. Trigger the real-time event
      await pusher.trigger('agnos-channel', 'update-data', data);

      // 3. Send success back to browser
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Pusher Error:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}