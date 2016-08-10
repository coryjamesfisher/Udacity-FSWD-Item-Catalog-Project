Item Catalog Project
==================================================

Applications
--------------------------------------

1. [REST API](backend/README.md)
2. [Website](frontend/README.md)

Useful Commands
--------------------------------------
1. **Start Vagrant box**
  ```bash
vagrant up
```

2. **Build Assets**
  ```bash
cd /vagrant/frontend && gulp js
```

3. **Start Rest Services**
  ```bash
cd /vagrant && ./backend/run
```

4. **Start Catalog Site**
  ```bash
cd /vagrant && ./frontend/run
```

Loading The Website
--------------------------------------
If you followed the steps above you should be able to access the website here:  
http://localhost:8000/  

If you wish to write your own frontend/client you can follow the docs in the
backend readme.  

Project Structure
--------------------------------------
|Directory                  | Purpose                                      |
|---------------------------|----------------------------------------------|
|**[backend](backend)**     | Application Server Related Code & Assets     |
|**[frontend](frontend)**   | Website Related Code & Assets                |
|**[plugins](plugins)**     | Plugins for the Catalog[None Exist]          |
