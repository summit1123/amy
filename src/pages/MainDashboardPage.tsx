import styled from 'styled-components';
import MainDashboard from '../components/MainDashboard';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  height: auto;
  background-color: #FFF9DE;
  overflow-y: auto;
  position: relative;
`;

export default function MainDashboardPage() {
  return (
    <Container>
      <MainDashboard />
    </Container>
  );
}