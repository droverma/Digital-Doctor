import React, { useEffect } from 'react';
import landingPageImage from '../../../assets/images/pexels-rodnae-productions-6129507.jpg'
import Physician from '../../../assets/images/child_image.png';
import Gynaecologist from '../../../assets/images/gynaecologist_image.png';
import SkinSpecailist from '../../../assets/images/hair_care_image.png';
import Orthopedician from '../../../assets/images/orthopedician_image.png';
import './LandingPage.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
const Specialists = [
    {
        img: Physician,
        title: 'Physician'
    },
    {
        img: Gynaecologist,
        title: 'Gynaecologist'
    },
    {
        img: SkinSpecailist,
        title: 'Skin & hair Specailist'
    },
    {
        img: Orthopedician,
        title: 'Orthopedician'
    }
]

const LandingPage = () => {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "./script.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);

    return (
        <div className='conatiner-fluid'>
            <div className='column'>
                <div className='col'>
                    <img src={landingPageImage} className='landing-page-image' />
                </div>
                <div className='col column'>
                    <div className='col text-center fw-bold fs-3 mt-2 mb-2'>
                        <p>Consult Specialists</p>
                    </div>
                    <div className='col'>
                        <OwlCarousel className='owl-theme' loop margin={60} nav>
                            {Specialists.length && Specialists.map((img, index) => {
                                return  <div class='item'>
                                <div className='card' key={index} style={{width:'20rem'}}>
                                    <img src={img.img} className="w-100 h-25" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">{img.title}</h5>
                                    </div>
                                </div>
                            </div>
                            })}
                           
                        </OwlCarousel>
                    </div>
                </div>
                <div className='col column'>
                    <div className='col text-center fw-bold fs-3 mt-2 mb-2'>
                        <p>Common Symptoms</p>
                    </div>
                    <div className='col'>
                        <Carousel responsive={responsive} 
                        autoPlay={true}
                        >
                            {Specialists.length && Specialists.map((img, index) => {
                                return <div className='card' key={index}>
                                    <img src={img.img} class="w-60 h-20" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">{img.title}</h5>
                                    </div>
                                </div>
                            })}
                        </Carousel>
                    </div>
                </div>
                <div className='col column'>
                    <div className='col text-center fw-bold fs-3 mt-2 mb-2'>
                        <p>How Does Online Consultation Work?</p>
                    </div>
                    <div className='col'>

                    </div>
                </div>
            </div>
        </div>

    );
}

export default LandingPage;
