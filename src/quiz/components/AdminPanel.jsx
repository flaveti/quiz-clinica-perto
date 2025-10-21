import React, { useState, useEffect } from 'react';
import { getLeads, exportLeadsToCSV, exportLeadsToJSON } from '../../services/localStorage';

export default function AdminPanel({ onClose }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    console.log('AdminPanel: Carregando leads...');
    setLoading(true);
    const result = await getLeads();
    console.log('AdminPanel: Resultado:', result);
    if (result.success) {
      setLeads(result.data);
      console.log('AdminPanel: Leads carregados:', result.data.length);
    }
    setLoading(false);
  };

  const exportCSV = () => {
    exportLeadsToCSV(leads);
  };

  const exportJSON = () => {
    exportLeadsToJSON(leads);
  };

  return (
    <div className="cp-admin">
      <div className="cp-admin-card">
        <div className="cp-admin-header">
          <h3>Painel Administrativo</h3>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button 
              onClick={loadLeads} 
              className="cp-button"
              style={{ background: '#28a26d', color: 'white', fontSize: 12 }}
            >
              🔄 Atualizar
            </button>
            <button 
              onClick={exportCSV} 
              className="cp-button cp-primary"
              disabled={leads.length === 0}
            >
              📊 CSV
            </button>
            <button 
              onClick={exportJSON} 
              className="cp-button cp-outline"
              disabled={leads.length === 0}
            >
              📄 JSON
            </button>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, marginLeft: 8 }}>×</button>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>Carregando...</div>
        ) : (
          <>
            <p style={{ marginBottom: 16, color: '#666' }}>
              Total de leads: {leads.length}
            </p>
            
            <div className="cp-table-wrapper">
              <table className="cp-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>WhatsApp</th>
                    <th>Empresa</th>
                    <th>Cargo</th>
                    <th>Score</th>
                    <th>Tier</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, index) => (
                    <tr key={lead.id || index}>
                      <td>{lead.nome}</td>
                      <td>{lead.email}</td>
                      <td>{lead.whatsapp}</td>
                      <td>{lead.empresa}</td>
                      <td>{lead.cargo}</td>
                      <td>{lead.score || 'N/A'}</td>
                      <td>{lead.tier || 'N/A'}</td>
                      <td>
                        {lead.created_at 
                          ? new Date(lead.created_at).toLocaleDateString('pt-BR')
                          : 'N/A'
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {leads.length === 0 && (
                <div style={{ textAlign: 'center', padding: 40, color: '#666' }}>
                  Nenhum lead encontrado
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}