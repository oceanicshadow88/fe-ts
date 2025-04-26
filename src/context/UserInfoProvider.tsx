/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';
import { IUserInfo } from '../types';
import { getUserInfo } from '../api/userProfile/userProfile';
import { projectRolesToObject, setUserPermissionsLocalStorage } from '../utils/helpers';

const UserContext = createContext<IUserInfo>({});
const UserDispatchContext = createContext<Dispatch<SetStateAction<IUserInfo>>>(() => {});

interface ILoginInfoProvider {
  children?: React.ReactNode;
}

const getExpirtationDate = (token: string) => {
  const decodeJSON: any = decode(token);
  const expirationDate = new Date();
  const ts = new Date().getTime();
  expirationDate.setTime(ts + decodeJSON.exp / 10);
  return expirationDate;
};

function UserProvider({ children }: ILoginInfoProvider) {
  const [userInfo, setUserInfo] = useState<IUserInfo>({});
  const navigator = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async (token: string, refreshToken: string) => {
      try {
        const result = await getUserInfo(token, refreshToken);
        const { user, isOwner } = result.data;
        const t = token ?? user.token;
        const projectRoles = JSON.stringify(projectRolesToObject(user.projectsRoles));
        setUserInfo({ ...user, token: t, projectRoles, isOwner });
        setUserPermissionsLocalStorage(user);
        localStorage.setItem('expiration_date', getExpirtationDate(t).toString());
      } catch (e) {
        localStorage.clear();
        setUserInfo({});
        navigator('/login');
      }
    };

    const token = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const expirationDate = new Date(localStorage.getItem('expiration_date') ?? '');
    if (expirationDate <= new Date()) {
      localStorage.clear();
      setUserInfo({});
      navigator('/login');
    }
    if (
      token !== undefined &&
      token != null &&
      refreshToken !== undefined &&
      refreshToken !== null
    ) {
      fetchUserInfo(token, refreshToken);
    }
  }, [localStorage.getItem('access_token'), localStorage.getItem('refresh_token')]);

  return (
    <UserContext.Provider value={userInfo}>
      <UserDispatchContext.Provider value={setUserInfo}>{children}</UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

UserProvider.defaultProps = {
  children: null
};

export { UserDispatchContext, UserContext, UserProvider };
