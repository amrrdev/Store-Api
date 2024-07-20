import nodemailer from "nodemailer";

export default async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMIAL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: print.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: "John Snow <JohnSnow@gmail.com>",
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    await transporter.sendMail(mailOptions);
};
