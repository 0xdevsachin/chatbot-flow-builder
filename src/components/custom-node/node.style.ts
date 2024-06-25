import styled from "@emotion/styled";

export const NodeContainer = styled.div<{ isSelected?: boolean }>`
  min-height: 70px;
  min-width: 200px;
  max-width: 300px;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0 30px var(--color-shadow);
  text-align: left;
  font-size: 0.7rem;
  ${(props) => props.isSelected && "border: solid 1px var(--color-primary)"}
`;

export const NodeTopContainer = styled.div`
  background: var(--color-gray);
  height: 15px;
  font-weight: 600;
  text-align: left;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NodeContentContainer = styled.div`
  padding: 5px 10px;
`;
