export interface MainState {
  invoice: InvoiceInterface;
  auth: AuthenticationState;
}

export interface InvoiceInterface {
  allInvoices: any[];
  createInvoice: any;
}

export interface AuthenticationState {
  data: IAuthData;
}
export interface IAuthData {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  lastLoginAt: Date;
  contacts: any[];
  addresses: any[];
  listCustomFields: Array<IUserCustomFields>;
  employmentDetails: any[];
  memberships: Array<IUserMemberships>;
  apps: Array<IUserApps>;
  listRoles: Array<string>;
  permissions: any[];
  createdAt: Date;
  passwordExpired: boolean;
  updatedAt: Date;
}
export interface IUserCustomFields {
  customFieldId: string;
  customKey: string;
  customValue: string;
}
export interface IUserMemberships {
  membershipId: string;
  organisationId: string;
  roleName: string;
  token: string;
}
export interface IUserApps {
  appName: string;
}
