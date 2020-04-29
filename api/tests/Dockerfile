FROM microsoft/mssql-server-linux:latest

# Grant permissions for the import-data script to be executable
COPY db/* /home/db/
COPY scripts/* /home/scripts/
RUN cd /home/ && chmod +x ./scripts/setup-db.sh

CMD /bin/bash /home/scripts/entrypoint.sh

# sudo docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=SM8&Y8xiu}' -e 'MSSQL_PID=Express' -p 1433:1433 topdb