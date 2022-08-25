import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import userStore from '../stores';
// import AuthContext from '../../store/auth-context';

const ApplyingForm = () => {
  const navigate = useNavigate();
  const subjectInputref = useRef();
  const placeInputRef = useRef();
  const getUserid = userStore(state => state.userId);

//   const authCtx = useContext(AuthContext);


  const [isLoading, setIsLoading] = useState(false);


  const submitHandler = (event) => {
    event.preventDefault();

    const subject = subjectInputref.current.value;
    const place = placeInputRef.current.value;
    // const currentTime = new Date();
    setIsLoading(true);


    async function apply(){
        const res = await Axios.post('http://localhost:3001/apply', 
        {subject: subject,
        place:place,
        userid:getUserid}
      )
    console.log(res.data.result);
    return (res)};
  
    apply().then((res) => {
        setIsLoading(false);
        if (res) {
          return res.data;
        } else {
          return res.then((data) => {
            let errorMessage = 'Failed!';
            throw new Error(errorMessage);
          });
        }
      })
      .then((res) => {
        console.log("posted")
        
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='subject'>subject</label>
          <input type='subject' id='subject' required ref={subjectInputref} />
        </div>
        <div>
          <label htmlFor='place'>place</label>
          <input  type='place'  id='place'  required  ref={placeInputRef}
          />
        </div>
        <div>
            <button>Post</button>
          {isLoading && <p>Sending request...</p>}
        </div>
      </form>
    </section>
  );
};

export default ApplyingForm;
