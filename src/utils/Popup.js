import { useState, useEffect } from 'react';
export default function Popup(){
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    // Check if the popup has already been shown
    const popupShown = localStorage.getItem('popupShown');
    if (!popupShown) {
      // If not, set the flag to indicate that the popup has been shown
      localStorage.setItem('popupShown', true);
      // Show the popup
      setShowPopup(true);

      // Hide the popup after 12 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 10000); // 10  seconds
      }
  }, []);
    

  return (
    <>
          {showPopup && (
            <div className="fixed inset-0 dark:bg-white dark:bg-opacity-50 bg-primary bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="w-80 p-5 rounded flex flex-col items-center bg-white dark:bg-primary space-y-3">
                      <img className="w-28 h-28 rounded-full" src={ Data?.Avatar} alt="" />
                      <h1 className=" font-semibold">{ Data?.name} </h1>
                      <p >{Data?.Des}</p>
                      <span className=' text-highlight dark:text-highlight-dark' >
                          <h1>Admin : {Data?.Admin}</h1>
                          <h1>Admin_Password : {Data?.password_Admin}</h1>
                          <h1>User : {Data?.User}</h1>
                          <h1>Admin_Password : {Data?.password}</h1>
                          </span>
              </div>
            </div>
      )}
    </>
  );
};


const Data = {
    name: "Suraj Khonde",
    Avatar: "https://res.cloudinary.com/demjvtd9v/image/upload/v1706687030/suraj_xkhqk3.jpg",
    Des: "Welcome! 🌟Thanks for your visit.If you want explore Full my creativity then you need to login so I request you explore both ways I deveoped .",
    User: "abc@abc.dev",
    password: "12345678",
    Admin: "xyz@xyz.dev",
    password_Admin:"12345678"
}