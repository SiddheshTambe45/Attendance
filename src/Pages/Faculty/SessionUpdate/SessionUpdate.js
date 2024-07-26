import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';


const dummyData = [
    {
      "id": 1,
      "year": "FE",
      "branch": "Computer_Science",
      "subject": "Advanced_Database_Systems",
      "sessionTiming" : "11 AM, 2024-12-12"
    },
    {
      "id": 2,
      "year": "SE",
      "branch": "Electrical_Engineering",
      "subject": "Power_Systems",
      "sessionTiming" : "11 AM, 2024-12-12"
    },
    {
      "id": 3,
      "year": "TE",
      "branch": "Mechanical_Engineering",
      "subject": "Fluid-Mechanics",
      "sessionTiming" : "11 AM, 2024-12-12"
    }
  ];


export default function SessionUpdate() {

//     const dispatch = useDispatch();

//   useEffect(() => {
//     // Simulate fetching data
//     dispatch(setClassesToAttend(dummyData));
//   }, [dispatch]);

  //const classesToAttend = useSelector((state) => state.class.classesToAttend);

  const navigate = useNavigate();
  const [data,setData] = useState(dummyData);

  const handleClick = async(e) =>{

    const dataToSend={
        year:e.year,
        branch:e.branch,
        subject:e.subject,
        sessionTiming:e.sessionTiming
    }

    navigate('/sessionEdit', { state : dataToSend });

  }



  return (
    <div>
        <div className='container p-2'>
            <div className='row'>
                <div className='p-3 rounded-4' style={{backgroundColor:'white', boxShadow:'0 0 3px grey', minHeight:'300px'}}>
                    {
                        data && data.length > 0 ? (
                            <>
                                <h2 className='py-4'>Classes Needing Attendance Update</h2>
                                {
                                    data.map((e)=>(
                                        <div key={e.id} className="mb-3 rounded" style={{boxShadow:'0 0 6px grey'}}>
                                            <div className="p-3">
                                                <h5 className="">
                                                    Year: {e.year}
                                                </h5>
                                                <h5 className="">
                                                    Branch: {e.branch}
                                                </h5>
                                                <h5>
                                                    Subject: {e.subject}
                                                </h5>
                                                <h5>
                                                    Session Timing: {e.sessionTiming}
                                                </h5>
                                                <div className='d-flex flex-row justify-content-end align-items-end'>
                                                    {/* <Link to={`/sessionEdit/${e.year}/${e.branch}/${e.subject}/${e.sessionTiming}`} className="btn" style={{boxShadow:'0 0 6px grey'}} 
                                                    >
                                                        Edit Attendance
                                                    </Link> */}
                                                    <button className='btn' type='button' onClick={()=>{handleClick(e)}} style={{boxShadow:'0 0 6px grey'}}>
                                                        Edit Attendance
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </>
                        ) : (
                            <>
                                
                            </>
                        )
                    }
                </div>     
            </div>    
        </div>  
    </div>
  )
}
