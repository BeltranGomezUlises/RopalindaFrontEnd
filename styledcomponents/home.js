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
  justify-content: center;
  flex-wrap: wrap;
`;

export const ImageContainer = styled.div`
  height: 290px;
  overflow: hidden;
`;

export const TitleH1 = styled.h1`
  text-align: center;
`;

export const Description = styled.p`
  text-align: center;
  font-size: 18px;
`;

export const FooterPreInfo = styled.div`
  height: 68px;
  background: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: white;
`;

export const FooterLinksSection = styled.footer`
  padding: 28px 38px 18px 38px;
  border-bottom: 1px solid #e9e9e9;
  float: left;
  width: 100%;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  font-size: 11px;
  color: #9b9b9b;
`;

export const LinkSection = styled.div`
  float: left;
  width: calc(100% / 3);
  font-size: 12px;
  line-height: 1.3;
  color: #8e8e8e;
  padding-left: 16px;
`;

export const LinkFooter = styled.div`
  margin-bottom: 16px;
`;

export const LinkF = styled.a`
  color: black;
  cursor: pointer;
  font-size: 12px;
  margin-bottom: 15px;
  line-height: 1.3;
  color: #8e8e8e;
`;

export const LocationInfo = styled.a`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  margin-right: 40px;
  color: white;
  cursor: pointer;
  transition: all 0.25s;

  &:hover {
    color: white;
    opacity: 0.6;
  }
`;
