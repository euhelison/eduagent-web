import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Planos.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

function Planos() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const u = localStorage.getItem('eduagent_usuario');
    if (u) {
      setUsuario(JSON.parse(u));
    } else {
      navigate('/app');
    }
  }, [navigate]);

  const assinar = async (plano) => {
    setCarregando(true);
    setErro('');
    try {
      const res = await axios.post(`${API_URL}/api/pagamento/criar`, {
        whatsapp: usuario.whatsapp,
        plano: plano
      });

      // Redirecionar pro Mercado Pago
      window.location.href = res.data.pagamentoUrl;
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao criar pagamento');
      setCarregando(false);
    }
  };

  return (
    <div className="planos">
      <header className="planos-header">
        <div className="planos-container">
          <div className="planos-logo" onClick={() => navigate('/')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-1H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-1h7z"></path>
            </svg>
            <span>Agente Educacional</span>
          </div>
          <button className="planos-btn-voltar" onClick={() => navigate('/app')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Voltar ao chat
          </button>
        </div>
      </header>

      <section className="planos-hero">
        <div className="planos-container">
          <h1 className="planos-title">Escolha seu plano</h1>
          <p className="planos-subtitle">
            Transforme seus estudos com aprendizado personalizado e eficiente
          </p>
        </div>
      </section>

      <section className="planos-cards">
        <div className="planos-container">
          <div className="planos-grid">
            {/* PLANO ESTUDANTE */}
            <div className="plano-card">
              <div className="plano-badge">Mais popular</div>
              <div className="plano-header">
                <h3 className="plano-nome">Estudante</h3>
                <div className="plano-preco">
                  <span className="plano-valor">R$ 79</span>
                  <span className="plano-periodo">,90/mês</span>
                </div>
                <p className="plano-desc">Perfeito para estudantes universitários</p>
              </div>
              <ul className="plano-features">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <strong>20 sessões por mês</strong>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Detecção de lacunas
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Upload de arquivos
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Dashboard completo
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Suporte prioritário
                </li>
              </ul>
              <button 
                className="plano-btn plano-btn--destaque" 
                onClick={() => assinar('estudante')}
                disabled={carregando}
              >
                {carregando ? 'Processando...' : 'Assinar agora'}
              </button>
            </div>

            {/* PLANO PRO */}
            <div className="plano-card plano-card--pro">
              <div className="plano-badge plano-badge--pro">Ilimitado</div>
              <div className="plano-header">
                <h3 className="plano-nome">Pro</h3>
                <div className="plano-preco">
                  <span className="plano-valor">R$ 149</span>
                  <span className="plano-periodo">,90/mês</span>
                </div>
                <p className="plano-desc">Para quem quer dominar tudo</p>
              </div>
              <ul className="plano-features">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <strong>Sessões ilimitadas</strong>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Tudo do plano Estudante
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Sem limite de mensagens
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Prioridade máxima
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Suporte VIP
                </li>
              </ul>
              <button 
                className="plano-btn plano-btn--pro" 
                onClick={() => assinar('pro')}
                disabled={carregando}
              >
                {carregando ? 'Processando...' : 'Assinar Pro'}
              </button>
            </div>
          </div>

          {erro && (
            <div className="planos-erro">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {erro}
            </div>
          )}
        </div>
      </section>

      <section className="planos-faq">
        <div className="planos-container">
          <h2 className="planos-faq-title">Perguntas frequentes</h2>
          <div className="planos-faq-grid">
            <div className="planos-faq-item">
              <h3>Como funciona o trial?</h3>
              <p>Você tem 7 dias grátis com 5 sessões completas para testar. Depois, escolha o plano que preferir.</p>
            </div>
            <div className="planos-faq-item">
              <h3>Posso cancelar quando quiser?</h3>
              <p>Sim! Cancele a qualquer momento. Sem multas ou burocracia.</p>
            </div>
            <div className="planos-faq-item">
              <h3>O que conta como uma sessão?</h3>
              <p>Uma sessão é uma conversa completa com o agente, independente do número de mensagens.</p>
            </div>
            <div className="planos-faq-item">
              <h3>Posso fazer upgrade depois?</h3>
              <p>Claro! Você pode mudar de Estudante para Pro a qualquer momento.</p>
            </div>
            <div className="planos-faq-item">
              <h3>Aceitam quais formas de pagamento?</h3>
              <p>Cartão de crédito, Pix e boleto via Mercado Pago.</p>
            </div>
            <div className="planos-faq-item">
              <h3>Tem garantia?</h3>
              <p>Sim! 7 dias de garantia. Se não gostar, devolvemos 100% do valor.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Planos;
