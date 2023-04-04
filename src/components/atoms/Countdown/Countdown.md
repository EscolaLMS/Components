```js
import { addMinutes } from 'date-fns';

const targetDate = addMinutes(new Date(), 2);

const onCountdownEnd = () => console.log('countdown ended!');

<Countdown targetDate={targetDate} onCountdownEnd={onCountdownEnd} />;
```
