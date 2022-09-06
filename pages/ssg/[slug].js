import Layout from "../../components/Layout";

import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";

export default function Home({ story }) {
  story = useStoryblokState(story);

  return (
    <div>
      <Layout>
        <StoryblokComponent blok={story.content} />
      </Layout>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: "home" } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let sbParams = {
    version: "draft",
  };

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${params.slug}`, sbParams);

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
  };
}
