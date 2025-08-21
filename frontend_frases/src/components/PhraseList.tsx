import React, { useEffect, useState } from 'react';
import api from '../api/api';

interface Phrase {
  id: number;
  text: string;
  author_username: string;
  upvotes: number;
  downvotes: number;
}

const PhraseList: React.FC = () => {
  const [phrases, setPhrases] = useState<Phrase[]>([]);

  const fetchPhrases = () => {
    api.get('/phrases/').then(response => {
      setPhrases(response.data);
    });
  };

  useEffect(() => {
    fetchPhrases();
  }, []);

  const handleVote = async (id: number, action: 'upvote' | 'downvote') => {
    try {
      // Assumes user is logged in
      await api.patch(`/phrases/${id}/vote/`, { action });
      fetchPhrases(); // Refetch phrases to show updated vote counts
    } catch (error) {
      console.error('Vote failed', error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div>
      {phrases.map(phrase => (
        <div key={phrase.id} className="phrase-card">
          <p>"{phrase.text}"</p>
          <small>by {phrase.author_username || 'unknown'}</small>
          <div className="vote-buttons">
            <button onClick={() => handleVote(phrase.id, 'upvote')}>Upvote ({phrase.upvotes})</button>
            <button onClick={() => handleVote(phrase.id, 'downvote')}>Downvote ({phrase.downvotes})</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhraseList;
