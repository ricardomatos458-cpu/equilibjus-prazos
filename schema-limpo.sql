CREATE TABLE IF NOT EXISTS prazos (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente    text        NOT NULL,
  processo   text        NOT NULL,
  sistema    text,
  instancia  text,
  tipo       text,
  vencimento date,
  login      text,
  nivel      text,          -- null = automatico por data | 'aguardando' = override manual
  concluido  boolean     NOT NULL DEFAULT false,
  criado_em  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_prazos_vencimento ON prazos (vencimento ASC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_prazos_login      ON prazos (login);
CREATE INDEX IF NOT EXISTS idx_prazos_concluido  ON prazos (concluido);

ALTER TABLE prazos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_select" ON prazos
  FOR SELECT TO anon USING (true);

CREATE POLICY "anon_insert" ON prazos
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "anon_update" ON prazos
  FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- DELETE nao e usado pelo app (soft delete via concluido=true),
-- mas a politica abaixo pode ser habilitada se necessario
-- CREATE POLICY "anon_delete" ON prazos
--   FOR DELETE TO anon USING (true);

/*
INSERT INTO prazos (cliente, processo, sistema, instancia, tipo, vencimento, login, nivel) VALUES
  ('Empresa Alpha Ltda',   '1234567-89.2024.8.26.0100', 'PJe',   '1 Instancia', 'Contestacao',  current_date - 1, 'Ricardo', null),
  ('Joao Silva',           '9876543-21.2024.8.26.0200', 'e-SAJ', '2 Instancia', 'Recurso',      current_date + 1, 'Athos',   null),
  ('Construtora Beta S/A', '1111111-11.2024.8.26.0050', 'EPROC', 'TJ / TRF',    'Manifestacao', current_date + 4, 'Romulo',  null),
  ('Maria Oliveira',       '2222222-22.2024.8.26.0300', 'PJe',   '1 Instancia', 'Peticao',      current_date + 10,'Ricardo', null),
  ('Industrias Gama',      '3333333-33.2024.8.26.0400', 'PJe',   'STJ',         'Memoriais',    null,             'Athos',   'aguardando');
*/
