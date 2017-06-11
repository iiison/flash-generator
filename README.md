## Synopsis
This is a simple code generator for [Flash](github.com/iiison/Flash)

## Code Example

Currently it has very basic 2 commands:

### Setup new project
To setup a new project using Flash.
```shell
$ flash generate
? Enter the project's name(you can also pass the template name with `-n` flag) (test) [enter the name of the project]
```



### Generate new page
To generate the code for a new page. As every framework, to add a new page, you have to add code at a lot of places(which is very frustrating 😬). `generate-page` command will ask few simple question and add the page code accordingly. 

```shell
$ flash generate-page -v [viewName]
? Enter a route for this page :  (defaultValue)
? Enter template name for the page : (defaultValue)
? Shall I generate CSS file for the template? : (Y/n)
? Enter template name for the CSS? : (defaultName)
```


Command changes and adds these files:
- routes: at js/routes.js
    - Adds new route function.
    - Calls the newly added function.
- Adds new template file at templates/[name].tpl
- Adds new css file(if opted for) at styles/[name].css
- Adds a page configuration file to make network call and setup page data. 


## Installation

```sh
    $ npm install flash-generator -g
```
