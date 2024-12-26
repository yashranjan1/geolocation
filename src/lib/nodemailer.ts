import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.NODEMAILER_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
} as SMTPTransport.Options);

export async function sendEmail(username: string, otp: string, email: string) {
  if (!username || !otp || !email) {
    console.log("Otp, Username or Email is missing");
    return new Response(
      JSON.stringify({
        success: false,
        message: "All fields are required",
      }),
      { status: 400 }
    );
  }

  try {
    const options = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "AutoResQ User Verification", // Subject line
      text: `Hello ${username},\n\nYour verification code for AutoResQ is: ${otp}.\nPlease enter this code to verify your account.\n\nThank you,\nAutoResQ Team`, // plain text body
      html: `
      <div style="font-family: Arial, sans-serif; color: #000; background-color: #fff; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #000; border-radius: 10px;">
        <h2 style="text-align: center; color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">Welcome to AutoResQ, ${username}!</h2>
        <p style="color: #000;">Thank you for signing up with AutoResQ. To complete your account verification, please use the verification code below:</p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 24px; font-weight: bold; color: #000; border: 1px solid #000; padding: 10px; display: inline-block; border-radius: 5px;">${otp}</span>
        </div>
        <p style="color: #000;">If you did not initiate this request, please ignore this email or contact our support team immediately.</p>
        <p style="color: #000;">Thank you,<br>AutoResQ Team</p>
      </div>
    `,
    };

    const mailResponse = await transporter.sendMail(options);

    console.log(mailResponse);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Verification email sent successfully!",
        data: mailResponse,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "An error occurred while sending the email.",
      }),
      { status: 500 }
    );
  }
}
