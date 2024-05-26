import React from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';

const ImageCard = ({ image, handleDelete, handleSave }) => {
  return (
    <Card style={{ width: '18rem' }} className="mt-4">
      <Card.Img
        variant="top"
        src={image.urls.small}
        style={{ height: '18rem' }}
      />
      <Card.Body>
        <Card.Title>{image.title?.toUpperCase()}</Card.Title>
        <Card.Text>{image.alt_description}</Card.Text>
        <ButtonGroup className="d-flex justify-content-center mt-2">
          <Button variant="primary" onClick={() => handleDelete(image)} active>
            Delete
          </Button>
          {image.saved ? (
            <Button
              variant="success"
              onClick={() => handleSave(image)}
              disabled
              className="mx-2"
            >
              Save
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={() => handleSave(image)}
              active
              className="mx-2"
            >
              Save
            </Button>
          )}
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
};

export default ImageCard;
