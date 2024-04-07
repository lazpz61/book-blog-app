import React, {Component} from 'react';
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default class Portfolio extends Component {
    constructor(props){
        super(props);

        this.state ={
            loading: true,
            data: {},
            error: false,
            errorMessage: "",
            expandedReviews: {}
         }
    }

    componentDidMount(){
       const fetchData =  async () => {
            let userData = {}
            let booksData = []

            await fetch(`https://mo-books-laz-problems-api-e45ee9b8a20c.herokuapp.com//user/get/username/${Cookies.get("username")}`)
            .then(response => response.json())
            .then(data => userData = data) 
            .catch(error => {
                console.log("Error fetching user data, ", error)
                this.setState({
                    error: true,
                    errorMessage: "Error: Please try again later...",
                    loading: false

                })
            })

            this.props.updateUserId(userData.id)

            await fetch(`https://mo-books-laz-problems-api-e45ee9b8a20c.herokuapp.com/book/get/${userData.id}`)
            .then(response => response.json())
            .then(data => booksData = data) 
            .catch(error => {
                console.log("Error fetching user data, ", error)
                this.setState({
                    error: true,
                    errorMessage: "Error: Please try again later...",
                    loading: false

                })
            })

            this.setState({
                data: booksData,
                loading: false
            })

        }
        if (Cookies.get("username")){
            fetchData()    
        }  
        
        // toggleReview = (id) => {
        //     this.setState(prevState => ({
        //         ...prevState.expandedReviews,
        //         [id]: !prevState.expandedReviews[id]
        //     }));
        // }

    }
// This will be key for the Capstone Project for the workouts
    renderBooks() {
        return this.state.data.map(book => {
            // const isExpanded =  this.state.expandedReviews[book.id];
            // const reviewText = book.review.length > 200 && !isExpanded ? `${book.review.substring(0,200)}...`: book.review;
            return (
                <div key={book.id} className="book-wrapper">
                    <Link to={`/portfolio/book-details/${book.id}`}>
                        <h2>{book.title}</h2>
                        <h3>{book.author}</h3>
                        <p>{`"${book.review}"`}</p>
                        {/* <p>{`"${reviewText}"`}</p>
                        {book.review.length > 200 && (
                            <button onClick={() => this.toggleReview(book.id)}>
                                {isExpanded ? "Read Less" : "Read More"}
                            </button>
                        )} */}
                        <p>{`Recommend: ${book.recommend ? "Yes" : "No"}`}</p>
                    </Link>
                   
                </div>
            )
        })
    }

    render(){
        if(!Cookies.get("username")) {
            this.props.history.push("/")
        }

        if (this.state.loading){
            return(
                <div className="portfolio-wrapper">
                    Loading
                </div>
            )
        }

        return(
            <div className="portfolio-wrapper">
                
                    <Link to="/portfolio/add-book">
                        <button className="add-book-btn">Add Book</button>
                    </Link>
                

                <div className="books-wrapper">
                    {this.renderBooks()}  
                </div> 
              
            </div>
        )
    }



}