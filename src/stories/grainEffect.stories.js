import { GrainEffect } from "../three";

export default {
  title: "three/GrainEffect",
  component: GrainEffect,
};

const Template = (args) => <GrainEffect {...args} />;

export const Noise = Template.bind({});
Noise.args = {};
