import AWS from 'aws-sdk';
import { useCallback } from 'react';
import styled from 'styled-components';
/* eslint-disable-next-line */
export interface AwsServicesProps {}

const StyledAwsServices = styled.div`
  color: pink;
`;

import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useLocalStorage } from '../helpers/useStorage';
import { AuthContextType, LoginDetails } from '../types';

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [loginDetails, setLoginDetails] = useLocalStorage('loginDetails', {});

  const login = useCallback((loginDetails: LoginDetails | null) => {
    try {
      AWS.config.update({
        accessKeyId: loginDetails?.accessKeyId,
        secretAccessKey: loginDetails?.secretAccessKey,
        region: loginDetails?.region,
      });
      setLoginDetails(loginDetails);
    } catch (e) {}
  }, []);

  const logout = useCallback(() => {
    setLoginDetails({});
  }, []);

  useEffect(() => {
    if (
      loginDetails !== undefined &&
      !Boolean(AWS.config?.credentials?.accessKeyId)
    ) {
      login(loginDetails);
    }
  }, [loginDetails]);

  const isLogged = Boolean(loginDetails?.secretAccessKey);

  const context = useMemo(() => {
    return {
      loginDetails,
      login,
      logout,
      isLogged,
    };
  }, [isLogged]);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
