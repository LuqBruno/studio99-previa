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

O hero é uma foto grande do estúdio (a mesma do site do salão no Canva): em tela cheia no celular e ocupando mais da metade da tela no computador. Logo abaixo, a cartela de tons: um leque de seis amostras de cabelo que se abre com a rolagem, no computador e no celular. Tocar numa amostra a destaca e entra na mensagem do botão "Quero um tom assim"; no celular também dá para arrastar para o lado (limiar de 40 px, a rolagem vertical segue nativa). Com `prefers-reduced-motion` ou sem JavaScript, o leque aparece aberto e estático e todos os botões continuam funcionando.

Nenhum formulário: todos os botões abrem o WhatsApp da bio, (48) 99622-7668, com mensagem pronta citando o serviço. Nada é enviado, reservado ou armazenado pela página.

Presets de `shared/motion-library` usados: `fan` (cartela), `curtain` (máscara das fotos), `line-mask` (títulos), `accordion` (serviços), `press` e `magnetic` (CTA, ponteiro fino), `image-zoom` (hero e galeria).

## Fontes e limites

Fotos: a do hero vem do site do salão no Canva (espacomkt.my.canva.site, consultado em 25/11/2026); as demais, das publicações DZ0NXp1ItkD, DZ0MvheIAE0, DZ0N58HIsgL, DZ0MShgoPLK e DZ8hUETlLFT do perfil, em derivados recortados. Textos: bio e legendas do perfil, citados com atribuição. Nada foi gerado por IA. Sem preços, promoções, depoimentos, anos de casa, horários, número do imóvel ou nomes de profissionais, que não foram confirmados.

Limites da prévia: o salão não fotografou nem enviou material para esta página; unhas, makes, sobrancelhas e estética aparecem só em texto porque o perfil público não oferece foto própria utilizável desses serviços. O endereço é o da página do Canva do salão, sem número.

Antes de uma versão oficial: autorização de uso das fotos e créditos de quem fotografou, logo em alta resolução, quem atende cada serviço e qual WhatsApp usar, número do endereço, horários e validação dos textos pelo Studio 99. O monograma BL identifica esta prévia; a versão final segue o acordo de autoria.
