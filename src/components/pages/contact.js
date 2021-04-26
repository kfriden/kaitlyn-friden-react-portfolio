import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import contactImage from "../../../static/assets/images/auth/login.jpg";

export default function() {
    return (
        <div>
            <div>
                
            </div>
            <div className="content-page-wrapper">
            <div classname="left-column"
            style={{
                background: "url(" + contactImage + ") no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}></div>
            <div className="right-column">
               <div className="contact-bullet-points">
                   <div className="bullet-point-group">
                       <div className="icon">
                        <FontAwesomeIcon icon="mobile-alt" />
                       </div>
                       <div className="text">
                           617-312-0245
                       </div>
                   </div>
                   <div className="bullet-point-group">
                       <div className="icon">
                        <FontAwesomeIcon icon="envelope-open" />
                       </div>
                       <div className="text">
                        kfriden@verizon.net
                       </div>
                   </div>
                   <div className="bullet-point-group">
                       <div className="icon">
                        <FontAwesomeIcon icon="map-marker-alt" />
                       </div>
                       <div className="text">
                           Boston, MA
                       </div>
                   </div>
               </div> 
            </div>
        </div>
        </div>
        
        
    )
}