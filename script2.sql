USE [DisplaNEW]
GO
/****** Object:  Table [dbo].[VentaVirtual]    Script Date: 22/9/2020 15:30:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VentaVirtual](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[cantidadVendida] [decimal](6, 2) NOT NULL,
	[cantidadEntregada] [decimal](6, 2) NOT NULL,
	[idComprobante] [int] NOT NULL,
	[idArticulo] [int] NULL,
	[idLente] [int] NULL,
 CONSTRAINT [PK_VentaVirtual] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[VentaVirtual] ON 

INSERT [dbo].[VentaVirtual] ([id], [cantidadVendida], [cantidadEntregada], [idComprobante], [idArticulo], [idLente]) VALUES (1, CAST(100.00 AS Decimal(6, 2)), CAST(0.00 AS Decimal(6, 2)), 9853, 1, NULL)
SET IDENTITY_INSERT [dbo].[VentaVirtual] OFF
ALTER TABLE [dbo].[VentaVirtual] ADD  CONSTRAINT [DF_VentaVirtual_cantidadEntregada]  DEFAULT ((0)) FOR [cantidadEntregada]
GO
ALTER TABLE [dbo].[VentaVirtual]  WITH CHECK ADD  CONSTRAINT [FK_VentaVirtual_ArticuloVario] FOREIGN KEY([idArticulo])
REFERENCES [dbo].[ArticuloVario] ([id])
GO
ALTER TABLE [dbo].[VentaVirtual] CHECK CONSTRAINT [FK_VentaVirtual_ArticuloVario]
GO
ALTER TABLE [dbo].[VentaVirtual]  WITH CHECK ADD  CONSTRAINT [FK_VentaVirtual_ComprobanteCliente] FOREIGN KEY([idComprobante])
REFERENCES [dbo].[ComprobanteCliente] ([id])
GO
ALTER TABLE [dbo].[VentaVirtual] CHECK CONSTRAINT [FK_VentaVirtual_ComprobanteCliente]
GO
ALTER TABLE [dbo].[VentaVirtual]  WITH CHECK ADD  CONSTRAINT [FK_VentaVirtual_Lente] FOREIGN KEY([idLente])
REFERENCES [dbo].[Lente] ([id])
GO
ALTER TABLE [dbo].[VentaVirtual] CHECK CONSTRAINT [FK_VentaVirtual_Lente]
GO
