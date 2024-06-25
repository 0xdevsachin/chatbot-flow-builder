import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import { ErrorContainer, HeaderContainer, SaveButton } from "./header.style";
import ConditionalWrapper from "../conditional-wrapper";

const Header = () => {
  const { allNodesConnected } = useGlobalContext();
  const [showError, setShowError] = useState(false);
  const handleClick = () => {
    if (!allNodesConnected) {
      setShowError(true);
      return;
    }
    alert("Saved successfully");
  };
  useEffect(() => {
    if (allNodesConnected) setShowError(false);
  }, [allNodesConnected]);
  return (
    <HeaderContainer>
      <ConditionalWrapper showChild={showError}>
        <ErrorContainer>Can't save flow</ErrorContainer>
      </ConditionalWrapper>
      <SaveButton onClick={handleClick}>Save Changes</SaveButton>
    </HeaderContainer>
  );
};

export default Header;
