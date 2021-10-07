import { useEffect, useState } from "react";
import Storyblok from "../lib/storyblok";

export default function useStoryblok(originalStory) {
  let [story, setStory] = useState(originalStory);

  // adds the events for updating the visual editor
  function initEventListeners() {
    const { StoryblokBridge } = window;
    if (typeof StoryblokBridge !== "undefined") {
      // initialize the bridge with your token
      const storyblokInstance = new StoryblokBridge();

      // reload on Next.js page on save or publish event in the Visual Editor
      storyblokInstance.on(["change", "published"], () =>
        location.reload(true)
      );

      // live update the story on input events
      storyblokInstance.on("input", (event) => {
        if (event.story._uid === story._uid) {
          setStory(event.story);
        }
      });

      // live update the story on enter editor
      storyblokInstance.on("enterEditmode", (event) => {
        Storyblok.get(`cdn/stories/${event.storyId}`, {
          version: "draft",
        })
          .then(({ data }) => {
            if (data.story) {
              setStory(data.story);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }

  // appends the bridge script tag to our document
  function addBridge(callback) {
    // check if the script is already present
    const existingScript = document.getElementById("storyblokBridge");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "//app.storyblok.com/f/storyblok-v2-latest.js";
      script.id = "storyblokBridge";
      document.body.appendChild(script);
      script.onload = () => {
        // once the scrip is loaded, init the event listeners
        callback();
      };
    } else {
      callback();
    }
  }

  useEffect(() => {
    // first load the bridge, then initialize the event listeners
    addBridge(initEventListeners);
  }, []);

  return story;
}
