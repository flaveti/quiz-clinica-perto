import React, { useState } from 'react';
import HeaderLogo from './components/HeaderLogo';
import LeadForm from './components/LeadForm';
import QuizQuestions from './components/QuizQuestions';
import ResultScreen from './components/ResultScreen';
import AdminPanel from './components/AdminPanel';

const ETAPAS = {
  LEAD: 'lead',
  QUIZ: 'quiz', 
  RESULT: 'result'
};

const questions = [
  {
    text: "Com que frequência você pratica atividades físicas?",
    options: [
      { id: 'A', text: "Regularmente (4-5 vezes por semana)", score: 3 },
      { id: 'B', text: "Ocasionalmente (2-3 vezes por semana)", score: 2 },
      { id: 'C', text: "Raramente ou nunca", score: 1 }
    ]
  },
  {
    text: "Como você avalia sua alimentação no dia a dia?",
    options: [
      { id: 'A', text: "Balanceada, com frutas, verduras e proteínas", score: 3 },
      { id: 'B', text: "Razoável, mas poderia melhorar", score: 2 },
      { id: 'C', text: "Irregular, muitos industrializados e fast-food", score: 1 }
    ]
  },
  {
    text: "Você faz check-ups médicos regulares?",
    options: [
      { id: 'A', text: "Sim, anualmente ou conforme recomendado", score: 3 },
      { id: 'B', text: "Às vezes, quando lembro ou sinto necessidade", score: 2 },
      { id: 'C', text: "Raramente, só quando tenho algum problema", score: 1 }
    ]
  },
  {
    text: "Como você lida com o estresse do dia a dia?",
    options: [
      { id: 'A', text: "Tenho estratégias saudáveis (meditação, exercícios, hobbies)", score: 3 },
      { id: 'B', text: "Consigo lidar bem na maioria das vezes", score: 2 },
      { id: 'C', text: "Sinto-me frequentemente sobrecarregado(a)", score: 1 }
    ]
  },
  {
    text: "Qual é a qualidade do seu sono?",
    options: [
      { id: 'A', text: "Durmo bem, 7-8 horas por noite", score: 3 },
      { id: 'B', text: "Razoável, mas às vezes tenho dificuldades", score: 2 },
      { id: 'C', text: "Irregular, frequentemente insônia ou sono insuficiente", score: 1 }
    ]
  }
];

function computeResult(answers) {
  const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
  const maxScore = questions.length * 3;
  const percentage = (totalScore / maxScore) * 100;
  
  if (percentage >= 80) return { tier: 1, score: totalScore, maxScore, percentage };
  if (percentage >= 60) return { tier: 2, score: totalScore, maxScore, percentage };
  return { tier: 3, score: totalScore, maxScore, percentage };
}

export default function QuizApp() {
  const [etapa, setEtapa] = useState(ETAPAS.LEAD);
  const [lead, setLead] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  const handleLeadSubmit = async (leadData) => {
    setLead(leadData);
    setEtapa(ETAPAS.QUIZ);
  };

  const handleQuizComplete = async (quizAnswers) => {
    console.log('=== QUIZ COMPLETADO ===');
    const quizResult = computeResult(quizAnswers);
    setAnswers(quizAnswers);
    setResult(quizResult);
    
    const leadToSave = {
      ...lead,
      answers: quizAnswers,
      score: quizResult.score,
      tier: quizResult.tier,
      percentage: quizResult.percentage
    };
    
    console.log('QuizApp: Salvando lead:', leadToSave);
    
    // Salvar dados completos no localStorage
    const { saveLead } = await import('../services/localStorage');
    const result = await saveLead(leadToSave);
    
    console.log('QuizApp: Resultado do save:', result);
    
    if (!result.success && result.isDuplicate) {
      console.log('ATENÇÃO: Lead duplicado detectado!');
      alert('⚠️ Você já fez o quiz hoje com esses dados.\n\nPara fazer um novo quiz, use um email ou WhatsApp diferente.');
      // Mesmo assim, mostra o resultado
    }
    
    setEtapa(ETAPAS.RESULT);
  };

  const handleExit = () => {
    console.log('=== SAINDO DO QUIZ - LIMPANDO ESTADO ===');
    console.log('Estado atual - Etapa:', etapa, 'Lead:', lead, 'Answers:', answers);
    
    setEtapa(ETAPAS.LEAD);
    setLead(null);
    setAnswers({});
    setResult(null);
    
    console.log('Estado limpo! Voltando para formulário de lead...');
  };

  const handleAdminUnlock = () => {
    setShowAdmin(true);
  };

  const handleAdminClose = () => {
    setShowAdmin(false);
  };

  return (
    <div className="quiz-wrapper">
      <HeaderLogo onUnlockAdmin={handleAdminUnlock} />
      
      <main className="quiz-main">
        {etapa === ETAPAS.LEAD && (
          <LeadForm onNext={handleLeadSubmit} />
        )}
        
        {etapa === ETAPAS.QUIZ && (
          <QuizQuestions 
            questions={questions}
            onComplete={handleQuizComplete}
          />
        )}
        
        {etapa === ETAPAS.RESULT && result && (
          <ResultScreen 
            lead={lead}
            result={result}
            onExit={handleExit}
          />
        )}
      </main>

      {showAdmin && (
        <AdminPanel 
          onClose={handleAdminClose}
        />
      )}
    </div>
  );
}