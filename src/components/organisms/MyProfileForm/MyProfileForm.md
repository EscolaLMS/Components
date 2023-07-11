```js
import img1 from "./MyProfile.png";
import { ThemeTester } from "../../../styleguide";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";
import { Text } from "../../../";
import Authbtn from "../../../utils/components/authbtn";

<React.Fragment>
  <EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
    <ThemeTester
      flexDirection="column"
      childrenListStyle={{ display: "block" }}
    >
      <Authbtn />
      <MyProfileForm
        onSuccess={() => console.log("onSuccess")}
        onError={(err) => console.log("onError", err.data)}
        onLoginLink={() => console.log("onLoginLink")}
        return_url="?action=_after_click_from_email"
      />

      <Text>Mobile version</Text>
      <div style={{ maxWidth: "400px" }}>
        <MyProfileForm mobile />
      </div>
    </ThemeTester>
  </EscolaLMSContextProvider>
</React.Fragment>;
```
