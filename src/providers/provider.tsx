const Component = ({
  children,
  ...pageProps
}: {
  children: React.ReactNode;
  pageProps: any;
}) => {
  return <>{children}</>;
};

export default Component;
