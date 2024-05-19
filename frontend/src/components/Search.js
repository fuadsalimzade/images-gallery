import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { IoIosSearch } from 'react-icons/io';

const Search = ({ word, setWord, handleSubmit }) => {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Col xs={10}>
                <Form.Control
                  type="text"
                  onChange={(e) => setWord(e.target.value)}
                  value={word}
                  placeholder="Search for a new image..."
                  className="rounded-pill"
                />
              </Col>
              <Col>
                <Button
                  variant="outline-secondary"
                  className="rounded-pill google-logo-button"
                  type="submit"
                >
                  <IoIosSearch />
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
