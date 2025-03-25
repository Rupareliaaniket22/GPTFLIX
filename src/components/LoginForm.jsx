import React, { useState } from 'react';
import Input from './Input';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { Link } from 'react-router-dom';
import { FormValidation } from '../utils/FormValidation';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const LoginForm = () => {
  const [signUpClicked, setSignUpClicked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleFormSubmit = async () => {
    setErrorMessage('');
    setLoading(true);

    const validationError = FormValidation(email, password);
    if (validationError) {
      setErrorMessage(validationError);
      setLoading(false);
      return;
    }

    try {
      if (signUpClicked) {
        // User Registration (Sign-Up)
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Update Display Name
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        });

        // Manually update Redux store
        dispatch(
          addUser({
            uid: user.uid,
            displayName: `${firstName} ${lastName}`,
            email: user.email,
          })
        );
      } else {
        // User Login (Sign-In)
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setErrorMessage('Email already registered. Try logging in instead.');
          break;
        case 'auth/invalid-email':
          setErrorMessage('Invalid email format. Please enter a valid email.');
          break;
        case 'auth/wrong-password':
          setErrorMessage('Invalid email or password. Please try again.');
          break;
        case 'auth/user-not-found':
          setErrorMessage(
            'No account found with this email. Please sign up first.'
          );
          break;
        case 'auth/user-disabled':
          setErrorMessage('This account has been disabled.');
          break;
        case 'auth/weak-password':
          setErrorMessage('Password should be at least 6 characters.');
          break;
        case 'auth/network-request-failed':
          setErrorMessage(
            'Network error. Please check your connection and try again.'
          );
          break;
        case 'auth/too-many-requests':
          setErrorMessage('Too many failed login attempts. Try again later.');
          break;
        case 'auth/invalid-credential':
          setErrorMessage('User Not found or Invalid credential.');
          break;
        default:
          setErrorMessage('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="h-screen sm:h-auto sm:bg-opacity-75 overflow-scroll p-5 
               rounded-md border-1 sm:h-4/12 sm:p-8 bg-black absolute 
               sm:top-[20%] pt-[25%] mx-auto right-0 left-0 sm:w-6/12 
               sm:max-w-md text-white w-screen sm:w-auto  landscape:top-[20%]"
    >
      <div className="flex relative w-full landscape:h-[50%] flex-col items-center">
        <h1 className="text-4xl landscape:text-3xl font-bold mt-2 w-[90%]">
          {signUpClicked ? 'Sign Up' : 'Sign In'}
        </h1>
        {signUpClicked && (
          <>
            <Input
              type="text"
              name="First Name"
              inputText={firstName}
              setInputText={setFirstName}
            />
            <Input
              type="text"
              name="Last Name"
              inputText={lastName}
              setInputText={setLastName}
            />
          </>
        )}
        <Input
          type="email"
          name="Email"
          inputText={email}
          setInputText={setEmail}
        />
        <Input
          type="password"
          name={signUpClicked ? 'Create Password' : 'Password'}
          inputText={password}
          setInputText={setPassword}
        />
        <p className="w-[90%] mt-3 text-red-600 text-sm">{errorMessage}</p>
        <button
          onClick={handleFormSubmit}
          className={`p-3 w-[90%] font-medium bg-red-600 rounded-md mt-5 ${
            loading && 'opacity-50 cursor-not-allowed'
          }`}
          disabled={loading}
        >
          {loading ? 'Loading...' : signUpClicked ? 'Sign Up' : 'Sign In'}
        </button>
        <Link to="/forgetpassword" className="mt-5">
          <span className="font-light">Forgot your password?</span>
        </Link>
        <div className="w-[90%] mt-5">
          <span className="text-gray-300 font-light">
            {signUpClicked ? 'Already Registered?' : 'New to Netflix?'}
          </span>
          <span
            className="cursor-pointer hover:underline font-medium text-white"
            onClick={() => setSignUpClicked(!signUpClicked)}
          >
            {signUpClicked ? 'Sign in now.' : 'Sign up now.'}
          </span>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
