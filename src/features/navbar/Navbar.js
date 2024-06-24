import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { selectItems } from "../cart/cartSlice";
import { selectUserInfo } from "../user/userSlice";
import { searchProductAsync, selectSearchData } from "../product/productSlice";

const navigation = [
  { name: "Products", link: "/admin", admin: true },
  { name: "Orders", link: "/admin/orders", admin: true },
];
const userNavigation = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/orders" },
  { name: "Sign out", link: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar({ children }) {
  const items = useSelector(selectItems);
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const findSearchData = useSelector(selectSearchData);

  const handleOnClick = (event, value) => {
    console.log("event ", event);
    console.log("value ", value);
  };

  const handleOnSearch = (event, searchText) => {
    event.preventDefault();
    console.log(searchText);
    dispatch(searchProductAsync(searchText));
  };

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-white shadow-md ">
          {({ open }) => (
            <div
              style={{
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              }}
            >
              <div className="mx-auto max-w-8xl px-8 sm:px-6 lg:px-20">
                <div className="flex h-auto items-center justify-between">
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>

                  <div className="flex items-center space-around ">
                    {/* mail logo  */}
                    <div className="flex-shrink-0 ">
                      <Link to="/">
                        <img
                          className="h-20 w-15 p-3 "
                          src="/ecommerce.png"
                          alt="Your Company"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      <div>
                        {navigation.map((item) =>
                          item[userInfo?.role] ? (
                            <Link
                              key={item.name}
                              to={item.link}
                              className={classNames(
                                item.current
                                  ? "bg-gray-900 text-white"
                                  : "text-black hover:bg-gray-700 hover:text-white",
                                "rounded-md px-3 py-2 text-sm font-medium"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </Link>
                          ) : null
                        )}
                      </div>
                    </div>
                  </div>

                  {/* DeskTop Cart  */}
                  <div className="relative ml-3 md:hidden">
                    <Link to="/cart">
                      <button
                        type="button"
                        className="flex items-center justify-center ml-auto w-12 h-12 rounded-full bg-gray-800 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <ShoppingCartIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                        {items.length > 0 && (
                          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 bg-red-500 text-xs font-semibold text-white rounded-full">
                            {items.length}
                          </span>
                        )}
                      </button>
                    </Link>
                  </div>

                  <div className="hidden md:block  ">
                    <div className=" flex items-center md:ml-0 ">
                      {/* past  */}
                      <div className="pe-2 w-100 dark:hover:ring-secondary dark:focus:border-secondary">
                        <form
                          className="max-w-md mx-auto border border-none rounded-3xl"
                          style={{
                            boxShadow: "rgba(0, 0, 0, 0.1) 1px 1px 3px 1px",
                          }}
                        >
                          <label
                            htmlFor="default-search"
                            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                          >
                            Search
                          </label>
                          <div className="relative flex items-center justify-center">
                            <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
                              <svg
                                className="w-4 h-4 text-secondary focus:text-primary"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                              </svg>
                            </div>

                            <div className="block w-80  ms-8 m-0  p-0 text-sm border border-none rounded-3xl dark:placeholder-gray-400 text-gray-800 dark:focus:ring-transparent dark:focus:border-secondary  z-50">
                              {/* 2 */}
                              <div>
                                <Autocomplete
                                  className="m-0 p-0"
                                  disablePortal
                                  id="combo-box-demo"
                                  options={findSearchData}
                                  getOptionLabel={(option) =>
                                    option && option?.title
                                  }
                                  onChange={(event, value) => {
                                    handleOnClick(event, value);
                                  }}
                                  onInputChange={(event, value) =>
                                    handleOnSearch(event, value)
                                  }
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      color: "#000",
                                      fontFamily: "Arial",
                                      "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "pink",
                                        borderWidth: "2px",
                                      },
                                    },
                                    "& .MuiInputLabel-outlined": {
                                      color: "#00924c",
                                    },
                                  }}
                                  renderInput={(params) => (
                                    <TextField {...params} label="Search" />
                                  )}
                                />
                              </div>
                            </div>

                            <button
                              type="submit"
                              className="text-white bg-secondary hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-secondary dark:hover:bg-secondary dark:focus:ring-0"
                            >
                              Search
                            </button>
                          </div>
                        </form>
                      </div>

                      <Link to="/cart">
                        <button
                          type="button"
                          className="rounded-full   text-black p-1  hover:text-secondary focus:outline-none focus:ring-primary focus:ring-0 focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="sr-only">View notifications</span>
                          <ShoppingCartIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </Link>
                      {items.length > 0 && (
                        <span className="inline-flex items-center rounded-md mb-7 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-50/0">
                          {items.length}
                        </span>
                      )}

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-0 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            {userInfo && userInfo.imageUrl ? (
                              <img
                                className="h-9 w-9 rounded-full"
                                src={
                                  userInfo.imageUrl
                                    ? userInfo.imageUrl
                                    : "/images/profile 1.png"
                                }
                                alt=""
                              />
                            ) : (
                              <img
                                className="h-9 w-9 rounded-full"
                                src={"/images/profile 1.png"}
                                alt="N/A"
                              />
                            )}
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute bg-slate-200 right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.link}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>

              {/*  MObile menu button */}
              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      {userInfo && userInfo.imageUrl ? (
                        <img
                          className="h-9 w-9 rounded-full"
                          src={
                            userInfo.imageUrl
                              ? userInfo.imageUrl
                              : "/images/profile 1.png"
                          }
                          alt=""
                        />
                      ) : (
                        <img
                          className="h-9 w-9 rounded-full"
                          src={"/images/profile 1.png"}
                          alt="N/A"
                        />
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {userInfo?.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {userInfo?.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>

        <main>
          <div className="mx-auto border border-spacing-2 max-w-8xl py-0 sm:px-0 lg:px-0">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}

export default NavBar;
