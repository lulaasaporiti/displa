USE [DisplaNEW]
GO
/****** Object:  Table [dbo].[ClienteBloqueo]    Script Date: 1/7/2020 16:09:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClienteBloqueo](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idCliente] [int] NOT NULL,
	[motivo] [nvarchar](500) NOT NULL,
	[fecha] [date] NOT NULL,
 CONSTRAINT [PK_ClienteBloqueo] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[ClienteBloqueo]  WITH CHECK ADD  CONSTRAINT [FK_ClienteBloqueo_Cliente] FOREIGN KEY([idCliente])
REFERENCES [dbo].[Cliente] ([id])
GO
ALTER TABLE [dbo].[ClienteBloqueo] CHECK CONSTRAINT [FK_ClienteBloqueo_Cliente]
GO
