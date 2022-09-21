```js
import { ThemeTester } from "../../../styleguide";
import { Row, Col } from "react-grid-system";

<React.Fragment>
  <ThemeTester>
    <div style={{ width: "100%" }}>
      <Row>
        <Col xs={12} md={12}>
          <OEmbedPlayer url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
        </Col>
      </Row>
    </div>
    <div style={{ width: 375 }}>
      <Row>
        <Col xs={12} md={12}>
          <OEmbedPlayer
            url="https://www.youtube.com/watch?v=E8gmARGvPlI"
            ratio={1}
          />
        </Col>
      </Row>
    </div>
  </ThemeTester>
</React.Fragment>;
```
