var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */(function(global,factory){"use strict";if((typeof module==="undefined"?"undefined":_typeof(module))==="object"&&_typeof(module.exports)==="object"){// For CommonJS and CommonJS-like environments where a proper `window`
// is present, execute the factory and get jQuery.
// For environments that do not have a `window` with a `document`
// (such as Node.js), expose a factory as module.exports.
// This accentuates the need for the creation of a real `window`.
// e.g. var jQuery = require("jquery")(window);
// See ticket #14549 for more info.
module.exports=global.document?factory(global,true):function(w){if(!w.document){throw new Error("jQuery requires a window with a document");}return factory(w);};}else{factory(global);}// Pass this if window is not defined yet
})(typeof window!=="undefined"?window:this,function(window,noGlobal){// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";var arr=[];var document=window.document;var getProto=Object.getPrototypeOf;var _slice=arr.slice;var concat=arr.concat;var push=arr.push;var indexOf=arr.indexOf;var class2type={};var toString=class2type.toString;var hasOwn=class2type.hasOwnProperty;var fnToString=hasOwn.toString;var ObjectFunctionString=fnToString.call(Object);var support={};function DOMEval(code,doc){doc=doc||document;var script=doc.createElement("script");script.text=code;doc.head.appendChild(script).parentNode.removeChild(script);}/* global Symbol */// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module
var version="3.2.1",// Define a local copy of jQuery
jQuery=function jQuery(selector,context){// The jQuery object is actually just the init constructor 'enhanced'
// Need init if jQuery is called (just allow error to be thrown if not included)
return new jQuery.fn.init(selector,context);},// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
rtrim=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,// Matches dashed string for camelizing
rmsPrefix=/^-ms-/,rdashAlpha=/-([a-z])/g,// Used by jQuery.camelCase as callback to replace()
fcamelCase=function fcamelCase(all,letter){return letter.toUpperCase();};jQuery.fn=jQuery.prototype={// The current version of jQuery being used
jquery:version,constructor:jQuery,// The default length of a jQuery object is 0
length:0,toArray:function toArray(){return _slice.call(this);},// Get the Nth element in the matched element set OR
// Get the whole matched element set as a clean array
get:function get(num){// Return all the elements in a clean array
if(num==null){return _slice.call(this);}// Return just the one element from the set
return num<0?this[num+this.length]:this[num];},// Take an array of elements and push it onto the stack
// (returning the new matched element set)
pushStack:function pushStack(elems){// Build a new jQuery matched element set
var ret=jQuery.merge(this.constructor(),elems);// Add the old object onto the stack (as a reference)
ret.prevObject=this;// Return the newly-formed element set
return ret;},// Execute a callback for every element in the matched set.
each:function each(callback){return jQuery.each(this,callback);},map:function map(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem);}));},slice:function slice(){return this.pushStack(_slice.apply(this,arguments));},first:function first(){return this.eq(0);},last:function last(){return this.eq(-1);},eq:function eq(i){var len=this.length,j=+i+(i<0?len:0);return this.pushStack(j>=0&&j<len?[this[j]]:[]);},end:function end(){return this.prevObject||this.constructor();},// For internal use only.
// Behaves like an Array's method, not like a jQuery method.
push:push,sort:arr.sort,splice:arr.splice};jQuery.extend=jQuery.fn.extend=function(){var options,name,src,copy,copyIsArray,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=false;// Handle a deep copy situation
if(typeof target==="boolean"){deep=target;// Skip the boolean and the target
target=arguments[i]||{};i++;}// Handle case when target is a string or something (possible in deep copy)
if((typeof target==="undefined"?"undefined":_typeof(target))!=="object"&&!jQuery.isFunction(target)){target={};}// Extend jQuery itself if only one argument is passed
if(i===length){target=this;i--;}for(;i<length;i++){// Only deal with non-null/undefined values
if((options=arguments[i])!=null){// Extend the base object
for(name in options){src=target[name];copy=options[name];// Prevent never-ending loop
if(target===copy){continue;}// Recurse if we're merging plain objects or arrays
if(deep&&copy&&(jQuery.isPlainObject(copy)||(copyIsArray=Array.isArray(copy)))){if(copyIsArray){copyIsArray=false;clone=src&&Array.isArray(src)?src:[];}else{clone=src&&jQuery.isPlainObject(src)?src:{};}// Never move original objects, clone them
target[name]=jQuery.extend(deep,clone,copy);// Don't bring in undefined values
}else if(copy!==undefined){target[name]=copy;}}}}// Return the modified object
return target;};jQuery.extend({// Unique for each copy of jQuery on the page
expando:"jQuery"+(version+Math.random()).replace(/\D/g,""),// Assume jQuery is ready without the ready module
isReady:true,error:function error(msg){throw new Error(msg);},noop:function noop(){},isFunction:function isFunction(obj){return jQuery.type(obj)==="function";},isWindow:function isWindow(obj){return obj!=null&&obj===obj.window;},isNumeric:function isNumeric(obj){// As of jQuery 3.0, isNumeric is limited to
// strings and numbers (primitives or objects)
// that can be coerced to finite numbers (gh-2662)
var type=jQuery.type(obj);return(type==="number"||type==="string")&&// parseFloat NaNs numeric-cast false positives ("")
// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
// subtraction forces infinities to NaN
!isNaN(obj-parseFloat(obj));},isPlainObject:function isPlainObject(obj){var proto,Ctor;// Detect obvious negatives
// Use toString instead of jQuery.type to catch host objects
if(!obj||toString.call(obj)!=="[object Object]"){return false;}proto=getProto(obj);// Objects with no prototype (e.g., `Object.create( null )`) are plain
if(!proto){return true;}// Objects with prototype are plain iff they were constructed by a global Object function
Ctor=hasOwn.call(proto,"constructor")&&proto.constructor;return typeof Ctor==="function"&&fnToString.call(Ctor)===ObjectFunctionString;},isEmptyObject:function isEmptyObject(obj){/* eslint-disable no-unused-vars */// See https://github.com/eslint/eslint/issues/6125
var name;for(name in obj){return false;}return true;},type:function type(obj){if(obj==null){return obj+"";}// Support: Android <=2.3 only (functionish RegExp)
return(typeof obj==="undefined"?"undefined":_typeof(obj))==="object"||typeof obj==="function"?class2type[toString.call(obj)]||"object":typeof obj==="undefined"?"undefined":_typeof(obj);},// Evaluates a script in a global context
globalEval:function globalEval(code){DOMEval(code);},// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 13
// Microsoft forgot to hump their vendor prefix (#9572)
camelCase:function camelCase(string){return string.replace(rmsPrefix,"ms-").replace(rdashAlpha,fcamelCase);},each:function each(obj,callback){var length,i=0;if(isArrayLike(obj)){length=obj.length;for(;i<length;i++){if(callback.call(obj[i],i,obj[i])===false){break;}}}else{for(i in obj){if(callback.call(obj[i],i,obj[i])===false){break;}}}return obj;},// Support: Android <=4.0 only
trim:function trim(text){return text==null?"":(text+"").replace(rtrim,"");},// results is for internal usage only
makeArray:function makeArray(arr,results){var ret=results||[];if(arr!=null){if(isArrayLike(Object(arr))){jQuery.merge(ret,typeof arr==="string"?[arr]:arr);}else{push.call(ret,arr);}}return ret;},inArray:function inArray(elem,arr,i){return arr==null?-1:indexOf.call(arr,elem,i);},// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
merge:function merge(first,second){var len=+second.length,j=0,i=first.length;for(;j<len;j++){first[i++]=second[j];}first.length=i;return first;},grep:function grep(elems,callback,invert){var callbackInverse,matches=[],i=0,length=elems.length,callbackExpect=!invert;// Go through the array, only saving the items
// that pass the validator function
for(;i<length;i++){callbackInverse=!callback(elems[i],i);if(callbackInverse!==callbackExpect){matches.push(elems[i]);}}return matches;},// arg is for internal usage only
map:function map(elems,callback,arg){var length,value,i=0,ret=[];// Go through the array, translating each of the items to their new values
if(isArrayLike(elems)){length=elems.length;for(;i<length;i++){value=callback(elems[i],i,arg);if(value!=null){ret.push(value);}}// Go through every key on the object,
}else{for(i in elems){value=callback(elems[i],i,arg);if(value!=null){ret.push(value);}}}// Flatten any nested arrays
return concat.apply([],ret);},// A global GUID counter for objects
guid:1,// Bind a function to a context, optionally partially applying any
// arguments.
proxy:function proxy(fn,context){var tmp,args,proxy;if(typeof context==="string"){tmp=fn[context];context=fn;fn=tmp;}// Quick check to determine if target is callable, in the spec
// this throws a TypeError, but we will just return undefined.
if(!jQuery.isFunction(fn)){return undefined;}// Simulated bind
args=_slice.call(arguments,2);proxy=function proxy(){return fn.apply(context||this,args.concat(_slice.call(arguments)));};// Set the guid of unique handler to the same of original handler, so it can be removed
proxy.guid=fn.guid=fn.guid||jQuery.guid++;return proxy;},now:Date.now,// jQuery.support is not used in Core but other projects attach their
// properties to it so it needs to exist.
support:support});if(typeof Symbol==="function"){jQuery.fn[Symbol.iterator]=arr[Symbol.iterator];}// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(i,name){class2type["[object "+name+"]"]=name.toLowerCase();});function isArrayLike(obj){// Support: real iOS 8.2 only (not reproducible in simulator)
// `in` check used to prevent JIT error (gh-2145)
// hasOwn isn't used here due to false negatives
// regarding Nodelist length in IE
var length=!!obj&&"length"in obj&&obj.length,type=jQuery.type(obj);if(type==="function"||jQuery.isWindow(obj)){return false;}return type==="array"||length===0||typeof length==="number"&&length>0&&length-1 in obj;}var Sizzle=/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */function(window){var i,support,Expr,getText,isXML,tokenize,compile,select,outermostContext,sortInput,hasDuplicate,// Local document vars
setDocument,document,docElem,documentIsHTML,rbuggyQSA,rbuggyMatches,matches,contains,// Instance-specific data
expando="sizzle"+1*new Date(),preferredDoc=window.document,dirruns=0,done=0,classCache=createCache(),tokenCache=createCache(),compilerCache=createCache(),sortOrder=function sortOrder(a,b){if(a===b){hasDuplicate=true;}return 0;},// Instance methods
hasOwn={}.hasOwnProperty,arr=[],pop=arr.pop,push_native=arr.push,push=arr.push,slice=arr.slice,// Use a stripped-down indexOf as it's faster than native
// https://jsperf.com/thor-indexof-vs-for/5
indexOf=function indexOf(list,elem){var i=0,len=list.length;for(;i<len;i++){if(list[i]===elem){return i;}}return-1;},booleans="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",// Regular expressions
// http://www.w3.org/TR/css3-selectors/#whitespace
whitespace="[\\x20\\t\\r\\n\\f]",// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
identifier="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
attributes="\\["+whitespace+"*("+identifier+")(?:"+whitespace+// Operator (capture 2)
"*([*^$|!~]?=)"+whitespace+// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+identifier+"))|)"+whitespace+"*\\]",pseudos=":("+identifier+")(?:\\(("+// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
// 1. quoted (capture 3; capture 4 or capture 5)
"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|"+// 2. simple (capture 6)
"((?:\\\\.|[^\\\\()[\\]]|"+attributes+")*)|"+// 3. anything else (capture 2)
".*"+")\\)|)",// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
rwhitespace=new RegExp(whitespace+"+","g"),rtrim=new RegExp("^"+whitespace+"+|((?:^|[^\\\\])(?:\\\\.)*)"+whitespace+"+$","g"),rcomma=new RegExp("^"+whitespace+"*,"+whitespace+"*"),rcombinators=new RegExp("^"+whitespace+"*([>+~]|"+whitespace+")"+whitespace+"*"),rattributeQuotes=new RegExp("="+whitespace+"*([^\\]'\"]*?)"+whitespace+"*\\]","g"),rpseudo=new RegExp(pseudos),ridentifier=new RegExp("^"+identifier+"$"),matchExpr={"ID":new RegExp("^#("+identifier+")"),"CLASS":new RegExp("^\\.("+identifier+")"),"TAG":new RegExp("^("+identifier+"|[*])"),"ATTR":new RegExp("^"+attributes),"PSEUDO":new RegExp("^"+pseudos),"CHILD":new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+whitespace+"*(even|odd|(([+-]|)(\\d*)n|)"+whitespace+"*(?:([+-]|)"+whitespace+"*(\\d+)|))"+whitespace+"*\\)|)","i"),"bool":new RegExp("^(?:"+booleans+")$","i"),// For use in libraries implementing .is()
// We use this for POS matching in `select`
"needsContext":new RegExp("^"+whitespace+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+whitespace+"*((?:-\\d)?\\d*)"+whitespace+"*\\)|)(?=[^-]|$)","i")},rinputs=/^(?:input|select|textarea|button)$/i,rheader=/^h\d$/i,rnative=/^[^{]+\{\s*\[native \w/,// Easily-parseable/retrievable ID or TAG or CLASS selectors
rquickExpr=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,rsibling=/[+~]/,// CSS escapes
// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
runescape=new RegExp("\\\\([\\da-f]{1,6}"+whitespace+"?|("+whitespace+")|.)","ig"),funescape=function funescape(_,escaped,escapedWhitespace){var high="0x"+escaped-0x10000;// NaN means non-codepoint
// Support: Firefox<24
// Workaround erroneous numeric interpretation of +"0x"
return high!==high||escapedWhitespace?escaped:high<0?// BMP codepoint
String.fromCharCode(high+0x10000):// Supplemental Plane codepoint (surrogate pair)
String.fromCharCode(high>>10|0xD800,high&0x3FF|0xDC00);},// CSS string/identifier serialization
// https://drafts.csswg.org/cssom/#common-serializing-idioms
rcssescape=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,fcssescape=function fcssescape(ch,asCodePoint){if(asCodePoint){// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
if(ch==="\0"){return"\uFFFD";}// Control characters and (dependent upon position) numbers get escaped as code points
return ch.slice(0,-1)+"\\"+ch.charCodeAt(ch.length-1).toString(16)+" ";}// Other potentially-special ASCII characters get backslash-escaped
return"\\"+ch;},// Used for iframes
// See setDocument()
// Removing the function wrapper causes a "Permission Denied"
// error in IE
unloadHandler=function unloadHandler(){setDocument();},disabledAncestor=addCombinator(function(elem){return elem.disabled===true&&("form"in elem||"label"in elem);},{dir:"parentNode",next:"legend"});// Optimize for push.apply( _, NodeList )
try{push.apply(arr=slice.call(preferredDoc.childNodes),preferredDoc.childNodes);// Support: Android<4.0
// Detect silently failing push.apply
arr[preferredDoc.childNodes.length].nodeType;}catch(e){push={apply:arr.length?// Leverage slice if possible
function(target,els){push_native.apply(target,slice.call(els));}:// Support: IE<9
// Otherwise append directly
function(target,els){var j=target.length,i=0;// Can't trust NodeList.length
while(target[j++]=els[i++]){}target.length=j-1;}};}function Sizzle(selector,context,results,seed){var m,i,elem,nid,match,groups,newSelector,newContext=context&&context.ownerDocument,// nodeType defaults to 9, since context defaults to document
nodeType=context?context.nodeType:9;results=results||[];// Return early from calls with invalid selector or context
if(typeof selector!=="string"||!selector||nodeType!==1&&nodeType!==9&&nodeType!==11){return results;}// Try to shortcut find operations (as opposed to filters) in HTML documents
if(!seed){if((context?context.ownerDocument||context:preferredDoc)!==document){setDocument(context);}context=context||document;if(documentIsHTML){// If the selector is sufficiently simple, try using a "get*By*" DOM method
// (excepting DocumentFragment context, where the methods don't exist)
if(nodeType!==11&&(match=rquickExpr.exec(selector))){// ID selector
if(m=match[1]){// Document context
if(nodeType===9){if(elem=context.getElementById(m)){// Support: IE, Opera, Webkit
// TODO: identify versions
// getElementById can match elements by name instead of ID
if(elem.id===m){results.push(elem);return results;}}else{return results;}// Element context
}else{// Support: IE, Opera, Webkit
// TODO: identify versions
// getElementById can match elements by name instead of ID
if(newContext&&(elem=newContext.getElementById(m))&&contains(context,elem)&&elem.id===m){results.push(elem);return results;}}// Type selector
}else if(match[2]){push.apply(results,context.getElementsByTagName(selector));return results;// Class selector
}else if((m=match[3])&&support.getElementsByClassName&&context.getElementsByClassName){push.apply(results,context.getElementsByClassName(m));return results;}}// Take advantage of querySelectorAll
if(support.qsa&&!compilerCache[selector+" "]&&(!rbuggyQSA||!rbuggyQSA.test(selector))){if(nodeType!==1){newContext=context;newSelector=selector;// qSA looks outside Element context, which is not what we want
// Thanks to Andrew Dupont for this workaround technique
// Support: IE <=8
// Exclude object elements
}else if(context.nodeName.toLowerCase()!=="object"){// Capture the context ID, setting it first if necessary
if(nid=context.getAttribute("id")){nid=nid.replace(rcssescape,fcssescape);}else{context.setAttribute("id",nid=expando);}// Prefix every selector in the list
groups=tokenize(selector);i=groups.length;while(i--){groups[i]="#"+nid+" "+toSelector(groups[i]);}newSelector=groups.join(",");// Expand context for sibling selectors
newContext=rsibling.test(selector)&&testContext(context.parentNode)||context;}if(newSelector){try{push.apply(results,newContext.querySelectorAll(newSelector));return results;}catch(qsaError){}finally{if(nid===expando){context.removeAttribute("id");}}}}}}// All others
return select(selector.replace(rtrim,"$1"),context,results,seed);}/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */function createCache(){var keys=[];function cache(key,value){// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
if(keys.push(key+" ")>Expr.cacheLength){// Only keep the most recent entries
delete cache[keys.shift()];}return cache[key+" "]=value;}return cache;}/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */function markFunction(fn){fn[expando]=true;return fn;}/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */function assert(fn){var el=document.createElement("fieldset");try{return!!fn(el);}catch(e){return false;}finally{// Remove from its parent by default
if(el.parentNode){el.parentNode.removeChild(el);}// release memory in IE
el=null;}}/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */function addHandle(attrs,handler){var arr=attrs.split("|"),i=arr.length;while(i--){Expr.attrHandle[arr[i]]=handler;}}/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */function siblingCheck(a,b){var cur=b&&a,diff=cur&&a.nodeType===1&&b.nodeType===1&&a.sourceIndex-b.sourceIndex;// Use IE sourceIndex if available on both nodes
if(diff){return diff;}// Check if b follows a
if(cur){while(cur=cur.nextSibling){if(cur===b){return-1;}}}return a?1:-1;}/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */function createInputPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&elem.type===type;};}/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */function createButtonPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return(name==="input"||name==="button")&&elem.type===type;};}/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */function createDisabledPseudo(disabled){// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
return function(elem){// Only certain elements can match :enabled or :disabled
// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
if("form"in elem){// Check for inherited disabledness on relevant non-disabled elements:
// * listed form-associated elements in a disabled fieldset
//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
// * option elements in a disabled optgroup
//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
// All such elements have a "form" property.
if(elem.parentNode&&elem.disabled===false){// Option elements defer to a parent optgroup if present
if("label"in elem){if("label"in elem.parentNode){return elem.parentNode.disabled===disabled;}else{return elem.disabled===disabled;}}// Support: IE 6 - 11
// Use the isDisabled shortcut property to check for disabled fieldset ancestors
return elem.isDisabled===disabled||// Where there is no isDisabled, check manually
/* jshint -W018 */elem.isDisabled!==!disabled&&disabledAncestor(elem)===disabled;}return elem.disabled===disabled;// Try to winnow out elements that can't be disabled before trusting the disabled property.
// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
// even exist on them, let alone have a boolean value.
}else if("label"in elem){return elem.disabled===disabled;}// Remaining elements are neither :enabled nor :disabled
return false;};}/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */function createPositionalPseudo(fn){return markFunction(function(argument){argument=+argument;return markFunction(function(seed,matches){var j,matchIndexes=fn([],seed.length,argument),i=matchIndexes.length;// Match elements found at the specified indexes
while(i--){if(seed[j=matchIndexes[i]]){seed[j]=!(matches[j]=seed[j]);}}});});}/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */function testContext(context){return context&&typeof context.getElementsByTagName!=="undefined"&&context;}// Expose support vars for convenience
support=Sizzle.support={};/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */isXML=Sizzle.isXML=function(elem){// documentElement is verified for cases where it doesn't yet exist
// (such as loading iframes in IE - #4833)
var documentElement=elem&&(elem.ownerDocument||elem).documentElement;return documentElement?documentElement.nodeName!=="HTML":false;};/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */setDocument=Sizzle.setDocument=function(node){var hasCompare,subWindow,doc=node?node.ownerDocument||node:preferredDoc;// Return early if doc is invalid or already selected
if(doc===document||doc.nodeType!==9||!doc.documentElement){return document;}// Update global variables
document=doc;docElem=document.documentElement;documentIsHTML=!isXML(document);// Support: IE 9-11, Edge
// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
if(preferredDoc!==document&&(subWindow=document.defaultView)&&subWindow.top!==subWindow){// Support: IE 11, Edge
if(subWindow.addEventListener){subWindow.addEventListener("unload",unloadHandler,false);// Support: IE 9 - 10 only
}else if(subWindow.attachEvent){subWindow.attachEvent("onunload",unloadHandler);}}/* Attributes
	---------------------------------------------------------------------- */// Support: IE<8
// Verify that getAttribute really returns attributes and not properties
// (excepting IE8 booleans)
support.attributes=assert(function(el){el.className="i";return!el.getAttribute("className");});/* getElement(s)By*
	---------------------------------------------------------------------- */// Check if getElementsByTagName("*") returns only elements
support.getElementsByTagName=assert(function(el){el.appendChild(document.createComment(""));return!el.getElementsByTagName("*").length;});// Support: IE<9
support.getElementsByClassName=rnative.test(document.getElementsByClassName);// Support: IE<10
// Check if getElementById returns elements by name
// The broken getElementById methods don't pick up programmatically-set names,
// so use a roundabout getElementsByName test
support.getById=assert(function(el){docElem.appendChild(el).id=expando;return!document.getElementsByName||!document.getElementsByName(expando).length;});// ID filter and find
if(support.getById){Expr.filter["ID"]=function(id){var attrId=id.replace(runescape,funescape);return function(elem){return elem.getAttribute("id")===attrId;};};Expr.find["ID"]=function(id,context){if(typeof context.getElementById!=="undefined"&&documentIsHTML){var elem=context.getElementById(id);return elem?[elem]:[];}};}else{Expr.filter["ID"]=function(id){var attrId=id.replace(runescape,funescape);return function(elem){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");return node&&node.value===attrId;};};// Support: IE 6 - 7 only
// getElementById is not reliable as a find shortcut
Expr.find["ID"]=function(id,context){if(typeof context.getElementById!=="undefined"&&documentIsHTML){var node,i,elems,elem=context.getElementById(id);if(elem){// Verify the id attribute
node=elem.getAttributeNode("id");if(node&&node.value===id){return[elem];}// Fall back on getElementsByName
elems=context.getElementsByName(id);i=0;while(elem=elems[i++]){node=elem.getAttributeNode("id");if(node&&node.value===id){return[elem];}}}return[];}};}// Tag
Expr.find["TAG"]=support.getElementsByTagName?function(tag,context){if(typeof context.getElementsByTagName!=="undefined"){return context.getElementsByTagName(tag);// DocumentFragment nodes don't have gEBTN
}else if(support.qsa){return context.querySelectorAll(tag);}}:function(tag,context){var elem,tmp=[],i=0,// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
results=context.getElementsByTagName(tag);// Filter out possible comments
if(tag==="*"){while(elem=results[i++]){if(elem.nodeType===1){tmp.push(elem);}}return tmp;}return results;};// Class
Expr.find["CLASS"]=support.getElementsByClassName&&function(className,context){if(typeof context.getElementsByClassName!=="undefined"&&documentIsHTML){return context.getElementsByClassName(className);}};/* QSA/matchesSelector
	---------------------------------------------------------------------- */// QSA and matchesSelector support
// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
rbuggyMatches=[];// qSa(:focus) reports false when true (Chrome 21)
// We allow this because of a bug in IE8/9 that throws an error
// whenever `document.activeElement` is accessed on an iframe
// So, we allow :focus to pass through QSA all the time to avoid the IE error
// See https://bugs.jquery.com/ticket/13378
rbuggyQSA=[];if(support.qsa=rnative.test(document.querySelectorAll)){// Build QSA regex
// Regex strategy adopted from Diego Perini
assert(function(el){// Select is set to empty string on purpose
// This is to test IE's treatment of not explicitly
// setting a boolean content attribute,
// since its presence should be enough
// https://bugs.jquery.com/ticket/12359
docElem.appendChild(el).innerHTML="<a id='"+expando+"'></a>"+"<select id='"+expando+"-\r\\' msallowcapture=''>"+"<option selected=''></option></select>";// Support: IE8, Opera 11-12.16
// Nothing should be selected when empty strings follow ^= or $= or *=
// The test attribute must be unknown in Opera but "safe" for WinRT
// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
if(el.querySelectorAll("[msallowcapture^='']").length){rbuggyQSA.push("[*^$]="+whitespace+"*(?:''|\"\")");}// Support: IE8
// Boolean attributes and "value" are not treated correctly
if(!el.querySelectorAll("[selected]").length){rbuggyQSA.push("\\["+whitespace+"*(?:value|"+booleans+")");}// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
if(!el.querySelectorAll("[id~="+expando+"-]").length){rbuggyQSA.push("~=");}// Webkit/Opera - :checked should return selected option elements
// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
// IE8 throws error here and will not see later tests
if(!el.querySelectorAll(":checked").length){rbuggyQSA.push(":checked");}// Support: Safari 8+, iOS 8+
// https://bugs.webkit.org/show_bug.cgi?id=136851
// In-page `selector#id sibling-combinator selector` fails
if(!el.querySelectorAll("a#"+expando+"+*").length){rbuggyQSA.push(".#.+[+~]");}});assert(function(el){el.innerHTML="<a href='' disabled='disabled'></a>"+"<select disabled='disabled'><option/></select>";// Support: Windows 8 Native Apps
// The type and name attributes are restricted during .innerHTML assignment
var input=document.createElement("input");input.setAttribute("type","hidden");el.appendChild(input).setAttribute("name","D");// Support: IE8
// Enforce case-sensitivity of name attribute
if(el.querySelectorAll("[name=d]").length){rbuggyQSA.push("name"+whitespace+"*[*^$|!~]?=");}// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
// IE8 throws error here and will not see later tests
if(el.querySelectorAll(":enabled").length!==2){rbuggyQSA.push(":enabled",":disabled");}// Support: IE9-11+
// IE's :disabled selector does not pick up the children of disabled fieldsets
docElem.appendChild(el).disabled=true;if(el.querySelectorAll(":disabled").length!==2){rbuggyQSA.push(":enabled",":disabled");}// Opera 10-11 does not throw on post-comma invalid pseudos
el.querySelectorAll("*,:x");rbuggyQSA.push(",.*:");});}if(support.matchesSelector=rnative.test(matches=docElem.matches||docElem.webkitMatchesSelector||docElem.mozMatchesSelector||docElem.oMatchesSelector||docElem.msMatchesSelector)){assert(function(el){// Check to see if it's possible to do matchesSelector
// on a disconnected node (IE 9)
support.disconnectedMatch=matches.call(el,"*");// This should fail with an exception
// Gecko does not error, returns false instead
matches.call(el,"[s!='']:x");rbuggyMatches.push("!=",pseudos);});}rbuggyQSA=rbuggyQSA.length&&new RegExp(rbuggyQSA.join("|"));rbuggyMatches=rbuggyMatches.length&&new RegExp(rbuggyMatches.join("|"));/* Contains
	---------------------------------------------------------------------- */hasCompare=rnative.test(docElem.compareDocumentPosition);// Element contains another
// Purposefully self-exclusive
// As in, an element does not contain itself
contains=hasCompare||rnative.test(docElem.contains)?function(a,b){var adown=a.nodeType===9?a.documentElement:a,bup=b&&b.parentNode;return a===bup||!!(bup&&bup.nodeType===1&&(adown.contains?adown.contains(bup):a.compareDocumentPosition&&a.compareDocumentPosition(bup)&16));}:function(a,b){if(b){while(b=b.parentNode){if(b===a){return true;}}}return false;};/* Sorting
	---------------------------------------------------------------------- */// Document order sorting
sortOrder=hasCompare?function(a,b){// Flag for duplicate removal
if(a===b){hasDuplicate=true;return 0;}// Sort on method existence if only one input has compareDocumentPosition
var compare=!a.compareDocumentPosition-!b.compareDocumentPosition;if(compare){return compare;}// Calculate position if both inputs belong to the same document
compare=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):// Otherwise we know they are disconnected
1;// Disconnected nodes
if(compare&1||!support.sortDetached&&b.compareDocumentPosition(a)===compare){// Choose the first element that is related to our preferred document
if(a===document||a.ownerDocument===preferredDoc&&contains(preferredDoc,a)){return-1;}if(b===document||b.ownerDocument===preferredDoc&&contains(preferredDoc,b)){return 1;}// Maintain original order
return sortInput?indexOf(sortInput,a)-indexOf(sortInput,b):0;}return compare&4?-1:1;}:function(a,b){// Exit early if the nodes are identical
if(a===b){hasDuplicate=true;return 0;}var cur,i=0,aup=a.parentNode,bup=b.parentNode,ap=[a],bp=[b];// Parentless nodes are either documents or disconnected
if(!aup||!bup){return a===document?-1:b===document?1:aup?-1:bup?1:sortInput?indexOf(sortInput,a)-indexOf(sortInput,b):0;// If the nodes are siblings, we can do a quick check
}else if(aup===bup){return siblingCheck(a,b);}// Otherwise we need full lists of their ancestors for comparison
cur=a;while(cur=cur.parentNode){ap.unshift(cur);}cur=b;while(cur=cur.parentNode){bp.unshift(cur);}// Walk down the tree looking for a discrepancy
while(ap[i]===bp[i]){i++;}return i?// Do a sibling check if the nodes have a common ancestor
siblingCheck(ap[i],bp[i]):// Otherwise nodes in our document sort first
ap[i]===preferredDoc?-1:bp[i]===preferredDoc?1:0;};return document;};Sizzle.matches=function(expr,elements){return Sizzle(expr,null,null,elements);};Sizzle.matchesSelector=function(elem,expr){// Set document vars if needed
if((elem.ownerDocument||elem)!==document){setDocument(elem);}// Make sure that attribute selectors are quoted
expr=expr.replace(rattributeQuotes,"='$1']");if(support.matchesSelector&&documentIsHTML&&!compilerCache[expr+" "]&&(!rbuggyMatches||!rbuggyMatches.test(expr))&&(!rbuggyQSA||!rbuggyQSA.test(expr))){try{var ret=matches.call(elem,expr);// IE 9's matchesSelector returns false on disconnected nodes
if(ret||support.disconnectedMatch||// As well, disconnected nodes are said to be in a document
// fragment in IE 9
elem.document&&elem.document.nodeType!==11){return ret;}}catch(e){}}return Sizzle(expr,document,null,[elem]).length>0;};Sizzle.contains=function(context,elem){// Set document vars if needed
if((context.ownerDocument||context)!==document){setDocument(context);}return contains(context,elem);};Sizzle.attr=function(elem,name){// Set document vars if needed
if((elem.ownerDocument||elem)!==document){setDocument(elem);}var fn=Expr.attrHandle[name.toLowerCase()],// Don't get fooled by Object.prototype properties (jQuery #13807)
val=fn&&hasOwn.call(Expr.attrHandle,name.toLowerCase())?fn(elem,name,!documentIsHTML):undefined;return val!==undefined?val:support.attributes||!documentIsHTML?elem.getAttribute(name):(val=elem.getAttributeNode(name))&&val.specified?val.value:null;};Sizzle.escape=function(sel){return(sel+"").replace(rcssescape,fcssescape);};Sizzle.error=function(msg){throw new Error("Syntax error, unrecognized expression: "+msg);};/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */Sizzle.uniqueSort=function(results){var elem,duplicates=[],j=0,i=0;// Unless we *know* we can detect duplicates, assume their presence
hasDuplicate=!support.detectDuplicates;sortInput=!support.sortStable&&results.slice(0);results.sort(sortOrder);if(hasDuplicate){while(elem=results[i++]){if(elem===results[i]){j=duplicates.push(i);}}while(j--){results.splice(duplicates[j],1);}}// Clear input after sorting to release objects
// See https://github.com/jquery/sizzle/pull/225
sortInput=null;return results;};/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */getText=Sizzle.getText=function(elem){var node,ret="",i=0,nodeType=elem.nodeType;if(!nodeType){// If no nodeType, this is expected to be an array
while(node=elem[i++]){// Do not traverse comment nodes
ret+=getText(node);}}else if(nodeType===1||nodeType===9||nodeType===11){// Use textContent for elements
// innerText usage removed for consistency of new lines (jQuery #11153)
if(typeof elem.textContent==="string"){return elem.textContent;}else{// Traverse its children
for(elem=elem.firstChild;elem;elem=elem.nextSibling){ret+=getText(elem);}}}else if(nodeType===3||nodeType===4){return elem.nodeValue;}// Do not include comment or processing instruction nodes
return ret;};Expr=Sizzle.selectors={// Can be adjusted by the user
cacheLength:50,createPseudo:markFunction,match:matchExpr,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{"ATTR":function ATTR(match){match[1]=match[1].replace(runescape,funescape);// Move the given value to match[3] whether quoted or unquoted
match[3]=(match[3]||match[4]||match[5]||"").replace(runescape,funescape);if(match[2]==="~="){match[3]=" "+match[3]+" ";}return match.slice(0,4);},"CHILD":function CHILD(match){/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/match[1]=match[1].toLowerCase();if(match[1].slice(0,3)==="nth"){// nth-* requires argument
if(!match[3]){Sizzle.error(match[0]);}// numeric x and y parameters for Expr.filter.CHILD
// remember that false/true cast respectively to 0/1
match[4]=+(match[4]?match[5]+(match[6]||1):2*(match[3]==="even"||match[3]==="odd"));match[5]=+(match[7]+match[8]||match[3]==="odd");// other types prohibit arguments
}else if(match[3]){Sizzle.error(match[0]);}return match;},"PSEUDO":function PSEUDO(match){var excess,unquoted=!match[6]&&match[2];if(matchExpr["CHILD"].test(match[0])){return null;}// Accept quoted arguments as-is
if(match[3]){match[2]=match[4]||match[5]||"";// Strip excess characters from unquoted arguments
}else if(unquoted&&rpseudo.test(unquoted)&&(// Get excess from tokenize (recursively)
excess=tokenize(unquoted,true))&&(// advance to the next closing parenthesis
excess=unquoted.indexOf(")",unquoted.length-excess)-unquoted.length)){// excess is a negative index
match[0]=match[0].slice(0,excess);match[2]=unquoted.slice(0,excess);}// Return only captures needed by the pseudo filter method (type and argument)
return match.slice(0,3);}},filter:{"TAG":function TAG(nodeNameSelector){var nodeName=nodeNameSelector.replace(runescape,funescape).toLowerCase();return nodeNameSelector==="*"?function(){return true;}:function(elem){return elem.nodeName&&elem.nodeName.toLowerCase()===nodeName;};},"CLASS":function CLASS(className){var pattern=classCache[className+" "];return pattern||(pattern=new RegExp("(^|"+whitespace+")"+className+"("+whitespace+"|$)"))&&classCache(className,function(elem){return pattern.test(typeof elem.className==="string"&&elem.className||typeof elem.getAttribute!=="undefined"&&elem.getAttribute("class")||"");});},"ATTR":function ATTR(name,operator,check){return function(elem){var result=Sizzle.attr(elem,name);if(result==null){return operator==="!=";}if(!operator){return true;}result+="";return operator==="="?result===check:operator==="!="?result!==check:operator==="^="?check&&result.indexOf(check)===0:operator==="*="?check&&result.indexOf(check)>-1:operator==="$="?check&&result.slice(-check.length)===check:operator==="~="?(" "+result.replace(rwhitespace," ")+" ").indexOf(check)>-1:operator==="|="?result===check||result.slice(0,check.length+1)===check+"-":false;};},"CHILD":function CHILD(type,what,argument,first,last){var simple=type.slice(0,3)!=="nth",forward=type.slice(-4)!=="last",ofType=what==="of-type";return first===1&&last===0?// Shortcut for :nth-*(n)
function(elem){return!!elem.parentNode;}:function(elem,context,xml){var cache,uniqueCache,outerCache,node,nodeIndex,start,dir=simple!==forward?"nextSibling":"previousSibling",parent=elem.parentNode,name=ofType&&elem.nodeName.toLowerCase(),useCache=!xml&&!ofType,diff=false;if(parent){// :(first|last|only)-(child|of-type)
if(simple){while(dir){node=elem;while(node=node[dir]){if(ofType?node.nodeName.toLowerCase()===name:node.nodeType===1){return false;}}// Reverse direction for :only-* (if we haven't yet done so)
start=dir=type==="only"&&!start&&"nextSibling";}return true;}start=[forward?parent.firstChild:parent.lastChild];// non-xml :nth-child(...) stores cache data on `parent`
if(forward&&useCache){// Seek `elem` from a previously-cached index
// ...in a gzip-friendly way
node=parent;outerCache=node[expando]||(node[expando]={});// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={});cache=uniqueCache[type]||[];nodeIndex=cache[0]===dirruns&&cache[1];diff=nodeIndex&&cache[2];node=nodeIndex&&parent.childNodes[nodeIndex];while(node=++nodeIndex&&node&&node[dir]||(// Fallback to seeking `elem` from the start
diff=nodeIndex=0)||start.pop()){// When found, cache indexes on `parent` and break
if(node.nodeType===1&&++diff&&node===elem){uniqueCache[type]=[dirruns,nodeIndex,diff];break;}}}else{// Use previously-cached element index if available
if(useCache){// ...in a gzip-friendly way
node=elem;outerCache=node[expando]||(node[expando]={});// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={});cache=uniqueCache[type]||[];nodeIndex=cache[0]===dirruns&&cache[1];diff=nodeIndex;}// xml :nth-child(...)
// or :nth-last-child(...) or :nth(-last)?-of-type(...)
if(diff===false){// Use the same loop as above to seek `elem` from the start
while(node=++nodeIndex&&node&&node[dir]||(diff=nodeIndex=0)||start.pop()){if((ofType?node.nodeName.toLowerCase()===name:node.nodeType===1)&&++diff){// Cache the index of each encountered element
if(useCache){outerCache=node[expando]||(node[expando]={});// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={});uniqueCache[type]=[dirruns,diff];}if(node===elem){break;}}}}}// Incorporate the offset, then check against cycle size
diff-=last;return diff===first||diff%first===0&&diff/first>=0;}};},"PSEUDO":function PSEUDO(pseudo,argument){// pseudo-class names are case-insensitive
// http://www.w3.org/TR/selectors/#pseudo-classes
// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
// Remember that setFilters inherits from pseudos
var args,fn=Expr.pseudos[pseudo]||Expr.setFilters[pseudo.toLowerCase()]||Sizzle.error("unsupported pseudo: "+pseudo);// The user may use createPseudo to indicate that
// arguments are needed to create the filter function
// just as Sizzle does
if(fn[expando]){return fn(argument);}// But maintain support for old signatures
if(fn.length>1){args=[pseudo,pseudo,"",argument];return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())?markFunction(function(seed,matches){var idx,matched=fn(seed,argument),i=matched.length;while(i--){idx=indexOf(seed,matched[i]);seed[idx]=!(matches[idx]=matched[i]);}}):function(elem){return fn(elem,0,args);};}return fn;}},pseudos:{// Potentially complex pseudos
"not":markFunction(function(selector){// Trim the selector passed to compile
// to avoid treating leading and trailing
// spaces as combinators
var input=[],results=[],matcher=compile(selector.replace(rtrim,"$1"));return matcher[expando]?markFunction(function(seed,matches,context,xml){var elem,unmatched=matcher(seed,null,xml,[]),i=seed.length;// Match elements unmatched by `matcher`
while(i--){if(elem=unmatched[i]){seed[i]=!(matches[i]=elem);}}}):function(elem,context,xml){input[0]=elem;matcher(input,null,xml,results);// Don't keep the element (issue #299)
input[0]=null;return!results.pop();};}),"has":markFunction(function(selector){return function(elem){return Sizzle(selector,elem).length>0;};}),"contains":markFunction(function(text){text=text.replace(runescape,funescape);return function(elem){return(elem.textContent||elem.innerText||getText(elem)).indexOf(text)>-1;};}),// "Whether an element is represented by a :lang() selector
// is based solely on the element's language value
// being equal to the identifier C,
// or beginning with the identifier C immediately followed by "-".
// The matching of C against the element's language value is performed case-insensitively.
// The identifier C does not have to be a valid language name."
// http://www.w3.org/TR/selectors/#lang-pseudo
"lang":markFunction(function(lang){// lang value must be a valid identifier
if(!ridentifier.test(lang||"")){Sizzle.error("unsupported lang: "+lang);}lang=lang.replace(runescape,funescape).toLowerCase();return function(elem){var elemLang;do{if(elemLang=documentIsHTML?elem.lang:elem.getAttribute("xml:lang")||elem.getAttribute("lang")){elemLang=elemLang.toLowerCase();return elemLang===lang||elemLang.indexOf(lang+"-")===0;}}while((elem=elem.parentNode)&&elem.nodeType===1);return false;};}),// Miscellaneous
"target":function target(elem){var hash=window.location&&window.location.hash;return hash&&hash.slice(1)===elem.id;},"root":function root(elem){return elem===docElem;},"focus":function focus(elem){return elem===document.activeElement&&(!document.hasFocus||document.hasFocus())&&!!(elem.type||elem.href||~elem.tabIndex);},// Boolean properties
"enabled":createDisabledPseudo(false),"disabled":createDisabledPseudo(true),"checked":function checked(elem){// In CSS3, :checked should return both checked and selected elements
// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
var nodeName=elem.nodeName.toLowerCase();return nodeName==="input"&&!!elem.checked||nodeName==="option"&&!!elem.selected;},"selected":function selected(elem){// Accessing this property makes selected-by-default
// options in Safari work properly
if(elem.parentNode){elem.parentNode.selectedIndex;}return elem.selected===true;},// Contents
"empty":function empty(elem){// http://www.w3.org/TR/selectors/#empty-pseudo
// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
//   but not by others (comment: 8; processing instruction: 7; etc.)
// nodeType < 6 works because attributes (2) do not appear as children
for(elem=elem.firstChild;elem;elem=elem.nextSibling){if(elem.nodeType<6){return false;}}return true;},"parent":function parent(elem){return!Expr.pseudos["empty"](elem);},// Element/input types
"header":function header(elem){return rheader.test(elem.nodeName);},"input":function input(elem){return rinputs.test(elem.nodeName);},"button":function button(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&elem.type==="button"||name==="button";},"text":function text(elem){var attr;return elem.nodeName.toLowerCase()==="input"&&elem.type==="text"&&(// Support: IE<8
// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
(attr=elem.getAttribute("type"))==null||attr.toLowerCase()==="text");},// Position-in-collection
"first":createPositionalPseudo(function(){return[0];}),"last":createPositionalPseudo(function(matchIndexes,length){return[length-1];}),"eq":createPositionalPseudo(function(matchIndexes,length,argument){return[argument<0?argument+length:argument];}),"even":createPositionalPseudo(function(matchIndexes,length){var i=0;for(;i<length;i+=2){matchIndexes.push(i);}return matchIndexes;}),"odd":createPositionalPseudo(function(matchIndexes,length){var i=1;for(;i<length;i+=2){matchIndexes.push(i);}return matchIndexes;}),"lt":createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument;for(;--i>=0;){matchIndexes.push(i);}return matchIndexes;}),"gt":createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument;for(;++i<length;){matchIndexes.push(i);}return matchIndexes;})}};Expr.pseudos["nth"]=Expr.pseudos["eq"];// Add button/input type pseudos
for(i in{radio:true,checkbox:true,file:true,password:true,image:true}){Expr.pseudos[i]=createInputPseudo(i);}for(i in{submit:true,reset:true}){Expr.pseudos[i]=createButtonPseudo(i);}// Easy API for creating new setFilters
function setFilters(){}setFilters.prototype=Expr.filters=Expr.pseudos;Expr.setFilters=new setFilters();tokenize=Sizzle.tokenize=function(selector,parseOnly){var matched,match,tokens,type,soFar,groups,preFilters,cached=tokenCache[selector+" "];if(cached){return parseOnly?0:cached.slice(0);}soFar=selector;groups=[];preFilters=Expr.preFilter;while(soFar){// Comma and first run
if(!matched||(match=rcomma.exec(soFar))){if(match){// Don't consume trailing commas as valid
soFar=soFar.slice(match[0].length)||soFar;}groups.push(tokens=[]);}matched=false;// Combinators
if(match=rcombinators.exec(soFar)){matched=match.shift();tokens.push({value:matched,// Cast descendant combinators to space
type:match[0].replace(rtrim," ")});soFar=soFar.slice(matched.length);}// Filters
for(type in Expr.filter){if((match=matchExpr[type].exec(soFar))&&(!preFilters[type]||(match=preFilters[type](match)))){matched=match.shift();tokens.push({value:matched,type:type,matches:match});soFar=soFar.slice(matched.length);}}if(!matched){break;}}// Return the length of the invalid excess
// if we're just parsing
// Otherwise, throw an error or return tokens
return parseOnly?soFar.length:soFar?Sizzle.error(selector):// Cache the tokens
tokenCache(selector,groups).slice(0);};function toSelector(tokens){var i=0,len=tokens.length,selector="";for(;i<len;i++){selector+=tokens[i].value;}return selector;}function addCombinator(matcher,combinator,base){var dir=combinator.dir,skip=combinator.next,key=skip||dir,checkNonElements=base&&key==="parentNode",doneName=done++;return combinator.first?// Check against closest ancestor/preceding element
function(elem,context,xml){while(elem=elem[dir]){if(elem.nodeType===1||checkNonElements){return matcher(elem,context,xml);}}return false;}:// Check against all ancestor/preceding elements
function(elem,context,xml){var oldCache,uniqueCache,outerCache,newCache=[dirruns,doneName];// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
if(xml){while(elem=elem[dir]){if(elem.nodeType===1||checkNonElements){if(matcher(elem,context,xml)){return true;}}}}else{while(elem=elem[dir]){if(elem.nodeType===1||checkNonElements){outerCache=elem[expando]||(elem[expando]={});// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[elem.uniqueID]||(outerCache[elem.uniqueID]={});if(skip&&skip===elem.nodeName.toLowerCase()){elem=elem[dir]||elem;}else if((oldCache=uniqueCache[key])&&oldCache[0]===dirruns&&oldCache[1]===doneName){// Assign to newCache so results back-propagate to previous elements
return newCache[2]=oldCache[2];}else{// Reuse newcache so results back-propagate to previous elements
uniqueCache[key]=newCache;// A match means we're done; a fail means we have to keep checking
if(newCache[2]=matcher(elem,context,xml)){return true;}}}}}return false;};}function elementMatcher(matchers){return matchers.length>1?function(elem,context,xml){var i=matchers.length;while(i--){if(!matchers[i](elem,context,xml)){return false;}}return true;}:matchers[0];}function multipleContexts(selector,contexts,results){var i=0,len=contexts.length;for(;i<len;i++){Sizzle(selector,contexts[i],results);}return results;}function condense(unmatched,map,filter,context,xml){var elem,newUnmatched=[],i=0,len=unmatched.length,mapped=map!=null;for(;i<len;i++){if(elem=unmatched[i]){if(!filter||filter(elem,context,xml)){newUnmatched.push(elem);if(mapped){map.push(i);}}}}return newUnmatched;}function setMatcher(preFilter,selector,matcher,postFilter,postFinder,postSelector){if(postFilter&&!postFilter[expando]){postFilter=setMatcher(postFilter);}if(postFinder&&!postFinder[expando]){postFinder=setMatcher(postFinder,postSelector);}return markFunction(function(seed,results,context,xml){var temp,i,elem,preMap=[],postMap=[],preexisting=results.length,// Get initial elements from seed or context
elems=seed||multipleContexts(selector||"*",context.nodeType?[context]:context,[]),// Prefilter to get matcher input, preserving a map for seed-results synchronization
matcherIn=preFilter&&(seed||!selector)?condense(elems,preMap,preFilter,context,xml):elems,matcherOut=matcher?// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
postFinder||(seed?preFilter:preexisting||postFilter)?// ...intermediate processing is necessary
[]:// ...otherwise use results directly
results:matcherIn;// Find primary matches
if(matcher){matcher(matcherIn,matcherOut,context,xml);}// Apply postFilter
if(postFilter){temp=condense(matcherOut,postMap);postFilter(temp,[],context,xml);// Un-match failing elements by moving them back to matcherIn
i=temp.length;while(i--){if(elem=temp[i]){matcherOut[postMap[i]]=!(matcherIn[postMap[i]]=elem);}}}if(seed){if(postFinder||preFilter){if(postFinder){// Get the final matcherOut by condensing this intermediate into postFinder contexts
temp=[];i=matcherOut.length;while(i--){if(elem=matcherOut[i]){// Restore matcherIn since elem is not yet a final match
temp.push(matcherIn[i]=elem);}}postFinder(null,matcherOut=[],temp,xml);}// Move matched elements from seed to results to keep them synchronized
i=matcherOut.length;while(i--){if((elem=matcherOut[i])&&(temp=postFinder?indexOf(seed,elem):preMap[i])>-1){seed[temp]=!(results[temp]=elem);}}}// Add elements to results, through postFinder if defined
}else{matcherOut=condense(matcherOut===results?matcherOut.splice(preexisting,matcherOut.length):matcherOut);if(postFinder){postFinder(null,results,matcherOut,xml);}else{push.apply(results,matcherOut);}}});}function matcherFromTokens(tokens){var checkContext,matcher,j,len=tokens.length,leadingRelative=Expr.relative[tokens[0].type],implicitRelative=leadingRelative||Expr.relative[" "],i=leadingRelative?1:0,// The foundational matcher ensures that elements are reachable from top-level context(s)
matchContext=addCombinator(function(elem){return elem===checkContext;},implicitRelative,true),matchAnyContext=addCombinator(function(elem){return indexOf(checkContext,elem)>-1;},implicitRelative,true),matchers=[function(elem,context,xml){var ret=!leadingRelative&&(xml||context!==outermostContext)||((checkContext=context).nodeType?matchContext(elem,context,xml):matchAnyContext(elem,context,xml));// Avoid hanging onto element (issue #299)
checkContext=null;return ret;}];for(;i<len;i++){if(matcher=Expr.relative[tokens[i].type]){matchers=[addCombinator(elementMatcher(matchers),matcher)];}else{matcher=Expr.filter[tokens[i].type].apply(null,tokens[i].matches);// Return special upon seeing a positional matcher
if(matcher[expando]){// Find the next relative operator (if any) for proper handling
j=++i;for(;j<len;j++){if(Expr.relative[tokens[j].type]){break;}}return setMatcher(i>1&&elementMatcher(matchers),i>1&&toSelector(// If the preceding token was a descendant combinator, insert an implicit any-element `*`
tokens.slice(0,i-1).concat({value:tokens[i-2].type===" "?"*":""})).replace(rtrim,"$1"),matcher,i<j&&matcherFromTokens(tokens.slice(i,j)),j<len&&matcherFromTokens(tokens=tokens.slice(j)),j<len&&toSelector(tokens));}matchers.push(matcher);}}return elementMatcher(matchers);}function matcherFromGroupMatchers(elementMatchers,setMatchers){var bySet=setMatchers.length>0,byElement=elementMatchers.length>0,superMatcher=function superMatcher(seed,context,xml,results,outermost){var elem,j,matcher,matchedCount=0,i="0",unmatched=seed&&[],setMatched=[],contextBackup=outermostContext,// We must always have either seed elements or outermost context
elems=seed||byElement&&Expr.find["TAG"]("*",outermost),// Use integer dirruns iff this is the outermost matcher
dirrunsUnique=dirruns+=contextBackup==null?1:Math.random()||0.1,len=elems.length;if(outermost){outermostContext=context===document||context||outermost;}// Add elements passing elementMatchers directly to results
// Support: IE<9, Safari
// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
for(;i!==len&&(elem=elems[i])!=null;i++){if(byElement&&elem){j=0;if(!context&&elem.ownerDocument!==document){setDocument(elem);xml=!documentIsHTML;}while(matcher=elementMatchers[j++]){if(matcher(elem,context||document,xml)){results.push(elem);break;}}if(outermost){dirruns=dirrunsUnique;}}// Track unmatched elements for set filters
if(bySet){// They will have gone through all possible matchers
if(elem=!matcher&&elem){matchedCount--;}// Lengthen the array for every element, matched or not
if(seed){unmatched.push(elem);}}}// `i` is now the count of elements visited above, and adding it to `matchedCount`
// makes the latter nonnegative.
matchedCount+=i;// Apply set filters to unmatched elements
// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
// no element matchers and no seed.
// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
// case, which will result in a "00" `matchedCount` that differs from `i` but is also
// numerically zero.
if(bySet&&i!==matchedCount){j=0;while(matcher=setMatchers[j++]){matcher(unmatched,setMatched,context,xml);}if(seed){// Reintegrate element matches to eliminate the need for sorting
if(matchedCount>0){while(i--){if(!(unmatched[i]||setMatched[i])){setMatched[i]=pop.call(results);}}}// Discard index placeholder values to get only actual matches
setMatched=condense(setMatched);}// Add matches to results
push.apply(results,setMatched);// Seedless set matches succeeding multiple successful matchers stipulate sorting
if(outermost&&!seed&&setMatched.length>0&&matchedCount+setMatchers.length>1){Sizzle.uniqueSort(results);}}// Override manipulation of globals by nested matchers
if(outermost){dirruns=dirrunsUnique;outermostContext=contextBackup;}return unmatched;};return bySet?markFunction(superMatcher):superMatcher;}compile=Sizzle.compile=function(selector,match/* Internal Use Only */){var i,setMatchers=[],elementMatchers=[],cached=compilerCache[selector+" "];if(!cached){// Generate a function of recursive functions that can be used to check each element
if(!match){match=tokenize(selector);}i=match.length;while(i--){cached=matcherFromTokens(match[i]);if(cached[expando]){setMatchers.push(cached);}else{elementMatchers.push(cached);}}// Cache the compiled function
cached=compilerCache(selector,matcherFromGroupMatchers(elementMatchers,setMatchers));// Save selector and tokenization
cached.selector=selector;}return cached;};/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */select=Sizzle.select=function(selector,context,results,seed){var i,tokens,token,type,find,compiled=typeof selector==="function"&&selector,match=!seed&&tokenize(selector=compiled.selector||selector);results=results||[];// Try to minimize operations if there is only one selector in the list and no seed
// (the latter of which guarantees us context)
if(match.length===1){// Reduce context if the leading compound selector is an ID
tokens=match[0]=match[0].slice(0);if(tokens.length>2&&(token=tokens[0]).type==="ID"&&context.nodeType===9&&documentIsHTML&&Expr.relative[tokens[1].type]){context=(Expr.find["ID"](token.matches[0].replace(runescape,funescape),context)||[])[0];if(!context){return results;// Precompiled matchers will still verify ancestry, so step up a level
}else if(compiled){context=context.parentNode;}selector=selector.slice(tokens.shift().value.length);}// Fetch a seed set for right-to-left matching
i=matchExpr["needsContext"].test(selector)?0:tokens.length;while(i--){token=tokens[i];// Abort if we hit a combinator
if(Expr.relative[type=token.type]){break;}if(find=Expr.find[type]){// Search, expanding context for leading sibling combinators
if(seed=find(token.matches[0].replace(runescape,funescape),rsibling.test(tokens[0].type)&&testContext(context.parentNode)||context)){// If seed is empty or no tokens remain, we can return early
tokens.splice(i,1);selector=seed.length&&toSelector(tokens);if(!selector){push.apply(results,seed);return results;}break;}}}}// Compile and execute a filtering function if one is not provided
// Provide `match` to avoid retokenization if we modified the selector above
(compiled||compile(selector,match))(seed,context,!documentIsHTML,results,!context||rsibling.test(selector)&&testContext(context.parentNode)||context);return results;};// One-time assignments
// Sort stability
support.sortStable=expando.split("").sort(sortOrder).join("")===expando;// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates=!!hasDuplicate;// Initialize against the default document
setDocument();// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached=assert(function(el){// Should return 1, but returns 4 (following)
return el.compareDocumentPosition(document.createElement("fieldset"))&1;});// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if(!assert(function(el){el.innerHTML="<a href='#'></a>";return el.firstChild.getAttribute("href")==="#";})){addHandle("type|href|height|width",function(elem,name,isXML){if(!isXML){return elem.getAttribute(name,name.toLowerCase()==="type"?1:2);}});}// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if(!support.attributes||!assert(function(el){el.innerHTML="<input/>";el.firstChild.setAttribute("value","");return el.firstChild.getAttribute("value")==="";})){addHandle("value",function(elem,name,isXML){if(!isXML&&elem.nodeName.toLowerCase()==="input"){return elem.defaultValue;}});}// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if(!assert(function(el){return el.getAttribute("disabled")==null;})){addHandle(booleans,function(elem,name,isXML){var val;if(!isXML){return elem[name]===true?name.toLowerCase():(val=elem.getAttributeNode(name))&&val.specified?val.value:null;}});}return Sizzle;}(window);jQuery.find=Sizzle;jQuery.expr=Sizzle.selectors;// Deprecated
jQuery.expr[":"]=jQuery.expr.pseudos;jQuery.uniqueSort=jQuery.unique=Sizzle.uniqueSort;jQuery.text=Sizzle.getText;jQuery.isXMLDoc=Sizzle.isXML;jQuery.contains=Sizzle.contains;jQuery.escapeSelector=Sizzle.escape;var dir=function dir(elem,_dir,until){var matched=[],truncate=until!==undefined;while((elem=elem[_dir])&&elem.nodeType!==9){if(elem.nodeType===1){if(truncate&&jQuery(elem).is(until)){break;}matched.push(elem);}}return matched;};var _siblings=function _siblings(n,elem){var matched=[];for(;n;n=n.nextSibling){if(n.nodeType===1&&n!==elem){matched.push(n);}}return matched;};var rneedsContext=jQuery.expr.match.needsContext;function nodeName(elem,name){return elem.nodeName&&elem.nodeName.toLowerCase()===name.toLowerCase();};var rsingleTag=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;var risSimple=/^.[^:#\[\.,]*$/;// Implement the identical functionality for filter and not
function winnow(elements,qualifier,not){if(jQuery.isFunction(qualifier)){return jQuery.grep(elements,function(elem,i){return!!qualifier.call(elem,i,elem)!==not;});}// Single element
if(qualifier.nodeType){return jQuery.grep(elements,function(elem){return elem===qualifier!==not;});}// Arraylike of elements (jQuery, arguments, Array)
if(typeof qualifier!=="string"){return jQuery.grep(elements,function(elem){return indexOf.call(qualifier,elem)>-1!==not;});}// Simple selector that can be filtered directly, removing non-Elements
if(risSimple.test(qualifier)){return jQuery.filter(qualifier,elements,not);}// Complex selector, compare the two sets, removing non-Elements
qualifier=jQuery.filter(qualifier,elements);return jQuery.grep(elements,function(elem){return indexOf.call(qualifier,elem)>-1!==not&&elem.nodeType===1;});}jQuery.filter=function(expr,elems,not){var elem=elems[0];if(not){expr=":not("+expr+")";}if(elems.length===1&&elem.nodeType===1){return jQuery.find.matchesSelector(elem,expr)?[elem]:[];}return jQuery.find.matches(expr,jQuery.grep(elems,function(elem){return elem.nodeType===1;}));};jQuery.fn.extend({find:function find(selector){var i,ret,len=this.length,self=this;if(typeof selector!=="string"){return this.pushStack(jQuery(selector).filter(function(){for(i=0;i<len;i++){if(jQuery.contains(self[i],this)){return true;}}}));}ret=this.pushStack([]);for(i=0;i<len;i++){jQuery.find(selector,self[i],ret);}return len>1?jQuery.uniqueSort(ret):ret;},filter:function filter(selector){return this.pushStack(winnow(this,selector||[],false));},not:function not(selector){return this.pushStack(winnow(this,selector||[],true));},is:function is(selector){return!!winnow(this,// If this is a positional/relative selector, check membership in the returned set
// so $("p:first").is("p:last") won't return true for a doc with two "p".
typeof selector==="string"&&rneedsContext.test(selector)?jQuery(selector):selector||[],false).length;}});// Initialize a jQuery object
// A central reference to the root jQuery(document)
var rootjQuery,// A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
// Strict HTML recognition (#11290: must start with <)
// Shortcut simple #id case for speed
rquickExpr=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,init=jQuery.fn.init=function(selector,context,root){var match,elem;// HANDLE: $(""), $(null), $(undefined), $(false)
if(!selector){return this;}// Method init() accepts an alternate rootjQuery
// so migrate can support jQuery.sub (gh-2101)
root=root||rootjQuery;// Handle HTML strings
if(typeof selector==="string"){if(selector[0]==="<"&&selector[selector.length-1]===">"&&selector.length>=3){// Assume that strings that start and end with <> are HTML and skip the regex check
match=[null,selector,null];}else{match=rquickExpr.exec(selector);}// Match html or make sure no context is specified for #id
if(match&&(match[1]||!context)){// HANDLE: $(html) -> $(array)
if(match[1]){context=context instanceof jQuery?context[0]:context;// Option to run scripts is true for back-compat
// Intentionally let the error be thrown if parseHTML is not present
jQuery.merge(this,jQuery.parseHTML(match[1],context&&context.nodeType?context.ownerDocument||context:document,true));// HANDLE: $(html, props)
if(rsingleTag.test(match[1])&&jQuery.isPlainObject(context)){for(match in context){// Properties of context are called as methods if possible
if(jQuery.isFunction(this[match])){this[match](context[match]);// ...and otherwise set as attributes
}else{this.attr(match,context[match]);}}}return this;// HANDLE: $(#id)
}else{elem=document.getElementById(match[2]);if(elem){// Inject the element directly into the jQuery object
this[0]=elem;this.length=1;}return this;}// HANDLE: $(expr, $(...))
}else if(!context||context.jquery){return(context||root).find(selector);// HANDLE: $(expr, context)
// (which is just equivalent to: $(context).find(expr)
}else{return this.constructor(context).find(selector);}// HANDLE: $(DOMElement)
}else if(selector.nodeType){this[0]=selector;this.length=1;return this;// HANDLE: $(function)
// Shortcut for document ready
}else if(jQuery.isFunction(selector)){return root.ready!==undefined?root.ready(selector):// Execute immediately if ready is not present
selector(jQuery);}return jQuery.makeArray(selector,this);};// Give the init function the jQuery prototype for later instantiation
init.prototype=jQuery.fn;// Initialize central reference
rootjQuery=jQuery(document);var rparentsprev=/^(?:parents|prev(?:Until|All))/,// Methods guaranteed to produce a unique set when starting from a unique set
guaranteedUnique={children:true,contents:true,next:true,prev:true};jQuery.fn.extend({has:function has(target){var targets=jQuery(target,this),l=targets.length;return this.filter(function(){var i=0;for(;i<l;i++){if(jQuery.contains(this,targets[i])){return true;}}});},closest:function closest(selectors,context){var cur,i=0,l=this.length,matched=[],targets=typeof selectors!=="string"&&jQuery(selectors);// Positional selectors never match, since there's no _selection_ context
if(!rneedsContext.test(selectors)){for(;i<l;i++){for(cur=this[i];cur&&cur!==context;cur=cur.parentNode){// Always skip document fragments
if(cur.nodeType<11&&(targets?targets.index(cur)>-1:// Don't pass non-elements to Sizzle
cur.nodeType===1&&jQuery.find.matchesSelector(cur,selectors))){matched.push(cur);break;}}}}return this.pushStack(matched.length>1?jQuery.uniqueSort(matched):matched);},// Determine the position of an element within the set
index:function index(elem){// No argument, return index in parent
if(!elem){return this[0]&&this[0].parentNode?this.first().prevAll().length:-1;}// Index in selector
if(typeof elem==="string"){return indexOf.call(jQuery(elem),this[0]);}// Locate the position of the desired element
return indexOf.call(this,// If it receives a jQuery object, the first element is used
elem.jquery?elem[0]:elem);},add:function add(selector,context){return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(),jQuery(selector,context))));},addBack:function addBack(selector){return this.add(selector==null?this.prevObject:this.prevObject.filter(selector));}});function sibling(cur,dir){while((cur=cur[dir])&&cur.nodeType!==1){}return cur;}jQuery.each({parent:function parent(elem){var parent=elem.parentNode;return parent&&parent.nodeType!==11?parent:null;},parents:function parents(elem){return dir(elem,"parentNode");},parentsUntil:function parentsUntil(elem,i,until){return dir(elem,"parentNode",until);},next:function next(elem){return sibling(elem,"nextSibling");},prev:function prev(elem){return sibling(elem,"previousSibling");},nextAll:function nextAll(elem){return dir(elem,"nextSibling");},prevAll:function prevAll(elem){return dir(elem,"previousSibling");},nextUntil:function nextUntil(elem,i,until){return dir(elem,"nextSibling",until);},prevUntil:function prevUntil(elem,i,until){return dir(elem,"previousSibling",until);},siblings:function siblings(elem){return _siblings((elem.parentNode||{}).firstChild,elem);},children:function children(elem){return _siblings(elem.firstChild);},contents:function contents(elem){if(nodeName(elem,"iframe")){return elem.contentDocument;}// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
// Treat the template element as a regular one in browsers that
// don't support it.
if(nodeName(elem,"template")){elem=elem.content||elem;}return jQuery.merge([],elem.childNodes);}},function(name,fn){jQuery.fn[name]=function(until,selector){var matched=jQuery.map(this,fn,until);if(name.slice(-5)!=="Until"){selector=until;}if(selector&&typeof selector==="string"){matched=jQuery.filter(selector,matched);}if(this.length>1){// Remove duplicates
if(!guaranteedUnique[name]){jQuery.uniqueSort(matched);}// Reverse order for parents* and prev-derivatives
if(rparentsprev.test(name)){matched.reverse();}}return this.pushStack(matched);};});var rnothtmlwhite=/[^\x20\t\r\n\f]+/g;// Convert String-formatted options into Object-formatted ones
function createOptions(options){var object={};jQuery.each(options.match(rnothtmlwhite)||[],function(_,flag){object[flag]=true;});return object;}/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */jQuery.Callbacks=function(options){// Convert options from String-formatted to Object-formatted if needed
// (we check in cache first)
options=typeof options==="string"?createOptions(options):jQuery.extend({},options);var// Flag to know if list is currently firing
firing,// Last fire value for non-forgettable lists
memory,// Flag to know if list was already fired
_fired,// Flag to prevent firing
_locked,// Actual callback list
list=[],// Queue of execution data for repeatable lists
queue=[],// Index of currently firing callback (modified by add/remove as needed)
firingIndex=-1,// Fire callbacks
fire=function fire(){// Enforce single-firing
_locked=_locked||options.once;// Execute callbacks for all pending executions,
// respecting firingIndex overrides and runtime changes
_fired=firing=true;for(;queue.length;firingIndex=-1){memory=queue.shift();while(++firingIndex<list.length){// Run callback and check for early termination
if(list[firingIndex].apply(memory[0],memory[1])===false&&options.stopOnFalse){// Jump to end and forget the data so .add doesn't re-fire
firingIndex=list.length;memory=false;}}}// Forget the data if we're done with it
if(!options.memory){memory=false;}firing=false;// Clean up if we're done firing for good
if(_locked){// Keep an empty list if we have data for future add calls
if(memory){list=[];// Otherwise, this object is spent
}else{list="";}}},// Actual Callbacks object
self={// Add a callback or a collection of callbacks to the list
add:function add(){if(list){// If we have memory from a past run, we should fire after adding
if(memory&&!firing){firingIndex=list.length-1;queue.push(memory);}(function add(args){jQuery.each(args,function(_,arg){if(jQuery.isFunction(arg)){if(!options.unique||!self.has(arg)){list.push(arg);}}else if(arg&&arg.length&&jQuery.type(arg)!=="string"){// Inspect recursively
add(arg);}});})(arguments);if(memory&&!firing){fire();}}return this;},// Remove a callback from the list
remove:function remove(){jQuery.each(arguments,function(_,arg){var index;while((index=jQuery.inArray(arg,list,index))>-1){list.splice(index,1);// Handle firing indexes
if(index<=firingIndex){firingIndex--;}}});return this;},// Check if a given callback is in the list.
// If no argument is given, return whether or not list has callbacks attached.
has:function has(fn){return fn?jQuery.inArray(fn,list)>-1:list.length>0;},// Remove all callbacks from the list
empty:function empty(){if(list){list=[];}return this;},// Disable .fire and .add
// Abort any current/pending executions
// Clear all callbacks and values
disable:function disable(){_locked=queue=[];list=memory="";return this;},disabled:function disabled(){return!list;},// Disable .fire
// Also disable .add unless we have memory (since it would have no effect)
// Abort any pending executions
lock:function lock(){_locked=queue=[];if(!memory&&!firing){list=memory="";}return this;},locked:function locked(){return!!_locked;},// Call all callbacks with the given context and arguments
fireWith:function fireWith(context,args){if(!_locked){args=args||[];args=[context,args.slice?args.slice():args];queue.push(args);if(!firing){fire();}}return this;},// Call all the callbacks with the given arguments
fire:function fire(){self.fireWith(this,arguments);return this;},// To know if the callbacks have already been called at least once
fired:function fired(){return!!_fired;}};return self;};function Identity(v){return v;}function Thrower(ex){throw ex;}function adoptValue(value,resolve,reject,noValue){var method;try{// Check for promise aspect first to privilege synchronous behavior
if(value&&jQuery.isFunction(method=value.promise)){method.call(value).done(resolve).fail(reject);// Other thenables
}else if(value&&jQuery.isFunction(method=value.then)){method.call(value,resolve,reject);// Other non-thenables
}else{// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
// * false: [ value ].slice( 0 ) => resolve( value )
// * true: [ value ].slice( 1 ) => resolve()
resolve.apply(undefined,[value].slice(noValue));}// For Promises/A+, convert exceptions into rejections
// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
// Deferred#then to conditionally suppress rejection.
}catch(value){// Support: Android 4.0 only
// Strict mode functions invoked without .call/.apply get global-object context
reject.apply(undefined,[value]);}}jQuery.extend({Deferred:function Deferred(func){var tuples=[// action, add listener, callbacks,
// ... .then handlers, argument index, [final state]
["notify","progress",jQuery.Callbacks("memory"),jQuery.Callbacks("memory"),2],["resolve","done",jQuery.Callbacks("once memory"),jQuery.Callbacks("once memory"),0,"resolved"],["reject","fail",jQuery.Callbacks("once memory"),jQuery.Callbacks("once memory"),1,"rejected"]],_state="pending",_promise={state:function state(){return _state;},always:function always(){deferred.done(arguments).fail(arguments);return this;},"catch":function _catch(fn){return _promise.then(null,fn);},// Keep pipe for back-compat
pipe:function pipe()/* fnDone, fnFail, fnProgress */{var fns=arguments;return jQuery.Deferred(function(newDefer){jQuery.each(tuples,function(i,tuple){// Map tuples (progress, done, fail) to arguments (done, fail, progress)
var fn=jQuery.isFunction(fns[tuple[4]])&&fns[tuple[4]];// deferred.progress(function() { bind to newDefer or newDefer.notify })
// deferred.done(function() { bind to newDefer or newDefer.resolve })
// deferred.fail(function() { bind to newDefer or newDefer.reject })
deferred[tuple[1]](function(){var returned=fn&&fn.apply(this,arguments);if(returned&&jQuery.isFunction(returned.promise)){returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);}else{newDefer[tuple[0]+"With"](this,fn?[returned]:arguments);}});});fns=null;}).promise();},then:function then(onFulfilled,onRejected,onProgress){var maxDepth=0;function resolve(depth,deferred,handler,special){return function(){var that=this,args=arguments,mightThrow=function mightThrow(){var returned,then;// Support: Promises/A+ section 2.3.3.3.3
// https://promisesaplus.com/#point-59
// Ignore double-resolution attempts
if(depth<maxDepth){return;}returned=handler.apply(that,args);// Support: Promises/A+ section 2.3.1
// https://promisesaplus.com/#point-48
if(returned===deferred.promise()){throw new TypeError("Thenable self-resolution");}// Support: Promises/A+ sections 2.3.3.1, 3.5
// https://promisesaplus.com/#point-54
// https://promisesaplus.com/#point-75
// Retrieve `then` only once
then=returned&&(// Support: Promises/A+ section 2.3.4
// https://promisesaplus.com/#point-64
// Only check objects and functions for thenability
(typeof returned==="undefined"?"undefined":_typeof(returned))==="object"||typeof returned==="function")&&returned.then;// Handle a returned thenable
if(jQuery.isFunction(then)){// Special processors (notify) just wait for resolution
if(special){then.call(returned,resolve(maxDepth,deferred,Identity,special),resolve(maxDepth,deferred,Thrower,special));// Normal processors (resolve) also hook into progress
}else{// ...and disregard older resolution values
maxDepth++;then.call(returned,resolve(maxDepth,deferred,Identity,special),resolve(maxDepth,deferred,Thrower,special),resolve(maxDepth,deferred,Identity,deferred.notifyWith));}// Handle all other returned values
}else{// Only substitute handlers pass on context
// and multiple values (non-spec behavior)
if(handler!==Identity){that=undefined;args=[returned];}// Process the value(s)
// Default process is resolve
(special||deferred.resolveWith)(that,args);}},// Only normal processors (resolve) catch and reject exceptions
process=special?mightThrow:function(){try{mightThrow();}catch(e){if(jQuery.Deferred.exceptionHook){jQuery.Deferred.exceptionHook(e,process.stackTrace);}// Support: Promises/A+ section 2.3.3.3.4.1
// https://promisesaplus.com/#point-61
// Ignore post-resolution exceptions
if(depth+1>=maxDepth){// Only substitute handlers pass on context
// and multiple values (non-spec behavior)
if(handler!==Thrower){that=undefined;args=[e];}deferred.rejectWith(that,args);}}};// Support: Promises/A+ section 2.3.3.3.1
// https://promisesaplus.com/#point-57
// Re-resolve promises immediately to dodge false rejection from
// subsequent errors
if(depth){process();}else{// Call an optional hook to record the stack, in case of exception
// since it's otherwise lost when execution goes async
if(jQuery.Deferred.getStackHook){process.stackTrace=jQuery.Deferred.getStackHook();}window.setTimeout(process);}};}return jQuery.Deferred(function(newDefer){// progress_handlers.add( ... )
tuples[0][3].add(resolve(0,newDefer,jQuery.isFunction(onProgress)?onProgress:Identity,newDefer.notifyWith));// fulfilled_handlers.add( ... )
tuples[1][3].add(resolve(0,newDefer,jQuery.isFunction(onFulfilled)?onFulfilled:Identity));// rejected_handlers.add( ... )
tuples[2][3].add(resolve(0,newDefer,jQuery.isFunction(onRejected)?onRejected:Thrower));}).promise();},// Get a promise for this deferred
// If obj is provided, the promise aspect is added to the object
promise:function promise(obj){return obj!=null?jQuery.extend(obj,_promise):_promise;}},deferred={};// Add list-specific methods
jQuery.each(tuples,function(i,tuple){var list=tuple[2],stateString=tuple[5];// promise.progress = list.add
// promise.done = list.add
// promise.fail = list.add
_promise[tuple[1]]=list.add;// Handle state
if(stateString){list.add(function(){// state = "resolved" (i.e., fulfilled)
// state = "rejected"
_state=stateString;},// rejected_callbacks.disable
// fulfilled_callbacks.disable
tuples[3-i][2].disable,// progress_callbacks.lock
tuples[0][2].lock);}// progress_handlers.fire
// fulfilled_handlers.fire
// rejected_handlers.fire
list.add(tuple[3].fire);// deferred.notify = function() { deferred.notifyWith(...) }
// deferred.resolve = function() { deferred.resolveWith(...) }
// deferred.reject = function() { deferred.rejectWith(...) }
deferred[tuple[0]]=function(){deferred[tuple[0]+"With"](this===deferred?undefined:this,arguments);return this;};// deferred.notifyWith = list.fireWith
// deferred.resolveWith = list.fireWith
// deferred.rejectWith = list.fireWith
deferred[tuple[0]+"With"]=list.fireWith;});// Make the deferred a promise
_promise.promise(deferred);// Call given func if any
if(func){func.call(deferred,deferred);}// All done!
return deferred;},// Deferred helper
when:function when(singleValue){var// count of uncompleted subordinates
remaining=arguments.length,// count of unprocessed arguments
i=remaining,// subordinate fulfillment data
resolveContexts=Array(i),resolveValues=_slice.call(arguments),// the master Deferred
master=jQuery.Deferred(),// subordinate callback factory
updateFunc=function updateFunc(i){return function(value){resolveContexts[i]=this;resolveValues[i]=arguments.length>1?_slice.call(arguments):value;if(! --remaining){master.resolveWith(resolveContexts,resolveValues);}};};// Single- and empty arguments are adopted like Promise.resolve
if(remaining<=1){adoptValue(singleValue,master.done(updateFunc(i)).resolve,master.reject,!remaining);// Use .then() to unwrap secondary thenables (cf. gh-3000)
if(master.state()==="pending"||jQuery.isFunction(resolveValues[i]&&resolveValues[i].then)){return master.then();}}// Multiple arguments are aggregated like Promise.all array elements
while(i--){adoptValue(resolveValues[i],updateFunc(i),master.reject);}return master.promise();}});// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;jQuery.Deferred.exceptionHook=function(error,stack){// Support: IE 8 - 9 only
// Console exists when dev tools are open, which can happen at any time
if(window.console&&window.console.warn&&error&&rerrorNames.test(error.name)){window.console.warn("jQuery.Deferred exception: "+error.message,error.stack,stack);}};jQuery.readyException=function(error){window.setTimeout(function(){throw error;});};// The deferred used on DOM ready
var readyList=jQuery.Deferred();jQuery.fn.ready=function(fn){readyList.then(fn)// Wrap jQuery.readyException in a function so that the lookup
// happens at the time of error handling instead of callback
// registration.
.catch(function(error){jQuery.readyException(error);});return this;};jQuery.extend({// Is the DOM ready to be used? Set to true once it occurs.
isReady:false,// A counter to track how many items to wait for before
// the ready event fires. See #6781
readyWait:1,// Handle when the DOM is ready
ready:function ready(wait){// Abort if there are pending holds or we're already ready
if(wait===true?--jQuery.readyWait:jQuery.isReady){return;}// Remember that the DOM is ready
jQuery.isReady=true;// If a normal DOM Ready event fired, decrement, and wait if need be
if(wait!==true&&--jQuery.readyWait>0){return;}// If there are functions bound, to execute
readyList.resolveWith(document,[jQuery]);}});jQuery.ready.then=readyList.then;// The ready event handler and self cleanup method
function completed(){document.removeEventListener("DOMContentLoaded",completed);window.removeEventListener("load",completed);jQuery.ready();}// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if(document.readyState==="complete"||document.readyState!=="loading"&&!document.documentElement.doScroll){// Handle it asynchronously to allow scripts the opportunity to delay ready
window.setTimeout(jQuery.ready);}else{// Use the handy event callback
document.addEventListener("DOMContentLoaded",completed);// A fallback to window.onload, that will always work
window.addEventListener("load",completed);}// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access=function access(elems,fn,key,value,chainable,emptyGet,raw){var i=0,len=elems.length,bulk=key==null;// Sets many values
if(jQuery.type(key)==="object"){chainable=true;for(i in key){access(elems,fn,i,key[i],true,emptyGet,raw);}// Sets one value
}else if(value!==undefined){chainable=true;if(!jQuery.isFunction(value)){raw=true;}if(bulk){// Bulk operations run against the entire set
if(raw){fn.call(elems,value);fn=null;// ...except when executing function values
}else{bulk=fn;fn=function fn(elem,key,value){return bulk.call(jQuery(elem),value);};}}if(fn){for(;i<len;i++){fn(elems[i],key,raw?value:value.call(elems[i],i,fn(elems[i],key)));}}}if(chainable){return elems;}// Gets
if(bulk){return fn.call(elems);}return len?fn(elems[0],key):emptyGet;};var acceptData=function acceptData(owner){// Accepts only:
//  - Node
//    - Node.ELEMENT_NODE
//    - Node.DOCUMENT_NODE
//  - Object
//    - Any
return owner.nodeType===1||owner.nodeType===9||!+owner.nodeType;};function Data(){this.expando=jQuery.expando+Data.uid++;}Data.uid=1;Data.prototype={cache:function cache(owner){// Check if the owner object already has a cache
var value=owner[this.expando];// If not, create one
if(!value){value={};// We can accept data for non-element nodes in modern browsers,
// but we should not, see #8335.
// Always return an empty object.
if(acceptData(owner)){// If it is a node unlikely to be stringify-ed or looped over
// use plain assignment
if(owner.nodeType){owner[this.expando]=value;// Otherwise secure it in a non-enumerable property
// configurable must be true to allow the property to be
// deleted when data is removed
}else{Object.defineProperty(owner,this.expando,{value:value,configurable:true});}}}return value;},set:function set(owner,data,value){var prop,cache=this.cache(owner);// Handle: [ owner, key, value ] args
// Always use camelCase key (gh-2257)
if(typeof data==="string"){cache[jQuery.camelCase(data)]=value;// Handle: [ owner, { properties } ] args
}else{// Copy the properties one-by-one to the cache object
for(prop in data){cache[jQuery.camelCase(prop)]=data[prop];}}return cache;},get:function get(owner,key){return key===undefined?this.cache(owner):// Always use camelCase key (gh-2257)
owner[this.expando]&&owner[this.expando][jQuery.camelCase(key)];},access:function access(owner,key,value){// In cases where either:
//
//   1. No key was specified
//   2. A string key was specified, but no value provided
//
// Take the "read" path and allow the get method to determine
// which value to return, respectively either:
//
//   1. The entire cache object
//   2. The data stored at the key
//
if(key===undefined||key&&typeof key==="string"&&value===undefined){return this.get(owner,key);}// When the key is not a string, or both a key and value
// are specified, set or extend (existing objects) with either:
//
//   1. An object of properties
//   2. A key and value
//
this.set(owner,key,value);// Since the "set" path can have two possible entry points
// return the expected data based on which path was taken[*]
return value!==undefined?value:key;},remove:function remove(owner,key){var i,cache=owner[this.expando];if(cache===undefined){return;}if(key!==undefined){// Support array or space separated string of keys
if(Array.isArray(key)){// If key is an array of keys...
// We always set camelCase keys, so remove that.
key=key.map(jQuery.camelCase);}else{key=jQuery.camelCase(key);// If a key with the spaces exists, use it.
// Otherwise, create an array by matching non-whitespace
key=key in cache?[key]:key.match(rnothtmlwhite)||[];}i=key.length;while(i--){delete cache[key[i]];}}// Remove the expando if there's no more data
if(key===undefined||jQuery.isEmptyObject(cache)){// Support: Chrome <=35 - 45
// Webkit & Blink performance suffers when deleting properties
// from DOM nodes, so set to undefined instead
// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
if(owner.nodeType){owner[this.expando]=undefined;}else{delete owner[this.expando];}}},hasData:function hasData(owner){var cache=owner[this.expando];return cache!==undefined&&!jQuery.isEmptyObject(cache);}};var dataPriv=new Data();var dataUser=new Data();//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014
var rbrace=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,rmultiDash=/[A-Z]/g;function getData(data){if(data==="true"){return true;}if(data==="false"){return false;}if(data==="null"){return null;}// Only convert to a number if it doesn't change the string
if(data===+data+""){return+data;}if(rbrace.test(data)){return JSON.parse(data);}return data;}function dataAttr(elem,key,data){var name;// If nothing was found internally, try to fetch any
// data from the HTML5 data-* attribute
if(data===undefined&&elem.nodeType===1){name="data-"+key.replace(rmultiDash,"-$&").toLowerCase();data=elem.getAttribute(name);if(typeof data==="string"){try{data=getData(data);}catch(e){}// Make sure we set the data so it isn't changed later
dataUser.set(elem,key,data);}else{data=undefined;}}return data;}jQuery.extend({hasData:function hasData(elem){return dataUser.hasData(elem)||dataPriv.hasData(elem);},data:function data(elem,name,_data){return dataUser.access(elem,name,_data);},removeData:function removeData(elem,name){dataUser.remove(elem,name);},// TODO: Now that all calls to _data and _removeData have been replaced
// with direct calls to dataPriv methods, these can be deprecated.
_data:function _data(elem,name,data){return dataPriv.access(elem,name,data);},_removeData:function _removeData(elem,name){dataPriv.remove(elem,name);}});jQuery.fn.extend({data:function data(key,value){var i,name,data,elem=this[0],attrs=elem&&elem.attributes;// Gets all values
if(key===undefined){if(this.length){data=dataUser.get(elem);if(elem.nodeType===1&&!dataPriv.get(elem,"hasDataAttrs")){i=attrs.length;while(i--){// Support: IE 11 only
// The attrs elements can be null (#14894)
if(attrs[i]){name=attrs[i].name;if(name.indexOf("data-")===0){name=jQuery.camelCase(name.slice(5));dataAttr(elem,name,data[name]);}}}dataPriv.set(elem,"hasDataAttrs",true);}}return data;}// Sets multiple values
if((typeof key==="undefined"?"undefined":_typeof(key))==="object"){return this.each(function(){dataUser.set(this,key);});}return access(this,function(value){var data;// The calling jQuery object (element matches) is not empty
// (and therefore has an element appears at this[ 0 ]) and the
// `value` parameter was not undefined. An empty jQuery object
// will result in `undefined` for elem = this[ 0 ] which will
// throw an exception if an attempt to read a data cache is made.
if(elem&&value===undefined){// Attempt to get data from the cache
// The key will always be camelCased in Data
data=dataUser.get(elem,key);if(data!==undefined){return data;}// Attempt to "discover" the data in
// HTML5 custom data-* attrs
data=dataAttr(elem,key);if(data!==undefined){return data;}// We tried really hard, but the data doesn't exist.
return;}// Set the data...
this.each(function(){// We always store the camelCased key
dataUser.set(this,key,value);});},null,value,arguments.length>1,null,true);},removeData:function removeData(key){return this.each(function(){dataUser.remove(this,key);});}});jQuery.extend({queue:function queue(elem,type,data){var queue;if(elem){type=(type||"fx")+"queue";queue=dataPriv.get(elem,type);// Speed up dequeue by getting out quickly if this is just a lookup
if(data){if(!queue||Array.isArray(data)){queue=dataPriv.access(elem,type,jQuery.makeArray(data));}else{queue.push(data);}}return queue||[];}},dequeue:function dequeue(elem,type){type=type||"fx";var queue=jQuery.queue(elem,type),startLength=queue.length,fn=queue.shift(),hooks=jQuery._queueHooks(elem,type),next=function next(){jQuery.dequeue(elem,type);};// If the fx queue is dequeued, always remove the progress sentinel
if(fn==="inprogress"){fn=queue.shift();startLength--;}if(fn){// Add a progress sentinel to prevent the fx queue from being
// automatically dequeued
if(type==="fx"){queue.unshift("inprogress");}// Clear up the last queue stop function
delete hooks.stop;fn.call(elem,next,hooks);}if(!startLength&&hooks){hooks.empty.fire();}},// Not public - generate a queueHooks object, or return the current one
_queueHooks:function _queueHooks(elem,type){var key=type+"queueHooks";return dataPriv.get(elem,key)||dataPriv.access(elem,key,{empty:jQuery.Callbacks("once memory").add(function(){dataPriv.remove(elem,[type+"queue",key]);})});}});jQuery.fn.extend({queue:function queue(type,data){var setter=2;if(typeof type!=="string"){data=type;type="fx";setter--;}if(arguments.length<setter){return jQuery.queue(this[0],type);}return data===undefined?this:this.each(function(){var queue=jQuery.queue(this,type,data);// Ensure a hooks for this queue
jQuery._queueHooks(this,type);if(type==="fx"&&queue[0]!=="inprogress"){jQuery.dequeue(this,type);}});},dequeue:function dequeue(type){return this.each(function(){jQuery.dequeue(this,type);});},clearQueue:function clearQueue(type){return this.queue(type||"fx",[]);},// Get a promise resolved when queues of a certain type
// are emptied (fx is the type by default)
promise:function promise(type,obj){var tmp,count=1,defer=jQuery.Deferred(),elements=this,i=this.length,resolve=function resolve(){if(! --count){defer.resolveWith(elements,[elements]);}};if(typeof type!=="string"){obj=type;type=undefined;}type=type||"fx";while(i--){tmp=dataPriv.get(elements[i],type+"queueHooks");if(tmp&&tmp.empty){count++;tmp.empty.add(resolve);}}resolve();return defer.promise(obj);}});var pnum=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;var rcssNum=new RegExp("^(?:([+-])=|)("+pnum+")([a-z%]*)$","i");var cssExpand=["Top","Right","Bottom","Left"];var isHiddenWithinTree=function isHiddenWithinTree(elem,el){// isHiddenWithinTree might be called from jQuery#filter function;
// in that case, element will be second argument
elem=el||elem;// Inline style trumps all
return elem.style.display==="none"||elem.style.display===""&&// Otherwise, check computed style
// Support: Firefox <=43 - 45
// Disconnected elements can have computed display: none, so first confirm that elem is
// in the document.
jQuery.contains(elem.ownerDocument,elem)&&jQuery.css(elem,"display")==="none";};var swap=function swap(elem,options,callback,args){var ret,name,old={};// Remember the old values, and insert the new ones
for(name in options){old[name]=elem.style[name];elem.style[name]=options[name];}ret=callback.apply(elem,args||[]);// Revert the old values
for(name in options){elem.style[name]=old[name];}return ret;};function adjustCSS(elem,prop,valueParts,tween){var adjusted,scale=1,maxIterations=20,currentValue=tween?function(){return tween.cur();}:function(){return jQuery.css(elem,prop,"");},initial=currentValue(),unit=valueParts&&valueParts[3]||(jQuery.cssNumber[prop]?"":"px"),// Starting value computation is required for potential unit mismatches
initialInUnit=(jQuery.cssNumber[prop]||unit!=="px"&&+initial)&&rcssNum.exec(jQuery.css(elem,prop));if(initialInUnit&&initialInUnit[3]!==unit){// Trust units reported by jQuery.css
unit=unit||initialInUnit[3];// Make sure we update the tween properties later on
valueParts=valueParts||[];// Iteratively approximate from a nonzero starting point
initialInUnit=+initial||1;do{// If previous iteration zeroed out, double until we get *something*.
// Use string for doubling so we don't accidentally see scale as unchanged below
scale=scale||".5";// Adjust and apply
initialInUnit=initialInUnit/scale;jQuery.style(elem,prop,initialInUnit+unit);// Update scale, tolerating zero or NaN from tween.cur()
// Break the loop if scale is unchanged or perfect, or if we've just had enough.
}while(scale!==(scale=currentValue()/initial)&&scale!==1&&--maxIterations);}if(valueParts){initialInUnit=+initialInUnit||+initial||0;// Apply relative offset (+=/-=) if specified
adjusted=valueParts[1]?initialInUnit+(valueParts[1]+1)*valueParts[2]:+valueParts[2];if(tween){tween.unit=unit;tween.start=initialInUnit;tween.end=adjusted;}}return adjusted;}var defaultDisplayMap={};function getDefaultDisplay(elem){var temp,doc=elem.ownerDocument,nodeName=elem.nodeName,display=defaultDisplayMap[nodeName];if(display){return display;}temp=doc.body.appendChild(doc.createElement(nodeName));display=jQuery.css(temp,"display");temp.parentNode.removeChild(temp);if(display==="none"){display="block";}defaultDisplayMap[nodeName]=display;return display;}function showHide(elements,show){var display,elem,values=[],index=0,length=elements.length;// Determine new display value for elements that need to change
for(;index<length;index++){elem=elements[index];if(!elem.style){continue;}display=elem.style.display;if(show){// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
// check is required in this first loop unless we have a nonempty display value (either
// inline or about-to-be-restored)
if(display==="none"){values[index]=dataPriv.get(elem,"display")||null;if(!values[index]){elem.style.display="";}}if(elem.style.display===""&&isHiddenWithinTree(elem)){values[index]=getDefaultDisplay(elem);}}else{if(display!=="none"){values[index]="none";// Remember what we're overwriting
dataPriv.set(elem,"display",display);}}}// Set the display of the elements in a second loop to avoid constant reflow
for(index=0;index<length;index++){if(values[index]!=null){elements[index].style.display=values[index];}}return elements;}jQuery.fn.extend({show:function show(){return showHide(this,true);},hide:function hide(){return showHide(this);},toggle:function toggle(state){if(typeof state==="boolean"){return state?this.show():this.hide();}return this.each(function(){if(isHiddenWithinTree(this)){jQuery(this).show();}else{jQuery(this).hide();}});}});var rcheckableType=/^(?:checkbox|radio)$/i;var rtagName=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i;var rscriptType=/^$|\/(?:java|ecma)script/i;// We have to close these tags to support XHTML (#13200)
var wrapMap={// Support: IE <=9 only
option:[1,"<select multiple='multiple'>","</select>"],// XHTML parsers do not magically insert elements in the
// same way that tag soup parsers do. So we cannot shorten
// this by omitting <tbody> or other required elements.
thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};// Support: IE <=9 only
wrapMap.optgroup=wrapMap.option;wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;wrapMap.th=wrapMap.td;function getAll(context,tag){// Support: IE <=9 - 11 only
// Use typeof to avoid zero-argument method invocation on host objects (#15151)
var ret;if(typeof context.getElementsByTagName!=="undefined"){ret=context.getElementsByTagName(tag||"*");}else if(typeof context.querySelectorAll!=="undefined"){ret=context.querySelectorAll(tag||"*");}else{ret=[];}if(tag===undefined||tag&&nodeName(context,tag)){return jQuery.merge([context],ret);}return ret;}// Mark scripts as having already been evaluated
function setGlobalEval(elems,refElements){var i=0,l=elems.length;for(;i<l;i++){dataPriv.set(elems[i],"globalEval",!refElements||dataPriv.get(refElements[i],"globalEval"));}}var rhtml=/<|&#?\w+;/;function buildFragment(elems,context,scripts,selection,ignored){var elem,tmp,tag,wrap,contains,j,fragment=context.createDocumentFragment(),nodes=[],i=0,l=elems.length;for(;i<l;i++){elem=elems[i];if(elem||elem===0){// Add nodes directly
if(jQuery.type(elem)==="object"){// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge(nodes,elem.nodeType?[elem]:elem);// Convert non-html into a text node
}else if(!rhtml.test(elem)){nodes.push(context.createTextNode(elem));// Convert html into DOM nodes
}else{tmp=tmp||fragment.appendChild(context.createElement("div"));// Deserialize a standard representation
tag=(rtagName.exec(elem)||["",""])[1].toLowerCase();wrap=wrapMap[tag]||wrapMap._default;tmp.innerHTML=wrap[1]+jQuery.htmlPrefilter(elem)+wrap[2];// Descend through wrappers to the right content
j=wrap[0];while(j--){tmp=tmp.lastChild;}// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge(nodes,tmp.childNodes);// Remember the top-level container
tmp=fragment.firstChild;// Ensure the created nodes are orphaned (#12392)
tmp.textContent="";}}}// Remove wrapper from fragment
fragment.textContent="";i=0;while(elem=nodes[i++]){// Skip elements already in the context collection (trac-4087)
if(selection&&jQuery.inArray(elem,selection)>-1){if(ignored){ignored.push(elem);}continue;}contains=jQuery.contains(elem.ownerDocument,elem);// Append to fragment
tmp=getAll(fragment.appendChild(elem),"script");// Preserve script evaluation history
if(contains){setGlobalEval(tmp);}// Capture executables
if(scripts){j=0;while(elem=tmp[j++]){if(rscriptType.test(elem.type||"")){scripts.push(elem);}}}}return fragment;}(function(){var fragment=document.createDocumentFragment(),div=fragment.appendChild(document.createElement("div")),input=document.createElement("input");// Support: Android 4.0 - 4.3 only
// Check state lost if the name is set (#11217)
// Support: Windows Web Apps (WWA)
// `name` and `type` must use .setAttribute for WWA (#14901)
input.setAttribute("type","radio");input.setAttribute("checked","checked");input.setAttribute("name","t");div.appendChild(input);// Support: Android <=4.1 only
// Older WebKit doesn't clone checked state correctly in fragments
support.checkClone=div.cloneNode(true).cloneNode(true).lastChild.checked;// Support: IE <=11 only
// Make sure textarea (and checkbox) defaultValue is properly cloned
div.innerHTML="<textarea>x</textarea>";support.noCloneChecked=!!div.cloneNode(true).lastChild.defaultValue;})();var documentElement=document.documentElement;var rkeyEvent=/^key/,rmouseEvent=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,rtypenamespace=/^([^.]*)(?:\.(.+)|)/;function returnTrue(){return true;}function returnFalse(){return false;}// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement(){try{return document.activeElement;}catch(err){}}function _on(elem,types,selector,data,fn,one){var origFn,type;// Types can be a map of types/handlers
if((typeof types==="undefined"?"undefined":_typeof(types))==="object"){// ( types-Object, selector, data )
if(typeof selector!=="string"){// ( types-Object, data )
data=data||selector;selector=undefined;}for(type in types){_on(elem,type,selector,data,types[type],one);}return elem;}if(data==null&&fn==null){// ( types, fn )
fn=selector;data=selector=undefined;}else if(fn==null){if(typeof selector==="string"){// ( types, selector, fn )
fn=data;data=undefined;}else{// ( types, data, fn )
fn=data;data=selector;selector=undefined;}}if(fn===false){fn=returnFalse;}else if(!fn){return elem;}if(one===1){origFn=fn;fn=function fn(event){// Can use an empty set, since event contains the info
jQuery().off(event);return origFn.apply(this,arguments);};// Use same guid so caller can remove using origFn
fn.guid=origFn.guid||(origFn.guid=jQuery.guid++);}return elem.each(function(){jQuery.event.add(this,types,fn,data,selector);});}/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */jQuery.event={global:{},add:function add(elem,types,handler,data,selector){var handleObjIn,eventHandle,tmp,events,t,handleObj,special,handlers,type,namespaces,origType,elemData=dataPriv.get(elem);// Don't attach events to noData or text/comment nodes (but allow plain objects)
if(!elemData){return;}// Caller can pass in an object of custom data in lieu of the handler
if(handler.handler){handleObjIn=handler;handler=handleObjIn.handler;selector=handleObjIn.selector;}// Ensure that invalid selectors throw exceptions at attach time
// Evaluate against documentElement in case elem is a non-element node (e.g., document)
if(selector){jQuery.find.matchesSelector(documentElement,selector);}// Make sure that the handler has a unique ID, used to find/remove it later
if(!handler.guid){handler.guid=jQuery.guid++;}// Init the element's event structure and main handler, if this is the first
if(!(events=elemData.events)){events=elemData.events={};}if(!(eventHandle=elemData.handle)){eventHandle=elemData.handle=function(e){// Discard the second event of a jQuery.event.trigger() and
// when an event is called after a page has unloaded
return typeof jQuery!=="undefined"&&jQuery.event.triggered!==e.type?jQuery.event.dispatch.apply(elem,arguments):undefined;};}// Handle multiple events separated by a space
types=(types||"").match(rnothtmlwhite)||[""];t=types.length;while(t--){tmp=rtypenamespace.exec(types[t])||[];type=origType=tmp[1];namespaces=(tmp[2]||"").split(".").sort();// There *must* be a type, no attaching namespace-only handlers
if(!type){continue;}// If event changes its type, use the special event handlers for the changed type
special=jQuery.event.special[type]||{};// If selector defined, determine special event api type, otherwise given type
type=(selector?special.delegateType:special.bindType)||type;// Update special based on newly reset type
special=jQuery.event.special[type]||{};// handleObj is passed to all event handlers
handleObj=jQuery.extend({type:type,origType:origType,data:data,handler:handler,guid:handler.guid,selector:selector,needsContext:selector&&jQuery.expr.match.needsContext.test(selector),namespace:namespaces.join(".")},handleObjIn);// Init the event handler queue if we're the first
if(!(handlers=events[type])){handlers=events[type]=[];handlers.delegateCount=0;// Only use addEventListener if the special events handler returns false
if(!special.setup||special.setup.call(elem,data,namespaces,eventHandle)===false){if(elem.addEventListener){elem.addEventListener(type,eventHandle);}}}if(special.add){special.add.call(elem,handleObj);if(!handleObj.handler.guid){handleObj.handler.guid=handler.guid;}}// Add to the element's handler list, delegates in front
if(selector){handlers.splice(handlers.delegateCount++,0,handleObj);}else{handlers.push(handleObj);}// Keep track of which events have ever been used, for event optimization
jQuery.event.global[type]=true;}},// Detach an event or set of events from an element
remove:function remove(elem,types,handler,selector,mappedTypes){var j,origCount,tmp,events,t,handleObj,special,handlers,type,namespaces,origType,elemData=dataPriv.hasData(elem)&&dataPriv.get(elem);if(!elemData||!(events=elemData.events)){return;}// Once for each type.namespace in types; type may be omitted
types=(types||"").match(rnothtmlwhite)||[""];t=types.length;while(t--){tmp=rtypenamespace.exec(types[t])||[];type=origType=tmp[1];namespaces=(tmp[2]||"").split(".").sort();// Unbind all events (on this namespace, if provided) for the element
if(!type){for(type in events){jQuery.event.remove(elem,type+types[t],handler,selector,true);}continue;}special=jQuery.event.special[type]||{};type=(selector?special.delegateType:special.bindType)||type;handlers=events[type]||[];tmp=tmp[2]&&new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.|)")+"(\\.|$)");// Remove matching events
origCount=j=handlers.length;while(j--){handleObj=handlers[j];if((mappedTypes||origType===handleObj.origType)&&(!handler||handler.guid===handleObj.guid)&&(!tmp||tmp.test(handleObj.namespace))&&(!selector||selector===handleObj.selector||selector==="**"&&handleObj.selector)){handlers.splice(j,1);if(handleObj.selector){handlers.delegateCount--;}if(special.remove){special.remove.call(elem,handleObj);}}}// Remove generic event handler if we removed something and no more handlers exist
// (avoids potential for endless recursion during removal of special event handlers)
if(origCount&&!handlers.length){if(!special.teardown||special.teardown.call(elem,namespaces,elemData.handle)===false){jQuery.removeEvent(elem,type,elemData.handle);}delete events[type];}}// Remove data and the expando if it's no longer used
if(jQuery.isEmptyObject(events)){dataPriv.remove(elem,"handle events");}},dispatch:function dispatch(nativeEvent){// Make a writable jQuery.Event from the native event object
var event=jQuery.event.fix(nativeEvent);var i,j,ret,matched,handleObj,handlerQueue,args=new Array(arguments.length),handlers=(dataPriv.get(this,"events")||{})[event.type]||[],special=jQuery.event.special[event.type]||{};// Use the fix-ed jQuery.Event rather than the (read-only) native event
args[0]=event;for(i=1;i<arguments.length;i++){args[i]=arguments[i];}event.delegateTarget=this;// Call the preDispatch hook for the mapped type, and let it bail if desired
if(special.preDispatch&&special.preDispatch.call(this,event)===false){return;}// Determine handlers
handlerQueue=jQuery.event.handlers.call(this,event,handlers);// Run delegates first; they may want to stop propagation beneath us
i=0;while((matched=handlerQueue[i++])&&!event.isPropagationStopped()){event.currentTarget=matched.elem;j=0;while((handleObj=matched.handlers[j++])&&!event.isImmediatePropagationStopped()){// Triggered event must either 1) have no namespace, or 2) have namespace(s)
// a subset or equal to those in the bound event (both can have no namespace).
if(!event.rnamespace||event.rnamespace.test(handleObj.namespace)){event.handleObj=handleObj;event.data=handleObj.data;ret=((jQuery.event.special[handleObj.origType]||{}).handle||handleObj.handler).apply(matched.elem,args);if(ret!==undefined){if((event.result=ret)===false){event.preventDefault();event.stopPropagation();}}}}}// Call the postDispatch hook for the mapped type
if(special.postDispatch){special.postDispatch.call(this,event);}return event.result;},handlers:function handlers(event,_handlers){var i,handleObj,sel,matchedHandlers,matchedSelectors,handlerQueue=[],delegateCount=_handlers.delegateCount,cur=event.target;// Find delegate handlers
if(delegateCount&&// Support: IE <=9
// Black-hole SVG <use> instance trees (trac-13180)
cur.nodeType&&// Support: Firefox <=42
// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
// Support: IE 11 only
// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
!(event.type==="click"&&event.button>=1)){for(;cur!==this;cur=cur.parentNode||this){// Don't check non-elements (#13208)
// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
if(cur.nodeType===1&&!(event.type==="click"&&cur.disabled===true)){matchedHandlers=[];matchedSelectors={};for(i=0;i<delegateCount;i++){handleObj=_handlers[i];// Don't conflict with Object.prototype properties (#13203)
sel=handleObj.selector+" ";if(matchedSelectors[sel]===undefined){matchedSelectors[sel]=handleObj.needsContext?jQuery(sel,this).index(cur)>-1:jQuery.find(sel,this,null,[cur]).length;}if(matchedSelectors[sel]){matchedHandlers.push(handleObj);}}if(matchedHandlers.length){handlerQueue.push({elem:cur,handlers:matchedHandlers});}}}}// Add the remaining (directly-bound) handlers
cur=this;if(delegateCount<_handlers.length){handlerQueue.push({elem:cur,handlers:_handlers.slice(delegateCount)});}return handlerQueue;},addProp:function addProp(name,hook){Object.defineProperty(jQuery.Event.prototype,name,{enumerable:true,configurable:true,get:jQuery.isFunction(hook)?function(){if(this.originalEvent){return hook(this.originalEvent);}}:function(){if(this.originalEvent){return this.originalEvent[name];}},set:function set(value){Object.defineProperty(this,name,{enumerable:true,configurable:true,writable:true,value:value});}});},fix:function fix(originalEvent){return originalEvent[jQuery.expando]?originalEvent:new jQuery.Event(originalEvent);},special:{load:{// Prevent triggered image.load events from bubbling to window.load
noBubble:true},focus:{// Fire native event if possible so blur/focus sequence is correct
trigger:function trigger(){if(this!==safeActiveElement()&&this.focus){this.focus();return false;}},delegateType:"focusin"},blur:{trigger:function trigger(){if(this===safeActiveElement()&&this.blur){this.blur();return false;}},delegateType:"focusout"},click:{// For checkbox, fire native event so checked state will be right
trigger:function trigger(){if(this.type==="checkbox"&&this.click&&nodeName(this,"input")){this.click();return false;}},// For cross-browser consistency, don't fire native .click() on links
_default:function _default(event){return nodeName(event.target,"a");}},beforeunload:{postDispatch:function postDispatch(event){// Support: Firefox 20+
// Firefox doesn't alert if the returnValue field is not set.
if(event.result!==undefined&&event.originalEvent){event.originalEvent.returnValue=event.result;}}}}};jQuery.removeEvent=function(elem,type,handle){// This "if" is needed for plain objects
if(elem.removeEventListener){elem.removeEventListener(type,handle);}};jQuery.Event=function(src,props){// Allow instantiation without the 'new' keyword
if(!(this instanceof jQuery.Event)){return new jQuery.Event(src,props);}// Event object
if(src&&src.type){this.originalEvent=src;this.type=src.type;// Events bubbling up the document may have been marked as prevented
// by a handler lower down the tree; reflect the correct value.
this.isDefaultPrevented=src.defaultPrevented||src.defaultPrevented===undefined&&// Support: Android <=2.3 only
src.returnValue===false?returnTrue:returnFalse;// Create target properties
// Support: Safari <=6 - 7 only
// Target should not be a text node (#504, #13143)
this.target=src.target&&src.target.nodeType===3?src.target.parentNode:src.target;this.currentTarget=src.currentTarget;this.relatedTarget=src.relatedTarget;// Event type
}else{this.type=src;}// Put explicitly provided properties onto the event object
if(props){jQuery.extend(this,props);}// Create a timestamp if incoming event doesn't have one
this.timeStamp=src&&src.timeStamp||jQuery.now();// Mark it as fixed
this[jQuery.expando]=true;};// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype={constructor:jQuery.Event,isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse,isSimulated:false,preventDefault:function preventDefault(){var e=this.originalEvent;this.isDefaultPrevented=returnTrue;if(e&&!this.isSimulated){e.preventDefault();}},stopPropagation:function stopPropagation(){var e=this.originalEvent;this.isPropagationStopped=returnTrue;if(e&&!this.isSimulated){e.stopPropagation();}},stopImmediatePropagation:function stopImmediatePropagation(){var e=this.originalEvent;this.isImmediatePropagationStopped=returnTrue;if(e&&!this.isSimulated){e.stopImmediatePropagation();}this.stopPropagation();}};// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each({altKey:true,bubbles:true,cancelable:true,changedTouches:true,ctrlKey:true,detail:true,eventPhase:true,metaKey:true,pageX:true,pageY:true,shiftKey:true,view:true,"char":true,charCode:true,key:true,keyCode:true,button:true,buttons:true,clientX:true,clientY:true,offsetX:true,offsetY:true,pointerId:true,pointerType:true,screenX:true,screenY:true,targetTouches:true,toElement:true,touches:true,which:function which(event){var button=event.button;// Add which for key events
if(event.which==null&&rkeyEvent.test(event.type)){return event.charCode!=null?event.charCode:event.keyCode;}// Add which for click: 1 === left; 2 === middle; 3 === right
if(!event.which&&button!==undefined&&rmouseEvent.test(event.type)){if(button&1){return 1;}if(button&2){return 3;}if(button&4){return 2;}return 0;}return event.which;}},jQuery.event.addProp);// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(orig,fix){jQuery.event.special[orig]={delegateType:fix,bindType:fix,handle:function handle(event){var ret,target=this,related=event.relatedTarget,handleObj=event.handleObj;// For mouseenter/leave call the handler if related is outside the target.
// NB: No relatedTarget if the mouse left/entered the browser window
if(!related||related!==target&&!jQuery.contains(target,related)){event.type=handleObj.origType;ret=handleObj.handler.apply(this,arguments);event.type=fix;}return ret;}};});jQuery.fn.extend({on:function on(types,selector,data,fn){return _on(this,types,selector,data,fn);},one:function one(types,selector,data,fn){return _on(this,types,selector,data,fn,1);},off:function off(types,selector,fn){var handleObj,type;if(types&&types.preventDefault&&types.handleObj){// ( event )  dispatched jQuery.Event
handleObj=types.handleObj;jQuery(types.delegateTarget).off(handleObj.namespace?handleObj.origType+"."+handleObj.namespace:handleObj.origType,handleObj.selector,handleObj.handler);return this;}if((typeof types==="undefined"?"undefined":_typeof(types))==="object"){// ( types-object [, selector] )
for(type in types){this.off(type,selector,types[type]);}return this;}if(selector===false||typeof selector==="function"){// ( types [, fn] )
fn=selector;selector=undefined;}if(fn===false){fn=returnFalse;}return this.each(function(){jQuery.event.remove(this,types,fn,selector);});}});var/* eslint-disable max-len */// See https://github.com/eslint/eslint/issues/3229
rxhtmlTag=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,/* eslint-enable */// Support: IE <=10 - 11, Edge 12 - 13
// In IE/Edge using regex groups here causes severe slowdowns.
// See https://connect.microsoft.com/IE/feedback/details/1736512/
rnoInnerhtml=/<script|<style|<link/i,// checked="checked" or checked
rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,rscriptTypeMasked=/^true\/(.*)/,rcleanScript=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;// Prefer a tbody over its parent table for containing new rows
function manipulationTarget(elem,content){if(nodeName(elem,"table")&&nodeName(content.nodeType!==11?content:content.firstChild,"tr")){return jQuery(">tbody",elem)[0]||elem;}return elem;}// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript(elem){elem.type=(elem.getAttribute("type")!==null)+"/"+elem.type;return elem;}function restoreScript(elem){var match=rscriptTypeMasked.exec(elem.type);if(match){elem.type=match[1];}else{elem.removeAttribute("type");}return elem;}function cloneCopyEvent(src,dest){var i,l,type,pdataOld,pdataCur,udataOld,udataCur,events;if(dest.nodeType!==1){return;}// 1. Copy private data: events, handlers, etc.
if(dataPriv.hasData(src)){pdataOld=dataPriv.access(src);pdataCur=dataPriv.set(dest,pdataOld);events=pdataOld.events;if(events){delete pdataCur.handle;pdataCur.events={};for(type in events){for(i=0,l=events[type].length;i<l;i++){jQuery.event.add(dest,type,events[type][i]);}}}}// 2. Copy user data
if(dataUser.hasData(src)){udataOld=dataUser.access(src);udataCur=jQuery.extend({},udataOld);dataUser.set(dest,udataCur);}}// Fix IE bugs, see support tests
function fixInput(src,dest){var nodeName=dest.nodeName.toLowerCase();// Fails to persist the checked state of a cloned checkbox or radio button.
if(nodeName==="input"&&rcheckableType.test(src.type)){dest.checked=src.checked;// Fails to return the selected option to the default selected state when cloning options
}else if(nodeName==="input"||nodeName==="textarea"){dest.defaultValue=src.defaultValue;}}function domManip(collection,args,callback,ignored){// Flatten any nested arrays
args=concat.apply([],args);var fragment,first,scripts,hasScripts,node,doc,i=0,l=collection.length,iNoClone=l-1,value=args[0],isFunction=jQuery.isFunction(value);// We can't cloneNode fragments that contain checked, in WebKit
if(isFunction||l>1&&typeof value==="string"&&!support.checkClone&&rchecked.test(value)){return collection.each(function(index){var self=collection.eq(index);if(isFunction){args[0]=value.call(this,index,self.html());}domManip(self,args,callback,ignored);});}if(l){fragment=buildFragment(args,collection[0].ownerDocument,false,collection,ignored);first=fragment.firstChild;if(fragment.childNodes.length===1){fragment=first;}// Require either new content or an interest in ignored elements to invoke the callback
if(first||ignored){scripts=jQuery.map(getAll(fragment,"script"),disableScript);hasScripts=scripts.length;// Use the original fragment for the last item
// instead of the first because it can end up
// being emptied incorrectly in certain situations (#8070).
for(;i<l;i++){node=fragment;if(i!==iNoClone){node=jQuery.clone(node,true,true);// Keep references to cloned scripts for later restoration
if(hasScripts){// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge(scripts,getAll(node,"script"));}}callback.call(collection[i],node,i);}if(hasScripts){doc=scripts[scripts.length-1].ownerDocument;// Reenable scripts
jQuery.map(scripts,restoreScript);// Evaluate executable scripts on first document insertion
for(i=0;i<hasScripts;i++){node=scripts[i];if(rscriptType.test(node.type||"")&&!dataPriv.access(node,"globalEval")&&jQuery.contains(doc,node)){if(node.src){// Optional AJAX dependency, but won't run scripts if not present
if(jQuery._evalUrl){jQuery._evalUrl(node.src);}}else{DOMEval(node.textContent.replace(rcleanScript,""),doc);}}}}}}return collection;}function _remove(elem,selector,keepData){var node,nodes=selector?jQuery.filter(selector,elem):elem,i=0;for(;(node=nodes[i])!=null;i++){if(!keepData&&node.nodeType===1){jQuery.cleanData(getAll(node));}if(node.parentNode){if(keepData&&jQuery.contains(node.ownerDocument,node)){setGlobalEval(getAll(node,"script"));}node.parentNode.removeChild(node);}}return elem;}jQuery.extend({htmlPrefilter:function htmlPrefilter(html){return html.replace(rxhtmlTag,"<$1></$2>");},clone:function clone(elem,dataAndEvents,deepDataAndEvents){var i,l,srcElements,destElements,clone=elem.cloneNode(true),inPage=jQuery.contains(elem.ownerDocument,elem);// Fix IE cloning issues
if(!support.noCloneChecked&&(elem.nodeType===1||elem.nodeType===11)&&!jQuery.isXMLDoc(elem)){// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
destElements=getAll(clone);srcElements=getAll(elem);for(i=0,l=srcElements.length;i<l;i++){fixInput(srcElements[i],destElements[i]);}}// Copy the events from the original to the clone
if(dataAndEvents){if(deepDataAndEvents){srcElements=srcElements||getAll(elem);destElements=destElements||getAll(clone);for(i=0,l=srcElements.length;i<l;i++){cloneCopyEvent(srcElements[i],destElements[i]);}}else{cloneCopyEvent(elem,clone);}}// Preserve script evaluation history
destElements=getAll(clone,"script");if(destElements.length>0){setGlobalEval(destElements,!inPage&&getAll(elem,"script"));}// Return the cloned set
return clone;},cleanData:function cleanData(elems){var data,elem,type,special=jQuery.event.special,i=0;for(;(elem=elems[i])!==undefined;i++){if(acceptData(elem)){if(data=elem[dataPriv.expando]){if(data.events){for(type in data.events){if(special[type]){jQuery.event.remove(elem,type);// This is a shortcut to avoid jQuery.event.remove's overhead
}else{jQuery.removeEvent(elem,type,data.handle);}}}// Support: Chrome <=35 - 45+
// Assign undefined instead of using delete, see Data#remove
elem[dataPriv.expando]=undefined;}if(elem[dataUser.expando]){// Support: Chrome <=35 - 45+
// Assign undefined instead of using delete, see Data#remove
elem[dataUser.expando]=undefined;}}}}});jQuery.fn.extend({detach:function detach(selector){return _remove(this,selector,true);},remove:function remove(selector){return _remove(this,selector);},text:function text(value){return access(this,function(value){return value===undefined?jQuery.text(this):this.empty().each(function(){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){this.textContent=value;}});},null,value,arguments.length);},append:function append(){return domManip(this,arguments,function(elem){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var target=manipulationTarget(this,elem);target.appendChild(elem);}});},prepend:function prepend(){return domManip(this,arguments,function(elem){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var target=manipulationTarget(this,elem);target.insertBefore(elem,target.firstChild);}});},before:function before(){return domManip(this,arguments,function(elem){if(this.parentNode){this.parentNode.insertBefore(elem,this);}});},after:function after(){return domManip(this,arguments,function(elem){if(this.parentNode){this.parentNode.insertBefore(elem,this.nextSibling);}});},empty:function empty(){var elem,i=0;for(;(elem=this[i])!=null;i++){if(elem.nodeType===1){// Prevent memory leaks
jQuery.cleanData(getAll(elem,false));// Remove any remaining nodes
elem.textContent="";}}return this;},clone:function clone(dataAndEvents,deepDataAndEvents){dataAndEvents=dataAndEvents==null?false:dataAndEvents;deepDataAndEvents=deepDataAndEvents==null?dataAndEvents:deepDataAndEvents;return this.map(function(){return jQuery.clone(this,dataAndEvents,deepDataAndEvents);});},html:function html(value){return access(this,function(value){var elem=this[0]||{},i=0,l=this.length;if(value===undefined&&elem.nodeType===1){return elem.innerHTML;}// See if we can take a shortcut and just use innerHTML
if(typeof value==="string"&&!rnoInnerhtml.test(value)&&!wrapMap[(rtagName.exec(value)||["",""])[1].toLowerCase()]){value=jQuery.htmlPrefilter(value);try{for(;i<l;i++){elem=this[i]||{};// Remove element nodes and prevent memory leaks
if(elem.nodeType===1){jQuery.cleanData(getAll(elem,false));elem.innerHTML=value;}}elem=0;// If using innerHTML throws an exception, use the fallback method
}catch(e){}}if(elem){this.empty().append(value);}},null,value,arguments.length);},replaceWith:function replaceWith(){var ignored=[];// Make the changes, replacing each non-ignored context element with the new content
return domManip(this,arguments,function(elem){var parent=this.parentNode;if(jQuery.inArray(this,ignored)<0){jQuery.cleanData(getAll(this));if(parent){parent.replaceChild(elem,this);}}// Force callback invocation
},ignored);}});jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(selector){var elems,ret=[],insert=jQuery(selector),last=insert.length-1,i=0;for(;i<=last;i++){elems=i===last?this:this.clone(true);jQuery(insert[i])[original](elems);// Support: Android <=4.0 only, PhantomJS 1 only
// .get() because push.apply(_, arraylike) throws on ancient WebKit
push.apply(ret,elems.get());}return this.pushStack(ret);};});var rmargin=/^margin/;var rnumnonpx=new RegExp("^("+pnum+")(?!px)[a-z%]+$","i");var getStyles=function getStyles(elem){// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
// IE throws on elements created in popups
// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
var view=elem.ownerDocument.defaultView;if(!view||!view.opener){view=window;}return view.getComputedStyle(elem);};(function(){// Executing both pixelPosition & boxSizingReliable tests require only one layout
// so they're executed at the same time to save the second computation.
function computeStyleTests(){// This is a singleton, we need to execute it only once
if(!div){return;}div.style.cssText="box-sizing:border-box;"+"position:relative;display:block;"+"margin:auto;border:1px;padding:1px;"+"top:1%;width:50%";div.innerHTML="";documentElement.appendChild(container);var divStyle=window.getComputedStyle(div);pixelPositionVal=divStyle.top!=="1%";// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
reliableMarginLeftVal=divStyle.marginLeft==="2px";boxSizingReliableVal=divStyle.width==="4px";// Support: Android 4.0 - 4.3 only
// Some styles come back with percentage values, even though they shouldn't
div.style.marginRight="50%";pixelMarginRightVal=divStyle.marginRight==="4px";documentElement.removeChild(container);// Nullify the div so it wouldn't be stored in the memory and
// it will also be a sign that checks already performed
div=null;}var pixelPositionVal,boxSizingReliableVal,pixelMarginRightVal,reliableMarginLeftVal,container=document.createElement("div"),div=document.createElement("div");// Finish early in limited (non-browser) environments
if(!div.style){return;}// Support: IE <=9 - 11 only
// Style of cloned element affects source element cloned (#8908)
div.style.backgroundClip="content-box";div.cloneNode(true).style.backgroundClip="";support.clearCloneStyle=div.style.backgroundClip==="content-box";container.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;"+"padding:0;margin-top:1px;position:absolute";container.appendChild(div);jQuery.extend(support,{pixelPosition:function pixelPosition(){computeStyleTests();return pixelPositionVal;},boxSizingReliable:function boxSizingReliable(){computeStyleTests();return boxSizingReliableVal;},pixelMarginRight:function pixelMarginRight(){computeStyleTests();return pixelMarginRightVal;},reliableMarginLeft:function reliableMarginLeft(){computeStyleTests();return reliableMarginLeftVal;}});})();function curCSS(elem,name,computed){var width,minWidth,maxWidth,ret,// Support: Firefox 51+
// Retrieving style before computed somehow
// fixes an issue with getting wrong values
// on detached elements
style=elem.style;computed=computed||getStyles(elem);// getPropertyValue is needed for:
//   .css('filter') (IE 9 only, #12537)
//   .css('--customProperty) (#3144)
if(computed){ret=computed.getPropertyValue(name)||computed[name];if(ret===""&&!jQuery.contains(elem.ownerDocument,elem)){ret=jQuery.style(elem,name);}// A tribute to the "awesome hack by Dean Edwards"
// Android Browser returns percentage for some values,
// but width seems to be reliably pixels.
// This is against the CSSOM draft spec:
// https://drafts.csswg.org/cssom/#resolved-values
if(!support.pixelMarginRight()&&rnumnonpx.test(ret)&&rmargin.test(name)){// Remember the original values
width=style.width;minWidth=style.minWidth;maxWidth=style.maxWidth;// Put in the new values to get a computed value out
style.minWidth=style.maxWidth=style.width=ret;ret=computed.width;// Revert the changed values
style.width=width;style.minWidth=minWidth;style.maxWidth=maxWidth;}}return ret!==undefined?// Support: IE <=9 - 11 only
// IE returns zIndex value as an integer.
ret+"":ret;}function addGetHookIf(conditionFn,hookFn){// Define the hook, we'll check on the first run if it's really needed.
return{get:function get(){if(conditionFn()){// Hook not needed (or it's not possible to use it due
// to missing dependency), remove it.
delete this.get;return;}// Hook needed; redefine it so that the support test is not executed again.
return(this.get=hookFn).apply(this,arguments);}};}var// Swappable if display is none or starts with table
// except "table", "table-cell", or "table-caption"
// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
rdisplayswap=/^(none|table(?!-c[ea]).+)/,rcustomProp=/^--/,cssShow={position:"absolute",visibility:"hidden",display:"block"},cssNormalTransform={letterSpacing:"0",fontWeight:"400"},cssPrefixes=["Webkit","Moz","ms"],emptyStyle=document.createElement("div").style;// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName(name){// Shortcut for names that are not vendor prefixed
if(name in emptyStyle){return name;}// Check for vendor prefixed names
var capName=name[0].toUpperCase()+name.slice(1),i=cssPrefixes.length;while(i--){name=cssPrefixes[i]+capName;if(name in emptyStyle){return name;}}}// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName(name){var ret=jQuery.cssProps[name];if(!ret){ret=jQuery.cssProps[name]=vendorPropName(name)||name;}return ret;}function setPositiveNumber(elem,value,subtract){// Any relative (+/-) values have already been
// normalized at this point
var matches=rcssNum.exec(value);return matches?// Guard against undefined "subtract", e.g., when used as in cssHooks
Math.max(0,matches[2]-(subtract||0))+(matches[3]||"px"):value;}function augmentWidthOrHeight(elem,name,extra,isBorderBox,styles){var i,val=0;// If we already have the right measurement, avoid augmentation
if(extra===(isBorderBox?"border":"content")){i=4;// Otherwise initialize for horizontal or vertical properties
}else{i=name==="width"?1:0;}for(;i<4;i+=2){// Both box models exclude margin, so add it if we want it
if(extra==="margin"){val+=jQuery.css(elem,extra+cssExpand[i],true,styles);}if(isBorderBox){// border-box includes padding, so remove it if we want content
if(extra==="content"){val-=jQuery.css(elem,"padding"+cssExpand[i],true,styles);}// At this point, extra isn't border nor margin, so remove border
if(extra!=="margin"){val-=jQuery.css(elem,"border"+cssExpand[i]+"Width",true,styles);}}else{// At this point, extra isn't content, so add padding
val+=jQuery.css(elem,"padding"+cssExpand[i],true,styles);// At this point, extra isn't content nor padding, so add border
if(extra!=="padding"){val+=jQuery.css(elem,"border"+cssExpand[i]+"Width",true,styles);}}}return val;}function getWidthOrHeight(elem,name,extra){// Start with computed style
var valueIsBorderBox,styles=getStyles(elem),val=curCSS(elem,name,styles),isBorderBox=jQuery.css(elem,"boxSizing",false,styles)==="border-box";// Computed unit is not pixels. Stop here and return.
if(rnumnonpx.test(val)){return val;}// Check for style in case a browser which returns unreliable values
// for getComputedStyle silently falls back to the reliable elem.style
valueIsBorderBox=isBorderBox&&(support.boxSizingReliable()||val===elem.style[name]);// Fall back to offsetWidth/Height when value is "auto"
// This happens for inline elements with no explicit setting (gh-3571)
if(val==="auto"){val=elem["offset"+name[0].toUpperCase()+name.slice(1)];}// Normalize "", auto, and prepare for extra
val=parseFloat(val)||0;// Use the active box-sizing model to add/subtract irrelevant styles
return val+augmentWidthOrHeight(elem,name,extra||(isBorderBox?"border":"content"),valueIsBorderBox,styles)+"px";}jQuery.extend({// Add in style property hooks for overriding the default
// behavior of getting and setting a style property
cssHooks:{opacity:{get:function get(elem,computed){if(computed){// We should always get a number back from opacity
var ret=curCSS(elem,"opacity");return ret===""?"1":ret;}}}},// Don't automatically add "px" to these possibly-unitless properties
cssNumber:{"animationIterationCount":true,"columnCount":true,"fillOpacity":true,"flexGrow":true,"flexShrink":true,"fontWeight":true,"lineHeight":true,"opacity":true,"order":true,"orphans":true,"widows":true,"zIndex":true,"zoom":true},// Add in properties whose names you wish to fix before
// setting or getting the value
cssProps:{"float":"cssFloat"},// Get and set the style property on a DOM Node
style:function style(elem,name,value,extra){// Don't set styles on text and comment nodes
if(!elem||elem.nodeType===3||elem.nodeType===8||!elem.style){return;}// Make sure that we're working with the right name
var ret,type,hooks,origName=jQuery.camelCase(name),isCustomProp=rcustomProp.test(name),style=elem.style;// Make sure that we're working with the right name. We don't
// want to query the value if it is a CSS custom property
// since they are user-defined.
if(!isCustomProp){name=finalPropName(origName);}// Gets hook for the prefixed version, then unprefixed version
hooks=jQuery.cssHooks[name]||jQuery.cssHooks[origName];// Check if we're setting a value
if(value!==undefined){type=typeof value==="undefined"?"undefined":_typeof(value);// Convert "+=" or "-=" to relative numbers (#7345)
if(type==="string"&&(ret=rcssNum.exec(value))&&ret[1]){value=adjustCSS(elem,name,ret);// Fixes bug #9237
type="number";}// Make sure that null and NaN values aren't set (#7116)
if(value==null||value!==value){return;}// If a number was passed in, add the unit (except for certain CSS properties)
if(type==="number"){value+=ret&&ret[3]||(jQuery.cssNumber[origName]?"":"px");}// background-* props affect original clone's values
if(!support.clearCloneStyle&&value===""&&name.indexOf("background")===0){style[name]="inherit";}// If a hook was provided, use that value, otherwise just set the specified value
if(!hooks||!("set"in hooks)||(value=hooks.set(elem,value,extra))!==undefined){if(isCustomProp){style.setProperty(name,value);}else{style[name]=value;}}}else{// If a hook was provided get the non-computed value from there
if(hooks&&"get"in hooks&&(ret=hooks.get(elem,false,extra))!==undefined){return ret;}// Otherwise just get the value from the style object
return style[name];}},css:function css(elem,name,extra,styles){var val,num,hooks,origName=jQuery.camelCase(name),isCustomProp=rcustomProp.test(name);// Make sure that we're working with the right name. We don't
// want to modify the value if it is a CSS custom property
// since they are user-defined.
if(!isCustomProp){name=finalPropName(origName);}// Try prefixed name followed by the unprefixed name
hooks=jQuery.cssHooks[name]||jQuery.cssHooks[origName];// If a hook was provided get the computed value from there
if(hooks&&"get"in hooks){val=hooks.get(elem,true,extra);}// Otherwise, if a way to get the computed value exists, use that
if(val===undefined){val=curCSS(elem,name,styles);}// Convert "normal" to computed value
if(val==="normal"&&name in cssNormalTransform){val=cssNormalTransform[name];}// Make numeric if forced or a qualifier was provided and val looks numeric
if(extra===""||extra){num=parseFloat(val);return extra===true||isFinite(num)?num||0:val;}return val;}});jQuery.each(["height","width"],function(i,name){jQuery.cssHooks[name]={get:function get(elem,computed,extra){if(computed){// Certain elements can have dimension info if we invisibly show them
// but it must have a current display style that would benefit
return rdisplayswap.test(jQuery.css(elem,"display"))&&(// Support: Safari 8+
// Table columns in Safari have non-zero offsetWidth & zero
// getBoundingClientRect().width unless display is changed.
// Support: IE <=11 only
// Running getBoundingClientRect on a disconnected node
// in IE throws an error.
!elem.getClientRects().length||!elem.getBoundingClientRect().width)?swap(elem,cssShow,function(){return getWidthOrHeight(elem,name,extra);}):getWidthOrHeight(elem,name,extra);}},set:function set(elem,value,extra){var matches,styles=extra&&getStyles(elem),subtract=extra&&augmentWidthOrHeight(elem,name,extra,jQuery.css(elem,"boxSizing",false,styles)==="border-box",styles);// Convert to pixels if value adjustment is needed
if(subtract&&(matches=rcssNum.exec(value))&&(matches[3]||"px")!=="px"){elem.style[name]=value;value=jQuery.css(elem,name);}return setPositiveNumber(elem,value,subtract);}};});jQuery.cssHooks.marginLeft=addGetHookIf(support.reliableMarginLeft,function(elem,computed){if(computed){return(parseFloat(curCSS(elem,"marginLeft"))||elem.getBoundingClientRect().left-swap(elem,{marginLeft:0},function(){return elem.getBoundingClientRect().left;}))+"px";}});// These hooks are used by animate to expand properties
jQuery.each({margin:"",padding:"",border:"Width"},function(prefix,suffix){jQuery.cssHooks[prefix+suffix]={expand:function expand(value){var i=0,expanded={},// Assumes a single number if not a string
parts=typeof value==="string"?value.split(" "):[value];for(;i<4;i++){expanded[prefix+cssExpand[i]+suffix]=parts[i]||parts[i-2]||parts[0];}return expanded;}};if(!rmargin.test(prefix)){jQuery.cssHooks[prefix+suffix].set=setPositiveNumber;}});jQuery.fn.extend({css:function css(name,value){return access(this,function(elem,name,value){var styles,len,map={},i=0;if(Array.isArray(name)){styles=getStyles(elem);len=name.length;for(;i<len;i++){map[name[i]]=jQuery.css(elem,name[i],false,styles);}return map;}return value!==undefined?jQuery.style(elem,name,value):jQuery.css(elem,name);},name,value,arguments.length>1);}});function Tween(elem,options,prop,end,easing){return new Tween.prototype.init(elem,options,prop,end,easing);}jQuery.Tween=Tween;Tween.prototype={constructor:Tween,init:function init(elem,options,prop,end,easing,unit){this.elem=elem;this.prop=prop;this.easing=easing||jQuery.easing._default;this.options=options;this.start=this.now=this.cur();this.end=end;this.unit=unit||(jQuery.cssNumber[prop]?"":"px");},cur:function cur(){var hooks=Tween.propHooks[this.prop];return hooks&&hooks.get?hooks.get(this):Tween.propHooks._default.get(this);},run:function run(percent){var eased,hooks=Tween.propHooks[this.prop];if(this.options.duration){this.pos=eased=jQuery.easing[this.easing](percent,this.options.duration*percent,0,1,this.options.duration);}else{this.pos=eased=percent;}this.now=(this.end-this.start)*eased+this.start;if(this.options.step){this.options.step.call(this.elem,this.now,this);}if(hooks&&hooks.set){hooks.set(this);}else{Tween.propHooks._default.set(this);}return this;}};Tween.prototype.init.prototype=Tween.prototype;Tween.propHooks={_default:{get:function get(tween){var result;// Use a property on the element directly when it is not a DOM element,
// or when there is no matching style property that exists.
if(tween.elem.nodeType!==1||tween.elem[tween.prop]!=null&&tween.elem.style[tween.prop]==null){return tween.elem[tween.prop];}// Passing an empty string as a 3rd parameter to .css will automatically
// attempt a parseFloat and fallback to a string if the parse fails.
// Simple values such as "10px" are parsed to Float;
// complex values such as "rotate(1rad)" are returned as-is.
result=jQuery.css(tween.elem,tween.prop,"");// Empty strings, null, undefined and "auto" are converted to 0.
return!result||result==="auto"?0:result;},set:function set(tween){// Use step hook for back compat.
// Use cssHook if its there.
// Use .style if available and use plain properties where available.
if(jQuery.fx.step[tween.prop]){jQuery.fx.step[tween.prop](tween);}else if(tween.elem.nodeType===1&&(tween.elem.style[jQuery.cssProps[tween.prop]]!=null||jQuery.cssHooks[tween.prop])){jQuery.style(tween.elem,tween.prop,tween.now+tween.unit);}else{tween.elem[tween.prop]=tween.now;}}}};// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop=Tween.propHooks.scrollLeft={set:function set(tween){if(tween.elem.nodeType&&tween.elem.parentNode){tween.elem[tween.prop]=tween.now;}}};jQuery.easing={linear:function linear(p){return p;},swing:function swing(p){return 0.5-Math.cos(p*Math.PI)/2;},_default:"swing"};jQuery.fx=Tween.prototype.init;// Back compat <1.8 extension point
jQuery.fx.step={};var fxNow,inProgress,rfxtypes=/^(?:toggle|show|hide)$/,rrun=/queueHooks$/;function schedule(){if(inProgress){if(document.hidden===false&&window.requestAnimationFrame){window.requestAnimationFrame(schedule);}else{window.setTimeout(schedule,jQuery.fx.interval);}jQuery.fx.tick();}}// Animations created synchronously will run synchronously
function createFxNow(){window.setTimeout(function(){fxNow=undefined;});return fxNow=jQuery.now();}// Generate parameters to create a standard animation
function genFx(type,includeWidth){var which,i=0,attrs={height:type};// If we include width, step value is 1 to do all cssExpand values,
// otherwise step value is 2 to skip over Left and Right
includeWidth=includeWidth?1:0;for(;i<4;i+=2-includeWidth){which=cssExpand[i];attrs["margin"+which]=attrs["padding"+which]=type;}if(includeWidth){attrs.opacity=attrs.width=type;}return attrs;}function createTween(value,prop,animation){var tween,collection=(Animation.tweeners[prop]||[]).concat(Animation.tweeners["*"]),index=0,length=collection.length;for(;index<length;index++){if(tween=collection[index].call(animation,prop,value)){// We're done with this property
return tween;}}}function defaultPrefilter(elem,props,opts){var prop,value,toggle,hooks,oldfire,propTween,restoreDisplay,display,isBox="width"in props||"height"in props,anim=this,orig={},style=elem.style,hidden=elem.nodeType&&isHiddenWithinTree(elem),dataShow=dataPriv.get(elem,"fxshow");// Queue-skipping animations hijack the fx hooks
if(!opts.queue){hooks=jQuery._queueHooks(elem,"fx");if(hooks.unqueued==null){hooks.unqueued=0;oldfire=hooks.empty.fire;hooks.empty.fire=function(){if(!hooks.unqueued){oldfire();}};}hooks.unqueued++;anim.always(function(){// Ensure the complete handler is called before this completes
anim.always(function(){hooks.unqueued--;if(!jQuery.queue(elem,"fx").length){hooks.empty.fire();}});});}// Detect show/hide animations
for(prop in props){value=props[prop];if(rfxtypes.test(value)){delete props[prop];toggle=toggle||value==="toggle";if(value===(hidden?"hide":"show")){// Pretend to be hidden if this is a "show" and
// there is still data from a stopped show/hide
if(value==="show"&&dataShow&&dataShow[prop]!==undefined){hidden=true;// Ignore all other no-op show/hide data
}else{continue;}}orig[prop]=dataShow&&dataShow[prop]||jQuery.style(elem,prop);}}// Bail out if this is a no-op like .hide().hide()
propTween=!jQuery.isEmptyObject(props);if(!propTween&&jQuery.isEmptyObject(orig)){return;}// Restrict "overflow" and "display" styles during box animations
if(isBox&&elem.nodeType===1){// Support: IE <=9 - 11, Edge 12 - 13
// Record all 3 overflow attributes because IE does not infer the shorthand
// from identically-valued overflowX and overflowY
opts.overflow=[style.overflow,style.overflowX,style.overflowY];// Identify a display type, preferring old show/hide data over the CSS cascade
restoreDisplay=dataShow&&dataShow.display;if(restoreDisplay==null){restoreDisplay=dataPriv.get(elem,"display");}display=jQuery.css(elem,"display");if(display==="none"){if(restoreDisplay){display=restoreDisplay;}else{// Get nonempty value(s) by temporarily forcing visibility
showHide([elem],true);restoreDisplay=elem.style.display||restoreDisplay;display=jQuery.css(elem,"display");showHide([elem]);}}// Animate inline elements as inline-block
if(display==="inline"||display==="inline-block"&&restoreDisplay!=null){if(jQuery.css(elem,"float")==="none"){// Restore the original display value at the end of pure show/hide animations
if(!propTween){anim.done(function(){style.display=restoreDisplay;});if(restoreDisplay==null){display=style.display;restoreDisplay=display==="none"?"":display;}}style.display="inline-block";}}}if(opts.overflow){style.overflow="hidden";anim.always(function(){style.overflow=opts.overflow[0];style.overflowX=opts.overflow[1];style.overflowY=opts.overflow[2];});}// Implement show/hide animations
propTween=false;for(prop in orig){// General show/hide setup for this element animation
if(!propTween){if(dataShow){if("hidden"in dataShow){hidden=dataShow.hidden;}}else{dataShow=dataPriv.access(elem,"fxshow",{display:restoreDisplay});}// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
if(toggle){dataShow.hidden=!hidden;}// Show elements before animating them
if(hidden){showHide([elem],true);}/* eslint-disable no-loop-func */anim.done(function(){/* eslint-enable no-loop-func */// The final step of a "hide" animation is actually hiding the element
if(!hidden){showHide([elem]);}dataPriv.remove(elem,"fxshow");for(prop in orig){jQuery.style(elem,prop,orig[prop]);}});}// Per-property setup
propTween=createTween(hidden?dataShow[prop]:0,prop,anim);if(!(prop in dataShow)){dataShow[prop]=propTween.start;if(hidden){propTween.end=propTween.start;propTween.start=0;}}}}function propFilter(props,specialEasing){var index,name,easing,value,hooks;// camelCase, specialEasing and expand cssHook pass
for(index in props){name=jQuery.camelCase(index);easing=specialEasing[name];value=props[index];if(Array.isArray(value)){easing=value[1];value=props[index]=value[0];}if(index!==name){props[name]=value;delete props[index];}hooks=jQuery.cssHooks[name];if(hooks&&"expand"in hooks){value=hooks.expand(value);delete props[name];// Not quite $.extend, this won't overwrite existing keys.
// Reusing 'index' because we have the correct "name"
for(index in value){if(!(index in props)){props[index]=value[index];specialEasing[index]=easing;}}}else{specialEasing[name]=easing;}}}function Animation(elem,properties,options){var result,stopped,index=0,length=Animation.prefilters.length,deferred=jQuery.Deferred().always(function(){// Don't match elem in the :animated selector
delete tick.elem;}),tick=function tick(){if(stopped){return false;}var currentTime=fxNow||createFxNow(),remaining=Math.max(0,animation.startTime+animation.duration-currentTime),// Support: Android 2.3 only
// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
temp=remaining/animation.duration||0,percent=1-temp,index=0,length=animation.tweens.length;for(;index<length;index++){animation.tweens[index].run(percent);}deferred.notifyWith(elem,[animation,percent,remaining]);// If there's more to do, yield
if(percent<1&&length){return remaining;}// If this was an empty animation, synthesize a final progress notification
if(!length){deferred.notifyWith(elem,[animation,1,0]);}// Resolve the animation and report its conclusion
deferred.resolveWith(elem,[animation]);return false;},animation=deferred.promise({elem:elem,props:jQuery.extend({},properties),opts:jQuery.extend(true,{specialEasing:{},easing:jQuery.easing._default},options),originalProperties:properties,originalOptions:options,startTime:fxNow||createFxNow(),duration:options.duration,tweens:[],createTween:function createTween(prop,end){var tween=jQuery.Tween(elem,animation.opts,prop,end,animation.opts.specialEasing[prop]||animation.opts.easing);animation.tweens.push(tween);return tween;},stop:function stop(gotoEnd){var index=0,// If we are going to the end, we want to run all the tweens
// otherwise we skip this part
length=gotoEnd?animation.tweens.length:0;if(stopped){return this;}stopped=true;for(;index<length;index++){animation.tweens[index].run(1);}// Resolve when we played the last frame; otherwise, reject
if(gotoEnd){deferred.notifyWith(elem,[animation,1,0]);deferred.resolveWith(elem,[animation,gotoEnd]);}else{deferred.rejectWith(elem,[animation,gotoEnd]);}return this;}}),props=animation.props;propFilter(props,animation.opts.specialEasing);for(;index<length;index++){result=Animation.prefilters[index].call(animation,elem,props,animation.opts);if(result){if(jQuery.isFunction(result.stop)){jQuery._queueHooks(animation.elem,animation.opts.queue).stop=jQuery.proxy(result.stop,result);}return result;}}jQuery.map(props,createTween,animation);if(jQuery.isFunction(animation.opts.start)){animation.opts.start.call(elem,animation);}// Attach callbacks from options
animation.progress(animation.opts.progress).done(animation.opts.done,animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);jQuery.fx.timer(jQuery.extend(tick,{elem:elem,anim:animation,queue:animation.opts.queue}));return animation;}jQuery.Animation=jQuery.extend(Animation,{tweeners:{"*":[function(prop,value){var tween=this.createTween(prop,value);adjustCSS(tween.elem,prop,rcssNum.exec(value),tween);return tween;}]},tweener:function tweener(props,callback){if(jQuery.isFunction(props)){callback=props;props=["*"];}else{props=props.match(rnothtmlwhite);}var prop,index=0,length=props.length;for(;index<length;index++){prop=props[index];Animation.tweeners[prop]=Animation.tweeners[prop]||[];Animation.tweeners[prop].unshift(callback);}},prefilters:[defaultPrefilter],prefilter:function prefilter(callback,prepend){if(prepend){Animation.prefilters.unshift(callback);}else{Animation.prefilters.push(callback);}}});jQuery.speed=function(speed,easing,fn){var opt=speed&&(typeof speed==="undefined"?"undefined":_typeof(speed))==="object"?jQuery.extend({},speed):{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&!jQuery.isFunction(easing)&&easing};// Go to the end state if fx are off
if(jQuery.fx.off){opt.duration=0;}else{if(typeof opt.duration!=="number"){if(opt.duration in jQuery.fx.speeds){opt.duration=jQuery.fx.speeds[opt.duration];}else{opt.duration=jQuery.fx.speeds._default;}}}// Normalize opt.queue - true/undefined/null -> "fx"
if(opt.queue==null||opt.queue===true){opt.queue="fx";}// Queueing
opt.old=opt.complete;opt.complete=function(){if(jQuery.isFunction(opt.old)){opt.old.call(this);}if(opt.queue){jQuery.dequeue(this,opt.queue);}};return opt;};jQuery.fn.extend({fadeTo:function fadeTo(speed,to,easing,callback){// Show any hidden elements after setting opacity to 0
return this.filter(isHiddenWithinTree).css("opacity",0).show()// Animate to the value specified
.end().animate({opacity:to},speed,easing,callback);},animate:function animate(prop,speed,easing,callback){var empty=jQuery.isEmptyObject(prop),optall=jQuery.speed(speed,easing,callback),doAnimation=function doAnimation(){// Operate on a copy of prop so per-property easing won't be lost
var anim=Animation(this,jQuery.extend({},prop),optall);// Empty animations, or finishing resolves immediately
if(empty||dataPriv.get(this,"finish")){anim.stop(true);}};doAnimation.finish=doAnimation;return empty||optall.queue===false?this.each(doAnimation):this.queue(optall.queue,doAnimation);},stop:function stop(type,clearQueue,gotoEnd){var stopQueue=function stopQueue(hooks){var stop=hooks.stop;delete hooks.stop;stop(gotoEnd);};if(typeof type!=="string"){gotoEnd=clearQueue;clearQueue=type;type=undefined;}if(clearQueue&&type!==false){this.queue(type||"fx",[]);}return this.each(function(){var dequeue=true,index=type!=null&&type+"queueHooks",timers=jQuery.timers,data=dataPriv.get(this);if(index){if(data[index]&&data[index].stop){stopQueue(data[index]);}}else{for(index in data){if(data[index]&&data[index].stop&&rrun.test(index)){stopQueue(data[index]);}}}for(index=timers.length;index--;){if(timers[index].elem===this&&(type==null||timers[index].queue===type)){timers[index].anim.stop(gotoEnd);dequeue=false;timers.splice(index,1);}}// Start the next in the queue if the last step wasn't forced.
// Timers currently will call their complete callbacks, which
// will dequeue but only if they were gotoEnd.
if(dequeue||!gotoEnd){jQuery.dequeue(this,type);}});},finish:function finish(type){if(type!==false){type=type||"fx";}return this.each(function(){var index,data=dataPriv.get(this),queue=data[type+"queue"],hooks=data[type+"queueHooks"],timers=jQuery.timers,length=queue?queue.length:0;// Enable finishing flag on private data
data.finish=true;// Empty the queue first
jQuery.queue(this,type,[]);if(hooks&&hooks.stop){hooks.stop.call(this,true);}// Look for any active animations, and finish them
for(index=timers.length;index--;){if(timers[index].elem===this&&timers[index].queue===type){timers[index].anim.stop(true);timers.splice(index,1);}}// Look for any animations in the old queue and finish them
for(index=0;index<length;index++){if(queue[index]&&queue[index].finish){queue[index].finish.call(this);}}// Turn off finishing flag
delete data.finish;});}});jQuery.each(["toggle","show","hide"],function(i,name){var cssFn=jQuery.fn[name];jQuery.fn[name]=function(speed,easing,callback){return speed==null||typeof speed==="boolean"?cssFn.apply(this,arguments):this.animate(genFx(name,true),speed,easing,callback);};});// Generate shortcuts for custom animations
jQuery.each({slideDown:genFx("show"),slideUp:genFx("hide"),slideToggle:genFx("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(name,props){jQuery.fn[name]=function(speed,easing,callback){return this.animate(props,speed,easing,callback);};});jQuery.timers=[];jQuery.fx.tick=function(){var timer,i=0,timers=jQuery.timers;fxNow=jQuery.now();for(;i<timers.length;i++){timer=timers[i];// Run the timer and safely remove it when done (allowing for external removal)
if(!timer()&&timers[i]===timer){timers.splice(i--,1);}}if(!timers.length){jQuery.fx.stop();}fxNow=undefined;};jQuery.fx.timer=function(timer){jQuery.timers.push(timer);jQuery.fx.start();};jQuery.fx.interval=13;jQuery.fx.start=function(){if(inProgress){return;}inProgress=true;schedule();};jQuery.fx.stop=function(){inProgress=null;};jQuery.fx.speeds={slow:600,fast:200,// Default speed
_default:400};// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay=function(time,type){time=jQuery.fx?jQuery.fx.speeds[time]||time:time;type=type||"fx";return this.queue(type,function(next,hooks){var timeout=window.setTimeout(next,time);hooks.stop=function(){window.clearTimeout(timeout);};});};(function(){var input=document.createElement("input"),select=document.createElement("select"),opt=select.appendChild(document.createElement("option"));input.type="checkbox";// Support: Android <=4.3 only
// Default value for a checkbox should be "on"
support.checkOn=input.value!=="";// Support: IE <=11 only
// Must access selectedIndex to make default options select
support.optSelected=opt.selected;// Support: IE <=11 only
// An input loses its value after becoming a radio
input=document.createElement("input");input.value="t";input.type="radio";support.radioValue=input.value==="t";})();var boolHook,attrHandle=jQuery.expr.attrHandle;jQuery.fn.extend({attr:function attr(name,value){return access(this,jQuery.attr,name,value,arguments.length>1);},removeAttr:function removeAttr(name){return this.each(function(){jQuery.removeAttr(this,name);});}});jQuery.extend({attr:function attr(elem,name,value){var ret,hooks,nType=elem.nodeType;// Don't get/set attributes on text, comment and attribute nodes
if(nType===3||nType===8||nType===2){return;}// Fallback to prop when attributes are not supported
if(typeof elem.getAttribute==="undefined"){return jQuery.prop(elem,name,value);}// Attribute hooks are determined by the lowercase version
// Grab necessary hook if one is defined
if(nType!==1||!jQuery.isXMLDoc(elem)){hooks=jQuery.attrHooks[name.toLowerCase()]||(jQuery.expr.match.bool.test(name)?boolHook:undefined);}if(value!==undefined){if(value===null){jQuery.removeAttr(elem,name);return;}if(hooks&&"set"in hooks&&(ret=hooks.set(elem,value,name))!==undefined){return ret;}elem.setAttribute(name,value+"");return value;}if(hooks&&"get"in hooks&&(ret=hooks.get(elem,name))!==null){return ret;}ret=jQuery.find.attr(elem,name);// Non-existent attributes return null, we normalize to undefined
return ret==null?undefined:ret;},attrHooks:{type:{set:function set(elem,value){if(!support.radioValue&&value==="radio"&&nodeName(elem,"input")){var val=elem.value;elem.setAttribute("type",value);if(val){elem.value=val;}return value;}}}},removeAttr:function removeAttr(elem,value){var name,i=0,// Attribute names can contain non-HTML whitespace characters
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
attrNames=value&&value.match(rnothtmlwhite);if(attrNames&&elem.nodeType===1){while(name=attrNames[i++]){elem.removeAttribute(name);}}}});// Hooks for boolean attributes
boolHook={set:function set(elem,value,name){if(value===false){// Remove boolean attributes when set to false
jQuery.removeAttr(elem,name);}else{elem.setAttribute(name,name);}return name;}};jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g),function(i,name){var getter=attrHandle[name]||jQuery.find.attr;attrHandle[name]=function(elem,name,isXML){var ret,handle,lowercaseName=name.toLowerCase();if(!isXML){// Avoid an infinite loop by temporarily removing this function from the getter
handle=attrHandle[lowercaseName];attrHandle[lowercaseName]=ret;ret=getter(elem,name,isXML)!=null?lowercaseName:null;attrHandle[lowercaseName]=handle;}return ret;};});var rfocusable=/^(?:input|select|textarea|button)$/i,rclickable=/^(?:a|area)$/i;jQuery.fn.extend({prop:function prop(name,value){return access(this,jQuery.prop,name,value,arguments.length>1);},removeProp:function removeProp(name){return this.each(function(){delete this[jQuery.propFix[name]||name];});}});jQuery.extend({prop:function prop(elem,name,value){var ret,hooks,nType=elem.nodeType;// Don't get/set properties on text, comment and attribute nodes
if(nType===3||nType===8||nType===2){return;}if(nType!==1||!jQuery.isXMLDoc(elem)){// Fix name and attach hooks
name=jQuery.propFix[name]||name;hooks=jQuery.propHooks[name];}if(value!==undefined){if(hooks&&"set"in hooks&&(ret=hooks.set(elem,value,name))!==undefined){return ret;}return elem[name]=value;}if(hooks&&"get"in hooks&&(ret=hooks.get(elem,name))!==null){return ret;}return elem[name];},propHooks:{tabIndex:{get:function get(elem){// Support: IE <=9 - 11 only
// elem.tabIndex doesn't always return the
// correct value when it hasn't been explicitly set
// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
// Use proper attribute retrieval(#12072)
var tabindex=jQuery.find.attr(elem,"tabindex");if(tabindex){return parseInt(tabindex,10);}if(rfocusable.test(elem.nodeName)||rclickable.test(elem.nodeName)&&elem.href){return 0;}return-1;}}},propFix:{"for":"htmlFor","class":"className"}});// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if(!support.optSelected){jQuery.propHooks.selected={get:function get(elem){/* eslint no-unused-expressions: "off" */var parent=elem.parentNode;if(parent&&parent.parentNode){parent.parentNode.selectedIndex;}return null;},set:function set(elem){/* eslint no-unused-expressions: "off" */var parent=elem.parentNode;if(parent){parent.selectedIndex;if(parent.parentNode){parent.parentNode.selectedIndex;}}}};}jQuery.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){jQuery.propFix[this.toLowerCase()]=this;});// Strip and collapse whitespace according to HTML spec
// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
function stripAndCollapse(value){var tokens=value.match(rnothtmlwhite)||[];return tokens.join(" ");}function getClass(elem){return elem.getAttribute&&elem.getAttribute("class")||"";}jQuery.fn.extend({addClass:function addClass(value){var classes,elem,cur,curValue,clazz,j,finalValue,i=0;if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).addClass(value.call(this,j,getClass(this)));});}if(typeof value==="string"&&value){classes=value.match(rnothtmlwhite)||[];while(elem=this[i++]){curValue=getClass(elem);cur=elem.nodeType===1&&" "+stripAndCollapse(curValue)+" ";if(cur){j=0;while(clazz=classes[j++]){if(cur.indexOf(" "+clazz+" ")<0){cur+=clazz+" ";}}// Only assign if different to avoid unneeded rendering.
finalValue=stripAndCollapse(cur);if(curValue!==finalValue){elem.setAttribute("class",finalValue);}}}}return this;},removeClass:function removeClass(value){var classes,elem,cur,curValue,clazz,j,finalValue,i=0;if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).removeClass(value.call(this,j,getClass(this)));});}if(!arguments.length){return this.attr("class","");}if(typeof value==="string"&&value){classes=value.match(rnothtmlwhite)||[];while(elem=this[i++]){curValue=getClass(elem);// This expression is here for better compressibility (see addClass)
cur=elem.nodeType===1&&" "+stripAndCollapse(curValue)+" ";if(cur){j=0;while(clazz=classes[j++]){// Remove *all* instances
while(cur.indexOf(" "+clazz+" ")>-1){cur=cur.replace(" "+clazz+" "," ");}}// Only assign if different to avoid unneeded rendering.
finalValue=stripAndCollapse(cur);if(curValue!==finalValue){elem.setAttribute("class",finalValue);}}}}return this;},toggleClass:function toggleClass(value,stateVal){var type=typeof value==="undefined"?"undefined":_typeof(value);if(typeof stateVal==="boolean"&&type==="string"){return stateVal?this.addClass(value):this.removeClass(value);}if(jQuery.isFunction(value)){return this.each(function(i){jQuery(this).toggleClass(value.call(this,i,getClass(this),stateVal),stateVal);});}return this.each(function(){var className,i,self,classNames;if(type==="string"){// Toggle individual class names
i=0;self=jQuery(this);classNames=value.match(rnothtmlwhite)||[];while(className=classNames[i++]){// Check each className given, space separated list
if(self.hasClass(className)){self.removeClass(className);}else{self.addClass(className);}}// Toggle whole class name
}else if(value===undefined||type==="boolean"){className=getClass(this);if(className){// Store className if set
dataPriv.set(this,"__className__",className);}// If the element has a class name or if we're passed `false`,
// then remove the whole classname (if there was one, the above saved it).
// Otherwise bring back whatever was previously saved (if anything),
// falling back to the empty string if nothing was stored.
if(this.setAttribute){this.setAttribute("class",className||value===false?"":dataPriv.get(this,"__className__")||"");}}});},hasClass:function hasClass(selector){var className,elem,i=0;className=" "+selector+" ";while(elem=this[i++]){if(elem.nodeType===1&&(" "+stripAndCollapse(getClass(elem))+" ").indexOf(className)>-1){return true;}}return false;}});var rreturn=/\r/g;jQuery.fn.extend({val:function val(value){var hooks,ret,isFunction,elem=this[0];if(!arguments.length){if(elem){hooks=jQuery.valHooks[elem.type]||jQuery.valHooks[elem.nodeName.toLowerCase()];if(hooks&&"get"in hooks&&(ret=hooks.get(elem,"value"))!==undefined){return ret;}ret=elem.value;// Handle most common string cases
if(typeof ret==="string"){return ret.replace(rreturn,"");}// Handle cases where value is null/undef or number
return ret==null?"":ret;}return;}isFunction=jQuery.isFunction(value);return this.each(function(i){var val;if(this.nodeType!==1){return;}if(isFunction){val=value.call(this,i,jQuery(this).val());}else{val=value;}// Treat null/undefined as ""; convert numbers to string
if(val==null){val="";}else if(typeof val==="number"){val+="";}else if(Array.isArray(val)){val=jQuery.map(val,function(value){return value==null?"":value+"";});}hooks=jQuery.valHooks[this.type]||jQuery.valHooks[this.nodeName.toLowerCase()];// If set returns undefined, fall back to normal setting
if(!hooks||!("set"in hooks)||hooks.set(this,val,"value")===undefined){this.value=val;}});}});jQuery.extend({valHooks:{option:{get:function get(elem){var val=jQuery.find.attr(elem,"value");return val!=null?val:// Support: IE <=10 - 11 only
// option.text throws exceptions (#14686, #14858)
// Strip and collapse whitespace
// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
stripAndCollapse(jQuery.text(elem));}},select:{get:function get(elem){var value,option,i,options=elem.options,index=elem.selectedIndex,one=elem.type==="select-one",values=one?null:[],max=one?index+1:options.length;if(index<0){i=max;}else{i=one?index:0;}// Loop through all the selected options
for(;i<max;i++){option=options[i];// Support: IE <=9 only
// IE8-9 doesn't update selected after form reset (#2551)
if((option.selected||i===index)&&// Don't return options that are disabled or in a disabled optgroup
!option.disabled&&(!option.parentNode.disabled||!nodeName(option.parentNode,"optgroup"))){// Get the specific value for the option
value=jQuery(option).val();// We don't need an array for one selects
if(one){return value;}// Multi-Selects return an array
values.push(value);}}return values;},set:function set(elem,value){var optionSet,option,options=elem.options,values=jQuery.makeArray(value),i=options.length;while(i--){option=options[i];/* eslint-disable no-cond-assign */if(option.selected=jQuery.inArray(jQuery.valHooks.option.get(option),values)>-1){optionSet=true;}/* eslint-enable no-cond-assign */}// Force browsers to behave consistently when non-matching value is set
if(!optionSet){elem.selectedIndex=-1;}return values;}}}});// Radios and checkboxes getter/setter
jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this]={set:function set(elem,value){if(Array.isArray(value)){return elem.checked=jQuery.inArray(jQuery(elem).val(),value)>-1;}}};if(!support.checkOn){jQuery.valHooks[this].get=function(elem){return elem.getAttribute("value")===null?"on":elem.value;};}});// Return jQuery for attributes-only inclusion
var rfocusMorph=/^(?:focusinfocus|focusoutblur)$/;jQuery.extend(jQuery.event,{trigger:function trigger(event,data,elem,onlyHandlers){var i,cur,tmp,bubbleType,ontype,handle,special,eventPath=[elem||document],type=hasOwn.call(event,"type")?event.type:event,namespaces=hasOwn.call(event,"namespace")?event.namespace.split("."):[];cur=tmp=elem=elem||document;// Don't do events on text and comment nodes
if(elem.nodeType===3||elem.nodeType===8){return;}// focus/blur morphs to focusin/out; ensure we're not firing them right now
if(rfocusMorph.test(type+jQuery.event.triggered)){return;}if(type.indexOf(".")>-1){// Namespaced trigger; create a regexp to match event type in handle()
namespaces=type.split(".");type=namespaces.shift();namespaces.sort();}ontype=type.indexOf(":")<0&&"on"+type;// Caller can pass in a jQuery.Event object, Object, or just an event type string
event=event[jQuery.expando]?event:new jQuery.Event(type,(typeof event==="undefined"?"undefined":_typeof(event))==="object"&&event);// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
event.isTrigger=onlyHandlers?2:3;event.namespace=namespaces.join(".");event.rnamespace=event.namespace?new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.|)")+"(\\.|$)"):null;// Clean up the event in case it is being reused
event.result=undefined;if(!event.target){event.target=elem;}// Clone any incoming data and prepend the event, creating the handler arg list
data=data==null?[event]:jQuery.makeArray(data,[event]);// Allow special events to draw outside the lines
special=jQuery.event.special[type]||{};if(!onlyHandlers&&special.trigger&&special.trigger.apply(elem,data)===false){return;}// Determine event propagation path in advance, per W3C events spec (#9951)
// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
if(!onlyHandlers&&!special.noBubble&&!jQuery.isWindow(elem)){bubbleType=special.delegateType||type;if(!rfocusMorph.test(bubbleType+type)){cur=cur.parentNode;}for(;cur;cur=cur.parentNode){eventPath.push(cur);tmp=cur;}// Only add window if we got to document (e.g., not plain obj or detached DOM)
if(tmp===(elem.ownerDocument||document)){eventPath.push(tmp.defaultView||tmp.parentWindow||window);}}// Fire handlers on the event path
i=0;while((cur=eventPath[i++])&&!event.isPropagationStopped()){event.type=i>1?bubbleType:special.bindType||type;// jQuery handler
handle=(dataPriv.get(cur,"events")||{})[event.type]&&dataPriv.get(cur,"handle");if(handle){handle.apply(cur,data);}// Native handler
handle=ontype&&cur[ontype];if(handle&&handle.apply&&acceptData(cur)){event.result=handle.apply(cur,data);if(event.result===false){event.preventDefault();}}}event.type=type;// If nobody prevented the default action, do it now
if(!onlyHandlers&&!event.isDefaultPrevented()){if((!special._default||special._default.apply(eventPath.pop(),data)===false)&&acceptData(elem)){// Call a native DOM method on the target with the same name as the event.
// Don't do default actions on window, that's where global variables be (#6170)
if(ontype&&jQuery.isFunction(elem[type])&&!jQuery.isWindow(elem)){// Don't re-trigger an onFOO event when we call its FOO() method
tmp=elem[ontype];if(tmp){elem[ontype]=null;}// Prevent re-triggering of the same event, since we already bubbled it above
jQuery.event.triggered=type;elem[type]();jQuery.event.triggered=undefined;if(tmp){elem[ontype]=tmp;}}}}return event.result;},// Piggyback on a donor event to simulate a different one
// Used only for `focus(in | out)` events
simulate:function simulate(type,elem,event){var e=jQuery.extend(new jQuery.Event(),event,{type:type,isSimulated:true});jQuery.event.trigger(e,null,elem);}});jQuery.fn.extend({trigger:function trigger(type,data){return this.each(function(){jQuery.event.trigger(type,data,this);});},triggerHandler:function triggerHandler(type,data){var elem=this[0];if(elem){return jQuery.event.trigger(type,data,elem,true);}}});jQuery.each(("blur focus focusin focusout resize scroll click dblclick "+"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave "+"change select submit keydown keypress keyup contextmenu").split(" "),function(i,name){// Handle event binding
jQuery.fn[name]=function(data,fn){return arguments.length>0?this.on(name,null,data,fn):this.trigger(name);};});jQuery.fn.extend({hover:function hover(fnOver,fnOut){return this.mouseenter(fnOver).mouseleave(fnOut||fnOver);}});support.focusin="onfocusin"in window;// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if(!support.focusin){jQuery.each({focus:"focusin",blur:"focusout"},function(orig,fix){// Attach a single capturing handler on the document while someone wants focusin/focusout
var handler=function handler(event){jQuery.event.simulate(fix,event.target,jQuery.event.fix(event));};jQuery.event.special[fix]={setup:function setup(){var doc=this.ownerDocument||this,attaches=dataPriv.access(doc,fix);if(!attaches){doc.addEventListener(orig,handler,true);}dataPriv.access(doc,fix,(attaches||0)+1);},teardown:function teardown(){var doc=this.ownerDocument||this,attaches=dataPriv.access(doc,fix)-1;if(!attaches){doc.removeEventListener(orig,handler,true);dataPriv.remove(doc,fix);}else{dataPriv.access(doc,fix,attaches);}}};});}var location=window.location;var nonce=jQuery.now();var rquery=/\?/;// Cross-browser xml parsing
jQuery.parseXML=function(data){var xml;if(!data||typeof data!=="string"){return null;}// Support: IE 9 - 11 only
// IE throws on parseFromString with invalid input.
try{xml=new window.DOMParser().parseFromString(data,"text/xml");}catch(e){xml=undefined;}if(!xml||xml.getElementsByTagName("parsererror").length){jQuery.error("Invalid XML: "+data);}return xml;};var rbracket=/\[\]$/,rCRLF=/\r?\n/g,rsubmitterTypes=/^(?:submit|button|image|reset|file)$/i,rsubmittable=/^(?:input|select|textarea|keygen)/i;function buildParams(prefix,obj,traditional,add){var name;if(Array.isArray(obj)){// Serialize array item.
jQuery.each(obj,function(i,v){if(traditional||rbracket.test(prefix)){// Treat each array item as a scalar.
add(prefix,v);}else{// Item is non-scalar (array or object), encode its numeric index.
buildParams(prefix+"["+((typeof v==="undefined"?"undefined":_typeof(v))==="object"&&v!=null?i:"")+"]",v,traditional,add);}});}else if(!traditional&&jQuery.type(obj)==="object"){// Serialize object item.
for(name in obj){buildParams(prefix+"["+name+"]",obj[name],traditional,add);}}else{// Serialize scalar item.
add(prefix,obj);}}// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param=function(a,traditional){var prefix,s=[],add=function add(key,valueOrFunction){// If value is a function, invoke it and use its return value
var value=jQuery.isFunction(valueOrFunction)?valueOrFunction():valueOrFunction;s[s.length]=encodeURIComponent(key)+"="+encodeURIComponent(value==null?"":value);};// If an array was passed in, assume that it is an array of form elements.
if(Array.isArray(a)||a.jquery&&!jQuery.isPlainObject(a)){// Serialize the form elements
jQuery.each(a,function(){add(this.name,this.value);});}else{// If traditional, encode the "old" way (the way 1.3.2 or older
// did it), otherwise encode params recursively.
for(prefix in a){buildParams(prefix,a[prefix],traditional,add);}}// Return the resulting serialization
return s.join("&");};jQuery.fn.extend({serialize:function serialize(){return jQuery.param(this.serializeArray());},serializeArray:function serializeArray(){return this.map(function(){// Can add propHook for "elements" to filter or add form elements
var elements=jQuery.prop(this,"elements");return elements?jQuery.makeArray(elements):this;}).filter(function(){var type=this.type;// Use .is( ":disabled" ) so that fieldset[disabled] works
return this.name&&!jQuery(this).is(":disabled")&&rsubmittable.test(this.nodeName)&&!rsubmitterTypes.test(type)&&(this.checked||!rcheckableType.test(type));}).map(function(i,elem){var val=jQuery(this).val();if(val==null){return null;}if(Array.isArray(val)){return jQuery.map(val,function(val){return{name:elem.name,value:val.replace(rCRLF,"\r\n")};});}return{name:elem.name,value:val.replace(rCRLF,"\r\n")};}).get();}});var r20=/%20/g,rhash=/#.*$/,rantiCache=/([?&])_=[^&]*/,rheaders=/^(.*?):[ \t]*([^\r\n]*)$/mg,// #7653, #8125, #8152: local protocol detection
rlocalProtocol=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,rnoContent=/^(?:GET|HEAD)$/,rprotocol=/^\/\//,/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */prefilters={},/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */transports={},// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
allTypes="*/".concat("*"),// Anchor tag for parsing the document origin
originAnchor=document.createElement("a");originAnchor.href=location.href;// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports(structure){// dataTypeExpression is optional and defaults to "*"
return function(dataTypeExpression,func){if(typeof dataTypeExpression!=="string"){func=dataTypeExpression;dataTypeExpression="*";}var dataType,i=0,dataTypes=dataTypeExpression.toLowerCase().match(rnothtmlwhite)||[];if(jQuery.isFunction(func)){// For each dataType in the dataTypeExpression
while(dataType=dataTypes[i++]){// Prepend if requested
if(dataType[0]==="+"){dataType=dataType.slice(1)||"*";(structure[dataType]=structure[dataType]||[]).unshift(func);// Otherwise append
}else{(structure[dataType]=structure[dataType]||[]).push(func);}}}};}// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR){var inspected={},seekingTransport=structure===transports;function inspect(dataType){var selected;inspected[dataType]=true;jQuery.each(structure[dataType]||[],function(_,prefilterOrFactory){var dataTypeOrTransport=prefilterOrFactory(options,originalOptions,jqXHR);if(typeof dataTypeOrTransport==="string"&&!seekingTransport&&!inspected[dataTypeOrTransport]){options.dataTypes.unshift(dataTypeOrTransport);inspect(dataTypeOrTransport);return false;}else if(seekingTransport){return!(selected=dataTypeOrTransport);}});return selected;}return inspect(options.dataTypes[0])||!inspected["*"]&&inspect("*");}// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend(target,src){var key,deep,flatOptions=jQuery.ajaxSettings.flatOptions||{};for(key in src){if(src[key]!==undefined){(flatOptions[key]?target:deep||(deep={}))[key]=src[key];}}if(deep){jQuery.extend(true,target,deep);}return target;}/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */function ajaxHandleResponses(s,jqXHR,responses){var ct,type,finalDataType,firstDataType,contents=s.contents,dataTypes=s.dataTypes;// Remove auto dataType and get content-type in the process
while(dataTypes[0]==="*"){dataTypes.shift();if(ct===undefined){ct=s.mimeType||jqXHR.getResponseHeader("Content-Type");}}// Check if we're dealing with a known content-type
if(ct){for(type in contents){if(contents[type]&&contents[type].test(ct)){dataTypes.unshift(type);break;}}}// Check to see if we have a response for the expected dataType
if(dataTypes[0]in responses){finalDataType=dataTypes[0];}else{// Try convertible dataTypes
for(type in responses){if(!dataTypes[0]||s.converters[type+" "+dataTypes[0]]){finalDataType=type;break;}if(!firstDataType){firstDataType=type;}}// Or just use first one
finalDataType=finalDataType||firstDataType;}// If we found a dataType
// We add the dataType to the list if needed
// and return the corresponding response
if(finalDataType){if(finalDataType!==dataTypes[0]){dataTypes.unshift(finalDataType);}return responses[finalDataType];}}/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */function ajaxConvert(s,response,jqXHR,isSuccess){var conv2,current,conv,tmp,prev,converters={},// Work with a copy of dataTypes in case we need to modify it for conversion
dataTypes=s.dataTypes.slice();// Create converters map with lowercased keys
if(dataTypes[1]){for(conv in s.converters){converters[conv.toLowerCase()]=s.converters[conv];}}current=dataTypes.shift();// Convert to each sequential dataType
while(current){if(s.responseFields[current]){jqXHR[s.responseFields[current]]=response;}// Apply the dataFilter if provided
if(!prev&&isSuccess&&s.dataFilter){response=s.dataFilter(response,s.dataType);}prev=current;current=dataTypes.shift();if(current){// There's only work to do if current dataType is non-auto
if(current==="*"){current=prev;// Convert response if prev dataType is non-auto and differs from current
}else if(prev!=="*"&&prev!==current){// Seek a direct converter
conv=converters[prev+" "+current]||converters["* "+current];// If none found, seek a pair
if(!conv){for(conv2 in converters){// If conv2 outputs current
tmp=conv2.split(" ");if(tmp[1]===current){// If prev can be converted to accepted input
conv=converters[prev+" "+tmp[0]]||converters["* "+tmp[0]];if(conv){// Condense equivalence converters
if(conv===true){conv=converters[conv2];// Otherwise, insert the intermediate dataType
}else if(converters[conv2]!==true){current=tmp[0];dataTypes.unshift(tmp[1]);}break;}}}}// Apply converter (if not an equivalence)
if(conv!==true){// Unless errors are allowed to bubble, catch and return them
if(conv&&s.throws){response=conv(response);}else{try{response=conv(response);}catch(e){return{state:"parsererror",error:conv?e:"No conversion from "+prev+" to "+current};}}}}}}return{state:"success",data:response};}jQuery.extend({// Counter for holding the number of active queries
active:0,// Last-Modified header cache for next request
lastModified:{},etag:{},ajaxSettings:{url:location.href,type:"GET",isLocal:rlocalProtocol.test(location.protocol),global:true,processData:true,async:true,contentType:"application/x-www-form-urlencoded; charset=UTF-8",/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/accepts:{"*":allTypes,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},// Data converters
// Keys separate source (or catchall "*") and destination types with a single space
converters:{// Convert anything to text
"* text":String,// Text to html (true = no transformation)
"text html":true,// Evaluate text as a json expression
"text json":JSON.parse,// Parse text as xml
"text xml":jQuery.parseXML},// For options that shouldn't be deep extended:
// you can add your own custom options here if
// and when you create one that shouldn't be
// deep extended (see ajaxExtend)
flatOptions:{url:true,context:true}},// Creates a full fledged settings object into target
// with both ajaxSettings and settings fields.
// If target is omitted, writes into ajaxSettings.
ajaxSetup:function ajaxSetup(target,settings){return settings?// Building a settings object
ajaxExtend(ajaxExtend(target,jQuery.ajaxSettings),settings):// Extending ajaxSettings
ajaxExtend(jQuery.ajaxSettings,target);},ajaxPrefilter:addToPrefiltersOrTransports(prefilters),ajaxTransport:addToPrefiltersOrTransports(transports),// Main method
ajax:function ajax(url,options){// If url is an object, simulate pre-1.5 signature
if((typeof url==="undefined"?"undefined":_typeof(url))==="object"){options=url;url=undefined;}// Force options to be an object
options=options||{};var transport,// URL without anti-cache param
cacheURL,// Response headers
responseHeadersString,responseHeaders,// timeout handle
timeoutTimer,// Url cleanup var
urlAnchor,// Request state (becomes false upon send and true upon completion)
completed,// To know if global events are to be dispatched
fireGlobals,// Loop variable
i,// uncached part of the url
uncached,// Create the final options object
s=jQuery.ajaxSetup({},options),// Callbacks context
callbackContext=s.context||s,// Context for global events is callbackContext if it is a DOM node or jQuery collection
globalEventContext=s.context&&(callbackContext.nodeType||callbackContext.jquery)?jQuery(callbackContext):jQuery.event,// Deferreds
deferred=jQuery.Deferred(),completeDeferred=jQuery.Callbacks("once memory"),// Status-dependent callbacks
_statusCode=s.statusCode||{},// Headers (they are sent all at once)
requestHeaders={},requestHeadersNames={},// Default abort message
strAbort="canceled",// Fake xhr
jqXHR={readyState:0,// Builds headers hashtable if needed
getResponseHeader:function getResponseHeader(key){var match;if(completed){if(!responseHeaders){responseHeaders={};while(match=rheaders.exec(responseHeadersString)){responseHeaders[match[1].toLowerCase()]=match[2];}}match=responseHeaders[key.toLowerCase()];}return match==null?null:match;},// Raw string
getAllResponseHeaders:function getAllResponseHeaders(){return completed?responseHeadersString:null;},// Caches the header
setRequestHeader:function setRequestHeader(name,value){if(completed==null){name=requestHeadersNames[name.toLowerCase()]=requestHeadersNames[name.toLowerCase()]||name;requestHeaders[name]=value;}return this;},// Overrides response content-type header
overrideMimeType:function overrideMimeType(type){if(completed==null){s.mimeType=type;}return this;},// Status-dependent callbacks
statusCode:function statusCode(map){var code;if(map){if(completed){// Execute the appropriate callbacks
jqXHR.always(map[jqXHR.status]);}else{// Lazy-add the new callbacks in a way that preserves old ones
for(code in map){_statusCode[code]=[_statusCode[code],map[code]];}}}return this;},// Cancel the request
abort:function abort(statusText){var finalText=statusText||strAbort;if(transport){transport.abort(finalText);}done(0,finalText);return this;}};// Attach deferreds
deferred.promise(jqXHR);// Add protocol if not provided (prefilters might expect it)
// Handle falsy url in the settings object (#10093: consistency with old signature)
// We also use the url parameter if available
s.url=((url||s.url||location.href)+"").replace(rprotocol,location.protocol+"//");// Alias method option to type as per ticket #12004
s.type=options.method||options.type||s.method||s.type;// Extract dataTypes list
s.dataTypes=(s.dataType||"*").toLowerCase().match(rnothtmlwhite)||[""];// A cross-domain request is in order when the origin doesn't match the current origin.
if(s.crossDomain==null){urlAnchor=document.createElement("a");// Support: IE <=8 - 11, Edge 12 - 13
// IE throws exception on accessing the href property if url is malformed,
// e.g. http://example.com:80x/
try{urlAnchor.href=s.url;// Support: IE <=8 - 11 only
// Anchor's host property isn't correctly set when s.url is relative
urlAnchor.href=urlAnchor.href;s.crossDomain=originAnchor.protocol+"//"+originAnchor.host!==urlAnchor.protocol+"//"+urlAnchor.host;}catch(e){// If there is an error parsing the URL, assume it is crossDomain,
// it can be rejected by the transport if it is invalid
s.crossDomain=true;}}// Convert data if not already a string
if(s.data&&s.processData&&typeof s.data!=="string"){s.data=jQuery.param(s.data,s.traditional);}// Apply prefilters
inspectPrefiltersOrTransports(prefilters,s,options,jqXHR);// If request was aborted inside a prefilter, stop there
if(completed){return jqXHR;}// We can fire global events as of now if asked to
// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
fireGlobals=jQuery.event&&s.global;// Watch for a new set of requests
if(fireGlobals&&jQuery.active++===0){jQuery.event.trigger("ajaxStart");}// Uppercase the type
s.type=s.type.toUpperCase();// Determine if request has content
s.hasContent=!rnoContent.test(s.type);// Save the URL in case we're toying with the If-Modified-Since
// and/or If-None-Match header later on
// Remove hash to simplify url manipulation
cacheURL=s.url.replace(rhash,"");// More options handling for requests with no content
if(!s.hasContent){// Remember the hash so we can put it back
uncached=s.url.slice(cacheURL.length);// If data is available, append data to url
if(s.data){cacheURL+=(rquery.test(cacheURL)?"&":"?")+s.data;// #9682: remove data so that it's not used in an eventual retry
delete s.data;}// Add or update anti-cache param if needed
if(s.cache===false){cacheURL=cacheURL.replace(rantiCache,"$1");uncached=(rquery.test(cacheURL)?"&":"?")+"_="+nonce++ +uncached;}// Put hash and anti-cache on the URL that will be requested (gh-1732)
s.url=cacheURL+uncached;// Change '%20' to '+' if this is encoded form body content (gh-2658)
}else if(s.data&&s.processData&&(s.contentType||"").indexOf("application/x-www-form-urlencoded")===0){s.data=s.data.replace(r20,"+");}// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
if(s.ifModified){if(jQuery.lastModified[cacheURL]){jqXHR.setRequestHeader("If-Modified-Since",jQuery.lastModified[cacheURL]);}if(jQuery.etag[cacheURL]){jqXHR.setRequestHeader("If-None-Match",jQuery.etag[cacheURL]);}}// Set the correct header, if data is being sent
if(s.data&&s.hasContent&&s.contentType!==false||options.contentType){jqXHR.setRequestHeader("Content-Type",s.contentType);}// Set the Accepts header for the server, depending on the dataType
jqXHR.setRequestHeader("Accept",s.dataTypes[0]&&s.accepts[s.dataTypes[0]]?s.accepts[s.dataTypes[0]]+(s.dataTypes[0]!=="*"?", "+allTypes+"; q=0.01":""):s.accepts["*"]);// Check for headers option
for(i in s.headers){jqXHR.setRequestHeader(i,s.headers[i]);}// Allow custom headers/mimetypes and early abort
if(s.beforeSend&&(s.beforeSend.call(callbackContext,jqXHR,s)===false||completed)){// Abort if not done already and return
return jqXHR.abort();}// Aborting is no longer a cancellation
strAbort="abort";// Install callbacks on deferreds
completeDeferred.add(s.complete);jqXHR.done(s.success);jqXHR.fail(s.error);// Get transport
transport=inspectPrefiltersOrTransports(transports,s,options,jqXHR);// If no transport, we auto-abort
if(!transport){done(-1,"No Transport");}else{jqXHR.readyState=1;// Send global event
if(fireGlobals){globalEventContext.trigger("ajaxSend",[jqXHR,s]);}// If request was aborted inside ajaxSend, stop there
if(completed){return jqXHR;}// Timeout
if(s.async&&s.timeout>0){timeoutTimer=window.setTimeout(function(){jqXHR.abort("timeout");},s.timeout);}try{completed=false;transport.send(requestHeaders,done);}catch(e){// Rethrow post-completion exceptions
if(completed){throw e;}// Propagate others as results
done(-1,e);}}// Callback for when everything is done
function done(status,nativeStatusText,responses,headers){var isSuccess,success,error,response,modified,statusText=nativeStatusText;// Ignore repeat invocations
if(completed){return;}completed=true;// Clear timeout if it exists
if(timeoutTimer){window.clearTimeout(timeoutTimer);}// Dereference transport for early garbage collection
// (no matter how long the jqXHR object will be used)
transport=undefined;// Cache response headers
responseHeadersString=headers||"";// Set readyState
jqXHR.readyState=status>0?4:0;// Determine if successful
isSuccess=status>=200&&status<300||status===304;// Get response data
if(responses){response=ajaxHandleResponses(s,jqXHR,responses);}// Convert no matter what (that way responseXXX fields are always set)
response=ajaxConvert(s,response,jqXHR,isSuccess);// If successful, handle type chaining
if(isSuccess){// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
if(s.ifModified){modified=jqXHR.getResponseHeader("Last-Modified");if(modified){jQuery.lastModified[cacheURL]=modified;}modified=jqXHR.getResponseHeader("etag");if(modified){jQuery.etag[cacheURL]=modified;}}// if no content
if(status===204||s.type==="HEAD"){statusText="nocontent";// if not modified
}else if(status===304){statusText="notmodified";// If we have data, let's convert it
}else{statusText=response.state;success=response.data;error=response.error;isSuccess=!error;}}else{// Extract error from statusText and normalize for non-aborts
error=statusText;if(status||!statusText){statusText="error";if(status<0){status=0;}}}// Set data for the fake xhr object
jqXHR.status=status;jqXHR.statusText=(nativeStatusText||statusText)+"";// Success/Error
if(isSuccess){deferred.resolveWith(callbackContext,[success,statusText,jqXHR]);}else{deferred.rejectWith(callbackContext,[jqXHR,statusText,error]);}// Status-dependent callbacks
jqXHR.statusCode(_statusCode);_statusCode=undefined;if(fireGlobals){globalEventContext.trigger(isSuccess?"ajaxSuccess":"ajaxError",[jqXHR,s,isSuccess?success:error]);}// Complete
completeDeferred.fireWith(callbackContext,[jqXHR,statusText]);if(fireGlobals){globalEventContext.trigger("ajaxComplete",[jqXHR,s]);// Handle the global AJAX counter
if(! --jQuery.active){jQuery.event.trigger("ajaxStop");}}}return jqXHR;},getJSON:function getJSON(url,data,callback){return jQuery.get(url,data,callback,"json");},getScript:function getScript(url,callback){return jQuery.get(url,undefined,callback,"script");}});jQuery.each(["get","post"],function(i,method){jQuery[method]=function(url,data,callback,type){// Shift arguments if data argument was omitted
if(jQuery.isFunction(data)){type=type||callback;callback=data;data=undefined;}// The url can be an options object (which then must have .url)
return jQuery.ajax(jQuery.extend({url:url,type:method,dataType:type,data:data,success:callback},jQuery.isPlainObject(url)&&url));};});jQuery._evalUrl=function(url){return jQuery.ajax({url:url,// Make this explicit, since user can override this through ajaxSetup (#11264)
type:"GET",dataType:"script",cache:true,async:false,global:false,"throws":true});};jQuery.fn.extend({wrapAll:function wrapAll(html){var wrap;if(this[0]){if(jQuery.isFunction(html)){html=html.call(this[0]);}// The elements to wrap the target around
wrap=jQuery(html,this[0].ownerDocument).eq(0).clone(true);if(this[0].parentNode){wrap.insertBefore(this[0]);}wrap.map(function(){var elem=this;while(elem.firstElementChild){elem=elem.firstElementChild;}return elem;}).append(this);}return this;},wrapInner:function wrapInner(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapInner(html.call(this,i));});}return this.each(function(){var self=jQuery(this),contents=self.contents();if(contents.length){contents.wrapAll(html);}else{self.append(html);}});},wrap:function wrap(html){var isFunction=jQuery.isFunction(html);return this.each(function(i){jQuery(this).wrapAll(isFunction?html.call(this,i):html);});},unwrap:function unwrap(selector){this.parent(selector).not("body").each(function(){jQuery(this).replaceWith(this.childNodes);});return this;}});jQuery.expr.pseudos.hidden=function(elem){return!jQuery.expr.pseudos.visible(elem);};jQuery.expr.pseudos.visible=function(elem){return!!(elem.offsetWidth||elem.offsetHeight||elem.getClientRects().length);};jQuery.ajaxSettings.xhr=function(){try{return new window.XMLHttpRequest();}catch(e){}};var xhrSuccessStatus={// File protocol always yields status code 0, assume 200
0:200,// Support: IE <=9 only
// #1450: sometimes IE returns 1223 when it should be 204
1223:204},xhrSupported=jQuery.ajaxSettings.xhr();support.cors=!!xhrSupported&&"withCredentials"in xhrSupported;support.ajax=xhrSupported=!!xhrSupported;jQuery.ajaxTransport(function(options){var _callback,errorCallback;// Cross domain only allowed if supported through XMLHttpRequest
if(support.cors||xhrSupported&&!options.crossDomain){return{send:function send(headers,complete){var i,xhr=options.xhr();xhr.open(options.type,options.url,options.async,options.username,options.password);// Apply custom fields if provided
if(options.xhrFields){for(i in options.xhrFields){xhr[i]=options.xhrFields[i];}}// Override mime type if needed
if(options.mimeType&&xhr.overrideMimeType){xhr.overrideMimeType(options.mimeType);}// X-Requested-With header
// For cross-domain requests, seeing as conditions for a preflight are
// akin to a jigsaw puzzle, we simply never set it to be sure.
// (it can always be set on a per-request basis or even using ajaxSetup)
// For same-domain requests, won't change header if already provided.
if(!options.crossDomain&&!headers["X-Requested-With"]){headers["X-Requested-With"]="XMLHttpRequest";}// Set headers
for(i in headers){xhr.setRequestHeader(i,headers[i]);}// Callback
_callback=function callback(type){return function(){if(_callback){_callback=errorCallback=xhr.onload=xhr.onerror=xhr.onabort=xhr.onreadystatechange=null;if(type==="abort"){xhr.abort();}else if(type==="error"){// Support: IE <=9 only
// On a manual native abort, IE9 throws
// errors on any property access that is not readyState
if(typeof xhr.status!=="number"){complete(0,"error");}else{complete(// File: protocol always yields status 0; see #8605, #14207
xhr.status,xhr.statusText);}}else{complete(xhrSuccessStatus[xhr.status]||xhr.status,xhr.statusText,// Support: IE <=9 only
// IE9 has no XHR2 but throws on binary (trac-11426)
// For XHR2 non-text, let the caller handle it (gh-2498)
(xhr.responseType||"text")!=="text"||typeof xhr.responseText!=="string"?{binary:xhr.response}:{text:xhr.responseText},xhr.getAllResponseHeaders());}}};};// Listen to events
xhr.onload=_callback();errorCallback=xhr.onerror=_callback("error");// Support: IE 9 only
// Use onreadystatechange to replace onabort
// to handle uncaught aborts
if(xhr.onabort!==undefined){xhr.onabort=errorCallback;}else{xhr.onreadystatechange=function(){// Check readyState before timeout as it changes
if(xhr.readyState===4){// Allow onerror to be called first,
// but that will not handle a native abort
// Also, save errorCallback to a variable
// as xhr.onerror cannot be accessed
window.setTimeout(function(){if(_callback){errorCallback();}});}};}// Create the abort callback
_callback=_callback("abort");try{// Do send the request (this may raise an exception)
xhr.send(options.hasContent&&options.data||null);}catch(e){// #14683: Only rethrow if this hasn't been notified as an error yet
if(_callback){throw e;}}},abort:function abort(){if(_callback){_callback();}}};}});// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter(function(s){if(s.crossDomain){s.contents.script=false;}});// Install script dataType
jQuery.ajaxSetup({accepts:{script:"text/javascript, application/javascript, "+"application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function textScript(text){jQuery.globalEval(text);return text;}}});// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter("script",function(s){if(s.cache===undefined){s.cache=false;}if(s.crossDomain){s.type="GET";}});// Bind script tag hack transport
jQuery.ajaxTransport("script",function(s){// This transport only deals with cross domain requests
if(s.crossDomain){var script,_callback2;return{send:function send(_,complete){script=jQuery("<script>").prop({charset:s.scriptCharset,src:s.url}).on("load error",_callback2=function callback(evt){script.remove();_callback2=null;if(evt){complete(evt.type==="error"?404:200,evt.type);}});// Use native DOM manipulation to avoid our domManip AJAX trickery
document.head.appendChild(script[0]);},abort:function abort(){if(_callback2){_callback2();}}};}});var oldCallbacks=[],rjsonp=/(=)\?(?=&|$)|\?\?/;// Default jsonp settings
jQuery.ajaxSetup({jsonp:"callback",jsonpCallback:function jsonpCallback(){var callback=oldCallbacks.pop()||jQuery.expando+"_"+nonce++;this[callback]=true;return callback;}});// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter("json jsonp",function(s,originalSettings,jqXHR){var callbackName,overwritten,responseContainer,jsonProp=s.jsonp!==false&&(rjsonp.test(s.url)?"url":typeof s.data==="string"&&(s.contentType||"").indexOf("application/x-www-form-urlencoded")===0&&rjsonp.test(s.data)&&"data");// Handle iff the expected data type is "jsonp" or we have a parameter to set
if(jsonProp||s.dataTypes[0]==="jsonp"){// Get callback name, remembering preexisting value associated with it
callbackName=s.jsonpCallback=jQuery.isFunction(s.jsonpCallback)?s.jsonpCallback():s.jsonpCallback;// Insert callback into url or form data
if(jsonProp){s[jsonProp]=s[jsonProp].replace(rjsonp,"$1"+callbackName);}else if(s.jsonp!==false){s.url+=(rquery.test(s.url)?"&":"?")+s.jsonp+"="+callbackName;}// Use data converter to retrieve json after script execution
s.converters["script json"]=function(){if(!responseContainer){jQuery.error(callbackName+" was not called");}return responseContainer[0];};// Force json dataType
s.dataTypes[0]="json";// Install callback
overwritten=window[callbackName];window[callbackName]=function(){responseContainer=arguments;};// Clean-up function (fires after converters)
jqXHR.always(function(){// If previous value didn't exist - remove it
if(overwritten===undefined){jQuery(window).removeProp(callbackName);// Otherwise restore preexisting value
}else{window[callbackName]=overwritten;}// Save back as free
if(s[callbackName]){// Make sure that re-using the options doesn't screw things around
s.jsonpCallback=originalSettings.jsonpCallback;// Save the callback name for future use
oldCallbacks.push(callbackName);}// Call if it was a function and we have a response
if(responseContainer&&jQuery.isFunction(overwritten)){overwritten(responseContainer[0]);}responseContainer=overwritten=undefined;});// Delegate to script
return"script";}});// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument=function(){var body=document.implementation.createHTMLDocument("").body;body.innerHTML="<form></form><form></form>";return body.childNodes.length===2;}();// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML=function(data,context,keepScripts){if(typeof data!=="string"){return[];}if(typeof context==="boolean"){keepScripts=context;context=false;}var base,parsed,scripts;if(!context){// Stop scripts or inline event handlers from being executed immediately
// by using document.implementation
if(support.createHTMLDocument){context=document.implementation.createHTMLDocument("");// Set the base href for the created document
// so any parsed elements with URLs
// are based on the document's URL (gh-2965)
base=context.createElement("base");base.href=document.location.href;context.head.appendChild(base);}else{context=document;}}parsed=rsingleTag.exec(data);scripts=!keepScripts&&[];// Single tag
if(parsed){return[context.createElement(parsed[1])];}parsed=buildFragment([data],context,scripts);if(scripts&&scripts.length){jQuery(scripts).remove();}return jQuery.merge([],parsed.childNodes);};/**
 * Load a url into a page
 */jQuery.fn.load=function(url,params,callback){var selector,type,response,self=this,off=url.indexOf(" ");if(off>-1){selector=stripAndCollapse(url.slice(off));url=url.slice(0,off);}// If it's a function
if(jQuery.isFunction(params)){// We assume that it's the callback
callback=params;params=undefined;// Otherwise, build a param string
}else if(params&&(typeof params==="undefined"?"undefined":_typeof(params))==="object"){type="POST";}// If we have elements to modify, make the request
if(self.length>0){jQuery.ajax({url:url,// If "type" variable is undefined, then "GET" method will be used.
// Make value of this field explicit since
// user can override it through ajaxSetup method
type:type||"GET",dataType:"html",data:params}).done(function(responseText){// Save response for use in complete callback
response=arguments;self.html(selector?// If a selector was specified, locate the right elements in a dummy div
// Exclude scripts to avoid IE 'Permission Denied' errors
jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector):// Otherwise use the full result
responseText);// If the request succeeds, this function gets "data", "status", "jqXHR"
// but they are ignored because response was set above.
// If it fails, this function gets "jqXHR", "status", "error"
}).always(callback&&function(jqXHR,status){self.each(function(){callback.apply(this,response||[jqXHR.responseText,status,jqXHR]);});});}return this;};// Attach a bunch of functions for handling common AJAX events
jQuery.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(i,type){jQuery.fn[type]=function(fn){return this.on(type,fn);};});jQuery.expr.pseudos.animated=function(elem){return jQuery.grep(jQuery.timers,function(fn){return elem===fn.elem;}).length;};jQuery.offset={setOffset:function setOffset(elem,options,i){var curPosition,curLeft,curCSSTop,curTop,curOffset,curCSSLeft,calculatePosition,position=jQuery.css(elem,"position"),curElem=jQuery(elem),props={};// Set position first, in-case top/left are set even on static elem
if(position==="static"){elem.style.position="relative";}curOffset=curElem.offset();curCSSTop=jQuery.css(elem,"top");curCSSLeft=jQuery.css(elem,"left");calculatePosition=(position==="absolute"||position==="fixed")&&(curCSSTop+curCSSLeft).indexOf("auto")>-1;// Need to be able to calculate position if either
// top or left is auto and position is either absolute or fixed
if(calculatePosition){curPosition=curElem.position();curTop=curPosition.top;curLeft=curPosition.left;}else{curTop=parseFloat(curCSSTop)||0;curLeft=parseFloat(curCSSLeft)||0;}if(jQuery.isFunction(options)){// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
options=options.call(elem,i,jQuery.extend({},curOffset));}if(options.top!=null){props.top=options.top-curOffset.top+curTop;}if(options.left!=null){props.left=options.left-curOffset.left+curLeft;}if("using"in options){options.using.call(elem,props);}else{curElem.css(props);}}};jQuery.fn.extend({offset:function offset(options){// Preserve chaining for setter
if(arguments.length){return options===undefined?this:this.each(function(i){jQuery.offset.setOffset(this,options,i);});}var doc,docElem,rect,win,elem=this[0];if(!elem){return;}// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
// Support: IE <=11 only
// Running getBoundingClientRect on a
// disconnected node in IE throws an error
if(!elem.getClientRects().length){return{top:0,left:0};}rect=elem.getBoundingClientRect();doc=elem.ownerDocument;docElem=doc.documentElement;win=doc.defaultView;return{top:rect.top+win.pageYOffset-docElem.clientTop,left:rect.left+win.pageXOffset-docElem.clientLeft};},position:function position(){if(!this[0]){return;}var offsetParent,offset,elem=this[0],parentOffset={top:0,left:0};// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
// because it is its only offset parent
if(jQuery.css(elem,"position")==="fixed"){// Assume getBoundingClientRect is there when computed position is fixed
offset=elem.getBoundingClientRect();}else{// Get *real* offsetParent
offsetParent=this.offsetParent();// Get correct offsets
offset=this.offset();if(!nodeName(offsetParent[0],"html")){parentOffset=offsetParent.offset();}// Add offsetParent borders
parentOffset={top:parentOffset.top+jQuery.css(offsetParent[0],"borderTopWidth",true),left:parentOffset.left+jQuery.css(offsetParent[0],"borderLeftWidth",true)};}// Subtract parent offsets and element margins
return{top:offset.top-parentOffset.top-jQuery.css(elem,"marginTop",true),left:offset.left-parentOffset.left-jQuery.css(elem,"marginLeft",true)};},// This method will return documentElement in the following cases:
// 1) For the element inside the iframe without offsetParent, this method will return
//    documentElement of the parent window
// 2) For the hidden or detached element
// 3) For body or html element, i.e. in case of the html node - it will return itself
//
// but those exceptions were never presented as a real life use-cases
// and might be considered as more preferable results.
//
// This logic, however, is not guaranteed and can change at any point in the future
offsetParent:function offsetParent(){return this.map(function(){var offsetParent=this.offsetParent;while(offsetParent&&jQuery.css(offsetParent,"position")==="static"){offsetParent=offsetParent.offsetParent;}return offsetParent||documentElement;});}});// Create scrollLeft and scrollTop methods
jQuery.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(method,prop){var top="pageYOffset"===prop;jQuery.fn[method]=function(val){return access(this,function(elem,method,val){// Coalesce documents and windows
var win;if(jQuery.isWindow(elem)){win=elem;}else if(elem.nodeType===9){win=elem.defaultView;}if(val===undefined){return win?win[prop]:elem[method];}if(win){win.scrollTo(!top?val:win.pageXOffset,top?val:win.pageYOffset);}else{elem[method]=val;}},method,val,arguments.length);};});// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each(["top","left"],function(i,prop){jQuery.cssHooks[prop]=addGetHookIf(support.pixelPosition,function(elem,computed){if(computed){computed=curCSS(elem,prop);// If curCSS returns percentage, fallback to offset
return rnumnonpx.test(computed)?jQuery(elem).position()[prop]+"px":computed;}});});// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each({Height:"height",Width:"width"},function(name,type){jQuery.each({padding:"inner"+name,content:type,"":"outer"+name},function(defaultExtra,funcName){// Margin is only for outerHeight, outerWidth
jQuery.fn[funcName]=function(margin,value){var chainable=arguments.length&&(defaultExtra||typeof margin!=="boolean"),extra=defaultExtra||(margin===true||value===true?"margin":"border");return access(this,function(elem,type,value){var doc;if(jQuery.isWindow(elem)){// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
return funcName.indexOf("outer")===0?elem["inner"+name]:elem.document.documentElement["client"+name];}// Get document width or height
if(elem.nodeType===9){doc=elem.documentElement;// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
// whichever is greatest
return Math.max(elem.body["scroll"+name],doc["scroll"+name],elem.body["offset"+name],doc["offset"+name],doc["client"+name]);}return value===undefined?// Get width or height on the element, requesting but not forcing parseFloat
jQuery.css(elem,type,extra):// Set width or height on the element
jQuery.style(elem,type,value,extra);},type,chainable?margin:undefined,chainable);};});});jQuery.fn.extend({bind:function bind(types,data,fn){return this.on(types,null,data,fn);},unbind:function unbind(types,fn){return this.off(types,null,fn);},delegate:function delegate(selector,types,data,fn){return this.on(types,selector,data,fn);},undelegate:function undelegate(selector,types,fn){// ( namespace ) or ( selector, types [, fn] )
return arguments.length===1?this.off(selector,"**"):this.off(types,selector||"**",fn);}});jQuery.holdReady=function(hold){if(hold){jQuery.readyWait++;}else{jQuery.ready(true);}};jQuery.isArray=Array.isArray;jQuery.parseJSON=JSON.parse;jQuery.nodeName=nodeName;// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
if(typeof define==="function"&&define.amd){define("jquery",[],function(){return jQuery;});}var// Map over jQuery in case of overwrite
_jQuery=window.jQuery,// Map over the $ in case of overwrite
_$=window.$;jQuery.noConflict=function(deep){if(window.$===jQuery){window.$=_$;}if(deep&&window.jQuery===jQuery){window.jQuery=_jQuery;}return jQuery;};// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if(!noGlobal){window.jQuery=window.$=jQuery;}return jQuery;});/**
 * Swiper 4.0.7
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 *
 * Copyright 2014-2017 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: November 28, 2017
 */(function(global,factory){(typeof exports==="undefined"?"undefined":_typeof(exports))==='object'&&typeof module!=='undefined'?module.exports=factory():typeof define==='function'&&define.amd?define(factory):global.Swiper=factory();})(this,function(){'use strict';var w;if(typeof window==='undefined'){w={navigator:{userAgent:''},location:{},history:{},addEventListener:function addEventListener(){},removeEventListener:function removeEventListener(){},getComputedStyle:function getComputedStyle(){return{};},Image:function Image(){},Date:function Date(){},screen:{}};}else{w=window;}var win=w;/**
 * Dom7 2.0.1
 * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
 * http://framework7.io/docs/dom.html
 *
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * Released on: October 2, 2017
 */var Dom7=function Dom7(arr){var self=this;// Create array-like object
for(var i=0;i<arr.length;i+=1){self[i]=arr[i];}self.length=arr.length;// Return collection with methods
return this;};function $$1(selector,context){var arr=[];var i=0;if(selector&&!context){if(selector instanceof Dom7){return selector;}}if(selector){// String
if(typeof selector==='string'){var els;var tempParent;var html=selector.trim();if(html.indexOf('<')>=0&&html.indexOf('>')>=0){var toCreate='div';if(html.indexOf('<li')===0){toCreate='ul';}if(html.indexOf('<tr')===0){toCreate='tbody';}if(html.indexOf('<td')===0||html.indexOf('<th')===0){toCreate='tr';}if(html.indexOf('<tbody')===0){toCreate='table';}if(html.indexOf('<option')===0){toCreate='select';}tempParent=document.createElement(toCreate);tempParent.innerHTML=html;for(i=0;i<tempParent.childNodes.length;i+=1){arr.push(tempParent.childNodes[i]);}}else{if(!context&&selector[0]==='#'&&!selector.match(/[ .<>:~]/)){// Pure ID selector
els=[document.getElementById(selector.trim().split('#')[1])];}else{// Other selectors
els=(context||document).querySelectorAll(selector.trim());}for(i=0;i<els.length;i+=1){if(els[i]){arr.push(els[i]);}}}}else if(selector.nodeType||selector===window||selector===document){// Node/element
arr.push(selector);}else if(selector.length>0&&selector[0].nodeType){// Array of elements or instance of Dom
for(i=0;i<selector.length;i+=1){arr.push(selector[i]);}}}return new Dom7(arr);}$$1.fn=Dom7.prototype;$$1.Class=Dom7;$$1.Dom7=Dom7;function unique(arr){var uniqueArray=[];for(var i=0;i<arr.length;i+=1){if(uniqueArray.indexOf(arr[i])===-1){uniqueArray.push(arr[i]);}}return uniqueArray;}// Classes and attributes
function addClass(className){var this$1=this;if(typeof className==='undefined'){return this;}var classes=className.split(' ');for(var i=0;i<classes.length;i+=1){for(var j=0;j<this.length;j+=1){if(typeof this$1[j].classList!=='undefined'){this$1[j].classList.add(classes[i]);}}}return this;}function removeClass(className){var this$1=this;var classes=className.split(' ');for(var i=0;i<classes.length;i+=1){for(var j=0;j<this.length;j+=1){if(typeof this$1[j].classList!=='undefined'){this$1[j].classList.remove(classes[i]);}}}return this;}function hasClass(className){if(!this[0]){return false;}return this[0].classList.contains(className);}function toggleClass(className){var this$1=this;var classes=className.split(' ');for(var i=0;i<classes.length;i+=1){for(var j=0;j<this.length;j+=1){if(typeof this$1[j].classList!=='undefined'){this$1[j].classList.toggle(classes[i]);}}}return this;}function attr(attrs,value){var arguments$1=arguments;var this$1=this;if(arguments.length===1&&typeof attrs==='string'){// Get attr
if(this[0]){return this[0].getAttribute(attrs);}return undefined;}// Set attrs
for(var i=0;i<this.length;i+=1){if(arguments$1.length===2){// String
this$1[i].setAttribute(attrs,value);}else{// Object
// eslint-disable-next-line
for(var attrName in attrs){this$1[i][attrName]=attrs[attrName];this$1[i].setAttribute(attrName,attrs[attrName]);}}}return this;}// eslint-disable-next-line
function removeAttr(attr){var this$1=this;for(var i=0;i<this.length;i+=1){this$1[i].removeAttribute(attr);}return this;}function data(key,value){var this$1=this;var el;if(typeof value==='undefined'){el=this[0];// Get value
if(el){if(el.dom7ElementDataStorage&&key in el.dom7ElementDataStorage){return el.dom7ElementDataStorage[key];}var dataKey=el.getAttribute("data-"+key);if(dataKey){return dataKey;}return undefined;}return undefined;}// Set value
for(var i=0;i<this.length;i+=1){el=this$1[i];if(!el.dom7ElementDataStorage){el.dom7ElementDataStorage={};}el.dom7ElementDataStorage[key]=value;}return this;}// Transforms
// eslint-disable-next-line
function transform(transform){var this$1=this;for(var i=0;i<this.length;i+=1){var elStyle=this$1[i].style;elStyle.webkitTransform=transform;elStyle.transform=transform;}return this;}function transition(duration){var this$1=this;if(typeof duration!=='string'){duration=duration+"ms";// eslint-disable-line
}for(var i=0;i<this.length;i+=1){var elStyle=this$1[i].style;elStyle.webkitTransitionDuration=duration;elStyle.transitionDuration=duration;}return this;}// Events
function on(){var this$1=this;var args=[],len=arguments.length;while(len--){args[len]=arguments[len];}var eventType=args[0];var targetSelector=args[1];var listener=args[2];var capture=args[3];if(typeof args[1]==='function'){var assign;assign=args,eventType=assign[0],listener=assign[1],capture=assign[2];targetSelector=undefined;}if(!capture){capture=false;}function handleLiveEvent(e){var target=e.target;if(!target){return;}var eventData=e.target.dom7EventData||[];eventData.unshift(e);if($$1(target).is(targetSelector)){listener.apply(target,eventData);}else{var parents=$$1(target).parents();// eslint-disable-line
for(var k=0;k<parents.length;k+=1){if($$1(parents[k]).is(targetSelector)){listener.apply(parents[k],eventData);}}}}function handleEvent(e){var eventData=e&&e.target?e.target.dom7EventData||[]:[];eventData.unshift(e);listener.apply(this,eventData);}var events=eventType.split(' ');var j;for(var i=0;i<this.length;i+=1){var el=this$1[i];if(!targetSelector){for(j=0;j<events.length;j+=1){if(!el.dom7Listeners){el.dom7Listeners=[];}el.dom7Listeners.push({type:eventType,listener:listener,proxyListener:handleEvent});el.addEventListener(events[j],handleEvent,capture);}}else{// Live events
for(j=0;j<events.length;j+=1){if(!el.dom7LiveListeners){el.dom7LiveListeners=[];}el.dom7LiveListeners.push({type:eventType,listener:listener,proxyListener:handleLiveEvent});el.addEventListener(events[j],handleLiveEvent,capture);}}}return this;}function off(){var this$1=this;var args=[],len=arguments.length;while(len--){args[len]=arguments[len];}var eventType=args[0];var targetSelector=args[1];var listener=args[2];var capture=args[3];if(typeof args[1]==='function'){var assign;assign=args,eventType=assign[0],listener=assign[1],capture=assign[2];targetSelector=undefined;}if(!capture){capture=false;}var events=eventType.split(' ');for(var i=0;i<events.length;i+=1){for(var j=0;j<this.length;j+=1){var el=this$1[j];if(!targetSelector){if(el.dom7Listeners){for(var k=0;k<el.dom7Listeners.length;k+=1){if(listener){if(el.dom7Listeners[k].listener===listener){el.removeEventListener(events[i],el.dom7Listeners[k].proxyListener,capture);}}else if(el.dom7Listeners[k].type===events[i]){el.removeEventListener(events[i],el.dom7Listeners[k].proxyListener,capture);}}}}else if(el.dom7LiveListeners){for(var k$1=0;k$1<el.dom7LiveListeners.length;k$1+=1){if(listener){if(el.dom7LiveListeners[k$1].listener===listener){el.removeEventListener(events[i],el.dom7LiveListeners[k$1].proxyListener,capture);}}else if(el.dom7LiveListeners[k$1].type===events[i]){el.removeEventListener(events[i],el.dom7LiveListeners[k$1].proxyListener,capture);}}}}}return this;}function trigger(){var this$1=this;var args=[],len=arguments.length;while(len--){args[len]=arguments[len];}var events=args[0].split(' ');var eventData=args[1];for(var i=0;i<events.length;i+=1){for(var j=0;j<this.length;j+=1){var evt=void 0;try{evt=new window.CustomEvent(events[i],{detail:eventData,bubbles:true,cancelable:true});}catch(e){evt=document.createEvent('Event');evt.initEvent(events[i],true,true);evt.detail=eventData;}// eslint-disable-next-line
this$1[j].dom7EventData=args.filter(function(data,dataIndex){return dataIndex>0;});this$1[j].dispatchEvent(evt);this$1[j].dom7EventData=[];delete this$1[j].dom7EventData;}}return this;}function transitionEnd(callback){var events=['webkitTransitionEnd','transitionend'];var dom=this;var i;function fireCallBack(e){/* jshint validthis:true */if(e.target!==this){return;}callback.call(this,e);for(i=0;i<events.length;i+=1){dom.off(events[i],fireCallBack);}}if(callback){for(i=0;i<events.length;i+=1){dom.on(events[i],fireCallBack);}}return this;}function outerWidth(includeMargins){if(this.length>0){if(includeMargins){// eslint-disable-next-line
var styles=this.styles();return this[0].offsetWidth+parseFloat(styles.getPropertyValue('margin-right'))+parseFloat(styles.getPropertyValue('margin-left'));}return this[0].offsetWidth;}return null;}function outerHeight(includeMargins){if(this.length>0){if(includeMargins){// eslint-disable-next-line
var styles=this.styles();return this[0].offsetHeight+parseFloat(styles.getPropertyValue('margin-top'))+parseFloat(styles.getPropertyValue('margin-bottom'));}return this[0].offsetHeight;}return null;}function offset(){if(this.length>0){var el=this[0];var box=el.getBoundingClientRect();var body=document.body;var clientTop=el.clientTop||body.clientTop||0;var clientLeft=el.clientLeft||body.clientLeft||0;var scrollTop=el===window?window.scrollY:el.scrollTop;var scrollLeft=el===window?window.scrollX:el.scrollLeft;return{top:box.top+scrollTop-clientTop,left:box.left+scrollLeft-clientLeft};}return null;}function styles(){if(this[0]){return window.getComputedStyle(this[0],null);}return{};}function css(props,value){var this$1=this;var i;if(arguments.length===1){if(typeof props==='string'){if(this[0]){return window.getComputedStyle(this[0],null).getPropertyValue(props);}}else{for(i=0;i<this.length;i+=1){// eslint-disable-next-line
for(var prop in props){this$1[i].style[prop]=props[prop];}}return this;}}if(arguments.length===2&&typeof props==='string'){for(i=0;i<this.length;i+=1){this$1[i].style[props]=value;}return this;}return this;}// Iterate over the collection passing elements to `callback`
function each(callback){var this$1=this;// Don't bother continuing without a callback
if(!callback){return this;}// Iterate over the current collection
for(var i=0;i<this.length;i+=1){// If the callback returns false
if(callback.call(this$1[i],i,this$1[i])===false){// End the loop early
return this$1;}}// Return `this` to allow chained DOM operations
return this;}// eslint-disable-next-line
function html(html){var this$1=this;if(typeof html==='undefined'){return this[0]?this[0].innerHTML:undefined;}for(var i=0;i<this.length;i+=1){this$1[i].innerHTML=html;}return this;}// eslint-disable-next-line
function text(text){var this$1=this;if(typeof text==='undefined'){if(this[0]){return this[0].textContent.trim();}return null;}for(var i=0;i<this.length;i+=1){this$1[i].textContent=text;}return this;}function is(selector){var el=this[0];var compareWith;var i;if(!el||typeof selector==='undefined'){return false;}if(typeof selector==='string'){if(el.matches){return el.matches(selector);}else if(el.webkitMatchesSelector){return el.webkitMatchesSelector(selector);}else if(el.msMatchesSelector){return el.msMatchesSelector(selector);}compareWith=$$1(selector);for(i=0;i<compareWith.length;i+=1){if(compareWith[i]===el){return true;}}return false;}else if(selector===document){return el===document;}else if(selector===window){return el===window;}if(selector.nodeType||selector instanceof Dom7){compareWith=selector.nodeType?[selector]:selector;for(i=0;i<compareWith.length;i+=1){if(compareWith[i]===el){return true;}}return false;}return false;}function index(){var child=this[0];var i;if(child){i=0;// eslint-disable-next-line
while((child=child.previousSibling)!==null){if(child.nodeType===1){i+=1;}}return i;}return undefined;}// eslint-disable-next-line
function eq(index){if(typeof index==='undefined'){return this;}var length=this.length;var returnIndex;if(index>length-1){return new Dom7([]);}if(index<0){returnIndex=length+index;if(returnIndex<0){return new Dom7([]);}return new Dom7([this[returnIndex]]);}return new Dom7([this[index]]);}function append(){var this$1=this;var args=[],len=arguments.length;while(len--){args[len]=arguments[len];}var newChild;for(var k=0;k<args.length;k+=1){newChild=args[k];for(var i=0;i<this.length;i+=1){if(typeof newChild==='string'){var tempDiv=document.createElement('div');tempDiv.innerHTML=newChild;while(tempDiv.firstChild){this$1[i].appendChild(tempDiv.firstChild);}}else if(newChild instanceof Dom7){for(var j=0;j<newChild.length;j+=1){this$1[i].appendChild(newChild[j]);}}else{this$1[i].appendChild(newChild);}}}return this;}function prepend(newChild){var this$1=this;var i;var j;for(i=0;i<this.length;i+=1){if(typeof newChild==='string'){var tempDiv=document.createElement('div');tempDiv.innerHTML=newChild;for(j=tempDiv.childNodes.length-1;j>=0;j-=1){this$1[i].insertBefore(tempDiv.childNodes[j],this$1[i].childNodes[0]);}}else if(newChild instanceof Dom7){for(j=0;j<newChild.length;j+=1){this$1[i].insertBefore(newChild[j],this$1[i].childNodes[0]);}}else{this$1[i].insertBefore(newChild,this$1[i].childNodes[0]);}}return this;}function next(selector){if(this.length>0){if(selector){if(this[0].nextElementSibling&&$$1(this[0].nextElementSibling).is(selector)){return new Dom7([this[0].nextElementSibling]);}return new Dom7([]);}if(this[0].nextElementSibling){return new Dom7([this[0].nextElementSibling]);}return new Dom7([]);}return new Dom7([]);}function nextAll(selector){var nextEls=[];var el=this[0];if(!el){return new Dom7([]);}while(el.nextElementSibling){var next=el.nextElementSibling;// eslint-disable-line
if(selector){if($$1(next).is(selector)){nextEls.push(next);}}else{nextEls.push(next);}el=next;}return new Dom7(nextEls);}function prev(selector){if(this.length>0){var el=this[0];if(selector){if(el.previousElementSibling&&$$1(el.previousElementSibling).is(selector)){return new Dom7([el.previousElementSibling]);}return new Dom7([]);}if(el.previousElementSibling){return new Dom7([el.previousElementSibling]);}return new Dom7([]);}return new Dom7([]);}function prevAll(selector){var prevEls=[];var el=this[0];if(!el){return new Dom7([]);}while(el.previousElementSibling){var prev=el.previousElementSibling;// eslint-disable-line
if(selector){if($$1(prev).is(selector)){prevEls.push(prev);}}else{prevEls.push(prev);}el=prev;}return new Dom7(prevEls);}function parent(selector){var this$1=this;var parents=[];// eslint-disable-line
for(var i=0;i<this.length;i+=1){if(this$1[i].parentNode!==null){if(selector){if($$1(this$1[i].parentNode).is(selector)){parents.push(this$1[i].parentNode);}}else{parents.push(this$1[i].parentNode);}}}return $$1(unique(parents));}function parents(selector){var this$1=this;var parents=[];// eslint-disable-line
for(var i=0;i<this.length;i+=1){var parent=this$1[i].parentNode;// eslint-disable-line
while(parent){if(selector){if($$1(parent).is(selector)){parents.push(parent);}}else{parents.push(parent);}parent=parent.parentNode;}}return $$1(unique(parents));}function closest(selector){var closest=this;// eslint-disable-line
if(typeof selector==='undefined'){return new Dom7([]);}if(!closest.is(selector)){closest=closest.parents(selector).eq(0);}return closest;}function find(selector){var this$1=this;var foundElements=[];for(var i=0;i<this.length;i+=1){var found=this$1[i].querySelectorAll(selector);for(var j=0;j<found.length;j+=1){foundElements.push(found[j]);}}return new Dom7(foundElements);}function children(selector){var this$1=this;var children=[];// eslint-disable-line
for(var i=0;i<this.length;i+=1){var childNodes=this$1[i].childNodes;for(var j=0;j<childNodes.length;j+=1){if(!selector){if(childNodes[j].nodeType===1){children.push(childNodes[j]);}}else if(childNodes[j].nodeType===1&&$$1(childNodes[j]).is(selector)){children.push(childNodes[j]);}}}return new Dom7(unique(children));}function remove(){var this$1=this;for(var i=0;i<this.length;i+=1){if(this$1[i].parentNode){this$1[i].parentNode.removeChild(this$1[i]);}}return this;}function add(){var args=[],len=arguments.length;while(len--){args[len]=arguments[len];}var dom=this;var i;var j;for(i=0;i<args.length;i+=1){var toAdd=$$1(args[i]);for(j=0;j<toAdd.length;j+=1){dom[dom.length]=toAdd[j];dom.length+=1;}}return dom;}var noTrigger='resize scroll'.split(' ');var Methods={addClass:addClass,removeClass:removeClass,hasClass:hasClass,toggleClass:toggleClass,attr:attr,removeAttr:removeAttr,data:data,transform:transform,transition:transition,on:on,off:off,trigger:trigger,transitionEnd:transitionEnd,outerWidth:outerWidth,outerHeight:outerHeight,offset:offset,css:css,each:each,html:html,text:text,is:is,index:index,eq:eq,append:append,prepend:prepend,next:next,nextAll:nextAll,prev:prev,prevAll:prevAll,parent:parent,parents:parents,closest:closest,find:find,children:children,remove:remove,add:add,styles:styles};Object.keys(Methods).forEach(function(methodName){$$1.fn[methodName]=Methods[methodName];});var Utils={deleteProps:function deleteProps(obj){var object=obj;Object.keys(object).forEach(function(key){try{object[key]=null;}catch(e){// no getter for object
}try{delete object[key];}catch(e){// something got wrong
}});},nextTick:function nextTick(callback,delay){if(delay===void 0)delay=0;return setTimeout(callback,delay);},now:function now(){return Date.now();},getTranslate:function getTranslate(el,axis){if(axis===void 0)axis='x';var matrix;var curTransform;var transformMatrix;var curStyle=win.getComputedStyle(el,null);if(win.WebKitCSSMatrix){curTransform=curStyle.transform||curStyle.webkitTransform;if(curTransform.split(',').length>6){curTransform=curTransform.split(', ').map(function(a){return a.replace(',','.');}).join(', ');}// Some old versions of Webkit choke when 'none' is passed; pass
// empty string instead in this case
transformMatrix=new win.WebKitCSSMatrix(curTransform==='none'?'':curTransform);}else{transformMatrix=curStyle.MozTransform||curStyle.OTransform||curStyle.MsTransform||curStyle.msTransform||curStyle.transform||curStyle.getPropertyValue('transform').replace('translate(','matrix(1, 0, 0, 1,');matrix=transformMatrix.toString().split(',');}if(axis==='x'){// Latest Chrome and webkits Fix
if(win.WebKitCSSMatrix){curTransform=transformMatrix.m41;}// Crazy IE10 Matrix
else if(matrix.length===16){curTransform=parseFloat(matrix[12]);}// Normal Browsers
else{curTransform=parseFloat(matrix[4]);}}if(axis==='y'){// Latest Chrome and webkits Fix
if(win.WebKitCSSMatrix){curTransform=transformMatrix.m42;}// Crazy IE10 Matrix
else if(matrix.length===16){curTransform=parseFloat(matrix[13]);}// Normal Browsers
else{curTransform=parseFloat(matrix[5]);}}return curTransform||0;},parseUrlQuery:function parseUrlQuery(url){var query={};var urlToParse=url||win.location.href;var i;var params;var param;var length;if(typeof urlToParse==='string'&&urlToParse.length){urlToParse=urlToParse.indexOf('?')>-1?urlToParse.replace(/\S*\?/,''):'';params=urlToParse.split('&').filter(function(paramsPart){return paramsPart!=='';});length=params.length;for(i=0;i<length;i+=1){param=params[i].replace(/#\S+/g,'').split('=');query[decodeURIComponent(param[0])]=typeof param[1]==='undefined'?undefined:decodeURIComponent(param[1])||'';}}return query;},isObject:function isObject(o){return(typeof o==="undefined"?"undefined":_typeof(o))==='object'&&o!==null&&o.constructor&&o.constructor===Object;},extend:function extend(){var args=[],len$1=arguments.length;while(len$1--){args[len$1]=arguments[len$1];}var to=Object(args[0]);for(var i=1;i<args.length;i+=1){var nextSource=args[i];if(nextSource!==undefined&&nextSource!==null){var keysArray=Object.keys(Object(nextSource));for(var nextIndex=0,len=keysArray.length;nextIndex<len;nextIndex+=1){var nextKey=keysArray[nextIndex];var desc=Object.getOwnPropertyDescriptor(nextSource,nextKey);if(desc!==undefined&&desc.enumerable){if(Utils.isObject(to[nextKey])&&Utils.isObject(nextSource[nextKey])){Utils.extend(to[nextKey],nextSource[nextKey]);}else if(!Utils.isObject(to[nextKey])&&Utils.isObject(nextSource[nextKey])){to[nextKey]={};Utils.extend(to[nextKey],nextSource[nextKey]);}else{to[nextKey]=nextSource[nextKey];}}}}}return to;}};var d;if(typeof document==='undefined'){d={addEventListener:function addEventListener(){},removeEventListener:function removeEventListener(){},activeElement:{blur:function blur(){},nodeName:''},querySelector:function querySelector(){return{};},querySelectorAll:function querySelectorAll(){return[];},createElement:function createElement(){return{style:{},setAttribute:function setAttribute(){},getElementsByTagName:function getElementsByTagName(){return[];}};},location:{hash:''}};}else{d=document;}var doc=d;var Support=function Support(){return{touch:win.Modernizr&&win.Modernizr.touch===true||function checkTouch(){return!!('ontouchstart'in win||win.DocumentTouch&&doc instanceof win.DocumentTouch);}(),transforms3d:win.Modernizr&&win.Modernizr.csstransforms3d===true||function checkTransforms3d(){var div=doc.createElement('div').style;return'webkitPerspective'in div||'MozPerspective'in div||'OPerspective'in div||'MsPerspective'in div||'perspective'in div;}(),flexbox:function checkFlexbox(){var div=doc.createElement('div').style;var styles='alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient'.split(' ');for(var i=0;i<styles.length;i+=1){if(styles[i]in div){return true;}}return false;}(),observer:function checkObserver(){return'MutationObserver'in win||'WebkitMutationObserver'in win;}(),passiveListener:function checkPassiveListener(){var supportsPassive=false;try{var opts=Object.defineProperty({},'passive',{get:function get(){supportsPassive=true;}});win.addEventListener('testPassiveListener',null,opts);}catch(e){// No support
}return supportsPassive;}(),gestures:function checkGestures(){return'ongesturestart'in win;}()};}();var SwiperClass=function SwiperClass(params){if(params===void 0)params={};var self=this;self.params=params;// Events
self.eventsListeners={};if(self.params&&self.params.on){Object.keys(self.params.on).forEach(function(eventName){self.on(eventName,self.params.on[eventName]);});}};var staticAccessors={components:{}};SwiperClass.prototype.on=function on(events,handler){var self=this;if(typeof handler!=='function'){return self;}events.split(' ').forEach(function(event){if(!self.eventsListeners[event]){self.eventsListeners[event]=[];}self.eventsListeners[event].push(handler);});return self;};SwiperClass.prototype.once=function once(events,handler){var self=this;if(typeof handler!=='function'){return self;}function onceHandler(){var args=[],len=arguments.length;while(len--){args[len]=arguments[len];}handler.apply(self,args);self.off(events,onceHandler);}return self.on(events,onceHandler);};SwiperClass.prototype.off=function off(events,handler){var self=this;events.split(' ').forEach(function(event){if(typeof handler==='undefined'){self.eventsListeners[event]=[];}else{self.eventsListeners[event].forEach(function(eventHandler,index){if(eventHandler===handler){self.eventsListeners[event].splice(index,1);}});}});return self;};SwiperClass.prototype.emit=function emit(){var args=[],len=arguments.length;while(len--){args[len]=arguments[len];}var self=this;if(!self.eventsListeners){return self;}var events;var data;var context;if(typeof args[0]==='string'||Array.isArray(args[0])){events=args[0];data=args.slice(1,args.length);context=self;}else{events=args[0].events;data=args[0].data;context=args[0].context||self;}var eventsArray=Array.isArray(events)?events:events.split(' ');eventsArray.forEach(function(event){if(self.eventsListeners[event]){var handlers=[];self.eventsListeners[event].forEach(function(eventHandler){handlers.push(eventHandler);});handlers.forEach(function(eventHandler){eventHandler.apply(context,data);});}});return self;};SwiperClass.prototype.useModulesParams=function useModulesParams(instanceParams){var instance=this;if(!instance.modules){return;}Object.keys(instance.modules).forEach(function(moduleName){var module=instance.modules[moduleName];// Extend params
if(module.params){Utils.extend(instanceParams,module.params);}});};SwiperClass.prototype.useModules=function useModules(modulesParams){if(modulesParams===void 0)modulesParams={};var instance=this;if(!instance.modules){return;}Object.keys(instance.modules).forEach(function(moduleName){var module=instance.modules[moduleName];var moduleParams=modulesParams[moduleName]||{};// Extend instance methods and props
if(module.instance){Object.keys(module.instance).forEach(function(modulePropName){var moduleProp=module.instance[modulePropName];if(typeof moduleProp==='function'){instance[modulePropName]=moduleProp.bind(instance);}else{instance[modulePropName]=moduleProp;}});}// Add event listeners
if(module.on&&instance.on){Object.keys(module.on).forEach(function(moduleEventName){instance.on(moduleEventName,module.on[moduleEventName]);});}// Module create callback
if(module.create){module.create.bind(instance)(moduleParams);}});};staticAccessors.components.set=function(components){var Class=this;if(!Class.use){return;}Class.use(components);};SwiperClass.installModule=function installModule(module){var params=[],len=arguments.length-1;while(len-->0){params[len]=arguments[len+1];}var Class=this;if(!Class.prototype.modules){Class.prototype.modules={};}var name=module.name||Object.keys(Class.prototype.modules).length+"_"+Utils.now();Class.prototype.modules[name]=module;// Prototype
if(module.proto){Object.keys(module.proto).forEach(function(key){Class.prototype[key]=module.proto[key];});}// Class
if(module.static){Object.keys(module.static).forEach(function(key){Class[key]=module.static[key];});}// Callback
if(module.install){module.install.apply(Class,params);}return Class;};SwiperClass.use=function use(module){var params=[],len=arguments.length-1;while(len-->0){params[len]=arguments[len+1];}var Class=this;if(Array.isArray(module)){module.forEach(function(m){return Class.installModule(m);});return Class;}return Class.installModule.apply(Class,[module].concat(params));};Object.defineProperties(SwiperClass,staticAccessors);var updateSize=function updateSize(){var swiper=this;var width;var height;var $el=swiper.$el;if(typeof swiper.params.width!=='undefined'){width=swiper.params.width;}else{width=$el[0].clientWidth;}if(typeof swiper.params.height!=='undefined'){height=swiper.params.height;}else{height=$el[0].clientHeight;}if(width===0&&swiper.isHorizontal()||height===0&&swiper.isVertical()){return;}// Subtract paddings
width=width-parseInt($el.css('padding-left'),10)-parseInt($el.css('padding-right'),10);height=height-parseInt($el.css('padding-top'),10)-parseInt($el.css('padding-bottom'),10);Utils.extend(swiper,{width:width,height:height,size:swiper.isHorizontal()?width:height});};var updateSlides=function updateSlides(){var swiper=this;var params=swiper.params;var $wrapperEl=swiper.$wrapperEl;var swiperSize=swiper.size;var rtl=swiper.rtl;var wrongRTL=swiper.wrongRTL;var slides=$wrapperEl.children("."+swiper.params.slideClass);var isVirtual=swiper.virtual&&params.virtual.enabled;var slidesLength=isVirtual?swiper.virtual.slides.length:slides.length;var snapGrid=[];var slidesGrid=[];var slidesSizesGrid=[];var offsetBefore=params.slidesOffsetBefore;if(typeof offsetBefore==='function'){offsetBefore=params.slidesOffsetBefore.call(swiper);}var offsetAfter=params.slidesOffsetAfter;if(typeof offsetAfter==='function'){offsetAfter=params.slidesOffsetAfter.call(swiper);}var previousSlidesLength=slidesLength;var previousSnapGridLength=swiper.snapGrid.length;var previousSlidesGridLength=swiper.snapGrid.length;var spaceBetween=params.spaceBetween;var slidePosition=-offsetBefore;var prevSlideSize=0;var index=0;if(typeof swiperSize==='undefined'){return;}if(typeof spaceBetween==='string'&&spaceBetween.indexOf('%')>=0){spaceBetween=parseFloat(spaceBetween.replace('%',''))/100*swiperSize;}swiper.virtualSize=-spaceBetween;// reset margins
if(rtl){slides.css({marginLeft:'',marginTop:''});}else{slides.css({marginRight:'',marginBottom:''});}var slidesNumberEvenToRows;if(params.slidesPerColumn>1){if(Math.floor(slidesLength/params.slidesPerColumn)===slidesLength/swiper.params.slidesPerColumn){slidesNumberEvenToRows=slidesLength;}else{slidesNumberEvenToRows=Math.ceil(slidesLength/params.slidesPerColumn)*params.slidesPerColumn;}if(params.slidesPerView!=='auto'&&params.slidesPerColumnFill==='row'){slidesNumberEvenToRows=Math.max(slidesNumberEvenToRows,params.slidesPerView*params.slidesPerColumn);}}// Calc slides
var slideSize;var slidesPerColumn=params.slidesPerColumn;var slidesPerRow=slidesNumberEvenToRows/slidesPerColumn;var numFullColumns=slidesPerRow-(params.slidesPerColumn*slidesPerRow-slidesLength);for(var i=0;i<slidesLength;i+=1){slideSize=0;var slide=slides.eq(i);if(params.slidesPerColumn>1){// Set slides order
var newSlideOrderIndex=void 0;var column=void 0;var row=void 0;if(params.slidesPerColumnFill==='column'){column=Math.floor(i/slidesPerColumn);row=i-column*slidesPerColumn;if(column>numFullColumns||column===numFullColumns&&row===slidesPerColumn-1){row+=1;if(row>=slidesPerColumn){row=0;column+=1;}}newSlideOrderIndex=column+row*slidesNumberEvenToRows/slidesPerColumn;slide.css({'-webkit-box-ordinal-group':newSlideOrderIndex,'-moz-box-ordinal-group':newSlideOrderIndex,'-ms-flex-order':newSlideOrderIndex,'-webkit-order':newSlideOrderIndex,order:newSlideOrderIndex});}else{row=Math.floor(i/slidesPerRow);column=i-row*slidesPerRow;}slide.css("margin-"+(swiper.isHorizontal()?'top':'left'),row!==0&&params.spaceBetween&&params.spaceBetween+"px").attr('data-swiper-column',column).attr('data-swiper-row',row);}if(slide.css('display')==='none'){continue;}// eslint-disable-line
if(params.slidesPerView==='auto'){slideSize=swiper.isHorizontal()?slide.outerWidth(true):slide.outerHeight(true);if(params.roundLengths){slideSize=Math.floor(slideSize);}}else{slideSize=(swiperSize-(params.slidesPerView-1)*spaceBetween)/params.slidesPerView;if(params.roundLengths){slideSize=Math.floor(slideSize);}if(slides[i]){if(swiper.isHorizontal()){slides[i].style.width=slideSize+"px";}else{slides[i].style.height=slideSize+"px";}}}if(slides[i]){slides[i].swiperSlideSize=slideSize;}slidesSizesGrid.push(slideSize);if(params.centeredSlides){slidePosition=slidePosition+slideSize/2+prevSlideSize/2+spaceBetween;if(prevSlideSize===0&&i!==0){slidePosition=slidePosition-swiperSize/2-spaceBetween;}if(i===0){slidePosition=slidePosition-swiperSize/2-spaceBetween;}if(Math.abs(slidePosition)<1/1000){slidePosition=0;}if(index%params.slidesPerGroup===0){snapGrid.push(slidePosition);}slidesGrid.push(slidePosition);}else{if(index%params.slidesPerGroup===0){snapGrid.push(slidePosition);}slidesGrid.push(slidePosition);slidePosition=slidePosition+slideSize+spaceBetween;}swiper.virtualSize+=slideSize+spaceBetween;prevSlideSize=slideSize;index+=1;}swiper.virtualSize=Math.max(swiper.virtualSize,swiperSize)+offsetAfter;var newSlidesGrid;if(rtl&&wrongRTL&&(params.effect==='slide'||params.effect==='coverflow')){$wrapperEl.css({width:swiper.virtualSize+params.spaceBetween+"px"});}if(!Support.flexbox||params.setWrapperSize){if(swiper.isHorizontal()){$wrapperEl.css({width:swiper.virtualSize+params.spaceBetween+"px"});}else{$wrapperEl.css({height:swiper.virtualSize+params.spaceBetween+"px"});}}if(params.slidesPerColumn>1){swiper.virtualSize=(slideSize+params.spaceBetween)*slidesNumberEvenToRows;swiper.virtualSize=Math.ceil(swiper.virtualSize/params.slidesPerColumn)-params.spaceBetween;if(swiper.isHorizontal()){$wrapperEl.css({width:swiper.virtualSize+params.spaceBetween+"px"});}else{$wrapperEl.css({height:swiper.virtualSize+params.spaceBetween+"px"});}if(params.centeredSlides){newSlidesGrid=[];for(var i$1=0;i$1<snapGrid.length;i$1+=1){if(snapGrid[i$1]<swiper.virtualSize+snapGrid[0]){newSlidesGrid.push(snapGrid[i$1]);}}snapGrid=newSlidesGrid;}}// Remove last grid elements depending on width
if(!params.centeredSlides){newSlidesGrid=[];for(var i$2=0;i$2<snapGrid.length;i$2+=1){if(snapGrid[i$2]<=swiper.virtualSize-swiperSize){newSlidesGrid.push(snapGrid[i$2]);}}snapGrid=newSlidesGrid;if(Math.floor(swiper.virtualSize-swiperSize)-Math.floor(snapGrid[snapGrid.length-1])>1){snapGrid.push(swiper.virtualSize-swiperSize);}}if(snapGrid.length===0){snapGrid=[0];}if(params.spaceBetween!==0){if(swiper.isHorizontal()){if(rtl){slides.css({marginLeft:spaceBetween+"px"});}else{slides.css({marginRight:spaceBetween+"px"});}}else{slides.css({marginBottom:spaceBetween+"px"});}}Utils.extend(swiper,{slides:slides,snapGrid:snapGrid,slidesGrid:slidesGrid,slidesSizesGrid:slidesSizesGrid});if(slidesLength!==previousSlidesLength){swiper.emit('slidesLengthChange');}if(snapGrid.length!==previousSnapGridLength){swiper.emit('snapGridLengthChange');}if(slidesGrid.length!==previousSlidesGridLength){swiper.emit('slidesGridLengthChange');}if(params.watchSlidesProgress||params.watchSlidesVisibility){swiper.updateSlidesOffset();}};var updateAutoHeight=function updateAutoHeight(){var swiper=this;var activeSlides=[];var newHeight=0;var i;// Find slides currently in view
if(swiper.params.slidesPerView!=='auto'&&swiper.params.slidesPerView>1){for(i=0;i<Math.ceil(swiper.params.slidesPerView);i+=1){var index=swiper.activeIndex+i;if(index>swiper.slides.length){break;}activeSlides.push(swiper.slides.eq(index)[0]);}}else{activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);}// Find new height from highest slide in view
for(i=0;i<activeSlides.length;i+=1){if(typeof activeSlides[i]!=='undefined'){var height=activeSlides[i].offsetHeight;newHeight=height>newHeight?height:newHeight;}}// Update Height
if(newHeight){swiper.$wrapperEl.css('height',newHeight+"px");}};var updateSlidesOffset=function updateSlidesOffset(){var swiper=this;var slides=swiper.slides;for(var i=0;i<slides.length;i+=1){slides[i].swiperSlideOffset=swiper.isHorizontal()?slides[i].offsetLeft:slides[i].offsetTop;}};var updateSlidesProgress=function updateSlidesProgress(translate){if(translate===void 0)translate=this.translate||0;var swiper=this;var params=swiper.params;var slides=swiper.slides;var rtl=swiper.rtl;if(slides.length===0){return;}if(typeof slides[0].swiperSlideOffset==='undefined'){swiper.updateSlidesOffset();}var offsetCenter=-translate;if(rtl){offsetCenter=translate;}// Visible Slides
slides.removeClass(params.slideVisibleClass);for(var i=0;i<slides.length;i+=1){var slide=slides[i];var slideProgress=(offsetCenter+(params.centeredSlides?swiper.minTranslate():0)-slide.swiperSlideOffset)/(slide.swiperSlideSize+params.spaceBetween);if(params.watchSlidesVisibility){var slideBefore=-(offsetCenter-slide.swiperSlideOffset);var slideAfter=slideBefore+swiper.slidesSizesGrid[i];var isVisible=slideBefore>=0&&slideBefore<swiper.size||slideAfter>0&&slideAfter<=swiper.size||slideBefore<=0&&slideAfter>=swiper.size;if(isVisible){slides.eq(i).addClass(params.slideVisibleClass);}}slide.progress=rtl?-slideProgress:slideProgress;}};var updateProgress=function updateProgress(translate){if(translate===void 0)translate=this.translate||0;var swiper=this;var params=swiper.params;var translatesDiff=swiper.maxTranslate()-swiper.minTranslate();var progress=swiper.progress;var isBeginning=swiper.isBeginning;var isEnd=swiper.isEnd;var wasBeginning=isBeginning;var wasEnd=isEnd;if(translatesDiff===0){progress=0;isBeginning=true;isEnd=true;}else{progress=(translate-swiper.minTranslate())/translatesDiff;isBeginning=progress<=0;isEnd=progress>=1;}Utils.extend(swiper,{progress:progress,isBeginning:isBeginning,isEnd:isEnd});if(params.watchSlidesProgress||params.watchSlidesVisibility){swiper.updateSlidesProgress(translate);}if(isBeginning&&!wasBeginning){swiper.emit('reachBeginning toEdge');}if(isEnd&&!wasEnd){swiper.emit('reachEnd toEdge');}if(wasBeginning&&!isBeginning||wasEnd&&!isEnd){swiper.emit('fromEdge');}swiper.emit('progress',progress);};var updateSlidesClasses=function updateSlidesClasses(){var swiper=this;var slides=swiper.slides;var params=swiper.params;var $wrapperEl=swiper.$wrapperEl;var activeIndex=swiper.activeIndex;var realIndex=swiper.realIndex;var isVirtual=swiper.virtual&&params.virtual.enabled;slides.removeClass(params.slideActiveClass+" "+params.slideNextClass+" "+params.slidePrevClass+" "+params.slideDuplicateActiveClass+" "+params.slideDuplicateNextClass+" "+params.slideDuplicatePrevClass);var activeSlide;if(isVirtual){activeSlide=swiper.$wrapperEl.find("."+params.slideClass+"[data-swiper-slide-index=\""+activeIndex+"\"]");}else{activeSlide=slides.eq(activeIndex);}// Active classes
activeSlide.addClass(params.slideActiveClass);if(params.loop){// Duplicate to all looped slides
if(activeSlide.hasClass(params.slideDuplicateClass)){$wrapperEl.children("."+params.slideClass+":not(."+params.slideDuplicateClass+")[data-swiper-slide-index=\""+realIndex+"\"]").addClass(params.slideDuplicateActiveClass);}else{$wrapperEl.children("."+params.slideClass+"."+params.slideDuplicateClass+"[data-swiper-slide-index=\""+realIndex+"\"]").addClass(params.slideDuplicateActiveClass);}}// Next Slide
var nextSlide=activeSlide.nextAll("."+params.slideClass).eq(0).addClass(params.slideNextClass);if(params.loop&&nextSlide.length===0){nextSlide=slides.eq(0);nextSlide.addClass(params.slideNextClass);}// Prev Slide
var prevSlide=activeSlide.prevAll("."+params.slideClass).eq(0).addClass(params.slidePrevClass);if(params.loop&&prevSlide.length===0){prevSlide=slides.eq(-1);prevSlide.addClass(params.slidePrevClass);}if(params.loop){// Duplicate to all looped slides
if(nextSlide.hasClass(params.slideDuplicateClass)){$wrapperEl.children("."+params.slideClass+":not(."+params.slideDuplicateClass+")[data-swiper-slide-index=\""+nextSlide.attr('data-swiper-slide-index')+"\"]").addClass(params.slideDuplicateNextClass);}else{$wrapperEl.children("."+params.slideClass+"."+params.slideDuplicateClass+"[data-swiper-slide-index=\""+nextSlide.attr('data-swiper-slide-index')+"\"]").addClass(params.slideDuplicateNextClass);}if(prevSlide.hasClass(params.slideDuplicateClass)){$wrapperEl.children("."+params.slideClass+":not(."+params.slideDuplicateClass+")[data-swiper-slide-index=\""+prevSlide.attr('data-swiper-slide-index')+"\"]").addClass(params.slideDuplicatePrevClass);}else{$wrapperEl.children("."+params.slideClass+"."+params.slideDuplicateClass+"[data-swiper-slide-index=\""+prevSlide.attr('data-swiper-slide-index')+"\"]").addClass(params.slideDuplicatePrevClass);}}};var updateActiveIndex=function updateActiveIndex(newActiveIndex){var swiper=this;var translate=swiper.rtl?swiper.translate:-swiper.translate;var slidesGrid=swiper.slidesGrid;var snapGrid=swiper.snapGrid;var params=swiper.params;var previousIndex=swiper.activeIndex;var previousRealIndex=swiper.realIndex;var previousSnapIndex=swiper.snapIndex;var activeIndex=newActiveIndex;var snapIndex;if(typeof activeIndex==='undefined'){for(var i=0;i<slidesGrid.length;i+=1){if(typeof slidesGrid[i+1]!=='undefined'){if(translate>=slidesGrid[i]&&translate<slidesGrid[i+1]-(slidesGrid[i+1]-slidesGrid[i])/2){activeIndex=i;}else if(translate>=slidesGrid[i]&&translate<slidesGrid[i+1]){activeIndex=i+1;}}else if(translate>=slidesGrid[i]){activeIndex=i;}}// Normalize slideIndex
if(params.normalizeSlideIndex){if(activeIndex<0||typeof activeIndex==='undefined'){activeIndex=0;}}}if(snapGrid.indexOf(translate)>=0){snapIndex=snapGrid.indexOf(translate);}else{snapIndex=Math.floor(activeIndex/params.slidesPerGroup);}if(snapIndex>=snapGrid.length){snapIndex=snapGrid.length-1;}if(activeIndex===previousIndex){if(snapIndex!==previousSnapIndex){swiper.snapIndex=snapIndex;swiper.emit('snapIndexChange');}return;}// Get real index
var realIndex=parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index')||activeIndex,10);Utils.extend(swiper,{snapIndex:snapIndex,realIndex:realIndex,previousIndex:previousIndex,activeIndex:activeIndex});swiper.emit('activeIndexChange');swiper.emit('snapIndexChange');if(previousRealIndex!==realIndex){swiper.emit('realIndexChange');}swiper.emit('slideChange');};var updateClickedSlide=function updateClickedSlide(e){var swiper=this;var params=swiper.params;var slide=$$1(e.target).closest("."+params.slideClass)[0];var slideFound=false;if(slide){for(var i=0;i<swiper.slides.length;i+=1){if(swiper.slides[i]===slide){slideFound=true;}}}if(slide&&slideFound){swiper.clickedSlide=slide;if(swiper.virtual&&swiper.params.virtual.enabled){swiper.clickedIndex=parseInt($$1(slide).attr('data-swiper-slide-index'),10);}else{swiper.clickedIndex=$$1(slide).index();}}else{swiper.clickedSlide=undefined;swiper.clickedIndex=undefined;return;}if(params.slideToClickedSlide&&swiper.clickedIndex!==undefined&&swiper.clickedIndex!==swiper.activeIndex){swiper.slideToClickedSlide();}};var update={updateSize:updateSize,updateSlides:updateSlides,updateAutoHeight:updateAutoHeight,updateSlidesOffset:updateSlidesOffset,updateSlidesProgress:updateSlidesProgress,updateProgress:updateProgress,updateSlidesClasses:updateSlidesClasses,updateActiveIndex:updateActiveIndex,updateClickedSlide:updateClickedSlide};var getTranslate=function getTranslate(axis){if(axis===void 0)axis=this.isHorizontal()?'x':'y';var swiper=this;var params=swiper.params;var rtl=swiper.rtl;var translate=swiper.translate;var $wrapperEl=swiper.$wrapperEl;if(params.virtualTranslate){return rtl?-translate:translate;}var currentTranslate=Utils.getTranslate($wrapperEl[0],axis);if(rtl){currentTranslate=-currentTranslate;}return currentTranslate||0;};var setTranslate=function setTranslate(translate,byController){var swiper=this;var rtl=swiper.rtl;var params=swiper.params;var $wrapperEl=swiper.$wrapperEl;var progress=swiper.progress;var x=0;var y=0;var z=0;if(swiper.isHorizontal()){x=rtl?-translate:translate;}else{y=translate;}if(params.roundLengths){x=Math.floor(x);y=Math.floor(y);}if(!params.virtualTranslate){if(Support.transforms3d){$wrapperEl.transform("translate3d("+x+"px, "+y+"px, "+z+"px)");}else{$wrapperEl.transform("translate("+x+"px, "+y+"px)");}}swiper.translate=swiper.isHorizontal()?x:y;// Check if we need to update progress
var newProgress;var translatesDiff=swiper.maxTranslate()-swiper.minTranslate();if(translatesDiff===0){newProgress=0;}else{newProgress=(translate-swiper.minTranslate())/translatesDiff;}if(newProgress!==progress){swiper.updateProgress(translate);}swiper.emit('setTranslate',swiper.translate,byController);};var minTranslate=function minTranslate(){return-this.snapGrid[0];};var maxTranslate=function maxTranslate(){return-this.snapGrid[this.snapGrid.length-1];};var translate={getTranslate:getTranslate,setTranslate:setTranslate,minTranslate:minTranslate,maxTranslate:maxTranslate};var setTransition=function setTransition(duration,byController){var swiper=this;swiper.$wrapperEl.transition(duration);swiper.emit('setTransition',duration,byController);};var transitionStart=function transitionStart(runCallbacks){if(runCallbacks===void 0)runCallbacks=true;var swiper=this;var activeIndex=swiper.activeIndex;var params=swiper.params;var previousIndex=swiper.previousIndex;if(params.autoHeight){swiper.updateAutoHeight();}swiper.emit('transitionStart');if(!runCallbacks){return;}if(activeIndex!==previousIndex){swiper.emit('slideChangeTransitionStart');if(activeIndex>previousIndex){swiper.emit('slideNextTransitionStart');}else{swiper.emit('slidePrevTransitionStart');}}};var transitionEnd$1=function transitionEnd$1(runCallbacks){if(runCallbacks===void 0)runCallbacks=true;var swiper=this;var activeIndex=swiper.activeIndex;var previousIndex=swiper.previousIndex;swiper.animating=false;swiper.setTransition(0);swiper.emit('transitionEnd');if(runCallbacks){if(activeIndex!==previousIndex){swiper.emit('slideChangeTransitionEnd');if(activeIndex>previousIndex){swiper.emit('slideNextTransitionEnd');}else{swiper.emit('slidePrevTransitionEnd');}}}};var transition$1={setTransition:setTransition,transitionStart:transitionStart,transitionEnd:transitionEnd$1};var Browser=function Browser(){function isIE9(){// create temporary DIV
var div=doc.createElement('div');// add content to tmp DIV which is wrapped into the IE HTML conditional statement
div.innerHTML='<!--[if lte IE 9]><i></i><![endif]-->';// return true / false value based on what will browser render
return div.getElementsByTagName('i').length===1;}function isSafari(){var ua=win.navigator.userAgent.toLowerCase();return ua.indexOf('safari')>=0&&ua.indexOf('chrome')<0&&ua.indexOf('android')<0;}return{isSafari:isSafari(),isUiWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(win.navigator.userAgent),ie:win.navigator.pointerEnabled||win.navigator.msPointerEnabled,ieTouch:win.navigator.msPointerEnabled&&win.navigator.msMaxTouchPoints>1||win.navigator.pointerEnabled&&win.navigator.maxTouchPoints>1,lteIE9:isIE9()};}();var slideTo=function slideTo(index,speed,runCallbacks,internal){if(index===void 0)index=0;if(speed===void 0)speed=this.params.speed;if(runCallbacks===void 0)runCallbacks=true;var swiper=this;var slideIndex=index;if(slideIndex<0){slideIndex=0;}var params=swiper.params;var snapGrid=swiper.snapGrid;var slidesGrid=swiper.slidesGrid;var previousIndex=swiper.previousIndex;var activeIndex=swiper.activeIndex;var rtl=swiper.rtl;var $wrapperEl=swiper.$wrapperEl;var snapIndex=Math.floor(slideIndex/params.slidesPerGroup);if(snapIndex>=snapGrid.length){snapIndex=snapGrid.length-1;}if((activeIndex||params.initialSlide||0)===(previousIndex||0)&&runCallbacks){swiper.emit('beforeSlideChangeStart');}var translate=-snapGrid[snapIndex];// Update progress
swiper.updateProgress(translate);// Normalize slideIndex
if(params.normalizeSlideIndex){for(var i=0;i<slidesGrid.length;i+=1){if(-Math.floor(translate*100)>=Math.floor(slidesGrid[i]*100)){slideIndex=i;}}}// Directions locks
if(!swiper.allowSlideNext&&translate<swiper.translate&&translate<swiper.minTranslate()){return false;}if(!swiper.allowSlidePrev&&translate>swiper.translate&&translate>swiper.maxTranslate()){if((activeIndex||0)!==slideIndex){return false;}}// Update Index
if(rtl&&-translate===swiper.translate||!rtl&&translate===swiper.translate){swiper.updateActiveIndex(slideIndex);// Update Height
if(params.autoHeight){swiper.updateAutoHeight();}swiper.updateSlidesClasses();if(params.effect!=='slide'){swiper.setTranslate(translate);}return false;}if(speed===0||Browser.lteIE9){swiper.setTransition(0);swiper.setTranslate(translate);swiper.updateActiveIndex(slideIndex);swiper.updateSlidesClasses();swiper.emit('beforeTransitionStart',speed,internal);swiper.transitionStart(runCallbacks);swiper.transitionEnd(runCallbacks);}else{swiper.setTransition(speed);swiper.setTranslate(translate);swiper.updateActiveIndex(slideIndex);swiper.updateSlidesClasses();swiper.emit('beforeTransitionStart',speed,internal);swiper.transitionStart(runCallbacks);if(!swiper.animating){swiper.animating=true;$wrapperEl.transitionEnd(function(){if(!swiper||swiper.destroyed){return;}swiper.transitionEnd(runCallbacks);});}}return true;};/* eslint no-unused-vars: "off" */var slideNext=function slideNext(speed,runCallbacks,internal){if(speed===void 0)speed=this.params.speed;if(runCallbacks===void 0)runCallbacks=true;var swiper=this;var params=swiper.params;var animating=swiper.animating;if(params.loop){if(animating){return false;}swiper.loopFix();// eslint-disable-next-line
swiper._clientLeft=swiper.$wrapperEl[0].clientLeft;return swiper.slideTo(swiper.activeIndex+params.slidesPerGroup,speed,runCallbacks,internal);}return swiper.slideTo(swiper.activeIndex+params.slidesPerGroup,speed,runCallbacks,internal);};/* eslint no-unused-vars: "off" */var slidePrev=function slidePrev(speed,runCallbacks,internal){if(speed===void 0)speed=this.params.speed;if(runCallbacks===void 0)runCallbacks=true;var swiper=this;var params=swiper.params;var animating=swiper.animating;if(params.loop){if(animating){return false;}swiper.loopFix();// eslint-disable-next-line
swiper._clientLeft=swiper.$wrapperEl[0].clientLeft;return swiper.slideTo(swiper.activeIndex-1,speed,runCallbacks,internal);}return swiper.slideTo(swiper.activeIndex-1,speed,runCallbacks,internal);};/* eslint no-unused-vars: "off" */var slideReset=function slideReset(speed,runCallbacks,internal){if(speed===void 0)speed=this.params.speed;if(runCallbacks===void 0)runCallbacks=true;var swiper=this;return swiper.slideTo(swiper.activeIndex,speed,runCallbacks,internal);};var slideToClickedSlide=function slideToClickedSlide(){var swiper=this;var params=swiper.params;var $wrapperEl=swiper.$wrapperEl;var slidesPerView=params.slidesPerView==='auto'?swiper.slidesPerViewDynamic():params.slidesPerView;var slideToIndex=swiper.clickedIndex;var realIndex;if(params.loop){if(swiper.animating){return;}realIndex=parseInt($$1(swiper.clickedSlide).attr('data-swiper-slide-index'),10);if(params.centeredSlides){if(slideToIndex<swiper.loopedSlides-slidesPerView/2||slideToIndex>swiper.slides.length-swiper.loopedSlides+slidesPerView/2){swiper.loopFix();slideToIndex=$wrapperEl.children("."+params.slideClass+"[data-swiper-slide-index=\""+realIndex+"\"]:not(."+params.slideDuplicateClass+")").eq(0).index();Utils.nextTick(function(){swiper.slideTo(slideToIndex);});}else{swiper.slideTo(slideToIndex);}}else if(slideToIndex>swiper.slides.length-slidesPerView){swiper.loopFix();slideToIndex=$wrapperEl.children("."+params.slideClass+"[data-swiper-slide-index=\""+realIndex+"\"]:not(."+params.slideDuplicateClass+")").eq(0).index();Utils.nextTick(function(){swiper.slideTo(slideToIndex);});}else{swiper.slideTo(slideToIndex);}}else{swiper.slideTo(slideToIndex);}};var slide={slideTo:slideTo,slideNext:slideNext,slidePrev:slidePrev,slideReset:slideReset,slideToClickedSlide:slideToClickedSlide};var loopCreate=function loopCreate(){var swiper=this;var params=swiper.params;var $wrapperEl=swiper.$wrapperEl;// Remove duplicated slides
$wrapperEl.children("."+params.slideClass+"."+params.slideDuplicateClass).remove();var slides=$wrapperEl.children("."+params.slideClass);if(params.loopFillGroupWithBlank){var blankSlidesNum=params.slidesPerGroup-slides.length%params.slidesPerGroup;if(blankSlidesNum!==params.slidesPerGroup){for(var i=0;i<blankSlidesNum;i+=1){var blankNode=$$1(doc.createElement('div')).addClass(params.slideClass+" "+params.slideBlankClass);$wrapperEl.append(blankNode);}slides=$wrapperEl.children("."+params.slideClass);}}if(params.slidesPerView==='auto'&&!params.loopedSlides){params.loopedSlides=slides.length;}swiper.loopedSlides=parseInt(params.loopedSlides||params.slidesPerView,10);swiper.loopedSlides+=params.loopAdditionalSlides;if(swiper.loopedSlides>slides.length){swiper.loopedSlides=slides.length;}var prependSlides=[];var appendSlides=[];slides.each(function(index,el){var slide=$$1(el);if(index<swiper.loopedSlides){appendSlides.push(el);}if(index<slides.length&&index>=slides.length-swiper.loopedSlides){prependSlides.push(el);}slide.attr('data-swiper-slide-index',index);});for(var i$1=0;i$1<appendSlides.length;i$1+=1){$wrapperEl.append($$1(appendSlides[i$1].cloneNode(true)).addClass(params.slideDuplicateClass));}for(var i$2=prependSlides.length-1;i$2>=0;i$2-=1){$wrapperEl.prepend($$1(prependSlides[i$2].cloneNode(true)).addClass(params.slideDuplicateClass));}};var loopFix=function loopFix(){var swiper=this;var params=swiper.params;var activeIndex=swiper.activeIndex;var slides=swiper.slides;var loopedSlides=swiper.loopedSlides;var allowSlidePrev=swiper.allowSlidePrev;var allowSlideNext=swiper.allowSlideNext;var newIndex;swiper.allowSlidePrev=true;swiper.allowSlideNext=true;// Fix For Negative Oversliding
if(activeIndex<loopedSlides){newIndex=slides.length-loopedSlides*3+activeIndex;newIndex+=loopedSlides;swiper.slideTo(newIndex,0,false,true);}else if(params.slidesPerView==='auto'&&activeIndex>=loopedSlides*2||activeIndex>slides.length-params.slidesPerView*2){// Fix For Positive Oversliding
newIndex=-slides.length+activeIndex+loopedSlides;newIndex+=loopedSlides;swiper.slideTo(newIndex,0,false,true);}swiper.allowSlidePrev=allowSlidePrev;swiper.allowSlideNext=allowSlideNext;};var loopDestroy=function loopDestroy(){var swiper=this;var $wrapperEl=swiper.$wrapperEl;var params=swiper.params;var slides=swiper.slides;$wrapperEl.children("."+params.slideClass+"."+params.slideDuplicateClass).remove();slides.removeAttr('data-swiper-slide-index');};var loop={loopCreate:loopCreate,loopFix:loopFix,loopDestroy:loopDestroy};var setGrabCursor=function setGrabCursor(moving){var swiper=this;if(Support.touch||!swiper.params.simulateTouch){return;}var el=swiper.el;el.style.cursor='move';el.style.cursor=moving?'-webkit-grabbing':'-webkit-grab';el.style.cursor=moving?'-moz-grabbin':'-moz-grab';el.style.cursor=moving?'grabbing':'grab';};var unsetGrabCursor=function unsetGrabCursor(){var swiper=this;if(Support.touch){return;}swiper.el.style.cursor='';};var grabCursor={setGrabCursor:setGrabCursor,unsetGrabCursor:unsetGrabCursor};var appendSlide=function appendSlide(slides){var swiper=this;var $wrapperEl=swiper.$wrapperEl;var params=swiper.params;if(params.loop){swiper.loopDestroy();}if((typeof slides==="undefined"?"undefined":_typeof(slides))==='object'&&'length'in slides){for(var i=0;i<slides.length;i+=1){if(slides[i]){$wrapperEl.append(slides[i]);}}}else{$wrapperEl.append(slides);}if(params.loop){swiper.loopCreate();}if(!(params.observer&&Support.observer)){swiper.update();}};var prependSlide=function prependSlide(slides){var swiper=this;var params=swiper.params;var $wrapperEl=swiper.$wrapperEl;var activeIndex=swiper.activeIndex;if(params.loop){swiper.loopDestroy();}var newActiveIndex=activeIndex+1;if((typeof slides==="undefined"?"undefined":_typeof(slides))==='object'&&'length'in slides){for(var i=0;i<slides.length;i+=1){if(slides[i]){$wrapperEl.prepend(slides[i]);}}newActiveIndex=activeIndex+slides.length;}else{$wrapperEl.prepend(slides);}if(params.loop){swiper.loopCreate();}if(!(params.observer&&Support.observer)){swiper.update();}swiper.slideTo(newActiveIndex,0,false);};var removeSlide=function removeSlide(slidesIndexes){var swiper=this;var params=swiper.params;var $wrapperEl=swiper.$wrapperEl;var activeIndex=swiper.activeIndex;if(params.loop){swiper.loopDestroy();swiper.slides=$wrapperEl.children("."+params.slideClass);}var newActiveIndex=activeIndex;var indexToRemove;if((typeof slidesIndexes==="undefined"?"undefined":_typeof(slidesIndexes))==='object'&&'length'in slidesIndexes){for(var i=0;i<slidesIndexes.length;i+=1){indexToRemove=slidesIndexes[i];if(swiper.slides[indexToRemove]){swiper.slides.eq(indexToRemove).remove();}if(indexToRemove<newActiveIndex){newActiveIndex-=1;}}newActiveIndex=Math.max(newActiveIndex,0);}else{indexToRemove=slidesIndexes;if(swiper.slides[indexToRemove]){swiper.slides.eq(indexToRemove).remove();}if(indexToRemove<newActiveIndex){newActiveIndex-=1;}newActiveIndex=Math.max(newActiveIndex,0);}if(params.loop){swiper.loopCreate();}if(!(params.observer&&Support.observer)){swiper.update();}if(params.loop){swiper.slideTo(newActiveIndex+swiper.loopedSlides,0,false);}else{swiper.slideTo(newActiveIndex,0,false);}};var removeAllSlides=function removeAllSlides(){var swiper=this;var slidesIndexes=[];for(var i=0;i<swiper.slides.length;i+=1){slidesIndexes.push(i);}swiper.removeSlide(slidesIndexes);};var manipulation={appendSlide:appendSlide,prependSlide:prependSlide,removeSlide:removeSlide,removeAllSlides:removeAllSlides};var Device=function Device(){var ua=win.navigator.userAgent;var device={ios:false,android:false,androidChrome:false,desktop:false,windows:false,iphone:false,ipod:false,ipad:false,cordova:win.cordova||win.phonegap,phonegap:win.cordova||win.phonegap};var windows=ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/);// eslint-disable-line
var android=ua.match(/(Android);?[\s\/]+([\d.]+)?/);// eslint-disable-line
var ipad=ua.match(/(iPad).*OS\s([\d_]+)/);var ipod=ua.match(/(iPod)(.*OS\s([\d_]+))?/);var iphone=!ipad&&ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);// Windows
if(windows){device.os='windows';device.osVersion=windows[2];device.windows=true;}// Android
if(android&&!windows){device.os='android';device.osVersion=android[2];device.android=true;device.androidChrome=ua.toLowerCase().indexOf('chrome')>=0;}if(ipad||iphone||ipod){device.os='ios';device.ios=true;}// iOS
if(iphone&&!ipod){device.osVersion=iphone[2].replace(/_/g,'.');device.iphone=true;}if(ipad){device.osVersion=ipad[2].replace(/_/g,'.');device.ipad=true;}if(ipod){device.osVersion=ipod[3]?ipod[3].replace(/_/g,'.'):null;device.iphone=true;}// iOS 8+ changed UA
if(device.ios&&device.osVersion&&ua.indexOf('Version/')>=0){if(device.osVersion.split('.')[0]==='10'){device.osVersion=ua.toLowerCase().split('version/')[1].split(' ')[0];}}// Desktop
device.desktop=!(device.os||device.android||device.webView);// Webview
device.webView=(iphone||ipad||ipod)&&ua.match(/.*AppleWebKit(?!.*Safari)/i);// Minimal UI
if(device.os&&device.os==='ios'){var osVersionArr=device.osVersion.split('.');var metaViewport=doc.querySelector('meta[name="viewport"]');device.minimalUi=!device.webView&&(ipod||iphone)&&(osVersionArr[0]*1===7?osVersionArr[1]*1>=1:osVersionArr[0]*1>7)&&metaViewport&&metaViewport.getAttribute('content').indexOf('minimal-ui')>=0;}// Pixel Ratio
device.pixelRatio=win.devicePixelRatio||1;// Export object
return device;}();var onTouchStart=function onTouchStart(event){var swiper=this;var data=swiper.touchEventsData;var params=swiper.params;var touches=swiper.touches;var e=event;if(e.originalEvent){e=e.originalEvent;}data.isTouchEvent=e.type==='touchstart';if(!data.isTouchEvent&&'which'in e&&e.which===3){return;}if(data.isTouched&&data.isMoved){return;}if(params.noSwiping&&$$1(e.target).closest("."+params.noSwipingClass)[0]){swiper.allowClick=true;return;}if(params.swipeHandler){if(!$$1(e).closest(params.swipeHandler)[0]){return;}}touches.currentX=e.type==='touchstart'?e.targetTouches[0].pageX:e.pageX;touches.currentY=e.type==='touchstart'?e.targetTouches[0].pageY:e.pageY;var startX=touches.currentX;var startY=touches.currentY;// Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore
if(Device.ios&&!Device.cordova&&params.iOSEdgeSwipeDetection&&startX<=params.iOSEdgeSwipeThreshold&&startX>=window.screen.width-params.iOSEdgeSwipeThreshold){return;}Utils.extend(data,{isTouched:true,isMoved:false,allowTouchCallbacks:true,isScrolling:undefined,startMoving:undefined});touches.startX=startX;touches.startY=startY;data.touchStartTime=Utils.now();swiper.allowClick=true;swiper.updateSize();swiper.swipeDirection=undefined;if(params.threshold>0){data.allowThresholdMove=false;}if(e.type!=='touchstart'){var preventDefault=true;if($$1(e.target).is(data.formElements)){preventDefault=false;}if(doc.activeElement&&$$1(doc.activeElement).is(data.formElements)){doc.activeElement.blur();}if(preventDefault&&swiper.allowTouchMove){e.preventDefault();}}swiper.emit('touchStart',e);};var onTouchMove=function onTouchMove(event){var swiper=this;var data=swiper.touchEventsData;var params=swiper.params;var touches=swiper.touches;var rtl=swiper.rtl;var e=event;if(e.originalEvent){e=e.originalEvent;}if(data.isTouchEvent&&e.type==='mousemove'){return;}var pageX=e.type==='touchmove'?e.targetTouches[0].pageX:e.pageX;var pageY=e.type==='touchmove'?e.targetTouches[0].pageY:e.pageY;if(e.preventedByNestedSwiper){touches.startX=pageX;touches.startY=pageY;return;}if(!swiper.allowTouchMove){// isMoved = true;
swiper.allowClick=false;if(data.isTouched){Utils.extend(touches,{startX:pageX,startY:pageY,currentX:pageX,currentY:pageY});data.touchStartTime=Utils.now();}return;}if(data.isTouchEvent&&params.touchReleaseOnEdges&&!params.loop){if(swiper.isVertical()){// Vertical
if(pageY<touches.startY&&swiper.translate<=swiper.maxTranslate()||pageY>touches.startY&&swiper.translate>=swiper.minTranslate()){data.isTouched=false;data.isMoved=false;return;}}else if(pageX<touches.startX&&swiper.translate<=swiper.maxTranslate()||pageX>touches.startX&&swiper.translate>=swiper.minTranslate()){return;}}if(data.isTouchEvent&&doc.activeElement){if(e.target===doc.activeElement&&$$1(e.target).is(data.formElements)){data.isMoved=true;swiper.allowClick=false;return;}}if(data.allowTouchCallbacks){swiper.emit('touchMove',e);}if(e.targetTouches&&e.targetTouches.length>1){return;}touches.currentX=pageX;touches.currentY=pageY;var diffX=touches.currentX-touches.startX;var diffY=touches.currentY-touches.startY;if(typeof data.isScrolling==='undefined'){var touchAngle;if(swiper.isHorizontal()&&touches.currentY===touches.startY||swiper.isVertical()&&touches.currentX===touches.startX){data.isScrolling=false;}else{// eslint-disable-next-line
if(diffX*diffX+diffY*diffY>=25){touchAngle=Math.atan2(Math.abs(diffY),Math.abs(diffX))*180/Math.PI;data.isScrolling=swiper.isHorizontal()?touchAngle>params.touchAngle:90-touchAngle>params.touchAngle;}}}if(data.isScrolling){swiper.emit('touchMoveOpposite',e);}if(typeof startMoving==='undefined'){if(touches.currentX!==touches.startX||touches.currentY!==touches.startY){data.startMoving=true;}}if(!data.isTouched){return;}if(data.isScrolling){data.isTouched=false;return;}if(!data.startMoving){return;}swiper.allowClick=false;e.preventDefault();if(params.touchMoveStopPropagation&&!params.nested){e.stopPropagation();}if(!data.isMoved){if(params.loop){swiper.loopFix();}data.startTranslate=swiper.getTranslate();swiper.setTransition(0);if(swiper.animating){swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');}data.allowMomentumBounce=false;// Grab Cursor
if(params.grabCursor&&(swiper.allowSlideNext===true||swiper.allowSlidePrev===true)){swiper.setGrabCursor(true);}swiper.emit('sliderFirstMove',e);}swiper.emit('sliderMove',e);data.isMoved=true;var diff=swiper.isHorizontal()?diffX:diffY;touches.diff=diff;diff*=params.touchRatio;if(rtl){diff=-diff;}swiper.swipeDirection=diff>0?'prev':'next';data.currentTranslate=diff+data.startTranslate;var disableParentSwiper=true;var resistanceRatio=params.resistanceRatio;if(params.touchReleaseOnEdges){resistanceRatio=0;}if(diff>0&&data.currentTranslate>swiper.minTranslate()){disableParentSwiper=false;if(params.resistance){data.currentTranslate=swiper.minTranslate()-1+Math.pow(-swiper.minTranslate()+data.startTranslate+diff,resistanceRatio);}}else if(diff<0&&data.currentTranslate<swiper.maxTranslate()){disableParentSwiper=false;if(params.resistance){data.currentTranslate=swiper.maxTranslate()+1-Math.pow(swiper.maxTranslate()-data.startTranslate-diff,resistanceRatio);}}if(disableParentSwiper){e.preventedByNestedSwiper=true;}// Directions locks
if(!swiper.allowSlideNext&&swiper.swipeDirection==='next'&&data.currentTranslate<data.startTranslate){data.currentTranslate=data.startTranslate;}if(!swiper.allowSlidePrev&&swiper.swipeDirection==='prev'&&data.currentTranslate>data.startTranslate){data.currentTranslate=data.startTranslate;}// Threshold
if(params.threshold>0){if(Math.abs(diff)>params.threshold||data.allowThresholdMove){if(!data.allowThresholdMove){data.allowThresholdMove=true;touches.startX=touches.currentX;touches.startY=touches.currentY;data.currentTranslate=data.startTranslate;touches.diff=swiper.isHorizontal()?touches.currentX-touches.startX:touches.currentY-touches.startY;return;}}else{data.currentTranslate=data.startTranslate;return;}}if(!params.followFinger){return;}// Update active index in free mode
if(params.freeMode||params.watchSlidesProgress||params.watchSlidesVisibility){swiper.updateActiveIndex();swiper.updateSlidesClasses();}if(params.freeMode){// Velocity
if(data.velocities.length===0){data.velocities.push({position:touches[swiper.isHorizontal()?'startX':'startY'],time:data.touchStartTime});}data.velocities.push({position:touches[swiper.isHorizontal()?'currentX':'currentY'],time:Utils.now()});}// Update progress
swiper.updateProgress(data.currentTranslate);// Update translate
swiper.setTranslate(data.currentTranslate);};var onTouchEnd=function onTouchEnd(event){var swiper=this;var data=swiper.touchEventsData;var params=swiper.params;var touches=swiper.touches;var rtl=swiper.rtl;var $wrapperEl=swiper.$wrapperEl;var slidesGrid=swiper.slidesGrid;var snapGrid=swiper.snapGrid;var e=event;if(e.originalEvent){e=e.originalEvent;}if(data.allowTouchCallbacks){swiper.emit('touchEnd',e);}data.allowTouchCallbacks=false;if(!data.isTouched){return;}// Return Grab Cursor
if(params.grabCursor&&data.isMoved&&data.isTouched&&(swiper.allowSlideNext===true||swiper.allowSlidePrev===true)){swiper.setGrabCursor(false);}// Time diff
var touchEndTime=Utils.now();var timeDiff=touchEndTime-data.touchStartTime;// Tap, doubleTap, Click
if(swiper.allowClick){swiper.updateClickedSlide(e);swiper.emit('tap',e);if(timeDiff<300&&touchEndTime-data.lastClickTime>300){if(data.clickTimeout){clearTimeout(data.clickTimeout);}data.clickTimeout=Utils.nextTick(function(){if(!swiper||swiper.destroyed){return;}swiper.emit('click',e);},300);}if(timeDiff<300&&touchEndTime-data.lastClickTime<300){if(data.clickTimeout){clearTimeout(data.clickTimeout);}swiper.emit('doubleTap',e);}}data.lastClickTime=Utils.now();Utils.nextTick(function(){if(!swiper.destroyed){swiper.allowClick=true;}});if(!data.isTouched||!data.isMoved||!swiper.swipeDirection||touches.diff===0||data.currentTranslate===data.startTranslate){data.isTouched=false;data.isMoved=false;return;}data.isTouched=false;data.isMoved=false;var currentPos;if(params.followFinger){currentPos=rtl?swiper.translate:-swiper.translate;}else{currentPos=-data.currentTranslate;}if(params.freeMode){if(currentPos<-swiper.minTranslate()){swiper.slideTo(swiper.activeIndex);return;}else if(currentPos>-swiper.maxTranslate()){if(swiper.slides.length<snapGrid.length){swiper.slideTo(snapGrid.length-1);}else{swiper.slideTo(swiper.slides.length-1);}return;}if(params.freeModeMomentum){if(data.velocities.length>1){var lastMoveEvent=data.velocities.pop();var velocityEvent=data.velocities.pop();var distance=lastMoveEvent.position-velocityEvent.position;var time=lastMoveEvent.time-velocityEvent.time;swiper.velocity=distance/time;swiper.velocity/=2;if(Math.abs(swiper.velocity)<params.freeModeMinimumVelocity){swiper.velocity=0;}// this implies that the user stopped moving a finger then released.
// There would be no events with distance zero, so the last event is stale.
if(time>150||Utils.now()-lastMoveEvent.time>300){swiper.velocity=0;}}else{swiper.velocity=0;}swiper.velocity*=params.freeModeMomentumVelocityRatio;data.velocities.length=0;var momentumDuration=1000*params.freeModeMomentumRatio;var momentumDistance=swiper.velocity*momentumDuration;var newPosition=swiper.translate+momentumDistance;if(rtl){newPosition=-newPosition;}var doBounce=false;var afterBouncePosition;var bounceAmount=Math.abs(swiper.velocity)*20*params.freeModeMomentumBounceRatio;if(newPosition<swiper.maxTranslate()){if(params.freeModeMomentumBounce){if(newPosition+swiper.maxTranslate()<-bounceAmount){newPosition=swiper.maxTranslate()-bounceAmount;}afterBouncePosition=swiper.maxTranslate();doBounce=true;data.allowMomentumBounce=true;}else{newPosition=swiper.maxTranslate();}}else if(newPosition>swiper.minTranslate()){if(params.freeModeMomentumBounce){if(newPosition-swiper.minTranslate()>bounceAmount){newPosition=swiper.minTranslate()+bounceAmount;}afterBouncePosition=swiper.minTranslate();doBounce=true;data.allowMomentumBounce=true;}else{newPosition=swiper.minTranslate();}}else if(params.freeModeSticky){var nextSlide;for(var j=0;j<snapGrid.length;j+=1){if(snapGrid[j]>-newPosition){nextSlide=j;break;}}if(Math.abs(snapGrid[nextSlide]-newPosition)<Math.abs(snapGrid[nextSlide-1]-newPosition)||swiper.swipeDirection==='next'){newPosition=snapGrid[nextSlide];}else{newPosition=snapGrid[nextSlide-1];}newPosition=-newPosition;}// Fix duration
if(swiper.velocity!==0){if(rtl){momentumDuration=Math.abs((-newPosition-swiper.translate)/swiper.velocity);}else{momentumDuration=Math.abs((newPosition-swiper.translate)/swiper.velocity);}}else if(params.freeModeSticky){swiper.slideReset();return;}if(params.freeModeMomentumBounce&&doBounce){swiper.updateProgress(afterBouncePosition);swiper.setTransition(momentumDuration);swiper.setTranslate(newPosition);swiper.transitionStart();swiper.animating=true;$wrapperEl.transitionEnd(function(){if(!swiper||swiper.destroyed||!data.allowMomentumBounce){return;}swiper.emit('momentumBounce');swiper.setTransition(params.speed);swiper.setTranslate(afterBouncePosition);$wrapperEl.transitionEnd(function(){if(!swiper||swiper.destroyed){return;}swiper.transitionEnd();});});}else if(swiper.velocity){swiper.updateProgress(newPosition);swiper.setTransition(momentumDuration);swiper.setTranslate(newPosition);swiper.transitionStart();if(!swiper.animating){swiper.animating=true;$wrapperEl.transitionEnd(function(){if(!swiper||swiper.destroyed){return;}swiper.transitionEnd();});}}else{swiper.updateProgress(newPosition);}swiper.updateActiveIndex();swiper.updateSlidesClasses();}if(!params.freeModeMomentum||timeDiff>=params.longSwipesMs){swiper.updateProgress();swiper.updateActiveIndex();swiper.updateSlidesClasses();}return;}// Find current slide
var stopIndex=0;var groupSize=swiper.slidesSizesGrid[0];for(var i=0;i<slidesGrid.length;i+=params.slidesPerGroup){if(typeof slidesGrid[i+params.slidesPerGroup]!=='undefined'){if(currentPos>=slidesGrid[i]&&currentPos<slidesGrid[i+params.slidesPerGroup]){stopIndex=i;groupSize=slidesGrid[i+params.slidesPerGroup]-slidesGrid[i];}}else if(currentPos>=slidesGrid[i]){stopIndex=i;groupSize=slidesGrid[slidesGrid.length-1]-slidesGrid[slidesGrid.length-2];}}// Find current slide size
var ratio=(currentPos-slidesGrid[stopIndex])/groupSize;if(timeDiff>params.longSwipesMs){// Long touches
if(!params.longSwipes){swiper.slideTo(swiper.activeIndex);return;}if(swiper.swipeDirection==='next'){if(ratio>=params.longSwipesRatio){swiper.slideTo(stopIndex+params.slidesPerGroup);}else{swiper.slideTo(stopIndex);}}if(swiper.swipeDirection==='prev'){if(ratio>1-params.longSwipesRatio){swiper.slideTo(stopIndex+params.slidesPerGroup);}else{swiper.slideTo(stopIndex);}}}else{// Short swipes
if(!params.shortSwipes){swiper.slideTo(swiper.activeIndex);return;}if(swiper.swipeDirection==='next'){swiper.slideTo(stopIndex+params.slidesPerGroup);}if(swiper.swipeDirection==='prev'){swiper.slideTo(stopIndex);}}};var onResize=function onResize(){var swiper=this;var params=swiper.params;var el=swiper.el;if(el&&el.offsetWidth===0){return;}// Breakpoints
if(params.breakpoints){swiper.setBreakpoint();}// Save locks
var allowSlideNext=swiper.allowSlideNext;var allowSlidePrev=swiper.allowSlidePrev;// Disable locks on resize
swiper.allowSlideNext=true;swiper.allowSlidePrev=true;swiper.updateSize();swiper.updateSlides();if(params.freeMode){var newTranslate=Math.min(Math.max(swiper.translate,swiper.maxTranslate()),swiper.minTranslate());swiper.setTranslate(newTranslate);swiper.updateActiveIndex();swiper.updateSlidesClasses();if(params.autoHeight){swiper.updateAutoHeight();}}else{swiper.updateSlidesClasses();if((params.slidesPerView==='auto'||params.slidesPerView>1)&&swiper.isEnd&&!swiper.params.centeredSlides){swiper.slideTo(swiper.slides.length-1,0,false,true);}else{swiper.slideTo(swiper.activeIndex,0,false,true);}}// Return locks after resize
swiper.allowSlidePrev=allowSlidePrev;swiper.allowSlideNext=allowSlideNext;};var onClick=function onClick(e){var swiper=this;if(!swiper.allowClick){if(swiper.params.preventClicks){e.preventDefault();}if(swiper.params.preventClicksPropagation&&swiper.animating){e.stopPropagation();e.stopImmediatePropagation();}}};function attachEvents(){var swiper=this;var params=swiper.params;var touchEvents=swiper.touchEvents;var el=swiper.el;var wrapperEl=swiper.wrapperEl;{swiper.onTouchStart=onTouchStart.bind(swiper);swiper.onTouchMove=onTouchMove.bind(swiper);swiper.onTouchEnd=onTouchEnd.bind(swiper);}swiper.onClick=onClick.bind(swiper);var target=params.touchEventsTarget==='container'?el:wrapperEl;var capture=!!params.nested;// Touch Events
{if(Browser.ie){target.addEventListener(touchEvents.start,swiper.onTouchStart,false);(Support.touch?target:doc).addEventListener(touchEvents.move,swiper.onTouchMove,capture);(Support.touch?target:doc).addEventListener(touchEvents.end,swiper.onTouchEnd,false);}else{if(Support.touch){var passiveListener=touchEvents.start==='touchstart'&&Support.passiveListener&&params.passiveListeners?{passive:true,capture:false}:false;target.addEventListener(touchEvents.start,swiper.onTouchStart,passiveListener);target.addEventListener(touchEvents.move,swiper.onTouchMove,Support.passiveListener?{passive:false,capture:capture}:capture);target.addEventListener(touchEvents.end,swiper.onTouchEnd,passiveListener);}if(params.simulateTouch&&!Device.ios&&!Device.android||params.simulateTouch&&!Support.touch&&Device.ios){target.addEventListener('mousedown',swiper.onTouchStart,false);doc.addEventListener('mousemove',swiper.onTouchMove,capture);doc.addEventListener('mouseup',swiper.onTouchEnd,false);}}// Prevent Links Clicks
if(params.preventClicks||params.preventClicksPropagation){target.addEventListener('click',swiper.onClick,true);}}// Resize handler
swiper.on('resize observerUpdate',onResize);}function detachEvents(){var swiper=this;var params=swiper.params;var touchEvents=swiper.touchEvents;var el=swiper.el;var wrapperEl=swiper.wrapperEl;var target=params.touchEventsTarget==='container'?el:wrapperEl;var capture=!!params.nested;// Touch Events
{if(Browser.ie){target.removeEventListener(touchEvents.start,swiper.onTouchStart,false);(Support.touch?target:doc).removeEventListener(touchEvents.move,swiper.onTouchMove,capture);(Support.touch?target:doc).removeEventListener(touchEvents.end,swiper.onTouchEnd,false);}else{if(Support.touch){var passiveListener=touchEvents.start==='onTouchStart'&&Support.passiveListener&&params.passiveListeners?{passive:true,capture:false}:false;target.removeEventListener(touchEvents.start,swiper.onTouchStart,passiveListener);target.removeEventListener(touchEvents.move,swiper.onTouchMove,capture);target.removeEventListener(touchEvents.end,swiper.onTouchEnd,passiveListener);}if(params.simulateTouch&&!Device.ios&&!Device.android||params.simulateTouch&&!Support.touch&&Device.ios){target.removeEventListener('mousedown',swiper.onTouchStart,false);doc.removeEventListener('mousemove',swiper.onTouchMove,capture);doc.removeEventListener('mouseup',swiper.onTouchEnd,false);}}// Prevent Links Clicks
if(params.preventClicks||params.preventClicksPropagation){target.removeEventListener('click',swiper.onClick,true);}}// Resize handler
swiper.off('resize observerUpdate',onResize);}var events={attachEvents:attachEvents,detachEvents:detachEvents};var setBreakpoint=function setBreakpoint(){var swiper=this;var activeIndex=swiper.activeIndex;var loopedSlides=swiper.loopedSlides;if(loopedSlides===void 0)loopedSlides=0;var params=swiper.params;var breakpoints=params.breakpoints;if(!breakpoints||breakpoints&&Object.keys(breakpoints).length===0){return;}// Set breakpoint for window width and update parameters
var breakpoint=swiper.getBreakpoint(breakpoints);if(breakpoint&&swiper.currentBreakpoint!==breakpoint){var breakPointsParams=breakpoint in breakpoints?breakpoints[breakpoint]:swiper.originalParams;var needsReLoop=params.loop&&breakPointsParams.slidesPerView!==params.slidesPerView;Utils.extend(swiper.params,breakPointsParams);Utils.extend(swiper,{allowTouchMove:swiper.params.allowTouchMove,allowSlideNext:swiper.params.allowSlideNext,allowSlidePrev:swiper.params.allowSlidePrev});swiper.currentBreakpoint=breakpoint;if(needsReLoop){swiper.loopDestroy();swiper.loopCreate();swiper.updateSlides();swiper.slideTo(activeIndex-loopedSlides+swiper.loopedSlides,0,false);}swiper.emit('breakpoint',breakPointsParams);}};var getBreakpoint=function getBreakpoint(breakpoints){// Get breakpoint for window width
if(!breakpoints){return undefined;}var breakpoint=false;var points=[];Object.keys(breakpoints).forEach(function(point){points.push(point);});points.sort(function(a,b){return parseInt(a,10)-parseInt(b,10);});for(var i=0;i<points.length;i+=1){var point=points[i];if(point>=win.innerWidth&&!breakpoint){breakpoint=point;}}return breakpoint||'max';};var breakpoints={setBreakpoint:setBreakpoint,getBreakpoint:getBreakpoint};var addClasses=function addClasses(){var swiper=this;var classNames=swiper.classNames;var params=swiper.params;var rtl=swiper.rtl;var $el=swiper.$el;var suffixes=[];suffixes.push(params.direction);if(params.freeMode){suffixes.push('free-mode');}if(!Support.flexbox){suffixes.push('no-flexbox');}if(params.autoHeight){suffixes.push('autoheight');}if(rtl){suffixes.push('rtl');}if(params.slidesPerColumn>1){suffixes.push('multirow');}if(Device.android){suffixes.push('android');}if(Device.ios){suffixes.push('ios');}// WP8 Touch Events Fix
if(win.navigator.pointerEnabled||win.navigator.msPointerEnabled){suffixes.push("wp8-"+params.direction);}suffixes.forEach(function(suffix){classNames.push(params.containerModifierClass+suffix);});$el.addClass(classNames.join(' '));};var removeClasses=function removeClasses(){var swiper=this;var $el=swiper.$el;var classNames=swiper.classNames;$el.removeClass(classNames.join(' '));};var classes={addClasses:addClasses,removeClasses:removeClasses};var loadImage=function loadImage(imageEl,src,srcset,sizes,checkForComplete,callback){var image;function onReady(){if(callback){callback();}}if(!imageEl.complete||!checkForComplete){if(src){image=new win.Image();image.onload=onReady;image.onerror=onReady;if(sizes){image.sizes=sizes;}if(srcset){image.srcset=srcset;}if(src){image.src=src;}}else{onReady();}}else{// image already loaded...
onReady();}};var preloadImages=function preloadImages(){var swiper=this;swiper.imagesToLoad=swiper.$el.find('img');function onReady(){if(typeof swiper==='undefined'||swiper===null||!swiper||swiper.destroyed){return;}if(swiper.imagesLoaded!==undefined){swiper.imagesLoaded+=1;}if(swiper.imagesLoaded===swiper.imagesToLoad.length){if(swiper.params.updateOnImagesReady){swiper.update();}swiper.emit('imagesReady');}}for(var i=0;i<swiper.imagesToLoad.length;i+=1){var imageEl=swiper.imagesToLoad[i];swiper.loadImage(imageEl,imageEl.currentSrc||imageEl.getAttribute('src'),imageEl.srcset||imageEl.getAttribute('srcset'),imageEl.sizes||imageEl.getAttribute('sizes'),true,onReady);}};var images={loadImage:loadImage,preloadImages:preloadImages};var defaults={init:true,direction:'horizontal',touchEventsTarget:'container',initialSlide:0,speed:300,// To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
iOSEdgeSwipeDetection:false,iOSEdgeSwipeThreshold:20,// Free mode
freeMode:false,freeModeMomentum:true,freeModeMomentumRatio:1,freeModeMomentumBounce:true,freeModeMomentumBounceRatio:1,freeModeMomentumVelocityRatio:1,freeModeSticky:false,freeModeMinimumVelocity:0.02,// Autoheight
autoHeight:false,// Set wrapper width
setWrapperSize:false,// Virtual Translate
virtualTranslate:false,// Effects
effect:'slide',// 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
// Breakpoints
breakpoints:undefined,// Slides grid
spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:'column',slidesPerGroup:1,centeredSlides:false,slidesOffsetBefore:0,// in px
slidesOffsetAfter:0,// in px
normalizeSlideIndex:true,// Round length
roundLengths:false,// Touches
touchRatio:1,touchAngle:45,simulateTouch:true,shortSwipes:true,longSwipes:true,longSwipesRatio:0.5,longSwipesMs:300,followFinger:true,allowTouchMove:true,threshold:0,touchMoveStopPropagation:true,touchReleaseOnEdges:false,// Unique Navigation Elements
uniqueNavElements:true,// Resistance
resistance:true,resistanceRatio:0.85,// Progress
watchSlidesProgress:false,watchSlidesVisibility:false,// Cursor
grabCursor:false,// Clicks
preventClicks:true,preventClicksPropagation:true,slideToClickedSlide:false,// Images
preloadImages:true,updateOnImagesReady:true,// loop
loop:false,loopAdditionalSlides:0,loopedSlides:null,loopFillGroupWithBlank:false,// Swiping/no swiping
allowSlidePrev:true,allowSlideNext:true,swipeHandler:null,// '.swipe-handler',
noSwiping:true,noSwipingClass:'swiper-no-swiping',// Passive Listeners
passiveListeners:true,// NS
containerModifierClass:'swiper-container-',// NEW
slideClass:'swiper-slide',slideBlankClass:'swiper-slide-invisible-blank',slideActiveClass:'swiper-slide-active',slideDuplicateActiveClass:'swiper-slide-duplicate-active',slideVisibleClass:'swiper-slide-visible',slideDuplicateClass:'swiper-slide-duplicate',slideNextClass:'swiper-slide-next',slideDuplicateNextClass:'swiper-slide-duplicate-next',slidePrevClass:'swiper-slide-prev',slideDuplicatePrevClass:'swiper-slide-duplicate-prev',wrapperClass:'swiper-wrapper',// Callbacks
runCallbacksOnInit:true};var prototypes={update:update,translate:translate,transition:transition$1,slide:slide,loop:loop,grabCursor:grabCursor,manipulation:manipulation,events:events,breakpoints:breakpoints,classes:classes,images:images};var extendedDefaults={};var Swiper$1=function(SwiperClass$$1){function Swiper(){var args=[],len=arguments.length;while(len--){args[len]=arguments[len];}var el;var params;if(args.length===1&&args[0].constructor&&args[0].constructor===Object){params=args[0];}else{var assign;assign=args,el=assign[0],params=assign[1];}if(!params){params={};}params=Utils.extend({},params);if(el&&!params.el){params.el=el;}SwiperClass$$1.call(this,params);Object.keys(prototypes).forEach(function(prototypeGroup){Object.keys(prototypes[prototypeGroup]).forEach(function(protoMethod){if(!Swiper.prototype[protoMethod]){Swiper.prototype[protoMethod]=prototypes[prototypeGroup][protoMethod];}});});// Swiper Instance
var swiper=this;if(typeof swiper.modules==='undefined'){swiper.modules={};}Object.keys(swiper.modules).forEach(function(moduleName){var module=swiper.modules[moduleName];if(module.params){var moduleParamName=Object.keys(module.params)[0];var moduleParams=module.params[moduleParamName];if((typeof moduleParams==="undefined"?"undefined":_typeof(moduleParams))!=='object'){return;}if(!(moduleParamName in params&&'enabled'in moduleParams)){return;}if(params[moduleParamName]===true){params[moduleParamName]={enabled:true};}if(_typeof(params[moduleParamName])==='object'&&!('enabled'in params[moduleParamName])){params[moduleParamName].enabled=true;}if(!params[moduleParamName]){params[moduleParamName]={enabled:false};}}});// Extend defaults with modules params
var swiperParams=Utils.extend({},defaults);swiper.useModulesParams(swiperParams);// Extend defaults with passed params
swiper.params=Utils.extend({},swiperParams,extendedDefaults,params);swiper.originalParams=Utils.extend({},swiper.params);swiper.passedParams=Utils.extend({},params);// Find el
var $el=$$1(swiper.params.el);el=$el[0];if(!el){return undefined;}if($el.length>1){var swipers=[];$el.each(function(index,containerEl){var newParams=Utils.extend({},params,{el:containerEl});swipers.push(new Swiper(newParams));});return swipers;}el.swiper=swiper;$el.data('swiper',swiper);// Find Wrapper
var $wrapperEl=$el.children("."+swiper.params.wrapperClass);// Extend Swiper
Utils.extend(swiper,{$el:$el,el:el,$wrapperEl:$wrapperEl,wrapperEl:$wrapperEl[0],// Classes
classNames:[],// Slides
slides:$$1(),slidesGrid:[],snapGrid:[],slidesSizesGrid:[],// isDirection
isHorizontal:function isHorizontal(){return swiper.params.direction==='horizontal';},isVertical:function isVertical(){return swiper.params.direction==='vertical';},// RTL
rtl:swiper.params.direction==='horizontal'&&(el.dir.toLowerCase()==='rtl'||$el.css('direction')==='rtl'),wrongRTL:$wrapperEl.css('display')==='-webkit-box',// Indexes
activeIndex:0,realIndex:0,//
isBeginning:true,isEnd:false,// Props
translate:0,progress:0,velocity:0,animating:false,// Locks
allowSlideNext:swiper.params.allowSlideNext,allowSlidePrev:swiper.params.allowSlidePrev,// Touch Events
touchEvents:function touchEvents(){var touch=['touchstart','touchmove','touchend'];var desktop=['mousedown','mousemove','mouseup'];if(win.navigator.pointerEnabled){desktop=['pointerdown','pointermove','pointerup'];}else if(win.navigator.msPointerEnabled){desktop=['MSPointerDown','MsPointerMove','MsPointerUp'];}return{start:Support.touch||!swiper.params.simulateTouch?touch[0]:desktop[0],move:Support.touch||!swiper.params.simulateTouch?touch[1]:desktop[1],end:Support.touch||!swiper.params.simulateTouch?touch[2]:desktop[2]};}(),touchEventsData:{isTouched:undefined,isMoved:undefined,allowTouchCallbacks:undefined,touchStartTime:undefined,isScrolling:undefined,currentTranslate:undefined,startTranslate:undefined,allowThresholdMove:undefined,// Form elements to match
formElements:'input, select, option, textarea, button, video',// Last click time
lastClickTime:Utils.now(),clickTimeout:undefined,// Velocities
velocities:[],allowMomentumBounce:undefined,isTouchEvent:undefined,startMoving:undefined},// Clicks
allowClick:true,// Touches
allowTouchMove:swiper.params.allowTouchMove,touches:{startX:0,startY:0,currentX:0,currentY:0,diff:0},// Images
imagesToLoad:[],imagesLoaded:0});// Install Modules
swiper.useModules();// Init
if(swiper.params.init){swiper.init();}// Return app instance
return swiper;}if(SwiperClass$$1)Swiper.__proto__=SwiperClass$$1;Swiper.prototype=Object.create(SwiperClass$$1&&SwiperClass$$1.prototype);Swiper.prototype.constructor=Swiper;var staticAccessors={extendedDefaults:{},defaults:{},Class:{},$:{}};Swiper.prototype.slidesPerViewDynamic=function slidesPerViewDynamic(){var swiper=this;var params=swiper.params;var slides=swiper.slides;var slidesGrid=swiper.slidesGrid;var swiperSize=swiper.size;var activeIndex=swiper.activeIndex;var spv=1;if(params.centeredSlides){var slideSize=slides[activeIndex].swiperSlideSize;var breakLoop;for(var i=activeIndex+1;i<slides.length;i+=1){if(slides[i]&&!breakLoop){slideSize+=slides[i].swiperSlideSize;spv+=1;if(slideSize>swiperSize){breakLoop=true;}}}for(var i$1=activeIndex-1;i$1>=0;i$1-=1){if(slides[i$1]&&!breakLoop){slideSize+=slides[i$1].swiperSlideSize;spv+=1;if(slideSize>swiperSize){breakLoop=true;}}}}else{for(var i$2=activeIndex+1;i$2<slides.length;i$2+=1){if(slidesGrid[i$2]-slidesGrid[activeIndex]<swiperSize){spv+=1;}}}return spv;};Swiper.prototype.update=function update$$1(){var swiper=this;if(!swiper||swiper.destroyed){return;}swiper.updateSize();swiper.updateSlides();swiper.updateProgress();swiper.updateSlidesClasses();var newTranslate;function setTranslate(){newTranslate=Math.min(Math.max(swiper.translate,swiper.maxTranslate()),swiper.minTranslate());swiper.setTranslate(newTranslate);swiper.updateActiveIndex();swiper.updateSlidesClasses();}var translated;if(swiper.params.freeMode){setTranslate();if(swiper.params.autoHeight){swiper.updateAutoHeight();}}else{if((swiper.params.slidesPerView==='auto'||swiper.params.slidesPerView>1)&&swiper.isEnd&&!swiper.params.centeredSlides){translated=swiper.slideTo(swiper.slides.length-1,0,false,true);}else{translated=swiper.slideTo(swiper.activeIndex,0,false,true);}if(!translated){setTranslate();}}swiper.emit('update');};Swiper.prototype.init=function init(){var swiper=this;if(swiper.initialized){return;}swiper.emit('beforeInit');// Set breakpoint
if(swiper.params.breakpoints){swiper.setBreakpoint();}// Add Classes
swiper.addClasses();// Create loop
if(swiper.params.loop){swiper.loopCreate();}// Update size
swiper.updateSize();// Update slides
swiper.updateSlides();// Set Grab Cursor
if(swiper.params.grabCursor){swiper.setGrabCursor();}if(swiper.params.preloadImages){swiper.preloadImages();}// Slide To Initial Slide
if(swiper.params.loop){swiper.slideTo(swiper.params.initialSlide+swiper.loopedSlides,0,swiper.params.runCallbacksOnInit);}else{swiper.slideTo(swiper.params.initialSlide,0,swiper.params.runCallbacksOnInit);}// Attach events
swiper.attachEvents();// Init Flag
swiper.initialized=true;// Emit
swiper.emit('init');};Swiper.prototype.destroy=function destroy(deleteInstance,cleanStyles){if(deleteInstance===void 0)deleteInstance=true;if(cleanStyles===void 0)cleanStyles=true;var swiper=this;var params=swiper.params;var $el=swiper.$el;var $wrapperEl=swiper.$wrapperEl;var slides=swiper.slides;swiper.emit('beforeDestroy');// Init Flag
swiper.initialized=false;// Detach events
swiper.detachEvents();// Destroy loop
if(params.loop){swiper.loopDestroy();}// Cleanup styles
if(cleanStyles){swiper.removeClasses();$el.removeAttr('style');$wrapperEl.removeAttr('style');if(slides&&slides.length){slides.removeClass([params.slideVisibleClass,params.slideActiveClass,params.slideNextClass,params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-slide-index').removeAttr('data-swiper-column').removeAttr('data-swiper-row');}}swiper.emit('destroy');// Detach emitter events
Object.keys(swiper.eventsListeners).forEach(function(eventName){swiper.off(eventName);});if(deleteInstance!==false){swiper.$el[0].swiper=null;swiper.$el.data('swiper',null);Utils.deleteProps(swiper);}swiper.destroyed=true;};Swiper.extendDefaults=function extendDefaults(newDefaults){Utils.extend(extendedDefaults,newDefaults);};staticAccessors.extendedDefaults.get=function(){return extendedDefaults;};staticAccessors.defaults.get=function(){return defaults;};staticAccessors.Class.get=function(){return SwiperClass$$1;};staticAccessors.$.get=function(){return $$1;};Object.defineProperties(Swiper,staticAccessors);return Swiper;}(SwiperClass);var Device$2={name:'device',proto:{device:Device},static:{device:Device}};var Support$2={name:'support',proto:{support:Support},static:{support:Support}};var Browser$2={name:'browser',proto:{browser:Browser},static:{browser:Browser}};var Resize={name:'resize',create:function create(){var swiper=this;Utils.extend(swiper,{resize:{resizeHandler:function resizeHandler(){if(!swiper||swiper.destroyed||!swiper.initialized){return;}swiper.emit('beforeResize');swiper.emit('resize');},orientationChangeHandler:function orientationChangeHandler(){if(!swiper||swiper.destroyed||!swiper.initialized){return;}swiper.emit('orientationchange');}}});},on:{init:function init(){var swiper=this;// Emit resize
win.addEventListener('resize',swiper.resize.resizeHandler);// Emit orientationchange
win.addEventListener('orientationchange',swiper.resize.orientationChangeHandler);},destroy:function destroy(){var swiper=this;win.removeEventListener('resize',swiper.resize.resizeHandler);win.removeEventListener('orientationchange',swiper.resize.orientationChangeHandler);}}};var Observer={func:win.MutationObserver||win.WebkitMutationObserver,attach:function attach(target,options){if(options===void 0)options={};var swiper=this;var ObserverFunc=Observer.func;var observer=new ObserverFunc(function(mutations){mutations.forEach(function(mutation){swiper.emit('observerUpdate',mutation);});});observer.observe(target,{attributes:typeof options.attributes==='undefined'?true:options.attributes,childList:typeof options.childList==='undefined'?true:options.childList,characterData:typeof options.characterData==='undefined'?true:options.characterData});swiper.observer.observers.push(observer);},init:function init(){var swiper=this;if(!Support.observer||!swiper.params.observer){return;}if(swiper.params.observeParents){var containerParents=swiper.$el.parents();for(var i=0;i<containerParents.length;i+=1){swiper.observer.attach(containerParents[i]);}}// Observe container
swiper.observer.attach(swiper.$el[0],{childList:false});// Observe wrapper
swiper.observer.attach(swiper.$wrapperEl[0],{attributes:false});},destroy:function destroy(){var swiper=this;swiper.observer.observers.forEach(function(observer){observer.disconnect();});swiper.observer.observers=[];}};var Observer$1={name:'observer',params:{observer:false,observeParents:false},create:function create(){var swiper=this;Utils.extend(swiper,{observer:{init:Observer.init.bind(swiper),attach:Observer.attach.bind(swiper),destroy:Observer.destroy.bind(swiper),observers:[]}});},on:{init:function init(){var swiper=this;swiper.observer.init();},destroy:function destroy(){var swiper=this;swiper.observer.destroy();}}};var Virtual={update:function update(force){var swiper=this;var ref=swiper.params;var slidesPerView=ref.slidesPerView;var slidesPerGroup=ref.slidesPerGroup;var centeredSlides=ref.centeredSlides;var ref$1=swiper.virtual;var previousFrom=ref$1.from;var previousTo=ref$1.to;var slides=ref$1.slides;var previousSlidesGrid=ref$1.slidesGrid;var renderSlide=ref$1.renderSlide;var previousOffset=ref$1.offset;swiper.updateActiveIndex();var activeIndex=swiper.activeIndex||0;var offsetProp;if(swiper.rtl&&swiper.isHorizontal()){offsetProp='right';}else{offsetProp=swiper.isHorizontal()?'left':'top';}var slidesAfter;var slidesBefore;if(centeredSlides){slidesAfter=Math.floor(slidesPerView/2)+slidesPerGroup;slidesBefore=Math.floor(slidesPerView/2)+slidesPerGroup;}else{slidesAfter=slidesPerView+(slidesPerGroup-1);slidesBefore=slidesPerGroup;}var from=Math.max((activeIndex||0)-slidesBefore,0);var to=Math.min((activeIndex||0)+slidesAfter,slides.length-1);var offset=(swiper.slidesGrid[from]||0)-(swiper.slidesGrid[0]||0);Utils.extend(swiper.virtual,{from:from,to:to,offset:offset,slidesGrid:swiper.slidesGrid});function onRendered(){swiper.updateSlides();swiper.updateProgress();swiper.updateSlidesClasses();if(swiper.lazy&&swiper.params.lazy.enabled){swiper.lazy.load();}}if(previousFrom===from&&previousTo===to&&!force){if(swiper.slidesGrid!==previousSlidesGrid&&offset!==previousOffset){swiper.slides.css(offsetProp,offset+"px");}swiper.updateProgress();return;}if(swiper.params.virtual.renderExternal){swiper.params.virtual.renderExternal.call(swiper,{offset:offset,from:from,to:to,slides:function getSlides(){var slidesToRender=[];for(var i=from;i<=to;i+=1){slidesToRender.push(slides[i]);}return slidesToRender;}()});onRendered();return;}var prependIndexes=[];var appendIndexes=[];if(force){swiper.$wrapperEl.find("."+swiper.params.slideClass).remove();}else{for(var i=previousFrom;i<=previousTo;i+=1){if(i<from||i>to){swiper.$wrapperEl.find("."+swiper.params.slideClass+"[data-swiper-slide-index=\""+i+"\"]").remove();}}}for(var i$1=0;i$1<slides.length;i$1+=1){if(i$1>=from&&i$1<=to){if(typeof previousTo==='undefined'||force){appendIndexes.push(i$1);}else{if(i$1>previousTo){appendIndexes.push(i$1);}if(i$1<previousFrom){prependIndexes.push(i$1);}}}}appendIndexes.forEach(function(index){swiper.$wrapperEl.append(renderSlide(slides[index],index));});prependIndexes.sort(function(a,b){return a<b;}).forEach(function(index){swiper.$wrapperEl.prepend(renderSlide(slides[index],index));});swiper.$wrapperEl.children('.swiper-slide').css(offsetProp,offset+"px");onRendered();},renderSlide:function renderSlide(slide,index){var swiper=this;var params=swiper.params.virtual;if(params.cache&&swiper.virtual.cache[index]){return swiper.virtual.cache[index];}var $slideEl=params.renderSlide?$$1(params.renderSlide.call(swiper,slide,index)):$$1("<div class=\""+swiper.params.slideClass+"\" data-swiper-slide-index=\""+index+"\">"+slide+"</div>");if(!$slideEl.attr('data-swiper-slide-index')){$slideEl.attr('data-swiper-slide-index',index);}if(params.cache){swiper.virtual.cache[index]=$slideEl;}return $slideEl;},appendSlide:function appendSlide(slide){var swiper=this;swiper.virtual.slides.push(slide);swiper.virtual.update(true);},prependSlide:function prependSlide(slide){var swiper=this;swiper.virtual.slides.unshift(slide);if(swiper.params.virtual.cache){var cache=swiper.virtual.cache;var newCache={};Object.keys(cache).forEach(function(cachedIndex){newCache[cachedIndex+1]=cache[cachedIndex];});swiper.virtual.cache=newCache;}swiper.virtual.update(true);swiper.slideNext(0);}};var Virtual$1={name:'virtual',params:{virtual:{enabled:false,slides:[],cache:true,renderSlide:null,renderExternal:null}},create:function create(){var swiper=this;Utils.extend(swiper,{virtual:{update:Virtual.update.bind(swiper),appendSlide:Virtual.appendSlide.bind(swiper),prependSlide:Virtual.prependSlide.bind(swiper),renderSlide:Virtual.renderSlide.bind(swiper),slides:swiper.params.virtual.slides,cache:{}}});},on:{beforeInit:function beforeInit(){var swiper=this;if(!swiper.params.virtual.enabled){return;}swiper.classNames.push(swiper.params.containerModifierClass+"virtual");var overwriteParams={watchSlidesProgress:true};Utils.extend(swiper.params,overwriteParams);Utils.extend(swiper.originalParams,overwriteParams);swiper.virtual.update();},setTranslate:function setTranslate(){var swiper=this;if(!swiper.params.virtual.enabled){return;}swiper.virtual.update();}}};var Keyboard={handle:function handle(event){var swiper=this;var e=event;if(e.originalEvent){e=e.originalEvent;}// jquery fix
var kc=e.keyCode||e.charCode;// Directions locks
if(!swiper.allowSlideNext&&(swiper.isHorizontal()&&kc===39||swiper.isVertical()&&kc===40)){return false;}if(!swiper.allowSlidePrev&&(swiper.isHorizontal()&&kc===37||swiper.isVertical()&&kc===38)){return false;}if(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey){return undefined;}if(doc.activeElement&&doc.activeElement.nodeName&&(doc.activeElement.nodeName.toLowerCase()==='input'||doc.activeElement.nodeName.toLowerCase()==='textarea')){return undefined;}if(kc===37||kc===39||kc===38||kc===40){var inView=false;// Check that swiper should be inside of visible area of window
if(swiper.$el.parents("."+swiper.params.slideClass).length>0&&swiper.$el.parents("."+swiper.params.slideActiveClass).length===0){return undefined;}var windowScroll={left:win.pageXOffset,top:win.pageYOffset};var windowWidth=win.innerWidth;var windowHeight=win.innerHeight;var swiperOffset=swiper.$el.offset();if(swiper.rtl){swiperOffset.left-=swiper.$el[0].scrollLeft;}var swiperCoord=[[swiperOffset.left,swiperOffset.top],[swiperOffset.left+swiper.width,swiperOffset.top],[swiperOffset.left,swiperOffset.top+swiper.height],[swiperOffset.left+swiper.width,swiperOffset.top+swiper.height]];for(var i=0;i<swiperCoord.length;i+=1){var point=swiperCoord[i];if(point[0]>=windowScroll.left&&point[0]<=windowScroll.left+windowWidth&&point[1]>=windowScroll.top&&point[1]<=windowScroll.top+windowHeight){inView=true;}}if(!inView){return undefined;}}if(swiper.isHorizontal()){if(kc===37||kc===39){if(e.preventDefault){e.preventDefault();}else{e.returnValue=false;}}if(kc===39&&!swiper.rtl||kc===37&&swiper.rtl){swiper.slideNext();}if(kc===37&&!swiper.rtl||kc===39&&swiper.rtl){swiper.slidePrev();}}else{if(kc===38||kc===40){if(e.preventDefault){e.preventDefault();}else{e.returnValue=false;}}if(kc===40){swiper.slideNext();}if(kc===38){swiper.slidePrev();}}swiper.emit('keyPress',kc);return undefined;},enable:function enable(){var swiper=this;if(swiper.keyboard.enabled){return;}$$1(doc).on('keydown',swiper.keyboard.handle);swiper.keyboard.enabled=true;},disable:function disable(){var swiper=this;if(!swiper.keyboard.enabled){return;}$$1(doc).off('keydown',swiper.keyboard.handle);swiper.keyboard.enabled=false;}};var Keyboard$1={name:'keyboard',params:{keyboard:{enabled:false}},create:function create(){var swiper=this;Utils.extend(swiper,{keyboard:{enabled:false,enable:Keyboard.enable.bind(swiper),disable:Keyboard.disable.bind(swiper),handle:Keyboard.handle.bind(swiper)}});},on:{init:function init(){var swiper=this;if(swiper.params.keyboard.enabled){swiper.keyboard.enable();}},destroy:function destroy(){var swiper=this;if(swiper.keyboard.enabled){swiper.keyboard.disable();}}}};function isEventSupported(){var eventName='onwheel';var isSupported=eventName in doc;if(!isSupported){var element=doc.createElement('div');element.setAttribute(eventName,'return;');isSupported=typeof element[eventName]==='function';}if(!isSupported&&doc.implementation&&doc.implementation.hasFeature&&// always returns true in newer browsers as per the standard.
// @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
doc.implementation.hasFeature('','')!==true){// This is the only way to test support for the `wheel` event in IE9+.
isSupported=doc.implementation.hasFeature('Events.wheel','3.0');}return isSupported;}var Mousewheel={lastScrollTime:Utils.now(),event:function getEvent(){if(win.navigator.userAgent.indexOf('firefox')>-1){return'DOMMouseScroll';}return isEventSupported()?'wheel':'mousewheel';}(),normalize:function normalize(e){// Reasonable defaults
var PIXEL_STEP=10;var LINE_HEIGHT=40;var PAGE_HEIGHT=800;var sX=0;var sY=0;// spinX, spinY
var pX=0;var pY=0;// pixelX, pixelY
// Legacy
if('detail'in e){sY=e.detail;}if('wheelDelta'in e){sY=-e.wheelDelta/120;}if('wheelDeltaY'in e){sY=-e.wheelDeltaY/120;}if('wheelDeltaX'in e){sX=-e.wheelDeltaX/120;}// side scrolling on FF with DOMMouseScroll
if('axis'in e&&e.axis===e.HORIZONTAL_AXIS){sX=sY;sY=0;}pX=sX*PIXEL_STEP;pY=sY*PIXEL_STEP;if('deltaY'in e){pY=e.deltaY;}if('deltaX'in e){pX=e.deltaX;}if((pX||pY)&&e.deltaMode){if(e.deltaMode===1){// delta in LINE units
pX*=LINE_HEIGHT;pY*=LINE_HEIGHT;}else{// delta in PAGE units
pX*=PAGE_HEIGHT;pY*=PAGE_HEIGHT;}}// Fall-back if spin cannot be determined
if(pX&&!sX){sX=pX<1?-1:1;}if(pY&&!sY){sY=pY<1?-1:1;}return{spinX:sX,spinY:sY,pixelX:pX,pixelY:pY};},handle:function handle(event){var e=event;var swiper=this;var params=swiper.params.mousewheel;if(e.originalEvent){e=e.originalEvent;}// jquery fix
var delta=0;var rtlFactor=swiper.rtl?-1:1;var data=Mousewheel.normalize(e);if(params.forceToAxis){if(swiper.isHorizontal()){if(Math.abs(data.pixelX)>Math.abs(data.pixelY)){delta=data.pixelX*rtlFactor;}else{return true;}}else if(Math.abs(data.pixelY)>Math.abs(data.pixelX)){delta=data.pixelY;}else{return true;}}else{delta=Math.abs(data.pixelX)>Math.abs(data.pixelY)?-data.pixelX*rtlFactor:-data.pixelY;}if(delta===0){return true;}if(params.invert){delta=-delta;}if(!swiper.params.freeMode){if(Utils.now()-swiper.mousewheel.lastScrollTime>60){if(delta<0){if((!swiper.isEnd||swiper.params.loop)&&!swiper.animating){swiper.slideNext();swiper.emit('scroll',e);}else if(params.releaseOnEdges){return true;}}else if((!swiper.isBeginning||swiper.params.loop)&&!swiper.animating){swiper.slidePrev();swiper.emit('scroll',e);}else if(params.releaseOnEdges){return true;}}swiper.mousewheel.lastScrollTime=new win.Date().getTime();}else{// Freemode or scrollContainer:
var position=swiper.getTranslate()+delta*params.sensitivity;var wasBeginning=swiper.isBeginning;var wasEnd=swiper.isEnd;if(position>=swiper.minTranslate()){position=swiper.minTranslate();}if(position<=swiper.maxTranslate()){position=swiper.maxTranslate();}swiper.setTransition(0);swiper.setTranslate(position);swiper.updateProgress();swiper.updateActiveIndex();swiper.updateSlidesClasses();if(!wasBeginning&&swiper.isBeginning||!wasEnd&&swiper.isEnd){swiper.updateSlidesClasses();}if(swiper.params.freeModeSticky){clearTimeout(swiper.mousewheel.timeout);swiper.mousewheel.timeout=Utils.nextTick(function(){swiper.slideReset();},300);}// Emit event
swiper.emit('scroll',e);// Stop autoplay
if(swiper.params.autoplay&&swiper.params.autoplayDisableOnInteraction){swiper.stopAutoplay();}// Return page scroll on edge positions
if(position===0||position===swiper.maxTranslate()){return true;}}if(e.preventDefault){e.preventDefault();}else{e.returnValue=false;}return false;},enable:function enable(){var swiper=this;if(!Mousewheel.event){return false;}if(swiper.mousewheel.enabled){return false;}var target=swiper.$el;if(swiper.params.mousewheel.eventsTarged!=='container'){target=$$1(swiper.params.mousewheel.eventsTarged);}target.on(Mousewheel.event,swiper.mousewheel.handle);swiper.mousewheel.enabled=true;return true;},disable:function disable(){var swiper=this;if(!Mousewheel.event){return false;}if(!swiper.mousewheel.enabled){return false;}var target=swiper.$el;if(swiper.params.mousewheel.eventsTarged!=='container'){target=$$1(swiper.params.mousewheel.eventsTarged);}target.off(Mousewheel.event,swiper.mousewheel.handle);swiper.mousewheel.enabled=false;return true;}};var Mousewheel$1={name:'mousewheel',params:{mousewheel:{enabled:false,releaseOnEdges:false,invert:false,forceToAxis:false,sensitivity:1,eventsTarged:'container'}},create:function create(){var swiper=this;Utils.extend(swiper,{mousewheel:{enabled:false,enable:Mousewheel.enable.bind(swiper),disable:Mousewheel.disable.bind(swiper),handle:Mousewheel.handle.bind(swiper),lastScrollTime:Utils.now()}});},on:{init:function init(){var swiper=this;if(swiper.params.mousewheel.enabled){swiper.mousewheel.enable();}},destroy:function destroy(){var swiper=this;if(swiper.mousewheel.enabled){swiper.mousewheel.disable();}}}};var Navigation={update:function update(){// Update Navigation Buttons
var swiper=this;var params=swiper.params.navigation;if(swiper.params.loop){return;}var ref=swiper.navigation;var $nextEl=ref.$nextEl;var $prevEl=ref.$prevEl;if($prevEl&&$prevEl.length>0){if(swiper.isBeginning){$prevEl.addClass(params.disabledClass);}else{$prevEl.removeClass(params.disabledClass);}}if($nextEl&&$nextEl.length>0){if(swiper.isEnd){$nextEl.addClass(params.disabledClass);}else{$nextEl.removeClass(params.disabledClass);}}},init:function init(){var swiper=this;var params=swiper.params.navigation;if(!(params.nextEl||params.prevEl)){return;}var $nextEl;var $prevEl;if(params.nextEl){$nextEl=$$1(params.nextEl);if(swiper.params.uniqueNavElements&&typeof params.nextEl==='string'&&$nextEl.length>1&&swiper.$el.find(params.nextEl).length===1){$nextEl=swiper.$el.find(params.nextEl);}}if(params.prevEl){$prevEl=$$1(params.prevEl);if(swiper.params.uniqueNavElements&&typeof params.prevEl==='string'&&$prevEl.length>1&&swiper.$el.find(params.prevEl).length===1){$prevEl=swiper.$el.find(params.prevEl);}}if($nextEl&&$nextEl.length>0){$nextEl.on('click',function(e){e.preventDefault();if(swiper.isEnd&&!swiper.params.loop){return;}swiper.slideNext();});}if($prevEl&&$prevEl.length>0){$prevEl.on('click',function(e){e.preventDefault();if(swiper.isBeginning&&!swiper.params.loop){return;}swiper.slidePrev();});}Utils.extend(swiper.navigation,{$nextEl:$nextEl,nextEl:$nextEl&&$nextEl[0],$prevEl:$prevEl,prevEl:$prevEl&&$prevEl[0]});},destroy:function destroy(){var swiper=this;var ref=swiper.navigation;var $nextEl=ref.$nextEl;var $prevEl=ref.$prevEl;if($nextEl&&$nextEl.length){$nextEl.off('click');$nextEl.removeClass(swiper.params.navigation.disabledClass);}if($prevEl&&$prevEl.length){$prevEl.off('click');$prevEl.removeClass(swiper.params.navigation.disabledClass);}}};var Navigation$1={name:'navigation',params:{navigation:{nextEl:null,prevEl:null,hideOnClick:false,disabledClass:'swiper-button-disabled',hiddenClass:'swiper-button-hidden'}},create:function create(){var swiper=this;Utils.extend(swiper,{navigation:{init:Navigation.init.bind(swiper),update:Navigation.update.bind(swiper),destroy:Navigation.destroy.bind(swiper)}});},on:{init:function init(){var swiper=this;swiper.navigation.init();swiper.navigation.update();},toEdge:function toEdge(){var swiper=this;swiper.navigation.update();},fromEdge:function fromEdge(){var swiper=this;swiper.navigation.update();},destroy:function destroy(){var swiper=this;swiper.navigation.destroy();},click:function click(e){var swiper=this;var ref=swiper.navigation;var $nextEl=ref.$nextEl;var $prevEl=ref.$prevEl;if(swiper.params.navigation.hideOnClick&&!$$1(e.target).is($prevEl)&&!$$1(e.target).is($nextEl)){if($nextEl){$nextEl.toggleClass(swiper.params.navigation.hiddenClass);}if($prevEl){$prevEl.toggleClass(swiper.params.navigation.hiddenClass);}}}}};var Pagination={update:function update(){// Render || Update Pagination bullets/items
var swiper=this;var rtl=swiper.rtl;var params=swiper.params.pagination;if(!params.el||!swiper.pagination.el||!swiper.pagination.$el||swiper.pagination.$el.length===0){return;}var slidesLength=swiper.virtual&&swiper.params.virtual.enabled?swiper.virtual.slides.length:swiper.slides.length;var $el=swiper.pagination.$el;// Current/Total
var current;var total=swiper.params.loop?Math.ceil((slidesLength-swiper.loopedSlides*2)/swiper.params.slidesPerGroup):swiper.snapGrid.length;if(swiper.params.loop){current=Math.ceil((swiper.activeIndex-swiper.loopedSlides)/swiper.params.slidesPerGroup);if(current>slidesLength-1-swiper.loopedSlides*2){current-=slidesLength-swiper.loopedSlides*2;}if(current>total-1){current-=total;}if(current<0&&swiper.params.paginationType!=='bullets'){current=total+current;}}else if(typeof swiper.snapIndex!=='undefined'){current=swiper.snapIndex;}else{current=swiper.activeIndex||0;}// Types
if(params.type==='bullets'&&swiper.pagination.bullets&&swiper.pagination.bullets.length>0){var bullets=swiper.pagination.bullets;if(params.dynamicBullets){swiper.pagination.bulletSize=bullets.eq(0)[swiper.isHorizontal()?'outerWidth':'outerHeight'](true);$el.css(swiper.isHorizontal()?'width':'height',swiper.pagination.bulletSize*5+"px");}bullets.removeClass(params.bulletActiveClass+" "+params.bulletActiveClass+"-next "+params.bulletActiveClass+"-next-next "+params.bulletActiveClass+"-prev "+params.bulletActiveClass+"-prev-prev");if($el.length>1){bullets.each(function(index,bullet){var $bullet=$$1(bullet);if($bullet.index()===current){$bullet.addClass(params.bulletActiveClass);if(params.dynamicBullets){$bullet.prev().addClass(params.bulletActiveClass+"-prev").prev().addClass(params.bulletActiveClass+"-prev-prev");$bullet.next().addClass(params.bulletActiveClass+"-next").next().addClass(params.bulletActiveClass+"-next-next");}}});}else{var $bullet=bullets.eq(current);$bullet.addClass(params.bulletActiveClass);if(params.dynamicBullets){$bullet.prev().addClass(params.bulletActiveClass+"-prev").prev().addClass(params.bulletActiveClass+"-prev-prev");$bullet.next().addClass(params.bulletActiveClass+"-next").next().addClass(params.bulletActiveClass+"-next-next");}}if(params.dynamicBullets){var dynamicBulletsLength=Math.min(bullets.length,5);var bulletsOffset=(swiper.pagination.bulletSize*dynamicBulletsLength-swiper.pagination.bulletSize)/2-current*swiper.pagination.bulletSize;var offsetProp=rtl?'right':'left';bullets.css(swiper.isHorizontal()?offsetProp:'top',bulletsOffset+"px");}}if(params.type==='fraction'){$el.find("."+params.currentClass).text(current+1);$el.find("."+params.totalClass).text(total);}if(params.type==='progressbar'){var scale=(current+1)/total;var scaleX=scale;var scaleY=1;if(!swiper.isHorizontal()){scaleY=scale;scaleX=1;}$el.find("."+params.progressbarFillClass).transform("translate3d(0,0,0) scaleX("+scaleX+") scaleY("+scaleY+")").transition(swiper.params.speed);}if(params.type==='custom'&&params.renderCustom){$el.html(params.renderCustom(swiper,current+1,total));swiper.emit('paginationRender',swiper,$el[0]);}else{swiper.emit('paginationUpdate',swiper,$el[0]);}},render:function render(){// Render Container
var swiper=this;var params=swiper.params.pagination;if(!params.el||!swiper.pagination.el||!swiper.pagination.$el||swiper.pagination.$el.length===0){return;}var slidesLength=swiper.virtual&&swiper.params.virtual.enabled?swiper.virtual.slides.length:swiper.slides.length;var $el=swiper.pagination.$el;var paginationHTML='';if(params.type==='bullets'){var numberOfBullets=swiper.params.loop?Math.ceil((slidesLength-swiper.loopedSlides*2)/swiper.params.slidesPerGroup):swiper.snapGrid.length;for(var i=0;i<numberOfBullets;i+=1){if(params.renderBullet){paginationHTML+=params.renderBullet.call(swiper,i,params.bulletClass);}else{paginationHTML+="<"+params.bulletElement+" class=\""+params.bulletClass+"\"></"+params.bulletElement+">";}}$el.html(paginationHTML);swiper.pagination.bullets=$el.find("."+params.bulletClass);}if(params.type==='fraction'){if(params.renderFraction){paginationHTML=params.renderFraction.call(swiper,params.currentClass,params.totalClass);}else{paginationHTML="<span class=\""+params.currentClass+"\"></span>"+' / '+"<span class=\""+params.totalClass+"\"></span>";}$el.html(paginationHTML);}if(params.type==='progressbar'){if(params.renderProgressbar){paginationHTML=params.renderProgressbar.call(swiper,params.progressbarFillClass);}else{paginationHTML="<span class=\""+params.progressbarFillClass+"\"></span>";}$el.html(paginationHTML);}if(params.type!=='custom'){swiper.emit('paginationRender',swiper.pagination.$el[0]);}},init:function init(){var swiper=this;var params=swiper.params.pagination;if(!params.el){return;}var $el=$$1(params.el);if($el.length===0){return;}if(swiper.params.uniqueNavElements&&typeof params.el==='string'&&$el.length>1&&swiper.$el.find(params.el).length===1){$el=swiper.$el.find(params.el);}if(params.type==='bullets'&&params.clickable){$el.addClass(params.clickableClass);}$el.addClass(params.modifierClass+params.type);if(params.type==='bullets'&&params.dynamicBullets){$el.addClass(""+params.modifierClass+params.type+"-dynamic");}if(params.clickable){$el.on('click',"."+params.bulletClass,function onClick(e){e.preventDefault();var index=$$1(this).index()*swiper.params.slidesPerGroup;if(swiper.params.loop){index+=swiper.loopedSlides;}swiper.slideTo(index);});}Utils.extend(swiper.pagination,{$el:$el,el:$el[0]});},destroy:function destroy(){var swiper=this;var params=swiper.params.pagination;if(!params.el||!swiper.pagination.el||!swiper.pagination.$el||swiper.pagination.$el.length===0){return;}var $el=swiper.pagination.$el;$el.removeClass(params.hiddenClass);$el.removeClass(params.modifierClass+params.type);if(swiper.pagination.bullets){swiper.pagination.bullets.removeClass(params.bulletActiveClass);}if(params.clickable){$el.off('click',"."+params.bulletClass);}}};var Pagination$1={name:'pagination',params:{pagination:{el:null,bulletElement:'span',clickable:false,hideOnClick:false,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,type:'bullets',// 'bullets' or 'progressbar' or 'fraction' or 'custom'
dynamicBullets:false,bulletClass:'swiper-pagination-bullet',bulletActiveClass:'swiper-pagination-bullet-active',modifierClass:'swiper-pagination-',// NEW
currentClass:'swiper-pagination-current',totalClass:'swiper-pagination-total',hiddenClass:'swiper-pagination-hidden',progressbarFillClass:'swiper-pagination-progressbar-fill',clickableClass:'swiper-pagination-clickable'// NEW
}},create:function create(){var swiper=this;Utils.extend(swiper,{pagination:{init:Pagination.init.bind(swiper),render:Pagination.render.bind(swiper),update:Pagination.update.bind(swiper),destroy:Pagination.destroy.bind(swiper)}});},on:{init:function init(){var swiper=this;swiper.pagination.init();swiper.pagination.render();swiper.pagination.update();},activeIndexChange:function activeIndexChange(){var swiper=this;if(swiper.params.loop){swiper.pagination.update();}else if(typeof swiper.snapIndex==='undefined'){swiper.pagination.update();}},snapIndexChange:function snapIndexChange(){var swiper=this;if(!swiper.params.loop){swiper.pagination.update();}},slidesLengthChange:function slidesLengthChange(){var swiper=this;if(swiper.params.loop){swiper.pagination.render();swiper.pagination.update();}},snapGridLengthChange:function snapGridLengthChange(){var swiper=this;if(!swiper.params.loop){swiper.pagination.render();swiper.pagination.update();}},destroy:function destroy(){var swiper=this;swiper.pagination.destroy();},click:function click(e){var swiper=this;if(swiper.params.pagination.el&&swiper.params.pagination.hideOnClick&&swiper.pagination.$el.length>0&&!$$1(e.target).hasClass(swiper.params.pagination.bulletClass)){swiper.pagination.$el.toggleClass(swiper.params.pagination.hiddenClass);}}}};var Scrollbar={setTranslate:function setTranslate(){var swiper=this;if(!swiper.params.scrollbar.el||!swiper.scrollbar.el){return;}var scrollbar=swiper.scrollbar;var rtl=swiper.rtl;var progress=swiper.progress;var dragSize=scrollbar.dragSize;var trackSize=scrollbar.trackSize;var $dragEl=scrollbar.$dragEl;var $el=scrollbar.$el;var params=swiper.params.scrollbar;var newSize=dragSize;var newPos=(trackSize-dragSize)*progress;if(rtl&&swiper.isHorizontal()){newPos=-newPos;if(newPos>0){newSize=dragSize-newPos;newPos=0;}else if(-newPos+dragSize>trackSize){newSize=trackSize+newPos;}}else if(newPos<0){newSize=dragSize+newPos;newPos=0;}else if(newPos+dragSize>trackSize){newSize=trackSize-newPos;}if(swiper.isHorizontal()){if(Support.transforms3d){$dragEl.transform("translate3d("+newPos+"px, 0, 0)");}else{$dragEl.transform("translateX("+newPos+"px)");}$dragEl[0].style.width=newSize+"px";}else{if(Support.transforms3d){$dragEl.transform("translate3d(0px, "+newPos+"px, 0)");}else{$dragEl.transform("translateY("+newPos+"px)");}$dragEl[0].style.height=newSize+"px";}if(params.hide){clearTimeout(swiper.scrollbar.timeout);$el[0].style.opacity=1;swiper.scrollbar.timeout=setTimeout(function(){$el[0].style.opacity=0;$el.transition(400);},1000);}},setTransition:function setTransition(duration){var swiper=this;if(!swiper.params.scrollbar.el||!swiper.scrollbar.el){return;}swiper.scrollbar.$dragEl.transition(duration);},updateSize:function updateSize(){var swiper=this;if(!swiper.params.scrollbar.el||!swiper.scrollbar.el){return;}var scrollbar=swiper.scrollbar;var $dragEl=scrollbar.$dragEl;var $el=scrollbar.$el;$dragEl[0].style.width='';$dragEl[0].style.height='';var trackSize=swiper.isHorizontal()?$el[0].offsetWidth:$el[0].offsetHeight;var divider=swiper.size/swiper.virtualSize;var moveDivider=divider*(trackSize/swiper.size);var dragSize;if(swiper.params.scrollbar.dragSize==='auto'){dragSize=trackSize*divider;}else{dragSize=parseInt(swiper.params.scrollbar.dragSize,10);}if(swiper.isHorizontal()){$dragEl[0].style.width=dragSize+"px";}else{$dragEl[0].style.height=dragSize+"px";}if(divider>=1){$el[0].style.display='none';}else{$el[0].style.display='';}if(swiper.params.scrollbarHide){$el[0].style.opacity=0;}Utils.extend(scrollbar,{trackSize:trackSize,divider:divider,moveDivider:moveDivider,dragSize:dragSize});},setDragPosition:function setDragPosition(e){var swiper=this;var scrollbar=swiper.scrollbar;var $el=scrollbar.$el;var dragSize=scrollbar.dragSize;var trackSize=scrollbar.trackSize;var pointerPosition;if(swiper.isHorizontal()){pointerPosition=e.type==='touchstart'||e.type==='touchmove'?e.targetTouches[0].pageX:e.pageX||e.clientX;}else{pointerPosition=e.type==='touchstart'||e.type==='touchmove'?e.targetTouches[0].pageY:e.pageY||e.clientY;}var positionRatio;positionRatio=(pointerPosition-$el.offset()[swiper.isHorizontal()?'left':'top']-dragSize/2)/(trackSize-dragSize);positionRatio=Math.max(Math.min(positionRatio,1),0);if(swiper.rtl){positionRatio=1-positionRatio;}var position=swiper.minTranslate()+(swiper.maxTranslate()-swiper.minTranslate())*positionRatio;swiper.updateProgress(position);swiper.setTranslate(position);swiper.updateActiveIndex();swiper.updateSlidesClasses();},onDragStart:function onDragStart(e){var swiper=this;var params=swiper.params.scrollbar;var scrollbar=swiper.scrollbar;var $wrapperEl=swiper.$wrapperEl;var $el=scrollbar.$el;var $dragEl=scrollbar.$dragEl;swiper.scrollbar.isTouched=true;e.preventDefault();e.stopPropagation();$wrapperEl.transition(100);$dragEl.transition(100);scrollbar.setDragPosition(e);clearTimeout(swiper.scrollbar.dragTimeout);$el.transition(0);if(params.hide){$el.css('opacity',1);}swiper.emit('scrollbarDragStart',e);},onDragMove:function onDragMove(e){var swiper=this;var scrollbar=swiper.scrollbar;var $wrapperEl=swiper.$wrapperEl;var $el=scrollbar.$el;var $dragEl=scrollbar.$dragEl;if(!swiper.scrollbar.isTouched){return;}if(e.preventDefault){e.preventDefault();}else{e.returnValue=false;}scrollbar.setDragPosition(e);$wrapperEl.transition(0);$el.transition(0);$dragEl.transition(0);swiper.emit('scrollbarDragMove',e);},onDragEnd:function onDragEnd(e){var swiper=this;var params=swiper.params.scrollbar;var scrollbar=swiper.scrollbar;var $el=scrollbar.$el;if(!swiper.scrollbar.isTouched){return;}swiper.scrollbar.isTouched=false;if(params.hide){clearTimeout(swiper.scrollbar.dragTimeout);swiper.scrollbar.dragTimeout=Utils.nextTick(function(){$el.css('opacity',0);$el.transition(400);},1000);}swiper.emit('scrollbarDragEnd',e);if(params.snapOnRelease){swiper.slideReset();}},enableDraggable:function enableDraggable(){var swiper=this;if(!swiper.params.scrollbar.el){return;}var scrollbar=swiper.scrollbar;var $el=scrollbar.$el;var target=Support.touch?$el[0]:document;$el.on(swiper.scrollbar.dragEvents.start,swiper.scrollbar.onDragStart);$$1(target).on(swiper.scrollbar.dragEvents.move,swiper.scrollbar.onDragMove);$$1(target).on(swiper.scrollbar.dragEvents.end,swiper.scrollbar.onDragEnd);},disableDraggable:function disableDraggable(){var swiper=this;if(!swiper.params.scrollbar.el){return;}var scrollbar=swiper.scrollbar;var $el=scrollbar.$el;var target=Support.touch?$el[0]:document;$el.off(swiper.scrollbar.dragEvents.start);$$1(target).off(swiper.scrollbar.dragEvents.move);$$1(target).off(swiper.scrollbar.dragEvents.end);},init:function init(){var swiper=this;if(!swiper.params.scrollbar.el){return;}var scrollbar=swiper.scrollbar;var $swiperEl=swiper.$el;var touchEvents=swiper.touchEvents;var params=swiper.params.scrollbar;var $el=$$1(params.el);if(swiper.params.uniqueNavElements&&typeof params.el==='string'&&$el.length>1&&$swiperEl.find(params.el).length===1){$el=$swiperEl.find(params.el);}var $dragEl=$el.find('.swiper-scrollbar-drag');if($dragEl.length===0){$dragEl=$$1('<div class="swiper-scrollbar-drag"></div>');$el.append($dragEl);}swiper.scrollbar.dragEvents=function dragEvents(){if(swiper.params.simulateTouch===false&&!Support.touch){return{start:'mousedown',move:'mousemove',end:'mouseup'};}return touchEvents;}();Utils.extend(scrollbar,{$el:$el,el:$el[0],$dragEl:$dragEl,dragEl:$dragEl[0]});if(params.draggable){scrollbar.enableDraggable();}},destroy:function destroy(){var swiper=this;swiper.scrollbar.disableDraggable();}};var Scrollbar$1={name:'scrollbar',params:{scrollbar:{el:null,dragSize:'auto',hide:false,draggable:false,snapOnRelease:true}},create:function create(){var swiper=this;Utils.extend(swiper,{scrollbar:{init:Scrollbar.init.bind(swiper),destroy:Scrollbar.destroy.bind(swiper),updateSize:Scrollbar.updateSize.bind(swiper),setTranslate:Scrollbar.setTranslate.bind(swiper),setTransition:Scrollbar.setTransition.bind(swiper),enableDraggable:Scrollbar.enableDraggable.bind(swiper),disableDraggable:Scrollbar.disableDraggable.bind(swiper),setDragPosition:Scrollbar.setDragPosition.bind(swiper),onDragStart:Scrollbar.onDragStart.bind(swiper),onDragMove:Scrollbar.onDragMove.bind(swiper),onDragEnd:Scrollbar.onDragEnd.bind(swiper),isTouched:false,timeout:null,dragTimeout:null}});},on:{init:function init(){var swiper=this;swiper.scrollbar.init();swiper.scrollbar.updateSize();swiper.scrollbar.setTranslate();},update:function update(){var swiper=this;swiper.scrollbar.updateSize();},resize:function resize(){var swiper=this;swiper.scrollbar.updateSize();},observerUpdate:function observerUpdate(){var swiper=this;swiper.scrollbar.updateSize();},setTranslate:function setTranslate(){var swiper=this;swiper.scrollbar.setTranslate();},setTransition:function setTransition(duration){var swiper=this;swiper.scrollbar.setTransition(duration);},destroy:function destroy(){var swiper=this;swiper.scrollbar.destroy();}}};var Parallax={setTransform:function setTransform(el,progress){var swiper=this;var rtl=swiper.rtl;var $el=$$1(el);var rtlFactor=rtl?-1:1;var p=$el.attr('data-swiper-parallax')||'0';var x=$el.attr('data-swiper-parallax-x');var y=$el.attr('data-swiper-parallax-y');var scale=$el.attr('data-swiper-parallax-scale');var opacity=$el.attr('data-swiper-parallax-opacity');if(x||y){x=x||'0';y=y||'0';}else if(swiper.isHorizontal()){x=p;y='0';}else{y=p;x='0';}if(x.indexOf('%')>=0){x=parseInt(x,10)*progress*rtlFactor+"%";}else{x=x*progress*rtlFactor+"px";}if(y.indexOf('%')>=0){y=parseInt(y,10)*progress+"%";}else{y=y*progress+"px";}if(typeof opacity!=='undefined'&&opacity!==null){var currentOpacity=opacity-(opacity-1)*(1-Math.abs(progress));$el[0].style.opacity=currentOpacity;}if(typeof scale==='undefined'||scale===null){$el.transform("translate3d("+x+", "+y+", 0px)");}else{var currentScale=scale-(scale-1)*(1-Math.abs(progress));$el.transform("translate3d("+x+", "+y+", 0px) scale("+currentScale+")");}},setTranslate:function setTranslate(){var swiper=this;var $el=swiper.$el;var slides=swiper.slides;var progress=swiper.progress;var snapGrid=swiper.snapGrid;$el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(index,el){swiper.parallax.setTransform(el,progress);});slides.each(function(slideIndex,slideEl){var slideProgress=slideEl.progress;if(swiper.params.slidesPerGroup>1&&swiper.params.slidesPerView!=='auto'){slideProgress+=Math.ceil(slideIndex/2)-progress*(snapGrid.length-1);}slideProgress=Math.min(Math.max(slideProgress,-1),1);$$1(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(index,el){swiper.parallax.setTransform(el,slideProgress);});});},setTransition:function setTransition(duration){if(duration===void 0)duration=this.params.speed;var swiper=this;var $el=swiper.$el;$el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(index,parallaxEl){var $parallaxEl=$$1(parallaxEl);var parallaxDuration=parseInt($parallaxEl.attr('data-swiper-parallax-duration'),10)||duration;if(duration===0){parallaxDuration=0;}$parallaxEl.transition(parallaxDuration);});}};var Parallax$1={name:'parallax',params:{parallax:{enabled:false}},create:function create(){var swiper=this;Utils.extend(swiper,{parallax:{setTransform:Parallax.setTransform.bind(swiper),setTranslate:Parallax.setTranslate.bind(swiper),setTransition:Parallax.setTransition.bind(swiper)}});},on:{beforeInit:function beforeInit(){var swiper=this;swiper.params.watchSlidesProgress=true;},init:function init(){var swiper=this;if(!swiper.params.parallax){return;}swiper.parallax.setTranslate();},setTranslate:function setTranslate(){var swiper=this;if(!swiper.params.parallax){return;}swiper.parallax.setTranslate();},setTransition:function setTransition(duration){var swiper=this;if(!swiper.params.parallax){return;}swiper.parallax.setTransition(duration);}}};var Zoom={// Calc Scale From Multi-touches
getDistanceBetweenTouches:function getDistanceBetweenTouches(e){if(e.targetTouches.length<2){return 1;}var x1=e.targetTouches[0].pageX;var y1=e.targetTouches[0].pageY;var x2=e.targetTouches[1].pageX;var y2=e.targetTouches[1].pageY;var distance=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));return distance;},// Events
onGestureStart:function onGestureStart(e){var swiper=this;var params=swiper.params.zoom;var zoom=swiper.zoom;var gesture=zoom.gesture;zoom.fakeGestureTouched=false;zoom.fakeGestureMoved=false;if(!Support.gestures){if(e.type!=='touchstart'||e.type==='touchstart'&&e.targetTouches.length<2){return;}zoom.fakeGestureTouched=true;gesture.scaleStart=Zoom.getDistanceBetweenTouches(e);}if(!gesture.$slideEl||!gesture.$slideEl.length){gesture.$slideEl=$$1(this);if(gesture.$slideEl.length===0){gesture.$slideEl=swiper.slides.eq(swiper.activeIndex);}gesture.$imageEl=gesture.$slideEl.find('img, svg, canvas');gesture.$imageWrapEl=gesture.$imageEl.parent("."+params.containerClass);gesture.maxRatio=gesture.$imageWrapEl.attr('data-swiper-zoom')||params.maxRatio;if(gesture.$imageWrapEl.length===0){gesture.$imageEl=undefined;return;}}gesture.$imageEl.transition(0);swiper.zoom.isScaling=true;},onGestureChange:function onGestureChange(e){var swiper=this;var params=swiper.params.zoom;var zoom=swiper.zoom;var gesture=zoom.gesture;if(!Support.gestures){if(e.type!=='touchmove'||e.type==='touchmove'&&e.targetTouches.length<2){return;}zoom.fakeGestureMoved=true;gesture.scaleMove=Zoom.getDistanceBetweenTouches(e);}if(!gesture.$imageEl||gesture.$imageEl.length===0){return;}if(Support.gestures){swiper.zoom.scale=e.scale*zoom.currentScale;}else{zoom.scale=gesture.scaleMove/gesture.scaleStart*zoom.currentScale;}if(zoom.scale>gesture.maxRatio){zoom.scale=gesture.maxRatio-1+Math.pow(zoom.scale-gesture.maxRatio+1,0.5);}if(zoom.scale<params.minRatio){zoom.scale=params.minRatio+1-Math.pow(params.minRatio-zoom.scale+1,0.5);}gesture.$imageEl.transform("translate3d(0,0,0) scale("+zoom.scale+")");},onGestureEnd:function onGestureEnd(e){var swiper=this;var params=swiper.params.zoom;var zoom=swiper.zoom;var gesture=zoom.gesture;if(!Support.gestures){if(!zoom.fakeGestureTouched||!zoom.fakeGestureMoved){return;}if(e.type!=='touchend'||e.type==='touchend'&&e.changedTouches.length<2&&!Device.android){return;}zoom.fakeGestureTouched=false;zoom.fakeGestureMoved=false;}if(!gesture.$imageEl||gesture.$imageEl.length===0){return;}zoom.scale=Math.max(Math.min(zoom.scale,gesture.maxRatio),params.minRatio);gesture.$imageEl.transition(swiper.params.speed).transform("translate3d(0,0,0) scale("+zoom.scale+")");zoom.currentScale=zoom.scale;zoom.isScaling=false;if(zoom.scale===1){gesture.$slideEl=undefined;}},onTouchStart:function onTouchStart(e){var swiper=this;var zoom=swiper.zoom;var gesture=zoom.gesture;var image=zoom.image;if(!gesture.$imageEl||gesture.$imageEl.length===0){return;}if(image.isTouched){return;}if(Device.android){e.preventDefault();}image.isTouched=true;image.touchesStart.x=e.type==='touchstart'?e.targetTouches[0].pageX:e.pageX;image.touchesStart.y=e.type==='touchstart'?e.targetTouches[0].pageY:e.pageY;},onTouchMove:function onTouchMove(e){var swiper=this;var zoom=swiper.zoom;var gesture=zoom.gesture;var image=zoom.image;var velocity=zoom.velocity;if(!gesture.$imageEl||gesture.$imageEl.length===0){return;}swiper.allowClick=false;if(!image.isTouched||!gesture.$slideEl){return;}if(!image.isMoved){image.width=gesture.$imageEl[0].offsetWidth;image.height=gesture.$imageEl[0].offsetHeight;image.startX=Utils.getTranslate(gesture.$imageWrapEl[0],'x')||0;image.startY=Utils.getTranslate(gesture.$imageWrapEl[0],'y')||0;gesture.slideWidth=gesture.$slideEl[0].offsetWidth;gesture.slideHeight=gesture.$slideEl[0].offsetHeight;gesture.$imageWrapEl.transition(0);if(swiper.rtl){image.startX=-image.startX;}if(swiper.rtl){image.startY=-image.startY;}}// Define if we need image drag
var scaledWidth=image.width*zoom.scale;var scaledHeight=image.height*zoom.scale;if(scaledWidth<gesture.slideWidth&&scaledHeight<gesture.slideHeight){return;}image.minX=Math.min(gesture.slideWidth/2-scaledWidth/2,0);image.maxX=-image.minX;image.minY=Math.min(gesture.slideHeight/2-scaledHeight/2,0);image.maxY=-image.minY;image.touchesCurrent.x=e.type==='touchmove'?e.targetTouches[0].pageX:e.pageX;image.touchesCurrent.y=e.type==='touchmove'?e.targetTouches[0].pageY:e.pageY;if(!image.isMoved&&!zoom.isScaling){if(swiper.isHorizontal()&&(Math.floor(image.minX)===Math.floor(image.startX)&&image.touchesCurrent.x<image.touchesStart.x||Math.floor(image.maxX)===Math.floor(image.startX)&&image.touchesCurrent.x>image.touchesStart.x)){image.isTouched=false;return;}else if(!swiper.isHorizontal()&&(Math.floor(image.minY)===Math.floor(image.startY)&&image.touchesCurrent.y<image.touchesStart.y||Math.floor(image.maxY)===Math.floor(image.startY)&&image.touchesCurrent.y>image.touchesStart.y)){image.isTouched=false;return;}}e.preventDefault();e.stopPropagation();image.isMoved=true;image.currentX=image.touchesCurrent.x-image.touchesStart.x+image.startX;image.currentY=image.touchesCurrent.y-image.touchesStart.y+image.startY;if(image.currentX<image.minX){image.currentX=image.minX+1-Math.pow(image.minX-image.currentX+1,0.8);}if(image.currentX>image.maxX){image.currentX=image.maxX-1+Math.pow(image.currentX-image.maxX+1,0.8);}if(image.currentY<image.minY){image.currentY=image.minY+1-Math.pow(image.minY-image.currentY+1,0.8);}if(image.currentY>image.maxY){image.currentY=image.maxY-1+Math.pow(image.currentY-image.maxY+1,0.8);}// Velocity
if(!velocity.prevPositionX){velocity.prevPositionX=image.touchesCurrent.x;}if(!velocity.prevPositionY){velocity.prevPositionY=image.touchesCurrent.y;}if(!velocity.prevTime){velocity.prevTime=Date.now();}velocity.x=(image.touchesCurrent.x-velocity.prevPositionX)/(Date.now()-velocity.prevTime)/2;velocity.y=(image.touchesCurrent.y-velocity.prevPositionY)/(Date.now()-velocity.prevTime)/2;if(Math.abs(image.touchesCurrent.x-velocity.prevPositionX)<2){velocity.x=0;}if(Math.abs(image.touchesCurrent.y-velocity.prevPositionY)<2){velocity.y=0;}velocity.prevPositionX=image.touchesCurrent.x;velocity.prevPositionY=image.touchesCurrent.y;velocity.prevTime=Date.now();gesture.$imageWrapEl.transform("translate3d("+image.currentX+"px, "+image.currentY+"px,0)");},onTouchEnd:function onTouchEnd(){var swiper=this;var zoom=swiper.zoom;var gesture=zoom.gesture;var image=zoom.image;var velocity=zoom.velocity;if(!gesture.$imageEl||gesture.$imageEl.length===0){return;}if(!image.isTouched||!image.isMoved){image.isTouched=false;image.isMoved=false;return;}image.isTouched=false;image.isMoved=false;var momentumDurationX=300;var momentumDurationY=300;var momentumDistanceX=velocity.x*momentumDurationX;var newPositionX=image.currentX+momentumDistanceX;var momentumDistanceY=velocity.y*momentumDurationY;var newPositionY=image.currentY+momentumDistanceY;// Fix duration
if(velocity.x!==0){momentumDurationX=Math.abs((newPositionX-image.currentX)/velocity.x);}if(velocity.y!==0){momentumDurationY=Math.abs((newPositionY-image.currentY)/velocity.y);}var momentumDuration=Math.max(momentumDurationX,momentumDurationY);image.currentX=newPositionX;image.currentY=newPositionY;// Define if we need image drag
var scaledWidth=image.width*zoom.scale;var scaledHeight=image.height*zoom.scale;image.minX=Math.min(gesture.slideWidth/2-scaledWidth/2,0);image.maxX=-image.minX;image.minY=Math.min(gesture.slideHeight/2-scaledHeight/2,0);image.maxY=-image.minY;image.currentX=Math.max(Math.min(image.currentX,image.maxX),image.minX);image.currentY=Math.max(Math.min(image.currentY,image.maxY),image.minY);gesture.$imageWrapEl.transition(momentumDuration).transform("translate3d("+image.currentX+"px, "+image.currentY+"px,0)");},onTransitionEnd:function onTransitionEnd(){var swiper=this;var zoom=swiper.zoom;var gesture=zoom.gesture;if(gesture.$slideEl&&swiper.previousIndex!==swiper.activeIndex){gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');gesture.$imageWrapEl.transform('translate3d(0,0,0)');gesture.$slideEl=undefined;gesture.$imageEl=undefined;gesture.$imageWrapEl=undefined;zoom.scale=1;zoom.currentScale=1;}},// Toggle Zoom
toggle:function toggle(e){var swiper=this;var zoom=swiper.zoom;if(zoom.scale&&zoom.scale!==1){// Zoom Out
zoom.out();}else{// Zoom In
zoom.in(e);}},in:function in$1(e){var swiper=this;var zoom=swiper.zoom;var params=swiper.params.zoom;var gesture=zoom.gesture;var image=zoom.image;if(!gesture.$slideEl){gesture.$slideEl=swiper.clickedSlide?$$1(swiper.clickedSlide):swiper.slides.eq(swiper.activeIndex);gesture.$imageEl=gesture.$slideEl.find('img, svg, canvas');gesture.$imageWrapEl=gesture.$imageEl.parent("."+params.containerClass);}if(!gesture.$imageEl||gesture.$imageEl.length===0){return;}gesture.$slideEl.addClass(""+params.zoomedSlideClass);var touchX;var touchY;var offsetX;var offsetY;var diffX;var diffY;var translateX;var translateY;var imageWidth;var imageHeight;var scaledWidth;var scaledHeight;var translateMinX;var translateMinY;var translateMaxX;var translateMaxY;var slideWidth;var slideHeight;if(typeof image.touchesStart.x==='undefined'&&e){touchX=e.type==='touchend'?e.changedTouches[0].pageX:e.pageX;touchY=e.type==='touchend'?e.changedTouches[0].pageY:e.pageY;}else{touchX=image.touchesStart.x;touchY=image.touchesStart.y;}zoom.scale=gesture.$imageWrapEl.attr('data-swiper-zoom')||params.maxRatio;zoom.currentScale=gesture.$imageWrapEl.attr('data-swiper-zoom')||params.maxRatio;if(e){slideWidth=gesture.$slideEl[0].offsetWidth;slideHeight=gesture.$slideEl[0].offsetHeight;offsetX=gesture.$slideEl.offset().left;offsetY=gesture.$slideEl.offset().top;diffX=offsetX+slideWidth/2-touchX;diffY=offsetY+slideHeight/2-touchY;imageWidth=gesture.$imageEl[0].offsetWidth;imageHeight=gesture.$imageEl[0].offsetHeight;scaledWidth=imageWidth*zoom.scale;scaledHeight=imageHeight*zoom.scale;translateMinX=Math.min(slideWidth/2-scaledWidth/2,0);translateMinY=Math.min(slideHeight/2-scaledHeight/2,0);translateMaxX=-translateMinX;translateMaxY=-translateMinY;translateX=diffX*zoom.scale;translateY=diffY*zoom.scale;if(translateX<translateMinX){translateX=translateMinX;}if(translateX>translateMaxX){translateX=translateMaxX;}if(translateY<translateMinY){translateY=translateMinY;}if(translateY>translateMaxY){translateY=translateMaxY;}}else{translateX=0;translateY=0;}gesture.$imageWrapEl.transition(300).transform("translate3d("+translateX+"px, "+translateY+"px,0)");gesture.$imageEl.transition(300).transform("translate3d(0,0,0) scale("+zoom.scale+")");},out:function out(){var swiper=this;var zoom=swiper.zoom;var params=swiper.params.zoom;var gesture=zoom.gesture;if(!gesture.$slideEl){gesture.$slideEl=swiper.clickedSlide?$$1(swiper.clickedSlide):swiper.slides.eq(swiper.activeIndex);gesture.$imageEl=gesture.$slideEl.find('img, svg, canvas');gesture.$imageWrapEl=gesture.$imageEl.parent("."+params.containerClass);}if(!gesture.$imageEl||gesture.$imageEl.length===0){return;}zoom.scale=1;zoom.currentScale=1;gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');gesture.$slideEl.removeClass(""+params.zoomedSlideClass);gesture.$slideEl=undefined;},// Attach/Detach Events
enable:function enable(){var swiper=this;var zoom=swiper.zoom;if(zoom.enabled){return;}zoom.enabled=true;var slides=swiper.slides;var passiveListener=swiper.touchEvents.start==='touchstart'&&Support.passiveListener&&swiper.params.passiveListeners?{passive:true,capture:false}:false;// Scale image
if(Support.gestures){slides.on('gesturestart',zoom.onGestureStart,passiveListener);slides.on('gesturechange',zoom.onGestureChange,passiveListener);slides.on('gestureend',zoom.onGestureEnd,passiveListener);}else if(swiper.touchEvents.start==='touchstart'){slides.on(swiper.touchEvents.start,zoom.onGestureStart,passiveListener);slides.on(swiper.touchEvents.move,zoom.onGestureChange,passiveListener);slides.on(swiper.touchEvents.end,zoom.onGestureEnd,passiveListener);}// Move image
swiper.slides.each(function(index,slideEl){var $slideEl=$$1(slideEl);if($slideEl.find("."+swiper.params.zoom.containerClass).length>0){$slideEl.on(swiper.touchEvents.move,zoom.onTouchMove);}});},disable:function disable(){var swiper=this;var zoom=swiper.zoom;if(!zoom.enabled){return;}swiper.zoom.enabled=false;var slides=swiper.slides;var passiveListener=swiper.touchEvents.start==='touchstart'&&Support.passiveListener&&swiper.params.passiveListeners?{passive:true,capture:false}:false;// Scale image
if(Support.gestures){slides.off('gesturestart',zoom.onGestureStart,passiveListener);slides.off('gesturechange',zoom.onGestureChange,passiveListener);slides.off('gestureend',zoom.onGestureEnd,passiveListener);}else if(swiper.touchEvents.start==='touchstart'){slides.off(swiper.touchEvents.start,zoom.onGestureStart,passiveListener);slides.off(swiper.touchEvents.move,zoom.onGestureChange,passiveListener);slides.off(swiper.touchEvents.end,zoom.onGestureEnd,passiveListener);}// Move image
swiper.slides.each(function(index,slideEl){var $slideEl=$$1(slideEl);if($slideEl.find("."+swiper.params.zoom.containerClass).length>0){$slideEl.off(swiper.touchEvents.move,zoom.onTouchMove);}});}};var Zoom$1={name:'zoom',params:{zoom:{enabled:false,maxRatio:3,minRatio:1,toggle:true,containerClass:'swiper-zoom-container',zoomedSlideClass:'swiper-slide-zoomed'}},create:function create(){var swiper=this;var zoom={enabled:false,scale:1,currentScale:1,isScaling:false,gesture:{$slideEl:undefined,slideWidth:undefined,slideHeight:undefined,$imageEl:undefined,$imageWrapEl:undefined,maxRatio:3},image:{isTouched:undefined,isMoved:undefined,currentX:undefined,currentY:undefined,minX:undefined,minY:undefined,maxX:undefined,maxY:undefined,width:undefined,height:undefined,startX:undefined,startY:undefined,touchesStart:{},touchesCurrent:{}},velocity:{x:undefined,y:undefined,prevPositionX:undefined,prevPositionY:undefined,prevTime:undefined}};'onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out'.split(' ').forEach(function(methodName){zoom[methodName]=Zoom[methodName].bind(swiper);});Utils.extend(swiper,{zoom:zoom});},on:{init:function init(){var swiper=this;if(swiper.params.zoom.enabled){swiper.zoom.enable();}},destroy:function destroy(){var swiper=this;swiper.zoom.disable();},touchStart:function touchStart(e){var swiper=this;if(!swiper.zoom.enabled){return;}swiper.zoom.onTouchStart(e);},touchEnd:function touchEnd(e){var swiper=this;if(!swiper.zoom.enabled){return;}swiper.zoom.onTouchEnd(e);},doubleTap:function doubleTap(e){var swiper=this;if(swiper.params.zoom.enabled&&swiper.zoom.enabled&&swiper.params.zoom.toggle){swiper.zoom.toggle(e);}},transitionEnd:function transitionEnd(){var swiper=this;if(swiper.zoom.enabled&&swiper.params.zoom.enabled){swiper.zoom.onTransitionEnd();}}}};var Lazy={loadInSlide:function loadInSlide(index,loadInDuplicate){if(loadInDuplicate===void 0)loadInDuplicate=true;var swiper=this;var params=swiper.params.lazy;if(typeof index==='undefined'){return;}if(swiper.slides.length===0){return;}var isVirtual=swiper.virtual&&swiper.params.virtual.enabled;var $slideEl=isVirtual?swiper.$wrapperEl.children("."+swiper.params.slideClass+"[data-swiper-slide-index=\""+index+"\"]"):swiper.slides.eq(index);var $images=$slideEl.find("."+params.elementClass+":not(."+params.loadedClass+"):not(."+params.loadingClass+")");if($slideEl.hasClass(params.elementClass)&&!$slideEl.hasClass(params.loadedClass)&&!$slideEl.hasClass(params.loadingClass)){$images=$images.add($slideEl[0]);}if($images.length===0){return;}$images.each(function(imageIndex,imageEl){var $imageEl=$$1(imageEl);$imageEl.addClass(params.loadingClass);var background=$imageEl.attr('data-background');var src=$imageEl.attr('data-src');var srcset=$imageEl.attr('data-srcset');var sizes=$imageEl.attr('data-sizes');swiper.loadImage($imageEl[0],src||background,srcset,sizes,false,function(){if(typeof swiper==='undefined'||swiper===null||!swiper||swiper&&!swiper.params||swiper.destroyed){return;}if(background){$imageEl.css('background-image',"url(\""+background+"\")");$imageEl.removeAttr('data-background');}else{if(srcset){$imageEl.attr('srcset',srcset);$imageEl.removeAttr('data-srcset');}if(sizes){$imageEl.attr('sizes',sizes);$imageEl.removeAttr('data-sizes');}if(src){$imageEl.attr('src',src);$imageEl.removeAttr('data-src');}}$imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);$slideEl.find("."+params.preloaderClass).remove();if(swiper.params.loop&&loadInDuplicate){var slideOriginalIndex=$slideEl.attr('data-swiper-slide-index');if($slideEl.hasClass(swiper.params.slideDuplicateClass)){var originalSlide=swiper.$wrapperEl.children("[data-swiper-slide-index=\""+slideOriginalIndex+"\"]:not(."+swiper.params.slideDuplicateClass+")");swiper.lazy.loadInSlide(originalSlide.index(),false);}else{var duplicatedSlide=swiper.$wrapperEl.children("."+swiper.params.slideDuplicateClass+"[data-swiper-slide-index=\""+slideOriginalIndex+"\"]");swiper.lazy.loadInSlide(duplicatedSlide.index(),false);}}swiper.emit('lazyImageReady',$slideEl[0],$imageEl[0]);});swiper.emit('lazyImageLoad',$slideEl[0],$imageEl[0]);});},load:function load(){var swiper=this;var $wrapperEl=swiper.$wrapperEl;var swiperParams=swiper.params;var slides=swiper.slides;var activeIndex=swiper.activeIndex;var isVirtual=swiper.virtual&&swiperParams.virtual.enabled;var params=swiperParams.lazy;var slidesPerView=swiperParams.slidesPerView;if(slidesPerView==='auto'){slidesPerView=0;}function slideExist(index){if(isVirtual){if($wrapperEl.children("."+swiperParams.slideClass+"[data-swiper-slide-index=\""+index+"\"]").length){return true;}}else if(slides[index]){return true;}return false;}function slideIndex(slideEl){if(isVirtual){return $$1(slideEl).attr('data-swiper-slide-index');}return $$1(slideEl).index();}if(!swiper.lazy.initialImageLoaded){swiper.lazy.initialImageLoaded=true;}if(swiper.params.watchSlidesVisibility){$wrapperEl.children("."+swiperParams.slideVisibleClass).each(function(elIndex,slideEl){var index=isVirtual?$$1(slideEl).attr('data-swiper-slide-index'):$$1(slideEl).index();swiper.lazy.loadInSlide(index);});}else if(slidesPerView>1){for(var i=activeIndex;i<activeIndex+slidesPerView;i+=1){if(slideExist(i)){swiper.lazy.loadInSlide(i);}}}else{swiper.lazy.loadInSlide(activeIndex);}if(params.loadPrevNext){if(slidesPerView>1||params.loadPrevNextAmount&&params.loadPrevNextAmount>1){var amount=params.loadPrevNextAmount;var spv=slidesPerView;var maxIndex=Math.min(activeIndex+spv+Math.max(amount,spv),slides.length);var minIndex=Math.max(activeIndex-Math.max(spv,amount),0);// Next Slides
for(var i$1=activeIndex+slidesPerView;i$1<maxIndex;i$1+=1){if(slideExist(i$1)){swiper.lazy.loadInSlide(i$1);}}// Prev Slides
for(var i$2=minIndex;i$2<activeIndex;i$2+=1){if(slideExist(i$2)){swiper.lazy.loadInSlide(i$2);}}}else{var nextSlide=$wrapperEl.children("."+swiperParams.slideNextClass);if(nextSlide.length>0){swiper.lazy.loadInSlide(slideIndex(nextSlide));}var prevSlide=$wrapperEl.children("."+swiperParams.slidePrevClass);if(prevSlide.length>0){swiper.lazy.loadInSlide(slideIndex(prevSlide));}}}}};var Lazy$1={name:'lazy',params:{lazy:{enabled:false,loadPrevNext:false,loadPrevNextAmount:1,loadOnTransitionStart:false,elementClass:'swiper-lazy',loadingClass:'swiper-lazy-loading',loadedClass:'swiper-lazy-loaded',preloaderClass:'swiper-lazy-preloader'}},create:function create(){var swiper=this;Utils.extend(swiper,{lazy:{initialImageLoaded:false,load:Lazy.load.bind(swiper),loadInSlide:Lazy.loadInSlide.bind(swiper)}});},on:{beforeInit:function beforeInit(){var swiper=this;if(swiper.params.lazy.enabled&&swiper.params.preloadImages){swiper.params.preloadImages=false;}},init:function init(){var swiper=this;if(swiper.params.lazy.enabled&&!swiper.params.loop&&swiper.params.initialSlide===0){swiper.lazy.load();}},scroll:function scroll(){var swiper=this;if(swiper.params.freeMode&&!swiper.params.freeModeSticky){swiper.lazy.load();}},resize:function resize(){var swiper=this;if(swiper.params.lazy.enabled){swiper.lazy.load();}},scrollbarDragMove:function scrollbarDragMove(){var swiper=this;if(swiper.params.lazy.enabled){swiper.lazy.load();}},transitionStart:function transitionStart(){var swiper=this;if(swiper.params.lazy.enabled){if(swiper.params.lazy.loadOnTransitionStart||!swiper.params.lazy.loadOnTransitionStart&&!swiper.lazy.initialImageLoaded){swiper.lazy.load();}}},transitionEnd:function transitionEnd(){var swiper=this;if(swiper.params.lazy.enabled&&!swiper.params.lazy.loadOnTransitionStart){swiper.lazy.load();}}}};/* eslint no-bitwise: ["error", { "allow": [">>"] }] */var Controller={LinearSpline:function LinearSpline(x,y){var binarySearch=function search(){var maxIndex;var minIndex;var guess;return function(array,val){minIndex=-1;maxIndex=array.length;while(maxIndex-minIndex>1){guess=maxIndex+minIndex>>1;if(array[guess]<=val){minIndex=guess;}else{maxIndex=guess;}}return maxIndex;};}();this.x=x;this.y=y;this.lastIndex=x.length-1;// Given an x value (x2), return the expected y2 value:
// (x1,y1) is the known point before given value,
// (x3,y3) is the known point after given value.
var i1;var i3;this.interpolate=function interpolate(x2){if(!x2){return 0;}// Get the indexes of x1 and x3 (the array indexes before and after given x2):
i3=binarySearch(this.x,x2);i1=i3-1;// We have our indexes i1 & i3, so we can calculate already:
// y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
return(x2-this.x[i1])*(this.y[i3]-this.y[i1])/(this.x[i3]-this.x[i1])+this.y[i1];};return this;},// xxx: for now i will just save one spline function to to
getInterpolateFunction:function getInterpolateFunction(c){var swiper=this;if(!swiper.controller.spline){swiper.controller.spline=swiper.params.loop?new Controller.LinearSpline(swiper.slidesGrid,c.slidesGrid):new Controller.LinearSpline(swiper.snapGrid,c.snapGrid);}},setTranslate:function setTranslate(setTranslate$1,byController){var swiper=this;var controlled=swiper.controller.control;var multiplier;var controlledTranslate;function setControlledTranslate(c){// this will create an Interpolate function based on the snapGrids
// x is the Grid of the scrolled scroller and y will be the controlled scroller
// it makes sense to create this only once and recall it for the interpolation
// the function does a lot of value caching for performance
var translate=c.rtl&&c.params.direction==='horizontal'?-swiper.translate:swiper.translate;if(swiper.params.controller.by==='slide'){swiper.controller.getInterpolateFunction(c);// i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
// but it did not work out
controlledTranslate=-swiper.controller.spline.interpolate(-translate);}if(!controlledTranslate||swiper.params.controller.by==='container'){multiplier=(c.maxTranslate()-c.minTranslate())/(swiper.maxTranslate()-swiper.minTranslate());controlledTranslate=(translate-swiper.minTranslate())*multiplier+c.minTranslate();}if(swiper.params.controller.inverse){controlledTranslate=c.maxTranslate()-controlledTranslate;}c.updateProgress(controlledTranslate);c.setTranslate(controlledTranslate,swiper);c.updateActiveIndex();c.updateSlidesClasses();}if(Array.isArray(controlled)){for(var i=0;i<controlled.length;i+=1){if(controlled[i]!==byController&&controlled[i]instanceof Swiper$1){setControlledTranslate(controlled[i]);}}}else if(controlled instanceof Swiper$1&&byController!==controlled){setControlledTranslate(controlled);}},setTransition:function setTransition(duration,byController){var swiper=this;var controlled=swiper.controller.control;var i;function setControlledTransition(c){c.setTransition(duration,swiper);if(duration!==0){c.transitionStart();c.$wrapperEl.transitionEnd(function(){if(!controlled){return;}if(c.params.loop&&swiper.params.controller.by==='slide'){c.loopFix();}c.transitionEnd();});}}if(Array.isArray(controlled)){for(i=0;i<controlled.length;i+=1){if(controlled[i]!==byController&&controlled[i]instanceof Swiper$1){setControlledTransition(controlled[i]);}}}else if(controlled instanceof Swiper$1&&byController!==controlled){setControlledTransition(controlled);}}};var Controller$1={name:'controller',params:{controller:{control:undefined,inverse:false,by:'slide'// or 'container'
}},create:function create(){var swiper=this;Utils.extend(swiper,{controller:{control:swiper.params.controller.control,getInterpolateFunction:Controller.getInterpolateFunction.bind(swiper),setTranslate:Controller.setTranslate.bind(swiper),setTransition:Controller.setTransition.bind(swiper)}});},on:{update:function update(){var swiper=this;if(!swiper.controller.control){return;}if(swiper.controller.spline){swiper.controller.spline=undefined;delete swiper.controller.spline;}},resize:function resize(){var swiper=this;if(!swiper.controller.control){return;}if(swiper.controller.spline){swiper.controller.spline=undefined;delete swiper.controller.spline;}},observerUpdate:function observerUpdate(){var swiper=this;if(!swiper.controller.control){return;}if(swiper.controller.spline){swiper.controller.spline=undefined;delete swiper.controller.spline;}},setTranslate:function setTranslate(translate,byController){var swiper=this;if(!swiper.controller.control){return;}swiper.controller.setTranslate(translate,byController);},setTransition:function setTransition(duration,byController){var swiper=this;if(!swiper.controller.control){return;}swiper.controller.setTransition(duration,byController);}}};var a11y={makeElFocusable:function makeElFocusable($el){$el.attr('tabIndex','0');return $el;},addElRole:function addElRole($el,role){$el.attr('role',role);return $el;},addElLabel:function addElLabel($el,label){$el.attr('aria-label',label);return $el;},disableEl:function disableEl($el){$el.attr('aria-disabled',true);return $el;},enableEl:function enableEl($el){$el.attr('aria-disabled',false);return $el;},onEnterKey:function onEnterKey(e){var swiper=this;var params=swiper.params.a11y;if(e.keyCode!==13){return;}var $targetEl=$$1(e.target);if(swiper.navigation&&swiper.navigation.$nextEl&&$targetEl.is(swiper.navigation.$nextEl)){if(!(swiper.isEnd&&!swiper.params.loop)){swiper.slideNext();}if(swiper.isEnd){swiper.a11y.notify(params.lastSlideMessage);}else{swiper.a11y.notify(params.nextSlideMessage);}}if(swiper.navigation&&swiper.navigation.$prevEl&&$targetEl.is(swiper.navigation.$prevEl)){if(!(swiper.isBeginning&&!swiper.params.loop)){swiper.slidePrev();}if(swiper.isBeginning){swiper.a11y.notify(params.firstSlideMessage);}else{swiper.a11y.notify(params.prevSlideMessage);}}if(swiper.pagination&&$targetEl.is("."+swiper.params.pagination.bulletClass)){$targetEl[0].click();}},notify:function notify(message){var swiper=this;var notification=swiper.a11y.liveRegion;if(notification.length===0){return;}notification.html('');notification.html(message);},updateNavigation:function updateNavigation(){var swiper=this;if(swiper.params.loop){return;}var ref=swiper.navigation;var $nextEl=ref.$nextEl;var $prevEl=ref.$prevEl;if($prevEl&&$prevEl.length>0){if(swiper.isBeginning){swiper.a11y.disableEl($prevEl);}else{swiper.a11y.enableEl($prevEl);}}if($nextEl&&$nextEl.length>0){if(swiper.isEnd){swiper.a11y.disableEl($nextEl);}else{swiper.a11y.enableEl($nextEl);}}},updatePagination:function updatePagination(){var swiper=this;var params=swiper.params.a11y;if(swiper.pagination&&swiper.params.pagination.clickable&&swiper.pagination.bullets&&swiper.pagination.bullets.length){swiper.pagination.bullets.each(function(bulletIndex,bulletEl){var $bulletEl=$$1(bulletEl);swiper.a11y.makeElFocusable($bulletEl);swiper.a11y.addElRole($bulletEl,'button');swiper.a11y.addElLabel($bulletEl,params.paginationBulletMessage.replace(/{{index}}/,$bulletEl.index()+1));});}},init:function init(){var swiper=this;swiper.$el.append(swiper.a11y.liveRegion);// Navigation
var params=swiper.params.a11y;var $nextEl;var $prevEl;if(swiper.navigation&&swiper.navigation.$nextEl){$nextEl=swiper.navigation.$nextEl;}if(swiper.navigation&&swiper.navigation.$prevEl){$prevEl=swiper.navigation.$prevEl;}if($nextEl){swiper.a11y.makeElFocusable($nextEl);swiper.a11y.addElRole($nextEl,'button');swiper.a11y.addElLabel($nextEl,params.nextSlideMessage);$nextEl.on('keydown',swiper.a11y.onEnterKey);}if($prevEl){swiper.a11y.makeElFocusable($prevEl);swiper.a11y.addElRole($prevEl,'button');swiper.a11y.addElLabel($prevEl,params.prevSlideMessage);$prevEl.on('keydown',swiper.a11y.onEnterKey);}// Pagination
if(swiper.pagination&&swiper.params.pagination.clickable&&swiper.pagination.bullets&&swiper.pagination.bullets.length){swiper.pagination.$el.on('keydown',"."+swiper.params.pagination.bulletClass,swiper.a11y.onEnterKey);}},destroy:function destroy(){var swiper=this;if(swiper.a11y.liveRegion&&swiper.a11y.liveRegion.length>0){swiper.a11y.liveRegion.remove();}var $nextEl;var $prevEl;if(swiper.navigation&&swiper.navigation.$nextEl){$nextEl=swiper.navigation.$nextEl;}if(swiper.navigation&&swiper.navigation.$prevEl){$prevEl=swiper.navigation.$prevEl;}if($nextEl){$nextEl.off('keydown',swiper.a11y.onEnterKey);}if($prevEl){$prevEl.off('keydown',swiper.a11y.onEnterKey);}// Pagination
if(swiper.pagination&&swiper.params.pagination.clickable&&swiper.pagination.bullets&&swiper.pagination.bullets.length){swiper.pagination.$el.off('keydown',"."+swiper.params.pagination.bulletClass,swiper.a11y.onEnterKey);}}};var A11y={name:'a11y',params:{a11y:{enabled:false,notificationClass:'swiper-notification',prevSlideMessage:'Previous slide',nextSlideMessage:'Next slide',firstSlideMessage:'This is the first slide',lastSlideMessage:'This is the last slide',paginationBulletMessage:'Go to slide {{index}}'}},create:function create(){var swiper=this;Utils.extend(swiper,{a11y:{liveRegion:$$1("<span class=\""+swiper.params.a11y.notificationClass+"\" aria-live=\"assertive\" aria-atomic=\"true\"></span>")}});Object.keys(a11y).forEach(function(methodName){swiper.a11y[methodName]=a11y[methodName].bind(swiper);});},on:{init:function init(){var swiper=this;if(!swiper.params.a11y.enabled){return;}swiper.a11y.init();swiper.a11y.updateNavigation();},toEdge:function toEdge(){var swiper=this;if(!swiper.params.a11y.enabled){return;}swiper.a11y.updateNavigation();},fromEdge:function fromEdge(){var swiper=this;if(!swiper.params.a11y.enabled){return;}swiper.a11y.updateNavigation();},paginationUpdate:function paginationUpdate(){var swiper=this;if(!swiper.params.a11y.enabled){return;}swiper.a11y.updatePagination();},destroy:function destroy(){var swiper=this;if(!swiper.params.a11y.enabled){return;}swiper.a11y.destroy();}}};var History={init:function init(){var swiper=this;if(!swiper.params.history){return;}if(!win.history||!win.history.pushState){swiper.params.history.enabled=false;swiper.params.hashNavigation.enabled=true;return;}var history=swiper.history;history.initialized=true;history.paths=History.getPathValues();if(!history.paths.key&&!history.paths.value){return;}history.scrollToSlide(0,history.paths.value,swiper.params.runCallbacksOnInit);if(!swiper.params.history.replaceState){win.addEventListener('popstate',swiper.history.setHistoryPopState);}},destroy:function destroy(){var swiper=this;if(!swiper.params.history.replaceState){win.removeEventListener('popstate',swiper.history.setHistoryPopState);}},setHistoryPopState:function setHistoryPopState(){var swiper=this;swiper.history.paths=History.getPathValues();swiper.history.scrollToSlide(swiper.params.speed,swiper.history.paths.value,false);},getPathValues:function getPathValues(){var pathArray=win.location.pathname.slice(1).split('/').filter(function(part){return part!=='';});var total=pathArray.length;var key=pathArray[total-2];var value=pathArray[total-1];return{key:key,value:value};},setHistory:function setHistory(key,index){var swiper=this;if(!swiper.history.initialized||!swiper.params.history.enabled){return;}var slide=swiper.slides.eq(index);var value=History.slugify(slide.attr('data-history'));if(!win.location.pathname.includes(key)){value=key+"/"+value;}var currentState=win.history.state;if(currentState&&currentState.value===value){return;}if(swiper.params.history.replaceState){win.history.replaceState({value:value},null,value);}else{win.history.pushState({value:value},null,value);}},slugify:function slugify(text){return text.toString().toLowerCase().replace(/\s+/g,'-').replace(/[^\w-]+/g,'').replace(/--+/g,'-').replace(/^-+/,'').replace(/-+$/,'');},scrollToSlide:function scrollToSlide(speed,value,runCallbacks){var swiper=this;if(value){for(var i=0,length=swiper.slides.length;i<length;i+=1){var slide=swiper.slides.eq(i);var slideHistory=History.slugify(slide.attr('data-history'));if(slideHistory===value&&!slide.hasClass(swiper.params.slideDuplicateClass)){var index=slide.index();swiper.slideTo(index,speed,runCallbacks);}}}else{swiper.slideTo(0,speed,runCallbacks);}}};var History$1={name:'history',params:{history:{enabled:false,replaceState:false,key:'slides'}},create:function create(){var swiper=this;Utils.extend(swiper,{history:{init:History.init.bind(swiper),setHistory:History.setHistory.bind(swiper),setHistoryPopState:History.setHistoryPopState.bind(swiper),scrollToSlide:History.scrollToSlide.bind(swiper),destroy:History.destroy.bind(swiper)}});},on:{init:function init(){var swiper=this;if(swiper.params.history.enabled){swiper.history.init();}},destroy:function destroy(){var swiper=this;if(swiper.params.history.enabled){swiper.history.destroy();}},transitionEnd:function transitionEnd(){var swiper=this;if(swiper.history.initialized){swiper.history.setHistory(swiper.params.history.key,swiper.activeIndex);}}}};var HashNavigation={onHashCange:function onHashCange(){var swiper=this;var newHash=doc.location.hash.replace('#','');var activeSlideHash=swiper.slides.eq(swiper.activeIndex).attr('data-hash');if(newHash!==activeSlideHash){swiper.slideTo(swiper.$wrapperEl.children("."+swiper.params.slideClass+"[data-hash=\""+newHash+"\"]").index());}},setHash:function setHash(){var swiper=this;if(!swiper.hashNavigation.initialized||!swiper.params.hashNavigation.enabled){return;}if(swiper.params.hashNavigation.replaceState&&win.history&&win.history.replaceState){win.history.replaceState(null,null,"#"+swiper.slides.eq(swiper.activeIndex).attr('data-hash')||'');}else{var slide=swiper.slides.eq(swiper.activeIndex);var hash=slide.attr('data-hash')||slide.attr('data-history');doc.location.hash=hash||'';}},init:function init(){var swiper=this;if(!swiper.params.hashNavigation.enabled||swiper.params.history&&swiper.params.history.enabled){return;}swiper.hashNavigation.initialized=true;var hash=doc.location.hash.replace('#','');if(hash){var speed=0;for(var i=0,length=swiper.slides.length;i<length;i+=1){var slide=swiper.slides.eq(i);var slideHash=slide.attr('data-hash')||slide.attr('data-history');if(slideHash===hash&&!slide.hasClass(swiper.params.slideDuplicateClass)){var index=slide.index();swiper.slideTo(index,speed,swiper.params.runCallbacksOnInit,true);}}}if(swiper.params.hashNavigation.watchState){$$1(win).on('hashchange',swiper.hashNavigation.onHashCange);}},destroy:function destroy(){var swiper=this;if(swiper.params.hashNavigation.watchState){$$1(win).off('hashchange',swiper.hashNavigation.onHashCange);}}};var HashNavigation$1={name:'hash-navigation',params:{hashNavigation:{enabled:false,replaceState:false,watchState:false}},create:function create(){var swiper=this;Utils.extend(swiper,{hashNavigation:{initialized:false,init:HashNavigation.init.bind(swiper),destroy:HashNavigation.destroy.bind(swiper),setHash:HashNavigation.setHash.bind(swiper),onHashCange:HashNavigation.onHashCange.bind(swiper)}});},on:{init:function init(){var swiper=this;if(swiper.params.hashNavigation.enabled){swiper.hashNavigation.init();}},destroy:function destroy(){var swiper=this;if(swiper.params.hashNavigation.enabled){swiper.hashNavigation.destroy();}},transitionEnd:function transitionEnd(){var swiper=this;if(swiper.hashNavigation.initialized){swiper.hashNavigation.setHash();}}}};var Autoplay={run:function run(){var swiper=this;var $activeSlideEl=swiper.slides.eq(swiper.activeIndex);var delay=swiper.params.autoplay.delay;if($activeSlideEl.attr('data-swiper-autoplay')){delay=$activeSlideEl.attr('data-swiper-autoplay')||swiper.params.autoplay.delay;}swiper.autoplay.timeout=Utils.nextTick(function(){if(swiper.params.loop){swiper.loopFix();swiper.slideNext(swiper.params.speed,true,true);swiper.emit('autoplay');}else if(!swiper.isEnd){swiper.slideNext(swiper.params.speed,true,true);swiper.emit('autoplay');}else if(!swiper.params.autoplay.stopOnLastSlide){swiper.slideTo(0,swiper.params.speed,true,true);swiper.emit('autoplay');}else{swiper.autoplay.stop();}},delay);},start:function start(){var swiper=this;if(typeof swiper.autoplay.timeout!=='undefined'){return false;}if(swiper.autoplay.running){return false;}swiper.autoplay.running=true;swiper.emit('autoplayStart');swiper.autoplay.run();return true;},stop:function stop(){var swiper=this;if(!swiper.autoplay.running){return false;}if(typeof swiper.autoplay.timeout==='undefined'){return false;}if(swiper.autoplay.timeout){clearTimeout(swiper.autoplay.timeout);swiper.autoplay.timeout=undefined;}swiper.autoplay.running=false;swiper.emit('autoplayStop');return true;},pause:function pause(speed){var swiper=this;if(!swiper.autoplay.running){return;}if(swiper.autoplay.paused){return;}if(swiper.autoplay.timeout){clearTimeout(swiper.autoplay.timeout);}swiper.autoplay.paused=true;if(speed===0){swiper.autoplay.paused=false;swiper.autoplay.run();}else{swiper.$wrapperEl.transitionEnd(function(){if(!swiper||swiper.destroyed){return;}swiper.autoplay.paused=false;if(!swiper.autoplay.running){swiper.autoplay.stop();}else{swiper.autoplay.run();}});}}};var Autoplay$1={name:'autoplay',params:{autoplay:{enabled:false,delay:3000,disableOnInteraction:true,stopOnLastSlide:false}},create:function create(){var swiper=this;Utils.extend(swiper,{autoplay:{running:false,paused:false,run:Autoplay.run.bind(swiper),start:Autoplay.start.bind(swiper),stop:Autoplay.stop.bind(swiper),pause:Autoplay.pause.bind(swiper)}});},on:{init:function init(){var swiper=this;if(swiper.params.autoplay.enabled){swiper.autoplay.start();}},beforeTransitionStart:function beforeTransitionStart(speed,internal){var swiper=this;if(swiper.autoplay.running){if(internal||!swiper.params.autoplay.disableOnInteraction){swiper.autoplay.pause(speed);}else{swiper.autoplay.stop();}}},sliderFirstMove:function sliderFirstMove(){var swiper=this;if(swiper.autoplay.running){if(swiper.params.autoplay.disableOnInteraction){swiper.autoplay.stop();}else{swiper.autoplay.pause();}}},destroy:function destroy(){var swiper=this;if(swiper.autoplay.running){swiper.autoplay.stop();}}}};var Fade={setTranslate:function setTranslate(){var swiper=this;var slides=swiper.slides;for(var i=0;i<slides.length;i+=1){var $slideEl=swiper.slides.eq(i);var offset=$slideEl[0].swiperSlideOffset;var tx=-offset;if(!swiper.params.virtualTranslate){tx-=swiper.translate;}var ty=0;if(!swiper.isHorizontal()){ty=tx;tx=0;}var slideOpacity=swiper.params.fadeEffect.crossFade?Math.max(1-Math.abs($slideEl[0].progress),0):1+Math.min(Math.max($slideEl[0].progress,-1),0);$slideEl.css({opacity:slideOpacity}).transform("translate3d("+tx+"px, "+ty+"px, 0px)");}},setTransition:function setTransition(duration){var swiper=this;var slides=swiper.slides;var $wrapperEl=swiper.$wrapperEl;slides.transition(duration);if(swiper.params.virtualTranslate&&duration!==0){var eventTriggered=false;slides.transitionEnd(function(){if(eventTriggered){return;}if(!swiper||swiper.destroyed){return;}eventTriggered=true;swiper.animating=false;var triggerEvents=['webkitTransitionEnd','transitionend'];for(var i=0;i<triggerEvents.length;i+=1){$wrapperEl.trigger(triggerEvents[i]);}});}}};var EffectFade={name:'effect-fade',params:{fadeEffect:{crossFade:false}},create:function create(){var swiper=this;Utils.extend(swiper,{fadeEffect:{setTranslate:Fade.setTranslate.bind(swiper),setTransition:Fade.setTransition.bind(swiper)}});},on:{beforeInit:function beforeInit(){var swiper=this;if(swiper.params.effect!=='fade'){return;}swiper.classNames.push(swiper.params.containerModifierClass+"fade");var overwriteParams={slidesPerView:1,slidesPerColumn:1,slidesPerGroup:1,watchSlidesProgress:true,spaceBetween:0,virtualTranslate:true};Utils.extend(swiper.params,overwriteParams);Utils.extend(swiper.originalParams,overwriteParams);},setTranslate:function setTranslate(){var swiper=this;if(swiper.params.effect!=='fade'){return;}swiper.fadeEffect.setTranslate();},setTransition:function setTransition(duration){var swiper=this;if(swiper.params.effect!=='fade'){return;}swiper.fadeEffect.setTransition(duration);}}};var Cube={setTranslate:function setTranslate(){var swiper=this;var $el=swiper.$el;var $wrapperEl=swiper.$wrapperEl;var slides=swiper.slides;var swiperWidth=swiper.width;var swiperHeight=swiper.height;var rtl=swiper.rtl;var swiperSize=swiper.size;var params=swiper.params.cubeEffect;var isHorizontal=swiper.isHorizontal();var isVirtual=swiper.virtual&&swiper.params.virtual.enabled;var wrapperRotate=0;var $cubeShadowEl;if(params.shadow){if(isHorizontal){$cubeShadowEl=$wrapperEl.find('.swiper-cube-shadow');if($cubeShadowEl.length===0){$cubeShadowEl=$$1('<div class="swiper-cube-shadow"></div>');$wrapperEl.append($cubeShadowEl);}$cubeShadowEl.css({height:swiperWidth+"px"});}else{$cubeShadowEl=$el.find('.swiper-cube-shadow');if($cubeShadowEl.length===0){$cubeShadowEl=$$1('<div class="swiper-cube-shadow"></div>');$el.append($cubeShadowEl);}}}for(var i=0;i<slides.length;i+=1){var $slideEl=slides.eq(i);var slideIndex=i;if(isVirtual){slideIndex=parseInt($slideEl.attr('data-swiper-slide-index'),10);}var slideAngle=slideIndex*90;var round=Math.floor(slideAngle/360);if(rtl){slideAngle=-slideAngle;round=Math.floor(-slideAngle/360);}var progress=Math.max(Math.min($slideEl[0].progress,1),-1);var tx=0;var ty=0;var tz=0;if(slideIndex%4===0){tx=-round*4*swiperSize;tz=0;}else if((slideIndex-1)%4===0){tx=0;tz=-round*4*swiperSize;}else if((slideIndex-2)%4===0){tx=swiperSize+round*4*swiperSize;tz=swiperSize;}else if((slideIndex-3)%4===0){tx=-swiperSize;tz=3*swiperSize+swiperSize*4*round;}if(rtl){tx=-tx;}if(!isHorizontal){ty=tx;tx=0;}var transform="rotateX("+(isHorizontal?0:-slideAngle)+"deg) rotateY("+(isHorizontal?slideAngle:0)+"deg) translate3d("+tx+"px, "+ty+"px, "+tz+"px)";if(progress<=1&&progress>-1){wrapperRotate=slideIndex*90+progress*90;if(rtl){wrapperRotate=-slideIndex*90-progress*90;}}$slideEl.transform(transform);if(params.slideShadows){// Set shadows
var shadowBefore=isHorizontal?$slideEl.find('.swiper-slide-shadow-left'):$slideEl.find('.swiper-slide-shadow-top');var shadowAfter=isHorizontal?$slideEl.find('.swiper-slide-shadow-right'):$slideEl.find('.swiper-slide-shadow-bottom');if(shadowBefore.length===0){shadowBefore=$$1("<div class=\"swiper-slide-shadow-"+(isHorizontal?'left':'top')+"\"></div>");$slideEl.append(shadowBefore);}if(shadowAfter.length===0){shadowAfter=$$1("<div class=\"swiper-slide-shadow-"+(isHorizontal?'right':'bottom')+"\"></div>");$slideEl.append(shadowAfter);}if(shadowBefore.length){shadowBefore[0].style.opacity=Math.max(-progress,0);}if(shadowAfter.length){shadowAfter[0].style.opacity=Math.max(progress,0);}}}$wrapperEl.css({'-webkit-transform-origin':"50% 50% -"+swiperSize/2+"px",'-moz-transform-origin':"50% 50% -"+swiperSize/2+"px",'-ms-transform-origin':"50% 50% -"+swiperSize/2+"px",'transform-origin':"50% 50% -"+swiperSize/2+"px"});if(params.shadow){if(isHorizontal){$cubeShadowEl.transform("translate3d(0px, "+(swiperWidth/2+params.shadowOffset)+"px, "+-swiperWidth/2+"px) rotateX(90deg) rotateZ(0deg) scale("+params.shadowScale+")");}else{var shadowAngle=Math.abs(wrapperRotate)-Math.floor(Math.abs(wrapperRotate)/90)*90;var multiplier=1.5-(Math.sin(shadowAngle*2*Math.PI/360)/2+Math.cos(shadowAngle*2*Math.PI/360)/2);var scale1=params.shadowScale;var scale2=params.shadowScale/multiplier;var offset=params.shadowOffset;$cubeShadowEl.transform("scale3d("+scale1+", 1, "+scale2+") translate3d(0px, "+(swiperHeight/2+offset)+"px, "+-swiperHeight/2/scale2+"px) rotateX(-90deg)");}}var zFactor=Browser.isSafari||Browser.isUiWebView?-swiperSize/2:0;$wrapperEl.transform("translate3d(0px,0,"+zFactor+"px) rotateX("+(swiper.isHorizontal()?0:wrapperRotate)+"deg) rotateY("+(swiper.isHorizontal()?-wrapperRotate:0)+"deg)");},setTransition:function setTransition(duration){var swiper=this;var $el=swiper.$el;var slides=swiper.slides;slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);if(swiper.params.cubeEffect.shadow&&!swiper.isHorizontal()){$el.find('.swiper-cube-shadow').transition(duration);}}};var EffectCube={name:'effect-cube',params:{cubeEffect:{slideShadows:true,shadow:true,shadowOffset:20,shadowScale:0.94}},create:function create(){var swiper=this;Utils.extend(swiper,{cubeEffect:{setTranslate:Cube.setTranslate.bind(swiper),setTransition:Cube.setTransition.bind(swiper)}});},on:{beforeInit:function beforeInit(){var swiper=this;if(swiper.params.effect!=='cube'){return;}swiper.classNames.push(swiper.params.containerModifierClass+"cube");swiper.classNames.push(swiper.params.containerModifierClass+"3d");var overwriteParams={slidesPerView:1,slidesPerColumn:1,slidesPerGroup:1,watchSlidesProgress:true,resistanceRatio:0,spaceBetween:0,centeredSlides:false,virtualTranslate:true};Utils.extend(swiper.params,overwriteParams);Utils.extend(swiper.originalParams,overwriteParams);},setTranslate:function setTranslate(){var swiper=this;if(swiper.params.effect!=='cube'){return;}swiper.cubeEffect.setTranslate();},setTransition:function setTransition(duration){var swiper=this;if(swiper.params.effect!=='cube'){return;}swiper.cubeEffect.setTransition(duration);}}};var Flip={setTranslate:function setTranslate(){var swiper=this;var slides=swiper.slides;for(var i=0;i<slides.length;i+=1){var $slideEl=slides.eq(i);var progress=$slideEl[0].progress;if(swiper.params.flipEffect.limitRotation){progress=Math.max(Math.min($slideEl[0].progress,1),-1);}var offset=$slideEl[0].swiperSlideOffset;var rotate=-180*progress;var rotateY=rotate;var rotateX=0;var tx=-offset;var ty=0;if(!swiper.isHorizontal()){ty=tx;tx=0;rotateX=-rotateY;rotateY=0;}else if(swiper.rtl){rotateY=-rotateY;}$slideEl[0].style.zIndex=-Math.abs(Math.round(progress))+slides.length;if(swiper.params.flipEffect.slideShadows){// Set shadows
var shadowBefore=swiper.isHorizontal()?$slideEl.find('.swiper-slide-shadow-left'):$slideEl.find('.swiper-slide-shadow-top');var shadowAfter=swiper.isHorizontal()?$slideEl.find('.swiper-slide-shadow-right'):$slideEl.find('.swiper-slide-shadow-bottom');if(shadowBefore.length===0){shadowBefore=$$1("<div class=\"swiper-slide-shadow-"+(swiper.isHorizontal()?'left':'top')+"\"></div>");$slideEl.append(shadowBefore);}if(shadowAfter.length===0){shadowAfter=$$1("<div class=\"swiper-slide-shadow-"+(swiper.isHorizontal()?'right':'bottom')+"\"></div>");$slideEl.append(shadowAfter);}if(shadowBefore.length){shadowBefore[0].style.opacity=Math.max(-progress,0);}if(shadowAfter.length){shadowAfter[0].style.opacity=Math.max(progress,0);}}$slideEl.transform("translate3d("+tx+"px, "+ty+"px, 0px) rotateX("+rotateX+"deg) rotateY("+rotateY+"deg)");}},setTransition:function setTransition(duration){var swiper=this;var slides=swiper.slides;var activeIndex=swiper.activeIndex;var $wrapperEl=swiper.$wrapperEl;slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);if(swiper.params.virtualTranslate&&duration!==0){var eventTriggered=false;// eslint-disable-next-line
slides.eq(activeIndex).transitionEnd(function onTransitionEnd(){if(eventTriggered){return;}if(!swiper||swiper.destroyed){return;}// if (!$(this).hasClass(swiper.params.slideActiveClass)) return;
eventTriggered=true;swiper.animating=false;var triggerEvents=['webkitTransitionEnd','transitionend'];for(var i=0;i<triggerEvents.length;i+=1){$wrapperEl.trigger(triggerEvents[i]);}});}}};var EffectFlip={name:'effect-flip',params:{flipEffect:{slideShadows:true,limitRotation:true}},create:function create(){var swiper=this;Utils.extend(swiper,{flipEffect:{setTranslate:Flip.setTranslate.bind(swiper),setTransition:Flip.setTransition.bind(swiper)}});},on:{beforeInit:function beforeInit(){var swiper=this;if(swiper.params.effect!=='flip'){return;}swiper.classNames.push(swiper.params.containerModifierClass+"flip");swiper.classNames.push(swiper.params.containerModifierClass+"3d");var overwriteParams={slidesPerView:1,slidesPerColumn:1,slidesPerGroup:1,watchSlidesProgress:true,spaceBetween:0,virtualTranslate:true};Utils.extend(swiper.params,overwriteParams);Utils.extend(swiper.originalParams,overwriteParams);},setTranslate:function setTranslate(){var swiper=this;if(swiper.params.effect!=='flip'){return;}swiper.flipEffect.setTranslate();},setTransition:function setTransition(duration){var swiper=this;if(swiper.params.effect!=='flip'){return;}swiper.flipEffect.setTransition(duration);}}};var Coverflow={setTranslate:function setTranslate(){var swiper=this;var swiperWidth=swiper.width;var swiperHeight=swiper.height;var slides=swiper.slides;var $wrapperEl=swiper.$wrapperEl;var slidesSizesGrid=swiper.slidesSizesGrid;var params=swiper.params.coverflowEffect;var isHorizontal=swiper.isHorizontal();var transform=swiper.translate;var center=isHorizontal?-transform+swiperWidth/2:-transform+swiperHeight/2;var rotate=isHorizontal?params.rotate:-params.rotate;var translate=params.depth;// Each slide offset from center
for(var i=0,length=slides.length;i<length;i+=1){var $slideEl=slides.eq(i);var slideSize=slidesSizesGrid[i];var slideOffset=$slideEl[0].swiperSlideOffset;var offsetMultiplier=(center-slideOffset-slideSize/2)/slideSize*params.modifier;var rotateY=isHorizontal?rotate*offsetMultiplier:0;var rotateX=isHorizontal?0:rotate*offsetMultiplier;// var rotateZ = 0
var translateZ=-translate*Math.abs(offsetMultiplier);var translateY=isHorizontal?0:params.stretch*offsetMultiplier;var translateX=isHorizontal?params.stretch*offsetMultiplier:0;// Fix for ultra small values
if(Math.abs(translateX)<0.001){translateX=0;}if(Math.abs(translateY)<0.001){translateY=0;}if(Math.abs(translateZ)<0.001){translateZ=0;}if(Math.abs(rotateY)<0.001){rotateY=0;}if(Math.abs(rotateX)<0.001){rotateX=0;}var slideTransform="translate3d("+translateX+"px,"+translateY+"px,"+translateZ+"px)  rotateX("+rotateX+"deg) rotateY("+rotateY+"deg)";$slideEl.transform(slideTransform);$slideEl[0].style.zIndex=-Math.abs(Math.round(offsetMultiplier))+1;if(params.slideShadows){// Set shadows
var $shadowBeforeEl=isHorizontal?$slideEl.find('.swiper-slide-shadow-left'):$slideEl.find('.swiper-slide-shadow-top');var $shadowAfterEl=isHorizontal?$slideEl.find('.swiper-slide-shadow-right'):$slideEl.find('.swiper-slide-shadow-bottom');if($shadowBeforeEl.length===0){$shadowBeforeEl=$$1("<div class=\"swiper-slide-shadow-"+(isHorizontal?'left':'top')+"\"></div>");$slideEl.append($shadowBeforeEl);}if($shadowAfterEl.length===0){$shadowAfterEl=$$1("<div class=\"swiper-slide-shadow-"+(isHorizontal?'right':'bottom')+"\"></div>");$slideEl.append($shadowAfterEl);}if($shadowBeforeEl.length){$shadowBeforeEl[0].style.opacity=offsetMultiplier>0?offsetMultiplier:0;}if($shadowAfterEl.length){$shadowAfterEl[0].style.opacity=-offsetMultiplier>0?-offsetMultiplier:0;}}}// Set correct perspective for IE10
if(Browser.ie){var ws=$wrapperEl[0].style;ws.perspectiveOrigin=center+"px 50%";}},setTransition:function setTransition(duration){var swiper=this;swiper.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);}};var EffectCoverflow={name:'effect-coverflow',params:{coverflowEffect:{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:true}},create:function create(){var swiper=this;Utils.extend(swiper,{coverflowEffect:{setTranslate:Coverflow.setTranslate.bind(swiper),setTransition:Coverflow.setTransition.bind(swiper)}});},on:{beforeInit:function beforeInit(){var swiper=this;if(swiper.params.effect!=='coverflow'){return;}swiper.classNames.push(swiper.params.containerModifierClass+"coverflow");swiper.classNames.push(swiper.params.containerModifierClass+"3d");swiper.params.watchSlidesProgress=true;swiper.originalParams.watchSlidesProgress=true;},setTranslate:function setTranslate(){var swiper=this;if(swiper.params.effect!=='coverflow'){return;}swiper.coverflowEffect.setTranslate();},setTransition:function setTransition(duration){var swiper=this;if(swiper.params.effect!=='coverflow'){return;}swiper.coverflowEffect.setTransition(duration);}}};// Swiper Class
// Core Modules
Swiper$1.use([Device$2,Support$2,Browser$2,Resize,Observer$1,Virtual$1,Keyboard$1,Mousewheel$1,Navigation$1,Pagination$1,Scrollbar$1,Parallax$1,Zoom$1,Lazy$1,Controller$1,A11y,History$1,HashNavigation$1,Autoplay$1,EffectFade,EffectCube,EffectFlip,EffectCoverflow]);return Swiper$1;});// ==================================================
// fancyBox v3.2.5
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2017 fancyApps
//
// ==================================================
;(function(window,document,$,undefined){'use strict';// If there's no jQuery, fancyBox can't work
// =========================================
if(!$){return;}// Check if fancyBox is already initialized
// ========================================
if($.fn.fancybox){if('console'in window){console.log('fancyBox already initialized');}return;}// Private default settings
// ========================
var defaults={// Enable infinite gallery navigation
loop:false,// Space around image, ignored if zoomed-in or viewport width is smaller than 800px
margin:[44,0],// Horizontal space between slides
gutter:50,// Enable keyboard navigation
keyboard:true,// Should display navigation arrows at the screen edges
arrows:true,// Should display infobar (counter and arrows at the top)
infobar:true,// Should display toolbar (buttons at the top)
toolbar:true,// What buttons should appear in the top right corner.
// Buttons will be created using templates from `btnTpl` option
// and they will be placed into toolbar (class="fancybox-toolbar"` element)
buttons:['slideShow','fullScreen','thumbs','share',//'download',
//'zoom',
'close'],// Detect "idle" time in seconds
idleTime:3,// Should display buttons at top right corner of the content
// If 'auto' - they will be created for content having type 'html', 'inline' or 'ajax'
// Use template from `btnTpl.smallBtn` for customization
smallBtn:'auto',// Disable right-click and use simple image protection for images
protect:false,// Shortcut to make content "modal" - disable keyboard navigtion, hide buttons, etc
modal:false,image:{// Wait for images to load before displaying
// Requires predefined image dimensions
// If 'auto' - will zoom in thumbnail if 'width' and 'height' attributes are found
preload:"auto"},ajax:{// Object containing settings for ajax request
settings:{// This helps to indicate that request comes from the modal
// Feel free to change naming
data:{fancybox:true}}},iframe:{// Iframe template
tpl:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',// Preload iframe before displaying it
// This allows to calculate iframe content width and height
// (note: Due to "Same Origin Policy", you can't get cross domain data).
preload:true,// Custom CSS styling for iframe wrapping element
// You can use this to set custom iframe dimensions
css:{},// Iframe tag attributes
attr:{scrolling:'auto'}},// Default content type if cannot be detected automatically
defaultType:'image',// Open/close animation type
// Possible values:
//   false            - disable
//   "zoom"           - zoom images from/to thumbnail
//   "fade"
//   "zoom-in-out"
//
animationEffect:"zoom",// Duration in ms for open/close animation
animationDuration:500,// Should image change opacity while zooming
// If opacity is "auto", then opacity will be changed if image and thumbnail have different aspect ratios
zoomOpacity:"auto",// Transition effect between slides
//
// Possible values:
//   false            - disable
//   "fade'
//   "slide'
//   "circular'
//   "tube'
//   "zoom-in-out'
//   "rotate'
//
transitionEffect:"fade",// Duration in ms for transition animation
transitionDuration:366,// Custom CSS class for slide element
slideClass:'',// Custom CSS class for layout
baseClass:'',// Base template for layout
baseTpl:'<div class="fancybox-container" role="dialog" tabindex="-1">'+'<div class="fancybox-bg"></div>'+'<div class="fancybox-inner">'+'<div class="fancybox-infobar">'+'<span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span>'+'</div>'+'<div class="fancybox-toolbar">{{buttons}}</div>'+'<div class="fancybox-navigation">{{arrows}}</div>'+'<div class="fancybox-stage"></div>'+'<div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div>'+'</div>'+'</div>',// Loading indicator template
spinnerTpl:'<div class="fancybox-loading"></div>',// Error message template
errorTpl:'<div class="fancybox-error"><p>{{ERROR}}<p></div>',btnTpl:{download:'<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}">'+'<svg viewBox="0 0 40 40">'+'<path d="M20,23 L20,8 L20,23 L13,16 L20,23 L27,16 L20,23 M26,28 L13,28 L27,28 L14,28" />'+'</svg>'+'</a>',zoom:'<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}">'+'<svg viewBox="0 0 40 40">'+'<path d="M 18,17 m-8,0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0 M25,23 L31,29 L25,23" />'+'</svg>'+'</button>',close:'<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">'+'<svg viewBox="0 0 40 40">'+'<path d="M10,10 L30,30 M30,10 L10,30" />'+'</svg>'+'</button>',// This small close button will be appended to your html/inline/ajax content by default,
// if "smallBtn" option is not set to false
smallBtn:'<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"></button>',// Arrows
arrowLeft:'<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">'+'<svg viewBox="0 0 40 40">'+'<path d="M10,20 L30,20 L10,20 L18,28 L10,20 L18,12 L10,20"></path>'+'</svg>'+'</button>',arrowRight:'<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">'+'<svg viewBox="0 0 40 40">'+'<path d="M30,20 L10,20 L30,20 L22,28 L30,20 L22,12 L30,20"></path>'+'</svg>'+'</button>'},// Container is injected into this element
parentEl:'body',// Focus handling
// ==============
// Try to focus on the first focusable element after opening
autoFocus:false,// Put focus back to active element after closing
backFocus:true,// Do not let user to focus on element outside modal content
trapFocus:true,// Module specific options
// =======================
fullScreen:{autoStart:false},// Set `touch: false` to disable dragging/swiping
touch:{vertical:true,// Allow to drag content vertically
momentum:true// Continue movement after releasing mouse/touch when panning
},// Hash value when initializing manually,
// set `false` to disable hash change
hash:null,// Customize or add new media types
// Example:
/*
        media : {
            youtube : {
                params : {
                    autoplay : 0
                }
            }
        }
        */media:{},slideShow:{autoStart:false,speed:4000},thumbs:{autoStart:false,// Display thumbnails on opening
hideOnClose:true,// Hide thumbnail grid when closing animation starts
parentEl:'.fancybox-container',// Container is injected into this element
axis:'y'// Vertical (y) or horizontal (x) scrolling
},// Callbacks
//==========
// See Documentation/API/Events for more information
// Example:
/*
            afterShow: function( instance, current ) {
                 console.info( 'Clicked element:' );
                 console.info( current.opts.$orig );
            }
        */onInit:$.noop,// When instance has been initialized
beforeLoad:$.noop,// Before the content of a slide is being loaded
afterLoad:$.noop,// When the content of a slide is done loading
beforeShow:$.noop,// Before open animation starts
afterShow:$.noop,// When content is done loading and animating
beforeClose:$.noop,// Before the instance attempts to close. Return false to cancel the close.
afterClose:$.noop,// After instance has been closed
onActivate:$.noop,// When instance is brought to front
onDeactivate:$.noop,// When other instance has been activated
// Interaction
// ===========
// Use options below to customize taken action when user clicks or double clicks on the fancyBox area,
// each option can be string or method that returns value.
//
// Possible values:
//   "close"           - close instance
//   "next"            - move to next gallery item
//   "nextOrClose"     - move to next gallery item or close if gallery has only one item
//   "toggleControls"  - show/hide controls
//   "zoom"            - zoom image (if loaded)
//   false             - do nothing
// Clicked on the content
clickContent:function clickContent(current,event){return current.type==='image'?'zoom':false;},// Clicked on the slide
clickSlide:'close',// Clicked on the background (backdrop) element
clickOutside:'close',// Same as previous two, but for double click
dblclickContent:false,dblclickSlide:false,dblclickOutside:false,// Custom options when mobile device is detected
// =============================================
mobile:{margin:0,clickContent:function clickContent(current,event){return current.type==='image'?'toggleControls':false;},clickSlide:function clickSlide(current,event){return current.type==='image'?'toggleControls':'close';},dblclickContent:function dblclickContent(current,event){return current.type==='image'?'zoom':false;},dblclickSlide:function dblclickSlide(current,event){return current.type==='image'?'zoom':false;}},// Internationalization
// ============
lang:'en',i18n:{'en':{CLOSE:'Close',NEXT:'Next',PREV:'Previous',ERROR:'The requested content cannot be loaded. <br/> Please try again later.',PLAY_START:'Start slideshow',PLAY_STOP:'Pause slideshow',FULL_SCREEN:'Full screen',THUMBS:'Thumbnails',DOWNLOAD:'Download',SHARE:'Share',ZOOM:'Zoom'},'de':{CLOSE:'Schliessen',NEXT:'Weiter',PREV:'Zurück',ERROR:'Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.',PLAY_START:'Diaschau starten',PLAY_STOP:'Diaschau beenden',FULL_SCREEN:'Vollbild',THUMBS:'Vorschaubilder',DOWNLOAD:'Herunterladen',SHARE:'Teilen',ZOOM:'Maßstab'}}};// Few useful variables and methods
// ================================
var $W=$(window);var $D=$(document);var called=0;// Check if an object is a jQuery object and not a native JavaScript object
// ========================================================================
var isQuery=function isQuery(obj){return obj&&obj.hasOwnProperty&&obj instanceof $;};// Handle multiple browsers for "requestAnimationFrame" and "cancelAnimationFrame"
// ===============================================================================
var requestAFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||// if all else fails, use setTimeout
function(callback){return window.setTimeout(callback,1000/60);};}();// Detect the supported transition-end event property name
// =======================================================
var transitionEnd=function(){var t,el=document.createElement("fakeelement");var transitions={"transition":"transitionend","OTransition":"oTransitionEnd","MozTransition":"transitionend","WebkitTransition":"webkitTransitionEnd"};for(t in transitions){if(el.style[t]!==undefined){return transitions[t];}}return'transitionend';}();// Force redraw on an element.
// This helps in cases where the browser doesn't redraw an updated element properly.
// =================================================================================
var forceRedraw=function forceRedraw($el){return $el&&$el.length&&$el[0].offsetHeight;};// Class definition
// ================
var FancyBox=function FancyBox(content,opts,index){var self=this;self.opts=$.extend(true,{index:index},$.fancybox.defaults,opts||{});if($.fancybox.isMobile){self.opts=$.extend(true,{},self.opts,self.opts.mobile);}// Exclude buttons option from deep merging
if(opts&&$.isArray(opts.buttons)){self.opts.buttons=opts.buttons;}self.id=self.opts.id||++called;self.group=[];self.currIndex=parseInt(self.opts.index,10)||0;self.prevIndex=null;self.prevPos=null;self.currPos=0;self.firstRun=null;// Create group elements from original item collection
self.createGroup(content);if(!self.group.length){return;}// Save last active element and current scroll position
self.$lastFocus=$(document.activeElement).blur();// Collection of gallery objects
self.slides={};self.init();};$.extend(FancyBox.prototype,{// Create DOM structure
// ====================
init:function init(){var self=this,firstItem=self.group[self.currIndex],firstItemOpts=firstItem.opts,scrollbarWidth=$.fancybox.scrollbarWidth,$scrollDiv,$container,buttonStr;self.scrollTop=$D.scrollTop();self.scrollLeft=$D.scrollLeft();// Hide scrollbars
// ===============
if(!$.fancybox.getInstance()){$('body').addClass('fancybox-active');// iOS hack
if(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream){// iOS has problems for input elements inside fixed containers,
// the workaround is to apply `position: fixed` to `<body>` element,
// unfortunately, this makes it lose the scrollbars and forces address bar to appear.
if(firstItem.type!=='image'){$('body').css('top',$('body').scrollTop()*-1).addClass('fancybox-iosfix');}}else if(!$.fancybox.isMobile&&document.body.scrollHeight>window.innerHeight){if(scrollbarWidth===undefined){$scrollDiv=$('<div style="width:50px;height:50px;overflow:scroll;" />').appendTo('body');scrollbarWidth=$.fancybox.scrollbarWidth=$scrollDiv[0].offsetWidth-$scrollDiv[0].clientWidth;$scrollDiv.remove();}$('head').append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: '+scrollbarWidth+'px; }</style>');$('body').addClass('compensate-for-scrollbar');}}// Build html markup and set references
// ====================================
// Build html code for buttons and insert into main template
buttonStr='';$.each(firstItemOpts.buttons,function(index,value){buttonStr+=firstItemOpts.btnTpl[value]||'';});// Create markup from base template, it will be initially hidden to
// avoid unnecessary work like painting while initializing is not complete
$container=$(self.translate(self,firstItemOpts.baseTpl.replace('\{\{buttons\}\}',buttonStr).replace('\{\{arrows\}\}',firstItemOpts.btnTpl.arrowLeft+firstItemOpts.btnTpl.arrowRight))).attr('id','fancybox-container-'+self.id).addClass('fancybox-is-hidden').addClass(firstItemOpts.baseClass).data('FancyBox',self).appendTo(firstItemOpts.parentEl);// Create object holding references to jQuery wrapped nodes
self.$refs={container:$container};['bg','inner','infobar','toolbar','stage','caption','navigation'].forEach(function(item){self.$refs[item]=$container.find('.fancybox-'+item);});self.trigger('onInit');// Enable events, deactive previous instances
self.activate();// Build slides, load and reveal content
self.jumpTo(self.currIndex);},// Simple i18n support - replaces object keys found in template
// with corresponding values
// ============================================================
translate:function translate(obj,str){var arr=obj.opts.i18n[obj.opts.lang];return str.replace(/\{\{(\w+)\}\}/g,function(match,n){var value=arr[n];if(value===undefined){return match;}return value;});},// Create array of gally item objects
// Check if each object has valid type and content
// ===============================================
createGroup:function createGroup(content){var self=this;var items=$.makeArray(content);$.each(items,function(i,item){var obj={},opts={},$item,type,src,srcParts;// Step 1 - Make sure we have an object
// ====================================
if($.isPlainObject(item)){// We probably have manual usage here, something like
// $.fancybox.open( [ { src : "image.jpg", type : "image" } ] )
obj=item;opts=item.opts||item;}else if($.type(item)==='object'&&$(item).length){// Here we probably have jQuery collection returned by some selector
$item=$(item);opts=$item.data();opts=$.extend({},opts,opts.options||{});// Here we store clicked element
opts.$orig=$item;obj.src=opts.src||$item.attr('href');// Assume that simple syntax is used, for example:
//   `$.fancybox.open( $("#test"), {} );`
if(!obj.type&&!obj.src){obj.type='inline';obj.src=item;}}else{// Assume we have a simple html code, for example:
//   $.fancybox.open( '<div><h1>Hi!</h1></div>' );
obj={type:'html',src:item+''};}// Each gallery object has full collection of options
obj.opts=$.extend(true,{},self.opts,opts);// Do not merge buttons array
if($.isArray(opts.buttons)){obj.opts.buttons=opts.buttons;}// Step 2 - Make sure we have content type, if not - try to guess
// ==============================================================
type=obj.type||obj.opts.type;src=obj.src||'';if(!type&&src){if(src.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)){type='image';}else if(src.match(/\.(pdf)((\?|#).*)?$/i)){type='pdf';}else if(src.charAt(0)==='#'){type='inline';}}if(type){obj.type=type;}else{self.trigger('objectNeedsType',obj);}// Step 3 - Some adjustments
// =========================
obj.index=self.group.length;// Check if $orig and $thumb objects exist
if(obj.opts.$orig&&!obj.opts.$orig.length){delete obj.opts.$orig;}if(!obj.opts.$thumb&&obj.opts.$orig){obj.opts.$thumb=obj.opts.$orig.find('img:first');}if(obj.opts.$thumb&&!obj.opts.$thumb.length){delete obj.opts.$thumb;}// "caption" is a "special" option, it can be used to customize caption per gallery item ..
if($.type(obj.opts.caption)==='function'){obj.opts.caption=obj.opts.caption.apply(item,[self,obj]);}if($.type(self.opts.caption)==='function'){obj.opts.caption=self.opts.caption.apply(item,[self,obj]);}// Make sure we have caption as a string or jQuery object
if(!(obj.opts.caption instanceof $)){obj.opts.caption=obj.opts.caption===undefined?'':obj.opts.caption+'';}// Check if url contains "filter" used to filter the content
// Example: "ajax.html #something"
if(type==='ajax'){srcParts=src.split(/\s+/,2);if(srcParts.length>1){obj.src=srcParts.shift();obj.opts.filter=srcParts.shift();}}if(obj.opts.smallBtn=='auto'){if($.inArray(type,['html','inline','ajax'])>-1){obj.opts.toolbar=false;obj.opts.smallBtn=true;}else{obj.opts.smallBtn=false;}}// If the type is "pdf", then simply load file into iframe
if(type==='pdf'){obj.type='iframe';obj.opts.iframe.preload=false;}// Hide all buttons and disable interactivity for modal items
if(obj.opts.modal){obj.opts=$.extend(true,obj.opts,{// Remove buttons
infobar:0,toolbar:0,smallBtn:0,// Disable keyboard navigation
keyboard:0,// Disable some modules
slideShow:0,fullScreen:0,thumbs:0,touch:0,// Disable click event handlers
clickContent:false,clickSlide:false,clickOutside:false,dblclickContent:false,dblclickSlide:false,dblclickOutside:false});}// Step 4 - Add processed object to group
// ======================================
self.group.push(obj);});},// Attach an event handler functions for:
//   - navigation buttons
//   - browser scrolling, resizing;
//   - focusing
//   - keyboard
//   - detect idle
// ======================================
addEvents:function addEvents(){var self=this;self.removeEvents();// Make navigation elements clickable
self.$refs.container.on('click.fb-close','[data-fancybox-close]',function(e){e.stopPropagation();e.preventDefault();self.close(e);}).on('click.fb-prev touchend.fb-prev','[data-fancybox-prev]',function(e){e.stopPropagation();e.preventDefault();self.previous();}).on('click.fb-next touchend.fb-next','[data-fancybox-next]',function(e){e.stopPropagation();e.preventDefault();self.next();}).on('click.fb','[data-fancybox-zoom]',function(e){// Click handler for zoom button
self[self.isScaledDown()?'scaleToActual':'scaleToFit']();});// Handle page scrolling and browser resizing
$W.on('orientationchange.fb resize.fb',function(e){if(e&&e.originalEvent&&e.originalEvent.type==="resize"){requestAFrame(function(){self.update();});}else{self.$refs.stage.hide();setTimeout(function(){self.$refs.stage.show();self.update();},600);}});// Trap keyboard focus inside of the modal, so the user does not accidentally tab outside of the modal
// (a.k.a. "escaping the modal")
$D.on('focusin.fb',function(e){var instance=$.fancybox?$.fancybox.getInstance():null;if(instance.isClosing||!instance.current||!instance.current.opts.trapFocus||$(e.target).hasClass('fancybox-container')||$(e.target).is(document)){return;}if(instance&&$(e.target).css('position')!=='fixed'&&!instance.$refs.container.has(e.target).length){e.stopPropagation();instance.focus();// Sometimes page gets scrolled, set it back
$W.scrollTop(self.scrollTop).scrollLeft(self.scrollLeft);}});// Enable keyboard navigation
$D.on('keydown.fb',function(e){var current=self.current,keycode=e.keyCode||e.which;if(!current||!current.opts.keyboard){return;}if($(e.target).is('input')||$(e.target).is('textarea')){return;}// Backspace and Esc keys
if(keycode===8||keycode===27){e.preventDefault();self.close(e);return;}// Left arrow and Up arrow
if(keycode===37||keycode===38){e.preventDefault();self.previous();return;}// Righ arrow and Down arrow
if(keycode===39||keycode===40){e.preventDefault();self.next();return;}self.trigger('afterKeydown',e,keycode);});// Hide controls after some inactivity period
if(self.group[self.currIndex].opts.idleTime){self.idleSecondsCounter=0;$D.on('mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle',function(e){self.idleSecondsCounter=0;if(self.isIdle){self.showControls();}self.isIdle=false;});self.idleInterval=window.setInterval(function(){self.idleSecondsCounter++;if(self.idleSecondsCounter>=self.group[self.currIndex].opts.idleTime){self.isIdle=true;self.idleSecondsCounter=0;self.hideControls();}},1000);}},// Remove events added by the core
// ===============================
removeEvents:function removeEvents(){var self=this;$W.off('orientationchange.fb resize.fb');$D.off('focusin.fb keydown.fb .fb-idle');this.$refs.container.off('.fb-close .fb-prev .fb-next');if(self.idleInterval){window.clearInterval(self.idleInterval);self.idleInterval=null;}},// Change to previous gallery item
// ===============================
previous:function previous(duration){return this.jumpTo(this.currPos-1,duration);},// Change to next gallery item
// ===========================
next:function next(duration){return this.jumpTo(this.currPos+1,duration);},// Switch to selected gallery item
// ===============================
jumpTo:function jumpTo(pos,duration,slide){var self=this,firstRun,loop,current,previous,canvasWidth,currentPos,transitionProps;var groupLen=self.group.length;if(self.isSliding||self.isClosing||self.isAnimating&&self.firstRun){return;}pos=parseInt(pos,10);loop=self.current?self.current.opts.loop:self.opts.loop;if(!loop&&(pos<0||pos>=groupLen)){return false;}firstRun=self.firstRun=self.firstRun===null;if(groupLen<2&&!firstRun&&!!self.isSliding){return;}previous=self.current;self.prevIndex=self.currIndex;self.prevPos=self.currPos;// Create slides
current=self.createSlide(pos);if(groupLen>1){if(loop||current.index>0){self.createSlide(pos-1);}if(loop||current.index<groupLen-1){self.createSlide(pos+1);}}self.current=current;self.currIndex=current.index;self.currPos=current.pos;self.trigger('beforeShow',firstRun);self.updateControls();currentPos=$.fancybox.getTranslate(current.$slide);current.isMoved=(currentPos.left!==0||currentPos.top!==0)&&!current.$slide.hasClass('fancybox-animated');current.forcedDuration=undefined;if($.isNumeric(duration)){current.forcedDuration=duration;}else{duration=current.opts[firstRun?'animationDuration':'transitionDuration'];}duration=parseInt(duration,10);// Fresh start - reveal container, current slide and start loading content
if(firstRun){if(current.opts.animationEffect&&duration){self.$refs.container.css('transition-duration',duration+'ms');}self.$refs.container.removeClass('fancybox-is-hidden');forceRedraw(self.$refs.container);self.$refs.container.addClass('fancybox-is-open');// Make first slide visible (to display loading icon, if needed)
current.$slide.addClass('fancybox-slide--current');self.loadSlide(current);self.preload();return;}// Clean up
$.each(self.slides,function(index,slide){$.fancybox.stop(slide.$slide);});// Make current that slide is visible even if content is still loading
current.$slide.removeClass('fancybox-slide--next fancybox-slide--previous').addClass('fancybox-slide--current');// If slides have been dragged, animate them to correct position
if(current.isMoved){canvasWidth=Math.round(current.$slide.width());$.each(self.slides,function(index,slide){var pos=slide.pos-current.pos;$.fancybox.animate(slide.$slide,{top:0,left:pos*canvasWidth+pos*slide.opts.gutter},duration,function(){slide.$slide.removeAttr('style').removeClass('fancybox-slide--next fancybox-slide--previous');if(slide.pos===self.currPos){current.isMoved=false;self.complete();}});});}else{self.$refs.stage.children().removeAttr('style');}// Start transition that reveals current content
// or wait when it will be loaded
if(current.isLoaded){self.revealContent(current);}else{self.loadSlide(current);}self.preload();if(previous.pos===current.pos){return;}// Handle previous slide
// =====================
transitionProps='fancybox-slide--'+(previous.pos>current.pos?'next':'previous');previous.$slide.removeClass('fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous');previous.isComplete=false;if(!duration||!current.isMoved&&!current.opts.transitionEffect){return;}if(current.isMoved){previous.$slide.addClass(transitionProps);}else{transitionProps='fancybox-animated '+transitionProps+' fancybox-fx-'+current.opts.transitionEffect;$.fancybox.animate(previous.$slide,transitionProps,duration,function(){previous.$slide.removeClass(transitionProps).removeAttr('style');});}},// Create new "slide" element
// These are gallery items  that are actually added to DOM
// =======================================================
createSlide:function createSlide(pos){var self=this;var $slide;var index;index=pos%self.group.length;index=index<0?self.group.length+index:index;if(!self.slides[pos]&&self.group[index]){$slide=$('<div class="fancybox-slide"></div>').appendTo(self.$refs.stage);self.slides[pos]=$.extend(true,{},self.group[index],{pos:pos,$slide:$slide,isLoaded:false});self.updateSlide(self.slides[pos]);}return self.slides[pos];},// Scale image to the actual size of the image
// ===========================================
scaleToActual:function scaleToActual(x,y,duration){var self=this;var current=self.current;var $what=current.$content;var imgPos,posX,posY,scaleX,scaleY;var canvasWidth=parseInt(current.$slide.width(),10);var canvasHeight=parseInt(current.$slide.height(),10);var newImgWidth=current.width;var newImgHeight=current.height;if(!(current.type=='image'&&!current.hasError)||!$what||self.isAnimating){return;}$.fancybox.stop($what);self.isAnimating=true;x=x===undefined?canvasWidth*0.5:x;y=y===undefined?canvasHeight*0.5:y;imgPos=$.fancybox.getTranslate($what);scaleX=newImgWidth/imgPos.width;scaleY=newImgHeight/imgPos.height;// Get center position for original image
posX=canvasWidth*0.5-newImgWidth*0.5;posY=canvasHeight*0.5-newImgHeight*0.5;// Make sure image does not move away from edges
if(newImgWidth>canvasWidth){posX=imgPos.left*scaleX-(x*scaleX-x);if(posX>0){posX=0;}if(posX<canvasWidth-newImgWidth){posX=canvasWidth-newImgWidth;}}if(newImgHeight>canvasHeight){posY=imgPos.top*scaleY-(y*scaleY-y);if(posY>0){posY=0;}if(posY<canvasHeight-newImgHeight){posY=canvasHeight-newImgHeight;}}self.updateCursor(newImgWidth,newImgHeight);$.fancybox.animate($what,{top:posY,left:posX,scaleX:scaleX,scaleY:scaleY},duration||330,function(){self.isAnimating=false;});// Stop slideshow
if(self.SlideShow&&self.SlideShow.isActive){self.SlideShow.stop();}},// Scale image to fit inside parent element
// ========================================
scaleToFit:function scaleToFit(duration){var self=this;var current=self.current;var $what=current.$content;var end;if(!(current.type=='image'&&!current.hasError)||!$what||self.isAnimating){return;}$.fancybox.stop($what);self.isAnimating=true;end=self.getFitPos(current);self.updateCursor(end.width,end.height);$.fancybox.animate($what,{top:end.top,left:end.left,scaleX:end.width/$what.width(),scaleY:end.height/$what.height()},duration||330,function(){self.isAnimating=false;});},// Calculate image size to fit inside viewport
// ===========================================
getFitPos:function getFitPos(slide){var self=this;var $what=slide.$content;var imgWidth=slide.width;var imgHeight=slide.height;var margin=slide.opts.margin;var canvasWidth,canvasHeight,minRatio,width,height;if(!$what||!$what.length||!imgWidth&&!imgHeight){return false;}// Convert "margin to CSS style: [ top, right, bottom, left ]
if($.type(margin)==="number"){margin=[margin,margin];}if(margin.length==2){margin=[margin[0],margin[1],margin[0],margin[1]];}// We can not use $slide width here, because it can have different diemensions while in transiton
canvasWidth=parseInt(self.$refs.stage.width(),10)-(margin[1]+margin[3]);canvasHeight=parseInt(self.$refs.stage.height(),10)-(margin[0]+margin[2]);minRatio=Math.min(1,canvasWidth/imgWidth,canvasHeight/imgHeight);width=Math.floor(minRatio*imgWidth);height=Math.floor(minRatio*imgHeight);// Use floor rounding to make sure it really fits
return{top:Math.floor((canvasHeight-height)*0.5)+margin[0],left:Math.floor((canvasWidth-width)*0.5)+margin[3],width:width,height:height};},// Update position and content of all slides
// =========================================
update:function update(){var self=this;$.each(self.slides,function(key,slide){self.updateSlide(slide);});},// Update slide position and scale content to fit
// ==============================================
updateSlide:function updateSlide(slide){var self=this;var $what=slide.$content;if($what&&(slide.width||slide.height)){self.isAnimating=false;$.fancybox.stop($what);$.fancybox.setTranslate($what,self.getFitPos(slide));if(slide.pos===self.currPos){self.updateCursor();}}slide.$slide.trigger('refresh');self.trigger('onUpdate',slide);},// Update cursor style depending if content can be zoomed
// ======================================================
updateCursor:function updateCursor(nextWidth,nextHeight){var self=this;var isScaledDown;var $container=self.$refs.container.removeClass('fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut');if(!self.current||self.isClosing){return;}if(self.isZoomable()){$container.addClass('fancybox-is-zoomable');if(nextWidth!==undefined&&nextHeight!==undefined){isScaledDown=nextWidth<self.current.width&&nextHeight<self.current.height;}else{isScaledDown=self.isScaledDown();}if(isScaledDown){// If image is scaled down, then, obviously, it can be zoomed to full size
$container.addClass('fancybox-can-zoomIn');}else{if(self.current.opts.touch){// If image size ir largen than available available and touch module is not disable,
// then user can do panning
$container.addClass('fancybox-can-drag');}else{$container.addClass('fancybox-can-zoomOut');}}}else if(self.current.opts.touch){$container.addClass('fancybox-can-drag');}},// Check if current slide is zoomable
// ==================================
isZoomable:function isZoomable(){var self=this;var current=self.current;var fitPos;if(!current||self.isClosing){return;}// Assume that slide is zoomable if
//   - image is loaded successfuly
//   - click action is "zoom"
//   - actual size of the image is smaller than available area
if(current.type==='image'&&current.isLoaded&&!current.hasError&&(current.opts.clickContent==='zoom'||$.isFunction(current.opts.clickContent)&&current.opts.clickContent(current)==="zoom")){fitPos=self.getFitPos(current);if(current.width>fitPos.width||current.height>fitPos.height){return true;}}return false;},// Check if current image dimensions are smaller than actual
// =========================================================
isScaledDown:function isScaledDown(){var self=this;var current=self.current;var $what=current.$content;var rez=false;if($what){rez=$.fancybox.getTranslate($what);rez=rez.width<current.width||rez.height<current.height;}return rez;},// Check if image dimensions exceed parent element
// ===============================================
canPan:function canPan(){var self=this;var current=self.current;var $what=current.$content;var rez=false;if($what){rez=self.getFitPos(current);rez=Math.abs($what.width()-rez.width)>1||Math.abs($what.height()-rez.height)>1;}return rez;},// Load content into the slide
// ===========================
loadSlide:function loadSlide(slide){var self=this,type,$slide;var ajaxLoad;if(slide.isLoading){return;}if(slide.isLoaded){return;}slide.isLoading=true;self.trigger('beforeLoad',slide);type=slide.type;$slide=slide.$slide;$slide.off('refresh').trigger('onReset').addClass('fancybox-slide--'+(type||'unknown')).addClass(slide.opts.slideClass);// Create content depending on the type
switch(type){case'image':self.setImage(slide);break;case'iframe':self.setIframe(slide);break;case'html':self.setContent(slide,slide.src||slide.content);break;case'inline':if($(slide.src).length){self.setContent(slide,$(slide.src));}else{self.setError(slide);}break;case'ajax':self.showLoading(slide);ajaxLoad=$.ajax($.extend({},slide.opts.ajax.settings,{url:slide.src,success:function success(data,textStatus){if(textStatus==='success'){self.setContent(slide,data);}},error:function error(jqXHR,textStatus){if(jqXHR&&textStatus!=='abort'){self.setError(slide);}}}));$slide.one('onReset',function(){ajaxLoad.abort();});break;default:self.setError(slide);break;}return true;},// Use thumbnail image, if possible
// ================================
setImage:function setImage(slide){var self=this;var srcset=slide.opts.srcset||slide.opts.image.srcset;var found,temp,pxRatio,windowWidth;// If we have "srcset", then we need to find matching "src" value.
// This is necessary, because when you set an src attribute, the browser will preload the image
// before any javascript or even CSS is applied.
if(srcset){pxRatio=window.devicePixelRatio||1;windowWidth=window.innerWidth*pxRatio;temp=srcset.split(',').map(function(el){var ret={};el.trim().split(/\s+/).forEach(function(el,i){var value=parseInt(el.substring(0,el.length-1),10);if(i===0){return ret.url=el;}if(value){ret.value=value;ret.postfix=el[el.length-1];}});return ret;});// Sort by value
temp.sort(function(a,b){return a.value-b.value;});// Ok, now we have an array of all srcset values
for(var j=0;j<temp.length;j++){var el=temp[j];if(el.postfix==='w'&&el.value>=windowWidth||el.postfix==='x'&&el.value>=pxRatio){found=el;break;}}// If not found, take the last one
if(!found&&temp.length){found=temp[temp.length-1];}if(found){slide.src=found.url;// If we have default width/height values, we can calculate height for matching source
if(slide.width&&slide.height&&found.postfix=='w'){slide.height=slide.width/slide.height*found.value;slide.width=found.value;}}}// This will be wrapper containing both ghost and actual image
slide.$content=$('<div class="fancybox-image-wrap"></div>').addClass('fancybox-is-hidden').appendTo(slide.$slide);// If we have a thumbnail, we can display it while actual image is loading
// Users will not stare at black screen and actual image will appear gradually
if(slide.opts.preload!==false&&slide.opts.width&&slide.opts.height&&(slide.opts.thumb||slide.opts.$thumb)){slide.width=slide.opts.width;slide.height=slide.opts.height;slide.$ghost=$('<img />').one('error',function(){$(this).remove();slide.$ghost=null;self.setBigImage(slide);}).one('load',function(){self.afterLoad(slide);self.setBigImage(slide);}).addClass('fancybox-image').appendTo(slide.$content).attr('src',slide.opts.thumb||slide.opts.$thumb.attr('src'));}else{self.setBigImage(slide);}},// Create full-size image
// ======================
setBigImage:function setBigImage(slide){var self=this;var $img=$('<img />');slide.$image=$img.one('error',function(){self.setError(slide);}).one('load',function(){// Clear timeout that checks if loading icon needs to be displayed
clearTimeout(slide.timouts);slide.timouts=null;if(self.isClosing){return;}slide.width=this.naturalWidth;slide.height=this.naturalHeight;if(slide.opts.image.srcset){$img.attr('sizes','100vw').attr('srcset',slide.opts.image.srcset);}self.hideLoading(slide);if(slide.$ghost){slide.timouts=setTimeout(function(){slide.timouts=null;slide.$ghost.hide();},Math.min(300,Math.max(1000,slide.height/1600)));}else{self.afterLoad(slide);}}).addClass('fancybox-image').attr('src',slide.src).appendTo(slide.$content);if(($img[0].complete||$img[0].readyState=="complete")&&$img[0].naturalWidth&&$img[0].naturalHeight){$img.trigger('load');}else if($img[0].error){$img.trigger('error');}else{slide.timouts=setTimeout(function(){if(!$img[0].complete&&!slide.hasError){self.showLoading(slide);}},100);}},// Create iframe wrapper, iframe and bindings
// ==========================================
setIframe:function setIframe(slide){var self=this,opts=slide.opts.iframe,$slide=slide.$slide,$iframe;slide.$content=$('<div class="fancybox-content'+(opts.preload?' fancybox-is-hidden':'')+'"></div>').css(opts.css).appendTo($slide);$iframe=$(opts.tpl.replace(/\{rnd\}/g,new Date().getTime())).attr(opts.attr).appendTo(slide.$content);if(opts.preload){self.showLoading(slide);// Unfortunately, it is not always possible to determine if iframe is successfully loaded
// (due to browser security policy)
$iframe.on('load.fb error.fb',function(e){this.isReady=1;slide.$slide.trigger('refresh');self.afterLoad(slide);});// Recalculate iframe content size
// ===============================
$slide.on('refresh.fb',function(){var $wrap=slide.$content,frameWidth=opts.css.width,frameHeight=opts.css.height,scrollWidth,$contents,$body;if($iframe[0].isReady!==1){return;}// Check if content is accessible,
// it will fail if frame is not with the same origin
try{$contents=$iframe.contents();$body=$contents.find('body');}catch(ignore){}// Calculate dimensions for the wrapper
if($body&&$body.length){if(frameWidth===undefined){scrollWidth=$iframe[0].contentWindow.document.documentElement.scrollWidth;frameWidth=Math.ceil($body.outerWidth(true)+($wrap.width()-scrollWidth));frameWidth+=$wrap.outerWidth()-$wrap.innerWidth();}if(frameHeight===undefined){frameHeight=Math.ceil($body.outerHeight(true));frameHeight+=$wrap.outerHeight()-$wrap.innerHeight();}// Resize wrapper to fit iframe content
if(frameWidth){$wrap.width(frameWidth);}if(frameHeight){$wrap.height(frameHeight);}}$wrap.removeClass('fancybox-is-hidden');});}else{this.afterLoad(slide);}$iframe.attr('src',slide.src);if(slide.opts.smallBtn===true){slide.$content.prepend(self.translate(slide,slide.opts.btnTpl.smallBtn));}// Remove iframe if closing or changing gallery item
$slide.one('onReset',function(){// This helps IE not to throw errors when closing
try{$(this).find('iframe').hide().attr('src','//about:blank');}catch(ignore){}$(this).empty();slide.isLoaded=false;});},// Wrap and append content to the slide
// ======================================
setContent:function setContent(slide,content){var self=this;if(self.isClosing){return;}self.hideLoading(slide);slide.$slide.empty();if(isQuery(content)&&content.parent().length){// If content is a jQuery object, then it will be moved to the slide.
// The placeholder is created so we will know where to put it back.
// If user is navigating gallery fast, then the content might be already inside fancyBox
// =====================================================================================
// Make sure content is not already moved to fancyBox
content.parent('.fancybox-slide--inline').trigger('onReset');// Create temporary element marking original place of the content
slide.$placeholder=$('<div></div>').hide().insertAfter(content);// Make sure content is visible
content.css('display','inline-block');}else if(!slide.hasError){// If content is just a plain text, try to convert it to html
if($.type(content)==='string'){content=$('<div>').append($.trim(content)).contents();// If we have text node, then add wrapping element to make vertical alignment work
if(content[0].nodeType===3){content=$('<div>').html(content);}}// If "filter" option is provided, then filter content
if(slide.opts.filter){content=$('<div>').html(content).find(slide.opts.filter);}}slide.$slide.one('onReset',function(){// Put content back
if(slide.$placeholder){slide.$placeholder.after(content.hide()).remove();slide.$placeholder=null;}// Remove custom close button
if(slide.$smallBtn){slide.$smallBtn.remove();slide.$smallBtn=null;}// Remove content and mark slide as not loaded
if(!slide.hasError){$(this).empty();slide.isLoaded=false;}});slide.$content=$(content).appendTo(slide.$slide);this.afterLoad(slide);},// Display error message
// =====================
setError:function setError(slide){slide.hasError=true;slide.$slide.removeClass('fancybox-slide--'+slide.type);this.setContent(slide,this.translate(slide,slide.opts.errorTpl));},// Show loading icon inside the slide
// ==================================
showLoading:function showLoading(slide){var self=this;slide=slide||self.current;if(slide&&!slide.$spinner){slide.$spinner=$(self.opts.spinnerTpl).appendTo(slide.$slide);}},// Remove loading icon from the slide
// ==================================
hideLoading:function hideLoading(slide){var self=this;slide=slide||self.current;if(slide&&slide.$spinner){slide.$spinner.remove();delete slide.$spinner;}},// Adjustments after slide content has been loaded
// ===============================================
afterLoad:function afterLoad(slide){var self=this;if(self.isClosing){return;}slide.isLoading=false;slide.isLoaded=true;self.trigger('afterLoad',slide);self.hideLoading(slide);if(slide.opts.smallBtn&&!slide.$smallBtn){slide.$smallBtn=$(self.translate(slide,slide.opts.btnTpl.smallBtn)).appendTo(slide.$content.filter('div,form').first());}if(slide.opts.protect&&slide.$content&&!slide.hasError){// Disable right click
slide.$content.on('contextmenu.fb',function(e){if(e.button==2){e.preventDefault();}return true;});// Add fake element on top of the image
// This makes a bit harder for user to select image
if(slide.type==='image'){$('<div class="fancybox-spaceball"></div>').appendTo(slide.$content);}}self.revealContent(slide);},// Make content visible
// This method is called right after content has been loaded or
// user navigates gallery and transition should start
// ============================================================
revealContent:function revealContent(slide){var self=this;var $slide=slide.$slide;var effect,effectClassName,duration,opacity,end,start=false;effect=slide.opts[self.firstRun?'animationEffect':'transitionEffect'];duration=slide.opts[self.firstRun?'animationDuration':'transitionDuration'];duration=parseInt(slide.forcedDuration===undefined?duration:slide.forcedDuration,10);if(slide.isMoved||slide.pos!==self.currPos||!duration){effect=false;}// Check if can zoom
if(effect==='zoom'&&!(slide.pos===self.currPos&&duration&&slide.type==='image'&&!slide.hasError&&(start=self.getThumbPos(slide)))){effect='fade';}// Zoom animation
// ==============
if(effect==='zoom'){end=self.getFitPos(slide);end.scaleX=end.width/start.width;end.scaleY=end.height/start.height;delete end.width;delete end.height;// Check if we need to animate opacity
opacity=slide.opts.zoomOpacity;if(opacity=='auto'){opacity=Math.abs(slide.width/slide.height-start.width/start.height)>0.1;}if(opacity){start.opacity=0.1;end.opacity=1;}// Draw image at start position
$.fancybox.setTranslate(slide.$content.removeClass('fancybox-is-hidden'),start);forceRedraw(slide.$content);// Start animation
$.fancybox.animate(slide.$content,end,duration,function(){self.complete();});return;}self.updateSlide(slide);// Simply show content
// ===================
if(!effect){forceRedraw($slide);slide.$content.removeClass('fancybox-is-hidden');if(slide.pos===self.currPos){self.complete();}return;}$.fancybox.stop($slide);effectClassName='fancybox-animated fancybox-slide--'+(slide.pos>=self.prevPos?'next':'previous')+' fancybox-fx-'+effect;$slide.removeAttr('style').removeClass('fancybox-slide--current fancybox-slide--next fancybox-slide--previous').addClass(effectClassName);slide.$content.removeClass('fancybox-is-hidden');//Force reflow for CSS3 transitions
forceRedraw($slide);$.fancybox.animate($slide,'fancybox-slide--current',duration,function(e){$slide.removeClass(effectClassName).removeAttr('style');if(slide.pos===self.currPos){self.complete();}},true);},// Check if we can and have to zoom from thumbnail
//================================================
getThumbPos:function getThumbPos(slide){var self=this;var rez=false;// Check if element is inside the viewport by at least 1 pixel
var isElementVisible=function isElementVisible($el){var element=$el[0];var elementRect=element.getBoundingClientRect();var parentRects=[];var visibleInAllParents;while(element.parentElement!==null){if($(element.parentElement).css('overflow')==='hidden'||$(element.parentElement).css('overflow')==='auto'){parentRects.push(element.parentElement.getBoundingClientRect());}element=element.parentElement;}visibleInAllParents=parentRects.every(function(parentRect){var visiblePixelX=Math.min(elementRect.right,parentRect.right)-Math.max(elementRect.left,parentRect.left);var visiblePixelY=Math.min(elementRect.bottom,parentRect.bottom)-Math.max(elementRect.top,parentRect.top);return visiblePixelX>0&&visiblePixelY>0;});return visibleInAllParents&&elementRect.bottom>0&&elementRect.right>0&&elementRect.left<$(window).width()&&elementRect.top<$(window).height();};var $thumb=slide.opts.$thumb;var thumbPos=$thumb?$thumb.offset():0;var slidePos;if(thumbPos&&$thumb[0].ownerDocument===document&&isElementVisible($thumb)){slidePos=self.$refs.stage.offset();rez={top:thumbPos.top-slidePos.top+parseFloat($thumb.css("border-top-width")||0),left:thumbPos.left-slidePos.left+parseFloat($thumb.css("border-left-width")||0),width:$thumb.width(),height:$thumb.height(),scaleX:1,scaleY:1};}return rez;},// Final adjustments after current gallery item is moved to position
// and it`s content is loaded
// ==================================================================
complete:function complete(){var self=this;var current=self.current;var slides={};if(current.isMoved||!current.isLoaded||current.isComplete){return;}current.isComplete=true;current.$slide.siblings().trigger('onReset');// Trigger any CSS3 transiton inside the slide
forceRedraw(current.$slide);current.$slide.addClass('fancybox-slide--complete');// Remove unnecessary slides
$.each(self.slides,function(key,slide){if(slide.pos>=self.currPos-1&&slide.pos<=self.currPos+1){slides[slide.pos]=slide;}else if(slide){$.fancybox.stop(slide.$slide);slide.$slide.off().remove();}});self.slides=slides;self.updateCursor();self.trigger('afterShow');// Try to focus on the first focusable element
if($(document.activeElement).is('[disabled]')||current.opts.autoFocus&&!(current.type=='image'||current.type==='iframe')){self.focus();}},// Preload next and previous slides
// ================================
preload:function preload(){var self=this;var next,prev;if(self.group.length<2){return;}next=self.slides[self.currPos+1];prev=self.slides[self.currPos-1];if(next&&next.type==='image'){self.loadSlide(next);}if(prev&&prev.type==='image'){self.loadSlide(prev);}},// Try to find and focus on the first focusable element
// ====================================================
focus:function focus(){var current=this.current;var $el;if(this.isClosing){return;}if(current&&current.isComplete){// Look for first input with autofocus attribute
$el=current.$slide.find('input[autofocus]:enabled:visible:first');if(!$el.length){$el=current.$slide.find('button,:input,[tabindex],a').filter(':enabled:visible:first');}}$el=$el&&$el.length?$el:this.$refs.container;$el.focus();},// Activates current instance - brings container to the front and enables keyboard,
// notifies other instances about deactivating
// =================================================================================
activate:function activate(){var self=this;// Deactivate all instances
$('.fancybox-container').each(function(){var instance=$(this).data('FancyBox');// Skip self and closing instances
if(instance&&instance.id!==self.id&&!instance.isClosing){instance.trigger('onDeactivate');instance.removeEvents();instance.isVisible=false;}});self.isVisible=true;if(self.current||self.isIdle){self.update();self.updateControls();}self.trigger('onActivate');self.addEvents();},// Start closing procedure
// This will start "zoom-out" animation if needed and clean everything up afterwards
// =================================================================================
close:function close(e,d){var self=this;var current=self.current;var effect,duration;var $what,opacity,start,end;var done=function done(){self.cleanUp(e);};if(self.isClosing){return false;}self.isClosing=true;// If beforeClose callback prevents closing, make sure content is centered
if(self.trigger('beforeClose',e)===false){self.isClosing=false;requestAFrame(function(){self.update();});return false;}// Remove all events
// If there are multiple instances, they will be set again by "activate" method
self.removeEvents();if(current.timouts){clearTimeout(current.timouts);}$what=current.$content;effect=current.opts.animationEffect;duration=$.isNumeric(d)?d:effect?current.opts.animationDuration:0;// Remove other slides
current.$slide.off(transitionEnd).removeClass('fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated');current.$slide.siblings().trigger('onReset').remove();// Trigger animations
if(duration){self.$refs.container.removeClass('fancybox-is-open').addClass('fancybox-is-closing');}// Clean up
self.hideLoading(current);self.hideControls();self.updateCursor();// Check if possible to zoom-out
if(effect==='zoom'&&!(e!==true&&$what&&duration&&current.type==='image'&&!current.hasError&&(end=self.getThumbPos(current)))){effect='fade';}if(effect==='zoom'){$.fancybox.stop($what);start=$.fancybox.getTranslate($what);start.width=start.width*start.scaleX;start.height=start.height*start.scaleY;// Check if we need to animate opacity
opacity=current.opts.zoomOpacity;if(opacity=='auto'){opacity=Math.abs(current.width/current.height-end.width/end.height)>0.1;}if(opacity){end.opacity=0;}start.scaleX=start.width/end.width;start.scaleY=start.height/end.height;start.width=end.width;start.height=end.height;$.fancybox.setTranslate(current.$content,start);forceRedraw(current.$content);$.fancybox.animate(current.$content,end,duration,done);return true;}if(effect&&duration){// If skip animation
if(e===true){setTimeout(done,duration);}else{$.fancybox.animate(current.$slide.removeClass('fancybox-slide--current'),'fancybox-animated fancybox-slide--previous fancybox-fx-'+effect,duration,done);}}else{done();}return true;},// Final adjustments after removing the instance
// =============================================
cleanUp:function cleanUp(e){var self=this,$body=$('body'),instance,offset;self.current.$slide.trigger('onReset');self.$refs.container.empty().remove();self.trigger('afterClose',e);// Place back focus
if(self.$lastFocus&&!!self.current.opts.backFocus){self.$lastFocus.focus();}self.current=null;// Check if there are other instances
instance=$.fancybox.getInstance();if(instance){instance.activate();}else{$W.scrollTop(self.scrollTop).scrollLeft(self.scrollLeft);$body.removeClass('fancybox-active compensate-for-scrollbar');if($body.hasClass('fancybox-iosfix')){offset=parseInt(document.body.style.top,10);$body.removeClass('fancybox-iosfix').css('top','').scrollTop(offset*-1);}$('#fancybox-style-noscroll').remove();}},// Call callback and trigger an event
// ==================================
trigger:function trigger(name,slide){var args=Array.prototype.slice.call(arguments,1),self=this,obj=slide&&slide.opts?slide:self.current,rez;if(obj){args.unshift(obj);}else{obj=self;}args.unshift(self);if($.isFunction(obj.opts[name])){rez=obj.opts[name].apply(obj,args);}if(rez===false){return rez;}if(name==='afterClose'||!self.$refs){$D.trigger(name+'.fb',args);}else{self.$refs.container.trigger(name+'.fb',args);}},// Update infobar values, navigation button states and reveal caption
// ==================================================================
updateControls:function updateControls(force){var self=this;var current=self.current,index=current.index,caption=current.opts.caption,$container=self.$refs.container,$caption=self.$refs.caption;// Recalculate content dimensions
current.$slide.trigger('refresh');self.$caption=caption&&caption.length?$caption.html(caption):null;if(!self.isHiddenControls&&!self.isIdle){self.showControls();}// Update info and navigation elements
$container.find('[data-fancybox-count]').html(self.group.length);$container.find('[data-fancybox-index]').html(index+1);$container.find('[data-fancybox-prev]').prop('disabled',!current.opts.loop&&index<=0);$container.find('[data-fancybox-next]').prop('disabled',!current.opts.loop&&index>=self.group.length-1);if(current.type==='image'){// Update download button source
$container.find('[data-fancybox-download]').attr('href',current.opts.image.src||current.src).show();}else{$container.find('[data-fancybox-download],[data-fancybox-zoom]').hide();}},// Hide toolbar and caption
// ========================
hideControls:function hideControls(){this.isHiddenControls=true;this.$refs.container.removeClass('fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav');},showControls:function showControls(){var self=this;var opts=self.current?self.current.opts:self.opts;var $container=self.$refs.container;self.isHiddenControls=false;self.idleSecondsCounter=0;$container.toggleClass('fancybox-show-toolbar',!!(opts.toolbar&&opts.buttons)).toggleClass('fancybox-show-infobar',!!(opts.infobar&&self.group.length>1)).toggleClass('fancybox-show-nav',!!(opts.arrows&&self.group.length>1)).toggleClass('fancybox-is-modal',!!opts.modal);if(self.$caption){$container.addClass('fancybox-show-caption ');}else{$container.removeClass('fancybox-show-caption');}},// Toggle toolbar and caption
// ==========================
toggleControls:function toggleControls(){if(this.isHiddenControls){this.showControls();}else{this.hideControls();}}});$.fancybox={version:"3.2.5",defaults:defaults,// Get current instance and execute a command.
//
// Examples of usage:
//
//   $instance = $.fancybox.getInstance();
//   $.fancybox.getInstance().jumpTo( 1 );
//   $.fancybox.getInstance( 'jumpTo', 1 );
//   $.fancybox.getInstance( function() {
//       console.info( this.currIndex );
//   });
// ======================================================
getInstance:function getInstance(command){var instance=$('.fancybox-container:not(".fancybox-is-closing"):last').data('FancyBox');var args=Array.prototype.slice.call(arguments,1);if(instance instanceof FancyBox){if($.type(command)==='string'){instance[command].apply(instance,args);}else if($.type(command)==='function'){command.apply(instance,args);}return instance;}return false;},// Create new instance
// ===================
open:function open(items,opts,index){return new FancyBox(items,opts,index);},// Close current or all instances
// ==============================
close:function close(all){var instance=this.getInstance();if(instance){instance.close();// Try to find and close next instance
if(all===true){this.close();}}},// Close instances and unbind all events
// ==============================
destroy:function destroy(){this.close(true);$D.off('click.fb-start');},// Try to detect mobile devices
// ============================
isMobile:document.createTouch!==undefined&&/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),// Detect if 'translate3d' support is available
// ============================================
use3d:function(){var div=document.createElement('div');return window.getComputedStyle&&window.getComputedStyle(div).getPropertyValue('transform')&&!(document.documentMode&&document.documentMode<11);}(),// Helper function to get current visual state of an element
// returns array[ top, left, horizontal-scale, vertical-scale, opacity ]
// =====================================================================
getTranslate:function getTranslate($el){var matrix;if(!$el||!$el.length){return false;}matrix=$el.eq(0).css('transform');if(matrix&&matrix.indexOf('matrix')!==-1){matrix=matrix.split('(')[1];matrix=matrix.split(')')[0];matrix=matrix.split(',');}else{matrix=[];}if(matrix.length){// If IE
if(matrix.length>10){matrix=[matrix[13],matrix[12],matrix[0],matrix[5]];}else{matrix=[matrix[5],matrix[4],matrix[0],matrix[3]];}matrix=matrix.map(parseFloat);}else{matrix=[0,0,1,1];var transRegex=/\.*translate\((.*)px,(.*)px\)/i;var transRez=transRegex.exec($el.eq(0).attr('style'));if(transRez){matrix[0]=parseFloat(transRez[2]);matrix[1]=parseFloat(transRez[1]);}}return{top:matrix[0],left:matrix[1],scaleX:matrix[2],scaleY:matrix[3],opacity:parseFloat($el.css('opacity')),width:$el.width(),height:$el.height()};},// Shortcut for setting "translate3d" properties for element
// Can set be used to set opacity, too
// ========================================================
setTranslate:function setTranslate($el,props){var str='';var css={};if(!$el||!props){return;}if(props.left!==undefined||props.top!==undefined){str=(props.left===undefined?$el.position().left:props.left)+'px, '+(props.top===undefined?$el.position().top:props.top)+'px';if(this.use3d){str='translate3d('+str+', 0px)';}else{str='translate('+str+')';}}if(props.scaleX!==undefined&&props.scaleY!==undefined){str=(str.length?str+' ':'')+'scale('+props.scaleX+', '+props.scaleY+')';}if(str.length){css.transform=str;}if(props.opacity!==undefined){css.opacity=props.opacity;}if(props.width!==undefined){css.width=props.width;}if(props.height!==undefined){css.height=props.height;}return $el.css(css);},// Simple CSS transition handler
// =============================
animate:function animate($el,to,duration,callback,leaveAnimationName){if($.isFunction(duration)){callback=duration;duration=null;}if(!$.isPlainObject(to)){$el.removeAttr('style');}$el.on(transitionEnd,function(e){// Skip events from child elements and z-index change
if(e&&e.originalEvent&&(!$el.is(e.originalEvent.target)||e.originalEvent.propertyName=='z-index')){return;}$.fancybox.stop($el);if($.isPlainObject(to)){if(to.scaleX!==undefined&&to.scaleY!==undefined){$el.css('transition-duration','');to.width=Math.round($el.width()*to.scaleX);to.height=Math.round($el.height()*to.scaleY);to.scaleX=1;to.scaleY=1;$.fancybox.setTranslate($el,to);}}else if(leaveAnimationName!==true){$el.removeClass(to);}if($.isFunction(callback)){callback(e);}});if($.isNumeric(duration)){$el.css('transition-duration',duration+'ms');}if($.isPlainObject(to)){$.fancybox.setTranslate($el,to);}else{$el.addClass(to);}if(to.scaleX&&$el.hasClass('fancybox-image-wrap')){$el.parent().addClass('fancybox-is-scaling');}// Make sure that `transitionend` callback gets fired
$el.data("timer",setTimeout(function(){$el.trigger('transitionend');},duration+16));},stop:function stop($el){clearTimeout($el.data("timer"));$el.off('transitionend').css('transition-duration','');if($el.hasClass('fancybox-image-wrap')){$el.parent().removeClass('fancybox-is-scaling');}}};// Default click handler for "fancyboxed" links
// ============================================
function _run(e){var $target=$(e.currentTarget),opts=e.data?e.data.options:{},value=$target.attr('data-fancybox')||'',index=0,items=[];// Avoid opening multiple times
if(e.isDefaultPrevented()){return;}e.preventDefault();// Get all related items and find index for clicked one
if(value){items=opts.selector?$(opts.selector):e.data?e.data.items:[];items=items.length?items.filter('[data-fancybox="'+value+'"]'):$('[data-fancybox="'+value+'"]');index=items.index($target);// Sometimes current item can not be found
// (for example, when slider clones items)
if(index<0){index=0;}}else{items=[$target];}$.fancybox.open(items,opts,index);}// Create a jQuery plugin
// ======================
$.fn.fancybox=function(options){var selector;options=options||{};selector=options.selector||false;if(selector){$('body').off('click.fb-start',selector).on('click.fb-start',selector,{options:options},_run);}else{this.off('click.fb-start').on('click.fb-start',{items:this,options:options},_run);}return this;};// Self initializing plugin
// ========================
$D.on('click.fb-start','[data-fancybox]',_run);})(window,document,window.jQuery||jQuery);// ==========================================================================
//
// Media
// Adds additional media type support
//
// ==========================================================================
;(function($){'use strict';// Formats matching url to final form
var format=function format(url,rez,params){if(!url){return;}params=params||'';if($.type(params)==="object"){params=$.param(params,true);}$.each(rez,function(key,value){url=url.replace('$'+key,value||'');});if(params.length){url+=(url.indexOf('?')>0?'&':'?')+params;}return url;};// Object containing properties for each media type
var defaults={youtube:{matcher:/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,params:{autoplay:1,autohide:1,fs:1,rel:0,hd:1,wmode:'transparent',enablejsapi:1,html5:1},paramPlace:8,type:'iframe',url:'//www.youtube.com/embed/$4',thumb:'//img.youtube.com/vi/$4/hqdefault.jpg'},vimeo:{matcher:/^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,params:{autoplay:1,hd:1,show_title:1,show_byline:1,show_portrait:0,fullscreen:1,api:1},paramPlace:3,type:'iframe',url:'//player.vimeo.com/video/$2'},metacafe:{matcher:/metacafe.com\/watch\/(\d+)\/(.*)?/,type:'iframe',url:'//www.metacafe.com/embed/$1/?ap=1'},dailymotion:{matcher:/dailymotion.com\/video\/(.*)\/?(.*)/,params:{additionalInfos:0,autoStart:1},type:'iframe',url:'//www.dailymotion.com/embed/video/$1'},vine:{matcher:/vine.co\/v\/([a-zA-Z0-9\?\=\-]+)/,type:'iframe',url:'//vine.co/v/$1/embed/simple'},instagram:{matcher:/(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,type:'image',url:'//$1/p/$2/media/?size=l'},// Examples:
// http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
// https://www.google.com/maps/@37.7852006,-122.4146355,14.65z
// https://www.google.com/maps/place/Googleplex/@37.4220041,-122.0833494,17z/data=!4m5!3m4!1s0x0:0x6c296c66619367e0!8m2!3d37.4219998!4d-122.0840572
gmap_place:{matcher:/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,type:'iframe',url:function url(rez){return'//maps.google.'+rez[2]+'/?ll='+(rez[9]?rez[9]+'&z='+Math.floor(rez[10])+(rez[12]?rez[12].replace(/^\//,"&"):''):rez[12])+'&output='+(rez[12]&&rez[12].indexOf('layer=c')>0?'svembed':'embed');}},// Examples:
// https://www.google.com/maps/search/Empire+State+Building/
// https://www.google.com/maps/search/?api=1&query=centurylink+field
// https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393
gmap_search:{matcher:/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,type:'iframe',url:function url(rez){return'//maps.google.'+rez[2]+'/maps?q='+rez[5].replace('query=','q=').replace('api=1','')+'&output=embed';}}};$(document).on('objectNeedsType.fb',function(e,instance,item){var url=item.src||'',type=false,media,thumb,rez,params,urlParams,paramObj,provider;media=$.extend(true,{},defaults,item.opts.media);// Look for any matching media type
$.each(media,function(providerName,providerOpts){rez=url.match(providerOpts.matcher);if(!rez){return;}type=providerOpts.type;paramObj={};if(providerOpts.paramPlace&&rez[providerOpts.paramPlace]){urlParams=rez[providerOpts.paramPlace];if(urlParams[0]=='?'){urlParams=urlParams.substring(1);}urlParams=urlParams.split('&');for(var m=0;m<urlParams.length;++m){var p=urlParams[m].split('=',2);if(p.length==2){paramObj[p[0]]=decodeURIComponent(p[1].replace(/\+/g," "));}}}params=$.extend(true,{},providerOpts.params,item.opts[providerName],paramObj);url=$.type(providerOpts.url)==="function"?providerOpts.url.call(this,rez,params,item):format(providerOpts.url,rez,params);thumb=$.type(providerOpts.thumb)==="function"?providerOpts.thumb.call(this,rez,params,item):format(providerOpts.thumb,rez);if(providerName==='vimeo'){url=url.replace('&%23','#');}return false;});// If it is found, then change content type and update the url
if(type){item.src=url;item.type=type;if(!item.opts.thumb&&!(item.opts.$thumb&&item.opts.$thumb.length)){item.opts.thumb=thumb;}if(type==='iframe'){$.extend(true,item.opts,{iframe:{preload:false,attr:{scrolling:"no"}}});item.contentProvider=provider;item.opts.slideClass+=' fancybox-slide--'+(provider=='gmap_place'||provider=='gmap_search'?'map':'video');}}else if(url){item.type=item.opts.defaultType;}});})(window.jQuery||jQuery);// ==========================================================================
//
// Guestures
// Adds touch guestures, handles click and tap events
//
// ==========================================================================
;(function(window,document,$){'use strict';var requestAFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||// if all else fails, use setTimeout
function(callback){return window.setTimeout(callback,1000/60);};}();var cancelAFrame=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||function(id){window.clearTimeout(id);};}();var pointers=function pointers(e){var result=[];e=e.originalEvent||e||window.e;e=e.touches&&e.touches.length?e.touches:e.changedTouches&&e.changedTouches.length?e.changedTouches:[e];for(var key in e){if(e[key].pageX){result.push({x:e[key].pageX,y:e[key].pageY});}else if(e[key].clientX){result.push({x:e[key].clientX,y:e[key].clientY});}}return result;};var distance=function distance(point2,point1,what){if(!point1||!point2){return 0;}if(what==='x'){return point2.x-point1.x;}else if(what==='y'){return point2.y-point1.y;}return Math.sqrt(Math.pow(point2.x-point1.x,2)+Math.pow(point2.y-point1.y,2));};var isClickable=function isClickable($el){if($el.is('a,area,button,[role="button"],input,label,select,summary,textarea')||$.isFunction($el.get(0).onclick)||$el.data('selectable')){return true;}// Check for attributes like data-fancybox-next or data-fancybox-close
for(var i=0,atts=$el[0].attributes,n=atts.length;i<n;i++){if(atts[i].nodeName.substr(0,14)==='data-fancybox-'){return true;}}return false;};var hasScrollbars=function hasScrollbars(el){var overflowY=window.getComputedStyle(el)['overflow-y'];var overflowX=window.getComputedStyle(el)['overflow-x'];var vertical=(overflowY==='scroll'||overflowY==='auto')&&el.scrollHeight>el.clientHeight;var horizontal=(overflowX==='scroll'||overflowX==='auto')&&el.scrollWidth>el.clientWidth;return vertical||horizontal;};var isScrollable=function isScrollable($el){var rez=false;while(true){rez=hasScrollbars($el.get(0));if(rez){break;}$el=$el.parent();if(!$el.length||$el.hasClass('fancybox-stage')||$el.is('body')){break;}}return rez;};var Guestures=function Guestures(instance){var self=this;self.instance=instance;self.$bg=instance.$refs.bg;self.$stage=instance.$refs.stage;self.$container=instance.$refs.container;self.destroy();self.$container.on('touchstart.fb.touch mousedown.fb.touch',$.proxy(self,'ontouchstart'));};Guestures.prototype.destroy=function(){this.$container.off('.fb.touch');};Guestures.prototype.ontouchstart=function(e){var self=this;var $target=$(e.target);var instance=self.instance;var current=instance.current;var $content=current.$content;var isTouchDevice=e.type=='touchstart';// Do not respond to both events
if(isTouchDevice){self.$container.off('mousedown.fb.touch');}// Ignore clicks while zooming or closing
if(!current||self.instance.isAnimating||self.instance.isClosing){e.stopPropagation();e.preventDefault();return;}// Ignore right click
if(e.originalEvent&&e.originalEvent.button==2){return;}// Ignore taping on links, buttons, input elements
if(!$target.length||isClickable($target)||isClickable($target.parent())){return;}// Ignore clicks on the scrollbar
if(e.originalEvent.clientX>$target[0].clientWidth+$target.offset().left){return;}self.startPoints=pointers(e);// Prevent zooming if already swiping
if(!self.startPoints||self.startPoints.length>1&&instance.isSliding){return;}self.$target=$target;self.$content=$content;self.canTap=true;self.opts=current.opts.touch;$(document).off('.fb.touch');$(document).on(isTouchDevice?'touchend.fb.touch touchcancel.fb.touch':'mouseup.fb.touch mouseleave.fb.touch',$.proxy(self,"ontouchend"));$(document).on(isTouchDevice?'touchmove.fb.touch':'mousemove.fb.touch',$.proxy(self,"ontouchmove"));if(!(self.opts||instance.canPan())||!($target.is(self.$stage)||self.$stage.find($target).length)){// Prevent ghosting
if($target.is('img')){e.preventDefault();}return;}e.stopPropagation();if(!($.fancybox.isMobile&&(isScrollable(self.$target)||isScrollable(self.$target.parent())))){e.preventDefault();}self.canvasWidth=Math.round(current.$slide[0].clientWidth);self.canvasHeight=Math.round(current.$slide[0].clientHeight);self.startTime=new Date().getTime();self.distanceX=self.distanceY=self.distance=0;self.isPanning=false;self.isSwiping=false;self.isZooming=false;self.sliderStartPos=self.sliderLastPos||{top:0,left:0};self.contentStartPos=$.fancybox.getTranslate(self.$content);self.contentLastPos=null;if(self.startPoints.length===1&&!self.isZooming){self.canTap=!instance.isSliding;if(current.type==='image'&&(self.contentStartPos.width>self.canvasWidth+1||self.contentStartPos.height>self.canvasHeight+1)){$.fancybox.stop(self.$content);self.$content.css('transition-duration','0ms');self.isPanning=true;}else{self.isSwiping=true;}self.$container.addClass('fancybox-controls--isGrabbing');}if(self.startPoints.length===2&&!instance.isAnimating&&!current.hasError&&current.type==='image'&&(current.isLoaded||current.$ghost)){self.isZooming=true;self.isSwiping=false;self.isPanning=false;$.fancybox.stop(self.$content);self.$content.css('transition-duration','0ms');self.centerPointStartX=(self.startPoints[0].x+self.startPoints[1].x)*0.5-$(window).scrollLeft();self.centerPointStartY=(self.startPoints[0].y+self.startPoints[1].y)*0.5-$(window).scrollTop();self.percentageOfImageAtPinchPointX=(self.centerPointStartX-self.contentStartPos.left)/self.contentStartPos.width;self.percentageOfImageAtPinchPointY=(self.centerPointStartY-self.contentStartPos.top)/self.contentStartPos.height;self.startDistanceBetweenFingers=distance(self.startPoints[0],self.startPoints[1]);}};Guestures.prototype.ontouchmove=function(e){var self=this;self.newPoints=pointers(e);if($.fancybox.isMobile&&(isScrollable(self.$target)||isScrollable(self.$target.parent()))){e.stopPropagation();self.canTap=false;return;}if(!(self.opts||self.instance.canPan())||!self.newPoints||!self.newPoints.length){return;}self.distanceX=distance(self.newPoints[0],self.startPoints[0],'x');self.distanceY=distance(self.newPoints[0],self.startPoints[0],'y');self.distance=distance(self.newPoints[0],self.startPoints[0]);// Skip false ontouchmove events (Chrome)
if(self.distance>0){if(!(self.$target.is(self.$stage)||self.$stage.find(self.$target).length)){return;}e.stopPropagation();e.preventDefault();if(self.isSwiping){self.onSwipe();}else if(self.isPanning){self.onPan();}else if(self.isZooming){self.onZoom();}}};Guestures.prototype.onSwipe=function(){var self=this;var swiping=self.isSwiping;var left=self.sliderStartPos.left||0;var angle;if(swiping===true){if(Math.abs(self.distance)>10){self.canTap=false;if(self.instance.group.length<2&&self.opts.vertical){self.isSwiping='y';}else if(self.instance.isSliding||self.opts.vertical===false||self.opts.vertical==='auto'&&$(window).width()>800){self.isSwiping='x';}else{angle=Math.abs(Math.atan2(self.distanceY,self.distanceX)*180/Math.PI);self.isSwiping=angle>45&&angle<135?'y':'x';}self.instance.isSliding=self.isSwiping;// Reset points to avoid jumping, because we dropped first swipes to calculate the angle
self.startPoints=self.newPoints;$.each(self.instance.slides,function(index,slide){$.fancybox.stop(slide.$slide);slide.$slide.css('transition-duration','0ms');slide.inTransition=false;if(slide.pos===self.instance.current.pos){self.sliderStartPos.left=$.fancybox.getTranslate(slide.$slide).left;}});//self.instance.current.isMoved = true;
// Stop slideshow
if(self.instance.SlideShow&&self.instance.SlideShow.isActive){self.instance.SlideShow.stop();}}}else{if(swiping=='x'){// Sticky edges
if(self.distanceX>0&&(self.instance.group.length<2||self.instance.current.index===0&&!self.instance.current.opts.loop)){left=left+Math.pow(self.distanceX,0.8);}else if(self.distanceX<0&&(self.instance.group.length<2||self.instance.current.index===self.instance.group.length-1&&!self.instance.current.opts.loop)){left=left-Math.pow(-self.distanceX,0.8);}else{left=left+self.distanceX;}}self.sliderLastPos={top:swiping=='x'?0:self.sliderStartPos.top+self.distanceY,left:left};if(self.requestId){cancelAFrame(self.requestId);self.requestId=null;}self.requestId=requestAFrame(function(){if(self.sliderLastPos){$.each(self.instance.slides,function(index,slide){var pos=slide.pos-self.instance.currPos;$.fancybox.setTranslate(slide.$slide,{top:self.sliderLastPos.top,left:self.sliderLastPos.left+pos*self.canvasWidth+pos*slide.opts.gutter});});self.$container.addClass('fancybox-is-sliding');}});}};Guestures.prototype.onPan=function(){var self=this;var newOffsetX,newOffsetY,newPos;self.canTap=false;if(self.contentStartPos.width>self.canvasWidth){newOffsetX=self.contentStartPos.left+self.distanceX;}else{newOffsetX=self.contentStartPos.left;}newOffsetY=self.contentStartPos.top+self.distanceY;newPos=self.limitMovement(newOffsetX,newOffsetY,self.contentStartPos.width,self.contentStartPos.height);newPos.scaleX=self.contentStartPos.scaleX;newPos.scaleY=self.contentStartPos.scaleY;self.contentLastPos=newPos;if(self.requestId){cancelAFrame(self.requestId);self.requestId=null;}self.requestId=requestAFrame(function(){$.fancybox.setTranslate(self.$content,self.contentLastPos);});};// Make panning sticky to the edges
Guestures.prototype.limitMovement=function(newOffsetX,newOffsetY,newWidth,newHeight){var self=this;var minTranslateX,minTranslateY,maxTranslateX,maxTranslateY;var canvasWidth=self.canvasWidth;var canvasHeight=self.canvasHeight;var currentOffsetX=self.contentStartPos.left;var currentOffsetY=self.contentStartPos.top;var distanceX=self.distanceX;var distanceY=self.distanceY;// Slow down proportionally to traveled distance
minTranslateX=Math.max(0,canvasWidth*0.5-newWidth*0.5);minTranslateY=Math.max(0,canvasHeight*0.5-newHeight*0.5);maxTranslateX=Math.min(canvasWidth-newWidth,canvasWidth*0.5-newWidth*0.5);maxTranslateY=Math.min(canvasHeight-newHeight,canvasHeight*0.5-newHeight*0.5);if(newWidth>canvasWidth){//   ->
if(distanceX>0&&newOffsetX>minTranslateX){newOffsetX=minTranslateX-1+Math.pow(-minTranslateX+currentOffsetX+distanceX,0.8)||0;}//    <-
if(distanceX<0&&newOffsetX<maxTranslateX){newOffsetX=maxTranslateX+1-Math.pow(maxTranslateX-currentOffsetX-distanceX,0.8)||0;}}if(newHeight>canvasHeight){//   \/
if(distanceY>0&&newOffsetY>minTranslateY){newOffsetY=minTranslateY-1+Math.pow(-minTranslateY+currentOffsetY+distanceY,0.8)||0;}//   /\
if(distanceY<0&&newOffsetY<maxTranslateY){newOffsetY=maxTranslateY+1-Math.pow(maxTranslateY-currentOffsetY-distanceY,0.8)||0;}}return{top:newOffsetY,left:newOffsetX};};Guestures.prototype.limitPosition=function(newOffsetX,newOffsetY,newWidth,newHeight){var self=this;var canvasWidth=self.canvasWidth;var canvasHeight=self.canvasHeight;if(newWidth>canvasWidth){newOffsetX=newOffsetX>0?0:newOffsetX;newOffsetX=newOffsetX<canvasWidth-newWidth?canvasWidth-newWidth:newOffsetX;}else{// Center horizontally
newOffsetX=Math.max(0,canvasWidth/2-newWidth/2);}if(newHeight>canvasHeight){newOffsetY=newOffsetY>0?0:newOffsetY;newOffsetY=newOffsetY<canvasHeight-newHeight?canvasHeight-newHeight:newOffsetY;}else{// Center vertically
newOffsetY=Math.max(0,canvasHeight/2-newHeight/2);}return{top:newOffsetY,left:newOffsetX};};Guestures.prototype.onZoom=function(){var self=this;// Calculate current distance between points to get pinch ratio and new width and height
var currentWidth=self.contentStartPos.width;var currentHeight=self.contentStartPos.height;var currentOffsetX=self.contentStartPos.left;var currentOffsetY=self.contentStartPos.top;var endDistanceBetweenFingers=distance(self.newPoints[0],self.newPoints[1]);var pinchRatio=endDistanceBetweenFingers/self.startDistanceBetweenFingers;var newWidth=Math.floor(currentWidth*pinchRatio);var newHeight=Math.floor(currentHeight*pinchRatio);// This is the translation due to pinch-zooming
var translateFromZoomingX=(currentWidth-newWidth)*self.percentageOfImageAtPinchPointX;var translateFromZoomingY=(currentHeight-newHeight)*self.percentageOfImageAtPinchPointY;//Point between the two touches
var centerPointEndX=(self.newPoints[0].x+self.newPoints[1].x)/2-$(window).scrollLeft();var centerPointEndY=(self.newPoints[0].y+self.newPoints[1].y)/2-$(window).scrollTop();// And this is the translation due to translation of the centerpoint
// between the two fingers
var translateFromTranslatingX=centerPointEndX-self.centerPointStartX;var translateFromTranslatingY=centerPointEndY-self.centerPointStartY;// The new offset is the old/current one plus the total translation
var newOffsetX=currentOffsetX+(translateFromZoomingX+translateFromTranslatingX);var newOffsetY=currentOffsetY+(translateFromZoomingY+translateFromTranslatingY);var newPos={top:newOffsetY,left:newOffsetX,scaleX:self.contentStartPos.scaleX*pinchRatio,scaleY:self.contentStartPos.scaleY*pinchRatio};self.canTap=false;self.newWidth=newWidth;self.newHeight=newHeight;self.contentLastPos=newPos;if(self.requestId){cancelAFrame(self.requestId);self.requestId=null;}self.requestId=requestAFrame(function(){$.fancybox.setTranslate(self.$content,self.contentLastPos);});};Guestures.prototype.ontouchend=function(e){var self=this;var dMs=Math.max(new Date().getTime()-self.startTime,1);var swiping=self.isSwiping;var panning=self.isPanning;var zooming=self.isZooming;self.endPoints=pointers(e);self.$container.removeClass('fancybox-controls--isGrabbing');$(document).off('.fb.touch');if(self.requestId){cancelAFrame(self.requestId);self.requestId=null;}self.isSwiping=false;self.isPanning=false;self.isZooming=false;if(self.canTap){return self.onTap(e);}self.speed=366;// Speed in px/ms
self.velocityX=self.distanceX/dMs*0.5;self.velocityY=self.distanceY/dMs*0.5;self.speedX=Math.max(self.speed*0.5,Math.min(self.speed*1.5,1/Math.abs(self.velocityX)*self.speed));if(panning){self.endPanning();}else if(zooming){self.endZooming();}else{self.endSwiping(swiping);}return;};Guestures.prototype.endSwiping=function(swiping){var self=this;var ret=false;self.instance.isSliding=false;self.sliderLastPos=null;// Close if swiped vertically / navigate if horizontally
if(swiping=='y'&&Math.abs(self.distanceY)>50){// Continue vertical movement
$.fancybox.animate(self.instance.current.$slide,{top:self.sliderStartPos.top+self.distanceY+self.velocityY*150,opacity:0},150);ret=self.instance.close(true,300);}else if(swiping=='x'&&self.distanceX>50&&self.instance.group.length>1){ret=self.instance.previous(self.speedX);}else if(swiping=='x'&&self.distanceX<-50&&self.instance.group.length>1){ret=self.instance.next(self.speedX);}if(ret===false&&(swiping=='x'||swiping=='y')){self.instance.jumpTo(self.instance.current.index,150);}self.$container.removeClass('fancybox-is-sliding');};// Limit panning from edges
// ========================
Guestures.prototype.endPanning=function(){var self=this;var newOffsetX,newOffsetY,newPos;if(!self.contentLastPos){return;}if(self.opts.momentum===false){newOffsetX=self.contentLastPos.left;newOffsetY=self.contentLastPos.top;}else{// Continue movement
newOffsetX=self.contentLastPos.left+self.velocityX*self.speed;newOffsetY=self.contentLastPos.top+self.velocityY*self.speed;}newPos=self.limitPosition(newOffsetX,newOffsetY,self.contentStartPos.width,self.contentStartPos.height);newPos.width=self.contentStartPos.width;newPos.height=self.contentStartPos.height;$.fancybox.animate(self.$content,newPos,330);};Guestures.prototype.endZooming=function(){var self=this;var current=self.instance.current;var newOffsetX,newOffsetY,newPos,reset;var newWidth=self.newWidth;var newHeight=self.newHeight;if(!self.contentLastPos){return;}newOffsetX=self.contentLastPos.left;newOffsetY=self.contentLastPos.top;reset={top:newOffsetY,left:newOffsetX,width:newWidth,height:newHeight,scaleX:1,scaleY:1};// Reset scalex/scaleY values; this helps for perfomance and does not break animation
$.fancybox.setTranslate(self.$content,reset);if(newWidth<self.canvasWidth&&newHeight<self.canvasHeight){self.instance.scaleToFit(150);}else if(newWidth>current.width||newHeight>current.height){self.instance.scaleToActual(self.centerPointStartX,self.centerPointStartY,150);}else{newPos=self.limitPosition(newOffsetX,newOffsetY,newWidth,newHeight);// Switch from scale() to width/height or animation will not work correctly
$.fancybox.setTranslate(self.content,$.fancybox.getTranslate(self.$content));$.fancybox.animate(self.$content,newPos,150);}};Guestures.prototype.onTap=function(e){var self=this;var $target=$(e.target);var instance=self.instance;var current=instance.current;var endPoints=e&&pointers(e)||self.startPoints;var tapX=endPoints[0]?endPoints[0].x-self.$stage.offset().left:0;var tapY=endPoints[0]?endPoints[0].y-self.$stage.offset().top:0;var where;var process=function process(prefix){var action=current.opts[prefix];if($.isFunction(action)){action=action.apply(instance,[current,e]);}if(!action){return;}switch(action){case"close":instance.close(self.startEvent);break;case"toggleControls":instance.toggleControls(true);break;case"next":instance.next();break;case"nextOrClose":if(instance.group.length>1){instance.next();}else{instance.close(self.startEvent);}break;case"zoom":if(current.type=='image'&&(current.isLoaded||current.$ghost)){if(instance.canPan()){instance.scaleToFit();}else if(instance.isScaledDown()){instance.scaleToActual(tapX,tapY);}else if(instance.group.length<2){instance.close(self.startEvent);}}break;}};// Ignore right click
if(e.originalEvent&&e.originalEvent.button==2){return;}// Skip if current slide is not in the center
if(instance.isSliding){return;}// Skip if clicked on the scrollbar
if(tapX>$target[0].clientWidth+$target.offset().left){return;}// Check where is clicked
if($target.is('.fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container')){where='Outside';}else if($target.is('.fancybox-slide')){where='Slide';}else if(instance.current.$content&&instance.current.$content.has(e.target).length){where='Content';}else{return;}// Check if this is a double tap
if(self.tapped){// Stop previously created single tap
clearTimeout(self.tapped);self.tapped=null;// Skip if distance between taps is too big
if(Math.abs(tapX-self.tapX)>50||Math.abs(tapY-self.tapY)>50||instance.isSliding){return this;}// OK, now we assume that this is a double-tap
process('dblclick'+where);}else{// Single tap will be processed if user has not clicked second time within 300ms
// or there is no need to wait for double-tap
self.tapX=tapX;self.tapY=tapY;if(current.opts['dblclick'+where]&&current.opts['dblclick'+where]!==current.opts['click'+where]){self.tapped=setTimeout(function(){self.tapped=null;process('click'+where);},300);}else{process('click'+where);}}return this;};$(document).on('onActivate.fb',function(e,instance){if(instance&&!instance.Guestures){instance.Guestures=new Guestures(instance);}});$(document).on('beforeClose.fb',function(e,instance){if(instance&&instance.Guestures){instance.Guestures.destroy();}});})(window,document,window.jQuery||jQuery);// ==========================================================================
//
// SlideShow
// Enables slideshow functionality
//
// Example of usage:
// $.fancybox.getInstance().SlideShow.start()
//
// ==========================================================================
;(function(document,$){'use strict';$.extend(true,$.fancybox.defaults,{btnTpl:{slideShow:'<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}">'+'<svg viewBox="0 0 40 40">'+'<path d="M13,12 L27,20 L13,27 Z" />'+'<path d="M15,10 v19 M23,10 v19" />'+'</svg>'+'</button>'},slideShow:{autoStart:false,speed:3000}});var SlideShow=function SlideShow(instance){this.instance=instance;this.init();};$.extend(SlideShow.prototype,{timer:null,isActive:false,$button:null,init:function init(){var self=this;self.$button=self.instance.$refs.toolbar.find('[data-fancybox-play]').on('click',function(){self.toggle();});if(self.instance.group.length<2||!self.instance.group[self.instance.currIndex].opts.slideShow){self.$button.hide();}},set:function set(force){var self=this;// Check if reached last element
if(self.instance&&self.instance.current&&(force===true||self.instance.current.opts.loop||self.instance.currIndex<self.instance.group.length-1)){self.timer=setTimeout(function(){if(self.isActive){self.instance.jumpTo((self.instance.currIndex+1)%self.instance.group.length);}},self.instance.current.opts.slideShow.speed);}else{self.stop();self.instance.idleSecondsCounter=0;self.instance.showControls();}},clear:function clear(){var self=this;clearTimeout(self.timer);self.timer=null;},start:function start(){var self=this;var current=self.instance.current;if(current){self.isActive=true;self.$button.attr('title',current.opts.i18n[current.opts.lang].PLAY_STOP).removeClass('fancybox-button--play').addClass('fancybox-button--pause');self.set(true);}},stop:function stop(){var self=this;var current=self.instance.current;self.clear();self.$button.attr('title',current.opts.i18n[current.opts.lang].PLAY_START).removeClass('fancybox-button--pause').addClass('fancybox-button--play');self.isActive=false;},toggle:function toggle(){var self=this;if(self.isActive){self.stop();}else{self.start();}}});$(document).on({'onInit.fb':function onInitFb(e,instance){if(instance&&!instance.SlideShow){instance.SlideShow=new SlideShow(instance);}},'beforeShow.fb':function beforeShowFb(e,instance,current,firstRun){var SlideShow=instance&&instance.SlideShow;if(firstRun){if(SlideShow&&current.opts.slideShow.autoStart){SlideShow.start();}}else if(SlideShow&&SlideShow.isActive){SlideShow.clear();}},'afterShow.fb':function afterShowFb(e,instance,current){var SlideShow=instance&&instance.SlideShow;if(SlideShow&&SlideShow.isActive){SlideShow.set();}},'afterKeydown.fb':function afterKeydownFb(e,instance,current,keypress,keycode){var SlideShow=instance&&instance.SlideShow;// "P" or Spacebar
if(SlideShow&&current.opts.slideShow&&(keycode===80||keycode===32)&&!$(document.activeElement).is('button,a,input')){keypress.preventDefault();SlideShow.toggle();}},'beforeClose.fb onDeactivate.fb':function beforeCloseFbOnDeactivateFb(e,instance){var SlideShow=instance&&instance.SlideShow;if(SlideShow){SlideShow.stop();}}});// Page Visibility API to pause slideshow when window is not active
$(document).on("visibilitychange",function(){var instance=$.fancybox.getInstance();var SlideShow=instance&&instance.SlideShow;if(SlideShow&&SlideShow.isActive){if(document.hidden){SlideShow.clear();}else{SlideShow.set();}}});})(document,window.jQuery||jQuery);// ==========================================================================
//
// FullScreen
// Adds fullscreen functionality
//
// ==========================================================================
;(function(document,$){'use strict';// Collection of methods supported by user browser
var fn=function(){var fnMap=[['requestFullscreen','exitFullscreen','fullscreenElement','fullscreenEnabled','fullscreenchange','fullscreenerror'],// new WebKit
['webkitRequestFullscreen','webkitExitFullscreen','webkitFullscreenElement','webkitFullscreenEnabled','webkitfullscreenchange','webkitfullscreenerror'],// old WebKit (Safari 5.1)
['webkitRequestFullScreen','webkitCancelFullScreen','webkitCurrentFullScreenElement','webkitCancelFullScreen','webkitfullscreenchange','webkitfullscreenerror'],['mozRequestFullScreen','mozCancelFullScreen','mozFullScreenElement','mozFullScreenEnabled','mozfullscreenchange','mozfullscreenerror'],['msRequestFullscreen','msExitFullscreen','msFullscreenElement','msFullscreenEnabled','MSFullscreenChange','MSFullscreenError']];var val;var ret={};var i,j;for(i=0;i<fnMap.length;i++){val=fnMap[i];if(val&&val[1]in document){for(j=0;j<val.length;j++){ret[fnMap[0][j]]=val[j];}return ret;}}return false;}();// If browser does not have Full Screen API, then simply unset default button template and stop
if(!fn){if($&&$.fancybox){$.fancybox.defaults.btnTpl.fullScreen=false;}return;}var FullScreen={request:function request(elem){elem=elem||document.documentElement;elem[fn.requestFullscreen](elem.ALLOW_KEYBOARD_INPUT);},exit:function exit(){document[fn.exitFullscreen]();},toggle:function toggle(elem){elem=elem||document.documentElement;if(this.isFullscreen()){this.exit();}else{this.request(elem);}},isFullscreen:function isFullscreen(){return Boolean(document[fn.fullscreenElement]);},enabled:function enabled(){return Boolean(document[fn.fullscreenEnabled]);}};$.extend(true,$.fancybox.defaults,{btnTpl:{fullScreen:'<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}">'+'<svg viewBox="0 0 40 40">'+'<path d="M9,12 h22 v16 h-22 v-16 v16 h22 v-16 Z" />'+'</svg>'+'</button>'},fullScreen:{autoStart:false}});$(document).on({'onInit.fb':function onInitFb(e,instance){var $container;if(instance&&instance.group[instance.currIndex].opts.fullScreen){$container=instance.$refs.container;$container.on('click.fb-fullscreen','[data-fancybox-fullscreen]',function(e){e.stopPropagation();e.preventDefault();FullScreen.toggle($container[0]);});if(instance.opts.fullScreen&&instance.opts.fullScreen.autoStart===true){FullScreen.request($container[0]);}// Expose API
instance.FullScreen=FullScreen;}else if(instance){instance.$refs.toolbar.find('[data-fancybox-fullscreen]').hide();}},'afterKeydown.fb':function afterKeydownFb(e,instance,current,keypress,keycode){// "P" or Spacebar
if(instance&&instance.FullScreen&&keycode===70){keypress.preventDefault();instance.FullScreen.toggle(instance.$refs.container[0]);}},'beforeClose.fb':function beforeCloseFb(instance){if(instance&&instance.FullScreen){FullScreen.exit();}}});$(document).on(fn.fullscreenchange,function(){var isFullscreen=FullScreen.isFullscreen(),instance=$.fancybox.getInstance();if(instance){// If image is zooming, then force to stop and reposition properly
if(instance.current&&instance.current.type==='image'&&instance.isAnimating){instance.current.$content.css('transition','none');instance.isAnimating=false;instance.update(true,true,0);}instance.trigger('onFullscreenChange',isFullscreen);instance.$refs.container.toggleClass('fancybox-is-fullscreen',isFullscreen);}});})(document,window.jQuery||jQuery);// ==========================================================================
//
// Thumbs
// Displays thumbnails in a grid
//
// ==========================================================================
;(function(document,$){'use strict';// Make sure there are default values
$.fancybox.defaults=$.extend(true,{btnTpl:{thumbs:'<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}">'+'<svg viewBox="0 0 120 120">'+'<path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" />'+'</svg>'+'</button>'},thumbs:{autoStart:false,// Display thumbnails on opening
hideOnClose:true,// Hide thumbnail grid when closing animation starts
parentEl:'.fancybox-container',// Container is injected into this element
axis:'y'// Vertical (y) or horizontal (x) scrolling
}},$.fancybox.defaults);var FancyThumbs=function FancyThumbs(instance){this.init(instance);};$.extend(FancyThumbs.prototype,{$button:null,$grid:null,$list:null,isVisible:false,isActive:false,init:function init(instance){var self=this;self.instance=instance;instance.Thumbs=self;// Enable thumbs if at least two group items have thumbnails
var first=instance.group[0],second=instance.group[1];self.opts=instance.group[instance.currIndex].opts.thumbs;self.$button=instance.$refs.toolbar.find('[data-fancybox-thumbs]');if(self.opts&&first&&second&&(first.type=='image'||first.opts.thumb||first.opts.$thumb)&&(second.type=='image'||second.opts.thumb||second.opts.$thumb)){self.$button.show().on('click',function(){self.toggle();});self.isActive=true;}else{self.$button.hide();}},create:function create(){var self=this,instance=self.instance,parentEl=self.opts.parentEl,list,src;self.$grid=$('<div class="fancybox-thumbs fancybox-thumbs-'+self.opts.axis+'"></div>').appendTo(instance.$refs.container.find(parentEl).addBack().filter(parentEl));// Build list HTML
list='<ul>';$.each(instance.group,function(i,item){src=item.opts.thumb||(item.opts.$thumb?item.opts.$thumb.attr('src'):null);if(!src&&item.type==='image'){src=item.src;}if(src&&src.length){list+='<li data-index="'+i+'"  tabindex="0" class="fancybox-thumbs-loading"><img data-src="'+src+'" /></li>';}});list+='</ul>';self.$list=$(list).appendTo(self.$grid).on('click','li',function(){instance.jumpTo($(this).data('index'));});self.$list.find('img').hide().one('load',function(){var $parent=$(this).parent().removeClass('fancybox-thumbs-loading'),thumbWidth=$parent.outerWidth(),thumbHeight=$parent.outerHeight(),width,height,widthRatio,heightRatio;width=this.naturalWidth||this.width;height=this.naturalHeight||this.height;// Calculate thumbnail dimensions; center vertically and horizontally
widthRatio=width/thumbWidth;heightRatio=height/thumbHeight;if(widthRatio>=1&&heightRatio>=1){if(widthRatio>heightRatio){width=width/heightRatio;height=thumbHeight;}else{width=thumbWidth;height=height/widthRatio;}}$(this).css({width:Math.floor(width),height:Math.floor(height),'margin-top':height>thumbHeight?Math.floor(thumbHeight*0.3-height*0.3):Math.floor(thumbHeight*0.5-height*0.5),'margin-left':Math.floor(thumbWidth*0.5-width*0.5)}).show();}).each(function(){this.src=$(this).data('src');});if(self.opts.axis==='x'){self.$list.width(parseInt(self.$grid.css("padding-right"))+instance.group.length*self.$list.children().eq(0).outerWidth(true)+'px');}},focus:function focus(duration){var self=this,$list=self.$list,thumb,thumbPos;if(self.instance.current){thumb=$list.children().removeClass('fancybox-thumbs-active').filter('[data-index="'+self.instance.current.index+'"]').addClass('fancybox-thumbs-active');thumbPos=thumb.position();// Check if need to scroll to make current thumb visible
if(self.opts.axis==='y'&&(thumbPos.top<0||thumbPos.top>$list.height()-thumb.outerHeight())){$list.stop().animate({'scrollTop':$list.scrollTop()+thumbPos.top},duration);}else if(self.opts.axis==='x'&&(thumbPos.left<$list.parent().scrollLeft()||thumbPos.left>$list.parent().scrollLeft()+($list.parent().width()-thumb.outerWidth()))){$list.parent().stop().animate({'scrollLeft':thumbPos.left},duration);}}},update:function update(){this.instance.$refs.container.toggleClass('fancybox-show-thumbs',this.isVisible);if(this.isVisible){if(!this.$grid){this.create();}this.instance.trigger('onThumbsShow');this.focus(0);}else if(this.$grid){this.instance.trigger('onThumbsHide');}// Update content position
this.instance.update();},hide:function hide(){this.isVisible=false;this.update();},show:function show(){this.isVisible=true;this.update();},toggle:function toggle(){this.isVisible=!this.isVisible;this.update();}});$(document).on({'onInit.fb':function onInitFb(e,instance){var Thumbs;if(instance&&!instance.Thumbs){Thumbs=new FancyThumbs(instance);if(Thumbs.isActive&&Thumbs.opts.autoStart===true){Thumbs.show();}}},'beforeShow.fb':function beforeShowFb(e,instance,item,firstRun){var Thumbs=instance&&instance.Thumbs;if(Thumbs&&Thumbs.isVisible){Thumbs.focus(firstRun?0:250);}},'afterKeydown.fb':function afterKeydownFb(e,instance,current,keypress,keycode){var Thumbs=instance&&instance.Thumbs;// "G"
if(Thumbs&&Thumbs.isActive&&keycode===71){keypress.preventDefault();Thumbs.toggle();}},'beforeClose.fb':function beforeCloseFb(e,instance){var Thumbs=instance&&instance.Thumbs;if(Thumbs&&Thumbs.isVisible&&Thumbs.opts.hideOnClose!==false){Thumbs.$grid.hide();}}});})(document,window.jQuery);//// ==========================================================================
//
// Share
// Displays simple form for sharing current url
//
// ==========================================================================
;(function(document,$){'use strict';$.extend(true,$.fancybox.defaults,{btnTpl:{share:'<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}">'+'<svg viewBox="0 0 40 40">'+'<path d="M6,30 C8,18 19,16 23,16 L23,16 L23,10 L33,20 L23,29 L23,24 C19,24 8,27 6,30 Z">'+'</svg>'+'</button>'},share:{tpl:'<div class="fancybox-share">'+'<h1>{{SHARE}}</h1>'+'<p>'+'<a href="https://www.facebook.com/sharer/sharer.php?u={{src}}" target="_blank" class="fancybox-share_button">'+'<svg version="1.1" viewBox="0 0 32 32" fill="#3b5998"><path d="M27.6 3h-23.2c-.8 0-1.4.6-1.4 1.4v23.1c0 .9.6 1.5 1.4 1.5h12.5v-10.1h-3.4v-3.9h3.4v-2.9c0-3.4 2.1-5.2 5-5.2 1.4 0 2.7.1 3 .2v3.5h-2.1c-1.6 0-1.9.8-1.9 1.9v2.5h3.9l-.5 3.9h-3.4v10.1h6.6c.8 0 1.4-.6 1.4-1.4v-23.2c.1-.8-.5-1.4-1.3-1.4z"></path></svg>'+'<span>Facebook</span>'+'</a>'+'<a href="https://www.pinterest.com/pin/create/button/?url={{src}}&amp;description={{descr}}" target="_blank" class="fancybox-share_button">'+'<svg version="1.1" viewBox="0 0 32 32" fill="#c92228"><path d="M16 3c-7.2 0-13 5.8-13 13 0 5.5 3.4 10.2 8.3 12.1-.1-1-.2-2.6 0-3.7.2-1 1.5-6.5 1.5-6.5s-.4-.8-.4-1.9c0-1.8 1-3.2 2.4-3.2 1.1 0 1.6.8 1.6 1.8 0 1.1-.7 2.8-1.1 4.3-.3 1.3.6 2.3 1.9 2.3 2.3 0 4.1-2.4 4.1-6 0-3.1-2.2-5.3-5.4-5.3-3.7 0-5.9 2.8-5.9 5.6 0 1.1.4 2.3 1 3 .1.1.1.2.1.4-.1.4-.3 1.3-.4 1.5-.1.2-.2.3-.4.2-1.6-.8-2.6-3.1-2.6-5 0-4.1 3-7.9 8.6-7.9 4.5 0 8 3.2 8 7.5 0 4.5-2.8 8.1-6.7 8.1-1.3 0-2.6-.7-3-1.5 0 0-.7 2.5-.8 3.1-.3 1.1-1.1 2.5-1.6 3.4 1.2.4 2.5.6 3.8.6 7.2 0 13-5.8 13-13 0-7.1-5.8-12.9-13-12.9z"></path></svg>'+'<span>Pinterest</span>'+'</a>'+'<a href="https://twitter.com/intent/tweet?url={{src}}&amp;text={{descr}}" target="_blank" class="fancybox-share_button">'+'<svg version="1.1" viewBox="0 0 32 32" fill="#1da1f2"><path d="M30 7.3c-1 .5-2.1.8-3.3.9 1.2-.7 2.1-1.8 2.5-3.2-1.1.7-2.3 1.1-3.6 1.4-1-1.1-2.5-1.8-4.2-1.8-3.2 0-5.7 2.6-5.7 5.7 0 .5.1.9.1 1.3-4.8-.2-9-2.5-11.8-6-.5.9-.8 1.9-.8 3 0 2 1 3.8 2.6 4.8-.9 0-1.8-.3-2.6-.7v.1c0 2.8 2 5.1 4.6 5.6-.5.1-1 .2-1.5.2-.4 0-.7 0-1.1-.1.7 2.3 2.9 3.9 5.4 4-2 1.5-4.4 2.5-7.1 2.5-.5 0-.9 0-1.4-.1 2.5 1.6 5.6 2.6 8.8 2.6 10.6 0 16.3-8.8 16.3-16.3v-.7c1.1-1 2-2 2.8-3.2z"></path></svg>'+'<span>Twitter</span>'+'</a>'+'</p>'+'<p><input type="text" value="{{src_raw}}" onfocus="this.select()" /></p>'+'</div>'}});function escapeHtml(string){var entityMap={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#x60;','=':'&#x3D;'};return String(string).replace(/[&<>"'`=\/]/g,function(s){return entityMap[s];});}$(document).on('click','[data-fancybox-share]',function(){var f=$.fancybox.getInstance(),url,tpl;if(f){url=f.current.opts.hash===false?f.current.src:window.location;tpl=f.current.opts.share.tpl.replace(/\{\{src\}\}/g,encodeURIComponent(url)).replace(/\{\{src_raw\}\}/g,escapeHtml(url)).replace(/\{\{descr\}\}/g,f.$caption?encodeURIComponent(f.$caption.text()):'');$.fancybox.open({src:f.translate(f,tpl),type:'html',opts:{animationEffect:"fade",animationDuration:250}});}});})(document,window.jQuery||jQuery);// ==========================================================================
//
// Hash
// Enables linking to each modal
//
// ==========================================================================
;(function(document,window,$){'use strict';// Simple $.escapeSelector polyfill (for jQuery prior v3)
if(!$.escapeSelector){$.escapeSelector=function(sel){var rcssescape=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;var fcssescape=function fcssescape(ch,asCodePoint){if(asCodePoint){// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
if(ch==="\0"){return"\uFFFD";}// Control characters and (dependent upon position) numbers get escaped as code points
return ch.slice(0,-1)+"\\"+ch.charCodeAt(ch.length-1).toString(16)+" ";}// Other potentially-special ASCII characters get backslash-escaped
return"\\"+ch;};return(sel+"").replace(rcssescape,fcssescape);};}// Create new history entry only once
var shouldCreateHistory=true;// Variable containing last hash value set by fancyBox
// It will be used to determine if fancyBox needs to close after hash change is detected
var currentHash=null;// Throttling the history change
var timerID=null;// Get info about gallery name and current index from url
function parseUrl(){var hash=window.location.hash.substr(1);var rez=hash.split('-');var index=rez.length>1&&/^\+?\d+$/.test(rez[rez.length-1])?parseInt(rez.pop(-1),10)||1:1;var gallery=rez.join('-');// Index is starting from 1
if(index<1){index=1;}return{hash:hash,index:index,gallery:gallery};}// Trigger click evnt on links to open new fancyBox instance
function triggerFromUrl(url){var $el;if(url.gallery!==''){// If we can find element matching 'data-fancybox' atribute, then trigger click event for that ..
$el=$("[data-fancybox='"+$.escapeSelector(url.gallery)+"']").eq(url.index-1);if(!$el.length){// .. if not, try finding element by ID
$el=$("#"+$.escapeSelector(url.gallery)+"");}if($el.length){shouldCreateHistory=false;$el.trigger('click');}}}// Get gallery name from current instance
function getGalleryID(instance){var opts;if(!instance){return false;}opts=instance.current?instance.current.opts:instance.opts;return opts.hash||(opts.$orig?opts.$orig.data('fancybox'):'');}// Start when DOM becomes ready
$(function(){// Check if user has disabled this module
if($.fancybox.defaults.hash===false){return;}// Update hash when opening/closing fancyBox
$(document).on({'onInit.fb':function onInitFb(e,instance){var url,gallery;if(instance.group[instance.currIndex].opts.hash===false){return;}url=parseUrl();gallery=getGalleryID(instance);// Make sure gallery start index matches index from hash
if(gallery&&url.gallery&&gallery==url.gallery){instance.currIndex=url.index-1;}},'beforeShow.fb':function beforeShowFb(e,instance,current){var gallery;if(!current||current.opts.hash===false){return;}gallery=getGalleryID(instance);// Update window hash
if(gallery&&gallery!==''){if(window.location.hash.indexOf(gallery)<0){instance.opts.origHash=window.location.hash;}currentHash=gallery+(instance.group.length>1?'-'+(current.index+1):'');if('replaceState'in window.history){if(timerID){clearTimeout(timerID);}timerID=setTimeout(function(){window.history[shouldCreateHistory?'pushState':'replaceState']({},document.title,window.location.pathname+window.location.search+'#'+currentHash);timerID=null;shouldCreateHistory=false;},300);}else{window.location.hash=currentHash;}}},'beforeClose.fb':function beforeCloseFb(e,instance,current){var gallery,origHash;if(timerID){clearTimeout(timerID);}if(current.opts.hash===false){return;}gallery=getGalleryID(instance);origHash=instance&&instance.opts.origHash?instance.opts.origHash:'';// Remove hash from location bar
if(gallery&&gallery!==''){if('replaceState'in history){window.history.replaceState({},document.title,window.location.pathname+window.location.search+origHash);}else{window.location.hash=origHash;// Keep original scroll position
$(window).scrollTop(instance.scrollTop).scrollLeft(instance.scrollLeft);}}currentHash=null;}});// Check if need to close after url has changed
$(window).on('hashchange.fb',function(){var url=parseUrl();if($.fancybox.getInstance()){if(currentHash&&currentHash!==url.gallery+'-'+url.index&&!(url.index===1&&currentHash==url.gallery)){currentHash=null;$.fancybox.close();}}else if(url.gallery!==''){triggerFromUrl(url);}});// Check current hash and trigger click event on matching element to start fancyBox, if needed
setTimeout(function(){triggerFromUrl(parseUrl());},50);});})(document,window,window.jQuery||jQuery);(function($){$(document).ready(function(){$('.jsExpander').on('click',function(){var contentBody=$(this).closest('.views-row').find('.views-field-body');var i=$(this).find('i');if(i.hasClass('fa-caret-left')){i.removeClass('fa-caret-left').addClass('fa-caret-down');contentBody.slideDown();}else{i.removeClass('fa-caret-down').addClass('fa-caret-left');contentBody.slideUp();}});/*
        var mySwiper = new Swiper ('.swiper-container', {
            // Optional parameters
            //direction: 'vertical',
            loop: false
        })
        */var galleryTop=new Swiper('.gallery-top',{navigation:{nextEl:'.swiper-button-next',prevEl:'.swiper-button-prev'},spaceBetween:10,on:{slideChangeTransitionEnd:function slideChangeTransitionEnd(){var activeIndex=this.activeIndex;if(typeof galleryThumbs==='undefined'){return;}$(galleryThumbs.slides).removeClass('is-selected');$(galleryThumbs.slides).eq(activeIndex).addClass('is-selected');galleryThumbs.slideTo(activeIndex,500,false);}}});if($('.gallery-thumbs').length){var galleryThumbs=new Swiper('.gallery-thumbs',{spaceBetween:10,freeMode:true,centeredSlides:false,slidesPerView:'auto',touchRatio:0.2,init:false,on:{init:function init(){$(this.slides).eq(galleryTop.activeIndex).addClass('is-selected');//this.slideTo(galleryTop.activeIndex);
},click:function click(){var clicked=this.clickedIndex;this.activeIndex=clicked;//don't need this
//this.updateClasses() //don't need this
$(this.slides).removeClass('is-selected');$(this.clickedSlide).addClass('is-selected');galleryTop.slideTo(clicked,500,false);}}});galleryThumbs.init();}$('body').on('click','.jsToggler',function(){$(this).parent().find('> ul').toggle();$(this).find('i').toggleClass('fa-caret-left');$(this).find('i').toggleClass('fa-caret-down');});$('body').on('click','.jsShowCharacteristics',function(e){e.preventDefault();$(this).slideUp();$(this).parent().find('.characteristics').slideDown();});$('body').on('click','.jsHideCharacteristics',function(e){e.preventDefault();$(this).parent().parent().find('.characteristics').slideUp();$(this).parent().parent().find('.jsShowCharacteristics').slideDown();});$('body').on('click','.jsToggleFavourites',function(e){e.preventDefault();var fa=$(this).find('i');fa.removeClass('fa-star fa-star-o').addClass('fa-spinner fa-spin');$.post('/user/favourites/toggle',{'product_id':$(this).data('product_id')}).done(function(data){fa.addClass('fa-star'+(data['currentStatus']==='added'?'':'-o'));if(data['currentStatus']==='added'){fa.animateCss('rotateIn');}else{fa.animateCss('fadeIn');}}).fail(function(response){if(response.status==404){fa.addClass('fa-star-o');alert('Product not found');}}).always(function(){fa.removeClass('fa-spinner fa-spin');});});$('body').on('click','.jsRemoveCompare',function(e){e.preventDefault();var tr=$(this).closest('tr');$.post('/compare/toggle',{'product_id':$(this).data('product_id')}).done(function(data){console.log(data['currentStatus'],$(this).closest('tr'));if(data['currentStatus']==='removed'){tr.slideUp();}$('.jsAmountInCompare').html(data['countInCompare']);}).fail(function(response){if(response.status==404){alert('Product not found');}});});$('body').on('click','.jsToggleCompare',function(e){e.preventDefault();var fa=$(this).find('i');fa.removeClass('fa-bar-chart fa-line-chart').addClass('fa-spinner fa-spin');$.post('/compare/toggle',{'product_id':$(this).data('product_id')}).done(function(data){fa.addClass('fa-'+(data['currentStatus']==='added'?'line':'bar')+'-chart');if(data['currentStatus']==='added'){fa.animateCss('rotateIn');}else{fa.animateCss('fadeIn');}$('.jsAmountInCompare').html(data['countInCompare']);}).fail(function(response){if(response.status==404){fa.addClass('fa-bar-chart');alert('Product not found');}}).always(function(){fa.removeClass('fa-spinner fa-spin');});});$('body').on('click','.jsSearchBlock',function(e){e.preventDefault();var input=$(this).find('input');var a=$(this).find('a');var sendRequest=function sendRequest(){if(input.val()==''){input.addClass('error');return false;}window.location.href='/catalogue/search/'+input.val();return false;};a.on('click',function(){return sendRequest();});input.on('keyup',function(e){var keycode=e.keyCode?e.keyCode:e.which;if(keycode==13){return sendRequest();}if(keycode==27){input.val('');}});});});})(jQuery);$.fn.extend({animateCss:function animateCss(animationName,callback){var animationEnd='webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';this.addClass('animated '+animationName).one(animationEnd,function(){$(this).removeClass('animated '+animationName);if(callback){callback();}});return this;}});