import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import { useState } from 'react';
import ImageCard from './components/ImageCard';
import { Col, Container, Row } from 'react-bootstrap';
import Welcome from './components/Welcome';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

function App() {
  const [word, setWord] = useState();
  const [images, setImages] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/new-image?query=${word}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.urls && data.urls.small) {
          setImages([{ ...data, title: word }, ...images]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setWord('');
  };

  const handleDelete = (index) => {
    const newImageList = images.filter((image) => image.id !== index);
    setImages(newImageList);
  };

  return (
    <div className="App">
      <Header title="Images Gallery" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      <Container>
        {images.length === 0 ? (
          <Welcome />
        ) : (
          <Row xs={1} md={2} lg={3}>
            {images.map((image, i) => (
              <Col key={i} className="pb-3">
                <ImageCard image={image} handleDelete={handleDelete} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default App;
