import React from 'react';

interface LoadingPageProps {
  message?: string;
}

export default function LoadingPage({ message = "Traitement de vos informations..." }: LoadingPageProps) {
  return (
    <div className="continer">
      <div className="col">
        <h3>Veuillez patienter...</h3>
      </div>

      <div className="col">
        <p>{message}</p>
        <div className="loding">
          <img src="img/loadings.gif" style={{ width: '60px' }} alt="Loading" />
        </div>
      </div>
    </div>
  );
}