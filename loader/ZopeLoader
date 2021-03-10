class ZopeJSEnhancerAPI {

     dependencies = [{
            "type":"js",
            "url":"https://code.jquery.com/jquery-3.5.1.js"
        },
        {
            "type":"js",
            "url":"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.2/codemirror.min.js"
        },
        {
            "type":"css",
            "url":"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.2/codemirror.min.css"
        },
    ];

    extraDependencies = [
//    {
//            "type":"js",
//            "url":"https://code.jquery.com/jquery-3.5.1.js"
//        },
    ];

    constructor(window,document,verboseMode){
        //this.dependencies = ZopeJSEnhancerAPI.getDependencies();

        this.verboseMode = verboseMode || false;
        this.isFirstLoad = true;

        this.consoleDebug('|------ ZopeJSEnhancerAPI -------|');
        this.consoleDebug('|**------ INIT -------**|');

        // load all dependencies for the main document
        this.loadDependency(this.dependencies,document,true);

        // bound window to istance
        this._window = window;
        this._document = document;

        // add istance to window
        //window.ZopeJSEnhancerAPI = this;

        // init zope objects
        this._zope = {};
        this.getZopeReferences();

        this._zope.main.addEventListener('load',function(){
                // al caricamento del frame con menù
                console.log("init zope main");
        });

        this._zope.menu.addEventListener('load',function(){
                // al caricamento del frame con menù
                console.log("init zope menu");
        });

        this._zope.header.addEventListener('load',function(){
                // al caricamento del frame con menù
                console.log("init zope header");
        });

        this.consoleDebug('|**------ END -------**|');

        return this;
    }
    getZopeReferences(){
        // init zope main
        this._zope.main = document.querySelectorAll('frame[name=manage_main]')[0];
        this._zope.main.window = this._zope.main.contentWindow;
        this._zope.main.document = this._zope.main.contentDocument;

        // init top frame
        this._zope.header = document.querySelectorAll('frame[name="manage_top_frame"]')[0];
        this._zope.header.window = this._zope.header.contentWindow;
        this._zope.header.document = this._zope.header.contentDocument;

        // init zope menu
        this._zope.menu = document.querySelectorAll('frame[name=manage_menu]')[0];
        this._zope.menu.window = this._zope.menu.contentWindow;
        this._zope.menu.document = this._zope.menu.contentDocument;
    }
    consoleDebug(message){
        if(this.verboseMode){
            message = message || "some message...";
            console.log(message);
            return true;
        }

    }

    static loadStyles(url,refDocument) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        var head = refDocument.getElementsByTagName("head")[0];
        head.appendChild(link);
        return link;
    }

    static loadJS(url,refDocument) {
		var link = document.createElement("script");
		link.type = "text/javascript";
		link.src = url;
		var head = refDocument.getElementsByTagName("head")[0];
		head.appendChild(link);
        return link;
    }

    loadDependency(dependency,refDocument,postLoad){
        if(dependency == ''){
            return false;
        }
        // carico tutte le dipendenze
        var item = dependency[0],
            istance = this,
            postLoad = postLoad || false,
            scriptLoaded;
        console.log('loadDependency',arguments);
        this.consoleDebug('|**------ loading:' + item.url + '-------**|');
        // lancio il loading delle librerie.
        if(item.type == 'js'){
            scriptLoaded = ZopeJSEnhancerAPI.loadJS(item.url,refDocument);
        } else if(item.type == 'css') {
            scriptLoaded = ZopeJSEnhancerAPI.loadStyles(item.url,refDocument);
        }
        if(dependency.length> 1){
            scriptLoaded.addEventListener(
                "load",
                function() {
                    // cancello il penultimo elemento
                    istance.consoleDebug('|**------ Dependency Loaded,Next one -------**|');
                    istance.loadDependency(dependency.slice(1,),refDocument,postLoad);

                }
            );
        } else if (dependency.length == 1){
            // se sono all'ultima dipendenza, carico "finalmente" lo script principale.
                   //Window.initZopeEnhancer();


                   //this.postLoadOperations();
                   istance.consoleDebug('|**------ All dependencies loaded -------**|');
                   // se false allora non faccio operazioni di post caricamento.
                   if(postLoad){
                    this.postLoadOperations();
                   }

        }
    }
    /* operazioni eseguibili post caricamento delle dipendenze */
    postLoadOperations(){
        // describe what to do
        console.log("postLoadOperations");
    }
    initCodeMirror(docRef){
        debugger;
        var textArea = this._zope.main.document.querySelectorAll('textarea')[0];
        textArea.setAttribute('data-codemirror-mode','python');
        //var codemirror_python_data=<dtml-var expr="context.get_codemirror_json(REQUEST)">;
            textArea.className += ' codemirror-python';
//            textArea.onCodeMirrorSave = function() {
//              document.getElementById('textarea-save-button').click();
//            };
//            textArea.onCodeMirrorLoad = function(cm) {
//              // Mark lines with errors
//              var error_lines = codemirror_python_data['error_lines'];
//              for (var i=0; i<error_lines.length;i++) {
//                cm.setMarker(error_lines[i]-1, "<span style=\"color: #900\">&#x25cf;</span> %N%");
//              }
//              // restore cursor position if a 'codemirror-cursor-position' is available
//              if(codemirror_python_data['cursor_position']) {
//                cm.focus();
//                cm.setCursor({line:codemirror_python_data['line'],
//                              ch:codemirror_python_data['ch']});
//              }
//            };

        this.convert_textareas();

//        var hasTextArea = docRef.querySelectorAll("textarea");
//
//        if(hasTextArea.length){
//            // editor
//            var textArea = hasTextArea[0];
//            var textEditor = CodeMirror.fromTextArea(textArea, {
////                mode : {
////                    name: "xml",
////                    tags: {
////                        style: [["type", /^text\/(x-)?scss$/, "text/x-scss"],
////                                [null, null, "css"]],
////                        custom: [[null, null, "customMode"]]
////                    },
////                    htmlMode : true,
////                },
////                lineWrapping : true,
////                lineNumbers : true,
//                matchBrackets: true,
//                indentUnit: 4,
//                highlightFormatting : true
//
//            });
//            textEditor.refresh();
//        }

    }
    initAceEditor(){


    }

    mainObjectInit(){
        var istance = this;
//        if(window.$(this._zope.main.document).find("textarea").length){
//            // se c'è un editor
////            var textArea = $(Window.fileListFrameObjB[0].contentDocument).find("textarea")[0];
////            var textEditor = CodeMirror.fromTextArea(textArea, {
////                lineNumbers: true
////            });
//            this.initCodeMirror(this._zope.main.document);
//        } else {
            // se invece mostriamo la lista dei file
            this._zope.main.addEventListener('load',function(){
                // al caricamento del frame con lista oggetti
                console.log("manage_main loaded");
                istance.getZopeReferences();
                ZopeJSEnhancerAPI.enableSpoilerCode(istance._zope.main.document);

//                if(istance._zope.main.document.querySelectorAll("textarea").length){
//                    istance.initCodeMirror(istance._zope.main.document);
//                }
                istance.consoleDebug("|------ loading extraDependencies -------|");
                istance.loadDependency(istance.extraDependencies,istance._zope.main.document,false);
                istance.consoleDebug("|------ ended extraDependencies -------|");
            });
        //}

//       this._zope.main.addEventListener('load',function(){
//            // al caricamento del frame con menù
//            console.log("manage_main loaded");
//        });
    }
    /* inizializza il menù e i suoi eventi*/
    menuObjectInit(){
        var istance = this;
//        setTimeout(function(){
//
//            // ogni voce di menù cliccata deve permette di caricare il codice nella lista dei file che mostra
//            istance.getMenuObjects().each((index,item)=>{
//                item.addEventListener("click",function(){
//                    console.log("begin enableSpoilerCode");
//                    istance._zope.main.addEventListener('load',function(){
//                    //setTimeout(function(){
//                        console.log("exec enableSpoilerCode");
//                        ZopeJSEnhancerAPI.enableSpoilerCode(istance._zope.main.document);
//                    //},1000);
//                    });
//                    console.log("end enableSpoilerCode");
//                },false);
//            });
//
//            // per ogni link del menù e voce espandibile devo riattaccare gli eventi.
//            // aspetto 1 secondo dopo il click. il click triggera il reload del frame
//            istance.getMenuExplode().each((index,item)=>{
//                item.addEventListener("click",function(){
//                    console.log("begin handleMenuReload");
//                    istance._zope.main.addEventListener('load',function(){
//                    //setTimeout(function(){
//                        console.log("exec handleMenuReload");
//                        ZopeJSEnhancerAPI.menuObjectInit();
//                    //},1000);
//                    });
//                    console.log("end handleMenuReload");
//                },false);
//            });
//        },500);
    }
    static setAttributes(el, attrs) {
          for(var key in attrs) {
            el.setAttribute(key, attrs[key]);
          }
    }
    /* abilitazione della funzionalità per spoilerare il codice in riga della lista oggetti */
    static enableSpoilerCode(doc){
        var linkExternalEdit = doc.querySelectorAll(".list-item a[title='Edit using external editor']");
        // selezione di tutti gli oggetti, con riga, all'interno del frame manage_main ( lista dei file ) con titolo che indica che sia un file editabile
        linkExternalEdit.forEach(function(item,index){

            // prendo il riferimento della riga della lista file
            var fileRowTr = item.parentElement.parentElement.parentElement;

            // test per find, disabilitato temporaneamente
            if( 1 == 2){
                var lclTd = $(fileRowTr).find("td:eq(0)")[0];
                //console.log(clonedTd);
                fileRowTr.prepend(lclTd.cloneNode(true));//,fileRowTr.firstChild);

                var newTd = $(fileRowTr).find("td:eq(0)").get(0);
                newTd.innerHTML = '<a id="el-'+index+'" href="#" ><img class="show_hide" src="/p_/pl" alt="+" border="0"></a>';

            } else {
                var newA = document.createElement('a'),
                    newImg = document.createElement('img'),
                    newCell = document.createElement('td');

                ZopeJSEnhancerAPI.setAttributes(newImg,{
                                                            'src':'/p_/pl',
                                                            'class':'show_hide',
                                                            'alt':'+',
                                                            'border':'0',
                                                        });

                newA.setAttribute('id','el-'+index);
                newA.setAttribute('href','#');
                newA.append(newImg);
                newCell.append(newA);

                // per il primo child element, in cui esiste la checkbox per selezionare il file, vado in override e metto l'immagine con "+" o "-"
//                fileRowTr.firstElementChild.append(newA);
                fileRowTr.firstElementChild.innerHTML = newA.outerHTML;
            }

            // rispetto alla pagina HTML aggancio un evento alla nuova immagine del tasto "+"
            doc.getElementById('el-'+index).addEventListener("click", function(){

                // funzione che permette di fare la chiamata AJAX in funzione dell'url sorgente e poi gestisce il fatto di mostrare all'utente il tutto dentro a una nuova riga
                ZopeJSEnhancerAPI.showCode(''+item.getAttribute('href')+'',fileRowTr);

            }, false);
        })
    }
    /* caricamento del codice dentro a una nuova riga */
    static showCode(url,tr){
        var nextTr = tr.nextElementSibling;

        // due casistiche: classe CSS sourceCode non settata per la riga successiva, significa che non ho inizializzato la riga.
        if(nextTr.className.indexOf('sourceCode') == -1 ){
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {

                    tr.after(tr.cloneNode());
                    tr.nextElementSibling.setAttribute('class','sourceCode');

                    var sourceTd = document.createElement('td'),
                        sourceTextArea = document.createElement('textarea'),
                        sourcePre = document.createElement('pre'),
                        sourceCode = document.createElement('code');

                    sourceTd.setAttribute('colspan','5');

                    sourceTextArea.setAttribute('class','codeEditor');
                    sourceCode.innerText = xhttp.responseText; // non necessario se si istanzia l'oggetto "code" --> escapeHtml(xhttp.responseText);
                    sourcePre.append(sourceCode);

                    //sourceTextArea.value = xhttp.responseText; // non necessario se si istanzia l'oggetto "code" --> escapeHtml(xhttp.responseText);
                    sourceTd.append(sourcePre);

                    tr.nextElementSibling.append(sourceTd);
                    /*var editor = CodeMirror.fromTextArea($(tr.nextElementSibling).find('textarea')[0], {
                    lineNumbers: true
                });
                editor.setSize(500, 300);*/
                    tr.nextElementSibling.setAttribute('style','visibility: visible;display:table-row;');
                    var imgToUpdate = tr.querySelectorAll("img.show_hide")[0];
                    imgToUpdate.setAttribute('src','/p_/mi');
                    imgToUpdate.setAttribute('alt','-');
                    imgToUpdate.setAttribute('display','block');
                }
            };
            xhttp.open("GET", url, true);
            xhttp.send();
        } else {
            var imgToUpdate = tr.querySelectorAll("img.show_hide")[0];
            if(nextTr.style.visibility == 'visible'){
                nextTr.setAttribute('style','visibility: hidden;display:none;');
                imgToUpdate.setAttribute('src','/p_/pl');
                imgToUpdate.setAttribute('alt','+');
            } else {
                nextTr.setAttribute('style','visibility: visible;display:table-row;');
                imgToUpdate.setAttribute('src','/p_/mi');
                imgToUpdate.setAttribute('alt','-');
            }
        }
    }
    /* lista delle voci di menù, espandibili */
    getMenuExplode(){
        return window.$(this._zope.menu.document).find('a[href^="manage_menu"]');
    }
    /* lista delle voci di menù che puntano a aggiornare il manage_main */
    getMenuObjects(){
        console.log(this._zope.menu.document);
        return window.$(this._zope.menu.document).find('a[href$="manage_workspace"][target="manage_main"]');
    }
    // integrazione da https://github.com/zopefoundation/Zope/tree/master/src/zmi/styles/resources - per bootstrap
    fix_ancient_gui(objScope) {
//        if ( 0 !== $('main').length ) {
//            return;
//        }
        // WRAP FORM ELEMENT with fluid-container (if missing)
        window.$(objScope).find('body>form,body>textarea,body>table,body>h2,body>h3,body>p,body.zmi-Generic-Setup-Tool>div:not(.modal)').wrapAll('<main class="container-fluid zmi-patch"></main>');
        // ADD BOOTSTRAP CLASSES
        window.$(objScope).find('input[type="text"], input[type="file"], textarea, select').addClass('form-control zmi-patch');
        window.$(objScope).find('input[type="submit"]').addClass('btn btn-primary zmi-patch');
        window.$(objScope).find('textarea[name*=":text"]').addClass('zmi-code');
        window.$(objScope).find('table').addClass('table zmi-patch');
    }

    // integrate da https://github.com/collective/collective.codemirror/blob/master/src/collective/codemirror/static/convertTextAreas.js per code mirror

    convert_textareas() {
        var areas = this._zope.main.document.getElementsByClassName("codemirror-python");
        for (var i = areas.length - 1; i >= 0; i--) {
          this.convert_textarea(areas[i], 'python');
        };
        var areas = this._zope.main.document.getElementsByClassName("codemirror-zpt");
        for (var i = areas.length - 1; i >= 0; i--) {
          this.convert_textarea(areas[i], 'xml');
        };
    }
    convert_textarea(area, mode){
        // Create a form element that will submit the current cursor position
        // This is useful to show the cursor in the same position after save
        var cursor_form_element = document.createElement('input');
        cursor_form_element.type = 'hidden';
        cursor_form_element.name = 'codemirror-cursor-position';
        area.form.appendChild(cursor_form_element);

        var toggle_span = document.createElement('span');
        toggle_span.class = "codemirror_toggle";
        var toggle_id = '' + Math.floor(Math.random()*111111111);
        var toggle_checkbox = document.createElement('input');
        toggle_checkbox.type = 'checkbox';
        toggle_checkbox.id = toggle_id;
        toggle_checkbox.checked = this.get_cookie_status();
        toggle_checkbox.onchange = function() {
          if (this.checked) {
            this.set_cookie_status('true');
            enable();
          } else {
            this.set_cookie_status('');
            disable();
          }
        };
        var toggle_label = document.createElement('label');
        toggle_label.htmlFor = toggle_id;
        toggle_label.innerHTML = 'CodeMirror';
        toggle_span.appendChild(toggle_checkbox);
        toggle_span.appendChild(toggle_label);

        area.parentNode.insertBefore(toggle_span, area)
        var cm; // enable and disable both need to access this var
        var mode = area.getAttribute("data-codemirror-mode") || {name: 'xml', htmlMode: true};
        var enable = function() {
          cm = CodeMirror.fromTextArea(area, {
            value: area.value,
            mode: mode,
            indentUnit: 4,
            lineNumbers: true,
            matchBrackets: true,
            lineWrapping: true,
            extraKeys: {
              "Ctrl-S": area.onCodeMirrorSave || function() {},
              "F11": function() {
                  var scroller = cm.getScrollerElement();
                  if (scroller.className.search(/\bCodeMirror-fullscreen\b/) === -1) {
                    scroller.className += " CodeMirror-fullscreen";
                    scroller.style.height = "100%";
                    scroller.style.width = "100%";
                    cm.refresh();
                  } else {
                    scroller.className = scroller.className.replace(" CodeMirror-fullscreen", "");
                    scroller.style.height = '';
                    scroller.style.width = '';
                    cm.refresh();
                  }
                },
                "Esc": function() {
                  var scroller = cm.getScrollerElement();
                  if (scroller.className.search(/\bCodeMirror-fullscreen\b/) !== -1) {
                    scroller.className = scroller.className.replace(" CodeMirror-fullscreen", "");
                    scroller.style.height = '';
                    scroller.style.width = '';
                    cm.refresh();
                  }
                }
            },
            onCursorActivity: function() {
              var pos = cm.getCursor();
              cursor_form_element.value = '' + pos.line + '-' + pos.ch;
            }
          });
          if (area.onCodeMirrorLoad) {
            area.onCodeMirrorLoad(cm);
          }
        };
        var disable = function() {
          cm.toTextArea();
        };
        if (this.get_cookie_status()) {enable();}
    }
    get_cookie_status = function() {
        return getCookie('ccm_enabled');
    }
    set_cookie_status = function(status) {
        setCookie('ccm_enabled', status, 10, '/');
    }

}

function getCookie( name ) {
  var start = document.cookie.indexOf( name + "=" );
  var len = start + name.length + 1;
  if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) {
    return null;
  }
  if ( start == -1 ) return null;
  var end = document.cookie.indexOf( ';', len );
  if ( end == -1 ) end = document.cookie.length;
  return unescape( document.cookie.substring( len, end ) );
}

function setCookie( name, value, expires, path, domain, secure ) {
  var today = new Date();
  today.setTime( today.getTime() );
  if ( expires ) {
    expires = expires * 1000 * 60 * 60 * 24;
  }
  var expires_date = new Date( today.getTime() + (expires) );
  document.cookie = name+'='+escape( value ) +
    ( ( expires ) ? ';expires='+expires_date.toGMTString() : '' ) + //expires.toGMTString()
    ( ( path ) ? ';path=' + path : '' ) +
    ( ( domain ) ? ';domain=' + domain : '' ) +
    ( ( secure ) ? ';secure' : '' );
}


(function() {
    "use strict";
    var get_cookie_status = function() {
        return getCookie('ccm_enabled');
    };
    var set_cookie_status = function(status) {
        setCookie('ccm_enabled', status, 10, '/');
    };
    /* definisco dopo aver inizializzato le dipendenze e il costruttore, che cosa fare */
    ZopeJSEnhancerAPI.prototype.postLoadOperations = function(){
        if(this.isFirstLoad){
            this.isFirstLoad = false;
            this.postLoadOperationsCounter = 1;
            this.consoleDebug("|------ loading postLoadOperations -------|");
            this._zope.menu.links = this.getMenuObjects();

            // binding eventi al menù
            this.menuObjectInit();

            /* binding eventi alla lista oggetti */
            this.mainObjectInit();
            this.consoleDebug("|------ ended postLoadOperations -------|");
            ZopeJSEnhancerAPI.enableSpoilerCode(this._zope.main.document);

            this.consoleDebug("|------ loading extraDependencies -------|");
            var istance = this;
            // load dependencies for all subframes
            document.querySelectorAll('frame').forEach(function(item){
                istance.loadDependency(istance.extraDependencies,item.contentDocument,false);
            });
            this.consoleDebug("|------ ended extraDependencies -------|");
        } else {
            this.postLoadOperationsCounter++;
        }

    };

    /*  istanzio la classe */
    window.ZopeIstance = new ZopeJSEnhancerAPI(window,document,true);


})();
