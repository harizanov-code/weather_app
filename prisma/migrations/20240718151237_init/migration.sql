-- CreateTable
CREATE TABLE "WeatherCard" (
    "id" SERIAL NOT NULL,
    "cardName" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "temp" TEXT NOT NULL,
    "main" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "WeatherCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WeatherCard_cardName_key" ON "WeatherCard"("cardName");

-- CreateIndex
CREATE UNIQUE INDEX "WeatherCard_userId_key" ON "WeatherCard"("userId");

-- CreateIndex
CREATE INDEX "unique_user_weathercard_idx" ON "WeatherCard"("userId");

-- AddForeignKey
ALTER TABLE "WeatherCard" ADD CONSTRAINT "WeatherCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
