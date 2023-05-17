import React from "react";
import { Dropdown, Form } from "react-bootstrap";

const Filter = ({ name, data, state, handleChange }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle>{name}</Dropdown.Toggle>
      <Dropdown.Menu>
        <Form>
          {data.map((item) => (
            <Form.Check
              type="checkbox"
              label={
                name == "Customers"
                  ? `${item.givenName} ${item.familyName}`
                  : item.name
              }
              key={item.id}
              name={item.id}
              checked={state[item.id]}
              onChange={handleChange}
            />
          ))}
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Filter;
