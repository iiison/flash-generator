var text = {
  routes : {
    fxn : {
      text : '%viewName%() { \ncontroller.view.set(\'viewName\', \'%viewName%\')\n},',
      comment : '// Flash-generator, Add New route function Here'
    },
    route : {
      text : 'page(\'/%route%\', routes.%viewName%)',
      comment : '// Flash-generator, Add New routes Here'
    }
  },
  template : {
    fxn : {
      text : '<div>%Details%</div>'
    }
  },
  getTemplate : {
    text    : 'case \'%viewName%\' : \n return Promise.all([ \n System.import(\'templates/%templateName%.tpl\'), \n System.import(\'styles/modules/%cssName%.css\') \n ]).then((modules) => { \n const templatesData = { \n template : modules[0], \n styles: modules[1] \n } \n \n setupTemplatesData(templatesData) \n }) \n .catch((error) => { \n throw error \n })',
    comment : '// Flash-generator, add new function here'
  }
};

module.exports = text;
