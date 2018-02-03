$startPath = "$($env:appveyor_build_folder)\database\mdfs\"
        $sqlInstance = "(local)\SQL2012SP1"
        $dbName = "AccountServer"
        $db2Name = "GameDB"
        $config = join-path $startPath "MyTests.dll.config"
        
        $mdfFile1 = join-path $startPath "AccountServer.mdf"
        $ldfFile1 = join-path $startPath "AccountServer_log.ldf"
        $mdfFile2 = join-path $startPath "GameDB.mdf"
        $ldfFile2 = join-path $startPath "GameDB_log.ldf"
        sqlcmd -S "$sqlInstance" -Q "Use [master]; CREATE DATABASE [$dbName] ON (FILENAME = '$mdfFile1'),(FILENAME = '$ldfFile1') for ATTACH"
        sqlcmd -S "$sqlInstance" -Q "Use [master]; CREATE DATABASE [$db2Name] ON (FILENAME = '$mdfFile2'),(FILENAME = '$ldfFile2') for ATTACH"
        $envConfig = "
        APP_NAME=topCMS
        APP_ENV=local
        APP_KEY=base64:zMQzRZLneKQKmdQcEMdlwmVDRfI0/KwmGweaYvwu6OY=
        APP_DEBUG=true
        APP_LOG_LEVEL=debug
        APP_URL=http://127.0.0.1


        DB_CONNECTION=AccountServer
        DB_HOST=(local)\SQL2012SP1
        DB_PORT=1433
        DB_DATABASE=AccountServer
        DB_USERNAME=sa
        DB_PASSWORD=Password12!

        DB_2_CONNECTION=GameDB
        DB_2_HOST=(local)\SQL2012SP1
        DB_2_PORT=1433
        DB_2_DATABASE=GameDB
        DB_2_USERNAME=sa
        DB_2_PASSWORD=Password12!


        SITE_INFO_DB_FILE=F:/xampp/htdocs/topsite_public/database/SiteInfo.sqlite

        CAPTCHA_ACTIVATED=FALSE
        RECAPTCHA_PUBLIC_KEY=6LcixDEUAAAAAFclPWm7SRc4skH8Lme0I-rMiuON
        RECAPTCHA_PRIVATE_KEY=6LcixDEUAAAAAGObK94L7RS5ZAR1b01GlS7RsS3y


        SOLO_EXP=10
        PARTY_EXP=15
        DROP_RATE=10
        SHIP_EXP=5

        BROADCAST_DRIVER=log
        CACHE_DRIVER=file
        SESSION_DRIVER=file
        SESSION_LIFETIME=120
        QUEUE_DRIVER=sync

        REDIS_HOST=127.0.0.1
        REDIS_PASSWORD=null
        REDIS_PORT=6379

        MAIL_DRIVER=smtp
        MAIL_HOST=smtp.mailtrap.io
        MAIL_PORT=2525
        MAIL_USERNAME=null
        MAIL_PASSWORD=null
        MAIL_ENCRYPTION=null

        PUSHER_APP_ID=
        PUSHER_APP_KEY=
        PUSHER_APP_SECRET=
        PUSHER_APP_CLUSTER=mt1"
        $envFile = "$($env:appveyor_build_folder)\.env"
        Add-Content $envFile $envConfig
        $webConfig = '<?xml version="1.0" encoding="utf-8"?>
        <configuration>
          <system.webServer>
            <defaultDocument>
                <files>
                    <clear />
                    <add value="index.php" />
                </files>
            </defaultDocument>
            <handlers accessPolicy="Read, Execute, Script" />
            <rewrite>
                <rules>
                    <rule name="Imported Rule 2" stopProcessing="true">
                        <match url="^(.*)$" ignoreCase="false" />
                        <conditions logicalGrouping="MatchAll">
                            <add input="{REQUEST_FILENAME}" matchType="IsFile" ignoreCase="false" negate="true" />
                            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" ignoreCase="false" negate="true" />
                        </conditions>
                        <action type="Rewrite"  url="index.php/{R:1}" />
                    </rule>
                </rules>
            </rewrite>
        </system.webServer>
        </configuration>'
        

        $webConfigFile = "$($env:appveyor_build_folder)\public\web.config"
        Add-Content $webConfigFile $webConfig
        $SiteName = "topCMS"
        $SiteFolder = Join-Path -Path 'C:\inetpub\wwwroot' -ChildPath $SiteName
        $SiteFolder = Join-Path -Path $SiteFolder -ChildPath 'public'
        New-Website -Name $SiteName -PhysicalPath $SiteFolder -Force
        
        Get-Website -Name 'Default Web Site' | Remove-Website
        Get-Website -Name $SiteName | Start-Website
        $Acl = Get-Acl "C:\inetpub\wwwroot\topcms"
        $Ar = New-Object System.Security.AccessControl.FileSystemAccessRule("Users", "FullControl", "ContainerInherit,ObjectInherit", "None", "Allow")
        $Acl.SetAccessRule($Ar)
        Set-Acl "C:\inetpub\wwwroot\topcms\" $Acl