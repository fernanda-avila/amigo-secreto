import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { QRCodeCanvas } from 'qrcode.react';

// Importando a fonte Roboto
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const StepContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  width: 80%;
`;

const Explanation = styled.div`
  width: 50%;
  font-size: 1.2rem;
  color: #555;
`;

const Button = styled.button`
  padding: 12px 30px;
  font-size: 1rem;
  border-radius: 25px;
  border: none;
  margin-top: -40px;
  cursor: pointer;
  background-color: #4285f4;
  color: white;
  margin-left: 20px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #357ae8;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #c4c4c4;
    cursor: not-allowed;
  }
`;

const Card = styled.div`
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
`;

const Label = styled.label`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 10px;
  display: block;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 15px;
  font-size: 1rem;
  border-radius: 25px;
  width: 100%;
  max-width: 500px;
  border: 2px solid #ccc;
  margin-bottom: 30px;
  outline: none;
  transition: border-color 0.3s ease;
  flex-direction: column;

  &:focus {
    border-color: #4285f4;
  }


  ${({ isSuggestion }) => !isSuggestion && `
    margin-left: 130px;
  `}
`;

const PriceInput = styled.input`
  padding: 10px;
  font-size: 1.2rem;
  border-radius: 25px;
  border: 2px solid #ccc;
  width: 100%;
  max-width: 300px;
  margin-top: 10px;
  margin-bottom: 20px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #4285f4;
  }
`;

const QRCodeModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const QRCodeContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 350px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const QRCodeLabel = styled.h3`
  margin-bottom: 10px;
  color: #4c9b8f;
`;

const ExplanationText = styled.p`
  font-size: 1rem;
  color: #555;
  margin-top: 10px;
`;

const ImageStep = styled.img`
  width: 40%;
  max-width: 400px;
  margin-bottom: -30px;
  margin-top: 20px;
`;

const ParticipantList = styled.ul`
  list-style-type: none;
  padding: 0;
  text-align: center;
`;

const ParticipantItem = styled.li`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 5px;
`;

const SuggestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const App = () => {
  const [step, setStep] = useState(0);
  const [yourName, setYourName] = useState('');
  const [currentParticipant, setCurrentParticipant] = useState('');
  const [participants, setParticipants] = useState([]);
  const [giftValue, setGiftValue] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [showQRCodeModal, setShowQRCodeModal] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');

  const handleStart = () => {
    setStep(1);
  };

  const handleAddParticipant = () => {
    if (currentParticipant && !participants.includes(currentParticipant)) {
      setParticipants([...participants, currentParticipant]);
      setCurrentParticipant('');
    }
  };

  const handleSuggestionChange = (index, value) => {
    const updatedSuggestions = [...suggestions];
    updatedSuggestions[index] = value;
    setSuggestions(updatedSuggestions);
  };

  const handleGenerateQRCode = () => {
    const remainingParticipants = participants.filter(p => p !== yourName);
    if (remainingParticipants.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingParticipants.length);
      const chosenParticipant = remainingParticipants[randomIndex];
      const suggestion = suggestions[randomIndex] || 'Sem sugestão';

      const qrData = `Sorteado: ${chosenParticipant}\nSugestão de presente: ${suggestion}`;
      setQrCodeData(qrData);
      setShowQRCodeModal(true);
    } else {
      alert('Não há participantes suficientes para o sorteio!');
    }
  };

  const handleCloseQRCodeModal = () => {
    setShowQRCodeModal(false);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleNewDraw = () => {
    setStep(0);
    setYourName('');
    setCurrentParticipant('');
    setParticipants([]);
    setGiftValue(0);
    setSuggestions([]);
    setShowQRCodeModal(false);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        {step === 0 && (
          <StepContainer>
            <Explanation>
              <h2>Bem-vindo ao Sorteio de Amigo Secreto!</h2>
              <p>Cadastre seus participantes, defina o valor do presente e gere o QR Code para o sorteio!</p>
              <Button onClick={handleStart}>Começar</Button>
            </Explanation>
            <ImageStep src="/intro-image.png" alt="Sorteio de Amigo Secreto" />
          </StepContainer>
        )}

        {step >= 1 && (
          <>
            {/* Step 1: Perguntar nome */}
            {step === 1 && (
              <StepContainer>
                <Card>
                  <ImageStep src="/step1.png" alt="Passo 1 - Nome" />
                  <Label htmlFor="yourName">Digite seu nome!</Label>
                  <Input
                    id="yourName"
                    type="text"
                    value={yourName}
                    onChange={(e) => setYourName(e.target.value)}
                    placeholder="Seu nome"
                  />
                  <Button onClick={handleNextStep} disabled={!yourName}>
                    Próximo
                  </Button>
                </Card>
              </StepContainer>
            )}

            {/* Step 2: Perguntar nomes dos participantes */}
            {step === 2 && (
              <StepContainer>
                <Card>
                  <ImageStep src="/step2.png" alt="Passo 2 - Participantes" />
                  <Label htmlFor="participantName">Digite o nome dos participantes do sorteio!</Label>
                  <Input
                    id="participantName"
                    type="text"
                    value={currentParticipant}
                    onChange={(e) => setCurrentParticipant(e.target.value)}
                    placeholder="Participantes"
                  />
                  <Button onClick={handleAddParticipant} disabled={!currentParticipant}>
                    Adicionar
                  </Button>
                  <h3>Participantes:</h3>
                  <ParticipantList>
                    {participants.map((participant, index) => (
                      <ParticipantItem key={index}>{participant}</ParticipantItem>
                    ))}
                  </ParticipantList>
                  <Button onClick={handleNextStep} disabled={participants.length < 2}>
                    Próximo
                  </Button>
                </Card>
              </StepContainer>
            )}

            {/* Step 3: Definir valor do presente */}
            {step === 3 && (
              <StepContainer>
                <Card>
                  <ImageStep src="/step3.png" alt="Passo 3 - Valor do presente" />
                  <Label htmlFor="giftValue">Qual o valor máximo do presente?</Label>
                  <PriceInput
                    id="giftValue"
                    type="number"
                    value={giftValue}
                    onChange={(e) => setGiftValue(Number(e.target.value))}
                    placeholder="Valor do presente"
                  />
                  <Button onClick={handleNextStep} disabled={!giftValue || giftValue <= 0}>
                    Próximo
                  </Button>
                </Card>
              </StepContainer>
            )}

            {/* Step 4: Definir sugestões de presentes */}
            {step === 4 && (
              <StepContainer>
                <Card>
                  <ImageStep src="/step4.png" alt="Passo 4 - Sugestões de presentes" />
                  <Label>Sugestões de presentes:</Label>
                  <SuggestionContainer>
                    {participants.map((participant, index) => (
                      <div key={index}>
                        <Label>Sugestão para {participant}:</Label>
                        <Input
                          type="text"
                          value={suggestions[index] || ''}
                          onChange={(e) => handleSuggestionChange(index, e.target.value)}
                          placeholder="Sugestão de presente"
                          isSuggestion
                        />
                      </div>
                    ))}
                  </SuggestionContainer>
                  <Button onClick={handleGenerateQRCode}>Gerar QR Code</Button>
                </Card>
              </StepContainer>
            )}
          </>
        )}

        {/* QR Code Modal */}
        <QRCodeModal isOpen={showQRCodeModal}>
          <QRCodeContainer>
            <QRCodeLabel>QR Code do Sorteio</QRCodeLabel>
            <QRCodeCanvas value={qrCodeData} size={200} />
            <ExplanationText>Escaneie para ver o resultado do sorteio!</ExplanationText>
            <Button onClick={handleCloseQRCodeModal}>Fechar</Button>
          </QRCodeContainer>
        </QRCodeModal>

        {step >= 1 && (
          <Button onClick={handleNewDraw}>Novo Sorteio</Button>
        )}
      </Container>
    </>
  );
};

export default App;
