import {
  Button,
  FormHelperText,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemText,
  Modal,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useState } from "react";
import UpdateIcon from "@material-ui/icons/Update";
import db from "./firebase";
import SendIcon from "@material-ui/icons/Send";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },

  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: "0 auto",
    textAlign: "center",
  },

  helper: {
    textAlign: "center",
    color: "black",
  },

  list: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    margin: "10px auto",
    background: "rgba( 255, 255, 255, 0.25 )",
  },

  icon: {
    color: "#61dafb",
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function Todo({ todo }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const updateTodo = () => {
    db.collection("todos").doc(todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );

    handleClose();
  };

  const completeTodo = (e) => {};

  return (
    <div>
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <h1>Update Me</h1>

            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              placeholder={todo.todo}
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <FormHelperText id="my-helper-text" className={classes.helper}>
              Update Me🎃
            </FormHelperText>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<SendIcon />}
              onClick={updateTodo}
            >
              Upload
            </Button>
          </div>
        </Modal>

        <List>
          <div className={classes.list}>
            <ListItem>
              <ListItemText
                primary={todo.todo}
                secondary="Todo Uncompleted❌"
                className="one"
              />
            </ListItem>

            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              className={classes.icon}
              onClick={completeTodo}
            >
              <CheckCircleIcon />
            </IconButton>

            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<UpdateIcon />}
              onClick={handleOpen}
            >
              Upload
            </Button>

            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={(e) => db.collection("todos").doc(todo.id).delete()}
            >
              Delete
            </Button>
          </div>
        </List>
      </>
    </div>
  );
}

export default Todo;
