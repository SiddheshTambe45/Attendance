// import React from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Faculty from './Pages/Faculty/Faculty'
// import Hod from './Pages/HOD/Hod'
// import Principal from './Pages/Principal/Principal'
// import SignUp from './Pages/Authentication/SignUp/SignUp'
// import Login from './Pages/Authentication/Login/Login'

// export default function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>

//           <Route path='/signup' element={<SignUp />} />
//           <Route path='/login' element={<Login />} />

//           <Route path='/faculty/*' element={<Faculty />} />
//           <Route path='/hod/*' element={<Hod />} />
//           <Route path='/principal/*' element={<Principal />} />

//         </Routes>
//       </BrowserRouter>
//     </>
//   )
// }



// // src/App.js
// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Faculty from './Pages/Faculty/Faculty';
// import Hod from './Pages/HOD/Hod';
// import Principal from './Pages/Principal/Principal';
// import SignUp from './Pages/Authentication/SignUp/SignUp';
// import Login from './Pages/Authentication/Login/Login';
// import PrivateRoute from './Components/PrivateRoute';

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/signup' element={<SignUp />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/faculty/*' element={<PrivateRoute element={Faculty} allowedRoles={['Faculty']} />} />
//         <Route path='/hod/*' element={<PrivateRoute element={Hod} allowedRoles={['HOD']} />} />
//         <Route path='/principal/*' element={<PrivateRoute element={Principal} allowedRoles={['Principal']} />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }


// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Faculty from './Pages/Faculty/Faculty';
import Hod from './Pages/HOD/Hod';
import Principal from './Pages/Principal/Principal';
import SignUp from './Pages/Authentication/SignUp/SignUp';
import Login from './Pages/Authentication/Login/Login';
import PrivateRoute from './Components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/faculty/*' element={<PrivateRoute element={Faculty} allowedRoles={['Faculty']} />} />
        <Route path='/hod/*' element={<PrivateRoute element={Hod} allowedRoles={['HOD']} />} />
        <Route path='/principal/*' element={<PrivateRoute element={Principal} allowedRoles={['Principal']} />} />
      </Routes>
    </BrowserRouter>
  );
}
