import React from 'react';

const PrivacyPolicyPage = () => (
  <div className="container">
    <h1>Politique de confidentialité</h1>
    <p>
      Nous respectons votre vie privée. Vos données personnelles sont collectées uniquement pour vous fournir nos services et ne sont jamais revendues à des tiers.
    </p>
    <h2>Quelles données collectons-nous ?</h2>
    <ul>
      <li>Informations de compte (nom, email, etc.)</li>
      <li>Données de navigation (cookies, adresse IP, etc.)</li>
    </ul>
    <h2>Comment utilisons-nous vos données ?</h2>
    <ul>
      <li>Pour vous authentifier et sécuriser l’accès à votre compte</li>
      <li>Pour améliorer nos services</li>
      <li>Pour respecter nos obligations légales</li>
    </ul>
    <h2>Vos droits</h2>
    <p>
      Vous pouvez demander l’accès, la rectification ou la suppression de vos données à tout moment en nous contactant.
    </p>
  </div>
);

export default PrivacyPolicyPage;