// import React, { useEffect } from 'react';
// import landingPageImage from '../../../assets/images/pexels-rodnae-productions-6129507.jpg'
// import Physician from '../../../assets/images/child_image.png';
// import Gynaecologist from '../../../assets/images/gynaecologist_image.png';
// import SkinSpecailist from '../../../assets/images/hair_care_image.png';
// import Orthopedician from '../../../assets/images/orthopedician_image.png';
// import './LandingPage.css'


// const Carousel = () => {

//     useEffect(() => {
//         const script = document.createElement('script');
//         script.src = "./script.js";
//         script.async = true;
//         document.body.appendChild(script);
//         return () => {
//             document.body.removeChild(script);
//         }
//     }, []);

//     let scrollPosition = 0;
//     let cardWidth = document.getElementsByClassName('carousel-item').width();
//     let carouselWidth = document.getElementsByClassName('carousel-inner')[0].scrollWidth;
//     const previous = () =>{
//         if (scrollPosition > 0) {
//             scrollPosition -= cardWidth;
//             document.getElementById('carousel-inner').animate(
//               { scrollLeft: scrollPosition },
//               600
//             );
//           }

//     }
//     const next = () =>{
//         if (scrollPosition < (carouselWidth - cardWidth * 4)) { //check if you can go any further
//             scrollPosition += cardWidth;  //update scroll position
//             document.getElementById('carousel-inner').animate({ scrollLeft: scrollPosition },600); //scroll left
//           }
//     }

//     return (
//         <div className='conatiner-fluid'>
//             <div className='column'>
//                 <div className='col'>
//                     <img src={landingPageImage} className='landing-page-image' />
//                 </div>
//                 <div className='col column'>
//                     <div className='col text-center fw-bold fs-3 mt-2 mb-2'>
//                         <p>Consult Specialists</p>
//                     </div>
//                     <div className='col'>
//                         <div id="carouselExampleControls" class="carousel" data-bs-ride="carousel">
//                             <div class="carousel-inner">
//                                 <div class="carousel-item active">
//                                     <div class="card">
//                                         <div class="img-wrapper"> <img src={Physician} class="d-block w-100 image" alt="..." /> </div>
//                                         <div class="card-body">
//                                             <h5 class="card-title">Card title 1</h5>
//                                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
//                                                 card's content.</p>
//                                             <a href="#" class="btn btn-primary">Go somewhere</a>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div class="carousel-item">
//                                     <div class="card">
//                                         <div class="img-wrapper">
//                                             <img src={Physician} class="d-block w-100 image" alt="..." />
//                                         </div>
//                                         <div class="card-body">
//                                             <h5 class="card-title">Card title 2</h5>
//                                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
//                                                 card's content.</p>
//                                             <a href="#" class="btn btn-primary">Go somewhere</a>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div class="carousel-item">
//                                     <div class="card">
//                                         <div class="img-wrapper"> <img src={Physician} class="d-block w-100 image" alt="..." /> </div>
//                                         <div class="card-body">
//                                             <h5 class="card-title">Card title 3</h5>
//                                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
//                                                 card's content.</p>
//                                             <a href="#" class="btn btn-primary">Go somewhere</a>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div class="carousel-item">
//                                     <div class="card">
//                                         <div class="img-wrapper"> <img src={Physician} class="d-block w-100 image" alt="..." /> </div>
//                                         <div class="card-body">
//                                             <h5 class="card-title">Card title 4</h5>
//                                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
//                                                 card's content.</p>
//                                             <a href="#" class="btn btn-primary">Go somewhere</a>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div class="carousel-item">
//                                     <div class="card">
//                                         <div class="img-wrapper"> <img src={Physician} class="d-block w-100 image" alt="..." /> </div>
//                                         <div class="card-body">
//                                             <h5 class="card-title">Card title 5</h5>
//                                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
//                                                 card's content.</p>
//                                             <a href="#" class="btn btn-primary">Go somewhere</a>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div class="carousel-item">
//                                     <div class="card">
//                                         <div class="img-wrapper"> <img src={Physician} class="d-block w-100 image" alt="..." /> </div>
//                                         <div class="card-body">
//                                             <h5 class="card-title">Card title 6</h5>
//                                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
//                                                 card's content.</p>
//                                             <a href="#" class="btn btn-primary">Go somewhere</a>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div class="carousel-item">
//                                     <div class="card">
//                                         <div class="img-wrapper"> <img src={Physician} class="d-block w-100 image" alt="..." /> </div>
//                                         <div class="card-body">
//                                             <h5 class="card-title">Card title 7</h5>
//                                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
//                                                 card's content.</p>
//                                             <a href="#" class="btn btn-primary">Go somewhere</a>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div class="carousel-item">
//                                     <div class="card">
//                                         <div class="img-wrapper"> <img src={Physician} class="d-block w-100 image" alt="..." /> </div>
//                                         <div class="card-body">
//                                             <h5 class="card-title">Card title 8</h5>
//                                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
//                                                 card's content.</p>
//                                             <a href="#" class="btn btn-primary">Go somewhere</a>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div class="carousel-item">
//                                     <div class="card">
//                                         <div class="img-wrapper"> <img src={Physician} class="d-block w-100 image" alt="..." /></div>
//                                         <div class="card-body">
//                                             <h5 class="card-title">Card title 9</h5>
//                                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
//                                                 card's content.</p>
//                                             <a href="#" class="btn btn-primary">Go somewhere</a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev"
//                             onClick={previous}>
//                                 <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//                                 <span class="visually-hidden">Previous</span>
//                             </button>
//                             <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next"
//                             onClick={next}>
//                                 <span class="carousel-control-next-icon" aria-hidden="true"></span>
//                                 <span class="visually-hidden">Next</span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='col column'>
//                     <div className='col text-center fw-bold fs-3 mt-2 mb-2'>
//                         <p>Common Symptoms</p>
//                     </div>
//                     <div className='col'>
//                         {/* Carousel */}
//                     </div>
//                 </div>
//                 <div className='col column'>
//                     <div className='col text-center fw-bold fs-3 mt-2 mb-2'>
//                         <p>How Does Online Consultation Work?</p>
//                     </div>
//                     <div className='col'>

//                     </div>
//                 </div>
//             </div>
//         </div>

//     );
// }

// export default Carousel;
