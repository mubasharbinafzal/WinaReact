import React, { useState } from "react";
import {
  Row,
  Col,
  Nav,
  Tab,
  Tabs,
  Image,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const PPModal = ({ show, setShow }) => {
  // const classes = useStyles();
  const [state, setState] = useState({
    checked: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const schoolName = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
  ];
  const startDate = [
    { title: "1994" },
    { title: "1972" },
    { title: "1974" },
    { title: "2008" },
  ];
  const endDate = [
    { title: "1994" },
    { title: "1972" },
    { title: "1974" },
    { title: "2008" },
  ];
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="ProfessionalCareerModal"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Parcours professionnels
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg="4">
            <div className="Job_title">
              <TextField
                id="outlined-basic"
                label="Intitulé du poste . Ex : Chef de projet"
                variant="outlined"
              />
            </div>
          </Col>
          <Col lg="3" className="width-col-3">
            <div className="Type_of_employment">
              <Autocomplete
                //   multiple
                id="checkboxes-tags-demo"
                className="Type_of_employment"
                options={schoolName}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                      color={"primary"}
                    />
                    {option.title}
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    //   label="École"
                    placeholder="Type d’emploi"
                  />
                )}
              />
            </div>
          </Col>
          <Col lg="3" className="width-col-3">
            <div className="Business">
              <Autocomplete
                // multiple
                id="checkboxes-tags-demo"
                options={startDate}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                      color={"primary"}
                    />
                    {option.title}
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    // label="Date de début"
                    placeholder="Année"
                  />
                )}
              />
            </div>
          </Col>
          <Col lg="3" className="width-col-3">
            <div className="Location">
              <Autocomplete
                // multiple
                id="checkboxes-tags-demo"
                options={endDate}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                      color={"primary"}
                    />
                    {option.title}
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    // label="Date de fin"
                    placeholder="Année"
                  />
                )}
              />
            </div>
          </Col>
        </Row>
        <Row className="startEndDateRow">
          <Col lg="4">
            <div className="position">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedB}
                    onChange={handleChange}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="J’occupe actuellement ce poste"
              />
            </div>
          </Col>
          <Col lg="2" className="width-col-2">
            <div className="startEndDate">
              <label>Date de début</label>
              <Autocomplete
                //   multiple
                id="checkboxes-tags-demo"
                className="startEndDate"
                options={schoolName}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                      color={"primary"}
                    />
                    {option.title}
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    //   label="École"
                    placeholder="Mois"
                  />
                )}
              />
            </div>
          </Col>
          <Col lg="2" className="width-col-2">
            <label>&nbsp;</label>
            <div className="startEndDate">
              <Autocomplete
                //   multiple
                id="checkboxes-tags-demo"
                className="startEndDate"
                options={schoolName}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                      color={"primary"}
                    />
                    {option.title}
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    //   label="École"
                    placeholder="Année"
                  />
                )}
              />
            </div>
          </Col>
          <Col lg="2" className="width-col-2">
            <div className="startEndDate">
              <label>Date de fin</label>
              <Autocomplete
                //   multiple
                id="checkboxes-tags-demo"
                className="startEndDate"
                options={schoolName}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                      color={"primary"}
                    />
                    {option.title}
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    //   label="École"
                    placeholder="Mois"
                  />
                )}
              />
            </div>
          </Col>
          <Col lg="2" className="width-col-2">
            <label>&nbsp;</label>
            <div className="startEndDate">
              <Autocomplete
                //   multiple
                id="checkboxes-tags-demo"
                className="startEndDate"
                options={schoolName}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                      color={"primary"}
                    />
                    {option.title}
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    //   label="École"
                    placeholder="Année"
                  />
                )}
              />
            </div>
          </Col>
        </Row>
        <div className="description">
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={5} />
          </Form.Group>
        </div>

        <Button className="Enregistrer" variant="primary">
          Enregistrer
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default PPModal;

/* eslint-disable no-use-before-define */

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
