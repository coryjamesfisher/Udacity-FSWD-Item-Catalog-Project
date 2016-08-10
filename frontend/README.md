Catalog This! Website
==================================================

Architecture
--------------------------------------
The sample website was built with ReactJS using the Flux Paradigm.  
In the Flux implementation there are the following architectural layers:   
1. components - UI/Views  
2. action creators - Called by the views in response to user input.
These perform requests to the REST API and fire events based on their status.  
3. stores - Listens for events and uses them to set the application state.
All of the application's state is stored in this layer.  

Ancillary Helpers
--------------------------------------
The code for the front end is written almost entirely in JSX files
which offer a syntactic sugar on top of JavaScript such as allowing
the developer to write HTML tags with variables interpolated without
the need for quotes. The JSX files are compiled into javascript using
a task built in gulp. It also has watch functionality enabled for an easy
development flow without the need for running the command for each javascript
change.  
From the frontend dir run either of the following:
```bash
./node_modules/.bin/gulp js
./node_modules/.bin/gulp watch
```

Filesystem Structure
--------------------------------------
|Directory                  | Purpose                                      |
|---------------------------|----------------------------------------------|
|**htdocs**                 | Web Root                                     |
|**htdocs/css**             | Stylesheets                                  |
|**htdocs/jsx**             | Front End Application Code                   |
|**htdocs/js**              | Compiled JSX Files and other JS Dependencies |
|**node_modules**           | NodeJS(gulp task) Dependencies               |
