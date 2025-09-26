import * as jwt from 'jsonwebtoken';
import { env } from '../constant';
import { TIME } from '../time';

const exposeAccess = async (
  token: string,
): Promise<{ [key: string]: any } | null> => {
  try {
    const objData = (await jwt.verify(
      token,
      env.jwtAccessKey,
    )) as jwt.JwtPayload;
    console.log(objData);

    if (objData && objData.iat! + env.jwtAccessExpTime > TIME.timestampNow()) {
      return objData;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const generateAccessKey = async (payload: {
  [key: string]: any;
}): Promise<string | null> => {
  try {
    const jwtToken = await jwt.sign(
      { ...payload, tokenType: 'access' },
      env.jwtAccessKey,
    );
    console.log(env.jwtAccessKey);
    return jwtToken || null;
  } catch (error) {
    console.log('error at gen access token');
    console.error(error);
    return null;
  }
};

const exposeRefresh = async (
  token: string,
): Promise<{ [key: string]: any } | null> => {
  try {
    const objData = (await jwt.verify(
      token,
      env.jwtRefreshKey,
    )) as jwt.JwtPayload;

    if (objData && objData.iat! + env.jwtRefreshExpTime > TIME.timestampNow()) {
      return objData;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
const generateRefreshKey = async (payload: {
  [key: string]: any;
}): Promise<string | null> => {
  try {
    const jwtToken = await jwt.sign(
      { ...payload, tokenType: 'refresh' },
      env.jwtRefreshKey,
    );
    return jwtToken || null;
  } catch (error) {
    console.log('error at gen refresh token');
    console.error(error);
    return null;
  }
};

const changePassword = async (email: string) => {
  try {
    const jwtToken = await jwt.sign(
      { email, tokenType: 'change-password' },
      env.jwtEmailKey,
    );
    return jwtToken || null;
  } catch (error) {
    console.log('error at gen refresh token');
    console.error(error);
    return null;
  }
};

const exposeChangePassword = async (token: string) => {
  try {
    const objData = (await jwt.verify(
      token,
      env.jwtEmailKey,
    )) as jwt.JwtPayload;

    if (
      objData &&
      objData.iat! + env.emailExpChangePassword > TIME.timestampNow() &&
      objData.tokenType === 'change-password'
    ) {
      return objData;
    } else {
      return null;
    }
  } catch (error) {
    console.log('error at expose reset password');
    console.log(error);
    return null;
  }
};

const confirmEmail = async (email: string) => {
  try {
    const jwtToken = await jwt.sign(
      { email, tokenType: 'confirm-email' },
      env.jwtEmailKey,
    );
    return jwtToken || null;
  } catch (error) {
    console.log('error at gen refresh token');
    console.error(error);
    return null;
  }
};

const exposeConfirmEmail = async (token: string) => {
  try {
    const objData = (await jwt.verify(
      token,
      env.jwtEmailKey,
    )) as jwt.JwtPayload;

    if (
      objData &&
      objData.iat! + env.emailExpChangePassword > TIME.timestampNow() &&
      objData.tokenType === 'confirm-email'
    ) {
      return objData;
    } else {
      return null;
    }
  } catch (error) {
    console.log('error at expose reset password');
    console.log(error);
    return null;
  }
};

export const JWT = {
  access: {
    create: generateAccessKey,
    expose: exposeAccess,
  },
  refresh: {
    create: generateRefreshKey,
    expose: exposeRefresh,
  },
  mail: {
    changePassword: {
      create: changePassword,
      expose: exposeChangePassword,
    },
    confirmMail: {
      create: confirmEmail,
      expose: exposeConfirmEmail,
    },
  },
};
