export default function AuthLayout({ children,title }: { children: React.ReactNode,title?:string }) {
    return (
      <div className="flex items-center justify-center min-h-screen  bg-gray-50 px-4 sm:px-6">
        <div className="w-full max-w-md lg:max-w-lg bg-white shadow-lg rounded-2xl p-6">
        {title && <h4 className="text-2xl text-center mb-4 font-semibold text-primary">{title}</h4>}
          {children}
        </div>
      </div>
    );
  }
  