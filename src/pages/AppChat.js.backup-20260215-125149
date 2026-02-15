import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AppLogin.css';
import './AppChat.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

function AppChat() {
  const navigate = useNavigate();
  const [tela, setTela] = useState('login');
  const [usuario, setUsuario] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [inputMensagem, setInputMensagem] = useState('');
  const [arquivo, setArquivo] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [bloqueado, setBloqueado] = useState(false);
  
  const [nomeInput, setNomeInput] = useState('');
  const [whatsappInput, setWhatsappInput] = useState('');
  const [tokenInput, setTokenInput] = useState('');
  
  const [tecladoMatAberto, setTecladoMatAberto] = useState(false);
  const [dashboardAberto, setDashboardAberto] = useState(false);
  const [progresso, setProgresso] = useState(null);
  
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const formatarMensagem = (texto) => {
    return texto
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
      .replace(/`(.+?)`/g, '<code>$1</code>');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mensagens]);

  useEffect(() => {
    const u = localStorage.getItem('eduagent_usuario');
    if (u) {
      const parsed = JSON.parse(u);
      setUsuario(parsed);
      setTela('chat');
      carregarHistorico(parsed.whatsapp);
    }
  }, []);

  const carregarHistorico = async (whatsapp) => {
    try {
      const res = await axios.get(`${API_URL}/api/mensagens/${whatsapp}`);
      setMensagens(res.data);
    } catch (err) {
      console.error('Erro ao carregar histórico:', err);
      setMensagens([]);
    }
  };

  const carregarProgresso = async (whatsapp) => {
    try {
      const res = await axios.get(`${API_URL}/api/progresso/${whatsapp}`);
      setProgresso(res.data);
    } catch (err) {
      console.error('Erro ao carregar progresso:', err);
    }
  };

  const fazerLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        nome: nomeInput,
        whatsapp: whatsappInput,
        token: tokenInput
      });
      const user = { 
        nome: res.data.nome,
        whatsapp: res.data.whatsapp,
        plano: res.data.plano 
      };
      setUsuario(user);
      localStorage.setItem('eduagent_usuario', JSON.stringify(user));
      setTela('chat');
      carregarHistorico(res.data.whatsapp);
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao fazer login');
    } finally {
      setCarregando(false);
    }
  };

  const enviarMensagem = async (e) => {
    e.preventDefault();
    if ((!inputMensagem.trim() && !arquivo) || carregando) return;
    
    const mensagemTemp = {
      tipo: 'estudante',
      conteudo: inputMensagem,
      timestamp: new Date()
    };
    
    setMensagens(prev => [...prev, mensagemTemp]);
    const conteudoEnviado = inputMensagem;
    setInputMensagem('');
    setCarregando(true);
    setErro('');
    setBloqueado(false);
    
    try {
      const payload = {
        whatsapp: usuario.whatsapp,
        conteudo: conteudoEnviado,
        arquivo: arquivo ? { 
          tipo: arquivo.tipo, 
          conteudo: arquivo.conteudo,
          nome: arquivo.nome
        } : null
      };
      
      const res = await axios.post(`${API_URL}/api/mensagens`, payload);
      
      setMensagens(prev => {
        const semTemp = prev.filter(m => m !== mensagemTemp);
        return [...semTemp, res.data.mensagemEstudante, res.data.mensagemAgente];
      });
      
      setArquivo(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      const errorData = err.response?.data;
      
      if (err.response?.status === 403) {
        setBloqueado(true);
        setErro(errorData?.mensagem || 'Limite atingido');
      } else {
        setErro(errorData?.erro || 'Erro ao enviar mensagem');
      }
      
      setMensagens(prev => prev.filter(m => m !== mensagemTemp));
    } finally {
      setCarregando(false);
    }
  };

  const limparConversa = async () => {
    if (!window.confirm('Tem certeza que deseja limpar todo o histórico?')) return;
    try {
      await axios.delete(`${API_URL}/api/mensagens/${usuario.whatsapp}`);
      setMensagens([]);
    } catch (err) {
      setErro('Erro ao limpar conversa');
    }
  };

  const sair = () => {
    localStorage.removeItem('eduagent_usuario');
    setUsuario(null);
    setMensagens([]);
    setTela('login');
    navigate('/app');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(',')[1];
      setArquivo({ 
        tipo: file.type.startsWith('image/') ? 'imagem' : 'pdf', 
        conteudo: base64, 
        nome: file.name 
      });
    };
    reader.readAsDataURL(file);
  };

  const inserirSimbolo = (simbolo) => {
    setInputMensagem(prev => prev + simbolo);
    textareaRef.current?.focus();
  };

  const handleTextareaChange = (e) => {
    setInputMensagem(e.target.value);
    
    // Auto-resize
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarMensagem(e);
    }
  };

  const abrirDashboard = () => {
    carregarProgresso(usuario.whatsapp);
    setDashboardAberto(true);
  };

  if (tela === 'login') {
    return (
      <div className="app-login">
        <header className="app-login__header">
          <div className="app-login__header-content">
            <div className="app-logo" onClick={() => navigate('/')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-1H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-1h7z"></path>
              </svg>
              <span>Agente Educacional</span>
            </div>
          </div>
        </header>
        <div className="app-login__content">
          <div className="app-login__card">
            <div className="app-login__card-header">
              <h1>Entrar</h1>
              <p>Acesse sua conta para continuar estudando</p>
            </div>
            <form onSubmit={fazerLogin} className="app-login__form">
              <div className="app-input-group">
                <label>Nome completo</label>
                <input 
                  type="text" 
                  value={nomeInput} 
                  onChange={(e) => setNomeInput(e.target.value)} 
                  placeholder="Seu nome" 
                  required 
                  disabled={carregando}
                  autoFocus
                />
              </div>
              <div className="app-input-group">
                <label>WhatsApp</label>
                <input 
                  type="tel" 
                  value={whatsappInput} 
                  onChange={(e) => setWhatsappInput(e.target.value)} 
                  placeholder="66992059642" 
                  required 
                  disabled={carregando}
                />
                <span className="app-input-hint">
                  Apenas números, com DDD • Exemplo: 61999999999
                </span>
              </div>
              <div className="app-input-group">
                <label>Código de acesso</label>
                <input 
                  type="text" 
                  value={tokenInput} 
                  onChange={(e) => setTokenInput(e.target.value)} 
                  placeholder="Token fornecido" 
                  required 
                  disabled={carregando}
                />
                <span className="app-input-hint">
                  Você recebeu um código de acesso exclusivo
                </span>
              </div>
              {erro && (
                <div className="app-alert app-alert--error">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {erro}
                </div>
              )}
              <button type="submit" className="app-btn app-btn--primary app-btn--full" disabled={carregando}>
                {carregando ? 'Entrando...' : 'Entrar'}
                {!carregando && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                )}
              </button>
            </form>
            <div className="app-login__footer">
              <p>✓ 7 dias grátis • Sem cartão • Cancele quando quiser</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-chat">
      <header className="app-chat__header">
        <div className="app-chat__header-content">
          <div className="app-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-1H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-1h7z"></path>
            </svg>
            <span>Agente Educacional</span>
          </div>
          <div className="app-chat__header-actions">
            <button className="app-btn app-btn--ghost" onClick={abrirDashboard} title="Ver progresso">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </button>
            <button className="app-btn app-btn--ghost" onClick={limparConversa} title="Limpar histórico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
            <button className="app-btn app-btn--ghost" onClick={sair} title="Sair">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="app-chat__messages">
        <div className="app-chat__messages-content">
          {mensagens.length === 0 ? (
            <div className="app-chat__empty">
              <div className="app-chat__empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3>Comece sua sessão de estudo</h3>
              <p>Envie sua primeira mensagem ou compartilhe o cronograma da disciplina</p>
            </div>
          ) : (
            mensagens.map((msg, idx) => (
              <div key={idx} className={`app-message ${msg.tipo === 'estudante' ? 'app-message--user' : 'app-message--agent'}`}>
                <div className="app-message__content">
                  {msg.arquivo?.tipo === 'imagem' && (
                    <img src={`data:image/png;base64,${msg.arquivo.conteudo}`} alt="Anexo" className="app-message__image" />
                  )}
                  {msg.conteudo && (
                    <div className="app-message__text" dangerouslySetInnerHTML={{__html: formatarMensagem(msg.conteudo)}} />
                  )}
                </div>
              </div>
            ))
          )}
          {carregando && (
            <div className="app-message app-message--agent">
              <div className="app-message__content">
                <div className="app-typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="app-chat__input">
        <div className="app-chat__input-content">
          {tecladoMatAberto && (
            <div className="app-math-keyboard">
              {['∫', '∑', '√', 'π', 'α', 'β', 'θ', '≠', '≤', '≥', '∞', 'Δ', 'λ', 'μ', 'σ'].map(simbolo => (
                <button key={simbolo} type="button" onClick={() => inserirSimbolo(simbolo)} className="app-math-btn">
                  {simbolo}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={enviarMensagem} className="app-chat__form">
            <div className="app-chat__form-top">
              <button 
                type="button" 
                className={`app-btn app-btn--icon ${tecladoMatAberto ? 'app-btn--active' : ''}`}
                onClick={() => setTecladoMatAberto(!tecladoMatAberto)}
                title="Teclado matemático"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <text x="4" y="17" fontSize="14" fontWeight="bold" fill="currentColor" stroke="none">fn</text>
                </svg>
              </button>

              <textarea 
                ref={textareaRef} 
                value={inputMensagem} 
                onChange={handleTextareaChange} 
                onKeyPress={handleKeyPress} 
                placeholder="Digite sua mensagem..." 
                disabled={carregando} 
                rows={1} 
              />
              
              <div className="app-chat__form-actions">
                <input 
                  ref={fileInputRef} 
                  type="file" 
                  accept="image/*,.pdf" 
                  onChange={handleFileUpload} 
                  style={{ display: 'none' }} 
                  id="file-upload" 
                />
                <label htmlFor="file-upload" className="app-btn app-btn--icon" title="Anexar arquivo">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                  </svg>
                </label>
                <button type="submit" className="app-btn app-btn--primary" disabled={carregando || (!inputMensagem.trim() && !arquivo)} title="Enviar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </div>

            {arquivo && (
              <div className="app-chat__attachment">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                </svg>
                <span>{arquivo.nome || 'Arquivo anexado'}</span>
                <button type="button" onClick={() => { setArquivo(null); if (fileInputRef.current) fileInputRef.current.value = ''; }} className="app-chat__attachment-remove">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            )}
          </form>

          {erro && (
            <div className="app-alert app-alert--error" style={{marginTop: '12px'}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <div style={{flex: 1}}>
                {erro}
                {bloqueado && (
                  <button 
                    onClick={() => navigate('/planos')} 
                    style={{
                      marginTop: '8px',
                      padding: '8px 16px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'block',
                      width: '100%'
                    }}
                  >
                    Ver planos
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {dashboardAberto && (
        <div className="app-modal-overlay" onClick={() => setDashboardAberto(false)}>
          <div className="app-modal app-modal--dashboard" onClick={(e) => e.stopPropagation()}>
            <div className="app-modal__header">
              <h2>Seu Progresso</h2>
              <button onClick={() => setDashboardAberto(false)} className="app-modal__close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="app-modal__content">
              {progresso ? (
                <>
                  <div className="app-progress-section">
                    <div className="app-progress-header">
                      <h3>Progresso Geral</h3>
                      <span className="app-progress-percent">
                        {progresso.conceitos_dominados.length > 0 
                          ? Math.round((progresso.conceitos_dominados.length / (progresso.conceitos_dominados.length + progresso.conceitos_em_progresso.length)) * 100)
                          : 0}%
                      </span>
                    </div>
                    <div className="app-progress-bar-large">
                      <div 
                        className="app-progress-fill-large" 
                        style={{
                          width: `${progresso.conceitos_dominados.length > 0 
                            ? Math.round((progresso.conceitos_dominados.length / (progresso.conceitos_dominados.length + progresso.conceitos_em_progresso.length)) * 100)
                            : 0}%`
                        }}
                      ></div>
                    </div>
                    <div className="app-progress-labels">
                      <span>{progresso.conceitos_dominados.length} conceitos dominados</span>
                      <span>{progresso.conceitos_em_progresso.length} em progresso</span>
                    </div>
                  </div>

                  <div className="app-stats-grid">
                    <div className="app-stat-card">
                      <div className="app-stat-card__icon app-stat-card__icon--purple">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2v20M17 7H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                      </div>
                      <div className="app-stat-card__content">
                        <div className="app-stat-card__value">{progresso.sequencia_dias}</div>
                        <div className="app-stat-card__label">Dias de sequência</div>
                      </div>
                    </div>

                    <div className="app-stat-card">
                      <div className="app-stat-card__icon app-stat-card__icon--blue">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </div>
                      <div className="app-stat-card__content">
                        <div className="app-stat-card__value">{progresso.total_sessoes}</div>
                        <div className="app-stat-card__label">Sessões completadas</div>
                      </div>
                    </div>

                    <div className="app-stat-card">
                      <div className="app-stat-card__icon app-stat-card__icon--green">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div className="app-stat-card__content">
                        <div className="app-stat-card__value">{progresso.conceitos_dominados.length}</div>
                        <div className="app-stat-card__label">Conceitos dominados</div>
                      </div>
                    </div>

                    <div className="app-stat-card">
                      <div className="app-stat-card__icon app-stat-card__icon--orange">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                      </div>
                      <div className="app-stat-card__content">
                        <div className="app-stat-card__value">{progresso.conceitos_em_progresso.length}</div>
                        <div className="app-stat-card__label">Em progresso</div>
                      </div>
                    </div>
                  </div>

                  {progresso.plano === 'trial' && (
                    <div className="app-trial-banner">
                      <div className="app-trial-banner__icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                      </div>
                      <div className="app-trial-banner__content">
                        <strong>Período Trial</strong>
                        <span>{progresso.dias_trial_restantes} dias restantes</span>
                      </div>
                      <button className="app-trial-banner__btn" onClick={() => {
                        setDashboardAberto(false);
                        navigate('/planos');
                      }}>
                        Assinar agora
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="app-loading">
                  <div className="app-spinner"></div>
                  <p>Carregando progresso...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppChat;
