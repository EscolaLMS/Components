```js
import { ThemeTester } from "../../../styleguide";

const markdown = {
  text: `### Czego się dowiesz i nauczysz?

* Kurs umożliwia nabycie solidnych podstaw z zakresu rachunkowości zarówno pod względem teoretycznym jak i praktycznym
* Kurs podstawy księgowości przygotowuje słuchacza do pracy w działach księgowości * Kurs przygotowuje do zawodu księgowy, który został ujęty w klasyfikacji zawodów (kod zawodu 331301)

### Mark

==Sed pretium turpis sapien, eu imperdiet purus fermentum eu. Nunc erat lectus, viverra ac nibh nec==

### Code

<code>Ut ut lectus quis urna porttitor lacinia. Vestibulum ac aliquam mi. Vestibulum suscipit tincidunt risus eu viverra. Mauris commodo euismod nisl, at dapibus elit tempor quis.</code>

### Blockquote

> Suspendisse non ex eget lacus aliquam hendrerit id sed mauris. Pellentesque eget purus sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

### Tasklist

* [ ] Sed ullamcorper, odio id cursus imperdiet, diam velit iaculis magna, non placerat dui odio et nisl. Morbi eget gravida enim. Cras luctus eleifend porttitor. Donec nec lacus eu risus malesuada venenatis. Duis placerat posuere quam at placerat. Integer interdum enim ac sem imperdiet sodales.
* [x] Sed ullamcorper, odio id cursus imperdiet, diam velit iaculis magna, non placerat dui odio et nisl. Morbi eget gravida enim. Cras luctus eleifend porttitor. Donec nec lacus eu risus malesuada venenatis. Duis placerat posuere quam at placerat. Integer interdum enim ac sem imperdiet sodales.

### Ordered List

1. Item 1
2. Item 2
3. Item 3

### Unordered List

- Item 1
- Item 2
- Item 3

### Image

![](https://placekitten.com/g/600/600 \"left-50\")\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam libero mauris, laoreet vel elit nec, maximus commodo nulla. Curabitur blandit nisl id enim congue, bibendum molestie est fringilla. Curabitur vehicula tortor sed eros posuere eleifend. Sed id enim a dui dictum bibendum eu in diam. Praesent vulputate semper lorem, vel vestibulum leo aliquam a. Integer fermentum massa sit amet sem vestibulum, efficitur suscipit lacus tempor. Curabitur eu dignissim elit.\r\n\r\nSed pretium turpis sapien, eu imperdiet purus fermentum eu. Nunc erat lectus, viverra ac nibh nec, dignissim consequat neque. Cras lacinia sodales augue tempus rutrum. Praesent nec metus venenatis, tincidunt nunc eleifend, molestie turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque imperdiet elit et risus viverra imperdiet. Nunc ut iaculis augue. Praesent dapibus vehicula metus at maximus.\r\n\r\n ![](https://placekitten.com/g/600/600 \"right-50\")\r\n\r\nUt ut lectus quis urna porttitor lacinia. Vestibulum ac aliquam mi. Vestibulum suscipit tincidunt risus eu viverra. Mauris commodo euismod nisl, at dapibus elit tempor quis. Phasellus sit amet cursus lacus, hendrerit tempus augue. Suspendisse a libero risus. Nam hendrerit metus nisi, laoreet sagittis leo ullamcorper non. Etiam eget nibh convallis, finibus tellus ac, porttitor lacus. Ut at augue et magna pretium aliquet quis in leo. Donec malesuada lectus nibh, vel consequat purus cursus eu. Nunc nec scelerisque metus, vitae varius nibh. Nullam imperdiet tellus et interdum iaculis. Proin tristique quam faucibus dolor tincidunt, in fringilla mauris facilisis.\r\n\r\n ![](https://placekitten.com/g/600/600)\r\n\r\nSuspendisse non ex eget lacus aliquam hendrerit id sed mauris. Pellentesque eget purus sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer laoreet elementum lacus, gravida iaculis dolor dictum non. Praesent id sapien sed libero vulputate tempus. Vestibulum faucibus ante vel arcu blandit euismod. Integer auctor sem eget scelerisque commodo. Duis tempor, lectus et viverra condimentum, ante tellus maximus quam, eu suscipit risus tortor a dui. In fermentum metus sed mi eleifend sagittis.\r\n\r\n\\\r\n\\\r\n

# Header 1

Alternative Header 1
================

## Header 2

### Header 3

#### Header 4

##### Header 5

#### Do kogo skierowane jest szkolenie?

* Dla pracowników działu księgowości
* Dla osób które swoją karierę zawodową chcą związać z pracą w księgowości
* Dla osób pracujących w działach IT wdrażających systemy księgowe`,
  table: `
| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |`,
  image: `![alt text](https://placekitten.com/g/600/600)`,
  link: `My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").`,
  mathInline: "$c = \\pm\\sqrt{a^2 + b^2}$",
  mathBlock: `Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following
equation.

$$
L = \\frac{1}{2} \\rho v^2 S C_L
$$`,
  mathMatrix: `$$
M = 
\\begin{bmatrix}
\\frac{5}{6} & \\frac{1}{6} & 0 \\\\\[0.3em]
\\frac{5}{6} & 0 & \\frac{1}{6} \\\\\[0.3em]
0 & \\frac{5}{6} & \\frac{1}{6}
\\end{bmatrix}
$$`,
};

<ThemeTester flexDirection={"column"} alignItems={"start"}>
  {Object.entries(markdown).map(([key, markdownContent]) => (
    <MarkdownRenderer key={key}>{markdownContent}</MarkdownRenderer>
  ))}
</ThemeTester>;
```
