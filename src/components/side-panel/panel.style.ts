import styled from "@emotion/styled";

export const PanelContainer = styled.div`
  padding: 20px 10px;
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
  align-items: flex-start;
  border-left: solid 1px var(--color-shadow);

  & input,
  textarea {
    border: solid 1px var(--color-primary);
    border-radius: 5px;
    outline: none;
    padding-left: 15px;
    width: 90%;
  }

  & svg {
    cursor: pointer;
  }
`;

export const NodeBox = styled.div`
  border: solid 1px var(--color-primary);
  min-height: 50px;
  border-radius: 4px;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  padding: 10px;
  flex-direction: column;
  cursor: grab;
`;

export const NodeHeadingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const NodeSelectContainer = styled.select`
  height: 30px;
  border: solid 1px var(--color-primary);
  border-radius: 5px;
  text-align: center;
  width: 100px;
`;

export const AddNodeButton = styled.button`
  border: solid 1px var(--color-primary);
  color: var(--color-primary);
  outline: none;
  height: 30px;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 800;
  width: 100%;
`;

export const NodeInput = styled.input`
  height: 30px;
`;

export const NodeTextAreaInput = styled.textarea`
  padding-top: 10px;
`;
