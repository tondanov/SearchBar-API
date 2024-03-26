import React from 'react'
import {useState} from "react"
import {FaSearch} from "react-icons/fa"
import "./searchBar.css"
import axios from 'axios'

const SearchBar = ({setResults}) => {
  const [input, setInput] = useState("")

  const fetchData = async (value) => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      const json = response.data;
  
      const results = json.filter((user) => {
        return (
          value &&
          user &&
          user.name &&
          user.name.toLowerCase().includes(value.toLowerCase())
        );
      });
      setResults(results)
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error as needed
    }
  };

  const handleChange = (value) => {
    setInput(value)
    fetchData(value)
  }
  
    return (
    <div className='input-wrapper'>
        <FaSearch id='search-icon' />
        <input type="text" placeholder='Type to search...' value={input} onChange={(e) => handleChange(e.target.value)}/>
    </div>
  )
}

export default SearchBar