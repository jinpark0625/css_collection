import { Accordion } from "../components";

export default {
  title: "Components/Accordian",
  component: Accordion,
};

const Template = (args) => <Accordion {...args} />;

export const OpenOne = Template.bind({});
OpenOne.args = {
  selected: "openOne",
  label: "Click Me",
  headerColor: "#212b36",
  contentColor: "#212b36",
  headerBackgroundColor: "#fff",
  contentBackgroundColor: "#F5F5F5",
  size: "md",
};

export const MultipleOne = Template.bind({});
MultipleOne.args = {
  selected: "multipleOne",
  label: "Click Me",
  headerColor: "#212b36",
  contentColor: "#212b36",
  headerBackgroundColor: "#fff",
  contentBackgroundColor: "#F5F5F5",
  size: "md",
};
