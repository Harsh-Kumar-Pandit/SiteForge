"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '../context/UserDetailContext';

const Provider = ({ children }: { children: React.ReactNode }) => {

  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<any>(null);

  useEffect(() => {
    if (user) {
      createNewUser();
    }
  }, [user]);

  const createNewUser = async () => {
    const result = await axios.post('/api/users', {});
    console.log(result);
    setUserDetail(result.data?.user);
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
};

export default Provider;