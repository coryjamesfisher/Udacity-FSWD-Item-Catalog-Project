apt-get -qqy update

# APT Managed Packages
apt-get -qqy install postgresql postgresql-contrib python-psycopg2
apt-get -qqy install python-flask python-sqlalchemy
apt-get -qqy install python-pip
apt-get -qqy install nodejs npm

# PIP Managed Packages
pip install bleach
pip install oauth2client
pip install requests
pip install httplib2
pip install itsdangerous
pip install flask-httpauth
pip install PyJWT

# DB Setup
su postgres -c 'createuser -dRS vagrant'
su vagrant -c 'createdb'
sudo -u postgres psql -c "CREATE USER serviceuser WITH PASSWORD 'serviceuser';"
sudo -u postgres psql -f /vagrant/schema/init.sql

# Install Node Managed Packages
cd /vagrant/frontend
sudo ln -s /usr/bin/nodejs /usr/bin/node
npm install
./node_modules/.bin/gulp js

# Original MOTD
vagrantTip="[35m[1mThe shared directory is located at /vagrant\nTo access your shared files: cd /vagrant(B[m"
echo -e $vagrantTip > /etc/motd
