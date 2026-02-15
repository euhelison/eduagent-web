import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-container">
          <div className="landing-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-1H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-1h7z"></path>
            </svg>
            <span>Agente Educacional</span>
          </div>
          <button className="landing-btn-cta" onClick={() => navigate('/app')}>
            Começar agora
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </header>

      <section className="landing-hero">
        <div className="landing-container">
          <div className="landing-hero-grid">
            <div className="landing-hero-content">
              <h1 className="landing-hero-title">
                Seu assistente pessoal de <span className="landing-gradient-text">aprendizado universitário</span>
              </h1>
              <p className="landing-hero-subtitle">
                Domine os conteúdos do seu curso com um agente de IA que se adapta ao seu cronograma, detecta lacunas de conhecimento e garante que você esteja sempre preparado.
              </p>
              <div className="landing-hero-cta">
                <button className="landing-btn-primary" onClick={() => navigate('/app')}>
                  Começar 7 dias grátis
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
                <div className="landing-hero-info">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Sem cartão de crédito • Cancele quando quiser
                </div>
              </div>
            </div>

            {/* PREVIEW CHAT */}
            <div className="landing-preview">
              <div className="landing-chat-card">
                <div className="landing-chat-header">
                  <div className="landing-chat-dot"></div>
                  <div className="landing-chat-dot"></div>
                  <div className="landing-chat-dot"></div>
                </div>
                <div className="landing-chat-messages">
                  <div className="landing-chat-msg landing-chat-msg--agent">
                    <div className="landing-chat-bubble">
                      Olá! Vamos revisar limites e derivadas?
                    </div>
                  </div>
                  <div className="landing-chat-msg landing-chat-msg--user">
                    <div className="landing-chat-bubble">
                      Sim! Tenho dúvida sobre regra da cadeia
                    </div>
                  </div>
                  <div className="landing-chat-msg landing-chat-msg--agent">
                    <div className="landing-chat-bubble">
                      Perfeito! Vou te explicar passo a passo...
                    </div>
                  </div>
                  <div className="landing-chat-typing">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>

              {/* DASHBOARD PREVIEW */}
              <div className="landing-dashboard-card">
                <div className="landing-dashboard-header">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                  <span>Seu progresso</span>
                </div>
                <div className="landing-progress-bar">
                  <div className="landing-progress-fill" style={{width: '68%'}}></div>
                </div>
                <div className="landing-dashboard-stats">
                  <div className="landing-mini-stat">
                    <div className="landing-mini-value">12</div>
                    <div className="landing-mini-label">Sessões</div>
                  </div>
                  <div className="landing-mini-stat">
                    <div className="landing-mini-value">8</div>
                    <div className="landing-mini-label">Conceitos</div>
                  </div>
                  <div className="landing-mini-stat">
                    <div className="landing-mini-value">5</div>
                    <div className="landing-mini-label">Dias</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-stats">
        <div className="landing-container">
          <div className="landing-stats-grid">
            <div className="landing-stat">
              <div className="landing-stat-value">70-80%</div>
              <div className="landing-stat-label">Taxa de retenção</div>
            </div>
            <div className="landing-stat">
              <div className="landing-stat-value">3x</div>
              <div className="landing-stat-label">Mais eficiente</div>
            </div>
            <div className="landing-stat">
              <div className="landing-stat-value">100%</div>
              <div className="landing-stat-label">Personalizado</div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-features">
        <div className="landing-container">
          <h2 className="landing-section-title">Como funciona</h2>
          <div className="landing-features-grid">
            <div className="landing-feature">
              <div className="landing-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3 className="landing-feature-title">Alinhado ao seu cronograma</h3>
              <p className="landing-feature-desc">
                O agente se integra ao cronograma oficial da sua disciplina, garantindo que você estude exatamente o que precisa, quando precisa.
              </p>
            </div>

            <div className="landing-feature">
              <div className="landing-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="landing-feature-title">Detecção de lacunas</h3>
              <p className="landing-feature-desc">
                Identifica automaticamente conceitos que você ainda não domina e ajusta o ensino para preencher essas lacunas de forma invisível.
              </p>
            </div>

            <div className="landing-feature">
              <div className="landing-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="landing-feature-title">Validação contínua</h3>
              <p className="landing-feature-desc">
                Testa seu entendimento através de perguntas estratégicas durante o diálogo, sem a pressão de provas formais.
              </p>
            </div>

            <div className="landing-feature">
              <div className="landing-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3 className="landing-feature-title">Continuidade pedagógica</h3>
              <p className="landing-feature-desc">
                Mantém contexto entre sessões, retomando exatamente de onde você parou sem perder o fio da meada.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-how">
        <div className="landing-container">
          <h2 className="landing-section-title">Como começar</h2>
          <div className="landing-steps">
            <div className="landing-step">
              <div className="landing-step-number">1</div>
              <div className="landing-step-content">
                <h3>Compartilhe seu cronograma</h3>
                <p>Envie o cronograma oficial da disciplina (foto, PDF ou descrição)</p>
              </div>
            </div>

            <div className="landing-step">
              <div className="landing-step-number">2</div>
              <div className="landing-step-content">
                <h3>Converse naturalmente</h3>
                <p>Tire dúvidas, peça explicações e pratique exercícios como se estivesse com um professor particular</p>
              </div>
            </div>

            <div className="landing-step">
              <div className="landing-step-number">3</div>
              <div className="landing-step-content">
                <h3>Acompanhe seu progresso</h3>
                <p>Veja quais conceitos você dominou e quais ainda precisa revisar</p>
              </div>
            </div>

            <div className="landing-step">
              <div className="landing-step-number">4</div>
              <div className="landing-step-content">
                <h3>Chegue preparado</h3>
                <p>Entre na prova dominando 100% do conteúdo cobrado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-cta-section">
        <div className="landing-container">
          <div className="landing-cta-card">
            <h2 className="landing-cta-title">Pronto para transformar seus estudos?</h2>
            <p className="landing-cta-subtitle">
              Comece agora com 7 dias grátis. Sem cartão de crédito.
            </p>
            <button className="landing-btn-primary" onClick={() => navigate('/app')}>
              Começar agora
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-container">
          <div className="landing-footer-content">
            <div className="landing-logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-1H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-1h7z"></path>
              </svg>
              <span>Agente Educacional</span>
            </div>
            <p className="landing-footer-copy">
              © 2026 Agente Educacional. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
