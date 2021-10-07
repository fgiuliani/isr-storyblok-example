import Layout from "../../components/Layout";
import Page from "../../components/Page";
import Storyblok from "../../lib/storyblok";
import useStoryblok from "../../lib/storyblok-hook";

export default function Ssr(props) {
  const story = useStoryblok(props.story);

  return (
    <Layout>
      <Page content={story.content} />
    </Layout>
  );
}

export async function getServerSideProps() {
  let slug = "home";

  let sbParams = {
    version: "draft",
  };

  let { data } = await Storyblok.get(`cdn/stories/${slug}`, sbParams);

  return {
    props: {
      story: data ? data.story : false,
    },
  };
}
