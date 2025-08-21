import React, { useEffect, useState } from 'react';
import api from '../api/api';

interface Phrase {
  id: number;
  text: string;
}

const AdminDashboard: React.FC = () => {
  const [pendingPhrases, setPendingPhrases] = useState<Phrase[]>([]);

  const fetchPendingPhrases = () => {
    api.get('/phrases/pending/')
      .then((response: any) => {
        setPendingPhrases(response.data);
      })
      .catch((error: any) => {
        console.error('Failed to fetch pending phrases', error);
        // Handle unauthorized access or other errors
      });
  };

  useEffect(() => {
    fetchPendingPhrases();
  }, []);

  const handleApprove = (id: number) => {
    api.patch(`/phrases/${id}/approve/`)
      .then(() => {
        fetchPendingPhrases(); // Refresh the list
      })
      .catch((error: any) => {
        console.error('Failed to approve phrase', error);
      });
  };

  return (
    <div>
      <h2>Admin Dashboard - Pending Phrases</h2>
      {pendingPhrases.map(phrase => (
        <div key={phrase.id} className="phrase-card">
          <p>"{phrase.text}"</p>
          <button onClick={() => handleApprove(phrase.id)}>Approve</button>
          {/* Add a deny button/logic if needed */}
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
