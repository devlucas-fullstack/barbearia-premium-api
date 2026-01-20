-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'CLIENT', 'BARBER');

-- CreateEnum
CREATE TYPE "CategoriesCourt" AS ENUM ('CUT', 'BEARD', 'CUT_BEARD', 'CUT_BEARD_EYEBROW');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('SCHEDULED', 'CONFIRMED', 'CANCELED', 'COMPLETED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'CLIENT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "category" "CategoriesCourt" NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'SCHEDULED',
    "client_id" TEXT NOT NULL,
    "barber_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "appointments_barber_id_date_key" ON "appointments"("barber_id", "date");

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_barber_id_fkey" FOREIGN KEY ("barber_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
