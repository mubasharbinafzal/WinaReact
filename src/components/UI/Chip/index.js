import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import Paper from "@material-ui/core/Paper"
import TagFacesIcon from "@material-ui/icons/TagFaces"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    // padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}))

export default function ChipsArray(props) {
  const classes = useStyles()
  const [chipData, setChipData] = React.useState()
  React.useEffect(() => {
    if (props.data) setChipData(props.data)
  }, [props.data])
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete))
  }

  return (
    <Paper component="ul" className={classes.root}>
      {chipData &&
        chipData.map((data, index) => {
          return (
            <li key={index}>
              <Chip
                label={data}
                onDelete={handleDelete(data)}
                className={classes.chip}
              />
            </li>
          )
        })}
    </Paper>
  )
}
