import fs from 'fs';
import { google } from 'googleapis';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import path from 'path';

import { customToFixed } from '../helpers';
import { CartItemType } from '../types';

const OAuth2 = google.auth.OAuth2;

export const sendEmail = async (
  email: string,
  items: CartItemType[],
  subtotal: number,
  shipping: number
) => {
  async function createTransporter(): Promise<nodemailer.Transporter> {
    try {
      const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        'https://developers.google.com/oauthplayground'
      );

      oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
      });

      const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            reject();
          }
          resolve(token);
        });
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.USER_EMAIL,
          accessToken,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN
        }
      } as nodemailer.TransportOptions);

      return transporter;
    } catch (err) {
      throw new Error('Error creating email transporter');
    }
  }

  const source = fs.readFileSync(
    path.join(__dirname, '../templates/order-summary.hbs'),
    'utf8'
  );

  const template = handlebars.compile(source);

  const replacements = {
    items: items.map((item) => ({
      name: item.item.product.name,
      size: item.item.size,
      quantity: item.count,
      price: customToFixed(item.item.product.price * item.count),
      image: item.item.product.images[Object.keys(item.item.product.images)[0]]
        .split(',')
        .filter((image) => {
          return image.includes('front');
        })[0]
    })),
    totalPrice: customToFixed(subtotal),
    shipping,
    tax: customToFixed(subtotal * 0.1),
    grandTotal: customToFixed(subtotal + shipping + subtotal * 0.1)
  };

  const htmlToSend = template(replacements);

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: 'Takoda Tees Order Confirmation',
    html: htmlToSend
  };

  const emailTransporter = await createTransporter();

  await new Promise((resolve, reject) => {
    emailTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
};
