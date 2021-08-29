import React from "react";
import { Card } from "react-bootstrap";
import "./Pokemon.css";
const Pokemon = ({ image, name, type, move, weight }) => {
  return (
    <Card className={`py-2 px-1 m-3 shadow ${type}`} style={{ width: "10rem" }}>
      <div className="my-auto">
        <Card.Img className="img" variant="top" src={image} alt={name} />
        <Card.Body>
          <Card.Title className="name">{name}</Card.Title>
          <Card.Text className="d-flex flex-column ">
            <small>Type: {type}</small>
            <small>Weight: {weight}</small>
            <small>Move: {move}</small>
          </Card.Text>
        </Card.Body>
      </div>
    </Card>
  );
};

export default Pokemon;
