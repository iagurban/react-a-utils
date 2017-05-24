(function(){
  var ref$, classes, mergeProps, splitProps, _, expect;
  ref$ = require('./index'), classes = ref$.classes, mergeProps = ref$.mergeProps, splitProps = ref$.splitProps;
  _ = require('lodash');
  expect = require('chai').expect;
  describe('main', function(___){
    it('classes', function(){
      expect(classes([0, ['a', 'o']], {
        q: true,
        b: false,
        t: 0,
        s: 1
      }, [
        'r', {
          i: true,
          y: 'a',
          r: '',
          s: true
        }
      ], 'n')).equal("0 a o q s r i y n");
    });
    it('merge-props', function(){
      var q, p, p2;
      q = {};
      p = {
        style: {
          a: 0
        },
        onClick: function(){
          q.a = true;
        }
      };
      p2 = mergeProps(p, {
        onClick: function(){
          q.b = true;
        },
        style: {
          a: 1,
          b: 4
        },
        q: 1
      }, {
        style: {
          a: 2
        },
        q: 'e'
      });
      p2.onClick();
      expect(q.a && q.b && p2.style.a === 2 && p2.style.b === 4 && p2.q === 'e').equal(true);
      q = {};
      p2 = mergeProps(p, {
        onClick: function(){
          q.b = true;
          return false;
        }
      });
      p2.onClick();
      expect(!q.a && q.b).equal(true);
    });
    it('failing merge-props', function(){
      expect(function(){
        return mergeProps({
          onClick: 123
        }, {
          onClick: function(){}
        });
      }).to['throw']();
      expect(function(){
        return mergeProps({
          onClick: function(){}
        }, {
          onClick: 123
        });
      }).to['throw']();
      mergeProps({
        onClick: null
      }, {
        onClick: function(){}
      });
      mergeProps({
        onClick: function(){}
      }, {
        onClick: null
      });
    });
    return it('split-props', function(){
      var props, ref$, internalProps, restProps;
      props = {
        a: 0,
        b: 1,
        c: 2
      };
      ref$ = splitProps(props, {
        a: props.a,
        b: props.b
      }), internalProps = ref$[0], restProps = ref$[1];
      expect(internalProps.a).equal(0);
      expect(internalProps.b).equal(1);
      expect(internalProps.c != null).equal(false);
      expect(restProps.a == null) && !((ref$ = restProps.b) != null && ref$.equal(true));
      expect(restProps.c).equal(2);
    });
  });
}).call(this);
