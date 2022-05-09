import React, { useEffect } from 'react';
import landingPageImage from '../../../assets/images/pexels-rodnae-productions-6129507.jpg'
import Physician from '../../../assets/images/child_image.png';
import Gynaecologist from '../../../assets/images/gynaecologist_image.png';
import SkinSpecailist from '../../../assets/images/hair_care_image.png';
import Orthopedician from '../../../assets/images/orthopedician_image.png';
import Cough from '../../../assets/images/Cough.png';
import covid19 from '../../../assets/images/covid19.png';
import Fever from '../../../assets/images/Fever.png';
import Diabetes from '../../../assets/images/Diabetes.png';

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
];

const commonSymptoms = [
    {
        img: covid19,
        title: 'Covid-19'
    },
    {
        img: Fever,
        title: 'Fever'
    },
    {
        img: Cough,
        title: 'Cough'
    },
    {
        img: Diabetes,
        title: 'Diabetes'
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
                        <Carousel responsive={responsive}
                            autoPlay={true}
                            swipeable={false}
                            draggable={false}
                            showDots={true}
                            ssr={true} // means to render carousel on server-side.
                            infinite={true}
                            autoPlaySpeed={2000}
                            keyBoardControl={true}
                            customTransition="all .5"
                            transitionDuration={5000}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px"
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
                        <p>Common Symptoms</p>
                    </div>
                    <div className='col'>
                        <Carousel responsive={responsive}
                            autoPlay={true}
                            swipeable={false}
                            draggable={false}
                            showDots={true}
                            ssr={true} // means to render carousel on server-side.
                            infinite={true}
                            autoPlaySpeed={2000}
                            keyBoardControl={true}
                            customTransition="all .5"
                            transitionDuration={5000}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px"
                        >
                            {commonSymptoms.length && commonSymptoms.map((img, index) => {
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
                    <div className='col row m-4'>
                        <div className='col consultation'>
                            Choose a doctor
                        </div>
                        <div className='col'>

                        </div>
                        <div className='col consultation'>
                            Choose Slot
                        </div>
                        <div className='col'>

                        </div>
                        <div className='col consultation'>
                            Book Appointment
                        </div>
                        <div className='col'>

                        </div>
                        <div className='col consultation'>
                            Online Consultation
                        </div>
                        <div className='col'>

                        </div>
                        <div className='col consultation'>
                            Get Prescription
                        </div>
                        <div className='col'>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default LandingPage;
