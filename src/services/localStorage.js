// Serviço de armazenamento para leads usando Supabase Cloud
import { supabase } from './supabase';

const STORAGE_KEY = 'clinica_perto_leads'; // Mantido para backup local

// Função para salvar lead no Supabase
export async function saveLead(leadData) {
  try {
    console.log('=== SALVANDO LEAD NO SUPABASE ===');
    console.log('Dados recebidos:', leadData);
    
    // Verificar duplicata por email ou WhatsApp (apenas se foi no mesmo dia)
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const { data: existingLeads, error: checkError } = await supabase
      .from('leads')
      .select('*')
      .or(`email.eq.${leadData.email},whatsapp.eq.${leadData.whatsapp}`)
      .gte('created_at', hoje.toISOString());
    
    if (checkError) {
      console.error('Erro ao verificar duplicatas:', checkError);
    }
    
    const isDuplicate = existingLeads && existingLeads.length > 0;
    console.log('É duplicado no mesmo dia?', isDuplicate);
    console.log('Email:', leadData.email, 'WhatsApp:', leadData.whatsapp);
    
    if (!isDuplicate) {
      // Preparar dados para inserção
      const newLead = {
        name: leadData.name || leadData.nome, // Aceita 'name' ou 'nome'
        email: leadData.email,
        whatsapp: leadData.whatsapp,
        empresa: leadData.empresa || null,
        cargo: leadData.cargo || null,
        score: leadData.score,
        tier: leadData.tier,
        percentage: leadData.percentage,
        answers: leadData.answers || {}
      };
      
      console.log('Inserindo no Supabase:', newLead);
      
      // Inserir no Supabase
      const { data, error } = await supabase
        .from('leads')
        .insert([newLead])
        .select();
      
      if (error) {
        console.error('Erro ao inserir no Supabase:', error);
        throw error;
      }
      
      console.log('Lead salvo no Supabase com sucesso!', data);
      
      // Backup local no localStorage
      saveToLocalStorage(data[0]);
      
      return { success: true, data: data[0], isNew: true };
    } else {
      console.log('Lead duplicado no mesmo dia, não salvo:', leadData);
      console.log('Para permitir novo preenchimento, use email/WhatsApp diferentes');
      return { success: false, error: 'Lead duplicado no mesmo dia', isDuplicate: true };
    }
  } catch (error) {
    console.error('Erro ao salvar lead:', error);
    return { success: false, error: error.message };
  }
}

// Função para backup local no localStorage
function saveToLocalStorage(lead) {
  try {
    const leads = getStoredLeads();
    leads.push(lead);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    console.log('Backup local salvo no localStorage');
  } catch (error) {
    console.error('Erro ao salvar backup local:', error);
  }
}

// Função para buscar todos os leads do Supabase
export async function getLeads() {
  try {
    console.log('=== BUSCANDO LEADS DO SUPABASE ===');
    
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Erro ao buscar leads do Supabase:', error);
      throw error;
    }
    
    console.log('Total de leads encontrados no Supabase:', data?.length || 0);
    console.log('Leads:', data);
    
    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Erro ao buscar leads:', error);
    
    // Fallback para localStorage se Supabase falhar
    console.log('Usando backup local do localStorage...');
    const localLeads = getStoredLeads();
    return { success: true, data: localLeads };
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

  const headers = ['Nome', 'Email', 'WhatsApp', 'Empresa', 'Cargo', 'Score', 'Tier', 'Porcentagem', 'Data'];
  const rows = leads.map(lead => [
    lead.name || lead.nome || '',
    lead.email || '',
    lead.whatsapp || '',
    lead.empresa || '',
    lead.cargo || '',
    lead.score || 'N/A',
    lead.tier || 'N/A',
    lead.percentage || 'N/A',
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