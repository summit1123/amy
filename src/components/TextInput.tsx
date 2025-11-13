import { useState } from 'react';
import styled from 'styled-components';

const TextInputContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #FFF9DE;
  padding: 40px;
  box-sizing: border-box;
  overflow-y: auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  max-width: 800px;
  margin: 0 auto;
`;

const InputSection = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const QuestionCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
`;

const QuestionTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
  font-weight: 600;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 15px;
  border: 2px solid #E5E5E7;
  border-radius: 10px;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #007AFF;
  }
  
  &::placeholder {
    color: #999;
  }
`;

const CharacterCount = styled.div`
  text-align: right;
  margin-top: 8px;
  font-size: 14px;
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  gap: 20px;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 15px 30px;
  font-size: 16px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  
  ${props => props.primary ? `
    background: #007AFF;
    color: white;
    &:hover {
      background: #0056CC;
    }
  ` : `
    background: transparent;
    color: #007AFF;
    border: 2px solid #007AFF;
    &:hover {
      background: #007AFF;
      color: white;
    }
  `}
`;

interface TextInputProps {
  onNext: () => void;
  onPrevious: () => void;
}

const questions = [
  {
    id: 1,
    title: "아이의 일상생활에서 가장 어려워하는 부분이 있다면 구체적으로 설명해 주세요.",
    placeholder: "예: 숙제를 할 때 집중하지 못하고 자주 딴짓을 합니다. 특히 수학 문제를 풀 때 계산 실수가 많아서 같은 문제를 여러 번 풀어야 합니다..."
  },
  {
    id: 2,
    title: "학교나 교육 기관에서 선생님께 들은 이야기가 있다면 알려주세요.",
    placeholder: "예: 담임선생님께서 수업 시간에 집중력이 부족하다고 하셨습니다. 특히 설명을 들을 때 다른 곳을 보거나 멍하니 있는 경우가 많다고 하셨어요..."
  },
  {
    id: 3,
    title: "아이만의 특별한 장점이나 잘하는 것들을 알려주세요.",
    placeholder: "예: 그림 그리기를 매우 좋아하고 창의적입니다. 또한 다른 친구들을 잘 도와주는 착한 마음을 가지고 있어요..."
  },
  {
    id: 4,
    title: "평소 아이의 행동이나 학습 패턴에서 궁금하거나 걱정되는 점이 있다면 자유롭게 적어주세요.",
    placeholder: "예: 같은 설명을 여러 번 해줘도 금방 잊어버리는 것 같아요. 이것이 정상적인 발달 과정인지, 아니면 특별한 도움이 필요한 건지 궁금합니다..."
  }
];

export default function TextInput({ onNext, onPrevious }: TextInputProps) {
  const [responses, setResponses] = useState<string[]>(
    new Array(questions.length).fill('')
  );

  const handleTextChange = (index: number, value: string) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const filledCount = responses.filter(response => response.trim().length > 0).length;
  const totalCharCount = responses.reduce((sum, response) => sum + response.length, 0);

  return (
    <TextInputContainer>
      <Header>
        <Title>아이 상태 상세 입력</Title>
        <Subtitle>
          아이의 현재 상태와 특성에 대해 자세히 알려주세요.<br/>
          입력해주신 정보는 더 정확한 분석과 맞춤형 콘텐츠 제공에 활용됩니다.
        </Subtitle>
      </Header>
      
      <InputSection>
        {questions.map((question, index) => (
          <QuestionCard key={question.id}>
            <QuestionTitle>{question.id}. {question.title}</QuestionTitle>
            <TextArea
              placeholder={question.placeholder}
              value={responses[index]}
              onChange={(e) => handleTextChange(index, e.target.value)}
            />
            <CharacterCount>
              {responses[index].length} 자
            </CharacterCount>
          </QuestionCard>
        ))}
      </InputSection>

      <ButtonContainer>
        <Button onClick={onPrevious}>이전</Button>
        <Button primary onClick={onNext}>
          다음 단계 ({filledCount}/{questions.length}개 작성됨, 총 {totalCharCount}자)
        </Button>
      </ButtonContainer>
    </TextInputContainer>
  );
}