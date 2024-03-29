```js
import ThemeTester from "../../../styleguide/ThemeTester";
import { Text } from "../../atoms/Typography/Text";
import { MarkdownRenderer } from "../../molecules/MarkdownRenderer/MarkdownRenderer";
import img1 from "./CartCard.png";
import { useState } from "react";

const ClockIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: 8 }}
    >
      <path
        d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM10 4C10.5523 4 11 4.44772 11 5V9.58579L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L9.29289 10.7071C9.10536 10.5196 9 10.2652 9 10V5C9 4.44772 9.44771 4 10 4Z"
        fill="currentColor"
      />
    </svg>
  );
};

const [loading, setLoading] = useState(false);

const Subtitle = () => {
  return (
    <Text
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "no-wrap",
        gap: 4,
      }}
      size={"14"}
      noMargin
    >
      <ClockIcon />
      <MarkdownRenderer components={{ p: React.Fragment }}>
        **8h 12 min** time left
      </MarkdownRenderer>
    </Text>
  );
};

const Description = () => {
  return (
    <Text style={{ fontSize: 12, margin: 0 }}>
      Guaranteed 30 days for return
    </Text>
  );
};

const cartCardProps = {
  title: "37,99 zł",
  subtitle: <Subtitle />,
  onBuyClick: (id) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    console.log("cardId ", id);
  },
  description: <Description />,
  discount: {
    onDiscountClick: (discountValue) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      console.log("Discount input value ", discountValue);
    },

    onDeleteDiscountClick: (id) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      console.log("On delete discount hendler, cardId is ", id);
    },
    isDiscountGranted: false,
  },
  loading,
};

const cartCardContainerStyle = {
  maxWidth: 300,
  marginBottom: 20,
};

<>
  <ThemeTester childrenListStyle={{ display: "block" }}>
    <div style={cartCardContainerStyle}>
      <CartCard id={1} {...cartCardProps} />
    </div>
    <div style={cartCardContainerStyle}>
      <CartCard
        id={2}
        {...cartCardProps}
        discount={{
          ...cartCardProps.discount,
          status: "error",
          isOpen: true,
        }}
      />
    </div>
    <div style={cartCardContainerStyle}>
      <CartCard
        id={3}
        {...cartCardProps}
        title="29,99 zł"
        discount={{
          ...cartCardProps.discount,
          status: "granted",
          isOpen: true,
        }}
      />
    </div>
    <div style={{ width: 375 }}>
      <CartCard
        mobile
        id={4}
        {...cartCardProps}
        title="29,99 zł"
        discount={{
          ...cartCardProps.discount,
          status: "granted",
          isOpen: true,
        }}
      />
    </div>
  </ThemeTester>
</>;
```
