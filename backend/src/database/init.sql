-- Crear tabla de grupos
CREATE TABLE IF NOT EXISTS grupos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de equipos
CREATE TABLE IF NOT EXISTS equipos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(100) NOT NULL UNIQUE,
  grupo_id UUID NULL REFERENCES grupos(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de partidos
CREATE TABLE IF NOT EXISTS partidos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grupo_id UUID NOT NULL REFERENCES grupos(id),
  equipo_local_id UUID NOT NULL REFERENCES equipos(id),
  equipo_visitante_id UUID NOT NULL REFERENCES equipos(id),
  goles_local INTEGER NULL CHECK (goles_local >= 0),
  goles_visitante INTEGER NULL CHECK (goles_visitante >= 0),
  jugado BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_equipos_grupo_id ON equipos(grupo_id);
CREATE INDEX IF NOT EXISTS idx_partidos_grupo_id ON partidos(grupo_id);
CREATE INDEX IF NOT EXISTS idx_partidos_equipo_local ON partidos(equipo_local_id);
CREATE INDEX IF NOT EXISTS idx_partidos_equipo_visitante ON partidos(equipo_visitante_id);

-- Insertar grupos iniciales
INSERT INTO grupos (nombre) VALUES ('Grupo A')
ON CONFLICT (nombre) DO NOTHING;

INSERT INTO grupos (nombre) VALUES ('Grupo B')
ON CONFLICT (nombre) DO NOTHING;
