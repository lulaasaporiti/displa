USE [DisplaNEW]
GO
/****** Object:  Table [dbo].[Sobre]    Script Date: 5/12/2020 11:59:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sobre](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[numero] [int] NOT NULL,
	[entregas] [int] NOT NULL,
	[observaciones] [nvarchar](250) NULL,
	[fecha] [date] NOT NULL,
	[idCliente] [int] NOT NULL,
	[idUsuario] [int] NOT NULL,
 CONSTRAINT [PK_Sobre] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[Sobre]  WITH CHECK ADD  CONSTRAINT [FK_Sobre_AspNetUsers] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[Sobre] CHECK CONSTRAINT [FK_Sobre_AspNetUsers]
GO
ALTER TABLE [dbo].[Sobre]  WITH CHECK ADD  CONSTRAINT [FK_Sobre_Cliente] FOREIGN KEY([idCliente])
REFERENCES [dbo].[Cliente] ([id])
GO
ALTER TABLE [dbo].[Sobre] CHECK CONSTRAINT [FK_Sobre_Cliente]
GO
