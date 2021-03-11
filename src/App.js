import './App.scss';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import InfScroll from './component/infiniteScroll';
function App() {
  const [characters, setCharacters] = useState([]);
  const [hero, setHero] = useState({})
  const [offset, setOffset] = useState(0);
  const [hasMore, setMore] = useState(false)
  const url = `https://gateway.marvel.com/v1/public/characters?limit=40&offset=${offset}`

  useEffect(() => {
    fetchHeroes()
  }, [])

  const fetchHeroes= async() => {
    
    const result = await axios.get(url,{
      params: {
        apikey: process.env.REACT_APP_MARVEL_API_KEY
      }
    })
    setCharacters([...characters, ...result.data.data.results]);
    setOffset(offset + result.data.data.count);
    let more = result.data.data.offset === result.data.data.total ? false : true;
    setMore(more)
  }

  const selectHero = (hero) => {
    setHero(hero)
  }

  return (
    <div className="app">
      <h1>Small Marvel App</h1>
      <div className="app__body">
        <div className="app__body__select">
          <h2>Please, select Your character</h2>
          <InfScroll list={characters} hasMore={hasMore} nextFunction={fetchHeroes} clickFunction={selectHero}/>
        </div>
        <div className="app__body__display">
          <h2>Here is the information of you character</h2>
          <div className="app__body__display__name"><span>{hero.name}</span></div>
          <div className="app__body__display__comics">
            {hero?.comics?.items?.map(comics => <li>{comics.name}</li>)}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
