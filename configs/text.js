var text = {
  routes : {
    fxn : {
      text : '%viewName%() { \ncontroller.view.set(\'viewName\', \'%viewName%\')\n},',
      comment : '// Flash-generator, Add New route function Here'
    },
    route : {
      text : 'page(\'%route%\', routes.%viewName%)',
      comment : '// Flash-generator, Add new route'
    }
  },
  template : {
    fxn : {
      text : '<div>%Details%</div>'
    }
  }
};

module.exports = text;
