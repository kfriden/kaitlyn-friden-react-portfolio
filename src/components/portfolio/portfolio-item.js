import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PortfolioItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portfolioItemClass: ""
        };
    }

    handleMouseEnter() {
        this.setState({portfolioItemClass: 'img-blur'});
    }

    handleMouseLeave() {
        this.setState({portfolioItemClass: ""});
    }

    render() {
    const { id, description, thumb_image_url, logo_url } = this.props.item;
    return (
        <Link to={`/portfolio/${id}`}>
        <div className="portfolio-item-wrapper"
        onMouseEnter={() => this.handleMouseEnter()} //using () and => makes it so function doesn't run automatically
        onMouseLeave={() => this.handleMouseLeave()} //will only run on mouseover and mouseleave events
        
        >
            <div
                className={"portfolio-img-background " + this.state.portfolioItemClass}
                style={{
                    backgroundImage: "url(" + thumb_image_url + ")"
                }}
            />
            <div className="img-text-wrapper">
                <div className="logo-wrapper">
                    <img src={logo_url} />
                </div>

                <div className="subtitle">{description}</div>
            </div>
        </div>
    </Link>
    );
    }
}