USE [DisplaNEW]
GO
/****** Object:  Table [dbo].[Funcion]    Script Date: 26/5/2021 17:06:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Funcion](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](200) NOT NULL,
	[idFuncionPadre] [int] NULL,
 CONSTRAINT [PK_Funciones] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[UsuarioFuncion]    Script Date: 26/5/2021 17:06:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsuarioFuncion](
	[idUsuario] [int] NOT NULL,
	[idFuncion] [int] NOT NULL,
 CONSTRAINT [PK_UsuarioFuncion] PRIMARY KEY CLUSTERED 
(
	[idUsuario] ASC,
	[idFuncion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[Funcion]  WITH CHECK ADD  CONSTRAINT [FK_Funcion_Funcion] FOREIGN KEY([idFuncionPadre])
REFERENCES [dbo].[Funcion] ([id])
GO
ALTER TABLE [dbo].[Funcion] CHECK CONSTRAINT [FK_Funcion_Funcion]
GO
ALTER TABLE [dbo].[UsuarioFuncion]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioFuncion_AspNetUsers] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[UsuarioFuncion] CHECK CONSTRAINT [FK_UsuarioFuncion_AspNetUsers]
GO
ALTER TABLE [dbo].[UsuarioFuncion]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioFuncion_Funcion] FOREIGN KEY([idFuncion])
REFERENCES [dbo].[Funcion] ([id])
GO
ALTER TABLE [dbo].[UsuarioFuncion] CHECK CONSTRAINT [FK_UsuarioFuncion_Funcion]
GO
