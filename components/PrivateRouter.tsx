import React from "react";
import { useRouter } from "next/navigation";

const PrivateRouter = <P extends object>(
  OriginalComponent: React.ComponentType<P>
) => {
  const NewComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const [auth, setAuth] = React.useState<boolean>(false);

    React.useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setAuth(true);
      } else {
        router.replace("/login");
      }
    }, [router]);
    return auth ? <OriginalComponent {...(props as P)} /> : null;
  };

  return NewComponent;
};

export default PrivateRouter;
