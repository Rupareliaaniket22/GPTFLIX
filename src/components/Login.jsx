import React from 'react';
import Header from './Header';
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://assets.nflxext.com/ffe/siteui/vlv3/f268d374-734d-474f-ad13-af5ba87ef9fc/web/IN-en-20250210-TRIFECTA-perspective_92338d5d-6ccd-4b1a-8536-eb2b0240a55e_large.jpg')",
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/35"></div>

      {/* Scrollable Content */}
      <div className="relative z-10 flex flex-col min-h-screen  overflow-auto">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
