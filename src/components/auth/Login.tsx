import Link from 'next/link';
import { AuthForm } from './AuthForm';

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Question Time
              </h1>
              <p className="text-sm text-muted-foreground">
                Access your QuestionTime account.
              </p>
            </div>
            <AuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
