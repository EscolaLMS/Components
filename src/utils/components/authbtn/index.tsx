import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import { useContext } from "react";

const Authbtn = () => {
  const { login } = useContext(EscolaLMSContext);
  return (
    <button
      onClick={() => {
        login({ email: "student@escola-lms.com", password: "secret" });
      }}
    >
      authorize to see component
    </button>
  );
};

export default Authbtn;
