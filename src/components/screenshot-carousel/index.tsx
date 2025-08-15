
import Carousel from 'react-bootstrap/Carousel';

interface ScreenshotCarouselProps {
  title: string;
  screenshots: string[] | undefined;
}

const ScreenshotCarousel = ({screenshots, title}: ScreenshotCarouselProps) => {

  return (
    <Carousel indicators={false}>
      {screenshots !== undefined && screenshots.map((image, i) => (
        <Carousel.Item key={`carousel-item-${i}`}>
          <img
            className="d-block w-100"
            src={`images/screenshots/${image}`}
            alt={`Screenshot ${i+1} of ${title}`}
          />
          {/* <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ScreenshotCarousel;
