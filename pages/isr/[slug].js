import Layout from "../../components/Layout";

import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";

export default function Home({ story }) {
  story = useStoryblokState(story);

  return (
    <Layout method="Incremental Static Regeneration">
      <StoryblokComponent blok={story.content} />
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: "home" } }],
    fallback: "blocking",
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
    revalidate: 10,
  };
}
