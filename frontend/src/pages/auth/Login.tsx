import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, registerSchema, type LoginFormData, type RegisterFormData } from '../../schemas/auth.schema';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/auth.service';
import { useGoogleLogin } from '@react-oauth/google';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname;

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: '', lastName: '', organizationName: '', email: '', password: '', phone: '' },
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setGlobalError('');
    try {
      const response = await authService.login({ email: data.email, password: data.password });
      const { user, token, organization } = response.data;
      login(token, user, organization as any);
      toast.success(`Welcome back, ${user.firstName}!`);

      // Role-based redirect
      if (from) {
        navigate(from, { replace: true });
      } else if (user.role === 'superadmin') {
        navigate('/superadmin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (err: any) {
      setGlobalError(err.message || 'An error occurred during authentication');
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setGlobalError('');
    try {
      const response = await authService.register(data);
      const { user, token, organization } = response.data;
      login(token, user, organization as any);
      toast.success('Account created successfully!');
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      setGlobalError(err.message || 'An error occurred during registration');
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const triggerGoogleOAuth = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      setLoading(true);
      setGlobalError('');
      try {
        const response = await authService.googleLogin(codeResponse.code);
        const { user, token, organization } = response.data;
        login(token, user, organization as any);
        toast.success(`Welcome back, ${user.firstName}!`);

        if (from) {
          navigate(from, { replace: true });
        } else if (user.role === 'superadmin') {
          navigate('/superadmin', { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
      } catch (err: any) {
        setGlobalError(err.message || 'An error occurred during Google authentication');
        toast.error(err.message || 'Google Login failed');
      } finally {
        setLoading(false);
      }
    },
    onError: () => toast.error('Google Sign-In failed'),
  });

  const handleGoogleLogin = () => {
    triggerGoogleOAuth();
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background text-foreground transition-colors duration-200">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-20 -top-20 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-[480px] p-4">
        <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] md:p-10">
          
          <div className="mb-6 rounded-full bg-primary/10 p-3">
            <div className="h-10 w-10 text-primary">
              <svg className="h-full w-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
              </svg>
            </div>
          </div>

          <h1 className="mb-3 text-2xl font-bold tracking-tight text-foreground">Welcome to NYDev</h1>
          <p className="mb-8 max-w-[320px] text-base leading-relaxed text-muted-foreground">
            Sign in to create and manage smart registration forms securely.
          </p>

          <button onClick={handleGoogleLogin} type="button" className="group flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-border bg-background px-6 text-[15px] font-medium text-foreground shadow-sm transition-all duration-200 hover:bg-muted hover:shadow-md">
            <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            <span>Sign in with Google</span>
          </button>

          <div className="relative my-8 w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with Email</span>
            </div>
          </div>

          <form 
            onSubmit={isLoginMode ? loginForm.handleSubmit(onLoginSubmit) : registerForm.handleSubmit(onRegisterSubmit)} 
            className="w-full flex flex-col gap-4 text-left"
          >
            {!isLoginMode && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">First Name</label>
                    <input
                      {...registerForm.register('firstName')}
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Jane"
                    />
                    {registerForm.formState.errors.firstName && <span className="text-xs text-destructive">{registerForm.formState.errors.firstName.message}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">Last Name</label>
                    <input
                      {...registerForm.register('lastName')}
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Doe"
                    />
                    {registerForm.formState.errors.lastName && <span className="text-xs text-destructive">{registerForm.formState.errors.lastName.message}</span>}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">Organization Name</label>
                    <input
                      {...registerForm.register('organizationName')}
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="My Company (Optional)"
                    />
                    {registerForm.formState.errors.organizationName && <span className="text-xs text-destructive">{registerForm.formState.errors.organizationName.message}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">Phone Number</label>
                    <input
                      {...registerForm.register('phone')}
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="+1 (555) 000-0000"
                    />
                    {registerForm.formState.errors.phone && <span className="text-xs text-destructive">{registerForm.formState.errors.phone.message}</span>}
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                {...(isLoginMode ? loginForm.register('email') : registerForm.register('email'))}
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="m@example.com"
              />
              {isLoginMode 
                ? loginForm.formState.errors.email && <span className="text-xs text-destructive">{loginForm.formState.errors.email.message}</span>
                : registerForm.formState.errors.email && <span className="text-xs text-destructive">{registerForm.formState.errors.email.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...(isLoginMode ? loginForm.register('password') : registerForm.register('password'))}
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {isLoginMode 
                ? loginForm.formState.errors.password && <span className="text-xs text-destructive">{loginForm.formState.errors.password.message}</span>
                : registerForm.formState.errors.password && <span className="text-xs text-destructive">{registerForm.formState.errors.password.message}</span>}
            </div>

            {globalError && <div className="text-sm text-destructive font-medium">{globalError}</div>}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? 'Please wait...' : isLoginMode ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-4 flex w-full items-center justify-between text-sm">
            <button
              type="button"
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setGlobalError('');
                loginForm.reset();
                registerForm.reset();
              }}
              className="text-primary hover:underline cursor-pointer"
            >
              {isLoginMode ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              Back home
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" />
            <span>Encrypted & Secure</span>
          </div>
        </div>

        <footer className="mt-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-6">
            <a className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="#">Privacy Policy</a>
            <a className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="#">Terms of Service</a>
          </div>
          <p className="text-xs text-muted-foreground/60">© {new Date().getFullYear()} NYDev. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
