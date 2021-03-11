// 09.03.2021
// F.p.
import JSEnhanced from '../toolset/JSEnhanced.js';
export default class dependencyLoader {

  types = {
    'js':{
      'type':'text/javascript',
      'src':url
    },
    'css':{
      'type':"text/css",
      'rel':'stylesheet',
      'href':url
    }
  };

  dependencies = [{
                    "type":"js",
                    "url":"https://code.jquery.com/jquery-3.6.0.js"
  }];
  targetToAttach = "head";
  postLoad = true;
  constructor(){
    dependencyLoader.loadDependency(this.dependencies);
    return this;
  }
  /* loading dependencies recursively
    - dependency contains an array of elements to laod
    - targetToAttach
    - postLoad enables post process after the last element has been loaded.
      To override this part, example:
      dependencyLoader.prototype.postLoadOperations = function(){
          if(this.isFirstLoad){
              this.isFirstLoad = false;
              this.postLoadOperationsCounter = 1;

              // getting instance locally
              var instance = this;
              // load dependencies for all subframes
              console.log("load of script ended, and post load executed");
          } else {
              this.postLoadOperationsCounter++;
          }
      };
   */
  static loadDependency(dependency,targetToAttach,postLoad){
      if(dependency == ''){
          return false;
      }
      var item = dependency[0],
          isLast = dependency.length==1?true:false;
          instance = this,
          targetToAttach = JSEnhanced.contextualizeObject(targetToAttach) || "head",
          postLoad = postLoad || false,
          scriptLoaded;

      scriptLoaded = dependencyLoader.loadLib();
      if(!isLast){
          scriptLoaded.addEventListener(
              "load",
              function() {
                  // keeping elements next to the computed one.
                  dependencyLoader.loadDependency(dependency.slice(1,),refDocument,postLoad);
              }
          );
      } else {
        if(postLoad){
          this.postLoadOperations();
        }
      }
  }
  /* For certain mapped types, allows to get a structured config to createElem*/
  static generateLibraryStructure(extension,url){
    extension = extension || "";
    url = url || "";

    mapped = (extension in types)?true:false;
    if(mapped){
      return dependencyLoader.types[extension];
    } else {
      console.error("Given object type {extension} not mapped into generateLibraryStructure");
      return false;
    }
  }
  /* adds a library to the HTML head */
  static loadLib(url,targetToAttach) {
    var lib,
        file_ext = url.split('.').pop(),
        element =  JSEnhanced.contextualizeObject(targetToAttach) || document.getElementsByTagName("head")[0],
        structure = dependencyLoader.generateLibraryStructure(file_ext,url);

    if(structure){
      JSEnhanced.setAttributes(document.createElement(structure.element));
    } else {
      /* Unhandled type, to add */
    }

    if(element){
      // add new element to target
      element.appendChild(lib)
      return lib;
    } else {
      return false;
    }
  }
}
