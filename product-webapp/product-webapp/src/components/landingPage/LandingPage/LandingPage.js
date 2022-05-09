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
import './LandingPage.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
        <>
            <div className='conatiner-fluid margin-container'>
                <div className='column'>
                    <div className='col'>
                        <img src={landingPageImage} className='landing-page-image' />
                    </div>
                    <div className='col column'>
                        <div className='col text-center fw-bold fs-3 mt-4 mb-4'>
                            <p>Consult Specialists</p>
                        </div>
                        <div className='col'>
                            <Carousel responsive={responsive}
                                autoPlay={true}
                                swipeable={false}
                                draggable={false}
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
                                    return <div className='card card-properties' key={index}>
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
                        <div className='col text-center fw-bold fs-3 mt-4 mb-4'>
                            <p>Common Symptoms</p>
                        </div>
                        <div className='col'>
                            <Carousel responsive={responsive}
                                autoPlay={true}
                                swipeable={false}
                                draggable={false}
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
                                    return <div className='card card-properties' key={index}>
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
                        <div className='col text-center fw-bold fs-3 mt-4 mb-4'>
                            <p>How Does Online Consultation Work?</p>
                        </div>
                        <div className='col row m-4'>
                            <div className='col consultation text-center padding-top'>
                                <p className=''>Choose a doctor</p>
                            </div>
                            <div className='col padding-top text-center'>
                                <ArrowForwardIcon />
                            </div>
                            <div className='col consultation text-center padding-top'>
                                <p>Choose Slot</p>
                            </div>
                            <div className='col padding-top text-center'>
                                <ArrowForwardIcon />
                            </div>
                            <div className='col consultation text-center padding-top'>
                                <p>Book Appointment</p>
                            </div>
                            <div className='col padding-top text-center'>
                                <ArrowForwardIcon />
                            </div>
                            <div className='col consultation text-center padding-top'>
                                <p>Online Consultation</p>
                            </div>
                            <div className='col padding-top text-center'>
                                <ArrowForwardIcon />
                            </div>
                            <div className='col consultation text-center padding-top'>
                                <p>Get Prescription</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <footer class="bg-dark">
                <div class="ps-3 pe-3 pt-3 text-start text-white ">
                    <div className='col-md-8'>
                        <div className='row'>
                            <div className='col-md-7'>
                                <img src="../Digital_doctor_logo.png" style={{ height: '100%' }} />
                            </div>
                            <div className='col-md-4'>
                                <a class="mx-2 text-white" href="#candidates">About</a>
                                <a class="mx-2 text-white" href="#companies">Contact</a>
                                <a class="mx-2 text-white" href="#about">Login</a>
                                <a class="mx-2 text-white" href="#contact">Register</a>
                            </div>
                        </div>
                    </div>

                    {/* <span className='img'>
                        </span>

                        <a class="mx-2 text-white" href="#candidates">About</a>
                        <a class="mx-2 text-white" href="#companies">Contact</a>
                        <a class="mx-2 text-white" href="#about">Login</a>
                        <a class="mx-2 text-white" href="#contact">Register</a> */}
                </div>
                <div class="text-end text-white ps-3 pe-3" >
                    <div className='col-md-12'>
                        <div className='row'>
                            <div className='col-md-7'>
                                © 2022 Health Service
                            </div>
                            <div className='col-md-5'>
                                <section class="mb-4">
                                    <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i
                                        class="fa fa-facebook"></i></a>

                                    <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i
                                        class="fa fa-twitter"></i></a>

                                    <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i
                                        class="fa fa-google"></i></a>

                                    <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i
                                        class="fa fa-instagram"></i></a>

                                    <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i
                                        class="fa fa-linkedin"></i></a>

                                    <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i
                                        class="fa fa-github"></i></a>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
export default LandingPage;