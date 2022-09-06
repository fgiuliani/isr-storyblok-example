import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

const Page = ({ blok }) => (
  <main className="px-6" {...storyblokEditable(blok)}>
    {blok.body.map((blok) => (
      <StoryblokComponent blok={blok} key={blok._uid} />
    ))}
  </main>
);

export default Page;
