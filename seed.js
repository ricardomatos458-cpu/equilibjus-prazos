const SUPABASE_URL      = 'https://nuelqfvnjacnbctodreg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_rlgOc-_O890oEgzVjInQZg_ep4fmqbO';

const prazos = [
  { cliente: 'GESSO INTEGRAL LTDA',                   processo: '0001290-74.2025.8.27.2741', sistema: 'eproc TJTO', instancia: '1ª', tipo: 'Intimação eletrônica',                  vencimento: '2026-04-16', login: 'Ricardo',        nivel: 'aguardando', concluido: false },
  { cliente: 'E P S BOTELHO LTDA',                    processo: '1002248-44.2026.4.01.4300', sistema: 'PJE1 TRF1',  instancia: '1ª', tipo: 'Intimação SJTO',                         vencimento: '2026-04-17', login: 'Ricardo',        nivel: 'aguardando', concluido: false },
  { cliente: 'ENEZILDO DE SÁ E SILVA',                processo: '0000879-82.2025.8.27.2724', sistema: 'eproc TJTO', instancia: '1ª', tipo: 'Intimação Ação Penal',                   vencimento: '2026-04-21', login: 'Ricardo',        nivel: 'aguardando', concluido: false },
  { cliente: 'F P DA COSTA DISTRIBUIDORA',            processo: '1008588-77.2021.4.01.4300', sistema: 'PJE2 TRF1',  instancia: '2ª', tipo: 'Intimação IRPJ',                         vencimento: '2026-04-22', login: 'Athos e Rômulo', nivel: 'aguardando', concluido: false },
  { cliente: 'LT TEMPONI COM ATAC DE PECAS',          processo: '1003127-21.2025.4.01.3901', sistema: 'PJE1 TRF1',  instancia: '1ª', tipo: 'Intimação Marabá-PA',                    vencimento: '2026-04-23', login: 'Athos',          nivel: 'aguardando', concluido: false },
  { cliente: 'PEDRO PAULO ANDRADE TANNUS',            processo: '0000517-03.2026.8.27.2706', sistema: 'eproc TJTO', instancia: '1ª', tipo: 'Despacho Decisão',                       vencimento: '2026-04-27', login: 'Ricardo',        nivel: 'aguardando', concluido: false },
  { cliente: 'L.G.R. REPRESENTAÇÕES DE MÓVEIS',       processo: '0006453-43.2025.8.27.2706', sistema: 'eproc TJTO', instancia: '1ª', tipo: 'Intimação Execução Fiscal',              vencimento: '2026-04-27', login: 'Ricardo',        nivel: 'aguardando', concluido: false },
  { cliente: 'E. DE SA E SILVA',                      processo: '0000666-90.2023.8.27.2742', sistema: 'eproc TJTO', instancia: '1ª', tipo: 'Intimação Exec Título Extrajudicial',    vencimento: '2026-04-29', login: 'Ricardo',        nivel: 'aguardando', concluido: false },
  { cliente: 'GHELLER E BRUM LTDA',                   processo: '1004721-42.2022.4.01.4300', sistema: 'PJE2 TRF1',  instancia: '2ª', tipo: 'Intimação Cofins',                       vencimento: '2026-05-05', login: 'Athos e Rômulo', nivel: 'aguardando', concluido: false },
  { cliente: 'J B B PORTILHO EPP',                    processo: '1006239-30.2023.4.01.4301', sistema: 'PJE1 TRF1',  instancia: '1ª', tipo: 'Intimação Nulidade ato adm',             vencimento: '2026-05-07', login: 'Athos e Rômulo', nivel: 'aguardando', concluido: false },
  { cliente: 'OMS DISTRIBUICAO LTDA',                 processo: '1005015-55.2026.4.01.4300', sistema: 'PJE1 TRF1',  instancia: '1ª', tipo: 'Decisão Cofins SJTO',                    vencimento: '2026-05-08', login: 'Todos',          nivel: 'aguardando', concluido: false },
  { cliente: 'DNT COMERCIO DE ARTIGOS INFORMATICA',   processo: '1012510-24.2024.4.01.4300', sistema: 'PJE2 TRF1',  instancia: '2ª', tipo: 'Intimação Parcelamento tributário',      vencimento: '2026-05-11', login: 'Athos e Rômulo', nivel: 'aguardando', concluido: false },
  { cliente: 'L.G.R. REPRESENTAÇÕES DE MÓVEIS',       processo: '0008083-81.2018.8.27.2706', sistema: 'eproc TJTO', instancia: '1ª', tipo: 'Intimação Sentença Exec Fiscal',         vencimento: null,         login: 'Ricardo',        nivel: 'aguardando', concluido: false },
];

async function seed() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/prazos`, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'apikey':        SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer':        'return=representation',
    },
    body: JSON.stringify(prazos),
  });

  const body = await res.json();

  if (!res.ok) {
    console.error('Erro:', res.status, JSON.stringify(body, null, 2));
    process.exit(1);
  }

  console.log(`${body.length} prazos inseridos com sucesso.`);
  body.forEach((p, i) => console.log(`  ${i + 1}. [${p.id}] ${p.cliente}`));
}

seed().catch(e => { console.error(e); process.exit(1); });
