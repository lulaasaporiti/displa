USE [DisplaNEW]
GO
/****** Object:  Table [dbo].[MovimientoCaja]    Script Date: 30/3/2021 15:31:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MovimientoCaja](
	[id] [int] NOT NULL,
	[fecha] [date] NOT NULL,
	[descripcion] [nvarchar](200) NOT NULL,
	[monto] [decimal](10, 2) NOT NULL,
	[entrada] [bit] NOT NULL,
	[idRecibo] [int] NULL,
	[idReciboProveedor] [int] NULL,
	[fechaAnulado] [date] NULL,
	[efectivo] [bit] NOT NULL
) ON [PRIMARY]

GO
