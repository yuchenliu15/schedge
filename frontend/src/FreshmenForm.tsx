import React, { useReducer } from "react";
import { Paper, Typography } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { navigate, RouteComponentProps } from "@reach/router";
import Button from "@material-ui/core/Button";
import withStyles, { WithStyles } from "react-jss";
import { API_URL } from "./constants";
import axios from "axios";
import { APIMeeting } from "./types";

const styles = {
  FreshmanForm: {
    display: "flex",
    flexDirection: "column",
    padding: "40px"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  menuItem: {
    margin: "20px",
    fontSize: "1.1em"
  },
  select: {
    maxWidth: "200px",
    fontSize: "1.1em",
    margin: "20px"
  },
  button: {
    margin: "20px",
    maxWidth: "200px"
  }
};

interface State {
  department: string;
  error: string | undefined;
}

type ActionTypes =
  | { type: "SELECT_DEPARTMENT"; department: string }
  | { type: "SUBMIT_FORM_FAILED"; error: string };

function reducer(state: State, action: ActionTypes) {
  switch (action.type) {
    case "SELECT_DEPARTMENT":
      return { ...state, department: action.department };
    case "SUBMIT_FORM_FAILED":
      return { ...state, error: action.error };
    default:
      return state;
  }
}

const initialState = {
  department: "",
  error: undefined
};

interface Props extends RouteComponentProps, WithStyles<typeof styles> {
  addSchedule: (s: Array<APIMeeting>) => void;
}

const FreshmenForm: React.FC<Props> = ({ addSchedule, classes }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Paper className={classes.FreshmanForm}>
      <form
        className={classes.form}
        onSubmit={e => {
          e.preventDefault();
          if (state.department === "") {
            dispatch({
              type: "SUBMIT_FORM_FAILED",
              error: "You must select a department"
            });
          }
          axios.get(`${API_URL}/freshmen/${state.department}`).then(res => {
            addSchedule(res.data);
            navigate(`/schedule`);
          });
        }}
      >
        <Typography variant="h3" component="h3">
          Intro Course
        </Typography>
        <Select
          className={classes.select}
          value={state.department}
          onChange={event =>
            dispatch({
              type: "SELECT_DEPARTMENT",
              department: event.target.value as string
            })
          }
        >
          <MenuItem className={classes.menuItem} value="">
            {" "}
            Choose a subject{" "}
          </MenuItem>
          <MenuItem className={classes.menuItem} value="CSCI-UA">
            {" "}
            Computer Science
          </MenuItem>
          <MenuItem className={classes.menuItem} value="MATH-UA">
            {" "}
            Math{" "}
          </MenuItem>
        </Select>
        {state.department && (
          <div className={classes.button}>
            <Button type="submit" color="primary">
              {" "}
              Create Schedule
            </Button>
          </div>
        )}
      </form>
    </Paper>
  );
};

export default withStyles(styles)(FreshmenForm);