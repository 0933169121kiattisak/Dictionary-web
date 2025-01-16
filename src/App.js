import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { FcSpeaker } from "react-icons/fc";

function App() {
  const [data, setData] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [wordnot,setWordnot] = useState("");

  function getMeaning() {
    
      setWordnot("");
      axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`)
      .then((res) => {
        setData(res.data[0]);
        console.log(data);
        console.log(searchWord);
      })
      .catch(() => {
        setWordnot("Word not found. Please try another word.");
        setData("");
      });
     
    

    
  }

  function playAudio() {
    let audio = new Audio(data.phonetics[0].audio);
    audio.play();
  }

  return (
    <div className="App">
      <h1>Free Dictionary</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search..."
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        ></input>
        <button
          className="btn-search"
          onClick={() => {
            getMeaning();
          }}
        >
          Find Meaning
        </button>
        {wordnot && <h2>{wordnot}</h2>}
      </div>
      
      {data && (
        <div className="meaning-result">
          
          <h2>
            {data.word}
            {""}
            <button className="audio"
              onClick={() => {
                playAudio();
              }}
            >
              <FcSpeaker size="30px" color="#C5BAFF" />
            </button>
          </h2>
          <h4>Parts of Speech:</h4>
          <p>{data.meanings[0].partOfSpeech}</p>
          <h4>Definition:</h4>
          <p>{data.meanings[0].definitions[0].definition}</p>
          <h4>Example:</h4>
          <p>{data.meanings[0].definitions[0].example}</p>
        </div>
      )}
    </div>
  );
}

export default App;
