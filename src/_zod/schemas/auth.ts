import z from 'zod';

export type LoginSchema = z.infer<typeof LoginSchema>;
export type RegisterSchema = z.infer<typeof RegisterSchema>;
export type ResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

export const LoginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

export const RegisterSchema = LoginSchema.extend({
  confirmation: z.string(),
}).refine((data) => data.password === data.confirmation, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmation'],
});

export const ResetPasswordSchema = LoginSchema.pick({ email: true });
