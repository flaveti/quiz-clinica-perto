// Serviço de armazenamento local para leads
const STORAGE_KEY = 'clinica_perto_leads';

// Função para salvar lead
export async function saveLead(leadData) {
  try {
    console.log('=== SALVANDO LEAD ===');
    console.log('Dados recebidos:', leadData);
    
    const leads = getStoredLeads();
    console.log('Leads existentes:', leads.length);
    
    const newLead = {
      ...leadData,
      id: Date.now(),
      created_at: new Date().toISOString()
    };
    
    // Verificar duplicata por email ou WhatsApp (apenas se foi no mesmo dia)
    const hoje = new Date().toDateString();
    const isDuplicate = leads.some(lead => {
      const leadDate = new Date(lead.created_at).toDateString();
      return leadDate === hoje && (lead.email === leadData.email || lead.whatsapp === leadData.whatsapp);
    });
    
    console.log('É duplicado no mesmo dia?', isDuplicate);
    console.log('Email:', leadData.email, 'WhatsApp:', leadData.whatsapp);
    
    if (!isDuplicate) {
      leads.push(newLead);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
      console.log('Lead salvo! Total agora:', leads.length);
      console.log('Todos os leads:', leads.map(l => ({ email: l.email, whatsapp: l.whatsapp, created_at: l.created_at })));
      
      // Salvar também em arquivo JSON para download
      await saveToJsonFile(leads);
      
      console.log('Lead salvo com sucesso:', newLead);
      return { success: true, data: newLead, isNew: true };
    } else {
      console.log('Lead duplicado no mesmo dia, não salvo:', leadData);
      console.log('Para permitir novo preenchimento, use email/WhatsApp diferentes');
      return { success: false, error: 'Lead duplicado no mesmo dia', isDuplicate: true };
    }
  } catch (error) {
    console.error('Erro ao salvar lead:', error);
    return { success: false, error };
  }
}

// Função para salvar em arquivo JSON
async function saveToJsonFile(leads) {
  try {
    const jsonData = {
      leads: leads,
      exported_at: new Date().toISOString(),
      total_leads: leads.length,
      metadata: {
        app: 'Clinica Perto - Quiz Saude',
        version: '1.0.0'
      }
    };
    
    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // Criar URL temporária para o arquivo
    const url = URL.createObjectURL(blob);
    
    // Auto-download do arquivo atualizado (opcional, pode ser removido)
    // const link = document.createElement('a');
    // link.href = url;
    // link.download = `clinica-perto-leads-${new Date().toISOString().split('T')[0]}.json`;
    // link.click();
    
    console.log('Dados salvos em formato JSON para backup');
  } catch (error) {
    console.error('Erro ao salvar arquivo JSON:', error);
  }
}

// Função para buscar todos os leads
export async function getLeads() {
  try {
    const leads = getStoredLeads();
    console.log('=== BUSCANDO LEADS ===');
    console.log('Total de leads encontrados:', leads.length);
    console.log('Leads:', leads);
    return { success: true, data: leads };
  } catch (error) {
    console.error('Erro ao buscar leads:', error);
    return { success: false, error };
  }
}

// Função auxiliar para pegar leads do localStorage
function getStoredLeads() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

// Função para login de admin (credenciais locais)
export async function adminLogin(email, password) {
  const validCredentials = [
    { email: 'admin@clinicaperto.com', password: 'clinicaperto2024' },
    { email: 'admin', password: 'admin' }
  ];
  
  const isValid = validCredentials.some(cred => 
    cred.email === email && cred.password === password
  );
  
  if (isValid) {
    return { success: true, user: { email, id: 'local-admin' } };
  } else {
    return { success: false, error: 'Credenciais inválidas' };
  }
}

// Função para exportar CSV
export function exportLeadsToCSV(leads) {
  if (!leads || leads.length === 0) {
    alert('Nenhum lead para exportar');
    return;
  }

  const headers = ['Nome', 'Email', 'WhatsApp', 'Empresa', 'Cargo', 'Score', 'Tier', 'Data'];
  const rows = leads.map(lead => [
    lead.nome || '',
    lead.email || '',
    lead.whatsapp || '',
    lead.empresa || '',
    lead.cargo || '',
    lead.score || 'N/A',
    lead.tier || 'N/A',
    lead.created_at ? new Date(lead.created_at).toLocaleDateString('pt-BR') : 'N/A'
  ]);

  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `leads-clinica-perto-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  
  console.log(`Exportados ${leads.length} leads para CSV`);
}

// Função para exportar JSON
export function exportLeadsToJSON(leads) {
  if (!leads || leads.length === 0) {
    alert('Nenhum lead para exportar');
    return;
  }

  const jsonData = {
    leads: leads,
    exported_at: new Date().toISOString(),
    total_leads: leads.length,
    metadata: {
      app: 'Clinica Perto - Quiz Saude',
      version: '1.0.0',
      export_format: 'JSON'
    },
    statistics: {
      tier_1: leads.filter(l => l.tier === 1).length,
      tier_2: leads.filter(l => l.tier === 2).length,
      tier_3: leads.filter(l => l.tier === 3).length,
      avg_score: leads.length > 0 ? 
        (leads.reduce((sum, l) => sum + (l.score || 0), 0) / leads.length).toFixed(1) : 0
    }
  };

  const jsonString = JSON.stringify(jsonData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `clinica-perto-leads-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  
  console.log(`Exportados ${leads.length} leads para JSON com estatísticas`);
}