import React from "react";
import { Row, Col, Tab, Tabs, Image } from "react-bootstrap";
import { DEFAULT_IMAGE } from "../../../../../Globals/index";
import { baseUri } from "../../../../../urlConfig";

export default function CVEngine(props) {
  const { USER, type } = props;

  const ShowImage = (USER) => {
    const STUDENT_IMAGE =
      USER.student && USER.student.professional_Picture
        ? USER.student.professional_Picture.image
        : "";
    return (
      <Image
        src={
          STUDENT_IMAGE
            ? `${baseUri}/views/uploads/${STUDENT_IMAGE}`
            : DEFAULT_IMAGE
        }
      />
    );
  };
  if (type && type === "student_professional_info") {
    return (
      <div className="CVOnlineBox">
        <div className="CVOnline custom-box">
          {USER && Object.keys(USER).length > 0 ? (
            <Row>
              <Col lg={3} md={4}>
                <div className="profileImage">{ShowImage(USER)}</div>
              </Col>
              <Col lg={9} md={8}>
                <div className="profilename">
                  {USER.user.firstName} {USER.user.lastName}
                </div>
                <div className="profileProfession">
                  <div className="pb-1">{USER.user.type}</div>

                  <div className="pb-1">
                    {USER.user.address.zip},{USER.user.address.street}{" "}
                    {USER.user.address.city}
                  </div>

                  <div className="pb-1">Mobile :(+92) {USER.user.phone}</div>

                  <div className="pb-1">Email : {USER.user.email}</div>
                </div>
                <div className="formation">FORMATION</div>
                {USER.education.length > 0 ? (
                  USER.education.map((ed) => (
                    <>
                      <div className="companyNameH">{ed.school}</div>
                      <div className="companydate">
                        {ed.start_Date}-{ed.end_Date}
                        <br />
                        {/* Région de Paris, France */}
                      </div>
                      <div className="description">{ed.description}</div>
                    </>
                  ))
                ) : (
                  <p className="text-center">No school found.....</p>
                )}
                <div className="formation">EXPÉRIENCES PROFESSIONNELLES</div>
                {USER.professional_profile.length > 0 ? (
                  USER.professional_profile.map((ed) => (
                    <>
                      <div className="companyNameH">{ed.position}</div>
                      <div className="companyName">{ed.company}</div>
                      <div className="companyName">{ed.type}</div>
                      <div className="companyName">{ed.place}</div>

                      <div className="companydateDuration">
                        {ed.duration.start_date}-{ed.duration.end_date}
                      </div>
                      <div className="description">{ed.description}</div>
                    </>
                  ))
                ) : (
                  <p className="text-center">No professional info found.....</p>
                )}
                <div className="formation">Professional Networks</div>
                {USER.professional_networks &&
                Object.keys(USER.professional_networks).length > 0 ? (
                  <>
                    <ul className="PLinks">
                      <li>
                        <Image src="../images/linkedIn.png" />
                      </li>
                      <li>Linkedin &nbsp;&nbsp;: </li>
                      <li>
                        <a
                          href={`${USER.professional_networks.linkedIn}`}
                          target="_blank"
                        >
                          {USER.professional_networks.linkedIn
                            ? USER.professional_networks.linkedIn
                            : ""}
                        </a>
                      </li>
                    </ul>
                    <ul className="PLinks">
                      <li>
                        <Image src="../images/behance.png" />
                      </li>
                      <li>Behance &nbsp;&nbsp;: </li>
                      <li>
                        <a
                          href={`${USER.professional_networks.Behance}`}
                          target="_blank"
                        >
                          {USER.professional_networks.Behance
                            ? USER.professional_networks.Behance
                            : ""}
                        </a>
                      </li>
                    </ul>
                    <ul className="PLinks">
                      <li>
                        <Image src="../images/dribble.png" />
                      </li>
                      <li>Dribble &nbsp;&nbsp;: </li>
                      <li>
                        <a
                          href={`${USER.professional_networks.Dribble}`}
                          target="_blank"
                        >
                          {USER.professional_networks.Dribble
                            ? USER.professional_networks.Dribble
                            : ""}
                        </a>
                      </li>
                    </ul>
                    <ul className="PLinks">
                      <li>
                        <Image src="../images/github.png" />
                      </li>
                      <li>Github &nbsp;&nbsp;: </li>
                      <li>
                        <a
                          href={`${USER.professional_networks.Github}`}
                          target="_blank"
                        >
                          {USER.professional_networks.Github
                            ? USER.professional_networks.Github
                            : ""}
                        </a>
                      </li>
                    </ul>
                  </>
                ) : (
                  <p className="text-center">
                    No professional networks found.....
                  </p>
                )}
               <div className="formation">Compétences générales</div>
                <ul className="PLinks">
                  {USER.student.softSkills.length > 0 ? (
                    USER.student.softSkills.map((ed) => (
                    
                        <li>{ed.skillField}</li>
                     
                    ))
                  ) : (
                    <p className="text-center">
                      No Compétences générales info found.....
                    </p>
                  )}
                </ul>
                <div className="formation">Compétences spécialisées</div>
                <ul className="PLinks">
                  {USER.student.hardSkills.length > 0 ? (
                    USER.student.hardSkills.map((ed) => (
                    
                        <li>{ed.skillField}</li>
                     
                    ))
                  ) : (
                    <p className="text-center">
                      No Compétences spécialisées info found.....
                    </p>
                  )}
                </ul>
                <div className="formation">Languages</div>
                <ul className="PLinks">
                  {USER.student.languages.length > 0 ? (
                    USER.student.languages.map((ed) => (
                    
                        <li>{ed.name}</li>
                     
                    ))
                  ) : (
                    <p className="text-center">
                      No Languages info found.....
                    </p>
                  )}
                </ul>
              </Col>
            </Row>
          ) : (
            <h1 className="text-center">No data Found</h1>
          )}
        </div>
      </div>
    );
  } else
    return (
      <div className="CVOnlineBox">
        <div className="CVOnline custom-box">
          {USER && Object.keys(USER).length > 0 ? (
            <Row>
              <Col lg={3} md={4}>
                <div className="profileImage">{ShowImage(USER)}</div>
              </Col>
              <Col lg={9} md={8}>
                <div className="profilename">
                  {USER.firstName} {USER.lastName}
                </div>
                <div className="profileProfession">
                  <div className="pb-1">{USER.type}</div>

                  <div className="pb-1">
                    {USER.address.zip},{USER.address.street} {USER.address.city}
                  </div>

                  <div className="pb-1">Mobile :(+92) {USER.phone}</div>

                  <div className="pb-1">Email : {USER.email}</div>
                </div>
                <div className="formation">FORMATION</div>
                {USER.student.education.length > 0 ? (
                  USER.student.education.map((ed) => (
                    <>
                      <div className="companyNameH">{ed.school}</div>
                      <div className="companydate">
                        {ed.start_Date}-{ed.end_Date}
                        <br />
                        {/* Région de Paris, France */}
                      </div>
                      <div className="description">{ed.description}</div>
                    </>
                  ))
                ) : (
                  <p className="text-center">No school found.....</p>
                )}
                <div className="formation">EXPÉRIENCES PROFESSIONNELLES</div>
                {USER.student.professional_profile.length > 0 ? (
                  USER.student.professional_profile.map((ed) => (
                    <>
                      <div className="companyNameH">{ed.position}</div>
                      <div className="companyName">{ed.company}</div>
                      <div className="companyName">{ed.type}</div>
                      <div className="companyName">{ed.place}</div>

                      <div className="companydateDuration">
                        {ed.duration.start_date}-{ed.duration.end_date}
                      </div>
                      <div className="description">{ed.description}</div>
                    </>
                  ))
                ) : (
                  <p className="text-center">No professional info found.....</p>
                )}
                <div className="formation">Professional Networks</div>
                {USER.student.professional_networks &&
                Object.keys(USER.student.professional_networks).length > 0 ? (
                  <>
                    <ul className="PLinks">
                      <li>
                        <Image src="../images/linkedIn.png" />
                      </li>
                      <li>Linkedin &nbsp;&nbsp;: </li>
                      <li>
                        <a
                          href={`${USER.student.professional_networks.linkedIn}`}
                          target="_blank"
                        >
                          {USER.student.professional_networks.linkedIn
                            ? USER.student.professional_networks.linkedIn
                            : ""}
                        </a>
                      </li>
                    </ul>
                    <ul className="PLinks">
                      <li>
                        <Image src="../images/behance.png" />
                      </li>
                      <li>Behance &nbsp;&nbsp;: </li>
                      <li>
                        <a
                          href={`${USER.student.professional_networks.Behance}`}
                          target="_blank"
                        >
                          {USER.student.professional_networks.Behance
                            ? USER.student.professional_networks.Behance
                            : ""}
                        </a>
                      </li>
                    </ul>
                    <ul className="PLinks">
                      <li>
                        <Image src="../images/dribble.png" />
                      </li>
                      <li>Dribble &nbsp;&nbsp;: </li>
                      <li>
                        <a
                          href={`${USER.student.professional_networks.Dribble}`}
                          target="_blank"
                        >
                          {USER.student.professional_networks.Dribble
                            ? USER.student.professional_networks.Dribble
                            : ""}
                        </a>
                      </li>
                    </ul>
                    <ul className="PLinks">
                      <li>
                        <Image src="../images/github.png" />
                      </li>
                      <li>Github &nbsp;&nbsp;: </li>
                      <li>
                        <a
                          href={`${USER.student.professional_networks.Github}`}
                          target="_blank"
                        >
                          {USER.student.professional_networks.Github
                            ? USER.student.professional_networks.Github
                            : ""}
                        </a>
                      </li>
                    </ul>
                  </>
                ) : (
                  <p className="text-center">
                    No professional networks found.....
                  </p>
                )}
                <div className="formation">Compétences générales</div>
                <ul className="PLinks">
                  {USER.student.softSkills.length > 0 ? (
                    USER.student.softSkills.map((ed) => (
                    
                        <li>{ed.skillField}</li>
                     
                    ))
                  ) : (
                    <p className="text-center">
                      No Compétences générales info found.....
                    </p>
                  )}
                </ul>
                <div className="formation">Compétences spécialisées</div>
                <ul className="PLinks">
                  {USER.student.hardSkills.length > 0 ? (
                    USER.student.hardSkills.map((ed) => (
                    
                        <li>{ed.skillField}</li>
                     
                    ))
                  ) : (
                    <p className="text-center">
                      No Compétences spécialisées info found.....
                    </p>
                  )}
                </ul>
                <div className="formation">Languages</div>
                <ul className="PLinks">
                  {USER.student.languages.length > 0 ? (
                    USER.student.languages.map((ed) => (
                    
                        <li>{ed.name}</li>
                     
                    ))
                  ) : (
                    <p className="text-center">
                      No Languages info found.....
                    </p>
                  )}
                </ul>
              </Col>
            </Row>
          ) : (
            <h1 className="text-center">No data Found</h1>
          )}
        </div>
      </div>
    );
}
