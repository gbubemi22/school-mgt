// import * as dotenv from "dotenv";
// dotenv.config();
// import nodemailer from "nodemailer";
// import { MailtrapTransport } from "mailtrap";



// // Load environment variables
// const SMTP_HOST = process.env.SMTP_HOST as string;
// const SMTP_PORT = parseInt(process.env.SMTP_PORT || "465", 10);
// const SMTP_USERNAME = process.env.SMTP_USERNAME as string;
// const SMTP_PASSWORD = process.env.SMTP_PASSWORD as string;
// const SMTP_AUTH_METHOD = process.env.SMTP_AUTH_METHOD as string;
// const SMTP_STARTTLS_REQUIRED = process.env.SMTP_STARTTLS_REQUIRED === "true";

// const sendEmail = async (email: string, subject: string, html: string) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: SMTP_HOST,
//       port: SMTP_PORT,
//       secure: true,
//       auth: {
//         user: SMTP_USERNAME,
//         pass: SMTP_PASSWORD,
//         //authMethod: 'PLAIN,LOGIN',
//       },

//       debug: true,
//       tls: {
//         rejectUnauthorized: SMTP_STARTTLS_REQUIRED,
//       },
//       requireTLS: SMTP_STARTTLS_REQUIRED,
//     } as nodemailer.TransportOptions);
   

//     await transporter.sendMail({
//       from: `"Quick-Food" ${process.env.SENDERS_EMAIL}`,
//       to: email,
//       subject: subject,
//       html: html,
//     });
//     console.log("email sent successfully");
//   } catch (error: any) {
    
//     return {
//       success: false,
//       message: "Failed to send email",
//       error: error.message,
//     };
//   }
// };

// export default sendEmail;


// const TOKEN = process.env.MAILTRAP_API as string

// // Create Mailtrap transporter
// const transporter = nodemailer.createTransport(
//   MailtrapTransport({
//     token: TOKEN,
//   })
// );

// interface EmailOptions {
//   to: string | string[];
//   subject: string;
//   text?: string;
//   html?: string;
// }

// // export const SendEmail = async (email: string, p0: string, otp: string, {
// //   to, subject, text, html,
// // }: EmailOptions): Promise<SentMessageInfo | void> => {
// //   try {
// //     const info = await transporter.sendMail({
// //       from: {
// //         name: "Quick-Food",
// //         address: "hello@quickfoodshop.co.uk",
// //       },
// //       to,
// //       subject,
// //       text,
// //       html,
// //       category: "Order Notification",
// //     });

// //     console.log("Email sent successfully:", info);
// //     return info;
// //   } catch (error: any) {
// //     console.error("Error sending email:", error.message || error);
// //   }
// // };
