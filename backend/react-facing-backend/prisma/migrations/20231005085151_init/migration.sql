-- CreateTable
CREATE TABLE "UserNewsSettings" (
    "id" SERIAL NOT NULL,
    "source" TEXT NOT NULL,
    "regions" TEXT[],

    CONSTRAINT "UserNewsSettings_pkey" PRIMARY KEY ("id")
);
