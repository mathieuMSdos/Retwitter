// layoutProtected.tsx

import BackGround from "@/src/components/design/BackGround";

const layoutProtected = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className=" relative min-h-screen w-full">
      <BackGround/>
      <h1>Protected layout</h1>
      <div>{children}</div>
    </main>
  );
};

export default layoutProtected;