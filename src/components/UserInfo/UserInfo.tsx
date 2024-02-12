import React from "react";
import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import classNames from "classnames";


export const UserInfo: React.FC = () => {
  const [searchParams] = useSearchParams();

  return (
    <>
      <h2 className="title is-2 has-text-centered">What do you want to see?</h2>

      <div className="block has-text-centered">
        <NavLink
          to={`posts?${searchParams.toString()}`}
          className={({ isActive }) => classNames("button is-link is-medium mr-5 is-rounded", {
            "is-light": !isActive,
          })}
        >
          Posts
        </NavLink>

        <NavLink
          to={`albums?${searchParams.toString()}`}
          className={({ isActive }) => classNames("button is-link is-medium mr-5 is-rounded", {
            "is-light": !isActive,
          })}
        >
          Albums
        </NavLink>
      </div>

      <Outlet />
    </>
  );
};
