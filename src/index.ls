require! {
  lodash: _
  immutable: {OrderedSet}
}

_classes = (r, i) ->
  | _.is-array i => i.for-each -> _classes r, it
  | _.is-object i => _.for-own i, -> r.add "#{&1}" if &0
  | _ => r.add "#{i}"
  r

classes = -> _.reduce &, _classes, OrderedSet!as-mutable! .join ' '

merge-prop = (o, s, n) ->
  | n == \style => _.merge o, s
  | _.is-function s
    return switch
    | not o? => s
    | _.is-function o => (-> o.apply null, & if false != s.apply null, &) # call older function if recent returned non-false
    | _ => throw new Error 'wrong o'
  | _.is-function o
    return switch
    | not s? => o
    | _ => throw new Error 'wrong s'
  | _ => s

merge-props = (p, ...src) -> _.merge-with.apply null, (Array::slice.call &) ++ [merge-prop]

split-props-return = [null, null]

split-props = (props, picks) ->
  with split-props-return
    ..0 = picks
    ..1 = _.omit props, _.keys picks

module.exports = {classes, merge-props, split-props}
