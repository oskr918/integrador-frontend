import Carousel from 'react-bootstrap/Carousel';

function CarouselFadeExample() {
  return (
    <Carousel>
    <Carousel.Item interval={5000}>
      <img
        className="d-block w-100"
        src="../img/carrusel.png"
        alt="First slide"
      />
    </Carousel.Item>
    <Carousel.Item interval={5000}>
      <img
        className="d-block w-100"
        src="../img/carrusel2.png" 
        alt="Second slide"
      />
    </Carousel.Item>
  </Carousel>
  );
}

export default CarouselFadeExample;