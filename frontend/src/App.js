import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import { Col, Container, Row } from 'react-bootstrap';
import Welcome from './components/Welcome';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

function App() {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetchImages();
    };
    fetchData();
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      setImages([{ ...res.data, title: word }, ...images]);
    } catch (error) {
      console.log(error);
    }

    setWord('');
  };

  const handleSaveImage = async (image) => {
    try {
      await axios.post(
        `${API_URL}/images`,
        { ...image, saved: true },
        {
          headers: {
            'Content-Type': 'application/json', // Use single quotes
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (image_del) => {
    try {
      await axios.delete(`${API_URL}/images`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: image_del,
      });
      const newImageList = images.filter((image) => image.id !== image_del.id);
      setImages(newImageList);
    } catch (error) {
      console.log(error);
    }
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
                <ImageCard
                  image={image}
                  handleDelete={handleDelete}
                  handleSave={handleSaveImage}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default App;
