import { useState } from 'react';
import styled from 'styled-components';
import { Upload as UploadIcon } from 'lucide-react';

interface UploadProps {
  onSkip: () => void;
}

const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  background-color: #fff9de;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  box-sizing: border-box;
  gap: 40px;
`;

const MainCard = styled.div`
  background-color: #ffffff;
  border-radius: 60px;
  box-shadow: 10px 2px 30px rgba(0, 0, 0, 0.05), -10px 2px 30px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 90%;
  max-width: 900px;
  min-height: 60vh;
  overflow: hidden;
  padding: 60px 80px;
  position: relative;
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
  margin-bottom: 20px;
`;

const MainTitle = styled.div`
  background: linear-gradient(
    90deg,
    rgba(246, 201, 70, 1) 0%,
    rgba(174, 206, 135, 1) 49%,
    rgba(115, 211, 191, 1) 97%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: "Pretendard Variable-Bold", Helvetica;
  font-size: 42px;
  font-weight: 700;
  letter-spacing: -0.40px;
  line-height: 60px;
  text-align: center;
  margin-bottom: 10px;
`;

const SubTitle = styled.p`
  color: #767676;
  font-family: "Pretendard Variable-SemiBold", Helvetica;
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -0.26px;
  line-height: 40px;
  text-align: center;
  margin: 0;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
  text-align: center;
`;

const ContentTitle = styled.p`
  color: #2ccff8;
  font-family: "Pretendard Variable-SemiBold", Helvetica;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.26px;
  line-height: 40px;
  margin: 0;
  text-align: center;
  white-space: nowrap;
`;

const ContentDescription = styled.p`
  color: #767676;
  font-family: "Pretendard Variable-Medium", Helvetica;
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -0.22px;
  line-height: 34px;
  margin: 0;
  text-align: center;
  white-space: nowrap;
`;

const UploadSection = styled.div`
  background-color: #f3f3f3;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 350px;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  min-height: 300px;

  &:hover {
    background-color: #ebebeb;
  }
`;

const UploadIconContainer = styled.div`
  width: 75px;
  height: 75px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 75px;
    height: 75px;
    color: #999;
  }
`;

const UploadButton = styled.div`
  background-color: #f6c945;
  border-radius: 20px;
  height: 54px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const UploadButtonText = styled.div`
  color: #ffffff;
  font-family: "Pretendard Variable-SemiBold", Helvetica;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.26px;
  line-height: 36px;
  text-align: center;
`;

const UploadNote = styled.p`
  color: #767676;
  font-family: "Pretendard Variable-Medium", Helvetica;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.22px;
  line-height: 30px;
  text-align: center;
  margin: 0;
`;

const SkipButton = styled.div`
  color: #acacac;
  font-family: "Pretendard Variable-SemiBold", Helvetica;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.26px;
  line-height: 36px;
  cursor: pointer;
  transition: color 0.2s ease;
  position: absolute;
  top: 20px;
  right: 20px;

  &:hover {
    color: #888;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

export default function Upload({ onSkip }: UploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      console.log('Selected file:', file.name);
    }
  };

  const handleFileAreaClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    }
  };

  return (
    <Container>
      <SkipButton onClick={onSkip}>건너뛰기</SkipButton>
      
      <HeaderSection>
        <MainTitle>아미와 함께하는 첫 걸음</MainTitle>
        <SubTitle>아이의 성장 여정을 함께하기 위해, 아미에게 첫 단서를 알려주세요 🌱</SubTitle>
      </HeaderSection>

      <MainCard>
        <ContentSection>
          <ContentTitle>검사 결과가 있다면 알려주세요! 아미가 아이를 더 잘 이해할 수 있어요</ContentTitle>
          <ContentDescription>
            웩슬러 지능검사 (K-WISC), 아동행동평가척도(K-CBCL), 언어발달 검사, 사회성숙도검사 등
          </ContentDescription>
        </ContentSection>

        <UploadSection
          onClick={handleFileAreaClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            backgroundColor: isDragging ? '#e8e8e8' : selectedFile ? '#e8f5e8' : '#f3f3f3'
          }}
        >
          {selectedFile ? (
            <>
              <UploadIconContainer>
                📄
              </UploadIconContainer>
              <UploadButton>
                <UploadButtonText>{selectedFile.name}</UploadButtonText>
              </UploadButton>
              <UploadNote>파일이 선택되었습니다!</UploadNote>
            </>
          ) : (
            <>
              <UploadIconContainer>
                <UploadIcon size={75} />
              </UploadIconContainer>
              <UploadButton>
                <UploadButtonText>파일 선택하기</UploadButtonText>
              </UploadButton>
              <UploadNote>현재는 pdf 형식의 검사 결과만 업로드할 수 있어요</UploadNote>
            </>
          )}
        </UploadSection>
      </MainCard>

      <HiddenFileInput
        id="fileInput"
        type="file"
        accept="application/pdf"
        onChange={handleFileSelect}
      />
    </Container>
  );
}