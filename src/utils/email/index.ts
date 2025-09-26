import * as nodemailer from 'nodemailer';

import { env } from '../constant';
import { HTML } from 'src/utils/html';

interface Message {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}

const mailUser = env.emailAuthUser;
const mailPassword = env.emailAuthPassword;

const sendMail = async (transporter: any, message: Message) => {
  const sendresetpassword = await transporter.sendMail(message);

  if (sendresetpassword) {
    return sendresetpassword;
  } else {
    return null;
  }
};

const sendMailChangePassword = async (
  to: string,
  token: string,
  url: string,
) => {
  try {
    const subject = 'Password Reset';
    const text = 'Password Reset';

    const senderEmail = env.emailNoreplySenderName;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: mailUser,
        pass: mailPassword,
      },
    });

    const linkReset = url + '/' + token;
    console.log('linkReset : ', linkReset);
    const message = {
      from: `"no-reply" <${senderEmail}>`,
      to,
      subject,
      text,
      html: HTML.changePassword(linkReset, env.emailExpChangePassword),
    };

    return await sendMail(transporter, message);
  } catch (error) {
    console.log('Error at send mail reset password.....');
    console.log(error);
    return null;
  }
};

const sendMailConfirmEmail = async (to: string, url: string) => {
  try {
    const subject = 'Confirm Email';
    const text = 'Confirm Email';

    const senderEmail = env.emailNoreplySenderName;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: mailUser,
        pass: mailPassword,
      },
    });

    const linkMail = url;
    console.log('linkMail : ', linkMail);
    const message = {
      from: `"no-reply" <${senderEmail}>`,
      to,
      subject,
      text,
      html: HTML.confirmEmail(linkMail, env.emailExpConfirmEmail),
    };

    return await sendMail(transporter, message);
  } catch (error) {
    console.log('Error at send mail reset password.....');
    console.log(error);
    return null;
  }
};

const sendMailAds = async (
  to: string,
  subjectName?: string,
  textName?: string,
) => {
  try {
    const subject = subjectName ? subjectName : 'Ads';
    const text = textName ? textName : 'Ads';

    const senderEmail = env.emailPromoSenderName;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: mailUser,
        pass: mailPassword,
      },
    });

    const message = {
      from: `"promo" <${senderEmail}>`,
      to,
      subject,
      text,
      html: '',
    };

    return await sendMail(transporter, message);
  } catch (error) {
    console.log('Error at send mail ads');
    console.log(error);
    return null;
  }
};

const sendMailSupport = async (
  to: string,
  subjectName?: string,
  textName?: string,
) => {
  try {
    const subject = subjectName ? subjectName : 'Support';
    const text = textName ? textName : 'Support';

    const senderEmail = env.emailSupportSenderName;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: mailUser,
        pass: mailPassword,
      },
    });

    const message = {
      from: `"support" <${senderEmail}>`,
      to,
      subject,
      text,
      html: 'support',
    };

    return await sendMail(transporter, message);
  } catch (error) {
    console.log('Error at send mail support.....');
    console.log(error);
    return null;
  }
};

export const MAIL = {
  sendChangePassword: sendMailChangePassword,
  sendAds: sendMailAds,
  sendSupport: sendMailSupport,
  sendMailConfirmEmail: sendMailConfirmEmail,
};
