Item Catalog Project
==================================================

Applications
--------------------------------------

1. [REST API](backend/README.md)
2. [Website](frontend/README.md)
3. [Amazon Importer](plugins/import/amazon/README.md)

Useful Commands
--------------------------------------
1. **Build Assets**
  ```bash
gulp init
```

2. **Import Amazon Products**
  ```bash
./plugins/import/amazon/run
```
 
3. **Start Services**
  ```bash
./backend/run
```

4. **Start Catalog Site**
  ```bash
./frontend/run
```

Project Structure
--------------------------------------
|Directory                  | Purpose                                      |
|---------------------------|----------------------------------------------|
|**[backend](backend)**     | Application Server Related Code & Assets     |
|**[frontend](frontend)**   | Website Related Code & Assets                |
|**[plugins](plugins)**     | Plugins for the Catalog                      |
