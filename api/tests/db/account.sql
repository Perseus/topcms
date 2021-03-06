USE [AccountServer]
GO
/****** Object:  Table [dbo].[account_charge]    Script Date: 10/9/2016 5:56:04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[account_charge](
	[id] [int] NOT NULL,
	[charge_flag] [int] NULL,
	[charge_begin_tick] [int] NULL,
	[charge_end_tick] [int] NULL,
	[saves] [int] NULL,
 CONSTRAINT [PK_account_charge] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[account_invt]    Script Date: 10/9/2016 5:56:04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[account_invt](
	[inv_id] [int] IDENTITY(1,1) NOT NULL,
	[invt_code] [varchar](50) NOT NULL,
	[assignto] [varchar](50) NULL,
	[used] [int] NOT NULL,
 CONSTRAINT [PK_account_invt] PRIMARY KEY CLUSTERED 
(
	[inv_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[account_login]    Script Date: 10/9/2016 5:56:04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[account_login](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NULL,
	[password] [varchar](50) NULL,
	[originalPassword] [varchar](50) NULL,
	[sid] [int] NOT NULL CONSTRAINT [DF_account_login_sid]  DEFAULT ((0)),
	[login_status] [int] NULL CONSTRAINT [DF_account_login_login_status]  DEFAULT ((0)),
	[enable_login_tick] [bigint] NULL CONSTRAINT [DF_account_login_enable_login_tick]  DEFAULT ((0)),
	[login_group] [varchar](50) NULL,
	[last_login_time] [datetime] NULL CONSTRAINT [DF_account_login_last_login_time]  DEFAULT (getdate()),
	[last_logout_time] [datetime] NULL CONSTRAINT [DF_account_login_last_logout_time]  DEFAULT (getdate()),
	[last_login_ip] [varchar](50) NULL,
	[enable_login_time] [datetime] NULL CONSTRAINT [DF_account_login_enable_login_time]  DEFAULT ('2001-1-1 1:1:1'),
	[total_live_time] [bigint] NOT NULL CONSTRAINT [DF_account_login_total_live_time]  DEFAULT ((0)),
	[last_login_mac] [varchar](50) NULL,
	[ban] [int] NULL,
	[email] [varchar](50) NULL,
	[forgot_code] [varchar](max) NULL,
	[vip] [int] NULL,
	[vote_1] [varchar](50) NULL CONSTRAINT [DF_account_login_vote_1]  DEFAULT ((0)),
	[vote_2] [varchar](50) NULL CONSTRAINT [DF_account_login_vote_2]  DEFAULT ((0)),
	[vote_3] [varchar](50) NULL CONSTRAINT [DF_account_login_vote_3]  DEFAULT ((0)),
 CONSTRAINT [PK_account_login] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[account_pending]    Script Date: 10/9/2016 5:56:04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[account_pending](
	[acc_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[password] [varchar](50) NOT NULL,
	[squestion] [varchar](100) NOT NULL,
	[answer] [varchar](100) NOT NULL,
	[email] [varchar](100) NOT NULL,
	[gender] [int] NOT NULL,
	[credit] [int] NULL,
	[truename] [varchar](100) NOT NULL,
	[birthday] [datetime] NOT NULL,
	[contact] [varchar](50) NOT NULL,
	[country] [varchar](50) NOT NULL,
	[ipaddr] [varchar](50) NOT NULL,
	[ip2country] [varchar](50) NOT NULL,
	[actcode] [varchar](50) NULL,
	[invtcode] [varchar](50) NULL,
	[create_time] [varchar](50) NOT NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[act_album]    Script Date: 10/9/2016 5:56:04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[act_album](
	[act_id] [int] NULL,
	[act_name] [nvarchar](max) NOT NULL,
	[SessionKey] [nvarchar](max) NULL,
	[create_time] [time](7) NULL,
	[update_time] [time](7) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[downloads]    Script Date: 10/9/2016 5:56:04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[downloads](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [varchar](50) NULL,
	[type] [varchar](50) NULL,
	[url] [varchar](max) NULL,
	[author] [varchar](50) NULL,
	[timestamp] [datetime] NULL,
 CONSTRAINT [PK_downloads] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[GameDBServerList]    Script Date: 10/9/2016 5:56:04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[GameDBServerList](
	[server_section] [int] NOT NULL,
	[server_ip] [nvarchar](128) NOT NULL,
	[server_uid] [nvarchar](128) NOT NULL,
	[server_pwd] [nvarchar](128) NOT NULL,
	[server_db] [nvarchar](128) NOT NULL,
	[server_name] [varchar](50) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[LogRandomAccount]    Script Date: 10/9/2016 5:56:04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[LogRandomAccount](
	[accountName] [varchar](50) NOT NULL,
	[addDate] [datetime] NULL,
	[expireDate] [datetime] NULL,
	[ip] [varchar](15) NULL,
	[plainPassword] [varchar](32) NULL,
 CONSTRAINT [PK_LogRandomAccount] PRIMARY KEY CLUSTERED 
(
	[accountName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[news]    Script Date: 10/9/2016 5:56:04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[news](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[title] [varchar](50) NULL,
	[type] [varchar](50) NULL,
	[text] [text] NULL,
	[author] [varchar](50) NULL,
	[timestamp] [datetime] NOT NULL,
 CONSTRAINT [PK_news] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[safety]    Script Date: 10/9/2016 5:56:04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[safety](
	[aid] [bigint] IDENTITY(1,1) NOT NULL,
	[allowIP] [varchar](32) NOT NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TradeRecord]    Script Date: 10/9/2016 5:56:04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TradeRecord](
	[record_id] [nvarchar](50) NOT NULL,
	[record_message] [int] NOT NULL,
	[record_section] [int] NOT NULL,
	[record_info] [nvarchar](4000) NOT NULL,
	[record_time] [datetime] NOT NULL,
	[ret_info] [nvarchar](4000) NOT NULL,
	[ret_time] [datetime] NOT NULL,
	[state] [int] NOT NULL,
	[flow_id] [nvarchar](50) NULL,
	[production_id] [nvarchar](50) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[user_log]    Script Date: 10/9/2016 5:56:04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[user_log](
	[log_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[user_name] [varchar](50) NOT NULL,
	[login_time] [datetime] NULL,
	[logout_time] [datetime] NULL,
	[login_ip] [varchar](20) NULL,
 CONSTRAINT [PK_user_log] PRIMARY KEY CLUSTERED 
(
	[log_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[UserAccountLogin]    Script Date: 10/9/2016 5:56:04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserAccountLogin](
	[Date] [datetime] NULL,
	[AllAccount] [int] NULL,
	[ActionAccount] [int] NULL
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[account_invt] ADD  CONSTRAINT [DF_account_invt_used]  DEFAULT ((0)) FOR [used]
GO
ALTER TABLE [dbo].[account_pending] ADD  CONSTRAINT [DF_account_pending_gender]  DEFAULT ((0)) FOR [gender]
GO
ALTER TABLE [dbo].[GameDBServerList] ADD  CONSTRAINT [DF_GameDBServerList_server_name]  DEFAULT ('') FOR [server_name]
GO
