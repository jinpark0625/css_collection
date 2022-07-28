import { Carousel } from "../components";

export default {
  title: "Component/Carousel",
  component: Carousel,
};

const Template = ({ ...args }) => <Carousel {...args} />;

export const VariableSize = Template.bind({});
VariableSize.args = {
  type: "variable",
};

export const Grid = Template.bind({});
Grid.args = {
  type: "grid",
};
