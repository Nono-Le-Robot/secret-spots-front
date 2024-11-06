import React, { useState, useEffect } from 'react';
import './App.css'; // Assurez-vous d'importer le fichier CSS
import LeafletMap from "./leafleet";
import Guide from "./Guide";
import Cookies from 'js-cookie';
import axios from 'axios';

function App() {
  const [activeComponent, setActiveComponent] = useState("leafleet");
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

      

  useEffect(() => {
    // Fonction pour vérifier le statut de l'authentification
    const checkAuthStatus = () => {
      axios.get('http://localhost:5000/api/protected-route', { withCredentials: true })
        .then(response => {
          console.log('Utilisateur authentifié :', response.data);
          setIsAuthenticated(true); // Vous pouvez ajuster ce qui est stocké dans l'état
        })
        .catch(error => {
          if (error.response) {
            // Gestion de l'erreur d'authentification
            setErrorMessage(error.response.data.message);
          } else {
            // Erreur réseau
            setErrorMessage('Erreur réseau: ' + error.message);
          }
        });
    };

    // Appeler la fonction pour vérifier l'authentification
    checkAuthStatus();
  }, []);


  // Fonction pour basculer entre Leafleet et Guide
  const toggleComponent = () => {
    setActiveComponent(activeComponent === "leafleet" ? "guide" : "leafleet");
  };

  // Fonction pour afficher ou cacher le formulaire d'inscription
  const toggleRegisterForm = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false); // Si le formulaire d'inscription est affiché, cacher le formulaire de connexion
  };

  // Fonction pour afficher ou cacher le formulaire de connexion
  const toggleLoginForm = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false); // Si le formulaire de connexion est affiché, cacher le formulaire d'inscription
  };

  // Gérer l'enregistrement de l'utilisateur
  const handleRegister = async () => {
    if (email && password) {
      try {
        const response = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const result = await response.json();
          setSuccessMessage('Utilisateur enregistré avec succès !');
          setEmail('');
          setPassword('');
          setErrorMessage('');
          setTimeout(() => {
            setSuccessMessage('');
            setShowRegisterForm(false);
          }, 3000);
        } else {
          const result = await response.json();
          setErrorMessage(result.error || 'Erreur lors de l\'inscription, veuillez réessayer.');
          setSuccessMessage('');
        }
      } catch (error) {
        setErrorMessage('Erreur de connexion avec le serveur. Veuillez réessayer plus tard.');
        setSuccessMessage('');
      }
    } else {
      setErrorMessage('Veuillez remplir tous les champs.');
      setSuccessMessage('');
    }
  };

  // Gérer la connexion de l'utilisateur
  const handleLogin = async () => {
    if (email && password) {
      try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
          credentials: 'include', // Assurez-vous que le cookie est envoyé
        });

        if (response.ok) {
          const result = await response.json();
          const token = result.token;
          // Si la connexion est réussie
          console.log(result); // Vous pouvez voir ce que contient la réponse
          Cookies.set('authToken', token, { expires: 1, path: '/' });
          setSuccessMessage('Connexion réussie !');
          setEmail('');
          setPassword('');
          setErrorMessage('');
          setTimeout(() => {
            setSuccessMessage('');
            setShowLoginForm(false); // Ferme le formulaire après la connexion réussie
          }, 3000);
        } else {
          const result = await response.json();
          setErrorMessage(result.error || 'Email ou mot de passe incorrect.');
          setSuccessMessage('');
        }
      } catch (error) {
        setErrorMessage('Erreur de connexion avec le serveur. Veuillez réessayer plus tard.');
        setSuccessMessage('');
      }
    } else {
      setErrorMessage('Veuillez remplir tous les champs.');
      setSuccessMessage('');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include', // Inclure les cookies dans la requête
      });

      if (response.ok) {
        // Supprimer les messages de succès ou d'erreur
        setSuccessMessage('');
        setErrorMessage('');

        // Réinitialiser l'état de connexion
        setIsAuthenticated(false);
        setShowLoginForm(true); // Réafficher le formulaire de connexion si besoin
        console.log('Déconnexion réussie');
      } else {
        const result = await response.json();
        setErrorMessage(result.error || 'Erreur lors de la déconnexion.');
      }
    } catch (error) {
      setErrorMessage('Erreur de connexion avec le serveur. Veuillez réessayer plus tard.');
    }
  };



  return (
    <div className="app-container">
      <div className="header">
        <h1 className="title">SecretSpot</h1>

        <div className="switch-container">
          <label className="switch">
            <input
              type="checkbox"
              checked={activeComponent === "leafleet"}
              onChange={toggleComponent}
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* Boutons pour afficher les formulaires de connexion ou d'inscription */}
        <button onClick={toggleRegisterForm}>
          {showRegisterForm ? "Annuler l'inscription" : "S'inscrire"}
        </button>

        {isAuthenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (<button onClick={toggleLoginForm}>
          {showLoginForm ? "Annuler la connexion" : "Se connecter"}
        </button>)}


      </div>

      {/* Formulaire d'inscription */}
      {showRegisterForm && (
        <div className="register-form">
          <h2>Inscription</h2>
          <input
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleRegister}>S'inscrire</button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
      )}

      {/* Formulaire de connexion */}
      {showLoginForm && (
        <div className="login-form">
          <h2>Connexion</h2>
          <input
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Se connecter</button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
      )}

      {/* Affiche le composant actif (Leafleet ou Guide) */}
      {activeComponent === "leafleet" ? (
        <Guide />
      ) : (
        <LeafletMap />
      )}
    </div>
  );
}

export default App;
