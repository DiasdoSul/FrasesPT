import React, { useState } from 'react';
import api from '../api/api';

const AddPhrase: React.FC = () => {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Assumes the user is logged in and the token is sent with the request
      await api.post('/phrases/', { text });
      setMessage('Phrase submitted for approval!');
      setText('');
    } catch (error) {
      setMessage('Failed to submit phrase. Please try again.');
      console.error('Submission failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Phrase</h2>
      <textarea
        placeholder="Enter your phrase"
        value={text}
        onChange={e => setText(e.target.value)}
        rows={4}
      />
      <button type="submit">Submit Phrase</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AddPhrase;
