import React, { useState,useEffect } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchSavedText = async () => {
      try {
        const response = await axios.get('https://copyapp-2.onrender.com/all');
        if (response.status === 200 && response.data.count > 0) {
          setText(response.data.data[0].content);
        }
      } catch (err) {
        console.error('Failed to fetch saved content', err);
      }
    };

    fetchSavedText();
  }, []);

  const saveText = async () => {
    try {
      const response = await axios.post('https://copyapp-2.onrender.com/save', { content: text });
      if (response.status === 201) {
        setText(response.data.content); // Update textarea with saved content
        alert('Saved and refreshed from DB!');
      }
    } catch (err) {
      alert('Save failed');
      console.error(err);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div style={styles.container}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your content here..."
        style={styles.textarea}
      />
      <div style={styles.buttonContainer}>
        <button onClick={saveText} style={styles.button}>Save</button>
        <button onClick={copyToClipboard} style={styles.button}>Copy</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textarea: {
    width: '85vw',
    height: '50vw',
    padding: '10px',
    fontSize: '16px',
    resize: 'vertical',
    maxWidth: '100%',
    boxSizing: 'border-box',
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  }
};

export default App;
