import { useEffect, useState} from 'react';
import { Formik, Form } from 'formik';
import userStore from '../stores';
import CaseItem from './Case/CaseItem';
// import Checkbox from '../../InputTool/Checkbox';
import Select from './InputTool/Select';
// import TextInput from '../../InputTool/Input';
// import * as Yup from 'yup';
import Axios from "axios";


// And now we can use these
const Favourite = () => {
    const getUserid = userStore(state => state.userId);
    const getFavourite = userStore (state=> state.favourite)
    const [favourite, setFavourite] = useState([]);
    const [cases, setCases] = useState([]);
    const [place, setPlace] = useState([]);




  const subjects = [
  { value: '',
    label :'Select a subject'} ,
  { value: 'chinese' ,
    label: 'chinese' },
  { value: 'eng',
    label: 'eng' },
  { value: 'math',
    label: 'math' },
  { value: 'Other',
    label: 'Other'}]

    const places = [
      { value: '',
        label :'Select a place'} ,
      { value: 'hki' ,
        label: 'hki' },
      { value: 'kl',
        label: 'kl' },
      { value: 'nt',
        label: 'nt' },]


  async function getFavouriteCase(){
    const response = await Axios.post(`http://localhost:3001/favourite`, {favourites : getFavourite})
    console.log(response.data)
    return response.data}

  useEffect(() => {
    async function fetchData() {
    const profiles = await getFavouriteCase(getFavourite)
    if(profiles){
        console.log(profiles)
        setFavourite(profiles)
  }}
    fetchData()
    // const profileExist = !subject
    // console.log(profileExist)
  } 
  , [getFavourite]);
  
  // async function onAddForm (values){

  //     const preference = {
  //       subject: values.subject,
  //       place: values.place,
  //     }
  //     for (const key in preference) {
  //       if (preference[key] === '') {
  //         delete preference[key];
  //       }
  //     }console.log(preference)
  //     const response = await Axios.post("http://localhost:3001/cases", {
  //       preference:preference
  //       })
  //         console.log(response.data);
  //         setCases(response.data)
  //   }


  return (
    <>
      <h1>Favourite</h1>
      {/* <Formik
        initialValues={{
          subject: null,
          place: null,
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            onAddForm(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>

          <Select id="subject" label="subject" name="subject" >
            {subjects.map((subject) => <option key={subject.value} value={subject.value} label={subject.label}/>
            )}

          </Select>

          <Select id="place" label="place" name="place" >
            {places.map((place) => <option key={place.value} value={place.value} label={place.label}/>)}

          </Select>

          <div>
          <button type="submit">Submit</button>
          </div>
        </Form>
      </Formik> */}
      {favourite.map((oneCase)=>
      <CaseItem key={oneCase.idapply} 
                id={oneCase.idapply}
                subject = {oneCase.subject} 
                place = {oneCase.place} />)}
    </>
  );
};

export default Favourite;