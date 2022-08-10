import { InfiniteScroll } from "../three";

export default {
  title: "three/InfiniteScroll",
  component: InfiniteScroll,
};

const Template = (args) => <InfiniteScroll {...args} />;

export const Infinite = Template.bind({});
Infinite.args = {};
