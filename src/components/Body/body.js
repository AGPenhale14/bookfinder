import axios from "axios";
import { useState } from "react";
import { Card } from 'react-bootstrap'; 
import './body.css';

export default function Body() {

    const [book, setBook] = useState("");  
    const [result, setResult] = useState([]);  
    const [apiKey, setApiKey] = useState("AIzaSyCfIY1dDo_UFl9RCSIERSJQqnqo7yxeBYQ");

    const limitString = (str = '', num = 1) => {
        const { length: len } = str;
        if (num < len){
           return str.slice(0, num) + '...';
        } else {
           return str;
        };
    };

    function handleChange(event) {  
        var inputField = document.getElementById("inputValue");
        const book = inputField.value;  
        var dropdown = document.getElementById("slectedType");
        var value = dropdown.value;

        if (value === "keyword") {
            setBook(book);
        }

        if (value === "subject") {
            setBook("subject:" + book);
        }

        if (value === "title") {
            setBook("intitle:" + book);
        }

        if (value === "author") {
            setBook("inauthor:" + book);
        }

        if (value === "isbn") {
            setBook("isbn:" + book);
        }

    }  

    function handleSubmit(event) {  
        event.preventDefault();  
        axios.get("https://www.googleapis.com/books/v1/volumes?q=" + book + "&key=" + apiKey + "&maxResults=40")  
            .then(data => {  
                console.log(data.data.items);  
                setResult(data.data.items);  
            }
        )
    }
        
    return (
        <form onSubmit={handleSubmit}>  
        <div className="card-header main-search">  
            <div className="row">  
                <div className="col-12 col-md-3 col-xl-3">  
                    <input onChange={handleChange} id="inputValue" className="AutoFocus form-control" placeholder="Type Here For Results!" type="text" />  
                </div>    
                <div className="col-12 col-md-3 col-xl-3">  
                    <select onChange={handleChange} id="slectedType">
                        <option value="keyword">Keyword</option>
                        <option value="subject">Subject</option>
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="isbn">ISBN Number</option>
                    </select>
                </div> 
                <div className="ml-auto">  
                    <input type="submit" value="Search" className="btn btn-primary search-btn" />
                </div>  
            </div>  
        </div>  
        <div className="container-fluid">  
            <div className="row bookOutput"> 
                {result ? result.map(book => (  
                    <div className="col-sm-2" style={{ 'width': '550px'}}>
                        
                        <Card border="secondary" style={{ 'marginTop': '10px', 'marginBottom': '10px'}}>  
                            <Card.Img variant="top" src={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : ''} alt={book.volumeInfo.title} />  
                            
                            <Card.Body>  
                            {/* Book Info Here */}

                        <div className="topInfo">
                            <div className="leftInfo">
                                <div className="bookcard-page">
                                Number of Pages: {book.volumeInfo.pageCount}
                                </div>

                                <div className="bookcard-published">
                                Published: {book.volumeInfo.publishedDate}
                                </div>

                                <div className="bookcard-avarage-rating">
                                Avarage Rating: {book.volumeInfo.averageRating?book.volumeInfo.averageRating:'None'}
                                </div>
                            </div>

                            <div className="rightInfo">
                                <div className="bookcard-total-rating">
                                Total Reviews: {book.volumeInfo.ratingsCount?book.volumeInfo.ratingsCount: '0'}
                                </div>

                                <div className="bookcard-price">
                                Price: {book.saleInfo.saleability === 'FOR_SALE'? '$'+book.saleInfo.listPrice.amount: 'Not Listed'}
                                </div>

                                <div className="bookcard-link">
                                <a href={book.volumeInfo.infoLink}>Link to Book</a>
                                </div>
                            </div>
                        </div>

                            <div className="bookcard-description">
                            { book.volumeInfo.description?limitString(book.volumeInfo.description, 200):'Description Unavailable' }
                            </div>
                            
                            </Card.Body>  
                        </Card>  
                    </div>  
                )): <p>Unfortunately, no results were found with your search.  Change the search parameters & try again...</p> }
            </div>  
        </div>  
    </form>  
    )
}