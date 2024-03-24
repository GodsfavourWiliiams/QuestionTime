import { AuthForm } from './AuthForm';

export default function AuthenticationPage() {
  return (
    <>
      <div className="w-full max-w-sm mx-auto h-screen flex-col items-center justify-center flex px-4 lg:px-0">
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
    </>
  );
}
