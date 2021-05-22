import React, { Component } from "react";
import axios from "axios";

import PortfolioItem from './portfolio-item';

export default class PortfolioContainer extends Component {
    constructor() {
        super();
        this.state = {
            pageTitle: "Welcome to my portfolio",
            isLoading: false,
            data: [
                
            ]
        };

        //this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    portfolioItems() {
        // Data that we'll need:
        // background image: thumb_image_url, logo, description, id
        return this.state.data.map(item => {
            console.log("item data", item);
            return <PortfolioItem key={item.id} item={item} />;
        });
    }

    handleFilter(filter) {
        if (filter === "CLEAR_FILTERS") {
            this.getPortfolioItems();
        } else {
            this.getPortfolioItems(filter);
        }
    }

    getPortfolioItems(filter = null) { //filter is optional
        axios.get('https://kaitlynfriden.devcamp.space/portfolio/portfolio_items')
        .then(response => {
          if (filter) {
            this.setState({
                data: response.data.portfolio_items.filter(item => {
                    return item.category === filter;
                })
            });
          } else {
            this.setState({
                data: response.data.portfolio_items
            });
          }
          
        })
        .catch(error => {
          console.log(error);
        });
      }

    //handlePageTitleUpdate() {
        //this.setState({
            //pageTitle: "Another title"
        //});
    //}

    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }

        return (
            <div className="homepage-wrapper">
                <div className="filter-links">
                    <button className="btn" onClick={() => this.handleFilter('NonProfit')}>NonProfit</button>
                    <button className="btn" onClick={() => this.handleFilter('ReactApps')}>Apps I Made</button>
                    <button className="btn" onClick={() => this.handleFilter('Websites')}>Websites</button>
                    <button className="btn" onClick={() => this.handleFilter('CLEAR_FILTERS')}>All</button>
                </div>
                <div className="portfolio-items-wrapper">
                    

                    {this.portfolioItems()}

                    {/*<button onClick={this.handlePageTitleUpdate}>Change Title</button>*/}
                </div>
            </div>
        );
    }
}