```js
import img1 from "./MyProfile.png";
import { ImageModal, ThemeTester } from "../../../styleguide";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";
import { Text } from "../../../";
import Authbtn from "../../../utils/components/authbtn";

const MobileProfileForm = () => (
  <div style={{ maxWidth: "400px" }}>
    <MyProfileForm mobile />
  </div>
);

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
      <MobileProfileForm />
    </ThemeTester>
  </EscolaLMSContextProvider>

  <ImageModal images={[img1]} />
</React.Fragment>;
```
