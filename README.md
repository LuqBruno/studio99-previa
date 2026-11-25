# Studio 99 — prévia

Prévia comercial independente produzida por Bruno Luque, com fotografias e informações do perfil público [@studio99salao](https://www.instagram.com/studio99salao/), consultado em 24/11/2026. Não é o site oficial do Studio 99 e não representa aprovação ou contratação pelo salão.

## Executar

Site estático, sem dependências nem etapa de build. Sirva esta pasta com qualquer servidor estático (por exemplo `python -m http.server`) e abra `index.html`. Publicação: GitHub Pages a partir da branch `main`, pasta raiz.

## Organização

- `index.html`: conteúdo semântico, cartela de tons, serviços, trabalhos, como agendar, contato e rodapé.
- `assets/css/style.css`: tokens em `:root`, fontes locais, hero, painéis, galeria e estados de movimento reduzido.
- `assets/js/app.js`: cartela guiada pela rolagem, painéis, links de WhatsApp por tom, barra fixa do celular e revelações.
- `assets/img`: fotos WebP com JPG de reserva, derivadas do Instagram (sem ampliar o original), avatar do perfil em 150 px e o monograma BL original.
- `assets/fonts`: Fraunces e Hanken Grotesk (licença OFL), variáveis, subconjunto latin, auto-hospedadas.

## Experiência

A cartela do hero é um leque de seis amostras de cabelo. No computador, a rolagem abre o leque, revela cada foto em máscara e destaca um tom por vez; no celular, vira uma foto grande com seis amostras horizontais embaixo, e a foto troca por rolagem, por toque ou por arraste (limiar de 40 px, a rolagem vertical segue nativa; foi desenhada para alturas de 640 px ou mais, com a barra do navegador visível). O tom escolhido entra na mensagem do botão "Quero um tom assim". Com `prefers-reduced-motion` ou sem JavaScript, a cartela aparece aberta e estática (no celular, foto e amostras sem rolagem guiada) e todos os botões continuam funcionando.

Nenhum formulário: todos os botões abrem o WhatsApp da bio, (48) 99622-7668, com mensagem pronta citando o serviço. Nada é enviado, reservado ou armazenado pela página.

Presets de `shared/motion-library` usados: `fan` (cartela), `curtain` (máscara das fotos), `line-mask` (títulos), `accordion` (serviços), `press` e `magnetic` (CTA, ponteiro fino), `image-zoom` (galeria).

## Fontes e limites

Fotos: publicações DZ0NXp1ItkD, DZ0MvheIAE0, DZ0N58HIsgL, DZ0MShgoPLK e DZ8hUETlLFT do perfil, em derivados recortados. Textos: bio e legendas do perfil, citados com atribuição. Nada foi gerado por IA. Sem preços, promoções, depoimentos, anos de casa, horários, número do imóvel ou nomes de profissionais, que não foram confirmados.

Limites da prévia: o salão não fotografou nem enviou material para esta página; unhas, makes, sobrancelhas e estética aparecem só em texto porque o perfil público não oferece foto própria utilizável desses serviços. O endereço é o da página do Canva do salão, sem número.

Antes de uma versão oficial: autorização de uso das fotos e créditos de quem fotografou, logo em alta resolução, quem atende cada serviço e qual WhatsApp usar, número do endereço, horários e validação dos textos pelo Studio 99. O monograma BL identifica esta prévia; a versão final segue o acordo de autoria.
