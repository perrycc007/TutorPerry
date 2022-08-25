import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';
import userStore from '../../stores'
import classes from './TimeForm.module.css'

// const time = [{8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false}];
const times = [{1: true, 2: false, 3: false}];

const days  = [];


[...Array(3)].map(()=> {
  return days.push(times);
});



export default function TimeForm(props) {
  const [selected, setSelected] = useState([]);
  const getUserid = userStore(state => state.userId);


  const checkboxHandler = (time) => {
    console.log(time)
    const existed = (time) => {
      return(selected.findIndex(
        (item) => item === time
      )) ;
    }
  // updating
    if(existed(time)>-1){
    const list = selected.filter((item)=> item !==time )
    console.log(list)
    setSelected(list)
    }else{
    // adding
    const newlist = [...selected, time]
    setSelected(newlist)
    console.log(newlist)
    }
  }

// submit
  const submitHandler= (event) =>{
    event.preventDefault();
    async function pushTime(){
    const response = await Axios.patch(`http://localhost:3001/time`,
    {userid : getUserid,time:selected} )
    return response.data.result}
    pushTime()
  }


  // get the existed list
  async function getTime(){
    const response = await Axios.get(`http://localhost:3001/time`, {userid : getUserid})
    return JSON.parse(response.data.result[0].availtime)}

  useEffect(() => {
    console.log('get')
    async function fetchData() {
    const list = await getTime()
    if(list){
        console.log(list)
        setSelected(list)
    }}
    fetchData()
    },[])

     function inTheList(id){
      const checked = selected.some((time)=> time === id )
      return checked
    }


  useCallback(()=>{
    console.log('rerendered')
  },[checkboxHandler])
  return (

      <form onSubmit={submitHandler}>
        {days.map((x, xi) => {
          return x.map((y, yi) => {
            return (
              <div style={{
                width: '50%', textAlign: 'center', margin: 'auto', border: '1px solid #000'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  {
                    Object.entries(y).map(([key, value]) => {
                      return (
                          <>
                          <span className={inTheList('d'+ parseInt(`${key}`)+
                            't'+parseInt(+`${xi}`))?classes.active:classes.action }

                            key={parseInt(`${key}`+`${xi}`)} 
                            checked = {inTheList('d'+ parseInt(`${key}`)+
                            't'+parseInt(+`${xi}`)) }

                            onClick = {(e)=>checkboxHandler(
                              'd'+ parseInt(`${key}`)+
                              't'+parseInt(`${xi}`))}
                            >                         
                            <input className={classes.checkbox}
                            type="checkbox" 
                            id={'d:'+ parseInt(`${key}`)+
                            't:'+parseInt(+`${xi}`)} 

                            key={parseInt(`${key}`+`${xi}`)} 
                            checked = {inTheList('d'+ parseInt(`${key}`)+
                            't'+parseInt(+`${xi}`)) }

                            onClick = {(e)=>checkboxHandler(
                              'd'+ parseInt(`${key}`)+
                              't'+parseInt(`${xi}`))}
                            ></input>
                            </span>
                          </>
                      );
                    })
                  }

                </div>
              </div>
            );
          });
        })
      }
          <button type="submit" >Submit</button>
      </form>

  );
}
