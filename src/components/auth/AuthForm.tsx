'use client';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Icons } from '@/assets/icons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/helpers/api/useAuth';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
export const loginFormSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Please provide a valid email address',
      required_error: 'Email is required',
    })
    .email(),
});
export function AuthForm({ className, ...props }: AuthFormProps) {
  const {
    mutate,
    isLoading,
    isError: isLoginError,
    isSuccess: isLoginSuccess,
  } = useLogin();
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    form.handleSubmit((data: any) => {
      mutate(data);
    })();
  };

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success('Login', {
        description: 'Successful',
      });
    }
  }, [isLoginSuccess]);

  useEffect(() => {
    if (isLoginError) {
      toast.error('Login Error', { description: 'Error' });
    }
  }, [isLoginError]);

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form className="grid gap-6" onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <Input
                  autoFocus
                  error={!!errors.email}
                  {...field}
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading || isLoginSuccess}
            type="submit"
            size="lg"
            className="w-full"
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </form>
      </Form>
    </div>
  );
}
