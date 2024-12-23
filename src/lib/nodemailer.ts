import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import VerificationEmail from "@/components/VerificationEmail"; 

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.PORT), 
  secure: false,
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

  //we need to fix this error !!!!!!!!!
  const emailHtml = await render(<VerificationEmail username={username} otp={otp} />);

  try {
    const options = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "AutoResQ Verification Code",
      text: "Please verify your AutoResQ account with the following verification code.",
      html: emailHtml,
    };

    const mailResponse = await transporter.sendMail(options);

    console.log(mailResponse);

    if (mailResponse.rejected.length !== 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Error sending mail to user",
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Verification email sent successfully!",
        data: mailResponse.messageId,
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

