import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Ava from "../../img/Ava.jpg";

const CommentSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true, //v'
    slidesToShow: 3,
    autoplaySpeed: 2000,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: true,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {/* =================================01================================= */}
      <div className="comment py-4 px-3">
        
          <p className="comment_text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A fugiat
            alias non quas tempora, rerum labore maiores ex recusandae nostrum
            blanditiis iure dolores quibusdam quia accusamus veniam optio iusto
            iste!
          </p>
          <div className="d-flex align-item-center gap-4 mt-3">
            <img src={Ava} className="w-25 h-25 rounded-2" alt="" />
            <div>
              <h6 className="Custom_Name mb-0 mt-3">Madam</h6>
              <p>Customer</p>
            </div>
          </div>
        
      </div>

      {/* =================================02================================= */}

      <div className="comment py-4 px-3">
        <p className="comment_text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A fugiat
          alias non quas tempora, rerum labore maiores ex recusandae nostrum
          blanditiis iure dolores quibusdam quia accusamus veniam optio iusto
          iste!
        </p>
        <div className="d-flex align-item-center gap-4 mt-3">
          <img src={Ava} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className=" Custom_Name mb-0 mt-3">Boss</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

      {/* =================================03================================= */}

      <div className="comment py-4 px-3">
        <p className="comment_text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A fugiat
          alias non quas tempora, rerum labore maiores ex recusandae nostrum
          blanditiis iure dolores quibusdam quia accusamus veniam optio iusto
          iste!
        </p>
        <div className="d-flex align-item-center gap-4 mt-3">
          <img src={Ava} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="Custom_Name mb-0 mt-3">Poor</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

      {/* =================================04================================= */}

      <div className="comment py-4 px-3">
        <p className="comment_text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A fugiat
          alias non quas tempora, rerum labore maiores ex recusandae nostrum
          blanditiis iure dolores quibusdam quia accusamus veniam optio iusto
          iste!
        </p>
        <div className="d-flex align-item-center gap-4 mt-3">
          <img src={Ava} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="Custom_Name mb-0 mt-3">Shiba</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default CommentSection;
