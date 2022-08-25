import { useEffect, useState} from 'react';
import { Formik, Form } from 'formik';
import userStore from '../../stores';
// import Checkbox from '../../InputTool/Checkbox';
import Select from '../InputTool/Select';
// import TextInput from '../../InputTool/Input';
// import * as Yup from 'yup';
import Axios from "axios";
// import AuthContext from '../../../store/auth-context';

// And now we can use these
const SignupForm = () => {
  const [subject, setSubject] = useState();
  const [place, setPlace] = useState();
  const [edit, setEdit] = useState(true);
  const getUserid = userStore(state => state.userId);

  const onchangehandler = () => { 
    setEdit(prevEdit => !prevEdit)
  }

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


  async function getProfile(userid){
    const response = await Axios.get(`http://localhost:3001/profile/${1}`,)
    return response.data}

  useEffect(() => {
    async function fetchData() {
    const profile = await getProfile(1)
    if(profile){
    setSubject(profile.result.subject)
    setPlace(profile.result.place)
  }}
    fetchData()
    const profileExist = !subject
    console.log(profileExist)}
    
  , []);
  
  async function onAddForm (values){

    if (subject) {
      const response = await Axios.patch("http://localhost:3001/profile", {
        subject: values.subject,
        place: values.place,
        userid: getUserid  }).then(()=>{ 
          console.log('send');
          return(
            response
          )})
    } else {
      const response = await Axios.post("http://localhost:3001/profile", {
        subject: values.subject,
        place: values.place,
        userid: 1  }).then(()=>{ 
          console.log('send');
          return(
            response
          )})
        }
    }


  return (
    <>
      <h1>Subscribe!</h1>
      <Formik
        initialValues={{
          subject: subject,
          place: place,
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(values.subject)
            onAddForm(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>

          <Select id="subject" label="subject" name="subject" >
            {subjects.map((subject) => <option key={subject.value} value={subject.value} label={subject.label}
              selected={subject.value === subject ? 'selected' : ''}
            />
            )}

          </Select>

          <Select id="place" label="place" name="place" >
            {places.map((place) => <option key={place.value} value={place.value} label={place.label}
              selected={place.value === place ? 'selected' : ''}
            />
            )}

          </Select>

          <div>
          <button type='button' onClick= {onchangehandler}>Edit</button>
          <button type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default SignupForm;