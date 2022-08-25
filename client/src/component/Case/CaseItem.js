
import Card from '../Layout/Card';
import classes from './CaseItem.module.css';
import userStore from '../../stores';
import Axios from "axios";
import { useEffect, useState } from 'react';



function CaseItem(props) {
  const getUserid = userStore(state => state.userId);
  const getFavourite = userStore(state => state.favourite)
  const addFavourite = userStore (state => state.addFavourite)
  const removeFavourite = userStore (state => state.removeFavourite)
  const fetchFavourite = userStore (state => state.fetchFavourite)
  useEffect(() => {
    fetchFavourite(getUserid)
  },[])

  function itemIsFavoriteHandler(caseId) {
    const isFavourite = getFavourite.some(caseItem => caseItem == caseId)
    return isFavourite;
  }

  async function removeFromFavorite(newFavourite){
    const res = await Axios.patch('http://localhost:3001/favourite', 
    {caseid: newFavourite,
    userid: getUserid}
  )
    console.log(res.data.result);
    return (res)}



    async function addToFavorite(newFavourite){
      const res = await Axios.patch('http://localhost:3001/favourite', 
      {caseid: newFavourite,
      userid: getUserid}
    )

      console.log(res.data.result);
      return (res)}

  function toggleFavoriteStatusHandler() {
    if (itemIsFavoriteHandler(props.id)) {
        removeFavourite(props.id)
        const newFavourite = (caseid) => {
          return getFavourite.filter(favourite => favourite !== caseid)
        }
        console.log(newFavourite(props.id))
        removeFromFavorite(newFavourite(props.id));
    }
     else {
      addFavourite(props.id)
      const newFavourite = [...getFavourite ,props.id]
      addToFavorite(newFavourite);

    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.subject}</h3>
          <h3>{props.id}</h3>
          <p>{props.place}</p>
        </div>
        
        <div className={classes.actions}>
          <button onClick={toggleFavoriteStatusHandler}>
            {itemIsFavoriteHandler(props.id)? 'Remove from Favorites' : 'To Favorites'}
          </button>
        </div>
      </Card>
    </li>
  );
}

export default CaseItem;
