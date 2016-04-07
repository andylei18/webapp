webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * Created by dinglei on 16/3/18.
	 */
	//VUE 依赖配置
	var Vue = __webpack_require__(8);
	var VueRouter = __webpack_require__(10);
	Vue.use(VueRouter);
	var VueAsyncData = __webpack_require__(11);
	Vue.use(VueAsyncData);
	var App = Vue.extend(__webpack_require__(12));
	
	$.ajaxSettings.crossDomain = true;
	
	//防止点击穿透
	var fastclick = __webpack_require__(19);
	fastclick.attach(document.body);
	
	// 使用 Mock
	window.Mock = __webpack_require__(20);
	
	var router = new VueRouter({
	    hashbang: true,  //为true的时候 example.com/#!/foo/bar ， false的时候 example.com/#/foo/bar
	    //abstract:true,
	    //地址栏不会有变化
	    //以下设置需要服务端设置
	    //history: false,   //当使用 HTML5 history 模式时，服务器需要被正确配置 以防用户在直接访问链接时会遇到404页面。
	    //saveScrollPosition: false
	    history: false,
	    saveScrollPosition: true,
	    transitionOnLoad: true,
	    linkActiveClass:'nav-active' //全局设置连接匹配时的类名 参考http://vuejs.github.io/vue-router/en/link.html
	});
	
	//登录中间验证，页面需要登录而没有登录的情况直接跳转登录
	router.beforeEach(function(transition) {
	    //处理左侧滚动不影响右边
	    //$("html, body, #page").removeClass("scroll-hide");
	    if (transition.to.auth) {
	        if (localStorage.userId) {
	            transition.next();
	        } else {
	            var redirect = encodeURIComponent(transition.to.path);
	            transition.redirect('/login?redirect=' + redirect);
	        }
	    } else {
	        transition.next();
	    }
	});
	
	__webpack_require__(21)(router);
	
	router.start(App,'#app');
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 7 */
/***/ function(module, exports) {

	/* Zepto v1.1.6 - zepto event ajax form ie - zeptojs.com/license */
	
	var Zepto = module.exports = (function() {
	  var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter,
	    document = window.document,
	    elementDisplay = {}, classCache = {},
	    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
	    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
	    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	    rootNodeRE = /^(?:body|html)$/i,
	    capitalRE = /([A-Z])/g,
	
	    // special attributes that should be get/set via method calls
	    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],
	
	    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
	    table = document.createElement('table'),
	    tableRow = document.createElement('tr'),
	    containers = {
	      'tr': document.createElement('tbody'),
	      'tbody': table, 'thead': table, 'tfoot': table,
	      'td': tableRow, 'th': tableRow,
	      '*': document.createElement('div')
	    },
	    readyRE = /complete|loaded|interactive/,
	    simpleSelectorRE = /^[\w-]*$/,
	    class2type = {},
	    toString = class2type.toString,
	    zepto = {},
	    camelize, uniq,
	    tempParent = document.createElement('div'),
	    propMap = {
	      'tabindex': 'tabIndex',
	      'readonly': 'readOnly',
	      'for': 'htmlFor',
	      'class': 'className',
	      'maxlength': 'maxLength',
	      'cellspacing': 'cellSpacing',
	      'cellpadding': 'cellPadding',
	      'rowspan': 'rowSpan',
	      'colspan': 'colSpan',
	      'usemap': 'useMap',
	      'frameborder': 'frameBorder',
	      'contenteditable': 'contentEditable'
	    },
	    isArray = Array.isArray ||
	      function(object){ return object instanceof Array }
	
	  zepto.matches = function(element, selector) {
	    if (!selector || !element || element.nodeType !== 1) return false
	    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
	                          element.oMatchesSelector || element.matchesSelector
	    if (matchesSelector) return matchesSelector.call(element, selector)
	    // fall back to performing a selector:
	    var match, parent = element.parentNode, temp = !parent
	    if (temp) (parent = tempParent).appendChild(element)
	    match = ~zepto.qsa(parent, selector).indexOf(element)
	    temp && tempParent.removeChild(element)
	    return match
	  }
	
	  function type(obj) {
	    return obj == null ? String(obj) :
	      class2type[toString.call(obj)] || "object"
	  }
	
	  function isFunction(value) { return type(value) == "function" }
	  function isWindow(obj)     { return obj != null && obj == obj.window }
	  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
	  function isObject(obj)     { return type(obj) == "object" }
	  function isPlainObject(obj) {
	    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
	  }
	  function likeArray(obj) { return typeof obj.length == 'number' }
	
	  function compact(array) { return filter.call(array, function(item){ return item != null }) }
	  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
	  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
	  function dasherize(str) {
	    return str.replace(/::/g, '/')
	           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
	           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
	           .replace(/_/g, '-')
	           .toLowerCase()
	  }
	  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }
	
	  function classRE(name) {
	    return name in classCache ?
	      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
	  }
	
	  function maybeAddPx(name, value) {
	    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
	  }
	
	  function defaultDisplay(nodeName) {
	    var element, display
	    if (!elementDisplay[nodeName]) {
	      element = document.createElement(nodeName)
	      document.body.appendChild(element)
	      display = getComputedStyle(element, '').getPropertyValue("display")
	      element.parentNode.removeChild(element)
	      display == "none" && (display = "block")
	      elementDisplay[nodeName] = display
	    }
	    return elementDisplay[nodeName]
	  }
	
	  function children(element) {
	    return 'children' in element ?
	      slice.call(element.children) :
	      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
	  }
	
	  // `$.zepto.fragment` takes a html string and an optional tag name
	  // to generate DOM nodes nodes from the given html string.
	  // The generated DOM nodes are returned as an array.
	  // This function can be overriden in plugins for example to make
	  // it compatible with browsers that don't support the DOM fully.
	  zepto.fragment = function(html, name, properties) {
	    var dom, nodes, container
	
	    // A special case optimization for a single tag
	    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))
	
	    if (!dom) {
	      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
	      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
	      if (!(name in containers)) name = '*'
	
	      container = containers[name]
	      container.innerHTML = '' + html
	      dom = $.each(slice.call(container.childNodes), function(){
	        container.removeChild(this)
	      })
	    }
	
	    if (isPlainObject(properties)) {
	      nodes = $(dom)
	      $.each(properties, function(key, value) {
	        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
	        else nodes.attr(key, value)
	      })
	    }
	
	    return dom
	  }
	
	  // `$.zepto.Z` swaps out the prototype of the given `dom` array
	  // of nodes with `$.fn` and thus supplying all the Zepto functions
	  // to the array. Note that `__proto__` is not supported on Internet
	  // Explorer. This method can be overriden in plugins.
	  zepto.Z = function(dom, selector) {
	    dom = dom || []
	    dom.__proto__ = $.fn
	    dom.selector = selector || ''
	    return dom
	  }
	
	  // `$.zepto.isZ` should return `true` if the given object is a Zepto
	  // collection. This method can be overriden in plugins.
	  zepto.isZ = function(object) {
	    return object instanceof zepto.Z
	  }
	
	  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
	  // takes a CSS selector and an optional context (and handles various
	  // special cases).
	  // This method can be overriden in plugins.
	  zepto.init = function(selector, context) {
	    var dom
	    // If nothing given, return an empty Zepto collection
	    if (!selector) return zepto.Z()
	    // Optimize for string selectors
	    else if (typeof selector == 'string') {
	      selector = selector.trim()
	      // If it's a html fragment, create nodes from it
	      // Note: In both Chrome 21 and Firefox 15, DOM error 12
	      // is thrown if the fragment doesn't begin with <
	      if (selector[0] == '<' && fragmentRE.test(selector))
	        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
	      // If there's a context, create a collection on that context first, and select
	      // nodes from there
	      else if (context !== undefined) return $(context).find(selector)
	      // If it's a CSS selector, use it to select nodes.
	      else dom = zepto.qsa(document, selector)
	    }
	    // If a function is given, call it when the DOM is ready
	    else if (isFunction(selector)) return $(document).ready(selector)
	    // If a Zepto collection is given, just return it
	    else if (zepto.isZ(selector)) return selector
	    else {
	      // normalize array if an array of nodes is given
	      if (isArray(selector)) dom = compact(selector)
	      // Wrap DOM nodes.
	      else if (isObject(selector))
	        dom = [selector], selector = null
	      // If it's a html fragment, create nodes from it
	      else if (fragmentRE.test(selector))
	        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
	      // If there's a context, create a collection on that context first, and select
	      // nodes from there
	      else if (context !== undefined) return $(context).find(selector)
	      // And last but no least, if it's a CSS selector, use it to select nodes.
	      else dom = zepto.qsa(document, selector)
	    }
	    // create a new Zepto collection from the nodes found
	    return zepto.Z(dom, selector)
	  }
	
	  // `$` will be the base `Zepto` object. When calling this
	  // function just call `$.zepto.init, which makes the implementation
	  // details of selecting nodes and creating Zepto collections
	  // patchable in plugins.
	  $ = function(selector, context){
	    return zepto.init(selector, context)
	  }
	
	  function extend(target, source, deep) {
	    for (key in source)
	      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
	          target[key] = {}
	        if (isArray(source[key]) && !isArray(target[key]))
	          target[key] = []
	        extend(target[key], source[key], deep)
	      }
	      else if (source[key] !== undefined) target[key] = source[key]
	  }
	
	  // Copy all but undefined properties from one or more
	  // objects to the `target` object.
	  $.extend = function(target){
	    var deep, args = slice.call(arguments, 1)
	    if (typeof target == 'boolean') {
	      deep = target
	      target = args.shift()
	    }
	    args.forEach(function(arg){ extend(target, arg, deep) })
	    return target
	  }
	
	  // `$.zepto.qsa` is Zepto's CSS selector implementation which
	  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
	  // This method can be overriden in plugins.
	  zepto.qsa = function(element, selector){
	    var found,
	        maybeID = selector[0] == '#',
	        maybeClass = !maybeID && selector[0] == '.',
	        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
	        isSimple = simpleSelectorRE.test(nameOnly)
	    return (isDocument(element) && isSimple && maybeID) ?
	      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
	      (element.nodeType !== 1 && element.nodeType !== 9) ? [] :
	      slice.call(
	        isSimple && !maybeID ?
	          maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
	          element.getElementsByTagName(selector) : // Or a tag
	          element.querySelectorAll(selector) // Or it's not simple, and we need to query all
	      )
	  }
	
	  function filtered(nodes, selector) {
	    return selector == null ? $(nodes) : $(nodes).filter(selector)
	  }
	
	  $.contains = document.documentElement.contains ?
	    function(parent, node) {
	      return parent !== node && parent.contains(node)
	    } :
	    function(parent, node) {
	      while (node && (node = node.parentNode))
	        if (node === parent) return true
	      return false
	    }
	
	  function funcArg(context, arg, idx, payload) {
	    return isFunction(arg) ? arg.call(context, idx, payload) : arg
	  }
	
	  function setAttribute(node, name, value) {
	    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
	  }
	
	  // access className property while respecting SVGAnimatedString
	  function className(node, value){
	    var klass = node.className || '',
	        svg   = klass && klass.baseVal !== undefined
	
	    if (value === undefined) return svg ? klass.baseVal : klass
	    svg ? (klass.baseVal = value) : (node.className = value)
	  }
	
	  // "true"  => true
	  // "false" => false
	  // "null"  => null
	  // "42"    => 42
	  // "42.5"  => 42.5
	  // "08"    => "08"
	  // JSON    => parse if valid
	  // String  => self
	  function deserializeValue(value) {
	    try {
	      return value ?
	        value == "true" ||
	        ( value == "false" ? false :
	          value == "null" ? null :
	          +value + "" == value ? +value :
	          /^[\[\{]/.test(value) ? $.parseJSON(value) :
	          value )
	        : value
	    } catch(e) {
	      return value
	    }
	  }
	
	  $.type = type
	  $.isFunction = isFunction
	  $.isWindow = isWindow
	  $.isArray = isArray
	  $.isPlainObject = isPlainObject
	
	  $.isEmptyObject = function(obj) {
	    var name
	    for (name in obj) return false
	    return true
	  }
	
	  $.inArray = function(elem, array, i){
	    return emptyArray.indexOf.call(array, elem, i)
	  }
	
	  $.camelCase = camelize
	  $.trim = function(str) {
	    return str == null ? "" : String.prototype.trim.call(str)
	  }
	
	  // plugin compatibility
	  $.uuid = 0
	  $.support = { }
	  $.expr = { }
	
	  $.map = function(elements, callback){
	    var value, values = [], i, key
	    if (likeArray(elements))
	      for (i = 0; i < elements.length; i++) {
	        value = callback(elements[i], i)
	        if (value != null) values.push(value)
	      }
	    else
	      for (key in elements) {
	        value = callback(elements[key], key)
	        if (value != null) values.push(value)
	      }
	    return flatten(values)
	  }
	
	  $.each = function(elements, callback){
	    var i, key
	    if (likeArray(elements)) {
	      for (i = 0; i < elements.length; i++)
	        if (callback.call(elements[i], i, elements[i]) === false) return elements
	    } else {
	      for (key in elements)
	        if (callback.call(elements[key], key, elements[key]) === false) return elements
	    }
	
	    return elements
	  }
	
	  $.grep = function(elements, callback){
	    return filter.call(elements, callback)
	  }
	
	  if (window.JSON) $.parseJSON = JSON.parse
	
	  // Populate the class2type map
	  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	    class2type[ "[object " + name + "]" ] = name.toLowerCase()
	  })
	
	  // Define methods that will be available on all
	  // Zepto collections
	  $.fn = {
	    // Because a collection acts like an array
	    // copy over these useful array functions.
	    forEach: emptyArray.forEach,
	    reduce: emptyArray.reduce,
	    push: emptyArray.push,
	    sort: emptyArray.sort,
	    indexOf: emptyArray.indexOf,
	    concat: emptyArray.concat,
	
	    // `map` and `slice` in the jQuery API work differently
	    // from their array counterparts
	    map: function(fn){
	      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
	    },
	    slice: function(){
	      return $(slice.apply(this, arguments))
	    },
	
	    ready: function(callback){
	      // need to check if document.body exists for IE as that browser reports
	      // document ready when it hasn't yet created the body element
	      if (readyRE.test(document.readyState) && document.body) callback($)
	      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
	      return this
	    },
	    get: function(idx){
	      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
	    },
	    toArray: function(){ return this.get() },
	    size: function(){
	      return this.length
	    },
	    remove: function(){
	      return this.each(function(){
	        if (this.parentNode != null)
	          this.parentNode.removeChild(this)
	      })
	    },
	    each: function(callback){
	      emptyArray.every.call(this, function(el, idx){
	        return callback.call(el, idx, el) !== false
	      })
	      return this
	    },
	    filter: function(selector){
	      if (isFunction(selector)) return this.not(this.not(selector))
	      return $(filter.call(this, function(element){
	        return zepto.matches(element, selector)
	      }))
	    },
	    add: function(selector,context){
	      return $(uniq(this.concat($(selector,context))))
	    },
	    is: function(selector){
	      return this.length > 0 && zepto.matches(this[0], selector)
	    },
	    not: function(selector){
	      var nodes=[]
	      if (isFunction(selector) && selector.call !== undefined)
	        this.each(function(idx){
	          if (!selector.call(this,idx)) nodes.push(this)
	        })
	      else {
	        var excludes = typeof selector == 'string' ? this.filter(selector) :
	          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
	        this.forEach(function(el){
	          if (excludes.indexOf(el) < 0) nodes.push(el)
	        })
	      }
	      return $(nodes)
	    },
	    has: function(selector){
	      return this.filter(function(){
	        return isObject(selector) ?
	          $.contains(this, selector) :
	          $(this).find(selector).size()
	      })
	    },
	    eq: function(idx){
	      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
	    },
	    first: function(){
	      var el = this[0]
	      return el && !isObject(el) ? el : $(el)
	    },
	    last: function(){
	      var el = this[this.length - 1]
	      return el && !isObject(el) ? el : $(el)
	    },
	    find: function(selector){
	      var result, $this = this
	      if (!selector) result = $()
	      else if (typeof selector == 'object')
	        result = $(selector).filter(function(){
	          var node = this
	          return emptyArray.some.call($this, function(parent){
	            return $.contains(parent, node)
	          })
	        })
	      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
	      else result = this.map(function(){ return zepto.qsa(this, selector) })
	      return result
	    },
	    closest: function(selector, context){
	      var node = this[0], collection = false
	      if (typeof selector == 'object') collection = $(selector)
	      while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
	        node = node !== context && !isDocument(node) && node.parentNode
	      return $(node)
	    },
	    parents: function(selector){
	      var ancestors = [], nodes = this
	      while (nodes.length > 0)
	        nodes = $.map(nodes, function(node){
	          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
	            ancestors.push(node)
	            return node
	          }
	        })
	      return filtered(ancestors, selector)
	    },
	    parent: function(selector){
	      return filtered(uniq(this.pluck('parentNode')), selector)
	    },
	    children: function(selector){
	      return filtered(this.map(function(){ return children(this) }), selector)
	    },
	    contents: function() {
	      return this.map(function() { return slice.call(this.childNodes) })
	    },
	    siblings: function(selector){
	      return filtered(this.map(function(i, el){
	        return filter.call(children(el.parentNode), function(child){ return child!==el })
	      }), selector)
	    },
	    empty: function(){
	      return this.each(function(){ this.innerHTML = '' })
	    },
	    // `pluck` is borrowed from Prototype.js
	    pluck: function(property){
	      return $.map(this, function(el){ return el[property] })
	    },
	    show: function(){
	      return this.each(function(){
	        this.style.display == "none" && (this.style.display = '')
	        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
	          this.style.display = defaultDisplay(this.nodeName)
	      })
	    },
	    replaceWith: function(newContent){
	      return this.before(newContent).remove()
	    },
	    wrap: function(structure){
	      var func = isFunction(structure)
	      if (this[0] && !func)
	        var dom   = $(structure).get(0),
	            clone = dom.parentNode || this.length > 1
	
	      return this.each(function(index){
	        $(this).wrapAll(
	          func ? structure.call(this, index) :
	            clone ? dom.cloneNode(true) : dom
	        )
	      })
	    },
	    wrapAll: function(structure){
	      if (this[0]) {
	        $(this[0]).before(structure = $(structure))
	        var children
	        // drill down to the inmost element
	        while ((children = structure.children()).length) structure = children.first()
	        $(structure).append(this)
	      }
	      return this
	    },
	    wrapInner: function(structure){
	      var func = isFunction(structure)
	      return this.each(function(index){
	        var self = $(this), contents = self.contents(),
	            dom  = func ? structure.call(this, index) : structure
	        contents.length ? contents.wrapAll(dom) : self.append(dom)
	      })
	    },
	    unwrap: function(){
	      this.parent().each(function(){
	        $(this).replaceWith($(this).children())
	      })
	      return this
	    },
	    clone: function(){
	      return this.map(function(){ return this.cloneNode(true) })
	    },
	    hide: function(){
	      return this.css("display", "none")
	    },
	    toggle: function(setting){
	      return this.each(function(){
	        var el = $(this)
	        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
	      })
	    },
	    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
	    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
	    html: function(html){
	      return 0 in arguments ?
	        this.each(function(idx){
	          var originHtml = this.innerHTML
	          $(this).empty().append( funcArg(this, html, idx, originHtml) )
	        }) :
	        (0 in this ? this[0].innerHTML : null)
	    },
	    text: function(text){
	      return 0 in arguments ?
	        this.each(function(idx){
	          var newText = funcArg(this, text, idx, this.textContent)
	          this.textContent = newText == null ? '' : ''+newText
	        }) :
	        (0 in this ? this[0].textContent : null)
	    },
	    attr: function(name, value){
	      var result
	      return (typeof name == 'string' && !(1 in arguments)) ?
	        (!this.length || this[0].nodeType !== 1 ? undefined :
	          (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
	        ) :
	        this.each(function(idx){
	          if (this.nodeType !== 1) return
	          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
	          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
	        })
	    },
	    removeAttr: function(name){
	      return this.each(function(){ this.nodeType === 1 && name.split(' ').forEach(function(attribute){
	        setAttribute(this, attribute)
	      }, this)})
	    },
	    prop: function(name, value){
	      name = propMap[name] || name
	      return (1 in arguments) ?
	        this.each(function(idx){
	          this[name] = funcArg(this, value, idx, this[name])
	        }) :
	        (this[0] && this[0][name])
	    },
	    data: function(name, value){
	      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()
	
	      var data = (1 in arguments) ?
	        this.attr(attrName, value) :
	        this.attr(attrName)
	
	      return data !== null ? deserializeValue(data) : undefined
	    },
	    val: function(value){
	      return 0 in arguments ?
	        this.each(function(idx){
	          this.value = funcArg(this, value, idx, this.value)
	        }) :
	        (this[0] && (this[0].multiple ?
	           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
	           this[0].value)
	        )
	    },
	    offset: function(coordinates){
	      if (coordinates) return this.each(function(index){
	        var $this = $(this),
	            coords = funcArg(this, coordinates, index, $this.offset()),
	            parentOffset = $this.offsetParent().offset(),
	            props = {
	              top:  coords.top  - parentOffset.top,
	              left: coords.left - parentOffset.left
	            }
	
	        if ($this.css('position') == 'static') props['position'] = 'relative'
	        $this.css(props)
	      })
	      if (!this.length) return null
	      var obj = this[0].getBoundingClientRect()
	      return {
	        left: obj.left + window.pageXOffset,
	        top: obj.top + window.pageYOffset,
	        width: Math.round(obj.width),
	        height: Math.round(obj.height)
	      }
	    },
	    css: function(property, value){
	      if (arguments.length < 2) {
	        var computedStyle, element = this[0]
	        if(!element) return
	        computedStyle = getComputedStyle(element, '')
	        if (typeof property == 'string')
	          return element.style[camelize(property)] || computedStyle.getPropertyValue(property)
	        else if (isArray(property)) {
	          var props = {}
	          $.each(property, function(_, prop){
	            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
	          })
	          return props
	        }
	      }
	
	      var css = ''
	      if (type(property) == 'string') {
	        if (!value && value !== 0)
	          this.each(function(){ this.style.removeProperty(dasherize(property)) })
	        else
	          css = dasherize(property) + ":" + maybeAddPx(property, value)
	      } else {
	        for (key in property)
	          if (!property[key] && property[key] !== 0)
	            this.each(function(){ this.style.removeProperty(dasherize(key)) })
	          else
	            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
	      }
	
	      return this.each(function(){ this.style.cssText += ';' + css })
	    },
	    index: function(element){
	      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
	    },
	    hasClass: function(name){
	      if (!name) return false
	      return emptyArray.some.call(this, function(el){
	        return this.test(className(el))
	      }, classRE(name))
	    },
	    addClass: function(name){
	      if (!name) return this
	      return this.each(function(idx){
	        if (!('className' in this)) return
	        classList = []
	        var cls = className(this), newName = funcArg(this, name, idx, cls)
	        newName.split(/\s+/g).forEach(function(klass){
	          if (!$(this).hasClass(klass)) classList.push(klass)
	        }, this)
	        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
	      })
	    },
	    removeClass: function(name){
	      return this.each(function(idx){
	        if (!('className' in this)) return
	        if (name === undefined) return className(this, '')
	        classList = className(this)
	        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
	          classList = classList.replace(classRE(klass), " ")
	        })
	        className(this, classList.trim())
	      })
	    },
	    toggleClass: function(name, when){
	      if (!name) return this
	      return this.each(function(idx){
	        var $this = $(this), names = funcArg(this, name, idx, className(this))
	        names.split(/\s+/g).forEach(function(klass){
	          (when === undefined ? !$this.hasClass(klass) : when) ?
	            $this.addClass(klass) : $this.removeClass(klass)
	        })
	      })
	    },
	    scrollTop: function(value){
	      if (!this.length) return
	      var hasScrollTop = 'scrollTop' in this[0]
	      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
	      return this.each(hasScrollTop ?
	        function(){ this.scrollTop = value } :
	        function(){ this.scrollTo(this.scrollX, value) })
	    },
	    scrollLeft: function(value){
	      if (!this.length) return
	      var hasScrollLeft = 'scrollLeft' in this[0]
	      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
	      return this.each(hasScrollLeft ?
	        function(){ this.scrollLeft = value } :
	        function(){ this.scrollTo(value, this.scrollY) })
	    },
	    position: function() {
	      if (!this.length) return
	
	      var elem = this[0],
	        // Get *real* offsetParent
	        offsetParent = this.offsetParent(),
	        // Get correct offsets
	        offset       = this.offset(),
	        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()
	
	      // Subtract element margins
	      // note: when an element has margin: auto the offsetLeft and marginLeft
	      // are the same in Safari causing offset.left to incorrectly be 0
	      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
	      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0
	
	      // Add offsetParent borders
	      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
	      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0
	
	      // Subtract the two offsets
	      return {
	        top:  offset.top  - parentOffset.top,
	        left: offset.left - parentOffset.left
	      }
	    },
	    offsetParent: function() {
	      return this.map(function(){
	        var parent = this.offsetParent || document.body
	        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
	          parent = parent.offsetParent
	        return parent
	      })
	    }
	  }
	
	  // for now
	  $.fn.detach = $.fn.remove
	
	  // Generate the `width` and `height` functions
	  ;['width', 'height'].forEach(function(dimension){
	    var dimensionProperty =
	      dimension.replace(/./, function(m){ return m[0].toUpperCase() })
	
	    $.fn[dimension] = function(value){
	      var offset, el = this[0]
	      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
	        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
	        (offset = this.offset()) && offset[dimension]
	      else return this.each(function(idx){
	        el = $(this)
	        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
	      })
	    }
	  })
	
	  function traverseNode(node, fun) {
	    fun(node)
	    for (var i = 0, len = node.childNodes.length; i < len; i++)
	      traverseNode(node.childNodes[i], fun)
	  }
	
	  // Generate the `after`, `prepend`, `before`, `append`,
	  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
	  adjacencyOperators.forEach(function(operator, operatorIndex) {
	    var inside = operatorIndex % 2 //=> prepend, append
	
	    $.fn[operator] = function(){
	      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
	      var argType, nodes = $.map(arguments, function(arg) {
	            argType = type(arg)
	            return argType == "object" || argType == "array" || arg == null ?
	              arg : zepto.fragment(arg)
	          }),
	          parent, copyByClone = this.length > 1
	      if (nodes.length < 1) return this
	
	      return this.each(function(_, target){
	        parent = inside ? target : target.parentNode
	
	        // convert all methods to a "before" operation
	        target = operatorIndex == 0 ? target.nextSibling :
	                 operatorIndex == 1 ? target.firstChild :
	                 operatorIndex == 2 ? target :
	                 null
	
	        var parentInDocument = $.contains(document.documentElement, parent)
	
	        nodes.forEach(function(node){
	          if (copyByClone) node = node.cloneNode(true)
	          else if (!parent) return $(node).remove()
	
	          parent.insertBefore(node, target)
	          if (parentInDocument) traverseNode(node, function(el){
	            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
	               (!el.type || el.type === 'text/javascript') && !el.src)
	              window['eval'].call(window, el.innerHTML)
	          })
	        })
	      })
	    }
	
	    // after    => insertAfter
	    // prepend  => prependTo
	    // before   => insertBefore
	    // append   => appendTo
	    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
	      $(html)[operator](this)
	      return this
	    }
	  })
	
	  zepto.Z.prototype = $.fn
	
	  // Export internal API functions in the `$.zepto` namespace
	  zepto.uniq = uniq
	  zepto.deserializeValue = deserializeValue
	  $.zepto = zepto
	
	  return $
	})()
	
	;(function($){
	  var _zid = 1, undefined,
	      slice = Array.prototype.slice,
	      isFunction = $.isFunction,
	      isString = function(obj){ return typeof obj == 'string' },
	      handlers = {},
	      specialEvents={},
	      focusinSupported = 'onfocusin' in window,
	      focus = { focus: 'focusin', blur: 'focusout' },
	      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }
	
	  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'
	
	  function zid(element) {
	    return element._zid || (element._zid = _zid++)
	  }
	  function findHandlers(element, event, fn, selector) {
	    event = parse(event)
	    if (event.ns) var matcher = matcherFor(event.ns)
	    return (handlers[zid(element)] || []).filter(function(handler) {
	      return handler
	        && (!event.e  || handler.e == event.e)
	        && (!event.ns || matcher.test(handler.ns))
	        && (!fn       || zid(handler.fn) === zid(fn))
	        && (!selector || handler.sel == selector)
	    })
	  }
	  function parse(event) {
	    var parts = ('' + event).split('.')
	    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
	  }
	  function matcherFor(ns) {
	    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
	  }
	
	  function eventCapture(handler, captureSetting) {
	    return handler.del &&
	      (!focusinSupported && (handler.e in focus)) ||
	      !!captureSetting
	  }
	
	  function realEvent(type) {
	    return hover[type] || (focusinSupported && focus[type]) || type
	  }
	
	  function add(element, events, fn, data, selector, delegator, capture){
	    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
	    events.split(/\s/).forEach(function(event){
	      if (event == 'ready') return $(document).ready(fn)
	      var handler   = parse(event)
	      handler.fn    = fn
	      handler.sel   = selector
	      // emulate mouseenter, mouseleave
	      if (handler.e in hover) fn = function(e){
	        var related = e.relatedTarget
	        if (!related || (related !== this && !$.contains(this, related)))
	          return handler.fn.apply(this, arguments)
	      }
	      handler.del   = delegator
	      var callback  = delegator || fn
	      handler.proxy = function(e){
	        e = compatible(e)
	        if (e.isImmediatePropagationStopped()) return
	        e.data = data
	        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
	        if (result === false) e.preventDefault(), e.stopPropagation()
	        return result
	      }
	      handler.i = set.length
	      set.push(handler)
	      if ('addEventListener' in element)
	        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
	    })
	  }
	  function remove(element, events, fn, selector, capture){
	    var id = zid(element)
	    ;(events || '').split(/\s/).forEach(function(event){
	      findHandlers(element, event, fn, selector).forEach(function(handler){
	        delete handlers[id][handler.i]
	      if ('removeEventListener' in element)
	        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
	      })
	    })
	  }
	
	  $.event = { add: add, remove: remove }
	
	  $.proxy = function(fn, context) {
	    var args = (2 in arguments) && slice.call(arguments, 2)
	    if (isFunction(fn)) {
	      var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
	      proxyFn._zid = zid(fn)
	      return proxyFn
	    } else if (isString(context)) {
	      if (args) {
	        args.unshift(fn[context], fn)
	        return $.proxy.apply(null, args)
	      } else {
	        return $.proxy(fn[context], fn)
	      }
	    } else {
	      throw new TypeError("expected function")
	    }
	  }
	
	  $.fn.bind = function(event, data, callback){
	    return this.on(event, data, callback)
	  }
	  $.fn.unbind = function(event, callback){
	    return this.off(event, callback)
	  }
	  $.fn.one = function(event, selector, data, callback){
	    return this.on(event, selector, data, callback, 1)
	  }
	
	  var returnTrue = function(){return true},
	      returnFalse = function(){return false},
	      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
	      eventMethods = {
	        preventDefault: 'isDefaultPrevented',
	        stopImmediatePropagation: 'isImmediatePropagationStopped',
	        stopPropagation: 'isPropagationStopped'
	      }
	
	  function compatible(event, source) {
	    if (source || !event.isDefaultPrevented) {
	      source || (source = event)
	
	      $.each(eventMethods, function(name, predicate) {
	        var sourceMethod = source[name]
	        event[name] = function(){
	          this[predicate] = returnTrue
	          return sourceMethod && sourceMethod.apply(source, arguments)
	        }
	        event[predicate] = returnFalse
	      })
	
	      if (source.defaultPrevented !== undefined ? source.defaultPrevented :
	          'returnValue' in source ? source.returnValue === false :
	          source.getPreventDefault && source.getPreventDefault())
	        event.isDefaultPrevented = returnTrue
	    }
	    return event
	  }
	
	  function createProxy(event) {
	    var key, proxy = { originalEvent: event }
	    for (key in event)
	      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]
	
	    return compatible(proxy, event)
	  }
	
	  $.fn.delegate = function(selector, event, callback){
	    return this.on(event, selector, callback)
	  }
	  $.fn.undelegate = function(selector, event, callback){
	    return this.off(event, selector, callback)
	  }
	
	  $.fn.live = function(event, callback){
	    $(document.body).delegate(this.selector, event, callback)
	    return this
	  }
	  $.fn.die = function(event, callback){
	    $(document.body).undelegate(this.selector, event, callback)
	    return this
	  }
	
	  $.fn.on = function(event, selector, data, callback, one){
	    var autoRemove, delegator, $this = this
	    if (event && !isString(event)) {
	      $.each(event, function(type, fn){
	        $this.on(type, selector, data, fn, one)
	      })
	      return $this
	    }
	
	    if (!isString(selector) && !isFunction(callback) && callback !== false)
	      callback = data, data = selector, selector = undefined
	    if (isFunction(data) || data === false)
	      callback = data, data = undefined
	
	    if (callback === false) callback = returnFalse
	
	    return $this.each(function(_, element){
	      if (one) autoRemove = function(e){
	        remove(element, e.type, callback)
	        return callback.apply(this, arguments)
	      }
	
	      if (selector) delegator = function(e){
	        var evt, match = $(e.target).closest(selector, element).get(0)
	        if (match && match !== element) {
	          evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
	          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
	        }
	      }
	
	      add(element, event, callback, data, selector, delegator || autoRemove)
	    })
	  }
	  $.fn.off = function(event, selector, callback){
	    var $this = this
	    if (event && !isString(event)) {
	      $.each(event, function(type, fn){
	        $this.off(type, selector, fn)
	      })
	      return $this
	    }
	
	    if (!isString(selector) && !isFunction(callback) && callback !== false)
	      callback = selector, selector = undefined
	
	    if (callback === false) callback = returnFalse
	
	    return $this.each(function(){
	      remove(this, event, callback, selector)
	    })
	  }
	
	  $.fn.trigger = function(event, args){
	    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
	    event._args = args
	    return this.each(function(){
	      // handle focus(), blur() by calling them directly
	      if (event.type in focus && typeof this[event.type] == "function") this[event.type]()
	      // items in the collection might not be DOM elements
	      else if ('dispatchEvent' in this) this.dispatchEvent(event)
	      else $(this).triggerHandler(event, args)
	    })
	  }
	
	  // triggers event handlers on current element just as if an event occurred,
	  // doesn't trigger an actual event, doesn't bubble
	  $.fn.triggerHandler = function(event, args){
	    var e, result
	    this.each(function(i, element){
	      e = createProxy(isString(event) ? $.Event(event) : event)
	      e._args = args
	      e.target = element
	      $.each(findHandlers(element, event.type || event), function(i, handler){
	        result = handler.proxy(e)
	        if (e.isImmediatePropagationStopped()) return false
	      })
	    })
	    return result
	  }
	
	  // shortcut methods for `.bind(event, fn)` for each event type
	  ;('focusin focusout focus blur load resize scroll unload click dblclick '+
	  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
	  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
	    $.fn[event] = function(callback) {
	      return (0 in arguments) ?
	        this.bind(event, callback) :
	        this.trigger(event)
	    }
	  })
	
	  $.Event = function(type, props) {
	    if (!isString(type)) props = type, type = props.type
	    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
	    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
	    event.initEvent(type, bubbles, true)
	    return compatible(event)
	  }
	
	})(Zepto)
	
	;(function($){
	  var jsonpID = 0,
	      document = window.document,
	      key,
	      name,
	      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	      scriptTypeRE = /^(?:text|application)\/javascript/i,
	      xmlTypeRE = /^(?:text|application)\/xml/i,
	      jsonType = 'application/json',
	      htmlType = 'text/html',
	      blankRE = /^\s*$/,
	      originAnchor = document.createElement('a')
	
	  originAnchor.href = window.location.href
	
	  // trigger a custom event and return false if it was cancelled
	  function triggerAndReturn(context, eventName, data) {
	    var event = $.Event(eventName)
	    $(context).trigger(event, data)
	    return !event.isDefaultPrevented()
	  }
	
	  // trigger an Ajax "global" event
	  function triggerGlobal(settings, context, eventName, data) {
	    if (settings.global) return triggerAndReturn(context || document, eventName, data)
	  }
	
	  // Number of active Ajax requests
	  $.active = 0
	
	  function ajaxStart(settings) {
	    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
	  }
	  function ajaxStop(settings) {
	    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
	  }
	
	  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
	  function ajaxBeforeSend(xhr, settings) {
	    var context = settings.context
	    if (settings.beforeSend.call(context, xhr, settings) === false ||
	        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
	      return false
	
	    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
	  }
	  function ajaxSuccess(data, xhr, settings, deferred) {
	    var context = settings.context, status = 'success'
	    settings.success.call(context, data, status, xhr)
	    if (deferred) deferred.resolveWith(context, [data, status, xhr])
	    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
	    ajaxComplete(status, xhr, settings)
	  }
	  // type: "timeout", "error", "abort", "parsererror"
	  function ajaxError(error, type, xhr, settings, deferred) {
	    var context = settings.context
	    settings.error.call(context, xhr, type, error)
	    if (deferred) deferred.rejectWith(context, [xhr, type, error])
	    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
	    ajaxComplete(type, xhr, settings)
	  }
	  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
	  function ajaxComplete(status, xhr, settings) {
	    var context = settings.context
	    settings.complete.call(context, xhr, status)
	    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
	    ajaxStop(settings)
	  }
	
	  // Empty function, used as default callback
	  function empty() {}
	
	  $.ajaxJSONP = function(options, deferred){
	    if (!('type' in options)) return $.ajax(options)
	
	    var _callbackName = options.jsonpCallback,
	      callbackName = ($.isFunction(_callbackName) ?
	        _callbackName() : _callbackName) || ('jsonp' + (++jsonpID)),
	      script = document.createElement('script'),
	      originalCallback = window[callbackName],
	      responseData,
	      abort = function(errorType) {
	        $(script).triggerHandler('error', errorType || 'abort')
	      },
	      xhr = { abort: abort }, abortTimeout
	
	    if (deferred) deferred.promise(xhr)
	
	    $(script).on('load error', function(e, errorType){
	      clearTimeout(abortTimeout)
	      $(script).off().remove()
	
	      if (e.type == 'error' || !responseData) {
	        ajaxError(null, errorType || 'error', xhr, options, deferred)
	      } else {
	        ajaxSuccess(responseData[0], xhr, options, deferred)
	      }
	
	      window[callbackName] = originalCallback
	      if (responseData && $.isFunction(originalCallback))
	        originalCallback(responseData[0])
	
	      originalCallback = responseData = undefined
	    })
	
	    if (ajaxBeforeSend(xhr, options) === false) {
	      abort('abort')
	      return xhr
	    }
	
	    window[callbackName] = function(){
	      responseData = arguments
	    }
	
	    script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
	    document.head.appendChild(script)
	
	    if (options.timeout > 0) abortTimeout = setTimeout(function(){
	      abort('timeout')
	    }, options.timeout)
	
	    return xhr
	  }
	
	  $.ajaxSettings = {
	    // Default type of request
	    type: 'GET',
	    // Callback that is executed before request
	    beforeSend: empty,
	    // Callback that is executed if the request succeeds
	    success: empty,
	    // Callback that is executed the the server drops error
	    error: empty,
	    // Callback that is executed on request complete (both: error and success)
	    complete: empty,
	    // The context for the callbacks
	    context: null,
	    // Whether to trigger "global" Ajax events
	    global: true,
	    // Transport
	    xhr: function () {
	      return new window.XMLHttpRequest()
	    },
	    // MIME types mapping
	    // IIS returns Javascript as "application/x-javascript"
	    accepts: {
	      script: 'text/javascript, application/javascript, application/x-javascript',
	      json:   jsonType,
	      xml:    'application/xml, text/xml',
	      html:   htmlType,
	      text:   'text/plain'
	    },
	    // Whether the request is to another domain
	    crossDomain: false,
	    // Default timeout
	    timeout: 0,
	    // Whether data should be serialized to string
	    processData: true,
	    // Whether the browser should be allowed to cache GET responses
	    cache: true
	  }
	
	  function mimeToDataType(mime) {
	    if (mime) mime = mime.split(';', 2)[0]
	    return mime && ( mime == htmlType ? 'html' :
	      mime == jsonType ? 'json' :
	      scriptTypeRE.test(mime) ? 'script' :
	      xmlTypeRE.test(mime) && 'xml' ) || 'text'
	  }
	
	  function appendQuery(url, query) {
	    if (query == '') return url
	    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
	  }
	
	  // serialize payload and append it to the URL for GET requests
	  function serializeData(options) {
	    if (options.processData && options.data && $.type(options.data) != "string")
	      options.data = $.param(options.data, options.traditional)
	    if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
	      options.url = appendQuery(options.url, options.data), options.data = undefined
	  }
	
	  $.ajax = function(options){
	    var settings = $.extend({}, options || {}),
	        deferred = $.Deferred && $.Deferred(),
	        urlAnchor
	    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]
	
	    ajaxStart(settings)
	
	    if (!settings.crossDomain) {
	      urlAnchor = document.createElement('a')
	      urlAnchor.href = settings.url
	      urlAnchor.href = urlAnchor.href
	      settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host)
	    }
	
	    if (!settings.url) settings.url = window.location.toString()
	    serializeData(settings)
	
	    var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
	    if (hasPlaceholder) dataType = 'jsonp'
	
	    if (settings.cache === false || (
	         (!options || options.cache !== true) &&
	         ('script' == dataType || 'jsonp' == dataType)
	        ))
	      settings.url = appendQuery(settings.url, '_=' + Date.now())
	
	    if ('jsonp' == dataType) {
	      if (!hasPlaceholder)
	        settings.url = appendQuery(settings.url,
	          settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
	      return $.ajaxJSONP(settings, deferred)
	    }
	
	    var mime = settings.accepts[dataType],
	        headers = { },
	        setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
	        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
	        xhr = settings.xhr(),
	        nativeSetHeader = xhr.setRequestHeader,
	        abortTimeout
	
	    if (deferred) deferred.promise(xhr)
	
	    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
	    setHeader('Accept', mime || '*/*')
	    if (mime = settings.mimeType || mime) {
	      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
	      xhr.overrideMimeType && xhr.overrideMimeType(mime)
	    }
	    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
	      setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')
	
	    if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])
	    xhr.setRequestHeader = setHeader
	
	    xhr.onreadystatechange = function(){
	      if (xhr.readyState == 4) {
	        xhr.onreadystatechange = empty
	        clearTimeout(abortTimeout)
	        var result, error = false
	        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
	          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))
	          result = xhr.responseText
	
	          try {
	            // http://perfectionkills.com/global-eval-what-are-the-options/
	            if (dataType == 'script')    (1,eval)(result)
	            else if (dataType == 'xml')  result = xhr.responseXML
	            else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
	          } catch (e) { error = e }
	
	          if (error) ajaxError(error, 'parsererror', xhr, settings, deferred)
	          else ajaxSuccess(result, xhr, settings, deferred)
	        } else {
	          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
	        }
	      }
	    }
	
	    if (ajaxBeforeSend(xhr, settings) === false) {
	      xhr.abort()
	      ajaxError(null, 'abort', xhr, settings, deferred)
	      return xhr
	    }
	
	    if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]
	
	    var async = 'async' in settings ? settings.async : true
	    xhr.open(settings.type, settings.url, async, settings.username, settings.password)
	
	    for (name in headers) nativeSetHeader.apply(xhr, headers[name])
	
	    if (settings.timeout > 0) abortTimeout = setTimeout(function(){
	        xhr.onreadystatechange = empty
	        xhr.abort()
	        ajaxError(null, 'timeout', xhr, settings, deferred)
	      }, settings.timeout)
	
	    // avoid sending empty string (#319)
	    xhr.send(settings.data ? settings.data : null)
	    return xhr
	  }
	
	  // handle optional data/success arguments
	  function parseArguments(url, data, success, dataType) {
	    if ($.isFunction(data)) dataType = success, success = data, data = undefined
	    if (!$.isFunction(success)) dataType = success, success = undefined
	    return {
	      url: url
	    , data: data
	    , success: success
	    , dataType: dataType
	    }
	  }
	
	  $.get = function(/* url, data, success, dataType */){
	    return $.ajax(parseArguments.apply(null, arguments))
	  }
	
	  $.post = function(/* url, data, success, dataType */){
	    var options = parseArguments.apply(null, arguments)
	    options.type = 'POST'
	    return $.ajax(options)
	  }
	
	  $.getJSON = function(/* url, data, success */){
	    var options = parseArguments.apply(null, arguments)
	    options.dataType = 'json'
	    return $.ajax(options)
	  }
	
	  $.fn.load = function(url, data, success){
	    if (!this.length) return this
	    var self = this, parts = url.split(/\s/), selector,
	        options = parseArguments(url, data, success),
	        callback = options.success
	    if (parts.length > 1) options.url = parts[0], selector = parts[1]
	    options.success = function(response){
	      self.html(selector ?
	        $('<div>').html(response.replace(rscript, "")).find(selector)
	        : response)
	      callback && callback.apply(self, arguments)
	    }
	    $.ajax(options)
	    return this
	  }
	
	  var escape = encodeURIComponent
	
	  function serialize(params, obj, traditional, scope){
	    var type, array = $.isArray(obj), hash = $.isPlainObject(obj)
	    $.each(obj, function(key, value) {
	      type = $.type(value)
	      if (scope) key = traditional ? scope :
	        scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
	      // handle data in serializeArray() format
	      if (!scope && array) params.add(value.name, value.value)
	      // recurse into nested objects
	      else if (type == "array" || (!traditional && type == "object"))
	        serialize(params, value, traditional, key)
	      else params.add(key, value)
	    })
	  }
	
	  $.param = function(obj, traditional){
	    var params = []
	    params.add = function(key, value) {
	      if ($.isFunction(value)) value = value()
	      if (value == null) value = ""
	      this.push(escape(key) + '=' + escape(value))
	    }
	    serialize(params, obj, traditional)
	    return params.join('&').replace(/%20/g, '+')
	  }
	})(Zepto)
	
	;(function($){
	  $.fn.serializeArray = function() {
	    var name, type, result = [],
	      add = function(value) {
	        if (value.forEach) return value.forEach(add)
	        result.push({ name: name, value: value })
	      }
	    if (this[0]) $.each(this[0].elements, function(_, field){
	      type = field.type, name = field.name
	      if (name && field.nodeName.toLowerCase() != 'fieldset' &&
	        !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' &&
	        ((type != 'radio' && type != 'checkbox') || field.checked))
	          add($(field).val())
	    })
	    return result
	  }
	
	  $.fn.serialize = function(){
	    var result = []
	    this.serializeArray().forEach(function(elm){
	      result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
	    })
	    return result.join('&')
	  }
	
	  $.fn.submit = function(callback) {
	    if (0 in arguments) this.bind('submit', callback)
	    else if (this.length) {
	      var event = $.Event('submit')
	      this.eq(0).trigger(event)
	      if (!event.isDefaultPrevented()) this.get(0).submit()
	    }
	    return this
	  }
	
	})(Zepto)
	
	;(function($){
	  // __proto__ doesn't exist on IE<11, so redefine
	  // the Z function to use object extension instead
	  if (!('__proto__' in {})) {
	    $.extend($.zepto, {
	      Z: function(dom, selector){
	        dom = dom || []
	        $.extend(dom, $.fn)
	        dom.selector = selector || ''
	        dom.__Z = true
	        return dom
	      },
	      // this is a kludge but works
	      isZ: function(object){
	        return $.type(object) === 'array' && '__Z' in object
	      }
	    })
	  }
	
	  // getComputedStyle shouldn't freak out when called
	  // without a valid element as argument
	  try {
	    getComputedStyle(undefined)
	  } catch(e) {
	    var nativeGetComputedStyle = getComputedStyle;
	    window.getComputedStyle = function(element){
	      try {
	        return nativeGetComputedStyle(element)
	      } catch(e) {
	        return null
	      }
	    }
	  }
	})(Zepto)

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/*!
	 * Vue.js v1.0.18
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	'use strict';
	
	function set(obj, key, val) {
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._proxy(key);
	      vm._digest();
	    }
	  }
	  return val;
	}
	
	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */
	
	function del(obj, key) {
	  if (!hasOwn(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	  if (!ob) {
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._unproxy(key);
	      vm._digest();
	    }
	  }
	}
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */
	
	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}
	
	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */
	
	var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;
	
	function isLiteral(exp) {
	  return literalValueRE.test(exp);
	}
	
	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */
	
	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}
	
	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */
	
	function _toString(value) {
	  return value == null ? '' : value.toString();
	}
	
	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */
	
	function toNumber(value) {
	  if (typeof value !== 'string') {
	    return value;
	  } else {
	    var parsed = Number(value);
	    return isNaN(parsed) ? value : parsed;
	  }
	}
	
	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */
	
	function toBoolean(value) {
	  return value === 'true' ? true : value === 'false' ? false : value;
	}
	
	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */
	
	function stripQuotes(str) {
	  var a = str.charCodeAt(0);
	  var b = str.charCodeAt(str.length - 1);
	  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	}
	
	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var camelizeRE = /-(\w)/g;
	
	function camelize(str) {
	  return str.replace(camelizeRE, toUpper);
	}
	
	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}
	
	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var hyphenateRE = /([a-z\d])([A-Z])/g;
	
	function hyphenate(str) {
	  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	}
	
	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var classifyRE = /(?:^|[-_\/])(\w)/g;
	
	function classify(str) {
	  return str.replace(classifyRE, toUpper);
	}
	
	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */
	
	function bind(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}
	
	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */
	
	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}
	
	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */
	
	function extend(to, from) {
	  var keys = Object.keys(from);
	  var i = keys.length;
	  while (i--) {
	    to[keys[i]] = from[keys[i]];
	  }
	  return to;
	}
	
	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	function isObject(obj) {
	  return obj !== null && typeof obj === 'object';
	}
	
	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	
	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}
	
	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var isArray = Array.isArray;
	
	/**
	 * Define a property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */
	
	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}
	
	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */
	
	function _debounce(func, wait) {
	  var timeout, args, context, timestamp, result;
	  var later = function later() {
	    var last = Date.now() - timestamp;
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    }
	  };
	  return function () {
	    context = this;
	    args = arguments;
	    timestamp = Date.now();
	    if (!timeout) {
	      timeout = setTimeout(later, wait);
	    }
	    return result;
	  };
	}
	
	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */
	
	function indexOf(arr, obj) {
	  var i = arr.length;
	  while (i--) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	}
	
	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */
	
	function cancellable(fn) {
	  var cb = function cb() {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments);
	    }
	  };
	  cb.cancel = function () {
	    cb.cancelled = true;
	  };
	  return cb;
	}
	
	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 *
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 */
	
	function looseEqual(a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
	  /* eslint-enable eqeqeq */
	}
	
	var hasProto = ('__proto__' in {});
	
	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';
	
	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
	
	// UA sniffing for working around browser-specific quirks
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	
	var transitionProp = undefined;
	var transitionEndEvent = undefined;
	var animationProp = undefined;
	var animationEndEvent = undefined;
	
	// Transition property/event sniffing
	if (inBrowser && !isIE9) {
	  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	}
	
	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */
	
	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;
	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks = [];
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }
	
	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined') {
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(counter);
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = counter;
	    };
	  } else {
	    // webpack attempts to inject a shim for setImmediate
	    // if it is used as a global, so we have to work around that to
	    // avoid bundling unnecessary code.
	    var context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
	    timerFunc = context.setImmediate || setTimeout;
	  }
	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	})();
	
	function Cache(limit) {
	  this.size = 0;
	  this.limit = limit;
	  this.head = this.tail = undefined;
	  this._keymap = Object.create(null);
	}
	
	var p = Cache.prototype;
	
	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */
	
	p.put = function (key, value) {
	  var removed;
	  if (this.size === this.limit) {
	    removed = this.shift();
	  }
	
	  var entry = this.get(key, true);
	  if (!entry) {
	    entry = {
	      key: key
	    };
	    this._keymap[key] = entry;
	    if (this.tail) {
	      this.tail.newer = entry;
	      entry.older = this.tail;
	    } else {
	      this.head = entry;
	    }
	    this.tail = entry;
	    this.size++;
	  }
	  entry.value = value;
	
	  return removed;
	};
	
	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */
	
	p.shift = function () {
	  var entry = this.head;
	  if (entry) {
	    this.head = this.head.newer;
	    this.head.older = undefined;
	    entry.newer = entry.older = undefined;
	    this._keymap[entry.key] = undefined;
	    this.size--;
	  }
	  return entry;
	};
	
	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */
	
	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key];
	  if (entry === undefined) return;
	  if (entry === this.tail) {
	    return returnEntry ? entry : entry.value;
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer;
	    }
	    entry.newer.older = entry.older; // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer; // C. --> E
	  }
	  entry.newer = undefined; // D --x
	  entry.older = this.tail; // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry; // E. <-- D
	  }
	  this.tail = entry;
	  return returnEntry ? entry : entry.value;
	};
	
	var cache$1 = new Cache(1000);
	var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g;
	var reservedArgRE = /^in$|^-?\d+/;
	
	/**
	 * Parser state
	 */
	
	var str;
	var dir;
	var c;
	var prev;
	var i;
	var l;
	var lastFilterIndex;
	var inSingle;
	var inDouble;
	var curly;
	var square;
	var paren;
	/**
	 * Push a filter to the current directive object
	 */
	
	function pushFilter() {
	  var exp = str.slice(lastFilterIndex, i).trim();
	  var filter;
	  if (exp) {
	    filter = {};
	    var tokens = exp.match(filterTokenRE);
	    filter.name = tokens[0];
	    if (tokens.length > 1) {
	      filter.args = tokens.slice(1).map(processFilterArg);
	    }
	  }
	  if (filter) {
	    (dir.filters = dir.filters || []).push(filter);
	  }
	  lastFilterIndex = i + 1;
	}
	
	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */
	
	function processFilterArg(arg) {
	  if (reservedArgRE.test(arg)) {
	    return {
	      value: toNumber(arg),
	      dynamic: false
	    };
	  } else {
	    var stripped = stripQuotes(arg);
	    var dynamic = stripped === arg;
	    return {
	      value: dynamic ? arg : stripped,
	      dynamic: dynamic
	    };
	  }
	}
	
	/**
	 * Parse a directive value and extract the expression
	 * and its filters into a descriptor.
	 *
	 * Example:
	 *
	 * "a + 1 | uppercase" will yield:
	 * {
	 *   expression: 'a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} str
	 * @return {Object}
	 */
	
	function parseDirective(s) {
	  var hit = cache$1.get(s);
	  if (hit) {
	    return hit;
	  }
	
	  // reset parser state
	  str = s;
	  inSingle = inDouble = false;
	  curly = square = paren = 0;
	  lastFilterIndex = 0;
	  dir = {};
	
	  for (i = 0, l = str.length; i < l; i++) {
	    prev = c;
	    c = str.charCodeAt(i);
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27 && prev !== 0x5C) inSingle = !inSingle;
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22 && prev !== 0x5C) inDouble = !inDouble;
	    } else if (c === 0x7C && // pipe
	    str.charCodeAt(i + 1) !== 0x7C && str.charCodeAt(i - 1) !== 0x7C) {
	      if (dir.expression == null) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        dir.expression = str.slice(0, i).trim();
	      } else {
	        // already has filter
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22:
	          inDouble = true;break; // "
	        case 0x27:
	          inSingle = true;break; // '
	        case 0x28:
	          paren++;break; // (
	        case 0x29:
	          paren--;break; // )
	        case 0x5B:
	          square++;break; // [
	        case 0x5D:
	          square--;break; // ]
	        case 0x7B:
	          curly++;break; // {
	        case 0x7D:
	          curly--;break; // }
	      }
	    }
	  }
	
	  if (dir.expression == null) {
	    dir.expression = str.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }
	
	  cache$1.put(s, dir);
	  return dir;
	}
	
	var directive = Object.freeze({
	  parseDirective: parseDirective
	});
	
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var cache = undefined;
	var tagRE = undefined;
	var htmlRE = undefined;
	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */
	
	function escapeRegex(str) {
	  return str.replace(regexEscapeRE, '\\$&');
	}
	
	function compileRegex() {
	  var open = escapeRegex(config.delimiters[0]);
	  var close = escapeRegex(config.delimiters[1]);
	  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
	  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
	  tagRE = new RegExp(unsafeOpen + '(.+?)' + unsafeClose + '|' + open + '(.+?)' + close, 'g');
	  htmlRE = new RegExp('^' + unsafeOpen + '.*' + unsafeClose + '$');
	  // reset cache
	  cache = new Cache(1000);
	}
	
	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */
	
	function parseText(text) {
	  if (!cache) {
	    compileRegex();
	  }
	  var hit = cache.get(text);
	  if (hit) {
	    return hit;
	  }
	  text = text.replace(/\n/g, '');
	  if (!tagRE.test(text)) {
	    return null;
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index, html, value, first, oneTime;
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	    /* eslint-enable no-cond-assign */
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      });
	    }
	    // tag token
	    html = htmlRE.test(match[0]);
	    value = html ? match[1] : match[2];
	    first = value.charCodeAt(0);
	    oneTime = first === 42; // *
	    value = oneTime ? value.slice(1) : value;
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime
	    });
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    });
	  }
	  cache.put(text, tokens);
	  return tokens;
	}
	
	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @param {Vue} [vm]
	 * @return {String}
	 */
	
	function tokensToExp(tokens, vm) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token, vm);
	    }).join('+');
	  } else {
	    return formatToken(tokens[0], vm, true);
	  }
	}
	
	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Vue} [vm]
	 * @param {Boolean} [single]
	 * @return {String}
	 */
	
	function formatToken(token, vm, single) {
	  return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
	}
	
	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */
	
	var filterRE = /[^|]\|[^|]/;
	function inlineFilters(exp, single) {
	  if (!filterRE.test(exp)) {
	    return single ? exp : '(' + exp + ')';
	  } else {
	    var dir = parseDirective(exp);
	    if (!dir.filters) {
	      return '(' + exp + ')';
	    } else {
	      return 'this._applyFilters(' + dir.expression + // value
	      ',null,' + // oldValue (null for read)
	      JSON.stringify(dir.filters) + // filter descriptors
	      ',false)'; // write?
	    }
	  }
	}
	
	var text = Object.freeze({
	  compileRegex: compileRegex,
	  parseText: parseText,
	  tokensToExp: tokensToExp
	});
	
	var delimiters = ['{{', '}}'];
	var unsafeDelimiters = ['{{{', '}}}'];
	
	var config = Object.defineProperties({
	
	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */
	
	  debug: false,
	
	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */
	
	  silent: false,
	
	  /**
	   * Whether to use async rendering.
	   */
	
	  async: true,
	
	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */
	
	  warnExpressionErrors: true,
	
	  /**
	   * Whether to allow devtools inspection.
	   * Disabled by default in production builds.
	   */
	
	  devtools: process.env.NODE_ENV !== 'production',
	
	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */
	
	  _delimitersChanged: true,
	
	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */
	
	  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],
	
	  /**
	   * prop binding modes
	   */
	
	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },
	
	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */
	
	  _maxUpdateCount: 100
	
	}, {
	  delimiters: { /**
	                 * Interpolation delimiters. Changing these would trigger
	                 * the text parser to re-compile the regular expressions.
	                 *
	                 * @type {Array<String>}
	                 */
	
	    get: function get() {
	      return delimiters;
	    },
	    set: function set(val) {
	      delimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  },
	  unsafeDelimiters: {
	    get: function get() {
	      return unsafeDelimiters;
	    },
	    set: function set(val) {
	      unsafeDelimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  }
	});
	
	var warn = undefined;
	
	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var hasConsole = typeof console !== 'undefined';
	    warn = function (msg, e) {
	      if (hasConsole && (!config.silent || config.debug)) {
	        //console.warn('[Vue warn]: ' + msg);
	        /* istanbul ignore if */
	        if (config.debug) {
	          if (e) {
	            throw e;
	          } else {
	            console.warn(new Error('Warning Stack Trace').stack);
	          }
	        }
	      }
	    };
	  })();
	}
	
	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function appendWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    target.appendChild(el);
	  }, vm, cb);
	}
	
	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function beforeWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    before(el, target);
	  }, vm, cb);
	}
	
	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function removeWithTransition(el, vm, cb) {
	  applyTransition(el, -1, function () {
	    remove(el);
	  }, vm, cb);
	}
	
	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function applyTransition(el, direction, op, vm, cb) {
	  var transition = el.__v_trans;
	  if (!transition ||
	  // skip if there are no js hooks and CSS transition is
	  // not supported
	  !transition.hooks && !transitionEndEvent ||
	  // skip transitions for initial compile
	  !vm._isCompiled ||
	  // if the vm is being manipulated by a parent directive
	  // during the parent's compilation phase, skip the
	  // animation.
	  vm.$parent && !vm.$parent._isCompiled) {
	    op();
	    if (cb) cb();
	    return;
	  }
	  var action = direction > 0 ? 'enter' : 'leave';
	  transition[action](op, cb);
	}
	
	var transition = Object.freeze({
	  appendWithTransition: appendWithTransition,
	  beforeWithTransition: beforeWithTransition,
	  removeWithTransition: removeWithTransition,
	  applyTransition: applyTransition
	});
	
	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */
	
	function query(el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
	    }
	  }
	  return el;
	}
	
	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed by doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */
	
	function inDoc(node) {
	  var doc = document.documentElement;
	  var parent = node && node.parentNode;
	  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	}
	
	/**
	 * Get and remove an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} _attr
	 */
	
	function getAttr(node, _attr) {
	  var val = node.getAttribute(_attr);
	  if (val !== null) {
	    node.removeAttribute(_attr);
	  }
	  return val;
	}
	
	/**
	 * Get an attribute with colon or v-bind: prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */
	
	function getBindAttr(node, name) {
	  var val = getAttr(node, ':' + name);
	  if (val === null) {
	    val = getAttr(node, 'v-bind:' + name);
	  }
	  return val;
	}
	
	/**
	 * Check the presence of a bind attribute.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {Boolean}
	 */
	
	function hasBindAttr(node, name) {
	  return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
	}
	
	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */
	
	function before(el, target) {
	  target.parentNode.insertBefore(el, target);
	}
	
	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */
	
	function after(el, target) {
	  if (target.nextSibling) {
	    before(el, target.nextSibling);
	  } else {
	    target.parentNode.appendChild(el);
	  }
	}
	
	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */
	
	function remove(el) {
	  el.parentNode.removeChild(el);
	}
	
	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */
	
	function prepend(el, target) {
	  if (target.firstChild) {
	    before(el, target.firstChild);
	  } else {
	    target.appendChild(el);
	  }
	}
	
	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */
	
	function replace(target, el) {
	  var parent = target.parentNode;
	  if (parent) {
	    parent.replaceChild(el, target);
	  }
	}
	
	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 * @param {Boolean} [useCapture]
	 */
	
	function on(el, event, cb, useCapture) {
	  el.addEventListener(event, cb, useCapture);
	}
	
	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */
	
	function off(el, event, cb) {
	  el.removeEventListener(event, cb);
	}
	
	/**
	 * In IE9, setAttribute('class') will result in empty class
	 * if the element also has the :class attribute; However in
	 * PhantomJS, setting `className` does not work on SVG elements...
	 * So we have to do a conditional check here.
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */
	
	function setClass(el, cls) {
	  /* istanbul ignore if */
	  if (isIE9 && !/svg$/.test(el.namespaceURI)) {
	    el.className = cls;
	  } else {
	    el.setAttribute('class', cls);
	  }
	}
	
	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */
	
	function addClass(el, cls) {
	  if (el.classList) {
	    el.classList.add(cls);
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      setClass(el, (cur + cls).trim());
	    }
	  }
	}
	
	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */
	
	function removeClass(el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls);
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    setClass(el, cur.trim());
	  }
	  if (!el.className) {
	    el.removeAttribute('class');
	  }
	}
	
	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element|DocumentFragment}
	 */
	
	function extractContent(el, asFragment) {
	  var child;
	  var rawContent;
	  /* istanbul ignore if */
	  if (isTemplate(el) && isFragment(el.content)) {
	    el = el.content;
	  }
	  if (el.hasChildNodes()) {
	    trimNode(el);
	    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	      /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child);
	    }
	  }
	  return rawContent;
	}
	
	/**
	 * Trim possible empty head/tail text and comment
	 * nodes inside a parent.
	 *
	 * @param {Node} node
	 */
	
	function trimNode(node) {
	  var child;
	  /* eslint-disable no-sequences */
	  while ((child = node.firstChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  while ((child = node.lastChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  /* eslint-enable no-sequences */
	}
	
	function isTrimmable(node) {
	  return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
	}
	
	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */
	
	function isTemplate(el) {
	  return el.tagName && el.tagName.toLowerCase() === 'template';
	}
	
	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - v-for
	 * - component
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */
	
	function createAnchor(content, persist) {
	  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
	  anchor.__v_anchor = true;
	  return anchor;
	}
	
	/**
	 * Find a component ref attribute that starts with $.
	 *
	 * @param {Element} node
	 * @return {String|undefined}
	 */
	
	var refRE = /^v-ref:/;
	
	function findRef(node) {
	  if (node.hasAttributes()) {
	    var attrs = node.attributes;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var name = attrs[i].name;
	      if (refRE.test(name)) {
	        return camelize(name.replace(refRE, ''));
	      }
	    }
	  }
	}
	
	/**
	 * Map a function to a range of nodes .
	 *
	 * @param {Node} node
	 * @param {Node} end
	 * @param {Function} op
	 */
	
	function mapNodeRange(node, end, op) {
	  var next;
	  while (node !== end) {
	    next = node.nextSibling;
	    op(node);
	    node = next;
	  }
	  op(end);
	}
	
	/**
	 * Remove a range of nodes with transition, store
	 * the nodes in a fragment with correct ordering,
	 * and call callback when done.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Function} cb
	 */
	
	function removeNodeRange(start, end, vm, frag, cb) {
	  var done = false;
	  var removed = 0;
	  var nodes = [];
	  mapNodeRange(start, end, function (node) {
	    if (node === end) done = true;
	    nodes.push(node);
	    removeWithTransition(node, vm, onRemoved);
	  });
	  function onRemoved() {
	    removed++;
	    if (done && removed >= nodes.length) {
	      for (var i = 0; i < nodes.length; i++) {
	        frag.appendChild(nodes[i]);
	      }
	      cb && cb();
	    }
	  }
	}
	
	/**
	 * Check if a node is a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */
	
	function isFragment(node) {
	  return node && node.nodeType === 11;
	}
	
	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 *
	 * @param {Element} el
	 * @return {String}
	 */
	
	function getOuterHTML(el) {
	  if (el.outerHTML) {
	    return el.outerHTML;
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML;
	  }
	}
	
	var uid$1 = 0;
	
	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	function Dep() {
	  this.id = uid$1++;
	  this.subs = [];
	}
	
	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	
	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};
	
	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub);
	};
	
	/**
	 * Add self as a dependency to the target watcher.
	 */
	
	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};
	
	/**
	 * Notify all subscribers of a new value.
	 */
	
	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = toArray(this.subs);
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};
	
	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto)
	
	/**
	 * Intercept mutating methods and emit events
	 */
	
	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});
	
	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */
	
	def(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = Number(index) + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});
	
	/**
	 * Convenience method to remove the element at given index.
	 *
	 * @param {Number} index
	 * @param {*} val
	 */
	
	def(arrayProto, '$remove', function $remove(item) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  var index = indexOf(this, item);
	  if (index > -1) {
	    return this.splice(index, 1);
	  }
	});
	
	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
	
	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */
	
	function Observer(value) {
	  this.value = value;
	  this.dep = new Dep();
	  def(value, '__ob__', this);
	  if (isArray(value)) {
	    var augment = hasProto ? protoAugment : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}
	
	// Instance methods
	
	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */
	
	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    this.convert(keys[i], obj[keys[i]]);
	  }
	};
	
	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */
	
	Observer.prototype.observeArray = function (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};
	
	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */
	
	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};
	
	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};
	
	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm);
	};
	
	// helpers
	
	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */
	
	function protoAugment(target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}
	
	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */
	
	function copyAugment(target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}
	
	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */
	
	function observe(value, vm) {
	  if (!value || typeof value !== 'object') {
	    return;
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if ((isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}
	
	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} doNotObserve
	 */
	
	function defineReactive(obj, key, val, doNotObserve) {
	  var dep = new Dep();
	
	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return;
	  }
	
	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;
	
	  // if doNotObserve is true, only use the child value observer
	  // if it already exists, and do not attempt to create it.
	  // this allows freezing a large object from the root and
	  // avoid unnecessary observation inside v-for fragments.
	  var childOb = doNotObserve ? isObject(val) && val.__ob__ : observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (isArray(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = doNotObserve ? isObject(newVal) && newVal.__ob__ : observe(newVal);
	      dep.notify();
	    }
	  });
	}
	
	var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i;
	var reservedTagRE = /^(slot|partial|component)$/i;
	
	var isUnknownElement = undefined;
	if (process.env.NODE_ENV !== 'production') {
	  isUnknownElement = function (el, tag) {
	    if (tag.indexOf('-') > -1) {
	      // http://stackoverflow.com/a/28210364/1070244
	      return el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
	    } else {
	      return (/HTMLUnknownElement/.test(el.toString()) &&
	        // Chrome returns unknown for several HTML5 elements.
	        // https://code.google.com/p/chromium/issues/detail?id=540526
	        !/^(data|time|rtc|rb)$/.test(tag)
	      );
	    }
	  };
	}
	
	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */
	
	function checkComponentAttr(el, options) {
	  var tag = el.tagName.toLowerCase();
	  var hasAttrs = el.hasAttributes();
	  if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
	    if (resolveAsset(options, 'components', tag)) {
	      return { id: tag };
	    } else {
	      var is = hasAttrs && getIsBinding(el);
	      if (is) {
	        return is;
	      } else if (process.env.NODE_ENV !== 'production') {
	        var expectedTag = options._componentNameMap && options._componentNameMap[tag];
	        if (expectedTag) {
	          warn('Unknown custom element: <' + tag + '> - ' + 'did you mean <' + expectedTag + '>? ' + 'HTML is case-insensitive, remember to use kebab-case in templates.');
	        } else if (isUnknownElement(el, tag)) {
	          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
	        }
	      }
	    }
	  } else if (hasAttrs) {
	    return getIsBinding(el);
	  }
	}
	
	/**
	 * Get "is" binding from an element.
	 *
	 * @param {Element} el
	 * @return {Object|undefined}
	 */
	
	function getIsBinding(el) {
	  // dynamic syntax
	  var exp = getAttr(el, 'is');
	  if (exp != null) {
	    return { id: exp };
	  } else {
	    exp = getBindAttr(el, 'is');
	    if (exp != null) {
	      return { id: exp, dynamic: true };
	    }
	  }
	}
	
	/**
	 * Set a prop's initial value on a vm and its data object.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */
	
	function initProp(vm, prop, value) {
	  var key = prop.path;
	  value = coerceProp(prop, value);
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop.options);
	  }
	  if (assertProp(prop, value)) {
	    defineReactive(vm, key, value, true /* doNotObserve */);
	  }
	}
	
	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} options
	 * @return {*}
	 */
	
	function getPropDefaultValue(vm, options) {
	  // no default, return undefined
	  if (!hasOwn(options, 'default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean ? false : undefined;
	  }
	  var def = options['default'];
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn('Object/Array as default prop values will be shared ' + 'across multiple instances. Use a factory function ' + 'to return the default value instead.');
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
	}
	
	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 */
	
	function assertProp(prop, value) {
	  if (!prop.options.required && ( // non-required
	  prop.raw === null || // abscent
	  value == null) // null or undefined
	  ) {
	      return true;
	    }
	  var options = prop.options;
	  var type = options.type;
	  var valid = true;
	  var expectedType;
	  if (type) {
	    if (type === String) {
	      expectedType = 'string';
	      valid = typeof value === expectedType;
	    } else if (type === Number) {
	      expectedType = 'number';
	      valid = typeof value === 'number';
	    } else if (type === Boolean) {
	      expectedType = 'boolean';
	      valid = typeof value === 'boolean';
	    } else if (type === Function) {
	      expectedType = 'function';
	      valid = typeof value === 'function';
	    } else if (type === Object) {
	      expectedType = 'object';
	      valid = isPlainObject(value);
	    } else if (type === Array) {
	      expectedType = 'array';
	      valid = isArray(value);
	    } else {
	      valid = value instanceof type;
	    }
	  }
	  if (!valid) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid prop: type check failed for ' + prop.path + '="' + prop.raw + '".' + ' Expected ' + formatType(expectedType) + ', got ' + formatValue(value) + '.');
	    return false;
	  }
	  var validator = options.validator;
	  if (validator) {
	    if (!validator(value)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for ' + prop.path + '="' + prop.raw + '"');
	      return false;
	    }
	  }
	  return true;
	}
	
	/**
	 * Force parsing value with coerce option.
	 *
	 * @param {*} value
	 * @param {Object} options
	 * @return {*}
	 */
	
	function coerceProp(prop, value) {
	  var coerce = prop.options.coerce;
	  if (!coerce) {
	    return value;
	  }
	  // coerce is a function
	  return coerce(value);
	}
	
	function formatType(val) {
	  return val ? val.charAt(0).toUpperCase() + val.slice(1) : 'custom type';
	}
	
	function formatValue(val) {
	  return Object.prototype.toString.call(val).slice(8, -1);
	}
	
	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */
	
	var strats = config.optionMergeStrategies = Object.create(null);
	
	/**
	 * Helper that recursively merges two data objects together.
	 */
	
	function mergeData(to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to;
	}
	
	/**
	 * Data
	 */
	
	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal;
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.');
	      return parentVal;
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn() {
	      return mergeData(childVal.call(this), parentVal.call(this));
	    };
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn() {
	      // instance merge
	      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData);
	      } else {
	        return defaultData;
	      }
	    };
	  }
	};
	
	/**
	 * El
	 */
	
	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.');
	    return;
	  }
	  var ret = childVal || parentVal;
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	};
	
	/**
	 * Hooks and param attributes are merged as arrays.
	 */
	
	strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.activate = function (parentVal, childVal) {
	  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	};
	
	/**
	 * 0.11 deprecation warning
	 */
	
	strats.paramAttributes = function () {
	  /* istanbul ignore next */
	  process.env.NODE_ENV !== 'production' && warn('"paramAttributes" option has been deprecated in 0.12. ' + 'Use "props" instead.');
	};
	
	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	
	function mergeAssets(parentVal, childVal) {
	  var res = Object.create(parentVal);
	  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
	}
	
	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});
	
	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	
	strats.watch = strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent ? parent.concat(child) : [child];
	  }
	  return ret;
	};
	
	/**
	 * Other object hashes.
	 */
	
	strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret;
	};
	
	/**
	 * Default strategy.
	 */
	
	var defaultStrat = function defaultStrat(parentVal, childVal) {
	  return childVal === undefined ? parentVal : childVal;
	};
	
	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */
	
	function guardComponents(options) {
	  if (options.components) {
	    var components = options.components = guardArrayAssets(options.components);
	    var ids = Object.keys(components);
	    var def;
	    if (process.env.NODE_ENV !== 'production') {
	      var map = options._componentNameMap = {};
	    }
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i];
	      if (commonTagRE.test(key) || reservedTagRE.test(key)) {
	        process.env.NODE_ENV !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
	        continue;
	      }
	      // record a all lowercase <-> kebab-case mapping for
	      // possible custom element case error warning
	      if (process.env.NODE_ENV !== 'production') {
	        map[key.replace(/-/g, '').toLowerCase()] = hyphenate(key);
	      }
	      def = components[key];
	      if (isPlainObject(def)) {
	        components[key] = Vue.extend(def);
	      }
	    }
	  }
	}
	
	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */
	
	function guardProps(options) {
	  var props = options.props;
	  var i, val;
	  if (isArray(props)) {
	    options.props = {};
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        options.props[val] = null;
	      } else if (val.name) {
	        options.props[val.name] = val;
	      }
	    }
	  } else if (isPlainObject(props)) {
	    var keys = Object.keys(props);
	    i = keys.length;
	    while (i--) {
	      val = props[keys[i]];
	      if (typeof val === 'function') {
	        props[keys[i]] = { type: val };
	      }
	    }
	  }
	}
	
	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */
	
	function guardArrayAssets(assets) {
	  if (isArray(assets)) {
	    var res = {};
	    var i = assets.length;
	    var asset;
	    while (i--) {
	      asset = assets[i];
	      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
	      if (!id) {
	        process.env.NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
	      } else {
	        res[id] = asset;
	      }
	    }
	    return res;
	  }
	  return assets;
	}
	
	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */
	
	function mergeOptions(parent, child, vm) {
	  guardComponents(child);
	  guardProps(child);
	  var options = {};
	  var key;
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      parent = mergeOptions(parent, child.mixins[i], vm);
	    }
	  }
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField(key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options;
	}
	
	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @return {Object|Function}
	 */
	
	function resolveAsset(options, type, id) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return;
	  }
	  var assets = options[type];
	  var camelizedId;
	  return assets[id] ||
	  // camelCase ID
	  assets[camelizedId = camelize(id)] ||
	  // Pascal Case ID
	  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	}
	
	/**
	 * Assert asset exists
	 */
	
	function assertAsset(val, type, id) {
	  if (!val) {
	    process.env.NODE_ENV !== 'production' && warn('Failed to resolve ' + type + ': ' + id);
	  }
	}
	
	
	
	var util = Object.freeze({
		defineReactive: defineReactive,
		set: set,
		del: del,
		hasOwn: hasOwn,
		isLiteral: isLiteral,
		isReserved: isReserved,
		_toString: _toString,
		toNumber: toNumber,
		toBoolean: toBoolean,
		stripQuotes: stripQuotes,
		camelize: camelize,
		hyphenate: hyphenate,
		classify: classify,
		bind: bind,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		def: def,
		debounce: _debounce,
		indexOf: indexOf,
		cancellable: cancellable,
		looseEqual: looseEqual,
		isArray: isArray,
		hasProto: hasProto,
		inBrowser: inBrowser,
		devtools: devtools,
		isIE9: isIE9,
		isAndroid: isAndroid,
		get transitionProp () { return transitionProp; },
		get transitionEndEvent () { return transitionEndEvent; },
		get animationProp () { return animationProp; },
		get animationEndEvent () { return animationEndEvent; },
		nextTick: nextTick,
		query: query,
		inDoc: inDoc,
		getAttr: getAttr,
		getBindAttr: getBindAttr,
		hasBindAttr: hasBindAttr,
		before: before,
		after: after,
		remove: remove,
		prepend: prepend,
		replace: replace,
		on: on,
		off: off,
		setClass: setClass,
		addClass: addClass,
		removeClass: removeClass,
		extractContent: extractContent,
		trimNode: trimNode,
		isTemplate: isTemplate,
		createAnchor: createAnchor,
		findRef: findRef,
		mapNodeRange: mapNodeRange,
		removeNodeRange: removeNodeRange,
		isFragment: isFragment,
		getOuterHTML: getOuterHTML,
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		assertAsset: assertAsset,
		checkComponentAttr: checkComponentAttr,
		initProp: initProp,
		assertProp: assertProp,
		coerceProp: coerceProp,
		commonTagRE: commonTagRE,
		reservedTagRE: reservedTagRE,
		get warn () { return warn; }
	});
	
	var uid = 0;
	
	function initMixin (Vue) {
	  /**
	   * The main init sequence. This is called for every
	   * instance, including ones that are created from extended
	   * constructors.
	   *
	   * @param {Object} options - this options object should be
	   *                           the result of merging class
	   *                           options and the options passed
	   *                           in to the constructor.
	   */
	
	  Vue.prototype._init = function (options) {
	    options = options || {};
	
	    this.$el = null;
	    this.$parent = options.parent;
	    this.$root = this.$parent ? this.$parent.$root : this;
	    this.$children = [];
	    this.$refs = {}; // child vm references
	    this.$els = {}; // element references
	    this._watchers = []; // all watchers as an array
	    this._directives = []; // all directives
	
	    // a uid
	    this._uid = uid++;
	
	    // a flag to avoid this being observed
	    this._isVue = true;
	
	    // events bookkeeping
	    this._events = {}; // registered callbacks
	    this._eventsCount = {}; // for $broadcast optimization
	
	    // fragment instance properties
	    this._isFragment = false;
	    this._fragment = // @type {DocumentFragment}
	    this._fragmentStart = // @type {Text|Comment}
	    this._fragmentEnd = null; // @type {Text|Comment}
	
	    // lifecycle state
	    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = false;
	    this._unlinkFn = null;
	
	    // context:
	    // if this is a transcluded component, context
	    // will be the common parent vm of this instance
	    // and its host.
	    this._context = options._context || this.$parent;
	
	    // scope:
	    // if this is inside an inline v-for, the scope
	    // will be the intermediate scope created for this
	    // repeat fragment. this is used for linking props
	    // and container directives.
	    this._scope = options._scope;
	
	    // fragment:
	    // if this instance is compiled inside a Fragment, it
	    // needs to reigster itself as a child of that fragment
	    // for attach/detach to work properly.
	    this._frag = options._frag;
	    if (this._frag) {
	      this._frag.children.push(this);
	    }
	
	    // push self into parent / transclusion host
	    if (this.$parent) {
	      this.$parent.$children.push(this);
	    }
	
	    // merge options.
	    options = this.$options = mergeOptions(this.constructor.options, options, this);
	
	    // set ref
	    this._updateRef();
	
	    // initialize data as empty object.
	    // it will be filled up in _initScope().
	    this._data = {};
	
	    // save raw constructor data before merge
	    // so that we know which properties are provided at
	    // instantiation.
	    this._runtimeData = options.data;
	
	    // call init hook
	    this._callHook('init');
	
	    // initialize data observation and scope inheritance.
	    this._initState();
	
	    // setup event system and option events.
	    this._initEvents();
	
	    // call created hook
	    this._callHook('created');
	
	    // if `el` option is passed, start compilation.
	    if (options.el) {
	      this.$mount(options.el);
	    }
	  };
	}
	
	var pathCache = new Cache(1000);
	
	// actions
	var APPEND = 0;
	var PUSH = 1;
	var INC_SUB_PATH_DEPTH = 2;
	var PUSH_SUB_PATH = 3;
	
	// states
	var BEFORE_PATH = 0;
	var IN_PATH = 1;
	var BEFORE_IDENT = 2;
	var IN_IDENT = 3;
	var IN_SUB_PATH = 4;
	var IN_SINGLE_QUOTE = 5;
	var IN_DOUBLE_QUOTE = 6;
	var AFTER_PATH = 7;
	var ERROR = 8;
	
	var pathStateMachine = [];
	
	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};
	
	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};
	
	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	};
	
	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [IN_SUB_PATH, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	};
	
	pathStateMachine[IN_SUB_PATH] = {
	  "'": [IN_SINGLE_QUOTE, APPEND],
	  '"': [IN_DOUBLE_QUOTE, APPEND],
	  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
	  ']': [IN_PATH, PUSH_SUB_PATH],
	  'eof': ERROR,
	  'else': [IN_SUB_PATH, APPEND]
	};
	
	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	};
	
	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	};
	
	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */
	
	function getPathCharType(ch) {
	  if (ch === undefined) {
	    return 'eof';
	  }
	
	  var code = ch.charCodeAt(0);
	
	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30:
	      // 0
	      return ch;
	
	    case 0x5F: // _
	    case 0x24:
	      // $
	      return 'ident';
	
	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0: // No-break space
	    case 0xFEFF: // Byte Order Mark
	    case 0x2028: // Line Separator
	    case 0x2029:
	      // Paragraph Separator
	      return 'ws';
	  }
	
	  // a-z, A-Z
	  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
	    return 'ident';
	  }
	
	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number';
	  }
	
	  return 'else';
	}
	
	/**
	 * Format a subPath, return its plain form if it is
	 * a literal string or number. Otherwise prepend the
	 * dynamic indicator (*).
	 *
	 * @param {String} path
	 * @return {String}
	 */
	
	function formatSubPath(path) {
	  var trimmed = path.trim();
	  // invalid leading 0
	  if (path.charAt(0) === '0' && isNaN(path)) {
	    return false;
	  }
	  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
	}
	
	/**
	 * Parse a string path into an array of segments
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */
	
	function parse(path) {
	  var keys = [];
	  var index = -1;
	  var mode = BEFORE_PATH;
	  var subPathDepth = 0;
	  var c, newChar, key, type, transition, action, typeMap;
	
	  var actions = [];
	
	  actions[PUSH] = function () {
	    if (key !== undefined) {
	      keys.push(key);
	      key = undefined;
	    }
	  };
	
	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar;
	    } else {
	      key += newChar;
	    }
	  };
	
	  actions[INC_SUB_PATH_DEPTH] = function () {
	    actions[APPEND]();
	    subPathDepth++;
	  };
	
	  actions[PUSH_SUB_PATH] = function () {
	    if (subPathDepth > 0) {
	      subPathDepth--;
	      mode = IN_SUB_PATH;
	      actions[APPEND]();
	    } else {
	      subPathDepth = 0;
	      key = formatSubPath(key);
	      if (key === false) {
	        return false;
	      } else {
	        actions[PUSH]();
	      }
	    }
	  };
	
	  function maybeUnescapeQuote() {
	    var nextChar = path[index + 1];
	    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
	      index++;
	      newChar = '\\' + nextChar;
	      actions[APPEND]();
	      return true;
	    }
	  }
	
	  while (mode != null) {
	    index++;
	    c = path[index];
	
	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue;
	    }
	
	    type = getPathCharType(c);
	    typeMap = pathStateMachine[mode];
	    transition = typeMap[type] || typeMap['else'] || ERROR;
	
	    if (transition === ERROR) {
	      return; // parse error
	    }
	
	    mode = transition[0];
	    action = actions[transition[1]];
	    if (action) {
	      newChar = transition[2];
	      newChar = newChar === undefined ? c : newChar;
	      if (action() === false) {
	        return;
	      }
	    }
	
	    if (mode === AFTER_PATH) {
	      keys.raw = path;
	      return keys;
	    }
	  }
	}
	
	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */
	
	function parsePath(path) {
	  var hit = pathCache.get(path);
	  if (!hit) {
	    hit = parse(path);
	    if (hit) {
	      pathCache.put(path, hit);
	    }
	  }
	  return hit;
	}
	
	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */
	
	function getPath(obj, path) {
	  return parseExpression(path).get(obj);
	}
	
	/**
	 * Warn against setting non-existent root path on a vm.
	 */
	
	var warnNonExistent;
	if (process.env.NODE_ENV !== 'production') {
	  warnNonExistent = function (path) {
	    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.');
	  };
	}
	
	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */
	
	function setPath(obj, path, val) {
	  var original = obj;
	  if (typeof path === 'string') {
	    path = parse(path);
	  }
	  if (!path || !isObject(obj)) {
	    return false;
	  }
	  var last, key;
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj;
	    key = path[i];
	    if (key.charAt(0) === '*') {
	      key = parseExpression(key.slice(1)).get.call(original, original);
	    }
	    if (i < l - 1) {
	      obj = obj[key];
	      if (!isObject(obj)) {
	        obj = {};
	        if (process.env.NODE_ENV !== 'production' && last._isVue) {
	          warnNonExistent(path);
	        }
	        set(last, key, obj);
	      }
	    } else {
	      if (isArray(obj)) {
	        obj.$set(key, val);
	      } else if (key in obj) {
	        obj[key] = val;
	      } else {
	        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
	          warnNonExistent(path);
	        }
	        set(obj, key, val);
	      }
	    }
	  }
	  return true;
	}
	
	var path = Object.freeze({
	  parsePath: parsePath,
	  getPath: getPath,
	  setPath: setPath
	});
	
	var expressionCache = new Cache(1000);
	
	var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
	var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');
	
	// keywords that don't make sense inside expressions
	var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'protected,static,interface,private,public';
	var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');
	
	var wsRE = /\s/g;
	var newlineRE = /\n/g;
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g;
	var restoreRE = /"(\d+)"/g;
	var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
	var booleanLiteralRE = /^(?:true|false)$/;
	
	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */
	
	var saved = [];
	
	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */
	
	function save(str, isString) {
	  var i = saved.length;
	  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
	  return '"' + i + '"';
	}
	
	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */
	
	function rewrite(raw) {
	  var c = raw.charAt(0);
	  var path = raw.slice(1);
	  if (allowedKeywordsRE.test(path)) {
	    return raw;
	  } else {
	    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
	    return c + 'scope.' + path;
	  }
	}
	
	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */
	
	function restore(str, i) {
	  return saved[i];
	}
	
	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */
	
	function compileGetter(exp) {
	  if (improperKeywordsRE.test(exp)) {
	    process.env.NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
	  }
	  // reset state
	  saved.length = 0;
	  // save strings and object literal keys
	  var body = exp.replace(saveRE, save).replace(wsRE, '');
	  // rewrite all paths
	  // pad 1 space here becaue the regex matches 1 extra char
	  body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
	  return makeGetterFn(body);
	}
	
	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */
	
	function makeGetterFn(body) {
	  try {
	    /* eslint-disable no-new-func */
	    return new Function('scope', 'return ' + body + ';');
	    /* eslint-enable no-new-func */
	  } catch (e) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid expression. ' + 'Generated function body: ' + body);
	  }
	}
	
	/**
	 * Compile a setter function for the expression.
	 *
	 * @param {String} exp
	 * @return {Function|undefined}
	 */
	
	function compileSetter(exp) {
	  var path = parsePath(exp);
	  if (path) {
	    return function (scope, val) {
	      setPath(scope, path, val);
	    };
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
	  }
	}
	
	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */
	
	function parseExpression(exp, needSet) {
	  exp = exp.trim();
	  // try cache
	  var hit = expressionCache.get(exp);
	  if (hit) {
	    if (needSet && !hit.set) {
	      hit.set = compileSetter(hit.exp);
	    }
	    return hit;
	  }
	  var res = { exp: exp };
	  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
	  // optimized super simple getter
	  ? makeGetterFn('scope.' + exp)
	  // dynamic getter
	  : compileGetter(exp);
	  if (needSet) {
	    res.set = compileSetter(exp);
	  }
	  expressionCache.put(exp, res);
	  return res;
	}
	
	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */
	
	function isSimplePath(exp) {
	  return pathTestRE.test(exp) &&
	  // don't treat true/false as paths
	  !booleanLiteralRE.test(exp) &&
	  // Math constants e.g. Math.PI, Math.E etc.
	  exp.slice(0, 5) !== 'Math.';
	}
	
	var expression = Object.freeze({
	  parseExpression: parseExpression,
	  isSimplePath: isSimplePath
	});
	
	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.
	
	var queueIndex;
	var queue = [];
	var userQueue = [];
	var has = {};
	var circular = {};
	var waiting = false;
	var internalQueueDepleted = false;
	
	/**
	 * Reset the batcher's state.
	 */
	
	function resetBatcherState() {
	  queue = [];
	  userQueue = [];
	  has = {};
	  circular = {};
	  waiting = internalQueueDepleted = false;
	}
	
	/**
	 * Flush both queues and run the watchers.
	 */
	
	function flushBatcherQueue() {
	  runBatcherQueue(queue);
	  internalQueueDepleted = true;
	  runBatcherQueue(userQueue);
	  // dev tool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush');
	  }
	  resetBatcherState();
	}
	
	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */
	
	function runBatcherQueue(queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (queueIndex = 0; queueIndex < queue.length; queueIndex++) {
	    var watcher = queue[queueIndex];
	    var id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        queue.splice(has[id], 1);
	        warn('You may have an infinite update loop for watcher ' + 'with expression: ' + watcher.expression);
	      }
	    }
	  }
	}
	
	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */
	
	function pushWatcher(watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    if (internalQueueDepleted && !watcher.user) {
	      // an internal watcher triggered by a user watcher...
	      // let's run it immediately after current user watcher is done.
	      userQueue.splice(queueIndex + 1, 0, watcher);
	    } else {
	      // push watcher into appropriate queue
	      var q = watcher.user ? userQueue : queue;
	      has[id] = q.length;
	      q.push(watcher);
	      // queue the flush
	      if (!waiting) {
	        waiting = true;
	        nextTick(flushBatcherQueue);
	      }
	    }
	  }
	}
	
	var uid$2 = 0;
	
	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String} expression
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    extend(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = expOrFn;
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = Object.create(null);
	  this.newDepIds = null;
	  this.prevError = null; // for async error stacks
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn;
	    this.setter = undefined;
	  } else {
	    var res = parseExpression(expOrFn, this.twoWay);
	    this.getter = res.get;
	    this.setter = res.set;
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}
	
	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	
	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var scope = this.scope || this.vm;
	  var value;
	  try {
	    value = this.getter.call(scope, scope);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating expression "' + this.expression + '". ' + (config.debug ? '' : 'Turn on debug mode to see stack trace.'), e);
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value);
	  }
	  if (this.filters) {
	    value = scope._applyFilters(value, null, this.filters, false);
	  }
	  if (this.postProcess) {
	    value = this.postProcess(value);
	  }
	  this.afterGet();
	  return value;
	};
	
	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */
	
	Watcher.prototype.set = function (value) {
	  var scope = this.scope || this.vm;
	  if (this.filters) {
	    value = scope._applyFilters(value, this.value, this.filters, true);
	  }
	  try {
	    this.setter.call(scope, scope, value);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating setter "' + this.expression + '"', e);
	    }
	  }
	  // two-way sync for v-for alias
	  var forContext = scope.$forContext;
	  if (forContext && forContext.alias === this.expression) {
	    if (forContext.filters) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.');
	      return;
	    }
	    forContext._withLock(function () {
	      if (scope.$key) {
	        // original is an object
	        forContext.rawValue[scope.$key] = value;
	      } else {
	        forContext.rawValue.$set(scope.$index, value);
	      }
	    });
	  }
	};
	
	/**
	 * Prepare for dependency collection.
	 */
	
	Watcher.prototype.beforeGet = function () {
	  Dep.target = this;
	  this.newDepIds = Object.create(null);
	  this.newDeps.length = 0;
	};
	
	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */
	
	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDepIds[id]) {
	    this.newDepIds[id] = true;
	    this.newDeps.push(dep);
	    if (!this.depIds[id]) {
	      dep.addSub(this);
	    }
	  }
	};
	
	/**
	 * Clean up for dependency collection.
	 */
	
	Watcher.prototype.afterGet = function () {
	  Dep.target = null;
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this.deps[i];
	    if (!this.newDepIds[dep.id]) {
	      dep.removeSub(this);
	    }
	  }
	  this.depIds = this.newDepIds;
	  var tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	};
	
	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */
	
	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync || !config.async) {
	    this.run();
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	    this.queued = true;
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.debug) {
	      this.prevError = new Error('[vue] async stack trace');
	    }
	    pushWatcher(this);
	  }
	};
	
	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */
	
	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and watchers on Object/Arrays should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    (isObject(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      // in debug + async mode, when a watcher callbacks
	      // throws, we also throw the saved before-push error
	      // so the full cross-tick stack trace is available.
	      var prevError = this.prevError;
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && config.debug && prevError) {
	        this.prevError = null;
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          nextTick(function () {
	            throw prevError;
	          }, 0);
	          throw e;
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	    this.queued = this.shallow = false;
	  }
	};
	
	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	
	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target;
	  this.value = this.get();
	  this.dirty = false;
	  Dep.target = current;
	};
	
	/**
	 * Depend on all deps collected by this watcher.
	 */
	
	Watcher.prototype.depend = function () {
	  var i = this.deps.length;
	  while (i--) {
	    this.deps[i].depend();
	  }
	};
	
	/**
	 * Remove self from all dependencies' subcriber list.
	 */
	
	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      this.vm._watchers.$remove(this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this.deps[i].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};
	
	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 */
	
	function traverse(val) {
	  var i, keys;
	  if (isArray(val)) {
	    i = val.length;
	    while (i--) traverse(val[i]);
	  } else if (isObject(val)) {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) traverse(val[keys[i]]);
	  }
	}
	
	var text$1 = {
	
	  bind: function bind() {
	    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	  },
	
	  update: function update(value) {
	    this.el[this.attr] = _toString(value);
	  }
	};
	
	var templateCache = new Cache(1000);
	var idSelectorCache = new Cache(1000);
	
	var map = {
	  efault: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
	};
	
	map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
	
	map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];
	
	map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];
	
	map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];
	
	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */
	
	function isRealTemplate(node) {
	  return isTemplate(node) && isFragment(node.content);
	}
	
	var tagRE$1 = /<([\w:-]+)/;
	var entityRE = /&#?\w+?;/;
	
	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @param {Boolean} raw
	 * @return {DocumentFragment}
	 */
	
	function stringToFragment(templateString, raw) {
	  // try a cache hit first
	  var cacheKey = raw ? templateString : templateString.trim();
	  var hit = templateCache.get(cacheKey);
	  if (hit) {
	    return hit;
	  }
	
	  var frag = document.createDocumentFragment();
	  var tagMatch = templateString.match(tagRE$1);
	  var entityMatch = entityRE.test(templateString);
	
	  if (!tagMatch && !entityMatch) {
	    // text only, return a single text node.
	    frag.appendChild(document.createTextNode(templateString));
	  } else {
	    var tag = tagMatch && tagMatch[1];
	    var wrap = map[tag] || map.efault;
	    var depth = wrap[0];
	    var prefix = wrap[1];
	    var suffix = wrap[2];
	    var node = document.createElement('div');
	
	    node.innerHTML = prefix + templateString + suffix;
	    while (depth--) {
	      node = node.lastChild;
	    }
	
	    var child;
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	      /* eslint-enable no-cond-assign */
	      frag.appendChild(child);
	    }
	  }
	  if (!raw) {
	    trimNode(frag);
	  }
	  templateCache.put(cacheKey, frag);
	  return frag;
	}
	
	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */
	
	function nodeToFragment(node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment.
	  if (isRealTemplate(node)) {
	    trimNode(node.content);
	    return node.content;
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent);
	  }
	  // normal node, clone it to avoid mutating the original
	  var clonedNode = cloneNode(node);
	  var frag = document.createDocumentFragment();
	  var child;
	  /* eslint-disable no-cond-assign */
	  while (child = clonedNode.firstChild) {
	    /* eslint-enable no-cond-assign */
	    frag.appendChild(child);
	  }
	  trimNode(frag);
	  return frag;
	}
	
	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/showug.cgi?id=137755
	var hasBrokenTemplate = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var a = document.createElement('div');
	    a.innerHTML = '<template>1</template>';
	    return !a.cloneNode(true).firstChild.innerHTML;
	  } else {
	    return false;
	  }
	})();
	
	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var t = document.createElement('textarea');
	    t.placeholder = 't';
	    return t.cloneNode(true).value === 't';
	  } else {
	    return false;
	  }
	})();
	
	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */
	
	function cloneNode(node) {
	  /* istanbul ignore if */
	  if (!node.querySelectorAll) {
	    return node.cloneNode();
	  }
	  var res = node.cloneNode(true);
	  var i, original, cloned;
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var tempClone = res;
	    if (isRealTemplate(node)) {
	      node = node.content;
	      tempClone = res.content;
	    }
	    original = node.querySelectorAll('template');
	    if (original.length) {
	      cloned = tempClone.querySelectorAll('template');
	      i = cloned.length;
	      while (i--) {
	        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value;
	    } else {
	      original = node.querySelectorAll('textarea');
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea');
	        i = cloned.length;
	        while (i--) {
	          cloned[i].value = original[i].value;
	        }
	      }
	    }
	  }
	  return res;
	}
	
	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *        Possible values include:
	 *        - DocumentFragment object
	 *        - Node object of type Template
	 *        - id selector: '#some-template-id'
	 *        - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} shouldClone
	 * @param {Boolean} raw
	 *        inline HTML interpolation. Do not check for id
	 *        selector and keep whitespace in the string.
	 * @return {DocumentFragment|undefined}
	 */
	
	function parseTemplate(template, shouldClone, raw) {
	  var node, frag;
	
	  // if the template is already a document fragment,
	  // do nothing
	  if (isFragment(template)) {
	    trimNode(template);
	    return shouldClone ? cloneNode(template) : template;
	  }
	
	  if (typeof template === 'string') {
	    // id selector
	    if (!raw && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template);
	      if (!frag) {
	        node = document.getElementById(template.slice(1));
	        if (node) {
	          frag = nodeToFragment(node);
	          // save selector to cache
	          idSelectorCache.put(template, frag);
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template, raw);
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template);
	  }
	
	  return frag && shouldClone ? cloneNode(frag) : frag;
	}
	
	var template = Object.freeze({
	  cloneNode: cloneNode,
	  parseTemplate: parseTemplate
	});
	
	var html = {
	
	  bind: function bind() {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = [];
	      // replace the placeholder with proper anchor
	      this.anchor = createAnchor('v-html');
	      replace(this.el, this.anchor);
	    }
	  },
	
	  update: function update(value) {
	    value = _toString(value);
	    if (this.nodes) {
	      this.swap(value);
	    } else {
	      this.el.innerHTML = value;
	    }
	  },
	
	  swap: function swap(value) {
	    // remove old nodes
	    var i = this.nodes.length;
	    while (i--) {
	      remove(this.nodes[i]);
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = parseTemplate(value, true, true);
	    // save a reference to these nodes so we can remove later
	    this.nodes = toArray(frag.childNodes);
	    before(frag, this.anchor);
	  }
	};
	
	/**
	 * Abstraction for a partially-compiled fragment.
	 * Can optionally compile content with a child scope.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Vue} [host]
	 * @param {Object} [scope]
	 */
	function Fragment(linker, vm, frag, host, scope, parentFrag) {
	  this.children = [];
	  this.childFrags = [];
	  this.vm = vm;
	  this.scope = scope;
	  this.inserted = false;
	  this.parentFrag = parentFrag;
	  if (parentFrag) {
	    parentFrag.childFrags.push(this);
	  }
	  this.unlink = linker(vm, frag, host, scope, this);
	  var single = this.single = frag.childNodes.length === 1 &&
	  // do not go single mode if the only node is an anchor
	  !frag.childNodes[0].__v_anchor;
	  if (single) {
	    this.node = frag.childNodes[0];
	    this.before = singleBefore;
	    this.remove = singleRemove;
	  } else {
	    this.node = createAnchor('fragment-start');
	    this.end = createAnchor('fragment-end');
	    this.frag = frag;
	    prepend(this.node, frag);
	    frag.appendChild(this.end);
	    this.before = multiBefore;
	    this.remove = multiRemove;
	  }
	  this.node.__v_frag = this;
	}
	
	/**
	 * Call attach/detach for all components contained within
	 * this fragment. Also do so recursively for all child
	 * fragments.
	 *
	 * @param {Function} hook
	 */
	
	Fragment.prototype.callHook = function (hook) {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    this.childFrags[i].callHook(hook);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    hook(this.children[i]);
	  }
	};
	
	/**
	 * Insert fragment before target, single node version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */
	
	function singleBefore(target, withTransition) {
	  this.inserted = true;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  method(this.node, target, this.vm);
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}
	
	/**
	 * Remove fragment, single node version
	 */
	
	function singleRemove() {
	  this.inserted = false;
	  var shouldCallRemove = inDoc(this.node);
	  var self = this;
	  this.beforeRemove();
	  removeWithTransition(this.node, this.vm, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}
	
	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */
	
	function multiBefore(target, withTransition) {
	  this.inserted = true;
	  var vm = this.vm;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  mapNodeRange(this.node, this.end, function (node) {
	    method(node, target, vm);
	  });
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}
	
	/**
	 * Remove fragment, multi-nodes version
	 */
	
	function multiRemove() {
	  this.inserted = false;
	  var self = this;
	  var shouldCallRemove = inDoc(this.node);
	  this.beforeRemove();
	  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}
	
	/**
	 * Prepare the fragment for removal.
	 */
	
	Fragment.prototype.beforeRemove = function () {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    // call the same method recursively on child
	    // fragments, depth-first
	    this.childFrags[i].beforeRemove(false);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    // Call destroy for all contained instances,
	    // with remove:false and defer:true.
	    // Defer is necessary because we need to
	    // keep the children to call detach hooks
	    // on them.
	    this.children[i].$destroy(false, true);
	  }
	  var dirs = this.unlink.dirs;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    // disable the watchers on all the directives
	    // so that the rendered content stays the same
	    // during removal.
	    dirs[i]._watcher && dirs[i]._watcher.teardown();
	  }
	};
	
	/**
	 * Destroy the fragment.
	 */
	
	Fragment.prototype.destroy = function () {
	  if (this.parentFrag) {
	    this.parentFrag.childFrags.$remove(this);
	  }
	  this.node.__v_frag = null;
	  this.unlink();
	};
	
	/**
	 * Call attach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */
	
	function attach(child) {
	  if (!child._isAttached && inDoc(child.$el)) {
	    child._callHook('attached');
	  }
	}
	
	/**
	 * Call detach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */
	
	function detach(child) {
	  if (child._isAttached && !inDoc(child.$el)) {
	    child._callHook('detached');
	  }
	}
	
	var linkerCache = new Cache(5000);
	
	/**
	 * A factory that can be used to create instances of a
	 * fragment. Caches the compiled linker if possible.
	 *
	 * @param {Vue} vm
	 * @param {Element|String} el
	 */
	function FragmentFactory(vm, el) {
	  this.vm = vm;
	  var template;
	  var isString = typeof el === 'string';
	  if (isString || isTemplate(el)) {
	    template = parseTemplate(el, true);
	  } else {
	    template = document.createDocumentFragment();
	    template.appendChild(el);
	  }
	  this.template = template;
	  // linker can be cached, but only for components
	  var linker;
	  var cid = vm.constructor.cid;
	  if (cid > 0) {
	    var cacheId = cid + (isString ? el : getOuterHTML(el));
	    linker = linkerCache.get(cacheId);
	    if (!linker) {
	      linker = compile(template, vm.$options, true);
	      linkerCache.put(cacheId, linker);
	    }
	  } else {
	    linker = compile(template, vm.$options, true);
	  }
	  this.linker = linker;
	}
	
	/**
	 * Create a fragment instance with given host and scope.
	 *
	 * @param {Vue} host
	 * @param {Object} scope
	 * @param {Fragment} parentFrag
	 */
	
	FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	  var frag = cloneNode(this.template);
	  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
	};
	
	var ON = 700;
	var MODEL = 800;
	var BIND = 850;
	var TRANSITION = 1100;
	var EL = 1500;
	var COMPONENT = 1500;
	var PARTIAL = 1750;
	var FOR = 2000;
	var IF = 2000;
	var SLOT = 2100;
	
	var uid$3 = 0;
	
	var vFor = {
	
	  priority: FOR,
	
	  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],
	
	  bind: function bind() {
	    // support "item in/of items" syntax
	    var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/);
	    if (inMatch) {
	      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
	      if (itMatch) {
	        this.iterator = itMatch[1].trim();
	        this.alias = itMatch[2].trim();
	      } else {
	        this.alias = inMatch[1].trim();
	      }
	      this.expression = inMatch[2];
	    }
	
	    if (!this.alias) {
	      process.env.NODE_ENV !== 'production' && warn('Alias is required in v-for.');
	      return;
	    }
	
	    // uid as a cache identifier
	    this.id = '__v-for__' + ++uid$3;
	
	    // check if this is an option list,
	    // so that we know if we need to update the <select>'s
	    // v-model when the option list has changed.
	    // because v-model has a lower priority than v-for,
	    // the v-model is not bound here yet, so we have to
	    // retrive it in the actual updateModel() function.
	    var tag = this.el.tagName;
	    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';
	
	    // setup anchor nodes
	    this.start = createAnchor('v-for-start');
	    this.end = createAnchor('v-for-end');
	    replace(this.el, this.end);
	    before(this.start, this.end);
	
	    // cache
	    this.cache = Object.create(null);
	
	    // fragment factory
	    this.factory = new FragmentFactory(this.vm, this.el);
	  },
	
	  update: function update(data) {
	    this.diff(data);
	    this.updateRef();
	    this.updateModel();
	  },
	
	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   */
	
	  diff: function diff(data) {
	    // check if the Array was converted from an Object
	    var item = data[0];
	    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');
	
	    var trackByKey = this.params.trackBy;
	    var oldFrags = this.frags;
	    var frags = this.frags = new Array(data.length);
	    var alias = this.alias;
	    var iterator = this.iterator;
	    var start = this.start;
	    var end = this.end;
	    var inDocument = inDoc(start);
	    var init = !oldFrags;
	    var i, l, frag, key, value, primitive;
	
	    // First pass, go through the new Array and fill up
	    // the new frags array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      item = data[i];
	      key = convertedFromObject ? item.$key : null;
	      value = convertedFromObject ? item.$value : item;
	      primitive = !isObject(value);
	      frag = !init && this.getCachedFrag(value, i, key);
	      if (frag) {
	        // reusable fragment
	        frag.reused = true;
	        // update $index
	        frag.scope.$index = i;
	        // update $key
	        if (key) {
	          frag.scope.$key = key;
	        }
	        // update iterator
	        if (iterator) {
	          frag.scope[iterator] = key !== null ? key : i;
	        }
	        // update data for track-by, object repeat &
	        // primitive values.
	        if (trackByKey || convertedFromObject || primitive) {
	          frag.scope[alias] = value;
	        }
	      } else {
	        // new isntance
	        frag = this.create(value, alias, i, key);
	        frag.fresh = !init;
	      }
	      frags[i] = frag;
	      if (init) {
	        frag.before(end);
	      }
	    }
	
	    // we're done for the initial render.
	    if (init) {
	      return;
	    }
	
	    // Second pass, go through the old fragments and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0;
	    var totalRemoved = oldFrags.length - frags.length;
	    // when removing a large number of fragments, watcher removal
	    // turns out to be a perf bottleneck, so we batch the watcher
	    // removals into a single filter call!
	    this.vm._vForRemoving = true;
	    for (i = 0, l = oldFrags.length; i < l; i++) {
	      frag = oldFrags[i];
	      if (!frag.reused) {
	        this.deleteCachedFrag(frag);
	        this.remove(frag, removalIndex++, totalRemoved, inDocument);
	      }
	    }
	    this.vm._vForRemoving = false;
	    if (removalIndex) {
	      this.vm._watchers = this.vm._watchers.filter(function (w) {
	        return w.active;
	      });
	    }
	
	    // Final pass, move/insert new fragments into the
	    // right place.
	    var targetPrev, prevEl, currentPrev;
	    var insertionIndex = 0;
	    for (i = 0, l = frags.length; i < l; i++) {
	      frag = frags[i];
	      // this is the frag that we should be after
	      targetPrev = frags[i - 1];
	      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
	      if (frag.reused && !frag.staggerCb) {
	        currentPrev = findPrevFrag(frag, start, this.id);
	        if (currentPrev !== targetPrev && (!currentPrev ||
	        // optimization for moving a single item.
	        // thanks to suggestions by @livoras in #1807
	        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
	          this.move(frag, prevEl);
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(frag, insertionIndex++, prevEl, inDocument);
	      }
	      frag.reused = frag.fresh = false;
	    }
	  },
	
	  /**
	   * Create a new fragment instance.
	   *
	   * @param {*} value
	   * @param {String} alias
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Fragment}
	   */
	
	  create: function create(value, alias, index, key) {
	    var host = this._host;
	    // create iteration scope
	    var parentScope = this._scope || this.vm;
	    var scope = Object.create(parentScope);
	    // ref holder for the scope
	    scope.$refs = Object.create(parentScope.$refs);
	    scope.$els = Object.create(parentScope.$els);
	    // make sure point $parent to parent scope
	    scope.$parent = parentScope;
	    // for two-way binding on alias
	    scope.$forContext = this;
	    // define scope properties
	    defineReactive(scope, alias, value, true /* do not observe */);
	    defineReactive(scope, '$index', index);
	    if (key) {
	      defineReactive(scope, '$key', key);
	    } else if (scope.$key) {
	      // avoid accidental fallback
	      def(scope, '$key', null);
	    }
	    if (this.iterator) {
	      defineReactive(scope, this.iterator, key !== null ? key : index);
	    }
	    var frag = this.factory.create(host, scope, this._frag);
	    frag.forId = this.id;
	    this.cacheFrag(value, frag, index, key);
	    return frag;
	  },
	
	  /**
	   * Update the v-ref on owner vm.
	   */
	
	  updateRef: function updateRef() {
	    var ref = this.descriptor.ref;
	    if (!ref) return;
	    var hash = (this._scope || this.vm).$refs;
	    var refs;
	    if (!this.fromObject) {
	      refs = this.frags.map(findVmFromFrag);
	    } else {
	      refs = {};
	      this.frags.forEach(function (frag) {
	        refs[frag.scope.$key] = findVmFromFrag(frag);
	      });
	    }
	    hash[ref] = refs;
	  },
	
	  /**
	   * For option lists, update the containing v-model on
	   * parent <select>.
	   */
	
	  updateModel: function updateModel() {
	    if (this.isOption) {
	      var parent = this.start.parentNode;
	      var model = parent && parent.__v_model;
	      if (model) {
	        model.forceUpdate();
	      }
	    }
	  },
	
	  /**
	   * Insert a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDocument
	   */
	
	  insert: function insert(frag, index, prevEl, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	    }
	    var staggerAmount = this.getStagger(frag, index, null, 'enter');
	    if (inDocument && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = frag.staggerAnchor;
	      if (!anchor) {
	        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
	        anchor.__v_frag = frag;
	      }
	      after(anchor, prevEl);
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.before(anchor);
	        remove(anchor);
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.before(prevEl.nextSibling);
	    }
	  },
	
	  /**
	   * Remove a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {Boolean} inDocument
	   */
	
	  remove: function remove(frag, index, total, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	      // it's not possible for the same frag to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this frag is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return;
	    }
	    var staggerAmount = this.getStagger(frag, index, total, 'leave');
	    if (inDocument && staggerAmount) {
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.remove();
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.remove();
	    }
	  },
	
	  /**
	   * Move a fragment to a new position.
	   * Force no transition.
	   *
	   * @param {Fragment} frag
	   * @param {Node} prevEl
	   */
	
	  move: function move(frag, prevEl) {
	    // fix a common issue with Sortable:
	    // if prevEl doesn't have nextSibling, this means it's
	    // been dragged after the end anchor. Just re-position
	    // the end anchor to the end of the container.
	    /* istanbul ignore if */
	    if (!prevEl.nextSibling) {
	      this.end.parentNode.appendChild(this.end);
	    }
	    frag.before(prevEl.nextSibling, false);
	  },
	
	  /**
	   * Cache a fragment using track-by or the object key.
	   *
	   * @param {*} value
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {String} [key]
	   */
	
	  cacheFrag: function cacheFrag(value, frag, index, key) {
	    var trackByKey = this.params.trackBy;
	    var cache = this.cache;
	    var primitive = !isObject(value);
	    var id;
	    if (key || trackByKey || primitive) {
	      id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      if (!cache[id]) {
	        cache[id] = frag;
	      } else if (trackByKey !== '$index') {
	        process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	      }
	    } else {
	      id = this.id;
	      if (hasOwn(value, id)) {
	        if (value[id] === null) {
	          value[id] = frag;
	        } else {
	          process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	        }
	      } else {
	        def(value, id, frag);
	      }
	    }
	    frag.raw = value;
	  },
	
	  /**
	   * Get a cached fragment from the value/index/key
	   *
	   * @param {*} value
	   * @param {Number} index
	   * @param {String} key
	   * @return {Fragment}
	   */
	
	  getCachedFrag: function getCachedFrag(value, index, key) {
	    var trackByKey = this.params.trackBy;
	    var primitive = !isObject(value);
	    var frag;
	    if (key || trackByKey || primitive) {
	      var id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      frag = this.cache[id];
	    } else {
	      frag = value[this.id];
	    }
	    if (frag && (frag.reused || frag.fresh)) {
	      process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	    }
	    return frag;
	  },
	
	  /**
	   * Delete a fragment from cache.
	   *
	   * @param {Fragment} frag
	   */
	
	  deleteCachedFrag: function deleteCachedFrag(frag) {
	    var value = frag.raw;
	    var trackByKey = this.params.trackBy;
	    var scope = frag.scope;
	    var index = scope.$index;
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = hasOwn(scope, '$key') && scope.$key;
	    var primitive = !isObject(value);
	    if (trackByKey || key || primitive) {
	      var id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      this.cache[id] = null;
	    } else {
	      value[this.id] = null;
	      frag.raw = null;
	    }
	  },
	
	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {String} type
	   */
	
	  getStagger: function getStagger(frag, index, total, type) {
	    type = type + 'Stagger';
	    var trans = frag.node.__v_trans;
	    var hooks = trans && trans.hooks;
	    var hook = hooks && (hooks[type] || hooks.stagger);
	    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
	  },
	
	  /**
	   * Pre-process the value before piping it through the
	   * filters. This is passed to and called by the watcher.
	   */
	
	  _preProcess: function _preProcess(value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value;
	    return value;
	  },
	
	  /**
	   * Post-process the value after it has been piped through
	   * the filters. This is passed to and called by the watcher.
	   *
	   * It is necessary for this to be called during the
	   * wathcer's dependency collection phase because we want
	   * the v-for to update when the source Object is mutated.
	   */
	
	  _postProcess: function _postProcess(value) {
	    if (isArray(value)) {
	      return value;
	    } else if (isPlainObject(value)) {
	      // convert plain object to array.
	      var keys = Object.keys(value);
	      var i = keys.length;
	      var res = new Array(i);
	      var key;
	      while (i--) {
	        key = keys[i];
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        };
	      }
	      return res;
	    } else {
	      if (typeof value === 'number' && !isNaN(value)) {
	        value = range(value);
	      }
	      return value || [];
	    }
	  },
	
	  unbind: function unbind() {
	    if (this.descriptor.ref) {
	      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
	    }
	    if (this.frags) {
	      var i = this.frags.length;
	      var frag;
	      while (i--) {
	        frag = this.frags[i];
	        this.deleteCachedFrag(frag);
	        frag.destroy();
	      }
	    }
	  }
	};
	
	/**
	 * Helper to find the previous element that is a fragment
	 * anchor. This is necessary because a destroyed frag's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its inserted flag
	 * should have been set to false so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return frag that is bound to this v-for. (see #929)
	 *
	 * @param {Fragment} frag
	 * @param {Comment|Text} anchor
	 * @param {String} id
	 * @return {Fragment}
	 */
	
	function findPrevFrag(frag, anchor, id) {
	  var el = frag.node.previousSibling;
	  /* istanbul ignore if */
	  if (!el) return;
	  frag = el.__v_frag;
	  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
	    el = el.previousSibling;
	    /* istanbul ignore if */
	    if (!el) return;
	    frag = el.__v_frag;
	  }
	  return frag;
	}
	
	/**
	 * Find a vm from a fragment.
	 *
	 * @param {Fragment} frag
	 * @return {Vue|undefined}
	 */
	
	function findVmFromFrag(frag) {
	  var node = frag.node;
	  // handle multi-node frag
	  if (frag.end) {
	    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
	      node = node.nextSibling;
	    }
	  }
	  return node.__vue__;
	}
	
	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */
	
	function range(n) {
	  var i = -1;
	  var ret = new Array(Math.floor(n));
	  while (++i < n) {
	    ret[i] = i;
	  }
	  return ret;
	}
	
	if (process.env.NODE_ENV !== 'production') {
	  vFor.warnDuplicate = function (value) {
	    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.');
	  };
	}
	
	var vIf = {
	
	  priority: IF,
	
	  bind: function bind() {
	    var el = this.el;
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling;
	      if (next && getAttr(next, 'v-else') !== null) {
	        remove(next);
	        this.elseEl = next;
	      }
	      // check main block
	      this.anchor = createAnchor('v-if');
	      replace(el, this.anchor);
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.');
	      this.invalid = true;
	    }
	  },
	
	  update: function update(value) {
	    if (this.invalid) return;
	    if (value) {
	      if (!this.frag) {
	        this.insert();
	      }
	    } else {
	      this.remove();
	    }
	  },
	
	  insert: function insert() {
	    if (this.elseFrag) {
	      this.elseFrag.remove();
	      this.elseFrag = null;
	    }
	    // lazy init factory
	    if (!this.factory) {
	      this.factory = new FragmentFactory(this.vm, this.el);
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag);
	    this.frag.before(this.anchor);
	  },
	
	  remove: function remove() {
	    if (this.frag) {
	      this.frag.remove();
	      this.frag = null;
	    }
	    if (this.elseEl && !this.elseFrag) {
	      if (!this.elseFactory) {
	        this.elseFactory = new FragmentFactory(this.elseEl._context || this.vm, this.elseEl);
	      }
	      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
	      this.elseFrag.before(this.anchor);
	    }
	  },
	
	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	    if (this.elseFrag) {
	      this.elseFrag.destroy();
	    }
	  }
	};
	
	var show = {
	
	  bind: function bind() {
	    // check else block
	    var next = this.el.nextElementSibling;
	    if (next && getAttr(next, 'v-else') !== null) {
	      this.elseEl = next;
	    }
	  },
	
	  update: function update(value) {
	    this.apply(this.el, value);
	    if (this.elseEl) {
	      this.apply(this.elseEl, !value);
	    }
	  },
	
	  apply: function apply(el, value) {
	    if (inDoc(el)) {
	      applyTransition(el, value ? 1 : -1, toggle, this.vm);
	    } else {
	      toggle();
	    }
	    function toggle() {
	      el.style.display = value ? '' : 'none';
	    }
	  }
	};
	
	var text$2 = {
	
	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	    var isRange = el.type === 'range';
	    var lazy = this.params.lazy;
	    var number = this.params.number;
	    var debounce = this.params.debounce;
	
	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false;
	    if (!isAndroid && !isRange) {
	      this.on('compositionstart', function () {
	        composing = true;
	      });
	      this.on('compositionend', function () {
	        composing = false;
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        //
	        // #1327: in lazy mode this is unecessary.
	        if (!lazy) {
	          self.listener();
	        }
	      });
	    }
	
	    // prevent messing with the input when user is typing,
	    // and force update on blur.
	    this.focused = false;
	    if (!isRange && !lazy) {
	      this.on('focus', function () {
	        self.focused = true;
	      });
	      this.on('blur', function () {
	        self.focused = false;
	        // do not sync value after fragment removal (#2017)
	        if (!self._frag || self._frag.inserted) {
	          self.rawListener();
	        }
	      });
	    }
	
	    // Now attach the main listener
	    this.listener = this.rawListener = function () {
	      if (composing || !self._bound) {
	        return;
	      }
	      var val = number || isRange ? toNumber(el.value) : el.value;
	      self.set(val);
	      // force update on next tick to avoid lock & same value
	      // also only update when user is not typing
	      nextTick(function () {
	        if (self._bound && !self.focused) {
	          self.update(self._watcher.value);
	        }
	      });
	    };
	
	    // apply debounce
	    if (debounce) {
	      this.listener = _debounce(this.listener, debounce);
	    }
	
	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function';
	    if (this.hasjQuery) {
	      var method = jQuery.fn.on ? 'on' : 'bind';
	      jQuery(el)[method]('change', this.rawListener);
	      if (!lazy) {
	        jQuery(el)[method]('input', this.listener);
	      }
	    } else {
	      this.on('change', this.rawListener);
	      if (!lazy) {
	        this.on('input', this.listener);
	      }
	    }
	
	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && isIE9) {
	      this.on('cut', function () {
	        nextTick(self.listener);
	      });
	      this.on('keyup', function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener();
	        }
	      });
	    }
	
	    // set initial value if present
	    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
	      this.afterBind = this.listener;
	    }
	  },
	
	  update: function update(value) {
	    this.el.value = _toString(value);
	  },
	
	  unbind: function unbind() {
	    var el = this.el;
	    if (this.hasjQuery) {
	      var method = jQuery.fn.off ? 'off' : 'unbind';
	      jQuery(el)[method]('change', this.listener);
	      jQuery(el)[method]('input', this.listener);
	    }
	  }
	};
	
	var radio = {
	
	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	
	    this.getValue = function () {
	      // value overwrite via v-bind:value
	      if (el.hasOwnProperty('_value')) {
	        return el._value;
	      }
	      var val = el.value;
	      if (self.params.number) {
	        val = toNumber(val);
	      }
	      return val;
	    };
	
	    this.listener = function () {
	      self.set(self.getValue());
	    };
	    this.on('change', this.listener);
	
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },
	
	  update: function update(value) {
	    this.el.checked = looseEqual(value, this.getValue());
	  }
	};
	
	var select = {
	
	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	
	    // method to force update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get());
	      }
	    };
	
	    // check if this is a multiple select
	    var multiple = this.multiple = el.hasAttribute('multiple');
	
	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, multiple);
	      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
	      self.set(value);
	    };
	    this.on('change', this.listener);
	
	    // if has initial value, set afterBind
	    var initValue = getValue(el, multiple, true);
	    if (multiple && initValue.length || !multiple && initValue !== null) {
	      this.afterBind = this.listener;
	    }
	
	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', this.forceUpdate);
	  },
	
	  update: function update(value) {
	    var el = this.el;
	    el.selectedIndex = -1;
	    var multi = this.multiple && isArray(value);
	    var options = el.options;
	    var i = options.length;
	    var op, val;
	    while (i--) {
	      op = options[i];
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      /* eslint-disable eqeqeq */
	      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
	      /* eslint-enable eqeqeq */
	    }
	  },
	
	  unbind: function unbind() {
	    /* istanbul ignore next */
	    this.vm.$off('hook:attached', this.forceUpdate);
	  }
	};
	
	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @param {Boolean} init
	 * @return {Array|*}
	 */
	
	function getValue(el, multi, init) {
	  var res = multi ? [] : null;
	  var op, val, selected;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i];
	    selected = init ? op.hasAttribute('selected') : op.selected;
	    if (selected) {
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      if (multi) {
	        res.push(val);
	      } else {
	        return val;
	      }
	    }
	  }
	  return res;
	}
	
	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with custom equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */
	
	function indexOf$1(arr, val) {
	  var i = arr.length;
	  while (i--) {
	    if (looseEqual(arr[i], val)) {
	      return i;
	    }
	  }
	  return -1;
	}
	
	var checkbox = {
	
	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	
	    this.getValue = function () {
	      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
	    };
	
	    function getBooleanValue() {
	      var val = el.checked;
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue;
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue;
	      }
	      return val;
	    }
	
	    this.listener = function () {
	      var model = self._watcher.value;
	      if (isArray(model)) {
	        var val = self.getValue();
	        if (el.checked) {
	          if (indexOf(model, val) < 0) {
	            model.push(val);
	          }
	        } else {
	          model.$remove(val);
	        }
	      } else {
	        self.set(getBooleanValue());
	      }
	    };
	
	    this.on('change', this.listener);
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },
	
	  update: function update(value) {
	    var el = this.el;
	    if (isArray(value)) {
	      el.checked = indexOf(value, this.getValue()) > -1;
	    } else {
	      if (el.hasOwnProperty('_trueValue')) {
	        el.checked = looseEqual(value, el._trueValue);
	      } else {
	        el.checked = !!value;
	      }
	    }
	  }
	};
	
	var handlers = {
	  text: text$2,
	  radio: radio,
	  select: select,
	  checkbox: checkbox
	};
	
	var model = {
	
	  priority: MODEL,
	  twoWay: true,
	  handlers: handlers,
	  params: ['lazy', 'number', 'debounce'],
	
	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   */
	
	  bind: function bind() {
	    // friendly warning...
	    this.checkFilters();
	    if (this.hasRead && !this.hasWrite) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model. You might want to use a two-way filter ' + 'to ensure correct behavior.');
	    }
	    var el = this.el;
	    var tag = el.tagName;
	    var handler;
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text;
	    } else if (tag === 'SELECT') {
	      handler = handlers.select;
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text;
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag);
	      return;
	    }
	    el.__v_model = this;
	    handler.bind.call(this);
	    this.update = handler.update;
	    this._unbind = handler.unbind;
	  },
	
	  /**
	   * Check read/write filter stats.
	   */
	
	  checkFilters: function checkFilters() {
	    var filters = this.filters;
	    if (!filters) return;
	    var i = filters.length;
	    while (i--) {
	      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true;
	      }
	      if (filter.write) {
	        this.hasWrite = true;
	      }
	    }
	  },
	
	  unbind: function unbind() {
	    this.el.__v_model = null;
	    this._unbind && this._unbind();
	  }
	};
	
	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': [8, 46],
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	};
	
	function keyFilter(handler, keys) {
	  var codes = keys.map(function (key) {
	    var charCode = key.charCodeAt(0);
	    if (charCode > 47 && charCode < 58) {
	      return parseInt(key, 10);
	    }
	    if (key.length === 1) {
	      charCode = key.toUpperCase().charCodeAt(0);
	      if (charCode > 64 && charCode < 91) {
	        return charCode;
	      }
	    }
	    return keyCodes[key];
	  });
	  codes = [].concat.apply([], codes);
	  return function keyHandler(e) {
	    if (codes.indexOf(e.keyCode) > -1) {
	      return handler.call(this, e);
	    }
	  };
	}
	
	function stopFilter(handler) {
	  return function stopHandler(e) {
	    e.stopPropagation();
	    return handler.call(this, e);
	  };
	}
	
	function preventFilter(handler) {
	  return function preventHandler(e) {
	    e.preventDefault();
	    return handler.call(this, e);
	  };
	}
	
	function selfFilter(handler) {
	  return function selfHandler(e) {
	    if (e.target === e.currentTarget) {
	      return handler.call(this, e);
	    }
	  };
	}
	
	var on$1 = {
	
	  priority: ON,
	  acceptStatement: true,
	  keyCodes: keyCodes,
	
	  bind: function bind() {
	    // deal with iframes
	    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
	      var self = this;
	      this.iframeBind = function () {
	        on(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture);
	      };
	      this.on('load', this.iframeBind);
	    }
	  },
	
	  update: function update(handler) {
	    // stub a noop for v-on with no value,
	    // e.g. @mousedown.prevent
	    if (!this.descriptor.raw) {
	      handler = function () {};
	    }
	
	    if (typeof handler !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler);
	      return;
	    }
	
	    // apply modifiers
	    if (this.modifiers.stop) {
	      handler = stopFilter(handler);
	    }
	    if (this.modifiers.prevent) {
	      handler = preventFilter(handler);
	    }
	    if (this.modifiers.self) {
	      handler = selfFilter(handler);
	    }
	    // key filter
	    var keys = Object.keys(this.modifiers).filter(function (key) {
	      return key !== 'stop' && key !== 'prevent' && key !== 'self';
	    });
	    if (keys.length) {
	      handler = keyFilter(handler, keys);
	    }
	
	    this.reset();
	    this.handler = handler;
	
	    if (this.iframeBind) {
	      this.iframeBind();
	    } else {
	      on(this.el, this.arg, this.handler, this.modifiers.capture);
	    }
	  },
	
	  reset: function reset() {
	    var el = this.iframeBind ? this.el.contentWindow : this.el;
	    if (this.handler) {
	      off(el, this.arg, this.handler);
	    }
	  },
	
	  unbind: function unbind() {
	    this.reset();
	  }
	};
	
	var prefixes = ['-webkit-', '-moz-', '-ms-'];
	var camelPrefixes = ['Webkit', 'Moz', 'ms'];
	var importantRE = /!important;?$/;
	var propCache = Object.create(null);
	
	var testEl = null;
	
	var style = {
	
	  deep: true,
	
	  update: function update(value) {
	    if (typeof value === 'string') {
	      this.el.style.cssText = value;
	    } else if (isArray(value)) {
	      this.handleObject(value.reduce(extend, {}));
	    } else {
	      this.handleObject(value || {});
	    }
	  },
	
	  handleObject: function handleObject(value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {});
	    var name, val;
	    for (name in cache) {
	      if (!(name in value)) {
	        this.handleSingle(name, null);
	        delete cache[name];
	      }
	    }
	    for (name in value) {
	      val = value[name];
	      if (val !== cache[name]) {
	        cache[name] = val;
	        this.handleSingle(name, val);
	      }
	    }
	  },
	
	  handleSingle: function handleSingle(prop, value) {
	    prop = normalize(prop);
	    if (!prop) return; // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += '';
	    if (value) {
	      var isImportant = importantRE.test(value) ? 'important' : '';
	      if (isImportant) {
	        value = value.replace(importantRE, '').trim();
	      }
	      this.el.style.setProperty(prop, value, isImportant);
	    } else {
	      this.el.style.removeProperty(prop);
	    }
	  }
	
	};
	
	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */
	
	function normalize(prop) {
	  if (propCache[prop]) {
	    return propCache[prop];
	  }
	  var res = prefix(prop);
	  propCache[prop] = propCache[res] = res;
	  return res;
	}
	
	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */
	
	function prefix(prop) {
	  prop = hyphenate(prop);
	  var camel = camelize(prop);
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	  if (!testEl) {
	    testEl = document.createElement('div');
	  }
	  var i = prefixes.length;
	  var prefixed;
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return prefixes[i] + prop;
	    }
	  }
	  if (camel in testEl.style) {
	    return prop;
	  }
	}
	
	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xlinkRE = /^xlink:/;
	
	// check for attributes that prohibit interpolations
	var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
	// these attributes should also set their corresponding properties
	// because they only affect the initial state of the element
	var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;
	// these attributes expect enumrated values of "true" or "false"
	// but are not boolean attributes
	var enumeratedAttrRE = /^(?:draggable|contenteditable|spellcheck)$/;
	
	// these attributes should set a hidden property for
	// binding v-model to object values
	var modelProps = {
	  value: '_value',
	  'true-value': '_trueValue',
	  'false-value': '_falseValue'
	};
	
	var bind$1 = {
	
	  priority: BIND,
	
	  bind: function bind() {
	    var attr = this.arg;
	    var tag = this.el.tagName;
	    // should be deep watch on object mode
	    if (!attr) {
	      this.deep = true;
	    }
	    // handle interpolation bindings
	    var descriptor = this.descriptor;
	    var tokens = descriptor.interp;
	    if (tokens) {
	      // handle interpolations with one-time tokens
	      if (descriptor.hasOneTime) {
	        this.expression = tokensToExp(tokens, this._scope || this.vm);
	      }
	
	      // only allow binding on native attributes
	      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
	        process.env.NODE_ENV !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.');
	        this.el.removeAttribute(attr);
	        this.invalid = true;
	      }
	
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production') {
	        var raw = attr + '="' + descriptor.raw + '": ';
	        // warn src
	        if (attr === 'src') {
	          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.');
	        }
	
	        // warn style
	        if (attr === 'style') {
	          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.');
	        }
	      }
	    }
	  },
	
	  update: function update(value) {
	    if (this.invalid) {
	      return;
	    }
	    var attr = this.arg;
	    if (this.arg) {
	      this.handleSingle(attr, value);
	    } else {
	      this.handleObject(value || {});
	    }
	  },
	
	  // share object handler with v-bind:class
	  handleObject: style.handleObject,
	
	  handleSingle: function handleSingle(attr, value) {
	    var el = this.el;
	    var interp = this.descriptor.interp;
	    if (this.modifiers.camel) {
	      attr = camelize(attr);
	    }
	    if (!interp && attrWithPropsRE.test(attr) && attr in el) {
	      el[attr] = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
	      ? '' : value : value;
	    }
	    // set model props
	    var modelProp = modelProps[attr];
	    if (!interp && modelProp) {
	      el[modelProp] = value;
	      // update v-model if present
	      var model = el.__v_model;
	      if (model) {
	        model.listener();
	      }
	    }
	    // do not set value attribute for textarea
	    if (attr === 'value' && el.tagName === 'TEXTAREA') {
	      el.removeAttribute(attr);
	      return;
	    }
	    // update attribute
	    if (enumeratedAttrRE.test(attr)) {
	      el.setAttribute(attr, value ? 'true' : 'false');
	    } else if (value != null && value !== false) {
	      if (attr === 'class') {
	        // handle edge case #1960:
	        // class interpolation should not overwrite Vue transition class
	        if (el.__v_trans) {
	          value += ' ' + el.__v_trans.id + '-transition';
	        }
	        setClass(el, value);
	      } else if (xlinkRE.test(attr)) {
	        el.setAttributeNS(xlinkNS, attr, value === true ? '' : value);
	      } else {
	        el.setAttribute(attr, value === true ? '' : value);
	      }
	    } else {
	      el.removeAttribute(attr);
	    }
	  }
	};
	
	var el = {
	
	  priority: EL,
	
	  bind: function bind() {
	    /* istanbul ignore if */
	    if (!this.arg) {
	      return;
	    }
	    var id = this.id = camelize(this.arg);
	    var refs = (this._scope || this.vm).$els;
	    if (hasOwn(refs, id)) {
	      refs[id] = this.el;
	    } else {
	      defineReactive(refs, id, this.el);
	    }
	  },
	
	  unbind: function unbind() {
	    var refs = (this._scope || this.vm).$els;
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null;
	    }
	  }
	};
	
	var ref = {
	  bind: function bind() {
	    process.env.NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.');
	  }
	};
	
	var cloak = {
	  bind: function bind() {
	    var el = this.el;
	    this.vm.$once('pre-hook:compiled', function () {
	      el.removeAttribute('v-cloak');
	    });
	  }
	};
	
	// must export plain object
	var directives = {
	  text: text$1,
	  html: html,
	  'for': vFor,
	  'if': vIf,
	  show: show,
	  model: model,
	  on: on$1,
	  bind: bind$1,
	  el: el,
	  ref: ref,
	  cloak: cloak
	};
	
	var vClass = {
	
	  deep: true,
	
	  update: function update(value) {
	    if (value && typeof value === 'string') {
	      this.handleObject(stringToObject(value));
	    } else if (isPlainObject(value)) {
	      this.handleObject(value);
	    } else if (isArray(value)) {
	      this.handleArray(value);
	    } else {
	      this.cleanup();
	    }
	  },
	
	  handleObject: function handleObject(value) {
	    this.cleanup(value);
	    var keys = this.prevKeys = Object.keys(value);
	    for (var i = 0, l = keys.length; i < l; i++) {
	      var key = keys[i];
	      if (value[key]) {
	        addClass(this.el, key);
	      } else {
	        removeClass(this.el, key);
	      }
	    }
	  },
	
	  handleArray: function handleArray(value) {
	    this.cleanup(value);
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        addClass(this.el, value[i]);
	      }
	    }
	    this.prevKeys = value.slice();
	  },
	
	  cleanup: function cleanup(value) {
	    if (this.prevKeys) {
	      var i = this.prevKeys.length;
	      while (i--) {
	        var key = this.prevKeys[i];
	        if (key && (!value || !contains(value, key))) {
	          removeClass(this.el, key);
	        }
	      }
	    }
	  }
	};
	
	function stringToObject(value) {
	  var res = {};
	  var keys = value.trim().split(/\s+/);
	  var i = keys.length;
	  while (i--) {
	    res[keys[i]] = true;
	  }
	  return res;
	}
	
	function contains(value, key) {
	  return isArray(value) ? value.indexOf(key) > -1 : hasOwn(value, key);
	}
	
	var component = {
	
	  priority: COMPONENT,
	
	  params: ['keep-alive', 'transition-mode', 'inline-template'],
	
	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   <comp> or <div v-component="comp">
	   *
	   * - dynamic:
	   *   <component :is="view">
	   */
	
	  bind: function bind() {
	    if (!this.el.__vue__) {
	      // keep-alive cache
	      this.keepAlive = this.params.keepAlive;
	      if (this.keepAlive) {
	        this.cache = {};
	      }
	      // check inline-template
	      if (this.params.inlineTemplate) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = extractContent(this.el, true);
	      }
	      // component resolution related state
	      this.pendingComponentCb = this.Component = null;
	      // transition related state
	      this.pendingRemovals = 0;
	      this.pendingRemovalCb = null;
	      // create a ref anchor
	      this.anchor = createAnchor('v-component');
	      replace(this.el, this.anchor);
	      // remove is attribute.
	      // this is removed during compilation, but because compilation is
	      // cached, when the component is used elsewhere this attribute
	      // will remain at link time.
	      this.el.removeAttribute('is');
	      // remove ref, same as above
	      if (this.descriptor.ref) {
	        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
	      }
	      // if static, build right now.
	      if (this.literal) {
	        this.setComponent(this.expression);
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
	    }
	  },
	
	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. <component :is="view">
	   */
	
	  update: function update(value) {
	    if (!this.literal) {
	      this.setComponent(value);
	    }
	  },
	
	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */
	
	  setComponent: function setComponent(value, cb) {
	    this.invalidatePending();
	    if (!value) {
	      // just remove current
	      this.unbuild(true);
	      this.remove(this.childVM, cb);
	      this.childVM = null;
	    } else {
	      var self = this;
	      this.resolveComponent(value, function () {
	        self.mountComponent(cb);
	      });
	    }
	  },
	
	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   */
	
	  resolveComponent: function resolveComponent(id, cb) {
	    var self = this;
	    this.pendingComponentCb = cancellable(function (Component) {
	      self.ComponentName = Component.options.name || id;
	      self.Component = Component;
	      cb();
	    });
	    this.vm._resolveComponent(id, this.pendingComponentCb);
	  },
	
	  /**
	   * Create a new instance using the current constructor and
	   * replace the existing instance. This method doesn't care
	   * whether the new component and the old one are actually
	   * the same.
	   *
	   * @param {Function} [cb]
	   */
	
	  mountComponent: function mountComponent(cb) {
	    // actual mount
	    this.unbuild(true);
	    var self = this;
	    var activateHooks = this.Component.options.activate;
	    var cached = this.getCached();
	    var newComponent = this.build();
	    if (activateHooks && !cached) {
	      this.waitingFor = newComponent;
	      callActivateHooks(activateHooks, newComponent, function () {
	        if (self.waitingFor !== newComponent) {
	          return;
	        }
	        self.waitingFor = null;
	        self.transition(newComponent, cb);
	      });
	    } else {
	      // update ref for kept-alive component
	      if (cached) {
	        newComponent._updateRef();
	      }
	      this.transition(newComponent, cb);
	    }
	  },
	
	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */
	
	  invalidatePending: function invalidatePending() {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel();
	      this.pendingComponentCb = null;
	    }
	  },
	
	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */
	
	  build: function build(extraOptions) {
	    var cached = this.getCached();
	    if (cached) {
	      return cached;
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        name: this.ComponentName,
	        el: cloneNode(this.el),
	        template: this.inlineTemplate,
	        // make sure to add the child with correct parent
	        // if this is a transcluded component, its parent
	        // should be the transclusion host.
	        parent: this._host || this.vm,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.inlineTemplate,
	        _ref: this.descriptor.ref,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        // if this is a transcluded component, context
	        // will be the common parent vm of this instance
	        // and its host.
	        _context: this.vm,
	        // if this is inside an inline v-for, the scope
	        // will be the intermediate scope created for this
	        // repeat fragment. this is used for linking props
	        // and container directives.
	        _scope: this._scope,
	        // pass in the owner fragment of this component.
	        // this is necessary so that the fragment can keep
	        // track of its contained components in order to
	        // call attach/detach hooks for them.
	        _frag: this._frag
	      };
	      // extra options
	      // in 1.0.0 this is used by vue-router only
	      /* istanbul ignore if */
	      if (extraOptions) {
	        extend(options, extraOptions);
	      }
	      var child = new this.Component(options);
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child;
	      }
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
	        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template);
	      }
	      return child;
	    }
	  },
	
	  /**
	   * Try to get a cached instance of the current component.
	   *
	   * @return {Vue|undefined}
	   */
	
	  getCached: function getCached() {
	    return this.keepAlive && this.cache[this.Component.cid];
	  },
	
	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */
	
	  unbuild: function unbuild(defer) {
	    if (this.waitingFor) {
	      this.waitingFor.$destroy();
	      this.waitingFor = null;
	    }
	    var child = this.childVM;
	    if (!child || this.keepAlive) {
	      if (child) {
	        // remove ref
	        child._inactive = true;
	        child._updateRef(true);
	      }
	      return;
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer);
	  },
	
	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */
	
	  remove: function remove(child, cb) {
	    var keepAlive = this.keepAlive;
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++;
	      this.pendingRemovalCb = cb;
	      var self = this;
	      child.$remove(function () {
	        self.pendingRemovals--;
	        if (!keepAlive) child._cleanup();
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb();
	          self.pendingRemovalCb = null;
	        }
	      });
	    } else if (cb) {
	      cb();
	    }
	  },
	
	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */
	
	  transition: function transition(target, cb) {
	    var self = this;
	    var current = this.childVM;
	    // for devtool inspection
	    if (current) current._inactive = true;
	    target._inactive = false;
	    this.childVM = target;
	    switch (self.params.transitionMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb);
	        });
	        break;
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb);
	        });
	        break;
	      default:
	        self.remove(current);
	        target.$before(self.anchor, cb);
	    }
	  },
	
	  /**
	   * Unbind.
	   */
	
	  unbind: function unbind() {
	    this.invalidatePending();
	    // Do not defer cleanup when unbinding
	    this.unbuild();
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy();
	      }
	      this.cache = null;
	    }
	  }
	};
	
	/**
	 * Call activate hooks in order (asynchronous)
	 *
	 * @param {Array} hooks
	 * @param {Vue} vm
	 * @param {Function} cb
	 */
	
	function callActivateHooks(hooks, vm, cb) {
	  var total = hooks.length;
	  var called = 0;
	  hooks[0].call(vm, next);
	  function next() {
	    if (++called >= total) {
	      cb();
	    } else {
	      hooks[called].call(vm, next);
	    }
	  }
	}
	
	var bindingModes = config._propBindingModes;
	
	var propDef = {
	
	  bind: function bind() {
	    var child = this.vm;
	    var parent = child._context;
	    // passed in from compiler directly
	    var prop = this.descriptor.prop;
	    var childKey = prop.path;
	    var parentKey = prop.parentPath;
	    var twoWay = prop.mode === bindingModes.TWO_WAY;
	
	    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
	      val = coerceProp(prop, val);
	      if (assertProp(prop, val)) {
	        child[childKey] = val;
	      }
	    }, {
	      twoWay: twoWay,
	      filters: prop.filters,
	      // important: props need to be observed on the
	      // v-for scope if present
	      scope: this._scope
	    });
	
	    // set the child initial value.
	    initProp(child, prop, parentWatcher.value);
	
	    // setup two-way binding
	    if (twoWay) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this;
	      child.$once('pre-hook:created', function () {
	        self.childWatcher = new Watcher(child, childKey, function (val) {
	          parentWatcher.set(val);
	        }, {
	          // ensure sync upward before parent sync down.
	          // this is necessary in cases e.g. the child
	          // mutates a prop array, then replaces it. (#1683)
	          sync: true
	        });
	      });
	    }
	  },
	
	  unbind: function unbind() {
	    this.parentWatcher.teardown();
	    if (this.childWatcher) {
	      this.childWatcher.teardown();
	    }
	  }
	};
	
	var queue$1 = [];
	var queued = false;
	
	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */
	
	function pushJob(job) {
	  queue$1.push(job);
	  if (!queued) {
	    queued = true;
	    nextTick(flush);
	  }
	}
	
	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */
	
	function flush() {
	  // Force layout
	  var f = document.documentElement.offsetHeight;
	  for (var i = 0; i < queue$1.length; i++) {
	    queue$1[i]();
	  }
	  queue$1 = [];
	  queued = false;
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f;
	}
	
	var TYPE_TRANSITION = 'transition';
	var TYPE_ANIMATION = 'animation';
	var transDurationProp = transitionProp + 'Duration';
	var animDurationProp = animationProp + 'Duration';
	
	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */
	function Transition(el, id, hooks, vm) {
	  this.id = id;
	  this.el = el;
	  this.enterClass = hooks && hooks.enterClass || id + '-enter';
	  this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
	  this.hooks = hooks;
	  this.vm = vm;
	  // async state
	  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
	  this.justEntered = false;
	  this.entered = this.left = false;
	  this.typeCache = {};
	  // check css transition type
	  this.type = hooks && hooks.type;
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
	      warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type);
	    }
	  }
	  // bind
	  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
	    self[m] = bind(self[m], self);
	  });
	}
	
	var p$1 = Transition.prototype;
	
	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */
	
	p$1.enter = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeEnter');
	  this.cb = cb;
	  addClass(this.el, this.enterClass);
	  op();
	  this.entered = false;
	  this.callHookWithCb('enter');
	  if (this.entered) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.enterCancelled;
	  pushJob(this.enterNextTick);
	};
	
	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */
	
	p$1.enterNextTick = function () {
	  // Important hack:
	  // in Chrome, if a just-entered element is applied the
	  // leave class while its interpolated property still has
	  // a very small value (within one frame), Chrome will
	  // skip the leave transition entirely and not firing the
	  // transtionend event. Therefore we need to protected
	  // against such cases using a one-frame timeout.
	  this.justEntered = true;
	  var self = this;
	  setTimeout(function () {
	    self.justEntered = false;
	  }, 17);
	
	  var enterDone = this.enterDone;
	  var type = this.getCssTransitionType(this.enterClass);
	  if (!this.pendingJsCb) {
	    if (type === TYPE_TRANSITION) {
	      // trigger transition by removing enter class now
	      removeClass(this.el, this.enterClass);
	      this.setupCssCb(transitionEndEvent, enterDone);
	    } else if (type === TYPE_ANIMATION) {
	      this.setupCssCb(animationEndEvent, enterDone);
	    } else {
	      enterDone();
	    }
	  } else if (type === TYPE_TRANSITION) {
	    removeClass(this.el, this.enterClass);
	  }
	};
	
	/**
	 * The "cleanup" phase of an entering transition.
	 */
	
	p$1.enterDone = function () {
	  this.entered = true;
	  this.cancel = this.pendingJsCb = null;
	  removeClass(this.el, this.enterClass);
	  this.callHook('afterEnter');
	  if (this.cb) this.cb();
	};
	
	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */
	
	p$1.leave = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeLeave');
	  this.op = op;
	  this.cb = cb;
	  addClass(this.el, this.leaveClass);
	  this.left = false;
	  this.callHookWithCb('leave');
	  if (this.left) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.leaveCancelled;
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone();
	    } else {
	      pushJob(this.leaveNextTick);
	    }
	  }
	};
	
	/**
	 * The "nextTick" phase of a leaving transition.
	 */
	
	p$1.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass);
	  if (type) {
	    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
	    this.setupCssCb(event, this.leaveDone);
	  } else {
	    this.leaveDone();
	  }
	};
	
	/**
	 * The "cleanup" phase of a leaving transition.
	 */
	
	p$1.leaveDone = function () {
	  this.left = true;
	  this.cancel = this.pendingJsCb = null;
	  this.op();
	  removeClass(this.el, this.leaveClass);
	  this.callHook('afterLeave');
	  if (this.cb) this.cb();
	  this.op = null;
	};
	
	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */
	
	p$1.cancelPending = function () {
	  this.op = this.cb = null;
	  var hasPending = false;
	  if (this.pendingCssCb) {
	    hasPending = true;
	    off(this.el, this.pendingCssEvent, this.pendingCssCb);
	    this.pendingCssEvent = this.pendingCssCb = null;
	  }
	  if (this.pendingJsCb) {
	    hasPending = true;
	    this.pendingJsCb.cancel();
	    this.pendingJsCb = null;
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass);
	    removeClass(this.el, this.leaveClass);
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el);
	    this.cancel = null;
	  }
	};
	
	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */
	
	p$1.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el);
	  }
	};
	
	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */
	
	p$1.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type];
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = cancellable(this[type + 'Done']);
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb);
	  }
	};
	
	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */
	
	p$1.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (!transitionEndEvent ||
	  // skip CSS transitions if page is not visible -
	  // this solves the issue of transitionend events not
	  // firing until the page is visible again.
	  // pageVisibility API is supported in IE10+, same as
	  // CSS transitions.
	  document.hidden ||
	  // explicit js-only transition
	  this.hooks && this.hooks.css === false ||
	  // element is hidden
	  isHidden(this.el)) {
	    return;
	  }
	  var type = this.type || this.typeCache[className];
	  if (type) return type;
	  var inlineStyles = this.el.style;
	  var computedStyles = window.getComputedStyle(this.el);
	  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION;
	  } else {
	    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION;
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type;
	  }
	  return type;
	};
	
	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */
	
	p$1.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event;
	  var self = this;
	  var el = this.el;
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      off(el, event, onEnd);
	      self.pendingCssEvent = self.pendingCssCb = null;
	      if (!self.pendingJsCb && cb) {
	        cb();
	      }
	    }
	  };
	  on(el, event, onEnd);
	};
	
	/**
	 * Check if an element is hidden - in that case we can just
	 * skip the transition alltogether.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */
	
	function isHidden(el) {
	  if (/svg$/.test(el.namespaceURI)) {
	    // SVG elements do not have offset(Width|Height)
	    // so we need to check the client rect
	    var rect = el.getBoundingClientRect();
	    return !(rect.width || rect.height);
	  } else {
	    return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	  }
	}
	
	var transition$1 = {
	
	  priority: TRANSITION,
	
	  update: function update(id, oldId) {
	    var el = this.el;
	    // resolve on owner vm
	    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
	    id = id || 'v';
	    el.__v_trans = new Transition(el, id, hooks, this.vm);
	    if (oldId) {
	      removeClass(el, oldId + '-transition');
	    }
	    addClass(el, id + '-transition');
	  }
	};
	
	var internalDirectives = {
	  style: style,
	  'class': vClass,
	  component: component,
	  prop: propDef,
	  transition: transition$1
	};
	
	var propBindingModes = config._propBindingModes;
	var empty = {};
	
	// regexes
	var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;
	
	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @return {Function} propsLinkFn
	 */
	
	function compileProps(el, propOptions) {
	  var props = [];
	  var names = Object.keys(propOptions);
	  var i = names.length;
	  var options, name, attr, value, path, parsed, prop;
	  while (i--) {
	    name = names[i];
	    options = propOptions[name] || empty;
	
	    if (process.env.NODE_ENV !== 'production' && name === '$data') {
	      warn('Do not use $data as prop.');
	      continue;
	    }
	
	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = camelize(name);
	    if (!identRE$1.test(path)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.');
	      continue;
	    }
	
	    prop = {
	      name: name,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY,
	      raw: null
	    };
	
	    attr = hyphenate(name);
	    // first check dynamic version
	    if ((value = getBindAttr(el, attr)) === null) {
	      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
	        prop.mode = propBindingModes.TWO_WAY;
	      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
	        prop.mode = propBindingModes.ONE_TIME;
	      }
	    }
	    if (value !== null) {
	      // has dynamic binding!
	      prop.raw = value;
	      parsed = parseDirective(value);
	      value = parsed.expression;
	      prop.filters = parsed.filters;
	      // check binding type
	      if (isLiteral(value) && !parsed.filters) {
	        // for expressions containing literal numbers and
	        // booleans, there's no need to setup a prop binding,
	        // so we can optimize them as a one-time set.
	        prop.optimizedLiteral = true;
	      } else {
	        prop.dynamic = true;
	        // check non-settable path for two-way bindings
	        if (process.env.NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
	          prop.mode = propBindingModes.ONE_WAY;
	          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value);
	        }
	      }
	      prop.parentPath = value;
	
	      // warn required two-way
	      if (process.env.NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
	        warn('Prop "' + name + '" expects a two-way binding type.');
	      }
	    } else if ((value = getAttr(el, attr)) !== null) {
	      // has literal binding!
	      prop.raw = value;
	    } else if (process.env.NODE_ENV !== 'production') {
	      // check possible camelCase prop usage
	      var lowerCaseName = path.toLowerCase();
	      value = /[A-Z\-]/.test(name) && (el.getAttribute(lowerCaseName) || el.getAttribute(':' + lowerCaseName) || el.getAttribute('v-bind:' + lowerCaseName) || el.getAttribute(':' + lowerCaseName + '.once') || el.getAttribute('v-bind:' + lowerCaseName + '.once') || el.getAttribute(':' + lowerCaseName + '.sync') || el.getAttribute('v-bind:' + lowerCaseName + '.sync'));
	      if (value) {
	        warn('Possible usage error for prop `' + lowerCaseName + '` - ' + 'did you mean `' + attr + '`? HTML is case-insensitive, remember to use ' + 'kebab-case for props in templates.');
	      } else if (options.required) {
	        // warn missing required
	        warn('Missing required prop: ' + name);
	      }
	    }
	    // push prop
	    props.push(prop);
	  }
	  return makePropsLinkFn(props);
	}
	
	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */
	
	function makePropsLinkFn(props) {
	  return function propsLinkFn(vm, scope) {
	    // store resolved props info
	    vm._props = {};
	    var i = props.length;
	    var prop, path, options, value, raw;
	    while (i--) {
	      prop = props[i];
	      raw = prop.raw;
	      path = prop.path;
	      options = prop.options;
	      vm._props[path] = prop;
	      if (raw === null) {
	        // initialize absent prop
	        initProp(vm, prop, undefined);
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (prop.mode === propBindingModes.ONE_TIME) {
	          // one time binding
	          value = (scope || vm._context || vm).$get(prop.parentPath);
	          initProp(vm, prop, value);
	        } else {
	          if (vm._context) {
	            // dynamic binding
	            vm._bindDir({
	              name: 'prop',
	              def: propDef,
	              prop: prop
	            }, null, null, scope); // el, host, scope
	          } else {
	              // root instance
	              initProp(vm, prop, vm.$get(prop.parentPath));
	            }
	        }
	      } else if (prop.optimizedLiteral) {
	        // optimized literal, cast it and just set once
	        var stripped = stripQuotes(raw);
	        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
	        initProp(vm, prop, value);
	      } else {
	        // string literal, but we need to cater for
	        // Boolean props with no value
	        value = options.type === Boolean && raw === '' ? true : raw;
	        initProp(vm, prop, value);
	      }
	    }
	  };
	}
	
	// special binding prefixes
	var bindRE = /^v-bind:|^:/;
	var onRE = /^v-on:|^@/;
	var dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/;
	var modifierRE = /\.[^\.]+/g;
	var transitionRE = /^(v-bind:|:)?transition$/;
	
	// terminal directives
	var terminalDirectives = ['for', 'if'];
	
	// default directive priority
	var DEFAULT_PRIORITY = 1000;
	
	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */
	
	function compile(el, options, partial) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
	  // link function for the childNodes
	  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && el.tagName !== 'SCRIPT' && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;
	
	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host] - host vm of transcluded content
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - link context fragment
	   * @return {Function|undefined}
	   */
	
	  return function compositeLinkFn(vm, el, host, scope, frag) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = toArray(el.childNodes);
	    // link
	    var dirs = linkAndCapture(function compositeLinkCapturer() {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
	      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
	    }, vm);
	    return makeUnlinkFn(vm, dirs);
	  };
	}
	
	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */
	
	function linkAndCapture(linker, vm) {
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV === 'production') {
	    // reset directives before every capture in production
	    // mode, so that when unlinking we don't need to splice
	    // them out (which turns out to be a perf hit).
	    // they are kept in development mode because they are
	    // useful for Vue's own tests.
	    vm._directives = [];
	  }
	  var originalDirCount = vm._directives.length;
	  linker();
	  var dirs = vm._directives.slice(originalDirCount);
	  dirs.sort(directiveComparator);
	  for (var i = 0, l = dirs.length; i < l; i++) {
	    dirs[i]._bind();
	  }
	  return dirs;
	}
	
	/**
	 * Directive priority sort comparator
	 *
	 * @param {Object} a
	 * @param {Object} b
	 */
	
	function directiveComparator(a, b) {
	  a = a.descriptor.def.priority || DEFAULT_PRIORITY;
	  b = b.descriptor.def.priority || DEFAULT_PRIORITY;
	  return a > b ? -1 : a === b ? 0 : 1;
	}
	
	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */
	
	function makeUnlinkFn(vm, dirs, context, contextDirs) {
	  function unlink(destroying) {
	    teardownDirs(vm, dirs, destroying);
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs);
	    }
	  }
	  // expose linked directives
	  unlink.dirs = dirs;
	  return unlink;
	}
	
	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */
	
	function teardownDirs(vm, dirs, destroying) {
	  var i = dirs.length;
	  while (i--) {
	    dirs[i]._teardown();
	    if (process.env.NODE_ENV !== 'production' && !destroying) {
	      vm._directives.$remove(dirs[i]);
	    }
	  }
	}
	
	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} props
	 * @param {Object} [scope]
	 * @return {Function}
	 */
	
	function compileAndLinkProps(vm, el, props, scope) {
	  var propsLinkFn = compileProps(el, props);
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, scope);
	  }, vm);
	  return makeUnlinkFn(vm, propDirs);
	}
	
	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Object} contextOptions
	 * @return {Function}
	 */
	
	function compileRoot(el, options, contextOptions) {
	  var containerAttrs = options._containerAttrs;
	  var replacerAttrs = options._replacerAttrs;
	  var contextLinkFn, replacerLinkFn;
	
	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs && contextOptions) {
	        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options);
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options);
	    }
	  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
	    // warn container directives for fragment instances
	    var names = containerAttrs.filter(function (attr) {
	      // allow vue-loader/vueify scoped css attributes
	      return attr.name.indexOf('_v-') < 0 &&
	      // allow event listeners
	      !onRE.test(attr.name) &&
	      // allow slots
	      attr.name !== 'slot';
	    }).map(function (attr) {
	      return '"' + attr.name + '"';
	    });
	    if (names.length) {
	      var plural = names.length > 1;
	      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + options.el.tagName.toLowerCase() + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment_Instance');
	    }
	  }
	
	  options._containerAttrs = options._replacerAttrs = null;
	  return function rootLinkFn(vm, el, scope) {
	    // link context scope dirs
	    var context = vm._context;
	    var contextDirs;
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el, null, scope);
	      }, context);
	    }
	
	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el);
	    }, vm);
	
	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
	  };
	}
	
	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */
	
	function compileNode(node, options) {
	  var type = node.nodeType;
	  if (type === 1 && node.tagName !== 'SCRIPT') {
	    return compileElement(node, options);
	  } else if (type === 3 && node.data.trim()) {
	    return compileTextNode(node, options);
	  } else {
	    return null;
	  }
	}
	
	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */
	
	function compileElement(el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as an attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    var tokens = parseText(el.value);
	    if (tokens) {
	      el.setAttribute(':value', tokensToExp(tokens));
	      el.value = '';
	    }
	  }
	  var linkFn;
	  var hasAttrs = el.hasAttributes();
	  // check terminal directives (for & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, options);
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options);
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options);
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(el.attributes, options);
	  }
	  return linkFn;
	}
	
	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */
	
	function compileTextNode(node, options) {
	  // skip marked text nodes
	  if (node._skip) {
	    return removeText;
	  }
	
	  var tokens = parseText(node.wholeText);
	  if (!tokens) {
	    return null;
	  }
	
	  // mark adjacent text nodes as skipped,
	  // because we are using node.wholeText to compile
	  // all adjacent text nodes together. This fixes
	  // issues in IE where sometimes it splits up a single
	  // text node into multiple ones.
	  var next = node.nextSibling;
	  while (next && next.nodeType === 3) {
	    next._skip = true;
	    next = next.nextSibling;
	  }
	
	  var frag = document.createDocumentFragment();
	  var el, token;
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i];
	    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
	    frag.appendChild(el);
	  }
	  return makeTextNodeLinkFn(tokens, frag, options);
	}
	
	/**
	 * Linker for an skipped text node.
	 *
	 * @param {Vue} vm
	 * @param {Text} node
	 */
	
	function removeText(vm, node) {
	  remove(node);
	}
	
	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */
	
	function processTextToken(token, options) {
	  var el;
	  if (token.oneTime) {
	    el = document.createTextNode(token.value);
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html');
	      setTokenType('html');
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ');
	      setTokenType('text');
	    }
	  }
	  function setTokenType(type) {
	    if (token.descriptor) return;
	    var parsed = parseDirective(token.value);
	    token.descriptor = {
	      name: type,
	      def: directives[type],
	      expression: parsed.expression,
	      filters: parsed.filters
	    };
	  }
	  return el;
	}
	
	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */
	
	function makeTextNodeLinkFn(tokens, frag) {
	  return function textNodeLinkFn(vm, el, host, scope) {
	    var fragClone = frag.cloneNode(true);
	    var childNodes = toArray(fragClone.childNodes);
	    var token, value, node;
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i];
	      value = token.value;
	      if (token.tag) {
	        node = childNodes[i];
	        if (token.oneTime) {
	          value = (scope || vm).$eval(value);
	          if (token.html) {
	            replace(node, parseTemplate(value, true));
	          } else {
	            node.data = value;
	          }
	        } else {
	          vm._bindDir(token.descriptor, node, host, scope);
	        }
	      }
	    }
	    replace(el, fragClone);
	  };
	}
	
	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */
	
	function compileNodeList(nodeList, options) {
	  var linkFns = [];
	  var nodeLinkFn, childLinkFn, node;
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i];
	    nodeLinkFn = compileNode(node, options);
	    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	    linkFns.push(nodeLinkFn, childLinkFn);
	  }
	  return linkFns.length ? makeChildLinkFn(linkFns) : null;
	}
	
	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */
	
	function makeChildLinkFn(linkFns) {
	  return function childLinkFn(vm, nodes, host, scope, frag) {
	    var node, nodeLinkFn, childrenLinkFn;
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n];
	      nodeLinkFn = linkFns[i++];
	      childrenLinkFn = linkFns[i++];
	      // cache childNodes before linking parent, fix #657
	      var childNodes = toArray(node.childNodes);
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host, scope, frag);
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host, scope, frag);
	      }
	    }
	  };
	}
	
	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */
	
	function checkElementDirectives(el, options) {
	  var tag = el.tagName.toLowerCase();
	  if (commonTagRE.test(tag)) {
	    return;
	  }
	  var def = resolveAsset(options, 'elementDirectives', tag);
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def);
	  }
	}
	
	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|undefined}
	 */
	
	function checkComponent(el, options) {
	  var component = checkComponentAttr(el, options);
	  if (component) {
	    var ref = findRef(el);
	    var descriptor = {
	      name: 'component',
	      ref: ref,
	      expression: component.id,
	      def: internalDirectives.component,
	      modifiers: {
	        literal: !component.dynamic
	      }
	    };
	    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
	      if (ref) {
	        defineReactive((scope || vm).$refs, ref, null);
	      }
	      vm._bindDir(descriptor, el, host, scope, frag);
	    };
	    componentLinkFn.terminal = true;
	    return componentLinkFn;
	  }
	}
	
	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */
	
	function checkTerminalDirectives(el, options) {
	  // skip v-pre
	  if (getAttr(el, 'v-pre') !== null) {
	    return skip;
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute('v-else')) {
	    var prev = el.previousElementSibling;
	    if (prev && prev.hasAttribute('v-if')) {
	      return skip;
	    }
	  }
	  var value, dirName;
	  for (var i = 0, l = terminalDirectives.length; i < l; i++) {
	    dirName = terminalDirectives[i];
	    value = el.getAttribute('v-' + dirName);
	    if (value != null) {
	      return makeTerminalNodeLinkFn(el, dirName, value, options);
	    }
	  }
	}
	
	function skip() {}
	skip.terminal = true;
	
	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} [def]
	 * @return {Function} terminalLinkFn
	 */
	
	function makeTerminalNodeLinkFn(el, dirName, value, options, def) {
	  var parsed = parseDirective(value);
	  var descriptor = {
	    name: dirName,
	    expression: parsed.expression,
	    filters: parsed.filters,
	    raw: value,
	    // either an element directive, or if/for
	    // #2366 or custom terminal directive
	    def: def || resolveAsset(options, 'directives', dirName)
	  };
	  // check ref for v-for and router-view
	  if (dirName === 'for' || dirName === 'router-view') {
	    descriptor.ref = findRef(el);
	  }
	  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
	    if (descriptor.ref) {
	      defineReactive((scope || vm).$refs, descriptor.ref, null);
	    }
	    vm._bindDir(descriptor, el, host, scope, frag);
	  };
	  fn.terminal = true;
	  return fn;
	}
	
	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */
	
	function compileDirectives(attrs, options) {
	  var i = attrs.length;
	  var dirs = [];
	  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched;
	  while (i--) {
	    attr = attrs[i];
	    name = rawName = attr.name;
	    value = rawValue = attr.value;
	    tokens = parseText(value);
	    // reset arg
	    arg = null;
	    // check modifiers
	    modifiers = parseModifiers(name);
	    name = name.replace(modifierRE, '');
	
	    // attribute interpolations
	    if (tokens) {
	      value = tokensToExp(tokens);
	      arg = name;
	      pushDir('bind', directives.bind, tokens);
	      // warn against mixing mustaches with v-bind
	      if (process.env.NODE_ENV !== 'production') {
	        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	          return attr.name === ':class' || attr.name === 'v-bind:class';
	        })) {
	          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.');
	        }
	      }
	    } else
	
	      // special attribute: transition
	      if (transitionRE.test(name)) {
	        modifiers.literal = !bindRE.test(name);
	        pushDir('transition', internalDirectives.transition);
	      } else
	
	        // event handlers
	        if (onRE.test(name)) {
	          arg = name.replace(onRE, '');
	          pushDir('on', directives.on);
	        } else
	
	          // attribute bindings
	          if (bindRE.test(name)) {
	            dirName = name.replace(bindRE, '');
	            if (dirName === 'style' || dirName === 'class') {
	              pushDir(dirName, internalDirectives[dirName]);
	            } else {
	              arg = dirName;
	              pushDir('bind', directives.bind);
	            }
	          } else
	
	            // normal directives
	            if (matched = name.match(dirAttrRE)) {
	              dirName = matched[1];
	              arg = matched[2];
	
	              // skip v-else (when used with v-show)
	              if (dirName === 'else') {
	                continue;
	              }
	
	              dirDef = resolveAsset(options, 'directives', dirName);
	
	              if (process.env.NODE_ENV !== 'production') {
	                assertAsset(dirDef, 'directive', dirName);
	              }
	
	              if (dirDef) {
	                pushDir(dirName, dirDef);
	              }
	            }
	  }
	
	  /**
	   * Push a directive.
	   *
	   * @param {String} dirName
	   * @param {Object|Function} def
	   * @param {Array} [interpTokens]
	   */
	
	  function pushDir(dirName, def, interpTokens) {
	    var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
	    var parsed = !hasOneTimeToken && parseDirective(value);
	    dirs.push({
	      name: dirName,
	      attr: rawName,
	      raw: rawValue,
	      def: def,
	      arg: arg,
	      modifiers: modifiers,
	      // conversion from interpolation strings with one-time token
	      // to expression is differed until directive bind time so that we
	      // have access to the actual vm context for one-time bindings.
	      expression: parsed && parsed.expression,
	      filters: parsed && parsed.filters,
	      interp: interpTokens,
	      hasOneTime: hasOneTimeToken
	    });
	  }
	
	  if (dirs.length) {
	    return makeNodeLinkFn(dirs);
	  }
	}
	
	/**
	 * Parse modifiers from directive attribute name.
	 *
	 * @param {String} name
	 * @return {Object}
	 */
	
	function parseModifiers(name) {
	  var res = Object.create(null);
	  var match = name.match(modifierRE);
	  if (match) {
	    var i = match.length;
	    while (i--) {
	      res[match[i].slice(1)] = true;
	    }
	  }
	  return res;
	}
	
	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */
	
	function makeNodeLinkFn(directives) {
	  return function nodeLinkFn(vm, el, host, scope, frag) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length;
	    while (i--) {
	      vm._bindDir(directives[i], el, host, scope, frag);
	    }
	  };
	}
	
	/**
	 * Check if an interpolation string contains one-time tokens.
	 *
	 * @param {Array} tokens
	 * @return {Boolean}
	 */
	
	function hasOneTime(tokens) {
	  var i = tokens.length;
	  while (i--) {
	    if (tokens[i].oneTime) return true;
	  }
	}
	
	var specialCharRE = /[^\w\-:\.]/;
	
	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-for.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */
	
	function transclude(el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el);
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (isTemplate(el)) {
	    el = parseTemplate(el);
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<slot></slot>';
	    }
	    if (options.template) {
	      options._content = extractContent(el);
	      el = transcludeTemplate(el, options);
	    }
	  }
	  if (isFragment(el)) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    prepend(createAnchor('v-start', true), el);
	    el.appendChild(createAnchor('v-end', true));
	  }
	  return el;
	}
	
	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */
	
	function transcludeTemplate(el, options) {
	  var template = options.template;
	  var frag = parseTemplate(template, true);
	  if (frag) {
	    var replacer = frag.firstChild;
	    var tag = replacer.tagName && replacer.tagName.toLowerCase();
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        process.env.NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	      // multi-children template
	      frag.childNodes.length > 1 ||
	      // non-element template
	      replacer.nodeType !== 1 ||
	      // single nested component
	      tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
	      // element directive
	      resolveAsset(options, 'elementDirectives', tag) ||
	      // for block
	      replacer.hasAttribute('v-for') ||
	      // if block
	      replacer.hasAttribute('v-if')) {
	        return frag;
	      } else {
	        options._replacerAttrs = extractAttrs(replacer);
	        mergeAttrs(el, replacer);
	        return replacer;
	      }
	    } else {
	      el.appendChild(frag);
	      return el;
	    }
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
	  }
	}
	
	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */
	
	function extractAttrs(el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return toArray(el.attributes);
	  }
	}
	
	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */
	
	function mergeAttrs(from, to) {
	  var attrs = from.attributes;
	  var i = attrs.length;
	  var name, value;
	  while (i--) {
	    name = attrs[i].name;
	    value = attrs[i].value;
	    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	      to.setAttribute(name, value);
	    } else if (name === 'class' && !parseText(value)) {
	      value.trim().split(/\s+/).forEach(function (cls) {
	        addClass(to, cls);
	      });
	    }
	  }
	}
	
	/**
	 * Scan and determine slot content distribution.
	 * We do this during transclusion instead at compile time so that
	 * the distribution is decoupled from the compilation order of
	 * the slots.
	 *
	 * @param {Element|DocumentFragment} template
	 * @param {Element} content
	 * @param {Vue} vm
	 */
	
	function resolveSlots(vm, content) {
	  if (!content) {
	    return;
	  }
	  var contents = vm._slotContents = Object.create(null);
	  var el, name;
	  for (var i = 0, l = content.children.length; i < l; i++) {
	    el = content.children[i];
	    /* eslint-disable no-cond-assign */
	    if (name = el.getAttribute('slot')) {
	      (contents[name] || (contents[name] = [])).push(el);
	    }
	    /* eslint-enable no-cond-assign */
	  }
	  for (name in contents) {
	    contents[name] = extractFragment(contents[name], content);
	  }
	  if (content.hasChildNodes()) {
	    contents['default'] = extractFragment(content.childNodes, content);
	  }
	}
	
	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @return {DocumentFragment}
	 */
	
	function extractFragment(nodes, parent) {
	  var frag = document.createDocumentFragment();
	  nodes = toArray(nodes);
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i];
	    if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
	      parent.removeChild(node);
	      node = parseTemplate(node);
	    }
	    frag.appendChild(node);
	  }
	  return frag;
	}
	
	
	
	var compiler = Object.freeze({
		compile: compile,
		compileAndLinkProps: compileAndLinkProps,
		compileRoot: compileRoot,
		terminalDirectives: terminalDirectives,
		transclude: transclude,
		resolveSlots: resolveSlots
	});
	
	function stateMixin (Vue) {
	  /**
	   * Accessor for `$data` property, since setting $data
	   * requires observing the new object and updating
	   * proxied properties.
	   */
	
	  Object.defineProperty(Vue.prototype, '$data', {
	    get: function get() {
	      return this._data;
	    },
	    set: function set(newData) {
	      if (newData !== this._data) {
	        this._setData(newData);
	      }
	    }
	  });
	
	  /**
	   * Setup the scope of an instance, which contains:
	   * - observed data
	   * - computed properties
	   * - user methods
	   * - meta properties
	   */
	
	  Vue.prototype._initState = function () {
	    this._initProps();
	    this._initMeta();
	    this._initMethods();
	    this._initData();
	    this._initComputed();
	  };
	
	  /**
	   * Initialize props.
	   */
	
	  Vue.prototype._initProps = function () {
	    var options = this.$options;
	    var el = options.el;
	    var props = options.props;
	    if (props && !el) {
	      process.env.NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.');
	    }
	    // make sure to convert string selectors into element now
	    el = options.el = query(el);
	    this._propsUnlinkFn = el && el.nodeType === 1 && props
	    // props must be linked in proper scope if inside v-for
	    ? compileAndLinkProps(this, el, props, this._scope) : null;
	  };
	
	  /**
	   * Initialize the data.
	   */
	
	  Vue.prototype._initData = function () {
	    var dataFn = this.$options.data;
	    var data = this._data = dataFn ? dataFn() : {};
	    var props = this._props;
	    var runtimeData = this._runtimeData ? typeof this._runtimeData === 'function' ? this._runtimeData() : this._runtimeData : null;
	    // proxy data on instance
	    var keys = Object.keys(data);
	    var i, key;
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      // there are two scenarios where we can proxy a data key:
	      // 1. it's not already defined as a prop
	      // 2. it's provided via a instantiation option AND there are no
	      //    template prop present
	      if (!props || !hasOwn(props, key) || runtimeData && hasOwn(runtimeData, key) && props[key].raw === null) {
	        this._proxy(key);
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('Data field "' + key + '" is already defined ' + 'as a prop. Use prop default value instead.');
	      }
	    }
	    // observe data
	    observe(data, this);
	  };
	
	  /**
	   * Swap the instance's $data. Called in $data's setter.
	   *
	   * @param {Object} newData
	   */
	
	  Vue.prototype._setData = function (newData) {
	    newData = newData || {};
	    var oldData = this._data;
	    this._data = newData;
	    var keys, key, i;
	    // unproxy keys not present in new data
	    keys = Object.keys(oldData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!(key in newData)) {
	        this._unproxy(key);
	      }
	    }
	    // proxy keys not already proxied,
	    // and trigger change for changed values
	    keys = Object.keys(newData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!hasOwn(this, key)) {
	        // new property
	        this._proxy(key);
	      }
	    }
	    oldData.__ob__.removeVm(this);
	    observe(newData, this);
	    this._digest();
	  };
	
	  /**
	   * Proxy a property, so that
	   * vm.prop === vm._data.prop
	   *
	   * @param {String} key
	   */
	
	  Vue.prototype._proxy = function (key) {
	    if (!isReserved(key)) {
	      // need to store ref to self here
	      // because these getter/setters might
	      // be called by child scopes via
	      // prototype inheritance.
	      var self = this;
	      Object.defineProperty(self, key, {
	        configurable: true,
	        enumerable: true,
	        get: function proxyGetter() {
	          return self._data[key];
	        },
	        set: function proxySetter(val) {
	          self._data[key] = val;
	        }
	      });
	    }
	  };
	
	  /**
	   * Unproxy a property.
	   *
	   * @param {String} key
	   */
	
	  Vue.prototype._unproxy = function (key) {
	    if (!isReserved(key)) {
	      delete this[key];
	    }
	  };
	
	  /**
	   * Force update on every watcher in scope.
	   */
	
	  Vue.prototype._digest = function () {
	    for (var i = 0, l = this._watchers.length; i < l; i++) {
	      this._watchers[i].update(true); // shallow updates
	    }
	  };
	
	  /**
	   * Setup computed properties. They are essentially
	   * special getter/setters
	   */
	
	  function noop() {}
	  Vue.prototype._initComputed = function () {
	    var computed = this.$options.computed;
	    if (computed) {
	      for (var key in computed) {
	        var userDef = computed[key];
	        var def = {
	          enumerable: true,
	          configurable: true
	        };
	        if (typeof userDef === 'function') {
	          def.get = makeComputedGetter(userDef, this);
	          def.set = noop;
	        } else {
	          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind(userDef.get, this) : noop;
	          def.set = userDef.set ? bind(userDef.set, this) : noop;
	        }
	        Object.defineProperty(this, key, def);
	      }
	    }
	  };
	
	  function makeComputedGetter(getter, owner) {
	    var watcher = new Watcher(owner, getter, null, {
	      lazy: true
	    });
	    return function computedGetter() {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value;
	    };
	  }
	
	  /**
	   * Setup instance methods. Methods must be bound to the
	   * instance since they might be passed down as a prop to
	   * child components.
	   */
	
	  Vue.prototype._initMethods = function () {
	    var methods = this.$options.methods;
	    if (methods) {
	      for (var key in methods) {
	        this[key] = bind(methods[key], this);
	      }
	    }
	  };
	
	  /**
	   * Initialize meta information like $index, $key & $value.
	   */
	
	  Vue.prototype._initMeta = function () {
	    var metas = this.$options._meta;
	    if (metas) {
	      for (var key in metas) {
	        defineReactive(this, key, metas[key]);
	      }
	    }
	  };
	}
	
	var eventRE = /^v-on:|^@/;
	
	function eventsMixin (Vue) {
	  /**
	   * Setup the instance's option events & watchers.
	   * If the value is a string, we pull it from the
	   * instance's methods by name.
	   */
	
	  Vue.prototype._initEvents = function () {
	    var options = this.$options;
	    if (options._asComponent) {
	      registerComponentEvents(this, options.el);
	    }
	    registerCallbacks(this, '$on', options.events);
	    registerCallbacks(this, '$watch', options.watch);
	  };
	
	  /**
	   * Register v-on events on a child component
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   */
	
	  function registerComponentEvents(vm, el) {
	    var attrs = el.attributes;
	    var name, handler;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      name = attrs[i].name;
	      if (eventRE.test(name)) {
	        name = name.replace(eventRE, '');
	        handler = (vm._scope || vm._context).$eval(attrs[i].value, true);
	        if (typeof handler === 'function') {
	          handler._fromParent = true;
	          vm.$on(name.replace(eventRE), handler);
	        } else if (process.env.NODE_ENV !== 'production') {
	          warn('v-on:' + name + '="' + attrs[i].value + '"' + (vm.$options.name ? ' on component <' + vm.$options.name + '>' : '') + ' expects a function value, got ' + handler);
	        }
	      }
	    }
	  }
	
	  /**
	   * Register callbacks for option events and watchers.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {Object} hash
	   */
	
	  function registerCallbacks(vm, action, hash) {
	    if (!hash) return;
	    var handlers, key, i, j;
	    for (key in hash) {
	      handlers = hash[key];
	      if (isArray(handlers)) {
	        for (i = 0, j = handlers.length; i < j; i++) {
	          register(vm, action, key, handlers[i]);
	        }
	      } else {
	        register(vm, action, key, handlers);
	      }
	    }
	  }
	
	  /**
	   * Helper to register an event/watch callback.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {String} key
	   * @param {Function|String|Object} handler
	   * @param {Object} [options]
	   */
	
	  function register(vm, action, key, handler, options) {
	    var type = typeof handler;
	    if (type === 'function') {
	      vm[action](key, handler, options);
	    } else if (type === 'string') {
	      var methods = vm.$options.methods;
	      var method = methods && methods[handler];
	      if (method) {
	        vm[action](key, method, options);
	      } else {
	        process.env.NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".');
	      }
	    } else if (handler && type === 'object') {
	      register(vm, action, key, handler.handler, handler);
	    }
	  }
	
	  /**
	   * Setup recursive attached/detached calls
	   */
	
	  Vue.prototype._initDOMHooks = function () {
	    this.$on('hook:attached', onAttached);
	    this.$on('hook:detached', onDetached);
	  };
	
	  /**
	   * Callback to recursively call attached hook on children
	   */
	
	  function onAttached() {
	    if (!this._isAttached) {
	      this._isAttached = true;
	      this.$children.forEach(callAttach);
	    }
	  }
	
	  /**
	   * Iterator to call attached hook
	   *
	   * @param {Vue} child
	   */
	
	  function callAttach(child) {
	    if (!child._isAttached && inDoc(child.$el)) {
	      child._callHook('attached');
	    }
	  }
	
	  /**
	   * Callback to recursively call detached hook on children
	   */
	
	  function onDetached() {
	    if (this._isAttached) {
	      this._isAttached = false;
	      this.$children.forEach(callDetach);
	    }
	  }
	
	  /**
	   * Iterator to call detached hook
	   *
	   * @param {Vue} child
	   */
	
	  function callDetach(child) {
	    if (child._isAttached && !inDoc(child.$el)) {
	      child._callHook('detached');
	    }
	  }
	
	  /**
	   * Trigger all handlers for a hook
	   *
	   * @param {String} hook
	   */
	
	  Vue.prototype._callHook = function (hook) {
	    this.$emit('pre-hook:' + hook);
	    var handlers = this.$options[hook];
	    if (handlers) {
	      for (var i = 0, j = handlers.length; i < j; i++) {
	        handlers[i].call(this);
	      }
	    }
	    this.$emit('hook:' + hook);
	  };
	}
	
	function noop() {}
	
	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {String} name
	 * @param {Node} el
	 * @param {Vue} vm
	 * @param {Object} descriptor
	 *                 - {String} name
	 *                 - {Object} def
	 *                 - {String} expression
	 *                 - {Array<Object>} [filters]
	 *                 - {Boolean} literal
	 *                 - {String} attr
	 *                 - {String} raw
	 * @param {Object} def - directive definition object
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */
	function Directive(descriptor, vm, el, host, scope, frag) {
	  this.vm = vm;
	  this.el = el;
	  // copy descriptor properties
	  this.descriptor = descriptor;
	  this.name = descriptor.name;
	  this.expression = descriptor.expression;
	  this.arg = descriptor.arg;
	  this.modifiers = descriptor.modifiers;
	  this.filters = descriptor.filters;
	  this.literal = this.modifiers && this.modifiers.literal;
	  // private
	  this._locked = false;
	  this._bound = false;
	  this._listeners = null;
	  // link context
	  this._host = host;
	  this._scope = scope;
	  this._frag = frag;
	  // store directives on node in dev mode
	  if (process.env.NODE_ENV !== 'production' && this.el) {
	    this.el._vue_directives = this.el._vue_directives || [];
	    this.el._vue_directives.push(this);
	  }
	}
	
	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 *
	 * @param {Object} def
	 */
	
	Directive.prototype._bind = function () {
	  var name = this.name;
	  var descriptor = this.descriptor;
	
	  // remove attribute
	  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
	    var attr = descriptor.attr || 'v-' + name;
	    this.el.removeAttribute(attr);
	  }
	
	  // copy def properties
	  var def = descriptor.def;
	  if (typeof def === 'function') {
	    this.update = def;
	  } else {
	    extend(this, def);
	  }
	
	  // setup directive params
	  this._setupParams();
	
	  // initial bind
	  if (this.bind) {
	    this.bind();
	  }
	  this._bound = true;
	
	  if (this.literal) {
	    this.update && this.update(descriptor.raw);
	  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
	    // wrapped updater for context
	    var dir = this;
	    if (this.update) {
	      this._update = function (val, oldVal) {
	        if (!dir._locked) {
	          dir.update(val, oldVal);
	        }
	      };
	    } else {
	      this._update = noop;
	    }
	    var preProcess = this._preProcess ? bind(this._preProcess, this) : null;
	    var postProcess = this._postProcess ? bind(this._postProcess, this) : null;
	    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
	    {
	      filters: this.filters,
	      twoWay: this.twoWay,
	      deep: this.deep,
	      preProcess: preProcess,
	      postProcess: postProcess,
	      scope: this._scope
	    });
	    // v-model with inital inline value need to sync back to
	    // model instead of update to DOM on init. They would
	    // set the afterBind hook to indicate that.
	    if (this.afterBind) {
	      this.afterBind();
	    } else if (this.update) {
	      this.update(watcher.value);
	    }
	  }
	};
	
	/**
	 * Setup all param attributes, e.g. track-by,
	 * transition-mode, etc...
	 */
	
	Directive.prototype._setupParams = function () {
	  if (!this.params) {
	    return;
	  }
	  var params = this.params;
	  // swap the params array with a fresh object.
	  this.params = Object.create(null);
	  var i = params.length;
	  var key, val, mappedKey;
	  while (i--) {
	    key = params[i];
	    mappedKey = camelize(key);
	    val = getBindAttr(this.el, key);
	    if (val != null) {
	      // dynamic
	      this._setupParamWatcher(mappedKey, val);
	    } else {
	      // static
	      val = getAttr(this.el, key);
	      if (val != null) {
	        this.params[mappedKey] = val === '' ? true : val;
	      }
	    }
	  }
	};
	
	/**
	 * Setup a watcher for a dynamic param.
	 *
	 * @param {String} key
	 * @param {String} expression
	 */
	
	Directive.prototype._setupParamWatcher = function (key, expression) {
	  var self = this;
	  var called = false;
	  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	    self.params[key] = val;
	    // since we are in immediate mode,
	    // only call the param change callbacks if this is not the first update.
	    if (called) {
	      var cb = self.paramWatchers && self.paramWatchers[key];
	      if (cb) {
	        cb.call(self, val, oldVal);
	      }
	    } else {
	      called = true;
	    }
	  }, {
	    immediate: true,
	    user: false
	  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
	};
	
	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. on-click="a++"
	 *
	 * @return {Boolean}
	 */
	
	Directive.prototype._checkStatement = function () {
	  var expression = this.expression;
	  if (expression && this.acceptStatement && !isSimplePath(expression)) {
	    var fn = parseExpression(expression).get;
	    var scope = this._scope || this.vm;
	    var handler = function handler(e) {
	      scope.$event = e;
	      fn.call(scope, scope);
	      scope.$event = null;
	    };
	    if (this.filters) {
	      handler = scope._applyFilters(handler, null, this.filters);
	    }
	    this.update(handler);
	    return true;
	  }
	};
	
	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */
	
	Directive.prototype.set = function (value) {
	  /* istanbul ignore else */
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value);
	    });
	  } else if (process.env.NODE_ENV !== 'production') {
	    warn('Directive.set() can only be used inside twoWay' + 'directives.');
	  }
	};
	
	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */
	
	Directive.prototype._withLock = function (fn) {
	  var self = this;
	  self._locked = true;
	  fn.call(self);
	  nextTick(function () {
	    self._locked = false;
	  });
	};
	
	/**
	 * Convenience method that attaches a DOM event listener
	 * to the directive element and autometically tears it down
	 * during unbind.
	 *
	 * @param {String} event
	 * @param {Function} handler
	 * @param {Boolean} [useCapture]
	 */
	
	Directive.prototype.on = function (event, handler, useCapture) {
	  on(this.el, event, handler, useCapture);(this._listeners || (this._listeners = [])).push([event, handler]);
	};
	
	/**
	 * Teardown the watcher and call unbind.
	 */
	
	Directive.prototype._teardown = function () {
	  if (this._bound) {
	    this._bound = false;
	    if (this.unbind) {
	      this.unbind();
	    }
	    if (this._watcher) {
	      this._watcher.teardown();
	    }
	    var listeners = this._listeners;
	    var i;
	    if (listeners) {
	      i = listeners.length;
	      while (i--) {
	        off(this.el, listeners[i][0], listeners[i][1]);
	      }
	    }
	    var unwatchFns = this._paramUnwatchFns;
	    if (unwatchFns) {
	      i = unwatchFns.length;
	      while (i--) {
	        unwatchFns[i]();
	      }
	    }
	    if (process.env.NODE_ENV !== 'production' && this.el) {
	      this.el._vue_directives.$remove(this);
	    }
	    this.vm = this.el = this._watcher = this._listeners = null;
	  }
	};
	
	function lifecycleMixin (Vue) {
	  /**
	   * Update v-ref for component.
	   *
	   * @param {Boolean} remove
	   */
	
	  Vue.prototype._updateRef = function (remove) {
	    var ref = this.$options._ref;
	    if (ref) {
	      var refs = (this._scope || this._context).$refs;
	      if (remove) {
	        if (refs[ref] === this) {
	          refs[ref] = null;
	        }
	      } else {
	        refs[ref] = this;
	      }
	    }
	  };
	
	  /**
	   * Transclude, compile and link element.
	   *
	   * If a pre-compiled linker is available, that means the
	   * passed in element will be pre-transcluded and compiled
	   * as well - all we need to do is to call the linker.
	   *
	   * Otherwise we need to call transclude/compile/link here.
	   *
	   * @param {Element} el
	   */
	
	  Vue.prototype._compile = function (el) {
	    var options = this.$options;
	
	    // transclude and init element
	    // transclude can potentially replace original
	    // so we need to keep reference; this step also injects
	    // the template and caches the original attributes
	    // on the container node and replacer node.
	    var original = el;
	    el = transclude(el, options);
	    this._initElement(el);
	
	    // handle v-pre on root node (#2026)
	    if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
	      return;
	    }
	
	    // root is always compiled per-instance, because
	    // container attrs and props can be different every time.
	    var contextOptions = this._context && this._context.$options;
	    var rootLinker = compileRoot(el, options, contextOptions);
	
	    // resolve slot distribution
	    resolveSlots(this, options._content);
	
	    // compile and link the rest
	    var contentLinkFn;
	    var ctor = this.constructor;
	    // component compilation can be cached
	    // as long as it's not using inline-template
	    if (options._linkerCachable) {
	      contentLinkFn = ctor.linker;
	      if (!contentLinkFn) {
	        contentLinkFn = ctor.linker = compile(el, options);
	      }
	    }
	
	    // link phase
	    // make sure to link root with prop scope!
	    var rootUnlinkFn = rootLinker(this, el, this._scope);
	    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);
	
	    // register composite unlink function
	    // to be called during instance destruction
	    this._unlinkFn = function () {
	      rootUnlinkFn();
	      // passing destroying: true to avoid searching and
	      // splicing the directives
	      contentUnlinkFn(true);
	    };
	
	    // finally replace original
	    if (options.replace) {
	      replace(original, el);
	    }
	
	    this._isCompiled = true;
	    this._callHook('compiled');
	  };
	
	  /**
	   * Initialize instance element. Called in the public
	   * $mount() method.
	   *
	   * @param {Element} el
	   */
	
	  Vue.prototype._initElement = function (el) {
	    if (isFragment(el)) {
	      this._isFragment = true;
	      this.$el = this._fragmentStart = el.firstChild;
	      this._fragmentEnd = el.lastChild;
	      // set persisted text anchors to empty
	      if (this._fragmentStart.nodeType === 3) {
	        this._fragmentStart.data = this._fragmentEnd.data = '';
	      }
	      this._fragment = el;
	    } else {
	      this.$el = el;
	    }
	    this.$el.__vue__ = this;
	    this._callHook('beforeCompile');
	  };
	
	  /**
	   * Create and bind a directive to an element.
	   *
	   * @param {String} name - directive name
	   * @param {Node} node   - target node
	   * @param {Object} desc - parsed directive descriptor
	   * @param {Object} def  - directive definition object
	   * @param {Vue} [host] - transclusion host component
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - owner fragment
	   */
	
	  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
	    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
	  };
	
	  /**
	   * Teardown an instance, unobserves the data, unbind all the
	   * directives, turn off all the event listeners, etc.
	   *
	   * @param {Boolean} remove - whether to remove the DOM node.
	   * @param {Boolean} deferCleanup - if true, defer cleanup to
	   *                                 be called later
	   */
	
	  Vue.prototype._destroy = function (remove, deferCleanup) {
	    if (this._isBeingDestroyed) {
	      if (!deferCleanup) {
	        this._cleanup();
	      }
	      return;
	    }
	
	    var destroyReady;
	    var pendingRemoval;
	
	    var self = this;
	    // Cleanup should be called either synchronously or asynchronoysly as
	    // callback of this.$remove(), or if remove and deferCleanup are false.
	    // In any case it should be called after all other removing, unbinding and
	    // turning of is done
	    var cleanupIfPossible = function cleanupIfPossible() {
	      if (destroyReady && !pendingRemoval && !deferCleanup) {
	        self._cleanup();
	      }
	    };
	
	    // remove DOM element
	    if (remove && this.$el) {
	      pendingRemoval = true;
	      this.$remove(function () {
	        pendingRemoval = false;
	        cleanupIfPossible();
	      });
	    }
	
	    this._callHook('beforeDestroy');
	    this._isBeingDestroyed = true;
	    var i;
	    // remove self from parent. only necessary
	    // if parent is not being destroyed as well.
	    var parent = this.$parent;
	    if (parent && !parent._isBeingDestroyed) {
	      parent.$children.$remove(this);
	      // unregister ref (remove: true)
	      this._updateRef(true);
	    }
	    // destroy all children.
	    i = this.$children.length;
	    while (i--) {
	      this.$children[i].$destroy();
	    }
	    // teardown props
	    if (this._propsUnlinkFn) {
	      this._propsUnlinkFn();
	    }
	    // teardown all directives. this also tearsdown all
	    // directive-owned watchers.
	    if (this._unlinkFn) {
	      this._unlinkFn();
	    }
	    i = this._watchers.length;
	    while (i--) {
	      this._watchers[i].teardown();
	    }
	    // remove reference to self on $el
	    if (this.$el) {
	      this.$el.__vue__ = null;
	    }
	
	    destroyReady = true;
	    cleanupIfPossible();
	  };
	
	  /**
	   * Clean up to ensure garbage collection.
	   * This is called after the leave transition if there
	   * is any.
	   */
	
	  Vue.prototype._cleanup = function () {
	    if (this._isDestroyed) {
	      return;
	    }
	    // remove self from owner fragment
	    // do it in cleanup so that we can call $destroy with
	    // defer right when a fragment is about to be removed.
	    if (this._frag) {
	      this._frag.children.$remove(this);
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (this._data.__ob__) {
	      this._data.__ob__.removeVm(this);
	    }
	    // Clean up references to private properties and other
	    // instances. preserve reference to _data so that proxy
	    // accessors still work. The only potential side effect
	    // here is that mutating the instance after it's destroyed
	    // may affect the state of other components that are still
	    // observing the same object, but that seems to be a
	    // reasonable responsibility for the user rather than
	    // always throwing an error on them.
	    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
	    // call the last hook...
	    this._isDestroyed = true;
	    this._callHook('destroyed');
	    // turn off all instance listeners.
	    this.$off();
	  };
	}
	
	function miscMixin (Vue) {
	  /**
	   * Apply a list of filter (descriptors) to a value.
	   * Using plain for loops here because this will be called in
	   * the getter of any watcher with filters so it is very
	   * performance sensitive.
	   *
	   * @param {*} value
	   * @param {*} [oldValue]
	   * @param {Array} filters
	   * @param {Boolean} write
	   * @return {*}
	   */
	
	  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
	    var filter, fn, args, arg, offset, i, l, j, k;
	    for (i = 0, l = filters.length; i < l; i++) {
	      filter = filters[i];
	      fn = resolveAsset(this.$options, 'filters', filter.name);
	      if (process.env.NODE_ENV !== 'production') {
	        assertAsset(fn, 'filter', filter.name);
	      }
	      if (!fn) continue;
	      fn = write ? fn.write : fn.read || fn;
	      if (typeof fn !== 'function') continue;
	      args = write ? [value, oldValue] : [value];
	      offset = write ? 2 : 1;
	      if (filter.args) {
	        for (j = 0, k = filter.args.length; j < k; j++) {
	          arg = filter.args[j];
	          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
	        }
	      }
	      value = fn.apply(this, args);
	    }
	    return value;
	  };
	
	  /**
	   * Resolve a component, depending on whether the component
	   * is defined normally or using an async factory function.
	   * Resolves synchronously if already resolved, otherwise
	   * resolves asynchronously and caches the resolved
	   * constructor on the factory.
	   *
	   * @param {String} id
	   * @param {Function} cb
	   */
	
	  Vue.prototype._resolveComponent = function (id, cb) {
	    var factory = resolveAsset(this.$options, 'components', id);
	    if (process.env.NODE_ENV !== 'production') {
	      assertAsset(factory, 'component', id);
	    }
	    if (!factory) {
	      return;
	    }
	    // async component factory
	    if (!factory.options) {
	      if (factory.resolved) {
	        // cached
	        cb(factory.resolved);
	      } else if (factory.requested) {
	        // pool callbacks
	        factory.pendingCallbacks.push(cb);
	      } else {
	        factory.requested = true;
	        var cbs = factory.pendingCallbacks = [cb];
	        factory.call(this, function resolve(res) {
	          if (isPlainObject(res)) {
	            res = Vue.extend(res);
	          }
	          // cache resolved
	          factory.resolved = res;
	          // invoke callbacks
	          for (var i = 0, l = cbs.length; i < l; i++) {
	            cbs[i](res);
	          }
	        }, function reject(reason) {
	          process.env.NODE_ENV !== 'production' && warn('Failed to resolve async component: ' + id + '. ' + (reason ? '\nReason: ' + reason : ''));
	        });
	      }
	    } else {
	      // normal component
	      cb(factory);
	    }
	  };
	}
	
	var filterRE$1 = /[^|]\|[^|]/;
	
	function dataAPI (Vue) {
	  /**
	   * Get the value from an expression on this vm.
	   *
	   * @param {String} exp
	   * @param {Boolean} [asStatement]
	   * @return {*}
	   */
	
	  Vue.prototype.$get = function (exp, asStatement) {
	    var res = parseExpression(exp);
	    if (res) {
	      if (asStatement && !isSimplePath(exp)) {
	        var self = this;
	        return function statementHandler() {
	          self.$arguments = toArray(arguments);
	          var result = res.get.call(self, self);
	          self.$arguments = null;
	          return result;
	        };
	      } else {
	        try {
	          return res.get.call(this, this);
	        } catch (e) {}
	      }
	    }
	  };
	
	  /**
	   * Set the value from an expression on this vm.
	   * The expression must be a valid left-hand
	   * expression in an assignment.
	   *
	   * @param {String} exp
	   * @param {*} val
	   */
	
	  Vue.prototype.$set = function (exp, val) {
	    var res = parseExpression(exp, true);
	    if (res && res.set) {
	      res.set.call(this, this, val);
	    }
	  };
	
	  /**
	   * Delete a property on the VM
	   *
	   * @param {String} key
	   */
	
	  Vue.prototype.$delete = function (key) {
	    del(this._data, key);
	  };
	
	  /**
	   * Watch an expression, trigger callback when its
	   * value changes.
	   *
	   * @param {String|Function} expOrFn
	   * @param {Function} cb
	   * @param {Object} [options]
	   *                 - {Boolean} deep
	   *                 - {Boolean} immediate
	   * @return {Function} - unwatchFn
	   */
	
	  Vue.prototype.$watch = function (expOrFn, cb, options) {
	    var vm = this;
	    var parsed;
	    if (typeof expOrFn === 'string') {
	      parsed = parseDirective(expOrFn);
	      expOrFn = parsed.expression;
	    }
	    var watcher = new Watcher(vm, expOrFn, cb, {
	      deep: options && options.deep,
	      sync: options && options.sync,
	      filters: parsed && parsed.filters,
	      user: !options || options.user !== false
	    });
	    if (options && options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn() {
	      watcher.teardown();
	    };
	  };
	
	  /**
	   * Evaluate a text directive, including filters.
	   *
	   * @param {String} text
	   * @param {Boolean} [asStatement]
	   * @return {String}
	   */
	
	  Vue.prototype.$eval = function (text, asStatement) {
	    // check for filters.
	    if (filterRE$1.test(text)) {
	      var dir = parseDirective(text);
	      // the filter regex check might give false positive
	      // for pipes inside strings, so it's possible that
	      // we don't get any filters here
	      var val = this.$get(dir.expression, asStatement);
	      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
	    } else {
	      // no filter
	      return this.$get(text, asStatement);
	    }
	  };
	
	  /**
	   * Interpolate a piece of template text.
	   *
	   * @param {String} text
	   * @return {String}
	   */
	
	  Vue.prototype.$interpolate = function (text) {
	    var tokens = parseText(text);
	    var vm = this;
	    if (tokens) {
	      if (tokens.length === 1) {
	        return vm.$eval(tokens[0].value) + '';
	      } else {
	        return tokens.map(function (token) {
	          return token.tag ? vm.$eval(token.value) : token.value;
	        }).join('');
	      }
	    } else {
	      return text;
	    }
	  };
	
	  /**
	   * Log instance data as a plain JS object
	   * so that it is easier to inspect in console.
	   * This method assumes console is available.
	   *
	   * @param {String} [path]
	   */
	
	  Vue.prototype.$log = function (path) {
	    var data = path ? getPath(this._data, path) : this._data;
	    if (data) {
	      data = clean(data);
	    }
	    // include computed fields
	    if (!path) {
	      var key;
	      for (key in this.$options.computed) {
	        data[key] = clean(this[key]);
	      }
	      if (this._props) {
	        for (key in this._props) {
	          data[key] = clean(this[key]);
	        }
	      }
	    }
	    console.log(data);
	  };
	
	  /**
	   * "clean" a getter/setter converted object into a plain
	   * object copy.
	   *
	   * @param {Object} - obj
	   * @return {Object}
	   */
	
	  function clean(obj) {
	    return JSON.parse(JSON.stringify(obj));
	  }
	}
	
	function domAPI (Vue) {
	  /**
	   * Convenience on-instance nextTick. The callback is
	   * auto-bound to the instance, and this avoids component
	   * modules having to rely on the global Vue.
	   *
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this);
	  };
	
	  /**
	   * Append instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$appendTo = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, append, appendWithTransition);
	  };
	
	  /**
	   * Prepend instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$prependTo = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.hasChildNodes()) {
	      this.$before(target.firstChild, cb, withTransition);
	    } else {
	      this.$appendTo(target, cb, withTransition);
	    }
	    return this;
	  };
	
	  /**
	   * Insert instance before target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$before = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
	  };
	
	  /**
	   * Insert instance after target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$after = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.nextSibling) {
	      this.$before(target.nextSibling, cb, withTransition);
	    } else {
	      this.$appendTo(target.parentNode, cb, withTransition);
	    }
	    return this;
	  };
	
	  /**
	   * Remove instance from DOM
	   *
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$remove = function (cb, withTransition) {
	    if (!this.$el.parentNode) {
	      return cb && cb();
	    }
	    var inDocument = this._isAttached && inDoc(this.$el);
	    // if we are not in document, no need to check
	    // for transitions
	    if (!inDocument) withTransition = false;
	    var self = this;
	    var realCb = function realCb() {
	      if (inDocument) self._callHook('detached');
	      if (cb) cb();
	    };
	    if (this._isFragment) {
	      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
	    } else {
	      var op = withTransition === false ? removeWithCb : removeWithTransition;
	      op(this.$el, this, realCb);
	    }
	    return this;
	  };
	
	  /**
	   * Shared DOM insertion function.
	   *
	   * @param {Vue} vm
	   * @param {Element} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition]
	   * @param {Function} op1 - op for non-transition insert
	   * @param {Function} op2 - op for transition insert
	   * @return vm
	   */
	
	  function insert(vm, target, cb, withTransition, op1, op2) {
	    target = query(target);
	    var targetIsDetached = !inDoc(target);
	    var op = withTransition === false || targetIsDetached ? op1 : op2;
	    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
	    if (vm._isFragment) {
	      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	        op(node, target, vm);
	      });
	      cb && cb();
	    } else {
	      op(vm.$el, target, vm, cb);
	    }
	    if (shouldCallHook) {
	      vm._callHook('attached');
	    }
	    return vm;
	  }
	
	  /**
	   * Check for selectors
	   *
	   * @param {String|Element} el
	   */
	
	  function query(el) {
	    return typeof el === 'string' ? document.querySelector(el) : el;
	  }
	
	  /**
	   * Append operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */
	
	  function append(el, target, vm, cb) {
	    target.appendChild(el);
	    if (cb) cb();
	  }
	
	  /**
	   * InsertBefore operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */
	
	  function beforeWithCb(el, target, vm, cb) {
	    before(el, target);
	    if (cb) cb();
	  }
	
	  /**
	   * Remove operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */
	
	  function removeWithCb(el, vm, cb) {
	    remove(el);
	    if (cb) cb();
	  }
	}
	
	function eventsAPI (Vue) {
	  /**
	   * Listen on the given `event` with `fn`.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$on = function (event, fn) {
	    (this._events[event] || (this._events[event] = [])).push(fn);
	    modifyListenerCount(this, event, 1);
	    return this;
	  };
	
	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$once = function (event, fn) {
	    var self = this;
	    function on() {
	      self.$off(event, on);
	      fn.apply(this, arguments);
	    }
	    on.fn = fn;
	    this.$on(event, on);
	    return this;
	  };
	
	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$off = function (event, fn) {
	    var cbs;
	    // all
	    if (!arguments.length) {
	      if (this.$parent) {
	        for (event in this._events) {
	          cbs = this._events[event];
	          if (cbs) {
	            modifyListenerCount(this, event, -cbs.length);
	          }
	        }
	      }
	      this._events = {};
	      return this;
	    }
	    // specific event
	    cbs = this._events[event];
	    if (!cbs) {
	      return this;
	    }
	    if (arguments.length === 1) {
	      modifyListenerCount(this, event, -cbs.length);
	      this._events[event] = null;
	      return this;
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        modifyListenerCount(this, event, -1);
	        cbs.splice(i, 1);
	        break;
	      }
	    }
	    return this;
	  };
	
	  /**
	   * Trigger an event on self.
	   *
	   * @param {String|Object} event
	   * @return {Boolean} shouldPropagate
	   */
	
	  Vue.prototype.$emit = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    var cbs = this._events[event];
	    var shouldPropagate = isSource || !cbs;
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      // this is a somewhat hacky solution to the question raised
	      // in #2102: for an inline component listener like <comp @test="doThis">,
	      // the propagation handling is somewhat broken. Therefore we
	      // need to treat these inline callbacks differently.
	      var hasParentCbs = isSource && cbs.some(function (cb) {
	        return cb._fromParent;
	      });
	      if (hasParentCbs) {
	        shouldPropagate = false;
	      }
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        var cb = cbs[i];
	        var res = cb.apply(this, args);
	        if (res === true && (!hasParentCbs || cb._fromParent)) {
	          shouldPropagate = true;
	        }
	      }
	    }
	    return shouldPropagate;
	  };
	
	  /**
	   * Recursively broadcast an event to all children instances.
	   *
	   * @param {String|Object} event
	   * @param {...*} additional arguments
	   */
	
	  Vue.prototype.$broadcast = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    // if no child has registered for this event,
	    // then there's no need to broadcast.
	    if (!this._eventsCount[event]) return;
	    var children = this.$children;
	    var args = toArray(arguments);
	    if (isSource) {
	      // use object event to indicate non-source emit
	      // on children
	      args[0] = { name: event, source: this };
	    }
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i];
	      var shouldPropagate = child.$emit.apply(child, args);
	      if (shouldPropagate) {
	        child.$broadcast.apply(child, args);
	      }
	    }
	    return this;
	  };
	
	  /**
	   * Recursively propagate an event up the parent chain.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */
	
	  Vue.prototype.$dispatch = function (event) {
	    var shouldPropagate = this.$emit.apply(this, arguments);
	    if (!shouldPropagate) return;
	    var parent = this.$parent;
	    var args = toArray(arguments);
	    // use object event to indicate non-source emit
	    // on parents
	    args[0] = { name: event, source: this };
	    while (parent) {
	      shouldPropagate = parent.$emit.apply(parent, args);
	      parent = shouldPropagate ? parent.$parent : null;
	    }
	    return this;
	  };
	
	  /**
	   * Modify the listener counts on all parents.
	   * This bookkeeping allows $broadcast to return early when
	   * no child has listened to a certain event.
	   *
	   * @param {Vue} vm
	   * @param {String} event
	   * @param {Number} count
	   */
	
	  var hookRE = /^hook:/;
	  function modifyListenerCount(vm, event, count) {
	    var parent = vm.$parent;
	    // hooks do not get broadcasted so no need
	    // to do bookkeeping for them
	    if (!parent || !count || hookRE.test(event)) return;
	    while (parent) {
	      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
	      parent = parent.$parent;
	    }
	  }
	}
	
	function lifecycleAPI (Vue) {
	  /**
	   * Set instance target element and kick off the compilation
	   * process. The passed in `el` can be a selector string, an
	   * existing Element, or a DocumentFragment (for block
	   * instances).
	   *
	   * @param {Element|DocumentFragment|string} el
	   * @public
	   */
	
	  Vue.prototype.$mount = function (el) {
	    if (this._isCompiled) {
	      process.env.NODE_ENV !== 'production' && warn('$mount() should be called only once.');
	      return;
	    }
	    el = query(el);
	    if (!el) {
	      el = document.createElement('div');
	    }
	    this._compile(el);
	    this._initDOMHooks();
	    if (inDoc(this.$el)) {
	      this._callHook('attached');
	      ready.call(this);
	    } else {
	      this.$once('hook:attached', ready);
	    }
	    return this;
	  };
	
	  /**
	   * Mark an instance as ready.
	   */
	
	  function ready() {
	    this._isAttached = true;
	    this._isReady = true;
	    this._callHook('ready');
	  }
	
	  /**
	   * Teardown the instance, simply delegate to the internal
	   * _destroy.
	   */
	
	  Vue.prototype.$destroy = function (remove, deferCleanup) {
	    this._destroy(remove, deferCleanup);
	  };
	
	  /**
	   * Partially compile a piece of DOM and return a
	   * decompile function.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host]
	   * @return {Function}
	   */
	
	  Vue.prototype.$compile = function (el, host, scope, frag) {
	    return compile(el, this.$options, true)(this, el, host, scope, frag);
	  };
	}
	
	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefixed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */
	
	function Vue(options) {
	  this._init(options);
	}
	
	// install internals
	initMixin(Vue);
	stateMixin(Vue);
	eventsMixin(Vue);
	lifecycleMixin(Vue);
	miscMixin(Vue);
	
	// install instance APIs
	dataAPI(Vue);
	domAPI(Vue);
	eventsAPI(Vue);
	lifecycleAPI(Vue);
	
	var slot = {
	
	  priority: SLOT,
	  params: ['name'],
	
	  bind: function bind() {
	    // this was resolved during component transclusion
	    var name = this.params.name || 'default';
	    var content = this.vm._slotContents && this.vm._slotContents[name];
	    if (!content || !content.hasChildNodes()) {
	      this.fallback();
	    } else {
	      this.compile(content.cloneNode(true), this.vm._context, this.vm);
	    }
	  },
	
	  compile: function compile(content, context, host) {
	    if (content && context) {
	      if (this.el.hasChildNodes() && content.childNodes.length === 1 && content.childNodes[0].nodeType === 1 && content.childNodes[0].hasAttribute('v-if')) {
	        // if the inserted slot has v-if
	        // inject fallback content as the v-else
	        var elseBlock = document.createElement('template');
	        elseBlock.setAttribute('v-else', '');
	        elseBlock.innerHTML = this.el.innerHTML;
	        // the else block should be compiled in child scope
	        elseBlock._context = this.vm;
	        content.appendChild(elseBlock);
	      }
	      var scope = host ? host._scope : this._scope;
	      this.unlink = context.$compile(content, host, scope, this._frag);
	    }
	    if (content) {
	      replace(this.el, content);
	    } else {
	      remove(this.el);
	    }
	  },
	
	  fallback: function fallback() {
	    this.compile(extractContent(this.el, true), this.vm);
	  },
	
	  unbind: function unbind() {
	    if (this.unlink) {
	      this.unlink();
	    }
	  }
	};
	
	var partial = {
	
	  priority: PARTIAL,
	
	  params: ['name'],
	
	  // watch changes to name for dynamic partials
	  paramWatchers: {
	    name: function name(value) {
	      vIf.remove.call(this);
	      if (value) {
	        this.insert(value);
	      }
	    }
	  },
	
	  bind: function bind() {
	    this.anchor = createAnchor('v-partial');
	    replace(this.el, this.anchor);
	    this.insert(this.params.name);
	  },
	
	  insert: function insert(id) {
	    var partial = resolveAsset(this.vm.$options, 'partials', id);
	    if (process.env.NODE_ENV !== 'production') {
	      assertAsset(partial, 'partial', id);
	    }
	    if (partial) {
	      this.factory = new FragmentFactory(this.vm, partial);
	      vIf.insert.call(this);
	    }
	  },
	
	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};
	
	var elementDirectives = {
	  slot: slot,
	  partial: partial
	};
	
	var convertArray = vFor._postProcess;
	
	/**
	 * Limit filter for arrays
	 *
	 * @param {Number} n
	 * @param {Number} offset (Decimal expected)
	 */
	
	function limitBy(arr, n, offset) {
	  offset = offset ? parseInt(offset, 10) : 0;
	  n = toNumber(n);
	  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
	}
	
	/**
	 * Filter filter for arrays
	 *
	 * @param {String} search
	 * @param {String} [delimiter]
	 * @param {String} ...dataKeys
	 */
	
	function filterBy(arr, search, delimiter) {
	  arr = convertArray(arr);
	  if (search == null) {
	    return arr;
	  }
	  if (typeof search === 'function') {
	    return arr.filter(search);
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase();
	  // allow optional `in` delimiter
	  // because why not
	  var n = delimiter === 'in' ? 3 : 2;
	  // extract and flatten keys
	  var keys = toArray(arguments, n).reduce(function (prev, cur) {
	    return prev.concat(cur);
	  }, []);
	  var res = [];
	  var item, key, val, j;
	  for (var i = 0, l = arr.length; i < l; i++) {
	    item = arr[i];
	    val = item && item.$value || item;
	    j = keys.length;
	    if (j) {
	      while (j--) {
	        key = keys[j];
	        if (key === '$key' && contains$1(item.$key, search) || contains$1(getPath(val, key), search)) {
	          res.push(item);
	          break;
	        }
	      }
	    } else if (contains$1(item, search)) {
	      res.push(item);
	    }
	  }
	  return res;
	}
	
	/**
	 * Filter filter for arrays
	 *
	 * @param {String} sortKey
	 * @param {String} reverse
	 */
	
	function orderBy(arr, sortKey, reverse) {
	  arr = convertArray(arr);
	  if (!sortKey) {
	    return arr;
	  }
	  var order = reverse && reverse < 0 ? -1 : 1;
	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(function (a, b) {
	    if (sortKey !== '$key') {
	      if (isObject(a) && '$value' in a) a = a.$value;
	      if (isObject(b) && '$value' in b) b = b.$value;
	    }
	    a = isObject(a) ? getPath(a, sortKey) : a;
	    b = isObject(b) ? getPath(b, sortKey) : b;
	    return a === b ? 0 : a > b ? order : -order;
	  });
	}
	
	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */
	
	function contains$1(val, search) {
	  var i;
	  if (isPlainObject(val)) {
	    var keys = Object.keys(val);
	    i = keys.length;
	    while (i--) {
	      if (contains$1(val[keys[i]], search)) {
	        return true;
	      }
	    }
	  } else if (isArray(val)) {
	    i = val.length;
	    while (i--) {
	      if (contains$1(val[i], search)) {
	        return true;
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1;
	  }
	}
	
	var digitsRE = /(\d{3})(?=\d)/g;
	
	// asset collections must be a plain object.
	var filters = {
	
	  orderBy: orderBy,
	  filterBy: filterBy,
	  limitBy: limitBy,
	
	  /**
	   * Stringify value.
	   *
	   * @param {Number} indent
	   */
	
	  json: {
	    read: function read(value, indent) {
	      return typeof value === 'string' ? value : JSON.stringify(value, null, Number(indent) || 2);
	    },
	    write: function write(value) {
	      try {
	        return JSON.parse(value);
	      } catch (e) {
	        return value;
	      }
	    }
	  },
	
	  /**
	   * 'abc' => 'Abc'
	   */
	
	  capitalize: function capitalize(value) {
	    if (!value && value !== 0) return '';
	    value = value.toString();
	    return value.charAt(0).toUpperCase() + value.slice(1);
	  },
	
	  /**
	   * 'abc' => 'ABC'
	   */
	
	  uppercase: function uppercase(value) {
	    return value || value === 0 ? value.toString().toUpperCase() : '';
	  },
	
	  /**
	   * 'AbC' => 'abc'
	   */
	
	  lowercase: function lowercase(value) {
	    return value || value === 0 ? value.toString().toLowerCase() : '';
	  },
	
	  /**
	   * 12345 => $12,345.00
	   *
	   * @param {String} sign
	   */
	
	  currency: function currency(value, _currency) {
	    value = parseFloat(value);
	    if (!isFinite(value) || !value && value !== 0) return '';
	    _currency = _currency != null ? _currency : '$';
	    var stringified = Math.abs(value).toFixed(2);
	    var _int = stringified.slice(0, -3);
	    var i = _int.length % 3;
	    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	    var _float = stringified.slice(-3);
	    var sign = value < 0 ? '-' : '';
	    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
	  },
	
	  /**
	   * 'item' => 'items'
	   *
	   * @params
	   *  an array of strings corresponding to
	   *  the single, double, triple ... forms of the word to
	   *  be pluralized. When the number to be pluralized
	   *  exceeds the length of the args, it will use the last
	   *  entry in the array.
	   *
	   *  e.g. ['single', 'double', 'triple', 'multiple']
	   */
	
	  pluralize: function pluralize(value) {
	    var args = toArray(arguments, 1);
	    return args.length > 1 ? args[value % 10 - 1] || args[args.length - 1] : args[0] + (value === 1 ? '' : 's');
	  },
	
	  /**
	   * Debounce a handler function.
	   *
	   * @param {Function} handler
	   * @param {Number} delay = 300
	   * @return {Function}
	   */
	
	  debounce: function debounce(handler, delay) {
	    if (!handler) return;
	    if (!delay) {
	      delay = 300;
	    }
	    return _debounce(handler, delay);
	  }
	};
	
	function installGlobalAPI (Vue) {
	  /**
	   * Vue and every constructor that extends Vue has an
	   * associated options object, which can be accessed during
	   * compilation steps as `this.constructor.options`.
	   *
	   * These can be seen as the default options of every
	   * Vue instance.
	   */
	
	  Vue.options = {
	    directives: directives,
	    elementDirectives: elementDirectives,
	    filters: filters,
	    transitions: {},
	    components: {},
	    partials: {},
	    replace: true
	  };
	
	  /**
	   * Expose useful internals
	   */
	
	  Vue.util = util;
	  Vue.config = config;
	  Vue.set = set;
	  Vue['delete'] = del;
	  Vue.nextTick = nextTick;
	
	  /**
	   * The following are exposed for advanced usage / plugins
	   */
	
	  Vue.compiler = compiler;
	  Vue.FragmentFactory = FragmentFactory;
	  Vue.internalDirectives = internalDirectives;
	  Vue.parsers = {
	    path: path,
	    text: text,
	    template: template,
	    directive: directive,
	    expression: expression
	  };
	
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	
	  Vue.cid = 0;
	  var cid = 1;
	
	  /**
	   * Class inheritance
	   *
	   * @param {Object} extendOptions
	   */
	
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor;
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
	        name = null;
	      }
	    }
	    var Sub = createClass(name || 'VueComponent');
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(Super.options, extendOptions);
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub;
	  };
	
	  /**
	   * A function that returns a sub-class constructor with the
	   * given name. This gives us much nicer output when
	   * logging instances in the console.
	   *
	   * @param {String} name
	   * @return {Function}
	   */
	
	  function createClass(name) {
	    /* eslint-disable no-new-func */
	    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
	    /* eslint-enable no-new-func */
	  }
	
	  /**
	   * Plugin system
	   *
	   * @param {Object} plugin
	   */
	
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return;
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this;
	  };
	
	  /**
	   * Apply a global mixin by merging it into the default
	   * options.
	   */
	
	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin);
	  };
	
	  /**
	   * Create asset registration methods with the following
	   * signature:
	   *
	   * @param {String} id
	   * @param {*} definition
	   */
	
	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id];
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
	            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = id;
	          definition = Vue.extend(definition);
	        }
	        this.options[type + 's'][id] = definition;
	        return definition;
	      }
	    };
	  });
	
	  // expose internal transition API
	  extend(Vue.transition, transition);
	}
	
	installGlobalAPI(Vue);
	
	Vue.version = '1.0.18';
	
	// devtools global hook
	/* istanbul ignore next */
	if (config.devtools) {
	  if (devtools) {
	    devtools.emit('init', Vue);
	  } else if (process.env.NODE_ENV !== 'production' && inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)) {
	    console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
	  }
	}
	
	module.exports = Vue;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(9)))

/***/ },
/* 9 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * vue-router v0.7.11
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  global.VueRouter = factory();
	}(this, function () { 'use strict';
	
	  var babelHelpers = {};
	
	  babelHelpers.classCallCheck = function (instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  };
	  function Target(path, matcher, delegate) {
	    this.path = path;
	    this.matcher = matcher;
	    this.delegate = delegate;
	  }
	
	  Target.prototype = {
	    to: function to(target, callback) {
	      var delegate = this.delegate;
	
	      if (delegate && delegate.willAddRoute) {
	        target = delegate.willAddRoute(this.matcher.target, target);
	      }
	
	      this.matcher.add(this.path, target);
	
	      if (callback) {
	        if (callback.length === 0) {
	          throw new Error("You must have an argument in the function passed to `to`");
	        }
	        this.matcher.addChild(this.path, target, callback, this.delegate);
	      }
	      return this;
	    }
	  };
	
	  function Matcher(target) {
	    this.routes = {};
	    this.children = {};
	    this.target = target;
	  }
	
	  Matcher.prototype = {
	    add: function add(path, handler) {
	      this.routes[path] = handler;
	    },
	
	    addChild: function addChild(path, target, callback, delegate) {
	      var matcher = new Matcher(target);
	      this.children[path] = matcher;
	
	      var match = generateMatch(path, matcher, delegate);
	
	      if (delegate && delegate.contextEntered) {
	        delegate.contextEntered(target, match);
	      }
	
	      callback(match);
	    }
	  };
	
	  function generateMatch(startingPath, matcher, delegate) {
	    return function (path, nestedCallback) {
	      var fullPath = startingPath + path;
	
	      if (nestedCallback) {
	        nestedCallback(generateMatch(fullPath, matcher, delegate));
	      } else {
	        return new Target(startingPath + path, matcher, delegate);
	      }
	    };
	  }
	
	  function addRoute(routeArray, path, handler) {
	    var len = 0;
	    for (var i = 0, l = routeArray.length; i < l; i++) {
	      len += routeArray[i].path.length;
	    }
	
	    path = path.substr(len);
	    var route = { path: path, handler: handler };
	    routeArray.push(route);
	  }
	
	  function eachRoute(baseRoute, matcher, callback, binding) {
	    var routes = matcher.routes;
	
	    for (var path in routes) {
	      if (routes.hasOwnProperty(path)) {
	        var routeArray = baseRoute.slice();
	        addRoute(routeArray, path, routes[path]);
	
	        if (matcher.children[path]) {
	          eachRoute(routeArray, matcher.children[path], callback, binding);
	        } else {
	          callback.call(binding, routeArray);
	        }
	      }
	    }
	  }
	
	  function map (callback, addRouteCallback) {
	    var matcher = new Matcher();
	
	    callback(generateMatch("", matcher, this.delegate));
	
	    eachRoute([], matcher, function (route) {
	      if (addRouteCallback) {
	        addRouteCallback(this, route);
	      } else {
	        this.add(route);
	      }
	    }, this);
	  }
	
	  var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
	
	  var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
	
	  function isArray(test) {
	    return Object.prototype.toString.call(test) === "[object Array]";
	  }
	
	  // A Segment represents a segment in the original route description.
	  // Each Segment type provides an `eachChar` and `regex` method.
	  //
	  // The `eachChar` method invokes the callback with one or more character
	  // specifications. A character specification consumes one or more input
	  // characters.
	  //
	  // The `regex` method returns a regex fragment for the segment. If the
	  // segment is a dynamic of star segment, the regex fragment also includes
	  // a capture.
	  //
	  // A character specification contains:
	  //
	  // * `validChars`: a String with a list of all valid characters, or
	  // * `invalidChars`: a String with a list of all invalid characters
	  // * `repeat`: true if the character specification can repeat
	
	  function StaticSegment(string) {
	    this.string = string;
	  }
	  StaticSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      var string = this.string,
	          ch;
	
	      for (var i = 0, l = string.length; i < l; i++) {
	        ch = string.charAt(i);
	        callback({ validChars: ch });
	      }
	    },
	
	    regex: function regex() {
	      return this.string.replace(escapeRegex, '\\$1');
	    },
	
	    generate: function generate() {
	      return this.string;
	    }
	  };
	
	  function DynamicSegment(name) {
	    this.name = name;
	  }
	  DynamicSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      callback({ invalidChars: "/", repeat: true });
	    },
	
	    regex: function regex() {
	      return "([^/]+)";
	    },
	
	    generate: function generate(params) {
	      var val = params[this.name];
	      return val == null ? ":" + this.name : val;
	    }
	  };
	
	  function StarSegment(name) {
	    this.name = name;
	  }
	  StarSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      callback({ invalidChars: "", repeat: true });
	    },
	
	    regex: function regex() {
	      return "(.+)";
	    },
	
	    generate: function generate(params) {
	      var val = params[this.name];
	      return val == null ? ":" + this.name : val;
	    }
	  };
	
	  function EpsilonSegment() {}
	  EpsilonSegment.prototype = {
	    eachChar: function eachChar() {},
	    regex: function regex() {
	      return "";
	    },
	    generate: function generate() {
	      return "";
	    }
	  };
	
	  function parse(route, names, specificity) {
	    // normalize route as not starting with a "/". Recognition will
	    // also normalize.
	    if (route.charAt(0) === "/") {
	      route = route.substr(1);
	    }
	
	    var segments = route.split("/"),
	        results = [];
	
	    // A routes has specificity determined by the order that its different segments
	    // appear in. This system mirrors how the magnitude of numbers written as strings
	    // works.
	    // Consider a number written as: "abc". An example would be "200". Any other number written
	    // "xyz" will be smaller than "abc" so long as `a > z`. For instance, "199" is smaller
	    // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
	    // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
	    // leading symbol, "1".
	    // The rule is that symbols to the left carry more weight than symbols to the right
	    // when a number is written out as a string. In the above strings, the leading digit
	    // represents how many 100's are in the number, and it carries more weight than the middle
	    // number which represents how many 10's are in the number.
	    // This system of number magnitude works well for route specificity, too. A route written as
	    // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
	    // `x`, irrespective of the other parts.
	    // Because of this similarity, we assign each type of segment a number value written as a
	    // string. We can find the specificity of compound routes by concatenating these strings
	    // together, from left to right. After we have looped through all of the segments,
	    // we convert the string to a number.
	    specificity.val = '';
	
	    for (var i = 0, l = segments.length; i < l; i++) {
	      var segment = segments[i],
	          match;
	
	      if (match = segment.match(/^:([^\/]+)$/)) {
	        results.push(new DynamicSegment(match[1]));
	        names.push(match[1]);
	        specificity.val += '3';
	      } else if (match = segment.match(/^\*([^\/]+)$/)) {
	        results.push(new StarSegment(match[1]));
	        specificity.val += '2';
	        names.push(match[1]);
	      } else if (segment === "") {
	        results.push(new EpsilonSegment());
	        specificity.val += '1';
	      } else {
	        results.push(new StaticSegment(segment));
	        specificity.val += '4';
	      }
	    }
	
	    specificity.val = +specificity.val;
	
	    return results;
	  }
	
	  // A State has a character specification and (`charSpec`) and a list of possible
	  // subsequent states (`nextStates`).
	  //
	  // If a State is an accepting state, it will also have several additional
	  // properties:
	  //
	  // * `regex`: A regular expression that is used to extract parameters from paths
	  //   that reached this accepting state.
	  // * `handlers`: Information on how to convert the list of captures into calls
	  //   to registered handlers with the specified parameters
	  // * `types`: How many static, dynamic or star segments in this route. Used to
	  //   decide which route to use if multiple registered routes match a path.
	  //
	  // Currently, State is implemented naively by looping over `nextStates` and
	  // comparing a character specification against a character. A more efficient
	  // implementation would use a hash of keys pointing at one or more next states.
	
	  function State(charSpec) {
	    this.charSpec = charSpec;
	    this.nextStates = [];
	  }
	
	  State.prototype = {
	    get: function get(charSpec) {
	      var nextStates = this.nextStates;
	
	      for (var i = 0, l = nextStates.length; i < l; i++) {
	        var child = nextStates[i];
	
	        var isEqual = child.charSpec.validChars === charSpec.validChars;
	        isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;
	
	        if (isEqual) {
	          return child;
	        }
	      }
	    },
	
	    put: function put(charSpec) {
	      var state;
	
	      // If the character specification already exists in a child of the current
	      // state, just return that state.
	      if (state = this.get(charSpec)) {
	        return state;
	      }
	
	      // Make a new state for the character spec
	      state = new State(charSpec);
	
	      // Insert the new state as a child of the current state
	      this.nextStates.push(state);
	
	      // If this character specification repeats, insert the new state as a child
	      // of itself. Note that this will not trigger an infinite loop because each
	      // transition during recognition consumes a character.
	      if (charSpec.repeat) {
	        state.nextStates.push(state);
	      }
	
	      // Return the new state
	      return state;
	    },
	
	    // Find a list of child states matching the next character
	    match: function match(ch) {
	      // DEBUG "Processing `" + ch + "`:"
	      var nextStates = this.nextStates,
	          child,
	          charSpec,
	          chars;
	
	      // DEBUG "  " + debugState(this)
	      var returned = [];
	
	      for (var i = 0, l = nextStates.length; i < l; i++) {
	        child = nextStates[i];
	
	        charSpec = child.charSpec;
	
	        if (typeof (chars = charSpec.validChars) !== 'undefined') {
	          if (chars.indexOf(ch) !== -1) {
	            returned.push(child);
	          }
	        } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
	          if (chars.indexOf(ch) === -1) {
	            returned.push(child);
	          }
	        }
	      }
	
	      return returned;
	    }
	
	    /** IF DEBUG
	    , debug: function() {
	      var charSpec = this.charSpec,
	          debug = "[",
	          chars = charSpec.validChars || charSpec.invalidChars;
	       if (charSpec.invalidChars) { debug += "^"; }
	      debug += chars;
	      debug += "]";
	       if (charSpec.repeat) { debug += "+"; }
	       return debug;
	    }
	    END IF **/
	  };
	
	  /** IF DEBUG
	  function debug(log) {
	    console.log(log);
	  }
	
	  function debugState(state) {
	    return state.nextStates.map(function(n) {
	      if (n.nextStates.length === 0) { return "( " + n.debug() + " [accepting] )"; }
	      return "( " + n.debug() + " <then> " + n.nextStates.map(function(s) { return s.debug() }).join(" or ") + " )";
	    }).join(", ")
	  }
	  END IF **/
	
	  // Sort the routes by specificity
	  function sortSolutions(states) {
	    return states.sort(function (a, b) {
	      return b.specificity.val - a.specificity.val;
	    });
	  }
	
	  function recognizeChar(states, ch) {
	    var nextStates = [];
	
	    for (var i = 0, l = states.length; i < l; i++) {
	      var state = states[i];
	
	      nextStates = nextStates.concat(state.match(ch));
	    }
	
	    return nextStates;
	  }
	
	  var oCreate = Object.create || function (proto) {
	    function F() {}
	    F.prototype = proto;
	    return new F();
	  };
	
	  function RecognizeResults(queryParams) {
	    this.queryParams = queryParams || {};
	  }
	  RecognizeResults.prototype = oCreate({
	    splice: Array.prototype.splice,
	    slice: Array.prototype.slice,
	    push: Array.prototype.push,
	    length: 0,
	    queryParams: null
	  });
	
	  function findHandler(state, path, queryParams) {
	    var handlers = state.handlers,
	        regex = state.regex;
	    var captures = path.match(regex),
	        currentCapture = 1;
	    var result = new RecognizeResults(queryParams);
	
	    for (var i = 0, l = handlers.length; i < l; i++) {
	      var handler = handlers[i],
	          names = handler.names,
	          params = {};
	
	      for (var j = 0, m = names.length; j < m; j++) {
	        params[names[j]] = captures[currentCapture++];
	      }
	
	      result.push({ handler: handler.handler, params: params, isDynamic: !!names.length });
	    }
	
	    return result;
	  }
	
	  function addSegment(currentState, segment) {
	    segment.eachChar(function (ch) {
	      var state;
	
	      currentState = currentState.put(ch);
	    });
	
	    return currentState;
	  }
	
	  function decodeQueryParamPart(part) {
	    // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
	    part = part.replace(/\+/gm, '%20');
	    return decodeURIComponent(part);
	  }
	
	  // The main interface
	
	  var RouteRecognizer = function RouteRecognizer() {
	    this.rootState = new State();
	    this.names = {};
	  };
	
	  RouteRecognizer.prototype = {
	    add: function add(routes, options) {
	      var currentState = this.rootState,
	          regex = "^",
	          specificity = {},
	          handlers = [],
	          allSegments = [],
	          name;
	
	      var isEmpty = true;
	
	      for (var i = 0, l = routes.length; i < l; i++) {
	        var route = routes[i],
	            names = [];
	
	        var segments = parse(route.path, names, specificity);
	
	        allSegments = allSegments.concat(segments);
	
	        for (var j = 0, m = segments.length; j < m; j++) {
	          var segment = segments[j];
	
	          if (segment instanceof EpsilonSegment) {
	            continue;
	          }
	
	          isEmpty = false;
	
	          // Add a "/" for the new segment
	          currentState = currentState.put({ validChars: "/" });
	          regex += "/";
	
	          // Add a representation of the segment to the NFA and regex
	          currentState = addSegment(currentState, segment);
	          regex += segment.regex();
	        }
	
	        var handler = { handler: route.handler, names: names };
	        handlers.push(handler);
	      }
	
	      if (isEmpty) {
	        currentState = currentState.put({ validChars: "/" });
	        regex += "/";
	      }
	
	      currentState.handlers = handlers;
	      currentState.regex = new RegExp(regex + "$");
	      currentState.specificity = specificity;
	
	      if (name = options && options.as) {
	        this.names[name] = {
	          segments: allSegments,
	          handlers: handlers
	        };
	      }
	    },
	
	    handlersFor: function handlersFor(name) {
	      var route = this.names[name],
	          result = [];
	      if (!route) {
	        throw new Error("There is no route named " + name);
	      }
	
	      for (var i = 0, l = route.handlers.length; i < l; i++) {
	        result.push(route.handlers[i]);
	      }
	
	      return result;
	    },
	
	    hasRoute: function hasRoute(name) {
	      return !!this.names[name];
	    },
	
	    generate: function generate(name, params) {
	      var route = this.names[name],
	          output = "";
	      if (!route) {
	        throw new Error("There is no route named " + name);
	      }
	
	      var segments = route.segments;
	
	      for (var i = 0, l = segments.length; i < l; i++) {
	        var segment = segments[i];
	
	        if (segment instanceof EpsilonSegment) {
	          continue;
	        }
	
	        output += "/";
	        output += segment.generate(params);
	      }
	
	      if (output.charAt(0) !== '/') {
	        output = '/' + output;
	      }
	
	      if (params && params.queryParams) {
	        output += this.generateQueryString(params.queryParams);
	      }
	
	      return output;
	    },
	
	    generateQueryString: function generateQueryString(params) {
	      var pairs = [];
	      var keys = [];
	      for (var key in params) {
	        if (params.hasOwnProperty(key)) {
	          keys.push(key);
	        }
	      }
	      keys.sort();
	      for (var i = 0, len = keys.length; i < len; i++) {
	        key = keys[i];
	        var value = params[key];
	        if (value == null) {
	          continue;
	        }
	        var pair = encodeURIComponent(key);
	        if (isArray(value)) {
	          for (var j = 0, l = value.length; j < l; j++) {
	            var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
	            pairs.push(arrayPair);
	          }
	        } else {
	          pair += "=" + encodeURIComponent(value);
	          pairs.push(pair);
	        }
	      }
	
	      if (pairs.length === 0) {
	        return '';
	      }
	
	      return "?" + pairs.join("&");
	    },
	
	    parseQueryString: function parseQueryString(queryString) {
	      var pairs = queryString.split("&"),
	          queryParams = {};
	      for (var i = 0; i < pairs.length; i++) {
	        var pair = pairs[i].split('='),
	            key = decodeQueryParamPart(pair[0]),
	            keyLength = key.length,
	            isArray = false,
	            value;
	        if (pair.length === 1) {
	          value = 'true';
	        } else {
	          //Handle arrays
	          if (keyLength > 2 && key.slice(keyLength - 2) === '[]') {
	            isArray = true;
	            key = key.slice(0, keyLength - 2);
	            if (!queryParams[key]) {
	              queryParams[key] = [];
	            }
	          }
	          value = pair[1] ? decodeQueryParamPart(pair[1]) : '';
	        }
	        if (isArray) {
	          queryParams[key].push(value);
	        } else {
	          queryParams[key] = value;
	        }
	      }
	      return queryParams;
	    },
	
	    recognize: function recognize(path) {
	      var states = [this.rootState],
	          pathLen,
	          i,
	          l,
	          queryStart,
	          queryParams = {},
	          isSlashDropped = false;
	
	      queryStart = path.indexOf('?');
	      if (queryStart !== -1) {
	        var queryString = path.substr(queryStart + 1, path.length);
	        path = path.substr(0, queryStart);
	        queryParams = this.parseQueryString(queryString);
	      }
	
	      path = decodeURI(path);
	
	      // DEBUG GROUP path
	
	      if (path.charAt(0) !== "/") {
	        path = "/" + path;
	      }
	
	      pathLen = path.length;
	      if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
	        path = path.substr(0, pathLen - 1);
	        isSlashDropped = true;
	      }
	
	      for (i = 0, l = path.length; i < l; i++) {
	        states = recognizeChar(states, path.charAt(i));
	        if (!states.length) {
	          break;
	        }
	      }
	
	      // END DEBUG GROUP
	
	      var solutions = [];
	      for (i = 0, l = states.length; i < l; i++) {
	        if (states[i].handlers) {
	          solutions.push(states[i]);
	        }
	      }
	
	      states = sortSolutions(solutions);
	
	      var state = solutions[0];
	
	      if (state && state.handlers) {
	        // if a trailing slash was dropped and a star segment is the last segment
	        // specified, put the trailing slash back
	        if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
	          path = path + "/";
	        }
	        return findHandler(state, path, queryParams);
	      }
	    }
	  };
	
	  RouteRecognizer.prototype.map = map;
	
	  RouteRecognizer.VERSION = '0.1.9';
	
	  var genQuery = RouteRecognizer.prototype.generateQueryString;
	
	  // export default for holding the Vue reference
	  var exports$1 = {};
	  /**
	   * Warn stuff.
	   *
	   * @param {String} msg
	   */
	
	  function warn(msg) {
	    /* istanbul ignore next */
	    if (window.console) {
	      console.warn('[vue-router] ' + msg);
	      if (!exports$1.Vue || exports$1.Vue.config.debug) {
	        console.warn(new Error('warning stack trace:').stack);
	      }
	    }
	  }
	
	  /**
	   * Resolve a relative path.
	   *
	   * @param {String} base
	   * @param {String} relative
	   * @param {Boolean} append
	   * @return {String}
	   */
	
	  function resolvePath(base, relative, append) {
	    var query = base.match(/(\?.*)$/);
	    if (query) {
	      query = query[1];
	      base = base.slice(0, -query.length);
	    }
	    // a query!
	    if (relative.charAt(0) === '?') {
	      return base + relative;
	    }
	    var stack = base.split('/');
	    // remove trailing segment if:
	    // - not appending
	    // - appending to trailing slash (last segment is empty)
	    if (!append || !stack[stack.length - 1]) {
	      stack.pop();
	    }
	    // resolve relative path
	    var segments = relative.replace(/^\//, '').split('/');
	    for (var i = 0; i < segments.length; i++) {
	      var segment = segments[i];
	      if (segment === '.') {
	        continue;
	      } else if (segment === '..') {
	        stack.pop();
	      } else {
	        stack.push(segment);
	      }
	    }
	    // ensure leading slash
	    if (stack[0] !== '') {
	      stack.unshift('');
	    }
	    return stack.join('/');
	  }
	
	  /**
	   * Forgiving check for a promise
	   *
	   * @param {Object} p
	   * @return {Boolean}
	   */
	
	  function isPromise(p) {
	    return p && typeof p.then === 'function';
	  }
	
	  /**
	   * Retrive a route config field from a component instance
	   * OR a component contructor.
	   *
	   * @param {Function|Vue} component
	   * @param {String} name
	   * @return {*}
	   */
	
	  function getRouteConfig(component, name) {
	    var options = component && (component.$options || component.options);
	    return options && options.route && options.route[name];
	  }
	
	  /**
	   * Resolve an async component factory. Have to do a dirty
	   * mock here because of Vue core's internal API depends on
	   * an ID check.
	   *
	   * @param {Object} handler
	   * @param {Function} cb
	   */
	
	  var resolver = undefined;
	
	  function resolveAsyncComponent(handler, cb) {
	    if (!resolver) {
	      resolver = {
	        resolve: exports$1.Vue.prototype._resolveComponent,
	        $options: {
	          components: {
	            _: handler.component
	          }
	        }
	      };
	    } else {
	      resolver.$options.components._ = handler.component;
	    }
	    resolver.resolve('_', function (Component) {
	      handler.component = Component;
	      cb(Component);
	    });
	  }
	
	  /**
	   * Map the dynamic segments in a path to params.
	   *
	   * @param {String} path
	   * @param {Object} params
	   * @param {Object} query
	   */
	
	  function mapParams(path, params, query) {
	    if (params === undefined) params = {};
	
	    path = path.replace(/:([^\/]+)/g, function (_, key) {
	      var val = params[key];
	      /* istanbul ignore if */
	      if (!val) {
	        warn('param "' + key + '" not found when generating ' + 'path for "' + path + '" with params ' + JSON.stringify(params));
	      }
	      return val || '';
	    });
	    if (query) {
	      path += genQuery(query);
	    }
	    return path;
	  }
	
	  var hashRE = /#.*$/;
	
	  var HTML5History = (function () {
	    function HTML5History(_ref) {
	      var root = _ref.root;
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, HTML5History);
	
	      if (root) {
	        // make sure there's the starting slash
	        if (root.charAt(0) !== '/') {
	          root = '/' + root;
	        }
	        // remove trailing slash
	        this.root = root.replace(/\/$/, '');
	        this.rootRE = new RegExp('^\\' + this.root);
	      } else {
	        this.root = null;
	      }
	      this.onChange = onChange;
	      // check base tag
	      var baseEl = document.querySelector('base');
	      this.base = baseEl && baseEl.getAttribute('href');
	    }
	
	    HTML5History.prototype.start = function start() {
	      var _this = this;
	
	      this.listener = function (e) {
	        var url = decodeURI(location.pathname + location.search);
	        if (_this.root) {
	          url = url.replace(_this.rootRE, '');
	        }
	        _this.onChange(url, e && e.state, location.hash);
	      };
	      window.addEventListener('popstate', this.listener);
	      this.listener();
	    };
	
	    HTML5History.prototype.stop = function stop() {
	      window.removeEventListener('popstate', this.listener);
	    };
	
	    HTML5History.prototype.go = function go(path, replace, append) {
	      var url = this.formatPath(path, append);
	      if (replace) {
	        history.replaceState({}, '', url);
	      } else {
	        // record scroll position by replacing current state
	        history.replaceState({
	          pos: {
	            x: window.pageXOffset,
	            y: window.pageYOffset
	          }
	        }, '', location.href);
	        // then push new state
	        history.pushState({}, '', url);
	      }
	      var hashMatch = path.match(hashRE);
	      var hash = hashMatch && hashMatch[0];
	      path = url
	      // strip hash so it doesn't mess up params
	      .replace(hashRE, '')
	      // remove root before matching
	      .replace(this.rootRE, '');
	      this.onChange(path, null, hash);
	    };
	
	    HTML5History.prototype.formatPath = function formatPath(path, append) {
	      return path.charAt(0) === '/'
	      // absolute path
	      ? this.root ? this.root + '/' + path.replace(/^\//, '') : path : resolvePath(this.base || location.pathname, path, append);
	    };
	
	    return HTML5History;
	  })();
	
	  var HashHistory = (function () {
	    function HashHistory(_ref) {
	      var hashbang = _ref.hashbang;
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, HashHistory);
	
	      this.hashbang = hashbang;
	      this.onChange = onChange;
	    }
	
	    HashHistory.prototype.start = function start() {
	      var self = this;
	      this.listener = function () {
	        var path = location.hash;
	        var raw = path.replace(/^#!?/, '');
	        // always
	        if (raw.charAt(0) !== '/') {
	          raw = '/' + raw;
	        }
	        var formattedPath = self.formatPath(raw);
	        if (formattedPath !== path) {
	          location.replace(formattedPath);
	          return;
	        }
	        // determine query
	        // note it's possible to have queries in both the actual URL
	        // and the hash fragment itself.
	        var query = location.search && path.indexOf('?') > -1 ? '&' + location.search.slice(1) : location.search;
	        self.onChange(decodeURI(path.replace(/^#!?/, '') + query));
	      };
	      window.addEventListener('hashchange', this.listener);
	      this.listener();
	    };
	
	    HashHistory.prototype.stop = function stop() {
	      window.removeEventListener('hashchange', this.listener);
	    };
	
	    HashHistory.prototype.go = function go(path, replace, append) {
	      path = this.formatPath(path, append);
	      if (replace) {
	        location.replace(path);
	      } else {
	        location.hash = path;
	      }
	    };
	
	    HashHistory.prototype.formatPath = function formatPath(path, append) {
	      var isAbsoloute = path.charAt(0) === '/';
	      var prefix = '#' + (this.hashbang ? '!' : '');
	      return isAbsoloute ? prefix + path : prefix + resolvePath(location.hash.replace(/^#!?/, ''), path, append);
	    };
	
	    return HashHistory;
	  })();
	
	  var AbstractHistory = (function () {
	    function AbstractHistory(_ref) {
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, AbstractHistory);
	
	      this.onChange = onChange;
	      this.currentPath = '/';
	    }
	
	    AbstractHistory.prototype.start = function start() {
	      this.onChange('/');
	    };
	
	    AbstractHistory.prototype.stop = function stop() {
	      // noop
	    };
	
	    AbstractHistory.prototype.go = function go(path, replace, append) {
	      path = this.currentPath = this.formatPath(path, append);
	      this.onChange(path);
	    };
	
	    AbstractHistory.prototype.formatPath = function formatPath(path, append) {
	      return path.charAt(0) === '/' ? path : resolvePath(this.currentPath, path, append);
	    };
	
	    return AbstractHistory;
	  })();
	
	  /**
	   * Determine the reusability of an existing router view.
	   *
	   * @param {Directive} view
	   * @param {Object} handler
	   * @param {Transition} transition
	   */
	
	  function canReuse(view, handler, transition) {
	    var component = view.childVM;
	    if (!component || !handler) {
	      return false;
	    }
	    // important: check view.Component here because it may
	    // have been changed in activate hook
	    if (view.Component !== handler.component) {
	      return false;
	    }
	    var canReuseFn = getRouteConfig(component, 'canReuse');
	    return typeof canReuseFn === 'boolean' ? canReuseFn : canReuseFn ? canReuseFn.call(component, {
	      to: transition.to,
	      from: transition.from
	    }) : true; // defaults to true
	  }
	
	  /**
	   * Check if a component can deactivate.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Function} next
	   */
	
	  function canDeactivate(view, transition, next) {
	    var fromComponent = view.childVM;
	    var hook = getRouteConfig(fromComponent, 'canDeactivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHook(hook, fromComponent, next, {
	        expectBoolean: true
	      });
	    }
	  }
	
	  /**
	   * Check if a component can activate.
	   *
	   * @param {Object} handler
	   * @param {Transition} transition
	   * @param {Function} next
	   */
	
	  function canActivate(handler, transition, next) {
	    resolveAsyncComponent(handler, function (Component) {
	      // have to check due to async-ness
	      if (transition.aborted) {
	        return;
	      }
	      // determine if this component can be activated
	      var hook = getRouteConfig(Component, 'canActivate');
	      if (!hook) {
	        next();
	      } else {
	        transition.callHook(hook, null, next, {
	          expectBoolean: true
	        });
	      }
	    });
	  }
	
	  /**
	   * Call deactivate hooks for existing router-views.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Function} next
	   */
	
	  function deactivate(view, transition, next) {
	    var component = view.childVM;
	    var hook = getRouteConfig(component, 'deactivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHooks(hook, component, next);
	    }
	  }
	
	  /**
	   * Activate / switch component for a router-view.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Number} depth
	   * @param {Function} [cb]
	   */
	
	  function activate(view, transition, depth, cb, reuse) {
	    var handler = transition.activateQueue[depth];
	    if (!handler) {
	      saveChildView(view);
	      if (view._bound) {
	        view.setComponent(null);
	      }
	      cb && cb();
	      return;
	    }
	
	    var Component = view.Component = handler.component;
	    var activateHook = getRouteConfig(Component, 'activate');
	    var dataHook = getRouteConfig(Component, 'data');
	    var waitForData = getRouteConfig(Component, 'waitForData');
	
	    view.depth = depth;
	    view.activated = false;
	
	    var component = undefined;
	    var loading = !!(dataHook && !waitForData);
	
	    // "reuse" is a flag passed down when the parent view is
	    // either reused via keep-alive or as a child of a kept-alive view.
	    // of course we can only reuse if the current kept-alive instance
	    // is of the correct type.
	    reuse = reuse && view.childVM && view.childVM.constructor === Component;
	
	    if (reuse) {
	      // just reuse
	      component = view.childVM;
	      component.$loadingRouteData = loading;
	    } else {
	      saveChildView(view);
	
	      // unbuild current component. this step also destroys
	      // and removes all nested child views.
	      view.unbuild(true);
	
	      // build the new component. this will also create the
	      // direct child view of the current one. it will register
	      // itself as view.childView.
	      component = view.build({
	        _meta: {
	          $loadingRouteData: loading
	        },
	        created: function created() {
	          this._routerView = view;
	        }
	      });
	
	      // handle keep-alive.
	      // when a kept-alive child vm is restored, we need to
	      // add its cached child views into the router's view list,
	      // and also properly update current view's child view.
	      if (view.keepAlive) {
	        component.$loadingRouteData = loading;
	        var cachedChildView = component._keepAliveRouterView;
	        if (cachedChildView) {
	          view.childView = cachedChildView;
	          component._keepAliveRouterView = null;
	        }
	      }
	    }
	
	    // cleanup the component in case the transition is aborted
	    // before the component is ever inserted.
	    var cleanup = function cleanup() {
	      component.$destroy();
	    };
	
	    // actually insert the component and trigger transition
	    var insert = function insert() {
	      if (reuse) {
	        cb && cb();
	        return;
	      }
	      var router = transition.router;
	      if (router._rendered || router._transitionOnLoad) {
	        view.transition(component);
	      } else {
	        // no transition on first render, manual transition
	        /* istanbul ignore if */
	        if (view.setCurrent) {
	          // 0.12 compat
	          view.setCurrent(component);
	        } else {
	          // 1.0
	          view.childVM = component;
	        }
	        component.$before(view.anchor, null, false);
	      }
	      cb && cb();
	    };
	
	    var afterData = function afterData() {
	      // activate the child view
	      if (view.childView) {
	        activate(view.childView, transition, depth + 1, null, reuse || view.keepAlive);
	      }
	      insert();
	    };
	
	    // called after activation hook is resolved
	    var afterActivate = function afterActivate() {
	      view.activated = true;
	      if (dataHook && waitForData) {
	        // wait until data loaded to insert
	        loadData(component, transition, dataHook, afterData, cleanup);
	      } else {
	        // load data and insert at the same time
	        if (dataHook) {
	          loadData(component, transition, dataHook);
	        }
	        afterData();
	      }
	    };
	
	    if (activateHook) {
	      transition.callHooks(activateHook, component, afterActivate, {
	        cleanup: cleanup,
	        postActivate: true
	      });
	    } else {
	      afterActivate();
	    }
	  }
	
	  /**
	   * Reuse a view, just reload data if necessary.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   */
	
	  function reuse(view, transition) {
	    var component = view.childVM;
	    var dataHook = getRouteConfig(component, 'data');
	    if (dataHook) {
	      loadData(component, transition, dataHook);
	    }
	  }
	
	  /**
	   * Asynchronously load and apply data to component.
	   *
	   * @param {Vue} component
	   * @param {Transition} transition
	   * @param {Function} hook
	   * @param {Function} cb
	   * @param {Function} cleanup
	   */
	
	  function loadData(component, transition, hook, cb, cleanup) {
	    component.$loadingRouteData = true;
	    transition.callHooks(hook, component, function () {
	      component.$loadingRouteData = false;
	      component.$emit('route-data-loaded', component);
	      cb && cb();
	    }, {
	      cleanup: cleanup,
	      postActivate: true,
	      processData: function processData(data) {
	        // handle promise sugar syntax
	        var promises = [];
	        if (isPlainObject(data)) {
	          Object.keys(data).forEach(function (key) {
	            var val = data[key];
	            if (isPromise(val)) {
	              promises.push(val.then(function (resolvedVal) {
	                component.$set(key, resolvedVal);
	              }));
	            } else {
	              component.$set(key, val);
	            }
	          });
	        }
	        if (promises.length) {
	          return promises[0].constructor.all(promises);
	        }
	      }
	    });
	  }
	
	  /**
	   * Save the child view for a kept-alive view so that
	   * we can restore it when it is switched back to.
	   *
	   * @param {Directive} view
	   */
	
	  function saveChildView(view) {
	    if (view.keepAlive && view.childVM && view.childView) {
	      view.childVM._keepAliveRouterView = view.childView;
	    }
	    view.childView = null;
	  }
	
	  /**
	   * Check plain object.
	   *
	   * @param {*} val
	   */
	
	  function isPlainObject(val) {
	    return Object.prototype.toString.call(val) === '[object Object]';
	  }
	
	  /**
	   * A RouteTransition object manages the pipeline of a
	   * router-view switching process. This is also the object
	   * passed into user route hooks.
	   *
	   * @param {Router} router
	   * @param {Route} to
	   * @param {Route} from
	   */
	
	  var RouteTransition = (function () {
	    function RouteTransition(router, to, from) {
	      babelHelpers.classCallCheck(this, RouteTransition);
	
	      this.router = router;
	      this.to = to;
	      this.from = from;
	      this.next = null;
	      this.aborted = false;
	      this.done = false;
	    }
	
	    /**
	     * Abort current transition and return to previous location.
	     */
	
	    RouteTransition.prototype.abort = function abort() {
	      if (!this.aborted) {
	        this.aborted = true;
	        // if the root path throws an error during validation
	        // on initial load, it gets caught in an infinite loop.
	        var abortingOnLoad = !this.from.path && this.to.path === '/';
	        if (!abortingOnLoad) {
	          this.router.replace(this.from.path || '/');
	        }
	      }
	    };
	
	    /**
	     * Abort current transition and redirect to a new location.
	     *
	     * @param {String} path
	     */
	
	    RouteTransition.prototype.redirect = function redirect(path) {
	      if (!this.aborted) {
	        this.aborted = true;
	        if (typeof path === 'string') {
	          path = mapParams(path, this.to.params, this.to.query);
	        } else {
	          path.params = path.params || this.to.params;
	          path.query = path.query || this.to.query;
	        }
	        this.router.replace(path);
	      }
	    };
	
	    /**
	     * A router view transition's pipeline can be described as
	     * follows, assuming we are transitioning from an existing
	     * <router-view> chain [Component A, Component B] to a new
	     * chain [Component A, Component C]:
	     *
	     *  A    A
	     *  | => |
	     *  B    C
	     *
	     * 1. Reusablity phase:
	     *   -> canReuse(A, A)
	     *   -> canReuse(B, C)
	     *   -> determine new queues:
	     *      - deactivation: [B]
	     *      - activation: [C]
	     *
	     * 2. Validation phase:
	     *   -> canDeactivate(B)
	     *   -> canActivate(C)
	     *
	     * 3. Activation phase:
	     *   -> deactivate(B)
	     *   -> activate(C)
	     *
	     * Each of these steps can be asynchronous, and any
	     * step can potentially abort the transition.
	     *
	     * @param {Function} cb
	     */
	
	    RouteTransition.prototype.start = function start(cb) {
	      var transition = this;
	
	      // determine the queue of views to deactivate
	      var deactivateQueue = [];
	      var view = this.router._rootView;
	      while (view) {
	        deactivateQueue.unshift(view);
	        view = view.childView;
	      }
	      var reverseDeactivateQueue = deactivateQueue.slice().reverse();
	
	      // determine the queue of route handlers to activate
	      var activateQueue = this.activateQueue = toArray(this.to.matched).map(function (match) {
	        return match.handler;
	      });
	
	      // 1. Reusability phase
	      var i = undefined,
	          reuseQueue = undefined;
	      for (i = 0; i < reverseDeactivateQueue.length; i++) {
	        if (!canReuse(reverseDeactivateQueue[i], activateQueue[i], transition)) {
	          break;
	        }
	      }
	      if (i > 0) {
	        reuseQueue = reverseDeactivateQueue.slice(0, i);
	        deactivateQueue = reverseDeactivateQueue.slice(i).reverse();
	        activateQueue = activateQueue.slice(i);
	      }
	
	      // 2. Validation phase
	      transition.runQueue(deactivateQueue, canDeactivate, function () {
	        transition.runQueue(activateQueue, canActivate, function () {
	          transition.runQueue(deactivateQueue, deactivate, function () {
	            // 3. Activation phase
	
	            // Update router current route
	            transition.router._onTransitionValidated(transition);
	
	            // trigger reuse for all reused views
	            reuseQueue && reuseQueue.forEach(function (view) {
	              return reuse(view, transition);
	            });
	
	            // the root of the chain that needs to be replaced
	            // is the top-most non-reusable view.
	            if (deactivateQueue.length) {
	              var _view = deactivateQueue[deactivateQueue.length - 1];
	              var depth = reuseQueue ? reuseQueue.length : 0;
	              activate(_view, transition, depth, cb);
	            } else {
	              cb();
	            }
	          });
	        });
	      });
	    };
	
	    /**
	     * Asynchronously and sequentially apply a function to a
	     * queue.
	     *
	     * @param {Array} queue
	     * @param {Function} fn
	     * @param {Function} cb
	     */
	
	    RouteTransition.prototype.runQueue = function runQueue(queue, fn, cb) {
	      var transition = this;
	      step(0);
	      function step(index) {
	        if (index >= queue.length) {
	          cb();
	        } else {
	          fn(queue[index], transition, function () {
	            step(index + 1);
	          });
	        }
	      }
	    };
	
	    /**
	     * Call a user provided route transition hook and handle
	     * the response (e.g. if the user returns a promise).
	     *
	     * If the user neither expects an argument nor returns a
	     * promise, the hook is assumed to be synchronous.
	     *
	     * @param {Function} hook
	     * @param {*} [context]
	     * @param {Function} [cb]
	     * @param {Object} [options]
	     *                 - {Boolean} expectBoolean
	     *                 - {Boolean} postActive
	     *                 - {Function} processData
	     *                 - {Function} cleanup
	     */
	
	    RouteTransition.prototype.callHook = function callHook(hook, context, cb) {
	      var _ref = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	      var _ref$expectBoolean = _ref.expectBoolean;
	      var expectBoolean = _ref$expectBoolean === undefined ? false : _ref$expectBoolean;
	      var _ref$postActivate = _ref.postActivate;
	      var postActivate = _ref$postActivate === undefined ? false : _ref$postActivate;
	      var processData = _ref.processData;
	      var cleanup = _ref.cleanup;
	
	      var transition = this;
	      var nextCalled = false;
	
	      // abort the transition
	      var abort = function abort() {
	        cleanup && cleanup();
	        transition.abort();
	      };
	
	      // handle errors
	      var onError = function onError(err) {
	        postActivate ? next() : abort();
	        if (err && !transition.router._suppress) {
	          warn('Uncaught error during transition: ');
	          throw err instanceof Error ? err : new Error(err);
	        }
	      };
	
	      // since promise swallows errors, we have to
	      // throw it in the next tick...
	      var onPromiseError = function onPromiseError(err) {
	        try {
	          onError(err);
	        } catch (e) {
	          setTimeout(function () {
	            throw e;
	          }, 0);
	        }
	      };
	
	      // advance the transition to the next step
	      var next = function next() {
	        if (nextCalled) {
	          warn('transition.next() should be called only once.');
	          return;
	        }
	        nextCalled = true;
	        if (transition.aborted) {
	          cleanup && cleanup();
	          return;
	        }
	        cb && cb();
	      };
	
	      var nextWithBoolean = function nextWithBoolean(res) {
	        if (typeof res === 'boolean') {
	          res ? next() : abort();
	        } else if (isPromise(res)) {
	          res.then(function (ok) {
	            ok ? next() : abort();
	          }, onPromiseError);
	        } else if (!hook.length) {
	          next();
	        }
	      };
	
	      var nextWithData = function nextWithData(data) {
	        var res = undefined;
	        try {
	          res = processData(data);
	        } catch (err) {
	          return onError(err);
	        }
	        if (isPromise(res)) {
	          res.then(next, onPromiseError);
	        } else {
	          next();
	        }
	      };
	
	      // expose a clone of the transition object, so that each
	      // hook gets a clean copy and prevent the user from
	      // messing with the internals.
	      var exposed = {
	        to: transition.to,
	        from: transition.from,
	        abort: abort,
	        next: processData ? nextWithData : next,
	        redirect: function redirect() {
	          transition.redirect.apply(transition, arguments);
	        }
	      };
	
	      // actually call the hook
	      var res = undefined;
	      try {
	        res = hook.call(context, exposed);
	      } catch (err) {
	        return onError(err);
	      }
	
	      if (expectBoolean) {
	        // boolean hooks
	        nextWithBoolean(res);
	      } else if (isPromise(res)) {
	        // promise
	        if (processData) {
	          res.then(nextWithData, onPromiseError);
	        } else {
	          res.then(next, onPromiseError);
	        }
	      } else if (processData && isPlainOjbect(res)) {
	        // data promise sugar
	        nextWithData(res);
	      } else if (!hook.length) {
	        next();
	      }
	    };
	
	    /**
	     * Call a single hook or an array of async hooks in series.
	     *
	     * @param {Array} hooks
	     * @param {*} context
	     * @param {Function} cb
	     * @param {Object} [options]
	     */
	
	    RouteTransition.prototype.callHooks = function callHooks(hooks, context, cb, options) {
	      var _this = this;
	
	      if (Array.isArray(hooks)) {
	        this.runQueue(hooks, function (hook, _, next) {
	          if (!_this.aborted) {
	            _this.callHook(hook, context, next, options);
	          }
	        }, cb);
	      } else {
	        this.callHook(hooks, context, cb, options);
	      }
	    };
	
	    return RouteTransition;
	  })();
	
	  function isPlainOjbect(val) {
	    return Object.prototype.toString.call(val) === '[object Object]';
	  }
	
	  function toArray(val) {
	    return val ? Array.prototype.slice.call(val) : [];
	  }
	
	  var internalKeysRE = /^(component|subRoutes)$/;
	
	  /**
	   * Route Context Object
	   *
	   * @param {String} path
	   * @param {Router} router
	   */
	
	  var Route = function Route(path, router) {
	    var _this = this;
	
	    babelHelpers.classCallCheck(this, Route);
	
	    var matched = router._recognizer.recognize(path);
	    if (matched) {
	      // copy all custom fields from route configs
	      [].forEach.call(matched, function (match) {
	        for (var key in match.handler) {
	          if (!internalKeysRE.test(key)) {
	            _this[key] = match.handler[key];
	          }
	        }
	      });
	      // set query and params
	      this.query = matched.queryParams;
	      this.params = [].reduce.call(matched, function (prev, cur) {
	        if (cur.params) {
	          for (var key in cur.params) {
	            prev[key] = cur.params[key];
	          }
	        }
	        return prev;
	      }, {});
	    }
	    // expose path and router
	    this.path = path;
	    this.router = router;
	    // for internal use
	    this.matched = matched || router._notFoundHandler;
	    // Important: freeze self to prevent observation
	    Object.freeze(this);
	  };
	
	  function applyOverride (Vue) {
	    var _Vue$util = Vue.util;
	    var extend = _Vue$util.extend;
	    var isArray = _Vue$util.isArray;
	    var defineReactive = _Vue$util.defineReactive;
	
	    // override Vue's init and destroy process to keep track of router instances
	    var init = Vue.prototype._init;
	    Vue.prototype._init = function (options) {
	      options = options || {};
	      var root = options._parent || options.parent || this;
	      var router = root.$router;
	      var route = root.$route;
	      if (router) {
	        // expose router
	        this.$router = router;
	        router._children.push(this);
	        /* istanbul ignore if */
	        if (this._defineMeta) {
	          // 0.12
	          this._defineMeta('$route', route);
	        } else {
	          // 1.0
	          defineReactive(this, '$route', route);
	        }
	      }
	      init.call(this, options);
	    };
	
	    var destroy = Vue.prototype._destroy;
	    Vue.prototype._destroy = function () {
	      if (!this._isBeingDestroyed && this.$router) {
	        this.$router._children.$remove(this);
	      }
	      destroy.apply(this, arguments);
	    };
	
	    // 1.0 only: enable route mixins
	    var strats = Vue.config.optionMergeStrategies;
	    var hooksToMergeRE = /^(data|activate|deactivate)$/;
	
	    if (strats) {
	      strats.route = function (parentVal, childVal) {
	        if (!childVal) return parentVal;
	        if (!parentVal) return childVal;
	        var ret = {};
	        extend(ret, parentVal);
	        for (var key in childVal) {
	          var a = ret[key];
	          var b = childVal[key];
	          // for data, activate and deactivate, we need to merge them into
	          // arrays similar to lifecycle hooks.
	          if (a && hooksToMergeRE.test(key)) {
	            ret[key] = (isArray(a) ? a : [a]).concat(b);
	          } else {
	            ret[key] = b;
	          }
	        }
	        return ret;
	      };
	    }
	  }
	
	  function View (Vue) {
	
	    var _ = Vue.util;
	    var componentDef =
	    // 0.12
	    Vue.directive('_component') ||
	    // 1.0
	    Vue.internalDirectives.component;
	    // <router-view> extends the internal component directive
	    var viewDef = _.extend({}, componentDef);
	
	    // with some overrides
	    _.extend(viewDef, {
	
	      _isRouterView: true,
	
	      bind: function bind() {
	        var route = this.vm.$route;
	        /* istanbul ignore if */
	        if (!route) {
	          warn('<router-view> can only be used inside a ' + 'router-enabled app.');
	          return;
	        }
	        // force dynamic directive so v-component doesn't
	        // attempt to build right now
	        this._isDynamicLiteral = true;
	        // finally, init by delegating to v-component
	        componentDef.bind.call(this);
	
	        // locate the parent view
	        var parentView = undefined;
	        var parent = this.vm;
	        while (parent) {
	          if (parent._routerView) {
	            parentView = parent._routerView;
	            break;
	          }
	          parent = parent.$parent;
	        }
	        if (parentView) {
	          // register self as a child of the parent view,
	          // instead of activating now. This is so that the
	          // child's activate hook is called after the
	          // parent's has resolved.
	          this.parentView = parentView;
	          parentView.childView = this;
	        } else {
	          // this is the root view!
	          var router = route.router;
	          router._rootView = this;
	        }
	
	        // handle late-rendered view
	        // two possibilities:
	        // 1. root view rendered after transition has been
	        //    validated;
	        // 2. child view rendered after parent view has been
	        //    activated.
	        var transition = route.router._currentTransition;
	        if (!parentView && transition.done || parentView && parentView.activated) {
	          var depth = parentView ? parentView.depth + 1 : 0;
	          activate(this, transition, depth);
	        }
	      },
	
	      unbind: function unbind() {
	        if (this.parentView) {
	          this.parentView.childView = null;
	        }
	        componentDef.unbind.call(this);
	      }
	    });
	
	    Vue.elementDirective('router-view', viewDef);
	  }
	
	  var trailingSlashRE = /\/$/;
	  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	  var queryStringRE = /\?.*$/;
	
	  // install v-link, which provides navigation support for
	  // HTML5 history mode
	  function Link (Vue) {
	    var _Vue$util = Vue.util;
	    var _bind = _Vue$util.bind;
	    var isObject = _Vue$util.isObject;
	    var addClass = _Vue$util.addClass;
	    var removeClass = _Vue$util.removeClass;
	
	    Vue.directive('link-active', {
	      priority: 1001,
	      bind: function bind() {
	        this.el.__v_link_active = true;
	      }
	    });
	
	    Vue.directive('link', {
	      priority: 1000,
	
	      bind: function bind() {
	        var vm = this.vm;
	        /* istanbul ignore if */
	        if (!vm.$route) {
	          warn('v-link can only be used inside a router-enabled app.');
	          return;
	        }
	        this.router = vm.$route.router;
	        // update things when the route changes
	        this.unwatch = vm.$watch('$route', _bind(this.onRouteUpdate, this));
	        // check if active classes should be applied to a different element
	        this.activeEl = this.el;
	        var parent = this.el.parentNode;
	        while (parent) {
	          if (parent.__v_link_active) {
	            this.activeEl = parent;
	            break;
	          }
	          parent = parent.parentNode;
	        }
	        // no need to handle click if link expects to be opened
	        // in a new window/tab.
	        /* istanbul ignore if */
	        if (this.el.tagName === 'A' && this.el.getAttribute('target') === '_blank') {
	          return;
	        }
	        // handle click
	        this.handler = _bind(this.onClick, this);
	        this.el.addEventListener('click', this.handler);
	      },
	
	      update: function update(target) {
	        this.target = target;
	        if (isObject(target)) {
	          this.append = target.append;
	          this.exact = target.exact;
	          this.prevActiveClass = this.activeClass;
	          this.activeClass = target.activeClass;
	        }
	        this.onRouteUpdate(this.vm.$route);
	      },
	
	      onClick: function onClick(e) {
	        // don't redirect with control keys
	        /* istanbul ignore if */
	        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
	        // don't redirect when preventDefault called
	        /* istanbul ignore if */
	        if (e.defaultPrevented) return;
	        // don't redirect on right click
	        /* istanbul ignore if */
	        if (e.button !== 0) return;
	
	        var target = this.target;
	        if (target) {
	          // v-link with expression, just go
	          e.preventDefault();
	          this.router.go(target);
	        } else {
	          // no expression, delegate for an <a> inside
	          var el = e.target;
	          while (el.tagName !== 'A' && el !== this.el) {
	            el = el.parentNode;
	          }
	          if (el.tagName === 'A' && sameOrigin(el)) {
	            e.preventDefault();
	            this.router.go({
	              path: el.pathname,
	              replace: target && target.replace,
	              append: target && target.append
	            });
	          }
	        }
	      },
	
	      onRouteUpdate: function onRouteUpdate(route) {
	        // router._stringifyPath is dependent on current route
	        // and needs to be called again whenver route changes.
	        var newPath = this.router._stringifyPath(this.target);
	        if (this.path !== newPath) {
	          this.path = newPath;
	          this.updateActiveMatch();
	          this.updateHref();
	        }
	        this.updateClasses(route.path);
	      },
	
	      updateActiveMatch: function updateActiveMatch() {
	        this.activeRE = this.path && !this.exact ? new RegExp('^' + this.path.replace(/\/$/, '').replace(queryStringRE, '').replace(regexEscapeRE, '\\$&') + '(\\/|$)') : null;
	      },
	
	      updateHref: function updateHref() {
	        if (this.el.tagName !== 'A') {
	          return;
	        }
	        var path = this.path;
	        var router = this.router;
	        var isAbsolute = path.charAt(0) === '/';
	        // do not format non-hash relative paths
	        var href = path && (router.mode === 'hash' || isAbsolute) ? router.history.formatPath(path, this.append) : path;
	        if (href) {
	          this.el.href = href;
	        } else {
	          this.el.removeAttribute('href');
	        }
	      },
	
	      updateClasses: function updateClasses(path) {
	        var el = this.activeEl;
	        var activeClass = this.activeClass || this.router._linkActiveClass;
	        // clear old class
	        if (this.prevActiveClass !== activeClass) {
	          removeClass(el, this.prevActiveClass);
	        }
	        // remove query string before matching
	        var dest = this.path.replace(queryStringRE, '');
	        path = path.replace(queryStringRE, '');
	        // add new class
	        if (this.exact) {
	          if (dest === path ||
	          // also allow additional trailing slash
	          dest.charAt(dest.length - 1) !== '/' && dest === path.replace(trailingSlashRE, '')) {
	            addClass(el, activeClass);
	          } else {
	            removeClass(el, activeClass);
	          }
	        } else {
	          if (this.activeRE && this.activeRE.test(path)) {
	            addClass(el, activeClass);
	          } else {
	            removeClass(el, activeClass);
	          }
	        }
	      },
	
	      unbind: function unbind() {
	        this.el.removeEventListener('click', this.handler);
	        this.unwatch && this.unwatch();
	      }
	    });
	
	    function sameOrigin(link) {
	      return link.protocol === location.protocol && link.hostname === location.hostname && link.port === location.port;
	    }
	  }
	
	  var historyBackends = {
	    abstract: AbstractHistory,
	    hash: HashHistory,
	    html5: HTML5History
	  };
	
	  // late bind during install
	  var Vue = undefined;
	
	  /**
	   * Router constructor
	   *
	   * @param {Object} [options]
	   */
	
	  var Router = (function () {
	    function Router() {
	      var _this = this;
	
	      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      var _ref$hashbang = _ref.hashbang;
	      var hashbang = _ref$hashbang === undefined ? true : _ref$hashbang;
	      var _ref$abstract = _ref.abstract;
	      var abstract = _ref$abstract === undefined ? false : _ref$abstract;
	      var _ref$history = _ref.history;
	      var history = _ref$history === undefined ? false : _ref$history;
	      var _ref$saveScrollPosition = _ref.saveScrollPosition;
	      var saveScrollPosition = _ref$saveScrollPosition === undefined ? false : _ref$saveScrollPosition;
	      var _ref$transitionOnLoad = _ref.transitionOnLoad;
	      var transitionOnLoad = _ref$transitionOnLoad === undefined ? false : _ref$transitionOnLoad;
	      var _ref$suppressTransitionError = _ref.suppressTransitionError;
	      var suppressTransitionError = _ref$suppressTransitionError === undefined ? false : _ref$suppressTransitionError;
	      var _ref$root = _ref.root;
	      var root = _ref$root === undefined ? null : _ref$root;
	      var _ref$linkActiveClass = _ref.linkActiveClass;
	      var linkActiveClass = _ref$linkActiveClass === undefined ? 'v-link-active' : _ref$linkActiveClass;
	      babelHelpers.classCallCheck(this, Router);
	
	      /* istanbul ignore if */
	      if (!Router.installed) {
	        throw new Error('Please install the Router with Vue.use() before ' + 'creating an instance.');
	      }
	
	      // Vue instances
	      this.app = null;
	      this._children = [];
	
	      // route recognizer
	      this._recognizer = new RouteRecognizer();
	      this._guardRecognizer = new RouteRecognizer();
	
	      // state
	      this._started = false;
	      this._startCb = null;
	      this._currentRoute = {};
	      this._currentTransition = null;
	      this._previousTransition = null;
	      this._notFoundHandler = null;
	      this._notFoundRedirect = null;
	      this._beforeEachHooks = [];
	      this._afterEachHooks = [];
	
	      // trigger transition on initial render?
	      this._rendered = false;
	      this._transitionOnLoad = transitionOnLoad;
	
	      // history mode
	      this._root = root;
	      this._abstract = abstract;
	      this._hashbang = hashbang;
	
	      // check if HTML5 history is available
	      var hasPushState = typeof window !== 'undefined' && window.history && window.history.pushState;
	      this._history = history && hasPushState;
	      this._historyFallback = history && !hasPushState;
	
	      // create history object
	      var inBrowser = Vue.util.inBrowser;
	      this.mode = !inBrowser || this._abstract ? 'abstract' : this._history ? 'html5' : 'hash';
	
	      var History = historyBackends[this.mode];
	      this.history = new History({
	        root: root,
	        hashbang: this._hashbang,
	        onChange: function onChange(path, state, anchor) {
	          _this._match(path, state, anchor);
	        }
	      });
	
	      // other options
	      this._saveScrollPosition = saveScrollPosition;
	      this._linkActiveClass = linkActiveClass;
	      this._suppress = suppressTransitionError;
	    }
	
	    /**
	     * Allow directly passing components to a route
	     * definition.
	     *
	     * @param {String} path
	     * @param {Object} handler
	     */
	
	    // API ===================================================
	
	    /**
	    * Register a map of top-level paths.
	    *
	    * @param {Object} map
	    */
	
	    Router.prototype.map = function map(_map) {
	      for (var route in _map) {
	        this.on(route, _map[route]);
	      }
	      return this;
	    };
	
	    /**
	     * Register a single root-level path
	     *
	     * @param {String} rootPath
	     * @param {Object} handler
	     *                 - {String} component
	     *                 - {Object} [subRoutes]
	     *                 - {Boolean} [forceRefresh]
	     *                 - {Function} [before]
	     *                 - {Function} [after]
	     */
	
	    Router.prototype.on = function on(rootPath, handler) {
	      if (rootPath === '*') {
	        this._notFound(handler);
	      } else {
	        this._addRoute(rootPath, handler, []);
	      }
	      return this;
	    };
	
	    /**
	     * Set redirects.
	     *
	     * @param {Object} map
	     */
	
	    Router.prototype.redirect = function redirect(map) {
	      for (var path in map) {
	        this._addRedirect(path, map[path]);
	      }
	      return this;
	    };
	
	    /**
	     * Set aliases.
	     *
	     * @param {Object} map
	     */
	
	    Router.prototype.alias = function alias(map) {
	      for (var path in map) {
	        this._addAlias(path, map[path]);
	      }
	      return this;
	    };
	
	    /**
	     * Set global before hook.
	     *
	     * @param {Function} fn
	     */
	
	    Router.prototype.beforeEach = function beforeEach(fn) {
	      this._beforeEachHooks.push(fn);
	      return this;
	    };
	
	    /**
	     * Set global after hook.
	     *
	     * @param {Function} fn
	     */
	
	    Router.prototype.afterEach = function afterEach(fn) {
	      this._afterEachHooks.push(fn);
	      return this;
	    };
	
	    /**
	     * Navigate to a given path.
	     * The path can be an object describing a named path in
	     * the format of { name: '...', params: {}, query: {}}
	     * The path is assumed to be already decoded, and will
	     * be resolved against root (if provided)
	     *
	     * @param {String|Object} path
	     * @param {Boolean} [replace]
	     */
	
	    Router.prototype.go = function go(path) {
	      var replace = false;
	      var append = false;
	      if (Vue.util.isObject(path)) {
	        replace = path.replace;
	        append = path.append;
	      }
	      path = this._stringifyPath(path);
	      if (path) {
	        this.history.go(path, replace, append);
	      }
	    };
	
	    /**
	     * Short hand for replacing current path
	     *
	     * @param {String} path
	     */
	
	    Router.prototype.replace = function replace(path) {
	      if (typeof path === 'string') {
	        path = { path: path };
	      }
	      path.replace = true;
	      this.go(path);
	    };
	
	    /**
	     * Start the router.
	     *
	     * @param {VueConstructor} App
	     * @param {String|Element} container
	     * @param {Function} [cb]
	     */
	
	    Router.prototype.start = function start(App, container, cb) {
	      /* istanbul ignore if */
	      if (this._started) {
	        warn('already started.');
	        return;
	      }
	      this._started = true;
	      this._startCb = cb;
	      if (!this.app) {
	        /* istanbul ignore if */
	        if (!App || !container) {
	          throw new Error('Must start vue-router with a component and a ' + 'root container.');
	        }
	        /* istanbul ignore if */
	        if (App instanceof Vue) {
	          throw new Error('Must start vue-router with a component, not a ' + 'Vue instance.');
	        }
	        this._appContainer = container;
	        var Ctor = this._appConstructor = typeof App === 'function' ? App : Vue.extend(App);
	        // give it a name for better debugging
	        Ctor.options.name = Ctor.options.name || 'RouterApp';
	      }
	
	      // handle history fallback in browsers that do not
	      // support HTML5 history API
	      if (this._historyFallback) {
	        var _location = window.location;
	        var _history = new HTML5History({ root: this._root });
	        var path = _history.root ? _location.pathname.replace(_history.rootRE, '') : _location.pathname;
	        if (path && path !== '/') {
	          _location.assign((_history.root || '') + '/' + this.history.formatPath(path) + _location.search);
	          return;
	        }
	      }
	
	      this.history.start();
	    };
	
	    /**
	     * Stop listening to route changes.
	     */
	
	    Router.prototype.stop = function stop() {
	      this.history.stop();
	      this._started = false;
	    };
	
	    // Internal methods ======================================
	
	    /**
	    * Add a route containing a list of segments to the internal
	    * route recognizer. Will be called recursively to add all
	    * possible sub-routes.
	    *
	    * @param {String} path
	    * @param {Object} handler
	    * @param {Array} segments
	    */
	
	    Router.prototype._addRoute = function _addRoute(path, handler, segments) {
	      guardComponent(path, handler);
	      handler.path = path;
	      handler.fullPath = (segments.reduce(function (path, segment) {
	        return path + segment.path;
	      }, '') + path).replace('//', '/');
	      segments.push({
	        path: path,
	        handler: handler
	      });
	      this._recognizer.add(segments, {
	        as: handler.name
	      });
	      // add sub routes
	      if (handler.subRoutes) {
	        for (var subPath in handler.subRoutes) {
	          // recursively walk all sub routes
	          this._addRoute(subPath, handler.subRoutes[subPath],
	          // pass a copy in recursion to avoid mutating
	          // across branches
	          segments.slice());
	        }
	      }
	    };
	
	    /**
	     * Set the notFound route handler.
	     *
	     * @param {Object} handler
	     */
	
	    Router.prototype._notFound = function _notFound(handler) {
	      guardComponent('*', handler);
	      this._notFoundHandler = [{ handler: handler }];
	    };
	
	    /**
	     * Add a redirect record.
	     *
	     * @param {String} path
	     * @param {String} redirectPath
	     */
	
	    Router.prototype._addRedirect = function _addRedirect(path, redirectPath) {
	      if (path === '*') {
	        this._notFoundRedirect = redirectPath;
	      } else {
	        this._addGuard(path, redirectPath, this.replace);
	      }
	    };
	
	    /**
	     * Add an alias record.
	     *
	     * @param {String} path
	     * @param {String} aliasPath
	     */
	
	    Router.prototype._addAlias = function _addAlias(path, aliasPath) {
	      this._addGuard(path, aliasPath, this._match);
	    };
	
	    /**
	     * Add a path guard.
	     *
	     * @param {String} path
	     * @param {String} mappedPath
	     * @param {Function} handler
	     */
	
	    Router.prototype._addGuard = function _addGuard(path, mappedPath, _handler) {
	      var _this2 = this;
	
	      this._guardRecognizer.add([{
	        path: path,
	        handler: function handler(match, query) {
	          var realPath = mapParams(mappedPath, match.params, query);
	          _handler.call(_this2, realPath);
	        }
	      }]);
	    };
	
	    /**
	     * Check if a path matches any redirect records.
	     *
	     * @param {String} path
	     * @return {Boolean} - if true, will skip normal match.
	     */
	
	    Router.prototype._checkGuard = function _checkGuard(path) {
	      var matched = this._guardRecognizer.recognize(path);
	      if (matched) {
	        matched[0].handler(matched[0], matched.queryParams);
	        return true;
	      } else if (this._notFoundRedirect) {
	        matched = this._recognizer.recognize(path);
	        if (!matched) {
	          this.replace(this._notFoundRedirect);
	          return true;
	        }
	      }
	    };
	
	    /**
	     * Match a URL path and set the route context on vm,
	     * triggering view updates.
	     *
	     * @param {String} path
	     * @param {Object} [state]
	     * @param {String} [anchor]
	     */
	
	    Router.prototype._match = function _match(path, state, anchor) {
	      var _this3 = this;
	
	      if (this._checkGuard(path)) {
	        return;
	      }
	
	      var currentRoute = this._currentRoute;
	      var currentTransition = this._currentTransition;
	
	      if (currentTransition) {
	        if (currentTransition.to.path === path) {
	          // do nothing if we have an active transition going to the same path
	          return;
	        } else if (currentRoute.path === path) {
	          // We are going to the same path, but we also have an ongoing but
	          // not-yet-validated transition. Abort that transition and reset to
	          // prev transition.
	          currentTransition.aborted = true;
	          this._currentTransition = this._prevTransition;
	          return;
	        } else {
	          // going to a totally different path. abort ongoing transition.
	          currentTransition.aborted = true;
	        }
	      }
	
	      // construct new route and transition context
	      var route = new Route(path, this);
	      var transition = new RouteTransition(this, route, currentRoute);
	
	      // current transition is updated right now.
	      // however, current route will only be updated after the transition has
	      // been validated.
	      this._prevTransition = currentTransition;
	      this._currentTransition = transition;
	
	      if (!this.app) {
	        (function () {
	          // initial render
	          var router = _this3;
	          _this3.app = new _this3._appConstructor({
	            el: _this3._appContainer,
	            created: function created() {
	              this.$router = router;
	            },
	            _meta: {
	              $route: route
	            }
	          });
	        })();
	      }
	
	      // check global before hook
	      var beforeHooks = this._beforeEachHooks;
	      var startTransition = function startTransition() {
	        transition.start(function () {
	          _this3._postTransition(route, state, anchor);
	        });
	      };
	
	      if (beforeHooks.length) {
	        transition.runQueue(beforeHooks, function (hook, _, next) {
	          if (transition === _this3._currentTransition) {
	            transition.callHook(hook, null, next, {
	              expectBoolean: true
	            });
	          }
	        }, startTransition);
	      } else {
	        startTransition();
	      }
	
	      if (!this._rendered && this._startCb) {
	        this._startCb.call(null);
	      }
	
	      // HACK:
	      // set rendered to true after the transition start, so
	      // that components that are acitvated synchronously know
	      // whether it is the initial render.
	      this._rendered = true;
	    };
	
	    /**
	     * Set current to the new transition.
	     * This is called by the transition object when the
	     * validation of a route has succeeded.
	     *
	     * @param {Transition} transition
	     */
	
	    Router.prototype._onTransitionValidated = function _onTransitionValidated(transition) {
	      // set current route
	      var route = this._currentRoute = transition.to;
	      // update route context for all children
	      if (this.app.$route !== route) {
	        this.app.$route = route;
	        this._children.forEach(function (child) {
	          child.$route = route;
	        });
	      }
	      // call global after hook
	      if (this._afterEachHooks.length) {
	        this._afterEachHooks.forEach(function (hook) {
	          return hook.call(null, {
	            to: transition.to,
	            from: transition.from
	          });
	        });
	      }
	      this._currentTransition.done = true;
	    };
	
	    /**
	     * Handle stuff after the transition.
	     *
	     * @param {Route} route
	     * @param {Object} [state]
	     * @param {String} [anchor]
	     */
	
	    Router.prototype._postTransition = function _postTransition(route, state, anchor) {
	      // handle scroll positions
	      // saved scroll positions take priority
	      // then we check if the path has an anchor
	      var pos = state && state.pos;
	      if (pos && this._saveScrollPosition) {
	        Vue.nextTick(function () {
	          window.scrollTo(pos.x, pos.y);
	        });
	      } else if (anchor) {
	        Vue.nextTick(function () {
	          var el = document.getElementById(anchor.slice(1));
	          if (el) {
	            window.scrollTo(window.scrollX, el.offsetTop);
	          }
	        });
	      }
	    };
	
	    /**
	     * Normalize named route object / string paths into
	     * a string.
	     *
	     * @param {Object|String|Number} path
	     * @return {String}
	     */
	
	    Router.prototype._stringifyPath = function _stringifyPath(path) {
	      var fullPath = '';
	      if (path && typeof path === 'object') {
	        if (path.name) {
	          var extend = Vue.util.extend;
	          var currentParams = this._currentTransition && this._currentTransition.to.params;
	          var targetParams = path.params || {};
	          var params = currentParams ? extend(extend({}, currentParams), targetParams) : targetParams;
	          if (path.query) {
	            params.queryParams = path.query;
	          }
	          fullPath = this._recognizer.generate(path.name, params);
	        } else if (path.path) {
	          fullPath = path.path;
	          if (path.query) {
	            var query = this._recognizer.generateQueryString(path.query);
	            if (fullPath.indexOf('?') > -1) {
	              fullPath += '&' + query.slice(1);
	            } else {
	              fullPath += query;
	            }
	          }
	        }
	      } else {
	        fullPath = path ? path + '' : '';
	      }
	      return encodeURI(fullPath);
	    };
	
	    return Router;
	  })();
	
	  function guardComponent(path, handler) {
	    var comp = handler.component;
	    if (Vue.util.isPlainObject(comp)) {
	      comp = handler.component = Vue.extend(comp);
	    }
	    /* istanbul ignore if */
	    if (typeof comp !== 'function') {
	      handler.component = null;
	      warn('invalid component for route "' + path + '".');
	    }
	  }
	
	  /* Installation */
	
	  Router.installed = false;
	
	  /**
	   * Installation interface.
	   * Install the necessary directives.
	   */
	
	  Router.install = function (externalVue) {
	    /* istanbul ignore if */
	    if (Router.installed) {
	      warn('already installed.');
	      return;
	    }
	    Vue = externalVue;
	    applyOverride(Vue);
	    View(Vue);
	    Link(Vue);
	    exports$1.Vue = Vue;
	    Router.installed = true;
	  };
	
	  // auto install
	  /* istanbul ignore if */
	  if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(Router);
	  }
	
	  return Router;
	
	}));

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	  var vue // lazy bind
	
	  var asyncData = {
	    created: function () {
	      if (!vue) {
	        console.warn('[vue-async-data] not installed!')
	        return
	      }
	      if (this.$options.asyncData) {
	        if (this._defineMeta) {
	          // 0.12 compat
	          this._defineMeta('$loadingAsyncData', true)
	        } else {
	          // ^1.0.0-alpha
	          vue.util.defineReactive(this, '$loadingAsyncData', true)
	        }
	      }
	    },
	    compiled: function () {
	      this.reloadAsyncData()
	    },
	    methods: {
	      reloadAsyncData: function () {
	        var load = this.$options.asyncData
	        if (load) {
	          var self = this
	          var resolve = function (data) {
	            if (data) {
	              for (var key in data) {
	                self.$set(key, data[key])
	              }
	            }
	            self.$loadingAsyncData = false
	            self.$emit('async-data')
	          }
	          var reject = function (reason) {
	            var msg = '[vue] async data load failed'
	            if (reason instanceof Error) {
	              console.warn(msg)
	              throw reason
	            } else {
	              console.warn(msg + ': ' + reason)
	            }
	          }
	          this.$loadingAsyncData = true
	          var res = load.call(this, resolve, reject)
	          if (res && typeof res.then === 'function') {
	            res.then(resolve, reject)
	          }
	        }
	      }
	    }
	  }
	
	  var api = {
	    mixin: asyncData,
	    install: function (Vue, options) {
	      vue = Vue
	      Vue.options = Vue.util.mergeOptions(Vue.options, asyncData)
	    }
	  }
	
	  if(true) {
	    module.exports = api
	  } else if(typeof define === 'function' && define.amd) {
	    define(function () { return api })
	  } else if (typeof window !== 'undefined') {
	    window.VueAsyncData = api
	  }
	})()


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(13)
	module.exports = __webpack_require__(17)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(18)
	if (false) {
	(function () {
	var hotAPI = require("/Users/dinglei/程序代码/工作/时趣互动/2016/20160316_VueGroup/webapp/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./app.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./app.vue","-!vue-html!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./app.vue"], function () {
	var newOptions = require("-!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./app.vue")
	var newTemplate = require("-!vue-html!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./app.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(16)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./app.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/selector.js?type=style&index=0!./app.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(15)();
	// imports
	
	
	// module
	exports.push([module.id, "/*\n   页脚样式\n   */\n    .g-footer{\n        z-index: 2;\n        position: fixed;\n        bottom: 0;\n        width: 100%;\n        max-width: 640px;\n        padding: 1.5% 0;\n        background-color: #fff;\n        border-top: 1px solid #ddd;\n    }\n    .g-footer .item{\n        float: left;\n        width: 33%;\n        text-align: center;\n    }\n    .g-footer .item a {\n        display: block;\n        padding: 3% 0;\n        border-left: 1px solid #fff;\n        border-right: 1px solid #cecece;\n        color: #7b7b7b;\n        font-size: 12px;\n        line-height: 1.8em;\n    }\n    .g-footer .item:nth-child(1) a {\n        border-left: none;\n    }\n    .g-footer .item:nth-child(3) a {\n        border-right: none;\n    }\n    .g-footer .item a.nav-active{\n        color: #ff6600;\n    }\n\n    .g-view {\n        -webkit-transition: all .3s ease;\n        transition: all .3s ease;\n        position: absolute;\n        display: block;\n        width: 100%;\n        height: 100%;\n    }\n    .fade-enter{\n        opacity: 1;\n        transform: translate3d(100%, 0, 0);\n    }\n\n    .fade-leave {\n        opacity: 0;\n        -webkit-transform: translate3d(0, 0, 0);\n        transform: translate3d(0, 0, 0);\n\n    }\n\n    .back-enter {\n        opacity: 1;\n        -webkit-transform: translate3d(-110%, 0, 0);\n        transform: translate3d(-110%, 0, 0);\n\n    }\n    .back-leave{\n        opacity: 0;\n        /*transform: translate3d(100%, 0, 0);*/\n        -webkit-transform: translate3d(0, 0, 0);\n        transform: translate3d(0, 0, 0);\n    }\n\n    .bounce-enter {\n        animation: bounce-in .5s;\n    }\n    .bounce-leave {\n        animation: bounce-out .5s;\n    }\n    @keyframes bounce-in {\n        0% {\n            transform: scale(0);\n        }\n        50% {\n            transform: scale(1.5);\n        }\n        100% {\n            transform: scale(1);\n        }\n    }\n    @keyframes bounce-out {\n        0% {\n            transform: scale(1);\n        }\n        50% {\n            transform: scale(1.5);\n        }\n        100% {\n            transform: scale(0);\n        }\n    }\n\n    .card-scroll {\n        height: 100%;\n    }\n    .card-active {\n    }\n    .card-page {\n        width: 100%;\n        position: absolute;\n    }", ""]);
	
	// exports


/***/ },
/* 15 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = {
	        ready:function(){
	            var _self = this;
	
	            this.$router.go("home");
	
	        }
	    }

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "<div class=\"card-page card-active card-scroll\">\n\n        <!-- 缓存一级路由切换的页面 -->\n        <router-view keep-alive :transition=\"effect\" transition-mode=\"out-in\"></router-view>\n    </div>";

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;;(function () {
		'use strict';
	
		/**
		 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
		 *
		 * @codingstandard ftlabs-jsv2
		 * @copyright The Financial Times Limited [All Rights Reserved]
		 * @license MIT License (see LICENSE.txt)
		 */
	
		/*jslint browser:true, node:true*/
		/*global define, Event, Node*/
	
	
		/**
		 * Instantiate fast-clicking listeners on the specified layer.
		 *
		 * @constructor
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		function FastClick(layer, options) {
			var oldOnClick;
	
			options = options || {};
	
			/**
			 * Whether a click is currently being tracked.
			 *
			 * @type boolean
			 */
			this.trackingClick = false;
	
	
			/**
			 * Timestamp for when click tracking started.
			 *
			 * @type number
			 */
			this.trackingClickStart = 0;
	
	
			/**
			 * The element being tracked for a click.
			 *
			 * @type EventTarget
			 */
			this.targetElement = null;
	
	
			/**
			 * X-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartX = 0;
	
	
			/**
			 * Y-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartY = 0;
	
	
			/**
			 * ID of the last touch, retrieved from Touch.identifier.
			 *
			 * @type number
			 */
			this.lastTouchIdentifier = 0;
	
	
			/**
			 * Touchmove boundary, beyond which a click will be cancelled.
			 *
			 * @type number
			 */
			this.touchBoundary = options.touchBoundary || 10;
	
	
			/**
			 * The FastClick layer.
			 *
			 * @type Element
			 */
			this.layer = layer;
	
			/**
			 * The minimum time between tap(touchstart and touchend) events
			 *
			 * @type number
			 */
			this.tapDelay = options.tapDelay || 200;
	
			/**
			 * The maximum time for a tap
			 *
			 * @type number
			 */
			this.tapTimeout = options.tapTimeout || 700;
	
			if (FastClick.notNeeded(layer)) {
				return;
			}
	
			// Some old versions of Android don't have Function.prototype.bind
			function bind(method, context) {
				return function() { return method.apply(context, arguments); };
			}
	
	
			var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
			var context = this;
			for (var i = 0, l = methods.length; i < l; i++) {
				context[methods[i]] = bind(context[methods[i]], context);
			}
	
			// Set up event handlers as required
			if (deviceIsAndroid) {
				layer.addEventListener('mouseover', this.onMouse, true);
				layer.addEventListener('mousedown', this.onMouse, true);
				layer.addEventListener('mouseup', this.onMouse, true);
			}
	
			layer.addEventListener('click', this.onClick, true);
			layer.addEventListener('touchstart', this.onTouchStart, false);
			layer.addEventListener('touchmove', this.onTouchMove, false);
			layer.addEventListener('touchend', this.onTouchEnd, false);
			layer.addEventListener('touchcancel', this.onTouchCancel, false);
	
			// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
			// layer when they are cancelled.
			if (!Event.prototype.stopImmediatePropagation) {
				layer.removeEventListener = function(type, callback, capture) {
					var rmv = Node.prototype.removeEventListener;
					if (type === 'click') {
						rmv.call(layer, type, callback.hijacked || callback, capture);
					} else {
						rmv.call(layer, type, callback, capture);
					}
				};
	
				layer.addEventListener = function(type, callback, capture) {
					var adv = Node.prototype.addEventListener;
					if (type === 'click') {
						adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
							if (!event.propagationStopped) {
								callback(event);
							}
						}), capture);
					} else {
						adv.call(layer, type, callback, capture);
					}
				};
			}
	
			// If a handler is already declared in the element's onclick attribute, it will be fired before
			// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
			// adding it as listener.
			if (typeof layer.onclick === 'function') {
	
				// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
				// - the old one won't work if passed to addEventListener directly.
				oldOnClick = layer.onclick;
				layer.addEventListener('click', function(event) {
					oldOnClick(event);
				}, false);
				layer.onclick = null;
			}
		}
	
		/**
		* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
		*
		* @type boolean
		*/
		var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
	
		/**
		 * Android requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
	
	
		/**
		 * iOS requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
	
	
		/**
		 * iOS 4 requires an exception for select elements.
		 *
		 * @type boolean
		 */
		var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);
	
	
		/**
		 * iOS 6.0-7.* requires the target element to be manually derived
		 *
		 * @type boolean
		 */
		var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);
	
		/**
		 * BlackBerry requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;
	
		/**
		 * Determine whether a given element requires a native click.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element needs a native click
		 */
		FastClick.prototype.needsClick = function(target) {
			switch (target.nodeName.toLowerCase()) {
	
			// Don't send a synthetic click to disabled inputs (issue #62)
			case 'button':
			case 'select':
			case 'textarea':
				if (target.disabled) {
					return true;
				}
	
				break;
			case 'input':
	
				// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
				if ((deviceIsIOS && target.type === 'file') || target.disabled) {
					return true;
				}
	
				break;
			case 'label':
			case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
			case 'video':
				return true;
			}
	
			return (/\bneedsclick\b/).test(target.className);
		};
	
	
		/**
		 * Determine whether a given element requires a call to focus to simulate click into element.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
		 */
		FastClick.prototype.needsFocus = function(target) {
			switch (target.nodeName.toLowerCase()) {
			case 'textarea':
				return true;
			case 'select':
				return !deviceIsAndroid;
			case 'input':
				switch (target.type) {
				case 'button':
				case 'checkbox':
				case 'file':
				case 'image':
				case 'radio':
				case 'submit':
					return false;
				}
	
				// No point in attempting to focus disabled inputs
				return !target.disabled && !target.readOnly;
			default:
				return (/\bneedsfocus\b/).test(target.className);
			}
		};
	
	
		/**
		 * Send a click event to the specified element.
		 *
		 * @param {EventTarget|Element} targetElement
		 * @param {Event} event
		 */
		FastClick.prototype.sendClick = function(targetElement, event) {
			var clickEvent, touch;
	
			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}
	
			touch = event.changedTouches[0];
	
			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
		};
	
		FastClick.prototype.determineEventType = function(targetElement) {
	
			//Issue #159: Android Chrome Select Box does not open with a synthetic click event
			if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
				return 'mousedown';
			}
	
			return 'click';
		};
	
	
		/**
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.focus = function(targetElement) {
			var length;
	
			// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
			if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
				length = targetElement.value.length;
				targetElement.setSelectionRange(length, length);
			} else {
				targetElement.focus();
			}
		};
	
	
		/**
		 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
		 *
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.updateScrollParent = function(targetElement) {
			var scrollParent, parentElement;
	
			scrollParent = targetElement.fastClickScrollParent;
	
			// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
			// target element was moved to another parent.
			if (!scrollParent || !scrollParent.contains(targetElement)) {
				parentElement = targetElement;
				do {
					if (parentElement.scrollHeight > parentElement.offsetHeight) {
						scrollParent = parentElement;
						targetElement.fastClickScrollParent = parentElement;
						break;
					}
	
					parentElement = parentElement.parentElement;
				} while (parentElement);
			}
	
			// Always update the scroll top tracker if possible.
			if (scrollParent) {
				scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
			}
		};
	
	
		/**
		 * @param {EventTarget} targetElement
		 * @returns {Element|EventTarget}
		 */
		FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	
			// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
			if (eventTarget.nodeType === Node.TEXT_NODE) {
				return eventTarget.parentNode;
			}
	
			return eventTarget;
		};
	
	
		/**
		 * On touch start, record the position and scroll offset.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchStart = function(event) {
			var targetElement, touch, selection;
	
			// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
			if (event.targetTouches.length > 1) {
				return true;
			}
	
			targetElement = this.getTargetElementFromEventTarget(event.target);
			touch = event.targetTouches[0];
	
			if (deviceIsIOS) {
	
				// Only trusted events will deselect text on iOS (issue #49)
				selection = window.getSelection();
				if (selection.rangeCount && !selection.isCollapsed) {
					return true;
				}
	
				if (!deviceIsIOS4) {
	
					// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
					// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
					// with the same identifier as the touch event that previously triggered the click that triggered the alert.
					// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
					// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
					// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
					// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
					// random integers, it's safe to to continue if the identifier is 0 here.
					if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
						event.preventDefault();
						return false;
					}
	
					this.lastTouchIdentifier = touch.identifier;
	
					// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
					// 1) the user does a fling scroll on the scrollable layer
					// 2) the user stops the fling scroll with another tap
					// then the event.target of the last 'touchend' event will be the element that was under the user's finger
					// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
					// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
					this.updateScrollParent(targetElement);
				}
			}
	
			this.trackingClick = true;
			this.trackingClickStart = event.timeStamp;
			this.targetElement = targetElement;
	
			this.touchStartX = touch.pageX;
			this.touchStartY = touch.pageY;
	
			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				event.preventDefault();
			}
	
			return true;
		};
	
	
		/**
		 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.touchHasMoved = function(event) {
			var touch = event.changedTouches[0], boundary = this.touchBoundary;
	
			if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
				return true;
			}
	
			return false;
		};
	
	
		/**
		 * Update the last position.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchMove = function(event) {
			if (!this.trackingClick) {
				return true;
			}
	
			// If the touch has moved, cancel the click tracking
			if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
				this.trackingClick = false;
				this.targetElement = null;
			}
	
			return true;
		};
	
	
		/**
		 * Attempt to find the labelled control for the given label element.
		 *
		 * @param {EventTarget|HTMLLabelElement} labelElement
		 * @returns {Element|null}
		 */
		FastClick.prototype.findControl = function(labelElement) {
	
			// Fast path for newer browsers supporting the HTML5 control attribute
			if (labelElement.control !== undefined) {
				return labelElement.control;
			}
	
			// All browsers under test that support touch events also support the HTML5 htmlFor attribute
			if (labelElement.htmlFor) {
				return document.getElementById(labelElement.htmlFor);
			}
	
			// If no for attribute exists, attempt to retrieve the first labellable descendant element
			// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
			return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
		};
	
	
		/**
		 * On touch end, determine whether to send a click event at once.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchEnd = function(event) {
			var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;
	
			if (!this.trackingClick) {
				return true;
			}
	
			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				this.cancelNextClick = true;
				return true;
			}
	
			if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
				return true;
			}
	
			// Reset to prevent wrong click cancel on input (issue #156).
			this.cancelNextClick = false;
	
			this.lastClickTime = event.timeStamp;
	
			trackingClickStart = this.trackingClickStart;
			this.trackingClick = false;
			this.trackingClickStart = 0;
	
			// On some iOS devices, the targetElement supplied with the event is invalid if the layer
			// is performing a transition or scroll, and has to be re-detected manually. Note that
			// for this to function correctly, it must be called *after* the event target is checked!
			// See issue #57; also filed as rdar://13048589 .
			if (deviceIsIOSWithBadTarget) {
				touch = event.changedTouches[0];
	
				// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
				targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
				targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
			}
	
			targetTagName = targetElement.tagName.toLowerCase();
			if (targetTagName === 'label') {
				forElement = this.findControl(targetElement);
				if (forElement) {
					this.focus(targetElement);
					if (deviceIsAndroid) {
						return false;
					}
	
					targetElement = forElement;
				}
			} else if (this.needsFocus(targetElement)) {
	
				// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
				// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
				if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
					this.targetElement = null;
					return false;
				}
	
				this.focus(targetElement);
				this.sendClick(targetElement, event);
	
				// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
				// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
				if (!deviceIsIOS || targetTagName !== 'select') {
					this.targetElement = null;
					event.preventDefault();
				}
	
				return false;
			}
	
			if (deviceIsIOS && !deviceIsIOS4) {
	
				// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
				// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
				scrollParent = targetElement.fastClickScrollParent;
				if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
					return true;
				}
			}
	
			// Prevent the actual click from going though - unless the target node is marked as requiring
			// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
			if (!this.needsClick(targetElement)) {
				event.preventDefault();
				this.sendClick(targetElement, event);
			}
	
			return false;
		};
	
	
		/**
		 * On touch cancel, stop tracking the click.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.onTouchCancel = function() {
			this.trackingClick = false;
			this.targetElement = null;
		};
	
	
		/**
		 * Determine mouse events which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onMouse = function(event) {
	
			// If a target element was never set (because a touch event was never fired) allow the event
			if (!this.targetElement) {
				return true;
			}
	
			if (event.forwardedTouchEvent) {
				return true;
			}
	
			// Programmatically generated events targeting a specific element should be permitted
			if (!event.cancelable) {
				return true;
			}
	
			// Derive and check the target element to see whether the mouse event needs to be permitted;
			// unless explicitly enabled, prevent non-touch click events from triggering actions,
			// to prevent ghost/doubleclicks.
			if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
	
				// Prevent any user-added listeners declared on FastClick element from being fired.
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {
	
					// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
					event.propagationStopped = true;
				}
	
				// Cancel the event
				event.stopPropagation();
				event.preventDefault();
	
				return false;
			}
	
			// If the mouse event is permitted, return true for the action to go through.
			return true;
		};
	
	
		/**
		 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
		 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
		 * an actual click which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onClick = function(event) {
			var permitted;
	
			// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
			if (this.trackingClick) {
				this.targetElement = null;
				this.trackingClick = false;
				return true;
			}
	
			// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
			if (event.target.type === 'submit' && event.detail === 0) {
				return true;
			}
	
			permitted = this.onMouse(event);
	
			// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
			if (!permitted) {
				this.targetElement = null;
			}
	
			// If clicks are permitted, return true for the action to go through.
			return permitted;
		};
	
	
		/**
		 * Remove all FastClick's event listeners.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.destroy = function() {
			var layer = this.layer;
	
			if (deviceIsAndroid) {
				layer.removeEventListener('mouseover', this.onMouse, true);
				layer.removeEventListener('mousedown', this.onMouse, true);
				layer.removeEventListener('mouseup', this.onMouse, true);
			}
	
			layer.removeEventListener('click', this.onClick, true);
			layer.removeEventListener('touchstart', this.onTouchStart, false);
			layer.removeEventListener('touchmove', this.onTouchMove, false);
			layer.removeEventListener('touchend', this.onTouchEnd, false);
			layer.removeEventListener('touchcancel', this.onTouchCancel, false);
		};
	
	
		/**
		 * Check whether FastClick is needed.
		 *
		 * @param {Element} layer The layer to listen on
		 */
		FastClick.notNeeded = function(layer) {
			var metaViewport;
			var chromeVersion;
			var blackberryVersion;
			var firefoxVersion;
	
			// Devices that don't support touch don't need FastClick
			if (typeof window.ontouchstart === 'undefined') {
				return true;
			}
	
			// Chrome version - zero for other browsers
			chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
	
			if (chromeVersion) {
	
				if (deviceIsAndroid) {
					metaViewport = document.querySelector('meta[name=viewport]');
	
					if (metaViewport) {
						// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// Chrome 32 and above with width=device-width or less don't need FastClick
						if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
	
				// Chrome desktop doesn't need FastClick (issue #15)
				} else {
					return true;
				}
			}
	
			if (deviceIsBlackBerry10) {
				blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
	
				// BlackBerry 10.3+ does not require Fastclick library.
				// https://github.com/ftlabs/fastclick/issues/251
				if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
					metaViewport = document.querySelector('meta[name=viewport]');
	
					if (metaViewport) {
						// user-scalable=no eliminates click delay.
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// width=device-width (or less than device-width) eliminates click delay.
						if (document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
				}
			}
	
			// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
			if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}
	
			// Firefox version - zero for other browsers
			firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
	
			if (firefoxVersion >= 27) {
				// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896
	
				metaViewport = document.querySelector('meta[name=viewport]');
				if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
					return true;
				}
			}
	
			// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
			// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
			if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}
	
			return false;
		};
	
	
		/**
		 * Factory method for creating a FastClick object
		 *
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		FastClick.attach = function(layer, options) {
			return new FastClick(layer, options);
		};
	
	
		if (true) {
	
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return FastClick;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = FastClick.attach;
			module.exports.FastClick = FastClick;
		} else {
			window.FastClick = FastClick;
		}
	}());


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["Mock"] = factory();
		else
			root["Mock"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	
	
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* global require, module, window */
		var Handler = __webpack_require__(1)
		var Util = __webpack_require__(3)
		var Random = __webpack_require__(5)
		var RE = __webpack_require__(20)
		var toJSONSchema = __webpack_require__(23)
		var valid = __webpack_require__(25)
	
		var XHR
		if (typeof window !== 'undefined') XHR = __webpack_require__(27)
	
		/*!
		    Mock - 模拟请求 & 模拟数据
		    https://github.com/nuysoft/Mock
		    墨智 mozhi.gyy@taobao.com nuysoft@gmail.com
		*/
		var Mock = {
		    Handler: Handler,
		    Random: Random,
		    Util: Util,
		    XHR: XHR,
		    RE: RE,
		    toJSONSchema: toJSONSchema,
		    valid: valid,
		    heredoc: Util.heredoc,
		    setup: function(settings) {
		        return XHR.setup(settings)
		    },
		    _mocked: {}
		}
	
		Mock.version = '1.0.0'
	
		// 避免循环依赖
		if (XHR) XHR.Mock = Mock
	
		/*
		    * Mock.mock( template )
		    * Mock.mock( function() )
		    * Mock.mock( rurl, template )
		    * Mock.mock( rurl, function(options) )
		    * Mock.mock( rurl, rtype, template )
		    * Mock.mock( rurl, rtype, function(options) )
	
		    根据数据模板生成模拟数据。
		*/
		Mock.mock = function(rurl, rtype, template) {
		    // Mock.mock(template)
		    if (arguments.length === 1) {
		        return Handler.gen(rurl)
		    }
		    // Mock.mock(rurl, template)
		    if (arguments.length === 2) {
		        template = rtype
		        rtype = undefined
		    }
		    // 拦截 XHR
		    if (XHR) window.XMLHttpRequest = XHR
		    Mock._mocked[rurl + (rtype || '')] = {
		        rurl: rurl,
		        rtype: rtype,
		        template: template
		    }
		    return Mock
		}
	
		module.exports = Mock
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* 
		    ## Handler
	
		    处理数据模板。
		    
		    * Handler.gen( template, name?, context? )
	
		        入口方法。
	
		    * Data Template Definition, DTD
		        
		        处理数据模板定义。
	
		        * Handler.array( options )
		        * Handler.object( options )
		        * Handler.number( options )
		        * Handler.boolean( options )
		        * Handler.string( options )
		        * Handler.function( options )
		        * Handler.regexp( options )
		        
		        处理路径（相对和绝对）。
	
		        * Handler.getValueByKeyPath( key, options )
	
		    * Data Placeholder Definition, DPD
	
		        处理数据占位符定义
	
		        * Handler.placeholder( placeholder, context, templateContext, options )
	
		*/
	
		var Constant = __webpack_require__(2)
		var Util = __webpack_require__(3)
		var Parser = __webpack_require__(4)
		var Random = __webpack_require__(5)
		var RE = __webpack_require__(20)
	
		var Handler = {
		    extend: Util.extend
		}
	
		/*
		    template        属性值（即数据模板）
		    name            属性名
		    context         数据上下文，生成后的数据
		    templateContext 模板上下文，
	
		    Handle.gen(template, name, options)
		    context
		        currentContext, templateCurrentContext, 
		        path, templatePath
		        root, templateRoot
		*/
		Handler.gen = function(template, name, context) {
		    /* jshint -W041 */
		    name = name == undefined ? '' : (name + '')
	
		    context = context || {}
		    context = {
		            // 当前访问路径，只有属性名，不包括生成规则
		            path: context.path || [Constant.GUID],
		            templatePath: context.templatePath || [Constant.GUID++],
		            // 最终属性值的上下文
		            currentContext: context.currentContext,
		            // 属性值模板的上下文
		            templateCurrentContext: context.templateCurrentContext || template,
		            // 最终值的根
		            root: context.root || context.currentContext,
		            // 模板的根
		            templateRoot: context.templateRoot || context.templateCurrentContext || template
		        }
		        // console.log('path:', context.path.join('.'), template)
	
		    var rule = Parser.parse(name)
		    var type = Util.type(template)
		    var data
	
		    if (Handler[type]) {
		        data = Handler[type]({
		            // 属性值类型
		            type: type,
		            // 属性值模板
		            template: template,
		            // 属性名 + 生成规则
		            name: name,
		            // 属性名
		            parsedName: name ? name.replace(Constant.RE_KEY, '$1') : name,
	
		            // 解析后的生成规则
		            rule: rule,
		            // 相关上下文
		            context: context
		        })
	
		        if (!context.root) context.root = data
		        return data
		    }
	
		    return template
		}
	
		Handler.extend({
		    array: function(options) {
		        var result = [],
		            i, ii;
	
		        // 'name|1': []
		        // 'name|count': []
		        // 'name|min-max': []
		        if (options.template.length === 0) return result
	
		        // 'arr': [{ 'email': '@EMAIL' }, { 'email': '@EMAIL' }]
		        if (!options.rule.parameters) {
		            for (i = 0; i < options.template.length; i++) {
		                options.context.path.push(i)
		                options.context.templatePath.push(i)
		                result.push(
		                    Handler.gen(options.template[i], i, {
		                        path: options.context.path,
		                        templatePath: options.context.templatePath,
		                        currentContext: result,
		                        templateCurrentContext: options.template,
		                        root: options.context.root || result,
		                        templateRoot: options.context.templateRoot || options.template
		                    })
		                )
		                options.context.path.pop()
		                options.context.templatePath.pop()
		            }
		        } else {
		            // 'method|1': ['GET', 'POST', 'HEAD', 'DELETE']
		            if (options.rule.min === 1 && options.rule.max === undefined) {
		                // fix #17
		                options.context.path.push(options.name)
		                options.context.templatePath.push(options.name)
		                result = Random.pick(
		                    Handler.gen(options.template, undefined, {
		                        path: options.context.path,
		                        templatePath: options.context.templatePath,
		                        currentContext: result,
		                        templateCurrentContext: options.template,
		                        root: options.context.root || result,
		                        templateRoot: options.context.templateRoot || options.template
		                    })
		                )
		                options.context.path.pop()
		                options.context.templatePath.pop()
		            } else {
		                // 'data|+1': [{}, {}]
		                if (options.rule.parameters[2]) {
		                    options.template.__order_index = options.template.__order_index || 0
	
		                    options.context.path.push(options.name)
		                    options.context.templatePath.push(options.name)
		                    result = Handler.gen(options.template, undefined, {
		                        path: options.context.path,
		                        templatePath: options.context.templatePath,
		                        currentContext: result,
		                        templateCurrentContext: options.template,
		                        root: options.context.root || result,
		                        templateRoot: options.context.templateRoot || options.template
		                    })[
		                        options.template.__order_index % options.template.length
		                    ]
	
		                    options.template.__order_index += +options.rule.parameters[2]
	
		                    options.context.path.pop()
		                    options.context.templatePath.pop()
	
		                } else {
		                    // 'data|1-10': [{}]
		                    for (i = 0; i < options.rule.count; i++) {
		                        // 'data|1-10': [{}, {}]
		                        for (ii = 0; ii < options.template.length; ii++) {
		                            options.context.path.push(result.length)
		                            options.context.templatePath.push(ii)
		                            result.push(
		                                Handler.gen(options.template[ii], result.length, {
		                                    path: options.context.path,
		                                    templatePath: options.context.templatePath,
		                                    currentContext: result,
		                                    templateCurrentContext: options.template,
		                                    root: options.context.root || result,
		                                    templateRoot: options.context.templateRoot || options.template
		                                })
		                            )
		                            options.context.path.pop()
		                            options.context.templatePath.pop()
		                        }
		                    }
		                }
		            }
		        }
		        return result
		    },
		    object: function(options) {
		        var result = {},
		            keys, fnKeys, key, parsedKey, inc, i;
	
		        // 'obj|min-max': {}
		        /* jshint -W041 */
		        if (options.rule.min != undefined) {
		            keys = Util.keys(options.template)
		            keys = Random.shuffle(keys)
		            keys = keys.slice(0, options.rule.count)
		            for (i = 0; i < keys.length; i++) {
		                key = keys[i]
		                parsedKey = key.replace(Constant.RE_KEY, '$1')
		                options.context.path.push(parsedKey)
		                options.context.templatePath.push(key)
		                result[parsedKey] = Handler.gen(options.template[key], key, {
		                    path: options.context.path,
		                    templatePath: options.context.templatePath,
		                    currentContext: result,
		                    templateCurrentContext: options.template,
		                    root: options.context.root || result,
		                    templateRoot: options.context.templateRoot || options.template
		                })
		                options.context.path.pop()
		                options.context.templatePath.pop()
		            }
	
		        } else {
		            // 'obj': {}
		            keys = []
		            fnKeys = [] // #25 改变了非函数属性的顺序，查找起来不方便
		            for (key in options.template) {
		                (typeof options.template[key] === 'function' ? fnKeys : keys).push(key)
		            }
		            keys = keys.concat(fnKeys)
	
		            /*
		                会改变非函数属性的顺序
		                keys = Util.keys(options.template)
		                keys.sort(function(a, b) {
		                    var afn = typeof options.template[a] === 'function'
		                    var bfn = typeof options.template[b] === 'function'
		                    if (afn === bfn) return 0
		                    if (afn && !bfn) return 1
		                    if (!afn && bfn) return -1
		                })
		            */
	
		            for (i = 0; i < keys.length; i++) {
		                key = keys[i]
		                parsedKey = key.replace(Constant.RE_KEY, '$1')
		                options.context.path.push(parsedKey)
		                options.context.templatePath.push(key)
		                result[parsedKey] = Handler.gen(options.template[key], key, {
		                    path: options.context.path,
		                    templatePath: options.context.templatePath,
		                    currentContext: result,
		                    templateCurrentContext: options.template,
		                    root: options.context.root || result,
		                    templateRoot: options.context.templateRoot || options.template
		                })
		                options.context.path.pop()
		                options.context.templatePath.pop()
		                    // 'id|+1': 1
		                inc = key.match(Constant.RE_KEY)
		                if (inc && inc[2] && Util.type(options.template[key]) === 'number') {
		                    options.template[key] += parseInt(inc[2], 10)
		                }
		            }
		        }
		        return result
		    },
		    number: function(options) {
		        var result, parts;
		        if (options.rule.decimal) { // float
		            options.template += ''
		            parts = options.template.split('.')
		                // 'float1|.1-10': 10,
		                // 'float2|1-100.1-10': 1,
		                // 'float3|999.1-10': 1,
		                // 'float4|.3-10': 123.123,
		            parts[0] = options.rule.range ? options.rule.count : parts[0]
		            parts[1] = (parts[1] || '').slice(0, options.rule.dcount)
		            while (parts[1].length < options.rule.dcount) {
		                parts[1] += (
		                    // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
		                    (parts[1].length < options.rule.dcount - 1) ? Random.character('number') : Random.character('123456789')
		                )
		            }
		            result = parseFloat(parts.join('.'), 10)
		        } else { // integer
		            // 'grade1|1-100': 1,
		            result = options.rule.range && !options.rule.parameters[2] ? options.rule.count : options.template
		        }
		        return result
		    },
		    boolean: function(options) {
		        var result;
		        // 'prop|multiple': false, 当前值是相反值的概率倍数
		        // 'prop|probability-probability': false, 当前值与相反值的概率
		        result = options.rule.parameters ? Random.bool(options.rule.min, options.rule.max, options.template) : options.template
		        return result
		    },
		    string: function(options) {
		        var result = '',
		            i, placeholders, ph, phed;
		        if (options.template.length) {
	
		            //  'foo': '★',
		            /* jshint -W041 */
		            if (options.rule.count == undefined) {
		                result += options.template
		            }
	
		            // 'star|1-5': '★',
		            for (i = 0; i < options.rule.count; i++) {
		                result += options.template
		            }
		            // 'email|1-10': '@EMAIL, ',
		            placeholders = result.match(Constant.RE_PLACEHOLDER) || [] // A-Z_0-9 > \w_
		            for (i = 0; i < placeholders.length; i++) {
		                ph = placeholders[i]
	
		                // 遇到转义斜杠，不需要解析占位符
		                if (/^\\/.test(ph)) {
		                    placeholders.splice(i--, 1)
		                    continue
		                }
	
		                phed = Handler.placeholder(ph, options.context.currentContext, options.context.templateCurrentContext, options)
	
		                // 只有一个占位符，并且没有其他字符
		                if (placeholders.length === 1 && ph === result && typeof phed !== typeof result) { // 
		                    result = phed
		                    break
	
		                    if (Util.isNumeric(phed)) {
		                        result = parseFloat(phed, 10)
		                        break
		                    }
		                    if (/^(true|false)$/.test(phed)) {
		                        result = phed === 'true' ? true :
		                            phed === 'false' ? false :
		                            phed // 已经是布尔值
		                        break
		                    }
		                }
		                result = result.replace(ph, phed)
		            }
	
		        } else {
		            // 'ASCII|1-10': '',
		            // 'ASCII': '',
		            result = options.rule.range ? Random.string(options.rule.count) : options.template
		        }
		        return result
		    },
		    'function': function(options) {
		        // ( context, options )
		        return options.template.call(options.context.currentContext, options)
		    },
		    'regexp': function(options) {
		        // regexp.source
		        var source = options.template.source
	
		        // 'name|1-5': /regexp/,
		        for (var i = 0; i < options.rule.count; i++) {
		            source += options.template.source
		        }
	
		        return RE.Handler.gen(
		            RE.Parser.parse(
		                source
		            )
		        )
		    }
		})
	
		Handler.extend({
		    _all: function() {
		        var re = {};
		        for (var key in Random) re[key.toLowerCase()] = key
		        return re
		    },
		    // 处理占位符，转换为最终值
		    placeholder: function(placeholder, obj, templateContext, options) {
		        // console.log(options.context.path)
		        // 1 key, 2 params
		        Constant.RE_PLACEHOLDER.exec('')
		        var parts = Constant.RE_PLACEHOLDER.exec(placeholder),
		            key = parts && parts[1],
		            lkey = key && key.toLowerCase(),
		            okey = this._all()[lkey],
		            params = parts && parts[2] || ''
		        var pathParts = this.splitPathToArray(key)
	
		        // 解析占位符的参数
		        try {
		            // 1. 尝试保持参数的类型
		            /*
		                #24 [Window Firefox 30.0 引用 占位符 抛错](https://github.com/nuysoft/Mock/issues/24)
		                [BX9056: 各浏览器下 window.eval 方法的执行上下文存在差异](http://www.w3help.org/zh-cn/causes/BX9056)
		                应该属于 Window Firefox 30.0 的 BUG
		            */
		            /* jshint -W061 */
		            params = eval('(function(){ return [].splice.call(arguments, 0 ) })(' + params + ')')
		        } catch (error) {
		            // 2. 如果失败，只能解析为字符串
		            // console.error(error)
		            // if (error instanceof ReferenceError) params = parts[2].split(/,\s*/);
		            // else throw error
		            params = parts[2].split(/,\s*/)
		        }
	
		        // 占位符优先引用数据模板中的属性
		        if (obj && (key in obj)) return obj[key]
	
		        // @index @key
		        // if (Constant.RE_INDEX.test(key)) return +options.name
		        // if (Constant.RE_KEY.test(key)) return options.name
	
		        // 绝对路径 or 相对路径
		        if (
		            key.charAt(0) === '/' ||
		            pathParts.length > 1
		        ) return this.getValueByKeyPath(key, options)
	
		        // 递归引用数据模板中的属性
		        if (templateContext &&
		            (typeof templateContext === 'object') &&
		            (key in templateContext) &&
		            (placeholder !== templateContext[key]) // fix #15 避免自己依赖自己
		        ) {
		            // 先计算被引用的属性值
		            templateContext[key] = Handler.gen(templateContext[key], key, {
		                currentContext: obj,
		                templateCurrentContext: templateContext
		            })
		            return templateContext[key]
		        }
	
		        // 如果未找到，则原样返回
		        if (!(key in Random) && !(lkey in Random) && !(okey in Random)) return placeholder
	
		        // 递归解析参数中的占位符
		        for (var i = 0; i < params.length; i++) {
		            Constant.RE_PLACEHOLDER.exec('')
		            if (Constant.RE_PLACEHOLDER.test(params[i])) {
		                params[i] = Handler.placeholder(params[i], obj, templateContext, options)
		            }
		        }
	
		        var handle = Random[key] || Random[lkey] || Random[okey]
		        switch (Util.type(handle)) {
		            case 'array':
		                // 自动从数组中取一个，例如 @areas
		                return Random.pick(handle)
		            case 'function':
		                // 执行占位符方法（大多数情况）
		                handle.options = options
		                var re = handle.apply(Random, params)
		                if (re === undefined) re = '' // 因为是在字符串中，所以默认为空字符串。
		                delete handle.options
		                return re
		        }
		    },
		    getValueByKeyPath: function(key, options) {
		        var originalKey = key
		        var keyPathParts = this.splitPathToArray(key)
		        var absolutePathParts = []
	
		        // 绝对路径
		        if (key.charAt(0) === '/') {
		            absolutePathParts = [options.context.path[0]].concat(
		                this.normalizePath(keyPathParts)
		            )
		        } else {
		            // 相对路径
		            if (keyPathParts.length > 1) {
		                absolutePathParts = options.context.path.slice(0)
		                absolutePathParts.pop()
		                absolutePathParts = this.normalizePath(
		                    absolutePathParts.concat(keyPathParts)
		                )
	
		            }
		        }
	
		        key = keyPathParts[keyPathParts.length - 1]
		        var currentContext = options.context.root
		        var templateCurrentContext = options.context.templateRoot
		        for (var i = 1; i < absolutePathParts.length - 1; i++) {
		            currentContext = currentContext[absolutePathParts[i]]
		            templateCurrentContext = templateCurrentContext[absolutePathParts[i]]
		        }
		        // 引用的值已经计算好
		        if (currentContext && (key in currentContext)) return currentContext[key]
	
		        // 尚未计算，递归引用数据模板中的属性
		        if (templateCurrentContext &&
		            (typeof templateCurrentContext === 'object') &&
		            (key in templateCurrentContext) &&
		            (originalKey !== templateCurrentContext[key]) // fix #15 避免自己依赖自己
		        ) {
		            // 先计算被引用的属性值
		            templateCurrentContext[key] = Handler.gen(templateCurrentContext[key], key, {
		                currentContext: currentContext,
		                templateCurrentContext: templateCurrentContext
		            })
		            return templateCurrentContext[key]
		        }
		    },
		    // https://github.com/kissyteam/kissy/blob/master/src/path/src/path.js
		    normalizePath: function(pathParts) {
		        var newPathParts = []
		        for (var i = 0; i < pathParts.length; i++) {
		            switch (pathParts[i]) {
		                case '..':
		                    newPathParts.pop()
		                    break
		                case '.':
		                    break
		                default:
		                    newPathParts.push(pathParts[i])
		            }
		        }
		        return newPathParts
		    },
		    splitPathToArray: function(path) {
		        var parts = path.split(/\/+/);
		        if (!parts[parts.length - 1]) parts = parts.slice(0, -1)
		        if (!parts[0]) parts = parts.slice(1)
		        return parts;
		    }
		})
	
		module.exports = Handler
	
	/***/ },
	/* 2 */
	/***/ function(module, exports) {
	
		/*
		    ## Constant
	
		    常量集合。
		 */
		/*
		    RE_KEY
		        'name|min-max': value
		        'name|count': value
		        'name|min-max.dmin-dmax': value
		        'name|min-max.dcount': value
		        'name|count.dmin-dmax': value
		        'name|count.dcount': value
		        'name|+step': value
	
		        1 name, 2 step, 3 range [ min, max ], 4 drange [ dmin, dmax ]
	
		    RE_PLACEHOLDER
		        placeholder(*)
	
		    [正则查看工具](http://www.regexper.com/)
	
		    #26 生成规则 支持 负数，例如 number|-100-100
		*/
		module.exports = {
		    GUID: 1,
		    RE_KEY: /(.+)\|(?:\+(\d+)|([\+\-]?\d+-?[\+\-]?\d*)?(?:\.(\d+-?\d*))?)/,
		    RE_RANGE: /([\+\-]?\d+)-?([\+\-]?\d+)?/,
		    RE_PLACEHOLDER: /\\*@([^@#%&()\?\s]+)(?:\((.*?)\))?/g
		    // /\\*@([^@#%&()\?\s\/\.]+)(?:\((.*?)\))?/g
		    // RE_INDEX: /^index$/,
		    // RE_KEY: /^key$/
		}
	
	/***/ },
	/* 3 */
	/***/ function(module, exports) {
	
		/*
		    ## Utilities
		*/
		var Util = {}
	
		Util.extend = function extend() {
		    var target = arguments[0] || {},
		        i = 1,
		        length = arguments.length,
		        options, name, src, copy, clone
	
		    if (length === 1) {
		        target = this
		        i = 0
		    }
	
		    for (; i < length; i++) {
		        options = arguments[i]
		        if (!options) continue
	
		        for (name in options) {
		            src = target[name]
		            copy = options[name]
	
		            if (target === copy) continue
		            if (copy === undefined) continue
	
		            if (Util.isArray(copy) || Util.isObject(copy)) {
		                if (Util.isArray(copy)) clone = src && Util.isArray(src) ? src : []
		                if (Util.isObject(copy)) clone = src && Util.isObject(src) ? src : {}
	
		                target[name] = Util.extend(clone, copy)
		            } else {
		                target[name] = copy
		            }
		        }
		    }
	
		    return target
		}
	
		Util.each = function each(obj, iterator, context) {
		    var i, key
		    if (this.type(obj) === 'number') {
		        for (i = 0; i < obj; i++) {
		            iterator(i, i)
		        }
		    } else if (obj.length === +obj.length) {
		        for (i = 0; i < obj.length; i++) {
		            if (iterator.call(context, obj[i], i, obj) === false) break
		        }
		    } else {
		        for (key in obj) {
		            if (iterator.call(context, obj[key], key, obj) === false) break
		        }
		    }
		}
	
		Util.type = function type(obj) {
		    return (obj === null || obj === undefined) ? String(obj) : Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1].toLowerCase()
		}
	
		Util.each('String Object Array RegExp Function'.split(' '), function(value) {
		    Util['is' + value] = function(obj) {
		        return Util.type(obj) === value.toLowerCase()
		    }
		})
	
		Util.isObjectOrArray = function(value) {
		    return Util.isObject(value) || Util.isArray(value)
		}
	
		Util.isNumeric = function(value) {
		    return !isNaN(parseFloat(value)) && isFinite(value)
		}
	
		Util.keys = function(obj) {
		    var keys = [];
		    for (var key in obj) {
		        if (obj.hasOwnProperty(key)) keys.push(key)
		    }
		    return keys;
		}
		Util.values = function(obj) {
		    var values = [];
		    for (var key in obj) {
		        if (obj.hasOwnProperty(key)) values.push(obj[key])
		    }
		    return values;
		}
	
		/*
		    ### Mock.heredoc(fn)
	
		    * Mock.heredoc(fn)
	
		    以直观、安全的方式书写（多行）HTML 模板。
	
		    **使用示例**如下所示：
	
		        var tpl = Mock.heredoc(function() {
		            /*!
		        {{email}}{{age}}
		        <!-- Mock { 
		            email: '@EMAIL',
		            age: '@INT(1,100)'
		        } -->
		            *\/
		        })
		    
		    **相关阅读**
		    * [Creating multiline strings in JavaScript](http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript)、
		*/
		Util.heredoc = function heredoc(fn) {
		    // 1. 移除起始的 function(){ /*!
		    // 2. 移除末尾的 */ }
		    // 3. 移除起始和末尾的空格
		    return fn.toString()
		        .replace(/^[^\/]+\/\*!?/, '')
		        .replace(/\*\/[^\/]+$/, '')
		        .replace(/^[\s\xA0]+/, '').replace(/[\s\xA0]+$/, '') // .trim()
		}
	
		Util.noop = function() {}
	
		module.exports = Util
	
	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {
	
		/*
			## Parser
	
			解析数据模板（属性名部分）。
	
			* Parser.parse( name )
				
				```json
				{
					parameters: [ name, inc, range, decimal ],
					rnage: [ min , max ],
	
					min: min,
					max: max,
					count : count,
	
					decimal: decimal,
					dmin: dmin,
					dmax: dmax,
					dcount: dcount
				}
				```
		 */
	
		var Constant = __webpack_require__(2)
		var Random = __webpack_require__(5)
	
		/* jshint -W041 */
		module.exports = {
			parse: function(name) {
				name = name == undefined ? '' : (name + '')
	
				var parameters = (name || '').match(Constant.RE_KEY)
	
				var range = parameters && parameters[3] && parameters[3].match(Constant.RE_RANGE)
				var min = range && range[1] && parseInt(range[1], 10) // || 1
				var max = range && range[2] && parseInt(range[2], 10) // || 1
					// repeat || min-max || 1
					// var count = range ? !range[2] && parseInt(range[1], 10) || Random.integer(min, max) : 1
				var count = range ? !range[2] ? parseInt(range[1], 10) : Random.integer(min, max) : undefined
	
				var decimal = parameters && parameters[4] && parameters[4].match(Constant.RE_RANGE)
				var dmin = decimal && parseInt(decimal[1], 10) // || 0,
				var dmax = decimal && parseInt(decimal[2], 10) // || 0,
					// int || dmin-dmax || 0
				var dcount = decimal ? !decimal[2] && parseInt(decimal[1], 10) || Random.integer(dmin, dmax) : undefined
	
				var result = {
					// 1 name, 2 inc, 3 range, 4 decimal
					parameters: parameters,
					// 1 min, 2 max
					range: range,
					min: min,
					max: max,
					// min-max
					count: count,
					// 是否有 decimal
					decimal: decimal,
					dmin: dmin,
					dmax: dmax,
					// dmin-dimax
					dcount: dcount
				}
	
				for (var r in result) {
					if (result[r] != undefined) return result
				}
	
				return {}
			}
		}
	
	/***/ },
	/* 5 */
	/***/ function(module, exports, __webpack_require__) {
	
		/*
		    ## Mock.Random
		    
		    工具类，用于生成各种随机数据。
		*/
	
		var Util = __webpack_require__(3)
	
		var Random = {
		    extend: Util.extend
		}
	
		Random.extend(__webpack_require__(6))
		Random.extend(__webpack_require__(7))
		Random.extend(__webpack_require__(8))
		Random.extend(__webpack_require__(10))
		Random.extend(__webpack_require__(13))
		Random.extend(__webpack_require__(15))
		Random.extend(__webpack_require__(16))
		Random.extend(__webpack_require__(17))
		Random.extend(__webpack_require__(14))
		Random.extend(__webpack_require__(19))
	
		module.exports = Random
	
	/***/ },
	/* 6 */
	/***/ function(module, exports) {
	
		/*
		    ## Basics
		*/
		module.exports = {
		    // 返回一个随机的布尔值。
		    boolean: function(min, max, cur) {
		        if (cur !== undefined) {
		            min = typeof min !== 'undefined' && !isNaN(min) ? parseInt(min, 10) : 1
		            max = typeof max !== 'undefined' && !isNaN(max) ? parseInt(max, 10) : 1
		            return Math.random() > 1.0 / (min + max) * min ? !cur : cur
		        }
	
		        return Math.random() >= 0.5
		    },
		    bool: function(min, max, cur) {
		        return this.boolean(min, max, cur)
		    },
		    // 返回一个随机的自然数（大于等于 0 的整数）。
		    natural: function(min, max) {
		        min = typeof min !== 'undefined' ? parseInt(min, 10) : 0
		        max = typeof max !== 'undefined' ? parseInt(max, 10) : 9007199254740992 // 2^53
		        return Math.round(Math.random() * (max - min)) + min
		    },
		    // 返回一个随机的整数。
		    integer: function(min, max) {
		        min = typeof min !== 'undefined' ? parseInt(min, 10) : -9007199254740992
		        max = typeof max !== 'undefined' ? parseInt(max, 10) : 9007199254740992 // 2^53
		        return Math.round(Math.random() * (max - min)) + min
		    },
		    int: function(min, max) {
		        return this.integer(min, max)
		    },
		    // 返回一个随机的浮点数。
		    float: function(min, max, dmin, dmax) {
		        dmin = dmin === undefined ? 0 : dmin
		        dmin = Math.max(Math.min(dmin, 17), 0)
		        dmax = dmax === undefined ? 17 : dmax
		        dmax = Math.max(Math.min(dmax, 17), 0)
		        var ret = this.integer(min, max) + '.';
		        for (var i = 0, dcount = this.natural(dmin, dmax); i < dcount; i++) {
		            ret += (
		                // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
		                (i < dcount - 1) ? this.character('number') : this.character('123456789')
		            )
		        }
		        return parseFloat(ret, 10)
		    },
		    // 返回一个随机字符。
		    character: function(pool) {
		        var pools = {
		            lower: 'abcdefghijklmnopqrstuvwxyz',
		            upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		            number: '0123456789',
		            symbol: '!@#$%^&*()[]'
		        }
		        pools.alpha = pools.lower + pools.upper
		        pools['undefined'] = pools.lower + pools.upper + pools.number + pools.symbol
	
		        pool = pools[('' + pool).toLowerCase()] || pool
		        return pool.charAt(this.natural(0, pool.length - 1))
		    },
		    char: function(pool) {
		        return this.character(pool)
		    },
		    // 返回一个随机字符串。
		    string: function(pool, min, max) {
		        var len
		        switch (arguments.length) {
		            case 0: // ()
		                len = this.natural(3, 7)
		                break
		            case 1: // ( length )
		                len = pool
		                pool = undefined
		                break
		            case 2:
		                // ( pool, length )
		                if (typeof arguments[0] === 'string') {
		                    len = min
		                } else {
		                    // ( min, max )
		                    len = this.natural(pool, min)
		                    pool = undefined
		                }
		                break
		            case 3:
		                len = this.natural(min, max)
		                break
		        }
	
		        var text = ''
		        for (var i = 0; i < len; i++) {
		            text += this.character(pool)
		        }
	
		        return text
		    },
		    str: function( /*pool, min, max*/ ) {
		        return this.string.apply(this, arguments)
		    },
		    // 返回一个整型数组。
		    range: function(start, stop, step) {
		        // range( stop )
		        if (arguments.length <= 1) {
		            stop = start || 0;
		            start = 0;
		        }
		        // range( start, stop )
		        step = arguments[2] || 1;
	
		        start = +start
		        stop = +stop
		        step = +step
	
		        var len = Math.max(Math.ceil((stop - start) / step), 0);
		        var idx = 0;
		        var range = new Array(len);
	
		        while (idx < len) {
		            range[idx++] = start;
		            start += step;
		        }
	
		        return range;
		    }
		}
	
	/***/ },
	/* 7 */
	/***/ function(module, exports) {
	
		/*
		    ## Date
		*/
		var patternLetters = {
		    yyyy: 'getFullYear',
		    yy: function(date) {
		        return ('' + date.getFullYear()).slice(2)
		    },
		    y: 'yy',
	
		    MM: function(date) {
		        var m = date.getMonth() + 1
		        return m < 10 ? '0' + m : m
		    },
		    M: function(date) {
		        return date.getMonth() + 1
		    },
	
		    dd: function(date) {
		        var d = date.getDate()
		        return d < 10 ? '0' + d : d
		    },
		    d: 'getDate',
	
		    HH: function(date) {
		        var h = date.getHours()
		        return h < 10 ? '0' + h : h
		    },
		    H: 'getHours',
		    hh: function(date) {
		        var h = date.getHours() % 12
		        return h < 10 ? '0' + h : h
		    },
		    h: function(date) {
		        return date.getHours() % 12
		    },
	
		    mm: function(date) {
		        var m = date.getMinutes()
		        return m < 10 ? '0' + m : m
		    },
		    m: 'getMinutes',
	
		    ss: function(date) {
		        var s = date.getSeconds()
		        return s < 10 ? '0' + s : s
		    },
		    s: 'getSeconds',
	
		    SS: function(date) {
		        var ms = date.getMilliseconds()
		        return ms < 10 && '00' + ms || ms < 100 && '0' + ms || ms
		    },
		    S: 'getMilliseconds',
	
		    A: function(date) {
		        return date.getHours() < 12 ? 'AM' : 'PM'
		    },
		    a: function(date) {
		        return date.getHours() < 12 ? 'am' : 'pm'
		    },
		    T: 'getTime'
		}
		module.exports = {
		    // 日期占位符集合。
		    _patternLetters: patternLetters,
		    // 日期占位符正则。
		    _rformat: new RegExp((function() {
		        var re = []
		        for (var i in patternLetters) re.push(i)
		        return '(' + re.join('|') + ')'
		    })(), 'g'),
		    // 格式化日期。
		    _formatDate: function(date, format) {
		        return format.replace(this._rformat, function creatNewSubString($0, flag) {
		            return typeof patternLetters[flag] === 'function' ? patternLetters[flag](date) :
		                patternLetters[flag] in patternLetters ? creatNewSubString($0, patternLetters[flag]) :
		                date[patternLetters[flag]]()
		        })
		    },
		    // 生成一个随机的 Date 对象。
		    _randomDate: function(min, max) { // min, max
		        min = min === undefined ? new Date(0) : min
		        max = max === undefined ? new Date() : max
		        return new Date(Math.random() * (max.getTime() - min.getTime()))
		    },
		    // 返回一个随机的日期字符串。
		    date: function(format) {
		        format = format || 'yyyy-MM-dd'
		        return this._formatDate(this._randomDate(), format)
		    },
		    // 返回一个随机的时间字符串。
		    time: function(format) {
		        format = format || 'HH:mm:ss'
		        return this._formatDate(this._randomDate(), format)
		    },
		    // 返回一个随机的日期和时间字符串。
		    datetime: function(format) {
		        format = format || 'yyyy-MM-dd HH:mm:ss'
		        return this._formatDate(this._randomDate(), format)
		    },
		    // 返回当前的日期和时间字符串。
		    now: function(unit, format) {
		        // now(unit) now(format)
		        if (arguments.length === 1) {
		            // now(format)
		            if (!/year|month|day|hour|minute|second|week/.test(unit)) {
		                format = unit
		                unit = ''
		            }
		        }
		        unit = (unit || '').toLowerCase()
		        format = format || 'yyyy-MM-dd HH:mm:ss'
	
		        var date = new Date()
	
		        /* jshint -W086 */
		        // 参考自 http://momentjs.cn/docs/#/manipulating/start-of/
		        switch (unit) {
		            case 'year':
		                date.setMonth(0)
		            case 'month':
		                date.setDate(1)
		            case 'week':
		            case 'day':
		                date.setHours(0)
		            case 'hour':
		                date.setMinutes(0)
		            case 'minute':
		                date.setSeconds(0)
		            case 'second':
		                date.setMilliseconds(0)
		        }
		        switch (unit) {
		            case 'week':
		                date.setDate(date.getDate() - date.getDay())
		        }
	
		        return this._formatDate(date, format)
		    }
		}
	
	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(module) {/* global document  */
		/*
		    ## Image
		*/
		module.exports = {
		    // 常见的广告宽高
		    _adSize: [
		        '300x250', '250x250', '240x400', '336x280', '180x150',
		        '720x300', '468x60', '234x60', '88x31', '120x90',
		        '120x60', '120x240', '125x125', '728x90', '160x600',
		        '120x600', '300x600'
		    ],
		    // 常见的屏幕宽高
		    _screenSize: [
		        '320x200', '320x240', '640x480', '800x480', '800x480',
		        '1024x600', '1024x768', '1280x800', '1440x900', '1920x1200',
		        '2560x1600'
		    ],
		    // 常见的视频宽高
		    _videoSize: ['720x480', '768x576', '1280x720', '1920x1080'],
		    /*
		        生成一个随机的图片地址。
	
		        替代图片源
		            http://fpoimg.com/
		        参考自 
		            http://rensanning.iteye.com/blog/1933310
		            http://code.tutsplus.com/articles/the-top-8-placeholders-for-web-designers--net-19485
		    */
		    image: function(size, background, foreground, format, text) {
		        // Random.image( size, background, foreground, text )
		        if (arguments.length === 4) {
		            text = format
		            format = undefined
		        }
		        // Random.image( size, background, text )
		        if (arguments.length === 3) {
		            text = foreground
		            foreground = undefined
		        }
		        // Random.image()
		        if (!size) size = this.pick(this._adSize)
	
		        if (background && ~background.indexOf('#')) background = background.slice(1)
		        if (foreground && ~foreground.indexOf('#')) foreground = foreground.slice(1)
	
		        // http://dummyimage.com/600x400/cc00cc/470047.png&text=hello
		        return 'http://dummyimage.com/' + size +
		            (background ? '/' + background : '') +
		            (foreground ? '/' + foreground : '') +
		            (format ? '.' + format : '') +
		            (text ? '&text=' + text : '')
		    },
		    img: function() {
		        return this.image.apply(this, arguments)
		    },
	
		    /*
		        BrandColors
		        http://brandcolors.net/
		        A collection of major brand color codes curated by Galen Gidman.
		        大牌公司的颜色集合
	
		        // 获取品牌和颜色
		        $('h2').each(function(index, item){
		            item = $(item)
		            console.log('\'' + item.text() + '\'', ':', '\'' + item.next().text() + '\'', ',')
		        })
		    */
		    _brandColors: {
		        '4ormat': '#fb0a2a',
		        '500px': '#02adea',
		        'About.me (blue)': '#00405d',
		        'About.me (yellow)': '#ffcc33',
		        'Addvocate': '#ff6138',
		        'Adobe': '#ff0000',
		        'Aim': '#fcd20b',
		        'Amazon': '#e47911',
		        'Android': '#a4c639',
		        'Angie\'s List': '#7fbb00',
		        'AOL': '#0060a3',
		        'Atlassian': '#003366',
		        'Behance': '#053eff',
		        'Big Cartel': '#97b538',
		        'bitly': '#ee6123',
		        'Blogger': '#fc4f08',
		        'Boeing': '#0039a6',
		        'Booking.com': '#003580',
		        'Carbonmade': '#613854',
		        'Cheddar': '#ff7243',
		        'Code School': '#3d4944',
		        'Delicious': '#205cc0',
		        'Dell': '#3287c1',
		        'Designmoo': '#e54a4f',
		        'Deviantart': '#4e6252',
		        'Designer News': '#2d72da',
		        'Devour': '#fd0001',
		        'DEWALT': '#febd17',
		        'Disqus (blue)': '#59a3fc',
		        'Disqus (orange)': '#db7132',
		        'Dribbble': '#ea4c89',
		        'Dropbox': '#3d9ae8',
		        'Drupal': '#0c76ab',
		        'Dunked': '#2a323a',
		        'eBay': '#89c507',
		        'Ember': '#f05e1b',
		        'Engadget': '#00bdf6',
		        'Envato': '#528036',
		        'Etsy': '#eb6d20',
		        'Evernote': '#5ba525',
		        'Fab.com': '#dd0017',
		        'Facebook': '#3b5998',
		        'Firefox': '#e66000',
		        'Flickr (blue)': '#0063dc',
		        'Flickr (pink)': '#ff0084',
		        'Forrst': '#5b9a68',
		        'Foursquare': '#25a0ca',
		        'Garmin': '#007cc3',
		        'GetGlue': '#2d75a2',
		        'Gimmebar': '#f70078',
		        'GitHub': '#171515',
		        'Google Blue': '#0140ca',
		        'Google Green': '#16a61e',
		        'Google Red': '#dd1812',
		        'Google Yellow': '#fcca03',
		        'Google+': '#dd4b39',
		        'Grooveshark': '#f77f00',
		        'Groupon': '#82b548',
		        'Hacker News': '#ff6600',
		        'HelloWallet': '#0085ca',
		        'Heroku (light)': '#c7c5e6',
		        'Heroku (dark)': '#6567a5',
		        'HootSuite': '#003366',
		        'Houzz': '#73ba37',
		        'HTML5': '#ec6231',
		        'IKEA': '#ffcc33',
		        'IMDb': '#f3ce13',
		        'Instagram': '#3f729b',
		        'Intel': '#0071c5',
		        'Intuit': '#365ebf',
		        'Kickstarter': '#76cc1e',
		        'kippt': '#e03500',
		        'Kodery': '#00af81',
		        'LastFM': '#c3000d',
		        'LinkedIn': '#0e76a8',
		        'Livestream': '#cf0005',
		        'Lumo': '#576396',
		        'Mixpanel': '#a086d3',
		        'Meetup': '#e51937',
		        'Nokia': '#183693',
		        'NVIDIA': '#76b900',
		        'Opera': '#cc0f16',
		        'Path': '#e41f11',
		        'PayPal (dark)': '#1e477a',
		        'PayPal (light)': '#3b7bbf',
		        'Pinboard': '#0000e6',
		        'Pinterest': '#c8232c',
		        'PlayStation': '#665cbe',
		        'Pocket': '#ee4056',
		        'Prezi': '#318bff',
		        'Pusha': '#0f71b4',
		        'Quora': '#a82400',
		        'QUOTE.fm': '#66ceff',
		        'Rdio': '#008fd5',
		        'Readability': '#9c0000',
		        'Red Hat': '#cc0000',
		        'Resource': '#7eb400',
		        'Rockpack': '#0ba6ab',
		        'Roon': '#62b0d9',
		        'RSS': '#ee802f',
		        'Salesforce': '#1798c1',
		        'Samsung': '#0c4da2',
		        'Shopify': '#96bf48',
		        'Skype': '#00aff0',
		        'Snagajob': '#f47a20',
		        'Softonic': '#008ace',
		        'SoundCloud': '#ff7700',
		        'Space Box': '#f86960',
		        'Spotify': '#81b71a',
		        'Sprint': '#fee100',
		        'Squarespace': '#121212',
		        'StackOverflow': '#ef8236',
		        'Staples': '#cc0000',
		        'Status Chart': '#d7584f',
		        'Stripe': '#008cdd',
		        'StudyBlue': '#00afe1',
		        'StumbleUpon': '#f74425',
		        'T-Mobile': '#ea0a8e',
		        'Technorati': '#40a800',
		        'The Next Web': '#ef4423',
		        'Treehouse': '#5cb868',
		        'Trulia': '#5eab1f',
		        'Tumblr': '#34526f',
		        'Twitch.tv': '#6441a5',
		        'Twitter': '#00acee',
		        'TYPO3': '#ff8700',
		        'Ubuntu': '#dd4814',
		        'Ustream': '#3388ff',
		        'Verizon': '#ef1d1d',
		        'Vimeo': '#86c9ef',
		        'Vine': '#00a478',
		        'Virb': '#06afd8',
		        'Virgin Media': '#cc0000',
		        'Wooga': '#5b009c',
		        'WordPress (blue)': '#21759b',
		        'WordPress (orange)': '#d54e21',
		        'WordPress (grey)': '#464646',
		        'Wunderlist': '#2b88d9',
		        'XBOX': '#9bc848',
		        'XING': '#126567',
		        'Yahoo!': '#720e9e',
		        'Yandex': '#ffcc00',
		        'Yelp': '#c41200',
		        'YouTube': '#c4302b',
		        'Zalongo': '#5498dc',
		        'Zendesk': '#78a300',
		        'Zerply': '#9dcc7a',
		        'Zootool': '#5e8b1d'
		    },
		    _brandNames: function() {
		        var brands = [];
		        for (var b in this._brandColors) {
		            brands.push(b)
		        }
		        return brands
		    },
		    /*
		        生成一段随机的 Base64 图片编码。
	
		        https://github.com/imsky/holder
		        Holder renders image placeholders entirely on the client side.
	
		        dataImageHolder: function(size) {
		            return 'holder.js/' + size
		        },
		    */
		    dataImage: function(size, text) {
		        var canvas
		        if (typeof document !== 'undefined') {
		            canvas = document.createElement('canvas')
		        } else {
		            /*
		                https://github.com/Automattic/node-canvas
		                    npm install canvas --save
		                安装问题：
		                * http://stackoverflow.com/questions/22953206/gulp-issues-with-cario-install-command-not-found-when-trying-to-installing-canva
		                * https://github.com/Automattic/node-canvas/issues/415
		                * https://github.com/Automattic/node-canvas/wiki/_pages
	
		                PS：node-canvas 的安装过程实在是太繁琐了，所以不放入 package.json 的 dependencies。
		             */
		            var Canvas = module.require('canvas')
		            canvas = new Canvas()
		        }
	
		        var ctx = canvas && canvas.getContext && canvas.getContext("2d")
		        if (!canvas || !ctx) return ''
	
		        if (!size) size = this.pick(this._adSize)
		        text = text !== undefined ? text : size
	
		        size = size.split('x')
	
		        var width = parseInt(size[0], 10),
		            height = parseInt(size[1], 10),
		            background = this._brandColors[this.pick(this._brandNames())],
		            foreground = '#FFF',
		            text_height = 14,
		            font = 'sans-serif';
	
		        canvas.width = width
		        canvas.height = height
		        ctx.textAlign = 'center'
		        ctx.textBaseline = 'middle'
		        ctx.fillStyle = background
		        ctx.fillRect(0, 0, width, height)
		        ctx.fillStyle = foreground
		        ctx.font = 'bold ' + text_height + 'px ' + font
		        ctx.fillText(text, (width / 2), (height / 2), width)
		        return canvas.toDataURL('image/png')
		    }
		}
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)(module)))
	
	/***/ },
	/* 9 */
	/***/ function(module, exports) {
	
		module.exports = function(module) {
			if(!module.webpackPolyfill) {
				module.deprecate = function() {};
				module.paths = [];
				// module.parent = undefined by default
				module.children = [];
				module.webpackPolyfill = 1;
			}
			return module;
		}
	
	
	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {
	
		/*
		    ## Color
	
		    http://llllll.li/randomColor/
		        A color generator for JavaScript.
		        randomColor generates attractive colors by default. More specifically, randomColor produces bright colors with a reasonably high saturation. This makes randomColor particularly useful for data visualizations and generative art.
	
		    http://randomcolour.com/
		        var bg_colour = Math.floor(Math.random() * 16777215).toString(16);
		        bg_colour = "#" + ("000000" + bg_colour).slice(-6);
		        document.bgColor = bg_colour;
		    
		    http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
		        Creating random colors is actually more difficult than it seems. The randomness itself is easy, but aesthetically pleasing randomness is more difficult.
		        https://github.com/devongovett/color-generator
	
		    http://www.paulirish.com/2009/random-hex-color-code-snippets/
		        Random Hex Color Code Generator in JavaScript
	
		    http://chancejs.com/#color
		        chance.color()
		        // => '#79c157'
		        chance.color({format: 'hex'})
		        // => '#d67118'
		        chance.color({format: 'shorthex'})
		        // => '#60f'
		        chance.color({format: 'rgb'})
		        // => 'rgb(110,52,164)'
	
		    http://tool.c7sky.com/webcolor
		        网页设计常用色彩搭配表
		    
		    https://github.com/One-com/one-color
		        An OO-based JavaScript color parser/computation toolkit with support for RGB, HSV, HSL, CMYK, and alpha channels.
		        API 很赞
	
		    https://github.com/harthur/color
		        JavaScript color conversion and manipulation library
	
		    https://github.com/leaverou/css-colors
		        Share & convert CSS colors
		    http://leaverou.github.io/css-colors/#slategray
		        Type a CSS color keyword, #hex, hsl(), rgba(), whatever:
	
		    色调 hue
		        http://baike.baidu.com/view/23368.htm
		        色调指的是一幅画中画面色彩的总体倾向，是大的色彩效果。
		    饱和度 saturation
		        http://baike.baidu.com/view/189644.htm
		        饱和度是指色彩的鲜艳程度，也称色彩的纯度。饱和度取决于该色中含色成分和消色成分（灰色）的比例。含色成分越大，饱和度越大；消色成分越大，饱和度越小。
		    亮度 brightness
		        http://baike.baidu.com/view/34773.htm
		        亮度是指发光体（反光体）表面发光（反光）强弱的物理量。
		    照度 luminosity
		        物体被照亮的程度,采用单位面积所接受的光通量来表示,表示单位为勒[克斯](Lux,lx) ,即 1m / m2 。
	
		    http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
		        var letters = '0123456789ABCDEF'.split('')
		        var color = '#'
		        for (var i = 0; i < 6; i++) {
		            color += letters[Math.floor(Math.random() * 16)]
		        }
		        return color
		    
		        // 随机生成一个无脑的颜色，格式为 '#RRGGBB'。
		        // _brainlessColor()
		        var color = Math.floor(
		            Math.random() *
		            (16 * 16 * 16 * 16 * 16 * 16 - 1)
		        ).toString(16)
		        color = "#" + ("000000" + color).slice(-6)
		        return color.toUpperCase()
		*/
	
		var Convert = __webpack_require__(11)
		var DICT = __webpack_require__(12)
	
		module.exports = {
		    // 随机生成一个有吸引力的颜色，格式为 '#RRGGBB'。
		    color: function(name) {
		        if (name || DICT[name]) return DICT[name].nicer
		        return this.hex()
		    },
		    // #DAC0DE
		    hex: function() {
		        var hsv = this._goldenRatioColor()
		        var rgb = Convert.hsv2rgb(hsv)
		        var hex = Convert.rgb2hex(rgb[0], rgb[1], rgb[2])
		        return hex
		    },
		    // rgb(128,255,255)
		    rgb: function() {
		        var hsv = this._goldenRatioColor()
		        var rgb = Convert.hsv2rgb(hsv)
		        return 'rgb(' +
		            parseInt(rgb[0], 10) + ', ' +
		            parseInt(rgb[1], 10) + ', ' +
		            parseInt(rgb[2], 10) + ')'
		    },
		    // rgba(128,255,255,0.3)
		    rgba: function() {
		        var hsv = this._goldenRatioColor()
		        var rgb = Convert.hsv2rgb(hsv)
		        return 'rgba(' +
		            parseInt(rgb[0], 10) + ', ' +
		            parseInt(rgb[1], 10) + ', ' +
		            parseInt(rgb[2], 10) + ', ' +
		            Math.random().toFixed(2) + ')'
		    },
		    // hsl(300,80%,90%)
		    hsl: function() {
		        var hsv = this._goldenRatioColor()
		        var hsl = Convert.hsv2hsl(hsv)
		        return 'hsl(' +
		            parseInt(hsl[0], 10) + ', ' +
		            parseInt(hsl[1], 10) + ', ' +
		            parseInt(hsl[2], 10) + ')'
		    },
		    // http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
		    // https://github.com/devongovett/color-generator/blob/master/index.js
		    // 随机生成一个有吸引力的颜色。
		    _goldenRatioColor: function(saturation, value) {
		        this._goldenRatio = 0.618033988749895
		        this._hue = this._hue || Math.random()
		        this._hue += this._goldenRatio
		        this._hue %= 1
	
		        if (typeof saturation !== "number") saturation = 0.5;
		        if (typeof value !== "number") value = 0.95;
	
		        return [
		            this._hue * 360,
		            saturation * 100,
		            value * 100
		        ]
		    }
		}
	
	/***/ },
	/* 11 */
	/***/ function(module, exports) {
	
		/*
		    ## Color Convert
	
		    http://blog.csdn.net/idfaya/article/details/6770414
		        颜色空间RGB与HSV(HSL)的转换
		*/
		// https://github.com/harthur/color-convert/blob/master/conversions.js
		module.exports = {
			rgb2hsl: function rgb2hsl(rgb) {
				var r = rgb[0] / 255,
					g = rgb[1] / 255,
					b = rgb[2] / 255,
					min = Math.min(r, g, b),
					max = Math.max(r, g, b),
					delta = max - min,
					h, s, l;
	
				if (max == min)
					h = 0;
				else if (r == max)
					h = (g - b) / delta;
				else if (g == max)
					h = 2 + (b - r) / delta;
				else if (b == max)
					h = 4 + (r - g) / delta;
	
				h = Math.min(h * 60, 360);
	
				if (h < 0)
					h += 360;
	
				l = (min + max) / 2;
	
				if (max == min)
					s = 0;
				else if (l <= 0.5)
					s = delta / (max + min);
				else
					s = delta / (2 - max - min);
	
				return [h, s * 100, l * 100];
			},
			rgb2hsv: function rgb2hsv(rgb) {
				var r = rgb[0],
					g = rgb[1],
					b = rgb[2],
					min = Math.min(r, g, b),
					max = Math.max(r, g, b),
					delta = max - min,
					h, s, v;
	
				if (max === 0)
					s = 0;
				else
					s = (delta / max * 1000) / 10;
	
				if (max == min)
					h = 0;
				else if (r == max)
					h = (g - b) / delta;
				else if (g == max)
					h = 2 + (b - r) / delta;
				else if (b == max)
					h = 4 + (r - g) / delta;
	
				h = Math.min(h * 60, 360);
	
				if (h < 0)
					h += 360;
	
				v = ((max / 255) * 1000) / 10;
	
				return [h, s, v];
			},
			hsl2rgb: function hsl2rgb(hsl) {
				var h = hsl[0] / 360,
					s = hsl[1] / 100,
					l = hsl[2] / 100,
					t1, t2, t3, rgb, val;
	
				if (s === 0) {
					val = l * 255;
					return [val, val, val];
				}
	
				if (l < 0.5)
					t2 = l * (1 + s);
				else
					t2 = l + s - l * s;
				t1 = 2 * l - t2;
	
				rgb = [0, 0, 0];
				for (var i = 0; i < 3; i++) {
					t3 = h + 1 / 3 * -(i - 1);
					if (t3 < 0) t3++;
					if (t3 > 1) t3--;
	
					if (6 * t3 < 1)
						val = t1 + (t2 - t1) * 6 * t3;
					else if (2 * t3 < 1)
						val = t2;
					else if (3 * t3 < 2)
						val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
					else
						val = t1;
	
					rgb[i] = val * 255;
				}
	
				return rgb;
			},
			hsl2hsv: function hsl2hsv(hsl) {
				var h = hsl[0],
					s = hsl[1] / 100,
					l = hsl[2] / 100,
					sv, v;
				l *= 2;
				s *= (l <= 1) ? l : 2 - l;
				v = (l + s) / 2;
				sv = (2 * s) / (l + s);
				return [h, sv * 100, v * 100];
			},
			hsv2rgb: function hsv2rgb(hsv) {
				var h = hsv[0] / 60
				var s = hsv[1] / 100
				var v = hsv[2] / 100
				var hi = Math.floor(h) % 6
	
				var f = h - Math.floor(h)
				var p = 255 * v * (1 - s)
				var q = 255 * v * (1 - (s * f))
				var t = 255 * v * (1 - (s * (1 - f)))
	
				v = 255 * v
	
				switch (hi) {
					case 0:
						return [v, t, p]
					case 1:
						return [q, v, p]
					case 2:
						return [p, v, t]
					case 3:
						return [p, q, v]
					case 4:
						return [t, p, v]
					case 5:
						return [v, p, q]
				}
			},
			hsv2hsl: function hsv2hsl(hsv) {
				var h = hsv[0],
					s = hsv[1] / 100,
					v = hsv[2] / 100,
					sl, l;
	
				l = (2 - s) * v;
				sl = s * v;
				sl /= (l <= 1) ? l : 2 - l;
				l /= 2;
				return [h, sl * 100, l * 100];
			},
			// http://www.140byt.es/keywords/color
			rgb2hex: function(
				a, // red, as a number from 0 to 255
				b, // green, as a number from 0 to 255
				c // blue, as a number from 0 to 255
			) {
				return "#" + ((256 + a << 8 | b) << 8 | c).toString(16).slice(1)
			},
			hex2rgb: function(
				a // take a "#xxxxxx" hex string,
			) {
				a = '0x' + a.slice(1).replace(a.length > 4 ? a : /./g, '$&$&') | 0;
				return [a >> 16, a >> 8 & 255, a & 255]
			}
		}
	
	/***/ },
	/* 12 */
	/***/ function(module, exports) {
	
		/*
		    ## Color 字典数据
	
		    字典数据来源 [A nicer color palette for the web](http://clrs.cc/)
		*/
		module.exports = {
		    // name value nicer
		    navy: {
		        value: '#000080',
		        nicer: '#001F3F'
		    },
		    blue: {
		        value: '#0000ff',
		        nicer: '#0074D9'
		    },
		    aqua: {
		        value: '#00ffff',
		        nicer: '#7FDBFF'
		    },
		    teal: {
		        value: '#008080',
		        nicer: '#39CCCC'
		    },
		    olive: {
		        value: '#008000',
		        nicer: '#3D9970'
		    },
		    green: {
		        value: '#008000',
		        nicer: '#2ECC40'
		    },
		    lime: {
		        value: '#00ff00',
		        nicer: '#01FF70'
		    },
		    yellow: {
		        value: '#ffff00',
		        nicer: '#FFDC00'
		    },
		    orange: {
		        value: '#ffa500',
		        nicer: '#FF851B'
		    },
		    red: {
		        value: '#ff0000',
		        nicer: '#FF4136'
		    },
		    maroon: {
		        value: '#800000',
		        nicer: '#85144B'
		    },
		    fuchsia: {
		        value: '#ff00ff',
		        nicer: '#F012BE'
		    },
		    purple: {
		        value: '#800080',
		        nicer: '#B10DC9'
		    },
		    silver: {
		        value: '#c0c0c0',
		        nicer: '#DDDDDD'
		    },
		    gray: {
		        value: '#808080',
		        nicer: '#AAAAAA'
		    },
		    black: {
		        value: '#000000',
		        nicer: '#111111'
		    },
		    white: {
		        value: '#FFFFFF',
		        nicer: '#FFFFFF'
		    }
		}
	
	/***/ },
	/* 13 */
	/***/ function(module, exports, __webpack_require__) {
	
		/*
		    ## Text
	
		    http://www.lipsum.com/
		*/
		var Basic = __webpack_require__(6)
		var Helper = __webpack_require__(14)
	
		function range(defaultMin, defaultMax, min, max) {
		    return min === undefined ? Basic.natural(defaultMin, defaultMax) : // ()
		        max === undefined ? min : // ( len )
		        Basic.natural(parseInt(min, 10), parseInt(max, 10)) // ( min, max )
		}
	
		module.exports = {
		    // 随机生成一段文本。
		    paragraph: function(min, max) {
		        var len = range(3, 7, min, max)
		        var result = []
		        for (var i = 0; i < len; i++) {
		            result.push(this.sentence())
		        }
		        return result.join(' ')
		    },
		    // 
		    cparagraph: function(min, max) {
		        var len = range(3, 7, min, max)
		        var result = []
		        for (var i = 0; i < len; i++) {
		            result.push(this.csentence())
		        }
		        return result.join('')
		    },
		    // 随机生成一个句子，第一个单词的首字母大写。
		    sentence: function(min, max) {
		        var len = range(12, 18, min, max)
		        var result = []
		        for (var i = 0; i < len; i++) {
		            result.push(this.word())
		        }
		        return Helper.capitalize(result.join(' ')) + '.'
		    },
		    // 随机生成一个中文句子。
		    csentence: function(min, max) {
		        var len = range(12, 18, min, max)
		        var result = []
		        for (var i = 0; i < len; i++) {
		            result.push(this.cword())
		        }
	
		        return result.join('') + '。'
		    },
		    // 随机生成一个单词。
		    word: function(min, max) {
		        var len = range(3, 10, min, max)
		        var result = '';
		        for (var i = 0; i < len; i++) {
		            result += Basic.character('lower')
		        }
		        return result
		    },
		    // 随机生成一个或多个汉字。
		    cword: function(pool, min, max) {
		        // 最常用的 500 个汉字 http://baike.baidu.com/view/568436.htm
		        var DICT_KANZI = '的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严龙飞'
	
		        var len
		        switch (arguments.length) {
		            case 0: // ()
		                pool = DICT_KANZI
		                len = 1
		                break
		            case 1: // ( pool )
		                if (typeof arguments[0] === 'string') {
		                    len = 1
		                } else {
		                    // ( length )
		                    len = pool
		                    pool = DICT_KANZI
		                }
		                break
		            case 2:
		                // ( pool, length )
		                if (typeof arguments[0] === 'string') {
		                    len = min
		                } else {
		                    // ( min, max )
		                    len = this.natural(pool, min)
		                    pool = DICT_KANZI
		                }
		                break
		            case 3:
		                len = this.natural(min, max)
		                break
		        }
	
		        var result = ''
		        for (var i = 0; i < len; i++) {
		            result += pool.charAt(this.natural(0, pool.length - 1))
		        }
		        return result
		    },
		    // 随机生成一句标题，其中每个单词的首字母大写。
		    title: function(min, max) {
		        var len = range(3, 7, min, max)
		        var result = []
		        for (var i = 0; i < len; i++) {
		            result.push(this.capitalize(this.word()))
		        }
		        return result.join(' ')
		    },
		    // 随机生成一句中文标题。
		    ctitle: function(min, max) {
		        var len = range(3, 7, min, max)
		        var result = []
		        for (var i = 0; i < len; i++) {
		            result.push(this.cword())
		        }
		        return result.join('')
		    }
		}
	
	/***/ },
	/* 14 */
	/***/ function(module, exports) {
	
		/*
		    ## Helpers
		*/
		module.exports = {
			// 把字符串的第一个字母转换为大写。
			capitalize: function(word) {
				return (word + '').charAt(0).toUpperCase() + (word + '').substr(1)
			},
			// 把字符串转换为大写。
			upper: function(str) {
				return (str + '').toUpperCase()
			},
			// 把字符串转换为小写。
			lower: function(str) {
				return (str + '').toLowerCase()
			},
			// 从数组中随机选取一个元素，并返回。
			pick: function pick(arr, min, max) {
				arr = arr || []
				switch (arguments.length) {
					case 1:
						return arr[this.natural(0, arr.length - 1)]
					case 2:
						max = min
							/* falls through */
					case 3:
						return this.shuffle(arr, min, max)
	
				}
			},
			/*
			    打乱数组中元素的顺序，并返回。
			    Given an array, scramble the order and return it.
	
			    其他的实现思路：
			        // https://code.google.com/p/jslibs/wiki/JavascriptTips
			        result = result.sort(function() {
			            return Math.random() - 0.5
			        })
			*/
			shuffle: function shuffle(arr, min, max) {
				arr = arr || []
				var old = arr.slice(0),
					result = [],
					index = 0,
					length = old.length;
				for (var i = 0; i < length; i++) {
					index = this.natural(0, old.length - 1)
					result.push(old[index])
					old.splice(index, 1)
				}
				switch (arguments.length) {
					case 0:
					case 1:
						return result
					case 2:
						max = min
							/* falls through */
					case 3:
						min = parseInt(min, 10)
						max = parseInt(max, 10)
						return result.slice(0, this.natural(min, max))
				}
			},
			/*
			    * Random.order(item, item)
			    * Random.order([item, item ...])
	
			    顺序获取数组中的元素
	
			    [JSON导入数组支持数组数据录入](https://github.com/thx/RAP/issues/22)
	
			    不支持单独调用！
			*/
			order: function order(array) {
				order.cache = order.cache || {}
	
				if (arguments.length > 1) array = [].slice.call(arguments, 0)
	
				// options.context.path/templatePath
				var options = order.options
				var templatePath = options.context.templatePath.join('.')
	
				var cache = (
					order.cache[templatePath] = order.cache[templatePath] || {
						index: 0,
						array: array
					}
				)
	
				return cache.array[cache.index++ % cache.array.length]
			}
		}
	
	/***/ },
	/* 15 */
	/***/ function(module, exports) {
	
		/*
		    ## Name
	
		    [Beyond the Top 1000 Names](http://www.ssa.gov/oact/babynames/limits.html)
		*/
		module.exports = {
			// 随机生成一个常见的英文名。
			first: function() {
				var names = [
					// male
					"James", "John", "Robert", "Michael", "William",
					"David", "Richard", "Charles", "Joseph", "Thomas",
					"Christopher", "Daniel", "Paul", "Mark", "Donald",
					"George", "Kenneth", "Steven", "Edward", "Brian",
					"Ronald", "Anthony", "Kevin", "Jason", "Matthew",
					"Gary", "Timothy", "Jose", "Larry", "Jeffrey",
					"Frank", "Scott", "Eric"
				].concat([
					// female
					"Mary", "Patricia", "Linda", "Barbara", "Elizabeth",
					"Jennifer", "Maria", "Susan", "Margaret", "Dorothy",
					"Lisa", "Nancy", "Karen", "Betty", "Helen",
					"Sandra", "Donna", "Carol", "Ruth", "Sharon",
					"Michelle", "Laura", "Sarah", "Kimberly", "Deborah",
					"Jessica", "Shirley", "Cynthia", "Angela", "Melissa",
					"Brenda", "Amy", "Anna"
				])
				return this.pick(names)
					// or this.capitalize(this.word())
			},
			// 随机生成一个常见的英文姓。
			last: function() {
				var names = [
					"Smith", "Johnson", "Williams", "Brown", "Jones",
					"Miller", "Davis", "Garcia", "Rodriguez", "Wilson",
					"Martinez", "Anderson", "Taylor", "Thomas", "Hernandez",
					"Moore", "Martin", "Jackson", "Thompson", "White",
					"Lopez", "Lee", "Gonzalez", "Harris", "Clark",
					"Lewis", "Robinson", "Walker", "Perez", "Hall",
					"Young", "Allen"
				]
				return this.pick(names)
					// or this.capitalize(this.word())
			},
			// 随机生成一个常见的英文姓名。
			name: function(middle) {
				return this.first() + ' ' +
					(middle ? this.first() + ' ' : '') +
					this.last()
			},
			/*
			    随机生成一个常见的中文姓。
			    [世界常用姓氏排行](http://baike.baidu.com/view/1719115.htm)
			    [玄派网 - 网络小说创作辅助平台](http://xuanpai.sinaapp.com/)
			 */
			cfirst: function() {
				var names = (
					'王 李 张 刘 陈 杨 赵 黄 周 吴 ' +
					'徐 孙 胡 朱 高 林 何 郭 马 罗 ' +
					'梁 宋 郑 谢 韩 唐 冯 于 董 萧 ' +
					'程 曹 袁 邓 许 傅 沈 曾 彭 吕 ' +
					'苏 卢 蒋 蔡 贾 丁 魏 薛 叶 阎 ' +
					'余 潘 杜 戴 夏 锺 汪 田 任 姜 ' +
					'范 方 石 姚 谭 廖 邹 熊 金 陆 ' +
					'郝 孔 白 崔 康 毛 邱 秦 江 史 ' +
					'顾 侯 邵 孟 龙 万 段 雷 钱 汤 ' +
					'尹 黎 易 常 武 乔 贺 赖 龚 文'
				).split(' ')
				return this.pick(names)
			},
			/*
			    随机生成一个常见的中文名。
			    [中国最常见名字前50名_三九算命网](http://www.name999.net/xingming/xingshi/20131004/48.html)
			 */
			clast: function() {
				var names = (
					'伟 芳 娜 秀英 敏 静 丽 强 磊 军 ' +
					'洋 勇 艳 杰 娟 涛 明 超 秀兰 霞 ' +
					'平 刚 桂英'
				).split(' ')
				return this.pick(names)
			},
			// 随机生成一个常见的中文姓名。
			cname: function() {
				return this.cfirst() + this.clast()
			}
		}
	
	/***/ },
	/* 16 */
	/***/ function(module, exports) {
	
		/*
		    ## Web
		*/
		module.exports = {
		    /*
		        随机生成一个 URL。
	
		        [URL 规范](http://www.w3.org/Addressing/URL/url-spec.txt)
		            http                    Hypertext Transfer Protocol 
		            ftp                     File Transfer protocol 
		            gopher                  The Gopher protocol 
		            mailto                  Electronic mail address 
		            mid                     Message identifiers for electronic mail 
		            cid                     Content identifiers for MIME body part 
		            news                    Usenet news 
		            nntp                    Usenet news for local NNTP access only 
		            prospero                Access using the prospero protocols 
		            telnet rlogin tn3270    Reference to interactive sessions
		            wais                    Wide Area Information Servers 
		    */
		    url: function(protocol, host) {
		        return (protocol || this.protocol()) + '://' + // protocol?
		            (host || this.domain()) + // host?
		            '/' + this.word()
		    },
		    // 随机生成一个 URL 协议。
		    protocol: function() {
		        return this.pick(
		            // 协议簇
		            'http ftp gopher mailto mid cid news nntp prospero telnet rlogin tn3270 wais'.split(' ')
		        )
		    },
		    // 随机生成一个域名。
		    domain: function(tld) {
		        return this.word() + '.' + (tld || this.tld())
		    },
		    /*
		        随机生成一个顶级域名。
		        国际顶级域名 international top-level domain-names, iTLDs
		        国家顶级域名 national top-level domainnames, nTLDs
		        [域名后缀大全](http://www.163ns.com/zixun/post/4417.html)
		    */
		    tld: function() { // Top Level Domain
		        return this.pick(
		            (
		                // 域名后缀
		                'com net org edu gov int mil cn ' +
		                // 国内域名
		                'com.cn net.cn gov.cn org.cn ' +
		                // 中文国内域名
		                '中国 中国互联.公司 中国互联.网络 ' +
		                // 新国际域名
		                'tel biz cc tv info name hk mobi asia cd travel pro museum coop aero ' +
		                // 世界各国域名后缀
		                'ad ae af ag ai al am an ao aq ar as at au aw az ba bb bd be bf bg bh bi bj bm bn bo br bs bt bv bw by bz ca cc cf cg ch ci ck cl cm cn co cq cr cu cv cx cy cz de dj dk dm do dz ec ee eg eh es et ev fi fj fk fm fo fr ga gb gd ge gf gh gi gl gm gn gp gr gt gu gw gy hk hm hn hr ht hu id ie il in io iq ir is it jm jo jp ke kg kh ki km kn kp kr kw ky kz la lb lc li lk lr ls lt lu lv ly ma mc md mg mh ml mm mn mo mp mq mr ms mt mv mw mx my mz na nc ne nf ng ni nl no np nr nt nu nz om qa pa pe pf pg ph pk pl pm pn pr pt pw py re ro ru rw sa sb sc sd se sg sh si sj sk sl sm sn so sr st su sy sz tc td tf tg th tj tk tm tn to tp tr tt tv tw tz ua ug uk us uy va vc ve vg vn vu wf ws ye yu za zm zr zw'
		            ).split(' ')
		        )
		    },
		    // 随机生成一个邮件地址。
		    email: function(domain) {
		        return this.character('lower') + '.' + this.word() + '@' +
		            (
		                domain ||
		                (this.word() + '.' + this.tld())
		            )
		            // return this.character('lower') + '.' + this.last().toLowerCase() + '@' + this.last().toLowerCase() + '.' + this.tld()
		            // return this.word() + '@' + (domain || this.domain())
		    },
		    // 随机生成一个 IP 地址。
		    ip: function() {
		        return this.natural(0, 255) + '.' +
		            this.natural(0, 255) + '.' +
		            this.natural(0, 255) + '.' +
		            this.natural(0, 255)
		    }
		}
	
	/***/ },
	/* 17 */
	/***/ function(module, exports, __webpack_require__) {
	
		/*
		    ## Address
		*/
	
		var DICT = __webpack_require__(18)
		var REGION = ['东北', '华北', '华东', '华中', '华南', '西南', '西北']
	
		module.exports = {
		    // 随机生成一个大区。
		    region: function() {
		        return this.pick(REGION)
		    },
		    // 随机生成一个（中国）省（或直辖市、自治区、特别行政区）。
		    province: function() {
		        return this.pick(DICT).name
		    },
		    // 随机生成一个（中国）市。
		    city: function(prefix) {
		        var province = this.pick(DICT)
		        var city = this.pick(province.children)
		        return prefix ? [province.name, city.name].join(' ') : city.name
		    },
		    // 随机生成一个（中国）县。
		    county: function(prefix) {
		        var province = this.pick(DICT)
		        var city = this.pick(province.children)
		        var county = this.pick(city.children) || {
		            name: '-'
		        }
		        return prefix ? [province.name, city.name, county.name].join(' ') : county.name
		    },
		    // 随机生成一个邮政编码（六位数字）。
		    zip: function(len) {
		        var zip = ''
		        for (var i = 0; i < (len || 6); i++) zip += this.natural(0, 9)
		        return zip
		    }
	
		    // address: function() {},
		    // phone: function() {},
		    // areacode: function() {},
		    // street: function() {},
		    // street_suffixes: function() {},
		    // street_suffix: function() {},
		    // states: function() {},
		    // state: function() {},
		}
	
	/***/ },
	/* 18 */
	/***/ function(module, exports) {
	
		/*
		    ## Address 字典数据
	
		    字典数据来源 http://www.atatech.org/articles/30028?rnd=254259856
	
		    国标 省（市）级行政区划码表
	
		    华北   北京市 天津市 河北省 山西省 内蒙古自治区
		    东北   辽宁省 吉林省 黑龙江省
		    华东   上海市 江苏省 浙江省 安徽省 福建省 江西省 山东省
		    华南   广东省 广西壮族自治区 海南省
		    华中   河南省 湖北省 湖南省
		    西南   重庆市 四川省 贵州省 云南省 西藏自治区
		    西北   陕西省 甘肃省 青海省 宁夏回族自治区 新疆维吾尔自治区
		    港澳台 香港特别行政区 澳门特别行政区 台湾省
		    
		    **排序**
		    
		    ```js
		    var map = {}
		    _.each(_.keys(REGIONS),function(id){
		      map[id] = REGIONS[ID]
		    })
		    JSON.stringify(map)
		    ```
		*/
		var DICT = {
		    "110000": "北京",
		    "110100": "北京市",
		    "110101": "东城区",
		    "110102": "西城区",
		    "110105": "朝阳区",
		    "110106": "丰台区",
		    "110107": "石景山区",
		    "110108": "海淀区",
		    "110109": "门头沟区",
		    "110111": "房山区",
		    "110112": "通州区",
		    "110113": "顺义区",
		    "110114": "昌平区",
		    "110115": "大兴区",
		    "110116": "怀柔区",
		    "110117": "平谷区",
		    "110228": "密云县",
		    "110229": "延庆县",
		    "110230": "其它区",
		    "120000": "天津",
		    "120100": "天津市",
		    "120101": "和平区",
		    "120102": "河东区",
		    "120103": "河西区",
		    "120104": "南开区",
		    "120105": "河北区",
		    "120106": "红桥区",
		    "120110": "东丽区",
		    "120111": "西青区",
		    "120112": "津南区",
		    "120113": "北辰区",
		    "120114": "武清区",
		    "120115": "宝坻区",
		    "120116": "滨海新区",
		    "120221": "宁河县",
		    "120223": "静海县",
		    "120225": "蓟县",
		    "120226": "其它区",
		    "130000": "河北省",
		    "130100": "石家庄市",
		    "130102": "长安区",
		    "130103": "桥东区",
		    "130104": "桥西区",
		    "130105": "新华区",
		    "130107": "井陉矿区",
		    "130108": "裕华区",
		    "130121": "井陉县",
		    "130123": "正定县",
		    "130124": "栾城县",
		    "130125": "行唐县",
		    "130126": "灵寿县",
		    "130127": "高邑县",
		    "130128": "深泽县",
		    "130129": "赞皇县",
		    "130130": "无极县",
		    "130131": "平山县",
		    "130132": "元氏县",
		    "130133": "赵县",
		    "130181": "辛集市",
		    "130182": "藁城市",
		    "130183": "晋州市",
		    "130184": "新乐市",
		    "130185": "鹿泉市",
		    "130186": "其它区",
		    "130200": "唐山市",
		    "130202": "路南区",
		    "130203": "路北区",
		    "130204": "古冶区",
		    "130205": "开平区",
		    "130207": "丰南区",
		    "130208": "丰润区",
		    "130223": "滦县",
		    "130224": "滦南县",
		    "130225": "乐亭县",
		    "130227": "迁西县",
		    "130229": "玉田县",
		    "130230": "曹妃甸区",
		    "130281": "遵化市",
		    "130283": "迁安市",
		    "130284": "其它区",
		    "130300": "秦皇岛市",
		    "130302": "海港区",
		    "130303": "山海关区",
		    "130304": "北戴河区",
		    "130321": "青龙满族自治县",
		    "130322": "昌黎县",
		    "130323": "抚宁县",
		    "130324": "卢龙县",
		    "130398": "其它区",
		    "130400": "邯郸市",
		    "130402": "邯山区",
		    "130403": "丛台区",
		    "130404": "复兴区",
		    "130406": "峰峰矿区",
		    "130421": "邯郸县",
		    "130423": "临漳县",
		    "130424": "成安县",
		    "130425": "大名县",
		    "130426": "涉县",
		    "130427": "磁县",
		    "130428": "肥乡县",
		    "130429": "永年县",
		    "130430": "邱县",
		    "130431": "鸡泽县",
		    "130432": "广平县",
		    "130433": "馆陶县",
		    "130434": "魏县",
		    "130435": "曲周县",
		    "130481": "武安市",
		    "130482": "其它区",
		    "130500": "邢台市",
		    "130502": "桥东区",
		    "130503": "桥西区",
		    "130521": "邢台县",
		    "130522": "临城县",
		    "130523": "内丘县",
		    "130524": "柏乡县",
		    "130525": "隆尧县",
		    "130526": "任县",
		    "130527": "南和县",
		    "130528": "宁晋县",
		    "130529": "巨鹿县",
		    "130530": "新河县",
		    "130531": "广宗县",
		    "130532": "平乡县",
		    "130533": "威县",
		    "130534": "清河县",
		    "130535": "临西县",
		    "130581": "南宫市",
		    "130582": "沙河市",
		    "130583": "其它区",
		    "130600": "保定市",
		    "130602": "新市区",
		    "130603": "北市区",
		    "130604": "南市区",
		    "130621": "满城县",
		    "130622": "清苑县",
		    "130623": "涞水县",
		    "130624": "阜平县",
		    "130625": "徐水县",
		    "130626": "定兴县",
		    "130627": "唐县",
		    "130628": "高阳县",
		    "130629": "容城县",
		    "130630": "涞源县",
		    "130631": "望都县",
		    "130632": "安新县",
		    "130633": "易县",
		    "130634": "曲阳县",
		    "130635": "蠡县",
		    "130636": "顺平县",
		    "130637": "博野县",
		    "130638": "雄县",
		    "130681": "涿州市",
		    "130682": "定州市",
		    "130683": "安国市",
		    "130684": "高碑店市",
		    "130699": "其它区",
		    "130700": "张家口市",
		    "130702": "桥东区",
		    "130703": "桥西区",
		    "130705": "宣化区",
		    "130706": "下花园区",
		    "130721": "宣化县",
		    "130722": "张北县",
		    "130723": "康保县",
		    "130724": "沽源县",
		    "130725": "尚义县",
		    "130726": "蔚县",
		    "130727": "阳原县",
		    "130728": "怀安县",
		    "130729": "万全县",
		    "130730": "怀来县",
		    "130731": "涿鹿县",
		    "130732": "赤城县",
		    "130733": "崇礼县",
		    "130734": "其它区",
		    "130800": "承德市",
		    "130802": "双桥区",
		    "130803": "双滦区",
		    "130804": "鹰手营子矿区",
		    "130821": "承德县",
		    "130822": "兴隆县",
		    "130823": "平泉县",
		    "130824": "滦平县",
		    "130825": "隆化县",
		    "130826": "丰宁满族自治县",
		    "130827": "宽城满族自治县",
		    "130828": "围场满族蒙古族自治县",
		    "130829": "其它区",
		    "130900": "沧州市",
		    "130902": "新华区",
		    "130903": "运河区",
		    "130921": "沧县",
		    "130922": "青县",
		    "130923": "东光县",
		    "130924": "海兴县",
		    "130925": "盐山县",
		    "130926": "肃宁县",
		    "130927": "南皮县",
		    "130928": "吴桥县",
		    "130929": "献县",
		    "130930": "孟村回族自治县",
		    "130981": "泊头市",
		    "130982": "任丘市",
		    "130983": "黄骅市",
		    "130984": "河间市",
		    "130985": "其它区",
		    "131000": "廊坊市",
		    "131002": "安次区",
		    "131003": "广阳区",
		    "131022": "固安县",
		    "131023": "永清县",
		    "131024": "香河县",
		    "131025": "大城县",
		    "131026": "文安县",
		    "131028": "大厂回族自治县",
		    "131081": "霸州市",
		    "131082": "三河市",
		    "131083": "其它区",
		    "131100": "衡水市",
		    "131102": "桃城区",
		    "131121": "枣强县",
		    "131122": "武邑县",
		    "131123": "武强县",
		    "131124": "饶阳县",
		    "131125": "安平县",
		    "131126": "故城县",
		    "131127": "景县",
		    "131128": "阜城县",
		    "131181": "冀州市",
		    "131182": "深州市",
		    "131183": "其它区",
		    "140000": "山西省",
		    "140100": "太原市",
		    "140105": "小店区",
		    "140106": "迎泽区",
		    "140107": "杏花岭区",
		    "140108": "尖草坪区",
		    "140109": "万柏林区",
		    "140110": "晋源区",
		    "140121": "清徐县",
		    "140122": "阳曲县",
		    "140123": "娄烦县",
		    "140181": "古交市",
		    "140182": "其它区",
		    "140200": "大同市",
		    "140202": "城区",
		    "140203": "矿区",
		    "140211": "南郊区",
		    "140212": "新荣区",
		    "140221": "阳高县",
		    "140222": "天镇县",
		    "140223": "广灵县",
		    "140224": "灵丘县",
		    "140225": "浑源县",
		    "140226": "左云县",
		    "140227": "大同县",
		    "140228": "其它区",
		    "140300": "阳泉市",
		    "140302": "城区",
		    "140303": "矿区",
		    "140311": "郊区",
		    "140321": "平定县",
		    "140322": "盂县",
		    "140323": "其它区",
		    "140400": "长治市",
		    "140421": "长治县",
		    "140423": "襄垣县",
		    "140424": "屯留县",
		    "140425": "平顺县",
		    "140426": "黎城县",
		    "140427": "壶关县",
		    "140428": "长子县",
		    "140429": "武乡县",
		    "140430": "沁县",
		    "140431": "沁源县",
		    "140481": "潞城市",
		    "140482": "城区",
		    "140483": "郊区",
		    "140485": "其它区",
		    "140500": "晋城市",
		    "140502": "城区",
		    "140521": "沁水县",
		    "140522": "阳城县",
		    "140524": "陵川县",
		    "140525": "泽州县",
		    "140581": "高平市",
		    "140582": "其它区",
		    "140600": "朔州市",
		    "140602": "朔城区",
		    "140603": "平鲁区",
		    "140621": "山阴县",
		    "140622": "应县",
		    "140623": "右玉县",
		    "140624": "怀仁县",
		    "140625": "其它区",
		    "140700": "晋中市",
		    "140702": "榆次区",
		    "140721": "榆社县",
		    "140722": "左权县",
		    "140723": "和顺县",
		    "140724": "昔阳县",
		    "140725": "寿阳县",
		    "140726": "太谷县",
		    "140727": "祁县",
		    "140728": "平遥县",
		    "140729": "灵石县",
		    "140781": "介休市",
		    "140782": "其它区",
		    "140800": "运城市",
		    "140802": "盐湖区",
		    "140821": "临猗县",
		    "140822": "万荣县",
		    "140823": "闻喜县",
		    "140824": "稷山县",
		    "140825": "新绛县",
		    "140826": "绛县",
		    "140827": "垣曲县",
		    "140828": "夏县",
		    "140829": "平陆县",
		    "140830": "芮城县",
		    "140881": "永济市",
		    "140882": "河津市",
		    "140883": "其它区",
		    "140900": "忻州市",
		    "140902": "忻府区",
		    "140921": "定襄县",
		    "140922": "五台县",
		    "140923": "代县",
		    "140924": "繁峙县",
		    "140925": "宁武县",
		    "140926": "静乐县",
		    "140927": "神池县",
		    "140928": "五寨县",
		    "140929": "岢岚县",
		    "140930": "河曲县",
		    "140931": "保德县",
		    "140932": "偏关县",
		    "140981": "原平市",
		    "140982": "其它区",
		    "141000": "临汾市",
		    "141002": "尧都区",
		    "141021": "曲沃县",
		    "141022": "翼城县",
		    "141023": "襄汾县",
		    "141024": "洪洞县",
		    "141025": "古县",
		    "141026": "安泽县",
		    "141027": "浮山县",
		    "141028": "吉县",
		    "141029": "乡宁县",
		    "141030": "大宁县",
		    "141031": "隰县",
		    "141032": "永和县",
		    "141033": "蒲县",
		    "141034": "汾西县",
		    "141081": "侯马市",
		    "141082": "霍州市",
		    "141083": "其它区",
		    "141100": "吕梁市",
		    "141102": "离石区",
		    "141121": "文水县",
		    "141122": "交城县",
		    "141123": "兴县",
		    "141124": "临县",
		    "141125": "柳林县",
		    "141126": "石楼县",
		    "141127": "岚县",
		    "141128": "方山县",
		    "141129": "中阳县",
		    "141130": "交口县",
		    "141181": "孝义市",
		    "141182": "汾阳市",
		    "141183": "其它区",
		    "150000": "内蒙古自治区",
		    "150100": "呼和浩特市",
		    "150102": "新城区",
		    "150103": "回民区",
		    "150104": "玉泉区",
		    "150105": "赛罕区",
		    "150121": "土默特左旗",
		    "150122": "托克托县",
		    "150123": "和林格尔县",
		    "150124": "清水河县",
		    "150125": "武川县",
		    "150126": "其它区",
		    "150200": "包头市",
		    "150202": "东河区",
		    "150203": "昆都仑区",
		    "150204": "青山区",
		    "150205": "石拐区",
		    "150206": "白云鄂博矿区",
		    "150207": "九原区",
		    "150221": "土默特右旗",
		    "150222": "固阳县",
		    "150223": "达尔罕茂明安联合旗",
		    "150224": "其它区",
		    "150300": "乌海市",
		    "150302": "海勃湾区",
		    "150303": "海南区",
		    "150304": "乌达区",
		    "150305": "其它区",
		    "150400": "赤峰市",
		    "150402": "红山区",
		    "150403": "元宝山区",
		    "150404": "松山区",
		    "150421": "阿鲁科尔沁旗",
		    "150422": "巴林左旗",
		    "150423": "巴林右旗",
		    "150424": "林西县",
		    "150425": "克什克腾旗",
		    "150426": "翁牛特旗",
		    "150428": "喀喇沁旗",
		    "150429": "宁城县",
		    "150430": "敖汉旗",
		    "150431": "其它区",
		    "150500": "通辽市",
		    "150502": "科尔沁区",
		    "150521": "科尔沁左翼中旗",
		    "150522": "科尔沁左翼后旗",
		    "150523": "开鲁县",
		    "150524": "库伦旗",
		    "150525": "奈曼旗",
		    "150526": "扎鲁特旗",
		    "150581": "霍林郭勒市",
		    "150582": "其它区",
		    "150600": "鄂尔多斯市",
		    "150602": "东胜区",
		    "150621": "达拉特旗",
		    "150622": "准格尔旗",
		    "150623": "鄂托克前旗",
		    "150624": "鄂托克旗",
		    "150625": "杭锦旗",
		    "150626": "乌审旗",
		    "150627": "伊金霍洛旗",
		    "150628": "其它区",
		    "150700": "呼伦贝尔市",
		    "150702": "海拉尔区",
		    "150703": "扎赉诺尔区",
		    "150721": "阿荣旗",
		    "150722": "莫力达瓦达斡尔族自治旗",
		    "150723": "鄂伦春自治旗",
		    "150724": "鄂温克族自治旗",
		    "150725": "陈巴尔虎旗",
		    "150726": "新巴尔虎左旗",
		    "150727": "新巴尔虎右旗",
		    "150781": "满洲里市",
		    "150782": "牙克石市",
		    "150783": "扎兰屯市",
		    "150784": "额尔古纳市",
		    "150785": "根河市",
		    "150786": "其它区",
		    "150800": "巴彦淖尔市",
		    "150802": "临河区",
		    "150821": "五原县",
		    "150822": "磴口县",
		    "150823": "乌拉特前旗",
		    "150824": "乌拉特中旗",
		    "150825": "乌拉特后旗",
		    "150826": "杭锦后旗",
		    "150827": "其它区",
		    "150900": "乌兰察布市",
		    "150902": "集宁区",
		    "150921": "卓资县",
		    "150922": "化德县",
		    "150923": "商都县",
		    "150924": "兴和县",
		    "150925": "凉城县",
		    "150926": "察哈尔右翼前旗",
		    "150927": "察哈尔右翼中旗",
		    "150928": "察哈尔右翼后旗",
		    "150929": "四子王旗",
		    "150981": "丰镇市",
		    "150982": "其它区",
		    "152200": "兴安盟",
		    "152201": "乌兰浩特市",
		    "152202": "阿尔山市",
		    "152221": "科尔沁右翼前旗",
		    "152222": "科尔沁右翼中旗",
		    "152223": "扎赉特旗",
		    "152224": "突泉县",
		    "152225": "其它区",
		    "152500": "锡林郭勒盟",
		    "152501": "二连浩特市",
		    "152502": "锡林浩特市",
		    "152522": "阿巴嘎旗",
		    "152523": "苏尼特左旗",
		    "152524": "苏尼特右旗",
		    "152525": "东乌珠穆沁旗",
		    "152526": "西乌珠穆沁旗",
		    "152527": "太仆寺旗",
		    "152528": "镶黄旗",
		    "152529": "正镶白旗",
		    "152530": "正蓝旗",
		    "152531": "多伦县",
		    "152532": "其它区",
		    "152900": "阿拉善盟",
		    "152921": "阿拉善左旗",
		    "152922": "阿拉善右旗",
		    "152923": "额济纳旗",
		    "152924": "其它区",
		    "210000": "辽宁省",
		    "210100": "沈阳市",
		    "210102": "和平区",
		    "210103": "沈河区",
		    "210104": "大东区",
		    "210105": "皇姑区",
		    "210106": "铁西区",
		    "210111": "苏家屯区",
		    "210112": "东陵区",
		    "210113": "新城子区",
		    "210114": "于洪区",
		    "210122": "辽中县",
		    "210123": "康平县",
		    "210124": "法库县",
		    "210181": "新民市",
		    "210184": "沈北新区",
		    "210185": "其它区",
		    "210200": "大连市",
		    "210202": "中山区",
		    "210203": "西岗区",
		    "210204": "沙河口区",
		    "210211": "甘井子区",
		    "210212": "旅顺口区",
		    "210213": "金州区",
		    "210224": "长海县",
		    "210281": "瓦房店市",
		    "210282": "普兰店市",
		    "210283": "庄河市",
		    "210298": "其它区",
		    "210300": "鞍山市",
		    "210302": "铁东区",
		    "210303": "铁西区",
		    "210304": "立山区",
		    "210311": "千山区",
		    "210321": "台安县",
		    "210323": "岫岩满族自治县",
		    "210381": "海城市",
		    "210382": "其它区",
		    "210400": "抚顺市",
		    "210402": "新抚区",
		    "210403": "东洲区",
		    "210404": "望花区",
		    "210411": "顺城区",
		    "210421": "抚顺县",
		    "210422": "新宾满族自治县",
		    "210423": "清原满族自治县",
		    "210424": "其它区",
		    "210500": "本溪市",
		    "210502": "平山区",
		    "210503": "溪湖区",
		    "210504": "明山区",
		    "210505": "南芬区",
		    "210521": "本溪满族自治县",
		    "210522": "桓仁满族自治县",
		    "210523": "其它区",
		    "210600": "丹东市",
		    "210602": "元宝区",
		    "210603": "振兴区",
		    "210604": "振安区",
		    "210624": "宽甸满族自治县",
		    "210681": "东港市",
		    "210682": "凤城市",
		    "210683": "其它区",
		    "210700": "锦州市",
		    "210702": "古塔区",
		    "210703": "凌河区",
		    "210711": "太和区",
		    "210726": "黑山县",
		    "210727": "义县",
		    "210781": "凌海市",
		    "210782": "北镇市",
		    "210783": "其它区",
		    "210800": "营口市",
		    "210802": "站前区",
		    "210803": "西市区",
		    "210804": "鲅鱼圈区",
		    "210811": "老边区",
		    "210881": "盖州市",
		    "210882": "大石桥市",
		    "210883": "其它区",
		    "210900": "阜新市",
		    "210902": "海州区",
		    "210903": "新邱区",
		    "210904": "太平区",
		    "210905": "清河门区",
		    "210911": "细河区",
		    "210921": "阜新蒙古族自治县",
		    "210922": "彰武县",
		    "210923": "其它区",
		    "211000": "辽阳市",
		    "211002": "白塔区",
		    "211003": "文圣区",
		    "211004": "宏伟区",
		    "211005": "弓长岭区",
		    "211011": "太子河区",
		    "211021": "辽阳县",
		    "211081": "灯塔市",
		    "211082": "其它区",
		    "211100": "盘锦市",
		    "211102": "双台子区",
		    "211103": "兴隆台区",
		    "211121": "大洼县",
		    "211122": "盘山县",
		    "211123": "其它区",
		    "211200": "铁岭市",
		    "211202": "银州区",
		    "211204": "清河区",
		    "211221": "铁岭县",
		    "211223": "西丰县",
		    "211224": "昌图县",
		    "211281": "调兵山市",
		    "211282": "开原市",
		    "211283": "其它区",
		    "211300": "朝阳市",
		    "211302": "双塔区",
		    "211303": "龙城区",
		    "211321": "朝阳县",
		    "211322": "建平县",
		    "211324": "喀喇沁左翼蒙古族自治县",
		    "211381": "北票市",
		    "211382": "凌源市",
		    "211383": "其它区",
		    "211400": "葫芦岛市",
		    "211402": "连山区",
		    "211403": "龙港区",
		    "211404": "南票区",
		    "211421": "绥中县",
		    "211422": "建昌县",
		    "211481": "兴城市",
		    "211482": "其它区",
		    "220000": "吉林省",
		    "220100": "长春市",
		    "220102": "南关区",
		    "220103": "宽城区",
		    "220104": "朝阳区",
		    "220105": "二道区",
		    "220106": "绿园区",
		    "220112": "双阳区",
		    "220122": "农安县",
		    "220181": "九台市",
		    "220182": "榆树市",
		    "220183": "德惠市",
		    "220188": "其它区",
		    "220200": "吉林市",
		    "220202": "昌邑区",
		    "220203": "龙潭区",
		    "220204": "船营区",
		    "220211": "丰满区",
		    "220221": "永吉县",
		    "220281": "蛟河市",
		    "220282": "桦甸市",
		    "220283": "舒兰市",
		    "220284": "磐石市",
		    "220285": "其它区",
		    "220300": "四平市",
		    "220302": "铁西区",
		    "220303": "铁东区",
		    "220322": "梨树县",
		    "220323": "伊通满族自治县",
		    "220381": "公主岭市",
		    "220382": "双辽市",
		    "220383": "其它区",
		    "220400": "辽源市",
		    "220402": "龙山区",
		    "220403": "西安区",
		    "220421": "东丰县",
		    "220422": "东辽县",
		    "220423": "其它区",
		    "220500": "通化市",
		    "220502": "东昌区",
		    "220503": "二道江区",
		    "220521": "通化县",
		    "220523": "辉南县",
		    "220524": "柳河县",
		    "220581": "梅河口市",
		    "220582": "集安市",
		    "220583": "其它区",
		    "220600": "白山市",
		    "220602": "浑江区",
		    "220621": "抚松县",
		    "220622": "靖宇县",
		    "220623": "长白朝鲜族自治县",
		    "220625": "江源区",
		    "220681": "临江市",
		    "220682": "其它区",
		    "220700": "松原市",
		    "220702": "宁江区",
		    "220721": "前郭尔罗斯蒙古族自治县",
		    "220722": "长岭县",
		    "220723": "乾安县",
		    "220724": "扶余市",
		    "220725": "其它区",
		    "220800": "白城市",
		    "220802": "洮北区",
		    "220821": "镇赉县",
		    "220822": "通榆县",
		    "220881": "洮南市",
		    "220882": "大安市",
		    "220883": "其它区",
		    "222400": "延边朝鲜族自治州",
		    "222401": "延吉市",
		    "222402": "图们市",
		    "222403": "敦化市",
		    "222404": "珲春市",
		    "222405": "龙井市",
		    "222406": "和龙市",
		    "222424": "汪清县",
		    "222426": "安图县",
		    "222427": "其它区",
		    "230000": "黑龙江省",
		    "230100": "哈尔滨市",
		    "230102": "道里区",
		    "230103": "南岗区",
		    "230104": "道外区",
		    "230106": "香坊区",
		    "230108": "平房区",
		    "230109": "松北区",
		    "230111": "呼兰区",
		    "230123": "依兰县",
		    "230124": "方正县",
		    "230125": "宾县",
		    "230126": "巴彦县",
		    "230127": "木兰县",
		    "230128": "通河县",
		    "230129": "延寿县",
		    "230181": "阿城区",
		    "230182": "双城市",
		    "230183": "尚志市",
		    "230184": "五常市",
		    "230186": "其它区",
		    "230200": "齐齐哈尔市",
		    "230202": "龙沙区",
		    "230203": "建华区",
		    "230204": "铁锋区",
		    "230205": "昂昂溪区",
		    "230206": "富拉尔基区",
		    "230207": "碾子山区",
		    "230208": "梅里斯达斡尔族区",
		    "230221": "龙江县",
		    "230223": "依安县",
		    "230224": "泰来县",
		    "230225": "甘南县",
		    "230227": "富裕县",
		    "230229": "克山县",
		    "230230": "克东县",
		    "230231": "拜泉县",
		    "230281": "讷河市",
		    "230282": "其它区",
		    "230300": "鸡西市",
		    "230302": "鸡冠区",
		    "230303": "恒山区",
		    "230304": "滴道区",
		    "230305": "梨树区",
		    "230306": "城子河区",
		    "230307": "麻山区",
		    "230321": "鸡东县",
		    "230381": "虎林市",
		    "230382": "密山市",
		    "230383": "其它区",
		    "230400": "鹤岗市",
		    "230402": "向阳区",
		    "230403": "工农区",
		    "230404": "南山区",
		    "230405": "兴安区",
		    "230406": "东山区",
		    "230407": "兴山区",
		    "230421": "萝北县",
		    "230422": "绥滨县",
		    "230423": "其它区",
		    "230500": "双鸭山市",
		    "230502": "尖山区",
		    "230503": "岭东区",
		    "230505": "四方台区",
		    "230506": "宝山区",
		    "230521": "集贤县",
		    "230522": "友谊县",
		    "230523": "宝清县",
		    "230524": "饶河县",
		    "230525": "其它区",
		    "230600": "大庆市",
		    "230602": "萨尔图区",
		    "230603": "龙凤区",
		    "230604": "让胡路区",
		    "230605": "红岗区",
		    "230606": "大同区",
		    "230621": "肇州县",
		    "230622": "肇源县",
		    "230623": "林甸县",
		    "230624": "杜尔伯特蒙古族自治县",
		    "230625": "其它区",
		    "230700": "伊春市",
		    "230702": "伊春区",
		    "230703": "南岔区",
		    "230704": "友好区",
		    "230705": "西林区",
		    "230706": "翠峦区",
		    "230707": "新青区",
		    "230708": "美溪区",
		    "230709": "金山屯区",
		    "230710": "五营区",
		    "230711": "乌马河区",
		    "230712": "汤旺河区",
		    "230713": "带岭区",
		    "230714": "乌伊岭区",
		    "230715": "红星区",
		    "230716": "上甘岭区",
		    "230722": "嘉荫县",
		    "230781": "铁力市",
		    "230782": "其它区",
		    "230800": "佳木斯市",
		    "230803": "向阳区",
		    "230804": "前进区",
		    "230805": "东风区",
		    "230811": "郊区",
		    "230822": "桦南县",
		    "230826": "桦川县",
		    "230828": "汤原县",
		    "230833": "抚远县",
		    "230881": "同江市",
		    "230882": "富锦市",
		    "230883": "其它区",
		    "230900": "七台河市",
		    "230902": "新兴区",
		    "230903": "桃山区",
		    "230904": "茄子河区",
		    "230921": "勃利县",
		    "230922": "其它区",
		    "231000": "牡丹江市",
		    "231002": "东安区",
		    "231003": "阳明区",
		    "231004": "爱民区",
		    "231005": "西安区",
		    "231024": "东宁县",
		    "231025": "林口县",
		    "231081": "绥芬河市",
		    "231083": "海林市",
		    "231084": "宁安市",
		    "231085": "穆棱市",
		    "231086": "其它区",
		    "231100": "黑河市",
		    "231102": "爱辉区",
		    "231121": "嫩江县",
		    "231123": "逊克县",
		    "231124": "孙吴县",
		    "231181": "北安市",
		    "231182": "五大连池市",
		    "231183": "其它区",
		    "231200": "绥化市",
		    "231202": "北林区",
		    "231221": "望奎县",
		    "231222": "兰西县",
		    "231223": "青冈县",
		    "231224": "庆安县",
		    "231225": "明水县",
		    "231226": "绥棱县",
		    "231281": "安达市",
		    "231282": "肇东市",
		    "231283": "海伦市",
		    "231284": "其它区",
		    "232700": "大兴安岭地区",
		    "232702": "松岭区",
		    "232703": "新林区",
		    "232704": "呼中区",
		    "232721": "呼玛县",
		    "232722": "塔河县",
		    "232723": "漠河县",
		    "232724": "加格达奇区",
		    "232725": "其它区",
		    "310000": "上海",
		    "310100": "上海市",
		    "310101": "黄浦区",
		    "310104": "徐汇区",
		    "310105": "长宁区",
		    "310106": "静安区",
		    "310107": "普陀区",
		    "310108": "闸北区",
		    "310109": "虹口区",
		    "310110": "杨浦区",
		    "310112": "闵行区",
		    "310113": "宝山区",
		    "310114": "嘉定区",
		    "310115": "浦东新区",
		    "310116": "金山区",
		    "310117": "松江区",
		    "310118": "青浦区",
		    "310120": "奉贤区",
		    "310230": "崇明县",
		    "310231": "其它区",
		    "320000": "江苏省",
		    "320100": "南京市",
		    "320102": "玄武区",
		    "320104": "秦淮区",
		    "320105": "建邺区",
		    "320106": "鼓楼区",
		    "320111": "浦口区",
		    "320113": "栖霞区",
		    "320114": "雨花台区",
		    "320115": "江宁区",
		    "320116": "六合区",
		    "320124": "溧水区",
		    "320125": "高淳区",
		    "320126": "其它区",
		    "320200": "无锡市",
		    "320202": "崇安区",
		    "320203": "南长区",
		    "320204": "北塘区",
		    "320205": "锡山区",
		    "320206": "惠山区",
		    "320211": "滨湖区",
		    "320281": "江阴市",
		    "320282": "宜兴市",
		    "320297": "其它区",
		    "320300": "徐州市",
		    "320302": "鼓楼区",
		    "320303": "云龙区",
		    "320305": "贾汪区",
		    "320311": "泉山区",
		    "320321": "丰县",
		    "320322": "沛县",
		    "320323": "铜山区",
		    "320324": "睢宁县",
		    "320381": "新沂市",
		    "320382": "邳州市",
		    "320383": "其它区",
		    "320400": "常州市",
		    "320402": "天宁区",
		    "320404": "钟楼区",
		    "320405": "戚墅堰区",
		    "320411": "新北区",
		    "320412": "武进区",
		    "320481": "溧阳市",
		    "320482": "金坛市",
		    "320483": "其它区",
		    "320500": "苏州市",
		    "320505": "虎丘区",
		    "320506": "吴中区",
		    "320507": "相城区",
		    "320508": "姑苏区",
		    "320581": "常熟市",
		    "320582": "张家港市",
		    "320583": "昆山市",
		    "320584": "吴江区",
		    "320585": "太仓市",
		    "320596": "其它区",
		    "320600": "南通市",
		    "320602": "崇川区",
		    "320611": "港闸区",
		    "320612": "通州区",
		    "320621": "海安县",
		    "320623": "如东县",
		    "320681": "启东市",
		    "320682": "如皋市",
		    "320684": "海门市",
		    "320694": "其它区",
		    "320700": "连云港市",
		    "320703": "连云区",
		    "320705": "新浦区",
		    "320706": "海州区",
		    "320721": "赣榆县",
		    "320722": "东海县",
		    "320723": "灌云县",
		    "320724": "灌南县",
		    "320725": "其它区",
		    "320800": "淮安市",
		    "320802": "清河区",
		    "320803": "淮安区",
		    "320804": "淮阴区",
		    "320811": "清浦区",
		    "320826": "涟水县",
		    "320829": "洪泽县",
		    "320830": "盱眙县",
		    "320831": "金湖县",
		    "320832": "其它区",
		    "320900": "盐城市",
		    "320902": "亭湖区",
		    "320903": "盐都区",
		    "320921": "响水县",
		    "320922": "滨海县",
		    "320923": "阜宁县",
		    "320924": "射阳县",
		    "320925": "建湖县",
		    "320981": "东台市",
		    "320982": "大丰市",
		    "320983": "其它区",
		    "321000": "扬州市",
		    "321002": "广陵区",
		    "321003": "邗江区",
		    "321023": "宝应县",
		    "321081": "仪征市",
		    "321084": "高邮市",
		    "321088": "江都区",
		    "321093": "其它区",
		    "321100": "镇江市",
		    "321102": "京口区",
		    "321111": "润州区",
		    "321112": "丹徒区",
		    "321181": "丹阳市",
		    "321182": "扬中市",
		    "321183": "句容市",
		    "321184": "其它区",
		    "321200": "泰州市",
		    "321202": "海陵区",
		    "321203": "高港区",
		    "321281": "兴化市",
		    "321282": "靖江市",
		    "321283": "泰兴市",
		    "321284": "姜堰区",
		    "321285": "其它区",
		    "321300": "宿迁市",
		    "321302": "宿城区",
		    "321311": "宿豫区",
		    "321322": "沭阳县",
		    "321323": "泗阳县",
		    "321324": "泗洪县",
		    "321325": "其它区",
		    "330000": "浙江省",
		    "330100": "杭州市",
		    "330102": "上城区",
		    "330103": "下城区",
		    "330104": "江干区",
		    "330105": "拱墅区",
		    "330106": "西湖区",
		    "330108": "滨江区",
		    "330109": "萧山区",
		    "330110": "余杭区",
		    "330122": "桐庐县",
		    "330127": "淳安县",
		    "330182": "建德市",
		    "330183": "富阳市",
		    "330185": "临安市",
		    "330186": "其它区",
		    "330200": "宁波市",
		    "330203": "海曙区",
		    "330204": "江东区",
		    "330205": "江北区",
		    "330206": "北仑区",
		    "330211": "镇海区",
		    "330212": "鄞州区",
		    "330225": "象山县",
		    "330226": "宁海县",
		    "330281": "余姚市",
		    "330282": "慈溪市",
		    "330283": "奉化市",
		    "330284": "其它区",
		    "330300": "温州市",
		    "330302": "鹿城区",
		    "330303": "龙湾区",
		    "330304": "瓯海区",
		    "330322": "洞头县",
		    "330324": "永嘉县",
		    "330326": "平阳县",
		    "330327": "苍南县",
		    "330328": "文成县",
		    "330329": "泰顺县",
		    "330381": "瑞安市",
		    "330382": "乐清市",
		    "330383": "其它区",
		    "330400": "嘉兴市",
		    "330402": "南湖区",
		    "330411": "秀洲区",
		    "330421": "嘉善县",
		    "330424": "海盐县",
		    "330481": "海宁市",
		    "330482": "平湖市",
		    "330483": "桐乡市",
		    "330484": "其它区",
		    "330500": "湖州市",
		    "330502": "吴兴区",
		    "330503": "南浔区",
		    "330521": "德清县",
		    "330522": "长兴县",
		    "330523": "安吉县",
		    "330524": "其它区",
		    "330600": "绍兴市",
		    "330602": "越城区",
		    "330621": "绍兴县",
		    "330624": "新昌县",
		    "330681": "诸暨市",
		    "330682": "上虞市",
		    "330683": "嵊州市",
		    "330684": "其它区",
		    "330700": "金华市",
		    "330702": "婺城区",
		    "330703": "金东区",
		    "330723": "武义县",
		    "330726": "浦江县",
		    "330727": "磐安县",
		    "330781": "兰溪市",
		    "330782": "义乌市",
		    "330783": "东阳市",
		    "330784": "永康市",
		    "330785": "其它区",
		    "330800": "衢州市",
		    "330802": "柯城区",
		    "330803": "衢江区",
		    "330822": "常山县",
		    "330824": "开化县",
		    "330825": "龙游县",
		    "330881": "江山市",
		    "330882": "其它区",
		    "330900": "舟山市",
		    "330902": "定海区",
		    "330903": "普陀区",
		    "330921": "岱山县",
		    "330922": "嵊泗县",
		    "330923": "其它区",
		    "331000": "台州市",
		    "331002": "椒江区",
		    "331003": "黄岩区",
		    "331004": "路桥区",
		    "331021": "玉环县",
		    "331022": "三门县",
		    "331023": "天台县",
		    "331024": "仙居县",
		    "331081": "温岭市",
		    "331082": "临海市",
		    "331083": "其它区",
		    "331100": "丽水市",
		    "331102": "莲都区",
		    "331121": "青田县",
		    "331122": "缙云县",
		    "331123": "遂昌县",
		    "331124": "松阳县",
		    "331125": "云和县",
		    "331126": "庆元县",
		    "331127": "景宁畲族自治县",
		    "331181": "龙泉市",
		    "331182": "其它区",
		    "340000": "安徽省",
		    "340100": "合肥市",
		    "340102": "瑶海区",
		    "340103": "庐阳区",
		    "340104": "蜀山区",
		    "340111": "包河区",
		    "340121": "长丰县",
		    "340122": "肥东县",
		    "340123": "肥西县",
		    "340192": "其它区",
		    "340200": "芜湖市",
		    "340202": "镜湖区",
		    "340203": "弋江区",
		    "340207": "鸠江区",
		    "340208": "三山区",
		    "340221": "芜湖县",
		    "340222": "繁昌县",
		    "340223": "南陵县",
		    "340224": "其它区",
		    "340300": "蚌埠市",
		    "340302": "龙子湖区",
		    "340303": "蚌山区",
		    "340304": "禹会区",
		    "340311": "淮上区",
		    "340321": "怀远县",
		    "340322": "五河县",
		    "340323": "固镇县",
		    "340324": "其它区",
		    "340400": "淮南市",
		    "340402": "大通区",
		    "340403": "田家庵区",
		    "340404": "谢家集区",
		    "340405": "八公山区",
		    "340406": "潘集区",
		    "340421": "凤台县",
		    "340422": "其它区",
		    "340500": "马鞍山市",
		    "340503": "花山区",
		    "340504": "雨山区",
		    "340506": "博望区",
		    "340521": "当涂县",
		    "340522": "其它区",
		    "340600": "淮北市",
		    "340602": "杜集区",
		    "340603": "相山区",
		    "340604": "烈山区",
		    "340621": "濉溪县",
		    "340622": "其它区",
		    "340700": "铜陵市",
		    "340702": "铜官山区",
		    "340703": "狮子山区",
		    "340711": "郊区",
		    "340721": "铜陵县",
		    "340722": "其它区",
		    "340800": "安庆市",
		    "340802": "迎江区",
		    "340803": "大观区",
		    "340811": "宜秀区",
		    "340822": "怀宁县",
		    "340823": "枞阳县",
		    "340824": "潜山县",
		    "340825": "太湖县",
		    "340826": "宿松县",
		    "340827": "望江县",
		    "340828": "岳西县",
		    "340881": "桐城市",
		    "340882": "其它区",
		    "341000": "黄山市",
		    "341002": "屯溪区",
		    "341003": "黄山区",
		    "341004": "徽州区",
		    "341021": "歙县",
		    "341022": "休宁县",
		    "341023": "黟县",
		    "341024": "祁门县",
		    "341025": "其它区",
		    "341100": "滁州市",
		    "341102": "琅琊区",
		    "341103": "南谯区",
		    "341122": "来安县",
		    "341124": "全椒县",
		    "341125": "定远县",
		    "341126": "凤阳县",
		    "341181": "天长市",
		    "341182": "明光市",
		    "341183": "其它区",
		    "341200": "阜阳市",
		    "341202": "颍州区",
		    "341203": "颍东区",
		    "341204": "颍泉区",
		    "341221": "临泉县",
		    "341222": "太和县",
		    "341225": "阜南县",
		    "341226": "颍上县",
		    "341282": "界首市",
		    "341283": "其它区",
		    "341300": "宿州市",
		    "341302": "埇桥区",
		    "341321": "砀山县",
		    "341322": "萧县",
		    "341323": "灵璧县",
		    "341324": "泗县",
		    "341325": "其它区",
		    "341400": "巢湖市",
		    "341421": "庐江县",
		    "341422": "无为县",
		    "341423": "含山县",
		    "341424": "和县",
		    "341500": "六安市",
		    "341502": "金安区",
		    "341503": "裕安区",
		    "341521": "寿县",
		    "341522": "霍邱县",
		    "341523": "舒城县",
		    "341524": "金寨县",
		    "341525": "霍山县",
		    "341526": "其它区",
		    "341600": "亳州市",
		    "341602": "谯城区",
		    "341621": "涡阳县",
		    "341622": "蒙城县",
		    "341623": "利辛县",
		    "341624": "其它区",
		    "341700": "池州市",
		    "341702": "贵池区",
		    "341721": "东至县",
		    "341722": "石台县",
		    "341723": "青阳县",
		    "341724": "其它区",
		    "341800": "宣城市",
		    "341802": "宣州区",
		    "341821": "郎溪县",
		    "341822": "广德县",
		    "341823": "泾县",
		    "341824": "绩溪县",
		    "341825": "旌德县",
		    "341881": "宁国市",
		    "341882": "其它区",
		    "350000": "福建省",
		    "350100": "福州市",
		    "350102": "鼓楼区",
		    "350103": "台江区",
		    "350104": "仓山区",
		    "350105": "马尾区",
		    "350111": "晋安区",
		    "350121": "闽侯县",
		    "350122": "连江县",
		    "350123": "罗源县",
		    "350124": "闽清县",
		    "350125": "永泰县",
		    "350128": "平潭县",
		    "350181": "福清市",
		    "350182": "长乐市",
		    "350183": "其它区",
		    "350200": "厦门市",
		    "350203": "思明区",
		    "350205": "海沧区",
		    "350206": "湖里区",
		    "350211": "集美区",
		    "350212": "同安区",
		    "350213": "翔安区",
		    "350214": "其它区",
		    "350300": "莆田市",
		    "350302": "城厢区",
		    "350303": "涵江区",
		    "350304": "荔城区",
		    "350305": "秀屿区",
		    "350322": "仙游县",
		    "350323": "其它区",
		    "350400": "三明市",
		    "350402": "梅列区",
		    "350403": "三元区",
		    "350421": "明溪县",
		    "350423": "清流县",
		    "350424": "宁化县",
		    "350425": "大田县",
		    "350426": "尤溪县",
		    "350427": "沙县",
		    "350428": "将乐县",
		    "350429": "泰宁县",
		    "350430": "建宁县",
		    "350481": "永安市",
		    "350482": "其它区",
		    "350500": "泉州市",
		    "350502": "鲤城区",
		    "350503": "丰泽区",
		    "350504": "洛江区",
		    "350505": "泉港区",
		    "350521": "惠安县",
		    "350524": "安溪县",
		    "350525": "永春县",
		    "350526": "德化县",
		    "350527": "金门县",
		    "350581": "石狮市",
		    "350582": "晋江市",
		    "350583": "南安市",
		    "350584": "其它区",
		    "350600": "漳州市",
		    "350602": "芗城区",
		    "350603": "龙文区",
		    "350622": "云霄县",
		    "350623": "漳浦县",
		    "350624": "诏安县",
		    "350625": "长泰县",
		    "350626": "东山县",
		    "350627": "南靖县",
		    "350628": "平和县",
		    "350629": "华安县",
		    "350681": "龙海市",
		    "350682": "其它区",
		    "350700": "南平市",
		    "350702": "延平区",
		    "350721": "顺昌县",
		    "350722": "浦城县",
		    "350723": "光泽县",
		    "350724": "松溪县",
		    "350725": "政和县",
		    "350781": "邵武市",
		    "350782": "武夷山市",
		    "350783": "建瓯市",
		    "350784": "建阳市",
		    "350785": "其它区",
		    "350800": "龙岩市",
		    "350802": "新罗区",
		    "350821": "长汀县",
		    "350822": "永定县",
		    "350823": "上杭县",
		    "350824": "武平县",
		    "350825": "连城县",
		    "350881": "漳平市",
		    "350882": "其它区",
		    "350900": "宁德市",
		    "350902": "蕉城区",
		    "350921": "霞浦县",
		    "350922": "古田县",
		    "350923": "屏南县",
		    "350924": "寿宁县",
		    "350925": "周宁县",
		    "350926": "柘荣县",
		    "350981": "福安市",
		    "350982": "福鼎市",
		    "350983": "其它区",
		    "360000": "江西省",
		    "360100": "南昌市",
		    "360102": "东湖区",
		    "360103": "西湖区",
		    "360104": "青云谱区",
		    "360105": "湾里区",
		    "360111": "青山湖区",
		    "360121": "南昌县",
		    "360122": "新建县",
		    "360123": "安义县",
		    "360124": "进贤县",
		    "360128": "其它区",
		    "360200": "景德镇市",
		    "360202": "昌江区",
		    "360203": "珠山区",
		    "360222": "浮梁县",
		    "360281": "乐平市",
		    "360282": "其它区",
		    "360300": "萍乡市",
		    "360302": "安源区",
		    "360313": "湘东区",
		    "360321": "莲花县",
		    "360322": "上栗县",
		    "360323": "芦溪县",
		    "360324": "其它区",
		    "360400": "九江市",
		    "360402": "庐山区",
		    "360403": "浔阳区",
		    "360421": "九江县",
		    "360423": "武宁县",
		    "360424": "修水县",
		    "360425": "永修县",
		    "360426": "德安县",
		    "360427": "星子县",
		    "360428": "都昌县",
		    "360429": "湖口县",
		    "360430": "彭泽县",
		    "360481": "瑞昌市",
		    "360482": "其它区",
		    "360483": "共青城市",
		    "360500": "新余市",
		    "360502": "渝水区",
		    "360521": "分宜县",
		    "360522": "其它区",
		    "360600": "鹰潭市",
		    "360602": "月湖区",
		    "360622": "余江县",
		    "360681": "贵溪市",
		    "360682": "其它区",
		    "360700": "赣州市",
		    "360702": "章贡区",
		    "360721": "赣县",
		    "360722": "信丰县",
		    "360723": "大余县",
		    "360724": "上犹县",
		    "360725": "崇义县",
		    "360726": "安远县",
		    "360727": "龙南县",
		    "360728": "定南县",
		    "360729": "全南县",
		    "360730": "宁都县",
		    "360731": "于都县",
		    "360732": "兴国县",
		    "360733": "会昌县",
		    "360734": "寻乌县",
		    "360735": "石城县",
		    "360781": "瑞金市",
		    "360782": "南康市",
		    "360783": "其它区",
		    "360800": "吉安市",
		    "360802": "吉州区",
		    "360803": "青原区",
		    "360821": "吉安县",
		    "360822": "吉水县",
		    "360823": "峡江县",
		    "360824": "新干县",
		    "360825": "永丰县",
		    "360826": "泰和县",
		    "360827": "遂川县",
		    "360828": "万安县",
		    "360829": "安福县",
		    "360830": "永新县",
		    "360881": "井冈山市",
		    "360882": "其它区",
		    "360900": "宜春市",
		    "360902": "袁州区",
		    "360921": "奉新县",
		    "360922": "万载县",
		    "360923": "上高县",
		    "360924": "宜丰县",
		    "360925": "靖安县",
		    "360926": "铜鼓县",
		    "360981": "丰城市",
		    "360982": "樟树市",
		    "360983": "高安市",
		    "360984": "其它区",
		    "361000": "抚州市",
		    "361002": "临川区",
		    "361021": "南城县",
		    "361022": "黎川县",
		    "361023": "南丰县",
		    "361024": "崇仁县",
		    "361025": "乐安县",
		    "361026": "宜黄县",
		    "361027": "金溪县",
		    "361028": "资溪县",
		    "361029": "东乡县",
		    "361030": "广昌县",
		    "361031": "其它区",
		    "361100": "上饶市",
		    "361102": "信州区",
		    "361121": "上饶县",
		    "361122": "广丰县",
		    "361123": "玉山县",
		    "361124": "铅山县",
		    "361125": "横峰县",
		    "361126": "弋阳县",
		    "361127": "余干县",
		    "361128": "鄱阳县",
		    "361129": "万年县",
		    "361130": "婺源县",
		    "361181": "德兴市",
		    "361182": "其它区",
		    "370000": "山东省",
		    "370100": "济南市",
		    "370102": "历下区",
		    "370103": "市中区",
		    "370104": "槐荫区",
		    "370105": "天桥区",
		    "370112": "历城区",
		    "370113": "长清区",
		    "370124": "平阴县",
		    "370125": "济阳县",
		    "370126": "商河县",
		    "370181": "章丘市",
		    "370182": "其它区",
		    "370200": "青岛市",
		    "370202": "市南区",
		    "370203": "市北区",
		    "370211": "黄岛区",
		    "370212": "崂山区",
		    "370213": "李沧区",
		    "370214": "城阳区",
		    "370281": "胶州市",
		    "370282": "即墨市",
		    "370283": "平度市",
		    "370285": "莱西市",
		    "370286": "其它区",
		    "370300": "淄博市",
		    "370302": "淄川区",
		    "370303": "张店区",
		    "370304": "博山区",
		    "370305": "临淄区",
		    "370306": "周村区",
		    "370321": "桓台县",
		    "370322": "高青县",
		    "370323": "沂源县",
		    "370324": "其它区",
		    "370400": "枣庄市",
		    "370402": "市中区",
		    "370403": "薛城区",
		    "370404": "峄城区",
		    "370405": "台儿庄区",
		    "370406": "山亭区",
		    "370481": "滕州市",
		    "370482": "其它区",
		    "370500": "东营市",
		    "370502": "东营区",
		    "370503": "河口区",
		    "370521": "垦利县",
		    "370522": "利津县",
		    "370523": "广饶县",
		    "370591": "其它区",
		    "370600": "烟台市",
		    "370602": "芝罘区",
		    "370611": "福山区",
		    "370612": "牟平区",
		    "370613": "莱山区",
		    "370634": "长岛县",
		    "370681": "龙口市",
		    "370682": "莱阳市",
		    "370683": "莱州市",
		    "370684": "蓬莱市",
		    "370685": "招远市",
		    "370686": "栖霞市",
		    "370687": "海阳市",
		    "370688": "其它区",
		    "370700": "潍坊市",
		    "370702": "潍城区",
		    "370703": "寒亭区",
		    "370704": "坊子区",
		    "370705": "奎文区",
		    "370724": "临朐县",
		    "370725": "昌乐县",
		    "370781": "青州市",
		    "370782": "诸城市",
		    "370783": "寿光市",
		    "370784": "安丘市",
		    "370785": "高密市",
		    "370786": "昌邑市",
		    "370787": "其它区",
		    "370800": "济宁市",
		    "370802": "市中区",
		    "370811": "任城区",
		    "370826": "微山县",
		    "370827": "鱼台县",
		    "370828": "金乡县",
		    "370829": "嘉祥县",
		    "370830": "汶上县",
		    "370831": "泗水县",
		    "370832": "梁山县",
		    "370881": "曲阜市",
		    "370882": "兖州市",
		    "370883": "邹城市",
		    "370884": "其它区",
		    "370900": "泰安市",
		    "370902": "泰山区",
		    "370903": "岱岳区",
		    "370921": "宁阳县",
		    "370923": "东平县",
		    "370982": "新泰市",
		    "370983": "肥城市",
		    "370984": "其它区",
		    "371000": "威海市",
		    "371002": "环翠区",
		    "371081": "文登市",
		    "371082": "荣成市",
		    "371083": "乳山市",
		    "371084": "其它区",
		    "371100": "日照市",
		    "371102": "东港区",
		    "371103": "岚山区",
		    "371121": "五莲县",
		    "371122": "莒县",
		    "371123": "其它区",
		    "371200": "莱芜市",
		    "371202": "莱城区",
		    "371203": "钢城区",
		    "371204": "其它区",
		    "371300": "临沂市",
		    "371302": "兰山区",
		    "371311": "罗庄区",
		    "371312": "河东区",
		    "371321": "沂南县",
		    "371322": "郯城县",
		    "371323": "沂水县",
		    "371324": "苍山县",
		    "371325": "费县",
		    "371326": "平邑县",
		    "371327": "莒南县",
		    "371328": "蒙阴县",
		    "371329": "临沭县",
		    "371330": "其它区",
		    "371400": "德州市",
		    "371402": "德城区",
		    "371421": "陵县",
		    "371422": "宁津县",
		    "371423": "庆云县",
		    "371424": "临邑县",
		    "371425": "齐河县",
		    "371426": "平原县",
		    "371427": "夏津县",
		    "371428": "武城县",
		    "371481": "乐陵市",
		    "371482": "禹城市",
		    "371483": "其它区",
		    "371500": "聊城市",
		    "371502": "东昌府区",
		    "371521": "阳谷县",
		    "371522": "莘县",
		    "371523": "茌平县",
		    "371524": "东阿县",
		    "371525": "冠县",
		    "371526": "高唐县",
		    "371581": "临清市",
		    "371582": "其它区",
		    "371600": "滨州市",
		    "371602": "滨城区",
		    "371621": "惠民县",
		    "371622": "阳信县",
		    "371623": "无棣县",
		    "371624": "沾化县",
		    "371625": "博兴县",
		    "371626": "邹平县",
		    "371627": "其它区",
		    "371700": "菏泽市",
		    "371702": "牡丹区",
		    "371721": "曹县",
		    "371722": "单县",
		    "371723": "成武县",
		    "371724": "巨野县",
		    "371725": "郓城县",
		    "371726": "鄄城县",
		    "371727": "定陶县",
		    "371728": "东明县",
		    "371729": "其它区",
		    "410000": "河南省",
		    "410100": "郑州市",
		    "410102": "中原区",
		    "410103": "二七区",
		    "410104": "管城回族区",
		    "410105": "金水区",
		    "410106": "上街区",
		    "410108": "惠济区",
		    "410122": "中牟县",
		    "410181": "巩义市",
		    "410182": "荥阳市",
		    "410183": "新密市",
		    "410184": "新郑市",
		    "410185": "登封市",
		    "410188": "其它区",
		    "410200": "开封市",
		    "410202": "龙亭区",
		    "410203": "顺河回族区",
		    "410204": "鼓楼区",
		    "410205": "禹王台区",
		    "410211": "金明区",
		    "410221": "杞县",
		    "410222": "通许县",
		    "410223": "尉氏县",
		    "410224": "开封县",
		    "410225": "兰考县",
		    "410226": "其它区",
		    "410300": "洛阳市",
		    "410302": "老城区",
		    "410303": "西工区",
		    "410304": "瀍河回族区",
		    "410305": "涧西区",
		    "410306": "吉利区",
		    "410307": "洛龙区",
		    "410322": "孟津县",
		    "410323": "新安县",
		    "410324": "栾川县",
		    "410325": "嵩县",
		    "410326": "汝阳县",
		    "410327": "宜阳县",
		    "410328": "洛宁县",
		    "410329": "伊川县",
		    "410381": "偃师市",
		    "410400": "平顶山市",
		    "410402": "新华区",
		    "410403": "卫东区",
		    "410404": "石龙区",
		    "410411": "湛河区",
		    "410421": "宝丰县",
		    "410422": "叶县",
		    "410423": "鲁山县",
		    "410425": "郏县",
		    "410481": "舞钢市",
		    "410482": "汝州市",
		    "410483": "其它区",
		    "410500": "安阳市",
		    "410502": "文峰区",
		    "410503": "北关区",
		    "410505": "殷都区",
		    "410506": "龙安区",
		    "410522": "安阳县",
		    "410523": "汤阴县",
		    "410526": "滑县",
		    "410527": "内黄县",
		    "410581": "林州市",
		    "410582": "其它区",
		    "410600": "鹤壁市",
		    "410602": "鹤山区",
		    "410603": "山城区",
		    "410611": "淇滨区",
		    "410621": "浚县",
		    "410622": "淇县",
		    "410623": "其它区",
		    "410700": "新乡市",
		    "410702": "红旗区",
		    "410703": "卫滨区",
		    "410704": "凤泉区",
		    "410711": "牧野区",
		    "410721": "新乡县",
		    "410724": "获嘉县",
		    "410725": "原阳县",
		    "410726": "延津县",
		    "410727": "封丘县",
		    "410728": "长垣县",
		    "410781": "卫辉市",
		    "410782": "辉县市",
		    "410783": "其它区",
		    "410800": "焦作市",
		    "410802": "解放区",
		    "410803": "中站区",
		    "410804": "马村区",
		    "410811": "山阳区",
		    "410821": "修武县",
		    "410822": "博爱县",
		    "410823": "武陟县",
		    "410825": "温县",
		    "410881": "济源市",
		    "410882": "沁阳市",
		    "410883": "孟州市",
		    "410884": "其它区",
		    "410900": "濮阳市",
		    "410902": "华龙区",
		    "410922": "清丰县",
		    "410923": "南乐县",
		    "410926": "范县",
		    "410927": "台前县",
		    "410928": "濮阳县",
		    "410929": "其它区",
		    "411000": "许昌市",
		    "411002": "魏都区",
		    "411023": "许昌县",
		    "411024": "鄢陵县",
		    "411025": "襄城县",
		    "411081": "禹州市",
		    "411082": "长葛市",
		    "411083": "其它区",
		    "411100": "漯河市",
		    "411102": "源汇区",
		    "411103": "郾城区",
		    "411104": "召陵区",
		    "411121": "舞阳县",
		    "411122": "临颍县",
		    "411123": "其它区",
		    "411200": "三门峡市",
		    "411202": "湖滨区",
		    "411221": "渑池县",
		    "411222": "陕县",
		    "411224": "卢氏县",
		    "411281": "义马市",
		    "411282": "灵宝市",
		    "411283": "其它区",
		    "411300": "南阳市",
		    "411302": "宛城区",
		    "411303": "卧龙区",
		    "411321": "南召县",
		    "411322": "方城县",
		    "411323": "西峡县",
		    "411324": "镇平县",
		    "411325": "内乡县",
		    "411326": "淅川县",
		    "411327": "社旗县",
		    "411328": "唐河县",
		    "411329": "新野县",
		    "411330": "桐柏县",
		    "411381": "邓州市",
		    "411382": "其它区",
		    "411400": "商丘市",
		    "411402": "梁园区",
		    "411403": "睢阳区",
		    "411421": "民权县",
		    "411422": "睢县",
		    "411423": "宁陵县",
		    "411424": "柘城县",
		    "411425": "虞城县",
		    "411426": "夏邑县",
		    "411481": "永城市",
		    "411482": "其它区",
		    "411500": "信阳市",
		    "411502": "浉河区",
		    "411503": "平桥区",
		    "411521": "罗山县",
		    "411522": "光山县",
		    "411523": "新县",
		    "411524": "商城县",
		    "411525": "固始县",
		    "411526": "潢川县",
		    "411527": "淮滨县",
		    "411528": "息县",
		    "411529": "其它区",
		    "411600": "周口市",
		    "411602": "川汇区",
		    "411621": "扶沟县",
		    "411622": "西华县",
		    "411623": "商水县",
		    "411624": "沈丘县",
		    "411625": "郸城县",
		    "411626": "淮阳县",
		    "411627": "太康县",
		    "411628": "鹿邑县",
		    "411681": "项城市",
		    "411682": "其它区",
		    "411700": "驻马店市",
		    "411702": "驿城区",
		    "411721": "西平县",
		    "411722": "上蔡县",
		    "411723": "平舆县",
		    "411724": "正阳县",
		    "411725": "确山县",
		    "411726": "泌阳县",
		    "411727": "汝南县",
		    "411728": "遂平县",
		    "411729": "新蔡县",
		    "411730": "其它区",
		    "420000": "湖北省",
		    "420100": "武汉市",
		    "420102": "江岸区",
		    "420103": "江汉区",
		    "420104": "硚口区",
		    "420105": "汉阳区",
		    "420106": "武昌区",
		    "420107": "青山区",
		    "420111": "洪山区",
		    "420112": "东西湖区",
		    "420113": "汉南区",
		    "420114": "蔡甸区",
		    "420115": "江夏区",
		    "420116": "黄陂区",
		    "420117": "新洲区",
		    "420118": "其它区",
		    "420200": "黄石市",
		    "420202": "黄石港区",
		    "420203": "西塞山区",
		    "420204": "下陆区",
		    "420205": "铁山区",
		    "420222": "阳新县",
		    "420281": "大冶市",
		    "420282": "其它区",
		    "420300": "十堰市",
		    "420302": "茅箭区",
		    "420303": "张湾区",
		    "420321": "郧县",
		    "420322": "郧西县",
		    "420323": "竹山县",
		    "420324": "竹溪县",
		    "420325": "房县",
		    "420381": "丹江口市",
		    "420383": "其它区",
		    "420500": "宜昌市",
		    "420502": "西陵区",
		    "420503": "伍家岗区",
		    "420504": "点军区",
		    "420505": "猇亭区",
		    "420506": "夷陵区",
		    "420525": "远安县",
		    "420526": "兴山县",
		    "420527": "秭归县",
		    "420528": "长阳土家族自治县",
		    "420529": "五峰土家族自治县",
		    "420581": "宜都市",
		    "420582": "当阳市",
		    "420583": "枝江市",
		    "420584": "其它区",
		    "420600": "襄阳市",
		    "420602": "襄城区",
		    "420606": "樊城区",
		    "420607": "襄州区",
		    "420624": "南漳县",
		    "420625": "谷城县",
		    "420626": "保康县",
		    "420682": "老河口市",
		    "420683": "枣阳市",
		    "420684": "宜城市",
		    "420685": "其它区",
		    "420700": "鄂州市",
		    "420702": "梁子湖区",
		    "420703": "华容区",
		    "420704": "鄂城区",
		    "420705": "其它区",
		    "420800": "荆门市",
		    "420802": "东宝区",
		    "420804": "掇刀区",
		    "420821": "京山县",
		    "420822": "沙洋县",
		    "420881": "钟祥市",
		    "420882": "其它区",
		    "420900": "孝感市",
		    "420902": "孝南区",
		    "420921": "孝昌县",
		    "420922": "大悟县",
		    "420923": "云梦县",
		    "420981": "应城市",
		    "420982": "安陆市",
		    "420984": "汉川市",
		    "420985": "其它区",
		    "421000": "荆州市",
		    "421002": "沙市区",
		    "421003": "荆州区",
		    "421022": "公安县",
		    "421023": "监利县",
		    "421024": "江陵县",
		    "421081": "石首市",
		    "421083": "洪湖市",
		    "421087": "松滋市",
		    "421088": "其它区",
		    "421100": "黄冈市",
		    "421102": "黄州区",
		    "421121": "团风县",
		    "421122": "红安县",
		    "421123": "罗田县",
		    "421124": "英山县",
		    "421125": "浠水县",
		    "421126": "蕲春县",
		    "421127": "黄梅县",
		    "421181": "麻城市",
		    "421182": "武穴市",
		    "421183": "其它区",
		    "421200": "咸宁市",
		    "421202": "咸安区",
		    "421221": "嘉鱼县",
		    "421222": "通城县",
		    "421223": "崇阳县",
		    "421224": "通山县",
		    "421281": "赤壁市",
		    "421283": "其它区",
		    "421300": "随州市",
		    "421302": "曾都区",
		    "421321": "随县",
		    "421381": "广水市",
		    "421382": "其它区",
		    "422800": "恩施土家族苗族自治州",
		    "422801": "恩施市",
		    "422802": "利川市",
		    "422822": "建始县",
		    "422823": "巴东县",
		    "422825": "宣恩县",
		    "422826": "咸丰县",
		    "422827": "来凤县",
		    "422828": "鹤峰县",
		    "422829": "其它区",
		    "429004": "仙桃市",
		    "429005": "潜江市",
		    "429006": "天门市",
		    "429021": "神农架林区",
		    "430000": "湖南省",
		    "430100": "长沙市",
		    "430102": "芙蓉区",
		    "430103": "天心区",
		    "430104": "岳麓区",
		    "430105": "开福区",
		    "430111": "雨花区",
		    "430121": "长沙县",
		    "430122": "望城区",
		    "430124": "宁乡县",
		    "430181": "浏阳市",
		    "430182": "其它区",
		    "430200": "株洲市",
		    "430202": "荷塘区",
		    "430203": "芦淞区",
		    "430204": "石峰区",
		    "430211": "天元区",
		    "430221": "株洲县",
		    "430223": "攸县",
		    "430224": "茶陵县",
		    "430225": "炎陵县",
		    "430281": "醴陵市",
		    "430282": "其它区",
		    "430300": "湘潭市",
		    "430302": "雨湖区",
		    "430304": "岳塘区",
		    "430321": "湘潭县",
		    "430381": "湘乡市",
		    "430382": "韶山市",
		    "430383": "其它区",
		    "430400": "衡阳市",
		    "430405": "珠晖区",
		    "430406": "雁峰区",
		    "430407": "石鼓区",
		    "430408": "蒸湘区",
		    "430412": "南岳区",
		    "430421": "衡阳县",
		    "430422": "衡南县",
		    "430423": "衡山县",
		    "430424": "衡东县",
		    "430426": "祁东县",
		    "430481": "耒阳市",
		    "430482": "常宁市",
		    "430483": "其它区",
		    "430500": "邵阳市",
		    "430502": "双清区",
		    "430503": "大祥区",
		    "430511": "北塔区",
		    "430521": "邵东县",
		    "430522": "新邵县",
		    "430523": "邵阳县",
		    "430524": "隆回县",
		    "430525": "洞口县",
		    "430527": "绥宁县",
		    "430528": "新宁县",
		    "430529": "城步苗族自治县",
		    "430581": "武冈市",
		    "430582": "其它区",
		    "430600": "岳阳市",
		    "430602": "岳阳楼区",
		    "430603": "云溪区",
		    "430611": "君山区",
		    "430621": "岳阳县",
		    "430623": "华容县",
		    "430624": "湘阴县",
		    "430626": "平江县",
		    "430681": "汨罗市",
		    "430682": "临湘市",
		    "430683": "其它区",
		    "430700": "常德市",
		    "430702": "武陵区",
		    "430703": "鼎城区",
		    "430721": "安乡县",
		    "430722": "汉寿县",
		    "430723": "澧县",
		    "430724": "临澧县",
		    "430725": "桃源县",
		    "430726": "石门县",
		    "430781": "津市市",
		    "430782": "其它区",
		    "430800": "张家界市",
		    "430802": "永定区",
		    "430811": "武陵源区",
		    "430821": "慈利县",
		    "430822": "桑植县",
		    "430823": "其它区",
		    "430900": "益阳市",
		    "430902": "资阳区",
		    "430903": "赫山区",
		    "430921": "南县",
		    "430922": "桃江县",
		    "430923": "安化县",
		    "430981": "沅江市",
		    "430982": "其它区",
		    "431000": "郴州市",
		    "431002": "北湖区",
		    "431003": "苏仙区",
		    "431021": "桂阳县",
		    "431022": "宜章县",
		    "431023": "永兴县",
		    "431024": "嘉禾县",
		    "431025": "临武县",
		    "431026": "汝城县",
		    "431027": "桂东县",
		    "431028": "安仁县",
		    "431081": "资兴市",
		    "431082": "其它区",
		    "431100": "永州市",
		    "431102": "零陵区",
		    "431103": "冷水滩区",
		    "431121": "祁阳县",
		    "431122": "东安县",
		    "431123": "双牌县",
		    "431124": "道县",
		    "431125": "江永县",
		    "431126": "宁远县",
		    "431127": "蓝山县",
		    "431128": "新田县",
		    "431129": "江华瑶族自治县",
		    "431130": "其它区",
		    "431200": "怀化市",
		    "431202": "鹤城区",
		    "431221": "中方县",
		    "431222": "沅陵县",
		    "431223": "辰溪县",
		    "431224": "溆浦县",
		    "431225": "会同县",
		    "431226": "麻阳苗族自治县",
		    "431227": "新晃侗族自治县",
		    "431228": "芷江侗族自治县",
		    "431229": "靖州苗族侗族自治县",
		    "431230": "通道侗族自治县",
		    "431281": "洪江市",
		    "431282": "其它区",
		    "431300": "娄底市",
		    "431302": "娄星区",
		    "431321": "双峰县",
		    "431322": "新化县",
		    "431381": "冷水江市",
		    "431382": "涟源市",
		    "431383": "其它区",
		    "433100": "湘西土家族苗族自治州",
		    "433101": "吉首市",
		    "433122": "泸溪县",
		    "433123": "凤凰县",
		    "433124": "花垣县",
		    "433125": "保靖县",
		    "433126": "古丈县",
		    "433127": "永顺县",
		    "433130": "龙山县",
		    "433131": "其它区",
		    "440000": "广东省",
		    "440100": "广州市",
		    "440103": "荔湾区",
		    "440104": "越秀区",
		    "440105": "海珠区",
		    "440106": "天河区",
		    "440111": "白云区",
		    "440112": "黄埔区",
		    "440113": "番禺区",
		    "440114": "花都区",
		    "440115": "南沙区",
		    "440116": "萝岗区",
		    "440183": "增城市",
		    "440184": "从化市",
		    "440189": "其它区",
		    "440200": "韶关市",
		    "440203": "武江区",
		    "440204": "浈江区",
		    "440205": "曲江区",
		    "440222": "始兴县",
		    "440224": "仁化县",
		    "440229": "翁源县",
		    "440232": "乳源瑶族自治县",
		    "440233": "新丰县",
		    "440281": "乐昌市",
		    "440282": "南雄市",
		    "440283": "其它区",
		    "440300": "深圳市",
		    "440303": "罗湖区",
		    "440304": "福田区",
		    "440305": "南山区",
		    "440306": "宝安区",
		    "440307": "龙岗区",
		    "440308": "盐田区",
		    "440309": "其它区",
		    "440320": "光明新区",
		    "440321": "坪山新区",
		    "440322": "大鹏新区",
		    "440323": "龙华新区",
		    "440400": "珠海市",
		    "440402": "香洲区",
		    "440403": "斗门区",
		    "440404": "金湾区",
		    "440488": "其它区",
		    "440500": "汕头市",
		    "440507": "龙湖区",
		    "440511": "金平区",
		    "440512": "濠江区",
		    "440513": "潮阳区",
		    "440514": "潮南区",
		    "440515": "澄海区",
		    "440523": "南澳县",
		    "440524": "其它区",
		    "440600": "佛山市",
		    "440604": "禅城区",
		    "440605": "南海区",
		    "440606": "顺德区",
		    "440607": "三水区",
		    "440608": "高明区",
		    "440609": "其它区",
		    "440700": "江门市",
		    "440703": "蓬江区",
		    "440704": "江海区",
		    "440705": "新会区",
		    "440781": "台山市",
		    "440783": "开平市",
		    "440784": "鹤山市",
		    "440785": "恩平市",
		    "440786": "其它区",
		    "440800": "湛江市",
		    "440802": "赤坎区",
		    "440803": "霞山区",
		    "440804": "坡头区",
		    "440811": "麻章区",
		    "440823": "遂溪县",
		    "440825": "徐闻县",
		    "440881": "廉江市",
		    "440882": "雷州市",
		    "440883": "吴川市",
		    "440884": "其它区",
		    "440900": "茂名市",
		    "440902": "茂南区",
		    "440903": "茂港区",
		    "440923": "电白县",
		    "440981": "高州市",
		    "440982": "化州市",
		    "440983": "信宜市",
		    "440984": "其它区",
		    "441200": "肇庆市",
		    "441202": "端州区",
		    "441203": "鼎湖区",
		    "441223": "广宁县",
		    "441224": "怀集县",
		    "441225": "封开县",
		    "441226": "德庆县",
		    "441283": "高要市",
		    "441284": "四会市",
		    "441285": "其它区",
		    "441300": "惠州市",
		    "441302": "惠城区",
		    "441303": "惠阳区",
		    "441322": "博罗县",
		    "441323": "惠东县",
		    "441324": "龙门县",
		    "441325": "其它区",
		    "441400": "梅州市",
		    "441402": "梅江区",
		    "441421": "梅县",
		    "441422": "大埔县",
		    "441423": "丰顺县",
		    "441424": "五华县",
		    "441426": "平远县",
		    "441427": "蕉岭县",
		    "441481": "兴宁市",
		    "441482": "其它区",
		    "441500": "汕尾市",
		    "441502": "城区",
		    "441521": "海丰县",
		    "441523": "陆河县",
		    "441581": "陆丰市",
		    "441582": "其它区",
		    "441600": "河源市",
		    "441602": "源城区",
		    "441621": "紫金县",
		    "441622": "龙川县",
		    "441623": "连平县",
		    "441624": "和平县",
		    "441625": "东源县",
		    "441626": "其它区",
		    "441700": "阳江市",
		    "441702": "江城区",
		    "441721": "阳西县",
		    "441723": "阳东县",
		    "441781": "阳春市",
		    "441782": "其它区",
		    "441800": "清远市",
		    "441802": "清城区",
		    "441821": "佛冈县",
		    "441823": "阳山县",
		    "441825": "连山壮族瑶族自治县",
		    "441826": "连南瑶族自治县",
		    "441827": "清新区",
		    "441881": "英德市",
		    "441882": "连州市",
		    "441883": "其它区",
		    "441900": "东莞市",
		    "442000": "中山市",
		    "442101": "东沙群岛",
		    "445100": "潮州市",
		    "445102": "湘桥区",
		    "445121": "潮安区",
		    "445122": "饶平县",
		    "445186": "其它区",
		    "445200": "揭阳市",
		    "445202": "榕城区",
		    "445221": "揭东区",
		    "445222": "揭西县",
		    "445224": "惠来县",
		    "445281": "普宁市",
		    "445285": "其它区",
		    "445300": "云浮市",
		    "445302": "云城区",
		    "445321": "新兴县",
		    "445322": "郁南县",
		    "445323": "云安县",
		    "445381": "罗定市",
		    "445382": "其它区",
		    "450000": "广西壮族自治区",
		    "450100": "南宁市",
		    "450102": "兴宁区",
		    "450103": "青秀区",
		    "450105": "江南区",
		    "450107": "西乡塘区",
		    "450108": "良庆区",
		    "450109": "邕宁区",
		    "450122": "武鸣县",
		    "450123": "隆安县",
		    "450124": "马山县",
		    "450125": "上林县",
		    "450126": "宾阳县",
		    "450127": "横县",
		    "450128": "其它区",
		    "450200": "柳州市",
		    "450202": "城中区",
		    "450203": "鱼峰区",
		    "450204": "柳南区",
		    "450205": "柳北区",
		    "450221": "柳江县",
		    "450222": "柳城县",
		    "450223": "鹿寨县",
		    "450224": "融安县",
		    "450225": "融水苗族自治县",
		    "450226": "三江侗族自治县",
		    "450227": "其它区",
		    "450300": "桂林市",
		    "450302": "秀峰区",
		    "450303": "叠彩区",
		    "450304": "象山区",
		    "450305": "七星区",
		    "450311": "雁山区",
		    "450321": "阳朔县",
		    "450322": "临桂区",
		    "450323": "灵川县",
		    "450324": "全州县",
		    "450325": "兴安县",
		    "450326": "永福县",
		    "450327": "灌阳县",
		    "450328": "龙胜各族自治县",
		    "450329": "资源县",
		    "450330": "平乐县",
		    "450331": "荔浦县",
		    "450332": "恭城瑶族自治县",
		    "450333": "其它区",
		    "450400": "梧州市",
		    "450403": "万秀区",
		    "450405": "长洲区",
		    "450406": "龙圩区",
		    "450421": "苍梧县",
		    "450422": "藤县",
		    "450423": "蒙山县",
		    "450481": "岑溪市",
		    "450482": "其它区",
		    "450500": "北海市",
		    "450502": "海城区",
		    "450503": "银海区",
		    "450512": "铁山港区",
		    "450521": "合浦县",
		    "450522": "其它区",
		    "450600": "防城港市",
		    "450602": "港口区",
		    "450603": "防城区",
		    "450621": "上思县",
		    "450681": "东兴市",
		    "450682": "其它区",
		    "450700": "钦州市",
		    "450702": "钦南区",
		    "450703": "钦北区",
		    "450721": "灵山县",
		    "450722": "浦北县",
		    "450723": "其它区",
		    "450800": "贵港市",
		    "450802": "港北区",
		    "450803": "港南区",
		    "450804": "覃塘区",
		    "450821": "平南县",
		    "450881": "桂平市",
		    "450882": "其它区",
		    "450900": "玉林市",
		    "450902": "玉州区",
		    "450903": "福绵区",
		    "450921": "容县",
		    "450922": "陆川县",
		    "450923": "博白县",
		    "450924": "兴业县",
		    "450981": "北流市",
		    "450982": "其它区",
		    "451000": "百色市",
		    "451002": "右江区",
		    "451021": "田阳县",
		    "451022": "田东县",
		    "451023": "平果县",
		    "451024": "德保县",
		    "451025": "靖西县",
		    "451026": "那坡县",
		    "451027": "凌云县",
		    "451028": "乐业县",
		    "451029": "田林县",
		    "451030": "西林县",
		    "451031": "隆林各族自治县",
		    "451032": "其它区",
		    "451100": "贺州市",
		    "451102": "八步区",
		    "451119": "平桂管理区",
		    "451121": "昭平县",
		    "451122": "钟山县",
		    "451123": "富川瑶族自治县",
		    "451124": "其它区",
		    "451200": "河池市",
		    "451202": "金城江区",
		    "451221": "南丹县",
		    "451222": "天峨县",
		    "451223": "凤山县",
		    "451224": "东兰县",
		    "451225": "罗城仫佬族自治县",
		    "451226": "环江毛南族自治县",
		    "451227": "巴马瑶族自治县",
		    "451228": "都安瑶族自治县",
		    "451229": "大化瑶族自治县",
		    "451281": "宜州市",
		    "451282": "其它区",
		    "451300": "来宾市",
		    "451302": "兴宾区",
		    "451321": "忻城县",
		    "451322": "象州县",
		    "451323": "武宣县",
		    "451324": "金秀瑶族自治县",
		    "451381": "合山市",
		    "451382": "其它区",
		    "451400": "崇左市",
		    "451402": "江州区",
		    "451421": "扶绥县",
		    "451422": "宁明县",
		    "451423": "龙州县",
		    "451424": "大新县",
		    "451425": "天等县",
		    "451481": "凭祥市",
		    "451482": "其它区",
		    "460000": "海南省",
		    "460100": "海口市",
		    "460105": "秀英区",
		    "460106": "龙华区",
		    "460107": "琼山区",
		    "460108": "美兰区",
		    "460109": "其它区",
		    "460200": "三亚市",
		    "460300": "三沙市",
		    "460321": "西沙群岛",
		    "460322": "南沙群岛",
		    "460323": "中沙群岛的岛礁及其海域",
		    "469001": "五指山市",
		    "469002": "琼海市",
		    "469003": "儋州市",
		    "469005": "文昌市",
		    "469006": "万宁市",
		    "469007": "东方市",
		    "469025": "定安县",
		    "469026": "屯昌县",
		    "469027": "澄迈县",
		    "469028": "临高县",
		    "469030": "白沙黎族自治县",
		    "469031": "昌江黎族自治县",
		    "469033": "乐东黎族自治县",
		    "469034": "陵水黎族自治县",
		    "469035": "保亭黎族苗族自治县",
		    "469036": "琼中黎族苗族自治县",
		    "471005": "其它区",
		    "500000": "重庆",
		    "500100": "重庆市",
		    "500101": "万州区",
		    "500102": "涪陵区",
		    "500103": "渝中区",
		    "500104": "大渡口区",
		    "500105": "江北区",
		    "500106": "沙坪坝区",
		    "500107": "九龙坡区",
		    "500108": "南岸区",
		    "500109": "北碚区",
		    "500110": "万盛区",
		    "500111": "双桥区",
		    "500112": "渝北区",
		    "500113": "巴南区",
		    "500114": "黔江区",
		    "500115": "长寿区",
		    "500222": "綦江区",
		    "500223": "潼南县",
		    "500224": "铜梁县",
		    "500225": "大足区",
		    "500226": "荣昌县",
		    "500227": "璧山县",
		    "500228": "梁平县",
		    "500229": "城口县",
		    "500230": "丰都县",
		    "500231": "垫江县",
		    "500232": "武隆县",
		    "500233": "忠县",
		    "500234": "开县",
		    "500235": "云阳县",
		    "500236": "奉节县",
		    "500237": "巫山县",
		    "500238": "巫溪县",
		    "500240": "石柱土家族自治县",
		    "500241": "秀山土家族苗族自治县",
		    "500242": "酉阳土家族苗族自治县",
		    "500243": "彭水苗族土家族自治县",
		    "500381": "江津区",
		    "500382": "合川区",
		    "500383": "永川区",
		    "500384": "南川区",
		    "500385": "其它区",
		    "510000": "四川省",
		    "510100": "成都市",
		    "510104": "锦江区",
		    "510105": "青羊区",
		    "510106": "金牛区",
		    "510107": "武侯区",
		    "510108": "成华区",
		    "510112": "龙泉驿区",
		    "510113": "青白江区",
		    "510114": "新都区",
		    "510115": "温江区",
		    "510121": "金堂县",
		    "510122": "双流县",
		    "510124": "郫县",
		    "510129": "大邑县",
		    "510131": "蒲江县",
		    "510132": "新津县",
		    "510181": "都江堰市",
		    "510182": "彭州市",
		    "510183": "邛崃市",
		    "510184": "崇州市",
		    "510185": "其它区",
		    "510300": "自贡市",
		    "510302": "自流井区",
		    "510303": "贡井区",
		    "510304": "大安区",
		    "510311": "沿滩区",
		    "510321": "荣县",
		    "510322": "富顺县",
		    "510323": "其它区",
		    "510400": "攀枝花市",
		    "510402": "东区",
		    "510403": "西区",
		    "510411": "仁和区",
		    "510421": "米易县",
		    "510422": "盐边县",
		    "510423": "其它区",
		    "510500": "泸州市",
		    "510502": "江阳区",
		    "510503": "纳溪区",
		    "510504": "龙马潭区",
		    "510521": "泸县",
		    "510522": "合江县",
		    "510524": "叙永县",
		    "510525": "古蔺县",
		    "510526": "其它区",
		    "510600": "德阳市",
		    "510603": "旌阳区",
		    "510623": "中江县",
		    "510626": "罗江县",
		    "510681": "广汉市",
		    "510682": "什邡市",
		    "510683": "绵竹市",
		    "510684": "其它区",
		    "510700": "绵阳市",
		    "510703": "涪城区",
		    "510704": "游仙区",
		    "510722": "三台县",
		    "510723": "盐亭县",
		    "510724": "安县",
		    "510725": "梓潼县",
		    "510726": "北川羌族自治县",
		    "510727": "平武县",
		    "510781": "江油市",
		    "510782": "其它区",
		    "510800": "广元市",
		    "510802": "利州区",
		    "510811": "昭化区",
		    "510812": "朝天区",
		    "510821": "旺苍县",
		    "510822": "青川县",
		    "510823": "剑阁县",
		    "510824": "苍溪县",
		    "510825": "其它区",
		    "510900": "遂宁市",
		    "510903": "船山区",
		    "510904": "安居区",
		    "510921": "蓬溪县",
		    "510922": "射洪县",
		    "510923": "大英县",
		    "510924": "其它区",
		    "511000": "内江市",
		    "511002": "市中区",
		    "511011": "东兴区",
		    "511024": "威远县",
		    "511025": "资中县",
		    "511028": "隆昌县",
		    "511029": "其它区",
		    "511100": "乐山市",
		    "511102": "市中区",
		    "511111": "沙湾区",
		    "511112": "五通桥区",
		    "511113": "金口河区",
		    "511123": "犍为县",
		    "511124": "井研县",
		    "511126": "夹江县",
		    "511129": "沐川县",
		    "511132": "峨边彝族自治县",
		    "511133": "马边彝族自治县",
		    "511181": "峨眉山市",
		    "511182": "其它区",
		    "511300": "南充市",
		    "511302": "顺庆区",
		    "511303": "高坪区",
		    "511304": "嘉陵区",
		    "511321": "南部县",
		    "511322": "营山县",
		    "511323": "蓬安县",
		    "511324": "仪陇县",
		    "511325": "西充县",
		    "511381": "阆中市",
		    "511382": "其它区",
		    "511400": "眉山市",
		    "511402": "东坡区",
		    "511421": "仁寿县",
		    "511422": "彭山县",
		    "511423": "洪雅县",
		    "511424": "丹棱县",
		    "511425": "青神县",
		    "511426": "其它区",
		    "511500": "宜宾市",
		    "511502": "翠屏区",
		    "511521": "宜宾县",
		    "511522": "南溪区",
		    "511523": "江安县",
		    "511524": "长宁县",
		    "511525": "高县",
		    "511526": "珙县",
		    "511527": "筠连县",
		    "511528": "兴文县",
		    "511529": "屏山县",
		    "511530": "其它区",
		    "511600": "广安市",
		    "511602": "广安区",
		    "511603": "前锋区",
		    "511621": "岳池县",
		    "511622": "武胜县",
		    "511623": "邻水县",
		    "511681": "华蓥市",
		    "511683": "其它区",
		    "511700": "达州市",
		    "511702": "通川区",
		    "511721": "达川区",
		    "511722": "宣汉县",
		    "511723": "开江县",
		    "511724": "大竹县",
		    "511725": "渠县",
		    "511781": "万源市",
		    "511782": "其它区",
		    "511800": "雅安市",
		    "511802": "雨城区",
		    "511821": "名山区",
		    "511822": "荥经县",
		    "511823": "汉源县",
		    "511824": "石棉县",
		    "511825": "天全县",
		    "511826": "芦山县",
		    "511827": "宝兴县",
		    "511828": "其它区",
		    "511900": "巴中市",
		    "511902": "巴州区",
		    "511903": "恩阳区",
		    "511921": "通江县",
		    "511922": "南江县",
		    "511923": "平昌县",
		    "511924": "其它区",
		    "512000": "资阳市",
		    "512002": "雁江区",
		    "512021": "安岳县",
		    "512022": "乐至县",
		    "512081": "简阳市",
		    "512082": "其它区",
		    "513200": "阿坝藏族羌族自治州",
		    "513221": "汶川县",
		    "513222": "理县",
		    "513223": "茂县",
		    "513224": "松潘县",
		    "513225": "九寨沟县",
		    "513226": "金川县",
		    "513227": "小金县",
		    "513228": "黑水县",
		    "513229": "马尔康县",
		    "513230": "壤塘县",
		    "513231": "阿坝县",
		    "513232": "若尔盖县",
		    "513233": "红原县",
		    "513234": "其它区",
		    "513300": "甘孜藏族自治州",
		    "513321": "康定县",
		    "513322": "泸定县",
		    "513323": "丹巴县",
		    "513324": "九龙县",
		    "513325": "雅江县",
		    "513326": "道孚县",
		    "513327": "炉霍县",
		    "513328": "甘孜县",
		    "513329": "新龙县",
		    "513330": "德格县",
		    "513331": "白玉县",
		    "513332": "石渠县",
		    "513333": "色达县",
		    "513334": "理塘县",
		    "513335": "巴塘县",
		    "513336": "乡城县",
		    "513337": "稻城县",
		    "513338": "得荣县",
		    "513339": "其它区",
		    "513400": "凉山彝族自治州",
		    "513401": "西昌市",
		    "513422": "木里藏族自治县",
		    "513423": "盐源县",
		    "513424": "德昌县",
		    "513425": "会理县",
		    "513426": "会东县",
		    "513427": "宁南县",
		    "513428": "普格县",
		    "513429": "布拖县",
		    "513430": "金阳县",
		    "513431": "昭觉县",
		    "513432": "喜德县",
		    "513433": "冕宁县",
		    "513434": "越西县",
		    "513435": "甘洛县",
		    "513436": "美姑县",
		    "513437": "雷波县",
		    "513438": "其它区",
		    "520000": "贵州省",
		    "520100": "贵阳市",
		    "520102": "南明区",
		    "520103": "云岩区",
		    "520111": "花溪区",
		    "520112": "乌当区",
		    "520113": "白云区",
		    "520121": "开阳县",
		    "520122": "息烽县",
		    "520123": "修文县",
		    "520151": "观山湖区",
		    "520181": "清镇市",
		    "520182": "其它区",
		    "520200": "六盘水市",
		    "520201": "钟山区",
		    "520203": "六枝特区",
		    "520221": "水城县",
		    "520222": "盘县",
		    "520223": "其它区",
		    "520300": "遵义市",
		    "520302": "红花岗区",
		    "520303": "汇川区",
		    "520321": "遵义县",
		    "520322": "桐梓县",
		    "520323": "绥阳县",
		    "520324": "正安县",
		    "520325": "道真仡佬族苗族自治县",
		    "520326": "务川仡佬族苗族自治县",
		    "520327": "凤冈县",
		    "520328": "湄潭县",
		    "520329": "余庆县",
		    "520330": "习水县",
		    "520381": "赤水市",
		    "520382": "仁怀市",
		    "520383": "其它区",
		    "520400": "安顺市",
		    "520402": "西秀区",
		    "520421": "平坝县",
		    "520422": "普定县",
		    "520423": "镇宁布依族苗族自治县",
		    "520424": "关岭布依族苗族自治县",
		    "520425": "紫云苗族布依族自治县",
		    "520426": "其它区",
		    "522200": "铜仁市",
		    "522201": "碧江区",
		    "522222": "江口县",
		    "522223": "玉屏侗族自治县",
		    "522224": "石阡县",
		    "522225": "思南县",
		    "522226": "印江土家族苗族自治县",
		    "522227": "德江县",
		    "522228": "沿河土家族自治县",
		    "522229": "松桃苗族自治县",
		    "522230": "万山区",
		    "522231": "其它区",
		    "522300": "黔西南布依族苗族自治州",
		    "522301": "兴义市",
		    "522322": "兴仁县",
		    "522323": "普安县",
		    "522324": "晴隆县",
		    "522325": "贞丰县",
		    "522326": "望谟县",
		    "522327": "册亨县",
		    "522328": "安龙县",
		    "522329": "其它区",
		    "522400": "毕节市",
		    "522401": "七星关区",
		    "522422": "大方县",
		    "522423": "黔西县",
		    "522424": "金沙县",
		    "522425": "织金县",
		    "522426": "纳雍县",
		    "522427": "威宁彝族回族苗族自治县",
		    "522428": "赫章县",
		    "522429": "其它区",
		    "522600": "黔东南苗族侗族自治州",
		    "522601": "凯里市",
		    "522622": "黄平县",
		    "522623": "施秉县",
		    "522624": "三穗县",
		    "522625": "镇远县",
		    "522626": "岑巩县",
		    "522627": "天柱县",
		    "522628": "锦屏县",
		    "522629": "剑河县",
		    "522630": "台江县",
		    "522631": "黎平县",
		    "522632": "榕江县",
		    "522633": "从江县",
		    "522634": "雷山县",
		    "522635": "麻江县",
		    "522636": "丹寨县",
		    "522637": "其它区",
		    "522700": "黔南布依族苗族自治州",
		    "522701": "都匀市",
		    "522702": "福泉市",
		    "522722": "荔波县",
		    "522723": "贵定县",
		    "522725": "瓮安县",
		    "522726": "独山县",
		    "522727": "平塘县",
		    "522728": "罗甸县",
		    "522729": "长顺县",
		    "522730": "龙里县",
		    "522731": "惠水县",
		    "522732": "三都水族自治县",
		    "522733": "其它区",
		    "530000": "云南省",
		    "530100": "昆明市",
		    "530102": "五华区",
		    "530103": "盘龙区",
		    "530111": "官渡区",
		    "530112": "西山区",
		    "530113": "东川区",
		    "530121": "呈贡区",
		    "530122": "晋宁县",
		    "530124": "富民县",
		    "530125": "宜良县",
		    "530126": "石林彝族自治县",
		    "530127": "嵩明县",
		    "530128": "禄劝彝族苗族自治县",
		    "530129": "寻甸回族彝族自治县",
		    "530181": "安宁市",
		    "530182": "其它区",
		    "530300": "曲靖市",
		    "530302": "麒麟区",
		    "530321": "马龙县",
		    "530322": "陆良县",
		    "530323": "师宗县",
		    "530324": "罗平县",
		    "530325": "富源县",
		    "530326": "会泽县",
		    "530328": "沾益县",
		    "530381": "宣威市",
		    "530382": "其它区",
		    "530400": "玉溪市",
		    "530402": "红塔区",
		    "530421": "江川县",
		    "530422": "澄江县",
		    "530423": "通海县",
		    "530424": "华宁县",
		    "530425": "易门县",
		    "530426": "峨山彝族自治县",
		    "530427": "新平彝族傣族自治县",
		    "530428": "元江哈尼族彝族傣族自治县",
		    "530429": "其它区",
		    "530500": "保山市",
		    "530502": "隆阳区",
		    "530521": "施甸县",
		    "530522": "腾冲县",
		    "530523": "龙陵县",
		    "530524": "昌宁县",
		    "530525": "其它区",
		    "530600": "昭通市",
		    "530602": "昭阳区",
		    "530621": "鲁甸县",
		    "530622": "巧家县",
		    "530623": "盐津县",
		    "530624": "大关县",
		    "530625": "永善县",
		    "530626": "绥江县",
		    "530627": "镇雄县",
		    "530628": "彝良县",
		    "530629": "威信县",
		    "530630": "水富县",
		    "530631": "其它区",
		    "530700": "丽江市",
		    "530702": "古城区",
		    "530721": "玉龙纳西族自治县",
		    "530722": "永胜县",
		    "530723": "华坪县",
		    "530724": "宁蒗彝族自治县",
		    "530725": "其它区",
		    "530800": "普洱市",
		    "530802": "思茅区",
		    "530821": "宁洱哈尼族彝族自治县",
		    "530822": "墨江哈尼族自治县",
		    "530823": "景东彝族自治县",
		    "530824": "景谷傣族彝族自治县",
		    "530825": "镇沅彝族哈尼族拉祜族自治县",
		    "530826": "江城哈尼族彝族自治县",
		    "530827": "孟连傣族拉祜族佤族自治县",
		    "530828": "澜沧拉祜族自治县",
		    "530829": "西盟佤族自治县",
		    "530830": "其它区",
		    "530900": "临沧市",
		    "530902": "临翔区",
		    "530921": "凤庆县",
		    "530922": "云县",
		    "530923": "永德县",
		    "530924": "镇康县",
		    "530925": "双江拉祜族佤族布朗族傣族自治县",
		    "530926": "耿马傣族佤族自治县",
		    "530927": "沧源佤族自治县",
		    "530928": "其它区",
		    "532300": "楚雄彝族自治州",
		    "532301": "楚雄市",
		    "532322": "双柏县",
		    "532323": "牟定县",
		    "532324": "南华县",
		    "532325": "姚安县",
		    "532326": "大姚县",
		    "532327": "永仁县",
		    "532328": "元谋县",
		    "532329": "武定县",
		    "532331": "禄丰县",
		    "532332": "其它区",
		    "532500": "红河哈尼族彝族自治州",
		    "532501": "个旧市",
		    "532502": "开远市",
		    "532522": "蒙自市",
		    "532523": "屏边苗族自治县",
		    "532524": "建水县",
		    "532525": "石屏县",
		    "532526": "弥勒市",
		    "532527": "泸西县",
		    "532528": "元阳县",
		    "532529": "红河县",
		    "532530": "金平苗族瑶族傣族自治县",
		    "532531": "绿春县",
		    "532532": "河口瑶族自治县",
		    "532533": "其它区",
		    "532600": "文山壮族苗族自治州",
		    "532621": "文山市",
		    "532622": "砚山县",
		    "532623": "西畴县",
		    "532624": "麻栗坡县",
		    "532625": "马关县",
		    "532626": "丘北县",
		    "532627": "广南县",
		    "532628": "富宁县",
		    "532629": "其它区",
		    "532800": "西双版纳傣族自治州",
		    "532801": "景洪市",
		    "532822": "勐海县",
		    "532823": "勐腊县",
		    "532824": "其它区",
		    "532900": "大理白族自治州",
		    "532901": "大理市",
		    "532922": "漾濞彝族自治县",
		    "532923": "祥云县",
		    "532924": "宾川县",
		    "532925": "弥渡县",
		    "532926": "南涧彝族自治县",
		    "532927": "巍山彝族回族自治县",
		    "532928": "永平县",
		    "532929": "云龙县",
		    "532930": "洱源县",
		    "532931": "剑川县",
		    "532932": "鹤庆县",
		    "532933": "其它区",
		    "533100": "德宏傣族景颇族自治州",
		    "533102": "瑞丽市",
		    "533103": "芒市",
		    "533122": "梁河县",
		    "533123": "盈江县",
		    "533124": "陇川县",
		    "533125": "其它区",
		    "533300": "怒江傈僳族自治州",
		    "533321": "泸水县",
		    "533323": "福贡县",
		    "533324": "贡山独龙族怒族自治县",
		    "533325": "兰坪白族普米族自治县",
		    "533326": "其它区",
		    "533400": "迪庆藏族自治州",
		    "533421": "香格里拉县",
		    "533422": "德钦县",
		    "533423": "维西傈僳族自治县",
		    "533424": "其它区",
		    "540000": "西藏自治区",
		    "540100": "拉萨市",
		    "540102": "城关区",
		    "540121": "林周县",
		    "540122": "当雄县",
		    "540123": "尼木县",
		    "540124": "曲水县",
		    "540125": "堆龙德庆县",
		    "540126": "达孜县",
		    "540127": "墨竹工卡县",
		    "540128": "其它区",
		    "542100": "昌都地区",
		    "542121": "昌都县",
		    "542122": "江达县",
		    "542123": "贡觉县",
		    "542124": "类乌齐县",
		    "542125": "丁青县",
		    "542126": "察雅县",
		    "542127": "八宿县",
		    "542128": "左贡县",
		    "542129": "芒康县",
		    "542132": "洛隆县",
		    "542133": "边坝县",
		    "542134": "其它区",
		    "542200": "山南地区",
		    "542221": "乃东县",
		    "542222": "扎囊县",
		    "542223": "贡嘎县",
		    "542224": "桑日县",
		    "542225": "琼结县",
		    "542226": "曲松县",
		    "542227": "措美县",
		    "542228": "洛扎县",
		    "542229": "加查县",
		    "542231": "隆子县",
		    "542232": "错那县",
		    "542233": "浪卡子县",
		    "542234": "其它区",
		    "542300": "日喀则地区",
		    "542301": "日喀则市",
		    "542322": "南木林县",
		    "542323": "江孜县",
		    "542324": "定日县",
		    "542325": "萨迦县",
		    "542326": "拉孜县",
		    "542327": "昂仁县",
		    "542328": "谢通门县",
		    "542329": "白朗县",
		    "542330": "仁布县",
		    "542331": "康马县",
		    "542332": "定结县",
		    "542333": "仲巴县",
		    "542334": "亚东县",
		    "542335": "吉隆县",
		    "542336": "聂拉木县",
		    "542337": "萨嘎县",
		    "542338": "岗巴县",
		    "542339": "其它区",
		    "542400": "那曲地区",
		    "542421": "那曲县",
		    "542422": "嘉黎县",
		    "542423": "比如县",
		    "542424": "聂荣县",
		    "542425": "安多县",
		    "542426": "申扎县",
		    "542427": "索县",
		    "542428": "班戈县",
		    "542429": "巴青县",
		    "542430": "尼玛县",
		    "542431": "其它区",
		    "542432": "双湖县",
		    "542500": "阿里地区",
		    "542521": "普兰县",
		    "542522": "札达县",
		    "542523": "噶尔县",
		    "542524": "日土县",
		    "542525": "革吉县",
		    "542526": "改则县",
		    "542527": "措勤县",
		    "542528": "其它区",
		    "542600": "林芝地区",
		    "542621": "林芝县",
		    "542622": "工布江达县",
		    "542623": "米林县",
		    "542624": "墨脱县",
		    "542625": "波密县",
		    "542626": "察隅县",
		    "542627": "朗县",
		    "542628": "其它区",
		    "610000": "陕西省",
		    "610100": "西安市",
		    "610102": "新城区",
		    "610103": "碑林区",
		    "610104": "莲湖区",
		    "610111": "灞桥区",
		    "610112": "未央区",
		    "610113": "雁塔区",
		    "610114": "阎良区",
		    "610115": "临潼区",
		    "610116": "长安区",
		    "610122": "蓝田县",
		    "610124": "周至县",
		    "610125": "户县",
		    "610126": "高陵县",
		    "610127": "其它区",
		    "610200": "铜川市",
		    "610202": "王益区",
		    "610203": "印台区",
		    "610204": "耀州区",
		    "610222": "宜君县",
		    "610223": "其它区",
		    "610300": "宝鸡市",
		    "610302": "渭滨区",
		    "610303": "金台区",
		    "610304": "陈仓区",
		    "610322": "凤翔县",
		    "610323": "岐山县",
		    "610324": "扶风县",
		    "610326": "眉县",
		    "610327": "陇县",
		    "610328": "千阳县",
		    "610329": "麟游县",
		    "610330": "凤县",
		    "610331": "太白县",
		    "610332": "其它区",
		    "610400": "咸阳市",
		    "610402": "秦都区",
		    "610403": "杨陵区",
		    "610404": "渭城区",
		    "610422": "三原县",
		    "610423": "泾阳县",
		    "610424": "乾县",
		    "610425": "礼泉县",
		    "610426": "永寿县",
		    "610427": "彬县",
		    "610428": "长武县",
		    "610429": "旬邑县",
		    "610430": "淳化县",
		    "610431": "武功县",
		    "610481": "兴平市",
		    "610482": "其它区",
		    "610500": "渭南市",
		    "610502": "临渭区",
		    "610521": "华县",
		    "610522": "潼关县",
		    "610523": "大荔县",
		    "610524": "合阳县",
		    "610525": "澄城县",
		    "610526": "蒲城县",
		    "610527": "白水县",
		    "610528": "富平县",
		    "610581": "韩城市",
		    "610582": "华阴市",
		    "610583": "其它区",
		    "610600": "延安市",
		    "610602": "宝塔区",
		    "610621": "延长县",
		    "610622": "延川县",
		    "610623": "子长县",
		    "610624": "安塞县",
		    "610625": "志丹县",
		    "610626": "吴起县",
		    "610627": "甘泉县",
		    "610628": "富县",
		    "610629": "洛川县",
		    "610630": "宜川县",
		    "610631": "黄龙县",
		    "610632": "黄陵县",
		    "610633": "其它区",
		    "610700": "汉中市",
		    "610702": "汉台区",
		    "610721": "南郑县",
		    "610722": "城固县",
		    "610723": "洋县",
		    "610724": "西乡县",
		    "610725": "勉县",
		    "610726": "宁强县",
		    "610727": "略阳县",
		    "610728": "镇巴县",
		    "610729": "留坝县",
		    "610730": "佛坪县",
		    "610731": "其它区",
		    "610800": "榆林市",
		    "610802": "榆阳区",
		    "610821": "神木县",
		    "610822": "府谷县",
		    "610823": "横山县",
		    "610824": "靖边县",
		    "610825": "定边县",
		    "610826": "绥德县",
		    "610827": "米脂县",
		    "610828": "佳县",
		    "610829": "吴堡县",
		    "610830": "清涧县",
		    "610831": "子洲县",
		    "610832": "其它区",
		    "610900": "安康市",
		    "610902": "汉滨区",
		    "610921": "汉阴县",
		    "610922": "石泉县",
		    "610923": "宁陕县",
		    "610924": "紫阳县",
		    "610925": "岚皋县",
		    "610926": "平利县",
		    "610927": "镇坪县",
		    "610928": "旬阳县",
		    "610929": "白河县",
		    "610930": "其它区",
		    "611000": "商洛市",
		    "611002": "商州区",
		    "611021": "洛南县",
		    "611022": "丹凤县",
		    "611023": "商南县",
		    "611024": "山阳县",
		    "611025": "镇安县",
		    "611026": "柞水县",
		    "611027": "其它区",
		    "620000": "甘肃省",
		    "620100": "兰州市",
		    "620102": "城关区",
		    "620103": "七里河区",
		    "620104": "西固区",
		    "620105": "安宁区",
		    "620111": "红古区",
		    "620121": "永登县",
		    "620122": "皋兰县",
		    "620123": "榆中县",
		    "620124": "其它区",
		    "620200": "嘉峪关市",
		    "620300": "金昌市",
		    "620302": "金川区",
		    "620321": "永昌县",
		    "620322": "其它区",
		    "620400": "白银市",
		    "620402": "白银区",
		    "620403": "平川区",
		    "620421": "靖远县",
		    "620422": "会宁县",
		    "620423": "景泰县",
		    "620424": "其它区",
		    "620500": "天水市",
		    "620502": "秦州区",
		    "620503": "麦积区",
		    "620521": "清水县",
		    "620522": "秦安县",
		    "620523": "甘谷县",
		    "620524": "武山县",
		    "620525": "张家川回族自治县",
		    "620526": "其它区",
		    "620600": "武威市",
		    "620602": "凉州区",
		    "620621": "民勤县",
		    "620622": "古浪县",
		    "620623": "天祝藏族自治县",
		    "620624": "其它区",
		    "620700": "张掖市",
		    "620702": "甘州区",
		    "620721": "肃南裕固族自治县",
		    "620722": "民乐县",
		    "620723": "临泽县",
		    "620724": "高台县",
		    "620725": "山丹县",
		    "620726": "其它区",
		    "620800": "平凉市",
		    "620802": "崆峒区",
		    "620821": "泾川县",
		    "620822": "灵台县",
		    "620823": "崇信县",
		    "620824": "华亭县",
		    "620825": "庄浪县",
		    "620826": "静宁县",
		    "620827": "其它区",
		    "620900": "酒泉市",
		    "620902": "肃州区",
		    "620921": "金塔县",
		    "620922": "瓜州县",
		    "620923": "肃北蒙古族自治县",
		    "620924": "阿克塞哈萨克族自治县",
		    "620981": "玉门市",
		    "620982": "敦煌市",
		    "620983": "其它区",
		    "621000": "庆阳市",
		    "621002": "西峰区",
		    "621021": "庆城县",
		    "621022": "环县",
		    "621023": "华池县",
		    "621024": "合水县",
		    "621025": "正宁县",
		    "621026": "宁县",
		    "621027": "镇原县",
		    "621028": "其它区",
		    "621100": "定西市",
		    "621102": "安定区",
		    "621121": "通渭县",
		    "621122": "陇西县",
		    "621123": "渭源县",
		    "621124": "临洮县",
		    "621125": "漳县",
		    "621126": "岷县",
		    "621127": "其它区",
		    "621200": "陇南市",
		    "621202": "武都区",
		    "621221": "成县",
		    "621222": "文县",
		    "621223": "宕昌县",
		    "621224": "康县",
		    "621225": "西和县",
		    "621226": "礼县",
		    "621227": "徽县",
		    "621228": "两当县",
		    "621229": "其它区",
		    "622900": "临夏回族自治州",
		    "622901": "临夏市",
		    "622921": "临夏县",
		    "622922": "康乐县",
		    "622923": "永靖县",
		    "622924": "广河县",
		    "622925": "和政县",
		    "622926": "东乡族自治县",
		    "622927": "积石山保安族东乡族撒拉族自治县",
		    "622928": "其它区",
		    "623000": "甘南藏族自治州",
		    "623001": "合作市",
		    "623021": "临潭县",
		    "623022": "卓尼县",
		    "623023": "舟曲县",
		    "623024": "迭部县",
		    "623025": "玛曲县",
		    "623026": "碌曲县",
		    "623027": "夏河县",
		    "623028": "其它区",
		    "630000": "青海省",
		    "630100": "西宁市",
		    "630102": "城东区",
		    "630103": "城中区",
		    "630104": "城西区",
		    "630105": "城北区",
		    "630121": "大通回族土族自治县",
		    "630122": "湟中县",
		    "630123": "湟源县",
		    "630124": "其它区",
		    "632100": "海东市",
		    "632121": "平安县",
		    "632122": "民和回族土族自治县",
		    "632123": "乐都区",
		    "632126": "互助土族自治县",
		    "632127": "化隆回族自治县",
		    "632128": "循化撒拉族自治县",
		    "632129": "其它区",
		    "632200": "海北藏族自治州",
		    "632221": "门源回族自治县",
		    "632222": "祁连县",
		    "632223": "海晏县",
		    "632224": "刚察县",
		    "632225": "其它区",
		    "632300": "黄南藏族自治州",
		    "632321": "同仁县",
		    "632322": "尖扎县",
		    "632323": "泽库县",
		    "632324": "河南蒙古族自治县",
		    "632325": "其它区",
		    "632500": "海南藏族自治州",
		    "632521": "共和县",
		    "632522": "同德县",
		    "632523": "贵德县",
		    "632524": "兴海县",
		    "632525": "贵南县",
		    "632526": "其它区",
		    "632600": "果洛藏族自治州",
		    "632621": "玛沁县",
		    "632622": "班玛县",
		    "632623": "甘德县",
		    "632624": "达日县",
		    "632625": "久治县",
		    "632626": "玛多县",
		    "632627": "其它区",
		    "632700": "玉树藏族自治州",
		    "632721": "玉树市",
		    "632722": "杂多县",
		    "632723": "称多县",
		    "632724": "治多县",
		    "632725": "囊谦县",
		    "632726": "曲麻莱县",
		    "632727": "其它区",
		    "632800": "海西蒙古族藏族自治州",
		    "632801": "格尔木市",
		    "632802": "德令哈市",
		    "632821": "乌兰县",
		    "632822": "都兰县",
		    "632823": "天峻县",
		    "632824": "其它区",
		    "640000": "宁夏回族自治区",
		    "640100": "银川市",
		    "640104": "兴庆区",
		    "640105": "西夏区",
		    "640106": "金凤区",
		    "640121": "永宁县",
		    "640122": "贺兰县",
		    "640181": "灵武市",
		    "640182": "其它区",
		    "640200": "石嘴山市",
		    "640202": "大武口区",
		    "640205": "惠农区",
		    "640221": "平罗县",
		    "640222": "其它区",
		    "640300": "吴忠市",
		    "640302": "利通区",
		    "640303": "红寺堡区",
		    "640323": "盐池县",
		    "640324": "同心县",
		    "640381": "青铜峡市",
		    "640382": "其它区",
		    "640400": "固原市",
		    "640402": "原州区",
		    "640422": "西吉县",
		    "640423": "隆德县",
		    "640424": "泾源县",
		    "640425": "彭阳县",
		    "640426": "其它区",
		    "640500": "中卫市",
		    "640502": "沙坡头区",
		    "640521": "中宁县",
		    "640522": "海原县",
		    "640523": "其它区",
		    "650000": "新疆维吾尔自治区",
		    "650100": "乌鲁木齐市",
		    "650102": "天山区",
		    "650103": "沙依巴克区",
		    "650104": "新市区",
		    "650105": "水磨沟区",
		    "650106": "头屯河区",
		    "650107": "达坂城区",
		    "650109": "米东区",
		    "650121": "乌鲁木齐县",
		    "650122": "其它区",
		    "650200": "克拉玛依市",
		    "650202": "独山子区",
		    "650203": "克拉玛依区",
		    "650204": "白碱滩区",
		    "650205": "乌尔禾区",
		    "650206": "其它区",
		    "652100": "吐鲁番地区",
		    "652101": "吐鲁番市",
		    "652122": "鄯善县",
		    "652123": "托克逊县",
		    "652124": "其它区",
		    "652200": "哈密地区",
		    "652201": "哈密市",
		    "652222": "巴里坤哈萨克自治县",
		    "652223": "伊吾县",
		    "652224": "其它区",
		    "652300": "昌吉回族自治州",
		    "652301": "昌吉市",
		    "652302": "阜康市",
		    "652323": "呼图壁县",
		    "652324": "玛纳斯县",
		    "652325": "奇台县",
		    "652327": "吉木萨尔县",
		    "652328": "木垒哈萨克自治县",
		    "652329": "其它区",
		    "652700": "博尔塔拉蒙古自治州",
		    "652701": "博乐市",
		    "652702": "阿拉山口市",
		    "652722": "精河县",
		    "652723": "温泉县",
		    "652724": "其它区",
		    "652800": "巴音郭楞蒙古自治州",
		    "652801": "库尔勒市",
		    "652822": "轮台县",
		    "652823": "尉犁县",
		    "652824": "若羌县",
		    "652825": "且末县",
		    "652826": "焉耆回族自治县",
		    "652827": "和静县",
		    "652828": "和硕县",
		    "652829": "博湖县",
		    "652830": "其它区",
		    "652900": "阿克苏地区",
		    "652901": "阿克苏市",
		    "652922": "温宿县",
		    "652923": "库车县",
		    "652924": "沙雅县",
		    "652925": "新和县",
		    "652926": "拜城县",
		    "652927": "乌什县",
		    "652928": "阿瓦提县",
		    "652929": "柯坪县",
		    "652930": "其它区",
		    "653000": "克孜勒苏柯尔克孜自治州",
		    "653001": "阿图什市",
		    "653022": "阿克陶县",
		    "653023": "阿合奇县",
		    "653024": "乌恰县",
		    "653025": "其它区",
		    "653100": "喀什地区",
		    "653101": "喀什市",
		    "653121": "疏附县",
		    "653122": "疏勒县",
		    "653123": "英吉沙县",
		    "653124": "泽普县",
		    "653125": "莎车县",
		    "653126": "叶城县",
		    "653127": "麦盖提县",
		    "653128": "岳普湖县",
		    "653129": "伽师县",
		    "653130": "巴楚县",
		    "653131": "塔什库尔干塔吉克自治县",
		    "653132": "其它区",
		    "653200": "和田地区",
		    "653201": "和田市",
		    "653221": "和田县",
		    "653222": "墨玉县",
		    "653223": "皮山县",
		    "653224": "洛浦县",
		    "653225": "策勒县",
		    "653226": "于田县",
		    "653227": "民丰县",
		    "653228": "其它区",
		    "654000": "伊犁哈萨克自治州",
		    "654002": "伊宁市",
		    "654003": "奎屯市",
		    "654021": "伊宁县",
		    "654022": "察布查尔锡伯自治县",
		    "654023": "霍城县",
		    "654024": "巩留县",
		    "654025": "新源县",
		    "654026": "昭苏县",
		    "654027": "特克斯县",
		    "654028": "尼勒克县",
		    "654029": "其它区",
		    "654200": "塔城地区",
		    "654201": "塔城市",
		    "654202": "乌苏市",
		    "654221": "额敏县",
		    "654223": "沙湾县",
		    "654224": "托里县",
		    "654225": "裕民县",
		    "654226": "和布克赛尔蒙古自治县",
		    "654227": "其它区",
		    "654300": "阿勒泰地区",
		    "654301": "阿勒泰市",
		    "654321": "布尔津县",
		    "654322": "富蕴县",
		    "654323": "福海县",
		    "654324": "哈巴河县",
		    "654325": "青河县",
		    "654326": "吉木乃县",
		    "654327": "其它区",
		    "659001": "石河子市",
		    "659002": "阿拉尔市",
		    "659003": "图木舒克市",
		    "659004": "五家渠市",
		    "710000": "台湾",
		    "710100": "台北市",
		    "710101": "中正区",
		    "710102": "大同区",
		    "710103": "中山区",
		    "710104": "松山区",
		    "710105": "大安区",
		    "710106": "万华区",
		    "710107": "信义区",
		    "710108": "士林区",
		    "710109": "北投区",
		    "710110": "内湖区",
		    "710111": "南港区",
		    "710112": "文山区",
		    "710113": "其它区",
		    "710200": "高雄市",
		    "710201": "新兴区",
		    "710202": "前金区",
		    "710203": "芩雅区",
		    "710204": "盐埕区",
		    "710205": "鼓山区",
		    "710206": "旗津区",
		    "710207": "前镇区",
		    "710208": "三民区",
		    "710209": "左营区",
		    "710210": "楠梓区",
		    "710211": "小港区",
		    "710212": "其它区",
		    "710241": "苓雅区",
		    "710242": "仁武区",
		    "710243": "大社区",
		    "710244": "冈山区",
		    "710245": "路竹区",
		    "710246": "阿莲区",
		    "710247": "田寮区",
		    "710248": "燕巢区",
		    "710249": "桥头区",
		    "710250": "梓官区",
		    "710251": "弥陀区",
		    "710252": "永安区",
		    "710253": "湖内区",
		    "710254": "凤山区",
		    "710255": "大寮区",
		    "710256": "林园区",
		    "710257": "鸟松区",
		    "710258": "大树区",
		    "710259": "旗山区",
		    "710260": "美浓区",
		    "710261": "六龟区",
		    "710262": "内门区",
		    "710263": "杉林区",
		    "710264": "甲仙区",
		    "710265": "桃源区",
		    "710266": "那玛夏区",
		    "710267": "茂林区",
		    "710268": "茄萣区",
		    "710300": "台南市",
		    "710301": "中西区",
		    "710302": "东区",
		    "710303": "南区",
		    "710304": "北区",
		    "710305": "安平区",
		    "710306": "安南区",
		    "710307": "其它区",
		    "710339": "永康区",
		    "710340": "归仁区",
		    "710341": "新化区",
		    "710342": "左镇区",
		    "710343": "玉井区",
		    "710344": "楠西区",
		    "710345": "南化区",
		    "710346": "仁德区",
		    "710347": "关庙区",
		    "710348": "龙崎区",
		    "710349": "官田区",
		    "710350": "麻豆区",
		    "710351": "佳里区",
		    "710352": "西港区",
		    "710353": "七股区",
		    "710354": "将军区",
		    "710355": "学甲区",
		    "710356": "北门区",
		    "710357": "新营区",
		    "710358": "后壁区",
		    "710359": "白河区",
		    "710360": "东山区",
		    "710361": "六甲区",
		    "710362": "下营区",
		    "710363": "柳营区",
		    "710364": "盐水区",
		    "710365": "善化区",
		    "710366": "大内区",
		    "710367": "山上区",
		    "710368": "新市区",
		    "710369": "安定区",
		    "710400": "台中市",
		    "710401": "中区",
		    "710402": "东区",
		    "710403": "南区",
		    "710404": "西区",
		    "710405": "北区",
		    "710406": "北屯区",
		    "710407": "西屯区",
		    "710408": "南屯区",
		    "710409": "其它区",
		    "710431": "太平区",
		    "710432": "大里区",
		    "710433": "雾峰区",
		    "710434": "乌日区",
		    "710435": "丰原区",
		    "710436": "后里区",
		    "710437": "石冈区",
		    "710438": "东势区",
		    "710439": "和平区",
		    "710440": "新社区",
		    "710441": "潭子区",
		    "710442": "大雅区",
		    "710443": "神冈区",
		    "710444": "大肚区",
		    "710445": "沙鹿区",
		    "710446": "龙井区",
		    "710447": "梧栖区",
		    "710448": "清水区",
		    "710449": "大甲区",
		    "710450": "外埔区",
		    "710451": "大安区",
		    "710500": "金门县",
		    "710507": "金沙镇",
		    "710508": "金湖镇",
		    "710509": "金宁乡",
		    "710510": "金城镇",
		    "710511": "烈屿乡",
		    "710512": "乌坵乡",
		    "710600": "南投县",
		    "710614": "南投市",
		    "710615": "中寮乡",
		    "710616": "草屯镇",
		    "710617": "国姓乡",
		    "710618": "埔里镇",
		    "710619": "仁爱乡",
		    "710620": "名间乡",
		    "710621": "集集镇",
		    "710622": "水里乡",
		    "710623": "鱼池乡",
		    "710624": "信义乡",
		    "710625": "竹山镇",
		    "710626": "鹿谷乡",
		    "710700": "基隆市",
		    "710701": "仁爱区",
		    "710702": "信义区",
		    "710703": "中正区",
		    "710704": "中山区",
		    "710705": "安乐区",
		    "710706": "暖暖区",
		    "710707": "七堵区",
		    "710708": "其它区",
		    "710800": "新竹市",
		    "710801": "东区",
		    "710802": "北区",
		    "710803": "香山区",
		    "710804": "其它区",
		    "710900": "嘉义市",
		    "710901": "东区",
		    "710902": "西区",
		    "710903": "其它区",
		    "711100": "新北市",
		    "711130": "万里区",
		    "711131": "金山区",
		    "711132": "板桥区",
		    "711133": "汐止区",
		    "711134": "深坑区",
		    "711135": "石碇区",
		    "711136": "瑞芳区",
		    "711137": "平溪区",
		    "711138": "双溪区",
		    "711139": "贡寮区",
		    "711140": "新店区",
		    "711141": "坪林区",
		    "711142": "乌来区",
		    "711143": "永和区",
		    "711144": "中和区",
		    "711145": "土城区",
		    "711146": "三峡区",
		    "711147": "树林区",
		    "711148": "莺歌区",
		    "711149": "三重区",
		    "711150": "新庄区",
		    "711151": "泰山区",
		    "711152": "林口区",
		    "711153": "芦洲区",
		    "711154": "五股区",
		    "711155": "八里区",
		    "711156": "淡水区",
		    "711157": "三芝区",
		    "711158": "石门区",
		    "711200": "宜兰县",
		    "711214": "宜兰市",
		    "711215": "头城镇",
		    "711216": "礁溪乡",
		    "711217": "壮围乡",
		    "711218": "员山乡",
		    "711219": "罗东镇",
		    "711220": "三星乡",
		    "711221": "大同乡",
		    "711222": "五结乡",
		    "711223": "冬山乡",
		    "711224": "苏澳镇",
		    "711225": "南澳乡",
		    "711226": "钓鱼台",
		    "711300": "新竹县",
		    "711314": "竹北市",
		    "711315": "湖口乡",
		    "711316": "新丰乡",
		    "711317": "新埔镇",
		    "711318": "关西镇",
		    "711319": "芎林乡",
		    "711320": "宝山乡",
		    "711321": "竹东镇",
		    "711322": "五峰乡",
		    "711323": "横山乡",
		    "711324": "尖石乡",
		    "711325": "北埔乡",
		    "711326": "峨眉乡",
		    "711400": "桃园县",
		    "711414": "中坜市",
		    "711415": "平镇市",
		    "711416": "龙潭乡",
		    "711417": "杨梅市",
		    "711418": "新屋乡",
		    "711419": "观音乡",
		    "711420": "桃园市",
		    "711421": "龟山乡",
		    "711422": "八德市",
		    "711423": "大溪镇",
		    "711424": "复兴乡",
		    "711425": "大园乡",
		    "711426": "芦竹乡",
		    "711500": "苗栗县",
		    "711519": "竹南镇",
		    "711520": "头份镇",
		    "711521": "三湾乡",
		    "711522": "南庄乡",
		    "711523": "狮潭乡",
		    "711524": "后龙镇",
		    "711525": "通霄镇",
		    "711526": "苑里镇",
		    "711527": "苗栗市",
		    "711528": "造桥乡",
		    "711529": "头屋乡",
		    "711530": "公馆乡",
		    "711531": "大湖乡",
		    "711532": "泰安乡",
		    "711533": "铜锣乡",
		    "711534": "三义乡",
		    "711535": "西湖乡",
		    "711536": "卓兰镇",
		    "711700": "彰化县",
		    "711727": "彰化市",
		    "711728": "芬园乡",
		    "711729": "花坛乡",
		    "711730": "秀水乡",
		    "711731": "鹿港镇",
		    "711732": "福兴乡",
		    "711733": "线西乡",
		    "711734": "和美镇",
		    "711735": "伸港乡",
		    "711736": "员林镇",
		    "711737": "社头乡",
		    "711738": "永靖乡",
		    "711739": "埔心乡",
		    "711740": "溪湖镇",
		    "711741": "大村乡",
		    "711742": "埔盐乡",
		    "711743": "田中镇",
		    "711744": "北斗镇",
		    "711745": "田尾乡",
		    "711746": "埤头乡",
		    "711747": "溪州乡",
		    "711748": "竹塘乡",
		    "711749": "二林镇",
		    "711750": "大城乡",
		    "711751": "芳苑乡",
		    "711752": "二水乡",
		    "711900": "嘉义县",
		    "711919": "番路乡",
		    "711920": "梅山乡",
		    "711921": "竹崎乡",
		    "711922": "阿里山乡",
		    "711923": "中埔乡",
		    "711924": "大埔乡",
		    "711925": "水上乡",
		    "711926": "鹿草乡",
		    "711927": "太保市",
		    "711928": "朴子市",
		    "711929": "东石乡",
		    "711930": "六脚乡",
		    "711931": "新港乡",
		    "711932": "民雄乡",
		    "711933": "大林镇",
		    "711934": "溪口乡",
		    "711935": "义竹乡",
		    "711936": "布袋镇",
		    "712100": "云林县",
		    "712121": "斗南镇",
		    "712122": "大埤乡",
		    "712123": "虎尾镇",
		    "712124": "土库镇",
		    "712125": "褒忠乡",
		    "712126": "东势乡",
		    "712127": "台西乡",
		    "712128": "仑背乡",
		    "712129": "麦寮乡",
		    "712130": "斗六市",
		    "712131": "林内乡",
		    "712132": "古坑乡",
		    "712133": "莿桐乡",
		    "712134": "西螺镇",
		    "712135": "二仑乡",
		    "712136": "北港镇",
		    "712137": "水林乡",
		    "712138": "口湖乡",
		    "712139": "四湖乡",
		    "712140": "元长乡",
		    "712400": "屏东县",
		    "712434": "屏东市",
		    "712435": "三地门乡",
		    "712436": "雾台乡",
		    "712437": "玛家乡",
		    "712438": "九如乡",
		    "712439": "里港乡",
		    "712440": "高树乡",
		    "712441": "盐埔乡",
		    "712442": "长治乡",
		    "712443": "麟洛乡",
		    "712444": "竹田乡",
		    "712445": "内埔乡",
		    "712446": "万丹乡",
		    "712447": "潮州镇",
		    "712448": "泰武乡",
		    "712449": "来义乡",
		    "712450": "万峦乡",
		    "712451": "崁顶乡",
		    "712452": "新埤乡",
		    "712453": "南州乡",
		    "712454": "林边乡",
		    "712455": "东港镇",
		    "712456": "琉球乡",
		    "712457": "佳冬乡",
		    "712458": "新园乡",
		    "712459": "枋寮乡",
		    "712460": "枋山乡",
		    "712461": "春日乡",
		    "712462": "狮子乡",
		    "712463": "车城乡",
		    "712464": "牡丹乡",
		    "712465": "恒春镇",
		    "712466": "满州乡",
		    "712500": "台东县",
		    "712517": "台东市",
		    "712518": "绿岛乡",
		    "712519": "兰屿乡",
		    "712520": "延平乡",
		    "712521": "卑南乡",
		    "712522": "鹿野乡",
		    "712523": "关山镇",
		    "712524": "海端乡",
		    "712525": "池上乡",
		    "712526": "东河乡",
		    "712527": "成功镇",
		    "712528": "长滨乡",
		    "712529": "金峰乡",
		    "712530": "大武乡",
		    "712531": "达仁乡",
		    "712532": "太麻里乡",
		    "712600": "花莲县",
		    "712615": "花莲市",
		    "712616": "新城乡",
		    "712617": "太鲁阁",
		    "712618": "秀林乡",
		    "712619": "吉安乡",
		    "712620": "寿丰乡",
		    "712621": "凤林镇",
		    "712622": "光复乡",
		    "712623": "丰滨乡",
		    "712624": "瑞穗乡",
		    "712625": "万荣乡",
		    "712626": "玉里镇",
		    "712627": "卓溪乡",
		    "712628": "富里乡",
		    "712700": "澎湖县",
		    "712707": "马公市",
		    "712708": "西屿乡",
		    "712709": "望安乡",
		    "712710": "七美乡",
		    "712711": "白沙乡",
		    "712712": "湖西乡",
		    "712800": "连江县",
		    "712805": "南竿乡",
		    "712806": "北竿乡",
		    "712807": "莒光乡",
		    "712808": "东引乡",
		    "810000": "香港特别行政区",
		    "810100": "香港岛",
		    "810101": "中西区",
		    "810102": "湾仔",
		    "810103": "东区",
		    "810104": "南区",
		    "810200": "九龙",
		    "810201": "九龙城区",
		    "810202": "油尖旺区",
		    "810203": "深水埗区",
		    "810204": "黄大仙区",
		    "810205": "观塘区",
		    "810300": "新界",
		    "810301": "北区",
		    "810302": "大埔区",
		    "810303": "沙田区",
		    "810304": "西贡区",
		    "810305": "元朗区",
		    "810306": "屯门区",
		    "810307": "荃湾区",
		    "810308": "葵青区",
		    "810309": "离岛区",
		    "820000": "澳门特别行政区",
		    "820100": "澳门半岛",
		    "820200": "离岛",
		    "990000": "海外",
		    "990100": "海外"
		}
	
		// id pid/parentId name children
		function tree(list) {
		    var mapped = {}
		    for (var i = 0, item; i < list.length; i++) {
		        item = list[i]
		        if (!item || !item.id) continue
		        mapped[item.id] = item
		    }
	
		    var result = []
		    for (var ii = 0; ii < list.length; ii++) {
		        item = list[ii]
	
		        if (!item) continue
		            /* jshint -W041 */
		        if (item.pid == undefined && item.parentId == undefined) {
		            result.push(item)
		            continue
		        }
		        var parent = mapped[item.pid] || mapped[item.parentId]
		        if (!parent) continue
		        if (!parent.children) parent.children = []
		        parent.children.push(item)
		    }
		    return result
		}
	
		var DICT_FIXED = function() {
		    var fixed = []
		    for (var id in DICT) {
		        var pid = id.slice(2, 6) === '0000' ? undefined :
		            id.slice(4, 6) == '00' ? (id.slice(0, 2) + '0000') :
		            id.slice(0, 4) + '00'
		        fixed.push({
		            id: id,
		            pid: pid,
		            name: DICT[id]
		        })
		    }
		    return tree(fixed)
		}()
	
		module.exports = DICT_FIXED
	
	/***/ },
	/* 19 */
	/***/ function(module, exports, __webpack_require__) {
	
		/*
		    ## Miscellaneous
		*/
		var DICT = __webpack_require__(18)
		module.exports = {
			// Dice
			d4: function() {
				return this.natural(1, 4)
			},
			d6: function() {
				return this.natural(1, 6)
			},
			d8: function() {
				return this.natural(1, 8)
			},
			d12: function() {
				return this.natural(1, 12)
			},
			d20: function() {
				return this.natural(1, 20)
			},
			d100: function() {
				return this.natural(1, 100)
			},
			/*
			    随机生成一个 GUID。
	
			    http://www.broofa.com/2008/09/javascript-uuid-function/
			    [UUID 规范](http://www.ietf.org/rfc/rfc4122.txt)
			        UUIDs (Universally Unique IDentifier)
			        GUIDs (Globally Unique IDentifier)
			        The formal definition of the UUID string representation is provided by the following ABNF [7]:
			            UUID                   = time-low "-" time-mid "-"
			                                   time-high-and-version "-"
			                                   clock-seq-and-reserved
			                                   clock-seq-low "-" node
			            time-low               = 4hexOctet
			            time-mid               = 2hexOctet
			            time-high-and-version  = 2hexOctet
			            clock-seq-and-reserved = hexOctet
			            clock-seq-low          = hexOctet
			            node                   = 6hexOctet
			            hexOctet               = hexDigit hexDigit
			            hexDigit =
			                "0" / "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9" /
			                "a" / "b" / "c" / "d" / "e" / "f" /
			                "A" / "B" / "C" / "D" / "E" / "F"
			    
			    https://github.com/victorquinn/chancejs/blob/develop/chance.js#L1349
			*/
			guid: function() {
				var pool = "abcdefABCDEF1234567890",
					guid = this.string(pool, 8) + '-' +
					this.string(pool, 4) + '-' +
					this.string(pool, 4) + '-' +
					this.string(pool, 4) + '-' +
					this.string(pool, 12);
				return guid
			},
			uuid: function() {
				return this.guid()
			},
			/*
			    随机生成一个 18 位身份证。
	
			    [身份证](http://baike.baidu.com/view/1697.htm#4)
			        地址码 6 + 出生日期码 8 + 顺序码 3 + 校验码 1
			    [《中华人民共和国行政区划代码》国家标准(GB/T2260)](http://zhidao.baidu.com/question/1954561.html)
			*/
			id: function() {
				var id,
					sum = 0,
					rank = [
						"7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"
					],
					last = [
						"1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"
					]
	
				id = this.pick(DICT).id +
					this.date('yyyyMMdd') +
					this.string('number', 3)
	
				for (var i = 0; i < id.length; i++) {
					sum += id[i] * rank[i];
				}
				id += last[sum % 11];
	
				return id
			},
	
			/*
			    生成一个全局的自增整数。
			    类似自增主键（auto increment primary key）。
			*/
			increment: function() {
				var key = 0
				return function(step) {
					return key += (+step || 1) // step?
				}
			}(),
			inc: function(step) {
				return this.increment(step)
			}
		}
	
	/***/ },
	/* 20 */
	/***/ function(module, exports, __webpack_require__) {
	
		var Parser = __webpack_require__(21)
		var Handler = __webpack_require__(22)
		module.exports = {
			Parser: Parser,
			Handler: Handler
		}
	
	/***/ },
	/* 21 */
	/***/ function(module, exports) {
	
		// https://github.com/nuysoft/regexp
		// forked from https://github.com/ForbesLindesay/regexp
	
		function parse(n) {
		    if ("string" != typeof n) {
		        var l = new TypeError("The regexp to parse must be represented as a string.");
		        throw l;
		    }
		    return index = 1, cgs = {}, parser.parse(n);
		}
	
		function Token(n) {
		    this.type = n, this.offset = Token.offset(), this.text = Token.text();
		}
	
		function Alternate(n, l) {
		    Token.call(this, "alternate"), this.left = n, this.right = l;
		}
	
		function Match(n) {
		    Token.call(this, "match"), this.body = n.filter(Boolean);
		}
	
		function Group(n, l) {
		    Token.call(this, n), this.body = l;
		}
	
		function CaptureGroup(n) {
		    Group.call(this, "capture-group"), this.index = cgs[this.offset] || (cgs[this.offset] = index++), 
		    this.body = n;
		}
	
		function Quantified(n, l) {
		    Token.call(this, "quantified"), this.body = n, this.quantifier = l;
		}
	
		function Quantifier(n, l) {
		    Token.call(this, "quantifier"), this.min = n, this.max = l, this.greedy = !0;
		}
	
		function CharSet(n, l) {
		    Token.call(this, "charset"), this.invert = n, this.body = l;
		}
	
		function CharacterRange(n, l) {
		    Token.call(this, "range"), this.start = n, this.end = l;
		}
	
		function Literal(n) {
		    Token.call(this, "literal"), this.body = n, this.escaped = this.body != this.text;
		}
	
		function Unicode(n) {
		    Token.call(this, "unicode"), this.code = n.toUpperCase();
		}
	
		function Hex(n) {
		    Token.call(this, "hex"), this.code = n.toUpperCase();
		}
	
		function Octal(n) {
		    Token.call(this, "octal"), this.code = n.toUpperCase();
		}
	
		function BackReference(n) {
		    Token.call(this, "back-reference"), this.code = n.toUpperCase();
		}
	
		function ControlCharacter(n) {
		    Token.call(this, "control-character"), this.code = n.toUpperCase();
		}
	
		var parser = function() {
		    function n(n, l) {
		        function u() {
		            this.constructor = n;
		        }
		        u.prototype = l.prototype, n.prototype = new u();
		    }
		    function l(n, l, u, t, r) {
		        function e(n, l) {
		            function u(n) {
		                function l(n) {
		                    return n.charCodeAt(0).toString(16).toUpperCase();
		                }
		                return n.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(n) {
		                    return "\\x0" + l(n);
		                }).replace(/[\x10-\x1F\x80-\xFF]/g, function(n) {
		                    return "\\x" + l(n);
		                }).replace(/[\u0180-\u0FFF]/g, function(n) {
		                    return "\\u0" + l(n);
		                }).replace(/[\u1080-\uFFFF]/g, function(n) {
		                    return "\\u" + l(n);
		                });
		            }
		            var t, r;
		            switch (n.length) {
		              case 0:
		                t = "end of input";
		                break;
	
		              case 1:
		                t = n[0];
		                break;
	
		              default:
		                t = n.slice(0, -1).join(", ") + " or " + n[n.length - 1];
		            }
		            return r = l ? '"' + u(l) + '"' : "end of input", "Expected " + t + " but " + r + " found.";
		        }
		        this.expected = n, this.found = l, this.offset = u, this.line = t, this.column = r, 
		        this.name = "SyntaxError", this.message = e(n, l);
		    }
		    function u(n) {
		        function u() {
		            return n.substring(Lt, qt);
		        }
		        function t() {
		            return Lt;
		        }
		        function r(l) {
		            function u(l, u, t) {
		                var r, e;
		                for (r = u; t > r; r++) e = n.charAt(r), "\n" === e ? (l.seenCR || l.line++, l.column = 1, 
		                l.seenCR = !1) : "\r" === e || "\u2028" === e || "\u2029" === e ? (l.line++, l.column = 1, 
		                l.seenCR = !0) : (l.column++, l.seenCR = !1);
		            }
		            return Mt !== l && (Mt > l && (Mt = 0, Dt = {
		                line: 1,
		                column: 1,
		                seenCR: !1
		            }), u(Dt, Mt, l), Mt = l), Dt;
		        }
		        function e(n) {
		            Ht > qt || (qt > Ht && (Ht = qt, Ot = []), Ot.push(n));
		        }
		        function o(n) {
		            var l = 0;
		            for (n.sort(); l < n.length; ) n[l - 1] === n[l] ? n.splice(l, 1) : l++;
		        }
		        function c() {
		            var l, u, t, r, o;
		            return l = qt, u = i(), null !== u ? (t = qt, 124 === n.charCodeAt(qt) ? (r = fl, 
		            qt++) : (r = null, 0 === Wt && e(sl)), null !== r ? (o = c(), null !== o ? (r = [ r, o ], 
		            t = r) : (qt = t, t = il)) : (qt = t, t = il), null === t && (t = al), null !== t ? (Lt = l, 
		            u = hl(u, t), null === u ? (qt = l, l = u) : l = u) : (qt = l, l = il)) : (qt = l, 
		            l = il), l;
		        }
		        function i() {
		            var n, l, u, t, r;
		            if (n = qt, l = f(), null === l && (l = al), null !== l) if (u = qt, Wt++, t = d(), 
		            Wt--, null === t ? u = al : (qt = u, u = il), null !== u) {
		                for (t = [], r = h(), null === r && (r = a()); null !== r; ) t.push(r), r = h(), 
		                null === r && (r = a());
		                null !== t ? (r = s(), null === r && (r = al), null !== r ? (Lt = n, l = dl(l, t, r), 
		                null === l ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n, n = il);
		            } else qt = n, n = il; else qt = n, n = il;
		            return n;
		        }
		        function a() {
		            var n;
		            return n = x(), null === n && (n = Q(), null === n && (n = B())), n;
		        }
		        function f() {
		            var l, u;
		            return l = qt, 94 === n.charCodeAt(qt) ? (u = pl, qt++) : (u = null, 0 === Wt && e(vl)), 
		            null !== u && (Lt = l, u = wl()), null === u ? (qt = l, l = u) : l = u, l;
		        }
		        function s() {
		            var l, u;
		            return l = qt, 36 === n.charCodeAt(qt) ? (u = Al, qt++) : (u = null, 0 === Wt && e(Cl)), 
		            null !== u && (Lt = l, u = gl()), null === u ? (qt = l, l = u) : l = u, l;
		        }
		        function h() {
		            var n, l, u;
		            return n = qt, l = a(), null !== l ? (u = d(), null !== u ? (Lt = n, l = bl(l, u), 
		            null === l ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n, n = il), n;
		        }
		        function d() {
		            var n, l, u;
		            return Wt++, n = qt, l = p(), null !== l ? (u = k(), null === u && (u = al), null !== u ? (Lt = n, 
		            l = Tl(l, u), null === l ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n, 
		            n = il), Wt--, null === n && (l = null, 0 === Wt && e(kl)), n;
		        }
		        function p() {
		            var n;
		            return n = v(), null === n && (n = w(), null === n && (n = A(), null === n && (n = C(), 
		            null === n && (n = g(), null === n && (n = b()))))), n;
		        }
		        function v() {
		            var l, u, t, r, o, c;
		            return l = qt, 123 === n.charCodeAt(qt) ? (u = xl, qt++) : (u = null, 0 === Wt && e(yl)), 
		            null !== u ? (t = T(), null !== t ? (44 === n.charCodeAt(qt) ? (r = ml, qt++) : (r = null, 
		            0 === Wt && e(Rl)), null !== r ? (o = T(), null !== o ? (125 === n.charCodeAt(qt) ? (c = Fl, 
		            qt++) : (c = null, 0 === Wt && e(Ql)), null !== c ? (Lt = l, u = Sl(t, o), null === u ? (qt = l, 
		            l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l, 
		            l = il)) : (qt = l, l = il), l;
		        }
		        function w() {
		            var l, u, t, r;
		            return l = qt, 123 === n.charCodeAt(qt) ? (u = xl, qt++) : (u = null, 0 === Wt && e(yl)), 
		            null !== u ? (t = T(), null !== t ? (n.substr(qt, 2) === Ul ? (r = Ul, qt += 2) : (r = null, 
		            0 === Wt && e(El)), null !== r ? (Lt = l, u = Gl(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
		            l = il)) : (qt = l, l = il)) : (qt = l, l = il), l;
		        }
		        function A() {
		            var l, u, t, r;
		            return l = qt, 123 === n.charCodeAt(qt) ? (u = xl, qt++) : (u = null, 0 === Wt && e(yl)), 
		            null !== u ? (t = T(), null !== t ? (125 === n.charCodeAt(qt) ? (r = Fl, qt++) : (r = null, 
		            0 === Wt && e(Ql)), null !== r ? (Lt = l, u = Bl(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
		            l = il)) : (qt = l, l = il)) : (qt = l, l = il), l;
		        }
		        function C() {
		            var l, u;
		            return l = qt, 43 === n.charCodeAt(qt) ? (u = jl, qt++) : (u = null, 0 === Wt && e($l)), 
		            null !== u && (Lt = l, u = ql()), null === u ? (qt = l, l = u) : l = u, l;
		        }
		        function g() {
		            var l, u;
		            return l = qt, 42 === n.charCodeAt(qt) ? (u = Ll, qt++) : (u = null, 0 === Wt && e(Ml)), 
		            null !== u && (Lt = l, u = Dl()), null === u ? (qt = l, l = u) : l = u, l;
		        }
		        function b() {
		            var l, u;
		            return l = qt, 63 === n.charCodeAt(qt) ? (u = Hl, qt++) : (u = null, 0 === Wt && e(Ol)), 
		            null !== u && (Lt = l, u = Wl()), null === u ? (qt = l, l = u) : l = u, l;
		        }
		        function k() {
		            var l;
		            return 63 === n.charCodeAt(qt) ? (l = Hl, qt++) : (l = null, 0 === Wt && e(Ol)), 
		            l;
		        }
		        function T() {
		            var l, u, t;
		            if (l = qt, u = [], zl.test(n.charAt(qt)) ? (t = n.charAt(qt), qt++) : (t = null, 
		            0 === Wt && e(Il)), null !== t) for (;null !== t; ) u.push(t), zl.test(n.charAt(qt)) ? (t = n.charAt(qt), 
		            qt++) : (t = null, 0 === Wt && e(Il)); else u = il;
		            return null !== u && (Lt = l, u = Jl(u)), null === u ? (qt = l, l = u) : l = u, 
		            l;
		        }
		        function x() {
		            var l, u, t, r;
		            return l = qt, 40 === n.charCodeAt(qt) ? (u = Kl, qt++) : (u = null, 0 === Wt && e(Nl)), 
		            null !== u ? (t = R(), null === t && (t = F(), null === t && (t = m(), null === t && (t = y()))), 
		            null !== t ? (41 === n.charCodeAt(qt) ? (r = Pl, qt++) : (r = null, 0 === Wt && e(Vl)), 
		            null !== r ? (Lt = l, u = Xl(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
		            l = il)) : (qt = l, l = il)) : (qt = l, l = il), l;
		        }
		        function y() {
		            var n, l;
		            return n = qt, l = c(), null !== l && (Lt = n, l = Yl(l)), null === l ? (qt = n, 
		            n = l) : n = l, n;
		        }
		        function m() {
		            var l, u, t;
		            return l = qt, n.substr(qt, 2) === Zl ? (u = Zl, qt += 2) : (u = null, 0 === Wt && e(_l)), 
		            null !== u ? (t = c(), null !== t ? (Lt = l, u = nu(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
		            l = il)) : (qt = l, l = il), l;
		        }
		        function R() {
		            var l, u, t;
		            return l = qt, n.substr(qt, 2) === lu ? (u = lu, qt += 2) : (u = null, 0 === Wt && e(uu)), 
		            null !== u ? (t = c(), null !== t ? (Lt = l, u = tu(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
		            l = il)) : (qt = l, l = il), l;
		        }
		        function F() {
		            var l, u, t;
		            return l = qt, n.substr(qt, 2) === ru ? (u = ru, qt += 2) : (u = null, 0 === Wt && e(eu)), 
		            null !== u ? (t = c(), null !== t ? (Lt = l, u = ou(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
		            l = il)) : (qt = l, l = il), l;
		        }
		        function Q() {
		            var l, u, t, r, o;
		            if (Wt++, l = qt, 91 === n.charCodeAt(qt) ? (u = iu, qt++) : (u = null, 0 === Wt && e(au)), 
		            null !== u) if (94 === n.charCodeAt(qt) ? (t = pl, qt++) : (t = null, 0 === Wt && e(vl)), 
		            null === t && (t = al), null !== t) {
		                for (r = [], o = S(), null === o && (o = U()); null !== o; ) r.push(o), o = S(), 
		                null === o && (o = U());
		                null !== r ? (93 === n.charCodeAt(qt) ? (o = fu, qt++) : (o = null, 0 === Wt && e(su)), 
		                null !== o ? (Lt = l, u = hu(t, r), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
		                l = il)) : (qt = l, l = il);
		            } else qt = l, l = il; else qt = l, l = il;
		            return Wt--, null === l && (u = null, 0 === Wt && e(cu)), l;
		        }
		        function S() {
		            var l, u, t, r;
		            return Wt++, l = qt, u = U(), null !== u ? (45 === n.charCodeAt(qt) ? (t = pu, qt++) : (t = null, 
		            0 === Wt && e(vu)), null !== t ? (r = U(), null !== r ? (Lt = l, u = wu(u, r), null === u ? (qt = l, 
		            l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l, l = il), Wt--, 
		            null === l && (u = null, 0 === Wt && e(du)), l;
		        }
		        function U() {
		            var n, l;
		            return Wt++, n = G(), null === n && (n = E()), Wt--, null === n && (l = null, 0 === Wt && e(Au)), 
		            n;
		        }
		        function E() {
		            var l, u;
		            return l = qt, Cu.test(n.charAt(qt)) ? (u = n.charAt(qt), qt++) : (u = null, 0 === Wt && e(gu)), 
		            null !== u && (Lt = l, u = bu(u)), null === u ? (qt = l, l = u) : l = u, l;
		        }
		        function G() {
		            var n;
		            return n = L(), null === n && (n = Y(), null === n && (n = H(), null === n && (n = O(), 
		            null === n && (n = W(), null === n && (n = z(), null === n && (n = I(), null === n && (n = J(), 
		            null === n && (n = K(), null === n && (n = N(), null === n && (n = P(), null === n && (n = V(), 
		            null === n && (n = X(), null === n && (n = _(), null === n && (n = nl(), null === n && (n = ll(), 
		            null === n && (n = ul(), null === n && (n = tl()))))))))))))))))), n;
		        }
		        function B() {
		            var n;
		            return n = j(), null === n && (n = q(), null === n && (n = $())), n;
		        }
		        function j() {
		            var l, u;
		            return l = qt, 46 === n.charCodeAt(qt) ? (u = ku, qt++) : (u = null, 0 === Wt && e(Tu)), 
		            null !== u && (Lt = l, u = xu()), null === u ? (qt = l, l = u) : l = u, l;
		        }
		        function $() {
		            var l, u;
		            return Wt++, l = qt, mu.test(n.charAt(qt)) ? (u = n.charAt(qt), qt++) : (u = null, 
		            0 === Wt && e(Ru)), null !== u && (Lt = l, u = bu(u)), null === u ? (qt = l, l = u) : l = u, 
		            Wt--, null === l && (u = null, 0 === Wt && e(yu)), l;
		        }
		        function q() {
		            var n;
		            return n = M(), null === n && (n = D(), null === n && (n = Y(), null === n && (n = H(), 
		            null === n && (n = O(), null === n && (n = W(), null === n && (n = z(), null === n && (n = I(), 
		            null === n && (n = J(), null === n && (n = K(), null === n && (n = N(), null === n && (n = P(), 
		            null === n && (n = V(), null === n && (n = X(), null === n && (n = Z(), null === n && (n = _(), 
		            null === n && (n = nl(), null === n && (n = ll(), null === n && (n = ul(), null === n && (n = tl()))))))))))))))))))), 
		            n;
		        }
		        function L() {
		            var l, u;
		            return l = qt, n.substr(qt, 2) === Fu ? (u = Fu, qt += 2) : (u = null, 0 === Wt && e(Qu)), 
		            null !== u && (Lt = l, u = Su()), null === u ? (qt = l, l = u) : l = u, l;
		        }
		        function M() {
		            var l, u;
		            return l = qt, n.substr(qt, 2) === Fu ? (u = Fu, qt += 2) : (u = null, 0 === Wt && e(Qu)), 
		            null !== u && (Lt = l, u = Uu()), null === u ? (qt = l, l = u) : l = u, l;
		        }
		        function D() {
		            var l, u;
		            return l = qt, n.substr(qt, 2) === Eu ? (u = Eu, qt += 2) : (u = null, 0 === Wt && e(Gu)), 
		            null !== u && (Lt = l, u = Bu()), null === u ? (qt = l, l = u) : l = u, l;
		        }
		        function H() {
		            var l, u;
		            return l = qt, n.substr(qt, 2) === ju ? (u = ju, qt += 2) : (u = null, 0 === Wt && e($u)), 
		            null !== u && (Lt = l, u = qu()), null === u ? (qt = l, l = u) : l = u, l;
		        }
		        function O() {
		            var l, u;
		            return l = qt, n.substr(qt, 2) === Lu ? (u = Lu, qt += 2) : (u = null, 0 === Wt && e(Mu)), 
		            null !== u && (Lt = l, u = Du()), null === u ? (qt = l, l = u) : l = u, l;
		        }
		        function W() {
		            var l, u;
		            return l = qt, n.substr(qt, 2) === Hu ? (u = Hu, qt += 2) : (u = null, 0 === Wt && e(Ou)), 
		            null !== u && (Lt = l, u = Wu()), null === u ? (qt = l, l = u) : l = u, l;
		        }
		        function z() {
		            var l, u;
		            return l = qt, n.substr(qt, 2) === zu ? (u = zu, qt += 2) : (u = null, 0 === Wt && e(Iu)), 
		            null !== u && (Lt = l, u = Ju()), null === u ? (qt = l, l = u) : l = u, l;
		        }
		        function I() {
		            var l, u;
		            return l = qt, n.substr(qt, 2) === Ku ? (u = Ku, qt += 2) : (u = null, 0 === Wt && e(Nu)), 
		            null !== u && (Lt = l, u = Pu()), null === u ? (qt = l, l = u) : l = u, l;
		        }
		        function J() {
		            var l, u;
		            return l = qt, n.substr(qt, 2) === Vu ? (u = Vu, qt += 2) : (u = null, 0 === Wt && e(Xu)), 
		            null !== u && (Lt = l, u = Yu()), null === u ? (qt = l, l = u) : l = u, l;
		        }
		        function K() {
		            var l, u;
		            return l = qt, n.substr(qt, 2) === Zu ? (u = Zu, qt += 2) : (u = null, 0 === Wt && e(_u)), 
		            null !== u && (Lt = l, u = nt()), null === u ? (qt = l, l = u) : l = u, l;
		        }
		        function N() {
		            var l, u;
		            return l = qt, n.substr(qt, 2) === lt ? (u = lt, qt += 2) : (u = null, 0 === Wt && e(ut)), 
		            null !== u && (Lt = l, u = tt()), null === u ? (qt = l, l = u) : l = u, l;
		        }
		        function P() {
		            var l, u;
		            return l = qt, n.substr(qt, 2) === rt ? (u = rt, qt += 2) : (u = null, 0 === Wt && e(et)), 
		            null !== u && (Lt = l, u = ot()), null === u ? (qt = l, l = u) : l = u, l;
		        }
		        function V() {
		            var l, u;
		            return l = qt, n.substr(qt, 2) === ct ? (u = ct, qt += 2) : (u = null, 0 === Wt && e(it)), 
		            null !== u && (Lt = l, u = at()), null === u ? (qt = l, l = u) : l = u, l;
		        }
		        function X() {
		            var l, u;
		            return l = qt, n.substr(qt, 2) === ft ? (u = ft, qt += 2) : (u = null, 0 === Wt && e(st)), 
		            null !== u && (Lt = l, u = ht()), null === u ? (qt = l, l = u) : l = u, l;
		        }
		        function Y() {
		            var l, u, t;
		            return l = qt, n.substr(qt, 2) === dt ? (u = dt, qt += 2) : (u = null, 0 === Wt && e(pt)), 
		            null !== u ? (n.length > qt ? (t = n.charAt(qt), qt++) : (t = null, 0 === Wt && e(vt)), 
		            null !== t ? (Lt = l, u = wt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
		            l = il)) : (qt = l, l = il), l;
		        }
		        function Z() {
		            var l, u, t;
		            return l = qt, 92 === n.charCodeAt(qt) ? (u = At, qt++) : (u = null, 0 === Wt && e(Ct)), 
		            null !== u ? (gt.test(n.charAt(qt)) ? (t = n.charAt(qt), qt++) : (t = null, 0 === Wt && e(bt)), 
		            null !== t ? (Lt = l, u = kt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
		            l = il)) : (qt = l, l = il), l;
		        }
		        function _() {
		            var l, u, t, r;
		            if (l = qt, n.substr(qt, 2) === Tt ? (u = Tt, qt += 2) : (u = null, 0 === Wt && e(xt)), 
		            null !== u) {
		                if (t = [], yt.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, 0 === Wt && e(mt)), 
		                null !== r) for (;null !== r; ) t.push(r), yt.test(n.charAt(qt)) ? (r = n.charAt(qt), 
		                qt++) : (r = null, 0 === Wt && e(mt)); else t = il;
		                null !== t ? (Lt = l, u = Rt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
		                l = il);
		            } else qt = l, l = il;
		            return l;
		        }
		        function nl() {
		            var l, u, t, r;
		            if (l = qt, n.substr(qt, 2) === Ft ? (u = Ft, qt += 2) : (u = null, 0 === Wt && e(Qt)), 
		            null !== u) {
		                if (t = [], St.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, 0 === Wt && e(Ut)), 
		                null !== r) for (;null !== r; ) t.push(r), St.test(n.charAt(qt)) ? (r = n.charAt(qt), 
		                qt++) : (r = null, 0 === Wt && e(Ut)); else t = il;
		                null !== t ? (Lt = l, u = Et(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
		                l = il);
		            } else qt = l, l = il;
		            return l;
		        }
		        function ll() {
		            var l, u, t, r;
		            if (l = qt, n.substr(qt, 2) === Gt ? (u = Gt, qt += 2) : (u = null, 0 === Wt && e(Bt)), 
		            null !== u) {
		                if (t = [], St.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, 0 === Wt && e(Ut)), 
		                null !== r) for (;null !== r; ) t.push(r), St.test(n.charAt(qt)) ? (r = n.charAt(qt), 
		                qt++) : (r = null, 0 === Wt && e(Ut)); else t = il;
		                null !== t ? (Lt = l, u = jt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
		                l = il);
		            } else qt = l, l = il;
		            return l;
		        }
		        function ul() {
		            var l, u;
		            return l = qt, n.substr(qt, 2) === Tt ? (u = Tt, qt += 2) : (u = null, 0 === Wt && e(xt)), 
		            null !== u && (Lt = l, u = $t()), null === u ? (qt = l, l = u) : l = u, l;
		        }
		        function tl() {
		            var l, u, t;
		            return l = qt, 92 === n.charCodeAt(qt) ? (u = At, qt++) : (u = null, 0 === Wt && e(Ct)), 
		            null !== u ? (n.length > qt ? (t = n.charAt(qt), qt++) : (t = null, 0 === Wt && e(vt)), 
		            null !== t ? (Lt = l, u = bu(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
		            l = il)) : (qt = l, l = il), l;
		        }
		        var rl, el = arguments.length > 1 ? arguments[1] : {}, ol = {
		            regexp: c
		        }, cl = c, il = null, al = "", fl = "|", sl = '"|"', hl = function(n, l) {
		            return l ? new Alternate(n, l[1]) : n;
		        }, dl = function(n, l, u) {
		            return new Match([ n ].concat(l).concat([ u ]));
		        }, pl = "^", vl = '"^"', wl = function() {
		            return new Token("start");
		        }, Al = "$", Cl = '"$"', gl = function() {
		            return new Token("end");
		        }, bl = function(n, l) {
		            return new Quantified(n, l);
		        }, kl = "Quantifier", Tl = function(n, l) {
		            return l && (n.greedy = !1), n;
		        }, xl = "{", yl = '"{"', ml = ",", Rl = '","', Fl = "}", Ql = '"}"', Sl = function(n, l) {
		            return new Quantifier(n, l);
		        }, Ul = ",}", El = '",}"', Gl = function(n) {
		            return new Quantifier(n, 1/0);
		        }, Bl = function(n) {
		            return new Quantifier(n, n);
		        }, jl = "+", $l = '"+"', ql = function() {
		            return new Quantifier(1, 1/0);
		        }, Ll = "*", Ml = '"*"', Dl = function() {
		            return new Quantifier(0, 1/0);
		        }, Hl = "?", Ol = '"?"', Wl = function() {
		            return new Quantifier(0, 1);
		        }, zl = /^[0-9]/, Il = "[0-9]", Jl = function(n) {
		            return +n.join("");
		        }, Kl = "(", Nl = '"("', Pl = ")", Vl = '")"', Xl = function(n) {
		            return n;
		        }, Yl = function(n) {
		            return new CaptureGroup(n);
		        }, Zl = "?:", _l = '"?:"', nu = function(n) {
		            return new Group("non-capture-group", n);
		        }, lu = "?=", uu = '"?="', tu = function(n) {
		            return new Group("positive-lookahead", n);
		        }, ru = "?!", eu = '"?!"', ou = function(n) {
		            return new Group("negative-lookahead", n);
		        }, cu = "CharacterSet", iu = "[", au = '"["', fu = "]", su = '"]"', hu = function(n, l) {
		            return new CharSet(!!n, l);
		        }, du = "CharacterRange", pu = "-", vu = '"-"', wu = function(n, l) {
		            return new CharacterRange(n, l);
		        }, Au = "Character", Cu = /^[^\\\]]/, gu = "[^\\\\\\]]", bu = function(n) {
		            return new Literal(n);
		        }, ku = ".", Tu = '"."', xu = function() {
		            return new Token("any-character");
		        }, yu = "Literal", mu = /^[^|\\\/.[()?+*$\^]/, Ru = "[^|\\\\\\/.[()?+*$\\^]", Fu = "\\b", Qu = '"\\\\b"', Su = function() {
		            return new Token("backspace");
		        }, Uu = function() {
		            return new Token("word-boundary");
		        }, Eu = "\\B", Gu = '"\\\\B"', Bu = function() {
		            return new Token("non-word-boundary");
		        }, ju = "\\d", $u = '"\\\\d"', qu = function() {
		            return new Token("digit");
		        }, Lu = "\\D", Mu = '"\\\\D"', Du = function() {
		            return new Token("non-digit");
		        }, Hu = "\\f", Ou = '"\\\\f"', Wu = function() {
		            return new Token("form-feed");
		        }, zu = "\\n", Iu = '"\\\\n"', Ju = function() {
		            return new Token("line-feed");
		        }, Ku = "\\r", Nu = '"\\\\r"', Pu = function() {
		            return new Token("carriage-return");
		        }, Vu = "\\s", Xu = '"\\\\s"', Yu = function() {
		            return new Token("white-space");
		        }, Zu = "\\S", _u = '"\\\\S"', nt = function() {
		            return new Token("non-white-space");
		        }, lt = "\\t", ut = '"\\\\t"', tt = function() {
		            return new Token("tab");
		        }, rt = "\\v", et = '"\\\\v"', ot = function() {
		            return new Token("vertical-tab");
		        }, ct = "\\w", it = '"\\\\w"', at = function() {
		            return new Token("word");
		        }, ft = "\\W", st = '"\\\\W"', ht = function() {
		            return new Token("non-word");
		        }, dt = "\\c", pt = '"\\\\c"', vt = "any character", wt = function(n) {
		            return new ControlCharacter(n);
		        }, At = "\\", Ct = '"\\\\"', gt = /^[1-9]/, bt = "[1-9]", kt = function(n) {
		            return new BackReference(n);
		        }, Tt = "\\0", xt = '"\\\\0"', yt = /^[0-7]/, mt = "[0-7]", Rt = function(n) {
		            return new Octal(n.join(""));
		        }, Ft = "\\x", Qt = '"\\\\x"', St = /^[0-9a-fA-F]/, Ut = "[0-9a-fA-F]", Et = function(n) {
		            return new Hex(n.join(""));
		        }, Gt = "\\u", Bt = '"\\\\u"', jt = function(n) {
		            return new Unicode(n.join(""));
		        }, $t = function() {
		            return new Token("null-character");
		        }, qt = 0, Lt = 0, Mt = 0, Dt = {
		            line: 1,
		            column: 1,
		            seenCR: !1
		        }, Ht = 0, Ot = [], Wt = 0;
		        if ("startRule" in el) {
		            if (!(el.startRule in ol)) throw new Error("Can't start parsing from rule \"" + el.startRule + '".');
		            cl = ol[el.startRule];
		        }
		        if (Token.offset = t, Token.text = u, rl = cl(), null !== rl && qt === n.length) return rl;
		        throw o(Ot), Lt = Math.max(qt, Ht), new l(Ot, Lt < n.length ? n.charAt(Lt) : null, Lt, r(Lt).line, r(Lt).column);
		    }
		    return n(l, Error), {
		        SyntaxError: l,
		        parse: u
		    };
		}(), index = 1, cgs = {};
	
		module.exports = parser
	
	/***/ },
	/* 22 */
	/***/ function(module, exports, __webpack_require__) {
	
		/*
		    ## RegExp Handler
	
		    https://github.com/ForbesLindesay/regexp
		    https://github.com/dmajda/pegjs
		    http://www.regexper.com/
	
		    每个节点的结构
		        {
		            type: '',
		            offset: number,
		            text: '',
		            body: {},
		            escaped: true/false
		        }
	
		    type 可选值
		        alternate             |         选择
		        match                 匹配
		        capture-group         ()        捕获组
		        non-capture-group     (?:...)   非捕获组
		        positive-lookahead    (?=p)     零宽正向先行断言
		        negative-lookahead    (?!p)     零宽负向先行断言
		        quantified            a*        重复节点
		        quantifier            *         量词
		        charset               []        字符集
		        range                 {m, n}    范围
		        literal               a         直接量字符
		        unicode               \uxxxx    Unicode
		        hex                   \x        十六进制
		        octal                 八进制
		        back-reference        \n        反向引用
		        control-character     \cX       控制字符
	
		        // Token
		        start               ^       开头
		        end                 $       结尾
		        any-character       .       任意字符
		        backspace           [\b]    退格直接量
		        word-boundary       \b      单词边界
		        non-word-boundary   \B      非单词边界
		        digit               \d      ASCII 数字，[0-9]
		        non-digit           \D      非 ASCII 数字，[^0-9]
		        form-feed           \f      换页符
		        line-feed           \n      换行符
		        carriage-return     \r      回车符
		        white-space         \s      空白符
		        non-white-space     \S      非空白符
		        tab                 \t      制表符
		        vertical-tab        \v      垂直制表符
		        word                \w      ASCII 字符，[a-zA-Z0-9]
		        non-word            \W      非 ASCII 字符，[^a-zA-Z0-9]
		        null-character      \o      NUL 字符
		 */
	
		var Util = __webpack_require__(3)
		var Random = __webpack_require__(5)
		    /*
		        
		    */
		var Handler = {
		    extend: Util.extend
		}
	
		// http://en.wikipedia.org/wiki/ASCII#ASCII_printable_code_chart
		/*var ASCII_CONTROL_CODE_CHART = {
		    '@': ['\u0000'],
		    A: ['\u0001'],
		    B: ['\u0002'],
		    C: ['\u0003'],
		    D: ['\u0004'],
		    E: ['\u0005'],
		    F: ['\u0006'],
		    G: ['\u0007', '\a'],
		    H: ['\u0008', '\b'],
		    I: ['\u0009', '\t'],
		    J: ['\u000A', '\n'],
		    K: ['\u000B', '\v'],
		    L: ['\u000C', '\f'],
		    M: ['\u000D', '\r'],
		    N: ['\u000E'],
		    O: ['\u000F'],
		    P: ['\u0010'],
		    Q: ['\u0011'],
		    R: ['\u0012'],
		    S: ['\u0013'],
		    T: ['\u0014'],
		    U: ['\u0015'],
		    V: ['\u0016'],
		    W: ['\u0017'],
		    X: ['\u0018'],
		    Y: ['\u0019'],
		    Z: ['\u001A'],
		    '[': ['\u001B', '\e'],
		    '\\': ['\u001C'],
		    ']': ['\u001D'],
		    '^': ['\u001E'],
		    '_': ['\u001F']
		}*/
	
		// ASCII printable code chart
		// var LOWER = 'abcdefghijklmnopqrstuvwxyz'
		// var UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		// var NUMBER = '0123456789'
		// var SYMBOL = ' !"#$%&\'()*+,-./' + ':;<=>?@' + '[\\]^_`' + '{|}~'
		var LOWER = ascii(97, 122)
		var UPPER = ascii(65, 90)
		var NUMBER = ascii(48, 57)
		var OTHER = ascii(32, 47) + ascii(58, 64) + ascii(91, 96) + ascii(123, 126) // 排除 95 _ ascii(91, 94) + ascii(96, 96)
		var PRINTABLE = ascii(32, 126)
		var SPACE = ' \f\n\r\t\v\u00A0\u2028\u2029'
		var CHARACTER_CLASSES = {
		    '\\w': LOWER + UPPER + NUMBER + '_', // ascii(95, 95)
		    '\\W': OTHER.replace('_', ''),
		    '\\s': SPACE,
		    '\\S': function() {
		        var result = PRINTABLE
		        for (var i = 0; i < SPACE.length; i++) {
		            result = result.replace(SPACE[i], '')
		        }
		        return result
		    }(),
		    '\\d': NUMBER,
		    '\\D': LOWER + UPPER + OTHER
		}
	
		function ascii(from, to) {
		    var result = ''
		    for (var i = from; i <= to; i++) {
		        result += String.fromCharCode(i)
		    }
		    return result
		}
	
		// var ast = RegExpParser.parse(regexp.source)
		Handler.gen = function(node, result, cache) {
		    cache = cache || {
		        guid: 1
		    }
		    return Handler[node.type] ? Handler[node.type](node, result, cache) :
		        Handler.token(node, result, cache)
		}
	
		Handler.extend({
		    /* jshint unused:false */
		    token: function(node, result, cache) {
		        switch (node.type) {
		            case 'start':
		            case 'end':
		                return ''
		            case 'any-character':
		                return Random.character()
		            case 'backspace':
		                return ''
		            case 'word-boundary': // TODO
		                return ''
		            case 'non-word-boundary': // TODO
		                break
		            case 'digit':
		                return Random.pick(
		                    NUMBER.split('')
		                )
		            case 'non-digit':
		                return Random.pick(
		                    (LOWER + UPPER + OTHER).split('')
		                )
		            case 'form-feed':
		                break
		            case 'line-feed':
		                return node.body || node.text
		            case 'carriage-return':
		                break
		            case 'white-space':
		                return Random.pick(
		                    SPACE.split('')
		                )
		            case 'non-white-space':
		                return Random.pick(
		                    (LOWER + UPPER + NUMBER).split('')
		                )
		            case 'tab':
		                break
		            case 'vertical-tab':
		                break
		            case 'word': // \w [a-zA-Z0-9]
		                return Random.pick(
		                    (LOWER + UPPER + NUMBER).split('')
		                )
		            case 'non-word': // \W [^a-zA-Z0-9]
		                return Random.pick(
		                    OTHER.replace('_', '').split('')
		                )
		            case 'null-character':
		                break
		        }
		        return node.body || node.text
		    },
		    /*
		        {
		            type: 'alternate',
		            offset: 0,
		            text: '',
		            left: {
		                boyd: []
		            },
		            right: {
		                boyd: []
		            }
		        }
		    */
		    alternate: function(node, result, cache) {
		        // node.left/right {}
		        return this.gen(
		            Random.boolean() ? node.left : node.right,
		            result,
		            cache
		        )
		    },
		    /*
		        {
		            type: 'match',
		            offset: 0,
		            text: '',
		            body: []
		        }
		    */
		    match: function(node, result, cache) {
		        result = ''
		            // node.body []
		        for (var i = 0; i < node.body.length; i++) {
		            result += this.gen(node.body[i], result, cache)
		        }
		        return result
		    },
		    // ()
		    'capture-group': function(node, result, cache) {
		        // node.body {}
		        result = this.gen(node.body, result, cache)
		        cache[cache.guid++] = result
		        return result
		    },
		    // (?:...)
		    'non-capture-group': function(node, result, cache) {
		        // node.body {}
		        return this.gen(node.body, result, cache)
		    },
		    // (?=p)
		    'positive-lookahead': function(node, result, cache) {
		        // node.body
		        return this.gen(node.body, result, cache)
		    },
		    // (?!p)
		    'negative-lookahead': function(node, result, cache) {
		        // node.body
		        return ''
		    },
		    /*
		        {
		            type: 'quantified',
		            offset: 3,
		            text: 'c*',
		            body: {
		                type: 'literal',
		                offset: 3,
		                text: 'c',
		                body: 'c',
		                escaped: false
		            },
		            quantifier: {
		                type: 'quantifier',
		                offset: 4,
		                text: '*',
		                min: 0,
		                max: Infinity,
		                greedy: true
		            }
		        }
		    */
		    quantified: function(node, result, cache) {
		        result = ''
		            // node.quantifier {}
		        var count = this.quantifier(node.quantifier);
		        // node.body {}
		        for (var i = 0; i < count; i++) {
		            result += this.gen(node.body, result, cache)
		        }
		        return result
		    },
		    /*
		        quantifier: {
		            type: 'quantifier',
		            offset: 4,
		            text: '*',
		            min: 0,
		            max: Infinity,
		            greedy: true
		        }
		    */
		    quantifier: function(node, result, cache) {
		        var min = Math.max(node.min, 0)
		        var max = isFinite(node.max) ? node.max :
		            min + Random.integer(3, 7)
		        return Random.integer(min, max)
		    },
		    /*
		        
		    */
		    charset: function(node, result, cache) {
		        // node.invert
		        if (node.invert) return this['invert-charset'](node, result, cache)
	
		        // node.body []
		        var literal = Random.pick(node.body)
		        return this.gen(literal, result, cache)
		    },
		    'invert-charset': function(node, result, cache) {
		        var pool = PRINTABLE
		        for (var i = 0, item; i < node.body.length; i++) {
		            item = node.body[i]
		            switch (item.type) {
		                case 'literal':
		                    pool = pool.replace(item.body, '')
		                    break
		                case 'range':
		                    var min = this.gen(item.start, result, cache).charCodeAt()
		                    var max = this.gen(item.end, result, cache).charCodeAt()
		                    for (var ii = min; ii <= max; ii++) {
		                        pool = pool.replace(String.fromCharCode(ii), '')
		                    }
		                    /* falls through */
		                default:
		                    var characters = CHARACTER_CLASSES[item.text]
		                    if (characters) {
		                        for (var iii = 0; iii <= characters.length; iii++) {
		                            pool = pool.replace(characters[iii], '')
		                        }
		                    }
		            }
		        }
		        return Random.pick(pool.split(''))
		    },
		    range: function(node, result, cache) {
		        // node.start, node.end
		        var min = this.gen(node.start, result, cache).charCodeAt()
		        var max = this.gen(node.end, result, cache).charCodeAt()
		        return String.fromCharCode(
		            Random.integer(min, max)
		        )
		    },
		    literal: function(node, result, cache) {
		        return node.escaped ? node.body : node.text
		    },
		    // Unicode \u
		    unicode: function(node, result, cache) {
		        return String.fromCharCode(
		            parseInt(node.code, 16)
		        )
		    },
		    // 十六进制 \xFF
		    hex: function(node, result, cache) {
		        return String.fromCharCode(
		            parseInt(node.code, 16)
		        )
		    },
		    // 八进制 \0
		    octal: function(node, result, cache) {
		        return String.fromCharCode(
		            parseInt(node.code, 8)
		        )
		    },
		    // 反向引用
		    'back-reference': function(node, result, cache) {
		        return cache[node.code] || ''
		    },
		    /*
		        http://en.wikipedia.org/wiki/C0_and_C1_control_codes
		    */
		    CONTROL_CHARACTER_MAP: function() {
		        var CONTROL_CHARACTER = '@ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \\ ] ^ _'.split(' ')
		        var CONTROL_CHARACTER_UNICODE = '\u0000 \u0001 \u0002 \u0003 \u0004 \u0005 \u0006 \u0007 \u0008 \u0009 \u000A \u000B \u000C \u000D \u000E \u000F \u0010 \u0011 \u0012 \u0013 \u0014 \u0015 \u0016 \u0017 \u0018 \u0019 \u001A \u001B \u001C \u001D \u001E \u001F'.split(' ')
		        var map = {}
		        for (var i = 0; i < CONTROL_CHARACTER.length; i++) {
		            map[CONTROL_CHARACTER[i]] = CONTROL_CHARACTER_UNICODE[i]
		        }
		        return map
		    }(),
		    'control-character': function(node, result, cache) {
		        return this.CONTROL_CHARACTER_MAP[node.code]
		    }
		})
	
		module.exports = Handler
	
	/***/ },
	/* 23 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __webpack_require__(24)
	
	/***/ },
	/* 24 */
	/***/ function(module, exports, __webpack_require__) {
	
		/*
		    ## toJSONSchema
	
		    把 Mock.js 风格的数据模板转换成 JSON Schema。
	
		    > [JSON Schema](http://json-schema.org/)
		 */
		var Constant = __webpack_require__(2)
		var Util = __webpack_require__(3)
		var Parser = __webpack_require__(4)
	
		function toJSONSchema(template, name, path /* Internal Use Only */ ) {
		    // type rule properties items
		    path = path || []
		    var result = {
		        name: typeof name === 'string' ? name.replace(Constant.RE_KEY, '$1') : name,
		        template: template,
		        type: Util.type(template), // 可能不准确，例如 { 'name|1': [{}, {} ...] }
		        rule: Parser.parse(name)
		    }
		    result.path = path.slice(0)
		    result.path.push(name === undefined ? 'ROOT' : result.name)
	
		    switch (result.type) {
		        case 'array':
		            result.items = []
		            Util.each(template, function(value, index) {
		                result.items.push(
		                    toJSONSchema(value, index, result.path)
		                )
		            })
		            break
		        case 'object':
		            result.properties = []
		            Util.each(template, function(value, name) {
		                result.properties.push(
		                    toJSONSchema(value, name, result.path)
		                )
		            })
		            break
		    }
	
		    return result
	
		}
	
		module.exports = toJSONSchema
	
	
	/***/ },
	/* 25 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __webpack_require__(26)
	
	/***/ },
	/* 26 */
	/***/ function(module, exports, __webpack_require__) {
	
		/*
		    ## valid(template, data)
	
		    校验真实数据 data 是否与数据模板 template 匹配。
		    
		    实现思路：
		    1. 解析规则。
		        先把数据模板 template 解析为更方便机器解析的 JSON-Schame
		        name               属性名 
		        type               属性值类型
		        template           属性值模板
		        properties         对象属性数组
		        items              数组元素数组
		        rule               属性值生成规则
		    2. 递归验证规则。
		        然后用 JSON-Schema 校验真实数据，校验项包括属性名、值类型、值、值生成规则。
	
		    提示信息 
		    https://github.com/fge/json-schema-validator/blob/master/src/main/resources/com/github/fge/jsonschema/validator/validation.properties
		    [JSON-Schama validator](http://json-schema-validator.herokuapp.com/)
		    [Regexp Demo](http://demos.forbeslindesay.co.uk/regexp/)
		*/
		var Util = __webpack_require__(3)
		var toJSONSchema = __webpack_require__(23)
	
		function valid(template, data) {
		    var schema = toJSONSchema(template)
		    var result = Diff.diff(schema, data)
		    for (var i = 0; i < result.length; i++) {
		        // console.log(Assert.message(result[i]))
		    }
		    return result
		}
	
		/*
		    ## name
		        有生成规则：比较解析后的 name
		        无生成规则：直接比较
		    ## type
		        无类型转换：直接比较
		        有类型转换：先试着解析 template，然后再检查？
		    ## value vs. template
		        基本类型
		            无生成规则：直接比较
		            有生成规则：
		                number
		                    min-max.dmin-dmax
		                    min-max.dcount
		                    count.dmin-dmax
		                    count.dcount
		                    +step
		                    整数部分
		                    小数部分
		                boolean 
		                string  
		                    min-max
		                    count
		    ## properties
		        对象
		            有生成规则：检测期望的属性个数，继续递归
		            无生成规则：检测全部的属性个数，继续递归
		    ## items
		        数组
		            有生成规则：
		                `'name|1': [{}, {} ...]`            其中之一，继续递归
		                `'name|+1': [{}, {} ...]`           顺序检测，继续递归
		                `'name|min-max': [{}, {} ...]`      检测个数，继续递归
		                `'name|count': [{}, {} ...]`        检测个数，继续递归
		            无生成规则：检测全部的元素个数，继续递归
		*/
		var Diff = {
		    diff: function diff(schema, data, name /* Internal Use Only */ ) {
		        var result = []
	
		        // 先检测名称 name 和类型 type，如果匹配，才有必要继续检测
		        if (
		            this.name(schema, data, name, result) &&
		            this.type(schema, data, name, result)
		        ) {
		            this.value(schema, data, name, result)
		            this.properties(schema, data, name, result)
		            this.items(schema, data, name, result)
		        }
	
		        return result
		    },
		    /* jshint unused:false */
		    name: function(schema, data, name, result) {
		        var length = result.length
	
		        Assert.equal('name', schema.path, name + '', schema.name + '', result)
	
		        if (result.length !== length) return false
		        return true
		    },
		    type: function(schema, data, name, result) {
		        var length = result.length
	
		        Assert.equal('type', schema.path, Util.type(data), schema.type, result)
	
		        if (result.length !== length) return false
		        return true
		    },
		    value: function(schema, data, name, result) {
		        var length = result.length
	
		        var rule = schema.rule
		        var templateType = Util.type(schema.template)
		        if (templateType === 'object' || templateType === 'array') return
	
		        // 无生成规则
		        if (!schema.rule.parameters) {
		            Assert.equal('value', schema.path, data, schema.template, result)
		            return
		        }
	
		        // 有生成规则
		        switch (templateType) {
		            case 'number':
		                var parts = (data + '').split('.')
		                parts[0] = +parts[0]
	
		                // 整数部分
		                // |min-max
		                if (rule.min !== undefined && rule.max !== undefined) {
		                    Assert.greaterThanOrEqualTo('value', schema.path, parts[0], rule.min, result)
		                        // , 'numeric instance is lower than the required minimum (minimum: {expected}, found: {actual})')
		                    Assert.lessThanOrEqualTo('value', schema.path, parts[0], rule.max, result)
		                }
		                // |count
		                if (rule.min !== undefined && rule.max === undefined) {
		                    Assert.equal('value', schema.path, parts[0], rule.min, result, '[value] ' + name)
		                }
	
		                // 小数部分
		                if (rule.decimal) {
		                    // |dmin-dmax
		                    if (rule.dmin !== undefined && rule.dmax !== undefined) {
		                        Assert.greaterThanOrEqualTo('value', schema.path, parts[1].length, rule.dmin, result)
		                        Assert.lessThanOrEqualTo('value', schema.path, parts[1].length, rule.dmax, result)
		                    }
		                    // |dcount
		                    if (rule.dmin !== undefined && rule.dmax === undefined) {
		                        Assert.equal('value', schema.path, parts[1].length, rule.dmin, result)
		                    }
		                }
	
		                break
	
		            case 'boolean':
		                break
		            case 'string':
		                // 'aaa'.match(/a/g)
		                var actualRepeatCount = data.match(new RegExp(schema.template, 'g'))
		                actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : actualRepeatCount
	
		                // |min-max
		                if (rule.min !== undefined && rule.max !== undefined) {
		                    Assert.greaterThanOrEqualTo('value', schema.path, actualRepeatCount, rule.min, result)
		                    Assert.lessThanOrEqualTo('value', schema.path, actualRepeatCount, rule.max, result)
		                }
		                // |count
		                if (rule.min !== undefined && rule.max === undefined) {
		                    Assert.equal('value', schema.path, actualRepeatCount, rule.min, result)
		                }
		                break
		        }
	
		        if (result.length !== length) return false
		        return true
		    },
		    properties: function(schema, data, name, result) {
		        var length = result.length
	
		        var rule = schema.rule
		        var keys = Util.keys(data)
		        if (!schema.properties) return
	
		        // 无生成规则
		        if (!schema.rule.parameters) {
		            Assert.equal('properties length', schema.path, keys.length, schema.properties.length, result)
		        } else {
		            // 有生成规则
		            // |min-max
		            if (rule.min !== undefined && rule.max !== undefined) {
		                Assert.greaterThanOrEqualTo('properties length', schema.path, keys.length, rule.min, result)
		                Assert.lessThanOrEqualTo('properties length', schema.path, keys.length, rule.max, result)
		            }
		            // |count
		            if (rule.min !== undefined && rule.max === undefined) {
		                Assert.equal('properties length', schema.path, keys.length, rule.min, result)
		            }
		        }
	
		        if (result.length !== length) return false
	
		        for (var i = 0; i < keys.length; i++) {
		            result.push.apply(
		                result,
		                this.diff(
		                    schema.properties[i],
		                    data[keys[i]],
		                    keys[i]
		                )
		            )
		        }
	
		        if (result.length !== length) return false
		        return true
		    },
		    items: function(schema, data, name, result) {
		        var length = result.length
	
		        if (!schema.items) return
	
		        var rule = schema.rule
	
		        // 无生成规则
		        if (!schema.rule.parameters) {
		            Assert.equal('items length', schema.path, data.length, schema.items.length, result)
		        } else {
		            // 有生成规则
		            // |min-max
		            if (rule.min !== undefined && rule.max !== undefined) {
		                Assert.greaterThanOrEqualTo('items', schema.path, data.length, (rule.min * schema.items.length), result,
		                    '[{utype}] array is too short: {path} must have at least {expected} elements but instance has {actual} elements')
		                Assert.lessThanOrEqualTo('items', schema.path, data.length, (rule.max * schema.items.length), result,
		                    '[{utype}] array is too long: {path} must have at most {expected} elements but instance has {actual} elements')
		            }
		            // |count
		            if (rule.min !== undefined && rule.max === undefined) {
		                Assert.equal('items length', schema.path, data.length, (rule.min * schema.items.length), result)
		            }
		        }
	
		        if (result.length !== length) return false
	
		        for (var i = 0; i < data.length; i++) {
		            result.push.apply(
		                result,
		                this.diff(
		                    schema.items[i % schema.items.length],
		                    data[i],
		                    i % schema.items.length
		                )
		            )
		        }
	
		        if (result.length !== length) return false
		        return true
		    }
		}
	
		/*
		    完善、友好的提示信息
		    
		    Equal, not equal to, greater than, less than, greater than or equal to, less than or equal to
		    路径 验证类型 描述 
	
		    Expect path.name is less than or equal to expected, but path.name is actual.
	
		    Expect path.name is less than or equal to expected, but path.name is actual.
		    Expect path.name is greater than or equal to expected, but path.name is actual.
	
		*/
		var Assert = {
		    message: function(item) {
		        return (item.message ||
		                '[{utype}] Expect {path}\'{ltype} is {action} {expected}, but is {actual}')
		            .replace('{utype}', item.type.toUpperCase())
		            .replace('{ltype}', item.type.toLowerCase())
		            .replace('{path}', Util.isArray(item.path) && item.path.join('.') || item.path)
		            .replace('{action}', item.action)
		            .replace('{expected}', item.expected)
		            .replace('{actual}', item.actual)
		    },
		    equal: function(type, path, actual, expected, result, message) {
		        if (actual === expected) return true
		        var item = {
		            path: path,
		            type: type,
		            actual: actual,
		            expected: expected,
		            action: 'equal to',
		            message: message
		        }
		        item.message = Assert.message(item)
		        result.push(item)
		        return false
		    },
		    notEqual: function(type, path, actual, expected, result, message) {
		        if (actual !== expected) return true
		        var item = {
		            path: path,
		            type: type,
		            actual: actual,
		            expected: expected,
		            action: 'not equal to',
		            message: message
		        }
		        item.message = Assert.message(item)
		        result.push(item)
		        return false
		    },
		    greaterThan: function(type, path, actual, expected, result, message) {
		        if (actual > expected) return true
		        var item = {
		            path: path,
		            type: type,
		            actual: actual,
		            expected: expected,
		            action: 'greater than',
		            message: message
		        }
		        item.message = Assert.message(item)
		        result.push(item)
		        return false
		    },
		    lessThan: function(type, path, actual, expected, result, message) {
		        if (actual < expected) return true
		        var item = {
		            path: path,
		            type: type,
		            actual: actual,
		            expected: expected,
		            action: 'less to',
		            message: message
		        }
		        item.message = Assert.message(item)
		        result.push(item)
		        return false
		    },
		    greaterThanOrEqualTo: function(type, path, actual, expected, result, message) {
		        if (actual >= expected) return true
		        var item = {
		            path: path,
		            type: type,
		            actual: actual,
		            expected: expected,
		            action: 'greater than or equal to',
		            message: message
		        }
		        item.message = Assert.message(item)
		        result.push(item)
		        return false
		    },
		    lessThanOrEqualTo: function(type, path, actual, expected, result, message) {
		        if (actual <= expected) return true
		        var item = {
		            path: path,
		            type: type,
		            actual: actual,
		            expected: expected,
		            action: 'less than or equal to',
		            message: message
		        }
		        item.message = Assert.message(item)
		        result.push(item)
		        return false
		    }
		}
	
		valid.Diff = Diff
		valid.Assert = Assert
	
		module.exports = valid
	
	/***/ },
	/* 27 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __webpack_require__(28)
	
	/***/ },
	/* 28 */
	/***/ function(module, exports, __webpack_require__) {
	
		/* global window, document, location, Event, setTimeout */
		/*
		    ## MockXMLHttpRequest
	
		    期望的功能：
		    1. 完整地覆盖原生 XHR 的行为
		    2. 完整地模拟原生 XHR 的行为
		    3. 在发起请求时，自动检测是否需要拦截
		    4. 如果不必拦截，则执行原生 XHR 的行为
		    5. 如果需要拦截，则执行虚拟 XHR 的行为
		    6. 兼容 XMLHttpRequest 和 ActiveXObject
		        new window.XMLHttpRequest()
		        new window.ActiveXObject("Microsoft.XMLHTTP")
		    
		    关键方法的逻辑：
		    * new   此时尚无法确定是否需要拦截，所以创建原生 XHR 对象是必须的。
		    * open  此时可以取到 URL，可以决定是否进行拦截。
		    * send  此时已经确定了请求方式。
	
		    规范：
		    http://xhr.spec.whatwg.org/
		    http://www.w3.org/TR/XMLHttpRequest2/
		    
		    参考实现：
		    https://github.com/philikon/MockHttpRequest/blob/master/lib/mock.js
		    https://github.com/trek/FakeXMLHttpRequest/blob/master/fake_xml_http_request.js
		    https://github.com/ilinsky/xmlhttprequest/blob/master/XMLHttpRequest.js
		    https://github.com/firebug/firebug-lite/blob/master/content/lite/xhr.js
		    https://github.com/thx/RAP/blob/master/lab/rap.plugin.xinglie.js
	
		    **需不需要全面重写 XMLHttpRequest？**
		        http://xhr.spec.whatwg.org/#interface-xmlhttprequest
		        关键属性 readyState、status、statusText、response、responseText、responseXML 是 readonly，所以，试图通过修改这些状态，来模拟响应是不可行的。
		        因此，唯一的办法是模拟整个 XMLHttpRequest，就像 jQuery 对事件模型的封装。
	
		    // Event handlers
		    onloadstart         loadstart
		    onprogress          progress
		    onabort             abort
		    onerror             error
		    onload              load
		    ontimeout           timeout
		    onloadend           loadend
		    onreadystatechange  readystatechange
		 */
	
		var Util = __webpack_require__(3)
	
		// 备份原生 XMLHttpRequest
		window._XMLHttpRequest = window.XMLHttpRequest
		window._ActiveXObject = window.ActiveXObject
	
		/*
		    PhantomJS
		    TypeError: '[object EventConstructor]' is not a constructor (evaluating 'new Event("readystatechange")')
	
		    https://github.com/bluerail/twitter-bootstrap-rails-confirm/issues/18
		    https://github.com/ariya/phantomjs/issues/11289
		*/
		try {
		    new window.Event('custom')
		} catch (exception) {
		    window.Event = function(type, bubbles, cancelable, detail) {
		        var event = document.createEvent('CustomEvent') // MUST be 'CustomEvent'
		        event.initCustomEvent(type, bubbles, cancelable, detail)
		        return event
		    }
		}
	
		var XHR_STATES = {
		    // The object has been constructed.
		    UNSENT: 0,
		    // The open() method has been successfully invoked.
		    OPENED: 1,
		    // All redirects (if any) have been followed and all HTTP headers of the response have been received.
		    HEADERS_RECEIVED: 2,
		    // The response's body is being received.
		    LOADING: 3,
		    // The data transfer has been completed or something went wrong during the transfer (e.g. infinite redirects).
		    DONE: 4
		}
	
		var XHR_EVENTS = 'readystatechange loadstart progress abort error load timeout loadend'.split(' ')
	
		var XHR_RESPONSE_PROPERTIES = 'readyState responseURL status statusText responseType response responseText responseXML'.split(' ')
	
		// https://github.com/trek/FakeXMLHttpRequest/blob/master/fake_xml_http_request.js#L32
		var HTTP_STATUS_CODES = {
		    100: "Continue",
		    101: "Switching Protocols",
		    200: "OK",
		    201: "Created",
		    202: "Accepted",
		    203: "Non-Authoritative Information",
		    204: "No Content",
		    205: "Reset Content",
		    206: "Partial Content",
		    300: "Multiple Choice",
		    301: "Moved Permanently",
		    302: "Found",
		    303: "See Other",
		    304: "Not Modified",
		    305: "Use Proxy",
		    307: "Temporary Redirect",
		    400: "Bad Request",
		    401: "Unauthorized",
		    402: "Payment Required",
		    403: "Forbidden",
		    404: "Not Found",
		    405: "Method Not Allowed",
		    406: "Not Acceptable",
		    407: "Proxy Authentication Required",
		    408: "Request Timeout",
		    409: "Conflict",
		    410: "Gone",
		    411: "Length Required",
		    412: "Precondition Failed",
		    413: "Request Entity Too Large",
		    414: "Request-URI Too Long",
		    415: "Unsupported Media Type",
		    416: "Requested Range Not Satisfiable",
		    417: "Expectation Failed",
		    422: "Unprocessable Entity",
		    500: "Internal Server Error",
		    501: "Not Implemented",
		    502: "Bad Gateway",
		    503: "Service Unavailable",
		    504: "Gateway Timeout",
		    505: "HTTP Version Not Supported"
		}
	
		/*
		    MockXMLHttpRequest
		*/
	
		function MockXMLHttpRequest() {
		    // 初始化 custom 对象，用于存储自定义属性
		    this.custom = {
		        events: {},
		        requestHeaders: {},
		        responseHeaders: {}
		    }
		}
	
		MockXMLHttpRequest._settings = {
		    timeout: '10-100',
		    /*
		        timeout: 50,
		        timeout: '10-100',
		     */
		}
	
		MockXMLHttpRequest.setup = function(settings) {
		    Util.extend(MockXMLHttpRequest._settings, settings)
		    return MockXMLHttpRequest._settings
		}
	
		Util.extend(MockXMLHttpRequest, XHR_STATES)
		Util.extend(MockXMLHttpRequest.prototype, XHR_STATES)
	
		// 标记当前对象为 MockXMLHttpRequest
		MockXMLHttpRequest.prototype.mock = true
	
		// 是否拦截 Ajax 请求
		MockXMLHttpRequest.prototype.match = false
	
		// 初始化 Request 相关的属性和方法
		Util.extend(MockXMLHttpRequest.prototype, {
		    // https://xhr.spec.whatwg.org/#the-open()-method
		    // Sets the request method, request URL, and synchronous flag.
		    open: function(method, url, async, username, password) {
		        var that = this
	
		        Util.extend(this.custom, {
		            method: method,
		            url: url,
		            async: typeof async === 'boolean' ? async : true,
		            username: username,
		            password: password,
		            options: {
		                url: url,
		                type: method
		            }
		        })
	
		        this.custom.timeout = function(timeout) {
		            if (typeof timeout === 'number') return timeout
		            if (typeof timeout === 'string' && !~timeout.indexOf('-')) return parseInt(timeout, 10)
		            if (typeof timeout === 'string' && ~timeout.indexOf('-')) {
		                var tmp = timeout.split('-')
		                var min = parseInt(tmp[0], 10)
		                var max = parseInt(tmp[1], 10)
		                return Math.round(Math.random() * (max - min)) + min
		            }
		        }(MockXMLHttpRequest._settings.timeout)
	
		        // 查找与请求参数匹配的数据模板
		        var item = find(this.custom.options)
	
		        function handle(event) {
		            // 同步属性 NativeXMLHttpRequest => MockXMLHttpRequest
		            for (var i = 0, len = XHR_RESPONSE_PROPERTIES.length; i < len; i++) {
		                try {
		                    that[XHR_RESPONSE_PROPERTIES[i]] = xhr[XHR_RESPONSE_PROPERTIES[i]]
		                } catch (e) {}
		            }
		            // 触发 MockXMLHttpRequest 上的同名事件
		            that.dispatchEvent(new Event(event.type /*, false, false, that*/ ))
		        }
	
		        // 如果未找到匹配的数据模板，则采用原生 XHR 发送请求。
		        if (!item) {
		            // 创建原生 XHR 对象，调用原生 open()，监听所有原生事件
		            var xhr = createNativeXMLHttpRequest()
		            this.custom.xhr = xhr
	
		            // 初始化所有事件，用于监听原生 XHR 对象的事件
		            for (var i = 0; i < XHR_EVENTS.length; i++) {
		                xhr.addEventListener(XHR_EVENTS[i], handle)
		            }
	
		            // xhr.open()
		            if (username) xhr.open(method, url, async, username, password)
		            else xhr.open(method, url, async)
	
		            return
		        }
	
		        // 找到了匹配的数据模板，开始拦截 XHR 请求
		        this.match = true
		        this.custom.template = item
		        this.readyState = MockXMLHttpRequest.OPENED
		        this.dispatchEvent(new Event('readystatechange' /*, false, false, this*/ ))
		    },
		    // https://xhr.spec.whatwg.org/#the-setrequestheader()-method
		    // Combines a header in author request headers.
		    setRequestHeader: function(name, value) {
		        // 原生 XHR
		        if (!this.match) {
		            this.custom.xhr.setRequestHeader(name, value)
		            return
		        }
	
		        // 拦截 XHR
		        var requestHeaders = this.custom.requestHeaders
		        if (requestHeaders[name]) requestHeaders[name] += ',' + value
		        else requestHeaders[name] = value
		    },
		    timeout: 0,
		    withCredentials: false,
		    upload: {},
		    // https://xhr.spec.whatwg.org/#the-send()-method
		    // Initiates the request.
		    send: function send(data) {
		        var that = this
		        this.custom.options.body = data
	
		        // 原生 XHR
		        if (!this.match) {
		            this.custom.xhr.send(data)
		            return
		        }
	
		        // 拦截 XHR
	
		        // X-Requested-With header
		        this.setRequestHeader('X-Requested-With', 'MockXMLHttpRequest')
	
		        // loadstart The fetch initiates.
		        this.dispatchEvent(new Event('loadstart' /*, false, false, this*/ ))
	
		        if (this.custom.async) setTimeout(done, this.custom.timeout) // 异步
		        else done() // 同步
	
		        function done() {
		            that.readyState = MockXMLHttpRequest.HEADERS_RECEIVED
		            that.dispatchEvent(new Event('readystatechange' /*, false, false, that*/ ))
		            that.readyState = MockXMLHttpRequest.LOADING
		            that.dispatchEvent(new Event('readystatechange' /*, false, false, that*/ ))
	
		            that.status = 200
		            that.statusText = HTTP_STATUS_CODES[200]
		            that.responseText = JSON.stringify(
		                convert(that.custom.template, that.custom.options),
		                null, 4
		            )
	
		            that.readyState = MockXMLHttpRequest.DONE
		            that.dispatchEvent(new Event('readystatechange'/*, false, false, that*/))
		            that.dispatchEvent(new Event('load'/*, false, false, that*/));
		            that.dispatchEvent(new Event('loadend'/*, false, false, that*/));
		        }
		    },
		    // https://xhr.spec.whatwg.org/#the-abort()-method
		    // Cancels any network activity.
		    abort: function abort() {
		        // 原生 XHR
		        if (!this.match) {
		            this.custom.xhr.abort()
		            return
		        }
	
		        // 拦截 XHR
		        this.readyState = MockXMLHttpRequest.UNSENT
		        this.dispatchEvent(new Event('abort', false, false, this))
		        this.dispatchEvent(new Event('error', false, false, this))
		    }
		})
	
		// 初始化 Response 相关的属性和方法
		Util.extend(MockXMLHttpRequest.prototype, {
		    responseURL: '',
		    status: MockXMLHttpRequest.UNSENT,
		    statusText: '',
		    // https://xhr.spec.whatwg.org/#the-getresponseheader()-method
		    getResponseHeader: function(name) {
		        // 原生 XHR
		        if (!this.match) {
		            return this.custom.xhr.getResponseHeader(name)
		        }
	
		        // 拦截 XHR
		        return this.custom.responseHeaders[name.toLowerCase()]
		    },
		    // https://xhr.spec.whatwg.org/#the-getallresponseheaders()-method
		    // http://www.utf8-chartable.de/
		    getAllResponseHeaders: function() {
		        // 原生 XHR
		        if (!this.match) {
		            return this.custom.xhr.getAllResponseHeaders()
		        }
	
		        // 拦截 XHR
		        var responseHeaders = this.custom.responseHeaders
		        var headers = ''
		        for (var h in responseHeaders) {
		            if (!responseHeaders.hasOwnProperty(h)) continue
		            headers += h + ': ' + responseHeaders[h] + '\r\n'
		        }
		        return headers
		    },
		    overrideMimeType: function( /*mime*/ ) {},
		    responseType: '', // '', 'text', 'arraybuffer', 'blob', 'document', 'json' 
		    response: null,
		    responseText: '',
		    responseXML: null
		})
	
		// EventTarget
		Util.extend(MockXMLHttpRequest.prototype, {
		    addEventListene: function addEventListene(type, handle) {
		        var events = this.custom.events
		        if (!events[type]) events[type] = []
		        events[type].push(handle)
		    },
		    removeEventListener: function removeEventListener(type, handle) {
		        var handles = this.custom.events[type] || []
		        for (var i = 0; i < handles.length; i++) {
		            if (handles[i] === handle) {
		                handles.splice(i--, 1)
		            }
		        }
		    },
		    dispatchEvent: function dispatchEvent(event) {
		        var handles = this.custom.events[event.type] || []
		        for (var i = 0; i < handles.length; i++) {
		            handles[i].call(this, event)
		        }
	
		        var ontype = 'on' + event.type
		        if (this[ontype]) this[ontype](event)
		    }
		})
	
		// Inspired by jQuery
		function createNativeXMLHttpRequest() {
		    var isLocal = function() {
		        var rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
		        var rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/
		        var ajaxLocation = location.href
		        var ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || []
		        return rlocalProtocol.test(ajaxLocParts[1])
		    }()
	
		    return window.ActiveXObject ?
		        (!isLocal && createStandardXHR() || createActiveXHR()) : createStandardXHR()
	
		    function createStandardXHR() {
		        try {
		            return new window._XMLHttpRequest();
		        } catch (e) {}
		    }
	
		    function createActiveXHR() {
		        try {
		            return new window._ActiveXObject("Microsoft.XMLHTTP");
		        } catch (e) {}
		    }
		}
	
	
		// 查找与请求参数匹配的数据模板：URL，Type
		function find(options) {
	
		    for (var sUrlType in MockXMLHttpRequest.Mock._mocked) {
		        var item = MockXMLHttpRequest.Mock._mocked[sUrlType]
		        if (
		            (!item.rurl || match(item.rurl, options.url)) &&
		            (!item.rtype || match(item.rtype, options.type.toLowerCase()))
		        ) {
		            // console.log('[mock]', options.url, '>', item.rurl)
		            return item
		        }
		    }
	
		    function match(expected, actual) {
		        if (Util.type(expected) === 'string') {
		            return expected === actual
		        }
		        if (Util.type(expected) === 'regexp') {
		            return expected.test(actual)
		        }
		    }
	
		}
	
		// 数据模板 ＝> 响应数据
		function convert(item, options) {
		    return Util.isFunction(item.template) ?
		        item.template(options) : MockXMLHttpRequest.Mock.mock(item.template)
		}
	
		module.exports = MockXMLHttpRequest
	
	/***/ }
	/******/ ])
	});
	;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by dinglei on 16/3/18.
	 */
	
	
	module.exports = function(router){
	    //路由表
	    router.map({
	        '/':{										   //默认
	            name:'index',
	            component: __webpack_require__(12)
	        },
	        '/home':{										//首页
	            name:'home',
	            component: __webpack_require__(22)
	        },
	
	    });
	
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(23)
	module.exports = __webpack_require__(25)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(44)
	if (false) {
	(function () {
	var hotAPI = require("/Users/dinglei/程序代码/工作/时趣互动/2016/20160316_VueGroup/webapp/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./home.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./home.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./home.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./home.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./home.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(24);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(16)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./home.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./home.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(15)();
	// imports
	
	
	// module
	exports.push([module.id, "body {\n        font-family: \"Hiragino Sans GB W3\",\"Heiti SC\",\"Helvetica Neue\",Helvetica;\n        font-size: 1.4rem;\n        background: #1a1d20;\n        color: #fff;\n    }\n    .slide-on .page {\n        -webkit-animation: slider1 .2s linear forwards;\n    }\n    @-webkit-keyframes slider1{\n        0%{-webkit-transform:translate3d(0,0,0)}\n        100%{-webkit-transform:translate3d(27rem,0,0)}\n    }\n    .scroll-hide {\n        height: 100%;\n        overflow: hidden;\n    }\n    .page {\n        background-color: #fff;\n        -webkit-transition: all .3s ease;\n        transition: all .3s ease;\n        overflow-x: hidden;\n    }\n    .header {\n        width: 100%;\n        height: 40px;\n        position: fixed;\n        top: 0;\n        left: 0;\n        background: rgba(0,0,0,.7);\n        z-index: 10;\n        display: block;\n        -webkit-transition: all .3s ease;\n        transition: all .3s ease;\n    }\n    .header:after, .header:before {\n        content: \"\";\n        display: table;\n        clear: both;\n    }\n    .header .item {\n        padding: 0 15px;\n        color: #fff;\n        float: left;\n    }\n    .header .iconfont {\n        font-size: 24px;\n        line-height: 40px;\n    }\n    .iconfont, .rule span {\n        font-size: 1.2rem;\n    }\n    .iconfont {\n        font-family: iconfont!important;\n        -webkit-font-smoothing: antialiased;\n        -webkit-text-stroke-width: .2px;\n        -moz-osx-font-smoothing: grayscale;\n    }\n\n    .icon-class:before {\n        content: \"\\E60E\";\n    }\n    .header-search {\n        position: relative;\n        width: 100%;\n        -webkit-flex: 1;\n        margin: 0 10px;\n        color: #5e5e5e;\n    }\n    .header .icon-search {\n        font-size: 18px;\n    }\n\n    .header-search i {\n        position: absolute;\n        left: 5px;\n        top: 17px;\n        z-index: 2;\n    }\n    .header-search input {\n        width: 100%;\n        height: 32px;\n        line-height: 2rem;\n        margin: 10px 0 0;\n        padding: 5px 3px 5px 30px;\n        box-sizing: border-box;\n        background: #000;\n        color: #5e5e5e;\n    }\n    .header .item:last-child {\n        float: right;\n        width: 50%;\n        text-align: right;\n    }\n    .header .user-center {\n        position: relative;\n        display: inline-block;\n        width: 25px;\n        height: 100%;\n    }\n    .header .item:last-child .iconfont {\n        font-size: 25px;\n    }\n    .icon-mine:before {\n        content: \"\\E604\";\n    }\n    .header .cart {\n        position: relative;\n        display: inline-block;\n        color: #fff;\n        margin-left: 15px;\n    }\n    .icon-cart:before {\n        content: \"\\E621\";\n    }\n    .header .cart sup {\n        top: 6px;\n        right: -8px;\n        font-size: 12px;\n    }\n    .header.show,.listScroll.show{\n        -webkit-transform: translateX(300px);\n        transform: translateX(300px);\n    }\n    .listScroll {\n        overflow: scroll;\n        -webkit-overflow-scrolling: touch;\n    }\n    .listScroll {\n        position: absolute;\n        top: 0px;\n        bottom: 0px;\n        left: 0px;\n        right: 0px;\n    }\n    .ad-banner-crousel {\n        width: 100%;\n        padding-top: 40px;\n    }\n\n    .ad-banner-crousel, .carousel-inner {\n        position: relative;\n        overflow: hidden;\n    }\n    .page-cover {\n        position: fixed;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        background: rgba(0, 0, 0, 0.5);\n        z-index: 7;\n    }", ""]);
	
	// exports


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {//require('../../src/css/views/home.css');
	
	    module.exports = {
	        data: function() {
	            return{
	                menu:{
	                    show:false,
	                    list:[]
	                },
	                banner:[],
	                goodlist:[]
	            }
	        },
	        asyncData:function(resolve, reject){
	            var _self = this;
	
	            $.ajax({
	                type: "GET",
	                url:'../../src/mock/list.json',
	                dataType:"json",
	                success :function(data){
	
	                    var json = Mock.mock(data);
	
	                    if(json&&json.code==0){
	
	                        resolve({
	                             menu:{
	                                 list:json.data.menu.list
	                             },
	                             banner:json.data.banner,
	                            goodlist:json.data.goodlist
	                         });
	
	                    }
	                }
	            });
	
	        },
	        methods: {
	            openMenu:function(){
	
	                $("html, body, .page").addClass("scroll-hide");
	
	                this.menu.show=!this.menu.show;
	            },
	            showMenus:function(){
	
	                this.menu.show=!this.menu.show;
	
	                $("html, body, .page").removeClass("scroll-hide");
	
	            }
	        },
	        components:{
	            "listscroll":__webpack_require__(26),
	            "bpMenu":__webpack_require__(39)
	        }
	    }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(27)
	module.exports = __webpack_require__(29)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(38)
	if (false) {
	(function () {
	var hotAPI = require("/Users/dinglei/程序代码/工作/时趣互动/2016/20160316_VueGroup/webapp/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./listscroll.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./listscroll.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./listscroll.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./listscroll.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./listscroll.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(28);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(16)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./listscroll.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./listscroll.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(15)();
	// imports
	
	
	// module
	exports.push([module.id, "", ""]);
	
	// exports


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(30);
	
	    var Swiper = __webpack_require__(32);
	
	    module.exports = {
	        replace:true,
	        props: ["banner","goodlist"],
	        components:{
	            "list":__webpack_require__(33)
	        }
	
	    }

/***/ },
/* 30 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 31 */,
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Swiper 3.3.1
	 * Most modern mobile touch slider and framework with hardware accelerated transitions
	 * 
	 * http://www.idangero.us/swiper/
	 * 
	 * Copyright 2016, Vladimir Kharlampidi
	 * The iDangero.us
	 * http://www.idangero.us/
	 * 
	 * Licensed under MIT
	 * 
	 * Released on: February 7, 2016
	 */
	(function () {
	    'use strict';
	    var $;
	    /*===========================
	    Swiper
	    ===========================*/
	    var Swiper = function (container, params) {
	        if (!(this instanceof Swiper)) return new Swiper(container, params);
	
	        var defaults = {
	            direction: 'horizontal',
	            touchEventsTarget: 'container',
	            initialSlide: 0,
	            speed: 300,
	            // autoplay
	            autoplay: false,
	            autoplayDisableOnInteraction: true,
	            autoplayStopOnLast: false,
	            // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
	            iOSEdgeSwipeDetection: false,
	            iOSEdgeSwipeThreshold: 20,
	            // Free mode
	            freeMode: false,
	            freeModeMomentum: true,
	            freeModeMomentumRatio: 1,
	            freeModeMomentumBounce: true,
	            freeModeMomentumBounceRatio: 1,
	            freeModeSticky: false,
	            freeModeMinimumVelocity: 0.02,
	            // Autoheight
	            autoHeight: false,
	            // Set wrapper width
	            setWrapperSize: false,
	            // Virtual Translate
	            virtualTranslate: false,
	            // Effects
	            effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
	            coverflow: {
	                rotate: 50,
	                stretch: 0,
	                depth: 100,
	                modifier: 1,
	                slideShadows : true
	            },
	            flip: {
	                slideShadows : true,
	                limitRotation: true
	            },
	            cube: {
	                slideShadows: true,
	                shadow: true,
	                shadowOffset: 20,
	                shadowScale: 0.94
	            },
	            fade: {
	                crossFade: false
	            },
	            // Parallax
	            parallax: false,
	            // Scrollbar
	            scrollbar: null,
	            scrollbarHide: true,
	            scrollbarDraggable: false,
	            scrollbarSnapOnRelease: false,
	            // Keyboard Mousewheel
	            keyboardControl: false,
	            mousewheelControl: false,
	            mousewheelReleaseOnEdges: false,
	            mousewheelInvert: false,
	            mousewheelForceToAxis: false,
	            mousewheelSensitivity: 1,
	            // Hash Navigation
	            hashnav: false,
	            // Breakpoints
	            breakpoints: undefined,
	            // Slides grid
	            spaceBetween: 0,
	            slidesPerView: 1,
	            slidesPerColumn: 1,
	            slidesPerColumnFill: 'column',
	            slidesPerGroup: 1,
	            centeredSlides: false,
	            slidesOffsetBefore: 0, // in px
	            slidesOffsetAfter: 0, // in px
	            // Round length
	            roundLengths: false,
	            // Touches
	            touchRatio: 1,
	            touchAngle: 45,
	            simulateTouch: true,
	            shortSwipes: true,
	            longSwipes: true,
	            longSwipesRatio: 0.5,
	            longSwipesMs: 300,
	            followFinger: true,
	            onlyExternal: false,
	            threshold: 0,
	            touchMoveStopPropagation: true,
	            // Unique Navigation Elements
	            uniqueNavElements: true,
	            // Pagination
	            pagination: null,
	            paginationElement: 'span',
	            paginationClickable: false,
	            paginationHide: false,
	            paginationBulletRender: null,
	            paginationProgressRender: null,
	            paginationFractionRender: null,
	            paginationCustomRender: null,
	            paginationType: 'bullets', // 'bullets' or 'progress' or 'fraction' or 'custom'
	            // Resistance
	            resistance: true,
	            resistanceRatio: 0.85,
	            // Next/prev buttons
	            nextButton: null,
	            prevButton: null,
	            // Progress
	            watchSlidesProgress: false,
	            watchSlidesVisibility: false,
	            // Cursor
	            grabCursor: false,
	            // Clicks
	            preventClicks: true,
	            preventClicksPropagation: true,
	            slideToClickedSlide: false,
	            // Lazy Loading
	            lazyLoading: false,
	            lazyLoadingInPrevNext: false,
	            lazyLoadingInPrevNextAmount: 1,
	            lazyLoadingOnTransitionStart: false,
	            // Images
	            preloadImages: true,
	            updateOnImagesReady: true,
	            // loop
	            loop: false,
	            loopAdditionalSlides: 0,
	            loopedSlides: null,
	            // Control
	            control: undefined,
	            controlInverse: false,
	            controlBy: 'slide', //or 'container'
	            // Swiping/no swiping
	            allowSwipeToPrev: true,
	            allowSwipeToNext: true,
	            swipeHandler: null, //'.swipe-handler',
	            noSwiping: true,
	            noSwipingClass: 'swiper-no-swiping',
	            // NS
	            slideClass: 'swiper-slide',
	            slideActiveClass: 'swiper-slide-active',
	            slideVisibleClass: 'swiper-slide-visible',
	            slideDuplicateClass: 'swiper-slide-duplicate',
	            slideNextClass: 'swiper-slide-next',
	            slidePrevClass: 'swiper-slide-prev',
	            wrapperClass: 'swiper-wrapper',
	            bulletClass: 'swiper-pagination-bullet',
	            bulletActiveClass: 'swiper-pagination-bullet-active',
	            buttonDisabledClass: 'swiper-button-disabled',
	            paginationCurrentClass: 'swiper-pagination-current',
	            paginationTotalClass: 'swiper-pagination-total',
	            paginationHiddenClass: 'swiper-pagination-hidden',
	            paginationProgressbarClass: 'swiper-pagination-progressbar',
	            // Observer
	            observer: false,
	            observeParents: false,
	            // Accessibility
	            a11y: false,
	            prevSlideMessage: 'Previous slide',
	            nextSlideMessage: 'Next slide',
	            firstSlideMessage: 'This is the first slide',
	            lastSlideMessage: 'This is the last slide',
	            paginationBulletMessage: 'Go to slide {{index}}',
	            // Callbacks
	            runCallbacksOnInit: true
	            /*
	            Callbacks:
	            onInit: function (swiper)
	            onDestroy: function (swiper)
	            onClick: function (swiper, e)
	            onTap: function (swiper, e)
	            onDoubleTap: function (swiper, e)
	            onSliderMove: function (swiper, e)
	            onSlideChangeStart: function (swiper)
	            onSlideChangeEnd: function (swiper)
	            onTransitionStart: function (swiper)
	            onTransitionEnd: function (swiper)
	            onImagesReady: function (swiper)
	            onProgress: function (swiper, progress)
	            onTouchStart: function (swiper, e)
	            onTouchMove: function (swiper, e)
	            onTouchMoveOpposite: function (swiper, e)
	            onTouchEnd: function (swiper, e)
	            onReachBeginning: function (swiper)
	            onReachEnd: function (swiper)
	            onSetTransition: function (swiper, duration)
	            onSetTranslate: function (swiper, translate)
	            onAutoplayStart: function (swiper)
	            onAutoplayStop: function (swiper),
	            onLazyImageLoad: function (swiper, slide, image)
	            onLazyImageReady: function (swiper, slide, image)
	            */
	        
	        };
	        var initialVirtualTranslate = params && params.virtualTranslate;
	        
	        params = params || {};
	        var originalParams = {};
	        for (var param in params) {
	            if (typeof params[param] === 'object' && params[param] !== null && !(params[param].nodeType || params[param] === window || params[param] === document || (typeof Dom7 !== 'undefined' && params[param] instanceof Dom7) || (typeof jQuery !== 'undefined' && params[param] instanceof jQuery))) {
	                originalParams[param] = {};
	                for (var deepParam in params[param]) {
	                    originalParams[param][deepParam] = params[param][deepParam];
	                }
	            }
	            else {
	                originalParams[param] = params[param];
	            }
	        }
	        for (var def in defaults) {
	            if (typeof params[def] === 'undefined') {
	                params[def] = defaults[def];
	            }
	            else if (typeof params[def] === 'object') {
	                for (var deepDef in defaults[def]) {
	                    if (typeof params[def][deepDef] === 'undefined') {
	                        params[def][deepDef] = defaults[def][deepDef];
	                    }
	                }
	            }
	        }
	        
	        // Swiper
	        var s = this;
	        
	        // Params
	        s.params = params;
	        s.originalParams = originalParams;
	        
	        // Classname
	        s.classNames = [];
	        /*=========================
	          Dom Library and plugins
	          ===========================*/
	        if (typeof $ !== 'undefined' && typeof Dom7 !== 'undefined'){
	            $ = Dom7;
	        }
	        if (typeof $ === 'undefined') {
	            if (typeof Dom7 === 'undefined') {
	                $ = window.Dom7 || window.Zepto || window.jQuery;
	            }
	            else {
	                $ = Dom7;
	            }
	            if (!$) return;
	        }
	        // Export it to Swiper instance
	        s.$ = $;
	        
	        /*=========================
	          Breakpoints
	          ===========================*/
	        s.currentBreakpoint = undefined;
	        s.getActiveBreakpoint = function () {
	            //Get breakpoint for window width
	            if (!s.params.breakpoints) return false;
	            var breakpoint = false;
	            var points = [], point;
	            for ( point in s.params.breakpoints ) {
	                if (s.params.breakpoints.hasOwnProperty(point)) {
	                    points.push(point);
	                }
	            }
	            points.sort(function (a, b) {
	                return parseInt(a, 10) > parseInt(b, 10);
	            });
	            for (var i = 0; i < points.length; i++) {
	                point = points[i];
	                if (point >= window.innerWidth && !breakpoint) {
	                    breakpoint = point;
	                }
	            }
	            return breakpoint || 'max';
	        };
	        s.setBreakpoint = function () {
	            //Set breakpoint for window width and update parameters
	            var breakpoint = s.getActiveBreakpoint();
	            if (breakpoint && s.currentBreakpoint !== breakpoint) {
	                var breakPointsParams = breakpoint in s.params.breakpoints ? s.params.breakpoints[breakpoint] : s.originalParams;
	                var needsReLoop = s.params.loop && (breakPointsParams.slidesPerView !== s.params.slidesPerView);
	                for ( var param in breakPointsParams ) {
	                    s.params[param] = breakPointsParams[param];
	                }
	                s.currentBreakpoint = breakpoint;
	                if(needsReLoop && s.destroyLoop) {
	                    s.reLoop(true);
	                }
	            }
	        };
	        // Set breakpoint on load
	        if (s.params.breakpoints) {
	            s.setBreakpoint();
	        }
	        
	        /*=========================
	          Preparation - Define Container, Wrapper and Pagination
	          ===========================*/
	        s.container = $(container);
	        if (s.container.length === 0) return;
	        if (s.container.length > 1) {
	            var swipers = [];
	            s.container.each(function () {
	                var container = this;
	                swipers.push(new Swiper(this, params));
	            });
	            return swipers;
	        }
	        
	        // Save instance in container HTML Element and in data
	        s.container[0].swiper = s;
	        s.container.data('swiper', s);
	        
	        s.classNames.push('swiper-container-' + s.params.direction);
	        
	        if (s.params.freeMode) {
	            s.classNames.push('swiper-container-free-mode');
	        }
	        if (!s.support.flexbox) {
	            s.classNames.push('swiper-container-no-flexbox');
	            s.params.slidesPerColumn = 1;
	        }
	        if (s.params.autoHeight) {
	            s.classNames.push('swiper-container-autoheight');
	        }
	        // Enable slides progress when required
	        if (s.params.parallax || s.params.watchSlidesVisibility) {
	            s.params.watchSlidesProgress = true;
	        }
	        // Coverflow / 3D
	        if (['cube', 'coverflow', 'flip'].indexOf(s.params.effect) >= 0) {
	            if (s.support.transforms3d) {
	                s.params.watchSlidesProgress = true;
	                s.classNames.push('swiper-container-3d');
	            }
	            else {
	                s.params.effect = 'slide';
	            }
	        }
	        if (s.params.effect !== 'slide') {
	            s.classNames.push('swiper-container-' + s.params.effect);
	        }
	        if (s.params.effect === 'cube') {
	            s.params.resistanceRatio = 0;
	            s.params.slidesPerView = 1;
	            s.params.slidesPerColumn = 1;
	            s.params.slidesPerGroup = 1;
	            s.params.centeredSlides = false;
	            s.params.spaceBetween = 0;
	            s.params.virtualTranslate = true;
	            s.params.setWrapperSize = false;
	        }
	        if (s.params.effect === 'fade' || s.params.effect === 'flip') {
	            s.params.slidesPerView = 1;
	            s.params.slidesPerColumn = 1;
	            s.params.slidesPerGroup = 1;
	            s.params.watchSlidesProgress = true;
	            s.params.spaceBetween = 0;
	            s.params.setWrapperSize = false;
	            if (typeof initialVirtualTranslate === 'undefined') {
	                s.params.virtualTranslate = true;
	            }
	        }
	        
	        // Grab Cursor
	        if (s.params.grabCursor && s.support.touch) {
	            s.params.grabCursor = false;
	        }
	        
	        // Wrapper
	        s.wrapper = s.container.children('.' + s.params.wrapperClass);
	        
	        // Pagination
	        if (s.params.pagination) {
	            s.paginationContainer = $(s.params.pagination);
	            if (s.params.uniqueNavElements && typeof s.params.pagination === 'string' && s.paginationContainer.length > 1 && s.container.find(s.params.pagination).length === 1) {
	                s.paginationContainer = s.container.find(s.params.pagination);
	            }
	        
	            if (s.params.paginationType === 'bullets' && s.params.paginationClickable) {
	                s.paginationContainer.addClass('swiper-pagination-clickable');
	            }
	            else {
	                s.params.paginationClickable = false;
	            }
	            s.paginationContainer.addClass('swiper-pagination-' + s.params.paginationType);
	        }
	        // Next/Prev Buttons
	        if (s.params.nextButton || s.params.prevButton) {
	            if (s.params.nextButton) {
	                s.nextButton = $(s.params.nextButton);
	                if (s.params.uniqueNavElements && typeof s.params.nextButton === 'string' && s.nextButton.length > 1 && s.container.find(s.params.nextButton).length === 1) {
	                    s.nextButton = s.container.find(s.params.nextButton);
	                }
	            }
	            if (s.params.prevButton) {
	                s.prevButton = $(s.params.prevButton);
	                if (s.params.uniqueNavElements && typeof s.params.prevButton === 'string' && s.prevButton.length > 1 && s.container.find(s.params.prevButton).length === 1) {
	                    s.prevButton = s.container.find(s.params.prevButton);
	                }
	            }
	        }
	        
	        // Is Horizontal
	        s.isHorizontal = function () {
	            return s.params.direction === 'horizontal';
	        };
	        // s.isH = isH;
	        
	        // RTL
	        s.rtl = s.isHorizontal() && (s.container[0].dir.toLowerCase() === 'rtl' || s.container.css('direction') === 'rtl');
	        if (s.rtl) {
	            s.classNames.push('swiper-container-rtl');
	        }
	        
	        // Wrong RTL support
	        if (s.rtl) {
	            s.wrongRTL = s.wrapper.css('display') === '-webkit-box';
	        }
	        
	        // Columns
	        if (s.params.slidesPerColumn > 1) {
	            s.classNames.push('swiper-container-multirow');
	        }
	        
	        // Check for Android
	        if (s.device.android) {
	            s.classNames.push('swiper-container-android');
	        }
	        
	        // Add classes
	        s.container.addClass(s.classNames.join(' '));
	        
	        // Translate
	        s.translate = 0;
	        
	        // Progress
	        s.progress = 0;
	        
	        // Velocity
	        s.velocity = 0;
	        
	        /*=========================
	          Locks, unlocks
	          ===========================*/
	        s.lockSwipeToNext = function () {
	            s.params.allowSwipeToNext = false;
	        };
	        s.lockSwipeToPrev = function () {
	            s.params.allowSwipeToPrev = false;
	        };
	        s.lockSwipes = function () {
	            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = false;
	        };
	        s.unlockSwipeToNext = function () {
	            s.params.allowSwipeToNext = true;
	        };
	        s.unlockSwipeToPrev = function () {
	            s.params.allowSwipeToPrev = true;
	        };
	        s.unlockSwipes = function () {
	            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = true;
	        };
	        
	        /*=========================
	          Round helper
	          ===========================*/
	        function round(a) {
	            return Math.floor(a);
	        }
	        /*=========================
	          Set grab cursor
	          ===========================*/
	        if (s.params.grabCursor) {
	            s.container[0].style.cursor = 'move';
	            s.container[0].style.cursor = '-webkit-grab';
	            s.container[0].style.cursor = '-moz-grab';
	            s.container[0].style.cursor = 'grab';
	        }
	        /*=========================
	          Update on Images Ready
	          ===========================*/
	        s.imagesToLoad = [];
	        s.imagesLoaded = 0;
	        
	        s.loadImage = function (imgElement, src, srcset, checkForComplete, callback) {
	            var image;
	            function onReady () {
	                if (callback) callback();
	            }
	            if (!imgElement.complete || !checkForComplete) {
	                if (src) {
	                    image = new window.Image();
	                    image.onload = onReady;
	                    image.onerror = onReady;
	                    if (srcset) {
	                        image.srcset = srcset;
	                    }
	                    if (src) {
	                        image.src = src;
	                    }
	                } else {
	                    onReady();
	                }
	        
	            } else {//image already loaded...
	                onReady();
	            }
	        };
	        s.preloadImages = function () {
	            s.imagesToLoad = s.container.find('img');
	            function _onReady() {
	                if (typeof s === 'undefined' || s === null) return;
	                if (s.imagesLoaded !== undefined) s.imagesLoaded++;
	                if (s.imagesLoaded === s.imagesToLoad.length) {
	                    if (s.params.updateOnImagesReady) s.update();
	                    s.emit('onImagesReady', s);
	                }
	            }
	            for (var i = 0; i < s.imagesToLoad.length; i++) {
	                s.loadImage(s.imagesToLoad[i], (s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute('src')), (s.imagesToLoad[i].srcset || s.imagesToLoad[i].getAttribute('srcset')), true, _onReady);
	            }
	        };
	        
	        /*=========================
	          Autoplay
	          ===========================*/
	        s.autoplayTimeoutId = undefined;
	        s.autoplaying = false;
	        s.autoplayPaused = false;
	        function autoplay() {
	            s.autoplayTimeoutId = setTimeout(function () {
	                if (s.params.loop) {
	                    s.fixLoop();
	                    s._slideNext();
	                    s.emit('onAutoplay', s);
	                }
	                else {
	                    if (!s.isEnd) {
	                        s._slideNext();
	                        s.emit('onAutoplay', s);
	                    }
	                    else {
	                        if (!params.autoplayStopOnLast) {
	                            s._slideTo(0);
	                            s.emit('onAutoplay', s);
	                        }
	                        else {
	                            s.stopAutoplay();
	                        }
	                    }
	                }
	            }, s.params.autoplay);
	        }
	        s.startAutoplay = function () {
	            if (typeof s.autoplayTimeoutId !== 'undefined') return false;
	            if (!s.params.autoplay) return false;
	            if (s.autoplaying) return false;
	            s.autoplaying = true;
	            s.emit('onAutoplayStart', s);
	            autoplay();
	        };
	        s.stopAutoplay = function (internal) {
	            if (!s.autoplayTimeoutId) return;
	            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
	            s.autoplaying = false;
	            s.autoplayTimeoutId = undefined;
	            s.emit('onAutoplayStop', s);
	        };
	        s.pauseAutoplay = function (speed) {
	            if (s.autoplayPaused) return;
	            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
	            s.autoplayPaused = true;
	            if (speed === 0) {
	                s.autoplayPaused = false;
	                autoplay();
	            }
	            else {
	                s.wrapper.transitionEnd(function () {
	                    if (!s) return;
	                    s.autoplayPaused = false;
	                    if (!s.autoplaying) {
	                        s.stopAutoplay();
	                    }
	                    else {
	                        autoplay();
	                    }
	                });
	            }
	        };
	        /*=========================
	          Min/Max Translate
	          ===========================*/
	        s.minTranslate = function () {
	            return (-s.snapGrid[0]);
	        };
	        s.maxTranslate = function () {
	            return (-s.snapGrid[s.snapGrid.length - 1]);
	        };
	        /*=========================
	          Slider/slides sizes
	          ===========================*/
	        s.updateAutoHeight = function () {
	            // Update Height
	            var slide = s.slides.eq(s.activeIndex)[0];
	            if (typeof slide !== 'undefined') {
	                var newHeight = slide.offsetHeight;
	                if (newHeight) s.wrapper.css('height', newHeight + 'px');
	            }
	        };
	        s.updateContainerSize = function () {
	            var width, height;
	            if (typeof s.params.width !== 'undefined') {
	                width = s.params.width;
	            }
	            else {
	                width = s.container[0].clientWidth;
	            }
	            if (typeof s.params.height !== 'undefined') {
	                height = s.params.height;
	            }
	            else {
	                height = s.container[0].clientHeight;
	            }
	            if (width === 0 && s.isHorizontal() || height === 0 && !s.isHorizontal()) {
	                return;
	            }
	        
	            //Subtract paddings
	            width = width - parseInt(s.container.css('padding-left'), 10) - parseInt(s.container.css('padding-right'), 10);
	            height = height - parseInt(s.container.css('padding-top'), 10) - parseInt(s.container.css('padding-bottom'), 10);
	        
	            // Store values
	            s.width = width;
	            s.height = height;
	            s.size = s.isHorizontal() ? s.width : s.height;
	        };
	        
	        s.updateSlidesSize = function () {
	            s.slides = s.wrapper.children('.' + s.params.slideClass);
	            s.snapGrid = [];
	            s.slidesGrid = [];
	            s.slidesSizesGrid = [];
	        
	            var spaceBetween = s.params.spaceBetween,
	                slidePosition = -s.params.slidesOffsetBefore,
	                i,
	                prevSlideSize = 0,
	                index = 0;
	            if (typeof s.size === 'undefined') return;
	            if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
	                spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
	            }
	        
	            s.virtualSize = -spaceBetween;
	            // reset margins
	            if (s.rtl) s.slides.css({marginLeft: '', marginTop: ''});
	            else s.slides.css({marginRight: '', marginBottom: ''});
	        
	            var slidesNumberEvenToRows;
	            if (s.params.slidesPerColumn > 1) {
	                if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
	                    slidesNumberEvenToRows = s.slides.length;
	                }
	                else {
	                    slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn;
	                }
	                if (s.params.slidesPerView !== 'auto' && s.params.slidesPerColumnFill === 'row') {
	                    slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, s.params.slidesPerView * s.params.slidesPerColumn);
	                }
	            }
	        
	            // Calc slides
	            var slideSize;
	            var slidesPerColumn = s.params.slidesPerColumn;
	            var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
	            var numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);
	            for (i = 0; i < s.slides.length; i++) {
	                slideSize = 0;
	                var slide = s.slides.eq(i);
	                if (s.params.slidesPerColumn > 1) {
	                    // Set slides order
	                    var newSlideOrderIndex;
	                    var column, row;
	                    if (s.params.slidesPerColumnFill === 'column') {
	                        column = Math.floor(i / slidesPerColumn);
	                        row = i - column * slidesPerColumn;
	                        if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn-1)) {
	                            if (++row >= slidesPerColumn) {
	                                row = 0;
	                                column++;
	                            }
	                        }
	                        newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
	                        slide
	                            .css({
	                                '-webkit-box-ordinal-group': newSlideOrderIndex,
	                                '-moz-box-ordinal-group': newSlideOrderIndex,
	                                '-ms-flex-order': newSlideOrderIndex,
	                                '-webkit-order': newSlideOrderIndex,
	                                'order': newSlideOrderIndex
	                            });
	                    }
	                    else {
	                        row = Math.floor(i / slidesPerRow);
	                        column = i - row * slidesPerRow;
	                    }
	                    slide
	                        .css({
	                            'margin-top': (row !== 0 && s.params.spaceBetween) && (s.params.spaceBetween + 'px')
	                        })
	                        .attr('data-swiper-column', column)
	                        .attr('data-swiper-row', row);
	        
	                }
	                if (slide.css('display') === 'none') continue;
	                if (s.params.slidesPerView === 'auto') {
	                    slideSize = s.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
	                    if (s.params.roundLengths) slideSize = round(slideSize);
	                }
	                else {
	                    slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
	                    if (s.params.roundLengths) slideSize = round(slideSize);
	        
	                    if (s.isHorizontal()) {
	                        s.slides[i].style.width = slideSize + 'px';
	                    }
	                    else {
	                        s.slides[i].style.height = slideSize + 'px';
	                    }
	                }
	                s.slides[i].swiperSlideSize = slideSize;
	                s.slidesSizesGrid.push(slideSize);
	        
	        
	                if (s.params.centeredSlides) {
	                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
	                    if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
	                    if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
	                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
	                    s.slidesGrid.push(slidePosition);
	                }
	                else {
	                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
	                    s.slidesGrid.push(slidePosition);
	                    slidePosition = slidePosition + slideSize + spaceBetween;
	                }
	        
	                s.virtualSize += slideSize + spaceBetween;
	        
	                prevSlideSize = slideSize;
	        
	                index ++;
	            }
	            s.virtualSize = Math.max(s.virtualSize, s.size) + s.params.slidesOffsetAfter;
	            var newSlidesGrid;
	        
	            if (
	                s.rtl && s.wrongRTL && (s.params.effect === 'slide' || s.params.effect === 'coverflow')) {
	                s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
	            }
	            if (!s.support.flexbox || s.params.setWrapperSize) {
	                if (s.isHorizontal()) s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
	                else s.wrapper.css({height: s.virtualSize + s.params.spaceBetween + 'px'});
	            }
	        
	            if (s.params.slidesPerColumn > 1) {
	                s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
	                s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
	                s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
	                if (s.params.centeredSlides) {
	                    newSlidesGrid = [];
	                    for (i = 0; i < s.snapGrid.length; i++) {
	                        if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0]) newSlidesGrid.push(s.snapGrid[i]);
	                    }
	                    s.snapGrid = newSlidesGrid;
	                }
	            }
	        
	            // Remove last grid elements depending on width
	            if (!s.params.centeredSlides) {
	                newSlidesGrid = [];
	                for (i = 0; i < s.snapGrid.length; i++) {
	                    if (s.snapGrid[i] <= s.virtualSize - s.size) {
	                        newSlidesGrid.push(s.snapGrid[i]);
	                    }
	                }
	                s.snapGrid = newSlidesGrid;
	                if (Math.floor(s.virtualSize - s.size) - Math.floor(s.snapGrid[s.snapGrid.length - 1]) > 1) {
	                    s.snapGrid.push(s.virtualSize - s.size);
	                }
	            }
	            if (s.snapGrid.length === 0) s.snapGrid = [0];
	        
	            if (s.params.spaceBetween !== 0) {
	                if (s.isHorizontal()) {
	                    if (s.rtl) s.slides.css({marginLeft: spaceBetween + 'px'});
	                    else s.slides.css({marginRight: spaceBetween + 'px'});
	                }
	                else s.slides.css({marginBottom: spaceBetween + 'px'});
	            }
	            if (s.params.watchSlidesProgress) {
	                s.updateSlidesOffset();
	            }
	        };
	        s.updateSlidesOffset = function () {
	            for (var i = 0; i < s.slides.length; i++) {
	                s.slides[i].swiperSlideOffset = s.isHorizontal() ? s.slides[i].offsetLeft : s.slides[i].offsetTop;
	            }
	        };
	        
	        /*=========================
	          Slider/slides progress
	          ===========================*/
	        s.updateSlidesProgress = function (translate) {
	            if (typeof translate === 'undefined') {
	                translate = s.translate || 0;
	            }
	            if (s.slides.length === 0) return;
	            if (typeof s.slides[0].swiperSlideOffset === 'undefined') s.updateSlidesOffset();
	        
	            var offsetCenter = -translate;
	            if (s.rtl) offsetCenter = translate;
	        
	            // Visible Slides
	            s.slides.removeClass(s.params.slideVisibleClass);
	            for (var i = 0; i < s.slides.length; i++) {
	                var slide = s.slides[i];
	                var slideProgress = (offsetCenter - slide.swiperSlideOffset) / (slide.swiperSlideSize + s.params.spaceBetween);
	                if (s.params.watchSlidesVisibility) {
	                    var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
	                    var slideAfter = slideBefore + s.slidesSizesGrid[i];
	                    var isVisible =
	                        (slideBefore >= 0 && slideBefore < s.size) ||
	                        (slideAfter > 0 && slideAfter <= s.size) ||
	                        (slideBefore <= 0 && slideAfter >= s.size);
	                    if (isVisible) {
	                        s.slides.eq(i).addClass(s.params.slideVisibleClass);
	                    }
	                }
	                slide.progress = s.rtl ? -slideProgress : slideProgress;
	            }
	        };
	        s.updateProgress = function (translate) {
	            if (typeof translate === 'undefined') {
	                translate = s.translate || 0;
	            }
	            var translatesDiff = s.maxTranslate() - s.minTranslate();
	            var wasBeginning = s.isBeginning;
	            var wasEnd = s.isEnd;
	            if (translatesDiff === 0) {
	                s.progress = 0;
	                s.isBeginning = s.isEnd = true;
	            }
	            else {
	                s.progress = (translate - s.minTranslate()) / (translatesDiff);
	                s.isBeginning = s.progress <= 0;
	                s.isEnd = s.progress >= 1;
	            }
	            if (s.isBeginning && !wasBeginning) s.emit('onReachBeginning', s);
	            if (s.isEnd && !wasEnd) s.emit('onReachEnd', s);
	        
	            if (s.params.watchSlidesProgress) s.updateSlidesProgress(translate);
	            s.emit('onProgress', s, s.progress);
	        };
	        s.updateActiveIndex = function () {
	            var translate = s.rtl ? s.translate : -s.translate;
	            var newActiveIndex, i, snapIndex;
	            for (i = 0; i < s.slidesGrid.length; i ++) {
	                if (typeof s.slidesGrid[i + 1] !== 'undefined') {
	                    if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2) {
	                        newActiveIndex = i;
	                    }
	                    else if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1]) {
	                        newActiveIndex = i + 1;
	                    }
	                }
	                else {
	                    if (translate >= s.slidesGrid[i]) {
	                        newActiveIndex = i;
	                    }
	                }
	            }
	            // Normalize slideIndex
	            if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined') newActiveIndex = 0;
	            // for (i = 0; i < s.slidesGrid.length; i++) {
	                // if (- translate >= s.slidesGrid[i]) {
	                    // newActiveIndex = i;
	                // }
	            // }
	            snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
	            if (snapIndex >= s.snapGrid.length) snapIndex = s.snapGrid.length - 1;
	        
	            if (newActiveIndex === s.activeIndex) {
	                return;
	            }
	            s.snapIndex = snapIndex;
	            s.previousIndex = s.activeIndex;
	            s.activeIndex = newActiveIndex;
	            s.updateClasses();
	        };
	        
	        /*=========================
	          Classes
	          ===========================*/
	        s.updateClasses = function () {
	            s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass);
	            var activeSlide = s.slides.eq(s.activeIndex);
	            // Active classes
	            activeSlide.addClass(s.params.slideActiveClass);
	            // Next Slide
	            var nextSlide = activeSlide.next('.' + s.params.slideClass).addClass(s.params.slideNextClass);
	            if (s.params.loop && nextSlide.length === 0) {
	                s.slides.eq(0).addClass(s.params.slideNextClass);
	            }
	            // Prev Slide
	            var prevSlide = activeSlide.prev('.' + s.params.slideClass).addClass(s.params.slidePrevClass);
	            if (s.params.loop && prevSlide.length === 0) {
	                s.slides.eq(-1).addClass(s.params.slidePrevClass);
	            }
	        
	            // Pagination
	            if (s.paginationContainer && s.paginationContainer.length > 0) {
	                // Current/Total
	                var current,
	                    total = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
	                if (s.params.loop) {
	                    current = Math.ceil((s.activeIndex - s.loopedSlides)/s.params.slidesPerGroup);
	                    if (current > s.slides.length - 1 - s.loopedSlides * 2) {
	                        current = current - (s.slides.length - s.loopedSlides * 2);
	                    }
	                    if (current > total - 1) current = current - total;
	                    if (current < 0 && s.params.paginationType !== 'bullets') current = total + current;
	                }
	                else {
	                    if (typeof s.snapIndex !== 'undefined') {
	                        current = s.snapIndex;
	                    }
	                    else {
	                        current = s.activeIndex || 0;
	                    }
	                }
	                // Types
	                if (s.params.paginationType === 'bullets' && s.bullets && s.bullets.length > 0) {
	                    s.bullets.removeClass(s.params.bulletActiveClass);
	                    if (s.paginationContainer.length > 1) {
	                        s.bullets.each(function () {
	                            if ($(this).index() === current) $(this).addClass(s.params.bulletActiveClass);
	                        });
	                    }
	                    else {
	                        s.bullets.eq(current).addClass(s.params.bulletActiveClass);
	                    }
	                }
	                if (s.params.paginationType === 'fraction') {
	                    s.paginationContainer.find('.' + s.params.paginationCurrentClass).text(current + 1);
	                    s.paginationContainer.find('.' + s.params.paginationTotalClass).text(total);
	                }
	                if (s.params.paginationType === 'progress') {
	                    var scale = (current + 1) / total,
	                        scaleX = scale,
	                        scaleY = 1;
	                    if (!s.isHorizontal()) {
	                        scaleY = scale;
	                        scaleX = 1;
	                    }
	                    s.paginationContainer.find('.' + s.params.paginationProgressbarClass).transform('translate3d(0,0,0) scaleX(' + scaleX + ') scaleY(' + scaleY + ')').transition(s.params.speed);
	                }
	                if (s.params.paginationType === 'custom' && s.params.paginationCustomRender) {
	                    s.paginationContainer.html(s.params.paginationCustomRender(s, current + 1, total));
	                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
	                }
	            }
	        
	            // Next/active buttons
	            if (!s.params.loop) {
	                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
	                    if (s.isBeginning) {
	                        s.prevButton.addClass(s.params.buttonDisabledClass);
	                        if (s.params.a11y && s.a11y) s.a11y.disable(s.prevButton);
	                    }
	                    else {
	                        s.prevButton.removeClass(s.params.buttonDisabledClass);
	                        if (s.params.a11y && s.a11y) s.a11y.enable(s.prevButton);
	                    }
	                }
	                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
	                    if (s.isEnd) {
	                        s.nextButton.addClass(s.params.buttonDisabledClass);
	                        if (s.params.a11y && s.a11y) s.a11y.disable(s.nextButton);
	                    }
	                    else {
	                        s.nextButton.removeClass(s.params.buttonDisabledClass);
	                        if (s.params.a11y && s.a11y) s.a11y.enable(s.nextButton);
	                    }
	                }
	            }
	        };
	        
	        /*=========================
	          Pagination
	          ===========================*/
	        s.updatePagination = function () {
	            if (!s.params.pagination) return;
	            if (s.paginationContainer && s.paginationContainer.length > 0) {
	                var paginationHTML = '';
	                if (s.params.paginationType === 'bullets') {
	                    var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
	                    for (var i = 0; i < numberOfBullets; i++) {
	                        if (s.params.paginationBulletRender) {
	                            paginationHTML += s.params.paginationBulletRender(i, s.params.bulletClass);
	                        }
	                        else {
	                            paginationHTML += '<' + s.params.paginationElement+' class="' + s.params.bulletClass + '"></' + s.params.paginationElement + '>';
	                        }
	                    }
	                    s.paginationContainer.html(paginationHTML);
	                    s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
	                    if (s.params.paginationClickable && s.params.a11y && s.a11y) {
	                        s.a11y.initPagination();
	                    }
	                }
	                if (s.params.paginationType === 'fraction') {
	                    if (s.params.paginationFractionRender) {
	                        paginationHTML = s.params.paginationFractionRender(s, s.params.paginationCurrentClass, s.params.paginationTotalClass);
	                    }
	                    else {
	                        paginationHTML =
	                            '<span class="' + s.params.paginationCurrentClass + '"></span>' +
	                            ' / ' +
	                            '<span class="' + s.params.paginationTotalClass+'"></span>';
	                    }
	                    s.paginationContainer.html(paginationHTML);
	                }
	                if (s.params.paginationType === 'progress') {
	                    if (s.params.paginationProgressRender) {
	                        paginationHTML = s.params.paginationProgressRender(s, s.params.paginationProgressbarClass);
	                    }
	                    else {
	                        paginationHTML = '<span class="' + s.params.paginationProgressbarClass + '"></span>';
	                    }
	                    s.paginationContainer.html(paginationHTML);
	                }
	                if (s.params.paginationType !== 'custom') {
	                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
	                }
	            }
	        };
	        /*=========================
	          Common update method
	          ===========================*/
	        s.update = function (updateTranslate) {
	            s.updateContainerSize();
	            s.updateSlidesSize();
	            s.updateProgress();
	            s.updatePagination();
	            s.updateClasses();
	            if (s.params.scrollbar && s.scrollbar) {
	                s.scrollbar.set();
	            }
	            function forceSetTranslate() {
	                newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
	                s.setWrapperTranslate(newTranslate);
	                s.updateActiveIndex();
	                s.updateClasses();
	            }
	            if (updateTranslate) {
	                var translated, newTranslate;
	                if (s.controller && s.controller.spline) {
	                    s.controller.spline = undefined;
	                }
	                if (s.params.freeMode) {
	                    forceSetTranslate();
	                    if (s.params.autoHeight) {
	                        s.updateAutoHeight();
	                    }
	                }
	                else {
	                    if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
	                        translated = s.slideTo(s.slides.length - 1, 0, false, true);
	                    }
	                    else {
	                        translated = s.slideTo(s.activeIndex, 0, false, true);
	                    }
	                    if (!translated) {
	                        forceSetTranslate();
	                    }
	                }
	            }
	            else if (s.params.autoHeight) {
	                s.updateAutoHeight();
	            }
	        };
	        
	        /*=========================
	          Resize Handler
	          ===========================*/
	        s.onResize = function (forceUpdatePagination) {
	            //Breakpoints
	            if (s.params.breakpoints) {
	                s.setBreakpoint();
	            }
	        
	            // Disable locks on resize
	            var allowSwipeToPrev = s.params.allowSwipeToPrev;
	            var allowSwipeToNext = s.params.allowSwipeToNext;
	            s.params.allowSwipeToPrev = s.params.allowSwipeToNext = true;
	        
	            s.updateContainerSize();
	            s.updateSlidesSize();
	            if (s.params.slidesPerView === 'auto' || s.params.freeMode || forceUpdatePagination) s.updatePagination();
	            if (s.params.scrollbar && s.scrollbar) {
	                s.scrollbar.set();
	            }
	            if (s.controller && s.controller.spline) {
	                s.controller.spline = undefined;
	            }
	            var slideChangedBySlideTo = false;
	            if (s.params.freeMode) {
	                var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
	                s.setWrapperTranslate(newTranslate);
	                s.updateActiveIndex();
	                s.updateClasses();
	        
	                if (s.params.autoHeight) {
	                    s.updateAutoHeight();
	                }
	            }
	            else {
	                s.updateClasses();
	                if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
	                    slideChangedBySlideTo = s.slideTo(s.slides.length - 1, 0, false, true);
	                }
	                else {
	                    slideChangedBySlideTo = s.slideTo(s.activeIndex, 0, false, true);
	                }
	            }
	            if (s.params.lazyLoading && !slideChangedBySlideTo && s.lazy) {
	                s.lazy.load();
	            }
	            // Return locks after resize
	            s.params.allowSwipeToPrev = allowSwipeToPrev;
	            s.params.allowSwipeToNext = allowSwipeToNext;
	        };
	        
	        /*=========================
	          Events
	          ===========================*/
	        
	        //Define Touch Events
	        var desktopEvents = ['mousedown', 'mousemove', 'mouseup'];
	        if (window.navigator.pointerEnabled) desktopEvents = ['pointerdown', 'pointermove', 'pointerup'];
	        else if (window.navigator.msPointerEnabled) desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
	        s.touchEvents = {
	            start : s.support.touch || !s.params.simulateTouch  ? 'touchstart' : desktopEvents[0],
	            move : s.support.touch || !s.params.simulateTouch ? 'touchmove' : desktopEvents[1],
	            end : s.support.touch || !s.params.simulateTouch ? 'touchend' : desktopEvents[2]
	        };
	        
	        
	        // WP8 Touch Events Fix
	        if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
	            (s.params.touchEventsTarget === 'container' ? s.container : s.wrapper).addClass('swiper-wp8-' + s.params.direction);
	        }
	        
	        // Attach/detach events
	        s.initEvents = function (detach) {
	            var actionDom = detach ? 'off' : 'on';
	            var action = detach ? 'removeEventListener' : 'addEventListener';
	            var touchEventsTarget = s.params.touchEventsTarget === 'container' ? s.container[0] : s.wrapper[0];
	            var target = s.support.touch ? touchEventsTarget : document;
	        
	            var moveCapture = s.params.nested ? true : false;
	        
	            //Touch Events
	            if (s.browser.ie) {
	                touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
	                target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
	                target[action](s.touchEvents.end, s.onTouchEnd, false);
	            }
	            else {
	                if (s.support.touch) {
	                    touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
	                    touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
	                    touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, false);
	                }
	                if (params.simulateTouch && !s.device.ios && !s.device.android) {
	                    touchEventsTarget[action]('mousedown', s.onTouchStart, false);
	                    document[action]('mousemove', s.onTouchMove, moveCapture);
	                    document[action]('mouseup', s.onTouchEnd, false);
	                }
	            }
	            window[action]('resize', s.onResize);
	        
	            // Next, Prev, Index
	            if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
	                s.nextButton[actionDom]('click', s.onClickNext);
	                if (s.params.a11y && s.a11y) s.nextButton[actionDom]('keydown', s.a11y.onEnterKey);
	            }
	            if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
	                s.prevButton[actionDom]('click', s.onClickPrev);
	                if (s.params.a11y && s.a11y) s.prevButton[actionDom]('keydown', s.a11y.onEnterKey);
	            }
	            if (s.params.pagination && s.params.paginationClickable) {
	                s.paginationContainer[actionDom]('click', '.' + s.params.bulletClass, s.onClickIndex);
	                if (s.params.a11y && s.a11y) s.paginationContainer[actionDom]('keydown', '.' + s.params.bulletClass, s.a11y.onEnterKey);
	            }
	        
	            // Prevent Links Clicks
	            if (s.params.preventClicks || s.params.preventClicksPropagation) touchEventsTarget[action]('click', s.preventClicks, true);
	        };
	        s.attachEvents = function () {
	            s.initEvents();
	        };
	        s.detachEvents = function () {
	            s.initEvents(true);
	        };
	        
	        /*=========================
	          Handle Clicks
	          ===========================*/
	        // Prevent Clicks
	        s.allowClick = true;
	        s.preventClicks = function (e) {
	            if (!s.allowClick) {
	                if (s.params.preventClicks) e.preventDefault();
	                if (s.params.preventClicksPropagation && s.animating) {
	                    e.stopPropagation();
	                    e.stopImmediatePropagation();
	                }
	            }
	        };
	        // Clicks
	        s.onClickNext = function (e) {
	            e.preventDefault();
	            if (s.isEnd && !s.params.loop) return;
	            s.slideNext();
	        };
	        s.onClickPrev = function (e) {
	            e.preventDefault();
	            if (s.isBeginning && !s.params.loop) return;
	            s.slidePrev();
	        };
	        s.onClickIndex = function (e) {
	            e.preventDefault();
	            var index = $(this).index() * s.params.slidesPerGroup;
	            if (s.params.loop) index = index + s.loopedSlides;
	            s.slideTo(index);
	        };
	        
	        /*=========================
	          Handle Touches
	          ===========================*/
	        function findElementInEvent(e, selector) {
	            var el = $(e.target);
	            if (!el.is(selector)) {
	                if (typeof selector === 'string') {
	                    el = el.parents(selector);
	                }
	                else if (selector.nodeType) {
	                    var found;
	                    el.parents().each(function (index, _el) {
	                        if (_el === selector) found = selector;
	                    });
	                    if (!found) return undefined;
	                    else return selector;
	                }
	            }
	            if (el.length === 0) {
	                return undefined;
	            }
	            return el[0];
	        }
	        s.updateClickedSlide = function (e) {
	            var slide = findElementInEvent(e, '.' + s.params.slideClass);
	            var slideFound = false;
	            if (slide) {
	                for (var i = 0; i < s.slides.length; i++) {
	                    if (s.slides[i] === slide) slideFound = true;
	                }
	            }
	        
	            if (slide && slideFound) {
	                s.clickedSlide = slide;
	                s.clickedIndex = $(slide).index();
	            }
	            else {
	                s.clickedSlide = undefined;
	                s.clickedIndex = undefined;
	                return;
	            }
	            if (s.params.slideToClickedSlide && s.clickedIndex !== undefined && s.clickedIndex !== s.activeIndex) {
	                var slideToIndex = s.clickedIndex,
	                    realIndex,
	                    duplicatedSlides;
	                if (s.params.loop) {
	                    if (s.animating) return;
	                    realIndex = $(s.clickedSlide).attr('data-swiper-slide-index');
	                    if (s.params.centeredSlides) {
	                        if ((slideToIndex < s.loopedSlides - s.params.slidesPerView/2) || (slideToIndex > s.slides.length - s.loopedSlides + s.params.slidesPerView/2)) {
	                            s.fixLoop();
	                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.swiper-slide-duplicate)').eq(0).index();
	                            setTimeout(function () {
	                                s.slideTo(slideToIndex);
	                            }, 0);
	                        }
	                        else {
	                            s.slideTo(slideToIndex);
	                        }
	                    }
	                    else {
	                        if (slideToIndex > s.slides.length - s.params.slidesPerView) {
	                            s.fixLoop();
	                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.swiper-slide-duplicate)').eq(0).index();
	                            setTimeout(function () {
	                                s.slideTo(slideToIndex);
	                            }, 0);
	                        }
	                        else {
	                            s.slideTo(slideToIndex);
	                        }
	                    }
	                }
	                else {
	                    s.slideTo(slideToIndex);
	                }
	            }
	        };
	        
	        var isTouched,
	            isMoved,
	            allowTouchCallbacks,
	            touchStartTime,
	            isScrolling,
	            currentTranslate,
	            startTranslate,
	            allowThresholdMove,
	            // Form elements to match
	            formElements = 'input, select, textarea, button',
	            // Last click time
	            lastClickTime = Date.now(), clickTimeout,
	            //Velocities
	            velocities = [],
	            allowMomentumBounce;
	        
	        // Animating Flag
	        s.animating = false;
	        
	        // Touches information
	        s.touches = {
	            startX: 0,
	            startY: 0,
	            currentX: 0,
	            currentY: 0,
	            diff: 0
	        };
	        
	        // Touch handlers
	        var isTouchEvent, startMoving;
	        s.onTouchStart = function (e) {
	            if (e.originalEvent) e = e.originalEvent;
	            isTouchEvent = e.type === 'touchstart';
	            if (!isTouchEvent && 'which' in e && e.which === 3) return;
	            if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) {
	                s.allowClick = true;
	                return;
	            }
	            if (s.params.swipeHandler) {
	                if (!findElementInEvent(e, s.params.swipeHandler)) return;
	            }
	        
	            var startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
	            var startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
	        
	            // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore
	            if(s.device.ios && s.params.iOSEdgeSwipeDetection && startX <= s.params.iOSEdgeSwipeThreshold) {
	                return;
	            }
	        
	            isTouched = true;
	            isMoved = false;
	            allowTouchCallbacks = true;
	            isScrolling = undefined;
	            startMoving = undefined;
	            s.touches.startX = startX;
	            s.touches.startY = startY;
	            touchStartTime = Date.now();
	            s.allowClick = true;
	            s.updateContainerSize();
	            s.swipeDirection = undefined;
	            if (s.params.threshold > 0) allowThresholdMove = false;
	            if (e.type !== 'touchstart') {
	                var preventDefault = true;
	                if ($(e.target).is(formElements)) preventDefault = false;
	                if (document.activeElement && $(document.activeElement).is(formElements)) {
	                    document.activeElement.blur();
	                }
	                if (preventDefault) {
	                    e.preventDefault();
	                }
	            }
	            s.emit('onTouchStart', s, e);
	        };
	        
	        s.onTouchMove = function (e) {
	            if (e.originalEvent) e = e.originalEvent;
	            if (isTouchEvent && e.type === 'mousemove') return;
	            if (e.preventedByNestedSwiper) {
	                s.touches.startX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
	                s.touches.startY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
	                return;
	            }
	            if (s.params.onlyExternal) {
	                // isMoved = true;
	                s.allowClick = false;
	                if (isTouched) {
	                    s.touches.startX = s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
	                    s.touches.startY = s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
	                    touchStartTime = Date.now();
	                }
	                return;
	            }
	            if (isTouchEvent && document.activeElement) {
	                if (e.target === document.activeElement && $(e.target).is(formElements)) {
	                    isMoved = true;
	                    s.allowClick = false;
	                    return;
	                }
	            }
	            if (allowTouchCallbacks) {
	                s.emit('onTouchMove', s, e);
	            }
	            if (e.targetTouches && e.targetTouches.length > 1) return;
	        
	            s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
	            s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
	        
	            if (typeof isScrolling === 'undefined') {
	                var touchAngle = Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) * 180 / Math.PI;
	                isScrolling = s.isHorizontal() ? touchAngle > s.params.touchAngle : (90 - touchAngle > s.params.touchAngle);
	            }
	            if (isScrolling) {
	                s.emit('onTouchMoveOpposite', s, e);
	            }
	            if (typeof startMoving === 'undefined' && s.browser.ieTouch) {
	                if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
	                    startMoving = true;
	                }
	            }
	            if (!isTouched) return;
	            if (isScrolling)  {
	                isTouched = false;
	                return;
	            }
	            if (!startMoving && s.browser.ieTouch) {
	                return;
	            }
	            s.allowClick = false;
	            s.emit('onSliderMove', s, e);
	            e.preventDefault();
	            if (s.params.touchMoveStopPropagation && !s.params.nested) {
	                e.stopPropagation();
	            }
	        
	            if (!isMoved) {
	                if (params.loop) {
	                    s.fixLoop();
	                }
	                startTranslate = s.getWrapperTranslate();
	                s.setWrapperTransition(0);
	                if (s.animating) {
	                    s.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd');
	                }
	                if (s.params.autoplay && s.autoplaying) {
	                    if (s.params.autoplayDisableOnInteraction) {
	                        s.stopAutoplay();
	                    }
	                    else {
	                        s.pauseAutoplay();
	                    }
	                }
	                allowMomentumBounce = false;
	                //Grab Cursor
	                if (s.params.grabCursor) {
	                    s.container[0].style.cursor = 'move';
	                    s.container[0].style.cursor = '-webkit-grabbing';
	                    s.container[0].style.cursor = '-moz-grabbin';
	                    s.container[0].style.cursor = 'grabbing';
	                }
	            }
	            isMoved = true;
	        
	            var diff = s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
	        
	            diff = diff * s.params.touchRatio;
	            if (s.rtl) diff = -diff;
	        
	            s.swipeDirection = diff > 0 ? 'prev' : 'next';
	            currentTranslate = diff + startTranslate;
	        
	            var disableParentSwiper = true;
	            if ((diff > 0 && currentTranslate > s.minTranslate())) {
	                disableParentSwiper = false;
	                if (s.params.resistance) currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio);
	            }
	            else if (diff < 0 && currentTranslate < s.maxTranslate()) {
	                disableParentSwiper = false;
	                if (s.params.resistance) currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio);
	            }
	        
	            if (disableParentSwiper) {
	                e.preventedByNestedSwiper = true;
	            }
	        
	            // Directions locks
	            if (!s.params.allowSwipeToNext && s.swipeDirection === 'next' && currentTranslate < startTranslate) {
	                currentTranslate = startTranslate;
	            }
	            if (!s.params.allowSwipeToPrev && s.swipeDirection === 'prev' && currentTranslate > startTranslate) {
	                currentTranslate = startTranslate;
	            }
	        
	            if (!s.params.followFinger) return;
	        
	            // Threshold
	            if (s.params.threshold > 0) {
	                if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
	                    if (!allowThresholdMove) {
	                        allowThresholdMove = true;
	                        s.touches.startX = s.touches.currentX;
	                        s.touches.startY = s.touches.currentY;
	                        currentTranslate = startTranslate;
	                        s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
	                        return;
	                    }
	                }
	                else {
	                    currentTranslate = startTranslate;
	                    return;
	                }
	            }
	            // Update active index in free mode
	            if (s.params.freeMode || s.params.watchSlidesProgress) {
	                s.updateActiveIndex();
	            }
	            if (s.params.freeMode) {
	                //Velocity
	                if (velocities.length === 0) {
	                    velocities.push({
	                        position: s.touches[s.isHorizontal() ? 'startX' : 'startY'],
	                        time: touchStartTime
	                    });
	                }
	                velocities.push({
	                    position: s.touches[s.isHorizontal() ? 'currentX' : 'currentY'],
	                    time: (new window.Date()).getTime()
	                });
	            }
	            // Update progress
	            s.updateProgress(currentTranslate);
	            // Update translate
	            s.setWrapperTranslate(currentTranslate);
	        };
	        s.onTouchEnd = function (e) {
	            if (e.originalEvent) e = e.originalEvent;
	            if (allowTouchCallbacks) {
	                s.emit('onTouchEnd', s, e);
	            }
	            allowTouchCallbacks = false;
	            if (!isTouched) return;
	            //Return Grab Cursor
	            if (s.params.grabCursor && isMoved && isTouched) {
	                s.container[0].style.cursor = 'move';
	                s.container[0].style.cursor = '-webkit-grab';
	                s.container[0].style.cursor = '-moz-grab';
	                s.container[0].style.cursor = 'grab';
	            }
	        
	            // Time diff
	            var touchEndTime = Date.now();
	            var timeDiff = touchEndTime - touchStartTime;
	        
	            // Tap, doubleTap, Click
	            if (s.allowClick) {
	                s.updateClickedSlide(e);
	                s.emit('onTap', s, e);
	                if (timeDiff < 300 && (touchEndTime - lastClickTime) > 300) {
	                    if (clickTimeout) clearTimeout(clickTimeout);
	                    clickTimeout = setTimeout(function () {
	                        if (!s) return;
	                        if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
	                            s.paginationContainer.toggleClass(s.params.paginationHiddenClass);
	                        }
	                        s.emit('onClick', s, e);
	                    }, 300);
	        
	                }
	                if (timeDiff < 300 && (touchEndTime - lastClickTime) < 300) {
	                    if (clickTimeout) clearTimeout(clickTimeout);
	                    s.emit('onDoubleTap', s, e);
	                }
	            }
	        
	            lastClickTime = Date.now();
	            setTimeout(function () {
	                if (s) s.allowClick = true;
	            }, 0);
	        
	            if (!isTouched || !isMoved || !s.swipeDirection || s.touches.diff === 0 || currentTranslate === startTranslate) {
	                isTouched = isMoved = false;
	                return;
	            }
	            isTouched = isMoved = false;
	        
	            var currentPos;
	            if (s.params.followFinger) {
	                currentPos = s.rtl ? s.translate : -s.translate;
	            }
	            else {
	                currentPos = -currentTranslate;
	            }
	            if (s.params.freeMode) {
	                if (currentPos < -s.minTranslate()) {
	                    s.slideTo(s.activeIndex);
	                    return;
	                }
	                else if (currentPos > -s.maxTranslate()) {
	                    if (s.slides.length < s.snapGrid.length) {
	                        s.slideTo(s.snapGrid.length - 1);
	                    }
	                    else {
	                        s.slideTo(s.slides.length - 1);
	                    }
	                    return;
	                }
	        
	                if (s.params.freeModeMomentum) {
	                    if (velocities.length > 1) {
	                        var lastMoveEvent = velocities.pop(), velocityEvent = velocities.pop();
	        
	                        var distance = lastMoveEvent.position - velocityEvent.position;
	                        var time = lastMoveEvent.time - velocityEvent.time;
	                        s.velocity = distance / time;
	                        s.velocity = s.velocity / 2;
	                        if (Math.abs(s.velocity) < s.params.freeModeMinimumVelocity) {
	                            s.velocity = 0;
	                        }
	                        // this implies that the user stopped moving a finger then released.
	                        // There would be no events with distance zero, so the last event is stale.
	                        if (time > 150 || (new window.Date().getTime() - lastMoveEvent.time) > 300) {
	                            s.velocity = 0;
	                        }
	                    } else {
	                        s.velocity = 0;
	                    }
	        
	                    velocities.length = 0;
	                    var momentumDuration = 1000 * s.params.freeModeMomentumRatio;
	                    var momentumDistance = s.velocity * momentumDuration;
	        
	                    var newPosition = s.translate + momentumDistance;
	                    if (s.rtl) newPosition = - newPosition;
	                    var doBounce = false;
	                    var afterBouncePosition;
	                    var bounceAmount = Math.abs(s.velocity) * 20 * s.params.freeModeMomentumBounceRatio;
	                    if (newPosition < s.maxTranslate()) {
	                        if (s.params.freeModeMomentumBounce) {
	                            if (newPosition + s.maxTranslate() < -bounceAmount) {
	                                newPosition = s.maxTranslate() - bounceAmount;
	                            }
	                            afterBouncePosition = s.maxTranslate();
	                            doBounce = true;
	                            allowMomentumBounce = true;
	                        }
	                        else {
	                            newPosition = s.maxTranslate();
	                        }
	                    }
	                    else if (newPosition > s.minTranslate()) {
	                        if (s.params.freeModeMomentumBounce) {
	                            if (newPosition - s.minTranslate() > bounceAmount) {
	                                newPosition = s.minTranslate() + bounceAmount;
	                            }
	                            afterBouncePosition = s.minTranslate();
	                            doBounce = true;
	                            allowMomentumBounce = true;
	                        }
	                        else {
	                            newPosition = s.minTranslate();
	                        }
	                    }
	                    else if (s.params.freeModeSticky) {
	                        var j = 0,
	                            nextSlide;
	                        for (j = 0; j < s.snapGrid.length; j += 1) {
	                            if (s.snapGrid[j] > -newPosition) {
	                                nextSlide = j;
	                                break;
	                            }
	        
	                        }
	                        if (Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || s.swipeDirection === 'next') {
	                            newPosition = s.snapGrid[nextSlide];
	                        } else {
	                            newPosition = s.snapGrid[nextSlide - 1];
	                        }
	                        if (!s.rtl) newPosition = - newPosition;
	                    }
	                    //Fix duration
	                    if (s.velocity !== 0) {
	                        if (s.rtl) {
	                            momentumDuration = Math.abs((-newPosition - s.translate) / s.velocity);
	                        }
	                        else {
	                            momentumDuration = Math.abs((newPosition - s.translate) / s.velocity);
	                        }
	                    }
	                    else if (s.params.freeModeSticky) {
	                        s.slideReset();
	                        return;
	                    }
	        
	                    if (s.params.freeModeMomentumBounce && doBounce) {
	                        s.updateProgress(afterBouncePosition);
	                        s.setWrapperTransition(momentumDuration);
	                        s.setWrapperTranslate(newPosition);
	                        s.onTransitionStart();
	                        s.animating = true;
	                        s.wrapper.transitionEnd(function () {
	                            if (!s || !allowMomentumBounce) return;
	                            s.emit('onMomentumBounce', s);
	        
	                            s.setWrapperTransition(s.params.speed);
	                            s.setWrapperTranslate(afterBouncePosition);
	                            s.wrapper.transitionEnd(function () {
	                                if (!s) return;
	                                s.onTransitionEnd();
	                            });
	                        });
	                    } else if (s.velocity) {
	                        s.updateProgress(newPosition);
	                        s.setWrapperTransition(momentumDuration);
	                        s.setWrapperTranslate(newPosition);
	                        s.onTransitionStart();
	                        if (!s.animating) {
	                            s.animating = true;
	                            s.wrapper.transitionEnd(function () {
	                                if (!s) return;
	                                s.onTransitionEnd();
	                            });
	                        }
	        
	                    } else {
	                        s.updateProgress(newPosition);
	                    }
	        
	                    s.updateActiveIndex();
	                }
	                if (!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) {
	                    s.updateProgress();
	                    s.updateActiveIndex();
	                }
	                return;
	            }
	        
	            // Find current slide
	            var i, stopIndex = 0, groupSize = s.slidesSizesGrid[0];
	            for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
	                if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== 'undefined') {
	                    if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
	                        stopIndex = i;
	                        groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i];
	                    }
	                }
	                else {
	                    if (currentPos >= s.slidesGrid[i]) {
	                        stopIndex = i;
	                        groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2];
	                    }
	                }
	            }
	        
	            // Find current slide size
	            var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;
	        
	            if (timeDiff > s.params.longSwipesMs) {
	                // Long touches
	                if (!s.params.longSwipes) {
	                    s.slideTo(s.activeIndex);
	                    return;
	                }
	                if (s.swipeDirection === 'next') {
	                    if (ratio >= s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);
	                    else s.slideTo(stopIndex);
	        
	                }
	                if (s.swipeDirection === 'prev') {
	                    if (ratio > (1 - s.params.longSwipesRatio)) s.slideTo(stopIndex + s.params.slidesPerGroup);
	                    else s.slideTo(stopIndex);
	                }
	            }
	            else {
	                // Short swipes
	                if (!s.params.shortSwipes) {
	                    s.slideTo(s.activeIndex);
	                    return;
	                }
	                if (s.swipeDirection === 'next') {
	                    s.slideTo(stopIndex + s.params.slidesPerGroup);
	        
	                }
	                if (s.swipeDirection === 'prev') {
	                    s.slideTo(stopIndex);
	                }
	            }
	        };
	        /*=========================
	          Transitions
	          ===========================*/
	        s._slideTo = function (slideIndex, speed) {
	            return s.slideTo(slideIndex, speed, true, true);
	        };
	        s.slideTo = function (slideIndex, speed, runCallbacks, internal) {
	            if (typeof runCallbacks === 'undefined') runCallbacks = true;
	            if (typeof slideIndex === 'undefined') slideIndex = 0;
	            if (slideIndex < 0) slideIndex = 0;
	            s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
	            if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;
	        
	            var translate = - s.snapGrid[s.snapIndex];
	            // Stop autoplay
	            if (s.params.autoplay && s.autoplaying) {
	                if (internal || !s.params.autoplayDisableOnInteraction) {
	                    s.pauseAutoplay(speed);
	                }
	                else {
	                    s.stopAutoplay();
	                }
	            }
	            // Update progress
	            s.updateProgress(translate);
	        
	            // Normalize slideIndex
	            for (var i = 0; i < s.slidesGrid.length; i++) {
	                if (- Math.floor(translate * 100) >= Math.floor(s.slidesGrid[i] * 100)) {
	                    slideIndex = i;
	                }
	            }
	        
	            // Directions locks
	            if (!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) {
	                return false;
	            }
	            if (!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate()) {
	                if ((s.activeIndex || 0) !== slideIndex ) return false;
	            }
	        
	            // Update Index
	            if (typeof speed === 'undefined') speed = s.params.speed;
	            s.previousIndex = s.activeIndex || 0;
	            s.activeIndex = slideIndex;
	        
	            if ((s.rtl && -translate === s.translate) || (!s.rtl && translate === s.translate)) {
	                // Update Height
	                if (s.params.autoHeight) {
	                    s.updateAutoHeight();
	                }
	                s.updateClasses();
	                if (s.params.effect !== 'slide') {
	                    s.setWrapperTranslate(translate);
	                }
	                return false;
	            }
	            s.updateClasses();
	            s.onTransitionStart(runCallbacks);
	        
	            if (speed === 0) {
	                s.setWrapperTranslate(translate);
	                s.setWrapperTransition(0);
	                s.onTransitionEnd(runCallbacks);
	            }
	            else {
	                s.setWrapperTranslate(translate);
	                s.setWrapperTransition(speed);
	                if (!s.animating) {
	                    s.animating = true;
	                    s.wrapper.transitionEnd(function () {
	                        if (!s) return;
	                        s.onTransitionEnd(runCallbacks);
	                    });
	                }
	        
	            }
	        
	            return true;
	        };
	        
	        s.onTransitionStart = function (runCallbacks) {
	            if (typeof runCallbacks === 'undefined') runCallbacks = true;
	            if (s.params.autoHeight) {
	                s.updateAutoHeight();
	            }
	            if (s.lazy) s.lazy.onTransitionStart();
	            if (runCallbacks) {
	                s.emit('onTransitionStart', s);
	                if (s.activeIndex !== s.previousIndex) {
	                    s.emit('onSlideChangeStart', s);
	                    if (s.activeIndex > s.previousIndex) {
	                        s.emit('onSlideNextStart', s);
	                    }
	                    else {
	                        s.emit('onSlidePrevStart', s);
	                    }
	                }
	        
	            }
	        };
	        s.onTransitionEnd = function (runCallbacks) {
	            s.animating = false;
	            s.setWrapperTransition(0);
	            if (typeof runCallbacks === 'undefined') runCallbacks = true;
	            if (s.lazy) s.lazy.onTransitionEnd();
	            if (runCallbacks) {
	                s.emit('onTransitionEnd', s);
	                if (s.activeIndex !== s.previousIndex) {
	                    s.emit('onSlideChangeEnd', s);
	                    if (s.activeIndex > s.previousIndex) {
	                        s.emit('onSlideNextEnd', s);
	                    }
	                    else {
	                        s.emit('onSlidePrevEnd', s);
	                    }
	                }
	            }
	            if (s.params.hashnav && s.hashnav) {
	                s.hashnav.setHash();
	            }
	        
	        };
	        s.slideNext = function (runCallbacks, speed, internal) {
	            if (s.params.loop) {
	                if (s.animating) return false;
	                s.fixLoop();
	                var clientLeft = s.container[0].clientLeft;
	                return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
	            }
	            else return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
	        };
	        s._slideNext = function (speed) {
	            return s.slideNext(true, speed, true);
	        };
	        s.slidePrev = function (runCallbacks, speed, internal) {
	            if (s.params.loop) {
	                if (s.animating) return false;
	                s.fixLoop();
	                var clientLeft = s.container[0].clientLeft;
	                return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
	            }
	            else return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
	        };
	        s._slidePrev = function (speed) {
	            return s.slidePrev(true, speed, true);
	        };
	        s.slideReset = function (runCallbacks, speed, internal) {
	            return s.slideTo(s.activeIndex, speed, runCallbacks);
	        };
	        
	        /*=========================
	          Translate/transition helpers
	          ===========================*/
	        s.setWrapperTransition = function (duration, byController) {
	            s.wrapper.transition(duration);
	            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
	                s.effects[s.params.effect].setTransition(duration);
	            }
	            if (s.params.parallax && s.parallax) {
	                s.parallax.setTransition(duration);
	            }
	            if (s.params.scrollbar && s.scrollbar) {
	                s.scrollbar.setTransition(duration);
	            }
	            if (s.params.control && s.controller) {
	                s.controller.setTransition(duration, byController);
	            }
	            s.emit('onSetTransition', s, duration);
	        };
	        s.setWrapperTranslate = function (translate, updateActiveIndex, byController) {
	            var x = 0, y = 0, z = 0;
	            if (s.isHorizontal()) {
	                x = s.rtl ? -translate : translate;
	            }
	            else {
	                y = translate;
	            }
	        
	            if (s.params.roundLengths) {
	                x = round(x);
	                y = round(y);
	            }
	        
	            if (!s.params.virtualTranslate) {
	                if (s.support.transforms3d) s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
	                else s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)');
	            }
	        
	            s.translate = s.isHorizontal() ? x : y;
	        
	            // Check if we need to update progress
	            var progress;
	            var translatesDiff = s.maxTranslate() - s.minTranslate();
	            if (translatesDiff === 0) {
	                progress = 0;
	            }
	            else {
	                progress = (translate - s.minTranslate()) / (translatesDiff);
	            }
	            if (progress !== s.progress) {
	                s.updateProgress(translate);
	            }
	        
	            if (updateActiveIndex) s.updateActiveIndex();
	            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
	                s.effects[s.params.effect].setTranslate(s.translate);
	            }
	            if (s.params.parallax && s.parallax) {
	                s.parallax.setTranslate(s.translate);
	            }
	            if (s.params.scrollbar && s.scrollbar) {
	                s.scrollbar.setTranslate(s.translate);
	            }
	            if (s.params.control && s.controller) {
	                s.controller.setTranslate(s.translate, byController);
	            }
	            s.emit('onSetTranslate', s, s.translate);
	        };
	        
	        s.getTranslate = function (el, axis) {
	            var matrix, curTransform, curStyle, transformMatrix;
	        
	            // automatic axis detection
	            if (typeof axis === 'undefined') {
	                axis = 'x';
	            }
	        
	            if (s.params.virtualTranslate) {
	                return s.rtl ? -s.translate : s.translate;
	            }
	        
	            curStyle = window.getComputedStyle(el, null);
	            if (window.WebKitCSSMatrix) {
	                curTransform = curStyle.transform || curStyle.webkitTransform;
	                if (curTransform.split(',').length > 6) {
	                    curTransform = curTransform.split(', ').map(function(a){
	                        return a.replace(',','.');
	                    }).join(', ');
	                }
	                // Some old versions of Webkit choke when 'none' is passed; pass
	                // empty string instead in this case
	                transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
	            }
	            else {
	                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
	                matrix = transformMatrix.toString().split(',');
	            }
	        
	            if (axis === 'x') {
	                //Latest Chrome and webkits Fix
	                if (window.WebKitCSSMatrix)
	                    curTransform = transformMatrix.m41;
	                //Crazy IE10 Matrix
	                else if (matrix.length === 16)
	                    curTransform = parseFloat(matrix[12]);
	                //Normal Browsers
	                else
	                    curTransform = parseFloat(matrix[4]);
	            }
	            if (axis === 'y') {
	                //Latest Chrome and webkits Fix
	                if (window.WebKitCSSMatrix)
	                    curTransform = transformMatrix.m42;
	                //Crazy IE10 Matrix
	                else if (matrix.length === 16)
	                    curTransform = parseFloat(matrix[13]);
	                //Normal Browsers
	                else
	                    curTransform = parseFloat(matrix[5]);
	            }
	            if (s.rtl && curTransform) curTransform = -curTransform;
	            return curTransform || 0;
	        };
	        s.getWrapperTranslate = function (axis) {
	            if (typeof axis === 'undefined') {
	                axis = s.isHorizontal() ? 'x' : 'y';
	            }
	            return s.getTranslate(s.wrapper[0], axis);
	        };
	        
	        /*=========================
	          Observer
	          ===========================*/
	        s.observers = [];
	        function initObserver(target, options) {
	            options = options || {};
	            // create an observer instance
	            var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
	            var observer = new ObserverFunc(function (mutations) {
	                mutations.forEach(function (mutation) {
	                    s.onResize(true);
	                    s.emit('onObserverUpdate', s, mutation);
	                });
	            });
	        
	            observer.observe(target, {
	                attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
	                childList: typeof options.childList === 'undefined' ? true : options.childList,
	                characterData: typeof options.characterData === 'undefined' ? true : options.characterData
	            });
	        
	            s.observers.push(observer);
	        }
	        s.initObservers = function () {
	            if (s.params.observeParents) {
	                var containerParents = s.container.parents();
	                for (var i = 0; i < containerParents.length; i++) {
	                    initObserver(containerParents[i]);
	                }
	            }
	        
	            // Observe container
	            initObserver(s.container[0], {childList: false});
	        
	            // Observe wrapper
	            initObserver(s.wrapper[0], {attributes: false});
	        };
	        s.disconnectObservers = function () {
	            for (var i = 0; i < s.observers.length; i++) {
	                s.observers[i].disconnect();
	            }
	            s.observers = [];
	        };
	        /*=========================
	          Loop
	          ===========================*/
	        // Create looped slides
	        s.createLoop = function () {
	            // Remove duplicated slides
	            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
	        
	            var slides = s.wrapper.children('.' + s.params.slideClass);
	        
	            if(s.params.slidesPerView === 'auto' && !s.params.loopedSlides) s.params.loopedSlides = slides.length;
	        
	            s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
	            s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;
	            if (s.loopedSlides > slides.length) {
	                s.loopedSlides = slides.length;
	            }
	        
	            var prependSlides = [], appendSlides = [], i;
	            slides.each(function (index, el) {
	                var slide = $(this);
	                if (index < s.loopedSlides) appendSlides.push(el);
	                if (index < slides.length && index >= slides.length - s.loopedSlides) prependSlides.push(el);
	                slide.attr('data-swiper-slide-index', index);
	            });
	            for (i = 0; i < appendSlides.length; i++) {
	                s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
	            }
	            for (i = prependSlides.length - 1; i >= 0; i--) {
	                s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
	            }
	        };
	        s.destroyLoop = function () {
	            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
	            s.slides.removeAttr('data-swiper-slide-index');
	        };
	        s.reLoop = function (updatePosition) {
	            var oldIndex = s.activeIndex - s.loopedSlides;
	            s.destroyLoop();
	            s.createLoop();
	            s.updateSlidesSize();
	            if (updatePosition) {
	                s.slideTo(oldIndex + s.loopedSlides, 0, false);
	            }
	        
	        };
	        s.fixLoop = function () {
	            var newIndex;
	            //Fix For Negative Oversliding
	            if (s.activeIndex < s.loopedSlides) {
	                newIndex = s.slides.length - s.loopedSlides * 3 + s.activeIndex;
	                newIndex = newIndex + s.loopedSlides;
	                s.slideTo(newIndex, 0, false, true);
	            }
	            //Fix For Positive Oversliding
	            else if ((s.params.slidesPerView === 'auto' && s.activeIndex >= s.loopedSlides * 2) || (s.activeIndex > s.slides.length - s.params.slidesPerView * 2)) {
	                newIndex = -s.slides.length + s.activeIndex + s.loopedSlides;
	                newIndex = newIndex + s.loopedSlides;
	                s.slideTo(newIndex, 0, false, true);
	            }
	        };
	        /*=========================
	          Append/Prepend/Remove Slides
	          ===========================*/
	        s.appendSlide = function (slides) {
	            if (s.params.loop) {
	                s.destroyLoop();
	            }
	            if (typeof slides === 'object' && slides.length) {
	                for (var i = 0; i < slides.length; i++) {
	                    if (slides[i]) s.wrapper.append(slides[i]);
	                }
	            }
	            else {
	                s.wrapper.append(slides);
	            }
	            if (s.params.loop) {
	                s.createLoop();
	            }
	            if (!(s.params.observer && s.support.observer)) {
	                s.update(true);
	            }
	        };
	        s.prependSlide = function (slides) {
	            if (s.params.loop) {
	                s.destroyLoop();
	            }
	            var newActiveIndex = s.activeIndex + 1;
	            if (typeof slides === 'object' && slides.length) {
	                for (var i = 0; i < slides.length; i++) {
	                    if (slides[i]) s.wrapper.prepend(slides[i]);
	                }
	                newActiveIndex = s.activeIndex + slides.length;
	            }
	            else {
	                s.wrapper.prepend(slides);
	            }
	            if (s.params.loop) {
	                s.createLoop();
	            }
	            if (!(s.params.observer && s.support.observer)) {
	                s.update(true);
	            }
	            s.slideTo(newActiveIndex, 0, false);
	        };
	        s.removeSlide = function (slidesIndexes) {
	            if (s.params.loop) {
	                s.destroyLoop();
	                s.slides = s.wrapper.children('.' + s.params.slideClass);
	            }
	            var newActiveIndex = s.activeIndex,
	                indexToRemove;
	            if (typeof slidesIndexes === 'object' && slidesIndexes.length) {
	                for (var i = 0; i < slidesIndexes.length; i++) {
	                    indexToRemove = slidesIndexes[i];
	                    if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
	                    if (indexToRemove < newActiveIndex) newActiveIndex--;
	                }
	                newActiveIndex = Math.max(newActiveIndex, 0);
	            }
	            else {
	                indexToRemove = slidesIndexes;
	                if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
	                if (indexToRemove < newActiveIndex) newActiveIndex--;
	                newActiveIndex = Math.max(newActiveIndex, 0);
	            }
	        
	            if (s.params.loop) {
	                s.createLoop();
	            }
	        
	            if (!(s.params.observer && s.support.observer)) {
	                s.update(true);
	            }
	            if (s.params.loop) {
	                s.slideTo(newActiveIndex + s.loopedSlides, 0, false);
	            }
	            else {
	                s.slideTo(newActiveIndex, 0, false);
	            }
	        
	        };
	        s.removeAllSlides = function () {
	            var slidesIndexes = [];
	            for (var i = 0; i < s.slides.length; i++) {
	                slidesIndexes.push(i);
	            }
	            s.removeSlide(slidesIndexes);
	        };
	        
	
	        /*=========================
	          Effects
	          ===========================*/
	        s.effects = {
	            fade: {
	                setTranslate: function () {
	                    for (var i = 0; i < s.slides.length; i++) {
	                        var slide = s.slides.eq(i);
	                        var offset = slide[0].swiperSlideOffset;
	                        var tx = -offset;
	                        if (!s.params.virtualTranslate) tx = tx - s.translate;
	                        var ty = 0;
	                        if (!s.isHorizontal()) {
	                            ty = tx;
	                            tx = 0;
	                        }
	                        var slideOpacity = s.params.fade.crossFade ?
	                                Math.max(1 - Math.abs(slide[0].progress), 0) :
	                                1 + Math.min(Math.max(slide[0].progress, -1), 0);
	                        slide
	                            .css({
	                                opacity: slideOpacity
	                            })
	                            .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px)');
	        
	                    }
	        
	                },
	                setTransition: function (duration) {
	                    s.slides.transition(duration);
	                    if (s.params.virtualTranslate && duration !== 0) {
	                        var eventTriggered = false;
	                        s.slides.transitionEnd(function () {
	                            if (eventTriggered) return;
	                            if (!s) return;
	                            eventTriggered = true;
	                            s.animating = false;
	                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
	                            for (var i = 0; i < triggerEvents.length; i++) {
	                                s.wrapper.trigger(triggerEvents[i]);
	                            }
	                        });
	                    }
	                }
	            },
	            flip: {
	                setTranslate: function () {
	                    for (var i = 0; i < s.slides.length; i++) {
	                        var slide = s.slides.eq(i);
	                        var progress = slide[0].progress;
	                        if (s.params.flip.limitRotation) {
	                            progress = Math.max(Math.min(slide[0].progress, 1), -1);
	                        }
	                        var offset = slide[0].swiperSlideOffset;
	                        var rotate = -180 * progress,
	                            rotateY = rotate,
	                            rotateX = 0,
	                            tx = -offset,
	                            ty = 0;
	                        if (!s.isHorizontal()) {
	                            ty = tx;
	                            tx = 0;
	                            rotateX = -rotateY;
	                            rotateY = 0;
	                        }
	                        else if (s.rtl) {
	                            rotateY = -rotateY;
	                        }
	        
	                        slide[0].style.zIndex = -Math.abs(Math.round(progress)) + s.slides.length;
	        
	                        if (s.params.flip.slideShadows) {
	                            //Set shadows
	                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
	                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
	                            if (shadowBefore.length === 0) {
	                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
	                                slide.append(shadowBefore);
	                            }
	                            if (shadowAfter.length === 0) {
	                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
	                                slide.append(shadowAfter);
	                            }
	                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
	                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
	                        }
	        
	                        slide
	                            .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
	                    }
	                },
	                setTransition: function (duration) {
	                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
	                    if (s.params.virtualTranslate && duration !== 0) {
	                        var eventTriggered = false;
	                        s.slides.eq(s.activeIndex).transitionEnd(function () {
	                            if (eventTriggered) return;
	                            if (!s) return;
	                            if (!$(this).hasClass(s.params.slideActiveClass)) return;
	                            eventTriggered = true;
	                            s.animating = false;
	                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
	                            for (var i = 0; i < triggerEvents.length; i++) {
	                                s.wrapper.trigger(triggerEvents[i]);
	                            }
	                        });
	                    }
	                }
	            },
	            cube: {
	                setTranslate: function () {
	                    var wrapperRotate = 0, cubeShadow;
	                    if (s.params.cube.shadow) {
	                        if (s.isHorizontal()) {
	                            cubeShadow = s.wrapper.find('.swiper-cube-shadow');
	                            if (cubeShadow.length === 0) {
	                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
	                                s.wrapper.append(cubeShadow);
	                            }
	                            cubeShadow.css({height: s.width + 'px'});
	                        }
	                        else {
	                            cubeShadow = s.container.find('.swiper-cube-shadow');
	                            if (cubeShadow.length === 0) {
	                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
	                                s.container.append(cubeShadow);
	                            }
	                        }
	                    }
	                    for (var i = 0; i < s.slides.length; i++) {
	                        var slide = s.slides.eq(i);
	                        var slideAngle = i * 90;
	                        var round = Math.floor(slideAngle / 360);
	                        if (s.rtl) {
	                            slideAngle = -slideAngle;
	                            round = Math.floor(-slideAngle / 360);
	                        }
	                        var progress = Math.max(Math.min(slide[0].progress, 1), -1);
	                        var tx = 0, ty = 0, tz = 0;
	                        if (i % 4 === 0) {
	                            tx = - round * 4 * s.size;
	                            tz = 0;
	                        }
	                        else if ((i - 1) % 4 === 0) {
	                            tx = 0;
	                            tz = - round * 4 * s.size;
	                        }
	                        else if ((i - 2) % 4 === 0) {
	                            tx = s.size + round * 4 * s.size;
	                            tz = s.size;
	                        }
	                        else if ((i - 3) % 4 === 0) {
	                            tx = - s.size;
	                            tz = 3 * s.size + s.size * 4 * round;
	                        }
	                        if (s.rtl) {
	                            tx = -tx;
	                        }
	        
	                        if (!s.isHorizontal()) {
	                            ty = tx;
	                            tx = 0;
	                        }
	        
	                        var transform = 'rotateX(' + (s.isHorizontal() ? 0 : -slideAngle) + 'deg) rotateY(' + (s.isHorizontal() ? slideAngle : 0) + 'deg) translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';
	                        if (progress <= 1 && progress > -1) {
	                            wrapperRotate = i * 90 + progress * 90;
	                            if (s.rtl) wrapperRotate = -i * 90 - progress * 90;
	                        }
	                        slide.transform(transform);
	                        if (s.params.cube.slideShadows) {
	                            //Set shadows
	                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
	                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
	                            if (shadowBefore.length === 0) {
	                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
	                                slide.append(shadowBefore);
	                            }
	                            if (shadowAfter.length === 0) {
	                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
	                                slide.append(shadowAfter);
	                            }
	                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
	                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
	                        }
	                    }
	                    s.wrapper.css({
	                        '-webkit-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
	                        '-moz-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
	                        '-ms-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
	                        'transform-origin': '50% 50% -' + (s.size / 2) + 'px'
	                    });
	        
	                    if (s.params.cube.shadow) {
	                        if (s.isHorizontal()) {
	                            cubeShadow.transform('translate3d(0px, ' + (s.width / 2 + s.params.cube.shadowOffset) + 'px, ' + (-s.width / 2) + 'px) rotateX(90deg) rotateZ(0deg) scale(' + (s.params.cube.shadowScale) + ')');
	                        }
	                        else {
	                            var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
	                            var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
	                            var scale1 = s.params.cube.shadowScale,
	                                scale2 = s.params.cube.shadowScale / multiplier,
	                                offset = s.params.cube.shadowOffset;
	                            cubeShadow.transform('scale3d(' + scale1 + ', 1, ' + scale2 + ') translate3d(0px, ' + (s.height / 2 + offset) + 'px, ' + (-s.height / 2 / scale2) + 'px) rotateX(-90deg)');
	                        }
	                    }
	                    var zFactor = (s.isSafari || s.isUiWebView) ? (-s.size / 2) : 0;
	                    s.wrapper.transform('translate3d(0px,0,' + zFactor + 'px) rotateX(' + (s.isHorizontal() ? 0 : wrapperRotate) + 'deg) rotateY(' + (s.isHorizontal() ? -wrapperRotate : 0) + 'deg)');
	                },
	                setTransition: function (duration) {
	                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
	                    if (s.params.cube.shadow && !s.isHorizontal()) {
	                        s.container.find('.swiper-cube-shadow').transition(duration);
	                    }
	                }
	            },
	            coverflow: {
	                setTranslate: function () {
	                    var transform = s.translate;
	                    var center = s.isHorizontal() ? -transform + s.width / 2 : -transform + s.height / 2;
	                    var rotate = s.isHorizontal() ? s.params.coverflow.rotate: -s.params.coverflow.rotate;
	                    var translate = s.params.coverflow.depth;
	                    //Each slide offset from center
	                    for (var i = 0, length = s.slides.length; i < length; i++) {
	                        var slide = s.slides.eq(i);
	                        var slideSize = s.slidesSizesGrid[i];
	                        var slideOffset = slide[0].swiperSlideOffset;
	                        var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier;
	        
	                        var rotateY = s.isHorizontal() ? rotate * offsetMultiplier : 0;
	                        var rotateX = s.isHorizontal() ? 0 : rotate * offsetMultiplier;
	                        // var rotateZ = 0
	                        var translateZ = -translate * Math.abs(offsetMultiplier);
	        
	                        var translateY = s.isHorizontal() ? 0 : s.params.coverflow.stretch * (offsetMultiplier);
	                        var translateX = s.isHorizontal() ? s.params.coverflow.stretch * (offsetMultiplier) : 0;
	        
	                        //Fix for ultra small values
	                        if (Math.abs(translateX) < 0.001) translateX = 0;
	                        if (Math.abs(translateY) < 0.001) translateY = 0;
	                        if (Math.abs(translateZ) < 0.001) translateZ = 0;
	                        if (Math.abs(rotateY) < 0.001) rotateY = 0;
	                        if (Math.abs(rotateX) < 0.001) rotateX = 0;
	        
	                        var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
	        
	                        slide.transform(slideTransform);
	                        slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
	                        if (s.params.coverflow.slideShadows) {
	                            //Set shadows
	                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
	                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
	                            if (shadowBefore.length === 0) {
	                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
	                                slide.append(shadowBefore);
	                            }
	                            if (shadowAfter.length === 0) {
	                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
	                                slide.append(shadowAfter);
	                            }
	                            if (shadowBefore.length) shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
	                            if (shadowAfter.length) shadowAfter[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
	                        }
	                    }
	        
	                    //Set correct perspective for IE10
	                    if (s.browser.ie) {
	                        var ws = s.wrapper[0].style;
	                        ws.perspectiveOrigin = center + 'px 50%';
	                    }
	                },
	                setTransition: function (duration) {
	                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
	                }
	            }
	        };
	
	        /*=========================
	          Images Lazy Loading
	          ===========================*/
	        s.lazy = {
	            initialImageLoaded: false,
	            loadImageInSlide: function (index, loadInDuplicate) {
	                if (typeof index === 'undefined') return;
	                if (typeof loadInDuplicate === 'undefined') loadInDuplicate = true;
	                if (s.slides.length === 0) return;
	        
	                var slide = s.slides.eq(index);
	                var img = slide.find('.swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)');
	                if (slide.hasClass('swiper-lazy') && !slide.hasClass('swiper-lazy-loaded') && !slide.hasClass('swiper-lazy-loading')) {
	                    img = img.add(slide[0]);
	                }
	                if (img.length === 0) return;
	        
	                img.each(function () {
	                    var _img = $(this);
	                    _img.addClass('swiper-lazy-loading');
	                    var background = _img.attr('data-background');
	                    var src = _img.attr('data-src'),
	                        srcset = _img.attr('data-srcset');
	                    s.loadImage(_img[0], (src || background), srcset, false, function () {
	                        if (background) {
	                            _img.css('background-image', 'url("' + background + '")');
	                            _img.removeAttr('data-background');
	                        }
	                        else {
	                            if (srcset) {
	                                _img.attr('srcset', srcset);
	                                _img.removeAttr('data-srcset');
	                            }
	                            if (src) {
	                                _img.attr('src', src);
	                                _img.removeAttr('data-src');
	                            }
	        
	                        }
	        
	                        _img.addClass('swiper-lazy-loaded').removeClass('swiper-lazy-loading');
	                        slide.find('.swiper-lazy-preloader, .preloader').remove();
	                        if (s.params.loop && loadInDuplicate) {
	                            var slideOriginalIndex = slide.attr('data-swiper-slide-index');
	                            if (slide.hasClass(s.params.slideDuplicateClass)) {
	                                var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ')');
	                                s.lazy.loadImageInSlide(originalSlide.index(), false);
	                            }
	                            else {
	                                var duplicatedSlide = s.wrapper.children('.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
	                                s.lazy.loadImageInSlide(duplicatedSlide.index(), false);
	                            }
	                        }
	                        s.emit('onLazyImageReady', s, slide[0], _img[0]);
	                    });
	        
	                    s.emit('onLazyImageLoad', s, slide[0], _img[0]);
	                });
	        
	            },
	            load: function () {
	                var i;
	                if (s.params.watchSlidesVisibility) {
	                    s.wrapper.children('.' + s.params.slideVisibleClass).each(function () {
	                        s.lazy.loadImageInSlide($(this).index());
	                    });
	                }
	                else {
	                    if (s.params.slidesPerView > 1) {
	                        for (i = s.activeIndex; i < s.activeIndex + s.params.slidesPerView ; i++) {
	                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
	                        }
	                    }
	                    else {
	                        s.lazy.loadImageInSlide(s.activeIndex);
	                    }
	                }
	                if (s.params.lazyLoadingInPrevNext) {
	                    if (s.params.slidesPerView > 1 || (s.params.lazyLoadingInPrevNextAmount && s.params.lazyLoadingInPrevNextAmount > 1)) {
	                        var amount = s.params.lazyLoadingInPrevNextAmount;
	                        var spv = s.params.slidesPerView;
	                        var maxIndex = Math.min(s.activeIndex + spv + Math.max(amount, spv), s.slides.length);
	                        var minIndex = Math.max(s.activeIndex - Math.max(spv, amount), 0);
	                        // Next Slides
	                        for (i = s.activeIndex + s.params.slidesPerView; i < maxIndex; i++) {
	                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
	                        }
	                        // Prev Slides
	                        for (i = minIndex; i < s.activeIndex ; i++) {
	                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
	                        }
	                    }
	                    else {
	                        var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
	                        if (nextSlide.length > 0) s.lazy.loadImageInSlide(nextSlide.index());
	        
	                        var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
	                        if (prevSlide.length > 0) s.lazy.loadImageInSlide(prevSlide.index());
	                    }
	                }
	            },
	            onTransitionStart: function () {
	                if (s.params.lazyLoading) {
	                    if (s.params.lazyLoadingOnTransitionStart || (!s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded)) {
	                        s.lazy.load();
	                    }
	                }
	            },
	            onTransitionEnd: function () {
	                if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
	                    s.lazy.load();
	                }
	            }
	        };
	        
	
	        /*=========================
	          Scrollbar
	          ===========================*/
	        s.scrollbar = {
	            isTouched: false,
	            setDragPosition: function (e) {
	                var sb = s.scrollbar;
	                var x = 0, y = 0;
	                var translate;
	                var pointerPosition = s.isHorizontal() ?
	                    ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX) :
	                    ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY) ;
	                var position = (pointerPosition) - sb.track.offset()[s.isHorizontal() ? 'left' : 'top'] - sb.dragSize / 2;
	                var positionMin = -s.minTranslate() * sb.moveDivider;
	                var positionMax = -s.maxTranslate() * sb.moveDivider;
	                if (position < positionMin) {
	                    position = positionMin;
	                }
	                else if (position > positionMax) {
	                    position = positionMax;
	                }
	                position = -position / sb.moveDivider;
	                s.updateProgress(position);
	                s.setWrapperTranslate(position, true);
	            },
	            dragStart: function (e) {
	                var sb = s.scrollbar;
	                sb.isTouched = true;
	                e.preventDefault();
	                e.stopPropagation();
	        
	                sb.setDragPosition(e);
	                clearTimeout(sb.dragTimeout);
	        
	                sb.track.transition(0);
	                if (s.params.scrollbarHide) {
	                    sb.track.css('opacity', 1);
	                }
	                s.wrapper.transition(100);
	                sb.drag.transition(100);
	                s.emit('onScrollbarDragStart', s);
	            },
	            dragMove: function (e) {
	                var sb = s.scrollbar;
	                if (!sb.isTouched) return;
	                if (e.preventDefault) e.preventDefault();
	                else e.returnValue = false;
	                sb.setDragPosition(e);
	                s.wrapper.transition(0);
	                sb.track.transition(0);
	                sb.drag.transition(0);
	                s.emit('onScrollbarDragMove', s);
	            },
	            dragEnd: function (e) {
	                var sb = s.scrollbar;
	                if (!sb.isTouched) return;
	                sb.isTouched = false;
	                if (s.params.scrollbarHide) {
	                    clearTimeout(sb.dragTimeout);
	                    sb.dragTimeout = setTimeout(function () {
	                        sb.track.css('opacity', 0);
	                        sb.track.transition(400);
	                    }, 1000);
	        
	                }
	                s.emit('onScrollbarDragEnd', s);
	                if (s.params.scrollbarSnapOnRelease) {
	                    s.slideReset();
	                }
	            },
	            enableDraggable: function () {
	                var sb = s.scrollbar;
	                var target = s.support.touch ? sb.track : document;
	                $(sb.track).on(s.touchEvents.start, sb.dragStart);
	                $(target).on(s.touchEvents.move, sb.dragMove);
	                $(target).on(s.touchEvents.end, sb.dragEnd);
	            },
	            disableDraggable: function () {
	                var sb = s.scrollbar;
	                var target = s.support.touch ? sb.track : document;
	                $(sb.track).off(s.touchEvents.start, sb.dragStart);
	                $(target).off(s.touchEvents.move, sb.dragMove);
	                $(target).off(s.touchEvents.end, sb.dragEnd);
	            },
	            set: function () {
	                if (!s.params.scrollbar) return;
	                var sb = s.scrollbar;
	                sb.track = $(s.params.scrollbar);
	                if (s.params.uniqueNavElements && typeof s.params.scrollbar === 'string' && sb.track.length > 1 && s.container.find(s.params.scrollbar).length === 1) {
	                    sb.track = s.container.find(s.params.scrollbar);
	                }
	                sb.drag = sb.track.find('.swiper-scrollbar-drag');
	                if (sb.drag.length === 0) {
	                    sb.drag = $('<div class="swiper-scrollbar-drag"></div>');
	                    sb.track.append(sb.drag);
	                }
	                sb.drag[0].style.width = '';
	                sb.drag[0].style.height = '';
	                sb.trackSize = s.isHorizontal() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight;
	        
	                sb.divider = s.size / s.virtualSize;
	                sb.moveDivider = sb.divider * (sb.trackSize / s.size);
	                sb.dragSize = sb.trackSize * sb.divider;
	        
	                if (s.isHorizontal()) {
	                    sb.drag[0].style.width = sb.dragSize + 'px';
	                }
	                else {
	                    sb.drag[0].style.height = sb.dragSize + 'px';
	                }
	        
	                if (sb.divider >= 1) {
	                    sb.track[0].style.display = 'none';
	                }
	                else {
	                    sb.track[0].style.display = '';
	                }
	                if (s.params.scrollbarHide) {
	                    sb.track[0].style.opacity = 0;
	                }
	            },
	            setTranslate: function () {
	                if (!s.params.scrollbar) return;
	                var diff;
	                var sb = s.scrollbar;
	                var translate = s.translate || 0;
	                var newPos;
	        
	                var newSize = sb.dragSize;
	                newPos = (sb.trackSize - sb.dragSize) * s.progress;
	                if (s.rtl && s.isHorizontal()) {
	                    newPos = -newPos;
	                    if (newPos > 0) {
	                        newSize = sb.dragSize - newPos;
	                        newPos = 0;
	                    }
	                    else if (-newPos + sb.dragSize > sb.trackSize) {
	                        newSize = sb.trackSize + newPos;
	                    }
	                }
	                else {
	                    if (newPos < 0) {
	                        newSize = sb.dragSize + newPos;
	                        newPos = 0;
	                    }
	                    else if (newPos + sb.dragSize > sb.trackSize) {
	                        newSize = sb.trackSize - newPos;
	                    }
	                }
	                if (s.isHorizontal()) {
	                    if (s.support.transforms3d) {
	                        sb.drag.transform('translate3d(' + (newPos) + 'px, 0, 0)');
	                    }
	                    else {
	                        sb.drag.transform('translateX(' + (newPos) + 'px)');
	                    }
	                    sb.drag[0].style.width = newSize + 'px';
	                }
	                else {
	                    if (s.support.transforms3d) {
	                        sb.drag.transform('translate3d(0px, ' + (newPos) + 'px, 0)');
	                    }
	                    else {
	                        sb.drag.transform('translateY(' + (newPos) + 'px)');
	                    }
	                    sb.drag[0].style.height = newSize + 'px';
	                }
	                if (s.params.scrollbarHide) {
	                    clearTimeout(sb.timeout);
	                    sb.track[0].style.opacity = 1;
	                    sb.timeout = setTimeout(function () {
	                        sb.track[0].style.opacity = 0;
	                        sb.track.transition(400);
	                    }, 1000);
	                }
	            },
	            setTransition: function (duration) {
	                if (!s.params.scrollbar) return;
	                s.scrollbar.drag.transition(duration);
	            }
	        };
	
	        /*=========================
	          Controller
	          ===========================*/
	        s.controller = {
	            LinearSpline: function (x, y) {
	                this.x = x;
	                this.y = y;
	                this.lastIndex = x.length - 1;
	                // Given an x value (x2), return the expected y2 value:
	                // (x1,y1) is the known point before given value,
	                // (x3,y3) is the known point after given value.
	                var i1, i3;
	                var l = this.x.length;
	        
	                this.interpolate = function (x2) {
	                    if (!x2) return 0;
	        
	                    // Get the indexes of x1 and x3 (the array indexes before and after given x2):
	                    i3 = binarySearch(this.x, x2);
	                    i1 = i3 - 1;
	        
	                    // We have our indexes i1 & i3, so we can calculate already:
	                    // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
	                    return ((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1]) + this.y[i1];
	                };
	        
	                var binarySearch = (function() {
	                    var maxIndex, minIndex, guess;
	                    return function(array, val) {
	                        minIndex = -1;
	                        maxIndex = array.length;
	                        while (maxIndex - minIndex > 1)
	                            if (array[guess = maxIndex + minIndex >> 1] <= val) {
	                                minIndex = guess;
	                            } else {
	                                maxIndex = guess;
	                            }
	                        return maxIndex;
	                    };
	                })();
	            },
	            //xxx: for now i will just save one spline function to to
	            getInterpolateFunction: function(c){
	                if(!s.controller.spline) s.controller.spline = s.params.loop ?
	                    new s.controller.LinearSpline(s.slidesGrid, c.slidesGrid) :
	                    new s.controller.LinearSpline(s.snapGrid, c.snapGrid);
	            },
	            setTranslate: function (translate, byController) {
	               var controlled = s.params.control;
	               var multiplier, controlledTranslate;
	               function setControlledTranslate(c) {
	                    // this will create an Interpolate function based on the snapGrids
	                    // x is the Grid of the scrolled scroller and y will be the controlled scroller
	                    // it makes sense to create this only once and recall it for the interpolation
	                    // the function does a lot of value caching for performance
	                    translate = c.rtl && c.params.direction === 'horizontal' ? -s.translate : s.translate;
	                    if (s.params.controlBy === 'slide') {
	                        s.controller.getInterpolateFunction(c);
	                        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
	                        // but it did not work out
	                        controlledTranslate = -s.controller.spline.interpolate(-translate);
	                    }
	        
	                    if(!controlledTranslate || s.params.controlBy === 'container'){
	                        multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate());
	                        controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate();
	                    }
	        
	                    if (s.params.controlInverse) {
	                        controlledTranslate = c.maxTranslate() - controlledTranslate;
	                    }
	                    c.updateProgress(controlledTranslate);
	                    c.setWrapperTranslate(controlledTranslate, false, s);
	                    c.updateActiveIndex();
	               }
	               if (s.isArray(controlled)) {
	                   for (var i = 0; i < controlled.length; i++) {
	                       if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
	                           setControlledTranslate(controlled[i]);
	                       }
	                   }
	               }
	               else if (controlled instanceof Swiper && byController !== controlled) {
	        
	                   setControlledTranslate(controlled);
	               }
	            },
	            setTransition: function (duration, byController) {
	                var controlled = s.params.control;
	                var i;
	                function setControlledTransition(c) {
	                    c.setWrapperTransition(duration, s);
	                    if (duration !== 0) {
	                        c.onTransitionStart();
	                        c.wrapper.transitionEnd(function(){
	                            if (!controlled) return;
	                            if (c.params.loop && s.params.controlBy === 'slide') {
	                                c.fixLoop();
	                            }
	                            c.onTransitionEnd();
	        
	                        });
	                    }
	                }
	                if (s.isArray(controlled)) {
	                    for (i = 0; i < controlled.length; i++) {
	                        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
	                            setControlledTransition(controlled[i]);
	                        }
	                    }
	                }
	                else if (controlled instanceof Swiper && byController !== controlled) {
	                    setControlledTransition(controlled);
	                }
	            }
	        };
	
	        /*=========================
	          Hash Navigation
	          ===========================*/
	        s.hashnav = {
	            init: function () {
	                if (!s.params.hashnav) return;
	                s.hashnav.initialized = true;
	                var hash = document.location.hash.replace('#', '');
	                if (!hash) return;
	                var speed = 0;
	                for (var i = 0, length = s.slides.length; i < length; i++) {
	                    var slide = s.slides.eq(i);
	                    var slideHash = slide.attr('data-hash');
	                    if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
	                        var index = slide.index();
	                        s.slideTo(index, speed, s.params.runCallbacksOnInit, true);
	                    }
	                }
	            },
	            setHash: function () {
	                if (!s.hashnav.initialized || !s.params.hashnav) return;
	                document.location.hash = s.slides.eq(s.activeIndex).attr('data-hash') || '';
	            }
	        };
	
	        /*=========================
	          Keyboard Control
	          ===========================*/
	        function handleKeyboard(e) {
	            if (e.originalEvent) e = e.originalEvent; //jquery fix
	            var kc = e.keyCode || e.charCode;
	            // Directions locks
	            if (!s.params.allowSwipeToNext && (s.isHorizontal() && kc === 39 || !s.isHorizontal() && kc === 40)) {
	                return false;
	            }
	            if (!s.params.allowSwipeToPrev && (s.isHorizontal() && kc === 37 || !s.isHorizontal() && kc === 38)) {
	                return false;
	            }
	            if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
	                return;
	            }
	            if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
	                return;
	            }
	            if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
	                var inView = false;
	                //Check that swiper should be inside of visible area of window
	                if (s.container.parents('.swiper-slide').length > 0 && s.container.parents('.swiper-slide-active').length === 0) {
	                    return;
	                }
	                var windowScroll = {
	                    left: window.pageXOffset,
	                    top: window.pageYOffset
	                };
	                var windowWidth = window.innerWidth;
	                var windowHeight = window.innerHeight;
	                var swiperOffset = s.container.offset();
	                if (s.rtl) swiperOffset.left = swiperOffset.left - s.container[0].scrollLeft;
	                var swiperCoord = [
	                    [swiperOffset.left, swiperOffset.top],
	                    [swiperOffset.left + s.width, swiperOffset.top],
	                    [swiperOffset.left, swiperOffset.top + s.height],
	                    [swiperOffset.left + s.width, swiperOffset.top + s.height]
	                ];
	                for (var i = 0; i < swiperCoord.length; i++) {
	                    var point = swiperCoord[i];
	                    if (
	                        point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth &&
	                        point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight
	                    ) {
	                        inView = true;
	                    }
	        
	                }
	                if (!inView) return;
	            }
	            if (s.isHorizontal()) {
	                if (kc === 37 || kc === 39) {
	                    if (e.preventDefault) e.preventDefault();
	                    else e.returnValue = false;
	                }
	                if ((kc === 39 && !s.rtl) || (kc === 37 && s.rtl)) s.slideNext();
	                if ((kc === 37 && !s.rtl) || (kc === 39 && s.rtl)) s.slidePrev();
	            }
	            else {
	                if (kc === 38 || kc === 40) {
	                    if (e.preventDefault) e.preventDefault();
	                    else e.returnValue = false;
	                }
	                if (kc === 40) s.slideNext();
	                if (kc === 38) s.slidePrev();
	            }
	        }
	        s.disableKeyboardControl = function () {
	            s.params.keyboardControl = false;
	            $(document).off('keydown', handleKeyboard);
	        };
	        s.enableKeyboardControl = function () {
	            s.params.keyboardControl = true;
	            $(document).on('keydown', handleKeyboard);
	        };
	        
	
	        /*=========================
	          Mousewheel Control
	          ===========================*/
	        s.mousewheel = {
	            event: false,
	            lastScrollTime: (new window.Date()).getTime()
	        };
	        if (s.params.mousewheelControl) {
	            try {
	                new window.WheelEvent('wheel');
	                s.mousewheel.event = 'wheel';
	            } catch (e) {
	                if (window.WheelEvent || (s.container[0] && 'wheel' in s.container[0])) {
	                    s.mousewheel.event = 'wheel';
	                }
	            }
	            if (!s.mousewheel.event && window.WheelEvent) {
	        
	            }
	            if (!s.mousewheel.event && document.onmousewheel !== undefined) {
	                s.mousewheel.event = 'mousewheel';
	            }
	            if (!s.mousewheel.event) {
	                s.mousewheel.event = 'DOMMouseScroll';
	            }
	        }
	        function handleMousewheel(e) {
	            if (e.originalEvent) e = e.originalEvent; //jquery fix
	            var we = s.mousewheel.event;
	            var delta = 0;
	            var rtlFactor = s.rtl ? -1 : 1;
	        
	            //WebKits
	            if (we === 'mousewheel') {
	                if (s.params.mousewheelForceToAxis) {
	                    if (s.isHorizontal()) {
	                        if (Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)) delta = e.wheelDeltaX * rtlFactor;
	                        else return;
	                    }
	                    else {
	                        if (Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX)) delta = e.wheelDeltaY;
	                        else return;
	                    }
	                }
	                else {
	                    delta = Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY) ? - e.wheelDeltaX * rtlFactor : - e.wheelDeltaY;
	                }
	            }
	            //Old FireFox
	            else if (we === 'DOMMouseScroll') delta = -e.detail;
	            //New FireFox
	            else if (we === 'wheel') {
	                if (s.params.mousewheelForceToAxis) {
	                    if (s.isHorizontal()) {
	                        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) delta = -e.deltaX * rtlFactor;
	                        else return;
	                    }
	                    else {
	                        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) delta = -e.deltaY;
	                        else return;
	                    }
	                }
	                else {
	                    delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? - e.deltaX * rtlFactor : - e.deltaY;
	                }
	            }
	            if (delta === 0) return;
	        
	            if (s.params.mousewheelInvert) delta = -delta;
	        
	            if (!s.params.freeMode) {
	                if ((new window.Date()).getTime() - s.mousewheel.lastScrollTime > 60) {
	                    if (delta < 0) {
	                        if ((!s.isEnd || s.params.loop) && !s.animating) s.slideNext();
	                        else if (s.params.mousewheelReleaseOnEdges) return true;
	                    }
	                    else {
	                        if ((!s.isBeginning || s.params.loop) && !s.animating) s.slidePrev();
	                        else if (s.params.mousewheelReleaseOnEdges) return true;
	                    }
	                }
	                s.mousewheel.lastScrollTime = (new window.Date()).getTime();
	        
	            }
	            else {
	                //Freemode or scrollContainer:
	                var position = s.getWrapperTranslate() + delta * s.params.mousewheelSensitivity;
	                var wasBeginning = s.isBeginning,
	                    wasEnd = s.isEnd;
	        
	                if (position >= s.minTranslate()) position = s.minTranslate();
	                if (position <= s.maxTranslate()) position = s.maxTranslate();
	        
	                s.setWrapperTransition(0);
	                s.setWrapperTranslate(position);
	                s.updateProgress();
	                s.updateActiveIndex();
	        
	                if (!wasBeginning && s.isBeginning || !wasEnd && s.isEnd) {
	                    s.updateClasses();
	                }
	        
	                if (s.params.freeModeSticky) {
	                    clearTimeout(s.mousewheel.timeout);
	                    s.mousewheel.timeout = setTimeout(function () {
	                        s.slideReset();
	                    }, 300);
	                }
	                else {
	                    if (s.params.lazyLoading && s.lazy) {
	                        s.lazy.load();
	                    }
	                }
	        
	                // Return page scroll on edge positions
	                if (position === 0 || position === s.maxTranslate()) return;
	            }
	            if (s.params.autoplay) s.stopAutoplay();
	        
	            if (e.preventDefault) e.preventDefault();
	            else e.returnValue = false;
	            return false;
	        }
	        s.disableMousewheelControl = function () {
	            if (!s.mousewheel.event) return false;
	            s.container.off(s.mousewheel.event, handleMousewheel);
	            return true;
	        };
	        
	        s.enableMousewheelControl = function () {
	            if (!s.mousewheel.event) return false;
	            s.container.on(s.mousewheel.event, handleMousewheel);
	            return true;
	        };
	        
	
	        /*=========================
	          Parallax
	          ===========================*/
	        function setParallaxTransform(el, progress) {
	            el = $(el);
	            var p, pX, pY;
	            var rtlFactor = s.rtl ? -1 : 1;
	        
	            p = el.attr('data-swiper-parallax') || '0';
	            pX = el.attr('data-swiper-parallax-x');
	            pY = el.attr('data-swiper-parallax-y');
	            if (pX || pY) {
	                pX = pX || '0';
	                pY = pY || '0';
	            }
	            else {
	                if (s.isHorizontal()) {
	                    pX = p;
	                    pY = '0';
	                }
	                else {
	                    pY = p;
	                    pX = '0';
	                }
	            }
	        
	            if ((pX).indexOf('%') >= 0) {
	                pX = parseInt(pX, 10) * progress * rtlFactor + '%';
	            }
	            else {
	                pX = pX * progress * rtlFactor + 'px' ;
	            }
	            if ((pY).indexOf('%') >= 0) {
	                pY = parseInt(pY, 10) * progress + '%';
	            }
	            else {
	                pY = pY * progress + 'px' ;
	            }
	        
	            el.transform('translate3d(' + pX + ', ' + pY + ',0px)');
	        }
	        s.parallax = {
	            setTranslate: function () {
	                s.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
	                    setParallaxTransform(this, s.progress);
	        
	                });
	                s.slides.each(function () {
	                    var slide = $(this);
	                    slide.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
	                        var progress = Math.min(Math.max(slide[0].progress, -1), 1);
	                        setParallaxTransform(this, progress);
	                    });
	                });
	            },
	            setTransition: function (duration) {
	                if (typeof duration === 'undefined') duration = s.params.speed;
	                s.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
	                    var el = $(this);
	                    var parallaxDuration = parseInt(el.attr('data-swiper-parallax-duration'), 10) || duration;
	                    if (duration === 0) parallaxDuration = 0;
	                    el.transition(parallaxDuration);
	                });
	            }
	        };
	        
	
	        /*=========================
	          Plugins API. Collect all and init all plugins
	          ===========================*/
	        s._plugins = [];
	        for (var plugin in s.plugins) {
	            var p = s.plugins[plugin](s, s.params[plugin]);
	            if (p) s._plugins.push(p);
	        }
	        // Method to call all plugins event/method
	        s.callPlugins = function (eventName) {
	            for (var i = 0; i < s._plugins.length; i++) {
	                if (eventName in s._plugins[i]) {
	                    s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	                }
	            }
	        };
	
	        /*=========================
	          Events/Callbacks/Plugins Emitter
	          ===========================*/
	        function normalizeEventName (eventName) {
	            if (eventName.indexOf('on') !== 0) {
	                if (eventName[0] !== eventName[0].toUpperCase()) {
	                    eventName = 'on' + eventName[0].toUpperCase() + eventName.substring(1);
	                }
	                else {
	                    eventName = 'on' + eventName;
	                }
	            }
	            return eventName;
	        }
	        s.emitterEventListeners = {
	        
	        };
	        s.emit = function (eventName) {
	            // Trigger callbacks
	            if (s.params[eventName]) {
	                s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	            }
	            var i;
	            // Trigger events
	            if (s.emitterEventListeners[eventName]) {
	                for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
	                    s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	                }
	            }
	            // Trigger plugins
	            if (s.callPlugins) s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	        };
	        s.on = function (eventName, handler) {
	            eventName = normalizeEventName(eventName);
	            if (!s.emitterEventListeners[eventName]) s.emitterEventListeners[eventName] = [];
	            s.emitterEventListeners[eventName].push(handler);
	            return s;
	        };
	        s.off = function (eventName, handler) {
	            var i;
	            eventName = normalizeEventName(eventName);
	            if (typeof handler === 'undefined') {
	                // Remove all handlers for such event
	                s.emitterEventListeners[eventName] = [];
	                return s;
	            }
	            if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0) return;
	            for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
	                if(s.emitterEventListeners[eventName][i] === handler) s.emitterEventListeners[eventName].splice(i, 1);
	            }
	            return s;
	        };
	        s.once = function (eventName, handler) {
	            eventName = normalizeEventName(eventName);
	            var _handler = function () {
	                handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
	                s.off(eventName, _handler);
	            };
	            s.on(eventName, _handler);
	            return s;
	        };
	
	        // Accessibility tools
	        s.a11y = {
	            makeFocusable: function ($el) {
	                $el.attr('tabIndex', '0');
	                return $el;
	            },
	            addRole: function ($el, role) {
	                $el.attr('role', role);
	                return $el;
	            },
	        
	            addLabel: function ($el, label) {
	                $el.attr('aria-label', label);
	                return $el;
	            },
	        
	            disable: function ($el) {
	                $el.attr('aria-disabled', true);
	                return $el;
	            },
	        
	            enable: function ($el) {
	                $el.attr('aria-disabled', false);
	                return $el;
	            },
	        
	            onEnterKey: function (event) {
	                if (event.keyCode !== 13) return;
	                if ($(event.target).is(s.params.nextButton)) {
	                    s.onClickNext(event);
	                    if (s.isEnd) {
	                        s.a11y.notify(s.params.lastSlideMessage);
	                    }
	                    else {
	                        s.a11y.notify(s.params.nextSlideMessage);
	                    }
	                }
	                else if ($(event.target).is(s.params.prevButton)) {
	                    s.onClickPrev(event);
	                    if (s.isBeginning) {
	                        s.a11y.notify(s.params.firstSlideMessage);
	                    }
	                    else {
	                        s.a11y.notify(s.params.prevSlideMessage);
	                    }
	                }
	                if ($(event.target).is('.' + s.params.bulletClass)) {
	                    $(event.target)[0].click();
	                }
	            },
	        
	            liveRegion: $('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
	        
	            notify: function (message) {
	                var notification = s.a11y.liveRegion;
	                if (notification.length === 0) return;
	                notification.html('');
	                notification.html(message);
	            },
	            init: function () {
	                // Setup accessibility
	                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
	                    s.a11y.makeFocusable(s.nextButton);
	                    s.a11y.addRole(s.nextButton, 'button');
	                    s.a11y.addLabel(s.nextButton, s.params.nextSlideMessage);
	                }
	                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
	                    s.a11y.makeFocusable(s.prevButton);
	                    s.a11y.addRole(s.prevButton, 'button');
	                    s.a11y.addLabel(s.prevButton, s.params.prevSlideMessage);
	                }
	        
	                $(s.container).append(s.a11y.liveRegion);
	            },
	            initPagination: function () {
	                if (s.params.pagination && s.params.paginationClickable && s.bullets && s.bullets.length) {
	                    s.bullets.each(function () {
	                        var bullet = $(this);
	                        s.a11y.makeFocusable(bullet);
	                        s.a11y.addRole(bullet, 'button');
	                        s.a11y.addLabel(bullet, s.params.paginationBulletMessage.replace(/{{index}}/, bullet.index() + 1));
	                    });
	                }
	            },
	            destroy: function () {
	                if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0) s.a11y.liveRegion.remove();
	            }
	        };
	        
	
	        /*=========================
	          Init/Destroy
	          ===========================*/
	        s.init = function () {
	            if (s.params.loop) s.createLoop();
	            s.updateContainerSize();
	            s.updateSlidesSize();
	            s.updatePagination();
	            if (s.params.scrollbar && s.scrollbar) {
	                s.scrollbar.set();
	                if (s.params.scrollbarDraggable) {
	                    s.scrollbar.enableDraggable();
	                }
	            }
	            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
	                if (!s.params.loop) s.updateProgress();
	                s.effects[s.params.effect].setTranslate();
	            }
	            if (s.params.loop) {
	                s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit);
	            }
	            else {
	                s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
	                if (s.params.initialSlide === 0) {
	                    if (s.parallax && s.params.parallax) s.parallax.setTranslate();
	                    if (s.lazy && s.params.lazyLoading) {
	                        s.lazy.load();
	                        s.lazy.initialImageLoaded = true;
	                    }
	                }
	            }
	            s.attachEvents();
	            if (s.params.observer && s.support.observer) {
	                s.initObservers();
	            }
	            if (s.params.preloadImages && !s.params.lazyLoading) {
	                s.preloadImages();
	            }
	            if (s.params.autoplay) {
	                s.startAutoplay();
	            }
	            if (s.params.keyboardControl) {
	                if (s.enableKeyboardControl) s.enableKeyboardControl();
	            }
	            if (s.params.mousewheelControl) {
	                if (s.enableMousewheelControl) s.enableMousewheelControl();
	            }
	            if (s.params.hashnav) {
	                if (s.hashnav) s.hashnav.init();
	            }
	            if (s.params.a11y && s.a11y) s.a11y.init();
	            s.emit('onInit', s);
	        };
	        
	        // Cleanup dynamic styles
	        s.cleanupStyles = function () {
	            // Container
	            s.container.removeClass(s.classNames.join(' ')).removeAttr('style');
	        
	            // Wrapper
	            s.wrapper.removeAttr('style');
	        
	            // Slides
	            if (s.slides && s.slides.length) {
	                s.slides
	                    .removeClass([
	                      s.params.slideVisibleClass,
	                      s.params.slideActiveClass,
	                      s.params.slideNextClass,
	                      s.params.slidePrevClass
	                    ].join(' '))
	                    .removeAttr('style')
	                    .removeAttr('data-swiper-column')
	                    .removeAttr('data-swiper-row');
	            }
	        
	            // Pagination/Bullets
	            if (s.paginationContainer && s.paginationContainer.length) {
	                s.paginationContainer.removeClass(s.params.paginationHiddenClass);
	            }
	            if (s.bullets && s.bullets.length) {
	                s.bullets.removeClass(s.params.bulletActiveClass);
	            }
	        
	            // Buttons
	            if (s.params.prevButton) $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
	            if (s.params.nextButton) $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
	        
	            // Scrollbar
	            if (s.params.scrollbar && s.scrollbar) {
	                if (s.scrollbar.track && s.scrollbar.track.length) s.scrollbar.track.removeAttr('style');
	                if (s.scrollbar.drag && s.scrollbar.drag.length) s.scrollbar.drag.removeAttr('style');
	            }
	        };
	        
	        // Destroy
	        s.destroy = function (deleteInstance, cleanupStyles) {
	            // Detach evebts
	            s.detachEvents();
	            // Stop autoplay
	            s.stopAutoplay();
	            // Disable draggable
	            if (s.params.scrollbar && s.scrollbar) {
	                if (s.params.scrollbarDraggable) {
	                    s.scrollbar.disableDraggable();
	                }
	            }
	            // Destroy loop
	            if (s.params.loop) {
	                s.destroyLoop();
	            }
	            // Cleanup styles
	            if (cleanupStyles) {
	                s.cleanupStyles();
	            }
	            // Disconnect observer
	            s.disconnectObservers();
	            // Disable keyboard/mousewheel
	            if (s.params.keyboardControl) {
	                if (s.disableKeyboardControl) s.disableKeyboardControl();
	            }
	            if (s.params.mousewheelControl) {
	                if (s.disableMousewheelControl) s.disableMousewheelControl();
	            }
	            // Disable a11y
	            if (s.params.a11y && s.a11y) s.a11y.destroy();
	            // Destroy callback
	            s.emit('onDestroy');
	            // Delete instance
	            if (deleteInstance !== false) s = null;
	        };
	        
	        s.init();
	        
	
	    
	        // Return swiper instance
	        return s;
	    };
	    
	
	    /*==================================================
	        Prototype
	    ====================================================*/
	    Swiper.prototype = {
	        isSafari: (function () {
	            var ua = navigator.userAgent.toLowerCase();
	            return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
	        })(),
	        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
	        isArray: function (arr) {
	            return Object.prototype.toString.apply(arr) === '[object Array]';
	        },
	        /*==================================================
	        Browser
	        ====================================================*/
	        browser: {
	            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
	            ieTouch: (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1) || (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1)
	        },
	        /*==================================================
	        Devices
	        ====================================================*/
	        device: (function () {
	            var ua = navigator.userAgent;
	            var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
	            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
	            var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
	            var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
	            return {
	                ios: ipad || iphone || ipod,
	                android: android
	            };
	        })(),
	        /*==================================================
	        Feature Detection
	        ====================================================*/
	        support: {
	            touch : (window.Modernizr && Modernizr.touch === true) || (function () {
	                return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
	            })(),
	    
	            transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
	                var div = document.createElement('div').style;
	                return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
	            })(),
	    
	            flexbox: (function () {
	                var div = document.createElement('div').style;
	                var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
	                for (var i = 0; i < styles.length; i++) {
	                    if (styles[i] in div) return true;
	                }
	            })(),
	    
	            observer: (function () {
	                return ('MutationObserver' in window || 'WebkitMutationObserver' in window);
	            })()
	        },
	        /*==================================================
	        Plugins
	        ====================================================*/
	        plugins: {}
	    };
	    
	
	    /*===========================
	    Dom7 Library
	    ===========================*/
	    var Dom7 = (function () {
	        var Dom7 = function (arr) {
	            var _this = this, i = 0;
	            // Create array-like object
	            for (i = 0; i < arr.length; i++) {
	                _this[i] = arr[i];
	            }
	            _this.length = arr.length;
	            // Return collection with methods
	            return this;
	        };
	        var $ = function (selector, context) {
	            var arr = [], i = 0;
	            if (selector && !context) {
	                if (selector instanceof Dom7) {
	                    return selector;
	                }
	            }
	            if (selector) {
	                // String
	                if (typeof selector === 'string') {
	                    var els, tempParent, html = selector.trim();
	                    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
	                        var toCreate = 'div';
	                        if (html.indexOf('<li') === 0) toCreate = 'ul';
	                        if (html.indexOf('<tr') === 0) toCreate = 'tbody';
	                        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
	                        if (html.indexOf('<tbody') === 0) toCreate = 'table';
	                        if (html.indexOf('<option') === 0) toCreate = 'select';
	                        tempParent = document.createElement(toCreate);
	                        tempParent.innerHTML = selector;
	                        for (i = 0; i < tempParent.childNodes.length; i++) {
	                            arr.push(tempParent.childNodes[i]);
	                        }
	                    }
	                    else {
	                        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
	                            // Pure ID selector
	                            els = [document.getElementById(selector.split('#')[1])];
	                        }
	                        else {
	                            // Other selectors
	                            els = (context || document).querySelectorAll(selector);
	                        }
	                        for (i = 0; i < els.length; i++) {
	                            if (els[i]) arr.push(els[i]);
	                        }
	                    }
	                }
	                // Node/element
	                else if (selector.nodeType || selector === window || selector === document) {
	                    arr.push(selector);
	                }
	                //Array of elements or instance of Dom
	                else if (selector.length > 0 && selector[0].nodeType) {
	                    for (i = 0; i < selector.length; i++) {
	                        arr.push(selector[i]);
	                    }
	                }
	            }
	            return new Dom7(arr);
	        };
	        Dom7.prototype = {
	            // Classes and attriutes
	            addClass: function (className) {
	                if (typeof className === 'undefined') {
	                    return this;
	                }
	                var classes = className.split(' ');
	                for (var i = 0; i < classes.length; i++) {
	                    for (var j = 0; j < this.length; j++) {
	                        this[j].classList.add(classes[i]);
	                    }
	                }
	                return this;
	            },
	            removeClass: function (className) {
	                var classes = className.split(' ');
	                for (var i = 0; i < classes.length; i++) {
	                    for (var j = 0; j < this.length; j++) {
	                        this[j].classList.remove(classes[i]);
	                    }
	                }
	                return this;
	            },
	            hasClass: function (className) {
	                if (!this[0]) return false;
	                else return this[0].classList.contains(className);
	            },
	            toggleClass: function (className) {
	                var classes = className.split(' ');
	                for (var i = 0; i < classes.length; i++) {
	                    for (var j = 0; j < this.length; j++) {
	                        this[j].classList.toggle(classes[i]);
	                    }
	                }
	                return this;
	            },
	            attr: function (attrs, value) {
	                if (arguments.length === 1 && typeof attrs === 'string') {
	                    // Get attr
	                    if (this[0]) return this[0].getAttribute(attrs);
	                    else return undefined;
	                }
	                else {
	                    // Set attrs
	                    for (var i = 0; i < this.length; i++) {
	                        if (arguments.length === 2) {
	                            // String
	                            this[i].setAttribute(attrs, value);
	                        }
	                        else {
	                            // Object
	                            for (var attrName in attrs) {
	                                this[i][attrName] = attrs[attrName];
	                                this[i].setAttribute(attrName, attrs[attrName]);
	                            }
	                        }
	                    }
	                    return this;
	                }
	            },
	            removeAttr: function (attr) {
	                for (var i = 0; i < this.length; i++) {
	                    this[i].removeAttribute(attr);
	                }
	                return this;
	            },
	            data: function (key, value) {
	                if (typeof value === 'undefined') {
	                    // Get value
	                    if (this[0]) {
	                        var dataKey = this[0].getAttribute('data-' + key);
	                        if (dataKey) return dataKey;
	                        else if (this[0].dom7ElementDataStorage && (key in this[0].dom7ElementDataStorage)) return this[0].dom7ElementDataStorage[key];
	                        else return undefined;
	                    }
	                    else return undefined;
	                }
	                else {
	                    // Set value
	                    for (var i = 0; i < this.length; i++) {
	                        var el = this[i];
	                        if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
	                        el.dom7ElementDataStorage[key] = value;
	                    }
	                    return this;
	                }
	            },
	            // Transforms
	            transform : function (transform) {
	                for (var i = 0; i < this.length; i++) {
	                    var elStyle = this[i].style;
	                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
	                }
	                return this;
	            },
	            transition: function (duration) {
	                if (typeof duration !== 'string') {
	                    duration = duration + 'ms';
	                }
	                for (var i = 0; i < this.length; i++) {
	                    var elStyle = this[i].style;
	                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
	                }
	                return this;
	            },
	            //Events
	            on: function (eventName, targetSelector, listener, capture) {
	                function handleLiveEvent(e) {
	                    var target = e.target;
	                    if ($(target).is(targetSelector)) listener.call(target, e);
	                    else {
	                        var parents = $(target).parents();
	                        for (var k = 0; k < parents.length; k++) {
	                            if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
	                        }
	                    }
	                }
	                var events = eventName.split(' ');
	                var i, j;
	                for (i = 0; i < this.length; i++) {
	                    if (typeof targetSelector === 'function' || targetSelector === false) {
	                        // Usual events
	                        if (typeof targetSelector === 'function') {
	                            listener = arguments[1];
	                            capture = arguments[2] || false;
	                        }
	                        for (j = 0; j < events.length; j++) {
	                            this[i].addEventListener(events[j], listener, capture);
	                        }
	                    }
	                    else {
	                        //Live events
	                        for (j = 0; j < events.length; j++) {
	                            if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
	                            this[i].dom7LiveListeners.push({listener: listener, liveListener: handleLiveEvent});
	                            this[i].addEventListener(events[j], handleLiveEvent, capture);
	                        }
	                    }
	                }
	    
	                return this;
	            },
	            off: function (eventName, targetSelector, listener, capture) {
	                var events = eventName.split(' ');
	                for (var i = 0; i < events.length; i++) {
	                    for (var j = 0; j < this.length; j++) {
	                        if (typeof targetSelector === 'function' || targetSelector === false) {
	                            // Usual events
	                            if (typeof targetSelector === 'function') {
	                                listener = arguments[1];
	                                capture = arguments[2] || false;
	                            }
	                            this[j].removeEventListener(events[i], listener, capture);
	                        }
	                        else {
	                            // Live event
	                            if (this[j].dom7LiveListeners) {
	                                for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
	                                    if (this[j].dom7LiveListeners[k].listener === listener) {
	                                        this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
	                                    }
	                                }
	                            }
	                        }
	                    }
	                }
	                return this;
	            },
	            once: function (eventName, targetSelector, listener, capture) {
	                var dom = this;
	                if (typeof targetSelector === 'function') {
	                    targetSelector = false;
	                    listener = arguments[1];
	                    capture = arguments[2];
	                }
	                function proxy(e) {
	                    listener(e);
	                    dom.off(eventName, targetSelector, proxy, capture);
	                }
	                dom.on(eventName, targetSelector, proxy, capture);
	            },
	            trigger: function (eventName, eventData) {
	                for (var i = 0; i < this.length; i++) {
	                    var evt;
	                    try {
	                        evt = new window.CustomEvent(eventName, {detail: eventData, bubbles: true, cancelable: true});
	                    }
	                    catch (e) {
	                        evt = document.createEvent('Event');
	                        evt.initEvent(eventName, true, true);
	                        evt.detail = eventData;
	                    }
	                    this[i].dispatchEvent(evt);
	                }
	                return this;
	            },
	            transitionEnd: function (callback) {
	                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
	                    i, j, dom = this;
	                function fireCallBack(e) {
	                    /*jshint validthis:true */
	                    if (e.target !== this) return;
	                    callback.call(this, e);
	                    for (i = 0; i < events.length; i++) {
	                        dom.off(events[i], fireCallBack);
	                    }
	                }
	                if (callback) {
	                    for (i = 0; i < events.length; i++) {
	                        dom.on(events[i], fireCallBack);
	                    }
	                }
	                return this;
	            },
	            // Sizing/Styles
	            width: function () {
	                if (this[0] === window) {
	                    return window.innerWidth;
	                }
	                else {
	                    if (this.length > 0) {
	                        return parseFloat(this.css('width'));
	                    }
	                    else {
	                        return null;
	                    }
	                }
	            },
	            outerWidth: function (includeMargins) {
	                if (this.length > 0) {
	                    if (includeMargins)
	                        return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));
	                    else
	                        return this[0].offsetWidth;
	                }
	                else return null;
	            },
	            height: function () {
	                if (this[0] === window) {
	                    return window.innerHeight;
	                }
	                else {
	                    if (this.length > 0) {
	                        return parseFloat(this.css('height'));
	                    }
	                    else {
	                        return null;
	                    }
	                }
	            },
	            outerHeight: function (includeMargins) {
	                if (this.length > 0) {
	                    if (includeMargins)
	                        return this[0].offsetHeight + parseFloat(this.css('margin-top')) + parseFloat(this.css('margin-bottom'));
	                    else
	                        return this[0].offsetHeight;
	                }
	                else return null;
	            },
	            offset: function () {
	                if (this.length > 0) {
	                    var el = this[0];
	                    var box = el.getBoundingClientRect();
	                    var body = document.body;
	                    var clientTop  = el.clientTop  || body.clientTop  || 0;
	                    var clientLeft = el.clientLeft || body.clientLeft || 0;
	                    var scrollTop  = window.pageYOffset || el.scrollTop;
	                    var scrollLeft = window.pageXOffset || el.scrollLeft;
	                    return {
	                        top: box.top  + scrollTop  - clientTop,
	                        left: box.left + scrollLeft - clientLeft
	                    };
	                }
	                else {
	                    return null;
	                }
	            },
	            css: function (props, value) {
	                var i;
	                if (arguments.length === 1) {
	                    if (typeof props === 'string') {
	                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
	                    }
	                    else {
	                        for (i = 0; i < this.length; i++) {
	                            for (var prop in props) {
	                                this[i].style[prop] = props[prop];
	                            }
	                        }
	                        return this;
	                    }
	                }
	                if (arguments.length === 2 && typeof props === 'string') {
	                    for (i = 0; i < this.length; i++) {
	                        this[i].style[props] = value;
	                    }
	                    return this;
	                }
	                return this;
	            },
	    
	            //Dom manipulation
	            each: function (callback) {
	                for (var i = 0; i < this.length; i++) {
	                    callback.call(this[i], i, this[i]);
	                }
	                return this;
	            },
	            html: function (html) {
	                if (typeof html === 'undefined') {
	                    return this[0] ? this[0].innerHTML : undefined;
	                }
	                else {
	                    for (var i = 0; i < this.length; i++) {
	                        this[i].innerHTML = html;
	                    }
	                    return this;
	                }
	            },
	            text: function (text) {
	                if (typeof text === 'undefined') {
	                    if (this[0]) {
	                        return this[0].textContent.trim();
	                    }
	                    else return null;
	                }
	                else {
	                    for (var i = 0; i < this.length; i++) {
	                        this[i].textContent = text;
	                    }
	                    return this;
	                }
	            },
	            is: function (selector) {
	                if (!this[0]) return false;
	                var compareWith, i;
	                if (typeof selector === 'string') {
	                    var el = this[0];
	                    if (el === document) return selector === document;
	                    if (el === window) return selector === window;
	    
	                    if (el.matches) return el.matches(selector);
	                    else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
	                    else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
	                    else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
	                    else {
	                        compareWith = $(selector);
	                        for (i = 0; i < compareWith.length; i++) {
	                            if (compareWith[i] === this[0]) return true;
	                        }
	                        return false;
	                    }
	                }
	                else if (selector === document) return this[0] === document;
	                else if (selector === window) return this[0] === window;
	                else {
	                    if (selector.nodeType || selector instanceof Dom7) {
	                        compareWith = selector.nodeType ? [selector] : selector;
	                        for (i = 0; i < compareWith.length; i++) {
	                            if (compareWith[i] === this[0]) return true;
	                        }
	                        return false;
	                    }
	                    return false;
	                }
	    
	            },
	            index: function () {
	                if (this[0]) {
	                    var child = this[0];
	                    var i = 0;
	                    while ((child = child.previousSibling) !== null) {
	                        if (child.nodeType === 1) i++;
	                    }
	                    return i;
	                }
	                else return undefined;
	            },
	            eq: function (index) {
	                if (typeof index === 'undefined') return this;
	                var length = this.length;
	                var returnIndex;
	                if (index > length - 1) {
	                    return new Dom7([]);
	                }
	                if (index < 0) {
	                    returnIndex = length + index;
	                    if (returnIndex < 0) return new Dom7([]);
	                    else return new Dom7([this[returnIndex]]);
	                }
	                return new Dom7([this[index]]);
	            },
	            append: function (newChild) {
	                var i, j;
	                for (i = 0; i < this.length; i++) {
	                    if (typeof newChild === 'string') {
	                        var tempDiv = document.createElement('div');
	                        tempDiv.innerHTML = newChild;
	                        while (tempDiv.firstChild) {
	                            this[i].appendChild(tempDiv.firstChild);
	                        }
	                    }
	                    else if (newChild instanceof Dom7) {
	                        for (j = 0; j < newChild.length; j++) {
	                            this[i].appendChild(newChild[j]);
	                        }
	                    }
	                    else {
	                        this[i].appendChild(newChild);
	                    }
	                }
	                return this;
	            },
	            prepend: function (newChild) {
	                var i, j;
	                for (i = 0; i < this.length; i++) {
	                    if (typeof newChild === 'string') {
	                        var tempDiv = document.createElement('div');
	                        tempDiv.innerHTML = newChild;
	                        for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
	                            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
	                        }
	                        // this[i].insertAdjacentHTML('afterbegin', newChild);
	                    }
	                    else if (newChild instanceof Dom7) {
	                        for (j = 0; j < newChild.length; j++) {
	                            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
	                        }
	                    }
	                    else {
	                        this[i].insertBefore(newChild, this[i].childNodes[0]);
	                    }
	                }
	                return this;
	            },
	            insertBefore: function (selector) {
	                var before = $(selector);
	                for (var i = 0; i < this.length; i++) {
	                    if (before.length === 1) {
	                        before[0].parentNode.insertBefore(this[i], before[0]);
	                    }
	                    else if (before.length > 1) {
	                        for (var j = 0; j < before.length; j++) {
	                            before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
	                        }
	                    }
	                }
	            },
	            insertAfter: function (selector) {
	                var after = $(selector);
	                for (var i = 0; i < this.length; i++) {
	                    if (after.length === 1) {
	                        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
	                    }
	                    else if (after.length > 1) {
	                        for (var j = 0; j < after.length; j++) {
	                            after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
	                        }
	                    }
	                }
	            },
	            next: function (selector) {
	                if (this.length > 0) {
	                    if (selector) {
	                        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom7([this[0].nextElementSibling]);
	                        else return new Dom7([]);
	                    }
	                    else {
	                        if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);
	                        else return new Dom7([]);
	                    }
	                }
	                else return new Dom7([]);
	            },
	            nextAll: function (selector) {
	                var nextEls = [];
	                var el = this[0];
	                if (!el) return new Dom7([]);
	                while (el.nextElementSibling) {
	                    var next = el.nextElementSibling;
	                    if (selector) {
	                        if($(next).is(selector)) nextEls.push(next);
	                    }
	                    else nextEls.push(next);
	                    el = next;
	                }
	                return new Dom7(nextEls);
	            },
	            prev: function (selector) {
	                if (this.length > 0) {
	                    if (selector) {
	                        if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom7([this[0].previousElementSibling]);
	                        else return new Dom7([]);
	                    }
	                    else {
	                        if (this[0].previousElementSibling) return new Dom7([this[0].previousElementSibling]);
	                        else return new Dom7([]);
	                    }
	                }
	                else return new Dom7([]);
	            },
	            prevAll: function (selector) {
	                var prevEls = [];
	                var el = this[0];
	                if (!el) return new Dom7([]);
	                while (el.previousElementSibling) {
	                    var prev = el.previousElementSibling;
	                    if (selector) {
	                        if($(prev).is(selector)) prevEls.push(prev);
	                    }
	                    else prevEls.push(prev);
	                    el = prev;
	                }
	                return new Dom7(prevEls);
	            },
	            parent: function (selector) {
	                var parents = [];
	                for (var i = 0; i < this.length; i++) {
	                    if (selector) {
	                        if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
	                    }
	                    else {
	                        parents.push(this[i].parentNode);
	                    }
	                }
	                return $($.unique(parents));
	            },
	            parents: function (selector) {
	                var parents = [];
	                for (var i = 0; i < this.length; i++) {
	                    var parent = this[i].parentNode;
	                    while (parent) {
	                        if (selector) {
	                            if ($(parent).is(selector)) parents.push(parent);
	                        }
	                        else {
	                            parents.push(parent);
	                        }
	                        parent = parent.parentNode;
	                    }
	                }
	                return $($.unique(parents));
	            },
	            find : function (selector) {
	                var foundElements = [];
	                for (var i = 0; i < this.length; i++) {
	                    var found = this[i].querySelectorAll(selector);
	                    for (var j = 0; j < found.length; j++) {
	                        foundElements.push(found[j]);
	                    }
	                }
	                return new Dom7(foundElements);
	            },
	            children: function (selector) {
	                var children = [];
	                for (var i = 0; i < this.length; i++) {
	                    var childNodes = this[i].childNodes;
	    
	                    for (var j = 0; j < childNodes.length; j++) {
	                        if (!selector) {
	                            if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
	                        }
	                        else {
	                            if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
	                        }
	                    }
	                }
	                return new Dom7($.unique(children));
	            },
	            remove: function () {
	                for (var i = 0; i < this.length; i++) {
	                    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
	                }
	                return this;
	            },
	            add: function () {
	                var dom = this;
	                var i, j;
	                for (i = 0; i < arguments.length; i++) {
	                    var toAdd = $(arguments[i]);
	                    for (j = 0; j < toAdd.length; j++) {
	                        dom[dom.length] = toAdd[j];
	                        dom.length++;
	                    }
	                }
	                return dom;
	            }
	        };
	        $.fn = Dom7.prototype;
	        $.unique = function (arr) {
	            var unique = [];
	            for (var i = 0; i < arr.length; i++) {
	                if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
	            }
	            return unique;
	        };
	    
	        return $;
	    })();
	    
	
	    /*===========================
	     Get Dom libraries
	     ===========================*/
	    var swiperDomPlugins = ['jQuery', 'Zepto', 'Dom7'];
	    for (var i = 0; i < swiperDomPlugins.length; i++) {
	    	if (window[swiperDomPlugins[i]]) {
	    		addLibraryPlugin(window[swiperDomPlugins[i]]);
	    	}
	    }
	    // Required DOM Plugins
	    var domLib;
	    if (typeof Dom7 === 'undefined') {
	    	domLib = window.Dom7 || window.Zepto || window.jQuery;
	    }
	    else {
	    	domLib = Dom7;
	    }
	
	    /*===========================
	    Add .swiper plugin from Dom libraries
	    ===========================*/
	    function addLibraryPlugin(lib) {
	        lib.fn.swiper = function (params) {
	            var firstInstance;
	            lib(this).each(function () {
	                var s = new Swiper(this, params);
	                if (!firstInstance) firstInstance = s;
	            });
	            return firstInstance;
	        };
	    }
	    
	    if (domLib) {
	        if (!('transitionEnd' in domLib.fn)) {
	            domLib.fn.transitionEnd = function (callback) {
	                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
	                    i, j, dom = this;
	                function fireCallBack(e) {
	                    /*jshint validthis:true */
	                    if (e.target !== this) return;
	                    callback.call(this, e);
	                    for (i = 0; i < events.length; i++) {
	                        dom.off(events[i], fireCallBack);
	                    }
	                }
	                if (callback) {
	                    for (i = 0; i < events.length; i++) {
	                        dom.on(events[i], fireCallBack);
	                    }
	                }
	                return this;
	            };
	        }
	        if (!('transform' in domLib.fn)) {
	            domLib.fn.transform = function (transform) {
	                for (var i = 0; i < this.length; i++) {
	                    var elStyle = this[i].style;
	                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
	                }
	                return this;
	            };
	        }
	        if (!('transition' in domLib.fn)) {
	            domLib.fn.transition = function (duration) {
	                if (typeof duration !== 'string') {
	                    duration = duration + 'ms';
	                }
	                for (var i = 0; i < this.length; i++) {
	                    var elStyle = this[i].style;
	                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
	                }
	                return this;
	            };
	        }
	    }
	
	    window.Swiper = Swiper;
	})();
	/*===========================
	Swiper AMD Export
	===========================*/
	if (true)
	{
	    module.exports = window.Swiper;
	}
	else if (typeof define === 'function' && define.amd) {
	    define([], function () {
	        'use strict';
	        return window.Swiper;
	    });
	}
	//# sourceMappingURL=maps/swiper.js.map


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(34)
	module.exports = __webpack_require__(36)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(37)
	if (false) {
	(function () {
	var hotAPI = require("/Users/dinglei/程序代码/工作/时趣互动/2016/20160316_VueGroup/webapp/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./list.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./list.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./list.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./list.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./list.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(35);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(16)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./list.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./list.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(15)();
	// imports
	
	
	// module
	exports.push([module.id, ".page .ui-product:first-child {\n        margin-top: 1rem;\n        display: inline-block;\n    }\n    .ad, .ui-product {\n        position: relative;\n    }\n    .ui-product {\n        width: 100%;\n        font-size: 0;\n        margin-bottom: 1rem;\n    }\n    img {\n        font-size: 0;\n        background-size: contain;\n    }\n    a, button, img {\n        -webkit-touch-callout: none;\n        -webkit-tap-highlight-color: rgba(255,0,0,0);\n    }\n\n    .ui-product .reply span {\n        padding: 0 10px;\n        background: rgba(0,0,0,.7);\n        float: left;\n        height: 3rem;\n    }\n    .ui-product .reply {\n        position: absolute;\n        bottom: 4.5rem;\n        right: 0;\n        color: #fff;\n        font-size: 1.4rem;\n        vertical-align: middle;\n        line-height: 3rem;\n        height: 3rem;\n    }\n    .icon-mark, .icon-mark:after, .ui-box, .ui-product .reply span, .warn-tips, .warn-tips p {\n        display: inline-block;\n    }\n\n    h4, p {\n        font-size: 1.4rem;\n    }\n    .ui-product .reply span:last-child {\n        background: rgba(21,21,21,.75);\n    }\n    .icon-love, .icon-lovefull {\n        font-size: 1.4rem;\n        margin-right: 2px;\n        vertical-align: 1px;\n        color: #fff;\n    }", ""]);
	
	// exports


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	        replace:true,
	        props: ["goodlist"],
	        watch:{
	            'banner':function(){
	                var _self = this;
	
	                _self.$nextTick(function() {
	
	                    new Swiper(_self.$el, {
	                        pagination: '.swiper-pagination',
	                        paginationClickable: true
	                    });
	                });
	            }
	
	        },
	        components:{
	            "list":__webpack_require__(33)
	        }
	
	    }

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = "<section id=\"goodsList\">\n\n        <div class=\"ui-product\" v-for=\"item in goodlist\">\n            <img width=\"100%\" :src=\"item.img\">\n            <p class=\"reply\">\n                <span class=\"tit\">{{item.name}}</span>\n                <span class=\"like\">\n                    <i class=\"iconfont icon-love\"></i> {{item.price}}\n                </span>\n            </p>\n        </div>\n\n    </section>";

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = "<div class=\"listScroll\">\n        <section>\n\n            <section class=\"carousel ad-banner-crousel\">\n                <!-- Swiper -->\n                <div class=\"swiper-container\" v-el:swiper>\n\n                    <div class=\"swiper-wrapper\">\n                        <img v-for=\"item in banner\" :src=\"item.url\">\n                    </div>\n\n\n                    <!-- Pagination -->\n                    <div class=\"swiper-pagination\"></div>\n                </div>\n            </section>\n\n            <list :goodlist.sync=\"goodlist\"></list>\n\n\n        </section>\n    </div>";

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(40)
	module.exports = __webpack_require__(42)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(43)
	if (false) {
	(function () {
	var hotAPI = require("/Users/dinglei/程序代码/工作/时趣互动/2016/20160316_VueGroup/webapp/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./menu.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./menu.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./menu.vue"], function () {
	var newOptions = require("-!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./menu.vue")
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./menu.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(41);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(16)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./menu.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./menu.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(15)();
	// imports
	
	
	// module
	exports.push([module.id, ".card-scroll .iscroll {\n        overflow: hidden;\n    }\n    .float-menu.show{\n        -webkit-transform: translateX(300px);\n        transform: translateX(300px);\n\n        -webkit-transition: all .3s ease;\n        transition: all .3s ease;\n    }\n    .slide-on .float-menu {\n        -webkit-animation: slider2 .2s linear forwards;\n        width: 25rem;\n    }\n    @-webkit-keyframes slider2{\n        0%{\n            -webkit-transform:translate3d(-25rem,0,0)\n        }\n        100%{\n            -webkit-transform:translate3d(0,0,0)\n        }\n    }\n    .slide-off .float-menu, .slide-on .float-menu, .slide-on .mask {\n        display: block;\n    }\n    .index-wrap .float-menu, .index-wrap .mask {\n        display: none;\n    }\n    .float-menu {\n        /*background: #ebebeb;\n        height: 100%;\n        display: block;\n        color: #4a4a4a;\n        position: absolute;\n        top: 0;\n        left: 0;\n        z-index: 100;*/\n\n        position: absolute;\n        top: 0;\n        left: -300px;\n        width: 300px;\n        background-color: #ebebeb;\n        color: #313131;\n        -webkit-transition: all .3s ease;\n        transition: all .3s ease;\n        z-index: 99;\n        height: 100%;\n    }\n    .float-menu h2 {\n        padding: 15px 0 0 15px;\n        font-size: 1.6rem;\n    }\n    .address dt, .buy-entry button, .float-menu h2, .pop-cont h2, .ui-comment h5 {\n        font-weight: 700;\n    }\n    .float-menu .ui-box-group {\n        padding: 15px;\n    }\n    .ui-box-group {\n        position: relative;\n        border-right: thin solid #e2e2e2;\n    }\n    .cf {\n        zoom: 1;\n    }\n    .cf:after, .cf:before {\n        content: \"\";\n        display: table;\n    }\n    .ui-box {\n        width: 50%;\n        text-align: center;\n        position: relative;\n        border: thin solid #e8e8e8;\n        float: left;\n        margin-top: -1px;\n        border-right: none;\n        background: #fff;\n        min-height: 140px;\n    }\n    .icon-mark, .icon-mark:after, .ui-box, .ui-product .reply span, .warn-tips, .warn-tips p {\n        display: inline-block;\n    }\n    .btn, .ui-box {\n        box-sizing: border-box;\n    }\n    .ui-box-pic {\n        margin: 2rem 2rem 0;\n        min-height: 60px;\n    }\n    .ui-box h3 {\n        margin: 1rem .2rem;\n        font-size: 1.4rem;\n        color: #353535;\n    }", ""]);
	
	// exports


/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = {
	        replace:true,
	        props: ["show","list"]
	
	    }

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = "<div class=\"float-menu iscroll\" :class=\"{'show':show}\">\n        <section id=\"categoryPage\">\n            <h2>商品分类</h2>\n            <section id=\"categoryList\" class=\"ui-box-group cf\">\n                <div class=\"ui-box\" cid=\"{{item.id}}\" v-for=\"item in list\">\n                    <div class=\"ui-box-pic\"><img src=\"http://p.qpic.cn/qqjifen_pic/0/upload_180c7e55ed69d03451934258c6aab7a9/0\" width=\"100%\"></div>\n                    <h3>{{item.id}}</h3>\n                </div>\n            </section>\n        </section>\n    </div>";

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = "<div class=\"page\">\n        <div class=\"page-cover\" v-if=\"menu.show\" @click=\"showMenus\"></div>\n\n        <!--头部-->\n        <header class=\"header\" :class=\"{'show':menu.show}\">\n            <div class=\"item\" @click=\"openMenu\">\n                <i class=\"iconfont icon-class\"></i>\n            </div>\n        <span style=\"display:none;\" class=\"header-search\">\n            <i class=\"icon-search\"></i>\n            <input class=\"\" placeholder=\"\" value=\"搜积分月有惊喜\">\n        </span>\n            <div class=\"item\">\n            <span class=\"user-center\">\n                <i class=\"iconfont icon-mine\"></i>\n            </span>\n            <span class=\"cart\">\n                <i class=\"iconfont icon-cart\"></i>\n                <sup>10</sup>\n            </span>\n            </div>\n        </header>\n\n        <!--默认列表-->\n        <!--<div class=\"listScroll\" :class=\"{'show':menu.show}\">\n            <section>\n                <section class=\"carousel ad-banner-crousel\">\n\n                </section>\n            </section>\n        </div>-->\n\n        <listscroll :class=\"{'show':menu.show}\" :banner.sync=\"banner\" :goodlist.sync=\"goodlist\"></listscroll>\n\n\n    </div>\n\n    <!--左侧菜单栏-->\n    <bp-menu :show.sync=\"menu.show\" :list.sync=\"menu.list\"></bp-menu>";

/***/ }
]);
//# sourceMappingURL=build.js.map