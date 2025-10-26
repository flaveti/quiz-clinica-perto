-- Criar tabela de leads
CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  empresa TEXT NOT NULL,
  cargo TEXT NOT NULL,
  score INTEGER NOT NULL,
  tier INTEGER NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para busca rápida
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_whatsapp ON leads(whatsapp);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_tier ON leads(tier);

-- Habilitar RLS (Row Level Security)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir leitura e escrita (ajuste conforme necessário)
CREATE POLICY "Enable read access for all users" ON leads
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON leads
  FOR INSERT WITH CHECK (true);

-- Comentários na tabela
COMMENT ON TABLE leads IS 'Leads capturados pelo Quiz de Saúde da Clínica Perto';
COMMENT ON COLUMN leads.id IS 'ID único do lead';
COMMENT ON COLUMN leads.name IS 'Nome completo do lead';
COMMENT ON COLUMN leads.email IS 'Email do lead';
COMMENT ON COLUMN leads.whatsapp IS 'WhatsApp do lead';
COMMENT ON COLUMN leads.empresa IS 'Nome da empresa do lead';
COMMENT ON COLUMN leads.cargo IS 'Cargo do lead';
COMMENT ON COLUMN leads.score IS 'Pontuação obtida no quiz (0-15)';
COMMENT ON COLUMN leads.tier IS 'Nível de saúde: 1 (Verde), 2 (Laranja), 3 (Vermelho)';
COMMENT ON COLUMN leads.percentage IS 'Percentual de acerto';
COMMENT ON COLUMN leads.answers IS 'Respostas do quiz em formato JSON';
COMMENT ON COLUMN leads.created_at IS 'Data e hora de criação do registro';
