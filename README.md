# 🏥 Quiz de Saúde - Clínica Perto

Quiz interativo de saúde desenvolvido para a **Clínica Perto**, com sistema de captura de leads, análise de resultados e painel administrativo.

## 🚀 Funcionalidades

- ✅ **Formulário de Lead**: Captura nome, email e WhatsApp
- ✅ **Quiz de 5 perguntas**: Avaliação de hábitos de saúde
- ✅ **Sistema de pontuação**: 3 níveis de resultado
- ✅ **Efeitos visuais**: Confetti para resultados excelentes
- ✅ **Painel Administrativo**: Visualização e exportação de dados
- ✅ **Exportação**: CSV e JSON dos leads capturados
- ✅ **Armazenamento Local**: Dados salvos no localStorage
- ✅ **Design Responsivo**: Adaptado para mobile e desktop

## 🛠️ Tecnologias

- **React 18** - Framework principal
- **Create React App** - Setup e build
- **CSS3** - Estilização responsiva
- **LocalStorage** - Persistência de dados
- **Nunito Font** - Tipografia moderna

## 📱 Como usar

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/flaveti/quiz-clinica-perto.git
   ```

2. **Instale as dependências**:
   ```bash
   cd quiz-clinica-perto
   npm install
   ```

3. **Execute o projeto**:
   ```bash
   npm start
   ```

4. **Acesse no navegador**: `http://localhost:3000`

## 🔧 Painel Administrativo

- **Acesso**: Clique 10 vezes no logo da Clínica Perto
- **Funcionalidades**:
  - Visualizar todos os leads capturados
  - Exportar dados em CSV ou JSON
  - Atualizar lista em tempo real

## 📊 Sistema de Pontuação

- **Nível 1 (Verde)**: 4-5 pontos - "Você está no caminho certo!"
- **Nível 2 (Laranja)**: 2-3 pontos - "Você está no meio do caminho!"
- **Nível 3 (Vermelho)**: 0-1 pontos - "Hora de cuidar melhor de você"

## 🎨 Design

- **Cores principais**: Verde (#28a26d) e Laranja (#f6a45b)
- **Layout responsivo** com breakpoints para mobile
- **Fonte Nunito** para melhor legibilidade
- **Animações suaves** e feedback visual

## 💾 Armazenamento

Os dados são armazenados localmente no navegador usando `localStorage`. O sistema inclui:

- **Detecção de duplicatas** por email/WhatsApp no mesmo dia
- **Backup automático** em formato JSON
- **Dados exportáveis** para análise externa

## 🚀 Deploy

O projeto está configurado para deploy em qualquer plataforma que suporte aplicações React estáticas.

---

**Desenvolvido para Clínica Perto** - Sistema de captura de leads através de quiz interativo de saúde.