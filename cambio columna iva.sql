USE [DisplaNEW]
GO
ALTER TABLE TipoArticulo
  ADD IVA decimal(4, 2) NULL;
  
ALTER TABLE Lente
  ADD IVA decimal(4, 2) NULL;