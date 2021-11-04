import React, { useState, useEffect } from "react"
import { Tab, Tabs } from "react-bootstrap"

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import CheckBoxIcon from "@material-ui/icons/CheckBox"
import Select from "../../../../../components/UI/Select"
import ModalInput from "../../../../../components/UI/Input"

import {
  SOFT_SKILLS_STATE,
  HARD_SKILLS_STATE,
  LANGUAGE_STATE,
} from "../../../../../Globals/InitialValues/Student"
import {
  SOFT_SKILLS_YUP,
  LANGUAGE_YUP,
  HARD_SKILLS_YUP,
} from "../../../../../components/Formik/Student/yupValidation"
import { useDispatch, useSelector } from "react-redux"
import Button from "../../../../../components/UI/Button"
import { getSkills, Add_info_Student } from "../../../../../Redux/actions"
import * as Notistack from "../../../../../Redux/actions/notistack"

import Tab1 from "./Tabs/soft_skilltab"
import Tab2 from "./Tabs/hard_skilltab"
import Tab3 from "./Tabs/language_tab"
import _ from "lodash"

export default function Skills() {
  const store = useSelector((state) => state.student)
  const store2 = useSelector((state) => state.globals)
  const SOFT_SKILLS_DB = store.user.student && store.user.student.softSkills
  const HARD_SKILLS_DB = store.user.student && store.user.student.hardSkills
  const LANGUAGES_DB = store.user.student && store.user.student.languages

  const dispatch = useDispatch()
  let SOFT_SKILLS = store2.soft_skills
  let HARD_SKILLS = store2.hard_skills

  // state
  const [key, setKey] = useState("GeneralSkills")
  const [softSkillsArray, setsoftSkillsArray] = useState([])
  const [hardSkillsArray, sethardSkillsArray] = useState([])
  const [languagesArray, setlanguagesArray] = useState([])

  const handleChange = (k) => {
    if (k === "GeneralSkills") {
      dispatch(getSkills("Soft Skill"))
    } else if (k === "SpecializedSkills") {
      dispatch(getSkills("Hard Skill"))
    }
    setKey(k)
  }
  // get softs skills from DB
  useEffect(() => {
    setsoftSkillsArray(SOFT_SKILLS_DB)
  }, [])
  // get hard skills from DB
  useEffect(() => {
    sethardSkillsArray(HARD_SKILLS_DB)
  }, [])
  // get LANGAUGES from DB
  useEffect(() => {
    let tempEducation = _.cloneDeep(LANGUAGES_DB)
    tempEducation.forEach(function (v) {
      delete v._id
    })
    setlanguagesArray(tempEducation)
  }, [])
  useEffect(() => {
    dispatch(getSkills("Soft_Skill"))
  }, [])
  return (
    <>
      <Tabs
        defaultActiveKey="GeneralSkills"
        id="Skills"
        activeKey={key}
        id="controlled-tab-example"
        className="Skills upper-nav custom-tabs"
        onSelect={(k) => handleChange(k)}
      >
        <Tab
          eventKey="GeneralSkills"
          title="Compétences générales"
          className="custom-box"
          onSelect={(k) => setKey(k)}
        >
          <Tab1
            options={SOFT_SKILLS}
            Select={Select}
            Button={Button}
            store={store}
            SKILLS_STATE={SOFT_SKILLS_STATE}
            SKILLS_YUP={SOFT_SKILLS_YUP}
            ModalInput={ModalInput}
            DB_Array={softSkillsArray}
            Add_info_Student={Add_info_Student}
            SOFT_SKILLS_DB={SOFT_SKILLS_DB}
            Notistack={Notistack}
          />
        </Tab>
        <Tab
          eventKey="SpecializedSkills"
          title="Compétences spécialisées"
          className="custom-box"
          onSelect={(k) => setKey(k)}
        >
          <Tab2
            options={HARD_SKILLS}
            Select={Select}
            Button={Button}
            store={store}
            SKILLS_STATE={HARD_SKILLS_STATE}
            SKILLS_YUP={HARD_SKILLS_YUP}
            ModalInput={ModalInput}
            DB_Array={hardSkillsArray}
            Add_info_Student={Add_info_Student}
            HARD_SKILLS_DB={HARD_SKILLS_DB}
            Notistack={Notistack}
          />
        </Tab>
        <Tab
          eventKey="Languages"
          title="Langues"
          className="custom-box"
          onSelect={(k) => setKey(k)}
        >
          <Tab3
            options={languages}
            options2={Levels}
            Select={Select}
            Button={Button}
            store={store}
            SKILLS_STATE={LANGUAGE_STATE}
            SKILLS_YUP={LANGUAGE_YUP}
            ModalInput={ModalInput}
            DB_Array={languagesArray}
            Add_info_Student={Add_info_Student}
            LANGUAGES_DB={LANGUAGES_DB}
            Notistack={Notistack}
          />
        </Tab>
      </Tabs>
    </>
  )
}

const languages = [
  { title: "English" },
  { title: "Urdu" },
  { title: "French" },
  { title: "Saraiki" },
]
const Levels = [
  { title: "beginner" },
  { title: "intermediate" },
  { title: "fluent" },
  { title: "native" },
]
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />
