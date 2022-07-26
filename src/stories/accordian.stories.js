import Accordian from "../components/accordian";

export default {
  title: "Components/Accordian",
  component: Accordian,
};

const Template = (args) => <Accordian {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  label: "Click Me",
  headerColor: "#212b36",
  contentColor: "#212b36",
  headerBackgroundColor: "#fff",
  contentBackgroundColor: "#F5F5F5",
  size: "md",
};
