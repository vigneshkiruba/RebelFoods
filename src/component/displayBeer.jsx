import React, { Component } from "react";
import "./displayBeer.css";

import ReactPaginate from 'react-paginate';
class displayBeer extends Component {
    constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      perPage: 20,
      currentPage: 0,
      searchValue : "",
    };
    this.searchBar = this.searchBar.bind(this);
    this.handlePageClick = this
            .handlePageClick
            .bind(this);
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.display()
    });

};
searchBar(){
    const searchValue = document.getElementById('searchInput').value;
    console.log(document.getElementById('searchInput').value);
    this.setState({
        searchValue: searchValue,
    }, () => {
        this.display();
    });
    
}
display(){
    return (<div>
        <table>
        <tr>
        {[1].map(data => {
            const slice = this.props.AllBeers.slice(this.state.offset, this.state.offset + this.state.perPage)
            const postData = slice.filter(cand => ((this.state.searchValue == cand.name) || (this.state.searchValue == ""))).map((i,index) => <React.Fragment>
            <tr key={i.id}>
            <td><img src={this.props.AllBeerImages[index%5].image} alt="" border="3" height="100" width="100" /></td>
            <td>{i.abv}</td>
            <td>{i.ibu}</td>
            <td>{i.id}</td>
            <td>{i.name}</td>
            <td>{i.style}</td>
            <td>{i.ounces}</td>
           </tr>
            </React.Fragment>)
            this.setState({
            pageCount: Math.ceil(this.props.AllBeers.length / this.state.perPage),
            postData
            })
        })}
       </tr></table></div>);
} 

componentDidMount() {
    this.display();
}
    render() {
    return (
    <div>
    <div className = "search" ><input type="text" id="searchInput" name="searchInput" ref = "searchInput"/> 
  <button type="button" className="btntype button" onClick={this.searchBar}>  Search  </button> </div> <br/>
    <table>
        <tr>
            <th>Images</th>
            <th>Alcohol by volume</th>
            <th>Beer measurement</th>
            <th>ID</th>
            <th>Name</th>
            <th>Style</th>
            <th>Ounces</th>
        </tr>
            {this.state.postData}
    </table>
    <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={this.state.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={10}
        onPageChange={this.handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}/>
    </div>);
    }
}

export default displayBeer;