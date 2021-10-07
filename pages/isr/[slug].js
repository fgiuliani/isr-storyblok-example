import Layout from "../../components/Layout";
import Page from "../../components/Page";
import Storyblok from "../../lib/storyblok";
import useStoryblok from "../../lib/storyblok-hook";

export default function Isr(props) {
  const story = useStoryblok(props.story);

  return (
    <Layout>
      <Page content={story.content} />
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

  let { data } = await Storyblok.get(`cdn/stories/${params.slug}`, sbParams);

  return {
    props: {
      story: data ? data.story : false,
    },
    revalidate: 10,
  };
}
