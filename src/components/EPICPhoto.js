import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';


const EPICPhoto = ({ photo }) => {
    const { caption, image, date } = photo;
    let dateStr = image.split('_');
    dateStr= dateStr[2].slice(0, 8); 
    let year = dateStr.slice(0,4);
    let month = dateStr.slice(4,6);
    let day = dateStr.slice(6,8);
    const api_key = 'CCzpixoLyMPRK216VVNBYcLUcK84N7mPqtUTu7Ui'
    const link = `https://api.nasa.gov/EPIC/archive/natural/${year}/${month}/${day}/png/${image}.png?api_key=${api_key}`
    return (
        <div className="epic-photo d-flex flex-column">
            <LazyLoadImage effect="blur" src={link} alt={caption} />
            <span>{date}</span>
        </div>
    );
};

export default EPICPhoto;



