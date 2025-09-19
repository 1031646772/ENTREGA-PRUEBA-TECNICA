use bguju0pbfgqavbxldaor
-- Usuarios
CREATE TABLE Usuarios (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    FechaRegistro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Criptomonedas
CREATE TABLE Criptomonedas (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    CmcId VARCHAR(50) NOT NULL UNIQUE, -- ahora es UNIQUE
    Nombre VARCHAR(100) NOT NULL,
    Simbolo VARCHAR(20) NOT NULL UNIQUE,
    Slug VARCHAR(100)
);

-- Historial de precios
CREATE TABLE HistorialPrecios (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    CriptomonedaId INT NOT NULL,
    PrecioUSD DECIMAL(18, 8) NOT NULL,
    CambioPorcentual24h DECIMAL(5, 2),
    VolumenMercado BIGINT,
    FechaRegistro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (CriptomonedaId) REFERENCES Criptomonedas(Id),
    INDEX idx_CriptomonedaId (CriptomonedaId)
);

-- Favoritas de usuario
CREATE TABLE Favoritas (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Usuario_Id INT NOT NULL,
    Criptomoneda_Id INT NOT NULL,
    Fecha_Agregada DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Usuario_Id) REFERENCES Usuarios(Id),
    FOREIGN KEY (Criptomoneda_Id) REFERENCES Criptomonedas(Id),
    UNIQUE (Usuario_Id, Criptomoneda_Id)
);



