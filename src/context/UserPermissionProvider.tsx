import React, { createContext, useEffect, useState } from 'react';
import { getRoles } from '../utils/helpers';

const RolesContext = createContext<any>({});

interface IRolesProvider {
  children?: React.ReactNode;
}

function RolesProvider({ children }: IRolesProvider) {
  const [roles, setRoles] = useState<any>([]);

  useEffect(() => {
    setRoles(getRoles());
  }, []);

  return <RolesContext.Provider value={roles}>{children}</RolesContext.Provider>;
}

RolesProvider.defaultProps = {
  children: null
};

export { RolesContext, RolesProvider };
