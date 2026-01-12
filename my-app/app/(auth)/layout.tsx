import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Open blog for chat and discussions',
  icons: { icon: '/logo.svg' },
};

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <nav>authnav</nav>
      {children}
    </div>
  );
};

export default AuthLayout;
