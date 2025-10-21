# Sistema de Armazenamento - Clínica Perto

## Armazenamento Local

Este quiz utiliza **localStorage do navegador** para salvar os dados dos leads de forma local e segura.

## Como Funciona:

1. **Captura de Leads**: Os dados são salvos automaticamente após completar o quiz
2. **Deduplicação**: Evita leads duplicados baseado em email ou WhatsApp
3. **Backup JSON**: Os dados são automaticamente preparados em formato JSON para backup

## Acesso Administrativo:

### Como Acessar:
1. Clique **10 vezes** no logotipo
2. O painel administrativo abre automaticamente
3. Visualize e exporte os dados

**Sem senha necessária** - acesso direto por cliques no logo para maior praticidade.

## Exportação de Dados:

### Formatos Disponíveis:
- **📊 CSV**: Planilha compatível com Excel/Google Sheets
- **📄 JSON**: Arquivo estruturado com dados completos e estatísticas

### Estrutura do JSON:
```json
{
  "leads": [...],
  "exported_at": "2025-10-20T21:45:00.000Z",
  "total_leads": 15,
  "metadata": {
    "app": "Clinica Perto - Quiz Saude",
    "version": "1.0.0"
  },
  "statistics": {
    "tier_1": 5,
    "tier_2": 7, 
    "tier_3": 3,
    "avg_score": "12.4"
  }
}
```

## Dados Salvos por Lead:
- Nome completo
- Email
- WhatsApp  
- Empresa
- Cargo
- Respostas do quiz (A/B/C)
- Score final (pontuação)
- Tier (classificação 1/2/3)
- Porcentagem de acerto
- Data/hora de criação

## Persistência:
Os dados ficam salvos no navegador até serem limpos manualmente ou pelo usuário.