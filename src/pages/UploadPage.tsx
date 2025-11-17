import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Upload from '../components/Upload';

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

export default function UploadPage() {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate('/checklist');
  };

  return (
    <Container>
      <Upload onSkip={handleSkip} />
    </Container>
  );
}