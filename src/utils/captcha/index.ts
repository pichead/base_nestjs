import * as nodemailer from 'nodemailer';

import { env } from '../constant';

const cloudflareTurnstileValidate = async (string) => {
  return true;
};

export const CAPTCHA = {
  cloudflare: {
    validate: cloudflareTurnstileValidate,
  },
};
