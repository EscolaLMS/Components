`ResponsiveImage` is component that should be used to display all images in Wellms app,

Is is connected to [Images](https://github.com/EscolaLMS/Images) backend. 

Below is default generation of the image. 

```js
import Image from '@escolalms/sdk/lib/react/components/Image';
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";

<EscolaLMSContextProvider apiUrl="https://api-stage.escolalms.com/">
    <div style={{width:"100%"}}>
        <ResponsiveImage 
            path={"course/7/topic/737/image/I43KisiNXzAoZNyx7q9ddfHcdVXaC6fYTfrElUW9.jpg"}
            srcSizes={[500, 750, 1000]}
        />
    </div>
</EscolaLMSContextProvider>
```

You should pass image url prefix if CDN is used 


```js
import Image from '@escolalms/sdk/lib/react/components/Image';
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";

<EscolaLMSContextProvider apiUrl="https://api.sa.etd24.pl" imagePrefix="https://startup-academy-stage.s3.eu-central-1.amazonaws.com">
    <div style={{width:"100%"}}>
        <ResponsiveImage 
            path={"course/55/images/depression-at-work-1.jpg"}
            srcSizes={[500, 750, 1000]}
        />
    </div>
</EscolaLMSContextProvider>
```