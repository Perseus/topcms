# Tales of Pirates CMS (topCMS)
[![Build status](https://ci.appveyor.com/api/projects/status/gn3iwchinktiscso/branch/master?svg=true)](https://ci.appveyor.com/project/Perseus/topcms/branch/master)

Tales of Pirates was a 3D Massively Multiplayer Online Role Playing Game developed by the Chinese company MOLI.Tales of Pirates was published by IGG (I Got Games) until the game closed on February 29, 2016.

topCMS is a content management system that can be used to administrate over the game database, directed at the private server development community that is trying their best to keep the game alive.



# Prerequisites
* PHP 7.0+
* Composer (https://getcomposer.org/)
* NodeJS (https://nodejs.org/en/)
* NPM (https://www.npmjs.com/)

# Installation

Make sure that your PHP.exe file is available in your environment PATH.

After you've installed all of the prerequisites listed above, create a file ".env" in the root folder. Copy the contents of the .env.example file into this file. Configure the SQL authentication information, the server rates and the ReCAPTCHA if you want to use it.

An absolute path (C:/Path/To/Your/DB) is required in the SITE_INFO_DB_FILE config. The file should have the extension ".sqlite".
An example valid config is : "C:/xampp/htdocs/topcms/database/SiteInfo.sqlite"

Once that is finished, open a terminal and navigate yourself to the root folder of the website. (example: `cd C:/xampp/htdocs/topcms/`)

Generate a key for your application using `php artisan key:generate`.
Next, generate your website database using `php artisan migrate`.
Make sure your .sqlite file exists before running this command.

Next, run `composer install` to install all the PHP dependencies.

Then, run `npm install` to install all the JavaScript dependencies.

When you run your Apache server, your website should be accessible at
localhost/website_folder/public

That generally causes some issues with routing.

There are two solutions to that. 

1. You can start a php server using the command `php artisan serve` in the command prompt. This will start a server at specific port, and the website will be fully functional.

2.  If you want it to be accessible at localhost/, you need to change your DocumentRoot in your apache config file. Go to apache/conf/httpd.conf. Search for "DocumentRoot". You will see something like this : `DocumentRoot "C:/xampp/htdocs"`. Change it to `DocumentRoot "F:/xampp/htdocs/website_folder/public`

Your website should now be fully functional!



