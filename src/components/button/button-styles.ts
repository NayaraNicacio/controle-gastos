import styled from "styled-components";

export const ButtonCotacao = styled.button`
  background-color: rgba(147, 112, 219, 0.5);
  border: none;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(147, 112, 219, 0.7);
  }
`;
