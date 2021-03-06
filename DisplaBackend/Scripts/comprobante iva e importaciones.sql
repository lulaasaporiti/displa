USE [DisplaNEW]
GO
/****** Object:  Table [dbo].[ComprobanteImportacion]    Script Date: 28/6/2021 15:53:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ComprobanteImportacion](
	[id] [int] NOT NULL,
	[idComprobanteProveedor] [int] NOT NULL,
	[despacho] [nvarchar](50) NOT NULL,
	[cotizacionDolar] [decimal](10, 2) NOT NULL,
 CONSTRAINT [PK_ComprobanteImportacion] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ComprobanteIVA]    Script Date: 28/6/2021 15:53:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ComprobanteIVA](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idComprobanteProveedor] [int] NOT NULL,
	[alicuota] [decimal](3, 1) NOT NULL,
	[montoIVA] [decimal](10, 2) NOT NULL,
	[neto] [decimal](10, 2) NOT NULL,
 CONSTRAINT [PK_ComprobantesIVA] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[ComprobanteImportacion]  WITH CHECK ADD  CONSTRAINT [FK_ComprobanteImportacion_ComprobanteProveedor] FOREIGN KEY([idComprobanteProveedor])
REFERENCES [dbo].[ComprobanteProveedor] ([id])
GO
ALTER TABLE [dbo].[ComprobanteImportacion] CHECK CONSTRAINT [FK_ComprobanteImportacion_ComprobanteProveedor]
GO
ALTER TABLE [dbo].[ComprobanteIVA]  WITH CHECK ADD  CONSTRAINT [FK_ComprobantesIVA_ComprobanteProveedor] FOREIGN KEY([idComprobanteProveedor])
REFERENCES [dbo].[ComprobanteProveedor] ([id])
GO
ALTER TABLE [dbo].[ComprobanteIVA] CHECK CONSTRAINT [FK_ComprobantesIVA_ComprobanteProveedor]
GO
