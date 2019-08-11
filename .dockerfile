# wget -qO- https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
# sudo add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/16.04/mssql-server-2017.list)"
# sudo apt-get update
# sudo apt-get install -y mssql-server
# sudo /opt/mssql/bin/mssql-conf setup
# curl https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
# curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list | sudo tee /etc/apt/sources.list.d/msprod.list
# sudo apt-get update
# sudo apt-get install mssql-tools unixodbc-dev
# echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
# source ~/.bashrc
# npx sequelize db:migrate --env="GameDB"