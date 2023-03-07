import { Link } from "react-router-dom";
import  CarouselFadeExample from './Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Beverage = () => (
    <div>
        <FontAwesomeIcon icon="check-square" />
        Your <FontAwesomeIcon icon="coffee" /> is hot and ready!
    </div>
)

function Home() {
    return <>
        <div class="container">
            <div class="abs-center" >
            <CarouselFadeExample/>
            </div>
        </div>


    </>;
}

export default Home;