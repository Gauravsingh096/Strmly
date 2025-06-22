// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthContext, AuthProvider } from './context/AuthContext';
// import Login from './components/Auth/Login';
// import Signup from './components/Auth/Signup';
// import Upload from './components/Video/Upload';
// import Feed from './components/Video/Feed';
// import Navbar from './components/Navbar';

// const PrivateRoute = ({ children }) => {
//   const { token } = useContext(AuthContext);
//   return token ? children : <Navigate to="/login" />;
// };

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Navbar />
//         <div className="container">
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route
//               path="/upload"
//               element={
//                 <PrivateRoute>
//                   <Upload />
//                 </PrivateRoute>
//               }
//             />
//             <Route path="/" element={<Feed />} />
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Upload from './components/Video/Upload';
import Feed from './components/Video/Feed';
import Navbar from './components/Navbar';

// Create a separate protected component
const ProtectedUpload = () => {
  const { token } = useContext(AuthContext);
  return token ? <Upload /> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Use the protected component here */}
            <Route path="/upload" element={<ProtectedUpload />} />
            <Route path="/" element={<Feed />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;