import React from 'react'
import PropTypes from 'prop-types';

//Component developed in lesson 7
//This is the syntax for displaying the stars for a review
const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      <span>
        <i style={{color}}
          className={
            value >= 1
              ? "fas fa-star"
              : value >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i style={{color}}
          className={
            value >= 2
              ? "fas fa-star"
              : value >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i style={{color}}
          className={
            value >= 3
              ? "fas fa-star"
              : value >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i style={{color}}
          className={
            value >= 4
              ? "fas fa-star"
              : value >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i style={{color}}
          className={
            value >= 5
              ? "fas fa-star"
              : value >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>{text && text}</span>
    </div>
  );
};

//First time using a default prop
Rating.defaultProps = { color: '#f8e825'};

//We can set the type for the props - ensures that we are sending the right data type
Rating.propTypes = {
    value: PropTypes.number,
    text: PropTypes.string,
    color: PropTypes.string,
};

export default Rating
