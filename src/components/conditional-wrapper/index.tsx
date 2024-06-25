import { ReactNode } from "react";

const ConditionalWrapper = ({
  children,
  showChild,
}: {
  children: ReactNode;
  showChild: boolean;
}) => {
  if (showChild) return <>{children}</>;
  return null;
};

export default ConditionalWrapper;
