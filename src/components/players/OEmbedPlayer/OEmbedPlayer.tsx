import * as React from "react";
import Embed, { type EmbedProps } from "react-tiny-oembed";
import styled, { withTheme } from "styled-components";
import type { ExtendableStyledComponent } from "types/component";
import { RatioBox } from "../../../";

const PROVIDERS = [
  {
    provider_name: "YouTube",
    provider_url: "https://www.youtube.com/",
    endpoints: [
      {
        schemes: [
          "https://*.youtube.com/watch*",
          "https://*.youtube.com/v/*",
          "https://youtu.be/*",
          "https://*.youtube.com/shorts/*",
          "https://youtube.com/shorts/*",
        ],
        url: "https://www.youtube.com/oembed",
        discovery: true,
      },
    ],
  },
  {
    provider_name: "Reddit",
    provider_url: "https://reddit.com/",
    endpoints: [
      {
        schemes: [
          "https://reddit.com/r/*/comments/*/*",
          "https://www.reddit.com/r/*/comments/*/*",
        ],
        url: "https://www.reddit.com/oembed",
      },
    ],
  },
  {
    provider_name: "Flickr",
    provider_url: "https://www.flickr.com/",
    endpoints: [
      {
        schemes: [
          "http://*.flickr.com/photos/*",
          "http://flic.kr/p/*",
          "https://*.flickr.com/photos/*",
          "https://flic.kr/p/*",
        ],
        url: "https://www.flickr.com/services/oembed/",
        discovery: true,
      },
    ],
  },
  {
    provider_name: "Vimeo",
    provider_url: "https://vimeo.com/",
    endpoints: [
      {
        schemes: [
          "https://vimeo.com/*",
          "https://vimeo.com/album/*/video/*",
          "https://vimeo.com/channels/*/*",
          "https://vimeo.com/groups/*/videos/*",
          "https://vimeo.com/ondemand/*/*",
          "https://player.vimeo.com/video/*",
        ],
        url: "https://vimeo.com/api/oembed.{format}",
        discovery: true,
      },
    ],
  },
  {
    provider_name: "SoundCloud",
    provider_url: "http://soundcloud.com/",
    endpoints: [
      {
        schemes: [
          "http://soundcloud.com/*",
          "https://soundcloud.com/*",
          "https://soundcloud.app.goog.gl/*",
        ],
        url: "https://soundcloud.com/oembed",
      },
    ],
  },
  {
    provider_name: "Twitter",
    provider_url: "http://www.twitter.com/",
    endpoints: [
      {
        schemes: [
          "https://twitter.com/*/status/*",
          "https://*.twitter.com/*/status/*",
          "https://twitter.com/*/moments/*",
          "https://*.twitter.com/*/moments/*",
        ],
        url: "https://publish.twitter.com/oembed",
      },
    ],
  },
  {
    provider_name: "GIPHY",
    provider_url: "https://giphy.com",
    endpoints: [
      {
        schemes: [
          "https://giphy.com/gifs/*",
          "http://gph.is/*",
          "https://media.giphy.com/media/*/giphy.gif",
        ],
        url: "https://giphy.com/services/oembed",
        discovery: true,
      },
    ],
  },
];

export interface OEmbedPlayerProps
  extends Omit<EmbedProps, "providers">,
    ExtendableStyledComponent {
  ratio?: number;
}

const StyledOEmbedPlayer = styled("div")`
  width: 100%;

  iframe {
    width: 100%;
    height: 100%;
  }

  .__embed {
    width: 100%;
    max-width: 100%;
  }

  .__embed_column {
    display: block;
    height: 100%;
  }
`;

export const OEmbedPlayer: React.FC<OEmbedPlayerProps> = (props) => {
  const { ratio = 9 / 16, className = "" } = props;

  return (
    <StyledOEmbedPlayer className={`wellms-component ${className}`}>
      <RatioBox ratio={ratio}>
        <Embed {...props} providers={PROVIDERS} />
      </RatioBox>
    </StyledOEmbedPlayer>
  );
};

export default withTheme(styled(OEmbedPlayer)<OEmbedPlayerProps>``);
