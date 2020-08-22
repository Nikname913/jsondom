var domCreator = (tag,cls,attr=[],par,actType,actFunc) => {

  var elem = document.createElement(tag);
  elem.className = cls;

  if ( attr.length > 0 ) {
    for ( let i = 0; i < attr.length; i++ ) {
      elem.setAttribute(attr[i].split('::')[0], attr[i].split('::')[1]);
    }
  }

  var meth = actFunc;

  switch(actType) {

    case 'click':
      elem.addEventListener('mousedown', meth);
      break;

    case 'submit':
      elem.addEventListener('sumbit', meth);
      break;

    case 'text':
      elem.addEventListener('selectstart', meth);
      break;

  }

  par.appendChild(elem);
  return elem;

}

var modalForm = () => {

  var sh = domCreator('section','modalFOSshadow',[],document.body,false,false);
  var fos = domCreator('form','modalFOSshadow__fos',['method::POST', 'action::'],sh,false,false);

  for ( let i = 0; i < 3; i++ ) {
    var inp = domCreator('input','modalFOSshadow__fos__inp',['type::text', 'maxlength::40'],fos,false,false);
  }

  var sbm = domCreator('span','modalFOSshadow__fos__sbm',[],fos,false,false);
  var close = domCreator('span','modalFOSshadow__fos__close',[],fos,false,false);

  close.addEventListener('click', function() {

    sh.style.opacity = '0';
    setTimeout(function() { sh.remove(); }, 300);

  });

}

function jsnDOM() {

this.jsonDOM = {}
this.$dinamicInner = []
this.$inner = '';
this.$cssPath = '';
    
this.cssConnect = function(url) {
    
  var links = document.getElementsByTagName('link');
  for ( var i = 0; i < links.length; i++ ) {
      
      links[i].remove();
      
  }
    
  // <link rel="stylesheet" href="index.css">
  var css = domCreator('link','',['rel::stylesheet'],document.head,null,null);
  css.setAttribute('href', url);
    
}   
    
this.renderDom = function() {
    
  var GRL = `Can't find root element`;

  var els = document.querySelectorAll('*');
  for ( var i = 0; i < els.length; i++ ) {
    if ( els[i].hasAttribute('jsd') == true ) {
      GRL = els[i];
    }
  }

  if ( GRL !== `Can't find root element` ) {

    var INNER = GRL.innerHTML.trim();
    GRL.innerHTML = '';

    var innerPart = INNER.split('/*');
      
    // json creator
      
    var start = '{"render":[';
    var start2 = [];
      
    for ( var i = 0; i < innerPart.length - 1; i++ ) {
        
        var inpa = innerPart[i].trim(); // inpa - сокращение от innerPart
        
        if ( inpa.indexOf('{') == (-1) ) { // один уровень вложенности
            
            if ( i != (innerPart.length - 2) ) {
            
                var line = '{"tag": "' + inpa.split('.')[0] + '", "class": "' + inpa.split('.')[1] + '"},';
                start += line;
                
            }
            
            else {
                
                var line = '{"tag": "' + inpa.split('.')[0] + '", "class": "' + inpa.split('.')[1] + '"}';
                start += line;
                
            }
            
        }
        
        else { // два уровня вложенности
            
            var inpa2 = inpa.split('{')[0];
            
            if ( i != (innerPart.length - 2) ) {
            
                var parentClass = 'parcl' + (Math.random() * 1000000).toFixed(0);
                var endCheck = false;
                
                console.log(parentClass);    
                
                var line1 = '{"tag": "' + inpa2.split('.')[0] + '", "class": "' + inpa2.split('.')[1] + ' ' + parentClass + '"},';
                start += line1;
                
            }
            
            else {
                
                var parentClass = 'parcl' + (Math.random() * 1000000).toFixed(0);
                var endCheck = true;
                
                console.log(parentClass);   
                
                var line1 = '{"tag": "' + inpa2.split('.')[0] + '", "class": "' + inpa2.split('.')[1] + ' ' + parentClass + '"}';
                start += line1;
                
            }
            
            if ( inpa.split('{').length == 2 ) {
            
            var inpa3 = inpa.split('{')[1].split('}')[0].trim().split('/1*'); // в эту переменую кладется содержимое фигурных скобок в inpa2    
            
            {   
                
                for ( let i = 0; i < inpa3.length - 1; i++ ) {
                    
                    if ( i != (inpa3.length - 2) ) {
            
                        var line2 = '{"tag": "' + inpa3[i].trim().split('.')[0] + '", "class": "' + inpa3[i].trim().split('.')[1] + '", "parent": "' + parentClass + '"},';
                        start2.push(line2);
                
                    }
            
                    else {
                
                        var line2 = '{"tag": "' + inpa3[i].trim().split('.')[0] + '", "class": "' + inpa3[i].trim().split('.')[1] + '", "parent": "' + parentClass + '"},';
                        start2.push(line2);
                
                    }
                    
                }
                
            }
            
            }
            
            else { // три уровня вложенности
                
                var inpa3 = inpa.split('{');
                var inpa3Packet = '{';
                
                {
                    
                    for ( let i = 1; i < inpa3.length; i++ ) {
                        
                        if ( i != (inpa3.length - 1) ) {
                        
                            inpa3Packet += inpa3[i] + '{';
                            
                        }
                        
                        else {
                            
                            inpa3Packet += inpa3[i];
                            
                        }
                        
                    }
                    
                }
                
                // console.log('Проверка уровня 3 - ' + inpa3Packet);
                
                var inpa3Packet2 = '';
                
                {
                    
                    for ( let i = 1; i < inpa3Packet.length; i++ ) {
                        
                        inpa3Packet2 += inpa3Packet[i]; // отсекаем фигурную скобку в начале
                        
                    }
                    
                }
                
                // alert(inpa3Packet2);
                
                var inpa4 = inpa3Packet2.split('/1*');
                
                {
                    
                    for ( let i = 0; i < inpa4.length - 1; i++ ) {
                        
                        var parentClass2 = 'parcl' + (Math.random() * 1000000).toFixed(0);
                        
                        console.log('Проверка уровня 3 - ' + inpa4[i]);
                        
                        if ( inpa4[i].indexOf('{') != (-1) ) {
                        
                        var inpa5 = inpa4[i].split('{')[0];
                        
                        var line3 = '{"tag": "' + inpa5.trim().split('.')[0] + '", "class": "' + inpa5.trim().split('.')[1] + ' ' + parentClass2 + '", "parent": "' + parentClass + '"},';
                        start2.push(line3);
                        
                        // формируем json для третьего уровня вложенности
                        
                        if ( inpa4[i].indexOf('3*') == (-1) ) {
                        
                        var inpa6 = inpa4[i].split('{')[1].split('}')[0].trim().split('/2*'); // в эту переменую кладется содержимое фигурных скобок в inpa4[i]
                        
                        for ( var ii = 0; ii < inpa6.length - 1; ii++ ) {
                        
                        	if ( inpa6[ii].indexOf('{') != (-1) ) {
                        		
                        		// alert(250);
                        		
                        	}
                        	
                        	else {
                            
                            	console.log('Проверка уровня 3 - вложенности - ' + inpa6[ii].trim());
                            	
                            	var line4 = '{"tag": "' + inpa6[ii].trim().split('.')[0] + '", "class": "' + inpa6[ii].trim().split('.')[1] + '", "parent": "' + parentClass2 + '"},';
                            	start2.push(line4);
                            
                        	}	
                            
                        }
                        
                        }
                        
                        else { // уровень вложенности 4
                        	
                        	var parentClass3 = 'parcl' + (Math.random() * 1000000).toFixed(0);
                        	
                        	var inpa6 = inpa4[i].split('{')[0].trim();
                        	
                        	var inpa7 = inpa4[i].split('{'); // [1].split('}')[0].trim().split('/2*');
                        	
                        	for ( var k = 1; k < inpa7.length; k++ ) {
                        		
                        		var inpa7trim = inpa7[k].trim();
                        		
                        		if ( inpa7trim.indexOf('/3*') != (-1) ) { // уровень вложенности 4 - формирование
                        			
                        			{
                        				
                        				for ( let i = 0; i < inpa7trim.split('/3*').length - 1; i++ ) {
                        					
                        					var inpa8 = inpa7trim.split('/3*')[i].trim();
                        					
                        					if ( inpa8.indexOf('[') == (-1) ) {
                        					
                        						var line5 = '{"tag": "' + inpa8.split('.')[0] + '", "class": "' + inpa8.split('.')[1] + '", "parent": "' + parentClass3 + '"},';
                        						start2.push(line5);
                        					
                        					}
                        					
                        					else { // уровень вложенности 5
                        					
                        						var parentClass4 = 'parcl' + (Math.random() * 1000000).toFixed(0);
                        						
                        						var inpa9 = inpa8.split('[')[0]
                        						
                        						var line5 = '{"tag": "' + inpa9.split('.')[0] + '", "class": "' + inpa9.split('.')[1] + ' ' + parentClass4 + '", "parent": "' + parentClass3 + '"},';
                        						start2.push(line5);
                        						
                        						var inpa10 = inpa8.split('[')[1].split(']')[0].split(', ');
                        						
                        						for ( k in inpa10 ) {
                        							
                        							var line6 = '{"tag": "' + inpa10[k].split('.')[0] + '", "class": "' + inpa10[k].split('.')[1] + '", "parent": "' + parentClass4 + '"},';
                        							start2.push(line6);
                        							
                        						}
                        						
                        					}
                        					
                        				}
                        				
                        			}
                        			
                        		}
                        		
                        		else {
                        			
                        			var line4 = '{"tag": "' + inpa7trim.split('.')[0] + '", "class": "' + inpa7trim.split('.')[1] + ' ' + parentClass3 + '", "parent": "' + parentClass2 + '"},';
                        			start2.push(line4);
                        			
                        		}
                        		
                        	}
                        	
                        	
                        }
                            
                        }
                        
                        else {
                            
                            var line3 = '{"tag": "' + inpa4[i].trim().split('.')[0] + '", "class": "' + inpa4[i].trim().split('.')[1] + '", "parent": "' + parentClass + '"},';
                            start2.push(line3);
                            
                        }
                        
                    }
                    
                }
                
            }
            
            // var line2 = ',{"tag": "' + inpa3.split('.')[0] + '", "class": "' + inpa3.split('.')[1] + '", "parent": "' + parentClass + '"}';
                
            console.log(start2);
            
        }
        
    }
      
    start += ',';
      
    for ( var i = 0; i < start2.length; i++ ) {
        
        start += start2[i];
        
    }
      
    start += '{"tag": "span", "class": "grl-specHidden"}]}';  
      
    console.log(start + ' - start');
      
    // json to html render 
      
    var dom = JSON.parse(start);
    this.jsonDOM = dom;
      
    // console.log(dom.render.length);  
    
    for ( var i = 0; i < dom.render.length; i++ ) {
        
        if ( dom.render[i].parent == undefined ) {
        
            var elem = domCreator(dom.render[i].tag,dom.render[i].class,[],document.getElementsByClassName('jsd')[0],null,null);
            
        }
        
        else {
            
            var col = document.querySelectorAll('*');
            for ( var ii = 0; ii < col.length; ii++ ) {
                
                if ( col[ii].hasAttribute('class') == true ) {
                if ( col[ii].getAttribute('class').indexOf(dom.render[i].parent) != (-1) ) {
                    
                    var parElem = col[ii];
                    
                }}
                
            }
            
            var elem = domCreator(dom.render[i].tag,dom.render[i].class,[],parElem,null,null);
            
        }
        
        var innerDOM = JSON.parse(this.$inner);
        for ( var ii = 0; ii < innerDOM.data.length; ii++ ) {
            
            // alert(elem.className);
            if ( elem.className == innerDOM.data[ii].inner.split('::')[0] ) {
                
                if ( innerDOM.data[ii].inner.split('::')[1].indexOf('j$') == (-1) ) { 
                
                    elem.innerHTML = innerDOM.data[ii].inner.split('::')[1];
                    
                }
                
                else {
                    
                    var number = innerDOM.data[ii].inner.split('::')[1].split('[')[1].split(']')[0];
                    
                    {
                        
                        for ( let i = 0; i < this.$dinamicInner.length; i++ ) {
                            
                            if ( i == number ) { var content = this.$dinamicInner[i]; }
                            
                        }
                        
                    }
                    
                    elem.innerHTML = content;
                    
                }
                
            }
            
        }
        
    }
      
    document.getElementsByClassName('grl-specHidden')[0].remove();

  }

}

this.dinamicData = function() {
    
    var elems = document.querySelectorAll('*');
    
    for ( var i = 0; i < elems.length; i++ ) {
        
    let elem = elems[i];    
    
    var innerDOM = JSON.parse(this.$inner);
    for ( var ii = 0; ii < innerDOM.data.length; ii++ ) {
            
        // alert(elem.className);
        if ( elem.className == innerDOM.data[ii].inner.split('::')[0] ) {
                
            if ( innerDOM.data[ii].inner.split('::')[1].indexOf('j$') == (-1) ) { 
                
                // elem.innerHTML = innerDOM.data[ii].inner.split('::')[1];
                    
            }
                
            else {
                    
                var number = innerDOM.data[ii].inner.split('::')[1].split('[')[1].split(']')[0];
                    
                {
                        
                    for ( let i = 0; i < this.$dinamicInner.length; i++ ) {
                            
                        if ( i == number ) { var content = this.$dinamicInner[i]; }
                            
                    }
                        
                }
                
                if ( elem.innerHTML != content ) {
                
                    elem.innerHTML = content;
                    
                }
                    
            }
                
        }
            
    }}
    
}

// бета версия модуля

this.request = function(url, params={}, resType) {
	
	if ( resType == undefined ) {
	
		$.get(url, {}, cb);
	
		function cb(data) {
		
			alert(data);
		
		}
	
	}
	
}

}

var j$ = new jsnDOM();
setTimeout(function() {
    setInterval(function() {
      j$.dinamicData();  
    }, 400);
}, 1000);
