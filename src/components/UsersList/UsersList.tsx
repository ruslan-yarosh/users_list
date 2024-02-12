import React, { useCallback, useEffect, useState } from "react";
import { User } from "../../types/User";
import classNames from "classnames";
import { Link, NavLink, Outlet, useSearchParams } from "react-router-dom";
import { getSearchWith } from "../../helpers/searchHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { getUsers } from "../../helpers/fetchData";
import { Loader } from "../Loader";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { getVisibleUsers } from "../../helpers/getVisibleUsers";



export const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const sortParams = useCallback((sortParam: string) => {
    if (order && sort) {
      return {
        sort: null,
        order: null,
      };
    }

    if (sort) {
      return {
        sort: sortParam,
        order: 'desc',
      };
    }

    return {
      sort: sortParam,
      order: null,
    };
  }, [searchParams]);

  const handleChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(event.target.value);

    setSearchParams(getSearchWith(searchParams, { query: event.target.value || null }));
  }, [searchParams]);

  useEffect(() => {
    const handleGetUsers = async () => {
      try {
        const data: User[] = await getUsers();
        setUsers(data);
      } catch {
        console.log('Failed to get tasks');
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    handleGetUsers();
  }, []);

  useEffect(() => {
    if (!query) {
      return;
    }

    setSearchValue(query);
  }, []);

  return (
    <main className="is-flex">
      <aside className="box column is-2 has-background-primary-light m-0">
        <h1 className="title is-1">User APP</h1>

        {isError ? (
          <ErrorMessage />
        ) : (
          isLoading ? (
            <Loader />
          ) : (
            <>
              <input
                className="input box"
                type="text"
                placeholder="Enter a username..."
                value={searchValue}
                onChange={handleChange}
              />

              <div className="block is-flex is-align-items-center is-justify-content-space-between">
                <p className="menu-label m-0">
                  Choose user
                </p>

                <Link
                  to={{
                    search: getSearchWith(searchParams, sortParams('name')),
                  }}
                  className="button is-small"
                  title="Sort by name"
                >
                  {sort !== 'name' && (
                    <FontAwesomeIcon icon={faSort} />
                  )}

                  {sort === 'name' && !order && (
                    <FontAwesomeIcon icon={faSortUp} />
                  )}

                  {sort === 'name' && order && (
                    <FontAwesomeIcon icon={faSortDown} />
                  )}
                </Link>
              </div>

              <nav className="menu">
                <ul className="menu-list">
                  {getVisibleUsers(users, query, sort, order).map(user => (
                    <li key={user.id}>
                      <NavLink
                        to={`/${user.id}?${searchParams.toString()}`}
                        className={({ isActive }) => classNames("sidebar-item", {
                          "is-active": isActive,
                        })}
                      >
                        {user.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </>
          )
        )}
      </aside>

      <article className="box column has-background-warning-light">
        <Outlet />
      </article>
    </main>
  )
}