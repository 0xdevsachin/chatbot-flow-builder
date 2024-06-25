import styled from "@emotion/styled";

export const HeaderContainer = styled.div`
  height: 50px;
  background: var(--color-gray);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 10px;
  border-bottom: solid 1px var(--color-shadow);
  position: relative;
`;

export const SaveButton = styled.button`
  width: fit-content;
  border-radius: 6px;
  padding: 0 10px;
  border: solid 1px var(--color-primary);
  height: 35px;
  color: var(--color-primary);
  background: #fff;
  font-weight: 700;
  cursor: pointer;
`;

export const ErrorContainer = styled.div<{ status?: string }>`
  height: 50px;
  min-width: 150px;
  position: absolute;
  top: 30px;
  left: 50%;
  border-radius: 6px;
  padding: 0 10px;
  background: ${(props) => (props.status === "error" ? "red" : "green")};
  color: #fff;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
`;
