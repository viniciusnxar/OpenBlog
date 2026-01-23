import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
import { Resend } from 'resend';

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordResetToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { email },
    });
    return passwordResetToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }
  const passwordResetToken = await db.passwordResetToken.create({
    data: { email, token, expires },
  });
  return passwordResetToken;
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const resetLink = `${process.env.BASE_URL}/password-reset-form?token=${token}`;
  const res = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset de senha',
    html: `<p style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #374151; font-size: 18px; line-height: 1.6;">Clique <a href='${resetLink}' style="color: #4F46E5; font-weight: bold; text-decoration: underline;">aqui</a> para resetar a senha!</p>`,
  });
  return { error: res.error };
};
