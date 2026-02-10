import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const emailVerificationMailgenContent = (username, verificationURL) =>
{
    return {
        body: {
            name: username,
            intro: "welcome to the real time collaborative whiteboard!",
            action: {
                instructions: "To verify your email please click on the following button",
                button: {
                    color: "#22BC66",
                    text: "Verify your email",
                    link: verificationURL
                }
            },
            outro: "Need help? Feel free to mail me!"
        }
    }
}

const forgotPasswordMailgenContent = (username, passwordResetURL) =>
{
    return {
        body: {
            name: username,
            intro: "we got a request to reset the password of your account",
            action: {
                instructions: "To reset your password please click on the following button",
                button: {
                    color: "#22BC66",
                    text: "Reset password",
                    link: passwordResetURL
                }
            },
            outro: "Need help? Annanuku oru email anupunga pathukuren ;)"
        }
    }
}

const sendEmail = async (options) =>
{
    const mailgenerator = new Mailgen(
        {
            theme: "default",
            product: {
                name: "Task Manager",
                link: "https://placeholderformyproject.com"
            }
        }
    )

    const emailTextual = mailgenerator.generatePlaintext(options.mailgenContent)
    const emailHTML = mailgenerator.generate(options.mailgenContent)

    const transporter = nodemailer.createTransport(
        {
            host: process.env.MAILTRAP_SMTP_HOST,
            port: process.env.MAILTRAP_SMTP_PORT,
            auth: {
                user: process.env.MAILTRAP_SMTP_USER,
                pass: process.env.MAILTRAP_SMTP_PASS
            }
        }
    )

    const mail = {
        from: "mail.taskmanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHTML
    }

    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("Email service failed. Make sure to enter the correct MailTrap credentials")
        console.error("Error: ", error);
    }
}

export { emailVerificationMailgenContent, forgotPasswordMailgenContent, sendEmail }