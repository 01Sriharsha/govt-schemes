import { Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import scheme1 from '../../assets/scheme-1.png'
import scheme2 from '../../assets/scheme-2.jpg'
import scheme3 from '../../assets/scheme-3.png'

export default function Home() {
    return (
        <Container fluid="xxl" className='mt-4 d-flex justify-content-center' >
            <Carousel fade className='w-75 rounded shadow' style={{ minHeight: '75vh' }}>
                <Carousel.Item>
                    <img
                        className="d-block w-100 rounded"
                        src={scheme1}
                        alt="First slide"
                        style={{ height: '75vh' }}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 rounded"
                        src={scheme2}
                        alt="Second slide"
                        style={{ height: '75vh' }}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 rounded"
                        src={scheme3}
                        alt="Third slide"
                        style={{ height: '80vh' }}
                    />
                </Carousel.Item>
            </Carousel>
        </Container>
    );
}