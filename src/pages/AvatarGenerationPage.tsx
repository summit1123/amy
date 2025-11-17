import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AvatarGeneration from '../components/AvatarGeneration';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #FFF9DE;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 0;
  box-sizing: border-box;
`;

export default function AvatarGenerationPage() {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/dashboard');
  };

  return (
    <Container>
      <AvatarGeneration onComplete={handleComplete} />
    </Container>
  );
}