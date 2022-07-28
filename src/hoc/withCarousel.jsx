import React from "react";
import { VariableSizeCarousel, GridCarousel } from "../components";

export default function withCarousel(WrappedComponent) {
  return function withCarousel({ type, ...props }) {
    switch (type) {
      case "variable":
        return <VariableSizeCarousel {...props} />;
      case "grid":
        return <VariableSizeCarousel {...props} />;
      default:
        return <div>Error...</div>;
    }
  };
}
