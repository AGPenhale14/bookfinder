import axios from "axios";
import {useState} from "react";
import { Card } from 'react-bootstrap'; 

export default function Body() {
    /**
     * 
     * npm install axios
     * npm install react-bootstrap
     * 
     * Google Search Body Part
     * Google API Key is linked to my Chrome Account. If the key doesn's work you can try adding your own google developer api key and it might work.
     * I was following along a video on how to implement this and they recommended this Axios to get the HTTP Request for the API
     * I used bootstrap to make the results into the card style.
     * There is a console log that logs all the search results into an array and it has all the varaibles for the book tiltes, book desc, etc.
     * If you have any questions about the code feel free to reach out.
     */

    const [book, setBook] = useState("");  
    const [result, setResult] = useState([]);  
    const [apiKey, setApiKey] = useState("AIzaSyCfIY1dDo_UFl9RCSIERSJQqnqo7yxeBYQ")  

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
            })
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
                        
                        <Card style={{ 'marginTop': '10px' }}>  
                            <Card.Img variant="top" src={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : ''} alt={book.title} />  
                            
                            <Card.Body>  

                            /* Book Info Here */

                            </Card.Body>  
                        </Card>  
                    </div>  
                ))}  
            </div>  
        </div>  
    </form>  
    )
}