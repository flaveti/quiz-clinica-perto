import React, { useEffect } from 'react';

const copy = {
  1: {
    title: 'Você está no caminho certo!',
    text: 'Parabéns, seus hábitos mostram que você já tem um bom cuidado com sua saúde. Mas mesmo quem está bem precisa de acompanhamento para manter a qualidade de vida. A Clínica Perto ajuda você a continuar nesse caminho, com apoio multiprofissional e prevenção contínua.',
    color: '#16a34a',
  },
  2: {
    title: 'Você está no meio do caminho!',
    text: 'Você já cuida de alguns aspectos importantes da sua saúde, mas ainda tem pontos que podem melhorar. Pequenas mudanças podem fazer uma grande diferença no seu bem-estar. A Clínica Perto pode ser sua parceira nessa jornada, com acompanhamento contínuo, personalizado e digital.',
    color: '#f59e0b',
  },
  3: {
    title: 'Hora de cuidar melhor de você',
    text: 'Seus resultados mostram que alguns aspectos da sua saúde precisam de atenção. Isso não significa um problema imediato, mas sim um sinal de que é hora de cuidar melhor de você. Com acompanhamento contínuo e apoio multiprofissional, a Clínica Perto ajuda a transformar esses pontos de atenção em mais qualidade de vida e bem-estar.',
    color: '#dc2626',
  },
};

export default function ResultScreen({ lead, result, onExit }) {
  useEffect(() => {
    if (result && result.tier === 1) {
      // Confetti effect para resultados excelentes
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes cpConfettiFall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0.9; }
        }
        .cp-confetti-container { position: fixed; inset: 0; pointer-events: none; z-index: 9999; overflow: hidden; }
        .cp-confetti { position: absolute; top: -10vh; will-change: transform; border-radius: 2px; }
      `;
      document.head.appendChild(style);

      const container = document.createElement('div');
      container.className = 'cp-confetti-container';
      document.body.appendChild(container);

      const colors = ['#28a26d', '#ff8a00', '#4dd4ac', '#ffc266'];
      const pieces = 120;
      
      for (let i = 0; i < pieces; i++) {
        const el = document.createElement('i');
        el.className = 'cp-confetti';
        const size = 6 + Math.random() * 6;
        el.style.width = `${size}px`;
        el.style.height = `${size * 0.5}px`;
        el.style.left = `${Math.random() * 100}%`;
        el.style.background = colors[i % colors.length];
        el.style.animation = `cpConfettiFall ${1200 + Math.random() * 1200}ms ease-out`;
        el.style.animationDelay = `${Math.random() * 300}ms`;
        container.appendChild(el);
      }

      const cleanup = setTimeout(() => {
        container.remove();
        style.remove();
      }, 2600);

      return () => clearTimeout(cleanup);
    }
  }, [result]);

  return (
    <section className="cp-card cp-animate">
      <h2 className="cp-result-title" style={{ color: copy[result.tier].color }}>
        {copy[result.tier].title}
      </h2>
      <p className="cp-result-text">{copy[result.tier].text}</p>

      <div className="cp-gift-section">
        <div className="cp-gift-header">
          <div className="cp-gift-icon">🎁</div>
          <h3 className="cp-gift-title">Seu Presente Exclusivo!</h3>
          <p className="cp-gift-subtitle">Parabéns por cuidar da sua saúde! Aqui está seu e-book gratuito:</p>
        </div>
        
        <div className="cp-qr-container">
          <div className="cp-qr-wrapper">
            <img 
              src="/img/QRCode.png" 
              alt="QR Code do e-book exclusivo" 
              className="cp-qr-image"
            />
          </div>
          <div className="cp-qr-instructions">
            <p><strong>📱 Como acessar:</strong></p>
            <p>Aponte a câmera do seu celular para o QR Code acima</p>
            <p className="cp-qr-bonus">✨ E-book exclusivo sobre saúde e bem-estar</p>
          </div>
        </div>
      </div>

      <div className="cp-actions">
        <button className="cp-button cp-primary" onClick={onExit}>
          🔄 Fazer Novo Quiz
        </button>
        <button className="cp-button cp-outline" onClick={onExit}>
          Sair
        </button>
      </div>
    </section>
  );
}