// // src/components/PrivateRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const PrivateRoute = ({ element: Element, allowedRoles, ...rest }) => {
//   const { role } = useSelector((state) => state.auth);

//   return (
//     <Route
//       {...rest}
//       element={
//         allowedRoles.includes(role) ? (
//           <Element />
//         ) : (
//           <Navigate to="/login" />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;

// --------

// // src/components/PrivateRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const PrivateRoute = ({ element: Element, allowedRoles }) => {
//   const { role } = useSelector((state) => state.auth);

//   // Check if the user's role is allowed
//   if (allowedRoles.includes(role)) {
//     return <Element />;
//   } else {
//     return <Navigate to="/login" />;
//   }
// };

// export default PrivateRoute;




// // src/components/PrivateRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const roleHomePaths = {
//   Faculty: '/faculty',
//   HOD: '/hod',
//   Principal: '/principal'
// };

// const PrivateRoute = ({ element: Element, allowedRoles }) => {
//   const { role } = useSelector((state) => state.auth);

//   // Check if the user's role is allowed
//   if (allowedRoles.includes(role)) {
//     return <Element />;
//   } else {
//     const homePath = roleHomePaths[role] || '/login';
//     return <Navigate to={homePath} />;
//   }
// };

// export default PrivateRoute;



// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const roleHomePaths = {
  Faculty: '/faculty',
  HOD: '/hod',
  Principal: '/principal'
};

const PrivateRoute = ({ allowedRoles }) => {
  const { role } = useSelector((state) => state.auth);



  if (!role) {
    return <Navigate to="/login" replace />;
  }


  if (!allowedRoles.includes(role)) {
    const homePath = roleHomePaths[role] || '/login';
    return <Navigate to={homePath} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
