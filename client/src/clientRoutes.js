import React from 'react'

const Home = React.lazy(() => import('../src/./pages/Home/home'));
const LoginForm = React.lazy(() => import('../src/./pages/Login/loginForm'));
const SignupForm = React.lazy(() => import('../src/./pages/Signup/signupForm'));
const ForgotPasswordForm = React.lazy(() => import('../src/./pages/Login/forgotPasswordForm'));
const Services = React.lazy(() => import('../src/./pages/Services/services'));
const Booking = React.lazy(() => import('../src/./pages/Booking/booking'));
const Profile = React.lazy(() => import('../src/./pages/Home/profile'));

const clientRoutes = [
  { path: '/', exact: true, name: 'Home', element: Home },
  { path: '/sign-in', name: 'Sign-in', element: LoginForm },
  { path: '/sign-up', name: 'Sign-up', element: SignupForm },
  { path: '/forgotPassword', name: 'ForgotPassword', element: ForgotPasswordForm },
  { path: '/services', name: 'Services', element: Services },
  { path: '/book-now', name: 'Book-now', element: Booking },
  { path: '/profile', name: 'Profile', element: Profile }
]

export default clientRoutes
