import React from "react";
import "./InfoCard.css";
import { FiEdit2, MdDelete } from "react-icons/all";
import { DEFAULT_IMAGE } from "../../../Globals";
import { baseUri } from "../../../urlConfig";

const InfoCard = (props) => {
  const {
    item,
    type,
    EditSchoolModalShow,
    EditProfessionalCareerModal,
    EditPermission,
  } = props;
  if (type === "PROFESSIONAL") {
    return (
      <div
        className="info-card"
        style={{ borderTop: props.cindex > 0 && "1px solid #F7C40D" }}
      >
        <div className="info-card-wrapper">
          <div className="info-card-image">
            <img
              src={item.image ? `${baseUri}/${item.image}` : DEFAULT_IMAGE}
              alt="DEFAULT_IMAGE"
            />
          </div>
          <div className="info-card-container">
            <div className="info-card-title">
              <div>{item.company}</div>

              <div className="modal-icon">
                <FiEdit2
                  onClick={() => EditProfessionalCareerModal(item._id)}
                  className="edit_Icon"
                />
                <MdDelete className="delete_icon" onClick={props.onDelete} />
              </div>
              <div></div>
            </div>
            <div className="info-card-content pb-3">
              <div>{item.position}</div>
              <div>
                {item.duration.start_date}-{item.duration.end_date}
              </div>
            </div>

            <div className="info-card-desc">{item.description}</div>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div
        className="info-card"
        style={{ borderTop: props.cindex > 0 && "1px solid #F7C40D" }}
      >
        <div className="info-card-wrapper">
          <div className="info-card-image">
            <img
              src={item.image ? `${baseUri}/${item.image}` : DEFAULT_IMAGE}
              alt="DEFAULT_IMAGE"
            />
          </div>
          <div className="info-card-container">
            <div className="info-card-title">
              <div>{item.school}</div>
              {EditPermission && EditPermission === false ? (
                ""
              ) : (
                <div className="modal-icon">
                  <FiEdit2
                    onClick={() => EditSchoolModalShow(item._id)}
                    className="edit_Icon"
                  />
                  <MdDelete className="delete_icon" onClick={props.onDelete} />
                </div>
              )}
            </div>
            <div className="info-card-content pb-3">
              <div>
                {item.start_Date}-{item.end_Date}
              </div>
            </div>

            <div className="info-card-desc">{item.description}</div>
          </div>
        </div>
      </div>
    );
};

export default InfoCard;
