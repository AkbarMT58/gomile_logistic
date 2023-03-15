import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="bg-gray-100 w-screen h-screen mx-auto">
    {/* <h1>404 - Not Found!</h1>
    
     */}
    <div className="flex h-screen flex-col items-center justify-center space-y-5">
      <p className="text-5xl font-bold">404</p>
      <p>Not Found</p>
      <p>This page is under development</p>
      <Link to="/" className="font-semibold">
        Back to Dashoboard
      </Link>
    </div>
  </div>
);

export default NotFound;
