USE [GameDB]
GO
/****** Object:  Table [dbo].[account]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[account](
	[act_id] [int] NOT NULL,
	[act_name] [varchar](50) NOT NULL CONSTRAINT [DF_account_act_name]  DEFAULT (''),
	[gm] [tinyint] NOT NULL CONSTRAINT [DF_account_gm]  DEFAULT (0),
	[cha_ids] [varchar](80) NOT NULL CONSTRAINT [DF_account_cha_ids]  DEFAULT (''),
	[last_ip] [varchar](16) NOT NULL CONSTRAINT [DF_account_last_ip]  DEFAULT (''),
	[disc_reason] [varchar](128) NOT NULL CONSTRAINT [DF_account_disc_reson]  DEFAULT (''),
	[last_leave] [datetime] NOT NULL CONSTRAINT [DF_account_last_leave]  DEFAULT ('2001-01-01'),
	[password] [varchar](50) NULL,
	[merge_state] [int] NOT NULL CONSTRAINT [DF_account_merge_state]  DEFAULT (0),
 CONSTRAINT [PK_account] PRIMARY KEY CLUSTERED 
(
	[act_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[AmphitheaterSetting]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AmphitheaterSetting](
	[section] [smallint] NOT NULL,
	[season] [smallint] NOT NULL,
	[round] [smallint] NOT NULL,
	[state] [smallint] NOT NULL,
	[createdate] [datetime] NOT NULL,
	[updatetime] [datetime] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AmphitheaterTeam]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AmphitheaterTeam](
	[id] [int] NOT NULL,
	[captain] [int] NULL,
	[member] [nvarchar](50) NULL,
	[matchno] [int] NOT NULL,
	[state] [smallint] NOT NULL,
	[map] [smallint] NULL,
	[mapflag] [int] NULL,
	[winnum] [smallint] NOT NULL,
	[losenum] [smallint] NOT NULL,
	[relivenum] [smallint] NOT NULL,
	[createdate] [datetime] NULL,
	[updatetime] [datetime] NOT NULL,
 CONSTRAINT [PK_AmphitheaterTeam] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[birth_tab]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[birth_tab](
	[birth_name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_birth_tab] PRIMARY KEY CLUSTERED 
(
	[birth_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[boat]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[boat](
	[boat_id] [int] IDENTITY(1,1) NOT NULL,
	[boat_berth] [smallint] NOT NULL,
	[boat_name] [char](17) NOT NULL,
	[boat_boatid] [int] NOT NULL,
	[boat_header] [int] NOT NULL,
	[boat_body] [int] NOT NULL,
	[boat_engine] [int] NOT NULL,
	[boat_cannon] [int] NOT NULL,
	[boat_equipment] [int] NOT NULL,
	[boat_bagsize] [smallint] NOT NULL,
	[boat_bag] [char](7000) NOT NULL,
	[boat_diecount] [smallint] NOT NULL,
	[boat_isdead] [char](1) NOT NULL,
	[cur_endure] [int] NOT NULL,
	[mx_endure] [int] NOT NULL,
	[cur_supply] [int] NOT NULL,
	[mx_supply] [int] NOT NULL,
	[skill_state] [char](400) NOT NULL,
	[boat_ownerid] [int] NOT NULL,
	[boat_createtime] [char](50) NOT NULL,
	[boat_isdeleted] [char](1) NOT NULL,
	[map] [char](50) NOT NULL,
	[map_x] [int] NOT NULL,
	[map_y] [int] NOT NULL,
	[angle] [int] NOT NULL,
	[degree] [smallint] NOT NULL,
	[exp] [int] NOT NULL,
	[version] [smallint] NOT NULL,
 CONSTRAINT [PK_boat] PRIMARY KEY CLUSTERED 
(
	[boat_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ChaGD]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ChaGD](
	[Date] [datetime] NULL,
	[AllGd] [bigint] NULL,
	[Name] [varchar](32) NULL,
	[ChaGd] [int] NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[character]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[character](
	[cha_id] [int] IDENTITY(1,1) NOT NULL,
	[cha_name] [varchar](50) NOT NULL,
	[motto] [varchar](50) NOT NULL CONSTRAINT [DF_character_motto]  DEFAULT (''),
	[icon] [smallint] NOT NULL CONSTRAINT [DF_character_icon]  DEFAULT (1),
	[version] [smallint] NOT NULL CONSTRAINT [DF_character_version]  DEFAULT (1),
	[pk_ctrl] [tinyint] NOT NULL CONSTRAINT [DF_character_pk_ctrl_1]  DEFAULT (0),
	[mem_addr] [int] NOT NULL CONSTRAINT [DF_character_mem_addr]  DEFAULT (0),
	[act_id] [int] NOT NULL,
	[guild_id] [int] NOT NULL CONSTRAINT [DF_character_guild_id]  DEFAULT (0),
	[guild_stat] [tinyint] NOT NULL CONSTRAINT [DF_character_guild_stat]  DEFAULT (0),
	[guild_permission] [smallint] NOT NULL CONSTRAINT [DF_character_guild_permission]  DEFAULT (0),
	[job] [varchar](50) NOT NULL CONSTRAINT [DF_character_job]  DEFAULT ('新手'),
	[degree] [smallint] NOT NULL CONSTRAINT [DF_character_degree]  DEFAULT (0),
	[exp] [bigint] NOT NULL CONSTRAINT [DF_character_exp]  DEFAULT (0),
	[hp] [int] NOT NULL CONSTRAINT [DF_character_hp]  DEFAULT ((-1)),
	[sp] [int] NOT NULL CONSTRAINT [DF_character_sp]  DEFAULT ((-1)),
	[ap] [int] NOT NULL CONSTRAINT [DF_character_ap]  DEFAULT (0),
	[tp] [int] NOT NULL CONSTRAINT [DF_character_tp]  DEFAULT (0),
	[gd] [int] NOT NULL CONSTRAINT [DF_character_gd]  DEFAULT (10000),
	[str] [int] NOT NULL CONSTRAINT [DF_character_str]  DEFAULT (0),
	[dex] [int] NOT NULL CONSTRAINT [DF_character_dex]  DEFAULT (0),
	[agi] [int] NOT NULL CONSTRAINT [DF_character_agi]  DEFAULT (0),
	[con] [int] NOT NULL CONSTRAINT [DF_character_con]  DEFAULT (0),
	[sta] [int] NOT NULL CONSTRAINT [DF_character_sta]  DEFAULT (0),
	[luk] [int] NOT NULL CONSTRAINT [DF_character_luk]  DEFAULT (0),
	[sail_lv] [int] NOT NULL CONSTRAINT [DF_character_sail_lv]  DEFAULT (1),
	[sail_exp] [int] NOT NULL CONSTRAINT [DF_character_sail_exp]  DEFAULT (0),
	[sail_left_exp] [int] NOT NULL CONSTRAINT [DF_character_sail_left_exp]  DEFAULT (0),
	[live_lv] [int] NOT NULL CONSTRAINT [DF_character_live_lv]  DEFAULT (1),
	[live_exp] [int] NOT NULL CONSTRAINT [DF_character_live_exp]  DEFAULT (0),
	[map] [varchar](50) NOT NULL CONSTRAINT [DF_character_map]  DEFAULT (''),
	[map_x] [int] NOT NULL CONSTRAINT [DF_character_map_x]  DEFAULT ((-1)),
	[map_y] [int] NOT NULL CONSTRAINT [DF_character_map_y]  DEFAULT ((-1)),
	[radius] [int] NOT NULL CONSTRAINT [DF_character_radius]  DEFAULT (0),
	[angle] [int] NOT NULL CONSTRAINT [DF_character_angle]  DEFAULT (0),
	[look] [varchar](2000) NOT NULL CONSTRAINT [DF_character_look]  DEFAULT (''),
	[kb_capacity] [int] NOT NULL CONSTRAINT [DF_character_kb_capacity]  DEFAULT (24),
	[kitbag] [varchar](7000) NOT NULL CONSTRAINT [DF_character_kitbag]  DEFAULT (''),
	[skillbag] [varchar](1200) NOT NULL CONSTRAINT [DF_character_skillbag]  DEFAULT (''),
	[shortcut] [varchar](1200) NOT NULL CONSTRAINT [DF_character_shortcut_1]  DEFAULT (''),
	[mission] [varchar](2048) NOT NULL CONSTRAINT [DF_character_mission]  DEFAULT (''),
	[misrecord] [varchar](2048) NOT NULL CONSTRAINT [DF_character_misrecord]  DEFAULT (''),
	[mistrigger] [varchar](2048) NOT NULL CONSTRAINT [DF_character_trigger]  DEFAULT (''),
	[miscount] [varchar](512) NOT NULL CONSTRAINT [DF_character_miscount]  DEFAULT (''),
	[birth] [varchar](50) NOT NULL CONSTRAINT [DF_character_birth]  DEFAULT ('白银城'),
	[login_cha] [varchar](50) NOT NULL CONSTRAINT [DF_character_login_cha]  DEFAULT (0),
	[live_tp] [int] NOT NULL CONSTRAINT [DF_character_live_tp]  DEFAULT (0),
	[map_mask] [varchar](8000) NOT NULL CONSTRAINT [DF_character_map_mask]  DEFAULT (0),
	[delflag] [tinyint] NOT NULL CONSTRAINT [DF_character_delflag]  DEFAULT (0),
	[operdate] [datetime] NOT NULL CONSTRAINT [DF_character_operdate]  DEFAULT (getdate()),
	[deldate] [datetime] NULL,
	[main_map] [varchar](50) NOT NULL CONSTRAINT [DF_character_main_map]  DEFAULT (''),
	[skill_state] [varchar](1024) NOT NULL CONSTRAINT [DF_character_skill_state]  DEFAULT (''),
	[bank] [varchar](50) NOT NULL CONSTRAINT [DF_character_bank]  DEFAULT (''),
	[estop] [datetime] NOT NULL CONSTRAINT [DF_character_estop]  DEFAULT (getdate()),
	[estoptime] [int] NOT NULL CONSTRAINT [DF_character_estoptime]  DEFAULT (0),
	[kb_locked] [int] NOT NULL CONSTRAINT [DF_character_kb_locked]  DEFAULT (0),
	[kitbag_tmp] [int] NOT NULL CONSTRAINT [DF_character_kitbag_tmp]  DEFAULT (0),
	[credit] [int] NOT NULL CONSTRAINT [DF_character_credit]  DEFAULT (0),
	[store_item] [int] NOT NULL CONSTRAINT [DF_character_store_item]  DEFAULT (0),
	[extend] [varchar](512) NULL,
 CONSTRAINT [PK_character] PRIMARY KEY CLUSTERED 
(
	[cha_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_character] UNIQUE NONCLUSTERED 
(
	[cha_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[character_log]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[character_log](
	[cha_id] [int] NOT NULL,
	[cha_name] [varchar](50) NOT NULL,
	[act_id] [int] NOT NULL,
	[guild_id] [int] NOT NULL,
	[job] [varchar](50) NOT NULL,
	[degree] [smallint] NOT NULL,
	[exp] [int] NOT NULL,
	[hp] [int] NOT NULL,
	[sp] [int] NOT NULL,
	[ap] [int] NOT NULL,
	[tp] [int] NOT NULL,
	[gd] [int] NOT NULL,
	[str] [int] NOT NULL,
	[dex] [int] NOT NULL,
	[agi] [int] NOT NULL,
	[con] [int] NOT NULL,
	[sta] [int] NOT NULL,
	[luk] [int] NOT NULL,
	[map] [varchar](50) NOT NULL,
	[map_x] [int] NOT NULL,
	[map_y] [int] NOT NULL,
	[radius] [int] NOT NULL,
	[look] [varchar](80) NOT NULL,
	[del_date] [datetime] NOT NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[dtproperties]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[dtproperties](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[objectid] [int] NULL,
	[property] [varchar](64) NOT NULL,
	[value] [varchar](255) NULL,
	[uvalue] [nvarchar](255) NULL,
	[lvalue] [image] NULL,
	[version] [int] NOT NULL,
 CONSTRAINT [pk_dtproperties] PRIMARY KEY CLUSTERED 
(
	[id] ASC,
	[property] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[friends]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[friends](
	[cha_id1] [int] NOT NULL,
	[cha_id2] [int] NOT NULL,
	[relation] [varchar](50) NOT NULL,
	[createtime] [datetime] NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[guild]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[guild](
	[guild_id] [int] NOT NULL,
	[guild_name] [varchar](16) NOT NULL CONSTRAINT [DF_guild_guild_name]  DEFAULT (''),
	[motto] [varchar](50) NOT NULL CONSTRAINT [DF_guild_motto]  DEFAULT (''),
	[passwd] [varchar](20) NOT NULL CONSTRAINT [DF_guild_passwd]  DEFAULT (''),
	[leader_id] [int] NOT NULL CONSTRAINT [DF_guild_leader_id]  DEFAULT (0),
	[type] [tinyint] NOT NULL CONSTRAINT [DF_guild_type]  DEFAULT (0),
	[stat] [tinyint] NOT NULL CONSTRAINT [DF_guild_stat]  DEFAULT (0),
	[money] [bigint] NOT NULL CONSTRAINT [DF_guild_money]  DEFAULT (0),
	[exp] [bigint] NOT NULL CONSTRAINT [DF_guild_exp]  DEFAULT (0),
	[member_total] [smallint] NOT NULL CONSTRAINT [DF_guild_total]  DEFAULT (0),
	[try_total] [smallint] NOT NULL CONSTRAINT [DF_guild_pending_total]  DEFAULT (0),
	[disband_date] [datetime] NOT NULL CONSTRAINT [DF_guild_disband_date]  DEFAULT (getdate()),
	[challlevel] [smallint] NOT NULL CONSTRAINT [DF_guild_challlevel]  DEFAULT (0),
	[challid] [int] NOT NULL CONSTRAINT [DF_guild_challid]  DEFAULT (0),
	[challmoney] [bigint] NOT NULL CONSTRAINT [DF_guild_challmoney]  DEFAULT (0),
	[challstart] [smallint] NOT NULL CONSTRAINT [DF_guild_challstart]  DEFAULT (0),
 CONSTRAINT [PK_guild] PRIMARY KEY CLUSTERED 
(
	[guild_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_guild_name] UNIQUE NONCLUSTERED 
(
	[guild_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[IPAddress]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IPAddress](
	[ip1] [float] NOT NULL,
	[ip2] [float] NOT NULL,
	[country] [nvarchar](70) NULL,
	[city] [nvarchar](70) NULL,
 CONSTRAINT [PK_IPAddress] PRIMARY KEY CLUSTERED 
(
	[ip1] ASC,
	[ip2] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[item]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[item](
	[db_id] [int] IDENTITY(1,1) NOT NULL,
	[cha_id] [int] NOT NULL,
	[type] [smallint] NOT NULL,
	[item_type_id] [smallint] NOT NULL,
	[attr] [varchar](255) NOT NULL,
 CONSTRAINT [PK_item] PRIMARY KEY CLUSTERED 
(
	[db_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Kop_MonthReport]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Kop_MonthReport](
	[act_name] [varchar](50) NULL,
	[degree] [int] NULL,
	[ip] [varchar](20) NULL,
	[createdate] [datetime] NULL,
	[logouttime] [datetime] NULL,
	[playtime] [int] NULL,
	[Guild_Name] [varchar](16) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[LotterySetting]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LotterySetting](
	[section] [smallint] NOT NULL,
	[issue] [smallint] NOT NULL,
	[state] [smallint] NOT NULL,
	[createdate] [datetime] NOT NULL,
	[updatetime] [datetime] NULL,
	[itemno] [nvarchar](50) NULL,
 CONSTRAINT [PK_LotterySetting] PRIMARY KEY CLUSTERED 
(
	[section] ASC,
	[issue] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[map_mask]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[map_mask](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[cha_id] [int] NOT NULL,
	[content1] [char](600) NOT NULL CONSTRAINT [DF_map_mask_content]  DEFAULT (0),
	[content2] [char](600) NOT NULL CONSTRAINT [DF_map_mask_content4]  DEFAULT (0),
	[content3] [char](600) NOT NULL CONSTRAINT [DF_map_mask_content3]  DEFAULT (0),
	[content4] [char](600) NOT NULL CONSTRAINT [DF_map_mask_content2]  DEFAULT (0),
	[content5] [char](600) NOT NULL CONSTRAINT [DF_map_mask_content1]  DEFAULT (0),
 CONSTRAINT [PK_map_mask] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_map_mask] UNIQUE NONCLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[master]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[master](
	[cha_id1] [int] NOT NULL CONSTRAINT [DF_master_cha_id1]  DEFAULT (0),
	[cha_id2] [int] NOT NULL CONSTRAINT [DF_master_cha_id2]  DEFAULT (0),
	[finish] [int] NOT NULL CONSTRAINT [DF_master_finish]  DEFAULT (0),
	[relation] [varchar](50) NOT NULL CONSTRAINT [DF_master_relation]  DEFAULT ('teacher')
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[param]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[param](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[param1] [int] NULL,
	[param2] [int] NULL,
	[param3] [int] NULL,
	[param4] [int] NULL,
	[param5] [int] NULL,
	[param6] [int] NULL,
	[param7] [int] NULL,
	[param8] [int] NULL,
	[param9] [int] NULL,
	[param10] [int] NULL,
 CONSTRAINT [PK_param] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[personavatar]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[personavatar](
	[cha_id] [int] NOT NULL,
	[avatar] [image] NULL,
 CONSTRAINT [PK_psersonavatar] PRIMARY KEY CLUSTERED 
(
	[cha_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[personinfo]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[personinfo](
	[cha_id] [int] NOT NULL,
	[motto] [nvarchar](40) NULL,
	[showmotto] [bit] NULL,
	[sex] [nvarchar](50) NULL,
	[age] [int] NULL,
	[name] [nvarchar](50) NULL,
	[animal_zodiac] [nvarchar](50) NULL,
	[blood_type] [nvarchar](50) NULL,
	[birthday] [int] NULL,
	[state] [nvarchar](50) NULL,
	[city] [nvarchar](50) NULL,
	[constellation] [nvarchar](50) NULL,
	[career] [nvarchar](50) NULL,
	[avatarsize] [int] NULL,
	[prevent] [bit] NULL,
	[support] [int] NULL,
	[oppose] [int] NULL,
 CONSTRAINT [PK_personinfo] PRIMARY KEY CLUSTERED 
(
	[cha_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[property]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[property](
	[id] [bigint] NOT NULL,
	[cha_id] [bigint] NOT NULL,
	[context] [nvarchar](255) NOT NULL,
	[sum] [bigint] NOT NULL,
	[time] [datetime] NOT NULL,
 CONSTRAINT [PK_property] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Resource]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Resource](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[cha_id] [int] NOT NULL,
	[type_id] [smallint] NOT NULL CONSTRAINT [DF_Recource_type_id]  DEFAULT (1),
	[content] [char](8000) NOT NULL CONSTRAINT [DF_Recource_content]  DEFAULT (''),
 CONSTRAINT [PK_Resource] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[stat_log]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[stat_log](
	[track_date] [datetime] NOT NULL CONSTRAINT [DF_stat_log_track_date]  DEFAULT (getdate()),
	[login_num] [int] NOT NULL CONSTRAINT [DF_stat_log_login_num]  DEFAULT ((0)),
	[play_num] [int] NOT NULL CONSTRAINT [DF_stat_log_play_num]  DEFAULT ((0)),
	[wgplay_num] [int] NULL,
 CONSTRAINT [PK_stat_log] PRIMARY KEY CLUSTERED 
(
	[track_date] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[stat_log(bak)]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[stat_log(bak)](
	[track_date] [datetime] NOT NULL CONSTRAINT [DF_stat_log_track_date(bak)]  DEFAULT (getdate()),
	[login_num] [int] NOT NULL CONSTRAINT [DF_stat_log_login_num(bak)]  DEFAULT (0),
	[play_num] [int] NOT NULL CONSTRAINT [DF_stat_log_play_num(bak)]  DEFAULT (0),
	[wgplay_num] [int] NULL,
 CONSTRAINT [PK_stat_log(bak)] PRIMARY KEY CLUSTERED 
(
	[track_date] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[stat_log_hh]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[stat_log_hh](
	[track_date] [datetime] NOT NULL,
	[login_num] [int] NOT NULL,
	[play_num] [int] NOT NULL,
	[wgplay_num] [int] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[StatDegree]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StatDegree](
	[statDate] [datetime] NOT NULL,
	[degree] [smallint] NOT NULL,
	[characterCount] [bigint] NULL,
 CONSTRAINT [PK_StatDegree] PRIMARY KEY CLUSTERED 
(
	[statDate] ASC,
	[degree] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[StatGender]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[StatGender](
	[statDate] [datetime] NOT NULL,
	[gender] [varchar](8) NOT NULL,
	[genderCount] [bigint] NULL,
 CONSTRAINT [PK_StatGender] PRIMARY KEY CLUSTERED 
(
	[statDate] ASC,
	[gender] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[StatJob]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[StatJob](
	[statDate] [datetime] NOT NULL,
	[job] [varchar](50) NOT NULL,
	[characterCount] [bigint] NULL,
 CONSTRAINT [PK_StatJob] PRIMARY KEY CLUSTERED 
(
	[statDate] ASC,
	[job] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[StatLogin]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StatLogin](
	[statDate] [datetime] NOT NULL,
	[loginCount] [bigint] NULL,
 CONSTRAINT [PK_StatLogin] PRIMARY KEY CLUSTERED 
(
	[statDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[StatMap]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[StatMap](
	[statDate] [datetime] NOT NULL,
	[map] [varchar](50) NOT NULL,
	[playCount] [bigint] NULL,
 CONSTRAINT [PK_StatMap] PRIMARY KEY CLUSTERED 
(
	[statDate] ASC,
	[map] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Ticket]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ticket](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[cha_id] [int] NOT NULL,
	[issue] [int] NOT NULL,
	[itemno] [nvarchar](50) NOT NULL,
	[real] [bit] NOT NULL,
	[buydate] [datetime] NOT NULL,
 CONSTRAINT [PK_Ticket] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Trade_Log]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Trade_Log](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ExecuteTime] [datetime] NOT NULL,
	[GameServer] [nvarchar](50) NOT NULL,
	[Action] [nvarchar](50) NOT NULL,
	[From] [nvarchar](50) NOT NULL,
	[To] [nvarchar](50) NULL,
	[Memo] [nvarchar](1000) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[weekreport]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[weekreport](
	[act_name] [varchar](50) NULL,
	[cha_name] [varchar](50) NULL,
	[degree] [int] NULL,
	[ip] [varchar](20) NULL,
	[createdate] [datetime] NULL,
	[logouttime] [datetime] NULL,
	[playtime] [int] NULL,
	[Guild_Name] [varchar](16) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[WinTicket]    Script Date: 10/9/2016 5:57:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WinTicket](
	[issue] [smallint] NOT NULL,
	[itemno] [nvarchar](10) NOT NULL,
	[grade] [smallint] NOT NULL,
	[createdate] [datetime] NOT NULL,
	[num] [smallint] NOT NULL
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[AmphitheaterTeam] ADD  CONSTRAINT [DF_AmphitheaterTeam_matchno]  DEFAULT (0) FOR [matchno]
GO
ALTER TABLE [dbo].[AmphitheaterTeam] ADD  CONSTRAINT [DF_AmphitheaterTeam_state]  DEFAULT (0) FOR [state]
GO
ALTER TABLE [dbo].[AmphitheaterTeam] ADD  CONSTRAINT [DF_AmphitheaterTeam_winnum]  DEFAULT (0) FOR [winnum]
GO
ALTER TABLE [dbo].[AmphitheaterTeam] ADD  CONSTRAINT [DF_AmphitheaterTeam_losenum]  DEFAULT (0) FOR [losenum]
GO
ALTER TABLE [dbo].[AmphitheaterTeam] ADD  CONSTRAINT [DF_AmphitheaterTeam_relivenum]  DEFAULT (0) FOR [relivenum]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_boat_berth]  DEFAULT (0) FOR [boat_berth]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_boat_name]  DEFAULT ('') FOR [boat_name]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_boat_boat]  DEFAULT (0) FOR [boat_boatid]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_boat_header]  DEFAULT (0) FOR [boat_header]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_boat_body]  DEFAULT (0) FOR [boat_body]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_boat_engine]  DEFAULT (0) FOR [boat_engine]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_boat_cannon]  DEFAULT (0) FOR [boat_cannon]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_boat_part]  DEFAULT (0) FOR [boat_equipment]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_boat_bagsize]  DEFAULT (0) FOR [boat_bagsize]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_boat_bag]  DEFAULT ('') FOR [boat_bag]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_boat_diecount]  DEFAULT (0) FOR [boat_diecount]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_boat_isdie]  DEFAULT (0) FOR [boat_isdead]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_cur_endure]  DEFAULT (0) FOR [cur_endure]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_mx_endure]  DEFAULT (0) FOR [mx_endure]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_cur_supply]  DEFAULT (0) FOR [cur_supply]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_mx_supply]  DEFAULT (0) FOR [mx_supply]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_skill_state]  DEFAULT ('') FOR [skill_state]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_boat_ownerid]  DEFAULT (0) FOR [boat_ownerid]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_boat_createtime]  DEFAULT ('') FOR [boat_createtime]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_boat_isdeleted]  DEFAULT (0) FOR [boat_isdeleted]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_map]  DEFAULT ('') FOR [map]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_map_x]  DEFAULT ((-1)) FOR [map_x]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_map_y]  DEFAULT ((-1)) FOR [map_y]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_angle]  DEFAULT (0) FOR [angle]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_degree]  DEFAULT (1) FOR [degree]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_exp]  DEFAULT (0) FOR [exp]
GO
ALTER TABLE [dbo].[boat] ADD  CONSTRAINT [DF_boat_version]  DEFAULT (1) FOR [version]
GO
ALTER TABLE [dbo].[character_log] ADD  CONSTRAINT [DF_character_log_guild_id]  DEFAULT (0) FOR [guild_id]
GO
ALTER TABLE [dbo].[character_log] ADD  CONSTRAINT [DF_character_log_job]  DEFAULT (0) FOR [job]
GO
ALTER TABLE [dbo].[character_log] ADD  CONSTRAINT [DF_character_log_degree]  DEFAULT (1) FOR [degree]
GO
ALTER TABLE [dbo].[character_log] ADD  CONSTRAINT [DF_character_log_exp]  DEFAULT (0) FOR [exp]
GO
ALTER TABLE [dbo].[character_log] ADD  CONSTRAINT [DF_character_log_hp]  DEFAULT ((-1)) FOR [hp]
GO
ALTER TABLE [dbo].[character_log] ADD  CONSTRAINT [DF_character_log_sp]  DEFAULT ((-1)) FOR [sp]
GO
ALTER TABLE [dbo].[character_log] ADD  CONSTRAINT [DF_character_log_ap]  DEFAULT (0) FOR [ap]
GO
ALTER TABLE [dbo].[character_log] ADD  CONSTRAINT [DF_character_log_tp]  DEFAULT (0) FOR [tp]
GO
ALTER TABLE [dbo].[character_log] ADD  CONSTRAINT [DF_character_log_gd]  DEFAULT (0) FOR [gd]
GO
ALTER TABLE [dbo].[character_log] ADD  CONSTRAINT [DF_character_log_str]  DEFAULT (0) FOR [str]
GO
ALTER TABLE [dbo].[character_log] ADD  CONSTRAINT [DF_character_log_dex]  DEFAULT (0) FOR [dex]
GO
ALTER TABLE [dbo].[character_log] ADD  CONSTRAINT [DF_character_log_agi]  DEFAULT (0) FOR [agi]
GO
ALTER TABLE [dbo].[character_log] ADD  CONSTRAINT [DF_character_log_con]  DEFAULT (0) FOR [con]
GO
ALTER TABLE [dbo].[character_log] ADD  CONSTRAINT [DF_character_log_sta]  DEFAULT (0) FOR [sta]
GO
ALTER TABLE [dbo].[character_log] ADD  CONSTRAINT [DF_character_log_luk]  DEFAULT (0) FOR [luk]
GO
ALTER TABLE [dbo].[character_log] ADD  CONSTRAINT [DF_character_log_map]  DEFAULT ('') FOR [map]
GO
ALTER TABLE [dbo].[character_log] ADD  CONSTRAINT [DF_character_log_map_x]  DEFAULT ((-1)) FOR [map_x]
GO
ALTER TABLE [dbo].[character_log] ADD  CONSTRAINT [DF_character_log_map_y]  DEFAULT ((-1)) FOR [map_y]
GO
ALTER TABLE [dbo].[character_log] ADD  CONSTRAINT [DF_character_log_radius]  DEFAULT (0) FOR [radius]
GO
ALTER TABLE [dbo].[character_log] ADD  CONSTRAINT [DF_character_log_look]  DEFAULT ('') FOR [look]
GO
ALTER TABLE [dbo].[character_log] ADD  CONSTRAINT [DF_character_log_del_date]  DEFAULT (getdate()) FOR [del_date]
GO
ALTER TABLE [dbo].[dtproperties] ADD  DEFAULT (0) FOR [version]
GO
ALTER TABLE [dbo].[param] ADD  CONSTRAINT [DF_param_param1]  DEFAULT (0) FOR [param1]
GO
ALTER TABLE [dbo].[param] ADD  CONSTRAINT [DF_param_param2]  DEFAULT (0) FOR [param2]
GO
ALTER TABLE [dbo].[param] ADD  CONSTRAINT [DF_param_param3]  DEFAULT (0) FOR [param3]
GO
ALTER TABLE [dbo].[param] ADD  CONSTRAINT [DF_param_param4]  DEFAULT (0) FOR [param4]
GO
ALTER TABLE [dbo].[param] ADD  CONSTRAINT [DF_param_param5]  DEFAULT (0) FOR [param5]
GO
ALTER TABLE [dbo].[param] ADD  CONSTRAINT [DF_param_param6]  DEFAULT (0) FOR [param6]
GO
ALTER TABLE [dbo].[param] ADD  CONSTRAINT [DF_param_param7]  DEFAULT (0) FOR [param7]
GO
ALTER TABLE [dbo].[param] ADD  CONSTRAINT [DF_param_param8]  DEFAULT (0) FOR [param8]
GO
ALTER TABLE [dbo].[param] ADD  CONSTRAINT [DF_param_param9]  DEFAULT (0) FOR [param9]
GO
ALTER TABLE [dbo].[param] ADD  CONSTRAINT [DF_param_param10]  DEFAULT (0) FOR [param10]
GO
ALTER TABLE [dbo].[WinTicket] ADD  CONSTRAINT [DF_Ticket_num]  DEFAULT (0) FOR [num]
GO
ALTER TABLE [dbo].[character]  WITH NOCHECK ADD  CONSTRAINT [FK_character_account] FOREIGN KEY([act_id])
REFERENCES [dbo].[account] ([act_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[character] CHECK CONSTRAINT [FK_character_account]
GO
ALTER TABLE [dbo].[item]  WITH NOCHECK ADD  CONSTRAINT [FK_item_character] FOREIGN KEY([cha_id])
REFERENCES [dbo].[character] ([cha_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[item] CHECK CONSTRAINT [FK_item_character]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'服务器分区' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'LotterySetting', @level2type=N'COLUMN',@level2name=N'section'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'期号' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'LotterySetting', @level2type=N'COLUMN',@level2name=N'issue'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'状态：0 当前期 1 往期 2  作废期 ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'LotterySetting', @level2type=N'COLUMN',@level2name=N'state'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'创建日期' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'LotterySetting', @level2type=N'COLUMN',@level2name=N'createdate'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'更新时间戳' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'LotterySetting', @level2type=N'COLUMN',@level2name=N'updatetime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'性别' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'personinfo', @level2type=N'COLUMN',@level2name=N'sex'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'年龄' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'personinfo', @level2type=N'COLUMN',@level2name=N'age'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'名字' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'personinfo', @level2type=N'COLUMN',@level2name=N'name'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'属相' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'personinfo', @level2type=N'COLUMN',@level2name=N'animal_zodiac'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'血型' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'personinfo', @level2type=N'COLUMN',@level2name=N'blood_type'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'生日' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'personinfo', @level2type=N'COLUMN',@level2name=N'birthday'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'地区' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'personinfo', @level2type=N'COLUMN',@level2name=N'state'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'城市' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'personinfo', @level2type=N'COLUMN',@level2name=N'city'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'星座' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'personinfo', @level2type=N'COLUMN',@level2name=N'constellation'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'职业' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'personinfo', @level2type=N'COLUMN',@level2name=N'career'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'免骚扰' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'personinfo', @level2type=N'COLUMN',@level2name=N'prevent'
GO

INSERT INTO guild(guild_id, guild_name, motto, passwd, leader_id, member_total, try_total, challlevel) VALUES(0, 'Navy HQ', '', '', 0, 0, 0, 0);
DECLARE @X INT
SELECT  @X = 1
WHILE  @X < 100
BEGIN
	INSERT INTO guild(guild_id, guild_name, motto, passwd, leader_id, member_total, try_total, challlevel) VALUES(@X, 'Navy Party ' +convert(varchar(2), @X), '', '', 0, 0, 0, 0);
	SELECT  @X = @X +1
END
DECLARE @Y INT
SELECT  @Y = 101
WHILE  @Y < 200
BEGIN
	INSERT INTO guild(guild_id, guild_name, motto, passwd, leader_id, member_total, try_total, challlevel) VALUES(@Y,'Pirate Guild ' +convert(varchar(2), @Y - 100), '', '', 0, 0, 0, 0);
    SELECT  @Y = @Y +1
END