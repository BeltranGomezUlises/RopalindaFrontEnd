import styled from 'styled-components';

export const HeadingContainer = styled.header`
  height: 110px;
  position: fixed;
  width: 100%;
  top: 0;
  background: white;
  z-index: 999;
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 8px 24px;
  height: 59px;
`;

export const OptionsSection = styled.nav`
  height: 51px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MainImageContainer = styled.div`
  
`;

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const MainContainer = styled.div`
  min-height: 100vh;
`;

export const CardsContainer = styled.div`
  padding: 24px 60px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;
