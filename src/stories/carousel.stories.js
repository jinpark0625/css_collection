import { VariableSizeCarousel } from "../components";

export default {
  title: "Component/Carousel",
  component: VariableSizeCarousel,
};

const Template = ({ ...args }) => <VariableSizeCarousel />;

export const VariableSize = Template.bind({});
VariableSize.args = {};
