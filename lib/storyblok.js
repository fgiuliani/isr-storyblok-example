import StoryblokClient from "storyblok-js-client";

const Storyblok = new StoryblokClient({
  accessToken: "ACCESS-TOKEN",
  cache: {
    clear: "auto",
    type: "memory",
  },
});

export default Storyblok;
