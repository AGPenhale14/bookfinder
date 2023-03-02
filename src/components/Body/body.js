import axios from "axios";
import { useState } from "react";
import { Card } from 'react-bootstrap'; 

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
        const book = event.target.value;  
        setBook(book);  
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
                    <input onChange={handleChange} className="AutoFocus form-control" placeholder="Type Here For Results!" type="text" />  
                </div>  
                <div className="ml-auto">  
                    <input type="submit" value="Search" className="btn btn-primary search-btn" />
                </div>  
            </div>  
        </div>  
        <div className="container">  
            <div className="row"> 
                {result.map(book => (  
                    <div className="col-sm-2">
                        
                        <Card border="secondary" style={{ 'marginTop': '10px' }}>  
                            <Card.Img variant="top" src={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : ''} alt={book.volumeInfo.title} />  
                            
                            <Card.Body>  
                            {/* Book Info Here */}
                            { book.volumeInfo.description?limitString(book.volumeInfo.description, 250):'Description Unavailable' }
                            </Card.Body>  
                        </Card>  
                    </div>  
                ))}  
            </div>  
        </div>  
    </form>  
    )
}