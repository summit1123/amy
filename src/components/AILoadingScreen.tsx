import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(1.1); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const dots = keyframes`
  0%, 20% { color: rgba(246, 201, 69, 0.4); }
  40% { color: rgba(246, 201, 69, 1); }
  100% { color: rgba(246, 201, 69, 0.4); }
`;

const Container = styled.div`
  background: linear-gradient(135deg, #FFF9DE 0%, #F6F3E7 50%, #FFEAA7 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 30% 20%, rgba(246, 201, 69, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(246, 201, 69, 0.05) 0%, transparent 50%);
    animation: ${pulse} 4s ease-in-out infinite;
    pointer-events: none;
  }
`;

const LoadingContent = styled.div<{ isCompleting?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  animation: ${props => props.isCompleting ? fadeOut : fadeIn} 0.8s ease-out;
  z-index: 1;
  position: relative;
`;

const AIAvatar = styled.div`
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #F6C945 0%, #FFE082 50%, #F6C945 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2s ease-in-out infinite;
  box-shadow: 0 16px 60px rgba(246, 201, 69, 0.5),
              0 0 0 8px rgba(255, 255, 255, 0.2),
              0 0 0 16px rgba(246, 201, 69, 0.1);
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 60%);
    border-radius: 50%;
    pointer-events: none;
  }
`;

const AvatarImage = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoadingText = styled.div`
  text-align: center;
  max-width: 600px;
`;

const MainText = styled.h1`
  color: #333;
  font-family: "Pretendard Variable-Bold", Helvetica;
  font-size: 42px;
  font-weight: 700;
  margin: 0 0 20px 0;
  line-height: 1.2;
`;

const SubText = styled.p`
  color: #666;
  font-family: "Pretendard Variable-Medium", Helvetica;
  font-size: 22px;
  font-weight: 500;
  margin: 0;
  line-height: 1.4;
`;

const ProgressBar = styled.div`
  width: 400px;
  height: 14px;
  background: rgba(246, 201, 69, 0.15);
  border-radius: 25px;
  overflow: hidden;
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1),
              0 4px 16px rgba(246, 201, 69, 0.2);
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, #F6C945 0%, #FFE082 50%, #F6C945 100%);
  border-radius: 25px;
  width: ${props => props.progress}%;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%);
    border-radius: 25px;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const Dot = styled.span<{ delay: number }>`
  width: 12px;
  height: 12px;
  background: #F6C945;
  border-radius: 50%;
  display: inline-block;
  animation: ${dots} 1.4s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  box-shadow: 0 2px 8px rgba(246, 201, 69, 0.3);
`;

interface AILoadingScreenProps {
  onComplete: () => void;
}

export default function AILoadingScreen({ onComplete }: AILoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

  const messages = [
    {
      main: "AI 아미가 상황을 분석하고 있어요",
      sub: "친구들 간의 상호작용을 이해하고 있습니다"
    },
    {
      main: "감정 상태를 파악하는 중이에요",
      sub: "아이의 기분과 행동 패턴을 분석합니다"
    },
    {
      main: "최적의 대화 방법을 준비하고 있어요",
      sub: "개인 맞춤형 상호작용을 설계합니다"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsCompleting(true);
          setTimeout(onComplete, 800); // 페이드 아웃 애니메이션 시간
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(messageTimer);
  }, []);

  return (
    <Container>
      <LoadingContent isCompleting={isCompleting}>
        <AIAvatar>
          <AvatarImage src="/assets/image-18-2.png" alt="아미" />
        </AIAvatar>
        
        <LoadingText>
          <MainText>{messages[currentMessage].main}</MainText>
          <SubText>{messages[currentMessage].sub}</SubText>
        </LoadingText>

        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>

        <DotsContainer>
          <Dot delay={0} />
          <Dot delay={0.2} />
          <Dot delay={0.4} />
        </DotsContainer>
      </LoadingContent>
    </Container>
  );
}