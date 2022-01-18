import React, { useState } from "react";

const SearchConsole = ({onSeach}) => {
    const [data, setData] = useState();

    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            "searching": target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        /*console.log(data);*/
    };

    return (
        <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
            <input type="text" 
                className="form-control" 
                placeholder="Search"  
                aria-describedby="basic-addon2"
                onChange={handleChange}>
            </input>
        <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit" onClick={() => onSeach(data)}>Search</button>
        </div>
        </div>
        </form>
    )
}

export default SearchConsole