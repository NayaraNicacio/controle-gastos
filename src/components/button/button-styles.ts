import styled from "styled-components";

export const ButtonCotacao = styled.button<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  

  p {
    margin: 0;
  }

  small {
    display: block;
    margin-top: 5px;
    font-size: 12px;
  }
`;
