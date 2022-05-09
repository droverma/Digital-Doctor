import React, { useEffect } from 'react';
import landingPageImage from '../../../assets/images/pexels-rodnae-productions-6129507.jpg'
import Physician from '../../../assets/images/child_image.png';
import Gynaecologist from '../../../assets/images/gynaecologist_image.png';
import SkinSpecailist from '../../../assets/images/hair_care_image.png';
import Orthopedician from '../../../assets/images/orthopedician_image.png';
import './LandingPage.css'


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
                        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                            <ol class="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                            </ol>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <div class="card">
                                        <img src={Physician} class="d-block w-100" alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title">Card title 2</h5>
                                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                                                card's content.</p>
                                            <a href="#" class="btn btn-primary">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <div class="card">
                                        <img src={Gynaecologist} class="d-block w-100" alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title">Card title 2</h5>
                                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                                                card's content.</p>
                                            <a href="#" class="btn btn-primary">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <div class="card">
                                        <img src={SkinSpecailist} class="d-block w-100" alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title">Card title 2</h5>
                                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                                                card's content.</p>
                                            <a href="#" class="btn btn-primary">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <div class="card">
                                        <img src={Orthopedician} class="d-block w-100" alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title">Card title 2</h5>
                                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                                                card's content.</p>
                                            <a href="#" class="btn btn-primary">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='col column'>
                    <div className='col text-center fw-bold fs-3 mt-2 mb-2'>
                        <p>Common Symptoms</p>
                    </div>
                    <div className='col'>
                        {/* Carousel */}
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
