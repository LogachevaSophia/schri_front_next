"use client";

import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Button from "../../shared/ui/Button/Button";
import Modal from "../../shared/ui/Modal/Modal";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Login from "../../features/auth/login";
import { logout, setToken } from "../../features/user/userSlice";

const Header: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      dispatch(setToken(localStorage.getItem("token")));
    }
  }, [dispatch]);

  return (
    <header className={styles.header}>
      <div className={styles.title}>Фильмопоиск</div>
      {isAuthenticated ? (
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="20" fill="white" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.25 15C14.25 18.17 16.83 20.75 20 20.75C23.17 20.75 25.75 18.17 25.75 15C25.75 11.83 23.17 9.25 20 9.25C16.83 9.25 14.25 11.83 14.25 15ZM15.75 15C15.75 12.66 17.66 10.75 20 10.75C22.34 10.75 24.25 12.66 24.25 15C24.25 17.34 22.34 19.25 20 19.25C17.66 19.25 15.75 17.34 15.75 15ZM27.8401 30C27.8401 30.41 28.1801 30.75 28.5901 30.75C29.0001 30.75 29.3401 30.41 29.3401 30C29.3401 25.73 25.1502 22.25 20.0002 22.25C14.8502 22.25 10.6602 25.73 10.6602 30C10.6602 30.41 11.0002 30.75 11.4102 30.75C11.8202 30.75 12.1602 30.41 12.1602 30C12.1602 26.55 15.6802 23.75 20.0002 23.75C24.3202 23.75 27.8401 26.55 27.8401 30Z"
              fill="#333333"
            />
          </svg>
          <Button variant="outlined" onClick={() => dispatch(logout())}>
            Выйти
          </Button>
        </div>
      ) : (
        <Button variant="fullfied" onClick={() => setOpen(true)}>
          Войти
        </Button>
      )}

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title={"Авторизация"}
        width="min-content"
      >
        <Login close={() => setOpen(false)} />
      </Modal>
    </header>
  );
};

export default Header;
