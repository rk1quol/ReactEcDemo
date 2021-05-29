import React from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  formControl: {
    marginBottom: 16,
    minWidth: 128,
    width: '100%',
  }
})

const SelectBox = (props) => {
  const classes = useStyles()

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        required={props.required}
        value={props.value}
        onChange={(e) => props.select(e.target.value)}
      >
        { props.options.map(option => (
          <MenuItem key={option.id} value={option.id}>{ option.name }</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectBox