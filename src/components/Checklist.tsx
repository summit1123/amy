import { useState } from 'react';
import styled from 'styled-components';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface ChecklistProps {
  onNext: () => void;
}

const surveyItems = [
  { id: 1, text: "단순한 질문에는 대답하지만, 생각해야 하는 질문에는 논리적으로 표현하지 못한다." },
  { id: 2, text: "상대방이 말한 의도를 제대로 파악하지 못한다." },
  { id: 3, text: "말을 할 때 적절한 단어를 떠올리지 못해 머뭇거린다." },
  { id: 4, text: "구체적으로 지시하지 않으면 엉뚱한 행동을 한다." },
  { id: 5, text: "또래보다 어휘력이 부족하다." },
  { id: 6, text: "오늘 배운 내용을 다음날 물어보면 기억하지 못한다." },
  { id: 7, text: "여러 번 반복해도 잘 기억하지 못한다." },
  { id: 8, text: "방금 알려주었는데 돌아서면 잊어버린다." },
  { id: 9, text: "연속적인 순서를 기억하지 못한다." },
  { id: 10, text: "수업 시간에 손을 들지만 물어보면 대답을 잊어버린다." },
  { id: 11, text: "순서가 있는 활동에서 자신의 차례를 잊어버린다." },
  { id: 12, text: "비슷한 글자나 숫자를 읽을 때 자주 혼동한다." },
  { id: 13, text: "상하좌우 등 방향을 혼동한다." },
  { id: 14, text: "비슷하게 발음되는 단어들을 듣고 구별하는 데 어려움이 있다." },
  { id: 15, text: "간단한 그림이나 도형을 보고 그대로 따라 그리기 어려워한다." },
  { id: 16, text: "과제를 할 때 주의가 산만하다." },
  { id: 17, text: "과제를 할 때 주의집중 시간이 짧다." },
  { id: 18, text: "교사의 안내나 지시에 집중하지 못하고 관련 없는 행동을 한다." },
  { id: 19, text: "수업 시간에 과제에 집중하지 못하고 멍하니 앉아 있다." },
  { id: 20, text: "주의집중을 필요로 하는 활동에서 또래보다 쉽게 지친다." },
  { id: 21, text: "또래보다 학습 속도가 느리다." },
  { id: 22, text: "정해진 시간 내에 과제를 미치지 못한다." },
  { id: 23, text: "칠판이나 책에 쓰여 있는 단어나 문장을 노트에 옮겨 적는 데 오래 걸린다." }
];

const questions = [
  surveyItems.slice(0, 5),
  surveyItems.slice(5, 10),
  surveyItems.slice(10, 15),
  surveyItems.slice(15, 20),
  surveyItems.slice(20, 23)
];

const Container = styled.div`
  min-height: 100vh;
  background-color: #FFF9DE;
  padding: 40px;
  box-sizing: border-box;
  overflow-y: auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #E5E7EB;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #2CCFF8;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`;

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 32px;
  margin-bottom: 24px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ProgressTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const ProgressIndicator = styled.div`
  font-size: 14px;
  color: #666;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #E5E7EB;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 32px;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(245, 201, 72, 1) 0%,
    rgba(168, 206, 140, 1) 48%,
    rgba(44, 207, 248, 1) 100%
  );
  border-radius: 4px;
  width: ${props => props.progress}%;
  transition: width 0.5s ease;
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 32px;
`;

const QuestionCard = styled.div`
  padding: 24px;
  background: linear-gradient(to bottom right, #ffffff, #f9fafb);
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
`;

const QuestionNumber = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #F6C945;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
`;

const QuestionText = styled.p`
  color: #000000;
  font-weight: 500;
  line-height: 1.6;
  flex: 1;
`;

const ScoreContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

const ScoreLabel = styled.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`;

const ScoreButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const ScoreButton = styled.button<{ isSelected: boolean; isHovered: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  font-weight: bold;
  color: #7F7F7F;
  background: ${props => props.isSelected 
    ? 'linear-gradient(120deg, #2CCFF880 33.33%, #91CC9E80 66.66%, #F6C94580 100%)' 
    : '#D9D9D9'};
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${props => props.isSelected ? 'scale(1.15)' : 'scale(1)'};

  &:hover {
    transform: ${props => props.isSelected ? 'scale(1.15)' : 'scale(1.1)'};
    background: ${props => props.isSelected 
      ? 'linear-gradient(120deg, #2CCFF880 33.33%, #91CC9E80 66.66%, #F6C94580 100%)' 
      : '#BEBEBE'};
  }

  &:active {
    transform: ${props => props.isSelected ? 'scale(1.1)' : 'scale(1.05)'};
  }
`;

const MemoSection = styled.div`
  margin-bottom: 24px;
`;

const MemoLabel = styled.label`
  display: block;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
`;

const MemoTextarea = styled.textarea`
  width: 100%;
  height: 128px;
  padding: 16px;
  border-radius: 16px;
  border: 2px solid #E5E7EB;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  box-sizing: border-box;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007AFF;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  max-width: 1000px;
  margin: 0 auto;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 16px 32px;
  border-radius: 16px;
  border: none;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  ${props => props.primary ? `
    background: linear-gradient(
      90deg,
      rgba(245, 201, 72, 1) 0%,
      rgba(168, 206, 140, 1) 48%,
      rgba(44, 207, 248, 1) 100%
    );
    color: white;
    flex: 1;
    justify-content: center;
    
    &:hover:not(:disabled) {
      opacity: 0.9;
      transform: scale(1.02);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: #ccc;
    }
  ` : `
    background: white;
    color: #374151;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    
    &:hover {
      background: #F9FAFB;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  `}
`;

export default function Checklist({ onNext }: ChecklistProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [hoveredScore, setHoveredScore] = useState<{[key: number]: number | null}>({});
  const [memo, setMemo] = useState('');

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const currentQuestions = questions[currentPage] || [];
  const allCurrentAnswered = currentQuestions.every(q => answers[q.id] !== undefined);
  const isLastPage = currentPage === questions.length - 1;

  const handleNextPage = () => {
    if (!isLastPage) {
      setCurrentPage(currentPage + 1);
    } else if (memo.trim()) {
      onNext();
    }
  };

  return (
    <Container>
      <ContentCard>
        <Header>
          <Title>아이의 학습·발달 패턴을 알려주세요</Title>
          <Subtitle>
            이 체크리스트는 아이의 학습과 일상 행동에서 나타나는 특징을 파악하기 위한 참고용으로, 진단 목적이 아니예요!<br/>
            아이가 평소 보이는 모습을 바탕으로 편하게 선택해주세요
          </Subtitle>
        </Header>

        <ProgressHeader>
          <ProgressTitle>설문 체크리스트</ProgressTitle>
          <ProgressIndicator>
            {currentPage + 1} / {questions.length}
          </ProgressIndicator>
        </ProgressHeader>

        <ProgressBar>
          <ProgressFill progress={((currentPage + 1) / questions.length) * 100} />
        </ProgressBar>

        <QuestionList>
          {currentQuestions.map((q) => (
            <QuestionCard key={q.id}>
              <QuestionHeader>
                <QuestionNumber>{q.id}</QuestionNumber>
                <QuestionText>{q.text}</QuestionText>
              </QuestionHeader>
              
              <ScoreContainer>
                <ScoreLabel>전혀 아니다</ScoreLabel>
                <ScoreButtons>
                  {[1, 2, 3, 4, 5].map((score) => (
                    <ScoreButton
                      key={score}
                      isSelected={answers[q.id] === score}
                      isHovered={hoveredScore[q.id] === score}
                      onClick={() => handleAnswer(q.id, score)}
                      onMouseEnter={() => setHoveredScore({...hoveredScore, [q.id]: score})}
                      onMouseLeave={() => setHoveredScore({...hoveredScore, [q.id]: null})}
                    >
                      {score}
                    </ScoreButton>
                  ))}
                </ScoreButtons>
                <ScoreLabel>매우 그렇다</ScoreLabel>
              </ScoreContainer>
            </QuestionCard>
          ))}
        </QuestionList>

        {isLastPage && (
          <MemoSection>
            <MemoLabel>우리 아이에 대해 더 알려주세요</MemoLabel>
            <MemoTextarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="아이의 특성, 관심사, 특별히 주의가 필요한 부분 등을 자유롭게 작성해주세요..."
            />
          </MemoSection>
        )}
      </ContentCard>

      <ButtonContainer>
        {currentPage > 0 && (
          <Button onClick={() => setCurrentPage(currentPage - 1)}>
            <ChevronLeft size={20} />
            이전
          </Button>
        )}
        <Button
          primary
          onClick={handleNextPage}
          disabled={!allCurrentAnswered || (isLastPage && !memo.trim())}
        >
          {isLastPage ? '완료하기' : '다음'}
          <ChevronRight size={24} />
        </Button>
      </ButtonContainer>
    </Container>
  );
}