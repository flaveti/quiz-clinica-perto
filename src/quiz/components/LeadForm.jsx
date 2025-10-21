import React, { useState } from 'react';

export default function LeadForm({ onNext }) {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    empresa: '',
    cargo: '',
  });
  const [error, setError] = useState('');

  const onChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.nome || !form.email || !form.whatsapp || !form.empresa || !form.cargo) {
      setError('Preencha todos os campos obrigatórios.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    onNext(form);
  };

  return (
    <section className="cp-card">
      <h1 className="cp-title">Mini Teste de Perfil em Saúde</h1>
      <p className="cp-subtitle">Preencha seus dados para começar</p>

      <form className="cp-form" onSubmit={handleSubmit}>
        <div className="cp-grid">
          <div className="cp-field">
            <label>Nome completo</label>
            <input 
              name="nome" 
              value={form.nome} 
              onChange={onChange} 
              placeholder="Seu nome" 
              required
            />
          </div>
          <div className="cp-field">
            <label>E-mail</label>
            <input 
              name="email" 
              type="email" 
              value={form.email} 
              onChange={onChange} 
              placeholder="voce@empresa.com" 
              required
            />
          </div>
          <div className="cp-field">
            <label>WhatsApp</label>
            <input 
              name="whatsapp" 
              value={form.whatsapp} 
              onChange={onChange} 
              placeholder="(11) 99999-9999" 
              required
            />
          </div>
          <div className="cp-field">
            <label>Nome da empresa</label>
            <input 
              name="empresa" 
              value={form.empresa} 
              onChange={onChange} 
              placeholder="Empresa" 
              required
            />
          </div>
          <div className="cp-field">
            <label>Cargo</label>
            <input 
              name="cargo" 
              value={form.cargo} 
              onChange={onChange} 
              placeholder="Seu cargo" 
              required
            />
          </div>
        </div>

        {error && <div className="cp-error">{error}</div>}

        <button type="submit" className="cp-button cp-primary">
          Iniciar Teste
        </button>
      </form>
    </section>
  );
}