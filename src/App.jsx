import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react';

function App() {

  const URL = "https://api.thecatapi.com/v1/images/search";
  const ACCESS_KEY = "live_2I42Gk1cQJE4IzXk9xhXDkxDXcZN3dMMX4kcHXIXJ9V8bRpNICnasB4LPbXkm6Ox"
  const[img, setImg] = useState("")
  const[attribute1, setAttribute1] = useState("")
  const[attribute2, setAttribute2] = useState("")
  const[attribute3, setAttribute3] = useState("")
  const[banned, setBanned] = useState([])
  const[inputs, setInputs] = useState({
    limit: "1",
    page: "0",
    order: "RAND",
    has_breeds: "1",
    breed_ids: "",
    category_ids: "none",
    sub_id: "none",
    url: URL
  })
  const fetchData = async () => {
    let defaultValues = {
      limit: "1",
      page: "0",
      order: "RAND",
      has_breeds: "1",
      breed_ids: "",
      category_ids: "none",
      sub_id: "none",
      url: URL
    };
    for (const [key, value] of Object.entries(inputs)) {
      if (value == ""){
        inputs[key] = defaultValues[key]
      }
    }
    makeQuery();
    // const response = await axios.get(URL)
    // setImg(response.data[0].url)
    // console.log(response)
  }
  const callAPI = async (query) => {
    // console.log(query)
    const response = await fetch(query);
    const json = await response.json();
    // console.log('https://api.thecatapi.com/v1/images/' + json[0].id)
    // const newQuery = 'https://api.thecatapi.com/v1/images/' + json[0].id
    // const response2 = await fetch(newQuery);
    // const json2 = await response2.json();
    // console.log(json[0].breeds[0])
    setImg(json[0].url)
    // if (banned.indexOf(json[0].breeds[0].energy_level) == -1) {
    //   console.log('test')
    //   callAPI()
    // }
    setAttribute1(json[0].breeds[0].name)
    setAttribute2(json[0].breeds[0].origin)
    setAttribute3(json[0].breeds[0].energy_level)
    // if (json[0].breeds[0].energy_level == 5) {
    //   fetchData()
    // }
    // console.log(json[0])
    // setAttribute1(json[0].)
    // if (banned.indexOf(attribute3) > -1) {
    //   console.log('ah')
    //   callAPI();
    // }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const makeQuery = () => {
    let query = 'https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=&{breed_ids}&has_breeds=1&api_key=live_2I42Gk1cQJE4IzXk9xhXDkxDXcZN3dMMX4kcHXIXJ9V8bRpNICnasB4LPbXkm6Ox'
    callAPI(query).catch(console.error);
  }

  const handleBanned = (e) => {
    if (!banned.includes(e.target.value)) {
      setBanned([...banned, e.target.value])
    }
  }

  return (
    <div className="App">
      <div className="card">
        <h1>Veni Vici</h1>
        <h3>Discover cats!</h3>
        <div id="discover-button">
          <button onClick={fetchData}>Discover</button>
        </div>
        <img src={img} />
        <div className='Attributes'>
          <button onClick={handleBanned} value={attribute1}>Breed: {attribute1}</button>
          <button onClick={handleBanned} value={attribute2}>Country: {attribute2}</button>
          <button onClick={handleBanned} value={attribute3}>Energy level: {attribute3}</button>
        </div>
      </div>
      <div className='ban-list'>
        <h5>Banned Display list</h5>
        <div>{banned.map((ban) => <div>{ban}</div>
        )}</div>
      </div>
    </div>
  )
}

export default App
