import { storyblokEditable } from "@storyblok/react";

const Teaser = ({ blok }) => {
  return (
    <div className="py-8 mb-6" {...storyblokEditable(blok)} key={blok._uid}>
      <h1 className="text-5xl font-bold text-center"> {blok.headline} </h1>
    </div>
  );
};

export default Teaser;
