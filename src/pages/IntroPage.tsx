import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #FFF9DE;
  transition: opacity 0.5s ease-in-out;
  position: relative;
`;

const IntroImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;

export default function IntroPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/upload');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container>
      <IntroImage src="/intro.png" alt="Amy Avatar Intro" />
    </Container>
  );
}