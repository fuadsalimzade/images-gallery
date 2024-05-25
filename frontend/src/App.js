import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import { Col, Container, Row } from 'react-bootstrap';
import Welcome from './components/Welcome';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

function App() {
  const [word, setWord] = useState();
  const [images, setImages] = useState([]);

  const fetchImages = () => {
    fetch(`${API_URL}/images`)
      .then((response) => response.json())
      .then((data) => {
        const newImages = data
          .map((element) => {
            if (element.urls && element.urls.small) {
              return { ...element, title: element.title };
            }
            return null;
          })
          .filter((image) => image !== null);
        setImages([...newImages, ...images]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchImages();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/new-image?query=${word}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.urls && data.urls.small) {
          setImages([{ ...data, title: word }, ...images]);
          fetch(`${API_URL}/images`, {
            method: 'POST', // Use single quotes
            headers: {
              'Content-Type': 'application/json', // Use single quotes
            },
            body: JSON.stringify({ ...data, title: word }), // Ensure correct indentation
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((postResponse) => {
              console.log('Image saved:', postResponse);
            })
            .catch((err) => {
              console.error('Error saving image:', err);
            });
        }
      })
      .catch((err) => {
        console.error('Error fetching image:', err);
      });

    setWord('');
  };

  const handleDelete = (image_del) => {
    const newImageList = images.filter((image) => image.id !== image_del.id);
    setImages(newImageList);
    fetch(`${API_URL}/images`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(image_del),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Image could not be deleted');
      }
      return response.json();
    });
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
