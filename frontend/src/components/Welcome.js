import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

const navbarStyle = {
  backgroundColor: 'white',
};

const Welcome = () => (
  <Jumbotron
    style={navbarStyle}
    className="d-flex flex-column justify-content-center align-items-center"
  >
    <p>
      This is a simple application that retrieves images using Unsplash API.
      Start by searching a topic.
    </p>
    <p>
      <Button bsStyle="primary" href="https://unsplash.com">
        Learn more
      </Button>
    </p>
  </Jumbotron>
);

export default Welcome;
