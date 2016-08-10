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
vagrant up && vagrant ssh
```

2. **Start Rest Services**
  ```bash
cd /vagrant && ./backend/run &
```

3. **Start Catalog Site**
  ```bash
cd /vagrant && ./frontend/run &
```

Loading The Website
--------------------------------------
If you followed the steps above you should be able to access the website here:  
http://localhost:8000/  
Note: The UI is very minimalistic in it's functionality.  
The recent items list is read only. After creating a category,
you must click the category link in order to add items.  

If you wish to write your own frontend/client you can follow the docs in the
backend readme.  

Project Structure
--------------------------------------
|Directory                  | Purpose                                      |
|---------------------------|----------------------------------------------|
|**[backend](backend)**     | Application Server Related Code & Assets     |
|**[frontend](frontend)**   | Website Related Code & Assets                |
|**[plugins](plugins)**     | Plugins for the Catalog[None Exist]          |
|**[schema](schema)**       | Schema for the catalog database & user setup |
