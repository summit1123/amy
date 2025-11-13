import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Checklist from './components/Checklist';
import TextInput from './components/TextInput';
import Upload from './components/Upload';

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


function App() {
  const [currentPage, setCurrentPage] = useState('intro');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (currentPage === 'intro') {
      const timer = setTimeout(() => {
        setCurrentPage('upload');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [currentPage]);


  const handleSkip = () => {
    setCurrentPage('checklist');
  };

  const handleNextFromChecklist = () => {
    setCurrentPage('textinput');
  };

  const handleNextFromTextInput = () => {
    setCurrentPage('avatar');
  };

  const handlePreviousFromTextInput = () => {
    setCurrentPage('checklist');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'intro':
        return <IntroImage src="/intro.png" alt="Amy Avatar Intro" />;
      case 'upload':
        return <Upload onSkip={handleSkip} />;
      case 'checklist':
        return <Checklist onNext={handleNextFromChecklist} />;
      case 'textinput':
        return <TextInput onNext={handleNextFromTextInput} onPrevious={handlePreviousFromTextInput} />;
      case 'avatar':
        return <IntroImage src="/frame23.png" alt="Avatar Screen" />;
      default:
        return <IntroImage src="/intro.png" alt="Amy Avatar Intro" />;
    }
  };

  return (
    <Container className="App">
      {renderPage()}
    </Container>
  );
}

export default App;
