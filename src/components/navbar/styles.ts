import styled from "styled-components";

export const StyledNavbar = styled.nav`
  background-color: #8b008b;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    list-style-type: none;
    color: inherit;
    text-decoration: none;
    padding: 0.5rem;
    border-bottom: 3px solid transparent;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
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
  padding: 5px;
  color: black;
  text-align: left;

  ${ProfileContainer}:hover & {
    opacity: 1;
  }
`;

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
  margin-right: 20px;
`;

export const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    color: #d8bfd8;
  }
`;

export const LogintButton = styled.button`
  background-color: #d1b3ff;
  padding: 8px;
  border-radius: 16px;
  color: #4b204b;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    color: #d02090;
  }
`;
export const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap; /* Permite que os cards se reorganizem para baixo em telas menores */

  /* Alinhamento de cards na linha */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

interface CardProps {
  bgColor: string;
}

export const Card = styled.div<CardProps>`
  background-color: ${(props) =>
    props.bgColor || "#fff"}; /* Usando interpolação corretamente */
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  text-align: center;
  margin: 1rem;
  height: 80px;
  font-size: 1.2rem;

  p {
    margin: 5px 0;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    min-width: 150px;
    height: auto;
  }
`;