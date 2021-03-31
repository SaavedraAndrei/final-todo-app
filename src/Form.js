import { Button, FormControl, FormHelperText, Input } from "@material-ui/core";
import React from "react";

function Form({ addTodo, input, setInput }) {
  return (
    <div className="form">
      <form>
        <FormControl>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            placeholder="Add a todo"
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <FormHelperText id="my-helper-text">Make it happen🔥</FormHelperText>
        </FormControl>

        <Button
          disabled={!input}
          variant="contained"
          color="primary"
          type="submit"
          onClick={addTodo}
        >
          Add Todo
        </Button>
      </form>
    </div>
  );
}

export default Form;
