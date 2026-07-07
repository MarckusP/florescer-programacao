# Florescer 2026 · App de Programação (PWA)

App de página única para o **crachá dos participantes**: a pessoa lê o QR code,
abre em tela cheia no celular, vê a programação dos 3 dias e **escolhe para quais
palestras simultâneas quer ir** (monta o "Meu Roteiro"). Funciona **offline**.

> ⚠️ A programação é **fictícia** (demonstração). Edite `data.js` para os
> horários e salas reais antes de publicar.

## Como funciona
- **Abas por dia** — Sexta / Sábado / Domingo.
- **Linha do tempo** com horários. Quando há mais de uma palestra no mesmo
  horário, aparece o selo **"Sessões simultâneas — escolha uma"**.
- **Toque na sessão** → abre a ficha da palestrante (bio + as outras sessões do
  mesmo horário) e o botão **Adicionar ao meu roteiro**.
- **♥ Meu Roteiro** (topo direito) — lista só o que a pessoa escolheu, em ordem
  de horário. Fica salvo no próprio celular (localStorage), mesmo sem internet.

## Arquivos
```
programacao-pwa/
├── index.html            App shell
├── styles.css            Estilos (paleta do Florescer)
├── data.js  ← EDITE AQUI  Palestrantes, salas e programação
├── app.js                Lógica (render, escolhas, ficha)
├── manifest.webmanifest  Configuração PWA (nome, ícones, tela cheia)
├── sw.js                 Service worker (offline)
├── icons/                Ícones do app
└── img/                  Fotos das palestrantes (.webp)
```

## Editar a programação
Abra `data.js`:
- `SPEAKERS` — nome, função, foto e bio de cada palestrante.
- `ROOMS` — as salas do local.
- `SCHEDULE` — os dias e horários. Cada horário (`slot`) tem uma lista de
  `sessions`. **Duas ou mais sessões do tipo `"palestra"` no mesmo horário viram
  simultâneas automaticamente** e entram na lógica de escolha.

## Publicar (precisa de HTTPS para PWA)
É um site **estático** — sobe em qualquer hospedagem. Opções gratuitas fáceis:
- **Netlify Drop** — arraste a pasta `programacao-pwa` em https://app.netlify.com/drop
- **Cloudflare Pages** / **Vercel** — suba a pasta como projeto estático.
- **GitHub Pages** — publique a pasta em um repositório.

Todos entregam um link `https://…`, que é o que o PWA precisa para instalar e
funcionar offline.

## Gerar o QR code do crachá
1. Publique e copie o link `https://…`.
2. Gere o QR apontando para esse link (ex.: qr-code-generator.com, ou qualquer
   biblioteca de QR na arte do crachá).
3. Imprima no crachá. Ao ler, o celular abre o site e um convite **"Abrir em
   tela cheia?"** aparece sozinho.

### Comportamento do "tela cheia" por aparelho
- **Android (Chrome):** o botão **"Abrir em tela cheia"** dispara a instalação
  nativa do celular em **1 toque** — igual ao Game Pass. Já vira app na tela
  inicial.
- **iPhone (Safari):** a Apple **não permite** que um site se instale sozinho.
  O convite mostra o passo a passo ilustrado (**Compartilhar → Adicionar à Tela
  de Início**) — é o máximo possível no iOS, para qualquer site.
- Há também um botão **⛶** no topo para reabrir o convite quando quiser.
- Depois de instalado, o app abre **em tela cheia**, sem barra do navegador.

## Testar localmente
Por causa do service worker, use um servidor (não `file://`):
```bash
# dentro da pasta programacao-pwa
npx serve .
# ou
python -m http.server 8080
```
Abra o endereço no navegador (no celular, use o IP da máquina na mesma rede).
