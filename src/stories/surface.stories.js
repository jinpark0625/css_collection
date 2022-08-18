import { SurfaceSampling } from "../three";

export default {
  title: "three/SurfaceSampling",
  component: SurfaceSampling,
};

const Template = (args) => <SurfaceSampling {...args} />;

export const SamplePoint = Template.bind({});
SamplePoint.args = {
  type: "point",
};

export const SampleLine = Template.bind({});
SampleLine.args = {
  type: "line",
};
