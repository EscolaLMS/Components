import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import { useContext } from "react";
import { Button, Spin } from "../../../";

const Authbtn = () => {
  const { login, user } = useContext(EscolaLMSContext);
  return (
    <Button
      //loading={user.loading}
      mode="secondary"
      onClick={() => {
        login({ email: "student@escola-lms.com", password: "secret" });
      }}
    >
      {user.loading && <Spin />}
      authorize to see component
    </Button>
  );
};

export default Authbtn;
