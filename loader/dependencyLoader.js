// 09.03.2021
// F.p.

class dependencyLoader {


  constructor(){

    this.dependencies = {};
    return this;
  }
  (function() {
    "use strict";


    var dependencies = [{
                            "type":"js",
                            "url":"https://sol3.diviteldatacenter.com/public/zmi_ace/jquery-3.5.1.min.js"
                        },
                        {
                          "type":"js",
                          "url":"https://sol3.diviteldatacenter.com/public/zmi_ace/bootstrap-4.6.0/bootstrap.bundle.min.js"
                      },
                      {
                          "type":"css",
                          "url":"https://sol3.diviteldatacenter.com/public/zmi_ace/bootstrap-4.6.0/bootstrap.min.css"
                      },
                      {
                          "type":"css",
                          "url":"https://sol3.diviteldatacenter.com/public/zmi_ace/zmi_base.css"
                      },
                      {
                          "type":"js",
                          "url":"https://sol3.diviteldatacenter.com/public/zmi_ace/zmi_base.js"
                      },
    ];

    loadLib(url) {
      var lib,
          head = document.getElementsByTagName("head")[0];

      if(url.indexOf('js') !== -1){
        lib = document.createElement("script");
        lib.type = "text/javascript";
        lib.src = url;
      } else if (url.indexOf('css') !== -1){
        lib = document.createElement("link");
        lib.type = "text/css";
        lib.rel = "stylesheet";
        lib.href = url;
      } else {
        /* Unhandled type, to add */

      }

      // add new element to page
      head.appendChild(lib);

      return lib;
    }

    //console.log('loadedUserScript',document.querySelectorAll('frame[name=manage_main]'));
    loadDependency(dependencies){

    }
    /**
    * Basically load a set of dependencies
    * dependency = ["test.js","test.css"]
    */
    loadDependencies(dependencies){
        // carico tutte le dipendenze
        var scriptLoaded = [];
        // lancio il loading delle librerie.
        dependencies.forEach((dependency)=>{
          scriptLoaded = loadLib(dependency);
          scriptLoaded.addEventListener(
              "load",
              function() {
                  // cancello il penultimo elemento
                  dependency.shift();
                  loadDependency(dependency);
              }
          );
          scriptLoaded.push(loadLib(dependency));
        });


        if(dependency.length> 1){
            scriptLoaded.addEventListener(
                "load",
                function() {
                    // cancello il penultimo elemento
                    dependency.shift();
                    loadDependency(dependency);
                }
            );
        } else if (dependency.length == 1){
            // se sono all'ultima dipendenza, carico "finalmente" lo script principale.
                   console.log("script loaded:",new Date());
        }

    }
}
