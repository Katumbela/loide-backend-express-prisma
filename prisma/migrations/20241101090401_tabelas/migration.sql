-- CreateTable
CREATE TABLE `Aluno` (
    `cod_aluno` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `bi` VARCHAR(191) NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,
    `genero` VARCHAR(191) NOT NULL,
    `morada` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cod_aluno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Matricula` (
    `n_matricula` INTEGER NOT NULL AUTO_INCREMENT,
    `cod_curso` INTEGER NOT NULL,
    `cod_aluno` INTEGER NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `cod_periodo` INTEGER NOT NULL,

    PRIMARY KEY (`n_matricula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Propina` (
    `cod_propina` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` DOUBLE NOT NULL,
    `n_matricula` INTEGER NOT NULL,
    `cod_mes` INTEGER NOT NULL,
    `forma_pagamento` VARCHAR(191) NOT NULL,
    `alunoCod_aluno` INTEGER NULL,

    PRIMARY KEY (`cod_propina`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Periodo` (
    `cod_periodo` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cod_periodo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mes` (
    `cod_mes` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cod_mes`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curso` (
    `cod_curso` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,
    `tipo_curso` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cod_curso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Matricula` ADD CONSTRAINT `Matricula_cod_aluno_fkey` FOREIGN KEY (`cod_aluno`) REFERENCES `Aluno`(`cod_aluno`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matricula` ADD CONSTRAINT `Matricula_cod_curso_fkey` FOREIGN KEY (`cod_curso`) REFERENCES `Curso`(`cod_curso`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matricula` ADD CONSTRAINT `Matricula_cod_periodo_fkey` FOREIGN KEY (`cod_periodo`) REFERENCES `Periodo`(`cod_periodo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Propina` ADD CONSTRAINT `Propina_n_matricula_fkey` FOREIGN KEY (`n_matricula`) REFERENCES `Matricula`(`n_matricula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Propina` ADD CONSTRAINT `Propina_cod_mes_fkey` FOREIGN KEY (`cod_mes`) REFERENCES `Mes`(`cod_mes`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Propina` ADD CONSTRAINT `Propina_alunoCod_aluno_fkey` FOREIGN KEY (`alunoCod_aluno`) REFERENCES `Aluno`(`cod_aluno`) ON DELETE SET NULL ON UPDATE CASCADE;
