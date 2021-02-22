import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { Link } from 'react-router-dom';
import { useAppContext } from '../libs/contextLib';
import { onError } from '../libs/errorLib';
import './Home.css';
import Notes from '../components/Notes';

export const Lander = () => (
  <div className="lander">
    <h1>Scratch</h1>
    <p className="text-muted">A simple note taking app</p>
    <div className="pt-3">
      <Link to="/login" className="btn btn-info btn-lg mr-3">
        Login
      </Link>
      <Link to="/signup" className="btn btn-success btn-lg">
        Signup
      </Link>
    </div>
  </div>
);

const Home: React.FC = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadNotes() {
    return API.get('notes', '/notes', {});
  }

  return (
    <div className="Home">
      {isAuthenticated ? <Notes notes={notes} isLoading={isLoading} /> : <Lander />}
    </div>
  );
};

export default Home;
