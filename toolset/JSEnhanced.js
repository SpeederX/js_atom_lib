
export default class JSEnhanced{
  /* some input gets computed and returns the html element */
  contextualizeObject(something){
    var elem,
        doYouExist;

    if(typeof(something) === "string"){
      /* HmmMMmM might be a tagname, something we don't cannot predict. so.. */
      doYouExist = document.querySelectorAll(something);
    } else if(typeof(something) === "function") {
      doYouExist = something();
    } else {
      /* dafuq im supposed to do? */
    }
    if(doYouExist){
      return elem;
    } else {
      return false;
    }

  }
  /* allows to create an element and for a given config assign values to it */
  static setAttributes(el, attrs) {
        var elem = typeof(el)=="string"?document.createElement(el):el;
        for(var key in attrs) {
          elem.setAttribute(key, attrs[key]);
        }
        return elem;
  }

}
