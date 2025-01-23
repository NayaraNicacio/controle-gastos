import styled from "styled-components";

// Navbar
export const StyledNavbar = styled.nav`
  background-color: #8b008b;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Roboto", sans-serif;
  font-size: 1rem; /* Fonte harmonizada */

  a {
    list-style-type: none;
    color: inherit;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-bottom: 3px solid transparent;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 1rem; /* Harmonizado com a navbar */
    margin: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// ProfileContainer e UserName
export const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px; /* Aumentando o espaço para tornar mais espaçado */
`;

export const UserName = styled.p`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  background-color: #d1b3ff;
  border-radius: 5px;
  padding: 6px 10px; /* Ajustando o padding para tornar o texto mais legível */
  color: black;
  text-align: left;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 0.875rem; /* Tamanho harmonizado da fonte */

  ${ProfileContainer}:hover & {
    opacity: 1;
  }
`;

// UserImage
interface UserImageProps {
  src?: string | null | undefined;
}

export const UserImage = styled.img<UserImageProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-right: 16px; /* Ajustando o espaçamento entre a imagem e o nome */
`;

// Buttons
export const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1rem; /* Fonte harmonizada */
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  
  &:hover {
    color: #d8bfd8;
  }
`;

export const LogintButton = styled.button`
  background-color: #d1b3ff;
  padding: 10px 16px; /* Ajustando o padding para um botão mais equilibrado */
  border-radius: 16px;
  color: #4b204b;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  
  &:hover {
    color: #d02090;
  }
`;

// CardsContainer
export const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem; /* Aumentando o espaçamento entre os cards */
  margin-bottom: 2rem;
  flex-wrap: wrap;
  font-family: "Roboto", sans-serif;
  font-size: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// Card
interface CardProps {
  bgColor: string;
}

export const Card = styled.div<CardProps>`
  background-color: ${(props) => props.bgColor || "#fff"};
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 240px;
  text-align: center;
  margin: 1rem;
  height: 100px; /* Ajustando a altura para ser mais equilibrada */
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  font-weight: 400;

  p {
    margin: 5px 0;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    min-width: 180px;
    height: auto;
  }
`;

