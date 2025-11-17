import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import IntroPage from './pages/IntroPage';
import UploadPage from './pages/UploadPage';
import ChecklistPage from './pages/ChecklistPage';
import AvatarGenerationPage from './pages/AvatarGenerationPage';
import MainDashboardPage from './pages/MainDashboardPage';
import ScenarioPage from './pages/ScenarioPage';

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;

function App() {
  return (
    <AppWrapper className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/intro" replace />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/checklist" element={<ChecklistPage />} />
          <Route path="/avatar" element={<AvatarGenerationPage />} />
          <Route path="/dashboard" element={<MainDashboardPage />} />
          <Route path="/scenario" element={<ScenarioPage />} />
        </Routes>
      </Router>
    </AppWrapper>
  );
}

export default App;
