import React, { Component } from "react";
import axios from "axios";
import Displaybeer from "./component/displayBeer";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beers : [],
      beerimages : [],
      isBeersLoaded: false,
      isBeerImagesLoaded: false,
      token: ""
    };
  }
  callBeercraftAPI = (BeercraftAPI) => {
    BeercraftAPI
      .then((result) => result.data)
      .then((json) => {
        this.setState({
          isBeersLoaded: true,
          beers: json,
        });
      });
  };

  callBeerimagesAPI = (BeerimagesAPI) => {
    BeerimagesAPI
      .then((result) => result.data)
      .then((json) => {
        this.setState({
          isBeerImagesLoaded: true,
          beerimages: json,
        });
      });
  };

   componentDidMount() {
    const BeercraftAPI = axios.get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json");
    const BeerimagesAPI = axios.get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json");
     this.callBeercraftAPI(BeercraftAPI);
     this.callBeerimagesAPI(BeerimagesAPI);
  }

  render() {
    var {
      beers,
      beerimages,
      isBeersLoaded,
      isBeerImagesLoaded,
      token,
    } = this.state;
    return (
      <div className="App">
        <h1 style={{"text-align": "center"}}> Rebel Foods </h1>
        {this.state.isBeersLoaded && this.state.isBeerImagesLoaded ? (  
        <Displaybeer
          isBeersLoaded={isBeersLoaded}
          isBeerImagesLoaded={isBeerImagesLoaded}
          token={token.token}
          AllBeers={beers}
          AllBeerImages={beerimages}
        /> ) : (<div> Loading.. </div>)}

        <footer></footer>
      </div>
    );
  }
}

export default App;
