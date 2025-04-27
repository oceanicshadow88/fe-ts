/* eslint-disable no-restricted-syntax */
import axios from 'axios';
import config from '../config/config';
import { IProjectRole, IPermission } from '../types';

let roleData: any = {};
let userProjectRoles: any = {};
let projectData: any = {};

export const enum Permission {
  ViewDashboard = 'view:dashboard',
  ViewRetro = 'view:retro',
  ViewBacklog = 'view:backlog',
  ViewSettings = 'view:settings',
  ViewEpic = 'view:epics',
  ViewStandup = 'view:standup'
}

const checkAccess = (accessLevel: string, projectId?: string) => {
  try {
    const userId = localStorage.getItem('user_id');
    const data = localStorage.getItem('user_project_roles');
    const rolesData = localStorage.getItem('roles');
    const projects = localStorage.getItem('projects');
    const isSuperUser = localStorage.getItem('is_superUser');
    const isOwner = localStorage.getItem('isCurrentUserOwner');

    if (isSuperUser === 'true' || isOwner === 'true') {
      return true;
    }

    if (!data || !rolesData || !projects) {
      return false;
    }

    userProjectRoles = JSON.parse(data);
    roleData = JSON.parse(rolesData);

    if (!projectId) {
      return false;
    }

    const userRoleId: string = userProjectRoles[projectId]?.role;

    if (
      accessLevel === Permission.ViewDashboard ||
      accessLevel === Permission.ViewRetro ||
      accessLevel === Permission.ViewBacklog ||
      accessLevel === Permission.ViewStandup ||
      accessLevel === Permission.ViewEpic
    ) {
      return true;
    }
    if (projects) {
      const parsedProjects = JSON.parse(projects);
      const projectOwnerId = parsedProjects[projectId]?.owner?.id;
      if (projectOwnerId === userId) {
        return true;
      }
    }
    if (!userRoleId || !roleData[userRoleId]) {
      return false;
    }

    const role = roleData[userRoleId];
    const hasPermission = role.permissions.some((item: IPermission) => item.slug === accessLevel);
    if (hasPermission) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};

export const projectRolesToObject = (projectsRoles: any) => {
  const obj: any = {};
  const keys = projectsRoles.map((item: any) => {
    return item.project;
  });

  for (let i = 0; i < keys.length; i += 1) {
    obj[keys[i]] = projectsRoles[i];
  }
  return obj;
};

export const projectToObject = (projects: any) => {
  const obj: any = {};
  const keys = projects.map((item: any) => {
    return item.id;
  });

  for (let i = 0; i < keys.length; i += 1) {
    obj[keys[i]] = projects[i];
  }
  return obj;
};

export const getOwner = (projectId: string) => {
  const projects = localStorage.getItem('projects');
  if (!projects) {
    return {};
  }
  projectData = JSON.parse(projects);
  return projectData[projectId]?.owner;
};

interface IRoles {
  id: string;
  name: string;
  permission: any;
  createdAt: string;
  allowDelete: boolean;
  updatedAt: string;
  slug: string;
}

export const convertRolesArrayToObject = (roles: IRoles[]) => {
  const obj: any = {};
  const keys = roles.map((item) => {
    return item.id;
  });

  for (let i = 0; i < keys.length; i += 1) {
    obj[keys[i]] = roles[i];
  }
  return obj;
};

/* TODO: FIX */
export const getRoles = async () => {
  const path = `${config.apiAddressV2}/roles`;
  const res = await axios.get(path);
  const obj = convertRolesArrayToObject(res.data);
  localStorage.setItem('roles', JSON.stringify(obj));
  return obj;
};

export interface IUserPermission {
  id: string;
  isSuperUser: number;
  projectsRoles: IProjectRole[];
}

export const setUserPermissionsLocalStorage = async (user: IUserPermission) => {
  try {
    localStorage.setItem('is_superUser', user.isSuperUser ? 'true' : 'false');
    localStorage.setItem(
      'user_project_roles',
      JSON.stringify(projectRolesToObject(user.projectsRoles))
    );
    localStorage.setItem('user_id', user.id);

    let roles = localStorage.getItem('roles');
    if (!roles) {
      roles = await getRoles();
      localStorage.setItem('roles', JSON.stringify(roles));
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const clickedShowMore = (e, refShowMore) => {
  const target = e.target as HTMLDivElement;
  let hasClickShowMore = false;

  for (const element of refShowMore) {
    const ref = element.current;
    if (ref?.contains(target)) {
      hasClickShowMore = true;
    }
  }
  return hasClickShowMore;
};

export const convertFilterArrayToString = (selectedInputs) => {
  let result = '';
  selectedInputs.forEach((selectedInput) => {
    result = result.concat(`-${selectedInput.id}`);
  });
  return result.slice(1);
};

export const dateFormatter = (
  rawDate: string | number | Date = new Date(),
  options?: {
    isToISO?: boolean;
  }
): string => {
  // default date: current date
  const date: Date = new Date(rawDate);
  if (options?.isToISO) {
    return date.toISOString(); // Output: 2023-03-26T05:43:16.654Z
  }

  const formatOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  };
  const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('en-AU', formatOptions);
  const formattedDate: string = formatter.format(date).replace(/\//g, '-');
  return formattedDate; // Output: 03-06-2023
};

export const urlParamExtractor = (url: string, paramName: string) => {
  const start = url.indexOf(`${paramName}/`) + `${paramName}/`.length;
  const end = url.indexOf('/', start) === -1 ? undefined : url.indexOf('/', start); // find the 1st "/" after start index
  return url.substring(start, end);
};

export const formatTimeStamp = (date: string | undefined): string => {
  if (!date) {
    return '';
  }
  const planDate = new Date(date);
  const formattedDate = planDate.toLocaleDateString('en-AU', {
    year: '2-digit',
    month: 'short',
    day: 'numeric'
  });
  return formattedDate;
};

export const emailValidation = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

export default checkAccess;
