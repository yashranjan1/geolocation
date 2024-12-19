"use client";

import React from "react";

const Footer = () => {
  return (
    //added a basic footer for now
    <footer className="w-full p-4 bg-gray-200 text-center text-gray-600">
      © {new Date().getFullYear()} AutoResQ. All rights reserved.
    </footer>
  );
};

export default Footer;
