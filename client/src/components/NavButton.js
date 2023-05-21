import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const NavButton = (props) => {
  const navigate = useNavigate();
  const { name, link } = props;

  return <Button onClick={() => navigate(link)}>{name}</Button>;
};

export default NavButton;
