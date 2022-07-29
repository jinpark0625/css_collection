import { Carousel } from "../components";

export default {
  title: "Components/Carousel",
  component: Carousel,
};

const Template = ({ ...args }) => <Carousel {...args} />;

export const VariableSize = Template.bind({});
VariableSize.args = {
  type: "variable",
  auto: false,
  arrow: false,
  pagination: false,
};

export const Grid = Template.bind({});
Grid.args = {
  type: "grid",
  auto: false,
  arrow: false,
  pagination: false,
};
