import { useGlobalContext } from "../../context";
import { ErrorContainer, HeaderContainer, SaveButton } from "./header.style";
import ConditionalWrapper from "../conditional-wrapper";

const Header = () => {
  const { status, handleSaveClick } = useGlobalContext();
  return (
    <HeaderContainer>
      <ConditionalWrapper
        showChild={status.type === "error" || status.type === "success"}
      >
        <ErrorContainer>{status.message}</ErrorContainer>
      </ConditionalWrapper>
      <SaveButton onClick={handleSaveClick}>Save Changes</SaveButton>
    </HeaderContainer>
  );
};

export default Header;
