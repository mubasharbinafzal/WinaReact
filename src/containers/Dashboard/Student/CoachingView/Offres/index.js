import React from "react";
import { Card, Button } from "react-bootstrap";

const cards = [
  {
    title:
      "Prenez rendez-vous pour Connaître toutes les bases D’un entretien !",
  },
];
const Offers = () => {
  return (
    <div className="company-coaching">
      <div className="text-center coaching-heading">Des offres pour vous !</div>
      <div className="coaching-cards-container">
        <div className="coaching-card">
          <div className="coaching-card-header">
            <div className="coaching-card-title">
              Prenez rendez-vous pour Connaître toutes les bases D’un entretien
              !
            </div>
            <div className="coaching-card-overlay"></div>
          </div>
          <div className="coaching-card-body coaching-card-body-1">
            <div className="coaching-card-description">
              Prenez rendez-vous pour connaître toutes les bases d’un entretien!
            </div>
            <div className="coaching-card-content">Présenté par Winna</div>
            <div className="coaching-card-price text-center">5 €</div>
          </div>
          <div className="coaching-card-btn">Profiter</div>
        </div>
        <div className="coaching-card">
          <div className="coaching-card-header">
            <div className="coaching-card-title">
              Prenez rendez-vous pour Connaître toutes les bases D’un entretien
              !
            </div>
            <div className="coaching-card-overlay"></div>
          </div>
          <div className="coaching-card-body coaching-card-body-2">
            <div className="coaching-card-description">
              Prenez rendez-vous pour connaître toutes les bases d’un entretien!
            </div>
            <div className="coaching-card-content">Présenté par Winna</div>
            <div className="coaching-card-price text-center">5 €</div>
          </div>
          <div className="coaching-card-btn">Profiter</div>
        </div>
        <div className="coaching-card">
          <div className="coaching-card-header">
            <div className="coaching-card-title">
              Prenez rendez-vous pour Connaître toutes les bases D’un entretien
              !
            </div>
            <div className="coaching-card-overlay"></div>
          </div>
          <div className="coaching-card-body coaching-card-body-3">
            <div className="coaching-card-description">
              Prenez rendez-vous pour connaître toutes les bases d’un entretien!
            </div>
            <div className="coaching-card-content">Présenté par Winna</div>
            <div className="coaching-card-price text-center">5 €</div>
          </div>
          <div className="coaching-card-btn">Profiter</div>
        </div>
      </div>
      <div className="text-center coaching-card-footer">
        <span>Voir plus</span>
      </div>
    </div>
  );
};
export default Offers;
