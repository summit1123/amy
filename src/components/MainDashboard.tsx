import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AILoadingScreen from "./AILoadingScreen";

const Container = styled.div`
  background-color: #FFF9DE;
  min-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
  position: relative;
  box-sizing: border-box;
  padding: 0 0 140px 0;
  margin: 0;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  
  @media (max-width: 480px) {
    padding: 20px 15px;
    margin-bottom: 15px;
  }
  
  @media (min-width: 768px) {
    padding: 40px 30px;
  }
  
  @media (min-width: 1024px) {
    padding: 50px 40px;
  }
`;

const GreetingCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 31px;
  width: 100%;
  max-width: 417px;
`;

const GreetingText = styled.p`
  background: linear-gradient(
    90deg,
    rgba(246, 201, 70, 1) 0%,
    rgba(174, 206, 135, 1) 49%,
    rgba(115, 211, 191, 1) 97%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-family: "Pretendard Variable-Bold", Helvetica;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.35px;
  line-height: 44.8px;
  text-align: center;
  margin: 0;
`;

const AvatarWrapper = styled.div`
  background-color: #ffffff;
  border: 6px solid transparent;
  border-radius: 32px;
  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25), inset -4px 0px 10px rgba(0, 0, 0, 0.25);
  height: 177px;
  width: 177px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const AvatarImage = styled.img`
  width: 170px;
  height: 170px;
  object-fit: cover;
`;

const SettingsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  margin-left: auto;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    opacity: 0.7;
  }
`;

const MenuIcon = styled.img`
  width: 40px;
  height: 29px;
`;

const SettingsIcon = styled.img`
  width: 40px;
  height: 41px;
`;

const ProgressCard = styled.div`
  background-color: #ffffff;
  border-radius: 32px;
  box-shadow: 10px 2px 30px rgba(0, 0, 0, 0.05), -10px 2px 30px rgba(0, 0, 0, 0.05);
  display: flex;
  height: 120px;
  margin: 0 auto 40px auto;
  width: 100%;
  max-width: 944px;
  overflow: hidden;
  align-items: center;
  padding: 25px;
  gap: 20px;
  box-sizing: border-box;
  
  @media (max-width: 480px) {
    margin: 0 10px 20px 10px;
    height: 100px;
    padding: 20px;
  }
  
  @media (max-width: 1023px) {
    margin: 0 20px 40px 20px;
  }
`;

const AwardWrapper = styled.div`
  background: linear-gradient(
    180deg,
    rgba(244, 201, 72, 1) 0%,
    rgba(153, 208, 155, 1) 52%,
    rgba(199, 242, 246, 1) 96%
  );
  border-radius: 20px;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AwardIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const ProgressInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ProgressTitle = styled.div`
  color: #000000;
  font-family: "Pretendard Variable-SemiBold", Helvetica;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.26px;
  line-height: 36px;
`;

const ProgressText = styled.div`
  font-family: "Pretendard Variable-Medium", Helvetica;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.22px;
  line-height: 30px;
`;

const ProgressNumber = styled.span`
  color: #2CCFF8;
`;

const ProgressGray = styled.span`
  color: #7f7f7f;
`;

const LevelBadge = styled.div`
  color: #2CCFF8;
  font-family: "Pretendard Variable-SemiBold", Helvetica;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.35px;
  line-height: 48px;
  white-space: nowrap;
  align-self: center;
`;

const LevelsGrid = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  box-sizing: border-box;
  
  @media (min-width: 768px) {
    padding: 0 30px;
  }
  
  @media (min-width: 1024px) {
    padding: 0 40px;
  }
`;

const LevelRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  
  @media (max-width: 480px) {
    gap: 15px;
  }
  
  @media (min-width: 768px) {
    gap: 30px;
  }
  
  @media (min-width: 1024px) {
    gap: 36px;
  }
`;

const LevelCard = styled.div<{ clickable?: boolean }>`
  background-color: #ffffff;
  border-radius: 32px;
  box-shadow: 10px 2px 30px rgba(0, 0, 0, 0.05), -10px 2px 30px rgba(0, 0, 0, 0.05);
  height: 211px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: ${props => props.clickable ? 'scale(1.02)' : 'none'};
    box-shadow: ${props => props.clickable ? '15px 4px 40px rgba(0, 0, 0, 0.1)' : '10px 2px 30px rgba(0, 0, 0, 0.05)'};
  }
`;

const LevelBadgeSmall = styled.div`
  background-color: #FFF9DE;
  border-radius: 100px;
  color: #F6C945;
  font-family: "Pretendard Variable-Medium", Helvetica;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.22px;
  line-height: 30px;
  padding: 3px 10px;
  position: absolute;
  top: 20px;
  left: 30px;
  width: fit-content;
`;

const LocationImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  position: absolute;
  top: 22px;
  right: 20px;
  
  @media (min-width: 768px) {
    width: 140px;
    height: 140px;
  }
  
  @media (min-width: 1024px) {
    width: 183px;
    height: 183px;
    right: 30px;
  }
`;

const LocationName = styled.div`
  font-family: "Pretendard Variable-SemiBold", Helvetica;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.35px;
  line-height: 48px;
  position: absolute;
  bottom: 30px;
  left: 30px;
`;

const CreateThemeCard = styled.div`
  background-color: #EFFDFF;
  border-radius: 32px;
  box-shadow: 10px 2px 30px rgba(0, 0, 0, 0.05), -10px 2px 30px rgba(0, 0, 0, 0.05);
  height: 279px;
  margin: 60px auto 40px auto;
  width: 100%;
  max-width: 944px;
  overflow: hidden;
  position: relative;
  padding: 34px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  
  @media (max-width: 1023px) {
    margin: 60px 20px 40px 20px;
  }
`;

const CreateButton = styled.button`
  background-color: #F6C945;
  border-radius: 28px;
  border: none;
  color: #ffffff;
  font-family: "Pretendard Variable-SemiBold", Helvetica;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.35px;
  line-height: 48px;
  padding: 16px 28px;
  cursor: pointer;
  width: fit-content;
  
  &:hover {
    opacity: 0.9;
  }
`;

const CreateText = styled.p`
  color: #000000;
  font-family: "Pretendard Variable-SemiBold", Helvetica;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.35px;
  line-height: 48px;
  margin: 0;
  max-width: 355px;
`;

const CreateImage = styled.img`
  width: 228px;
  height: 228px;
  position: absolute;
  top: 23px;
  right: 31px;
  object-fit: cover;
`;

const BottomNav = styled.div`
  background-color: #ffffff;
  border-radius: 100px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 26px;
  height: 86px;
  width: 319px;
  padding: 9px 36px;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`;

const NavIcon = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.7;
  }
`;

const HomeButton = styled.div`
  background-color: rgba(246, 201, 69, 0.27);
  border-radius: 100px;
  width: 95px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const HomeIcon = styled.img`
  width: 50px;
  height: 50px;
`;

export default function MainDashboard() {
  const navigate = useNavigate();
  
  const locations = [
    { name: "놀이터", progress: "8/10", color: "#73D3BF", image: "/assets/image-42.png", clickable: false },
    { name: "도서관", progress: "5/12", color: "#868686", image: "/assets/image-41.png", clickable: false },
    { name: "마트", progress: "8/10", color: "#3060F1", image: "/assets/image-38.png", clickable: false },
    { name: "축구장", progress: "5/12", color: "#AECE87", image: "/assets/image-37.png", clickable: true },
    { name: "미술관", progress: "8/10", color: "#E85134", image: "/assets/image-35.png", clickable: false },
    { name: "학교", progress: "5/12", color: "#2398BB", image: "/assets/image-36.png", clickable: false }
  ];

  const [showLoading, setShowLoading] = useState(false);

  const handleLocationClick = (location: any) => {
    if (location.name === "축구장") {
      setShowLoading(true);
    }
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
    navigate("/scenario");
  };

  if (showLoading) {
    return <AILoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <Container>
      <TopSection>
        <GreetingCard>
          <GreetingText>
            안녕 민준아! <br />
            오늘도 멋지게 시작해볼까? 🌱
          </GreetingText>
          <AvatarWrapper>
            <AvatarImage src="/assets/image-29.png" alt="Avatar" />
          </AvatarWrapper>
        </GreetingCard>
      </TopSection>

      <ProgressCard>
        <AwardWrapper>
          <AwardIcon src="/assets/award.svg" alt="Award" />
        </AwardWrapper>
        <ProgressInfo>
          <ProgressTitle>나의 성장 기록</ProgressTitle>
          <ProgressText>
            <ProgressGray>완료한 미션 </ProgressGray>
            <ProgressNumber>3개</ProgressNumber>
            <ProgressGray> / 전체 25개</ProgressGray>
          </ProgressText>
        </ProgressInfo>
        <LevelBadge>레벨 1</LevelBadge>
      </ProgressCard>

      <LevelsGrid>
        {[0, 2, 4].map((startIndex) => (
          <LevelRow key={startIndex}>
            {locations.slice(startIndex, startIndex + 2).map((location, index) => (
              <LevelCard 
                key={location.name}
                clickable={location.clickable}
                onClick={() => handleLocationClick(location)}
              >
                <LevelBadgeSmall>{location.progress}</LevelBadgeSmall>
                <LocationImage src={location.image} alt={location.name} />
                <LocationName style={{ color: location.color }}>
                  {location.name}
                </LocationName>
              </LevelCard>
            ))}
          </LevelRow>
        ))}
      </LevelsGrid>

      <CreateThemeCard>
        <CreateButton>테마 직접 만들어보기</CreateButton>
        <CreateText>짜잔! 아미가 새로운 모험을 만들 준비 됐어!</CreateText>
        <CreateImage src="/assets/image-44.png" alt="Amy Character" />
      </CreateThemeCard>

      <BottomNav>
        <NavIcon src="/assets/message-align-right.svg" alt="Messages" />
        <HomeButton>
          <HomeIcon src="/assets/home.svg" alt="Home" />
        </HomeButton>
        <NavIcon src="/assets/palette.svg" alt="Palette" />
      </BottomNav>
    </Container>
  );
}