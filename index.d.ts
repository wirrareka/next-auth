import { Store } from "express-session";
import { RequestHandler } from "express";
import { IpcNetConnectOpts } from "net";
import { Express } from "express";
import * as next from "next";
import { LuscaOptions } from "lusca";
import { INextAuthSessionData } from "./client";

export  interface IOptions {
    bodyParser?: boolean;
    csrf?: boolean | LuscaOptions;
    pathPrefix?: string;
    expressApp?: Express.Application;
    expressSession: any;
    sessionSecret: string;
    sessionStore: Store;
    sessionMaxAge: number;
    sessionRevalidateAge: number;
    sessionResave: boolean;
    sessionRolling: boolean;
    sessionSaveUninitialized: boolean;
    serverUrl?: string;
    trustProxy: boolean;
    providers: any[];
    port?: number;
    functions: IFunctions;
  }

  interface IUserProvider {
    name: string;
    id: string;
  }
  interface ISendSignInEmailOpts {
    email?: string;
    url?: string;
    req?: Express.Request;
  }
  interface ISignInOpts {
    email?: string;
    password?: string;
  }
  interface INextAuthSessionData<UserType = {}> extends Session {
    maxAge: number;
    revalidateAge: number;
    csrfToken: string;
    user?: UserType;
    expires?: number;
  }

  export  interface IFunctions<
    UserType = {},
    IDType = string,
    SessionType extends INextAuthSessionData = INextAuthSessionData
  > {
    find(opts: IFindParamsType<UserType, IDType, SessionType>): Promise<UserType>;
    update: (user: UserType, profile: any) => Promise<UserType>;
    insert: (user: UserType, profile: any) => Promise<UserType>;
    remove: (id: IDType) => Promise<boolean>;
    serialize: (user: UserType) => Promise<IDType>;
    deserialize: (id: IDType) => Promise<UserType>;
    session?: (
      session: INextAuthSessionData,
      req: Express.Request
    ) => SessionType;
    sendSignInEmail?: (opts: ISendSignInEmailOpts) => Promise<boolean>;
    signIn?: (opts: ISignInOpts) => Promise<UserType>;
  }

  interface INextAuthResult {
    next?: nextApp;
    express: Express;
    expressApp: Express.Application;
    function: IFunctions;
    providers: any;
    port?: number;
  }
}

declare function NextAuth(
  nextApp?: NextApp,
  options?: nextAuth.IOptions
): Promise<nextAuth.INextAuthResult>;

