```js
import { ImageModal, ThemeTester } from "../../../styleguide";
import { Link } from "../../../";
const DownloadIcon = () => (
  <svg
    width="16"
    height="20"
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 0C8.55228 0 9 0.447715 9 1V11.5858L11.2929 9.29289C11.6834 8.90237 12.3166 8.90237 12.7071 9.29289C13.0976 9.68342 13.0976 10.3166 12.7071 10.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071L3.29289 10.7071C2.90237 10.3166 2.90237 9.68342 3.29289 9.29289C3.68342 8.90237 4.31658 8.90237 4.70711 9.29289L7 11.5858V1C7 0.447715 7.44772 0 8 0ZM1 15C1.55228 15 2 15.4477 2 16V18H14V16C14 15.4477 14.4477 15 15 15C15.5523 15 16 15.4477 16 16V18C16 19.1046 15.1046 20 14 20H2C0.895431 20 0 19.1046 0 18V16C0 15.4477 0.447715 15 1 15Z"
      fill="#4A4A4A"
    />
  </svg>
);

const Download2Icon = () => (
  <svg
    width="16"
    height="20"
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.29289 0.292893C7.68342 -0.0976311 8.31658 -0.0976311 8.70711 0.292893L11.7071 3.29289C12.0976 3.68342 12.0976 4.31658 11.7071 4.70711C11.3166 5.09763 10.6834 5.09763 10.2929 4.70711L9 3.41421V13C9 13.5523 8.55228 14 8 14C7.44772 14 7 13.5523 7 13V3.41421L5.70711 4.70711C5.31658 5.09763 4.68342 5.09763 4.29289 4.70711C3.90237 4.31658 3.90237 3.68342 4.29289 3.29289L7.29289 0.292893ZM0 9C0 7.89543 0.895431 7 2 7H4C4.55228 7 5 7.44772 5 8C5 8.55228 4.55228 9 4 9H2V18H14V9H12C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7H14C15.1046 7 16 7.89543 16 9V18C16 19.1046 15.1046 20 14 20H2C0.895431 20 0 19.1046 0 18V9Z"
      fill="#4A4A4A"
    />
  </svg>
);

<React.Fragment>
  <ThemeTester>
    <NoteAction
      title={"Note without color"}
      subtitle="luty 2018"
      actions={
        <React.Fragment>
          <Link>
            <DownloadIcon /> (.pdf)
          </Link>{" "}
          <Link>
            <Download2Icon />
          </Link>
        </React.Fragment>
      }
    />
    <NoteAction title={"Note with color"} actions={"action"} color={"red"} />
    <NoteAction
      subtitle="luty 2018"
      title={
        "Note with color and long text t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
      }
      actions={"15:20"}
      color={"#09c3bc"}
    />
  </ThemeTester>
</React.Fragment>;
```
