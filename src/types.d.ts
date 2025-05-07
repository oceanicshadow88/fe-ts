export interface IShortcut {
  name: string;
  shortcutLink: string;
  id: string;
}

export interface IProject {
  id: string;
  name: string;
  iconUrl: string;
  type?: string;
  board?: string;
  projectLead?: IUserInfo;
  updateAt: Date;
  roles: IRole[];
  defaultRetroBoard: string;
  shortcut: IShortcut[];
}
/** ******************************************************* */
export interface ITicketBasic {
  id: string;
  title: string;
  tags?: ILabelData[];
  comments?: any;
  status?: IStatus;
  priority: 'Highest' | 'High' | 'Medium' | 'Low' | 'Lowest';
  project: IProject;
  board?: string;
  sprint?: ISprint | undefined;
  description?: string;
  storyPoint?: string;
  dueAt?: Date;
  reporter?: string;
  assign?: IAssign;
  type?: ITypes;
  isActive: boolean;
  attachmentUrls?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  epic: string;
}
/** **********Combine this with ITicketBasic*************** */
export interface ITicketBoard {
  id: string;
  title: string;
  tags?: ILabelData[];
  comments?: any;
  status?: string;
  priority: 'Highest' | 'High' | 'Medium' | 'Low' | 'Lowest';
  project: IProject;
  board?: string;
  sprint?: ISprint;
  description?: string;
  storyPoint?: string;
  dueAt?: Date;
  reporter?: string;
  assign?: IAssign;
  type?: ITypes;
  isActive: boolean;
  attachmentUrls?: any;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITicketInput {
  title: string;
  tags?: string[];
  comments?: any;
  status?: string;
  priority?: 'Highest' | 'High' | 'Medium' | 'Low' | 'Lowest';
  projectId?: string;
  board?: string;
  sprintId?: string | null;
  description?: string;
  storyPoint?: string;
  dueAt?: Date;
  reporter?: string;
  assign?: string;
  type?: string;
  isActive?: boolean;
  attachmentUrls?: any;
  epicId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITicketDetails {
  id: string;
  title: string;
  labels?: ILabelData[];
  comments?: any;
  status?: string;
  priority: 'Highest' | 'High' | 'Medium' | 'Low' | 'Lowest';
  project: IProject;
  sprint?: ISprint;
  description?: string;
  storyPoint?: string;
  dueAt?: Date;
  reporter?: IUserInfo;
  assign?: IUserInfo;
  type?: ITypes;
  isActive: boolean;
  attachmentUrls?: any;
  createdAt?: Date;
  updatedAt?: Date;
}
/** ******************************************************* */
export interface ISprint {
  id: string;
  name: string;
  startDate?: Date;
  endDate?: Date | null;
  description?: string;
  currentSprint: boolean;
  isComplete: boolean;
  projectId?: string;
  sprintGoal?: string;
  board: string;
  ticketId?: string[];
  retroBoard?: string;
}
/** ******************************************************* */
export interface ILabelData {
  id: string;
  name: string;
  slug?: string;
}
export interface ILabelInput {
  name: string;
  slug?: string;
}
/** ******************************************************* */
export interface IEpicData {
  id: string;
  title: string;
}
export interface IProjectData {
  [x: string]: any;
}

export interface IShortcutData {
  id?: string;
  name?: string;
  shortcutLink?: string;
}

export interface ITicketData {
  [x: string]: any;
}

export interface ICardData {
  id?: string;
  tags?: [ILabelData];
  title: string;
  statusId?: any;
  type?: string;
  description?: string;
  storyPoint?: number;
  dueAt?: Date | string;
  assignInfo?: IAssign;
  label?: string;
  projectId?: string;
}

export interface Ticket {
  title: string;
  description: string;
  cardType: string;
  assign: { userId: string; userName: string; userIcon: string };
  label: string;
  sprint: ISprint;
  storyPointEstimate: string;
  pullRequestNumber: number;
  reporter: { userId: string; userName: string; userIcon: string };
}

export interface IProjectEditor {
  [key: string]: any;
}

export interface IJobApplyEditor {
  fullName: string;
  company: string;
  workEmailAddress: string;
  phoneNumber: string;
}

export interface IAssign {
  id?: string;
  email?: string;
  name?: string;
  avatarIcon?: string;
}

export interface ITicketRelator {
  id?: string;
  avatar?: string;
  name?: string;
}

export interface IItemFromBackend {
  id: string;
}
export interface ITicketCard {
  assign?: IUserInfo;
  id?: string;
  tags?: [ILabelData];
  title: string;
  statusId?: string;
  type?: string;
  description?: string;
  storyPoint?: number;
  dueAt?: Date | string;
  assignee?: IAssign;
}

export interface IColumnsFromBackend {
  id: string;
  name: string;
  slug: string;
  order: number;
}

export interface IStatus {
  id: string;
  name: string;
  slug: string;
  tenant: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  board?: string;
}

export interface ITicketBacklog {
  assign?: IUserInfo | null;
  attachmentUrls?: [];
  comments?: [];
  createdAt?: string;
  description?: string;
  dueAt?: string;
  id?: string;
  priority?: string;
  projectId?: string;
  reporter?: IUserInfo | null;
  sprint?: ISprint | null;
  status?: IStatus;
  storyPoint?: number;
  tags?: [];
  title?: string;
  type?: ITypes;
  updatedAt?: string;
}
export interface IBacklogData {
  cards?: ITicketBacklog[];
}
export interface IBoard {
  id: string;
  title: string;
  tenant: string;
  statuses: IStatus[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IOnChangeTicketStatus {
  target: {
    status: string | null;
  };
}

export interface IOnChangeProjectLead {
  target: {
    name: string;
    value: string | null;
  };
}

export interface IOnChangeAssignee {
  target: {
    name: string;
    value: string;
  };
}

export interface IOnChangeTicketReporter {
  target: {
    id: string;
  };
}

export interface IOnChangeTicketAssignee {
  target: {
    id: string;
  };
}

export interface IProjectRole {
  id: string;
  project: string;
  role: string;
}

export interface IUser {
  email: string;
  isAdmin: number;
  paymentHistoryId: string[];
  subscriptionHistoryId: string[];
  stripePaymentIntentId: string | null;
  invoiceHistory: string[];
  productHistory: string[];
  tenants: string[];
  projectsRoles: any[]; // Consider creating a specific type for projectsRoles if structure is known
  createdAt: string;
  updatedAt: string;
  name: string;
  id: string;
  token: string;
}

export interface IUserInfo {
  id?: string;
  email?: string;
  name?: string;
  avatarIcon?: string;
  token?: string;
  isCurrentUserOwner?: boolean;
  refreshToken?: string;
  abbreviation?: string;
  userName?: string;
  jobTitle?: string;
  location?: string;
  projectsRoles?: [IProjectRole];
  backgroundColor?: string;
}

export interface IPermission {
  id: string;
  slug?: string;
  description?: string;
}

export interface IRole {
  id: string;
  name?: string;
  slug?: string;
  allowDelete?: boolean;
  permissions: IPermissions[];
  isPublic: boolean;
}

export interface IPermissions {
  id: string;
  slug: string;
  description: string;
}

export interface ICommentData {
  [x: string]: any;
}

export interface ICommentItemData {
  [x: string]: any;
}

export interface IActivityData {
  id: string;
  operation: string;
  field?: string;
  prevValues: string[];
  afterValues: string[];
  user: {
    id: string;
    name?: string;
    email: string;
    avatarIcon?: string;
  };
  ticket: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface IActivityItemData {
  [x: string]: any;
}

export interface IResetPasswordForm {
  email: stirng;
}

export interface IConfig {
  [x: string]: any;
}

export interface ITypes {
  name: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface IOptions {
  label: string;
  value: any;
  icon?: any;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  userInfo?: IUserInfo;
}

export interface IMinEvent {
  target: {
    value: string;
    name: string;
  };
}

export interface IDailyScrumTicket {
  title: string;
  progress: {
    timeStamp: number;
    value: number;
  };
  isCanFinish: boolean;
  isNeedSupport: boolean;
  supportType: 0 | 1 | 2 | 3 | 4;
  user: {
    id: string;
    name: string;
  };
  project: {
    id: string;
    name: string;
    key: string;
  };
  ticket: {
    id: string;
    title: string;
  };
  id: string;
  createAt: string;
  updateAt: string;
  otherSupportDesc?: string;
  errMsg?: string;
}

export interface IDashBoardDailyScrum {
  title: string;
  id: string;
  user: {
    id: string;
    name: string;
  };
  progresses: {
    timeStamp: string;
    id: string;
    value: number;
  }[];
}

export interface IDashboard {
  dailyScrumCount: {
    total: number;
    isCanFinish: number;
    isNeedSupport: {
      total: number;
      technical: number;
      requirement: number;
      other: number;
      dependency: number;
    };
  };
  ticketCount: {
    total: number;
    toDo: number;
    inProgress: number;
    review: number;
    done: number;
  };
  dailyScrums: IDashBoardDailyScrum[];
}

export interface IPriceInfo {
  _id: string;
  priceId: string;
  subscriptionAmount: number;
  subscriptionPeriod: string;
}

export interface IPrice {
  monthly: IPriceInfo | null;
  yearly: IPriceInfo | null;
}

interface IProductPlanDetails {
  features: string[];
  monthlyDiscountInfo: string | null;
  yearlyDiscountInfo: string | null;
  isMostPopular: boolean;
  isFreePlan: boolean;
  isEnterprisePlan: boolean;
  subscriptionButtonLabel: string;
}

export interface IProduct {
  productPlanDetails: IProductPlanDetails;
  productId: string;
  productName: string;
  productDescription: string;
  prices: IPrice;
}
