import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #FFF9DE;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  overflow-y: auto;
`;

const Title = styled.h1`
  color: #2CCFF8;
  font-family: "Pretendard Variable-Bold", Helvetica;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin: 20px 0;
`;

const AvatarCard = styled.div`
  background: white;
  border-radius: 40px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const AvatarPreview = styled.div`
  background: linear-gradient(135deg, #FFF9DE 0%, #F0F8FF 100%);
  border-radius: 30px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 380px;
  width: 100%;
  margin-bottom: 5px;
  overflow: hidden;
  position: relative;
`;

const FullAvatarImage = styled.img`
  width: 320px !important;
  height: 400px !important;
  max-width: none !important;
  max-height: none !important;
  object-fit: cover;
  object-position: center;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
  z-index: 1;
  border-radius: 15px;
`;

const SelectionSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: -10px;
`;

const AvatarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
  width: 100%;
  max-width: 600px;
  justify-items: center;
  margin: 20px auto 0 auto;
  justify-self: center;
`;

const AvatarOption = styled.div<{ isSelected: boolean }>`
  width: 140px;
  height: 170px;
  border-radius: 20px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: ${props => props.isSelected ? '4px solid #F6C945' : '2px solid #E0E0E0'};
  padding: 4px;
  
  &:hover {
    transform: scale(1.05);
    border-color: ${props => props.isSelected ? '#F6C945' : '#F6C945'};
    box-shadow: 0 4px 12px rgba(246, 201, 69, 0.3);
  }
`;

const AvatarImage = styled.img`
  width: 132px;
  height: 162px;
  object-fit: cover;
  border-radius: 15px;
  background: transparent;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 0px;
  height: 48px;
  width: auto;
  margin-left: auto;
  margin-right: auto;
`;

const CategoryButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;
  position: relative;
  
  &:hover {
    opacity: 0.7;
  }
`;

const PolygonIcon = styled.img<{ direction: 'left' | 'right' }>`
  width: 16px;
  height: 18px;
  transform: ${props => props.direction === 'left' ? 'rotate(180deg)' : 'rotate(0deg)'};
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: center;
  transform: ${props => props.direction === 'left' ? 'translate(-50%, -50%) rotate(180deg)' : 'translate(-50%, -50%) rotate(0deg)'};
`;

const CategoryText = styled.div`
  color: #868686;
  font-family: "Pretendard Variable-SemiBold", Helvetica;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.35px;
  line-height: 48px;
  text-align: center;
  white-space: nowrap;
  width: fit-content;
`;

const CompleteButton = styled.button`
  background: linear-gradient(
    90deg,
    rgba(246, 201, 70, 1) 0%,
    rgba(174, 206, 135, 1) 49%,
    rgba(115, 211, 191, 1) 97%
  );
  color: white;
  border: none;
  border-radius: 25px;
  padding: 15px 40px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;
  margin-top: 60px;
  margin-bottom: 30px;
  align-self: center;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const avatarOptions = [
  { 
    faceImage: '/assets/image-18-2.png', 
    fullBodyImage: '/assets/image-18-full.png',
    name: 'avatar1' 
  },
  { 
    faceImage: '/assets/image-27.png', 
    fullBodyImage: '/assets/image-18-full.png',
    name: 'avatar2' 
  },
  { 
    faceImage: '/assets/image-21.png', 
    fullBodyImage: '/assets/image-40.png',
    name: 'avatar3' 
  },
  { 
    faceImage: '/assets/image-31.png', 
    fullBodyImage: '/assets/image-18-full.png',
    name: 'avatar4' 
  },
  { 
    faceImage: '/assets/image-19.png', 
    fullBodyImage: '/assets/image-18-full.png',
    name: 'avatar5' 
  },
  { 
    faceImage: '/assets/image-26.png', 
    fullBodyImage: '/assets/image-18-full.png',
    name: 'avatar6' 
  },
  { 
    faceImage: '/assets/image-23.png', 
    fullBodyImage: '/assets/image-18-full.png',
    name: 'avatar7' 
  },
  { 
    faceImage: '/assets/image-25.png', 
    fullBodyImage: '/assets/image-18-full.png',
    name: 'avatar8' 
  }
];

const categories = ['얼굴', '머리', '옷', '악세서리'];

interface AvatarGenerationProps {
  onComplete?: () => void;
}

export default function AvatarGeneration({ onComplete }: AvatarGenerationProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [currentCategory, setCurrentCategory] = useState(0);

  const handleAvatarSelect = (index: number) => {
    setSelectedAvatar(index);
  };

  const nextCategory = () => {
    setCurrentCategory((prev) => (prev + 1) % categories.length);
  };

  const prevCategory = () => {
    setCurrentCategory((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const handleComplete = () => {
    console.log('Avatar creation completed!');
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <Container>
      <Title>나만의 아미 아바타 만들기</Title>
      
      <AvatarCard>
        <AvatarPreview>
          <FullAvatarImage 
            src={selectedAvatar !== null ? avatarOptions[selectedAvatar].fullBodyImage : `/assets/image-18-full.png`}
            alt="Avatar Preview"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDIwMCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjgwIiBmaWxsPSIjRjBGMEYwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPuyCg+2DneuQnCDslYTrsZTthLDrpbwg66eM66m47rOg7KeAPC90ZXh0Pgo8L3N2Zz4=';
            }}
          />
        </AvatarPreview>
        
        <SelectionSection>
          <Controls>
            <CategoryButton onClick={prevCategory}>
              <PolygonIcon direction="left" src="/assets/polygon-1.svg" alt="Previous" />
            </CategoryButton>
            
            <CategoryText>{categories[currentCategory]}</CategoryText>
            
            <CategoryButton onClick={nextCategory}>
              <PolygonIcon direction="right" src="/assets/polygon-1.svg" alt="Next" />
            </CategoryButton>
          </Controls>

          <AvatarGrid>
            {avatarOptions.map((avatar, index) => (
              <AvatarOption
                key={index}
                isSelected={selectedAvatar === index}
                onClick={() => handleAvatarSelect(index)}
              >
                <AvatarImage 
                  src={avatar.faceImage} 
                  alt={avatar.name}
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMyIiBoZWlnaHQ9IjE2MiIgdmlld0JveD0iMCAwIDEzMiAxNjIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMzIiIGhlaWdodD0iMTYyIiBmaWxsPSIjRjBGMEYwIi8+Cjx0ZXh0IHg9IjY2IiB5PSI4MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iIzk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5JbWFnZSB7aW5kZXggKyAxfTwvdGV4dD4KPHN2Zz4=';
                  }}
                />
              </AvatarOption>
            ))}
          </AvatarGrid>

          <CompleteButton 
            onClick={handleComplete}
            disabled={selectedAvatar === null}
          >
            아바타 생성 완료
          </CompleteButton>
        </SelectionSection>
      </AvatarCard>
    </Container>
  );
}