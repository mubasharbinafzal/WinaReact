import React from "react";
import CardWithImage from "../../../../../components/UI/CardWithImage/CardWithImage";

const overviewOffers = [
  {
    image: "company-offer-card",
    title: "Excellent",
    content: "Marketing/Communication",
    location: "4 Rue du Général de Larminat - 75015 Paris",
    desc1: "Domaine : Webdesign",
    desc2: "Durée : 1 an",
    desc3: "Niveau d’étude : Brevet",
    btn1: "Voir",
    matches: "Match (12)",
  },
  {
    image: "company-offer-card",
    title: "Excellent",
    content: "Marketing/Communication",
    location: "4 Rue du Général de Larminat - 75015 Paris",
    desc1: "Domaine : Webdesign",
    desc2: "Durée : 1 an",
    desc3: "Niveau d’étude : Brevet",
    btn1: "Voir",
    matches: "Match (12)",
  },
  {
    image: "company-offer-card",
    title: "Excellent",
    content: "Marketing/Communication",
    location: "4 Rue du Général de Larminat - 75015 Paris",
    desc1: "Domaine : Webdesign",
    desc2: "Durée : 1 an",
    desc3: "Niveau d’étude : Brevet",
    btn1: "Voir",
    matches: "Match (12)",
  },
];

const OverviewOfferItem = (props) => {
  return (
    <div className="overview-offer-item">
      {overviewOffers.map((item, index) => (
        <CardWithImage
          key={index}
          item={item}
          setDetailHandler={props.setDetailHandler}
        />
      ))}
    </div>
  );
};

export default OverviewOfferItem;
