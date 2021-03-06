USE [DisplaNEW]
GO
/****** Object:  Table [dbo].[ComprobanteProveedor]    Script Date: 28/6/2021 16:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ComprobanteProveedor](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[fecha] [datetime] NOT NULL,
	[fechaImputacion] [datetime] NOT NULL,
	[idProveedor] [int] NULL,
	[idGasto] [int] NOT NULL,
	[sucursal] [int] NOT NULL,
	[numero] [int] NOT NULL,
	[clase] [char](1) NOT NULL,
	[monto] [decimal](10, 2) NULL,
	[idTipoComprobante] [int] NOT NULL,
	[sobreTasaIVA] [decimal](10, 2) NULL,
	[montoAdeudado] [decimal](10, 2) NULL,
	[fechaBorrado] [datetime] NULL,
	[motivoBorrado] [nvarchar](100) NULL,
	[mesTarjeta] [int] NULL,
	[anioTarjeta] [int] NULL,
	[idTarjeta] [int] NULL,
	[pendienteDePago] [bit] NULL,
	[cotizacionDolar] [decimal](10, 2) NULL,
	[montoDolar] [decimal](10, 2) NULL,
	[gastoTransferencia] [decimal](10, 2) NULL,
	[gastoBanco] [decimal](10, 2) NULL,
	[conceptosNoGravados] [decimal](10, 2) NULL,
	[retencionGanancias] [decimal](10, 2) NULL,
	[retencionIVA] [decimal](10, 2) NULL,
	[PIB] [decimal](10, 2) NULL,
	[TSEH] [decimal](10, 2) NULL,
 CONSTRAINT [PK_ComprobanteProveedor] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[ComprobanteProveedor]  WITH CHECK ADD  CONSTRAINT [FK_ComprobanteProveedor_Gasto] FOREIGN KEY([idGasto])
REFERENCES [dbo].[Gasto] ([id])
GO
ALTER TABLE [dbo].[ComprobanteProveedor] CHECK CONSTRAINT [FK_ComprobanteProveedor_Gasto]
GO
ALTER TABLE [dbo].[ComprobanteProveedor]  WITH CHECK ADD  CONSTRAINT [FK_ComprobanteProveedor_Proveedor] FOREIGN KEY([idProveedor])
REFERENCES [dbo].[Proveedor] ([id])
GO
ALTER TABLE [dbo].[ComprobanteProveedor] CHECK CONSTRAINT [FK_ComprobanteProveedor_Proveedor]
GO
ALTER TABLE [dbo].[ComprobanteProveedor]  WITH CHECK ADD  CONSTRAINT [FK_ComprobanteProveedor_TarjetaCredito] FOREIGN KEY([idTarjeta])
REFERENCES [dbo].[TarjetaCredito] ([id])
GO
ALTER TABLE [dbo].[ComprobanteProveedor] CHECK CONSTRAINT [FK_ComprobanteProveedor_TarjetaCredito]
GO
ALTER TABLE [dbo].[ComprobanteProveedor]  WITH CHECK ADD  CONSTRAINT [FK_ComprobanteProveedor_TipoComprobante] FOREIGN KEY([idTipoComprobante])
REFERENCES [dbo].[TipoComprobante] ([id])
GO
ALTER TABLE [dbo].[ComprobanteProveedor] CHECK CONSTRAINT [FK_ComprobanteProveedor_TipoComprobante]
GO
