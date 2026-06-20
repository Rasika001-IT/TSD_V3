"use client";
const logo = "/assets/images/logo.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f9f6ef] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-black/5 p-8">

        <div className="flex justify-center mb-8">
          <img
            src={logo}
            alt="The Success Digest"
            className="h-14 object-contain"
          />
        </div>

        {children}

      </div>
    </div>
  );
};

export default AuthLayout;