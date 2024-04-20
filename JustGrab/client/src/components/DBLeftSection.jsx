import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { useDispatch, useSelector } from "react-redux";

const DBLeftSection = () => {

  const user = useSelector((state) => state.user);
  return (
    <div className="h-full py-12 flex flex-col bg-lightOverlay backdrop-blur-md shadow-md min-w-210 w-300 gap-3">
      <NavLink to={"/"} className="flex items-center justify-start px-6 gap-4">
        <img src={Logo} className="w-12" alt="" />
        <p className="font-semibold text-xl">Just Grab</p>
      </NavLink>

      <hr />

      <ul className="flex flex-col gap-4">
        <NavLink
          to={"/dashboard/home"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
        >
          Home
        </NavLink>
        {user?.user_id === process.env.REACT_APP_ADMIN_ID || user?.user_id === process.env.REACT_APP_ADMIN_ID_KFC && (  <NavLink
          to={"/dashboard/orders"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
        >
          Orders
        </NavLink> )}
        
        {user?.user_id === process.env.REACT_APP_ADMIN_ID && (  <NavLink
          to={"/dashboard/orders"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
        >
          Orders
        </NavLink> )}
        {user?.user_id === process.env.REACT_APP_ADMIN_ID && user?.user_id != process.env.REACT_APP_ADMIN_ID_KFC && ( <NavLink
          to={"/dashboard/items"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
        >
          Items
        </NavLink>)}

        {user?.user_id === process.env.REACT_APP_ADMIN_ID || user?.user_id != process.env.REACT_APP_ADMIN_ID_KFC && ( (
                    <NavLink
                    to={"/dashboard/newItem"}
                    className={({ isActive }) =>
                      isActive
                        ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
                        : isNotActiveStyles
                    }
                  >
                    Add New Item
                  </NavLink>
                  ))}
        
        {user?.user_id === process.env.REACT_APP_ADMIN_ID && user?.user_id != process.env.REACT_APP_ADMIN_ID_KFC && (<NavLink
          to={"/dashboard/users"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
        >
          Users
        </NavLink>)}
      </ul>

      <div className="w-full items-center justify-center flex h-225 mt-auto px-2 ">
        <div className="w-full h-full rounded-md bg-red-400 flex items-center justify-center flex-col gap-3 px-3">
          <div className="w-12 h-12 borde bg-white rounded-full flex items-center justify-center">
            <p className="text-2xl font-bold text-red-500">?</p>
          </div>
          <p className="text-xl text-primary font-semibold">Help Center</p>
          <p className="text-base text-gray-300 text-center">
            Having trouble in city. Please contact us for more questions
          </p>
          <p className="px-4 py-2 rounded-full bg-primary text-red-400 cursor-pointer">
            Get in touch from the chat on the Right
          </p>
        </div>
      </div>
    </div>
  );
};

export default DBLeftSection;
