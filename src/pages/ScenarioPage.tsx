import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import AILoadingScreen from '../components/AILoadingScreen';

const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(30px) scale(0.95); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
`;

const imageSlide = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const successPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Container = styled.div`
  background-color: #FFF9DE;
  min-height: 100vh;
  width: 100%;
  position: relative;
  padding: 40px 50px 140px 50px;
  
  @media (max-width: 480px) {
    padding: 20px 15px 120px 15px;
    gap: 20px;
  }
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 30px;
  animation: ${fadeIn} 0.8s ease-out;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 0.7;
  }
`;

const BackIcon = styled.div`
  width: 40px;
  height: 40px;
  color: #999;
  font-size: 40px;
  line-height: 1;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 0.7;
  }
`;

const MenuIcon = styled.div`
  width: 35px;
  height: 25px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  
  &::before,
  &::after {
    content: '';
    width: 35px;
    height: 4px;
    background-color: #999;
    border-radius: 2px;
  }
  
  & > div {
    width: 35px;
    height: 4px;
    background-color: #999;
    border-radius: 2px;
  }
`;

const TitleCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 25px 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
`;

const SoccerBall = styled.div`
  width: 70px;
  height: 70px;
  font-size: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h1`
  color: #000;
  font-family: "Pretendard Variable-Bold", Helvetica;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
`;

const Subtitle = styled.p`
  color: #666;
  font-family: "Pretendard Variable-Medium", Helvetica;
  font-size: 20px;
  font-weight: 400;
  margin: 0;
`;

const ScenarioImage = styled.div`
  background: white;
  border-radius: 25px;
  width: 100%;
  height: 500px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const PlaygroundImage = styled.img<{ isTransitioning?: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: ${props => props.isTransitioning ? imageSlide : 'none'} 0.8s ease-out;
`;

const PageIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 10px 0;
`;

const IndicatorDot = styled.div<{ active?: boolean }>`
  background-color: ${props => props.active ? '#F6C945' : '#E0E0E0'};
  border-radius: 50%;
  width: ${props => props.active ? '12px' : '8px'};
  height: ${props => props.active ? '12px' : '8px'};
  transition: all 0.3s ease;
`;

const MicrophoneSection = styled.div`
  background: white;
  border-radius: 25px;
  padding: 40px;
  
  @media (max-width: 480px) {
    padding: 25px;
    gap: 20px;
  }
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 20px;
`;

const MicrophoneButton = styled.button<{ isDisabled?: boolean }>`
  width: auto;
  height: auto;
  border: none;
  background: transparent;
  cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  opacity: ${props => props.isDisabled ? 0.5 : 1};
  
  &:hover {
    transform: ${props => props.isDisabled ? 'none' : 'scale(1.05)'};
  }
  
  &:active {
    transform: ${props => props.isDisabled ? 'none' : 'scale(0.95)'};
  }
`;

const MicrophoneImage = styled.img`
  width: 120px;
  height: auto;
  object-fit: contain;
`;

const MicrophonePrompt = styled.div<{ isAITalking?: boolean }>`
  background: ${props => props.isAITalking ? '#F6C945' : '#fffcee'};
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  color: #000;
  font-family: "Pretendard-SemiBold", Helvetica;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  padding: 16px 20px;
  opacity: ${props => props.isAITalking ? 1 : 0.6};
  backdrop-filter: blur(4px) brightness(100%);
  transition: all 0.3s ease;
  
  span.highlight {
    font-weight: 600;
  }
  
  span.normal {
    font-family: "Pretendard-Regular", Helvetica;
    font-weight: 400;
  }
`;

const BottomNavigation = styled.div`
  background-color: #ffffff;
  border-radius: 100px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 26px;
  height: 86px;
  width: 319px;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  padding: 9px 36px;
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

const SuccessPopup = styled.div<{ show: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) ${props => props.show ? 'scale(1)' : 'scale(0)'};
  background: linear-gradient(135deg, #F6C945 0%, #FFE082 100%);
  border-radius: 25px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(246, 201, 69, 0.4);
  z-index: 2000;
  opacity: ${props => props.show ? 1 : 0};
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  text-align: center;
  min-width: 400px;
  
  @media (max-width: 480px) {
    min-width: 300px;
    padding: 30px;
  }
`;

const SuccessTitle = styled.h2`
  color: #333;
  font-family: "Pretendard Variable-Bold", Helvetica;
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 16px 0;
  animation: ${successPulse} 2s ease-in-out infinite;
`;

const SuccessText = styled.p`
  color: #666;
  font-family: "Pretendard Variable-Medium", Helvetica;
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 20px 0;
  line-height: 1.4;
`;

const RewardItem = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 20px;
  margin: 20px 0;
  font-family: "Pretendard Variable-SemiBold", Helvetica;
  font-size: 20px;
  color: #333;
  animation: ${successPulse} 2s ease-in-out infinite 0.5s;
`;

export default function ScenarioPage() {
  const navigate = useNavigate();
  const [currentScene, setCurrentScene] = useState(1);
  const [isImageTransitioning, setIsImageTransitioning] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isAITalking, setIsAITalking] = useState(false);
  const [isChildTalking, setIsChildTalking] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [showAILoading, setShowAILoading] = useState(false);

  // 시나리오 데이터
  const scenarios = {
    1: {
      title: "신나는 놀이터",
      subtitle: "친구가 내 공을 뺏어갔어요. 속상한 기분이에요.",
      image: "/assets/KakaoTalk_Photo_2025-11-16-02-08-25.png",
      prompt: "마이크에 대고 네 생각을 들려줘!",
    },
    2: {
      title: "신나는 놀이터", 
      subtitle: "아미가 네 마음을 이해해요. 함께 해결해봐요!",
      image: "/assets/KakaoTalk_Photo_2025-11-16-02-08-25.png", // Scene 1과 같은 이미지 유지
      prompt: "용기를 내서 '같이 놀자!'라고 말해봐!",
    },
    3: {
      title: "미션 성공!",
      subtitle: "친구와 다시 즐겁게 놀고 있어요!",
      image: "/assets/KakaoTalk_Photo_2025-11-16-02-08-40.png",
      prompt: "정말 잘했어요! 🎉",
    }
  };

  // 음성 재생 함수
  const playAudioFile = (audioPath: string, isChild: boolean = false): Promise<void> => {
    return new Promise((resolve) => {
      // 기존 오디오 정지
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      const audio = new Audio(audioPath);
      setCurrentAudio(audio);
      
      if (isChild) {
        setIsChildTalking(true);
        setIsAITalking(false);
      } else {
        setIsAITalking(true);
        setIsChildTalking(false);
      }

      audio.onended = () => {
        setIsAITalking(false);
        setIsChildTalking(false);
        setCurrentAudio(null);
        resolve();
      };

      audio.onerror = () => {
        console.log(`Audio file not found: ${audioPath}, using timer instead`);
        // 오디오 파일이 없으면 3초 타이머로 대체
        setTimeout(() => {
          setIsAITalking(false);
          setIsChildTalking(false);
          setCurrentAudio(null);
          resolve();
        }, 3000);
      };

      audio.play().catch(() => {
        // 재생 실패 시 타이머로 대체
        setTimeout(() => {
          setIsAITalking(false);
          setIsChildTalking(false);
          setCurrentAudio(null);
          resolve();
        }, 3000);
      });
    });
  };

  // 컴포넌트 마운트 시 step1.mp3 자동 재생
  useEffect(() => {
    const playIntroAudio = async () => {
      // 페이지 로드 후 약간의 딜레이를 주고 음성 재생
      setTimeout(async () => {
        await playAudioFile("/audio/step1.mp3");
      }, 1000); // 1초 후 재생 시작
    };

    playIntroAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  const handleAILoadingComplete = async () => {
    setShowAILoading(false);
    setCurrentScene(3);
    setIsImageTransitioning(true);
    
    setTimeout(async () => {
      setIsImageTransitioning(false);
      
      // 1-2초 대기 후 AI 축하 음성 재생
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsAITalking(true);
      await playAudioFile("/audio/ElevenLabs_2025-11-16T18_39_17_Hana Lee_pvc_sp100_s75_sb75_v3.mp3");
      
      // 성공 팝업 표시
      setShowSuccessPopup(true);
      
      // 4초 후 팝업 자동 닫기
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 4000);
    }, 800);
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleHome = () => {
    navigate('/dashboard');
  };

  if (showAILoading) {
    return <AILoadingScreen onComplete={handleAILoadingComplete} />;
  }

  const handleMicrophone = async () => {
    // AI나 아이가 말하고 있으면 클릭 무시
    if (isAITalking || isChildTalking) return;

    if (currentScene === 1) {
      // Scene 1: 아이 첫 반응 → AI 공감/격려 → Scene 2로 전환
      setIsAITalking(true);
      
      // 1. 2-3초 대기 후 아이 음성 재생 (첫 번째 반응 - 회피)
      await new Promise(resolve => setTimeout(resolve, 2500));
      await playAudioFile("/audio/child_step1.mp3", true);
      
      // 2. 2-3초 대기 후 AI 공감/격려 음성 재생 
      await new Promise(resolve => setTimeout(resolve, 3000));
      await playAudioFile("/audio/step2.mp3");
      
      // 3. Scene 2로 전환 (이미지는 그대로, 내부 상태만 변경)
      setCurrentScene(2);
      
    } else if (currentScene === 2) {
      // Scene 2: 아이가 "같이 놀자!" → AI 로딩 → Scene 3로 전환
      setIsAITalking(true);
      
      // 1. 아이 음성 재생 (두 번째 반응 - 용기)
      await playAudioFile("/audio/child_step2.mp3", true);
      
      // 2. AI 로딩 화면 표시 (새 이미지 생성 중)
      setIsAITalking(false);
      setShowAILoading(true);
      
    } else if (currentScene === 3) {
      // 처음으로 돌아가기
      setCurrentScene(1);
      setIsImageTransitioning(true);
      setTimeout(() => setIsImageTransitioning(false), 400);
    }
  };

  return (
    <Container>
      <TopBar>
        <BackButton onClick={handleBack}>
          <BackIcon>‹</BackIcon>
        </BackButton>
        <MenuButton>
          <MenuIcon>
            <div />
          </MenuIcon>
        </MenuButton>
      </TopBar>

      <TitleCard>
        <SoccerBall>⚽</SoccerBall>
        <TitleInfo>
          <Title>{scenarios[currentScene as keyof typeof scenarios].title}</Title>
          <Subtitle>{scenarios[currentScene as keyof typeof scenarios].subtitle}</Subtitle>
        </TitleInfo>
      </TitleCard>

      <ScenarioImage>
        <PlaygroundImage 
          src={scenarios[currentScene as keyof typeof scenarios].image}
          alt="Playground Scene"
          isTransitioning={isImageTransitioning}
        />
      </ScenarioImage>

      <PageIndicator>
        <IndicatorDot active={currentScene === 1} />
        <IndicatorDot active={currentScene === 2} />
        <IndicatorDot active={currentScene === 3} />
        <IndicatorDot />
      </PageIndicator>

      <MicrophoneSection>
        <MicrophoneButton 
          onClick={handleMicrophone}
          isDisabled={isAITalking || isChildTalking}
        >
          <MicrophoneImage src="/assets/무제 93.png" alt="마이크" />
        </MicrophoneButton>
        <MicrophonePrompt isAITalking={isAITalking || isChildTalking}>
          {isAITalking 
            ? "아미가 얘기하고 있어요!" 
            : isChildTalking
            ? "음성 인식 중이에요!"
            : scenarios[currentScene as keyof typeof scenarios].prompt
          }
        </MicrophonePrompt>
      </MicrophoneSection>

      <BottomNavigation>
        <NavIcon src="/assets/message-align-right.svg" alt="Messages" />
        <HomeButton onClick={handleHome}>
          <HomeIcon src="/assets/home.svg" alt="Home" />
        </HomeButton>
        <NavIcon src="/assets/palette.svg" alt="Palette" />
      </BottomNavigation>

      {/* 성공 팝업 */}
      <SuccessPopup show={showSuccessPopup}>
        <SuccessTitle>🎉 미션 성공! 🎉</SuccessTitle>
        <SuccessText>
          용기를 내서 친구에게 말했더니<br/>
          다시 함께 놀게 되었어요!
        </SuccessText>
        <RewardItem>
          ⚽ 반짝이는 축구 유니폼 획득!
        </RewardItem>
      </SuccessPopup>
    </Container>
  );
}