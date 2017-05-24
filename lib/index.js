(function(){
  var _, OrderedSet, _classes, classes, mergeProp, mergeProps, splitPropsReturn, splitProps;
  _ = require('lodash');
  OrderedSet = require('immutable').OrderedSet;
  _classes = function(r, i){
    switch (false) {
    case !_.isArray(i):
      i.forEach(function(it){
        return _classes(r, it);
      });
      break;
    case !_.isObject(i):
      _.forOwn(i, function(){
        if (arguments[0]) {
          return r.add(arguments[1] + "");
        }
      });
      break;
    default:
      r.add(i + "");
    }
    return r;
  };
  classes = function(){
    return _.reduce(arguments, _classes, OrderedSet().asMutable()).join(' ');
  };
  mergeProp = function(o, s, n){
    switch (false) {
    case n !== 'style':
      return _.merge(o, s);
    case !_.isFunction(s):
      return (function(){
        switch (false) {
        case o != null:
          return s;
        case !_.isFunction(o):
          return function(){
            if (false !== s.apply(null, arguments)) {
              return o.apply(null, arguments);
            }
          };
        default:
          throw new Error('wrong o');
        }
      }());
    case !_.isFunction(o):
      return (function(){
        switch (false) {
        case s != null:
          return o;
        default:
          throw new Error('wrong s');
        }
      }());
    default:
      return s;
    }
  };
  mergeProps = function(p){
    var src, res$, i$, to$;
    res$ = [];
    for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
      res$.push(arguments[i$]);
    }
    src = res$;
    return _.mergeWith.apply(null, Array.prototype.slice.call(arguments).concat([mergeProp]));
  };
  splitPropsReturn = [null, null];
  splitProps = function(props, picks){
    var x$;
    x$ = splitPropsReturn;
    x$[0] = picks;
    x$[1] = _.omit(props, _.keys(picks));
    return x$;
  };
  module.exports = {
    classes: classes,
    mergeProps: mergeProps,
    splitProps: splitProps
  };
}).call(this);
