import './App.css';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [file, setFile] = useState()

  function handleFile(event) {
    setFile(event.target.files[0])
  }

  function handleUpload() {
    const formData = new FormData()
    formData.append('file', file)
    fetch(
      'url',
      {
        method: "POST",
        body: formData
      }
    ).then((response) => response.json()).then(
      (result) => {
        console.log('success', result)
      }
    )
    .catch(error => {
      console.error("Error:", error)
    })
  }

  useEffect(() => {
    // Function to handle smooth scroll
    const handleSmoothScroll = (event) => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };

    // Adding event listeners to links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener('click', handleSmoothScroll);
    });

    // Cleanup event listeners on component unmount
    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  // Animation variants for Fraud Prevention Tips
  const tipVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        type: 'spring',
        stiffness: 50,
      },
    }),
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 w-full z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="images/logo.png" className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Fraud Guardian</span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="#home" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</a>
              </li>
              <li>
                <a href="#fraud-prevention" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Fraud Prevention</a>
              </li>
              <li>
                <a href="#tasks" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Tasks</a>
              </li>
              <li>
                <a href="#links" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Links</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div id="home" className="bg-gray-800 min-h-screen flex flex-col justify-center items-center">
        <form className="w-full max-w-4xl">
          <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
              <form onSubmit={handleUpload}>
              <div className="flex items-center space-x-2">
              <div className="relative">
                <input 
                  type="file" 
                  id="file-upload" 
                  name="file" 
                  onChange={handleFile} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <label 
                  htmlFor="file-upload" 
                  className="inline-block px-2 py-1 text-sm text-white bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Choose File
                </label>
              </div>
              {file && (
                <span className="text-sm text-gray-300">
                  {file.name}
                </span>
              )}
            </div>
              </form>
            </div>
            <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
              <textarea
                id="editor"
                rows="10"
                className="block w-full px-0 text-lg text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                placeholder="Input..."
                required
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 text-m font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Submit
          </button>

          {/* Progress Bar Section */}
          <div className="mt-8 relative w-full bg-gray-200 rounded-full h-6 dark:bg-gray-700">
            <div className="bg-blue-600 h-6 rounded-full" style={{ width: '45%' }}></div>
            <div className="absolute inset-0 flex items-center justify-between px-3">
              <span className="text-m font-medium text-blue-700 dark:text-white">45%</span>
            </div>
            <div className="absolute inset-x-0 bottom-[-2rem] flex justify-center">
              <span className="text-xl font-medium text-blue-700 dark:text-white">Most likely fraud</span>
            </div>
          </div>
        </form>
      </div>

      {/* Fraud Prevention Section */}
      <div id="fraud-prevention" className="bg-gray-700 min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Fraud Prevention Tips</h2>
        <div className="mt-4 space-y-4">
          {[
            "Your bank would never call you to ask for personal information.",
            "Your bank would never ask you to keep a secret or be dishonest.",
            "Your bank would never threaten to cancel your services and ask to remote into your device.",
            "Your bank would never try to rush you into doing something.",
            "Your bank would never ask you to help with an investigation.",
            "Your bank would never ask you to purchase gift cards or cryptocurrency.",
            "Your bank would never ask you to transfer money as part of an investigation.",
            "Your bank would never request access to your computer.",
          ].map((tip, index) => (
            <motion.p
              key={index}
              className="text-lg text-gray-600 dark:text-gray-300 text-center"
              custom={index}
              initial="hidden"
              animate="visible"
              variants={tipVariants}
            >
              {tip}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Tasks Section */}
      <div id="tasks" className="bg-gray-800 min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Tasks</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Details about tasks go here...</p>
      </div>

      {/* Links Section */}
      <div id="links" className="bg-gray-700 min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Links</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Useful links and resources go here...</p>
      </div>
    </>
  );
}

export default App;
