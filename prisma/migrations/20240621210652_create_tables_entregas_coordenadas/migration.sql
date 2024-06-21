-- CreateTable
CREATE TABLE "Coordenadas" (
    "id" SERIAL NOT NULL,
    "lat" VARCHAR NOT NULL,
    "long" VARCHAR NOT NULL,

    CONSTRAINT "Coordenadas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entregas" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR NOT NULL,
    "data" DATE NOT NULL,
    "partida" INTEGER NOT NULL,
    "destino" INTEGER NOT NULL,

    CONSTRAINT "Entregas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Entregas" ADD CONSTRAINT "Entregas_partida_fkey" FOREIGN KEY ("partida") REFERENCES "Coordenadas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entregas" ADD CONSTRAINT "Entregas_destino_fkey" FOREIGN KEY ("destino") REFERENCES "Coordenadas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
