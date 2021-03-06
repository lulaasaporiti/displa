USE [DisplaNEW]
GO
/****** Object:  Table [dbo].[ComprobanteItemRecargo]    Script Date: 9/12/2020 16:24:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ComprobanteItemRecargo](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idRecargo] [int] NOT NULL,
	[idComprobanteItem] [int] NOT NULL,
	[monto] [decimal](10, 2) NOT NULL,
 CONSTRAINT [PK_ComprobanteItemRecargo] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ComprobanteItemServicio]    Script Date: 9/12/2020 16:24:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ComprobanteItemServicio](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idServicio] [int] NOT NULL,
	[idComprobanteItem] [int] NOT NULL,
	[monto] [decimal](10, 2) NOT NULL,
 CONSTRAINT [PK_ComprobanteItemServicio] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[ComprobanteItemRecargo]  WITH CHECK ADD  CONSTRAINT [FK_RecargoComprobanteItem_ComprobanteItem] FOREIGN KEY([idComprobanteItem])
REFERENCES [dbo].[ComprobanteItem] ([id])
GO
ALTER TABLE [dbo].[ComprobanteItemRecargo] CHECK CONSTRAINT [FK_RecargoComprobanteItem_ComprobanteItem]
GO
ALTER TABLE [dbo].[ComprobanteItemRecargo]  WITH CHECK ADD  CONSTRAINT [FK_RecargoComprobanteItem_RecargoLente] FOREIGN KEY([idRecargo])
REFERENCES [dbo].[RecargoLente] ([id])
GO
ALTER TABLE [dbo].[ComprobanteItemRecargo] CHECK CONSTRAINT [FK_RecargoComprobanteItem_RecargoLente]
GO
ALTER TABLE [dbo].[ComprobanteItemServicio]  WITH CHECK ADD  CONSTRAINT [FK_ComprobanteItemServicio_ComprobanteItem] FOREIGN KEY([idComprobanteItem])
REFERENCES [dbo].[ComprobanteItem] ([id])
GO
ALTER TABLE [dbo].[ComprobanteItemServicio] CHECK CONSTRAINT [FK_ComprobanteItemServicio_ComprobanteItem]
GO
ALTER TABLE [dbo].[ComprobanteItemServicio]  WITH CHECK ADD  CONSTRAINT [FK_ComprobanteItemServicio_Servicio] FOREIGN KEY([idServicio])
REFERENCES [dbo].[Servicio] ([id])
GO
ALTER TABLE [dbo].[ComprobanteItemServicio] CHECK CONSTRAINT [FK_ComprobanteItemServicio_Servicio]
GO
